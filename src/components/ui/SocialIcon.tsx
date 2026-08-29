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
      className="p-3 text-nexus-muted hover:text-white transition-colors"
    >
      {icon}
    </a>
  );
}
