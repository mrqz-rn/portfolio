import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Mail, Lock, User, AlertCircle, Loader2 } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

export function AuthModal() {
  const { 
    isAuthModalOpen, 
    closeAuthModal, 
    authModalMode, 
    openAuthModal, 
    signInWithGoogle, 
    signInWithEmail, 
    signUpWithEmail 
  } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      if (authModalMode === "signin") {
        const { error } = await signInWithEmail(email, password);
        if (error) setErrorMsg(error.message || "Failed to sign in. Please verify your credentials.");
      } else {
        if (!fullName.trim()) {
          setErrorMsg("Please enter your name.");
          setLoading(false);
          return;
        }
        const { error } = await signUpWithEmail(email, password, fullName);
        if (error) setErrorMsg(error.message || "Failed to create account.");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMsg("");
    setGoogleLoading(true);
    try {
      const { error } = await signInWithGoogle();
      if (error) setErrorMsg(error.message || "Google sign-in error.");
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to connect to Google.");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeAuthModal}
          className="absolute inset-0 bg-black/65 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-md bg-white dark:bg-[#111624] border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-2xl overflow-hidden p-7 z-10 text-zinc-900 dark:text-white"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-5 border-b border-zinc-100 dark:border-zinc-800">
            <div>
              <h3 className="text-xl font-bold font-mono">
                {authModalMode === "signin" ? "Welcome Back" : "Create Account"}
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                {authModalMode === "signin"
                  ? "Sign in to like, comment, and participate in discussions."
                  : "Register to join the conversation and interact with articles."}
              </p>
            </div>
            <button
              onClick={closeAuthModal}
              className="p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex p-1 bg-zinc-100 dark:bg-zinc-900 rounded-xl my-5 border border-zinc-200/80 dark:border-zinc-800 font-mono text-xs">
            <button
              onClick={() => {
                setErrorMsg("");
                openAuthModal("signin");
              }}
              className={`flex-1 py-2 rounded-lg font-medium transition-all cursor-pointer ${
                authModalMode === "signin"
                  ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-xs font-bold"
                  : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setErrorMsg("");
                openAuthModal("signup");
              }}
              className={`flex-1 py-2 rounded-lg font-medium transition-all cursor-pointer ${
                authModalMode === "signup"
                  ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-xs font-bold"
                  : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
              }`}
            >
              Register
            </button>
          </div>

          {/* Google 1-Click Connect Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={googleLoading || loading}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800/80 font-mono text-xs font-semibold text-zinc-800 dark:text-zinc-200 shadow-xs hover:shadow-sm active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50"
          >
            {googleLoading ? (
              <Loader2 size={16} className="animate-spin text-blue-500" />
            ) : (
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.35 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.04 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
            )}
            <span>Connect with Google Account</span>
          </button>

          {/* Divider */}
          <div className="relative flex items-center justify-center my-5">
            <div className="border-t border-zinc-200 dark:border-zinc-800 w-full" />
            <span className="bg-white dark:bg-[#111624] px-3 font-mono text-[10px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500 absolute">
              or with email
            </span>
          </div>

          {/* Error Banner */}
          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs flex items-start gap-2">
              <AlertCircle size={15} className="shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
            {authModalMode === "signup" && (
              <div>
                <label className="block text-zinc-500 dark:text-zinc-400 mb-1.5 font-medium">
                  Full Name
                </label>
                <div className="relative">
                  <User size={15} className="absolute left-3.5 top-3 text-zinc-400" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:border-zinc-900 dark:focus:border-white transition-colors"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-zinc-500 dark:text-zinc-400 mb-1.5 font-medium">
                Email Address
              </label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-3 text-zinc-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:border-zinc-900 dark:focus:border-white transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-zinc-500 dark:text-zinc-400 mb-1.5 font-medium">
                Password
              </label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-3 text-zinc-400" />
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:border-zinc-900 dark:focus:border-white transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || googleLoading}
              className="w-full py-3 mt-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold rounded-xl hover:bg-black dark:hover:bg-zinc-100 transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm"
            >
              {loading && <Loader2 size={15} className="animate-spin" />}
              <span>{authModalMode === "signin" ? "Sign In" : "Complete Registration"}</span>
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
