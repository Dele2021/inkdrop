'use client';
import React from 'react';
import { Link2, Share2, Wallet, ArrowRight } from 'lucide-react';
import { SpotlightCard } from './SpotlightCard';
import { UsdcIcon } from './Icons';

const steps = [
  {
    n: '01', icon: Link2, title: 'Create',
    desc: 'Type what the payment is for and how much. You get a link straight away.',
    preview: (
      <div className="mt-6 p-3.5 rounded-xl bg-black/60 border border-white/10 font-mono text-xs text-left">
        <div className="text-[#9CA3AF] mb-1.5">Generated link:</div>
        <div className="flex items-center justify-between gap-2 bg-white/[0.04] p-2.5 rounded-lg border border-white/5">
          <span className="text-[#C4B5FD] truncate">[YOUR-DOMAIN]/pay/invoice-89a</span>
          <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30 shrink-0">Active</span>
        </div>
        <div className="mt-2.5 flex items-center justify-between text-[11px] text-[#9CA3AF]">
          <span>Amount: <strong className="text-white">500 USDC</strong></span>
          <span>Fee: <strong className="text-purple-300">1% ($5.00)</strong></span>
        </div>
      </div>
    ),
  },
  {
    n: '02', icon: Share2, title: 'Share',
    desc: 'Send it by email, WhatsApp, or anywhere else. Your client signs in with their email or connects a wallet.',
    preview: (
      <div className="mt-6 p-3.5 rounded-xl bg-black/60 border border-white/10 text-xs text-left">
        <div className="text-[#9CA3AF] font-mono text-[11px] mb-2">Send anywhere:</div>
        <div className="flex flex-wrap gap-1.5">
          {['Email','WhatsApp','X / Twitter','Telegram','Discord'].map(ch => (
            <span key={ch} className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-white font-mono text-[10px]">{ch}</span>
          ))}
        </div>
      </div>
    ),
  },
  {
    n: '03', icon: Wallet, title: 'Get paid',
    desc: 'The money lands in your wallet within seconds. We never hold it in between.',
    preview: (
      <div className="mt-6 p-3.5 rounded-xl bg-black/60 border border-white/10 text-xs text-left">
        <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[11px] mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />Transfer Complete
        </div>
        <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-950/20 border border-emerald-500/20">
          <div className="flex items-center gap-2"><UsdcIcon size={16} /><span className="font-bold text-white text-sm">+495.00 USDC</span></div>
          <span className="text-[11px] font-mono text-[#A78BFA]">1% fee ($5.00)</span>
        </div>
      </div>
    ),
  },
];

export const HowItWorksSection = ({ onOpenCreateModal }) => (
  <section id="how-it-works" className="relative py-28 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06] bg-[#020408]">
    <div className="max-w-7xl mx-auto">
      <div className="mb-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#A78BFA] font-semibold">[ 01 / HOW IT WORKS ]</span>
      </div>
      <div className="max-w-3xl mb-14">
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
          Three steps. No crypto knowledge needed.
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-14">
        {steps.map(s => {
          const Icon = s.icon;
          return (
            <SpotlightCard key={s.n} className="p-6 sm:p-8 flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#7132F5]/10 rounded-full blur-2xl group-hover:bg-[#7132F5]/20 transition-all pointer-events-none" />
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#8B5CF6] group-hover:border-[#8B5CF6]/40 group-hover:scale-105 transition-all">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="font-mono text-sm text-white/30 font-semibold tracking-wider">STEP {s.n}</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#A78BFA] transition-colors">{s.title}</h3>
                <p className="text-sm sm:text-base text-[#9CA3AF] leading-relaxed">{s.desc}</p>
              </div>
              {s.preview}
            </SpotlightCard>
          );
        })}
      </div>
      <div className="text-center">
        <button onClick={onOpenCreateModal}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#A78BFA] hover:text-white transition-colors group cursor-pointer">
          <span>Ready? Create your payment link in 10 seconds</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  </section>
);
