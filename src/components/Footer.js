'use client';

import React from 'react';
import { InkDropLogo, InkChainIcon } from './Icons';
import { ExternalLink, Github, Twitter, Send } from 'lucide-react';


export const Footer = ({
 onOpenCreateModal,
 onOpenDemoModal,
 onOpenAuthModal,
}) => {
 return (
 <footer className="relative border-t border-white/10 bg-black pt-20 pb-12 px-4 sm:px-6 lg:px-8">
 <div className="max-w-7xl mx-auto">
 {/* Section Counter top label for footer */}
 <div className="flex items-center justify-between font-mono text-xs text-[#9CA3AF]/60 tracking-wider mb-12 pb-4 border-b border-white/5">
 <span className="text-[#8B5CF6]">[ 05 / 05 COMPLETE ]</span>
 <span>[ END ]</span>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16">
 {/* Logo & Protocol Info (4 cols) */}
 <div className="md:col-span-4 space-y-4">
 <InkDropLogo />
 <p className="text-sm text-[#9CA3AF] max-w-xs leading-relaxed">
 The world&apos;s fastest way to request crypto payments. Non-custodial, peer-to-peer USDC protocol on Ink Chain.
 </p>
 <div className="flex items-center gap-2 pt-2 text-xs font-mono text-white/70">
 <span className="w-2 h-2 rounded-full bg-emerald-400" />
 <span>Ink Mainnet Status: 100% Operational</span>
 </div>
 </div>

 {/* 4 Navigation Columns (8 cols) */}
 <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
 {/* Column 1: Product */}
 <div>
 <h4 className="text-xs font-mono uppercase tracking-[0.15em] text-white font-bold mb-4">
 Product
 </h4>
 <ul className="space-y-3 text-sm text-[#9CA3AF]">
 <li>
 <button
 onClick={onOpenCreateModal}
 className="hover:text-[#A78BFA] transition-colors cursor-pointer text-left"
 >
 Create Link
 </button>
 </li>
 <li>
 <button
 onClick={onOpenDemoModal}
 className="hover:text-[#A78BFA] transition-colors cursor-pointer text-left"
 >
 Pay a Link
 </button>
 </li>
 <li>
 <button
 onClick={onOpenAuthModal}
 className="hover:text-[#A78BFA] transition-colors cursor-pointer text-left"
 >
 Dashboard
 </button>
 </li>
 <li>
 <a href="#calculator" className="hover:text-[#A78BFA] transition-colors">
 Fee Calculator
 </a>
 </li>
 </ul>
 </div>

 {/* Column 2: Docs */}
 <div>
 <h4 className="text-xs font-mono uppercase tracking-[0.15em] text-white font-bold mb-4">
 Docs
 </h4>
 <ul className="space-y-3 text-sm text-[#9CA3AF]">
 <li>
 <a
 href="https://explorer.inkonchain.com"
 target="_blank"
 rel="noreferrer"
 className="hover:text-[#A78BFA] transition-colors flex items-center gap-1"
 >
 <span>Smart Contract</span>
 <ExternalLink className="w-3 h-3" />
 </a>
 </li>
 <li>
 <a
 href="https://docs.inkonchain.com"
 target="_blank"
 rel="noreferrer"
 className="hover:text-[#A78BFA] transition-colors flex items-center gap-1"
 >
 <span>API Specs</span>
 <ExternalLink className="w-3 h-3" />
 </a>
 </li>
 <li>
 <a
 href="https://github.com"
 target="_blank"
 rel="noreferrer"
 className="hover:text-[#A78BFA] transition-colors flex items-center gap-1"
 >
 <span>GitHub Repo</span>
 <ExternalLink className="w-3 h-3" />
 </a>
 </li>
 </ul>
 </div>

 {/* Column 3: Legal */}
 <div>
 <h4 className="text-xs font-mono uppercase tracking-[0.15em] text-white font-bold mb-4">
 Legal
 </h4>
 <ul className="space-y-3 text-sm text-[#9CA3AF]">
 <li>
 <span className="hover:text-white transition-colors cursor-default" title="InkDrop never stores personal data or private keys.">
 Privacy Policy
 </span>
 </li>
 <li>
 <span className="hover:text-white transition-colors cursor-default" title="All payments are peer-to-peer on Ink Chain smart contracts.">
 Terms of Use
 </span>
 </li>
 <li>
 <span className="hover:text-white transition-colors cursor-default" title="Audited open-source smart contracts.">
 Disclaimers
 </span>
 </li>
 </ul>
 </div>

 {/* Column 4: Community */}
 <div>
 <h4 className="text-xs font-mono uppercase tracking-[0.15em] text-white font-bold mb-4">
 Community
 </h4>
 <ul className="space-y-3 text-sm text-[#9CA3AF]">
 <li>
 <a
 href="https://x.com"
 target="_blank"
 rel="noreferrer"
 className="hover:text-[#A78BFA] transition-colors flex items-center gap-1.5 min-h-[32px]"
 >
 <Twitter className="w-3.5 h-3.5 text-[#8B5CF6]" />
 <span>X (Twitter)</span>
 </a>
 </li>
 <li>
 <a
 href="https://telegram.org"
 target="_blank"
 rel="noreferrer"
 className="hover:text-[#A78BFA] transition-colors flex items-center gap-1.5 min-h-[32px]"
 >
 <Send className="w-3.5 h-3.5 text-[#8B5CF6]" />
 <span>Telegram</span>
 </a>
 </li>
 <li>
 <a
 href="https://warpcast.com"
 target="_blank"
 rel="noreferrer"
 className="hover:text-[#A78BFA] transition-colors flex items-center gap-1.5 min-h-[32px]"
 >
 <span className="font-bold text-xs text-[#8B5CF6]">FC</span>
 <span>Farcaster</span>
 </a>
 </li>
 </ul>
 </div>
 </div>
 </div>

 {/* Bottom bar */}
 <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#9CA3AF]/70 text-center sm:text-left">
 <div className="break-words">
 © 2024 InkDrop · Built on Ink Chain by Kraken · Non-custodial USDC payments
 </div>
 <div className="flex items-center gap-2 shrink-0">
 <InkChainIcon size={16} />
 <span className="text-white/80">Ink Chain L2 Mainnet</span>
 </div>
 </div>
 </div>
 </footer>
 );
};
