import { motion } from "motion/react";
import { Briefcase, ChevronRight } from "lucide-react";
import { jobs } from "../../data";

interface ExperienceSectionProps {
  onSelectItem: (item: any) => void;
}

export function ExperienceSection({ onSelectItem }: ExperienceSectionProps) {
  return (
    <motion.section 
      key="experience"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      <h2 className="text-3xl font-bold tracking-tight mb-8 flex items-center gap-3">
        <Briefcase className="text-nexus-accent" />
        Work Experience
      </h2>
      <div className="space-y-8">
        {jobs.map((exp, i) => (
          <motion.div 
            key={exp.company + exp.position}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass p-8 rounded-2xl relative overflow-hidden group cursor-pointer"
            onClick={() => onSelectItem({ ...exp, type: 'job' })}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-2xl font-bold group-hover:text-nexus-accent transition-colors">{exp.position}</h3>
                <div className="flex items-center gap-2 text-nexus-muted font-mono text-sm mt-1">
                  <span className="text-white font-bold">{exp.company}</span>
                  <span>•</span>
                  <span>{exp.location}</span>
                </div>
              </div>
              <div className="px-4 py-1 rounded-full bg-white/5 border border-white/10 text-nexus-accent font-mono text-xs">
                {exp.start} — {exp.end}
              </div>
            </div>
            <p className="text-nexus-muted leading-relaxed mb-6">
              {exp.summary}
            </p>
            <div className="flex items-center text-xs font-mono text-nexus-accent group-hover:gap-2 transition-all">
              VIEW DETAILS <ChevronRight size={14} />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
