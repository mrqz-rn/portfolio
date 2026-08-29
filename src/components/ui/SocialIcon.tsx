import { ReactNode } from "react";

interface SocialIconProps {
  icon: ReactNode;
  href: string;
}

export function SocialIcon({ icon, href }: SocialIconProps) {
  return (
    <a 
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="p-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors inline-flex items-center justify-center"
    >
      {icon}
    </a>
  );
}
