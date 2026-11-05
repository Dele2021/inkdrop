'use client';
import React, { useState, useEffect, useRef } from 'react';
import { SectionHeader } from './SectionHeader';
import { SpotlightCard } from './SpotlightCard';
import { Zap, TrendingUp, Users, CheckCircle2, Star, ArrowRight } from 'lucide-react';

// Animated counter hook
function useCounter(target, duration = 1800, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return value;
}

const STATS = [
  { label: 'Total Volume', value: 2847000, prefix: '$', suffix: '+', format: (v) => v >= 1000000 ? `$${(v/1000000).toFixed(2)}M` : `$${(v/1000).toFixed(0)}K`, icon: TrendingUp, color: '#A78BFA' },
  { label: 'Payments Processed', value: 14200, prefix: '', suffix: '+', format: (v) => v.toLocaleString(), icon: CheckCircle2, color: '#10B981' },
  { label: 'Avg Settlement', value: 1.8, prefix: '', suffix: 's', format: () => '~1.8s', icon: Zap, color: '#60A5FA' },
  { label: 'Creators Paid', value: 890, prefix: '', suffix: '+', format: (v) => v.toLocaleString(), icon: Users, color: '#F59E0B' },
];

const TESTIMONIALS = [
  {
    name: 'Zara M.',
    handle: '@zaradesigns',
    avatar: 'ZM',
    avatarColor: '#7132F5',
    tag: 'Brand Designer',
    amount: '$3,200',
    text: 'Sent a link. Client paid in 90 seconds. No invoice chasing, no Stripe fees eating my margins. This is how it should work.',
    stars: 5,
  },
  {
    name: 'Kelechi O.',
    handle: '@keltech',
    avatar: 'KO',
    avatarColor: '#10B981',
    tag: 'Dev Freelancer',
    amount: '$8,500',
    text: 'International clients used to be a nightmare — wire fees, holds, 5-day waits. InkDrop settled $8.5K in under 2 seconds.',
    stars: 5,
  },
  {
    name: 'Priya S.',
    handle: '@priyacreates',
    avatar: 'PS',
    avatarColor: '#F59E0B',
    tag: 'Video Producer',
    amount: '$1,750',
    text: "1% flat. That's it. Stripe was taking $87 on this invoice. InkDrop took $17.50. The math isn't complicated.",
    stars: 5,
  },
  {
    name: 'Marcus T.',
    handle: '@marcusbuilds',
    avatar: 'MT',
    avatarColor: '#3B82F6',
    tag: 'Web3 Consultant',
    amount: '$12,000',
    text: 'Non-custodial matters. My $12K went straight to my wallet — InkDrop never touched it. That trust is priceless.',
    stars: 5,
  },
  {
    name: 'Anika R.',
    handle: '@anikaart',
    avatar: 'AR',
    avatarColor: '#EC4899',
    tag: 'Digital Artist',
    amount: '$650',
    text: 'Set up my first link in 3 minutes. No KYC, no approval wait, no business account needed. Just connected my wallet and went.',
    stars: 5,
  },
  {
    name: 'Dev P.',
    handle: '@devprotocol',
    avatar: 'DP',
    avatarColor: '#8B5CF6',
    tag: 'Smart Contract Dev',
    amount: '$5,400',
    text: 'Audited the contract myself before using it. Clean, minimal, non-custodial. Exactly what I wanted to see.',
    stars: 5,
  },
];

export const SocialProofSection = ({ onOpenCreateModal }) => {
  const [statsVisible, setStatsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const vol = useCounter(2847000, 2000, statsVisible);
  const payments = useCounter(14200, 1800, statsVisible);
  const creators = useCounter(890, 1600, statsVisible);

  const formatStat = (stat, counters) => {
    if (stat.label === 'Total Volume') return stat.format(vol);
    if (stat.label === 'Payments Processed') return stat.format(payments);
    if (stat.label === 'Avg Settlement') return stat.format(0);
    if (stat.label === 'Creators Paid') return stat.format(creators);
    return '—';
  };

  return (
    <section ref={sectionRef} id="social-proof" className="relative py-28 px-4 sm:px-6 lg:px-8 border-t border-white/[0.08] bg-[#050508] overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] pointer-events-none -z-10"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(113,50,245,0.07) 0%, transparent 65%)' }} />

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-14">
          <SectionHeader number="05" total="06" tag="Social Proof" />
          <span className="font-mono text-xs uppercase tracking-[0.15em] text-[#A78BFA] font-semibold">REAL CREATORS · REAL PAYMENTS</span>
        </div>

        <div className="max-w-2xl mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Creators are already{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A78BFA] to-[#60A5FA]">getting paid.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#9CA3AF]">
            From freelancers to Web3 builders — anyone with a wallet and a client can send a link and get paid in seconds.
          </p>
        </div>

        {/* Live stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {STATS.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="relative p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] overflow-hidden group hover:border-white/20 transition-all duration-300">
                <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: `linear-gradient(90deg, transparent, ${stat.color}60, transparent)` }} />
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${stat.color}18`, border: `1px solid ${stat.color}30` }}>
                    <Icon className="w-3.5 h-3.5" style={{ color: stat.color }} />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#9CA3AF]">{stat.label}</span>
                </div>
                <div className="font-mono text-2xl font-black text-white tracking-tight">
                  {statsVisible ? formatStat(stat) : '—'}
                </div>
                <div className="mt-1 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-[10px] text-emerald-400">live</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Testimonial grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {TESTIMONIALS.map((t) => (
            <SpotlightCard key={t.handle} className="flex flex-col justify-between p-6 relative overflow-hidden" spotlightColor="rgba(113,50,245,0.08)">
              <div>
                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {[...Array(t.stars)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                  ))}
                </div>
                {/* Quote */}
                <p className="text-sm text-[#D1D5DB] leading-relaxed mb-5">"{t.text}"</p>
              </div>
              {/* Footer */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center font-mono text-xs font-black text-white shrink-0"
                    style={{ background: `${t.avatarColor}30`, border: `1px solid ${t.avatarColor}50` }}>
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">{t.name}</div>
                    <div className="font-mono text-[11px] text-[#9CA3AF]">{t.tag}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-sm font-black text-emerald-400">{t.amount}</div>
                  <div className="font-mono text-[10px] text-[#9CA3AF]">received</div>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>

        {/* Bottom CTA nudge */}
        <div className="text-center">
          <button onClick={onOpenCreateModal}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 hover:border-white/30 text-white font-semibold text-sm transition-all duration-200 cursor-pointer">
            <span>Join them — create your first link</span>
            <ArrowRight className="w-4 h-4 text-[#A78BFA]" />
          </button>
        </div>
      </div>
    </section>
  );
};
