'use client';
import 'react-vertical-timeline-component/style.min.css';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { createPortal } from 'react-dom';
import { summary, jobs, education, certs } from "../../scripts/app-data.js";

function SectionHeader({ number, title }) {
  return (
    <div className="section-header-wrap flex items-center gap-3 mb-6 pt-6 pb-3">
      <span className="section-num">{number}</span>
      <div className="flex items-center gap-3">
        <div className="section-line" />
        <h2 className="section-title">{title}</h2>
      </div>
      <div className="section-line-fade flex-1" />

      <style jsx>{`
        .section-header-wrap {
          border-bottom: 1px solid rgba(0, 229, 255, 0.06);
        }
        .section-num {
          font-family: 'Courier New', monospace;
          font-size: 0.65rem;
          color: rgba(0, 229, 255, 0.4);
          letter-spacing: 0.05em;
        }
        .section-line {
          width: 24px;
          height: 1px;
          background: linear-gradient(90deg, rgba(0,229,255,0.6), rgba(0,229,255,0.1));
        }
        .section-line-fade {
          height: 1px;
          background: linear-gradient(90deg, rgba(0,229,255,0.08), transparent);
        }
        .section-title {
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(226, 232, 240, 0.85);
        }
      `}</style>
    </div>
  );
}

function DetailsModal({ item, onClose }) {
  // Close on backdrop click or Escape key
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <div
        className="modal-panel relative w-full max-w-xl rounded-2xl p-6 overflow-y-auto max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="modal-close-btn absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-all"
        >
          ✕
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4 pr-8">
          <div className="exp-icon-wrap-modal flex-shrink-0">
            <Image src={item.icon} alt={item.company} width={44} height={44} className="rounded-xl" />
          </div>
          <div>
            <p className="font-bold text-white text-base">{item.company}</p>
            <p className="text-slate-400 text-xs mt-0.5">
              📍 {item.location} &nbsp;·&nbsp;
              <span className="text-cyan-300 font-mono">{item.start} — {item.end}</span>
            </p>
          </div>
        </div>

        {/* Role */}
        <h3 className="text-lg font-bold text-white mb-4 border-b border-white/5 pb-3">{item.position}</h3>

        {/* Details */}
        <div className="space-y-3">
          {item.details.map((detail, idd) => (
            <div key={`dt${idd}`} className="flex gap-3">
              <span className="text-cyan-400 mt-0.5 flex-shrink-0 text-sm">▸</span>
              <span className="text-sm text-slate-300 leading-relaxed">{detail}</span>
            </div>
          ))}
        </div>

        <style jsx>{`
          .modal-panel {
            background: linear-gradient(135deg, #0d1b2e 0%, #0a1525 100%);
            border: 1px solid rgba(0, 229, 255, 0.15);
            box-shadow: 0 25px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,229,255,0.08);
          }
          .modal-close-btn {
            background: rgba(255,255,255,0.05);
            border: 1px solid rgba(255,255,255,0.1);
            color: #94a3b8;
            font-size: 0.75rem;
          }
          .modal-close-btn:hover {
            background: rgba(239,68,68,0.15);
            border-color: rgba(239,68,68,0.3);
            color: #f87171;
          }
          .exp-icon-wrap-modal {
            padding: 2px;
            background: linear-gradient(135deg, rgba(0,229,255,0.25), rgba(124,58,237,0.25));
            border-radius: 14px;
          }
        `}</style>
      </div>
    </div>,
    document.body
  );
}

function ExperienceCard({ item }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="exp-card group relative rounded-2xl mb-4 p-5 transition-all duration-300">
        {/* Top glow accent */}
        <div className="exp-card-glow" />

        {/* Top row: Company + dates */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="exp-icon-wrap">
              <Image src={item.icon} alt={item.company} width={36} height={36} className="rounded-xl" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm">{item.company}</p>
              <p className="text-slate-400 text-xs flex items-center gap-1">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                {item.location}
              </p>
            </div>
          </div>
          <div className="date-badge">
            <span className="text-[10px] text-cyan-300 font-mono">{item.start} — {item.end}</span>
          </div>
        </div>

        {/* Position */}
        <h3 className="text-base font-bold text-white mb-2">{item.position}</h3>

        {/* Summary */}
        <p className="text-slate-400 text-xs leading-relaxed text-justify mb-3">{item.summary}</p>

        {/* View Details button */}
        <button
          onClick={() => setModalOpen(true)}
          className="learn-more-btn text-xs font-semibold transition-all duration-200"
        >
          View Details →
        </button>

        <style jsx>{`
          .exp-card {
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid rgba(255, 255, 255, 0.06);
            overflow: visible;
          }
          .exp-card:hover {
            background: rgba(0, 229, 255, 0.03);
            border-color: rgba(0, 229, 255, 0.12);
            transform: translateY(-1px);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(0, 229, 255, 0.06);
          }
          .exp-card-glow {
            position: absolute;
            top: 0; left: 0; right: 0;
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(0,229,255,0.2), transparent);
            opacity: 0;
            transition: opacity 0.3s;
          }
          .exp-card:hover .exp-card-glow { opacity: 1; }
          .exp-icon-wrap {
            padding: 2px;
            background: linear-gradient(135deg, rgba(0,229,255,0.2), rgba(124,58,237,0.2));
            border-radius: 12px;
          }
          .date-badge {
            background: rgba(0, 229, 255, 0.07);
            border: 1px solid rgba(0, 229, 255, 0.12);
            padding: 3px 10px;
            border-radius: 20px;
            white-space: nowrap;
          }
          .learn-more-btn {
            color: #00e5ff;
            background: rgba(0, 229, 255, 0.06);
            border: 1px solid rgba(0, 229, 255, 0.15);
            padding: 5px 14px;
            border-radius: 8px;
            cursor: pointer;
          }
          .learn-more-btn:hover {
            background: rgba(0, 229, 255, 0.12);
            box-shadow: 0 0 12px rgba(0, 229, 255, 0.15);
            transform: translateX(2px);
          }
        `}</style>
      </div>

      {/* Portal modal - renders outside card DOM */}
      {modalOpen && <DetailsModal item={item} onClose={() => setModalOpen(false)} />}
    </>
  );
}

function EducationCard({ item }) {
  return (
    <div className="edu-card group relative overflow-hidden rounded-2xl mb-4 p-5 transition-all duration-300">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="edu-icon-wrap">
            <Image src={item.icon} alt={item.school} width={36} height={36} className="rounded-xl" />
          </div>
          <div>
            <p className="text-white font-semibold text-sm">{item.school}</p>
            <p className="text-slate-400 text-xs">{item.location}</p>
            <p className="text-cyan-300 text-xs font-medium mt-1">{item.degree}</p>
          </div>
        </div>
        <div className="edu-date">
          <span className="text-[10px] text-cyan-300 font-mono">{item.start} — {item.end}</span>
        </div>
      </div>

      <style jsx>{`
        .edu-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
        }
        .edu-card:hover {
          background: rgba(124, 58, 237, 0.04);
          border-color: rgba(124, 58, 237, 0.12);
          transform: translateY(-1px);
        }
        .edu-icon-wrap {
          padding: 2px;
          background: linear-gradient(135deg, rgba(124,58,237,0.25), rgba(0,229,255,0.15));
          border-radius: 12px;
          flex-shrink: 0;
        }
        .edu-date {
          background: rgba(124, 58, 237, 0.07);
          border: 1px solid rgba(124, 58, 237, 0.15);
          padding: 3px 10px;
          border-radius: 20px;
          white-space: nowrap;
          flex-shrink: 0;
        }
      `}</style>
    </div>
  );
}

export default function Tab1() {
  useEffect(() => {
    const dates = document.querySelectorAll('.vertical-timeline-element-date');
    dates.forEach((el) => el.remove());
  }, []);

  return (
    <div className="px-6 md:px-12 pb-10">

      <SectionHeader number="01" title="Work Experience" />
      <div>
        {jobs.map((item, index) => (
          <ExperienceCard key={index} item={item} />
        ))}
      </div>

      <SectionHeader number="02" title="Education" />
      <div>
        {education.map((item, index) => (
          <EducationCard key={index} item={item} />
        ))}
      </div>

      <SectionHeader number="03" title="Certifications" />
      <div className="certs-grid mb-6">
        {certs.map((cert) => (
          <div key={cert.id} className="cert-item group rounded-xl px-4 py-3 transition-all duration-200">
            <div className="flex items-start gap-2">
              <span className="cert-bullet mt-0.5">◆</span>
              <div>
                <p className="text-white text-sm font-semibold leading-snug">{cert.title}</p>
                <p className="text-slate-400 text-xs mt-0.5">
                  {cert.issuer} <span className="text-slate-600">·</span> <span className="text-cyan-400/70">{cert.issued}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .certs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 8px;
        }
        .cert-item {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .cert-item:hover {
          background: rgba(0, 229, 255, 0.03);
          border-color: rgba(0, 229, 255, 0.1);
        }
        .cert-bullet {
          color: rgba(0, 229, 255, 0.4);
          font-size: 0.4rem;
          flex-shrink: 0;
        }
      `}</style>
    </div>
  );
}