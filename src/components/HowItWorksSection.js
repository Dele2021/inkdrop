'use client';
import { useState } from 'react';
import { SectionHeader } from './SectionHeader';
import { Link2, Share2, Wallet, ArrowRight, Check, Send } from 'lucide-react';
import { UsdcIcon, InkChainIcon } from './Icons';
import { SpotlightCard } from './SpotlightCard';
import { InteractivePaymentEngine } from './InteractivePaymentEngine';
import { playMicroSound } from '../utils/sound';

export function HowItWorksSection({ onOpenCreateModal }) {
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyTest = () => {
    playMicroSound('click');
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const steps = [
    {
      step: '01',
      title: 'Create',
      desc: 'Enter a title, amount, and get a shareable /pay/[id] link.',
      icon: Link2,
      preview: (
        <div className="mt-6 p-3.5 sm:p-4 rounded-xl bg-black/60 border border-white/10 text-left font-mono text-xs">
          <div className="text-[#9CA3AF] mb-1">Generated Endpoint:</div>
          <div className="flex items-center justify-between text-[#C4B5FD] font-semibold bg-white/[0.04] p-2.5 rounded-lg border border-white/5 gap-2">
            <span className="truncate min-w-0">inkdrop.link/pay/invoice-89a</span>
            <span className="text-[10px] uppercase tracking-wider text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30 shrink-0">
              Active
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] text-[#9CA3AF]">
            <span>Amount: <strong>500 USDC</strong></span>
            <span>Fee: <strong className="text-purple-300">1% ($5.00)</strong></span>
          </div>
        </div>
      ),
    },
    {
      step: '02',
      title: 'Share',
      desc: 'Send the link anywhere. Payer clicks, connects wallet or uses email login.',
      icon: Share2,
      preview: (
        <div className="mt-6 p-3.5 sm:p-4 rounded-xl bg-black/60 border border-white/10 text-left text-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[#9CA3AF] font-mono text-[11px]">Send to client:</span>
            <button
              onClick={handleCopyTest}
              className="text-[#A78BFA] text-[11px] flex items-center gap-1 hover:underline cursor-pointer"
            >
              {copiedLink ? <Check className="w-3 h-3 text-emerald-400" /> : <Send className="w-3 h-3" />}
              {copiedLink ? 'Copied' : 'Copy link'}
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            {['X / Twitter', 'Telegram', 'Email', 'Discord'].map(platform => (
              <span key={platform} className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-white font-mono text-[10px]">{platform}</span>
            ))}
          </div>
        </div>
      ),
    },
    {
      step: '03',
      title: 'Receive',
      desc: 'USDC lands in your wallet instantly on Ink Chain.',
      icon: Wallet,
      preview: (
        <div className="mt-6 p-3.5 sm:p-4 rounded-xl bg-black/60 border border-white/10 text-left text-xs">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-emerald-400 font-mono text-[11px] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Transfer Complete
            </span>
            <span className="text-[#9CA3AF] text-[10px] font-mono">Block #184,291</span>
          </div>
          <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 p-2 rounded-lg bg-emerald-950/20 border border-emerald-500/20">
            <div className="flex items-center gap-2">
              <UsdcIcon size={18} />
              <span className="font-bold text-white text-sm">+495.00 USDC</span>
            </div>
            <span className="text-[11px] font-mono text-[#A78BFA] shrink-0">1% fee ($5.00)</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="how-it-works" className="relative py-28 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06] bg-[#020408]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12">
          <SectionHeader number="02" total="05" tag="How It Works" />
          <span className="font-mono text-xs uppercase tracking-[0.15em] text-[#A78BFA] font-semibold">SIMPLE BY DESIGN</span>
        </div>
        <div className="max-w-4xl mb-14">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Three steps to getting paid onchain.
          </h2>
          <p className="mt-4 text-base sm:text-xl text-[#9CA3AF] leading-relaxed">
            InkDrop is a non-custodial payment protocol built on{' '}
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-950/70 border border-purple-500/40 text-purple-200 text-xs sm:text-sm font-semibold align-middle">
              <InkChainIcon size={14} />
              Ink Chain
            </span>{' '}
            — Kraken&apos;s L2. Send a link. Get paid in{' '}
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-950/70 border border-blue-500/40 text-blue-200 text-xs sm:text-sm font-semibold align-middle">
              <UsdcIcon size={14} />
              USDC
            </span>
            . No wallet setup required for payers. Transparent 1% platform fee.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <SpotlightCard key={item.step} className="p-6 sm:p-8 flex flex-col justify-between">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#7132F5]/10 rounded-full blur-2xl group-hover:bg-[#7132F5]/25 transition-all pointer-events-none" />
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#8B5CF6] group-hover:border-[#8B5CF6]/40 group-hover:scale-105 transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-sm text-white/30 font-semibold tracking-wider">STEP {item.step}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#A78BFA] transition-colors">{item.title}</h3>
                  <p className="text-sm sm:text-base text-[#9CA3AF] leading-relaxed">{item.desc}</p>
                </div>
                <div className="w-full">{item.preview}</div>
              </SpotlightCard>
            );
          })}
        </div>
        <div id="engine-demo" className="pt-8 border-t border-white/[0.08]">
          <InteractivePaymentEngine />
        </div>
        <div className="mt-14 text-center">
          <button onClick={onOpenCreateModal} className="inline-flex items-center gap-2 text-sm font-semibold text-[#A78BFA] hover:text-white transition-colors group cursor-pointer">
            <span>Ready to test the flow? Create your payment link in 10 seconds</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}
