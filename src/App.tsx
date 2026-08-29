import { motion, AnimatePresence } from "motion/react";
import { 
  Terminal, 
  Cpu, 
  Globe, 
  Layers, 
  Github, 
  Linkedin, 
  MapPin, 
  Briefcase,
  Activity,
  Moon,
  Sun,
  Coffee,
  Sunrise,
  Clock,
  Smile,
  Zap,
  Keyboard,
  Wrench
} from "lucide-react";
import { useState, useEffect } from "react";
import { getMyStatus } from "./data";

// UI Components
import { NavIcon } from "./components/ui/NavIcon";
import { SocialIcon } from "./components/ui/SocialIcon";
import { Modal } from "./components/ui/Modal";
import { ChatBot } from "./components/chat/ChatBot";

// Section Components
import { OverviewSection } from "./components/sections/OverviewSection";
import { ExperienceSection } from "./components/sections/ExperienceSection";
import { ProjectsSection } from "./components/sections/ProjectsSection";
import { StackSection } from "./components/sections/StackSection";
import { ServicesSection } from "./components/sections/ServicesSection";
import { ConnectSection } from "./components/sections/ConnectSection";

import { preloadAssets } from "./utils/preload";
import { Analytics } from "@vercel/analytics/react";

export default function App() {
  const [activeTab, setActiveTab] = useState("overview");
  const [time, setTime] = useState(new Date());
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved === "light" || saved === "dark") return saved;
      return "light";
    }
    return "light";
  });

  const status = getMyStatus();

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const getStatusIcon = (statusText: string) => {
    const s = statusText.toLowerCase();
    if (s.includes('sleeping')) return <Moon size={28} className="text-indigo-400 animate-pulse" />;
    if (s.includes('resting')) return <Coffee size={28} className="text-amber-600" />;
    if (s.includes('grinding')) return <Keyboard size={28} className="text-nexus-accent animate-bounce" />;
    if (s.includes('starting')) return <Sunrise size={28} className="text-orange-400" />;
    if (s.includes('waiting')) return <Clock size={28} className="text-nexus-muted" />;
    if (s.includes('free')) return <Smile size={28} className="text-emerald-400" />;
    return <Activity size={28} />;
  };

  useEffect(() => {
    preloadAssets();
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const closeModal = () => setSelectedItem(null);

  return (
    <div className="min-h-screen bg-[#f5f7ff] dark:bg-[#090d16] grid-pattern relative overflow-hidden text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
      {/* Background Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/5 dark:bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/5 dark:bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Mobile Top Header */}
      <header className="w-full md:hidden flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-[#f5f7ff]/90 dark:bg-[#090d16]/90 backdrop-blur-xl sticky top-0 z-40">
        <div className="font-bold text-sm text-zinc-900 dark:text-white font-mono">Ron Marquez</div>
        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-mono text-zinc-700 dark:text-zinc-200 shadow-xs cursor-pointer active:scale-95 transition-all"
          aria-label="Toggle theme"
        >
          {theme === "light" ? (
            <>
              <Sun size={13} className="text-amber-500" />
              <span>Light</span>
            </>
          ) : (
            <>
              <Moon size={13} className="text-blue-400" />
              <span>Dark</span>
            </>
          )}
        </button>
      </header>

      {/* Extended Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 border-r border-zinc-200/80 dark:border-zinc-800/80 bg-white/90 dark:bg-[#0f1422]/90 backdrop-blur-xl flex flex-col justify-between p-6 z-50 max-md:hidden overflow-y-auto custom-scrollbar">
        {/* Top Header */}
        <div>
          <div className="mb-8 px-3">
            <h2 className="font-bold text-base text-zinc-900 dark:text-white tracking-tight">Ron Marquez</h2>
          </div>

          {/* Nav Links */}
          <div className="space-y-6">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 px-3 mb-2">Navigation</div>
              <nav className="space-y-1">
                {[
                  { id: "overview", label: "Overview", icon: <Terminal size={16} /> },
                  { id: "experience", label: "Experience", icon: <Briefcase size={16} /> },
                  { id: "projects", label: "Projects", icon: <Layers size={16} /> },
                  { id: "stack", label: "Stack", icon: <Cpu size={16} /> },
                  { id: "services", label: "Services", icon: <Wrench size={16} /> },
                  { id: "connect", label: "Connect", icon: <Globe size={16} /> },
                ].map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-mono transition-all duration-200 cursor-pointer ${
                        isActive
                          ? "bg-zinc-100 dark:bg-zinc-800/90 text-zinc-900 dark:text-white border border-zinc-200/80 dark:border-zinc-700 font-bold shadow-xs"
                          : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={isActive ? "text-zinc-900 dark:text-blue-400" : "text-zinc-400 dark:text-zinc-500"}>{item.icon}</span>
                        <span>{item.label}</span>
                      </div>
                      {isActive && <span className="text-zinc-900 dark:text-white text-xs">→</span>}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="space-y-4 pt-6 border-t border-zinc-200/80 dark:border-zinc-800/80">
          {/* Side Nav Theme Toggle */}
          <div className="space-y-1.5">
            <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 px-3">Theme</div>
            <div className="flex items-center p-1 rounded-xl bg-zinc-100/90 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800">
              <button
                onClick={() => setTheme("light")}
                className={`flex-1 flex items-center justify-center gap-2 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                  theme === "light"
                    ? "bg-white text-zinc-950 shadow-xs font-bold border border-zinc-200/70"
                    : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                }`}
              >
                <Sun size={13} className={theme === "light" ? "text-amber-500" : ""} />
                <span>Light</span>
              </button>
              <button
                onClick={() => setTheme("dark")}
                className={`flex-1 flex items-center justify-center gap-2 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                  theme === "dark"
                    ? "bg-white dark:bg-zinc-800 text-zinc-950 dark:text-white shadow-xs font-bold border border-zinc-200/80 dark:border-zinc-700"
                    : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                }`}
              >
                <Moon size={13} className={theme === "dark" ? "text-blue-400" : ""} />
                <span>Dark</span>
              </button>
            </div>
          </div>

          {/* Status Card */}
          <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/70 dark:border-zinc-800">
            <div className="flex items-center justify-between text-zinc-600 dark:text-zinc-400 text-[10px] font-mono mb-1">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                STATUS
              </span>
              <span className="text-emerald-700 dark:text-emerald-400 font-bold text-[10px]">{status.toUpperCase()}</span>
            </div>
            <div className="text-zinc-700 dark:text-zinc-300 text-[11px] font-mono truncate font-medium">
              {time.toLocaleTimeString()} PHT
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex items-center justify-between px-1">
            <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-wider font-medium">Socials</span>
            <div className="flex items-center gap-1">
              <SocialIcon icon={<Github size={16} />} href="https://github.com/mrqz-rn" label="GitHub Profile" />
              <SocialIcon icon={<Linkedin size={16} />} href="https://www.linkedin.com/in/ronmarquez/" label="LinkedIn Profile" />
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Nav */}
      <nav className="fixed bottom-0 left-0 w-full h-16 bg-white/95 dark:bg-[#0f1422]/95 backdrop-blur-xl border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-around z-50 md:hidden px-4">
        <NavIcon icon={<Terminal />} label="Overview" active={activeTab === "overview"} onClick={() => setActiveTab("overview")} />
        <NavIcon icon={<Briefcase />} label="Experience" active={activeTab === "experience"} onClick={() => setActiveTab("experience")} />
        <NavIcon icon={<Layers />} label="Projects" active={activeTab === "projects"} onClick={() => setActiveTab("projects")} />
        <NavIcon icon={<Cpu />} label="Stack" active={activeTab === "stack"} onClick={() => setActiveTab("stack")} />
        <NavIcon icon={<Wrench />} label="Services" active={activeTab === "services"} onClick={() => setActiveTab("services")} />
        <NavIcon icon={<Globe />} label="Connect" active={activeTab === "connect"} onClick={() => setActiveTab("connect")} />
      </nav>

      {/* Main Content Area */}
      <main className="md:ml-64 min-h-screen p-6 md:p-12 lg:p-16 flex flex-col items-center">
        <div className="w-full max-w-4xl mx-auto">
          {/* Content Sections */}
          <AnimatePresence mode="wait">
            {activeTab === "overview" && (
              <OverviewSection onNavigate={setActiveTab} onSelectItem={setSelectedItem} />
            )}
            {activeTab === "experience" && <ExperienceSection />}
            {activeTab === "projects" && <ProjectsSection onSelectItem={setSelectedItem} />}
            {activeTab === "stack" && <StackSection />}
            {activeTab === "services" && <ServicesSection onNavigate={setActiveTab} onSelectItem={setSelectedItem} />}
            {activeTab === "connect" && <ConnectSection />}
          </AnimatePresence>
        </div>
      </main>

      {/* Modal */}
      <Modal isOpen={!!selectedItem} onClose={closeModal} item={selectedItem} />

      {/* AI Assistant ChatBot */}
      <ChatBot />

      {/* Footer Decoration */}
      <footer className="md:ml-64 p-8 border-t border-zinc-200/80 dark:border-zinc-800/80 font-mono text-[10px] text-zinc-500 dark:text-zinc-400 max-md:pb-24">
        <div className="max-w-4xl mx-auto flex justify-between items-center w-full">
          <div>© 2026 RON MARQUEZ - PORTFOLIO</div>
          <div className="flex gap-4">
          </div>
        </div>
      </footer>

      {/* Vercel Web Analytics */}
      <Analytics />
    </div>
  );
}
