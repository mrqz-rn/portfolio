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
      aria-label={label}
      title={label}
      className={`relative group p-2.5 rounded-xl transition-all duration-200 cursor-pointer ${
        active 
          ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700 shadow-xs' 
          : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100/60 dark:hover:bg-zinc-800/60'
      }`}
    >
      {icon}
      {label && (
        <span className="max-md:hidden absolute left-full ml-4 px-2 py-1 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 text-[10px] rounded shadow-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
          {label}
        </span>
      )}
      {active && (
        <motion.div 
          layoutId="nav-active"
          className="absolute inset-0 border border-zinc-300 dark:border-zinc-600 rounded-xl"
        />
      )}
    </button>
  );
}

