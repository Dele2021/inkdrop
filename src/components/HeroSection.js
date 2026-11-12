'use client';
import React, { useState, useEffect } from 'react';
import { ArrowRight, Play, CheckCircle2, Zap, ShieldCheck, Copy } from 'lucide-react';
import { UsdcIcon, InkChainIcon } from './Icons';
import { playMicroSound } from '../utils/sound';

export const HeroSection = ({ onOpenCreateModal, onOpenDemoModal }) => {
  const requests = [
    { title: 'Design sprint and frontend system', amount: 2500, slug: 'sprint-492', tag: 'UI/UX' },
    { title: 'Smart contract security audit', amount: 5200, slug: 'audit-ink-08', tag: 'Web3' },
    { title: 'Monthly engineering retainer', amount: 4500, slug: 'eng-retainer', tag: 'Full-Stack' },
    { title: 'Brand identity & web prototype', amount: 1850, slug: 'brand-proto-41', tag: 'Design' },
  ];
  const [idx, setIdx] = useState(0);
  const [fade, setFade] = useState('in');

  useEffect(() => {
    const t = setInterval(() => {
      setFade('out');
      setTimeout(() => { setIdx(i => (i + 1) % requests.length); setFade('in'); }, 320);
    }, 4000);
    return () => clearInterval(t);
  }, []);

  const r = requests[idx];
  const fee = +(r.amount * 0.01).toFixed(2);
  const net = +(r.amount * 0.99).toFixed(2);

  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-[650px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(113,50,245,0.18) 0%, transparent 65%)' }} />

      <div className="max-w-6xl mx-auto w-full my-auto flex flex-col items-center text-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 mb-6 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] animate-ping shrink-0" />
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.16em] text-[#A78BFA] font-semibold">
            PAYMENT LINKS · BUILT ON INK
          </span>
        </div>

        {/* H1 */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] max-w-4xl mb-5 text-balance">
          Send a link.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#A78BFA]">
            Get paid in digital dollars.
          </span>
        </h1>

        {/* Sub */}
        <p className="text-base sm:text-xl text-[#9CA3AF] max-w-xl mx-auto leading-relaxed mb-8">
          Make a payment link in under a minute. Your client pays with their email or a wallet,
          and the money goes straight to you. One flat 1% fee.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto mb-12">
          <button onClick={() => { playMicroSound('click'); onOpenCreateModal(); }}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#7132F5] hover:bg-[#854BFF] text-white font-bold text-sm tracking-wide flex items-center justify-center gap-2.5 shadow-[0_0_35px_-5px_rgba(113,50,245,0.6)] hover:shadow-[0_0_45px_0px_rgba(113,50,245,0.85)] transition-all duration-300 hover:-translate-y-0.5 cursor-pointer min-h-[52px]">
            <span>Create your first link</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button onClick={() => { playMicroSound('click'); onOpenDemoModal(); }}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/20 hover:border-white/40 font-semibold text-sm tracking-wide flex items-center justify-center gap-2.5 backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 cursor-pointer min-h-[52px]">
            <Play className="w-4 h-4 text-[#A78BFA] fill-[#A78BFA]" />
            <span>Try a test payment</span>
          </button>
        </div>

        {/* Trust chips */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12 text-xs font-mono text-[#9CA3AF]">
          {['1% fee, nothing else', 'Paid in seconds', 'We never hold your money', 'Pay with email or wallet'].map(t => (
            <span key={t} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08]">
              <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />{t}
            </span>
          ))}
        </div>

        {/* Animated payment card mockup */}
        <div className="w-full max-w-md mx-auto relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#7132F5]/40 via-[#8B5CF6]/25 to-[#7132F5]/40 rounded-2xl blur-xl opacity-70 group-hover:opacity-100 transition duration-700 pointer-events-none" />
          <div className="relative bg-[#0a0d14]/90 backdrop-blur-2xl border border-white/15 rounded-2xl p-6 sm:p-7 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] text-left"
            style={{ animation: 'heroFloat 6s ease-in-out infinite' }}>
            {/* corner marks */}
            {['top-2 left-2.5','top-2 right-2.5','bottom-2 left-2.5','bottom-2 right-2.5'].map(p => (
              <span key={p} className={`absolute ${p} font-mono text-[9px] text-white/20 select-none pointer-events-none`}>+</span>
            ))}

            {/* Sender row */}
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#7132F5] to-[#A855F7] flex items-center justify-center text-white font-extrabold text-sm shadow-md shrink-0">AD</div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-white font-semibold text-sm">alex.ink</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#8B5CF6]" />
                  </div>
                  <span className="text-[11px] text-[#9CA3AF] font-mono">is requesting a payment</span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#7132F5]/20 border border-[#7132F5]/40 text-[10px] font-mono text-[#D8B4FE] flex items-center gap-1.5">
                <InkChainIcon size={12} />Ink Chain
              </span>
            </div>

            {/* Animated title + amount */}
            <div className="mb-4" style={{ opacity: fade === 'in' ? 1 : 0, transform: fade === 'in' ? 'translateY(0)' : 'translateY(-6px)', transition: 'all 0.3s ease' }}>
              <p className="text-xs font-mono text-[#9CA3AF] mb-1 uppercase tracking-wider">{r.tag}</p>
              <h3 className="text-lg font-extrabold text-white mb-3">{r.title}</h3>
              <div className="flex items-baseline gap-2.5">
                <span className="text-4xl font-extrabold text-white tabular-nums">${r.amount.toLocaleString()}.00</span>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#2775CA]/20 border border-[#2775CA]/40">
                  <UsdcIcon size={14} /><span className="text-xs font-bold text-white">USDC</span>
                </div>
              </div>
            </div>

            {/* Fee breakdown */}
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs font-mono flex items-center justify-between mb-4">
              <span className="text-[#9CA3AF]">InkDrop fee (1%) <span className="text-purple-300">${fee.toFixed(2)}</span></span>
              <span className="text-[#9CA3AF]">Alex receives <span className="text-emerald-400 font-semibold">${net.toFixed(2)}</span></span>
            </div>

            {/* Network row */}
            <div className="flex items-center justify-between py-2 px-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs text-[#9CA3AF] mb-5">
              <div className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-[#A78BFA]" /><span>Network cost <strong className="text-white font-mono">Under 1 cent</strong></span></div>
              <div className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /><span>~1.8s finality</span></div>
            </div>

            {/* Pay button */}
            <button onClick={() => { playMicroSound('click'); onOpenDemoModal(); }}
              className="w-full py-3.5 rounded-xl bg-[#7132F5] hover:bg-[#854BFF] text-white font-bold text-sm tracking-wide flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-lg shadow-[#7132F5]/30 min-h-[46px]">
              Pay with Email or Wallet <ArrowRight className="w-4 h-4" />
            </button>
            <p className="mt-3 text-center text-[11px] font-mono text-[#9CA3AF]/60">[YOUR-DOMAIN]/pay/{r.slug}</p>
          </div>
        </div>
      </div>

      {/* Powered by strip */}
      <div className="max-w-5xl mx-auto w-full pt-10 border-t border-white/[0.07] mt-12">
        <p className="text-center text-[11px] font-mono uppercase tracking-[0.2em] text-[#9CA3AF]/60 mb-5">Powered by next-generation onchain infrastructure</p>
        <div className="flex flex-wrap items-center justify-center gap-10 opacity-75 hover:opacity-100 transition-opacity">
          <div className="flex items-center gap-2 text-white font-bold text-sm"><InkChainIcon size={20} />Ink Chain</div>
          <div className="flex items-center gap-2 text-white font-extrabold text-sm tracking-wider"><span className="text-[#8B5CF6] font-black text-lg">K</span>KRAKEN</div>
          <div className="flex items-center gap-2 text-white font-semibold text-sm"><span className="w-2.5 h-2.5 rounded-sm bg-gradient-to-tr from-pink-500 to-indigo-500" />Privy</div>
          <div className="flex items-center gap-2 text-white font-semibold text-sm"><div className="w-3.5 h-3.5 rounded-full border-2 border-[#8B5CF6] border-t-transparent animate-spin" />Velodrome</div>
        </div>
      </div>
    </section>
  );
};
