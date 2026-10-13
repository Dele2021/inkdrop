"use client";
import { GhostLogo } from "@/components/GhostLogo";
import { LinkIcon, BoltIcon, ShieldIcon } from "@/components/Icons";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import Link from "next/link";

export default function Home() {
  const { isConnected } = useAccount();

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* ── Background Glow Orbs ── */}
      <div
        className="glow-orb"
        style={{
          width: 600,
          height: 600,
          background: "#7132F5",
          top: -200,
          right: -200,
        }}
      />
      <div
        className="glow-orb"
        style={{
          width: 400,
          height: 400,
          background: "#9E70FF",
          bottom: 200,
          left: -150,
        }}
      />

      {/* ── Navigation ── */}
      <nav className="relative z-10">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <GhostLogo size={28} />
            <span className="text-lg font-bold tracking-tight">InkDrop</span>
          </div>
          <div className="flex items-center gap-8">
            <a
              href="#how-it-works"
              className="text-sm font-medium hidden sm:block"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              How it works
            </a>
            <a
              href="#features"
              className="text-sm font-medium hidden sm:block"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              Features
            </a>
            <ConnectButton
              chainStatus="icon"
              showBalance={false}
              accountStatus="avatar"
            />
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pt-20 pb-24 sm:pt-32 sm:pb-36 text-center">
        {/* Pill badge */}
        <div className="animate-fade-up mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full"
          style={{
            background: "rgba(113, 50, 245, 0.1)",
            border: "1px solid rgba(113, 50, 245, 0.2)",
          }}
        >
          <span
            className="animate-pulse-subtle"
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#22C55E",
              display: "inline-block",
            }}
          />
          <span className="text-sm font-medium" style={{ color: "var(--ink-light)" }}>
            Live on Ink Chain
          </span>
        </div>

        {/* Heading */}
        <h1
          className="animate-fade-up-delay-1 font-display text-5xl sm:text-7xl font-black tracking-tight leading-[1.05] mb-6"
        >
          <span className="text-gradient">Get Paid With</span>
          <br />
          <span className="text-gradient-purple">A Link</span>
        </h1>

        {/* Subhead */}
        <p
          className="animate-fade-up-delay-2 text-lg sm:text-xl font-medium max-w-xl mx-auto mb-10"
          style={{ color: "var(--ink-text-secondary)" }}
        >
          Stripe payment links, but onchain. Create a link, share it anywhere,
          get paid in USDC or ETH on Ink Chain.
        </p>

        {/* CTA */}
        <div className="animate-fade-up-delay-3 flex flex-col sm:flex-row items-center justify-center gap-4">
          {isConnected ? (
            <Link href="/dashboard">
              <button className="btn-primary px-8 py-4 text-base rounded-xl">
                Go to Dashboard
              </button>
            </Link>
          ) : (
            <ConnectButton.Custom>
              {({ openConnectModal }) => (
                <button
                  onClick={openConnectModal}
                  className="btn-primary px-8 py-4 text-base rounded-xl"
                >
                  Create Payment Link
                </button>
              )}
            </ConnectButton.Custom>
          )}
          <a
            href="#how-it-works"
            className="btn-ghost px-8 py-4 text-base rounded-xl inline-block"
          >
            How it works
          </a>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 pb-24">
        <div
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-2xl"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid var(--ink-border)",
          }}
        >
          {[
            { value: "1%", label: "Platform Fee" },
            { value: "1s", label: "Confirmation" },
            { value: "<$0.01", label: "Gas Cost" },
            { value: "∞", label: "No Borders" },
          ].map((stat, i) => (
            <div key={i} className="text-center py-2">
              <p
                className="text-2xl sm:text-3xl font-bold tracking-tight mb-1"
                style={{ color: i === 0 ? "var(--ink-purple)" : "var(--ink-text)" }}
              >
                {stat.value}
              </p>
              <p className="text-xs font-medium" style={{ color: "var(--ink-text-muted)" }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" className="relative z-10 max-w-6xl mx-auto px-6 pb-24">
        <div className="text-center mb-14">
          <p
            className="text-xs font-bold tracking-[3px] uppercase mb-4"
            style={{ color: "var(--ink-purple)" }}
          >
            How it works
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gradient">
            Three steps. That&apos;s it.
          </h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          {[
            {
              step: "01",
              title: "Connect Wallet",
              desc: "Link your wallet and set the token you want to receive. USDC, ETH — your call.",
              Icon: LinkIcon,
            },
            {
              step: "02",
              title: "Create a Link",
              desc: "Set an amount (or leave it open), name the link, and you're live. Takes 10 seconds.",
              Icon: BoltIcon,
            },
            {
              step: "03",
              title: "Get Paid",
              desc: "Share the link. Buyers pay from any wallet. Funds settle to your balance instantly.",
              Icon: ShieldIcon,
            },
          ].map((item, i) => (
            <div key={i} className="accent-card p-7">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                style={{ background: "rgba(113, 50, 245, 0.12)" }}
              >
                <item.Icon />
              </div>
              <div className="flex items-baseline gap-3 mb-2">
                <span
                  className="text-xs font-bold"
                  style={{ color: "var(--ink-purple)" }}
                >
                  {item.step}
                </span>
                <h3 className="text-lg font-bold">{item.title}</h3>
              </div>
              <p
                className="text-sm font-medium leading-relaxed"
                style={{ color: "var(--ink-text-secondary)" }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="relative z-10 max-w-6xl mx-auto px-6 pb-24">
        <div className="text-center mb-14">
         <p
            className="text-xs font-bold tracking-[3px] uppercase mb-4"
            style={{ color: "var(--ink-purple)" }}
          >
            Why InkDrop
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gradient">
            Payments without the horror stories
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {[
            {
              title: "No Merchant Account",
              desc: "No KYC, no applications, no waiting. Connect a wallet and start receiving payments immediately.",
            },
            {
              title: "Auto Swap to USDC",
              desc: "Buyers can pay with ETH. It auto-swaps to USDC via Velodrome so you always receive stablecoins.",
            },
            {
              title: "Sub-Cent Gas",
              desc: "Ink Chain is Kraken's OP Stack L2. Transactions cost fractions of a penny with 1-second finality.",
            },
            {
              title: "Withdraw Anytime",
              desc: "Your funds sit in the contract until you withdraw. No lockups, no minimum thresholds, no delays.",
            },
          ].map((item, i) => (
            <div key={i} className="glass-card p-7">
              <h3 className="text-lg font-bold mb-2">{item.title}</h3>
              <p
                className="text-sm font-medium leading-relaxed"
                style={{ color: "var(--ink-text-secondary)" }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pb-24">
        <div
          className="text-center py-16 px-8 rounded-2xl"
          style={{
            background: "linear-gradient(135deg, rgba(113,50,245,0.12) 0%, rgba(113,50,245,0.04) 100%)",
            border: "1px solid var(--ink-border-purple)",
          }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-gradient">
            Start accepting payments
          </h2>
          <p
            className="text-base font-medium max-w-md mx-auto mb-8"
            style={{ color: "var(--ink-text-secondary)" }}
          >
            No setup fees. No monthly costs. Just 1% on successful payments.
          </p>
          {isConnected ? (
            <Link href="/dashboard">
              <button className="btn-primary px-8 py-4 text-base rounded-xl">
                Go to Dashboard
              </button>
            </Link>
          ) : (
            <ConnectButton.Custom>
              {({ openConnectModal }) => (
                <button
                  onClick={openConnectModal}
                  className="btn-primary px-8 py-4 text-base rounded-xl"
                >
                  Get Started
                </button>
              )}
            </ConnectButton.Custom>
          )}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="relative z-10 max-w-6xl mx-auto px-6 pb-12">
        <div className="ink-gradient-line mb-8" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <GhostLogo size={20} />
            <span className="text-sm font-semibold">InkDrop</span>
          </div>
          <p
            className="text-sm font-medium"
            style={{ color: "var(--ink-text-muted)" }}
          >
            Built on Ink Chain — Kraken&apos;s L2
          </p>
        </div>
      </footer>
    </div>
  );
}
