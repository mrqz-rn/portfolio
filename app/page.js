'use client';
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Tab1 from "./components/tabs/Tab1";
import Tab2 from "./components/tabs/Tab2";
import Tab3 from "./components/tabs/Tab3";

export default function Home() {
  const [activeTab, setActiveTab] = React.useState(1);
  const tabs = [
    { id: 1, title: "Experience", icon: "mdi mdi-account", label: "01" },
    { id: 2, title: "Projects", icon: "mdi mdi-code-json", label: "02" },
    { id: 3, title: "More", icon: "mdi mdi-shape-square-plus", label: "03" },
  ];

  return (
    <>
      {/* Mobile Layout */}
      <div className="md:hidden">
        <div className="mobile-section-header">
          <span className="section-label">01</span>
          Personal
        </div>
        <Tab1 />
        <div className="mobile-section-header">
          <span className="section-label">02</span>
          Projects
        </div>
        <Tab2 />
        <div className="mobile-section-header">
          <span className="section-label">03</span>
          Others
        </div>
        <Tab3 />
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block relative">
        {/* Sticky Tab Navigation */}
        <div className="sticky top-0 z-50 nav-sticky-bg">
          <div className="px-10 pt-4 pb-4">
            <div className="tab-nav-track flex gap-1 p-1 rounded-2xl w-full max-w-lg">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`tab-btn flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold tracking-wide transition-all duration-300 ${
                    activeTab === tab.id ? "tab-btn-active" : "tab-btn-inactive"
                  }`}
                >
                  <span className={`${tab.icon} text-base`} />
                  <span>{tab.title}</span>
                  {activeTab === tab.id && (
                    <span className="tab-indicator-dot" />
                  )}
                </button>
              ))}
            </div>
          </div>
          <div className="nav-divider" />
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            {activeTab === 1 && <Tab1 />}
            {activeTab === 2 && <Tab2 />}
            {activeTab === 3 && <Tab3 />}
          </motion.div>
        </AnimatePresence>
      </div>

      <style jsx>{`
        .mobile-section-header {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 20px;
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #00e5ff;
          background: rgba(0, 229, 255, 0.05);
          border-bottom: 1px solid rgba(0, 229, 255, 0.1);
          border-top: 1px solid rgba(0, 229, 255, 0.1);
          margin: 16px 0 8px 0;
        }
        .section-label {
          font-size: 0.65rem;
          color: rgba(0, 229, 255, 0.5);
          font-family: 'Courier New', monospace;
        }
        .nav-sticky-bg {
          background: rgba(6, 13, 26, 0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
        .nav-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0, 229, 255, 0.15), rgba(124, 58, 237, 0.1), transparent);
        }
        .tab-nav-track {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.07);
        }
        .tab-btn {
          color: rgba(148, 163, 184, 0.7);
          position: relative;
        }
        .tab-btn-active {
          background: linear-gradient(135deg, rgba(14, 165, 233, 0.15) 0%, rgba(124, 58, 237, 0.12) 100%);
          color: #fff;
          border: 1px solid rgba(14, 165, 233, 0.25);
          box-shadow: 0 0 16px rgba(14, 165, 233, 0.1), inset 0 1px 0 rgba(255,255,255,0.07);
        }
        .tab-btn-inactive:hover {
          color: rgba(226, 232, 240, 0.9);
          background: rgba(255, 255, 255, 0.04);
        }
        .tab-indicator-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #00e5ff;
          box-shadow: 0 0 6px #00e5ff;
          display: inline-block;
        }
      `}</style>
    </>
  );
}