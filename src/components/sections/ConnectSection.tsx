import { motion } from "motion/react";
import { Mail, MapPin, Globe, Github, Linkedin, Send, CheckCircle2, AlertCircle, Copy, Check } from "lucide-react";
import { ContactButton } from "../ui/ContactButton";
import { useRef, useState, FormEvent } from "react";
import emailjs from "@emailjs/browser";

export function ConnectSection() {
  const form = useRef<HTMLFormElement>(null);
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const copyEmail = () => {
    navigator.clipboard.writeText("marquez.ronrons@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const sendEmail = async (e: FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setStatus("idle");

    try {
      const templateParams = {
        from_name: formData.name,
        user_name: formData.name,
        from_email: formData.email,
        user_email: formData.email,
        reply_to: formData.email,
        message: formData.message,
        message_text: formData.message,
        to_name: "Ron Marquez"
      };

      await emailjs.send(
        "service_4x8o8xt", 
        "template_mmgxojl", 
        templateParams, 
        "rj6WqqdOkjuH-1iHf"
      );

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      form.current?.reset();
    } catch (error) {
      console.error("EmailJS submission error:", error);
      setStatus("error");
    } finally {
      setIsSending(false);
    }
  };

  const openMailtoFallback = () => {
    const subject = encodeURIComponent(`Project Inquiry from ${formData.name || "Client"}`);
    const body = encodeURIComponent(
      `Hi Ron,\n\n${formData.message || "I would like to discuss a potential project."}\n\nBest regards,\n${formData.name}\n${formData.email}`
    );
    window.location.href = `mailto:marquez.ronrons@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <motion.section 
      key="connect"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="w-full max-w-4xl mx-auto py-8"
    >
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-zinc-900 font-mono">
          Let&apos;s build something exceptional.
        </h2>
        <p className="text-zinc-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          I&apos;m always open to discussing new projects, technical challenges, or potential opportunities. Send a message below or email me directly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Left Side: Contact Info */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-zinc-200/80 shadow-xs space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-2 text-zinc-900 font-mono">
              <Globe className="w-5 h-5 text-zinc-800" />
              Contact Information
            </h3>

            <div className="space-y-4 font-mono text-sm">
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200/80 group">
                <div className="flex items-center gap-3.5 text-zinc-600">
                  <div className="w-10 h-10 rounded-xl bg-white border border-zinc-200 flex items-center justify-center text-zinc-800 shadow-2xs">
                    <Mail size={18} />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase text-zinc-400 font-semibold mb-0.5">Direct Email</div>
                    <a 
                      href="mailto:marquez.ronrons@gmail.com" 
                      className="text-zinc-900 hover:text-black font-semibold transition-colors font-mono text-xs md:text-sm"
                    >
                      marquez.ronrons@gmail.com
                    </a>
                  </div>
                </div>
                <button
                  onClick={copyEmail}
                  type="button"
                  className="p-2 rounded-lg bg-white border border-zinc-200 hover:bg-zinc-100 text-zinc-600 hover:text-zinc-900 transition-all text-xs cursor-pointer"
                  title="Copy email address"
                >
                  {copied ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}
                </button>
              </div>

              <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200/80 text-zinc-600">
                <div className="w-10 h-10 rounded-xl bg-white border border-zinc-200 flex items-center justify-center text-zinc-800 shadow-2xs">
                  <MapPin size={18} />
                </div>
                <div>
                  <div className="text-[10px] uppercase text-zinc-400 font-semibold mb-0.5">Location</div>
                  <div className="text-zinc-900 font-medium text-xs md:text-sm">Antipolo City, Philippines</div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-zinc-100 flex flex-wrap gap-3">
              <ContactButton icon={<Linkedin size={18} />} label="LinkedIn" href="https://www.linkedin.com/in/ronmarquez/" />
              <ContactButton icon={<Github size={18} />} label="GitHub" href="https://github.com/mrqz-rn" />
            </div>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="bg-white p-8 rounded-3xl border border-zinc-200/80 shadow-xs">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-zinc-900 font-mono">
            <Send className="w-5 h-5 text-zinc-800" />
            Send a Message
          </h3>

          {status === "success" && (
            <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-start gap-3">
              <CheckCircle2 size={20} className="shrink-0 mt-0.5 text-emerald-600" />
              <div>
                <div className="font-bold">Message sent successfully!</div>
                <div className="text-xs text-emerald-700 mt-1">Thank you for reaching out. I will get back to you as soon as possible.</div>
              </div>
            </div>
          )}

          {status === "error" && (
            <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-sm space-y-3">
              <div className="flex items-start gap-3">
                <AlertCircle size={20} className="shrink-0 mt-0.5 text-amber-600" />
                <div>
                  <div className="font-bold">Could not send via web service</div>
                  <div className="text-xs text-amber-800 mt-0.5">Click below to send your pre-filled message directly via your email app:</div>
                </div>
              </div>
              <button
                type="button"
                onClick={openMailtoFallback}
                className="w-full py-2.5 px-4 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Mail size={14} /> Open in Email App (Gmail / Outlook) ↗
              </button>
            </div>
          )}

          <form ref={form} onSubmit={sendEmail} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-mono text-zinc-600 font-medium">Your Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:bg-white focus:outline-none transition-colors text-sm font-mono"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-zinc-600 font-medium">Email Address</label>
              <input
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="john@example.com"
                type="email"
                className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:bg-white focus:outline-none transition-colors text-sm font-mono"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-zinc-600 font-medium">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell me about your project or inquiry..."
                rows={4}
                className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:bg-white focus:outline-none transition-colors text-sm font-mono resize-none"
                required
              />
            </div>

            <button 
              type="submit" 
              disabled={isSending}
              className="w-full py-4 rounded-xl text-xs font-mono font-bold tracking-widest uppercase transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 bg-zinc-900 text-white hover:bg-black shadow-md cursor-pointer"
            >
              {isSending ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  <span>Sending Message...</span>
                </>
              ) : (
                <>
                  <Send size={14} />
                  <span>Send Message ↗</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </motion.section>
  );
}
