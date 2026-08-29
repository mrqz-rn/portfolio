import { motion } from "motion/react";
import { ExternalLink } from "lucide-react";
import { jobs } from "../../data";

interface ExperienceSectionProps {
  onSelectItem?: (item: any) => void;
}

function formatDuration(start: string, end: string, customDuration?: string): string {
  if (customDuration) return customDuration;

  const parseDate = (str: string): Date => {
    if (str.toLowerCase() === "present") {
      return new Date(); // Dynamically computes current real-time date
    }
    const parts = str.trim().split(/\s+/);
    const monthStr = parts[0] || "jan";
    const yearStr = parts[1] || `${new Date().getFullYear()}`;
    const months: Record<string, number> = {
      jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
      jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
    };
    const month = months[monthStr.toLowerCase().slice(0, 3)] ?? 0;
    const year = parseInt(yearStr, 10) || new Date().getFullYear();
    return new Date(year, month, 1);
  };

  try {
    const startDate = parseDate(start);
    const endDate = parseDate(end);
    let totalMonths = (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth()) + 1;
    if (totalMonths < 1) totalMonths = 1;

    const years = Math.floor(totalMonths / 12);
    const remainingMonths = totalMonths % 12;

    const parts: string[] = [];
    if (years > 0) {
      parts.push(`${years} ${years === 1 ? 'yr' : 'yrs'}`);
    }
    if (remainingMonths > 0) {
      parts.push(`${remainingMonths} ${remainingMonths === 1 ? 'mo' : 'mos'}`);
    }
    return parts.join(' ');
  } catch {
    return '';
  }
}

export function ExperienceSection({}: ExperienceSectionProps) {
  return (
    <motion.section 
      key="experience"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-4xl space-y-12"
    >
      {/* Header */}
      <div>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
          experience
        </h2>
        <p className="text-nexus-muted text-base md:text-lg leading-relaxed max-w-3xl">
          Over 3+ years building across systems development, software engineering, and website support — from internal enterprise platforms to scalable web solutions.
        </p>
      </div>

      {/* Timeline List */}
      <div className="relative space-y-16 pl-2 md:pl-0">
        {jobs.map((exp, i) => {
          const duration = formatDuration(exp.start, exp.end, (exp as any).duration);
          return (
            <motion.div 
              key={exp.company + exp.position}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="relative flex gap-6 md:gap-8 group"
            >
              {/* Timeline Spine & Avatar */}
              <div className="flex flex-col items-center flex-shrink-0 relative">
                {/* Avatar / Monogram Box */}
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-xs font-mono font-bold text-white shadow-inner relative z-10 overflow-hidden group-hover:border-nexus-accent/40 transition-colors p-2">
                  {exp.icon ? (
                    <img 
                      src={exp.icon} 
                      alt={exp.company} 
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        if (e.currentTarget.nextElementSibling) {
                          (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'block';
                        }
                      }}
                    />
                  ) : null}
                  <span 
                    className={`text-nexus-accent font-bold ${exp.icon ? 'hidden' : 'block'}`}
                  >
                    {exp.monogram || exp.company.slice(0, 2).toUpperCase()}
                  </span>
                </div>

                {/* Vertical connecting line */}
                {i !== jobs.length - 1 && (
                  <div className="w-[1px] bg-white/10 flex-grow mt-4" />
                )}
              </div>

              {/* Content Area */}
              <div className="flex-1 pb-4">
                {/* Company Info */}
                <div className="space-y-1 mb-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                      {exp.company}
                    </h3>
                    {exp.link && (
                      <a 
                        href={exp.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-nexus-muted hover:text-nexus-accent transition-colors"
                        title={`Visit ${exp.company}`}
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-nexus-muted font-mono text-xs md:text-sm">
                    {exp.employmentType && <span>{exp.employmentType}</span>}
                    {exp.location && (
                      <>
                        <span>·</span>
                        <span>{exp.location}</span>
                      </>
                    )}
                    {exp.workSetup && (
                      <>
                        <span>·</span>
                        <span>{exp.workSetup}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Sub-node / Role Timeline */}
                <div className="pl-4 md:pl-6 border-l border-white/10 relative space-y-4 my-6">
                  {/* Node dot */}
                  <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full border border-white/30 bg-[#0a0f18] group-hover:border-nexus-accent transition-colors" />

                  <div>
                    <h4 className="text-lg md:text-xl font-bold text-white">
                      {exp.position}
                    </h4>
                    <div className="text-nexus-muted font-mono text-xs tracking-wider mt-1 flex flex-wrap items-center gap-2">
                      <span className="text-nexus-muted/90">{exp.start} — {exp.end}</span>
                      {duration && (
                        <>
                          <span className="text-nexus-muted/40">•</span>
                          <span className="text-nexus-accent/90">{duration}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="text-nexus-muted text-sm md:text-base leading-relaxed">
                    {exp.summary}
                  </p>

                  {/* Detailed bullet points */}
                  {exp.details && exp.details.length > 0 && (
                    <ul className="space-y-2.5 pt-2">
                      {exp.details.map((detail, idx) => (
                        <li key={idx} className="text-nexus-muted text-sm leading-relaxed flex items-start gap-3">
                          <span className="text-nexus-accent font-mono text-xs mt-1 shrink-0">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Skills Chips */}
                  {exp.skills && exp.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-4">
                      {exp.skills.map((skill) => (
                        <span 
                          key={skill}
                          className="px-3 py-1 rounded-lg bg-white/[0.03] border border-white/10 text-nexus-muted hover:text-white hover:border-nexus-accent/30 font-mono text-xs transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
