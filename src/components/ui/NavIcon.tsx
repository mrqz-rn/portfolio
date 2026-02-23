import { motion } from "motion/react";
import { ReactNode } from "react";

interface NavIconProps {
  icon: ReactNode;
  active?: boolean;
  onClick: () => void;
  label?: string;
}

export function NavIcon({ icon, active, onClick, label }: NavIconProps) {
  return (
    <button 
      onClick={onClick}
      className={`relative group p-3 rounded-xl transition-all duration-300 ${active ? 'bg-nexus-accent/10 text-nexus-accent' : 'text-nexus-muted hover:text-white hover:bg-white/5'}`}
    >
      {icon}
      {label && (
        <span className="absolute left-full ml-4 px-2 py-1 bg-nexus-card border border-white/10 text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
          {label}
        </span>
      )}
      {active && (
        <motion.div 
          layoutId="nav-active"
          className="absolute left-0 top-0 w-full h-full border border-nexus-accent/30 rounded-xl neon-glow"
        />
      )}
    </button>
  );
}
