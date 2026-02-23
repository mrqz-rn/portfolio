'use client';
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Carousel2, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "../lightswind/carousel";
import { Card, CardContent } from "../lightswind/card";
import { works, projects } from "../../scripts/app-data.js";

/* ─── Shared responsive config ─── */
const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 1 },
  desktop:           { breakpoint: { max: 3000, min: 1024 }, items: 1 },
  tablet:            { breakpoint: { max: 1024, min:  464 }, items: 1 },
  mobile:            { breakpoint: { max:  464, min:    0 }, items: 1 },
};

/* ─── Section header ─── */
function SectionHeader({ number, title }) {
  return (
    <div className="flex items-center gap-3 mb-6 pt-6 pb-3 section-hdr">
      <span className="section-num-small">{number}</span>
      <div className="line-short" />
      <h2 className="section-title-text">{title}</h2>
      <div className="line-fade flex-1" />
      <style jsx>{`
        .section-hdr { border-bottom: 1px solid rgba(0,229,255,0.06); }
        .section-num-small { font-family:'Courier New',monospace; font-size:0.65rem; color:rgba(0,229,255,0.4); }
        .line-short { width:24px; height:1px; background:linear-gradient(90deg,rgba(0,229,255,0.6),rgba(0,229,255,0.1)); }
        .line-fade  { height:1px; background:linear-gradient(90deg,rgba(0,229,255,0.08),transparent); }
        .section-title-text { font-size:0.7rem; font-weight:800; letter-spacing:0.2em; text-transform:uppercase; color:rgba(226,232,240,0.85); }
      `}</style>
    </div>
  );
}

/* ─── Tech badge ─── */
function TechBadge({ tech }) {
  return (
    <span className="tech-badge">
      {tech}
      <style jsx>{`
        .tech-badge {
          display:inline-block; padding:2px 10px; border-radius:6px;
          font-size:0.65rem; font-weight:600; letter-spacing:0.05em;
          background:rgba(14,165,233,0.08); border:1px solid rgba(14,165,233,0.18);
          color:#7dd3fc; white-space:nowrap;
        }
      `}</style>
    </span>
  );
}

/* ─── Work detail portal modal ─── */
function WorkModal({ work, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.78)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div
        className="work-modal relative w-full max-w-4xl rounded-2xl overflow-hidden"
        style={{ maxHeight: '88vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button onClick={onClose} className="modal-close absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center text-xs transition-all">✕</button>

        <div className="flex flex-col md:flex-row" style={{ maxHeight: '88vh' }}>
          {/* Left: carousel */}
          <div className="md:w-[55%] flex-shrink-0 modal-left flex items-center justify-center p-4">
            <Carousel2 className="w-full">
              <CarouselContent>
                {work.images.map((image, idx) => (
                  <CarouselItem key={idx}>
                    <Card className="border-0 bg-transparent">
                      <CardContent className="flex aspect-video items-center justify-center p-0">
                        <div className="relative w-full aspect-video rounded-xl overflow-hidden">
                          <Image src={image} layout="fill" objectFit="contain" alt="Screenshot" className="p-1" />
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel2>
          </div>

          {/* Right: details */}
          <div className="md:w-[45%] overflow-y-auto modal-right p-6">
            <p className="text-lg font-bold text-white mb-1">
              {work.name}
              {work.desc ? <span className="text-slate-400 font-normal text-sm ml-1">({work.desc})</span> : ''}
            </p>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">{work.description}</p>

            <div className="space-y-2 mb-5">
              {work.detail.map((detail, i) => (
                <div key={i} className="flex gap-2">
                  <span className="text-cyan-400 flex-shrink-0 text-sm">▸</span>
                  <span className="text-xs text-slate-300 leading-relaxed">{detail}</span>
                </div>
              ))}
            </div>

            <p className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest mb-2">Technologies</p>
            <div className="flex flex-wrap gap-1.5 mb-5">
              {work.tech.map((th, id) => <TechBadge key={id} tech={th} />)}
            </div>

            <p className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest mb-2">Involvement</p>
            <div className="flex flex-wrap gap-1.5">
              {work.involvement.map((inv, ind) => (
                <span key={ind} className="text-xs bg-violet-900/40 border border-violet-500/25 text-violet-300 px-3 py-1 rounded-lg">{inv}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .work-modal {
          background: linear-gradient(135deg, #0d1b2e 0%, #0a1525 100%);
          border: 1px solid rgba(0,229,255,0.15);
          box-shadow: 0 30px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(0,229,255,0.06);
        }
        .modal-left {
          background: rgba(0,0,0,0.25);
          border-right: 1px solid rgba(255,255,255,0.05);
        }
        .modal-right { background: transparent; }
        .modal-close {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          color: #94a3b8;
        }
        .modal-close:hover {
          background: rgba(239,68,68,0.15);
          border-color: rgba(239,68,68,0.3);
          color: #f87171;
        }
      `}</style>
    </div>,
    document.body
  );
}

/* ─── Project detail portal modal ─── */
function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.78)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div
        className="proj-modal relative w-full max-w-lg rounded-2xl p-6 overflow-y-auto"
        style={{ maxHeight: '80vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="modal-close2 absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-xs transition-all">✕</button>
        <h2 className="text-base font-bold text-white mb-3 pr-8">{project.name}</h2>
        <p className="text-sm text-slate-300 leading-relaxed text-justify">{project.description}</p>

        <style jsx>{`
          .proj-modal {
            background: linear-gradient(135deg, #0d1b2e 0%, #0a1525 100%);
            border: 1px solid rgba(0,229,255,0.15);
            box-shadow: 0 25px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,229,255,0.06);
          }
          .modal-close2 {
            background: rgba(255,255,255,0.06);
            border: 1px solid rgba(255,255,255,0.1);
            color: #94a3b8; cursor: pointer;
          }
          .modal-close2:hover {
            background: rgba(239,68,68,0.15);
            border-color: rgba(239,68,68,0.3);
            color: #f87171;
          }
        `}</style>
      </div>
    </div>,
    document.body
  );
}

/* ─── Work card ─── */
function WorkCard({ work }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="work-card group relative rounded-2xl flex flex-col transition-all duration-300">
        <div className="work-card-accent" />

        <div className="work-img-wrap relative" style={{ minHeight: 180 }}>
          <Carousel responsive={responsive} infinite={true} autoPlay autoPlaySpeed={work.speed} focusOnSelect={false} arrows={false}>
            {work.images.map((image, idx) => (
              <div key={idx} className="relative" style={{ minHeight: 180 }}>
                <Image src={image} layout="fill" objectFit="contain" alt={`${work.name} ${idx}`} className="p-2" />
              </div>
            ))}
          </Carousel>
          <div className="img-gradient-overlay" />
        </div>

        <div className="flex flex-col flex-1 p-4">
          <p className="text-white font-bold text-sm mb-1.5">{work.name}</p>
          <p className="text-slate-400 text-xs leading-relaxed text-justify mb-3 flex-1">
            {work.description.length > 160 ? <>{work.description.slice(0, 160)}...</> : work.description}
          </p>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {work.tech.map((th, id) => <TechBadge key={id} tech={th} />)}
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="work-detail-btn w-full py-2 rounded-xl text-xs font-bold tracking-wide transition-all duration-200 cursor-pointer"
          >
            View Project →
          </button>
        </div>

        <style jsx>{`
          .work-card {
            background: rgba(255,255,255,0.025);
            border: 1px solid rgba(255,255,255,0.07);
            overflow: visible;
          }
          .work-card:hover {
            border-color: rgba(14,165,233,0.2);
            box-shadow: 0 12px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(14,165,233,0.08);
            transform: translateY(-2px);
          }
          .work-card-accent {
            height: 2px; border-radius: 2px 2px 0 0;
            background: linear-gradient(90deg, #0ea5e9, #7c3aed, transparent);
            opacity: 0; transition: opacity 0.3s;
          }
          .work-card:hover .work-card-accent { opacity: 1; }
          .work-img-wrap { background: rgba(0,0,0,0.2); border-radius: 16px 16px 0 0; overflow: hidden; }
          .img-gradient-overlay {
            position: absolute; bottom:0; left:0; right:0; height:40px;
            background: linear-gradient(transparent, rgba(6,13,26,0.6));
            pointer-events: none;
          }
          .work-detail-btn {
            background: rgba(14,165,233,0.08);
            border: 1px solid rgba(14,165,233,0.18);
            color: #7dd3fc;
          }
          .work-detail-btn:hover {
            background: rgba(14,165,233,0.15);
            border-color: rgba(14,165,233,0.3);
            color: #fff;
          }
        `}</style>
      </div>

      {modalOpen && <WorkModal work={work} onClose={() => setModalOpen(false)} />}
    </>
  );
}

/* ─── Project card ─── */
function ProjectCard({ project }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="proj-card group rounded-2xl flex flex-col md:flex-row transition-all duration-300 mb-4 md:mb-0">
        <div className="proj-img relative md:w-[180px] flex-shrink-0" style={{ minHeight: 140 }}>
          <Carousel responsive={responsive} infinite={true} autoPlay autoPlaySpeed={project.speed} focusOnSelect={false} arrows={false}>
            {project.images.map((image, idx) => (
              <div key={idx} className="relative" style={{ minHeight: 140 }}>
                <Image src={image} layout="fill" objectFit="contain" alt={`${project.name} ${idx}`} className="p-2" />
              </div>
            ))}
          </Carousel>
        </div>
        <div className="flex flex-col flex-1 p-4">
          <p className="text-white font-bold text-sm mb-1.5">{project.name}</p>
          <p className="text-slate-400 text-xs leading-relaxed text-justify mb-3 flex-1">
            {project.description.length > 100 ? (
              <>
                {project.description.slice(0, 100)}...{' '}
                <button onClick={() => setModalOpen(true)} className="text-cyan-400 hover:text-cyan-300 font-semibold transition cursor-pointer">
                  Read more
                </button>
              </>
            ) : project.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((th, id) => <TechBadge key={id} tech={th} />)}
          </div>
        </div>

        <style jsx>{`
          .proj-card {
            background: rgba(255,255,255,0.02);
            border: 1px solid rgba(255,255,255,0.06);
            overflow: visible;
          }
          .proj-card:hover {
            border-color: rgba(124,58,237,0.18);
            box-shadow: 0 8px 30px rgba(0,0,0,0.3);
          }
          .proj-img {
            background: rgba(0,0,0,0.2);
            border-right: 1px solid rgba(255,255,255,0.05);
            overflow: hidden;
            border-radius: 16px 0 0 16px;
          }
        `}</style>
      </div>

      {modalOpen && <ProjectModal project={project} onClose={() => setModalOpen(false)} />}
    </>
  );
}

/* ─── Main Tab2 ─── */
export default function Tab2() {
  return (
    <div className="px-6 md:px-12 pb-10">
      <SectionHeader number="01" title="Work Experience" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {works.map((work, index) => (
          <WorkCard key={index} work={work} />
        ))}
      </div>

      <SectionHeader number="02" title="Personal Projects" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </div>
  );
}