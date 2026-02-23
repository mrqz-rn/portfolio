import React from "react";
import Image from "next/image";
import { useRef } from "react";
import emailjs from "emailjs-com";
import { ToastContainer, toast } from 'react-toastify';
import { services, techs, qualifications, skills } from "../../scripts/app-data.js";

function SectionHeader({ number, title }) {
  return (
    <div className="flex items-center gap-3 mb-6 pt-6 pb-3 section-hdr">
      <span className="section-num">{number}</span>
      <div className="line-short" />
      <h2 className="section-title-txt">{title}</h2>
      <div className="line-fade flex-1" />
      <style jsx>{`
        .section-hdr { border-bottom: 1px solid rgba(0,229,255,0.06); }
        .section-num { font-family: 'Courier New', monospace; font-size: 0.65rem; color: rgba(0,229,255,0.4); }
        .line-short { width: 24px; height: 1px; background: linear-gradient(90deg, rgba(0,229,255,0.6), rgba(0,229,255,0.1)); }
        .line-fade { height: 1px; background: linear-gradient(90deg, rgba(0,229,255,0.08), transparent); }
        .section-title-txt { font-size: 0.7rem; font-weight: 800; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(226,232,240,0.85); }
      `}</style>
    </div>
  );
}

export default function Tab3() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm("service_2xvphso", "template_mmgxojl", form.current, "rj6WqqdOkjuH-1iHf")
      .then(() => email_notify(), () => email_alert());
  };

  const email_notify = () => toast.success("Message sent successfully!", {
    position: "bottom-right", autoClose: 3500, theme: "dark",
  });
  const email_alert = () => toast.error("Failed to send message!", {
    position: "bottom-right", autoClose: 3500, theme: "dark",
  });

  return (
    <>
      <div className="px-6 md:px-12 pb-10">

        {/* Services */}
        <SectionHeader number="01" title="Services Offered" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {services.map((service) => (
            <div key={service.id} className="service-card rounded-2xl p-5 relative overflow-hidden transition-all duration-300 group">
              <div className="service-top-accent" />
              <h4 className="text-white font-bold text-sm mb-3">{service.name}</h4>
              <ul className="space-y-1.5">
                {service.jobs.map((job) => (
                  <li key={job.id} className="flex items-start gap-2">
                    <span className="service-bullet mt-0.5 flex-shrink-0">▸</span>
                    <span className="text-slate-400 text-xs leading-relaxed group-hover:text-slate-300 transition">{job.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Skills */}
        <SectionHeader number="02" title="Technical Skills" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {skills.map((skill) => (
            <div key={skill.id} className="skill-card rounded-2xl p-5 transition-all duration-300">
              <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-4">{skill.type}</h4>
              <div className="flex flex-wrap gap-4">
                {skill.items.map((item) => (
                  <div key={item.id} className="skill-item flex flex-col items-center gap-1.5 group">
                    <div className="skill-icon-wrap">
                      <Image src={`/tech/${item.icon}`} width={800} height={800} alt={item.name} className="w-8 h-8 object-contain" />
                    </div>
                    <p className="text-[10px] text-slate-400 text-center group-hover:text-slate-200 transition">{item.name}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Qualifications */}
        <SectionHeader number="03" title="Qualifications" />
        <div className="qual-wrap rounded-2xl p-6 mb-4">
          {qualifications.map((qualification) => (
            <div key={qualification.id} className="mb-5 last:mb-0">
              <h4 className="text-cyan-300 font-bold text-xs uppercase tracking-widest mb-3">{qualification.title}</h4>
              <ul className="space-y-1.5">
                {qualification.items.map((item) => (
                  <li key={item.id} className="flex items-start gap-2">
                    <span className="qual-bullet mt-0.5 flex-shrink-0">◆</span>
                    <span className="text-slate-400 text-xs leading-relaxed">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact */}
        <SectionHeader number="04" title="Contact Me" />
        <div className="contact-wrap rounded-2xl overflow-hidden mb-4">
          <div className="md:flex">
            {/* Left panel */}
            <div className="contact-left md:w-2/5 p-8 flex flex-col justify-center items-center">
              <div className="contact-icon-wrap mb-4">
                <Image src="/icons/email.png" width={300} height={300} objectFit="contain" alt="Contact" className="w-24 h-24 object-contain opacity-80" />
              </div>
              <p className="text-white font-bold text-base mb-1">Let's Connect</p>
              <p className="text-slate-400 text-xs text-center leading-relaxed">Have a project in mind? I'd love to hear from you and help bring it to life.</p>
            </div>

            {/* Right panel - Form */}
            <div className="contact-right md:w-3/5 p-6 md:p-8">
              <form ref={form} onSubmit={sendEmail} className="space-y-4">
                <div>
                  <label className="form-label">Your Name</label>
                  <input
                    name="user_name"
                    placeholder="John Doe"
                    className="form-input w-full mt-1"
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Email Address</label>
                  <input
                    name="user_email"
                    placeholder="john@example.com"
                    type="email"
                    className="form-input w-full mt-1"
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Message</label>
                  <textarea
                    name="message_text"
                    placeholder="Tell me about your project..."
                    rows={4}
                    className="form-input w-full mt-1 resize-none"
                    required
                  />
                </div>
                <button type="submit" className="send-btn w-full py-3 rounded-xl text-sm font-bold tracking-widest uppercase transition-all duration-300">
                  Send Message ↗
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-3 py-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
          <p className="text-slate-600 text-xs font-mono tracking-widest">Skilled. Reliable. Ready to deliver.</p>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
        </div>
      </div>

      <ToastContainer />

      <style jsx>{`
        .service-card {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
        }
        .service-card:hover {
          background: rgba(0,229,255,0.03);
          border-color: rgba(0,229,255,0.12);
          transform: translateY(-1px);
        }
        .service-top-accent {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, #0ea5e9, transparent);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .service-card:hover .service-top-accent { opacity: 1; }
        .service-bullet { color: #00e5ff; font-size: 0.5rem; }

        .skill-card {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
        }
        .skill-card:hover {
          border-color: rgba(0,229,255,0.1);
        }
        .skill-item { cursor: default; }
        .skill-icon-wrap {
          width: 44px; height: 44px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          padding: 6px;
          transition: all 0.2s;
        }
        .skill-item:hover .skill-icon-wrap {
          background: rgba(0,229,255,0.07);
          border-color: rgba(0,229,255,0.18);
          transform: scale(1.08);
        }

        .qual-wrap {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
        }
        .qual-bullet { color: rgba(0,229,255,0.4); font-size: 0.4rem; }

        .contact-wrap {
          border: 1px solid rgba(255,255,255,0.06);
          background: rgba(255,255,255,0.015);
        }
        .contact-left {
          background: rgba(0,229,255,0.03);
          border-right: 1px solid rgba(0,229,255,0.07);
        }
        .contact-icon-wrap {
          background: rgba(0,229,255,0.07);
          border: 1px solid rgba(0,229,255,0.12);
          border-radius: 20px;
          padding: 16px;
        }
        .contact-right {
          background: transparent;
        }
        .form-label {
          display: block;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(148,163,184,0.8);
        }
        .form-input {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          padding: 10px 14px;
          color: white;
          font-size: 0.8rem;
          outline: none;
          transition: all 0.2s;
        }
        .form-input::placeholder {
          color: rgba(148,163,184,0.4);
        }
        .form-input:focus {
          border-color: rgba(0,229,255,0.25);
          background: rgba(0,229,255,0.03);
          box-shadow: 0 0 0 3px rgba(0,229,255,0.05);
        }
        .send-btn {
          background: linear-gradient(135deg, #0ea5e9 0%, #7c3aed 100%);
          color: white;
          box-shadow: 0 4px 20px rgba(14,165,233,0.2);
          border: 1px solid rgba(255,255,255,0.1);
        }
        .send-btn:hover {
          box-shadow: 0 6px 28px rgba(14,165,233,0.35);
          transform: translateY(-1px);
        }
        .send-btn:active {
          transform: scale(0.98);
        }
      `}</style>
    </>
  );
}