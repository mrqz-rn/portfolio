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
      className="p-2 text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/80 rounded-lg transition-colors inline-flex items-center justify-center"
    >
      {icon}
    </a>
  );
}
