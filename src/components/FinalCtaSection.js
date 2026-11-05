'use client';

import React from 'react';
import { SectionHeader } from './SectionHeader';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';


export const FinalCtaSection = ({
 onOpenCreateModal,
 onOpenDemoModal,
}) => {
 return (
 <section className="relative py-32 px-4 sm:px-6 lg:px-8 border-t border-white/[0.08] overflow-hidden bg-black text-center">
 {/* Slow-moving radial gradient pulse in background */}
 <div
 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] rounded-full blur-[160px] animate-glow-pulse pointer-events-none -z-10"
 style={{
 background: 'radial-gradient(circle, rgba(113, 50, 245, 0.35) 0%, rgba(88, 28, 135, 0.2) 50%, transparent 75%)',
 }}
 />

 <div className="max-w-7xl mx-auto">
 {/* Cyber Protocol Badge */}
 <div className="flex justify-center mb-8">
 <span className="font-mono text-xs text-[#8B5CF6] tracking-wider uppercase select-none px-3 py-1 rounded-full bg-white/[0.04] border border-white/10">
 [ INK CHAIN L2 · NON-CUSTODIAL PROTOCOL ]
 </span>
 </div>

 <div className="max-w-4xl mx-auto">
 {/* Eyebrow */}
 <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#A78BFA] font-semibold mb-6 inline-block">
 GET STARTED FREE
 </span>

 {/* H2 */}
 <h2 className="text-3xl xs:text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6 text-balance break-words">
 Start accepting crypto payments today.
 </h2>

 {/* Body */}
 <p className="text-base sm:text-xl text-[#9CA3AF] max-w-xl mx-auto leading-relaxed mb-10 sm:mb-12 px-2">
 Transparent 1% platform fee. No gas complexity. Just a link.
 </p>

 {/* Big Centered Button: Create Your First Link → */}
 <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto">
 <button
 onClick={onOpenCreateModal}
 className="w-full sm:w-auto px-6 sm:px-10 py-4 sm:py-5 rounded-full bg-[#7132F5] hover:bg-[#854BFF] text-white font-extrabold text-base sm:text-lg tracking-wide flex items-center justify-center gap-3 shadow-[0_0_40px_rgba(113,50,245,0.6)] hover:shadow-[0_0_65px_rgba(113,50,245,0.85)] transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 cursor-pointer min-h-[52px]"
 >
 <span>Create Your First Link</span>
 <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
 </button>

 <button
 onClick={onOpenDemoModal}
 className="w-full sm:w-auto px-6 sm:px-8 py-4 sm:py-5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/20 hover:border-white/40 font-semibold text-sm sm:text-base tracking-wide flex items-center justify-center gap-2 backdrop-blur-md transition-all duration-200 cursor-pointer min-h-[52px]"
 >
 <span>Explore Interactive Demo</span>
 </button>
 </div>

 {/* Trust markers */}
 <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-[#9CA3AF]">
 <div className="flex items-center gap-2">
 <CheckCircle2 className="w-4 h-4 text-emerald-400" />
 <span>Zero setup fees</span>
 </div>
 <span className="text-white/20">·</span>
 <div className="flex items-center gap-2">
 <CheckCircle2 className="w-4 h-4 text-[#8B5CF6]" />
 <span>Kraken L2 speed (~2s)</span>
 </div>
 <span className="text-white/20">·</span>
 <div className="flex items-center gap-2">
 <CheckCircle2 className="w-4 h-4 text-purple-400" />
 <span>Non-custodial smart contracts</span>
 </div>
 </div>
 </div>
 </div>
 </section>
 );
};
