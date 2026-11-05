'use client';

import React, { useState } from 'react';
import { SectionHeader } from './SectionHeader';
import { Lock, Link as LinkIcon, ShieldCheck, Globe, Copy, Check, ExternalLink } from 'lucide-react';
import { SpotlightCard } from './SpotlightCard';
import { playMicroSound } from '../utils/sound';

export const SecuritySection = () => {
 const [copiedContract, setCopiedContract] = useState(false);
 const contractAddress = '0x7F8798eA489379659341498B75F348F29aeB5A2';

 const handleCopy = () => {
 playMicroSound('click');
 navigator.clipboard?.writeText(contractAddress);
 setCopiedContract(true);
 setTimeout(() => setCopiedContract(false), 2000);
 };

 const securityCards = [
 {
 icon: Lock,
 title: 'Non-custodial',
 desc: 'InkDrop never holds your funds. Payments go directly to your wallet via smart contract.',
 meta: 'Peer-to-peer settlement',
 },
 {
 icon: LinkIcon,
 title: 'Onchain Transparency',
 desc: 'Every transaction is verifiable on Ink Chain explorer. No black boxes, no opaque internal ledgers.',
 meta: '100% Onchain verifiability',
 },
 {
 icon: ShieldCheck,
 title: 'Audited Contract',
 desc: `Smart contract at 0x7F87...eB5A2. Verified and open source on Ink Chain block explorer.`,
 meta: 'Open-source verified bytecode',
 hasContractBadge: true,
 },
 {
 icon: Globe,
 title: 'No KYC Required',
 desc: 'Connect a wallet. Create a link. That’s it. No document uploads, credit checks, or artificial account freezes.',
 meta: 'Permissionless architecture',
 },
 ];

 return (
 <section id="security" className="relative py-28 px-4 sm:px-6 lg:px-8 border-t border-white/[0.08] bg-[#090c13]">
 <div className="max-w-7xl mx-auto">
 {/* Section Counter & Eyebrow */}
 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-14">
 <SectionHeader number="05" total="05" tag="Security" />
 <span className="font-mono text-xs uppercase tracking-[0.15em] text-[#A78BFA] font-semibold">
 NON-CUSTODIAL BY DESIGN
 </span>
 </div>

 {/* Section H2 */}
 <div className="max-w-3xl mb-16">
 <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
 Your funds. Your keys. Always.
 </h2>
 <p className="mt-4 text-base sm:text-lg text-[#9CA3AF]">
 Traditional payment gateways can freeze accounts, hold reserves, and reverse settled transactions. InkDrop cannot touch your USDC.
 </p>
 </div>

 {/* 2x2 Grid */}
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-12">
 {securityCards.map((card) => {
 const Icon = card.icon;
 return (
 <SpotlightCard
 key={card.title}
 className="flex flex-col justify-between"
 >
 <div>
 <div className="flex items-center justify-between mb-6">
 <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#8B5CF6] group-hover:scale-105 transition-transform">
 <Icon className="w-6 h-6" />
 </div>
 <span className="text-[11px] font-mono uppercase tracking-wider text-[#9CA3AF] bg-white/[0.03] px-2.5 py-1 rounded-md border border-white/5">
 {card.meta}
 </span>
 </div>

 <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-[#A78BFA] transition-colors">
 {card.title}
 </h3>
 <p className="text-sm sm:text-base text-[#9CA3AF] leading-relaxed">
 {card.desc}
 </p>
 </div>

 {card.hasContractBadge && (
 <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
 <div className="flex items-center gap-2 text-white/90 bg-black/60 px-3 py-2 rounded-lg border border-white/10 min-h-[38px]">
 <span>0x7F87...eB5A2</span>
 <button
 onClick={handleCopy}
 className="text-[#A78BFA] hover:text-white transition-colors cursor-pointer p-0.5"
 title="Copy full contract address"
 >
 {copiedContract ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
 </button>
 </div>

 <a
 href="https://explorer.inkonchain.com"
 target="_blank"
 rel="noreferrer"
 className="inline-flex items-center gap-1 text-[#A78BFA] hover:underline min-h-[38px]"
 >
 <span>Ink Explorer</span>
 <ExternalLink className="w-3 h-3" />
 </a>
 </div>
 )}
 </SpotlightCard>
 );
 })}
 </div>

 {/* Security verification callout */}
 <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-emerald-950/20 via-black to-blue-950/20 border border-emerald-500/20 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
 <div className="flex items-center gap-3">
 <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
 <ShieldCheck className="w-5 h-5" />
 </div>
 <div>
 <div className="text-sm font-bold text-white">Continuous Onchain Invariants Verified</div>
 <div className="text-xs text-[#9CA3AF]">
 Zero admin keys capable of draining balances. Smart contract cannot mint or hold user tokens.
 </div>
 </div>
 </div>
 <button
 onClick={handleCopy}
 className="w-full sm:w-auto px-4 py-3 text-xs font-mono text-emerald-400 hover:text-white border border-emerald-500/30 hover:border-emerald-500/60 rounded-lg transition-colors whitespace-nowrap cursor-pointer min-h-[44px] flex items-center justify-center text-center shrink-0"
 >
 {copiedContract ? 'Address Copied!' : 'Copy Contract: 0x7F87...eB5A2'}
 </button>
 </div>
 </div>
 </section>
 );
};
