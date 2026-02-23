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
      className={`flex items-center gap-3 px-8 py-4 rounded-xl font-bold transition-all ${
        primary 
          ? 'bg-nexus-accent text-black hover:shadow-[0_0_30px_rgba(0,255,153,0.3)] hover:scale-105' 
          : 'glass border border-white/10 hover:bg-white/10'
      }`}
    >
      {icon}
      {label}
    </a>
  );
}
