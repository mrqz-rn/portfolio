import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, ExternalLink, Maximize2, ImageOff, ArrowRight } from "lucide-react";
import { useState } from "react";
import { works, projects } from "../../data";

interface ProjectsSectionProps {
  onSelectItem: (item: any) => void;
}

interface ProjectItem {
  id: number;
  name: string;
  desc?: string;
  description: string;
  tech: string[];
  company?: string;
  details?: string[];
  involvement?: string[];
  link?: string;
  images?: string[];
  projectCategory: "enterprise" | "side";
  categoryLabel: string;
}

type Filter = "all" | "enterprise" | "side";

function ProjectGallery({ images, name, onExpand }: { images: string[]; name: string; onExpand: () => void }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const hasMultiple = images.length > 1;

  const go = (next: number) => {
    setDirection(next > index ? 1 : -1);
    setIndex((next + images.length) % images.length);
  };

  if (images.length === 0) {
    return (
      <div className="aspect-[16/10] rounded-2xl flex items-center justify-center bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-400 dark:text-zinc-600">
        <ImageOff size={28} />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Stage */}
      <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm group/gallery select-none">
        {/* Blurred backdrop so portrait screenshots fill the frame without cropping */}
        <img
          src={images[index]}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover scale-110 blur-2xl opacity-50"
          referrerPolicy="no-referrer"
        />

        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.img
            key={index}
            src={images[index]}
            alt={`${name} screenshot ${index + 1}`}
            initial={{ x: direction > 0 ? "100%" : direction < 0 ? "-100%" : 0, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction > 0 ? "-100%" : "100%", opacity: 0 }}
            transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
            drag={hasMultiple ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.3}
            onDragEnd={(_, { offset, velocity }) => {
              if (offset.x < -50 || velocity.x < -400) go(index + 1);
              else if (offset.x > 50 || velocity.x > 400) go(index - 1);
            }}
            loading="lazy"
            decoding="async"
            draggable={false}
            className="absolute inset-0 w-full h-full object-contain touch-pan-y z-10"
            referrerPolicy="no-referrer"
          />
        </AnimatePresence>

        <button
          onClick={onExpand}
          aria-label={`View ${name} full screen`}
          title="View larger"
          className="absolute top-3 right-3 p-2 rounded-full bg-black/60 hover:bg-black text-white opacity-90 md:opacity-0 md:group-hover/gallery:opacity-100 transition-all cursor-pointer z-20"
        >
          <Maximize2 size={14} />
        </button>

        {hasMultiple && (
          <>
            <button
              onClick={() => go(index - 1)}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black text-white opacity-90 md:opacity-0 md:group-hover/gallery:opacity-100 transition-all cursor-pointer z-20"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => go(index + 1)}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black text-white opacity-90 md:opacity-0 md:group-hover/gallery:opacity-100 transition-all cursor-pointer z-20"
            >
              <ChevronRight size={18} />
            </button>
            <div className="absolute bottom-3 left-3 px-2.5 py-1 bg-black/60 backdrop-blur-md text-white text-[11px] font-mono rounded-full z-20 pointer-events-none">
              {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
            </div>
          </>
        )}
      </div>

      {/* Thumbnail strip */}
      {hasMultiple && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button
              key={src + i}
              onClick={() => go(i)}
              aria-label={`Show image ${i + 1}`}
              className={`shrink-0 w-16 h-10 md:w-[72px] md:h-11 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                i === index
                  ? "border-zinc-900 dark:border-white"
                  : "border-transparent opacity-50 hover:opacity-100"
              }`}
            >
              <img src={src} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover object-top" referrerPolicy="no-referrer" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function ProjectsSection({ onSelectItem }: ProjectsSectionProps) {
  const [filter, setFilter] = useState<Filter>("all");

  const enterpriseList: ProjectItem[] = works.map((w) => ({
    ...w,
    projectCategory: "enterprise",
    categoryLabel: "Enterprise Platform",
  }));

  const sideList: ProjectItem[] = projects.map((p) => ({
    ...p,
    desc: (p as any).desc,
    company: (p as any).company,
    details: (p as any).details,
    involvement: (p as any).involvement,
    link: (p as any).link,
    projectCategory: "side",
    categoryLabel: "Side Project / IoT",
  }));

  const allProjects: ProjectItem[] = [...enterpriseList, ...sideList];

  const displayedProjects =
    filter === "all"
      ? allProjects
      : filter === "enterprise"
      ? enterpriseList
      : sideList;

  const tabs: { id: Filter; label: string; count: number }[] = [
    { id: "all", label: "All", count: allProjects.length },
    { id: "enterprise", label: "Enterprise", count: enterpriseList.length },
    { id: "side", label: "Side & IoT", count: sideList.length },
  ];

  return (
    <motion.section
      key="projects"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="w-full max-w-4xl space-y-12"
    >
      {/* Header */}
      <div>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white mb-4 font-mono">
          Projects
        </h2>
        <p className="text-zinc-600 dark:text-zinc-300 text-base md:text-lg leading-relaxed max-w-3xl">
          Featured enterprise platforms, web applications, IoT hardware prototypes, and digital systems built for production and innovation.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-6 border-b border-zinc-200 dark:border-zinc-800 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`relative pb-3 text-xs font-mono uppercase tracking-widest whitespace-nowrap transition-colors cursor-pointer ${
              filter === tab.id
                ? "text-zinc-900 dark:text-white font-bold"
                : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
            }`}
          >
            {tab.label}
            <span className="ml-1.5 text-zinc-400 dark:text-zinc-500">{String(tab.count).padStart(2, "0")}</span>
            {filter === tab.id && (
              <motion.span
                layoutId="projects-tab-underline"
                className="absolute left-0 right-0 -bottom-px h-0.5 bg-zinc-900 dark:bg-white"
              />
            )}
          </button>
        ))}
      </div>

      {/* Project Rows */}
      <AnimatePresence mode="wait">
        <motion.div
          key={filter}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.2 }}
          className="divide-y divide-zinc-200 dark:divide-zinc-800"
        >
          {displayedProjects.map((project, i) => {
            const openDetails = () => onSelectItem({ ...project, type: "project" });
            const reversed = i % 2 === 1;

            return (
              <article
                key={project.name + project.id + project.projectCategory}
                className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 py-10 first:pt-0 last:pb-0"
              >
                {/* Gallery */}
                <div className={`md:col-span-7 ${reversed ? "md:order-2" : ""}`}>
                  <ProjectGallery images={project.images ?? []} name={project.name} onExpand={openDetails} />
                </div>

                {/* Info */}
                <div className={`md:col-span-5 flex flex-col ${reversed ? "md:order-1" : ""}`}>
                  <div className="flex items-center gap-3 mb-4 font-mono text-[12px] uppercase tracking-widest">
                    <span className="text-zinc-400 dark:text-zinc-500">{String(i + 1).padStart(2, "0")}</span>
                    <span className="h-px w-6 bg-zinc-300 dark:bg-zinc-700" />
                    <span
                      className={
                        project.projectCategory === "enterprise"
                          ? "text-zinc-600 dark:text-zinc-300"
                          : "text-blue-700 dark:text-blue-400"
                      }
                    >
                      {project.company || project.categoryLabel}
                    </span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
                    {project.name}
                  </h3>
                  {project.desc && (
                    <p className="mt-1 text-sm font-mono text-zinc-500 dark:text-zinc-400">{project.desc}</p>
                  )}

                  <p className="mt-4 text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed line-clamp-5">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-5">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[11px] font-mono bg-zinc-100 dark:bg-zinc-800/90 border border-zinc-200/80 dark:border-zinc-700 px-2 py-0.5 rounded text-zinc-700 dark:text-zinc-200"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-3 mt-6 md:mt-auto md:pt-6">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="send-btn flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs font-bold transition-all"
                      >
                        Visit Site <ExternalLink size={13} />
                      </a>
                    )}
                    <button
                      onClick={openDetails}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs font-bold border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white hover:border-zinc-900 dark:hover:border-white transition-colors cursor-pointer group/details"
                    >
                      Details
                      <ArrowRight size={13} className="group-hover/details:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </motion.section>
  );
}
