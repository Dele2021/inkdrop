'use client';
import React, { useState, useEffect } from 'react';
import { SectionHeader } from './SectionHeader';
import { Lock, Link as LinkIcon, ShieldCheck, Globe, Copy, Check, ExternalLink, Zap, Eye } from 'lucide-react';
import { SpotlightCard } from './SpotlightCard';
import { playMicroSound } from '../utils/sound';

export const SecuritySection = () => {
  const [copiedContract, setCopiedContract] = useState(false);
  const [verifyPulse, setVerifyPulse] = useState(false);
  const contractAddress = '0x7F8798eA489379659341498B75F348F29aeB5A2';

  useEffect(() => {
    const interval = setInterval(() => {
      setVerifyPulse(true);
      setTimeout(() => setVerifyPulse(false), 1200);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleCopy = () => {
    playMicroSound('click');
    navigator.clipboard?.writeText(contractAddress);
    setCopiedContract(true);
    setTimeout(() => setCopiedContract(false), 2000);
  };

  const securityCards = [
    { icon: Lock, title: 'Non-custodial', desc: 'InkDrop never holds your funds. Payments go directly to your wallet via smart contract.', meta: 'Peer-to-peer settlement', accentColor: '#8B5CF6', glowColor: 'rgba(139,92,246,0.15)' },
    { icon: LinkIcon, title: 'Onchain Transparency', desc: 'Every transaction is verifiable on Ink Chain explorer. No black boxes, no opaque internal ledgers.', meta: '100% Onchain verifiability', accentColor: '#3B82F6', glowColor: 'rgba(59,130,246,0.12)' },
    { icon: ShieldCheck, title: 'Audited Contract', desc: 'Smart contract at 0x7F87...eB5A2. Verified and open source on Ink Chain block explorer.', meta: 'Open-source verified bytecode', accentColor: '#10B981', glowColor: 'rgba(16,185,129,0.12)', hasContractBadge: true },
    { icon: Globe, title: 'No KYC Required', desc: "Connect a wallet. Create a link. That's it. No document uploads, credit checks, or artificial account freezes.", meta: 'Permissionless architecture', accentColor: '#F59E0B', glowColor: 'rgba(245,158,11,0.1)' },
  ];

  return (
    <section id="security" className="relative py-28 px-4 sm:px-6 lg:px-8 border-t border-white/[0.08] bg-[#090c13] overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(139,92,246,0.08) 0%, transparent 70%)' }} />
      <div className="max-w-7xl mx-auto relative">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-14">
          <SectionHeader number="05" total="05" tag="Security" />
          <span className="font-mono text-xs uppercase tracking-[0.15em] text-[#A78BFA] font-semibold">NON-CUSTODIAL BY DESIGN</span>
        </div>
        <div className="max-w-3xl mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">Your funds. Your keys. <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A78BFA] to-[#60A5FA]">Always.</span></h2>
          <p className="mt-4 text-base sm:text-lg text-[#9CA3AF]">Traditional payment gateways can freeze accounts, hold reserves, and reverse settled transactions. InkDrop cannot touch your USDC.</p>
        </div>
        <div className="mb-10 p-5 sm:p-7 rounded-2xl bg-gradient-to-r from-[#0d0a1a] via-[#0a0d14] to-[#060d14] border border-white/[0.10] relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(139,92,246,0.04) 50%, transparent 100%)', backgroundSize: '100% 60px', animation: 'scanline 3s linear infinite' }} />
          <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div className="flex items-center gap-4">
              <div className="relative shrink-0">
                <div className="w-14 h-14 rounded-2xl bg-[#7132F5]/20 border border-[#7132F5]/40 flex items-center justify-center shadow-[0_0_30px_rgba(113,50,245,0.25)]"><ShieldCheck className="w-7 h-7 text-[#A78BFA]" /></div>
                <span className={`absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-[#090c13] ${verifyPulse ? 'bg-emerald-300' : 'bg-emerald-500'} transition-colors duration-500`} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[#A78BFA] font-bold">InkDrop Smart Contract</span>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30 text-emerald-400">VERIFIED</span>
                </div>
                <div className="font-mono text-sm sm:text-base text-white font-bold tracking-tight truncate max-w-[260px] sm:max-w-none">{contractAddress}</div>
                <div className="flex items-center gap-3 mt-1 font-mono text-[11px] text-[#9CA3AF]">
                  <span>Ink Chain · Chain ID 57073</span>
                  <span className="text-white/20">|</span>
                  <span className="text-emerald-400 flex items-center gap-1"><span className={`w-1.5 h-1.5 rounded-full bg-emerald-400 ${verifyPulse ? 'animate-ping' : ''}`} />Invariants checked continuously</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button onClick={handleCopy} className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/15 bg-white/[0.03] hover:bg-white/[0.07] text-white font-mono text-xs font-semibold transition-all cursor-pointer">
                {copiedContract ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#A78BFA]" />}
                <span>{copiedContract ? 'Copied!' : 'Copy Address'}</span>
              </button>
              <a href="https://explorer.inkonchain.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#7132F5]/40 bg-[#7132F5]/10 hover:bg-[#7132F5]/20 text-[#C4B5FD] font-mono text-xs font-semibold transition-all">
                <Eye className="w-3.5 h-3.5" /><span>Ink Explorer</span><ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-10">
          {securityCards.map((card) => {
            const Icon = card.icon;
            return (
              <SpotlightCard key={card.title} className="flex flex-col justify-between relative overflow-hidden" spotlightColor={card.glowColor}>
                <div className="absolute top-0 left-0 right-0 h-[2px] opacity-60" style={{ background: `linear-gradient(90deg, transparent, ${card.accentColor}, transparent)` }} />
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: card.glowColor, border: `1px solid ${card.accentColor}30`, boxShadow: `0 0 20px ${card.glowColor}`, color: card.accentColor }}><Icon className="w-6 h-6" /></div>
                    <span className="text-[11px] font-mono uppercase tracking-wider bg-white/[0.03] px-2.5 py-1 rounded-md border border-white/5" style={{ color: card.accentColor }}>{card.meta}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">{card.title}</h3>
                  <p className="text-sm sm:text-base text-[#9CA3AF] leading-relaxed">{card.desc}</p>
                </div>
                {card.hasContractBadge && (
                  <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                    <div className="flex items-center gap-2 text-white/90 bg-black/60 px-3 py-2 rounded-lg border border-white/10 min-h-[38px]">
                      <span>0x7F87...eB5A2</span>
                      <button onClick={handleCopy} className="text-[#A78BFA] hover:text-white transition-colors cursor-pointer p-0.5">{copiedContract ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}</button>
                    </div>
                    <a href="https://explorer.inkonchain.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[#A78BFA] hover:underline min-h-[38px]"><span>Ink Explorer</span><ExternalLink className="w-3 h-3" /></a>
                  </div>
                )}
              </SpotlightCard>
            );
          })}
        </div>
        <div className="p-5 sm:p-7 rounded-2xl bg-gradient-to-r from-emerald-950/25 via-black/80 to-blue-950/20 border border-emerald-500/25 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 20% 50%, rgba(16,185,129,0.06) 0%, transparent 60%)' }} />
          <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(16,185,129,0.15)]"><ShieldCheck className="w-6 h-6" /></div>
              <div>
                <div className="text-sm font-bold text-white mb-0.5">Continuous Onchain Invariants Verified</div>
                <div className="text-xs text-[#9CA3AF]">Zero admin keys capable of draining balances. Smart contract cannot mint or hold user tokens.</div>
                <div className="flex items-center gap-4 mt-2 font-mono text-[10px] text-[#9CA3AF]">
                  <span className="flex items-center gap-1 text-emerald-400"><Zap className="w-3 h-3" />~1.8s finality</span>
                  <span className="flex items-center gap-1 text-[#A78BFA]"><Lock className="w-3 h-3" />Non-custodial</span>
                  <span className="text-white/60">Chain ID: 57073</span>
                </div>
              </div>
            </div>
            <button onClick={handleCopy} className="w-full sm:w-auto px-5 py-3 text-xs font-mono text-emerald-400 hover:text-white border border-emerald-500/30 hover:border-emerald-500/60 bg-emerald-950/20 hover:bg-emerald-950/40 rounded-xl transition-all whitespace-nowrap cursor-pointer min-h-[44px] flex items-center justify-center gap-2 shrink-0">
              {copiedContract ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedContract ? 'Copied!' : 'Copy Contract: 0x7F87...eB5A2'}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
