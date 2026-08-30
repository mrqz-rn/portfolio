import { motion } from "motion/react";
import { 
  BookOpen, 
  Calendar, 
  Sparkles, 
  Layers, 
  Cpu, 
  ShieldCheck, 
  MessageSquare, 
  Heart, 
  Clock, 
  CheckCircle2,
  Terminal,
  ArrowUpRight
} from "lucide-react";

export function BlogPlaceholder() {
  const upcomingTopics = [
    {
      title: "Enterprise HRIS & Payroll Architecture",
      subtitle: "Full-Stack Vue.js, Laravel, Complex DTR engines & MariaDB restructuring.",
      tag: "Systems Architecture",
      icon: <Layers size={18} className="text-blue-500" />
    },
    {
      title: "Real-Time Queuing & Dispatch Platforms",
      subtitle: "Sub-50ms WebSocket event broadcasting for Apple Authorized Service Centers.",
      tag: "WebSockets & Real-Time",
      icon: <Terminal size={18} className="text-emerald-500" />
    },
    {
      title: "Hardware-to-Cloud IoT Telemetry",
      subtitle: "Embedded ESP32 & Arduino prototypes streaming sensor data to cloud dashboards.",
      tag: "IoT & Hardware",
      icon: <Cpu size={18} className="text-purple-500" />
    }
  ];

  const features = [
    { label: "Technical Markdown Engine", desc: "Syntax-highlighted code blocks & live previews", icon: <CheckCircle2 size={15} className="text-emerald-500" /> },
    { label: "Community Discussions", desc: "Interactive comments & author replies", icon: <MessageSquare size={15} className="text-blue-500" /> },
    { label: "Post Reactions", desc: "Real-time reader like counts & engagement", icon: <Heart size={15} className="text-rose-500" /> },
    { label: "Instant Google & Email Auth", desc: "1-click authentication via Supabase", icon: <ShieldCheck size={15} className="text-amber-500" /> }
  ];

  return (
    <motion.section
      key="blog-placeholder"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="w-full max-w-4xl space-y-10"
    >
      {/* Top Banner & Status Card */}
      <div className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-b from-white to-zinc-50 dark:from-[#121826] dark:to-[#0a0f1d] border border-zinc-200/80 dark:border-zinc-800 shadow-xl overflow-hidden text-center md:text-left">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 dark:bg-blue-600/15 blur-[90px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/10 dark:bg-indigo-600/15 blur-[90px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl">
            {/* Status Chip */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/70 border border-blue-200/80 dark:border-blue-800 text-blue-700 dark:text-blue-300 font-mono text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span>UNDER ACTIVE DEPLOYMENT</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white font-mono leading-tight">
              Engineering Blog Underway
            </h2>

            <p className="text-zinc-600 dark:text-zinc-300 text-sm md:text-base leading-relaxed">
              A dedicated publishing module for in-depth system architecture teardowns, enterprise full-stack design patterns, real-time queues, and embedded IoT systems is currently undergoing final deployment.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-zinc-700 font-mono text-xs text-zinc-800 dark:text-zinc-200 font-semibold shadow-xs">
                <Calendar size={14} className="text-blue-500" />
                <span>Target Go-Live: <strong>September 13, 2026</strong></span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 font-mono text-xs text-emerald-700 dark:text-emerald-300 font-semibold shadow-xs">
                <Sparkles size={14} />
                <span>Staging in Progress</span>
              </div>
            </div>
          </div>

          {/* Graphic Icon Display */}
          <div className="relative shrink-0 flex items-center justify-center">
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-3xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-300">
              <BookOpen size={48} className="drop-shadow-md" />
            </div>
          </div>
        </div>
      </div>

      {/* Sneak Peek: Upcoming Articles */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-mono text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <Clock size={16} className="text-zinc-400" />
            <span>Upcoming Articles on Launch Day</span>
          </h3>
          <span className="font-mono text-xs text-zinc-400">Sneak Peek</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {upcomingTopics.map((topic, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white dark:bg-[#121826] border border-zinc-200/80 dark:border-zinc-800 space-y-3 shadow-xs hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 flex items-center justify-center">
                  {topic.icon}
                </div>
                <span className="px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-mono text-[10px] font-medium border border-zinc-200/80 dark:border-zinc-700">
                  {topic.tag}
                </span>
              </div>

              <h4 className="font-mono text-sm font-bold text-zinc-900 dark:text-white leading-snug">
                {topic.title}
              </h4>

              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {topic.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Module Capabilities Under Test */}
      <div className="p-7 rounded-3xl bg-white dark:bg-[#121826] border border-zinc-200/80 dark:border-zinc-800 shadow-xs space-y-4">
        <h3 className="font-mono text-xs uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-bold">
          Included Blog Features in Deployment
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((feat, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 rounded-2xl bg-zinc-50/70 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800">
              <div className="mt-0.5 shrink-0">{feat.icon}</div>
              <div>
                <div className="font-mono text-xs font-bold text-zinc-900 dark:text-white">
                  {feat.label}
                </div>
                <div className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                  {feat.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
