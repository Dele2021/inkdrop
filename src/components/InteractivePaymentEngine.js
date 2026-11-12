'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SectionHeader } from './SectionHeader';
import { SpotlightCard } from './SpotlightCard';
import { playMicroSound } from '../utils/sound';
import {
  ArrowRight, CheckCircle2, Clock, Copy, Check, ExternalLink,
  Zap, Link2, Eye, ChevronRight, Play, Pause, RotateCcw,
  Wallet, ShieldCheck, Globe, TrendingUp,
} from 'lucide-react';

const STEPS = [
  { id: 1, label: 'Configure', short: 'Config' },
  { id: 2, label: 'Share Link', short: 'Share' },
  { id: 3, label: 'Paid', short: 'Paid' },
];

const DEMO_DEFAULTS = {
  title: 'Design Consultation',
  amount: '500',
  currency: 'USDC',
  description: 'Brand identity & strategy session',
};

const FAKE_HASH = '0x4a7f...c3e9';
const CONTRACT = '0x7F8798eA489379659341498B75F348F29aeB5A2';

export const InteractivePaymentEngine = ({ onOpenCreateModal }) => {
  const [activeStep, setActiveStep] = useState(1);
  const [title, setTitle] = useState(DEMO_DEFAULTS.title);
  const [amount, setAmount] = useState(DEMO_DEFAULTS.amount);
  const [description, setDescription] = useState(DEMO_DEFAULTS.description);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedHash, setCopiedHash] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [nudgeVisible, setNudgeVisible] = useState(false);
  const autoRef = useRef(null);

  const fee = amount ? (parseFloat(amount) * 0.01).toFixed(2) : '0.00';
  const net = amount ? (parseFloat(amount) * 0.99).toFixed(2) : '0.00';
  const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').slice(0, 32) || 'payment';
  const paymentUrl = `https://inkdrop.xyz/pay/${slug}`;

  // Nudge: show after 2.5s on step 1 if user hasn't touched a field
  useEffect(() => {
    if (activeStep === 1) {
      const t = setTimeout(() => setNudgeVisible(true), 2500);
      return () => clearTimeout(t);
    } else {
      setNudgeVisible(false);
    }
  }, [activeStep]);

  // Hide nudge once user focuses a field
  useEffect(() => {
    if (focusedField) setNudgeVisible(false);
  }, [focusedField]);

  const goToStep = useCallback((step) => {
    playMicroSound('tick');
    setActiveStep(step);
  }, []);

  const handleNext = useCallback(() => {
    if (activeStep < 3) {
      playMicroSound('click');
      setActiveStep((s) => s + 1);
    }
  }, [activeStep]);

  const handleBack = useCallback(() => {
    if (activeStep > 1) {
      playMicroSound('tick');
      setActiveStep((s) => s - 1);
    }
  }, [activeStep]);

  const handleReset = useCallback(() => {
    playMicroSound('toggle');
    setActiveStep(1);
    setTitle(DEMO_DEFAULTS.title);
    setAmount(DEMO_DEFAULTS.amount);
    setDescription(DEMO_DEFAULTS.description);
    setIsPlaying(false);
    if (autoRef.current) clearInterval(autoRef.current);
  }, []);

  const handleCopyLink = () => {
    playMicroSound('click');
    navigator.clipboard?.writeText(paymentUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyHash = () => {
    playMicroSound('click');
    navigator.clipboard?.writeText(FAKE_HASH);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  // Auto-play: cycle steps every 2.8s
  useEffect(() => {
    if (isPlaying) {
      autoRef.current = setInterval(() => {
        setActiveStep((s) => {
          const next = s < 3 ? s + 1 : 1;
          playMicroSound('tick');
          return next;
        });
      }, 2800);
    } else {
      if (autoRef.current) clearInterval(autoRef.current);
    }
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, [isPlaying]);

  const inputBase = 'w-full px-4 py-3 rounded-xl text-white text-sm font-mono placeholder-white/30 outline-none transition-all duration-300 bg-black/60 border';

  const getInputClass = (field) => {
    if (focusedField === field)
      return inputBase + ' border-[#7132F5] shadow-[0_0_0_3px_rgba(113,50,245,0.3),0_0_18px_rgba(113,50,245,0.2)]';
    if (nudgeVisible)
      return inputBase + ' border-[#7132F5]/60 shadow-[0_0_0_2px_rgba(113,50,245,0.15),0_0_12px_rgba(113,50,245,0.15)] animate-pulse';
    return inputBase + ' border-white/15 hover:border-white/30';
  };

  return (
    <section id="how-it-works" className="relative py-28 px-4 sm:px-6 lg:px-8 border-t border-white/[0.08] bg-black overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full blur-[160px] pointer-events-none -z-10"
        style={{ background: 'radial-gradient(circle, rgba(113,50,245,0.12) 0%, transparent 70%)', animation: 'glowPulse 8s ease-in-out infinite' }} />
      <div className="max-w-7xl mx-auto relative">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-14">
          <SectionHeader number="03" total="05" tag="How It Works" />
          <div className="flex items-center gap-2">
            <button onClick={() => { setIsPlaying((p) => !p); playMicroSound('toggle'); }}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-white/15 bg-white/[0.03] hover:bg-white/[0.07] text-white font-mono text-xs font-semibold transition-all cursor-pointer">
              {isPlaying ? <><Pause className="w-3.5 h-3.5" /><span>Pause</span></> : <><Play className="w-3.5 h-3.5" /><span>Auto-play</span></>}
            </button>
            <button onClick={handleReset}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-white/15 bg-white/[0.03] hover:bg-white/[0.07] text-white font-mono text-xs font-semibold transition-all cursor-pointer">
              <RotateCcw className="w-3.5 h-3.5" /><span>Reset</span>
            </button>
          </div>
        </div>

        {/* Step tabs */}
        <div className="flex items-center gap-2 mb-10">
          {STEPS.map((step, i) => (
            <React.Fragment key={step.id}>
              <button onClick={() => goToStep(step.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-mono text-xs font-semibold transition-all cursor-pointer border ${
                  activeStep === step.id
                    ? 'bg-[#7132F5] border-[#7132F5] text-white shadow-[0_0_20px_rgba(113,50,245,0.4)]'
                    : activeStep > step.id
                    ? 'bg-white/[0.06] border-white/20 text-white/70'
                    : 'bg-transparent border-white/10 text-white/40'
                }`}>
                {activeStep > step.id ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <span className="w-4 h-4 rounded-full border border-current flex items-center justify-center text-[10px]">{step.id}</span>}
                <span className="hidden sm:inline">{step.label}</span>
                <span className="sm:hidden">{step.short}</span>
              </button>
              {i < STEPS.length - 1 && <ChevronRight className="w-3.5 h-3.5 text-white/20 shrink-0" />}
            </React.Fragment>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start">
          {/* LEFT: interactive panel */}
          <div>
            {/* STEP 1 */}
            {activeStep === 1 && (
              <SpotlightCard className="p-6 sm:p-8" spotlightColor="rgba(113,50,245,0.12)">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-white">Configure your payment link</h3>
                  {nudgeVisible && !focusedField && (
                    <span className="font-mono text-[10px] text-[#A78BFA] animate-bounce">↓ try it — edit these fields ↓</span>
                  )}
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-[#9CA3AF] mb-1.5">Payment Title</label>
                    <input value={title} onChange={(e) => { setTitle(e.target.value); setIsPlaying(false); }}
                      onFocus={() => setFocusedField('title')} onBlur={() => setFocusedField(null)}
                      placeholder="e.g. Design Consultation" className={getInputClass('title')} />
                  </div>
                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-[#9CA3AF] mb-1.5">Amount (USDC)</label>
                    <input type="number" value={amount} onChange={(e) => { setAmount(e.target.value); setIsPlaying(false); }}
                      onFocus={() => setFocusedField('amount')} onBlur={() => setFocusedField(null)}
                      placeholder="500" className={getInputClass('amount')} />
                  </div>
                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-[#9CA3AF] mb-1.5">Description (optional)</label>
                    <input value={description} onChange={(e) => { setDescription(e.target.value); setIsPlaying(false); }}
                      onFocus={() => setFocusedField('description')} onBlur={() => setFocusedField(null)}
                      placeholder="What is this payment for?" className={getInputClass('description')} />
                  </div>
                  <div className="pt-2 p-4 rounded-xl bg-black/40 border border-white/[0.07] font-mono text-xs space-y-1.5">
                    <div className="flex justify-between text-[#9CA3AF]"><span>Platform fee (1%)</span><span className="text-[#D8B4FE]">${fee}</span></div>
                    <div className="flex justify-between font-bold"><span className="text-white/60">You receive</span><span className="text-emerald-400">${net} USDC</span></div>
                  </div>
                </div>
                <button onClick={handleNext} className="mt-6 w-full py-3.5 rounded-xl bg-[#7132F5] hover:bg-[#854BFF] text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-[0_0_30px_rgba(113,50,245,0.4)] cursor-pointer">
                  Generate Link <ArrowRight className="w-4 h-4" />
                </button>
              </SpotlightCard>
            )}

            {/* STEP 2 */}
            {activeStep === 2 && (
              <SpotlightCard className="p-6 sm:p-8" spotlightColor="rgba(113,50,245,0.12)">
                <h3 className="text-lg font-bold text-white mb-6">Share your payment link</h3>
                <div className="p-4 rounded-xl bg-black/60 border border-[#7132F5]/30 mb-5">
                  <div className="font-mono text-[11px] text-[#9CA3AF] uppercase tracking-wider mb-1">Your InkDrop Link</div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-sm text-[#C4B5FD] truncate">{paymentUrl}</span>
                    <button onClick={handleCopyLink} className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#7132F5]/20 border border-[#7132F5]/40 text-[#C4B5FD] font-mono text-xs font-semibold hover:bg-[#7132F5]/30 transition-all cursor-pointer">
                      {copiedLink ? <><Check className="w-3.5 h-3.5 text-emerald-400" /><span>Copied!</span></> : <><Copy className="w-3.5 h-3.5" /><span>Copy</span></>}
                    </button>
                  </div>
                </div>
                <div className="space-y-3 mb-6">
                  {[{ icon: Globe, label: 'Share via link, email, or invoice' }, { icon: Wallet, label: 'Client pays with any Ink Chain wallet' }, { icon: ShieldCheck, label: 'Smart contract routes funds directly to you' }].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-3 text-sm text-[#9CA3AF]"><Icon className="w-4 h-4 text-[#8B5CF6] shrink-0" />{label}</div>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button onClick={handleBack} className="px-5 py-3 rounded-xl border border-white/15 bg-white/[0.03] hover:bg-white/[0.07] text-white font-mono text-xs font-semibold transition-all cursor-pointer">Back</button>
                  <button onClick={handleNext} className="flex-1 py-3 rounded-xl bg-[#7132F5] hover:bg-[#854BFF] text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-[0_0_30px_rgba(113,50,245,0.35)] cursor-pointer">
                    Simulate Payment <Zap className="w-4 h-4" />
                  </button>
                </div>
              </SpotlightCard>
            )}

            {/* STEP 3 */}
            {activeStep === 3 && (
              <SpotlightCard className="p-6 sm:p-8" spotlightColor="rgba(16,185,129,0.1)">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center"><CheckCircle2 className="w-5 h-5 text-emerald-400" /></div>
                  <div><div className="font-bold text-white">Payment Confirmed</div><div className="font-mono text-xs text-emerald-400">~1.8s · Ink Chain L2</div></div>
                </div>
                <div className="p-4 rounded-xl bg-black/60 border border-emerald-500/20 space-y-3 mb-5 font-mono text-xs">
                  <div className="flex justify-between"><span className="text-[#9CA3AF]">Amount sent</span><span className="text-white font-bold">${amount} USDC</span></div>
                  <div className="flex justify-between"><span className="text-[#9CA3AF]">Platform fee (1%)</span><span className="text-[#D8B4FE]">-${fee}</span></div>
                  <div className="h-px bg-white/[0.06]" />
                  <div className="flex justify-between"><span className="text-[#9CA3AF] font-bold">You received</span><span className="text-emerald-400 font-black text-sm">${net} USDC</span></div>
                  <div className="h-px bg-white/[0.06]" />
                  <div className="flex justify-between items-center">
                    <span className="text-[#9CA3AF]">Tx hash</span>
                    <div className="flex items-center gap-2">
                      <span className="text-white/70">{FAKE_HASH}</span>
                      <button onClick={handleCopyHash} className="text-[#A78BFA] hover:text-white transition-colors cursor-pointer">{copiedHash ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}</button>
                      <a href="https://explorer.inkonchain.com" target="_blank" rel="noreferrer" className="text-[#A78BFA] hover:text-white transition-colors"><ExternalLink className="w-3 h-3" /></a>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={handleReset} className="flex-1 py-3 rounded-xl border border-white/15 bg-white/[0.03] hover:bg-white/[0.07] text-white font-mono text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-2">
                    <RotateCcw className="w-3.5 h-3.5" /> Try Again
                  </button>
                  <button onClick={onOpenCreateModal} className="flex-1 py-3 rounded-xl bg-[#7132F5] hover:bg-[#854BFF] text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-[0_0_30px_rgba(113,50,245,0.35)] cursor-pointer">
                    Create Real Link <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </SpotlightCard>
            )}
          </div>

          {/* RIGHT: live preview card */}
          <div className="relative">
            <div className="font-mono text-[11px] uppercase tracking-wider text-[#9CA3AF] mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />Live Preview
            </div>
            <div className="rounded-2xl border border-white/[0.10] bg-gradient-to-b from-white/[0.04] to-black/80 backdrop-blur-xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
              <div className="p-5 border-b border-white/[0.07] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#7132F5]/30 border border-[#7132F5]/50 flex items-center justify-center"><Link2 className="w-3.5 h-3.5 text-[#A78BFA]" /></div>
                  <span className="font-mono text-xs text-white font-bold">inkdrop.xyz/pay/{slug}</span>
                </div>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />LIVE
                </span>
              </div>
              <div className="p-6">
                <div className="text-center mb-6">
                  <div className="text-[11px] font-mono text-[#9CA3AF] uppercase tracking-wider mb-1">{description || 'Payment request'}</div>
                  <div className="text-4xl font-black text-white font-mono">${amount || '0'}</div>
                  <div className="text-sm font-mono text-[#D8B4FE] mt-1">USDC · Ink Chain</div>
                  <div className="mt-1 text-xs font-mono text-[#9CA3AF]">{title}</div>
                </div>
                {activeStep === 3 ? (
                  <div className="py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-sm text-center flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> Payment Complete
                  </div>
                ) : (
                  <button className="w-full py-3.5 rounded-xl bg-[#7132F5] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(113,50,245,0.4)] cursor-default">
                    <Wallet className="w-4 h-4" /> Connect Wallet & Pay
                  </button>
                )}
                <div className="mt-4 flex items-center justify-between font-mono text-[11px] text-[#9CA3AF]">
                  <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-[#8B5CF6]" />Non-custodial</span>
                  <span className="flex items-center gap-1"><Zap className="w-3.5 h-3.5 text-[#8B5CF6]" />~1.8s finality</span>
                  <span className="flex items-center gap-1"><TrendingUp className="w-3.5 h-3.5 text-[#8B5CF6]" />1% fee only</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
