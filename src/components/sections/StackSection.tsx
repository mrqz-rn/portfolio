import { motion } from "motion/react";
import { Cpu } from "lucide-react";
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
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 font-mono">
          Technical Arsenal
        </h2>
        <div className="grid grid-cols-1 gap-6">
          {skills.map(cat => (
            <div key={cat.type} className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-xs">
              <div className="text-[11px] font-mono text-zinc-500 mb-4 uppercase tracking-widest font-semibold">{cat.type}</div>
              <div className="flex flex-wrap gap-3">
                {cat.items.map(skill => (
                  <div key={typeof skill === 'string' ? skill : skill.name} className="flex flex-col items-center gap-2 group">
                    <div className="w-12 h-12 rounded-xl bg-zinc-50 flex items-center justify-center group-hover:bg-zinc-100 transition-all border border-zinc-200/80 group-hover:border-zinc-300">
                      <img 
                        src={typeof skill === 'string' ? skill : `/tech/${skill.icon}`} 
                        alt={typeof skill === 'string' ? skill : skill.name} 
                        className="w-6 h-6 object-contain" 
                        loading="eager"
                        decoding="async"
                        width={24}
                        height={24}
                      />
                    </div>
                    <span className="text-[10px] font-mono text-zinc-500 group-hover:text-zinc-900 font-medium">
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
        <div className="bg-white rounded-2xl border border-zinc-200/80 p-8 flex items-center justify-center relative overflow-hidden h-64 shadow-xs">
          <div className="relative z-10 text-center">
            <div className="w-20 h-20 rounded-2xl bg-zinc-100 flex items-center justify-center mx-auto mb-5 border border-zinc-200">
              <Cpu className="text-zinc-800 w-9 h-9" />
            </div>
            <h3 className="text-xl font-bold text-zinc-900 mb-2 font-mono">System Development</h3>
            <p className="text-sm text-zinc-600 max-w-xs mx-auto leading-relaxed">
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
