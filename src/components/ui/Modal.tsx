import { motion, AnimatePresence } from "motion/react";
import { X, ExternalLink, Calendar, MapPin, Briefcase, Layers, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef, SyntheticEvent } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: any;
}

export function Modal({ isOpen, onClose, item }: ModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [orientation, setOrientation] = useState<'landscape' | 'portrait'>('landscape');
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0);
    }
  }, [isOpen, item]);

  const handleImageLoad = (e: SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = e.currentTarget;
    setOrientation(naturalWidth > naturalHeight ? 'landscape' : 'portrait');
  };

  if (!item) return null;

  const images = item.images || (item.image ? [item.image] : []);
  const hasMultipleImages = images.length > 1;

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
            className="absolute inset-0 bg-black/90 backdrop-blur-xl"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={`relative w-full ${orientation === 'portrait' ? 'max-w-5xl' : 'max-w-4xl'} max-h-[90vh] glass rounded-3xl overflow-hidden flex flex-col border border-white/10`}
          >
            {/* Header */}
            <div className="p-6 md:p-8 border-b border-white/5 flex justify-between items-center bg-white/5 z-10">
            <div>
              <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-nexus-accent/10 flex items-center justify-center text-nexus-accent">
                    {item.type === 'job' ? 
                    <img src={item.icon} className="w-12 h-12 rounded-xl" alt="Company Logo" />
                    : <Layers size={24} />
                    }
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{item.position || item.name}</h3>
                    <p className="text-nexus-muted font-mono ">{item.company || item.desc}</p>
                  </div>
                </div>
                  {item.type === 'job' ? 
                <div className="flex mt-4">
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar size={16} className="text-nexus-muted" />
                    <span className="text-nexus-muted">{item.start} — {item.end}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm mx-6">
                    <MapPin size={16} className="text-nexus-muted" />
                    <span className="text-nexus-muted">{item.location}</span>
                  </div>
                </div>
                 : 
                 <div className="flex flex-wrap gap-2 mt-4">
                    {item.tech?.map((t: string) => (
                      <span key={t} className="text-[12px] font-mono bg-white/5 px-2 py-1 rounded text-nexus-muted border border-white/5">
                        {t}
                      </span>
                    ))}
                  </div>}
              </div>
         

              <div className="flex items-center gap-4">
                {/* <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-nexus-muted uppercase tracking-widest">
                  View: {orientation}
                </div> */}
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors text-nexus-muted hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className={`flex-1 overflow-y-auto custom-scrollbar ${orientation === 'portrait' ? 'md:flex md:overflow-hidden' : ''}`}>
              
              {/* Image Section */}
              <div className={`${orientation === 'portrait' ? 'flex justify-center md:w-1/2 md:h-full bg-black/20' : 'w-full'} relative group`}>
                {images.length > 0 ? (
                  <div className={`relative ${orientation === 'portrait' ? 'h-[400px] md:h-full' : 'aspect-video'} overflow-hidden`}>
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentIndex}
                        src={images[currentIndex]}
                        alt={`${item.name} ${currentIndex + 1}`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        onLoad={handleImageLoad}
                        className={`${orientation === 'portrait' ? 'h-[65vh]  object-contain' : 'w-full h-full  object-contain'}  `}
                        referrerPolicy="no-referrer"
                      />
                    </AnimatePresence>

                    {hasMultipleImages && (
                      <>
                        <button 
                          onClick={(e) => { e.stopPropagation(); prevImage(); }}
                          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-nexus-accent hover:text-nexus-bg"
                        >
                          <ChevronLeft size={20} />
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); nextImage(); }}
                          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-nexus-accent hover:text-nexus-bg"
                        >
                          <ChevronRight size={20} />
                        </button>
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                          {images.map((_: any, i: number) => (
                            <div 
                              key={i}
                              className={`w-1.5 h-1.5 rounded-full transition-all ${i === currentIndex ? 'bg-nexus-accent w-4' : 'bg-white/30'}`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                ) : null}
              </div>

              {/* Text Section */}
              <div className={`p-6 md:p-8 space-y-8 ${orientation === 'portrait' ? 'md:w-1/2 md:overflow-y-auto custom-scrollbar ' : ''}`}>
                <div className={`grid grid-cols-1 gap-8 `}>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-nexus-accent font-mono text-[14px] uppercase tracking-widest mb-4">Overview</h4>
                      <p className="text-nexus-muted leading-relaxed ">
                        {item.summary || item.description}
                      </p>
                    </div>

                    {item.details && (
                      <div>
                        <h4 className="text-nexus-accent font-mono text-[14px] uppercase tracking-widest mb-4">Key Responsibilities & Achievements</h4>
                        <ul className="space-y-4">
                          {item.details.map((detail: string, i: number) => (
                            <li key={i} className="flex gap-4 text-nexus-muted leading-relaxed t">
                              <span className="text-nexus-accent font-bold">0{i + 1}</span>
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>



                  <div className="space-y-8">
                    {item.involvement && (
                      <div className="glass p-6 rounded-2xl border border-white/5">
                        <h4 className="text-nexus-accent font-mono text-[14px] uppercase tracking-widest mb-4">Involvement</h4>
                        <div className="flex flex-wrap gap-2">
                          {item.involvement.map((inv: string) => (
                            <span key={inv} className="text-[12px] font-mono text-nexus-accent border border-nexus-accent/20 px-2 py-1 rounded">
                              {inv}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/5 bg-white/5 flex justify-between items-center z-10">
              <div className="flex items-center gap-4">
                {item.type === 'project' && (
                  <a href="#" className="flex items-center gap-2 text-nexus-accent font-mono text-xs hover:underline">
                    VIEW_LIVE_DEMO <ExternalLink size={14} />
                  </a>
                )}
              </div>
              <button 
                onClick={onClose}
                className="px-6 py-2 rounded-xl font-mono text-xs border border-white/10 hover:bg-white/10 transition-all"
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
