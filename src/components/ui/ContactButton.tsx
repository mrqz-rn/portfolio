import { ReactNode } from "react";

interface ContactButtonProps {
  icon: ReactNode;
  label: string;
  href: string;
  primary?: boolean;
}

export function ContactButton({ icon, label, href, primary }: ContactButtonProps) {
  return (
    <a 
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl font-mono text-xs font-semibold transition-all ${
        primary 
          ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-black dark:hover:bg-zinc-100 shadow-xs hover:scale-102' 
          : 'bg-white dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-700/80 hover:border-zinc-300 dark:hover:border-zinc-600'
      }`}
    >
      {icon}
      {label}
    </a>
  );
}
