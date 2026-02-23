import { motion } from "motion/react";
import { Mail, Phone, Globe, Wrench, Monitor, Code2, MessageSquare, Zap } from "lucide-react";
import { services, certs } from "../../data";

export function OverviewSection() {
  const getServiceIcon = (name: string) => {
    switch (name) {
      case "Mobile & PC Service": return <Monitor className="w-6 h-6" />;
      case "Software and Development": return <Code2 className="w-6 h-6" />;
      case "Free Consultation & Student Support": return <MessageSquare className="w-6 h-6" />;
      default: return <Wrench className="w-6 h-6" />;
    }
  };

  return (
    <motion.section 
      key="overview"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-20"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <h2 className="text-5xl font-bold tracking-tighter leading-none">
            Building digital <span className="text-nexus-accent">ecosystems</span> with precision.
          </h2>
          <p className="text-nexus-muted text-lg leading-relaxed max-w-2xl">
            As a Systems Developer, I bridge the gap between complex business requirements and innovative technical solutions. My focus is on creating scalable internal systems that drive operational efficiency.
          </p>
          <div className="flex flex-wrap gap-4">
            {/* <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono">
              <div className="w-2 h-2 rounded-full bg-nexus-accent animate-pulse" />
              AVAILABLE_FOR_PROJECTS
            </div> */}
            {/* <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono">
              BASED_IN_PHILIPPINES
            </div> */}
          </div>
        </div>
        
        <div className="glass p-8 rounded-3xl border border-white/10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            {/* <Globe size={80} /> */}
          </div>
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-nexus-accent">
            <Mail className="w-5 h-5" />
            Quick Contact
          </h2>
          <div className="space-y-4 font-mono text-sm">
            <div className="flex items-center gap-4 text-nexus-muted">
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-nexus-accent">
                <Mail size={18} />
              </div>
              <div>
                <div className="text-[10px] uppercase text-nexus-accent/50">Email</div>
                marquez.ronrons@gmail.com
              </div>
            </div>
            <div className="flex items-center gap-4 text-nexus-muted">
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-nexus-accent">
                <Phone size={18} />
              </div>
              <div>
                <div className="text-[10px] uppercase text-nexus-accent/50">Phone</div>
                +63 9272612719
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
          {/* <Wrench className="text-nexus-accent w-6 h-6" /> */}
          Services Offered
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div 
              key={service.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass p-8 rounded-2xl hover:border-nexus-accent/30 transition-all"
            >
              <div className="flex items-center mb-4">
               <div className="w-12 h-12 rounded-xl bg-nexus-accent/10 flex items-center justify-center text-nexus-accent">
                {getServiceIcon(service.name)}
              </div>
              <h3 className="text-lg font-bold mx-2">{service.name}</h3>
              </div>
           
              <ul className="space-y-2">
                {service.jobs.map(job => (
                  <li key={job.title} className="text-[14px] text-nexus-muted flex items-start gap-2">
                    <span className="text-nexus-accent">*</span>
                    {job.title}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
          {/* <Zap className="text-nexus-accent w-6 h-6" /> */}
          Certifications
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certs.map((cert, i) => (
            <motion.div 
              key={cert.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass p-6 rounded-2xl border border-white/5 hover:border-nexus-accent/30 transition-all group"
            >
              {/* <div className="w-2 h-2 rounded-full bg-nexus-accent mb-4 group-hover:scale-150 transition-transform" /> */}
              <h3 className="font-bold mb-2 group-hover:text-nexus-accent transition-colors">{cert.title}</h3>
              <div className="flex justify-between items-center text-[14px] font-mono text-nexus-muted">
                <span>{cert.issuer}</span>
                <span className="text-nexus-accent">{cert.issued}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
