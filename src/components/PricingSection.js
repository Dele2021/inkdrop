'use client';
import React, { useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';

export const PricingSection = ({ onOpenCreateModal }) => {
  const [amount, setAmount] = useState(2500);
  const fee = +(amount * 0.01).toFixed(2);
  const net = +(amount * 0.99).toFixed(2);
  const stripe = +(amount * 0.029 + 0.30).toFixed(2);
  const stripeNet = +(amount - stripe).toFixed(2);

  return (
    <section id="pricing" className="relative py-28 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06] bg-[#060810]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(113,50,245,0.08) 0%, transparent 70%)' }} />
      <div className="max-w-7xl mx-auto relative">
        <div className="mb-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#A78BFA] font-semibold">[ 02 / PRICING ]</span>
        </div>
        <div className="max-w-2xl mb-14">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            1% per payment. That is the whole price list.
          </h2>
          <p className="text-base sm:text-lg text-[#9CA3AF]">No monthly fee, no setup fee, no minimum.</p>
        </div>

        {/* Comparison cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mb-14">
          {/* InkDrop */}
          <div className="relative p-6 sm:p-8 rounded-2xl bg-[#0a0d14]/90 border border-[#7132F5]/40 shadow-[0_0_40px_-10px_rgba(113,50,245,0.4)]">
            <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl" style={{ background: 'linear-gradient(90deg, transparent, #7132F5, transparent)' }} />
            <div className="flex items-center justify-between mb-6">
              <span className="font-bold text-white text-lg">InkDrop</span>
              <span className="font-mono text-[11px] px-2.5 py-1 rounded-full bg-[#7132F5]/20 border border-[#7132F5]/40 text-[#D8B4FE]">1% flat</span>
            </div>
            <div className="text-4xl font-extrabold text-white mb-1">You keep</div>
            <div className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-[#A78BFA] tabular-nums mb-4">
              ${net.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <div className="text-sm text-[#9CA3AF] font-mono mb-6">Fee: ${fee.toFixed(2)} (1%)</div>
            <ul className="space-y-2 text-sm text-[#9CA3AF]">
              {['No monthly fee','No setup fee','No minimum','Instant settlement'].map(f => (
                <li key={f} className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400 shrink-0" />{f}</li>
              ))}
            </ul>
          </div>

          {/* Stripe comparison */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
            <div className="flex items-center justify-between mb-6">
              <span className="font-bold text-white text-lg">Typical card processor</span>
              <span className="font-mono text-[11px] px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[#9CA3AF]">2.9% + $0.30</span>
            </div>
            <div className="text-4xl font-extrabold text-white mb-1">You keep</div>
            <div className="text-5xl font-extrabold text-[#9CA3AF] tabular-nums mb-4">
              ${stripeNet.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <div className="text-sm text-[#9CA3AF] font-mono mb-6">Fee: ${stripe.toFixed(2)} (2.9% + $0.30)</div>
            <ul className="space-y-2 text-sm text-[#6B7280]">
              {['Monthly subscription','Chargeback risk','Holds & reserves','2–5 day payout'].map(f => (
                <li key={f} className="flex items-center gap-2 line-through decoration-[#6B7280]/50">{f}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Calculator */}
        <div className="max-w-xl p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
          <p className="text-sm font-mono text-[#9CA3AF] mb-3 uppercase tracking-wider">Work out your own numbers</p>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-white font-bold text-xl">$</span>
            <input type="number" min="1" value={amount} onChange={e => setAmount(+e.target.value || 0)}
              className="flex-1 bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white font-mono text-lg focus:outline-none focus:border-[#7132F5]/60 focus:ring-1 focus:ring-[#7132F5]/40" />
          </div>
          <div className="flex items-center justify-between text-sm font-mono">
            <span className="text-[#9CA3AF]">InkDrop fee: <span className="text-purple-300">${fee.toFixed(2)}</span></span>
            <span className="text-[#9CA3AF]">You receive: <span className="text-emerald-400 font-bold">${net.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span></span>
          </div>
        </div>

        <div className="mt-10">
          <button onClick={onOpenCreateModal}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#7132F5] hover:bg-[#854BFF] text-white font-bold text-sm tracking-wide shadow-[0_0_30px_-5px_rgba(113,50,245,0.6)] hover:shadow-[0_0_40px_0px_rgba(113,50,245,0.8)] transition-all hover:-translate-y-0.5 cursor-pointer">
            Create your first link <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
