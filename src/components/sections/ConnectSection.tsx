import { motion } from "motion/react";
import { Mail, Phone, MapPin, Globe, Github, Linkedin } from "lucide-react";
import { ContactButton } from "../ui/ContactButton";
import { useRef, useState, FormEvent } from "react";
import emailjs from "@emailjs/browser";

export function ConnectSection() {
  const form = useRef<HTMLFormElement>(null);
  const [isSending, setIsSending] = useState(false);

  const sendEmail = (e: FormEvent) => {
    e.preventDefault();
    if (!form.current) return;

    setIsSending(true);
    emailjs.sendForm(
      "service_2xvphso", 
      "template_mmgxojl", 
      form.current, 
      "rj6WqqdOkjuH-1iHf"
    )
      .then(
        () => {
          alert("Message sent successfully! I'll get back to you soon.");
          form.current?.reset();
          setIsSending(false);
        }, 
        (error) => {
          console.error("FAILED...", error);
          alert("Failed to send message. Please try again later.");
          setIsSending(false);
        }
      );
  };

  return (
    <motion.section 
      key="connect"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-6xl mx-auto py-20 px-4"
    >
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold mb-8 tracking-tighter">Let's build something <span className="text-nexus-accent">exceptional</span>.</h2>
        <p className="text-nexus-muted text-lg max-w-2xl mx-auto">
          I'm always open to discussing technical challenges, commission-based projects, or potential opportunities.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left Side: Contact Info */}
        <div className="space-y-8">
          <div className="glass p-8 rounded-3xl border border-white/10">
            <h3 className="text-xl font-bold mb-8 flex items-center gap-2 text-nexus-accent">
              <Globe className="w-5 h-5" />
              Contact Information
            </h3>
            <div className="space-y-6 font-mono text-sm">
              <div className="flex items-center gap-4 text-nexus-muted group">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-nexus-accent group-hover:bg-nexus-accent/10 transition-colors">
                  <Mail size={20} />
                </div>
                <div>
                  <div className="text-[10px] uppercase text-nexus-accent/50 mb-1">Email</div>
                  <a href="mailto:marquez.ronrons@gmail.com" className="hover:text-white transition-colors">marquez.ronrons@gmail.com</a>
                </div>
              </div>
              <div className="flex items-center gap-4 text-nexus-muted group">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-nexus-accent group-hover:bg-nexus-accent/10 transition-colors">
                  <Phone size={20} />
                </div>
                <div>
                  <div className="text-[10px] uppercase text-nexus-accent/50 mb-1">Phone</div>
                  <a href="tel:+639272612719" className="hover:text-white transition-colors">+639272612719</a>
                </div>
              </div>
              <div className="flex items-center gap-4 text-nexus-muted group">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-nexus-accent group-hover:bg-nexus-accent/10 transition-colors">
                  <MapPin size={20} />
                </div>
                <div>
                  <div className="text-[10px] uppercase text-nexus-accent/50 mb-1">Location</div>
                  Antipolo City, Philippines
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-white/5 flex gap-4">
              <ContactButton icon={<Linkedin />} label="LinkedIn" href="#" />
              <ContactButton icon={<Github />} label="Github" href="#" />
            </div>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="glass p-8 rounded-3xl border border-white/10">
          <h3 className="text-xl font-bold mb-8 flex items-center gap-2 text-nexus-accent">
            <Mail className="w-5 h-5" />
            Send a Message
          </h3>
          <form ref={form} onSubmit={sendEmail} className="space-y-6">
            <div className="space-y-2">
              <label className="form-label">Your Name</label>
              <input
                name="user_name"
                placeholder="John Doe"
                className="form-input w-full"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="form-label">Email Address</label>
              <input
                name="user_email"
                placeholder="john@example.com"
                type="email"
                className="form-input w-full"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="form-label">Message</label>
              <textarea
                name="message_text"
                placeholder="Tell me about your project..."
                rows={4}
                className="form-input w-full resize-none"
                required
              />
            </div>
            <button 
              type="submit" 
              disabled={isSending}
              className="send-btn w-full py-4 rounded-xl text-sm font-bold tracking-widest uppercase transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSending ? "Sending..." : "Send Message ↗"}
            </button>
          </form>
        </div>
      </div>
    </motion.section>
  );
}
