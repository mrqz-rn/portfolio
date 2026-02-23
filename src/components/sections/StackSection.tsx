import { motion } from "motion/react";
import { Code2, Cpu } from "lucide-react";
import { skills } from "../../data";
import { StatCard } from "../ui/StatCard";

export function StackSection() {
  return (
    <motion.section 
      key="stack"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-12"
    >
      <div className="space-y-8">
        <h2 className="text-3xl font-bold tracking-tight">Technical <span className="text-nexus-accent">Arsenal</span></h2>
        {/* <p className="text-nexus-muted leading-relaxed">
          My technical skills are categorized to reflect my proficiency across different domains of software development and system maintenance.
        </p> */}
        <div className="grid grid-cols-1 gap-6">
          {skills.map(cat => (
            <div key={cat.type} className="glass p-6 rounded-2xl">
              <div className="text-[10px] font-mono text-nexus-accent mb-4 uppercase tracking-widest">{cat.type}</div>
              <div className="flex flex-wrap gap-3">
                {cat.items.map(skill => (
                  <div key={typeof skill === 'string' ? skill : skill.name} className="flex flex-col items-center gap-2 group">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-nexus-accent/10 transition-all border border-white/5 group-hover:border-nexus-accent/30">
                      {/* <Code2 size={20} className="text-nexus-muted group-hover:text-nexus-accent" /> */}
                      <img src={typeof skill === 'string' ? skill : `/tech/${skill.icon}`} alt={typeof skill === 'string' ? skill : skill.name} className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono text-nexus-muted group-hover:text-white">
                      {typeof skill === 'string' ? skill : skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-8">
        <div className="glass rounded-2xl p-8 flex items-center justify-center relative overflow-hidden h-64">
          <div className="absolute inset-0 bg-nexus-accent/5 animate-pulse" />
          <div className="relative z-10 text-center">
            <div className="w-24 h-24 rounded-full bg-nexus-accent/10 flex items-center justify-center mx-auto mb-6 border border-nexus-accent/20">
              <Cpu className="text-nexus-accent w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold mb-2">System Development</h3>
            <p className="text-sm text-nexus-muted max-w-xs mx-auto">
              Specializing in internal enterprise solutions and digital transformation.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <StatCard label="Languages" value="9+" />
          <StatCard label="Frameworks" value="8+" />
          <StatCard label="Tools" value="6+" />
          <StatCard label="Platforms" value="3+" />
        </div>
      </div>
    </motion.section>
  );
}
