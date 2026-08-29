import { motion } from "motion/react";
import { 
  ArrowUpRight, 
  ArrowRight, 
  Award,
  Code2,
  Monitor,
  MessageSquare,
  Wrench
} from "lucide-react";
import { jobs, certs, services, works } from "../../data";

interface OverviewSectionProps {
  onNavigate?: (tab: string) => void;
  onSelectItem?: (item: any) => void;
}

export function OverviewSection({ onNavigate, onSelectItem }: OverviewSectionProps) {
  const featuredProjects = works.slice(0, 3);
  const stackPills = [
    "TypeScript", "Vue.js", "React", "Next.js", "Node.js", 
    "PHP", "CodeIgniter", "Laravel", "MySQL", "MariaDB", 
    "Ionic", "Tailwind CSS", "Git", "AWS"
  ];

  const getServiceIcon = (name: string) => {
    switch (name) {
      case "Mobile & PC Service": return <Monitor className="w-5 h-5 text-zinc-800" />;
      case "Software and Development": return <Code2 className="w-5 h-5 text-zinc-800" />;
      case "Free Consultation & Student Support": return <MessageSquare className="w-5 h-5 text-zinc-800" />;
      default: return <Wrench className="w-5 h-5 text-zinc-800" />;
    }
  };

  const getCertIcon = (cert: typeof certs[0]) => {
    if (cert.icon) {
      return <img src={cert.icon} alt={cert.issuer} className="w-8 h-8 object-contain" />;
    }
    return <Award className="w-8 h-8 text-zinc-800" />;
  };

  return (
    <motion.section 
      key="overview"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-4xl space-y-24"
    >
      {/* 01 — HERO INTRO (From Reference Image 3) */}
      <div className="space-y-12">
        <div className="flex flex-col md:flex-row gap-10 md:gap-14 items-start">
          {/* Stylized Profile Avatar */}
          <div className="w-36 h-36 md:w-44 md:h-44 rounded-3xl overflow-hidden bg-zinc-100 border border-zinc-200/90 shadow-md flex-shrink-0 relative group">
            <img 
              src="icons/user.jpg" 
              alt="Ron Marquez" 
              className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 transition-all duration-500"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Bio & Socials */}
          <div className="space-y-6 flex-1">
            <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 tracking-tight font-mono">
              Ron Marquez
            </h1>
            
            <div className="space-y-4 text-zinc-600 text-base md:text-lg leading-relaxed">
              <p>
                I&apos;m a systems developer. I build modern enterprise systems, web & mobile applications, and optimize digital business workflows.
              </p>
              <p>
                Right now I&apos;m building scalable solutions and internal tools. I love turning complex business requirements into clean, automated systems people actually use.
              </p>
            </div>

            {/* Social Text Links with Arrows */}
            <div className="flex flex-wrap items-center gap-6 pt-2 font-mono text-sm">
              <a 
                href="https://github.com/mrqz-rn" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-zinc-600 hover:text-zinc-950 flex items-center gap-1.5 transition-colors group font-medium"
              >
                <span>github</span>
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a 
                href="https://www.linkedin.com/in/ronmarquez/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-zinc-600 hover:text-zinc-950 flex items-center gap-1.5 transition-colors group font-medium"
              >
                <span>linkedin</span>
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a 
                href="mailto:marquez.ronrons@gmail.com" 
                className="text-zinc-600 hover:text-zinc-950 flex items-center gap-1.5 transition-colors group font-medium"
              >
                <span>email</span>
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* Metric / Stats Strip (From Reference Image 3) */}
        <div className="grid grid-cols-3 border-y border-zinc-200 py-6">
          <div className="px-4 py-2 border-r border-zinc-200">
            <div className="text-2xl font-bold text-zinc-900 flex items-center gap-1 font-mono">
              3+ yrs <ArrowUpRight size={14} className="text-zinc-400 text-xs" />
            </div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mt-1">Experience</div>
          </div>

          <div className="px-4 py-2 border-r border-zinc-200">
            <div className="text-2xl font-bold text-zinc-900 flex items-center gap-1 font-mono">
              4+ <ArrowUpRight size={14} className="text-zinc-400 text-xs" />
            </div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mt-1">Companies</div>
          </div>

          <div className="px-4 py-2">
            <div className="text-2xl font-bold text-zinc-900 flex items-center gap-1 font-mono">
              20+ <ArrowUpRight size={14} className="text-zinc-400 text-xs" />
            </div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mt-1">Tech Stack</div>
          </div>
        </div>
      </div>

      {/* 02 — PROJECTS SECTION (From Reference Image 2) */}
      <div className="space-y-8">
        <div className="flex items-center justify-between border-b border-zinc-200 pb-4">
          <span className="font-mono text-xs uppercase tracking-widest text-zinc-500">
            02 — projects
          </span>
          <button 
            onClick={() => onNavigate?.("projects")}
            className="font-mono text-xs uppercase tracking-widest text-zinc-600 hover:text-zinc-950 flex items-center gap-1.5 transition-colors font-medium cursor-pointer"
          >
            <span>ALL PROJECTS</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Featured Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProjects.map((project, idx) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-xs hover:border-zinc-400 hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer"
              onClick={() => {
                if (onSelectItem) {
                  onSelectItem({ ...project, type: 'project' });
                } else if (onNavigate) {
                  onNavigate("projects");
                }
              }}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-md bg-zinc-100 text-zinc-700 border border-zinc-200/80 font-medium">
                    {project.company || "Project"}
                  </span>
                  <ArrowUpRight size={16} className="text-zinc-400 group-hover:text-zinc-900 transition-colors" />
                </div>
                
                <h3 className="text-lg font-bold text-zinc-900 group-hover:text-black transition-colors mb-2">
                  {project.name}
                </h3>
                
                <p className="text-zinc-600 text-xs leading-relaxed line-clamp-3 mb-4">
                  {project.desc || project.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-zinc-100">
                {project.tech?.slice(0, 3).map((t: string) => (
                  <span key={t} className="text-[10px] font-mono bg-zinc-50 border border-zinc-200/60 px-2 py-0.5 rounded text-zinc-600">
                    {t}
                  </span>
                ))}
                {project.tech && project.tech.length > 3 && (
                  <span className="text-[10px] font-mono text-zinc-400 self-center">
                    +{project.tech.length - 3}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 03 — EXPERIENCE SECTION (From Reference Image 2) */}
      <div className="space-y-8">
        <div className="flex items-center justify-between border-b border-zinc-200 pb-4">
          <span className="font-mono text-xs uppercase tracking-widest text-zinc-500">
            03 — experience
          </span>
          <button 
            onClick={() => onNavigate?.("experience")}
            className="font-mono text-xs uppercase tracking-widest text-zinc-600 hover:text-zinc-950 flex items-center gap-1.5 transition-colors font-medium cursor-pointer"
          >
            <span>FULL HISTORY</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Experience Compact Timeline List */}
        <div className="space-y-1">
          {jobs.map((job) => (
            <div 
              key={job.company + job.position}
              onClick={() => onNavigate?.("experience")}
              className="flex flex-col md:flex-row md:items-center justify-between py-4 px-4 rounded-xl hover:bg-zinc-50 transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-6">
                <span className="font-mono text-xs text-zinc-400 w-16">
                  {job.start.split(/\s+/)[1] || job.start}
                </span>
                <span className="font-bold text-zinc-900 group-hover:text-black transition-colors">
                  {job.position}
                </span>
              </div>
              <div className="text-zinc-500 font-mono text-xs mt-1 md:mt-0 flex items-center gap-2">
                <span className="font-medium text-zinc-700">{job.company}</span>
                {job.location && (
                  <>
                    <span>·</span>
                    <span>{job.location}</span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* STACK CHIPS (From Reference Image 2) */}
        <div className="pt-6 border-t border-zinc-200 space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-widest text-zinc-500">
              STACK
            </span>
            <button 
              onClick={() => onNavigate?.("stack")}
              className="font-mono text-xs uppercase tracking-widest text-zinc-600 hover:text-zinc-950 flex items-center gap-1.5 transition-colors font-medium cursor-pointer"
            >
              <span>VIEW ALL</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {stackPills.map((skill) => (
              <span 
                key={skill}
                className="px-3.5 py-1.5 rounded-xl bg-zinc-50 border border-zinc-200/80 text-zinc-700 hover:text-zinc-950 hover:border-zinc-300 font-mono text-xs transition-colors"
              >
                {skill}
              </span>
            ))}
            <button 
              onClick={() => onNavigate?.("stack")}
              className="px-3.5 py-1.5 rounded-xl border border-dashed border-zinc-300 text-zinc-500 hover:text-zinc-900 font-mono text-xs transition-colors cursor-pointer"
            >
              + more
            </button>
          </div>
        </div>
      </div>

      {/* 04 — CERTIFICATIONS (From Reference Image 1) */}
      <div className="space-y-8">
        <div className="flex items-center justify-between border-b border-zinc-200 pb-4">
          <span className="font-mono text-xs uppercase tracking-widest text-zinc-500">
            04 — certifications
          </span>
          <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">
            OFFICIAL CERTIFICATIONS
          </span>
        </div>

        {/* Certification Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {certs.map((cert, idx) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white p-8 rounded-2xl border border-zinc-200/80 shadow-xs hover:border-zinc-400 hover:shadow-md transition-all flex flex-col items-center text-center justify-start group"
            >
              <div className="w-14 h-14 rounded-2xl bg-zinc-50 border border-zinc-200/80 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform p-3">
                {getCertIcon(cert)}
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-900 group-hover:text-black transition-colors leading-snug">
                  {cert.title}
                </h3>
                <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
                  {cert.issuer}
                </div>
                <div className="text-[10px] font-mono text-zinc-400">
                  {cert.issued}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 05 — SERVICES / HIGHLIGHTS (From Reference Image 1) */}
      <div className="space-y-8">
        <div className="flex items-center justify-between border-b border-zinc-200 pb-4">
          <span className="font-mono text-xs uppercase tracking-widest text-zinc-500">
            05 — services
          </span>
          <button 
            onClick={() => onNavigate?.("connect")}
            className="font-mono text-xs uppercase tracking-widest text-zinc-600 hover:text-zinc-950 flex items-center gap-1.5 transition-colors font-medium cursor-pointer"
          >
            <span>GET IN TOUCH</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <motion.div 
              key={service.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-xs hover:border-zinc-400 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-zinc-100 flex items-center justify-center mb-4 text-zinc-800">
                  {getServiceIcon(service.name)}
                </div>
                <h3 className="text-base font-bold text-zinc-900 mb-4 group-hover:text-black transition-colors">
                  {service.name}
                </h3>
                <ul className="space-y-2 mb-6">
                  {service.jobs.map(job => (
                    <li key={job.title} className="text-xs text-zinc-600 leading-relaxed flex items-start gap-2">
                      <span className="text-zinc-400">•</span>
                      <span>{job.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
