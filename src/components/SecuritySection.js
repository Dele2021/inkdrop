'use client';
import React, { useState, useEffect } from 'react';
import { ShieldCheck, Lock, ExternalLink, Copy, Check, Eye } from 'lucide-react';
import { SpotlightCard } from './SpotlightCard';
import { playMicroSound } from '../utils/sound';

const CONTRACT = '0x9a333b47A2C4B71a7c71b1b4843316135Dca0AB9';

const cards = [
  { title: 'Straight to your wallet', desc: 'Funds go from payer to you in one transaction. InkDrop has no balance of yours to freeze or lose.', accent: '#8B5CF6', glow: 'rgba(139,92,246,0.12)', icon: Lock },
  { title: 'Every payment is public', desc: 'Each receipt links to the transaction on Ink Explorer, so you and your client can both check it.', accent: '#3B82F6', glow: 'rgba(59,130,246,0.1)', icon: Eye },
  { title: 'Code you can read', desc: 'The contract source is published and verified on the explorer. What we can change: fee (capped at 5%). Nothing else.', accent: '#10B981', glow: 'rgba(16,185,129,0.1)', icon: ShieldCheck },
  { title: 'No KYC required', desc: "Connect a wallet. Create a link. That's it. No document uploads, credit checks, or artificial account freezes.", accent: '#F59E0B', glow: 'rgba(245,158,11,0.08)', icon: Lock },
];

export const SecuritySection = () => {
  const [copied, setCopied] = useState(false);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const t = setInterval(() => { setPulse(true); setTimeout(() => setPulse(false), 1200); }, 5000);
    return () => clearInterval(t);
  }, []);

  const copy = () => {
    playMicroSound('click');
    navigator.clipboard?.writeText(CONTRACT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="security" className="relative py-28 px-4 sm:px-6 lg:px-8 border-t border-white/[0.08] bg-[#090c13] overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(139,92,246,0.07) 0%, transparent 70%)' }} />
      <div className="max-w-7xl mx-auto relative">
        <div className="mb-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#A78BFA] font-semibold">[ 03 / SECURITY ]</span>
        </div>
        <div className="max-w-3xl mb-14">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Your money never sits with us.
          </h2>
          <p className="text-base sm:text-lg text-[#9CA3AF]">
            Each payment moves from your client to you in a single step, through a public program anyone can inspect.
          </p>
        </div>

        <div className="mb-10 p-5 sm:p-7 rounded-2xl bg-gradient-to-r from-[#0d0a1a] via-[#0a0d14] to-[#060d14] border border-white/10 relative overflow-hidden">
          <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div className="flex items-center gap-4">
              <div className="relative shrink-0">
                <div className="w-14 h-14 rounded-2xl bg-[#7132F5]/20 border border-[#7132F5]/40 flex items-center justify-center shadow-[0_0_30px_rgba(113,50,245,0.25)]">
                  <ShieldCheck className="w-7 h-7 text-[#A78BFA]" />
                </div>
                <span className={`absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-[#090c13] ${pulse ? 'bg-emerald-300' : 'bg-emerald-500'} transition-colors duration-500`} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[#A78BFA] font-bold">InkDrop contract on Ink (chain ID 57073)</span>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30 text-emerald-400">VERIFIED</span>
                </div>
                <div className="font-mono text-sm sm:text-base text-white font-bold tracking-tight truncate max-w-[260px] sm:max-w-none">{CONTRACT}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button onClick={copy}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/15 bg-white/[0.03] hover:bg-white/[0.07] text-white font-mono text-xs font-semibold transition-all cursor-pointer">
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#A78BFA]" />}
                {copied ? 'Copied!' : 'Copy Address'}
              </button>
              <a href={`https://explorer.inkonchain.com/address/${CONTRACT}`} target="_blank" rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#7132F5]/40 bg-[#7132F5]/10 hover:bg-[#7132F5]/20 text-[#C4B5FD] font-mono text-xs font-semibold transition-all">
                <Eye className="w-3.5 h-3.5" />Open on Ink Explorer<ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {cards.map(c => {
            const Icon = c.icon;
            return (
              <SpotlightCard key={c.title} className="flex flex-col" spotlightColor={c.glow}>
                <div className="absolute top-0 left-0 right-0 h-[2px] opacity-60"
                  style={{ background: `linear-gradient(90deg, transparent, ${c.accent}, transparent)` }} />
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                  style={{ background: c.glow, border: `1px solid ${c.accent}30`, color: c.accent }}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">{c.title}</h3>
                <p className="text-sm sm:text-base text-[#9CA3AF] leading-relaxed">{c.desc}</p>
              </SpotlightCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};
