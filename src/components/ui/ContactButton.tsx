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
          ? 'bg-zinc-900 text-white hover:bg-black shadow-xs hover:scale-102' 
          : 'bg-white border border-zinc-200 text-zinc-700 hover:text-zinc-950 hover:bg-zinc-50 hover:border-zinc-300'
      }`}
    >
      {icon}
      {label}
    </a>
  );
}
