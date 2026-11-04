'use client';
import { SectionHeader } from './SectionHeader';

export function IntroSection() {
  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06] bg-gradient-to-b from-black via-[#06080d] to-black">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12"><SectionHeader number="02" total="08" tag="Intro" /></div>
        <div className="max-w-[760px] mx-auto text-center">
          <p className="text-xl sm:text-3xl md:text-4xl text-white font-medium leading-[1.6] sm:leading-[1.45] tracking-tight">
            InkDrop is a non-custodial payment protocol built on{' '}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 mx-1 rounded-full bg-purple-950/70 border border-purple-500/40 text-purple-200 text-xl font-semibold align-middle shadow-[0_0_15px_rgba(168,85,247,0.25)]">
              Ink Chain
            </span>{' '}
            — Kraken&apos;s L2. Send a link. Get paid in{' '}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 mx-1 rounded-full bg-blue-950/70 border border-blue-500/40 text-blue-200 text-xl font-semibold align-middle shadow-[0_0_15px_rgba(59,130,246,0.25)]">
              USDC
            </span>
            . No wallet setup required. No fees taken by us.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-14 pt-10 border-t border-white/[0.08]">
            {[
              { icon: '%', color: 'bg-[#7132F5]/15 text-[#A78BFA]', title: '0% Protocol Fee', sub: 'Keep 100% of your earnings' },
              { icon: '⚡', color: 'bg-purple-500/10 text-purple-400', title: '~2s Finality', sub: 'Instant Kraken L2 settlement' },
              { icon: '🛡', color: 'bg-emerald-500/10 text-emerald-400', title: 'Direct to Wallet', sub: 'Non-custodial smart contracts' },
            ].map(({ icon, color, title, sub }) => (
              <div key={title} className="flex flex-col items-center p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 text-lg ${color}`}>{icon}</div>
                <span className="text-xl font-bold text-white">{title}</span>
                <span className="text-xs text-[#9CA3AF] mt-1">{sub}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
