import { motion } from "motion/react";
import { Layers, ChevronRight } from "lucide-react";
import { works } from "../../data";

interface ProjectsSectionProps {
  onSelectItem: (item: any) => void;
}

export function ProjectsSection({ onSelectItem }: ProjectsSectionProps) {
  return (
    <motion.section 
      key="projects"
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
          className="glass p-8 rounded-2xl group hover:border-nexus-accent/30 transition-all cursor-pointer flex flex-col"
          onClick={() => onSelectItem({ ...project, type: 'project' })}
        >
          {/* <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-nexus-accent/10 transition-colors">
              <Layers className="text-nexus-muted group-hover:text-nexus-accent transition-colors" />
            </div>
            <span className="text-[10px] font-mono text-nexus-muted border border-white/10 px-2 py-1 rounded">
              PRODUCTION
            </span>
          </div> */}
          <h3 className="text-xl font-bold mb-1 group-hover:text-nexus-accent transition-colors">{project.name}</h3>
          {project.desc && <div className="text-[10px] font-mono text-nexus-accent mb-3 uppercase">{project.desc}</div>}
          <p className="text-nexus-muted text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tech.map(t => (
              <span key={t} className="text-[10px] font-mono bg-white/5 px-2 py-1 rounded text-nexus-muted">
                {t}
              </span>
            ))}
          </div>
          <div className="flex items-center text-xs font-mono text-nexus-accent group-hover:gap-2 transition-all">
            VIEW DETAILS <ChevronRight size={14} />
          </div>
        </motion.div>
      ))}
    </motion.section>
  );
}
