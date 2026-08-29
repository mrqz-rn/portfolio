import { motion } from "motion/react";
import { 
  ArrowRight, 
  Code2, 
  Monitor, 
  Wrench, 
  CheckCircle2, 
  Layers,
  Cpu,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Clock
} from "lucide-react";
import { services } from "../../data";

interface ServicesSectionProps {
  onNavigate?: (tab: string) => void;
  onSelectItem?: (item: any) => void;
}

export function ServicesSection({ onNavigate }: ServicesSectionProps) {
  const getServiceIcon = (iconType?: string, name?: string) => {
    if (iconType === 'hardware' || name?.includes('Hardware') || name?.includes('Mobile & PC')) {
      return <Monitor className="w-5 h-5 text-zinc-800 dark:text-zinc-200" />;
    }
    if (iconType === 'code' || name?.includes('Software')) {
      return <Code2 className="w-5 h-5 text-zinc-800 dark:text-zinc-200" />;
    }
    return <Wrench className="w-5 h-5 text-zinc-800 dark:text-zinc-200" />;
  };

  return (
    <motion.section
      key="services"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="w-full max-w-4xl space-y-12"
    >
      {/* 05 — TOP BAR */}
      <div className="space-y-6">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white mb-3 font-mono">
            Engineering & Technical Solutions
          </h2>
          <p className="text-zinc-600 dark:text-zinc-300 text-base md:text-lg leading-relaxed max-w-3xl">
            Custom enterprise software architectures, architectural consulting, and precision hardware servicing engineered to production-level standards.
          </p>
        </div>
      </div>

      {/* CORE 3-PILLAR SERVICES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7 items-stretch">
        {/* PILLAR 1: Software & Systems Engineering */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-white dark:bg-[#121826] p-7 md:p-8 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 shadow-xs hover:border-zinc-400 dark:hover:border-zinc-600 hover:shadow-md transition-all flex flex-col justify-between group"
        >
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-2xl bg-zinc-100/90 dark:bg-zinc-800 border border-zinc-200/60 dark:border-zinc-700 flex items-center justify-center text-zinc-800 dark:text-zinc-200 group-hover:scale-105 transition-transform">
                <Code2 className="w-5 h-5 text-zinc-800 dark:text-zinc-200" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200/80 dark:border-zinc-700 font-semibold">
                Custom Scope
              </span>
            </div>

            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-1.5 group-hover:text-black dark:group-hover:text-blue-400 transition-colors tracking-tight">
              Software & Systems Engineering
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono mb-6 leading-relaxed">
              Enterprise Applications & Embedded Systems
            </p>

            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-2.5 text-zinc-700 dark:text-zinc-300 leading-relaxed">
                <span className="text-zinc-400 dark:text-zinc-500 font-mono text-xs mt-1 shrink-0">•</span>
                <div>
                  <span className="font-semibold text-zinc-900 dark:text-white">Custom Business Systems</span>
                  <div className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono mt-1 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200/70 dark:border-zinc-700 px-2 py-0.5 rounded inline-block">
                    CRM · HRIS · Inventory · LMS · QMS
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-2.5 text-zinc-700 dark:text-zinc-300 leading-relaxed">
                <span className="text-zinc-400 dark:text-zinc-500 font-mono text-xs mt-1 shrink-0">•</span>
                <span>Web & Mobile App Development</span>
              </li>
              <li className="flex items-start gap-2.5 text-zinc-700 dark:text-zinc-300 leading-relaxed">
                <span className="text-zinc-400 dark:text-zinc-500 font-mono text-xs mt-1 shrink-0">•</span>
                <span>AI Integrations & Smart Automation</span>
              </li>
              <li className="flex items-start gap-2.5 text-zinc-700 dark:text-zinc-300 leading-relaxed">
                <span className="text-zinc-400 dark:text-zinc-500 font-mono text-xs mt-1 shrink-0">•</span>
                <span>Open-Source System Customization</span>
              </li>
              <li className="flex items-start gap-2.5 text-zinc-700 dark:text-zinc-300 leading-relaxed">
                <span className="text-zinc-400 dark:text-zinc-500 font-mono text-xs mt-1 shrink-0">•</span>
                <span>IoT & Smart Device Programming</span>
              </li>
              <li className="flex items-start gap-2.5 text-zinc-700 dark:text-zinc-300 leading-relaxed">
                <span className="text-zinc-400 dark:text-zinc-500 font-mono text-xs mt-1 shrink-0">•</span>
                <span>Circuit & Hardware Prototype Design</span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* PILLAR 2: Technical Advisory & Consulting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-[#121826] p-7 md:p-8 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 shadow-xs hover:border-zinc-400 dark:hover:border-zinc-600 hover:shadow-md transition-all flex flex-col justify-between group"
        >
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-2xl bg-zinc-100/90 dark:bg-zinc-800 border border-zinc-200/60 dark:border-zinc-700 flex items-center justify-center text-zinc-800 dark:text-zinc-200 group-hover:scale-105 transition-transform">
                <Wrench className="w-5 h-5 text-zinc-800 dark:text-zinc-200" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-bold">
                20m Free Discovery
              </span>
            </div>

            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-1.5 group-hover:text-black dark:group-hover:text-blue-400 transition-colors tracking-tight">
              Technical Advisory & Consulting
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono mb-4 leading-relaxed">
              Architecture, Feasibility & Workflow Strategy
            </p>

            {/* Structured Rate Cards */}
            <div className="grid grid-cols-2 gap-2 mb-6 p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/70 dark:border-zinc-800">
              <div className="p-2.5 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-700 text-center">
                <div className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Discovery</div>
                <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400 font-mono mt-0.5">20m Free</div>
              </div>
              <div className="p-2.5 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-700 text-center">
                <div className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Advisory</div>
                <div className="text-sm font-bold text-zinc-900 dark:text-white font-mono mt-0.5">₱1k / hr</div>
              </div>
            </div>

            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-2.5 text-zinc-700 dark:text-zinc-300 leading-relaxed">
                <span className="text-zinc-400 dark:text-zinc-500 font-mono text-xs mt-1 shrink-0">•</span>
                <span>System Design & Tech Stack Selection</span>
              </li>
              <li className="flex items-start gap-2.5 text-zinc-700 dark:text-zinc-300 leading-relaxed">
                <span className="text-zinc-400 dark:text-zinc-500 font-mono text-xs mt-1 shrink-0">•</span>
                <span>Project Planning & Feasibility Roadmap</span>
              </li>
              <li className="flex items-start gap-2.5 text-zinc-700 dark:text-zinc-300 leading-relaxed">
                <span className="text-zinc-400 dark:text-zinc-500 font-mono text-xs mt-1 shrink-0">•</span>
                <span>Workflow Automation & App Integrations</span>
              </li>
              <li className="flex items-start gap-2.5 text-zinc-700 dark:text-zinc-300 leading-relaxed">
                <span className="text-zinc-400 dark:text-zinc-500 font-mono text-xs mt-1 shrink-0">•</span>
                <span>Hardware Parts & Component Sourcing</span>
              </li>
              <li className="flex items-start gap-2.5 text-zinc-700 dark:text-zinc-300 leading-relaxed">
                <span className="text-zinc-400 dark:text-zinc-500 font-mono text-xs mt-1 shrink-0">•</span>
                <span>Code Review & Developer Guidance</span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* PILLAR 3: Hardware / Mobile & PC Service */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white dark:bg-[#121826] p-7 md:p-8 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 shadow-xs hover:border-zinc-400 dark:hover:border-zinc-600 hover:shadow-md transition-all flex flex-col justify-between group"
        >
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-2xl bg-zinc-100/90 dark:bg-zinc-800 border border-zinc-200/60 dark:border-zinc-700 flex items-center justify-center text-zinc-800 dark:text-zinc-200 group-hover:scale-105 transition-transform">
                <Monitor className="w-5 h-5 text-zinc-800 dark:text-zinc-200" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200/80 dark:border-zinc-700 font-semibold">
                Hardware
              </span>
            </div>

            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-1.5 group-hover:text-black dark:group-hover:text-blue-400 transition-colors tracking-tight">
              Hardware / Mobile & PC Service
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono mb-6 leading-relaxed">
              Diagnostics, Maintenance & Repairs
            </p>

            <div className="space-y-2.5">
              <div className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/70 dark:border-zinc-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-zinc-900 dark:text-white">Basic diagnosis / checkup</div>
                  <div className="text-[10px] text-zinc-500 dark:text-zinc-400 font-mono">Hardware & fault detection</div>
                </div>
                <div className="text-xs font-bold text-zinc-900 dark:text-white font-mono">₱600</div>
              </div>

              <div className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/70 dark:border-zinc-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-zinc-900 dark:text-white">OS reinstall</div>
                  <div className="text-[10px] text-zinc-500 dark:text-zinc-400 font-mono">Clean OS & driver setup</div>
                </div>
                <div className="text-xs font-bold text-zinc-900 dark:text-white font-mono">₱1,200</div>
              </div>

              <div className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/70 dark:border-zinc-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-zinc-900 dark:text-white">PC cleaning / dust removal</div>
                  <div className="text-[10px] text-zinc-500 dark:text-zinc-400 font-mono">Deep clean & thermal repaste</div>
                </div>
                <div className="text-xs font-bold text-zinc-900 dark:text-white font-mono">₱800</div>
              </div>

              <div className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/70 dark:border-zinc-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-zinc-900 dark:text-white">Hardware installation (RAM, SSD, GPU, etc.)</div>
                  <div className="text-[10px] text-zinc-500 dark:text-zinc-400 font-mono">Component install & testing</div>
                </div>
                <div className="text-xs font-bold text-zinc-900 dark:text-white font-mono">₱600</div>
              </div>

              <div className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/70 dark:border-zinc-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-zinc-900 dark:text-white">Laptop screen replacement</div>
                  <div className="text-[10px] text-zinc-500 dark:text-zinc-400 font-mono">depending on unit model</div>
                </div>
                <div className="text-xs font-bold text-zinc-900 dark:text-white font-mono whitespace-nowrap">₱2.5k – ₱8k+</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>


      {/* 3-STEP ENGINEERING ENGAGEMENT LIFECYCLE */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="bg-white dark:bg-[#121826] p-7 md:p-8 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 shadow-xs space-y-6"
      >
        <div className="border-b border-zinc-100 dark:border-zinc-800 pb-4">
          <span className="font-mono text-xs uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-semibold">
            ENGAGEMENT LIFECYCLE
          </span>
          <h4 className="text-lg font-bold text-zinc-900 dark:text-white mt-1">
            Structured Execution Process
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2 p-4 rounded-2xl bg-zinc-50/70 dark:bg-zinc-900/70 border border-zinc-200/60 dark:border-zinc-800">
            <div className="text-xs font-bold font-mono text-zinc-900 dark:text-white flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-[10px] flex items-center justify-center font-bold">1</span>
              <span>Discovery & Scoping</span>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
              Technical requirement decomposition, architecture review, and milestone definition.
            </p>
          </div>

          <div className="space-y-2 p-4 rounded-2xl bg-zinc-50/70 dark:bg-zinc-900/70 border border-zinc-200/60 dark:border-zinc-800">
            <div className="text-xs font-bold font-mono text-zinc-900 dark:text-white flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-[10px] flex items-center justify-center font-bold">2</span>
              <span>Engineering & Testing</span>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
              Clean full-stack implementation, comprehensive unit testing, and iterative validation.
            </p>
          </div>

          <div className="space-y-2 p-4 rounded-2xl bg-zinc-50/70 dark:bg-zinc-900/70 border border-zinc-200/60 dark:border-zinc-800">
            <div className="text-xs font-bold font-mono text-zinc-900 dark:text-white flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-[10px] flex items-center justify-center font-bold">3</span>
              <span>Delivery & Handover</span>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
              Production deployment, complete documentation, and ongoing technical support.
            </p>
          </div>
        </div>
      </motion.div>

      {/* HIGH-IMPACT BOTTOM CTA BANNER */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="p-7 md:p-9 rounded-3xl bg-zinc-900 dark:bg-[#0c101c] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg border border-zinc-800 dark:border-zinc-700"
      >
        <div className="space-y-1.5 text-center md:text-left">
          <h4 className="text-xl md:text-2xl font-bold font-mono tracking-tight">
            Initiate a Project or Request Service
          </h4>
          <p className="text-zinc-400 text-xs md:text-sm max-w-lg leading-relaxed">
            Schedule a complimentary 20-minute discovery session, request an enterprise system quote, or arrange on-site hardware support.
          </p>
        </div>
        <button
          onClick={() => onNavigate?.("connect")}
          className="px-7 py-4 rounded-2xl bg-white text-zinc-950 hover:bg-zinc-100 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center gap-2 shrink-0 cursor-pointer shadow-sm hover:scale-[1.02]"
        >
          <span>Get in Touch</span>
          <ArrowRight size={14} />
        </button>
      </motion.div>
    </motion.section>
  );
}
