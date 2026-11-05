'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { SpotlightCard } from './SpotlightCard';
import { UsdcIcon, InkChainIcon } from './Icons';
import { playMicroSound } from '../utils/sound';
import { 
 Link2, Mail, ShieldCheck, ArrowRight, CheckCircle2, Play, 
 RotateCcw, Zap, Terminal, Sparkles, ChevronRight, Lock, 
 Send, Layers, Wallet
} from 'lucide-react';

export const InteractivePaymentEngine = () => {
 const [activeStep, setActiveStep] = useState(1);
 const [isPlaying, setIsPlaying] = useState(true);
 const [customTitle, setCustomTitle] = useState('Brand Sprint & UI Architecture');
 const [customAmount, setCustomAmount] = useState(1200);
 const [payerEmail, setPayerEmail] = useState('payer.client@venture.co');
 
 // Interactive animation states
 const [typingIndex, setTypingIndex] = useState(0);
 const [finalityCountdown, setFinalityCountdown] = useState(1.8);
 const [isFinalized, setIsFinalized] = useState(false);
 const [blockHash, setBlockHash] = useState('0x9a8f...4e12');

 const platformFee = customAmount * 0.01; // 1% platform fee
 const merchantNet = customAmount - platformFee; // 99%

 // Auto-play stepper loop
 useEffect(() => {
 if (!isPlaying) return;
 const timer = setInterval(() => {
 setActiveStep((prev) => {
 const next = prev >= 4 ? 1 : prev + 1;
 playMicroSound('toggle');
 return next;
 });
 }, 4500);

 return () => clearInterval(timer);
 }, [isPlaying]);

 // Handle finality counter when on Step 3
 useEffect(() => {
 if (activeStep === 3) {
 setIsFinalized(false);
 setFinalityCountdown(1.8);
 const interval = setInterval(() => {
 setFinalityCountdown((prev) => {
 if (prev <= 0.1) {
 clearInterval(interval);
 setIsFinalized(true);
 playMicroSound('confirm');
 return 0.0;
 }
 return parseFloat((prev - 0.2).toFixed(1));
 });
 }, 180);
 return () => clearInterval(interval);
 }
 }, [activeStep]);

 const handleStepClick = (step) => {
 setIsPlaying(false);
 setActiveStep(step);
 playMicroSound('click');
 };

 const stepsMeta = [
 { num: 1, title: 'Generate Link', tag: 'INPUT', icon: Link2, desc: 'Zero-config payment link with transparent 1% fee' },
 { num: 2, title: 'Email Handshake', tag: 'AUTH', icon: Mail, desc: 'Privy provisions an MPC wallet from email in 380ms' },
 { num: 3, title: 'Ink L2 Finality', tag: 'ROLLUP', icon: Zap, desc: 'Kraken sequencer confirms block in ~1.8 seconds' },
 { num: 4, title: '99% Net Payout', tag: 'SETTLED', icon: ShieldCheck, desc: 'USDC lands directly in merchant self-custody' },
 ];

 return (
 <div className="w-full">
 {/* Simulation Controller Header */}
 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-white/10">
 <div className="flex items-center gap-3">
 <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#7132F5]/20 border border-[#7132F5]/40 font-mono text-xs text-[#D8B4FE]">
 <span className="w-2 h-2 rounded-full bg-[#8B5CF6] animate-ping" />
 <span>INTERACTIVE PAYMENT LIFECYCLE SIMULATOR</span>
 </div>
 <span className="hidden md:inline font-mono text-xs text-[#9CA3AF]">
 [ Kraken Ink Chain L2 Architecture ]
 </span>
 </div>

 <div className="flex items-center gap-3">
 <button
 onClick={() => {
 setIsPlaying(!isPlaying);
 playMicroSound('toggle');
 }}
 className={`px-3.5 py-1.5 rounded-lg border font-mono text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer min-h-[36px] ${
 isPlaying
 ? 'border-[#7132F5] bg-[#7132F5]/20 text-white shadow-[0_0_15px_rgba(113,50,245,0.4)]'
 : 'border-white/15 bg-white/[0.03] text-[#9CA3AF] hover:text-white'
 }`}
 >
 {isPlaying ? (
 <>
 <span className="w-2 h-2 rounded-sm bg-[#8B5CF6] animate-pulse" />
 <span>AUTO PLAYING</span>
 </>
 ) : (
 <>
 <Play className="w-3 h-3 text-[#A78BFA]" />
 <span>RESUME DEMO</span>
 </>
 )}
 </button>

 <button
 onClick={() => {
 setActiveStep(1);
 setIsPlaying(true);
 playMicroSound('click');
 }}
 className="p-2 rounded-lg border border-white/10 bg-white/[0.02] text-[#9CA3AF] hover:text-white hover:border-white/20 transition-all cursor-pointer"
 title="Reset Simulation"
 >
 <RotateCcw className="w-3.5 h-3.5" />
 </button>
 </div>
 </div>

 {/* Stepper Navigation Pills (Interactive Clickable Timeline) */}
 <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
 {stepsMeta.map((s) => {
 const Icon = s.icon;
 const isActive = activeStep === s.num;
 return (
 <button
 key={s.num}
 onClick={() => handleStepClick(s.num)}
 className={`text-left p-3.5 sm:p-4 rounded-xl border transition-all duration-300 relative overflow-hidden cursor-pointer ${
 isActive
 ? 'bg-[#7132F5]/15 border-[#7132F5] shadow-[0_0_25px_rgba(113,50,245,0.3)]'
 : 'bg-black/60 border-white/10 hover:border-white/25 hover:bg-white/[0.02]'
 }`}
 >
 {/* Active top accent indicator bar */}
 {isActive && (
 <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#7132F5] via-[#854BFF] to-[#A78BFA]" />
 )}

 <div className="flex items-center justify-between mb-2">
 <span className="font-mono text-[10px] text-[#A78BFA] font-bold">
 [ STAGE 0{s.num} ]
 </span>
 <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${
 isActive ? 'bg-[#7132F5]/40 border-[#7132F5] text-white' : 'bg-white/5 border-white/10 text-[#9CA3AF]'
 }`}>
 {s.tag}
 </span>
 </div>

 <div className="flex items-center gap-2 mb-1">
 <Icon className={`w-4 h-4 ${isActive ? 'text-[#D8B4FE]' : 'text-[#9CA3AF]'}`} />
 <span className="text-sm font-bold text-white tracking-tight">
 {s.title}
 </span>
 </div>
 <p className="text-[11px] text-[#9CA3AF] line-clamp-1 leading-snug">
 {s.desc}
 </p>
 </button>
 );
 })}
 </div>

 {/* Main Interactive Stage Display Viewport */}
 <SpotlightCard className="p-5 sm:p-8 border-white/15 bg-black/85 relative overflow-hidden">
 {/* Terminal Telemetry Bar */}
 <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-6 border-b border-white/10 font-mono text-xs text-[#9CA3AF]">
 <div className="flex items-center gap-2">
 <Terminal className="w-3.5 h-3.5 text-[#A78BFA]" />
 <span className="text-white font-semibold">INKDROP_PROTOCOL_KERNEL</span>
 <span className="text-white/30">::</span>
 <span className="text-[#D8B4FE]">STAGE_0{activeStep}_ACTIVE</span>
 </div>
 <div className="flex items-center gap-3 text-[11px]">
 <span className="text-white/60">Platform Fee: <strong className="text-white">1.0%</strong></span>
 <span className="text-white/30">|</span>
 <span className="text-emerald-400 flex items-center gap-1">
 <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
 L2 Sequencer Live
 </span>
 </div>
 </div>

 {/* STAGE 1: LINK CREATION & 1% FEE STRUCTURE */}
 {activeStep === 1 && (
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-300">
 <div className="lg:col-span-7 space-y-4">
 <div className="space-y-1">
 <span className="font-mono text-xs uppercase tracking-wider text-[#A78BFA]">
 Step 1 · Dynamic Payment Synthesis
 </span>
 <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
 Enter payment amount. URL synthesizes instantly.
 </h3>
 <p className="text-sm text-[#9CA3AF] leading-relaxed">
 No merchant account required. Our smart contract encodes the invoice details on Ink Chain with a transparent 1% protocol fee.
 </p>
 </div>

 {/* Interactive test input controls */}
 <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-3">
 <div>
 <label className="block text-[11px] font-mono text-[#9CA3AF] uppercase mb-1">
 Invoice Description
 </label>
 <input
 type="text"
 value={customTitle}
 onChange={(e) => setCustomTitle(e.target.value)}
 className="w-full px-3 py-2 bg-black rounded-lg border border-white/15 text-white text-xs font-medium focus:outline-none focus:border-[#7132F5]"
 />
 </div>

 <div className="grid grid-cols-2 gap-3">
 <div>
 <label className="block text-[11px] font-mono text-[#9CA3AF] uppercase mb-1">
 Gross Amount (USDC)
 </label>
 <div className="relative">
 <input
 type="number"
 min={10}
 max={100000}
 value={customAmount}
 onChange={(e) => setCustomAmount(Math.max(1, Number(e.target.value)))}
 className="w-full px-3 py-2 bg-black rounded-lg border border-white/15 text-white font-mono text-sm font-bold focus:outline-none focus:border-[#7132F5]"
 />
 <span className="absolute right-2.5 top-2 text-[10px] font-mono text-[#9CA3AF]">USDC</span>
 </div>
 </div>

 <div>
 <label className="block text-[11px] font-mono text-[#9CA3AF] uppercase mb-1">
 1% InkDrop Fee
 </label>
 <div className="px-3 py-2 bg-[#7132F5]/10 rounded-lg border border-[#7132F5]/30 text-[#D8B4FE] font-mono text-sm font-bold flex items-center justify-between">
 <span>${platformFee.toFixed(2)}</span>
 <span className="text-[10px] text-white/50">1.0%</span>
 </div>
 </div>
 </div>
 </div>

 {/* Net Payout Summary */}
 <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/25 text-xs font-mono">
 <span className="text-[#9CA3AF]">You Receive Directly in Wallet:</span>
 <span className="text-emerald-400 font-bold text-sm">
 ${merchantNet.toFixed(2)} USDC (99.0%)
 </span>
 </div>
 </div>

 {/* Generated Mockup Right Column */}
 <div className="lg:col-span-5 p-5 rounded-2xl bg-black border border-white/15 relative space-y-4">
 <div className="flex items-center justify-between text-xs text-[#9CA3AF] pb-3 border-b border-white/10">
 <span className="font-mono text-[#A78BFA]">Generated Pay Link</span>
 <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-500/20">
 Ready to share
 </span>
 </div>

 <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 font-mono text-xs">
 <div className="text-[10px] text-[#9CA3AF] mb-1">Live Endpoint</div>
 <div className="text-white font-bold truncate text-sm text-[#C4B5FD]">
 inkdrop.link/pay/inv-{customAmount}
 </div>
 </div>

 <div className="space-y-2 text-xs">
 <div className="flex justify-between py-1 border-b border-white/5">
 <span className="text-[#9CA3AF]">Recipient:</span>
 <span className="text-white font-mono">alex.ink (0x4F92...B8c1)</span>
 </div>
 <div className="flex justify-between py-1 border-b border-white/5">
 <span className="text-[#9CA3AF]">Requested Volume:</span>
 <span className="text-white font-bold font-mono">${customAmount.toFixed(2)} USDC</span>
 </div>
 <div className="flex justify-between py-1">
 <span className="text-[#9CA3AF]">Fee Transparency:</span>
 <span className="text-purple-300 font-mono font-bold">1% ($ {platformFee.toFixed(2)})</span>
 </div>
 </div>

 <button
 onClick={() => handleStepClick(2)}
 className="w-full py-2.5 rounded-lg bg-[#7132F5] hover:bg-[#854BFF] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md shadow-[#7132F5]/30"
 >
 <span>Simulate Next: Payer Experience →</span>
 </button>
 </div>
 </div>
 )}

 {/* STAGE 2: PRIVY MPC AUTH (NO WALLET NEEDED) */}
 {activeStep === 2 && (
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-300">
 <div className="lg:col-span-7 space-y-4">
 <div className="space-y-1">
 <span className="font-mono text-xs uppercase tracking-wider text-[#A78BFA]">
 Step 2 · Zero-Friction Payer Handshake
 </span>
 <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
 Payers don&apos;t need crypto wallets.
 </h3>
 <p className="text-sm text-[#9CA3AF] leading-relaxed">
 Most clients don&apos;t have MetaMask or testnet gas. With Privy embedded auth, entering their email automatically generates a non-custodial MPC wallet in 380 milliseconds.
 </p>
 </div>

 <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-3 text-xs">
 <div className="flex items-center justify-between text-[#9CA3AF]">
 <span>Payer Authentication Layer</span>
 <span className="text-[#D8B4FE] font-mono">Privy MPC v2.4</span>
 </div>

 <div className="flex flex-col sm:flex-row gap-2">
 <input
 type="email"
 value={payerEmail}
 onChange={(e) => setPayerEmail(e.target.value)}
 className="w-full px-3 py-2 bg-black rounded-lg border border-white/15 text-white font-mono text-xs"
 placeholder="payer@company.com"
 />
 <button
 onClick={() => playMicroSound('tick')}
 className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold text-xs whitespace-nowrap cursor-pointer"
 >
 Send 6-Digit OTP
 </button>
 </div>

 <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2">
 <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5 text-center">
 <span className="text-[10px] text-[#9CA3AF] block font-mono">Key Fragment 1</span>
 <span className="text-emerald-400 font-bold font-mono text-xs">Payer Device</span>
 </div>
 <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5 text-center">
 <span className="text-[10px] text-[#9CA3AF] block font-mono">Key Fragment 2</span>
 <span className="text-purple-400 font-bold font-mono text-xs">Privy Cloud HSM</span>
 </div>
 <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5 text-center">
 <span className="text-[10px] text-[#9CA3AF] block font-mono">Wallet Setup</span>
 <span className="text-white font-bold font-mono text-xs">0.38 Seconds</span>
 </div>
 </div>
 </div>

 <div className="flex items-center gap-2 p-3 rounded-lg bg-[#7132F5]/10 border border-[#7132F5]/30 text-xs font-mono text-[#D8B4FE]">
 <CheckCircle2 className="w-4 h-4 text-[#8B5CF6] shrink-0" />
 <span>Zero seed phrases · Biometric FaceID/TouchID confirmation in 1 tap</span>
 </div>
 </div>

 {/* Payer Verification Card Right */}
 <div className="lg:col-span-5 p-5 rounded-2xl bg-black border border-white/15 space-y-4">
 <div className="flex items-center justify-between pb-3 border-b border-white/10">
 <span className="font-mono text-xs text-white font-bold">Privy Session Verified</span>
 <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
 </div>

 <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/30 text-center space-y-2">
 <div className="w-12 h-12 rounded-full bg-[#7132F5] text-white font-extrabold flex items-center justify-center mx-auto text-sm shadow-md">
 PC
 </div>
 <div className="text-white font-bold text-sm">{payerEmail}</div>
 <div className="font-mono text-xs text-[#D8B4FE] bg-black/60 py-1 px-2 rounded border border-white/10">
 0x6E12...39Fa (MPC Wallet)
 </div>
 </div>

 <div className="p-3 rounded-lg bg-white/[0.03] border border-white/5 text-xs text-[#9CA3AF] space-y-1">
 <div className="flex justify-between">
 <span>Balance:</span>
 <span className="text-white font-bold font-mono">${customAmount.toFixed(2)} USDC</span>
 </div>
 <div className="flex justify-between">
 <span>Gas Allowance:</span>
 <span className="text-emerald-400 font-mono">Sponsored on Ink</span>
 </div>
 </div>

 <button
 onClick={() => handleStepClick(3)}
 className="w-full py-2.5 rounded-lg bg-[#7132F5] hover:bg-[#854BFF] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md shadow-[#7132F5]/30"
 >
 <span>Authorize &amp; Transmit to Ink Chain →</span>
 </button>
 </div>
 </div>
 )}

 {/* STAGE 3: INK CHAIN L2 FINALITY */}
 {activeStep === 3 && (
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-300">
 <div className="lg:col-span-7 space-y-4">
 <div className="space-y-1">
 <span className="font-mono text-xs uppercase tracking-wider text-[#A78BFA]">
 Step 3 · Kraken Superchain L2 Finality
 </span>
 <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
 Sub-second rollup finality. Sub-cent gas.
 </h3>
 <p className="text-sm text-[#9CA3AF] leading-relaxed">
 Ink Chain executes optimistic rollups with instant sequencing by Kraken. While credit cards take 2–7 business days to clear, InkDrop finalizes in ~1.8 seconds.
 </p>
 </div>

 {/* Finality Live Gauge */}
 <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-3">
 <div className="flex items-center justify-between text-xs font-mono">
 <span className="text-[#9CA3AF]">Sequencer Finality Timer:</span>
 <span className="text-white font-bold text-sm">
 {isFinalized ? (
 <span className="text-emerald-400 font-bold">CONFIRMED (1.8s)</span>
 ) : (
 <span className="text-[#D8B4FE] animate-pulse">{finalityCountdown}s remaining</span>
 )}
 </span>
 </div>

 {/* Progress bar */}
 <div className="w-full h-3 bg-black/80 rounded-full border border-white/15 overflow-hidden p-0.5">
 <div
 className="h-full bg-gradient-to-r from-[#7132F5] via-[#854BFF] to-emerald-400 rounded-full transition-all duration-200"
 style={{
 width: isFinalized ? '100%' : `${((1.8 - finalityCountdown) / 1.8) * 100}%`,
 }}
 />
 </div>

 <div className="grid grid-cols-3 gap-2 pt-1 font-mono text-[11px] text-[#9CA3AF]">
 <div>
 <span className="text-white/40 block">Block Height</span>
 <span className="text-white font-bold">#2,948,114</span>
 </div>
 <div>
 <span className="text-white/40 block">Gas Consumed</span>
 <span className="text-emerald-400 font-bold">0.00003 ETH</span>
 </div>
 <div>
 <span className="text-white/40 block">Fiat Equivalent</span>
 <span className="text-white font-bold">&lt; $0.001</span>
 </div>
 </div>
 </div>
 </div>

 {/* Block Explorer Inspector Right */}
 <div className="lg:col-span-5 p-5 rounded-2xl bg-black border border-white/15 space-y-4 font-mono text-xs">
 <div className="flex items-center justify-between pb-3 border-b border-white/10">
 <span className="text-[#A78BFA] font-bold">Ink Explorer Telemetry</span>
 <span className="text-emerald-400 text-[10px] bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20">
 {isFinalized ? 'Finalized' : 'Sequencing'}
 </span>
 </div>

 <div className="space-y-2">
 <div className="p-2.5 rounded bg-white/[0.03] border border-white/5">
 <span className="text-white/50 block text-[10px]">Tx Hash</span>
 <span className="text-[#C4B5FD] text-[11px] truncate block">0x71a2e48f...98c4b12</span>
 </div>
 <div className="p-2.5 rounded bg-white/[0.03] border border-white/5">
 <span className="text-white/50 block text-[10px]">Smart Contract</span>
 <span className="text-white text-[11px] truncate block">0x7F8798eA489379659341498B75F348F29aeB5A2</span>
 </div>
 <div className="p-2.5 rounded bg-white/[0.03] border border-white/5">
 <span className="text-white/50 block text-[10px]">Settlement Event</span>
 <span className="text-emerald-400 text-[11px] block">PaymentSplit(creator: 99%, inkdrop: 1%)</span>
 </div>
 </div>

 <button
 onClick={() => handleStepClick(4)}
 className="w-full py-2.5 rounded-lg bg-[#7132F5] hover:bg-[#854BFF] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md shadow-[#7132F5]/30 font-sans"
 >
 <span>View Creator Payout Receipt →</span>
 </button>
 </div>
 </div>
 )}

 {/* STAGE 4: 99% PAYOUT DIRECT TO WALLET (1% PLATFORM FEE) */}
 {activeStep === 4 && (
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-300">
 <div className="lg:col-span-7 space-y-4">
 <div className="space-y-1">
 <span className="font-mono text-xs uppercase tracking-wider text-emerald-400">
 Step 4 · Complete Non-Custodial Settlement
 </span>
 <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
 100% Onchain. 99% lands in your wallet.
 </h3>
 <p className="text-sm text-[#9CA3AF] leading-relaxed">
 No rolling reserves. No merchant freezes. InkDrop takes only a 1% platform fee ($12 on $1,200), saving you $40+ compared to Stripe or PayPal.
 </p>
 </div>

 {/* Transparent Split Breakdown Box */}
 <div className="p-4 rounded-xl bg-black border border-white/15 space-y-3 font-mono text-xs">
 <div className="flex items-center justify-between pb-2 border-b border-white/10 font-bold text-white">
 <span>Settlement Breakdown</span>
 <span className="text-emerald-400">PAID IN FULL</span>
 </div>

 <div className="flex items-center justify-between">
 <span className="text-[#9CA3AF]">Gross Volume Collected:</span>
 <span className="text-white font-bold">${customAmount.toFixed(2)} USDC</span>
 </div>

 <div className="flex items-center justify-between text-purple-300">
 <span className="flex items-center gap-1.5">
 <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]" />
 <span>InkDrop Platform Fee (1.0%):</span>
 </span>
 <span>-${platformFee.toFixed(2)} USDC</span>
 </div>

 <div className="flex items-center justify-between text-emerald-400 text-sm font-bold pt-2 border-t border-white/10">
 <span>Net Direct to Your Wallet (99.0%):</span>
 <span>+${merchantNet.toFixed(2)} USDC</span>
 </div>
 </div>

 {/* Comparison quote */}
 <div className="p-3 rounded-lg bg-white/[0.03] border border-white/10 text-xs text-[#9CA3AF] flex items-center justify-between">
 <span>Stripe would take: <strong className="text-red-400 font-mono">~$35.10 (2.9% + $0.30)</strong></span>
 <span className="text-emerald-400 font-mono font-bold">You saved: +${(35.10 - platformFee).toFixed(2)}</span>
 </div>
 </div>

 {/* Wallet Success Preview Right */}
 <div className="lg:col-span-5 p-5 rounded-2xl bg-gradient-to-b from-[#7132F5]/20 via-black to-black border border-[#7132F5]/40 text-center space-y-4">
 <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(16,185,129,0.3)]">
 <CheckCircle2 className="w-8 h-8" />
 </div>

 <div>
 <span className="font-mono text-xs uppercase tracking-widest text-[#A78BFA] font-bold">
 BALANCE CREDITED IMMEDIATELY
 </span>
 <div className="text-3xl font-black text-white font-mono mt-1">
 +${merchantNet.toFixed(2)}
 </div>
 <span className="text-xs font-mono text-[#D8B4FE]">USDC on Ink Chain L2</span>
 </div>

 <div className="p-3 rounded-xl bg-black/60 border border-white/10 font-mono text-xs text-left space-y-1 text-[#9CA3AF]">
 <div className="flex justify-between">
 <span>Recipient:</span>
 <span className="text-white">alex.ink</span>
 </div>
 <div className="flex justify-between">
 <span>Status:</span>
 <span className="text-emerald-400">Available to Spend / Transfer</span>
 </div>
 <div className="flex justify-between">
 <span>Bank Hold:</span>
 <span className="text-white">0 Days (Self-Custody)</span>
 </div>
 </div>

 <button
 onClick={() => {
 setActiveStep(1);
 setIsPlaying(true);
 playMicroSound('click');
 }}
 className="w-full py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold text-xs tracking-wider transition-colors cursor-pointer"
 >
 Replay Interactive Simulation ↺
 </button>
 </div>
 </div>
 )}
 </SpotlightCard>
 </div>
 );
};
