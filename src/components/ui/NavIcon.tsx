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
      className={`relative group p-2.5 rounded-xl transition-all duration-200 ${
        active 
          ? 'bg-zinc-100 text-zinc-900 border border-zinc-200' 
          : 'text-zinc-400 hover:text-zinc-900 hover:bg-zinc-50'
      }`}
    >
      {icon}
      {label && (
        <span className="absolute left-full ml-4 px-2 py-1 bg-white border border-zinc-200 text-zinc-800 text-[10px] rounded shadow-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
          {label}
        </span>
      )}
      {active && (
        <motion.div 
          layoutId="nav-active"
          className="absolute inset-0 border border-zinc-300 rounded-xl"
        />
      )}
    </button>
  );
}
