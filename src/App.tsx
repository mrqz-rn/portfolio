import { motion, AnimatePresence } from "motion/react";
import { 
  Terminal, 
  Cpu, 
  Globe, 
  Layers, 
  Github, 
  Linkedin, 
  Briefcase,
  Activity,
  Moon,
  Sun,
  Coffee,
  Sunrise,
  Clock,
  Smile,
  Keyboard,
  Wrench,
  BookOpen,
  LogIn,
  LogOut,
  User as UserIcon,
  Sparkles
} from "lucide-react";
import { useState, useEffect } from "react";
import { getMyStatus } from "./data";

// UI Components
import { NavIcon } from "./components/ui/NavIcon";
import { SocialIcon } from "./components/ui/SocialIcon";
import { Modal } from "./components/ui/Modal";
import { ChatBot } from "./components/chat/ChatBot";
import { AuthModal } from "./components/auth/AuthModal";

// Contexts
import { AuthProvider, useAuth } from "./contexts/AuthContext";

// Section Components
import { OverviewSection } from "./components/sections/OverviewSection";
import { ExperienceSection } from "./components/sections/ExperienceSection";
import { ProjectsSection } from "./components/sections/ProjectsSection";
import { StackSection } from "./components/sections/StackSection";
import { ServicesSection } from "./components/sections/ServicesSection";
import { ConnectSection } from "./components/sections/ConnectSection";
import { BlogSection } from "./components/blog/BlogSection";
import { BlogPost } from "./lib/supabase";

import { preloadAssets } from "./utils/preload";

const KNOWN_TABS = ["overview", "experience", "projects", "blog", "stack", "services", "connect"];

function parseRoute(pathname: string): { tab: string; blogSlug: string | null } {
  const clean = pathname.replace(/^\/+|\/+$/g, "");
  if (!clean || clean === "overview") {
    return { tab: "overview", blogSlug: null };
  }

  if (clean.startsWith("blog/")) {
    const slug = clean.slice(5).trim();
    return { tab: "blog", blogSlug: slug || null };
  }

  if (KNOWN_TABS.includes(clean)) {
    return { tab: clean, blogSlug: null };
  }

  // Any non-tab path without dot (not static file or api) is a direct blog slug:
  if (!clean.includes(".") && !clean.startsWith("api/")) {
    return { tab: "blog", blogSlug: clean };
  }

  return { tab: "overview", blogSlug: null };
}

function PortfolioApp() {
  const initialRoute = typeof window !== "undefined" ? parseRoute(window.location.pathname) : { tab: "overview", blogSlug: null };
  const [activeTab, setActiveTab] = useState<string>(initialRoute.tab);
  const [blogSlug, setBlogSlug] = useState<string | null>(initialRoute.blogSlug);
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

  const { user, profile, isAdmin, openAuthModal, signOut } = useAuth();
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

  useEffect(() => {
    preloadAssets();
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const { tab, blogSlug: slug } = parseRoute(window.location.pathname);
      setActiveTab(tab);
      setBlogSlug(slug);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleNavigateTab = (tabId: string) => {
    setActiveTab(tabId);
    setBlogSlug(null);
    const targetPath = tabId === "overview" ? "/" : `/${tabId}`;
    if (window.location.pathname !== targetPath) {
      window.history.pushState({ tab: tabId, slug: null }, "", targetPath);
    }
  };

  const handleBlogPostSelect = (post: BlogPost | null) => {
    if (post) {
      setBlogSlug(post.slug);
      const targetPath = `/${post.slug}`;
      if (window.location.pathname !== targetPath) {
        window.history.pushState({ tab: "blog", slug: post.slug }, "", targetPath);
      }
    } else {
      setBlogSlug(null);
      if (window.location.pathname !== "/blog") {
        window.history.pushState({ tab: "blog", slug: null }, "", "/blog");
      }
    }
  };

  const closeModal = () => setSelectedItem(null);

  const navItems = [
    { id: "overview", label: "Overview", icon: <Terminal size={16} /> },
    { id: "experience", label: "Experience", icon: <Briefcase size={16} /> },
    { id: "projects", label: "Projects", icon: <Layers size={16} /> },
    { id: "blog", label: "Blog", icon: <BookOpen size={16} /> },
    { id: "stack", label: "Stack", icon: <Cpu size={16} /> },
    { id: "services", label: "Services", icon: <Wrench size={16} /> },
    { id: "connect", label: "Connect", icon: <Globe size={16} /> },
  ];

  return (
    <div className="min-h-screen bg-[#f5f7ff] dark:bg-[#090d16] grid-pattern relative overflow-hidden text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
      {/* Background Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/5 dark:bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/5 dark:bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Mobile Top Header */}
      <header className="w-full md:hidden flex items-center justify-between px-5 py-3.5 border-b border-zinc-200 dark:border-zinc-800 bg-[#f5f7ff]/90 dark:bg-[#090d16]/90 backdrop-blur-xl sticky top-0 z-40">
        <div className="font-bold text-sm text-zinc-900 dark:text-white font-mono">Ron Marquez</div>
        
        <div className="flex items-center gap-2">
          {/* Mobile User Profile / Login Button */}
          {user ? (
            <div className="flex items-center gap-1.5 p-1 px-2.5 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="truncate max-w-[90px] text-zinc-800 dark:text-zinc-200 font-medium">
                {profile?.full_name?.split(" ")[0] || "User"}
              </span>
              <button
                onClick={signOut}
                aria-label="Sign Out"
                title="Sign Out"
                className="text-zinc-400 hover:text-red-500 p-0.5"
              >
                <LogOut size={12} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => openAuthModal("signin")}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-mono font-bold shadow-xs active:scale-95 transition-all"
            >
              <LogIn size={12} />
              <span>Sign In</span>
            </button>
          )}

          {/* Mobile Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="flex items-center gap-1.5 p-2 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-mono text-zinc-700 dark:text-zinc-200 shadow-xs cursor-pointer active:scale-95 transition-all"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Sun size={13} className="text-amber-500" />
            ) : (
              <Moon size={13} className="text-blue-400" />
            )}
          </button>
        </div>
      </header>

      {/* Extended Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 border-r border-zinc-200/80 dark:border-zinc-800/80 bg-white/90 dark:bg-[#0f1422]/90 backdrop-blur-xl flex flex-col justify-between p-6 z-50 max-md:hidden overflow-y-auto custom-scrollbar">
        {/* Top Header */}
        <div>
          <div className="mb-6 px-3">
            <h2 className="font-bold text-base text-zinc-900 dark:text-white tracking-tight">Ron Marquez</h2>
          </div>

          {/* Nav Links */}
          <div className="space-y-6">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 px-3 mb-2">Navigation</div>
              <nav className="space-y-1">
                {navItems.map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavigateTab(item.id)}
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
        <div className="space-y-4 pt-4 border-t border-zinc-200/80 dark:border-zinc-800/80">
          {/* User Profile / Auth Status Widget */}
          <div className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800">
            {user ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <div className="w-7 h-7 rounded-full bg-zinc-900 dark:bg-zinc-800 text-white flex items-center justify-center font-bold text-xs shrink-0 overflow-hidden">
                      {profile?.avatar_url ? (
                        <img src={profile.avatar_url} alt="User Avatar" className="w-full h-full object-cover" />
                      ) : (
                        <UserIcon size={13} />
                      )}
                    </div>
                    <div className="truncate">
                      <div className="text-xs font-bold font-mono text-zinc-900 dark:text-white truncate">
                        {profile?.full_name || user.email?.split("@")[0]}
                      </div>
                      <div className="text-[10px] font-mono text-zinc-400 truncate">
                        {user.email}
                      </div>
                    </div>
                  </div>

                  {isAdmin && (
                    <span className="px-1.5 py-0.5 rounded bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 font-mono text-[9px] font-bold border border-blue-200 dark:border-blue-800">
                      ADMIN
                    </span>
                  )}
                </div>

                <button
                  onClick={signOut}
                  className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-red-50 dark:hover:bg-red-950/40 text-zinc-600 hover:text-red-600 dark:text-zinc-400 dark:hover:text-red-300 font-mono text-[10px] font-semibold transition-colors cursor-pointer"
                >
                  <LogOut size={11} />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <div className="text-center space-y-2">
                <div className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400">
                  Join discussion & like posts
                </div>
                <button
                  onClick={() => openAuthModal("signin")}
                  className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-mono text-xs font-bold hover:bg-black dark:hover:bg-zinc-100 transition-all cursor-pointer shadow-xs active:scale-95"
                >
                  <LogIn size={13} />
                  <span>Sign In / Register</span>
                </button>
              </div>
            )}
          </div>

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

      {/* Mobile Bottom Navigation Dock */}
      <nav className="fixed bottom-0 left-0 w-full h-16 bg-white/95 dark:bg-[#0f1422]/95 backdrop-blur-xl border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-around z-50 md:hidden px-2">
        <NavIcon icon={<Terminal size={18} />} label="Overview" active={activeTab === "overview"} onClick={() => handleNavigateTab("overview")} />
        <NavIcon icon={<Briefcase size={18} />} label="Experience" active={activeTab === "experience"} onClick={() => handleNavigateTab("experience")} />
        <NavIcon icon={<Layers size={18} />} label="Projects" active={activeTab === "projects"} onClick={() => handleNavigateTab("projects")} />
        <NavIcon icon={<BookOpen size={18} />} label="Blog" active={activeTab === "blog"} onClick={() => handleNavigateTab("blog")} />
        <NavIcon icon={<Cpu size={18} />} label="Stack" active={activeTab === "stack"} onClick={() => handleNavigateTab("stack")} />
        <NavIcon icon={<Wrench size={18} />} label="Services" active={activeTab === "services"} onClick={() => handleNavigateTab("services")} />
        <NavIcon icon={<Globe size={18} />} label="Connect" active={activeTab === "connect"} onClick={() => handleNavigateTab("connect")} />
      </nav>

      {/* Main Content Area */}
      <main className="md:ml-64 min-h-screen p-6 md:p-12 lg:p-16 flex flex-col items-center">
        <div className="w-full max-w-4xl mx-auto">
          {/* Content Sections */}
          <AnimatePresence mode="wait">
            {activeTab === "overview" && (
              <OverviewSection onNavigate={handleNavigateTab} onSelectItem={setSelectedItem} />
            )}
            {activeTab === "experience" && <ExperienceSection />}
            {activeTab === "projects" && <ProjectsSection onSelectItem={setSelectedItem} />}
            {activeTab === "blog" && (
              <BlogSection initialSlug={blogSlug} onPostSelect={handleBlogPostSelect} />
            )}
            {activeTab === "stack" && <StackSection />}
            {activeTab === "services" && <ServicesSection onNavigate={handleNavigateTab} onSelectItem={setSelectedItem} />}
            {activeTab === "connect" && <ConnectSection />}
          </AnimatePresence>
        </div>
      </main>

      {/* Item Modal (Projects/Experience) */}
      <Modal isOpen={!!selectedItem} onClose={closeModal} item={selectedItem} />

      {/* User Auth Modal */}
      <AuthModal />

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
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <PortfolioApp />
    </AuthProvider>
  );
}

