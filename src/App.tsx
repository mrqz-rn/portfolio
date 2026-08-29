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
  Coffee,
  Sunrise,
  Clock,
  Smile,
  Zap,
  Keyboard
} from "lucide-react";
import { useState, useEffect } from "react";
import { getMyStatus } from "./data";

// UI Components
import { NavIcon } from "./components/ui/NavIcon";
import { SocialIcon } from "./components/ui/SocialIcon";
import { Modal } from "./components/ui/Modal";

// Section Components
import { OverviewSection } from "./components/sections/OverviewSection";
import { ExperienceSection } from "./components/sections/ExperienceSection";
import { ProjectsSection } from "./components/sections/ProjectsSection";
import { StackSection } from "./components/sections/StackSection";
import { ConnectSection } from "./components/sections/ConnectSection";

import { preloadAssets } from "./utils/preload";

export default function App() {
  const [activeTab, setActiveTab] = useState("overview");
  const [time, setTime] = useState(new Date());
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const status = getMyStatus();

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
    <div className="min-h-screen grid-pattern relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-nexus-accent/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-nexus-secondary/10 blur-[120px] rounded-full" />

      {/* Extended Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 border-r border-white/5 glass flex flex-col justify-between p-6 z-50 max-md:hidden overflow-y-auto custom-scrollbar">
        {/* Top Header */}
        <div>
          <div className="mb-8 px-3">
            <h2 className="font-bold text-base text-white tracking-tight">Ron Marquez</h2>
          </div>

          {/* Nav Links */}
          <div className="space-y-6">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-nexus-muted/50 px-3 mb-2">Navigation</div>
              <nav className="space-y-1">
                {[
                  { id: "overview", label: "Overview", icon: <Terminal size={16} /> },
                  { id: "experience", label: "Experience", icon: <Briefcase size={16} /> },
                  { id: "projects", label: "Projects", icon: <Layers size={16} /> },
                  { id: "stack", label: "Stack", icon: <Cpu size={16} /> },
                  { id: "connect", label: "Connect", icon: <Globe size={16} /> },
                ].map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-mono transition-all duration-200 ${
                        isActive
                          ? "bg-nexus-accent/10 text-nexus-accent border border-nexus-accent/20 font-bold"
                          : "text-nexus-muted hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={isActive ? "text-nexus-accent" : "text-nexus-muted"}>{item.icon}</span>
                        <span>{item.label}</span>
                      </div>
                      {isActive && <span className="text-nexus-accent text-xs">→</span>}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="space-y-4 pt-6 border-t border-white/5">
          {/* Status Card */}
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="flex items-center justify-between text-nexus-muted text-[10px] font-mono mb-1">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-nexus-accent animate-pulse" />
                STATUS
              </span>
              <span className="text-nexus-accent text-[10px]">{status.toUpperCase()}</span>
            </div>
            <div className="text-nexus-muted text-[11px] font-mono truncate">
              {time.toLocaleTimeString()} PHT
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex items-center justify-between px-1">
            <span className="text-[10px] font-mono text-nexus-muted uppercase tracking-wider">Socials</span>
            <div className="flex items-center gap-1">
              <SocialIcon icon={<Github size={16} />} href="#" />
              <SocialIcon icon={<Linkedin size={16} />} href="https://www.linkedin.com/in/ronmarquez/" />
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Nav */}
      <nav className="fixed bottom-0 left-0 w-full h-16 glass border-t border-white/5 flex items-center justify-around z-50 md:hidden px-4">
        <NavIcon icon={<Terminal />} active={activeTab === "overview"} onClick={() => setActiveTab("overview")} />
        <NavIcon icon={<Briefcase />} active={activeTab === "experience"} onClick={() => setActiveTab("experience")} />
        <NavIcon icon={<Layers />} active={activeTab === "projects"} onClick={() => setActiveTab("projects")} />
        <NavIcon icon={<Cpu />} active={activeTab === "stack"} onClick={() => setActiveTab("stack")} />
        <NavIcon icon={<Globe />} active={activeTab === "connect"} onClick={() => setActiveTab("connect")} />
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
            {activeTab === "connect" && <ConnectSection />}
          </AnimatePresence>
        </div>
      </main>

      {/* Modal */}
      <Modal isOpen={!!selectedItem} onClose={closeModal} item={selectedItem} />

      {/* Footer Decoration */}
      <footer className="md:ml-64 p-8 border-t border-white/5 font-mono text-[10px] text-nexus-muted max-md:pb-24">
        <div className="max-w-4xl mx-auto flex justify-between items-center w-full">
          <div>© 2026 RON MARQUEZ - PORTFOLIO</div>
          <div className="flex gap-4">
          </div>
        </div>
      </footer>
    </div>
  );
}
