'use client';
import { useState } from 'react';
import { SectionHeader } from './SectionHeader';

const CONTRACT = '0x7F8798eA489379659341498B75F348F29aeB5A2';

export function SecuritySection() {
  const [copied, setCopied] = useState(false);
  const tiles = [
    { icon: '🛡', title: 'Non-custodial', body: 'Funds flow directly from payer to your wallet. InkDrop never holds your money.' },
    { icon: '👁', title: 'Onchain Transparency', body: 'Every payment is verifiable on Ink Chain. Full auditability with no hidden state.' },
    { icon: '📋', title: 'Audited Contract', body: 'Smart contract reviewed for invariant safety. Copy the address and verify yourself.' },
    { icon: '🚫', title: 'No KYC Required', body: 'Create and receive payments without submitting personal documents or identity checks.' },
  ];

  return (
    <section id="security" className="relative py-28 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06] bg-[#090c13]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-14">
          <SectionHeader number="06" total="08" tag="Security" />
          <span className="font-mono text-xs uppercase tracking-[0.15em] text-[#A78BFA] font-semibold">NON-CUSTODIAL BY DESIGN</span>
        </div>
        <div className="max-w-3xl mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">Your funds. Your keys. Always.</h2>
          <p className="mt-4 text-base sm:text-lg text-[#9CA3AF]">InkDrop never touches your money. Payments go directly to your wallet via smart contract.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          {tiles.map(({ icon, title, body }) => (
            <div key={title} className="group p-6 sm:p-8 rounded-2xl glass-card glass-card-hover border border-white/10">
              <div className="text-3xl mb-5">{icon}</div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#A78BFA] transition-colors">{title}</h3>
              <p className="text-sm text-[#9CA3AF] leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
        <div className="p-6 rounded-2xl bg-[#7132F5]/10 border border-[#7132F5]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#A78BFA] mb-1">Continuous Onchain Invariants Verified</div>
            <div className="font-mono text-sm text-white/80 break-all">{CONTRACT}</div>
          </div>
          <button onClick={() => { navigator.clipboard.writeText(CONTRACT); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
            className="shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.10] border border-white/15 text-white text-xs font-semibold cursor-pointer">
            {copied ? '✓ Copied!' : '⧉ Copy Contract'}
          </button>
        </div>
      </div>
    </section>
  );
}
