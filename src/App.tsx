import { motion, AnimatePresence } from "motion/react";
import { 
  Terminal, 
  Cpu, 
  Globe, 
  Layers, 
  Github, 
  Linkedin, 
  MapPin, 
  Briefcase
} from "lucide-react";
import { useState, useEffect } from "react";

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

export default function App() {
  const [activeTab, setActiveTab] = useState("overview");
  const [time, setTime] = useState(new Date());
  const [selectedItem, setSelectedItem] = useState<any>(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const closeModal = () => setSelectedItem(null);

  return (
    <div className="min-h-screen grid-pattern relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-nexus-accent/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-nexus-secondary/10 blur-[120px] rounded-full" />

      {/* Navigation Rail */}
      <nav className="fixed left-0 top-0 h-full w-20 border-r border-white/5 glass flex flex-col items-center py-8 z-50 max-md:hidden">
        <div className="w-12 h-12 rounded-full overflow-hidden mb-12 border-2 border-nexus-accent/50 neon-glow">
          <img 
            src="https://picsum.photos/seed/ronron/200/200" 
            alt="Ron-Ron Marquez" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <div className="flex-1 flex flex-col gap-8">
          <NavIcon icon={<Terminal />} active={activeTab === "overview"} onClick={() => setActiveTab("overview")} label="Overview" />
          <NavIcon icon={<Briefcase />} active={activeTab === "experience"} onClick={() => setActiveTab("experience")} label="Experience" />
          <NavIcon icon={<Layers />} active={activeTab === "projects"} onClick={() => setActiveTab("projects")} label="Projects" />
          <NavIcon icon={<Cpu />} active={activeTab === "stack"} onClick={() => setActiveTab("stack")} label="Stack" />
          <NavIcon icon={<Globe />} active={activeTab === "connect"} onClick={() => setActiveTab("connect")} label="Connect" />
        </div>

        <div className="flex flex-col gap-4 mt-auto">
          <SocialIcon icon={<Github />} href="#" />
          <SocialIcon icon={<Linkedin />} href="#" />
        </div>
      </nav>

      {/* Mobile Nav */}
      <nav className="fixed bottom-0 left-0 w-full h-16 glass border-t border-white/5 flex items-center justify-around z-50 md:hidden px-4">
        <NavIcon icon={<Terminal />} active={activeTab === "overview"} onClick={() => setActiveTab("overview")} />
        <NavIcon icon={<Briefcase />} active={activeTab === "experience"} onClick={() => setActiveTab("experience")} />
        <NavIcon icon={<Layers />} active={activeTab === "projects"} onClick={() => setActiveTab("projects")} />
        <NavIcon icon={<Cpu />} active={activeTab === "stack"} onClick={() => setActiveTab("stack")} />
        <NavIcon icon={<Globe />} active={activeTab === "connect"} onClick={() => setActiveTab("connect")} />
      </nav>

      {/* Main Content Area */}
      <main className="md:ml-20 min-h-screen p-6 md:p-12 lg:p-20">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-nexus-accent/10 text-nexus-accent text-[12px] font-mono tracking-widest uppercase border border-nexus-accent/20 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-nexus-accent animate-pulse" />
                Systems Developer
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">
              RON <span className="text-nexus-muted">MARQUEZ</span>
            </h1>
            <div className="flex items-center gap-4 text-nexus-muted font-mono text-sm mb-6">
              <span className="flex items-center gap-2"><MapPin size={14} /> Antipolo City, Philippines</span>
            </div>
            <div className="glass px-6 py-3 rounded-xl inline-flex items-center gap-3 text-sm border-nexus-accent/20">
              <span className="text-xl">👋</span>
              <span className="text-nexus-muted">Open for part-time, service & commission</span>
            </div>
          </motion.div>

          {/* <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-right font-mono text-xs text-nexus-muted hidden lg:block"
          >
            <div className="mb-1">SYSTEM_TIME: {time.toLocaleTimeString()}</div>
            <div className="mb-1">STATUS: ONLINE_AND_READY</div>
            <div>UPTIME: 100%</div>
          </motion.div> */}
        </header>

        {/* Content Sections */}
        <AnimatePresence mode="wait">
          {activeTab === "overview" && <OverviewSection />}
          {activeTab === "experience" && <ExperienceSection onSelectItem={setSelectedItem} />}
          {activeTab === "projects" && <ProjectsSection onSelectItem={setSelectedItem} />}
          {activeTab === "stack" && <StackSection />}
          {activeTab === "connect" && <ConnectSection />}
        </AnimatePresence>
      </main>

      {/* Modal */}
      <Modal isOpen={!!selectedItem} onClose={closeModal} item={selectedItem} />

      {/* Footer Decoration */}
      <footer className="md:ml-20 p-8 border-t border-white/5 font-mono text-[10px] text-nexus-muted flex justify-between items-center max-md:pb-24">
        <div>© 2026 RON MARQUEZ - PORTFOLIO</div>
        <div className="flex gap-4">
          {/* <span>BUILD_STATUS: SUCCESS</span>
          <span className="text-nexus-accent">ENCRYPTION: AES-256</span> */}
        </div>
      </footer>
    </div>
  );
}
