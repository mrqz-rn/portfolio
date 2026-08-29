import { ReactNode } from "react";

interface SocialIconProps {
  icon: ReactNode;
  href: string;
  label?: string;
}

export function SocialIcon({ icon, href, label }: SocialIconProps) {
  const computedLabel = label || (href.includes("github") ? "GitHub Profile" : href.includes("linkedin") ? "LinkedIn Profile" : "Social Link");

  return (
    <a 
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      aria-label={computedLabel}
      title={computedLabel}
      className="p-2 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/80 rounded-lg transition-colors inline-flex items-center justify-center cursor-pointer"
    >
      {icon}
    </a>
  );
}

