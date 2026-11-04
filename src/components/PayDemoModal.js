'use client';
import { useState } from 'react';
import { X, ArrowRight, Check, Zap, Shield } from 'lucide-react';
import { UsdcIcon, InkChainIcon } from './Icons';
import { playMicroSound } from '../utils/sound';

export function PayDemoModal({ isOpen, onClose, initialLink }) {
  const [payMethod, setPayMethod] = useState('email');
  const [status, setStatus] = useState('idle');
  const [email, setEmail] = useState('');

  if (!isOpen) return null;

  const link = initialLink || {
    id: 'sprint-492',
    title: 'Design Sprint & Frontend Architecture',
    amount: 2500,
    currency: 'USDC',
    isFixed: true,
  };

  const platformFee = link.amount * 0.01;
  const merchantNet = link.amount - platformFee;

  const handlePay = () => {
    if (status !== 'idle') return;
    playMicroSound('confirm');
    setStatus('processing');
    setTimeout(() => {
      setStatus('success');
      playMicroSound('success');
    }, 1800);
  };

  const handleReset = () => {
    setStatus('idle');
    setEmail('');
    setPayMethod('email');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-2xl" onClick={handleReset}>
      <div className="relative w-full max-w-md bg-[#080b11] border border-white/15 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.95)] max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <button onClick={handleReset} className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 text-[#9CA3AF] hover:text-white border border-white/10 transition-colors cursor-pointer flex items-center justify-center z-10">
          <X className="w-5 h-5" />
        </button>

        {status === 'idle' && (
          <div className="space-y-5">
            <div className="pr-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-xs font-mono text-emerald-300 font-semibold mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                LIVE PAYER DEMO
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white">{link.title}</h3>
              <p className="text-xs text-[#9CA3AF] mt-1 font-mono">inkdrop.link/pay/{link.id}</p>
            </div>

            <div className="p-4 rounded-2xl bg-black border border-white/15 space-y-2.5 font-mono text-xs">
              <div className="flex justify-between text-[#9CA3AF]"><span>Amount</span><span className="text-white font-bold text-base tabular-nums">${link.amount.toFixed(2)} USDC</span></div>
              <div className="flex justify-between"><span className="text-[#9CA3AF]">Platform Fee (1%)</span><span className="text-amber-400">-${platformFee.toFixed(2)}</span></div>
              <div className="border-t border-white/10 pt-2 flex justify-between font-bold"><span className="text-[#9CA3AF]">Merchant Receives</span><span className="text-emerald-400">${merchantNet.toFixed(2)} USDC</span></div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#9CA3AF] mb-2">Pay With</label>
              <div className="grid grid-cols-2 p-1 bg-black/70 rounded-xl border border-white/15 text-xs font-semibold mb-3">
                {['email', 'wallet'].map((m) => (
                  <button key={m} type="button" onClick={() => setPayMethod(m)} className={'py-2.5 rounded-lg transition-all min-h-[40px] flex items-center justify-center cursor-pointer ' + (payMethod === m ? 'bg-[#7132F5] text-white' : 'text-[#9CA3AF] hover:text-white')}>
                    {m === 'email' ? 'Email (Privy)' : 'Your Wallet'}
                  </button>
                ))}
              </div>

              {payMethod === 'email' && (
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 bg-black/70 rounded-xl border border-white/15 text-white text-sm focus:outline-none focus:border-[#7132F5] transition-all min-h-[44px]"
                />
              )}
              {payMethod === 'wallet' && (
                <div className="space-y-2">
                  {[
                    { name: 'Rainbow', color: 'from-pink-500 to-purple-500' },
                    { name: 'MetaMask', color: 'from-orange-400 to-orange-600' },
                    { name: 'Coinbase Wallet', color: 'from-blue-400 to-blue-600' },
                  ].map((w) => (
                    <button key={w.name} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 hover:border-white/25 text-white text-sm font-semibold transition-colors cursor-pointer min-h-[48px]">
                      <div className={'w-7 h-7 rounded-full bg-gradient-to-br flex-shrink-0 ' + w.color} />
                      {w.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={handlePay}
              className="w-full py-4 rounded-xl bg-[#7132F5] hover:bg-[#854BFF] text-white font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_25px_rgba(113,50,245,0.45)] cursor-pointer min-h-[48px]"
            >
              <span>Pay ${link.amount.toFixed(2)} USDC</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-[#9CA3AF] font-mono">
              <Shield className="w-3.5 h-3.5 text-[#A78BFA]" />
              <span>Non-custodial · Direct contract · Ink Chain L2</span>
            </div>
          </div>
        )}

        {status === 'processing' && (
          <div className="text-center py-8 space-y-6">
            <div className="w-16 h-16 rounded-full border-2 border-[#7132F5] border-t-transparent animate-spin mx-auto" />
            <div>
              <div className="font-mono text-xs text-[#A78BFA] uppercase tracking-widest mb-2">Processing on Ink Chain</div>
              <p className="text-[#9CA3AF] text-sm">Finalizing USDC transfer via smart contract.<br />Typically completes in ~1.8 seconds.</p>
            </div>
            <div className="flex items-center justify-center gap-2 font-mono text-xs text-[#9CA3AF]">
              <InkChainIcon size={14} />
              <span>Ink Chain (Kraken L2) · Chain ID 57073</span>
            </div>
          </div>
        )}

        {status === 'success' && (
          <div className="text-center py-4 space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 text-emerald-400" />
            </div>
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-emerald-400 mb-2">Payment Confirmed</div>
              <h3 className="text-2xl font-extrabold text-white">${link.amount.toFixed(2)} USDC</h3>
              <p className="text-[#9CA3AF] text-sm mt-1">Successfully transferred on Ink Chain L2</p>
            </div>

            <div className="p-4 rounded-2xl bg-black border border-white/15 font-mono text-xs text-left space-y-2">
              <div className="flex justify-between"><span className="text-[#9CA3AF]">Amount Paid</span><span className="text-white">${link.amount.toFixed(2)} USDC</span></div>
              <div className="flex justify-between"><span className="text-[#9CA3AF]">Platform Fee</span><span className="text-amber-400">-${platformFee.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-[#9CA3AF]">Gas Fee</span><span className="text-white">&lt; $0.001</span></div>
              <div className="border-t border-white/10 pt-2 flex justify-between font-bold"><span className="text-[#9CA3AF]">Merchant Net</span><span className="text-emerald-400">${merchantNet.toFixed(2)} USDC</span></div>
              <div className="pt-1 flex justify-between"><span className="text-[#9CA3AF]">Finality Time</span><span className="text-[#A78BFA] flex items-center gap-1"><Zap className="w-3 h-3" />~1.8 seconds</span></div>
            </div>

            <button onClick={handleReset} className="w-full py-4 rounded-xl bg-[#7132F5] hover:bg-[#854BFF] text-white font-extrabold text-sm uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(113,50,245,0.45)] cursor-pointer min-h-[48px]">
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
