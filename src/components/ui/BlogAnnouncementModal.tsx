import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Sparkles, Calendar, BookOpen, ArrowRight, BellRing } from "lucide-react";

interface BlogAnnouncementModalProps {
  onNavigateToBlog: () => void;
}

export function BlogAnnouncementModal({ onNavigateToBlog }: BlogAnnouncementModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Target launch date: September 20, 2026 00:00:00 PHT (UTC+8)
  const targetDate = new Date("2026-09-20T00:00:00+08:00").getTime();

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isComplete: true };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isComplete: false
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    // Check if dismissed previously in this session or local storage
    const isDismissed = sessionStorage.getItem("blog_countdown_announcement_seen");
    if (!isDismissed) {
      // Show after a brief delay for a polished feel
      const showTimer = setTimeout(() => {
        setIsOpen(true);
      }, 1200);
      return () => clearTimeout(showTimer);
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleDismiss = () => {
    sessionStorage.setItem("blog_countdown_announcement_seen", "true");
    setIsOpen(false);
  };

  const handleExplore = () => {
    handleDismiss();
    onNavigateToBlog();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleDismiss}
          className="absolute inset-0 bg-black/60 backdrop-blur-md"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative w-full max-w-lg bg-white dark:bg-[#111624] border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-2xl overflow-hidden p-6 md:p-8 z-10 text-zinc-900 dark:text-white"
        >
          {/* Ambient Glows */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 dark:bg-blue-600/20 blur-[80px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 dark:bg-indigo-600/20 blur-[80px] rounded-full pointer-events-none" />

          {/* Close button */}
          <button
            onClick={handleDismiss}
            aria-label="Close Announcement"
            className="absolute top-5 right-5 p-2 rounded-full text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>

          <div className="space-y-6">
            {/* Header Badge & Title */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 font-mono text-[11px] font-bold">
                <Sparkles size={13} className="text-blue-500 animate-pulse" />
                <span>UPCOMING FEATURE ANNOUNCEMENT</span>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold font-mono tracking-tight text-zinc-900 dark:text-white leading-snug">
                Engineering Blog Launching Soon!
              </h3>

              <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans">
                A dedicated publishing module for in-depth system architecture teardowns, enterprise full-stack design patterns, and IoT telemetry systems is currently scheduled for deployment.
              </p>
            </div>

            {/* Countdown Box Strip */}
            <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-zinc-800">
              <div className="flex items-center justify-between text-[11px] font-mono font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-3">
                <span className="flex items-center gap-1.5">
                  <Calendar size={13} className="text-blue-500" />
                  <span>Launch Date: September 20, 2026</span>
                </span>
                <span className="text-blue-600 dark:text-blue-400 font-semibold">T-MINUS</span>
              </div>

              <div className="grid grid-cols-4 gap-2 text-center">
                {/* Days */}
                <div className="p-2.5 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200/70 dark:border-zinc-700 shadow-2xs">
                  <div className="text-2xl md:text-3xl font-bold font-mono text-zinc-900 dark:text-white tracking-tight">
                    {String(timeLeft.days).padStart(2, "0")}
                  </div>
                  <div className="text-[9px] font-mono text-zinc-400 dark:text-zinc-500 uppercase mt-0.5 font-semibold">
                    Days
                  </div>
                </div>

                {/* Hours */}
                <div className="p-2.5 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200/70 dark:border-zinc-700 shadow-2xs">
                  <div className="text-2xl md:text-3xl font-bold font-mono text-zinc-900 dark:text-white tracking-tight">
                    {String(timeLeft.hours).padStart(2, "0")}
                  </div>
                  <div className="text-[9px] font-mono text-zinc-400 dark:text-zinc-500 uppercase mt-0.5 font-semibold">
                    Hours
                  </div>
                </div>

                {/* Minutes */}
                <div className="p-2.5 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200/70 dark:border-zinc-700 shadow-2xs">
                  <div className="text-2xl md:text-3xl font-bold font-mono text-zinc-900 dark:text-white tracking-tight">
                    {String(timeLeft.minutes).padStart(2, "0")}
                  </div>
                  <div className="text-[9px] font-mono text-zinc-400 dark:text-zinc-500 uppercase mt-0.5 font-semibold">
                    Mins
                  </div>
                </div>

                {/* Seconds */}
                <div className="p-2.5 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200/70 dark:border-zinc-700 shadow-2xs">
                  <div className="text-2xl md:text-3xl font-bold font-mono text-blue-600 dark:text-blue-400 tracking-tight">
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </div>
                  <div className="text-[9px] font-mono text-zinc-400 dark:text-zinc-500 uppercase mt-0.5 font-semibold">
                    Secs
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
              <button
                type="button"
                onClick={handleExplore}
                className="w-full sm:flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-mono text-xs font-bold hover:bg-black dark:hover:bg-zinc-100 shadow-md active:scale-95 transition-all cursor-pointer"
              >
                <BookOpen size={14} />
                <span>Preview Sneak Peek</span>
                <ArrowRight size={13} />
              </button>

              <button
                type="button"
                onClick={handleDismiss}
                className="w-full sm:w-auto py-3 px-5 rounded-2xl font-mono text-xs text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer text-center"
              >
                Remind Me Later
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
