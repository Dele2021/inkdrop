'use client';
import React from 'react';

const nodes = [
  { id: 'create', label: 'Create Link', x: 15, y: 42, icon: '🔗' },
  { id: 'share',  label: 'Share',       x: 50, y: 18, icon: '📤' },
  { id: 'pay',    label: 'Payer',       x: 85, y: 42, icon: '👤' },
  { id: 'usdc',   label: 'USDC',        x: 70, y: 72, icon: '💵' },
  { id: 'wallet', label: 'Your Wallet', x: 30, y: 72, icon: '💼' },
];
const edges = [
  ['create','share'],['share','pay'],['pay','usdc'],['usdc','wallet'],['wallet','create'],['create','pay'],['share','usdc'],
];

export const NetworkSection = () => (
  <section className="relative py-20 px-4 overflow-hidden border-t border-white/[0.06] bg-[#020408]">
    <div className="absolute inset-0 pointer-events-none"
      style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(113,50,245,0.07) 0%, transparent 70%)' }} />
    <div className="max-w-7xl mx-auto">
      <div className="mb-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#A78BFA] font-semibold">[ NETWORK ]</span>
      </div>
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        <div className="flex-1 max-w-lg">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-5">
            A payment network built for the open internet.
          </h2>
          <p className="text-base text-[#9CA3AF] leading-relaxed mb-6">
            InkDrop connects creators, freelancers, and businesses across the world through a single payment link. No borders, no bank accounts, no waiting.
          </p>
          <div className="flex flex-wrap gap-3">
            {['Instant settlement','No intermediaries','Global by default','1% flat fee'].map(t => (
              <span key={t} className="px-3 py-1.5 rounded-full bg-[#7132F5]/10 border border-[#7132F5]/30 text-xs font-mono text-[#C4B5FD]">{t}</span>
            ))}
          </div>
        </div>
        <div className="flex-1 w-full max-w-sm lg:max-w-md relative">
          <div className="relative w-full" style={{ paddingBottom: '90%' }}>
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full overflow-visible">
              <defs>
                <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#7132F5" stopOpacity="0.4"/>
                  <stop offset="100%" stopColor="#7132F5" stopOpacity="0"/>
                </radialGradient>
                {edges.map(([a,b],i) => {
                  const na = nodes.find(n=>n.id===a), nb = nodes.find(n=>n.id===b);
                  return (
                    <linearGradient key={i} id={`eg${i}`} x1={`${na.x}%`} y1={`${na.y}%`} x2={`${nb.x}%`} y2={`${nb.y}%`} gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#7132F5" stopOpacity="0.6"/>
                      <stop offset="100%" stopColor="#A78BFA" stopOpacity="0.2"/>
                    </linearGradient>
                  );
                })}
                {edges.slice(0,4).map(([a,b],i) => {
                  const na = nodes.find(n=>n.id===a), nb = nodes.find(n=>n.id===b);
                  return <path key={`mp${i}`} id={`path${i}`} d={`M${na.x},${na.y} L${nb.x},${nb.y}`} fill="none"/>;
                })}
              </defs>
              {edges.map(([a,b],i) => {
                const na = nodes.find(n=>n.id===a), nb = nodes.find(n=>n.id===b);
                return <line key={i} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y} stroke={`url(#eg${i})`} strokeWidth="0.4" strokeDasharray="1.5 1.5" style={{ animation: `dashMove ${2.5+i*0.3}s linear infinite` }}/>;
              })}
              {edges.slice(0,4).map(([a,b],i) => {
                return (
                  <circle key={`p${i}`} r="0.8" fill="#A78BFA" opacity="0.9">
                    <animateMotion dur={`${2+i*0.5}s`} repeatCount="indefinite" begin={`${i*0.6}s`}>
                      <mpath href={`#path${i}`}/>
                    </animateMotion>
                  </circle>
                );
              })}
              {nodes.map((n,i) => (
                <g key={n.id} style={{ animation: `nodePulse ${3+i*0.4}s ease-in-out infinite`, animationDelay: `${i*0.5}s` }}>
                  <circle cx={n.x} cy={n.y} r="6" fill="url(#nodeGlow)" />
                  <circle cx={n.x} cy={n.y} r="4" fill="#0a0d14" stroke="#7132F5" strokeWidth="0.5" opacity="0.9"/>
                  <circle cx={n.x} cy={n.y} r="4" fill="none" stroke="#A78BFA" strokeWidth="0.3"
                    style={{ animation: `ringPulse ${2.5+i*0.3}s ease-out infinite`, animationDelay: `${i*0.4}s` }}/>
                  <text x={n.x} y={n.y+0.8} textAnchor="middle" dominantBaseline="middle" fontSize="3.2" fill="white" opacity="0.9">{n.icon}</text>
                  <text x={n.x} y={n.y+7} textAnchor="middle" fontSize="2.5" fill="#9CA3AF" fontFamily="monospace">{n.label}</text>
                </g>
              ))}
            </svg>
          </div>
        </div>
      </div>
    </div>
    <style>{`
      @keyframes dashMove { to { stroke-dashoffset: -6; } }
      @keyframes nodePulse { 0%,100%{opacity:0.85} 50%{opacity:1} }
      @keyframes ringPulse { 0%{r:4;opacity:0.8} 100%{r:9;opacity:0} }
    `}</style>
  </section>
);
