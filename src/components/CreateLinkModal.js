'use client';
import { useState } from 'react';
import { X, Check, Copy, ArrowRight, Sparkles, QrCode } from 'lucide-react';
import { UsdcIcon, InkChainIcon } from './Icons';
import { playMicroSound } from '../utils/sound';

export function CreateLinkModal({ isOpen, onClose, onTestLink }) {
  const [title, setTitle] = useState('Brand Identity & UI Sprint');
  const [amount, setAmount] = useState('500');
  const [isFixed, setIsFixed] = useState(true);
  const [recipient, setRecipient] = useState('0x71C83e4986Fa19B...921A');
  const [description, setDescription] = useState('Final milestone deliverables for web application redesign.');
  const [generatedLink, setGeneratedLink] = useState(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const numAmount = parseFloat(amount) || 0;
  const platformFee = numAmount * 0.01;
  const netRecipient = numAmount - platformFee;

  const handleGenerate = (e) => {
    e.preventDefault();
    playMicroSound('confirm');
    const id = 'ink-' + Math.random().toString(36).substring(2, 8);
    const link = {
      id,
      title: title.trim() || 'Payment Request',
      amount: parseFloat(amount) || 100,
      currency: 'USDC',
      recipientAddress: recipient,
      recipientName: 'alex.ink',
      description,
      isFixed,
      createdAt: new Date().toISOString(),
    };
    setGeneratedLink(link);
  };

  const handleCopy = () => {
    if (!generatedLink) return;
    playMicroSound('click');
    const url = 'https://inkdrop.link/pay/' + generatedLink.id;
    navigator.clipboard?.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-2xl"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-[#080b11] border border-white/15 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.95)] max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 text-[#9CA3AF] hover:text-white border border-white/10 transition-colors cursor-pointer flex items-center justify-center z-10"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {!generatedLink ? (
          <div>
            <div className="mb-6 pr-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7132F5]/20 border border-[#7132F5]/40 text-xs font-mono text-[#D8B4FE] font-semibold mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>LINK CREATOR ENGINE</span>
              </div>
              <h3 className="text-xl sm:text-3xl font-extrabold text-white">Create Payment Link</h3>
              <p className="text-xs sm:text-sm text-[#9CA3AF] mt-1">Settles immediately in USDC on Ink Chain. Transparent 1% platform fee.</p>
            </div>

            <form onSubmit={handleGenerate} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#9CA3AF] mb-1.5">Payment Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Consulting Invoice #102"
                  className="w-full px-4 py-3 bg-black/70 rounded-xl border border-white/15 text-white text-sm font-medium focus:outline-none focus:border-[#7132F5] focus:ring-1 focus:ring-[#7132F5] transition-all min-h-[44px]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#9CA3AF] mb-1.5">Amount Type</label>
                  <div className="grid grid-cols-2 p-1 bg-black/70 rounded-xl border border-white/15 text-xs font-semibold">
                    <button
                      type="button"
                      onClick={() => { setIsFixed(true); playMicroSound('slide'); }}
                      className={'py-2.5 rounded-lg transition-all min-h-[40px] flex items-center justify-center cursor-pointer ' + (isFixed ? 'bg-[#7132F5] text-white shadow-sm' : 'text-[#9CA3AF] hover:text-white')}
                    >Fixed</button>
                    <button
                      type="button"
                      onClick={() => { setIsFixed(false); playMicroSound('slide'); }}
                      className={'py-2.5 rounded-lg transition-all min-h-[40px] flex items-center justify-center cursor-pointer ' + (!isFixed ? 'bg-[#7132F5] text-white shadow-sm' : 'text-[#9CA3AF] hover:text-white')}
                    >Open</button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#9CA3AF] mb-1.5">{isFixed ? 'Amount (USDC)' : 'Suggested (USDC)'}</label>
                  <div className="relative">
                    <input
                      type="number"
                      required
                      min={1}
                      max={500000}
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full pl-4 pr-16 py-3 bg-black/70 rounded-xl border border-white/15 text-white font-mono font-bold text-base focus:outline-none focus:border-[#7132F5] focus:ring-1 focus:ring-[#7132F5] transition-all min-h-[44px]"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <div className="flex items-center gap-1 text-xs font-mono text-white/90">
                        <UsdcIcon size={14} />
                        <span>USDC</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between text-xs font-mono">
                <span className="text-[#9CA3AF]">1% Platform Fee: <span className="text-white">${platformFee.toFixed(2)}</span></span>
                <span className="text-emerald-400 font-semibold">You receive: ${netRecipient.toFixed(2)} USDC</span>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#9CA3AF] mb-1.5">Payout Address or ENS</label>
                <div className="relative">
                  <input
                    type="text"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className="w-full pl-4 pr-24 py-3 bg-black/70 rounded-xl border border-white/15 text-white text-xs font-mono focus:outline-none focus:border-[#7132F5] focus:ring-1 focus:ring-[#7132F5] transition-all min-h-[44px]"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/20">Ink Chain L2</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#9CA3AF] mb-1.5">Memo / Note (Optional)</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Additional context shown to payer..."
                  className="w-full px-4 py-2.5 bg-black/70 rounded-xl border border-white/15 text-white text-xs focus:outline-none focus:border-[#7132F5] focus:ring-1 focus:ring-[#7132F5] transition-all resize-none min-h-[60px]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-[#7132F5] hover:bg-[#854BFF] text-white font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_25px_rgba(113,50,245,0.45)] cursor-pointer min-h-[48px]"
                >
                  <span>Generate Payment Link</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-2 sm:py-4 space-y-5 sm:space-y-6">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-lg">
              <Check className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#A78BFA] font-semibold">LINK READY ON INK CHAIN</span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-1 break-words">{generatedLink.title}</h3>
              <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono mt-2">${generatedLink.amount.toFixed(2)} <span className="text-[#C4B5FD] text-base">USDC</span></p>
            </div>

            <div className="p-3.5 sm:p-4 rounded-2xl bg-black border border-white/15 text-left font-mono text-xs">
              <div className="text-[#9CA3AF] text-[11px] mb-1.5 flex items-center justify-between">
                <span>Shareable Link:</span>
                <span className="text-emerald-400">Live now</span>
              </div>
              <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white">
                <span className="truncate min-w-0 text-xs sm:text-sm text-[#C4B5FD]">https://inkdrop.link/pay/{generatedLink.id}</span>
                <button onClick={handleCopy} className="px-3 py-2 rounded-lg bg-[#7132F5] hover:bg-[#854BFF] text-white font-bold text-xs shrink-0 flex items-center gap-1 cursor-pointer transition-colors shadow-sm min-h-[36px]">
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            <div className="p-3.5 sm:p-4 rounded-xl bg-white/[0.02] border border-white/10 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3.5 sm:gap-4">
              <div className="w-20 h-20 rounded-lg bg-white p-1.5 flex items-center justify-center shrink-0">
                <QrCode className="w-full h-full text-black" />
              </div>
              <div className="text-xs">
                <div className="text-white font-semibold">Scan to Pay on Mobile</div>
                <div className="text-[#9CA3AF] text-[11px] mt-0.5">Compatible with any phone camera or crypto wallet.</div>
                <div className="text-[#A78BFA] font-mono text-[10px] mt-1.5 flex items-center justify-center sm:justify-start gap-1">
                  <InkChainIcon size={12} />
                  Ink Chain (Kraken L2)
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <button
                onClick={() => { onClose(); onTestLink(generatedLink); }}
                className="w-full py-4 rounded-xl bg-[#7132F5] hover:bg-[#854BFF] text-white font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_25px_rgba(113,50,245,0.45)] cursor-pointer min-h-[48px]"
              >
                <span>Test Live Payer Experience</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setGeneratedLink(null)}
                className="w-full py-3 rounded-xl text-xs font-semibold text-[#9CA3AF] hover:text-white transition-colors cursor-pointer min-h-[44px] flex items-center justify-center"
              >Create Another Link</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
