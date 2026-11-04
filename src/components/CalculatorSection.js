'use client';
import { useState } from 'react';
import { SectionHeader } from './SectionHeader';
import { UsdcIcon, InkChainIcon } from './Icons';
import { Zap, ShieldCheck, TrendingUp } from 'lucide-react';

export function CalculatorSection({ onOpenCreateModal }) {
  const [monthlyAmount, setMonthlyAmount] = useState(15000);
  const [pricingType, setPricingType] = useState('fixed');
  const [txCount, setTxCount] = useState(25);

  const amountInputId = 'calc-amount';
  const txSliderId = 'calc-slider';

  const traditionalFee = (monthlyAmount * 0.029) + (txCount * 0.30);
  const inkDropFee = monthlyAmount * 0.01;
  const netRevenue = monthlyAmount - inkDropFee;
  const inkChainGas = txCount * 0.001;
  const monthlySavings = Math.max(0, traditionalFee - inkDropFee - inkChainGas);

  const presets = [2500, 10000, 25000, 50000, 100000];

  return (
    <section id="calculator" className="relative py-28 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06] bg-[#030508]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-14">
          <SectionHeader number="04" total="05" tag="Calculator" />
          <span className="font-mono text-xs uppercase tracking-[0.15em] text-[#A78BFA] font-semibold">SEE YOUR EARNINGS</span>
        </div>
        <div className="max-w-3xl mb-14">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">How much could you collect?</h2>
          <p className="mt-4 text-base sm:text-lg text-[#9CA3AF]">
            Calculate your take-home revenue with InkDrop&apos;s transparent 1% fee compared to 3%+ on traditional credit card rails.
          </p>
        </div>
        <div className="rounded-3xl glass-card p-4 sm:p-8 lg:p-10 border border-white/10 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#7132F5]/15 rounded-full blur-[120px] pointer-events-none" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#9CA3AF]">Payment Link Mode</label>
                  <span className="text-[10px] font-mono text-[#D8B4FE] bg-[#7132F5]/20 px-2 py-0.5 rounded border border-[#7132F5]/40 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] animate-pulse" />
                    Interactive Engine
                  </span>
                </div>
                <div className="relative p-1 rounded-xl bg-black/80 border border-white/15 flex">
                  <div className={"absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-lg bg-gradient-to-r from-[#7132F5] to-[#8B5CF6] transition-all duration-300 ease-out shadow-[0_0_20px_rgba(113,50,245,0.6)] " + (pricingType === 'fixed' ? 'left-1 translate-x-0' : 'left-1 translate-x-[calc(100%+8px)]')} />
                  <button type="button" onClick={() => setPricingType('fixed')}
                    className={"relative z-10 w-1/2 py-3 px-3 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer min-h-[44px] " + (pricingType === 'fixed' ? 'text-white' : 'text-[#9CA3AF] hover:text-white')}>
                    <span>Fixed Price</span>
                    {pricingType === 'fixed' && <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />}
                  </button>
                  <button type="button" onClick={() => setPricingType('open')}
                    className={"relative z-10 w-1/2 py-3 px-3 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer min-h-[44px] " + (pricingType === 'open' ? 'text-white' : 'text-[#9CA3AF] hover:text-white')}>
                    <span>Open Amount</span>
                    {pricingType === 'open' && <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />}
                  </button>
                </div>
                <div className="mt-2.5 overflow-hidden transition-all duration-300">
                  {pricingType === 'fixed' ? (
                    <div className="p-2.5 rounded-lg bg-[#7132F5]/10 border border-[#7132F5]/25 text-[11px] font-mono text-[#D8B4FE] flex items-center justify-between gap-2">
                      <span className="flex items-center gap-1.5 truncate">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                        Fixed rate invoices, retainers &amp; subscriptions
                      </span>
                      <span className="text-white/60 text-[10px] shrink-0">Exact USDC</span>
                    </div>
                  ) : (
                    <div className="p-2.5 rounded-lg bg-[#7132F5]/10 border border-[#7132F5]/25 text-[11px] font-mono text-[#D8B4FE] flex items-center justify-between gap-2">
                      <span className="flex items-center gap-1.5 truncate">
                        <span className="w-2 h-2 rounded-full bg-[#8B5CF6] animate-pulse shrink-0" />
                        Pay what you want, donations &amp; flexible tips
                      </span>
                      <span className="text-white/60 text-[10px] shrink-0">Variable Range</span>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor={amountInputId} className="text-xs font-mono uppercase tracking-wider text-[#9CA3AF]">Monthly payment volume (USDC)</label>
                  <span className="text-xs font-mono text-[#A78BFA] font-medium">USD Coin</span>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/40 font-mono">$</div>
                  <input id={amountInputId} type="number" min={100} max={1000000} step={500} value={monthlyAmount}
                    onChange={(e) => setMonthlyAmount(Math.max(0, Number(e.target.value)))}
                    className="w-full pl-9 pr-20 py-3.5 bg-black/80 rounded-xl border border-white/15 text-white font-mono text-xl font-bold focus:outline-none focus:border-[#7132F5] focus:ring-1 focus:ring-[#7132F5] transition-all tabular-nums min-h-[48px]"
                    placeholder="15000" />
                  <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
                    <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-white/5 border border-white/10 text-xs font-mono text-white">
                      <UsdcIcon size={14} />
                      USDC
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {presets.map((val) => (
                    <button key={val} type="button" onClick={() => setMonthlyAmount(val)}
                      className={"px-3 py-1.5 text-xs font-mono rounded-lg border transition-all cursor-pointer min-h-[38px] flex items-center justify-center " + (monthlyAmount === val ? 'border-[#7132F5] bg-[#7132F5]/25 text-[#D8B4FE]' : 'border-white/10 bg-white/[0.02] text-[#9CA3AF] hover:border-white/30 hover:text-white')}>
                      ${val.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-[#9CA3AF] mb-2">
                  <label htmlFor={txSliderId}>Est. Monthly Transactions</label>
                  <span className="text-white font-bold tabular-nums">{txCount} transfers</span>
                </div>
                <input id={txSliderId} type="range" min={1} max={200} value={txCount}
                  onChange={(e) => setTxCount(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#7132F5]" />
                <div className="flex justify-between text-[11px] font-mono text-[#9CA3AF]/60 mt-1">
                  <span>1 tx</span><span>100 txs</span><span>200+ txs</span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2 p-4 sm:p-6 rounded-2xl bg-black/70 border border-white/15 relative overflow-hidden">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#9CA3AF]">Net Revenue to Merchant (30 Days)</span>
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-500/20">99% Net Payout (1% Fee)</span>
                </div>
                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="text-3xl xs:text-4xl sm:text-5xl font-black text-white tracking-tight tabular-nums font-mono break-all sm:break-normal">
                    ${netRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                  <span className="text-sm font-mono text-[#A78BFA] font-bold">USDC Net</span>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono text-[#9CA3AF]">
                  <span>Gross: ${monthlyAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  <span className="text-white/20">·</span>
                  <span className="text-[#C4B5FD]">1% InkDrop Fee: -${inkDropFee.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              </div>
              <div className="p-4 sm:p-5 rounded-2xl bg-black/60 border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-purple-400 mb-2">
                    <Zap className="w-4 h-4 text-[#A78BFA]" />
                    <span className="text-xs font-mono uppercase tracking-wider">Per-Transaction Speed</span>
                  </div>
                  <div className="text-2xl font-bold text-white font-mono tabular-nums">~2 sec</div>
                  <div className="text-xs text-[#A78BFA] font-medium mt-1">Instant finality on Ink L2</div>
                </div>
                <p className="text-xs text-[#9CA3AF] mt-3 pt-3 border-t border-white/5">Optimistic rollups powered by Kraken infrastructure.</p>
              </div>
              <div className="p-4 sm:p-5 rounded-2xl bg-black/60 border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-emerald-400 mb-2">
                    <ShieldCheck className="w-4 h-4" />
                    <span className="text-xs font-mono uppercase tracking-wider">Platform &amp; Gas Fee</span>
                  </div>
                  <div className="text-2xl font-bold text-white font-mono tabular-nums">1% <span className="text-sm font-normal text-white/60">+ &lt; $0.01 gas</span></div>
                  <div className="text-xs text-emerald-400 font-medium mt-1">Fixed transparent rate</div>
                </div>
                <p className="text-xs text-[#9CA3AF] mt-3 pt-3 border-t border-white/5">Keep 99% of your funds. Never lose 3% to card networks.</p>
              </div>
              <div className="sm:col-span-2 p-4 rounded-xl bg-gradient-to-r from-[#7132F5]/20 via-purple-900/15 to-transparent border border-[#7132F5]/40 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#7132F5]/20 text-[#A78BFA] flex items-center justify-center shrink-0">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-white/90">Savings vs Traditional Processors (Stripe 2.9% + $0.30)</div>
                    <div className="text-sm text-[#9CA3AF]">
                      You keep an extra <strong className="text-white font-mono text-emerald-400">+${monthlySavings.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong> per month
                    </div>
                  </div>
                </div>
                <button onClick={onOpenCreateModal}
                  className="px-4 py-3 rounded-lg bg-[#7132F5] hover:bg-[#854BFF] text-white text-xs font-bold uppercase tracking-wider shrink-0 transition-all cursor-pointer shadow-md shadow-[#7132F5]/30 min-h-[44px] flex items-center justify-center">
                  Start Saving →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
