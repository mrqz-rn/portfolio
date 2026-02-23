import { ReactNode } from "react";

interface SocialIconProps {
  icon: ReactNode;
  href: string;
}

export function SocialIcon({ icon, href }: SocialIconProps) {
  return (
    <a 
      href={href}
      className="p-3 text-nexus-muted hover:text-white transition-colors"
    >
      {icon}
    </a>
  );
}
