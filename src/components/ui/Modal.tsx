import { motion, AnimatePresence } from "motion/react";
import { X, ExternalLink, Calendar, MapPin, ChevronLeft, ChevronRight, Briefcase, Layers } from "lucide-react";
import { useState, useRef, SyntheticEvent, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: any;
}

export function Modal({ isOpen, onClose, item }: ModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [orientation, setOrientation] = useState<'landscape' | 'portrait'>('landscape');
  const [imageLoading, setImageLoading] = useState(true);
  const imgRef = useRef<HTMLImageElement>(null);

  const images = item?.images || (item?.image ? [item.image] : []);
  const hasMultipleImages = images.length > 1;

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0);
    }
  }, [isOpen, item]);

  useEffect(() => {
    setImageLoading(true);
    // Preload next and previous images
    if (images.length > 1) {
      const nextIdx = (currentIndex + 1) % images.length;
      const prevIdx = (currentIndex - 1 + images.length) % images.length;
      if (images[nextIdx]) {
        const nextImg = new Image();
        nextImg.src = images[nextIdx];
      }
      if (images[prevIdx]) {
        const prevImg = new Image();
        prevImg.src = images[prevIdx];
      }
    }
  }, [currentIndex, images]);

  const handleImageLoad = (e: SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = e.currentTarget;
    setOrientation(naturalWidth > naturalHeight ? 'landscape' : 'portrait');
    setImageLoading(false);
  };

  if (!item) return null;

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className={`relative w-full ${orientation === 'portrait' ? 'max-w-5xl' : 'max-w-4xl'} max-h-[90vh] bg-white dark:bg-[#101622] rounded-3xl overflow-hidden flex flex-col border border-zinc-200 dark:border-zinc-800 shadow-2xl`}
          >
            {/* Header */}
            <div className="p-6 md:p-8 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center bg-zinc-50/80 dark:bg-zinc-900/80 z-10">
              <div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-900 dark:text-white overflow-hidden shadow-2xs">
                    {item.type === 'job' ? 
                      (item.icon ? <img src={item.icon} className="w-12 h-12 rounded-2xl object-contain p-2" alt="Company Logo" /> : <Briefcase size={22} />)
                      : <Layers size={22} />
                    }
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">{item.position || item.name}</h3>
                    <p className="text-zinc-500 dark:text-zinc-400 font-mono text-sm">{item.company || item.desc || (item.projectCategory === 'side' ? 'Side Project / IoT Prototype' : 'Project')}</p>
                  </div>
                </div>

                {item.type === 'job' ? (
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4 font-mono text-xs text-zinc-500 dark:text-zinc-400">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={14} className="text-zinc-400 dark:text-zinc-500" />
                      <span>{item.start} — {item.end}</span>
                    </div>
                    {item.location && (
                      <div className="flex items-center gap-1.5">
                        <MapPin size={14} className="text-zinc-400 dark:text-zinc-500" />
                        <span>{item.location}</span>
                      </div>
                    )}
                    {item.employmentType && (
                      <span className="bg-zinc-100 dark:bg-zinc-800 px-2.5 py-0.5 rounded-md text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                        {item.employmentType}
                      </span>
                    )}
                    {item.workSetup && (
                      <span className="bg-zinc-100 dark:bg-zinc-800 px-2.5 py-0.5 rounded-md text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 font-medium">
                        {item.workSetup}
                      </span>
                    )}
                    {item.link && (
                      <div className="flex items-center gap-1.5">
                        <ExternalLink size={14} className="text-zinc-500 dark:text-zinc-400" />
                        <a 
                          href={item.link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-zinc-900 dark:text-blue-400 hover:underline font-mono text-xs"
                        >
                          {item.link.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
                        </a>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {item.tech?.map((t: string) => (
                      <span key={t} className="text-[11px] font-mono bg-zinc-100 dark:bg-zinc-800 px-2.5 py-0.5 rounded-md text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <button 
                onClick={onClose}
                aria-label="Close modal"
                className="p-2 hover:bg-zinc-200/80 dark:hover:bg-zinc-800 rounded-full transition-colors text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white cursor-pointer"
                title="Close"
              >
                <X size={22} />
              </button>
            </div>

            {/* Content */}
            <div className={`flex-1 overflow-y-auto custom-scrollbar ${orientation === 'portrait' ? 'md:flex md:overflow-hidden' : ''}`}>
              {/* Image Section */}
              <div className={`${orientation === 'portrait' ? 'flex justify-center md:w-1/2 md:h-full bg-zinc-900 dark:bg-black' : 'w-full'} relative group`}>
                {images.length > 0 ? (
                  <div className={`relative ${orientation === 'portrait' ? 'h-[400px] md:h-full' : 'aspect-video bg-zinc-900 dark:bg-black'} overflow-hidden flex items-center justify-center`}>
                    {imageLoading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/60 z-0">
                        <div className="w-8 h-8 rounded-full border-2 border-zinc-400 border-t-white animate-spin" />
                      </div>
                    )}
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentIndex}
                        src={images[currentIndex]}
                        alt={`${item.name} ${currentIndex + 1}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onLoad={handleImageLoad}
                        loading="eager"
                        decoding="async"
                        className={`${orientation === 'portrait' ? 'h-[65vh] object-contain' : 'w-full h-full object-contain'} relative z-10`}
                        referrerPolicy="no-referrer"
                      />
                    </AnimatePresence>

                    {hasMultipleImages && (
                      <>
                        <button 
                          onClick={(e) => { e.stopPropagation(); prevImage(); }}
                          aria-label="Previous image"
                          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black cursor-pointer z-20"
                        >
                          <ChevronLeft size={20} />
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); nextImage(); }}
                          aria-label="Next image"
                          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black cursor-pointer z-20"
                        >
                          <ChevronRight size={20} />
                        </button>
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                          {images.map((_: any, i: number) => (
                            <div 
                              key={i}
                              className={`w-1.5 h-1.5 rounded-full transition-all ${i === currentIndex ? 'bg-white w-4' : 'bg-white/40'}`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                ) : null}
              </div>

              {/* Text Section */}
              <div className={`p-6 md:p-8 space-y-8 ${orientation === 'portrait' ? 'md:w-1/2 md:overflow-y-auto custom-scrollbar' : ''}`}>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-zinc-900 dark:text-white font-mono text-[13px] font-bold uppercase tracking-widest mb-3">Overview</h4>
                    <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed text-sm">
                      {item.summary || item.description}
                    </p>
                  </div>

                  {item.details && (
                    <div>
                      <h4 className="text-zinc-900 dark:text-white font-mono text-[13px] font-bold uppercase tracking-widest mb-4">Key Responsibilities & Achievements</h4>
                      <ul className="space-y-3">
                        {item.details.map((detail: string, i: number) => (
                          <li key={i} className="flex gap-3 text-zinc-600 dark:text-zinc-300 leading-relaxed text-sm">
                            <span className="text-zinc-900 dark:text-white font-bold font-mono text-xs shrink-0 mt-0.5">0{i + 1}</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {item.involvement && (
                    <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                      <h4 className="text-zinc-900 dark:text-white font-mono text-[13px] font-bold uppercase tracking-widest mb-3">Involvement</h4>
                      <div className="flex flex-wrap gap-2">
                        {item.involvement.map((inv: string) => (
                          <span key={inv} className="text-[11px] font-mono text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-2.5 py-1 rounded-md">
                            {inv}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/80 flex justify-between items-center z-10">
              <div className="flex items-center gap-4">
                {item.link && (
                  <a 
                    href={item.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-2 text-zinc-900 dark:text-white font-bold font-mono text-xs hover:underline"
                  >
                    VISIT WEBSITE <ExternalLink size={14} />
                  </a>
                )}
              </div>
              <button 
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl font-mono text-xs bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-black dark:hover:bg-zinc-100 transition-all cursor-pointer font-medium"
              >
                CLOSE WINDOW
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
