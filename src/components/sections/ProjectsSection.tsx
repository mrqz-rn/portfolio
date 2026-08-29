import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, Layers, Sparkles, Cpu, ArrowUpRight } from "lucide-react";
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

export function ProjectsSection({ onSelectItem }: ProjectsSectionProps) {
  const [filter, setFilter] = useState<"all" | "enterprise" | "side">("all");

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

  return (
    <div className="space-y-10 w-full max-w-4xl">
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
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-zinc-200/60 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/60 w-fit">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all duration-200 cursor-pointer flex items-center gap-2 ${
            filter === "all"
              ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-xs font-bold border border-zinc-200/80 dark:border-zinc-700"
              : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
          }`}
        >
          <Layers size={14} />
          <span>All Projects ({allProjects.length})</span>
        </button>

        <button
          onClick={() => setFilter("enterprise")}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all duration-200 cursor-pointer flex items-center gap-2 ${
            filter === "enterprise"
              ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-xs font-bold border border-zinc-200/80 dark:border-zinc-700"
              : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
          }`}
        >
          <Sparkles size={14} />
          <span>Enterprise Platforms ({enterpriseList.length})</span>
        </button>

        <button
          onClick={() => setFilter("side")}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all duration-200 cursor-pointer flex items-center gap-2 ${
            filter === "side"
              ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-xs font-bold border border-zinc-200/80 dark:border-zinc-700"
              : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
          }`}
        >
          <Cpu size={14} />
          <span>Side & IoT Projects ({sideList.length})</span>
        </button>
      </div>

      {/* Projects Grid */}
      <motion.section
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
      >
        <AnimatePresence mode="popLayout">
          {displayedProjects.map((project, i) => (
            <motion.div
              layout
              key={project.name + project.id + project.projectCategory}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, delay: i * 0.04 }}
              className="bg-white dark:bg-[#121826] p-7 md:p-8 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 shadow-xs hover:border-zinc-400 dark:hover:border-zinc-600 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
              onClick={() => onSelectItem({ ...project, type: "project" })}
            >
              <div>
                {/* Category Badge & Thumbnail indicator */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-md font-semibold border ${
                      project.projectCategory === "enterprise"
                        ? "bg-zinc-100 dark:bg-zinc-800/90 text-zinc-700 dark:text-zinc-200 border-zinc-200 dark:border-zinc-700"
                        : "bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800"
                    }`}
                  >
                    {project.company || (project.projectCategory === "enterprise" ? "Enterprise" : "Side Project")}
                  </span>
                  <ArrowUpRight size={16} className="text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors" />
                </div>

                {/* Project Title */}
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-1 group-hover:text-black dark:group-hover:text-blue-400 transition-colors">
                  {project.name}
                </h3>

                {project.desc && (
                  <div className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 mb-3 uppercase tracking-wider">
                    {project.desc}
                  </div>
                )}

                <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed mb-6 line-clamp-3">
                  {project.description}
                </p>
              </div>

              <div>
                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 mb-6 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-mono bg-zinc-100 dark:bg-zinc-800/90 border border-zinc-200/80 dark:border-zinc-700 px-2 py-0.5 rounded text-zinc-700 dark:text-zinc-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* View details button */}
                <div className="flex items-center text-xs font-mono text-zinc-900 dark:text-white font-bold group-hover:gap-2 transition-all">
                  <span>VIEW DETAILS</span>
                  <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.section>
    </div>
  );
}
