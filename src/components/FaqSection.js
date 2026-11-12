'use client';
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { ArrowRight } from 'lucide-react';

const faqs = [
  { q: 'What is USDC?', a: 'A digital dollar. One USDC is designed to be worth one US dollar, and it is issued by Circle.' },
  { q: 'Does my client need a crypto wallet?', a: 'No. They can sign in with an email address and one is created for them. They do need USDC or ETH to pay with.' },
  { q: 'Can a payment be reversed?', a: 'No. Payments are final once confirmed, so check the amount and the person before you pay. Refunds are sent by the seller as a new payment.' },
  { q: 'How do I turn it into money in my bank?', a: 'You can withdraw USDC to any exchange that supports Ink Chain (such as Kraken) and convert to your local currency from there.' },
  { q: 'What is Ink Chain?', a: 'Ink Chain is a Layer 2 network built by Kraken on the OP Stack. It offers ~1.8s transaction finality and fees under a cent.' },
  { q: 'Is InkDrop audited?', a: 'The contract source is published and verified on Ink Explorer. An independent audit is in progress — we will link the report when it is complete.' },
];

export const FaqSection = ({ onOpenCreateModal }) => {
  const [open, setOpen] = useState(null);
  return (
    <section id="faq" className="relative py-28 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06] bg-[#020408]">
      <div className="max-w-3xl mx-auto">
        <div className="mb-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#A78BFA] font-semibold">[ 04 / QUESTIONS ]</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-14">
          The things people ask first.
        </h2>
        <div className="space-y-3 mb-16">
          {faqs.map((f, i) => (
            <div key={i}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${open === i ? 'border-[#7132F5]/40 bg-[#0a0d14]/90' : 'border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04]'}`}>
              <button onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left gap-4 cursor-pointer">
                <span className={`font-semibold text-sm sm:text-base transition-colors ${open === i ? 'text-white' : 'text-[#D1D5DB]'}`}>{f.q}</span>
                <ChevronDown className={`w-5 h-5 text-[#A78BFA] shrink-0 transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`} />
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-sm sm:text-base text-[#9CA3AF] leading-relaxed border-t border-white/[0.06] pt-4">
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Final CTA */}
        <div className="text-center p-10 rounded-2xl bg-gradient-to-b from-[#0d0a1a] to-[#07050f] border border-[#7132F5]/30 shadow-[0_0_60px_-20px_rgba(113,50,245,0.5)] relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(113,50,245,0.12) 0%, transparent 65%)' }} />
          <div className="relative">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">Your first link takes about a minute.</h3>
            <p className="text-[#9CA3AF] mb-8">Free to set up. You only pay 1% when someone pays you.</p>
            <button onClick={onOpenCreateModal}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#7132F5] hover:bg-[#854BFF] text-white font-bold text-sm tracking-wide shadow-[0_0_35px_-5px_rgba(113,50,245,0.6)] hover:shadow-[0_0_45px_0px_rgba(113,50,245,0.85)] transition-all hover:-translate-y-0.5 cursor-pointer">
              Create your first link <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
