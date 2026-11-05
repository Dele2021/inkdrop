'use client';
import React, { useState, useEffect } from 'react';
import { SectionHeader } from './SectionHeader';
import { ArrowRight, CheckCircle2, Zap, Lock, Link2, TrendingUp } from 'lucide-react';

export const FinalCtaSection = ({ onOpenCreateModal, onOpenDemoModal }) => {
  const [tick, setTick] = useState(0);
  const amounts = [1200, 850, 3500, 420, 2200];
  useEffect(() => {
    const t = setInterval(() => setTick((prev) => (prev + 1) % amounts.length), 4000);
    return () => clearInterval(t);
  }, []);
  const amount = amounts[tick];
  const fee = (amount * 0.01).toFixed(2);
  const net = (amount * 0.99).toFixed(2);
  return (
    <section className="relative py-32 px-4 sm:px-6 lg:px-8 border-t border-white/[0.08] overflow-hidden bg-black">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[650px] rounded-full blur-[180px] pointer-events-none -z-10" style={{background:'radial-gradient(circle, rgba(113,50,245,0.32) 0%, rgba(88,28,135,0.18) 45%, transparent 72%)',animation:'glowPulse 8s ease-in-out infinite'}} />
      <div className="absolute inset-0 opacity-[0.025] noise-overlay pointer-events-none -z-10" />
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-[#8B5CF6] tracking-wider uppercase px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] animate-pulse" />
              <span>INK CHAIN L2 · NON-CUSTODIAL PROTOCOL</span>
            </div>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#A78BFA] font-semibold mb-5 block">GET STARTED FREE</span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08] mb-6">
              Start accepting{' '}
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A78BFA] via-[#C4B5FD] to-[#60A5FA]">crypto payments</span>
                <span className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full" style={{background:'linear-gradient(90deg, #7132F5, #A78BFA, #60A5FA)'}} />
              </span>{' '}today.
            </h2>
            <p className="text-base sm:text-lg text-[#9CA3AF] leading-relaxed mb-10 max-w-lg mx-auto lg:mx-0">Transparent 1% platform fee. No gas complexity. No merchant accounts. No freezes. Just a link.</p>
            <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-3.5 mb-12">
              <button onClick={onOpenCreateModal} className="w-full sm:w-auto px-8 py-4 sm:py-5 rounded-full bg-[#7132F5] hover:bg-[#854BFF] text-white font-extrabold text-base tracking-wide flex items-center justify-center gap-3 shadow-[0_0_40px_rgba(113,50,245,0.6)] hover:shadow-[0_0_70px_rgba(113,50,245,0.9)] transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 cursor-pointer min-h-[56px]">
                <span>Create Your First Link</span><ArrowRight className="w-5 h-5" />
              </button>
              <button onClick={onOpenDemoModal} className="w-full sm:w-auto px-7 py-4 sm:py-5 rounded-full bg-white/[0.04] hover:bg-white/[0.09] text-white border border-white/20 hover:border-white/40 font-semibold text-sm tracking-wide flex items-center justify-center gap-2 backdrop-blur-md transition-all duration-200 cursor-pointer min-h-[56px]">
                <span>Explore Interactive Demo</span>
              </button>
            </div>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-5 text-xs font-mono text-[#9CA3AF]">
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /><span>Zero setup fees</span></div>
              <span className="text-white/20">·</span>
              <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-[#8B5CF6]" /><span>~1.8s Ink Chain finality</span></div>
              <span className="text-white/20">·</span>
              <div className="flex items-center gap-2"><Lock className="w-4 h-4 text-purple-400" /><span>Non-custodial smart contracts</span></div>
            </div>
          </div>
          <div className="relative flex items-center justify-center lg:justify-end">
            <div className="absolute inset-0 pointer-events-none" style={{background:'radial-gradient(ellipse at 60% 50%, rgba(113,50,245,0.18) 0%, transparent 65%)'}} />
            <div className="relative w-full max-w-[380px] rounded-3xl border border-white/[0.12] bg-gradient-to-b from-white/[0.06] to-black/80 backdrop-blur-xl p-7 shadow-[0_30px_80px_rgba(0,0,0,0.6),0_0_60px_rgba(113,50,245,0.15)] overflow-hidden" style={{animation:'heroFloat 7s ease-in-out infinite'}}>
              <div className="absolute top-0 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#7132F5]/30 border border-[#7132F5]/50 flex items-center justify-center"><Link2 className="w-4 h-4 text-[#A78BFA]" /></div>
                  <span className="font-mono text-xs text-white font-bold tracking-tight">InkDrop Payment</span>
                </div>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />LIVE
                </span>
              </div>
              <div className="mb-6 text-center">
                <div className="text-[11px] font-mono text-[#9CA3AF] uppercase tracking-wider mb-1">Invoice Amount</div>
                <div className="text-5xl font-black text-white font-mono tracking-tight" key={tick}>${amount.toLocaleString()}</div>
                <div className="text-sm font-mono text-[#D8B4FE] mt-1">USDC</div>
              </div>
              <div className="space-y-2.5 mb-6 p-4 rounded-2xl bg-black/60 border border-white/[0.07]">
                <div className="flex justify-between items-center text-xs font-mono"><span className="text-[#9CA3AF]">InkDrop Fee (1%)</span><span className="text-[#D8B4FE]">-${fee}</span></div>
                <div className="h-px bg-white/[0.06]" />
                <div className="flex justify-between items-center text-sm font-mono font-bold"><span className="text-[#9CA3AF]">You receive</span><span className="text-emerald-400 text-base">${parseFloat(net).toLocaleString()}</span></div>
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono text-[#9CA3AF]">
                <span className="flex items-center gap-1.5"><Zap className="w-3 h-3 text-[#8B5CF6]" />Ink Chain L2</span>
                <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />~1.8s finality</span>
              </div>
              <div className="absolute bottom-0 left-[30%] right-[30%] h-px bg-gradient-to-r from-transparent via-[#7132F5]/40 to-transparent" />
            </div>
            <div className="absolute -top-3 -right-3 sm:-right-6 bg-black/90 border border-white/15 rounded-xl px-3 py-2 text-xs font-mono backdrop-blur-md shadow-xl" style={{animation:'heroFloat 7s ease-in-out infinite',animationDelay:'0.8s'}}>
              <div className="text-[#9CA3AF] text-[10px] uppercase tracking-wider mb-0.5">Avg Savings vs Stripe</div>
              <div className="text-emerald-400 font-bold flex items-center gap-1"><TrendingUp className="w-3.5 h-3.5" />2.9% → 1.0%</div>
            </div>
            <div className="absolute -bottom-3 -left-3 sm:-left-6 bg-black/90 border border-white/15 rounded-xl px-3 py-2 text-xs font-mono backdrop-blur-md shadow-xl" style={{animation:'heroFloat 7s ease-in-out infinite',animationDelay:'1.6s'}}>
              <div className="text-[#9CA3AF] text-[10px] uppercase tracking-wider mb-0.5">Settlement</div>
              <div className="text-white font-bold">Instant · Non-custodial</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
