'use client'
import Image from 'next/image'
import Link from 'next/link'
import { GradientButton } from './lightswind/gradient-button'
import { getMyStatus } from '../scripts/app-data'

export default function Side() {
    const profile = {
        name: 'RON-RON MARQUEZ',
        position: 'System Developer Specialist',
        image: '/icons/user.jpg'
    };
    const info = [
        {id: 1, type: 'email', data: 'marquez.ronrons@gmail.com', image: '/icons/mail.png'},
        {id: 2, type: 'phone', data: '09487228657', image: '/icons/phone.png'},
        {id: 3, type: 'location', data: 'Antipolo City, Philippines', image: '/icons/map.png'},
    ];
    const socials = [
        {id: 1, name: 'Linkedin', image: '/icons/linkedin.png', url: 'https://www.linkedin.com/in/ronmarquez/'},
        {id: 2, name: 'Github', image: '/icons/github.png', url: 'https://github.com/mrqz-rn'},
        // {id: 3, name: 'Facebook', image: '/icons/facebook.png', url: 'https://www.facebook.com/m.ron.ron13/'},
        // {id: 4, name: 'Messenger', image: '/icons/messenger.jpg', url: 'https://m.me/m.ron.ron13'},
    ];

    const downloadResume = () => {
        const link = document.createElement('a');
        link.href = '/resume/Resume.pdf';
        link.download = 'Ron Marquez Resume.pdf';
        link.click();
    };

    return (
        <aside className="side-panel flex flex-col h-full min-h-screen relative overflow-hidden">
            {/* Ambient glow background */}
            <div className="side-ambient-top" />
            <div className="side-ambient-bottom" />

            {/* Profile Section */}
            <div className="flex-1 flex flex-col items-center pt-10 pb-4 px-4 relative z-10">
                {/* Avatar */}
                <div className="avatar-ring relative mb-5">
                    <div className="avatar-glow" />
                    {/* CSS-only circular animated ring */}
                    <div className="avatar-spinner">
                        <div className="avatar-spinner-inner">
                            <Image
                                src={profile.image}
                                width={800} height={800}
                                alt="Profile"
                                className="avatar-img"
                            />
                        </div>
                    </div>
                </div>

                {/* Name & Title */}
                <div className="text-center mb-4">
                    <h1 className="side-name text-lg font-bold tracking-widest text-white uppercase mb-2">
                        {profile.name}
                    </h1>
                    <div className="side-role inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-mono tracking-wide">
                        <span className="status-dot" />
                        <span className="text-cyan-300">&lt; {profile.position} /&gt;</span>
                    </div>
                </div>

                {/* Availability badge */}
                <div className="avail-badge flex items-center gap-2 px-4 py-2 rounded-xl mb-6 w-full max-w-[320px]">
                    <span className="text-lg">👋🏼</span>
                    <span className="text-[13px] text-slate-300 leading-tight">Open for part-time, service & commission</span>
                </div>

                {/* Info Section */}
                <div className="info-card w-full rounded-2xl p-4 mb-4">
                    <p className="text-[14px] font-bold tracking-widest text-cyan-400 uppercase mb-3 text-center">Contact Info</p>
                    <div className="space-y-2.5">
                        {info.map((dt) => (
                            <div key={dt.id} className="info-row flex items-center gap-2.5 px-2 py-1.5 rounded-lg group">
                                <div className="info-icon-wrap flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center">
                                    <Image src={dt.image} width={18} height={18} alt={dt.type} className="opacity-80 group-hover:opacity-100 transition" />
                                </div>
                                <span className="text-[14px] text-slate-300 truncate group-hover:text-white transition">{dt.data}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Socials */}
            <div className="socials-bar px-4 py-4 relative z-10">
                <p className="text-[12px] font-bold tracking-widest text-cyan-400 uppercase mb-3 text-center">Find Me On</p>
                <div className="flex justify-center gap-2">
                    {socials.map((soc) => (
                        <Link key={soc.id} href={soc.url} target="_blank" rel="noopener noreferrer">
                            <div className="social-icon-btn w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110">
                                <Image src={soc.image} width={24} height={24} alt={soc.name} className="rounded-md" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Download CV */}
            <div className="px-4 pb-8 relative z-10">
                <button
                    onClick={downloadResume}
                    className="cv-btn w-full py-3 rounded-2xl text-sm font-bold tracking-widest uppercase transition-all duration-300 hover:scale-[1.02] active:scale-95"
                >
                    <span className="flex items-center justify-center gap-2">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                            <polyline points="7 10 12 15 17 10"/>
                            <line x1="12" y1="15" x2="12" y2="3"/>
                        </svg>
                        Download CV
                    </span>
                </button>
            </div>

            <style jsx>{`
                .side-panel {
                    background: linear-gradient(180deg, #060d1a 0%, #080f1e 50%, #060d1a 100%);
                    border-right: 1px solid rgba(0, 229, 255, 0.08);
                }
                .side-ambient-top {
                    position: absolute;
                    top: -60px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 200px;
                    height: 200px;
                    background: radial-gradient(circle, rgba(0,229,255,0.12) 0%, transparent 70%);
                    pointer-events: none;
                }
                .side-ambient-bottom {
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    width: 150px;
                    height: 150px;
                    background: radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%);
                    pointer-events: none;
                }
                .avatar-glow {
                    position: absolute;
                    inset: -16px;
                    border-radius: 50%;
                    background: radial-gradient(circle, rgba(0,229,255,0.18) 0%, transparent 65%);
                    z-index: -1;
                    pointer-events: none;
                }
                /* Spinning conic-gradient ring */
                .avatar-spinner {
                    width: 136px;
                    height: 136px;
                    border-radius: 50%;
                    background: conic-gradient(from 0deg, #00e5ff, #7c3aed, #0ea5e9, #00e5ff);
                    padding: 3px;
                    animation: spin-ring 3s linear infinite;
                    box-shadow: 0 0 18px rgba(0,229,255,0.35), 0 0 40px rgba(0,229,255,0.12);
                }
                .avatar-spinner-inner {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    overflow: hidden;
                    background: #060d1a;
                    padding: 2px;
                    animation: counter-spin-ring 3s linear infinite;
                }
                .avatar-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 50%;
                    display: block;
                }
                @keyframes spin-ring {
                    from { transform: rotate(0deg); }
                    to   { transform: rotate(360deg); }
                }
                @keyframes counter-spin-ring {
                    from { transform: rotate(0deg); }
                    to   { transform: rotate(-360deg); }
                }
                .side-name {
                    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
                    letter-spacing: 0.15em;
                    font-size: 0.85rem;
                    text-shadow: 0 0 20px rgba(0,229,255,0.3);
                }
                .side-role {
                    background: rgba(0,229,255,0.06);
                    border: 1px solid rgba(0,229,255,0.15);
                }
                .status-dot {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background: #22c55e;
                    box-shadow: 0 0 6px #22c55e;
                    animation: pulse-dot 2s ease-in-out infinite;
                    display: inline-block;
                }
                @keyframes pulse-dot {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.6; transform: scale(0.8); }
                }
                .avail-badge {
                    background: rgba(34, 197, 94, 0.06);
                    border: 1px solid rgba(34, 197, 94, 0.15);
                }
                .info-card {
                    background: rgba(255,255,255,0.02);
                    border: 1px solid rgba(255,255,255,0.06);
                    backdrop-filter: blur(10px);
                }
                .info-row {
                    transition: background 0.2s;
                }
                .info-row:hover {
                    background: rgba(0,229,255,0.05);
                }
                .info-icon-wrap {
                    background: rgba(0,229,255,0.08);
                }
                .socials-bar {
                    border-top: 1px solid rgba(255,255,255,0.05);
                }
                .social-icon-btn {
                    background: rgba(255,255,255,0.04);
                    border: 1px solid rgba(255,255,255,0.08);
                }
                .social-icon-btn:hover {
                    background: rgba(0,229,255,0.1);
                    border-color: rgba(0,229,255,0.25);
                    box-shadow: 0 0 12px rgba(0,229,255,0.15);
                }
                .cv-btn {
                    background: linear-gradient(135deg, #0ea5e9 0%, #7c3aed 100%);
                    color: white;
                    box-shadow: 0 0 20px rgba(14,165,233,0.25), inset 0 1px 0 rgba(255,255,255,0.1);
                    border: 1px solid rgba(255,255,255,0.1);
                }
                .cv-btn:hover {
                    box-shadow: 0 0 30px rgba(14,165,233,0.4), inset 0 1px 0 rgba(255,255,255,0.15);
                }
            `}</style>
        </aside>
    )
}