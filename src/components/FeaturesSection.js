'use client';

import React, { useState, useEffect } from 'react';
import { SectionHeader } from './SectionHeader';
import { UsdcIcon, InkChainIcon } from './Icons';
import { FeatureModalId } ;
import { SpotlightCard } from './SpotlightCard';
import { playMicroSound } from '../utils/sound';
import { 
 Maximize2, X, ExternalLink, Check, Copy, Smartphone, Laptop, 
 Layers, Shield, Zap, Sparkles, CheckCircle2, ArrowRight, CheckCircle, RefreshCw 
} from 'lucide-react';


/* 1. Animated Payment Links Widget */
const AnimatedPaymentLinksPreview = () => {
 const slugs = ['invoice-89a', 'retainer-march', 'sprint-492', 'consulting-q2'];
 const amounts = ['$1,200', '$4,500', '$2,500', '$850'];
 const [index, setIndex] = useState(0);
 const [copied, setCopied] = useState(false);

 useEffect(() => {
 const timer = setInterval(() => {
 setIndex((prev) => (prev + 1) % slugs.length);
 setCopied(true);
 setTimeout(() => setCopied(false), 1400);
 }, 3800);
 return () => clearInterval(timer);
 }, [slugs.length]);

 return (
 <div className="w-full h-48 rounded-xl bg-black/85 border border-white/10 p-3.5 flex flex-col justify-between font-mono text-xs overflow-hidden relative">
 <div className="flex items-center justify-between border-b border-white/10 pb-2">
 <span className="text-[#9CA3AF] flex items-center gap-1.5">
 <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] animate-pulse" />
 Live URL Engine
 </span>
 <span className="text-[#C4B5FD] text-[10px] bg-[#7132F5]/25 px-2 py-0.5 rounded border border-[#7132F5]/30">
 Auto-Routed
 </span>
 </div>

 <div className="space-y-2.5 py-1">
 <div className="bg-white/[0.04] p-2.5 rounded-lg border border-white/5 flex items-center justify-between transition-all duration-300">
 <div className="truncate text-white font-mono flex items-center gap-1 text-[11px]">
 <span className="text-[#9CA3AF]">inkdrop.link/pay/</span>
 <span className="text-[#D8B4FE] font-bold transition-all duration-300">
 {slugs[index]}
 </span>
 </div>
 <span className="text-emerald-400 font-bold tabular-nums text-xs">
 {amounts[index]}
 </span>
 </div>

 <div className="flex items-center justify-between text-[11px] px-1 text-[#9CA3AF]">
 <div className="flex items-center gap-1.5">
 <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
 <span className="text-white/80">Active Onchain</span>
 </div>
 <span className="text-[10px] text-[#A78BFA] font-mono">
 {copied ? '✓ Endpoint Copied' : 'Instant 2s Finality'}
 </span>
 </div>
 </div>

 <div className="flex items-center justify-between text-[10px] text-white/40 pt-1.5 border-t border-white/5">
 <span>Direct Contract Call</span>
 <span className="text-[#A78BFA]">Click to inspect modal →</span>
 </div>
 </div>
 );
};

/* 2. Animated Embedded Wallets Widget (Privy Flow) */
const AnimatedEmbeddedWalletsPreview = () => {
 const [step, setStep] = useState(0);

 useEffect(() => {
 const timer = setInterval(() => {
 setStep((prev) => ((prev + 1) % 3));
 }, 2400);
 return () => clearInterval(timer);
 }, []);

 return (
 <div className="w-full h-48 rounded-xl bg-black/85 border border-white/10 p-3.5 flex flex-col justify-between font-mono text-xs overflow-hidden relative">
 <div className="flex items-center justify-between border-b border-white/10 pb-2">
 <span className="text-[#9CA3AF] flex items-center gap-1.5">
 <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] animate-pulse" />
 Privy Embedded Auth
 </span>
 <span className="text-[#D8B4FE] text-[10px] bg-[#7132F5]/30 px-2 py-0.5 rounded border border-[#7132F5]/40">
 No Extension Needed
 </span>
 </div>

 <div className="space-y-2 py-1">
 {step === 0 && (
 <div className="space-y-2 animate-in fade-in duration-300">
 <div className="bg-white/[0.04] p-2 rounded border border-white/5 flex items-center justify-between">
 <span className="text-[#9CA3AF] text-[11px]">Email:</span>
 <span className="text-white text-[11px]">sarah@techcorp.io</span>
 </div>
 <div className="text-[10px] text-[#A78BFA] flex items-center gap-1">
 <span className="w-1.5 h-1.5 rounded-full bg-[#7132F5] animate-ping" />
 <span>Sending one-time code...</span>
 </div>
 </div>
 )}

 {step === 1 && (
 <div className="space-y-2 animate-in fade-in duration-300">
 <div className="text-[10px] text-[#9CA3AF]">Entering 6-digit OTP code:</div>
 <div className="flex justify-between gap-1">
 {['7', '1', '3', '2', '9', '5'].map((digit, i) => (
 <div
 key={i}
 className="w-7 h-7 rounded bg-[#7132F5]/20 border border-[#7132F5]/50 text-white font-bold flex items-center justify-center text-xs animate-in zoom-in-75 duration-200"
 style={{ animationDelay: `${i * 80}ms` }}
 >
 {digit}
 </div>
 ))}
 </div>
 </div>
 )}

 {step === 2 && (
 <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-emerald-300 text-[11px] space-y-1 animate-in zoom-in-95 duration-200">
 <div className="flex items-center justify-between font-bold">
 <span className="flex items-center gap-1 text-emerald-400">
 <Check className="w-3.5 h-3.5" />
 MPC Wallet Created
 </span>
 <span className="text-white font-mono text-[10px]">~0.38s</span>
 </div>
 <div className="text-[10px] text-[#9CA3AF] font-mono truncate">
 0x4B19...8e0F · Ready to pay
 </div>
 </div>
 )}
 </div>

 <div className="flex items-center justify-between text-[10px] text-white/40 pt-1.5 border-t border-white/5">
 <span>Passkey &amp; Email Ready</span>
 <span className="text-[#A78BFA]">Click to inspect modal →</span>
 </div>
 </div>
 );
};

/* 3. Animated Onchain Settlement Widget */
const AnimatedOnchainSettlementPreview = () => {
 const [blockNumber, setBlockNumber] = useState(2941083);
 const [progress, setProgress] = useState(35);

 useEffect(() => {
 const timer = setInterval(() => {
 setBlockNumber((prev) => prev + 1);
 setProgress(0);
 const progressTimer = setTimeout(() => {
 setProgress(100);
 }, 50);
 return () => clearTimeout(progressTimer);
 }, 2800);
 return () => clearInterval(timer);
 }, []);

 return (
 <div className="w-full h-48 rounded-xl bg-black/85 border border-white/10 p-3.5 flex flex-col justify-between font-mono text-xs overflow-hidden relative">
 <div className="flex items-center justify-between border-b border-white/10 pb-2">
 <span className="text-[#9CA3AF] flex items-center gap-1.5">
 <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
 Ink Chain Explorer
 </span>
 <span className="text-emerald-400 text-[10px] bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
 Verified Onchain
 </span>
 </div>

 <div className="space-y-1.5 py-1">
 <div className="flex items-center justify-between text-[11px]">
 <span className="text-[#9CA3AF]">Latest Block:</span>
 <span className="text-white font-bold tabular-nums">
 #{blockNumber.toLocaleString()}
 </span>
 </div>

 <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
 <div
 className="h-full bg-gradient-to-r from-[#7132F5] to-emerald-400 rounded-full transition-all duration-[2600ms] ease-linear"
 style={{ width: `${progress}%` }}
 />
 </div>

 <div className="flex items-center justify-between text-[11px]">
 <span className="text-[#9CA3AF]">Status:</span>
 <span className="text-emerald-400 font-semibold flex items-center gap-1">
 <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
 Finalized in 1.8s
 </span>
 </div>

 <div className="flex items-center justify-between text-[10px] text-[#9CA3AF]">
 <span>Tx: 0x8b41...e92f</span>
 <span className="text-white">Gas: &lt; $0.001</span>
 </div>
 </div>

 <div className="flex items-center justify-between text-[10px] text-white/40 pt-1.5 border-t border-white/5">
 <span>Ink Mainnet L2</span>
 <span className="text-[#A78BFA]">Click to inspect modal →</span>
 </div>
 </div>
 );
};

export const FeaturesSection = ({
 onOpenCreateModal,
 onOpenDemoModal,
}) => {
 const [activeModal, setActiveModal] = useState(null);
 const [copiedTx, setCopiedTx] = useState(false);

 const features = [
 {
 id: 'links',
 title: 'Payment Links',
 shortDesc: 'Shareable URL, fixed or open amount, custom title. Generated in seconds.',
 tag: '01 / URL Engine',
 summary: 'Generate payment links for invoices, digital goods, tipping, or consulting fees. Each link gets a unique permanent endpoint on Ink Chain.',
 thumbnail: <AnimatedPaymentLinksPreview />,
 },
 {
 id: 'wallets',
 title: 'Embedded Wallets',
 shortDesc: 'Privy-powered. Payers get a wallet from their email. Zero crypto friction.',
 tag: '02 / Frictionless Auth',
 summary: 'Clients without crypto knowledge can pay in seconds. Privy automatically provisions a non-custodial smart wallet using just an email or social login.',
 thumbnail: <AnimatedEmbeddedWalletsPreview />,
 },
 {
 id: 'settlement',
 title: 'Onchain Settlement',
 shortDesc: 'Every payment is a real USDC transfer. Fully verifiable on Ink Explorer.',
 tag: '03 / Kraken L2 Ledger',
 summary: 'No black boxes, no opaque ledger entries. Funds transfer directly via verified smart contract 0x7F87...eB5A2 on Ink Chain with sub-2s finality.',
 thumbnail: <AnimatedOnchainSettlementPreview />,
 },
 ];

 const handleCopyHash = () => {
 setCopiedTx(true);
 setTimeout(() => setCopiedTx(false), 2000);
 };

 return (
 <section id="features" className="relative py-28 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06]">
 <div className="max-w-7xl mx-auto">
 {/* Section Counter & Eyebrow */}
 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-14">
 <SectionHeader number="03" total="05" tag="Features" />
 <span className="font-mono text-xs uppercase tracking-[0.15em] text-[#A78BFA] font-semibold">
 BUILT FOR BUILDERS
 </span>
 </div>

 {/* Section H2 */}
 <div className="max-w-3xl mb-16">
 <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
 Everything you need. Nothing you don&apos;t.
 </h2>
 <p className="mt-4 text-base sm:text-lg text-[#9CA3AF]">
 Engineered with strict minimalism. No bloated merchant dashboards, no escrow locking, no proprietary points.
 </p>
 </div>

 {/* Three Modal-Style Feature Cards */}
 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
 {features.map((feat) => (
 <SpotlightCard
 key={feat.id}
 onClick={() => {
 setActiveModal(feat.id);
 playMicroSound('click');
 }}
 className="cursor-pointer flex flex-col justify-between"
 >
 <div>
 {/* Feature Tag */}
 <div className="flex items-center justify-between mb-4">
 <span className="text-xs font-mono text-[#A78BFA] font-semibold tracking-wider">
 {feat.tag}
 </span>
 <div className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#9CA3AF] group-hover:text-white group-hover:border-[#7132F5]/50 transition-colors">
 <Maximize2 className="w-3.5 h-3.5" />
 </div>
 </div>

 {/* Card Title & Desc */}
 <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#A78BFA] transition-colors">
 {feat.title}
 </h3>
 <p className="text-sm text-[#9CA3AF] leading-relaxed mb-6">
 {feat.shortDesc}
 </p>
 </div>

 {/* Thumbnail Mockup */}
 <div className="mt-auto">
 {feat.thumbnail}
 <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-[#9CA3AF] group-hover:text-white transition-colors">
 <span>Click to view live mockup</span>
 <ArrowRight className="w-3 h-3 text-[#A78BFA] transition-transform group-hover:translate-x-1" />
 </div>
 </div>
 </SpotlightCard>
 ))}
 </div>

 {/* EXPANDED FULL-SCREEN DARK OVERLAY MODAL with DESKTOP + MOBILE MOCKUPS SIDE BY SIDE */}
 {activeModal && (
 <div
 className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-200"
 onClick={() => setActiveModal(null)}
 >
 <div
 className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-[#080b11] border border-white/15 rounded-3xl p-4 sm:p-8 lg:p-10 shadow-[0_25px_70px_rgba(0,0,0,0.95)]"
 onClick={(e) => e.stopPropagation()}
 >
 {/* Close Button */}
 <button
 onClick={() => setActiveModal(null)}
 className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 text-[#9CA3AF] hover:text-white border border-white/10 transition-colors cursor-pointer flex items-center justify-center z-10"
 aria-label="Close feature details"
 >
 <X className="w-5 h-5" />
 </button>

 {/* Modal Header */}
 <div className="max-w-2xl mb-6 sm:mb-8 pr-10">
 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7132F5]/20 border border-[#7132F5]/40 font-mono text-[10px] sm:text-xs text-[#D8B4FE] font-semibold mb-3">
 FEATURE DETAIL · INK CHAIN SPEC
 </div>
 <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
 {features.find((f) => f.id === activeModal)?.title}
 </h3>
 <p className="text-sm sm:text-base text-[#9CA3AF] mt-2 leading-relaxed">
 {features.find((f) => f.id === activeModal)?.summary}
 </p>
 </div>

 {/* SIDE-BY-SIDE DESKTOP + MOBILE MOCKUPS */}
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start pt-4 border-t border-white/10">
 {/* Desktop Mockup (7 cols) */}
 <div className="lg:col-span-7 rounded-2xl bg-black border border-white/15 p-4 sm:p-5 shadow-2xl relative overflow-hidden">
 <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10 text-xs text-[#9CA3AF]">
 <div className="flex items-center gap-2">
 <Laptop className="w-4 h-4 text-[#A78BFA]" />
 <span className="font-mono text-white">Desktop Experience</span>
 </div>
 <div className="flex gap-1.5">
 <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
 <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
 <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
 </div>
 </div>

 {activeModal === 'links' && (
 <div className="space-y-4 font-mono text-xs">
 <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
 <div className="text-[#9CA3AF] mb-1">Payment Request Details</div>
 <div className="text-base sm:text-lg font-bold text-white font-sans">Monthly Software Architecture Retainer</div>
 <div className="text-xl sm:text-2xl font-black text-[#C4B5FD] mt-2 font-mono tabular-nums">
 $4,500.00 USDC
 </div>
 </div>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
 <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
 <span className="text-[#9CA3AF] block">Recipient Wallet</span>
 <span className="text-white font-mono text-[11px] truncate block">0x39A...c81B (Verified)</span>
 </div>
 <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
 <span className="text-[#9CA3AF] block">Settlement Layer</span>
 <span className="text-purple-300 font-mono text-[11px]">Ink Chain (Kraken L2)</span>
 </div>
 </div>
 <div className="p-3 rounded-lg bg-[#7132F5]/20 border border-[#7132F5]/40 text-[#D8B4FE] flex flex-col xs:flex-row xs:items-center justify-between gap-2">
 <span className="truncate min-w-0 text-[11px] sm:text-xs">inkdrop.link/pay/arch-4500</span>
 <button
 onClick={handleCopyHash}
 className="px-3 py-1.5 rounded bg-[#7132F5] text-white font-sans font-bold text-[11px] shadow-sm shrink-0 min-h-[36px] flex items-center justify-center cursor-pointer"
 >
 {copiedTx ? 'Copied!' : 'Copy'}
 </button>
 </div>
 </div>
 )}

 {activeModal === 'wallets' && (
 <div className="space-y-4 text-xs font-mono">
 <div className="p-4 sm:p-5 rounded-xl bg-purple-950/20 border border-purple-500/30">
 <div className="text-purple-300 font-sans font-bold text-sm mb-1">
 Privy Embedded Wallet Engine
 </div>
 <p className="text-[#9CA3AF] text-xs font-sans">
 Payers don&apos;t need MetaMask or seed phrases. They sign in via email or SMS, and Privy securely provisions an MPC onchain wallet.
 </p>
 </div>
 <div className="space-y-2">
 <label className="text-[#9CA3AF] block">Payer Email Address</label>
 <div className="flex flex-col xs:flex-row gap-2">
 <input
 type="text"
 readOnly
 value="sarah.investor@techventures.io"
 className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white font-mono min-h-[42px]"
 />
 <button className="px-4 py-2 rounded-lg bg-[#7132F5] text-white font-sans font-semibold text-xs whitespace-nowrap min-h-[42px] cursor-pointer">
 Send Code
 </button>
 </div>
 </div>
 <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/20 text-emerald-300">
 <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
 <span className="text-[11px] sm:text-xs">Passkey support active. Biometric FaceID/TouchID confirmation in 1 tap.</span>
 </div>
 </div>
 )}

 {activeModal === 'settlement' && (
 <div className="space-y-3 font-mono text-xs">
 <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-1 p-3 rounded-lg bg-white/[0.03] border border-white/10">
 <span className="text-[#9CA3AF] shrink-0">Contract:</span>
 <span className="text-[#C4B5FD] font-mono text-[11px] sm:text-xs truncate min-w-0">0x7F8798eA489379659341498B75F348F29aeB5A2</span>
 </div>
 <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-1 p-3 rounded-lg bg-white/[0.03] border border-white/10">
 <span className="text-[#9CA3AF] shrink-0">Block Number:</span>
 <span className="text-white text-[11px] sm:text-xs">#2,941,083 (Confirmed in 1.9s)</span>
 </div>
 <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-1 p-3 rounded-lg bg-white/[0.03] border border-white/10">
 <span className="text-[#9CA3AF] shrink-0">Gas Fee:</span>
 <span className="text-emerald-400 text-[11px] sm:text-xs">0.00003 ETH ($0.0008)</span>
 </div>
 <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] border border-white/10">
 <span className="text-[#9CA3AF]">Explorer:</span>
 <a
 href="https://explorer.inkonchain.com"
 target="_blank"
 rel="noreferrer"
 className="text-[#A78BFA] flex items-center gap-1 hover:underline text-[11px] sm:text-xs"
 >
 <span>View on Ink Explorer</span>
 <ExternalLink className="w-3 h-3" />
 </a>
 </div>
 </div>
 )}
 </div>

 {/* Mobile Mockup (5 cols) */}
 <div className="lg:col-span-5 rounded-3xl bg-black border-2 border-white/20 p-4 shadow-2xl relative max-w-[320px] mx-auto w-full">
 {/* Smartphone top pill */}
 <div className="w-24 h-4 bg-white/10 rounded-full mx-auto mb-4" />

 <div className="flex items-center justify-between text-[11px] text-[#9CA3AF] mb-3 pb-2 border-b border-white/10">
 <div className="flex items-center gap-1">
 <Smartphone className="w-3.5 h-3.5 text-[#A78BFA]" />
 <span>Mobile Pay View</span>
 </div>
 <span className="text-emerald-400 font-mono text-[10px]">Ink Chain 4G</span>
 </div>

 {/* Inside Mobile Screen */}
 <div className="space-y-3">
 <div className="flex items-center gap-2">
 <div className="w-8 h-8 rounded-full bg-[#7132F5] flex items-center justify-center font-bold text-xs text-white">
 ID
 </div>
 <div>
 <div className="text-xs font-bold text-white">InkDrop Pay</div>
 <div className="text-[10px] text-[#9CA3AF] font-mono">0x4F92...B8c1</div>
 </div>
 </div>

 <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-center">
 <div className="text-[10px] text-[#9CA3AF] font-mono">Total to Pay</div>
 <div className="text-2xl font-black text-white font-mono mt-0.5">
 {activeModal === 'links' ? '$4,500.00' : '$250.00'}
 </div>
 <div className="text-[10px] text-[#D8B4FE] font-mono mt-0.5">USDC on Ink Chain</div>
 </div>

 <div className="space-y-1.5">
 <button
 onClick={onOpenDemoModal}
 className="w-full py-3 rounded-xl bg-[#7132F5] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-[#7132F5]/40 cursor-pointer min-h-[44px]"
 >
 <span>One-Tap Pay</span>
 <ArrowRight className="w-3.5 h-3.5" />
 </button>

 <button
 onClick={() => setActiveModal(null)}
 className="w-full py-2.5 rounded-xl bg-white/5 text-white/70 text-[11px] hover:text-white transition-colors cursor-pointer min-h-[40px] flex items-center justify-center"
 >
 Back to Overview
 </button>
 </div>
 </div>
 </div>
 </div>

 {/* Modal footer action */}
 <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
 <span className="text-xs font-mono text-[#9CA3AF] text-center sm:text-left">
 Deployed on Kraken&apos;s Superchain L2 architecture.
 </span>
 <div className="flex flex-col sm:flex-row items-stretch sm:items-center w-full sm:w-auto gap-3">
 <button
 onClick={() => {
 setActiveModal(null);
 onOpenDemoModal();
 }}
 className="w-full sm:w-auto px-5 py-3 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs font-semibold tracking-wider transition-colors cursor-pointer min-h-[44px] flex items-center justify-center"
 >
 Test Live Payer Demo
 </button>
 <button
 onClick={() => {
 setActiveModal(null);
 onOpenCreateModal();
 }}
 className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#7132F5] hover:bg-[#854BFF] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-[0_0_20px_rgba(113,50,245,0.5)] min-h-[44px] flex items-center justify-center"
 >
 Create Payment Link →
 </button>
 </div>
 </div>
 </div>
 </div>
 )}
 </div>
 </section>
 );
};

