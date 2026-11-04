'use client';
import { useState, useEffect } from 'react';
import { SpotlightCard } from './SpotlightCard';

export function InteractivePaymentEngine() {
  const [activeStep, setActiveStep] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [customTitle, setCustomTitle] = useState('Brand Sprint & UI Architecture');
  const [customAmount, setCustomAmount] = useState(1200);
  const [payerEmail, setPayerEmail] = useState('payer.client@venture.co');
  const [finalityCountdown, setFinalityCountdown] = useState(1.8);
  const [isFinalized, setIsFinalized] = useState(false);

  const platformFee = customAmount * 0.01;
  const merchantNet = customAmount - platformFee;

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev >= 4 ? 1 : prev + 1));
    }, 4500);
    return () => clearInterval(timer);
  }, [isPlaying]);

  useEffect(() => {
    if (activeStep === 3) {
      setIsFinalized(false);
      setFinalityCountdown(1.8);
      const interval = setInterval(() => {
        setFinalityCountdown((prev) => {
          if (prev <= 0.1) { clearInterval(interval); setIsFinalized(true); return 0.0; }
          return parseFloat((prev - 0.2).toFixed(1));
        });
      }, 180);
      return () => clearInterval(interval);
    }
  }, [activeStep]);

  const stepsMeta = [
    { num: 1, title: 'Generate Link', tag: 'INPUT', icon: '🔗', desc: 'Zero-config payment link with transparent 1% fee' },
    { num: 2, title: 'Email Handshake', tag: 'AUTH', icon: '📧', desc: 'Privy provisions an MPC wallet from email in 380ms' },
    { num: 3, title: 'Ink L2 Finality', tag: 'ROLLUP', icon: '⚡', desc: 'Kraken sequencer confirms block in ~1.8 seconds' },
    { num: 4, title: '99% Net Payout', tag: 'SETTLED', icon: '✅', desc: 'USDC lands directly in merchant self-custody' },
  ];

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#7132F5]/20 border border-[#7132F5]/40 font-mono text-xs text-[#D8B4FE]">
            <span className="w-2 h-2 rounded-full bg-[#8B5CF6] animate-ping" />
            <span>INTERACTIVE PAYMENT LIFECYCLE SIMULATOR</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setIsPlaying(!isPlaying)}
            className={`px-3.5 py-1.5 rounded-lg border font-mono text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${isPlaying ? 'border-[#7132F5] bg-[#7132F5]/20 text-white' : 'border-white/15 bg-white/[0.03] text-[#9CA3AF] hover:text-white'}`}>
            {isPlaying ? <><span className="w-2 h-2 rounded-sm bg-[#8B5CF6] animate-pulse" /><span>AUTO PLAYING</span></> : <><span>▶</span><span>RESUME DEMO</span></>}
          </button>
          <button onClick={() => { setActiveStep(1); setIsPlaying(true); }}
            className="p-2 rounded-lg border border-white/10 bg-white/[0.02] text-[#9CA3AF] hover:text-white cursor-pointer" title="Reset">↺</button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {stepsMeta.map((s) => {
          const isActive = activeStep === s.num;
          return (
            <button key={s.num} onClick={() => { setIsPlaying(false); setActiveStep(s.num); }}
              className={`text-left p-3.5 sm:p-4 rounded-xl border transition-all duration-300 relative overflow-hidden cursor-pointer \${isActive ? 'bg-[#7132F5]/15 border-[#7132F5] shadow-[0_0_25px_rgba(113,50,245,0.3)]' : 'bg-black/60 border-white/10 hover:border-white/25'}`}>
              {isActive && <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#7132F5] via-[#854BFF] to-[#A78BFA]" />}
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[10px] text-[#A78BFA] font-bold">[ STAGE 0{s.num} ]</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border \${isActive ? 'bg-[#7132F5]/40 border-[#7132F5] text-white' : 'bg-white/5 border-white/10 text-[#9CA3AF]'}`}>{s.tag}</span>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-base">{s.icon}</span>
                <span className="text-sm font-bold text-white tracking-tight">{s.title}</span>
              </div>
              <p className="text-[11px] text-[#9CA3AF] line-clamp-1">{s.desc}</p>
            </button>
          );
        })}
      </div>

      <SpotlightCard className="p-5 sm:p-8 border-white/15 bg-black/85">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-6 border-b border-white/10 font-mono text-xs text-[#9CA3AF]">
          <div className="flex items-center gap-2">
            <span className="text-[#A78BFA]">⌘</span>
            <span className="text-white font-semibold">INKDROP_PROTOCOL_KERNEL</span>
            <span className="text-white/30">::</span>
            <span className="text-[#D8B4FE]">STAGE_0{activeStep}_ACTIVE</span>
          </div>
          <div className="flex items-center gap-3 text-[11px]">
            <span className="text-white/60">Fee: <strong className="text-white">1.0%</strong></span>
            <span className="text-white/30">|</span>
            <span className="text-emerald-400 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> L2 Live</span>
          </div>
        </div>

        {activeStep === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div><span className="font-mono text-xs uppercase tracking-wider text-[#A78BFA]">Step 1 · Dynamic Payment Synthesis</span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Enter payment amount. URL synthesizes instantly.</h3>
                <p className="text-sm text-[#9CA3AF] mt-2 leading-relaxed">No merchant account required. Our smart contract encodes the invoice details on Ink Chain with a transparent 1% protocol fee.</p>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-3">
                <div><label className="block text-[11px] font-mono text-[#9CA3AF] uppercase mb-1">Invoice Description</label>
                  <input type="text" value={customTitle} onChange={e => setCustomTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-black rounded-lg border border-white/15 text-white text-xs font-medium focus:outline-none focus:border-[#7132F5]" /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="block text-[11px] font-mono text-[#9CA3AF] uppercase mb-1">Gross Amount (USDC)</label>
                    <div className="relative">
                      <input type="number" min={10} max={100000} value={customAmount} onChange={e => setCustomAmount(Math.max(1, Number(e.target.value)))}
                        className="w-full px-3 py-2 bg-black rounded-lg border border-white/15 text-white font-mono text-sm font-bold focus:outline-none focus:border-[#7132F5]" />
                      <span className="absolute right-2.5 top-2 text-[10px] font-mono text-[#9CA3AF]">USDC</span>
                    </div>
                  </div>
                  <div><label className="block text-[11px] font-mono text-[#9CA3AF] uppercase mb-1">1% InkDrop Fee</label>
                    <div className="px-3 py-2 bg-[#7132F5]/10 rounded-lg border border-[#7132F5]/30 text-[#D8B4FE] font-mono text-sm font-bold flex items-center justify-between">
                      <span>${platformFee.toFixed(2)}</span><span className="text-[10px] text-white/50">1.0%</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/25 text-xs font-mono">
                <span className="text-[#9CA3AF]">You Receive Directly in Wallet:</span>
                <span className="text-emerald-400 font-bold text-sm">${merchantNet.toFixed(2)} USDC (99.0%)</span>
              </div>
            </div>
            <div className="lg:col-span-5 p-5 rounded-2xl bg-black border border-white/15 space-y-4">
              <div className="flex items-center justify-between text-xs pb-3 border-b border-white/10">
                <span className="font-mono text-[#A78BFA]">Generated Pay Link</span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-500/20">Ready to share</span>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 font-mono text-xs">
                <div className="text-[10px] text-[#9CA3AF] mb-1">Live Endpoint</div>
                <div className="text-[#C4B5FD] font-bold truncate text-sm">inkdrop.link/pay/inv-{customAmount}</div>
              </div>
              <div className="space-y-2 text-xs">
                {[['Requested Volume', `$\${customAmount.toFixed(2)} USDC`, 'text-white font-bold font-mono'],
                  ['Fee Transparency', `1% ($\${platformFee.toFixed(2)})`, 'text-purple-300 font-mono font-bold']].map(([label, val, cls]) => (
                  <div key={label} className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-[#9CA3AF]">{label}:</span><span className={cls}>{val}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => { setIsPlaying(false); setActiveStep(2); }}
                className="w-full py-2.5 rounded-lg bg-[#7132F5] hover:bg-[#854BFF] text-white font-bold text-xs uppercase tracking-wider cursor-pointer">
                Simulate Next: Payer Experience →
              </button>
            </div>
          </div>
        )}

        {activeStep === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div><span className="font-mono text-xs uppercase tracking-wider text-[#A78BFA]">Step 2 · Zero-Friction Payer Handshake</span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Payers don&apos;t need crypto wallets.</h3>
                <p className="text-sm text-[#9CA3AF] mt-2 leading-relaxed">Entering their email automatically generates a non-custodial MPC wallet in 380 milliseconds via Privy.</p>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-3 text-xs">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input type="email" value={payerEmail} onChange={e => setPayerEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-black rounded-lg border border-white/15 text-white font-mono text-xs" />
                  <button className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs whitespace-nowrap cursor-pointer">Send OTP</button>
                </div>
                <div className="grid grid-cols-3 gap-2 pt-1">
                  {[['Key Fragment 1', 'Payer Device', 'text-emerald-400'], ['Key Fragment 2', 'Privy HSM', 'text-purple-400'], ['Setup Time', '0.38s', 'text-white']].map(([k, v, cls]) => (
                    <div key={k} className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5 text-center">
                      <span className="text-[10px] text-[#9CA3AF] block font-mono">{k}</span>
                      <span className={`font-bold font-mono text-xs \${cls}`}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-lg bg-[#7132F5]/10 border border-[#7132F5]/30 text-xs font-mono text-[#D8B4FE]">
                ✓ Zero seed phrases · Biometric confirmation in 1 tap
              </div>
            </div>
            <div className="lg:col-span-5 p-5 rounded-2xl bg-black border border-white/15 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="font-mono text-xs text-white font-bold">Privy Session Verified</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/30 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-[#7132F5] text-white font-extrabold flex items-center justify-center mx-auto text-sm">PC</div>
                <div className="text-white font-bold text-sm">{payerEmail}</div>
                <div className="font-mono text-xs text-[#D8B4FE] bg-black/60 py-1 px-2 rounded">0x6E12...39Fa (MPC)</div>
              </div>
              <button onClick={() => { setIsPlaying(false); setActiveStep(3); }}
                className="w-full py-2.5 rounded-lg bg-[#7132F5] hover:bg-[#854BFF] text-white font-bold text-xs uppercase tracking-wider cursor-pointer">
                Authorize &amp; Transmit to Ink Chain →
              </button>
            </div>
          </div>
        )}

        {activeStep === 3 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div><span className="font-mono text-xs uppercase tracking-wider text-[#A78BFA]">Step 3 · Kraken Superchain L2 Finality</span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Sub-second rollup finality. Sub-cent gas.</h3>
                <p className="text-sm text-[#9CA3AF] mt-2 leading-relaxed">Ink Chain executes optimistic rollups with instant sequencing by Kraken. Finalizes in ~1.8 seconds vs. 2–7 days for credit cards.</p>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#9CA3AF]">Sequencer Finality Timer:</span>
                  <span className="text-white font-bold">{isFinalized ? <span className="text-emerald-400">CONFIRMED (1.8s)</span> : <span className="text-[#D8B4FE] animate-pulse">{finalityCountdown}s remaining</span>}</span>
                </div>
                <div className="w-full h-3 bg-black/80 rounded-full border border-white/15 overflow-hidden p-0.5">
                  <div className="h-full bg-gradient-to-r from-[#7132F5] via-[#854BFF] to-emerald-400 rounded-full transition-all duration-200"
                    style={{ width: isFinalized ? '100%' : `\${((1.8 - finalityCountdown) / 1.8) * 100}%` }} />
                </div>
                <div className="grid grid-cols-3 gap-2 font-mono text-[11px] text-[#9CA3AF]">
                  {[['Block Height', '#2,948,114', 'text-white'], ['Gas Consumed', '0.00003 ETH', 'text-emerald-400'], ['Fiat Cost', '< $0.001', 'text-white']].map(([k, v, cls]) => (
                    <div key={k}><span className="text-white/40 block">{k}</span><span className={`font-bold \${cls}`}>{v}</span></div>
                  ))}
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 p-5 rounded-2xl bg-black border border-white/15 space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-[#A78BFA] font-bold">Ink Explorer Telemetry</span>
                <span className={`text-[10px] px-2 py-0.5 rounded border \${isFinalized ? 'text-emerald-400 bg-emerald-950/40 border-emerald-500/20' : 'text-[#D8B4FE] bg-[#7132F5]/10 border-[#7132F5]/30'}`}>{isFinalized ? 'Finalized' : 'Sequencing'}</span>
              </div>
              <div className="space-y-2">
                {[['Tx Hash', '0x71a2e48f...98c4b12', 'text-[#C4B5FD]'], ['Smart Contract', '0x7F8798eA...aeB5A2', 'text-white'], ['Settlement', 'PaymentSplit(99%/1%)', 'text-emerald-400']].map(([k, v, cls]) => (
                  <div key={k} className="p-2.5 rounded bg-white/[0.03] border border-white/5">
                    <span className="text-white/50 block text-[10px]">{k}</span>
                    <span className={`text-[11px] block \${cls}`}>{v}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => { setIsPlaying(false); setActiveStep(4); }}
                className="w-full py-2.5 rounded-lg bg-[#7132F5] hover:bg-[#854BFF] text-white font-bold text-xs uppercase tracking-wider cursor-pointer font-sans">
                View Creator Payout Receipt →
              </button>
            </div>
          </div>
        )}

        {activeStep === 4 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div><span className="font-mono text-xs uppercase tracking-wider text-emerald-400">Step 4 · Complete Non-Custodial Settlement</span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">100% Onchain. 99% lands in your wallet.</h3>
                <p className="text-sm text-[#9CA3AF] mt-2 leading-relaxed">No rolling reserves. InkDrop takes only a 1% platform fee — saving $40+ vs Stripe per $1,200 invoice.</p>
              </div>
              <div className="p-4 rounded-xl bg-black border border-white/15 space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-white/10 font-bold text-white">
                  <span>Settlement Breakdown</span><span className="text-emerald-400">PAID IN FULL</span>
                </div>
                {[['Gross Volume', `$\${customAmount.toFixed(2)} USDC`, 'text-white font-bold'],
                  ['InkDrop Fee (1%)', `-$\${platformFee.toFixed(2)} USDC`, 'text-purple-300']].map(([k, v, cls]) => (
                  <div key={k} className="flex items-center justify-between"><span className="text-[#9CA3AF]">{k}:</span><span className={cls}>{v}</span></div>
                ))}
                <div className="flex items-center justify-between text-emerald-400 text-sm font-bold pt-2 border-t border-white/10">
                  <span>Net to Your Wallet (99%):</span><span>+${merchantNet.toFixed(2)} USDC</span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 p-5 rounded-2xl bg-gradient-to-b from-[#7132F5]/20 via-black to-black border border-[#7132F5]/40 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto text-3xl shadow-[0_0_25px_rgba(16,185,129,0.3)]">✓</div>
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[#A78BFA] font-bold">BALANCE CREDITED</span>
                <div className="text-3xl font-black text-white font-mono mt-1">+${merchantNet.toFixed(2)}</div>
                <span className="text-xs font-mono text-[#D8B4FE]">USDC on Ink Chain L2</span>
              </div>
              <button onClick={() => { setActiveStep(1); setIsPlaying(true); }}
                className="w-full py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold text-xs cursor-pointer">
                Replay Interactive Simulation ↺
              </button>
            </div>
          </div>
        )}
      </SpotlightCard>
    </div>
  );
}
