import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";
import { works } from "../../data";

interface ProjectsSectionProps {
  onSelectItem: (item: any) => void;
}

export function ProjectsSection({ onSelectItem }: ProjectsSectionProps) {
  return (
    <div className="space-y-12 w-full">
      <div>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 mb-4 font-mono">
          projects
        </h2>
        <p className="text-zinc-600 text-base md:text-lg leading-relaxed max-w-3xl">
          Featured enterprise platforms, web applications, and digital systems built for production.
        </p>
      </div>
    
      <motion.section 
        key="projects-works"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {works.map((project, i) => (
          <motion.div 
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-8 rounded-2xl border border-zinc-200/80 shadow-xs hover:border-zinc-400 hover:shadow-md transition-all cursor-pointer flex flex-col group"
            onClick={() => onSelectItem({ ...project, type: 'project' })}
          >
            <h3 className="text-xl font-bold text-zinc-900 mb-1 group-hover:text-black transition-colors">{project.name}</h3>
            {project.desc && <div className="text-[10px] font-mono text-zinc-500 mb-3 uppercase tracking-wider">{project.desc}</div>}
            <p className="text-zinc-600 text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {project.tech.map(t => (
                <span key={t} className="text-[11px] font-mono bg-zinc-50 border border-zinc-200/70 px-2 py-0.5 rounded text-zinc-600">
                  {t}
                </span>
              ))}
            </div>
            <div className="flex items-center text-xs font-mono text-zinc-900 font-bold group-hover:gap-2 transition-all">
              VIEW DETAILS <ChevronRight size={14} />
            </div>
          </motion.div>
        ))}
      </motion.section>
    </div>
  );
}
