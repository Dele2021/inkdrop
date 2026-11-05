'use client';

import React, { useState, useEffect } from 'react';
import { SectionHeader } from './SectionHeader';
import { UsdcIcon, InkChainIcon } from './Icons';
import { ArrowRight, Play, CheckCircle2, ShieldCheck, Zap, Copy, ExternalLink, Sparkles, RefreshCw } from 'lucide-react';
import { playMicroSound } from '../utils/sound';


export const HeroSection = ({
 onOpenCreateModal,
 onOpenDemoModal,
}) => {
 const paymentRequests = [
 {
 title: 'Design Sprint & Frontend System',
 amount: '$2,500.00',
 numeric: 2500,
 slug: 'sprint-492',
 tag: 'UI/UX & Architecture',
 },
 {
 title: 'Smart Contract Security Audit',
 amount: '$5,200.00',
 numeric: 5200,
 slug: 'audit-ink-08',
 tag: 'Onchain Verification',
 },
 {
 title: 'Monthly Engineering Retainer',
 amount: '$4,500.00',
 numeric: 4500,
 slug: 'eng-retainer',
 tag: 'Full-Stack Delivery',
 },
 {
 title: 'Brand Identity & Web Prototype',
 amount: '$1,850.00',
 numeric: 1850,
 slug: 'brand-proto-41',
 tag: 'Product Launch',
 },
 ];

 const [currentIndex, setCurrentIndex] = useState(0);
 const [fadeState, setFadeState] = useState('visible');

 useEffect(() => {
 const timer = setInterval(() => {
 setFadeState('fading');
 setTimeout(() => {
 setCurrentIndex((prev) => (prev + 1) % paymentRequests.length);
 setFadeState('visible');
 }, 350);
 }, 4200);

 return () => clearInterval(timer);
 }, [paymentRequests.length]);

 const activeRequest = paymentRequests[currentIndex];

 return (
 <section className="relative min-h-screen flex flex-col justify-between pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
 {/* Hero shine effect overlay */}
 <div className="absolute inset-x-0 top-0 h-[650px] hero-shine pointer-events-none" />

 {/* Section Counter Top Left */}
 <div className="max-w-7xl w-full mx-auto pt-4 pb-6">
 <SectionHeader number="01" total="05" tag="Hero" />
 </div>

 {/* Centered Main Hero Block */}
 <div className="max-w-6xl mx-auto w-full my-auto flex flex-col items-center text-center">
 {/* Eyebrow label */}
 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 mb-6 backdrop-blur-md max-w-full">
 <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] animate-ping shrink-0" />
 <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.14em] sm:tracking-[0.18em] text-[#A78BFA] font-semibold truncate sm:whitespace-normal">
 NEXT-GEN PAYMENT PROTOCOL ON INK CHAIN
 </span>
 </div>

 {/* H1 Headline */}
 <h1 className="text-3xl xs:text-4xl sm:text-6xl lg:text-7xl xl:text-[76px] font-extrabold tracking-tight text-white leading-[1.1] max-w-5xl mb-6 text-balance break-words">
 The world&apos;s fastest way to request{' '}
 <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#A78BFA]">
 crypto payments.
 </span>
 </h1>

 {/* Subhead */}
 <p className="text-base sm:text-xl text-[#9CA3AF] max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-10 text-balance font-normal px-2">
 Create a payment link in seconds. Get paid in USDC on Ink Chain — instant onchain settlement with a transparent 1% platform fee.
 </p>

 {/* CTA Buttons */}
 <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto mb-10 sm:mb-14">
 <button
 onClick={() => {
 playMicroSound('click');
 onOpenCreateModal();
 }}
 className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#7132F5] hover:bg-[#854BFF] text-white font-bold text-sm sm:text-base tracking-wide flex items-center justify-center gap-2.5 shadow-[0_0_35px_-5px_rgba(113,50,245,0.6)] hover:shadow-[0_0_45px_0px_rgba(113,50,245,0.85)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer min-h-[48px]"
 >
 <span>Create Your Link</span>
 <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
 </button>

 <button
 onClick={() => {
 playMicroSound('click');
 onOpenDemoModal();
 }}
 className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/20 hover:border-white/40 font-semibold text-sm sm:text-base tracking-wide flex items-center justify-center gap-2.5 backdrop-blur-md transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer min-h-[48px]"
 >
 <Play className="w-4 h-4 text-[#A78BFA] fill-[#A78BFA]" />
 <span>View Demo</span>
 </button>
 </div>

 {/* Hero Visual: Animated Floating Mockup of InkDrop Pay Page */}
 <div className="w-full max-w-xl mx-auto my-4 sm:my-6 relative group px-1">
 {/* Card background spotlight glow */}
 <div className="absolute -inset-1 bg-gradient-to-r from-[#7132F5]/40 via-[#8B5CF6]/30 to-[#7132F5]/40 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition duration-700 pointer-events-none" />

 {/* Floating Pay Card with Cyberpunk Corner Crosshairs */}
 <div className="relative animate-hero-float bg-[#0a0d14]/90 backdrop-blur-2xl border border-white/15 rounded-2xl p-4 sm:p-7 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] text-left">
 {/* Cyberpunk corner crosshairs */}
 <span className="absolute top-2 left-2.5 font-mono text-[9px] text-white/20 pointer-events-none select-none">+</span>
 <span className="absolute top-2 right-2.5 font-mono text-[9px] text-white/20 pointer-events-none select-none">+</span>
 <span className="absolute bottom-2 left-2.5 font-mono text-[9px] text-white/20 pointer-events-none select-none">+</span>
 <span className="absolute bottom-2 right-2.5 font-mono text-[9px] text-white/20 pointer-events-none select-none">+</span>

 {/* Top Bar inside mockup */}
 <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2.5 pb-4 border-b border-white/[0.08]">
 <div className="flex items-center gap-3">
 <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-[#7132F5] to-[#A855F7] flex items-center justify-center text-white font-extrabold text-sm shadow-md shrink-0">
 AD
 </div>
 <div>
 <div className="flex items-center gap-1.5">
 <span className="text-white font-semibold text-sm">alex.ink</span>
 <CheckCircle2 className="w-3.5 h-3.5 text-[#8B5CF6]" />
 </div>
 <span className="text-[11px] sm:text-xs text-[#9CA3AF] font-mono">0x4F92...B8c1</span>
 </div>
 </div>
 <div className="flex items-center gap-2">
 <span className="px-2 sm:px-2.5 py-1 rounded-full bg-[#7132F5]/20 border border-[#7132F5]/40 text-[10px] sm:text-[11px] font-mono text-[#D8B4FE] flex items-center gap-1.5">
 <InkChainIcon size={14} />
 Ink Chain L2
 </span>
 </div>
 </div>

 {/* Title & Amount with LIVE ANIMATION */}
 <div className="py-4 sm:py-6">
 <div className="flex items-center justify-between gap-2">
 <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-[#9CA3AF]">
 Payment Request
 </span>
 <span className="text-[10px] font-mono text-[#D8B4FE] bg-[#7132F5]/20 px-2 py-0.5 rounded border border-[#7132F5]/40 animate-pulse truncate max-w-[150px]">
 {activeRequest.tag}
 </span>
 </div>

 {/* Animated Headline for Design Sprint & Frontend System */}
 <div className="mt-2 min-h-[36px] sm:min-h-[40px] flex items-center">
 <h3
 className={`text-lg sm:text-2xl font-extrabold text-white transition-all duration-300 transform break-words ${
 fadeState === 'visible'
 ? 'opacity-100 translate-y-0 text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#D8B4FE]'
 : 'opacity-0 -translate-y-2'
 }`}
 >
 {activeRequest.title}
 <span className="inline-block w-1.5 h-4 sm:h-5 ml-1.5 bg-[#8B5CF6] rounded-sm animate-pulse align-middle" />
 </h3>
 </div>
 
 <div className="mt-3 sm:mt-4 flex flex-wrap items-baseline gap-2 sm:gap-2.5">
 <span
 className={`text-3xl sm:text-5xl font-extrabold text-white tracking-tight tabular-nums transition-all duration-300 ${
 fadeState === 'visible' ? 'opacity-100 scale-100' : 'opacity-40 scale-95'
 }`}
 >
 {activeRequest.amount}
 </span>
 <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#2775CA]/20 border border-[#2775CA]/40">
 <UsdcIcon size={16} />
 <span className="text-xs font-bold text-white">USDC</span>
 </div>
 </div>

 {/* Fee transparent breakdown ticker */}
 <div className="mt-2 flex items-center gap-2 text-[11px] font-mono text-[#9CA3AF]">
 <span className="text-purple-300 font-semibold">1% Platform Fee: ${(activeRequest.numeric * 0.01).toFixed(2)}</span>
 <span className="text-white/20">·</span>
 <span className="text-emerald-400 font-semibold">Net Payout: ${(activeRequest.numeric * 0.99).toFixed(2)}</span>
 </div>
 </div>

 {/* Network speed badge */}
 <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-1.5 xs:gap-0 py-2.5 px-3 sm:px-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs text-[#9CA3AF] mb-4 sm:mb-5">
 <div className="flex items-center gap-1.5 text-white/90">
 <Zap className="w-3.5 h-3.5 text-[#A78BFA] shrink-0" />
 <span>Finality: <strong className="text-white font-mono">~1.8s</strong></span>
 </div>
 <div className="flex items-center gap-1.5">
 <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
 <span>Network Gas: <strong className="text-white font-mono">&lt; $0.001</strong></span>
 </div>
 </div>

 {/* Action buttons inside mockup */}
 <div className="space-y-2.5">
 <button
 onClick={() => {
 playMicroSound('click');
 onOpenDemoModal();
 }}
 className="w-full py-3.5 rounded-xl bg-[#7132F5] hover:bg-[#854BFF] text-white font-bold text-sm tracking-wide flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-lg shadow-[#7132F5]/30 group min-h-[46px]"
 >
 <span>Pay with Email or Wallet</span>
 <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
 </button>

 <div className="flex items-center justify-between text-xs text-[#9CA3AF] pt-1 gap-2">
 <span className="flex items-center gap-1 font-mono text-[#D8B4FE]/80 truncate min-w-0">
 inkdrop.link/pay/{activeRequest.slug}
 </span>
 <button
 onClick={() => {
 playMicroSound('click');
 onOpenDemoModal();
 }}
 className="text-[#A78BFA] hover:underline flex items-center gap-1 font-medium cursor-pointer shrink-0"
 >
 <Copy className="w-3 h-3" />
 <span>Test live</span>
 </button>
 </div>
 </div>
 </div>
 </div>
 </div>

 {/* “As seen in / Powered by” strip below CTA (RainbowKit removed) */}
 <div className="w-full max-w-5xl mx-auto pt-8 sm:pt-10 border-t border-white/[0.07]">
 <div className="text-center mb-5">
 <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.2em] text-[#9CA3AF]/70">
 Powered by next-generation onchain infrastructure
 </span>
 </div>
 <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-14 opacity-80 hover:opacity-100 transition-opacity">
 {/* Ink Chain */}
 <div className="flex items-center gap-2 text-white font-bold text-sm sm:text-lg tracking-tight">
 <InkChainIcon size={22} />
 <span>Ink Chain</span>
 </div>

 {/* Kraken */}
 <div className="flex items-center gap-2 text-white font-extrabold text-sm sm:text-lg tracking-wider">
 <span className="text-[#8B5CF6] font-black text-lg sm:text-xl">K</span>
 <span>KRAKEN</span>
 </div>

 {/* Privy */}
 <div className="flex items-center gap-2 text-white font-semibold text-sm sm:text-lg">
 <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-sm bg-gradient-to-tr from-pink-500 to-indigo-500" />
 <span>Privy</span>
 </div>

 {/* Velodrome */}
 <div className="flex items-center gap-2 text-white font-semibold text-sm sm:text-lg">
 <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-2 border-[#8B5CF6] border-t-transparent animate-spin" />
 <span>Velodrome</span>
 </div>
 </div>
 </div>
 </section>
 );
};
