'use client';
import { SectionHeader } from './SectionHeader';

export function DetailsSection() {
  const tiles = [
    { icon: '⚡', title: 'Instant Links', badge: '< 500ms Generation', body: 'Your /pay/[id] is live the moment you create it. Zero indexing delay, zero confirmation waiting period.', glow: 'radial-gradient(circle at 10% 10%, rgba(113,50,245,0.22) 0%, transparent 70%)' },
    { icon: '📧', title: 'Email Login', badge: 'Privy Embedded Auth', body: 'Payers with no crypto wallet? Privy creates one from their email in seconds. No seed phrase management.', glow: 'radial-gradient(circle at 90% 10%, rgba(147,51,234,0.22) 0%, transparent 70%)' },
    { icon: '📱', title: 'Mobile Optimized', badge: 'Responsive PWA Ready', body: 'Pay page works flawlessly on any device. Clean viewport scaling, touch-friendly inputs, and fast loading.', glow: 'radial-gradient(circle at 10% 90%, rgba(113,50,245,0.2) 0%, transparent 70%)' },
    { icon: '⛓', title: 'Ink Chain Native', badge: 'Kraken L2 Rollup', body: "Built on Kraken's L2 for near-zero fees and fast finality. Seamless Ethereum security with optimistic rollups.", glow: 'radial-gradient(circle at 90% 90%, rgba(147,51,234,0.25) 0%, transparent 70%)' },
  ];

  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06] bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-14">
          <SectionHeader number="07" total="08" tag="Details" />
          <span className="font-mono text-xs uppercase tracking-[0.15em] text-[#A78BFA] font-semibold">ELEVATED DETAILS</span>
        </div>
        <div className="max-w-3xl mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">The finishing touches.</h2>
          <p className="mt-4 text-base sm:text-lg text-[#9CA3AF]">Engineered down to the millisecond. Built for high-volume freelancers, startups, and onchain commerce.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {tiles.map(({ icon, title, badge, body, glow }) => (
            <div key={title} className="group relative p-8 sm:p-10 rounded-2xl glass-card glass-card-hover border border-white/10 overflow-hidden" style={{ backgroundImage: glow }}>
              <div className="flex items-center justify-between mb-8">
                <div className="text-3xl">{icon}</div>
                <span className="font-mono text-xs uppercase tracking-wider text-[#9CA3AF] px-3 py-1 rounded-full bg-white/[0.03] border border-white/5">{badge}</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#A78BFA] transition-colors">{title}</h3>
              <p className="text-base text-[#9CA3AF] leading-relaxed">{body}</p>
              <div className="mt-6 text-xs font-mono text-[#8B5CF6]">✓ Production verified on Ink Chain</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
