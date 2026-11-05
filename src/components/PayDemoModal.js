'use client';

import React, { useState } from 'react';
import { X, Check, ShieldCheck, Zap, Mail, Wallet, ArrowRight, ExternalLink, Loader2, Sparkles, RefreshCw } from 'lucide-react';
import { UsdcIcon, InkChainIcon } from './Icons';
import { PaymentLink } from '../types';
import { playMicroSound } from '../utils/sound';


export const PayDemoModal = ({
 isOpen,
 onClose,
 initialLink,
}) => {
 const [payMethod, setPayMethod] = useState('email');
 const [emailInput, setEmailInput] = useState('demo.payer@gmail.com');
 const [selectedWallet, setSelectedWallet] = useState('rainbow');
 const [status, setStatus] = useState('idle');
 const [customAmount, setCustomAmount] = useState('');

 if (!isOpen) return null;

 const currentLink = initialLink || {
 id: 'sprint-492',
 title: 'Design Sprint & Frontend Architecture',
 amount: 2500,
 currency: 'USDC',
 recipientAddress: '0x4F92...B8c1',
 recipientName: 'alex.ink',
 description: 'Deposit for design sprint and prototype build on Ink Chain.',
 isFixed: true,
 createdAt: new Date().toISOString(),
 };

 const paymentAmount = currentLink.isFixed
 ? currentLink.amount
 : (parseFloat(customAmount) || currentLink.amount);

 const platformFee = paymentAmount * 0.01;
 const netAmount = paymentAmount - platformFee;

 const handlePay = () => {
 playMicroSound('click');
 setStatus('processing');
 // Simulate real 1.8-second Ink Chain finality
 setTimeout(() => {
 setStatus('success');
 playMicroSound('confirm');
 }, 1800);
 };

 const handleReset = () => {
 playMicroSound('toggle');
 setStatus('idle');
 };

 return (
 <div
 className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-200"
 onClick={onClose}
 >
 <div
 className="relative w-full max-w-lg bg-[#080b11] border border-white/15 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.95)] max-h-[90vh] overflow-y-auto"
 onClick={(e) => e.stopPropagation()}
 >
 {/* Close Button */}
 <button
 onClick={onClose}
 className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 text-[#9CA3AF] hover:text-white border border-white/10 transition-colors cursor-pointer flex items-center justify-center z-10"
 aria-label="Close dialog"
 >
 <X className="w-5 h-5" />
 </button>

 {status === 'idle' && (
 <div>
 {/* Top Bar with Recipient */}
 <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2.5 pb-4 sm:pb-5 border-b border-white/10 pr-8">
 <div className="flex items-center gap-3">
 <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#7132F5] to-[#A855F7] flex items-center justify-center text-white font-extrabold text-sm shadow-md shrink-0">
 AI
 </div>
 <div>
 <div className="flex items-center gap-1.5">
 <span className="text-white font-semibold text-sm">{currentLink.recipientName}</span>
 <span className="w-2 h-2 rounded-full bg-[#7132F5]" />
 </div>
 <span className="text-xs text-[#9CA3AF] font-mono">{currentLink.recipientAddress}</span>
 </div>
 </div>

 <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#7132F5]/20 border border-[#7132F5]/40 text-[#D8B4FE] text-xs font-mono">
 <InkChainIcon size={14} />
 <span>Ink Chain</span>
 </div>
 </div>

 {/* Bill item & Amount */}
 <div className="py-5 sm:py-6 text-center">
 <span className="text-xs font-mono uppercase tracking-widest text-[#9CA3AF]">
 PAYMENT REQUEST
 </span>
 <h3 className="text-lg sm:text-2xl font-bold text-white mt-1 break-words">
 {currentLink.title}
 </h3>
 {currentLink.description && (
 <p className="text-xs text-[#9CA3AF] max-w-sm mx-auto mt-1 px-1">
 {currentLink.description}
 </p>
 )}

 <div className="mt-4 sm:mt-5 flex flex-wrap items-center justify-center gap-2">
 {currentLink.isFixed ? (
 <span className="text-3xl sm:text-5xl font-black text-white font-mono tracking-tight tabular-nums break-all sm:break-normal">
 ${paymentAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
 </span>
 ) : (
 <div className="flex items-center justify-center gap-2">
 <span className="text-2xl text-white font-mono">$</span>
 <input
 type="number"
 placeholder="Amount"
 value={customAmount}
 onChange={(e) => setCustomAmount(e.target.value)}
 className="w-32 sm:w-36 text-2xl sm:text-3xl font-black text-white font-mono bg-black/60 border border-white/20 rounded-xl px-3 py-1.5 text-center min-h-[44px]"
 />
 </div>
 )}
 <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#2775CA]/20 border border-[#2775CA]/40">
 <UsdcIcon size={18} />
 <span className="text-xs font-bold text-white">USDC</span>
 </div>
 </div>
 </div>

 {/* Payment Method Selector */}
 <div className="mb-5 sm:mb-6 space-y-3">
 <label className="block text-xs font-mono uppercase tracking-wider text-[#9CA3AF]">
 Select Payment Method
 </label>

 {/* Tabs */}
 <div className="grid grid-cols-2 p-1 bg-black/70 rounded-xl border border-white/10 text-xs font-semibold">
 <button
 type="button"
 onClick={() => {
 setPayMethod('email');
 playMicroSound('slide');
 }}
 className={`py-3 px-3 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer min-h-[44px] ${
 payMethod === 'email'
 ? 'bg-[#7132F5] text-white shadow-md'
 : 'text-[#9CA3AF] hover:text-white'
 }`}
 >
 <Mail className="w-3.5 h-3.5" />
 <span>Email (Privy)</span>
 </button>

 <button
 type="button"
 onClick={() => {
 setPayMethod('wallet');
 playMicroSound('slide');
 }}
 className={`py-3 px-3 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer min-h-[44px] ${
 payMethod === 'wallet'
 ? 'bg-[#7132F5] text-white shadow-md'
 : 'text-[#9CA3AF] hover:text-white'
 }`}
 >
 <Wallet className="w-3.5 h-3.5" />
 <span>Web3 Wallet</span>
 </button>
 </div>

 {payMethod === 'email' ? (
 <div className="p-3.5 sm:p-4 rounded-xl bg-[#7132F5]/15 border border-[#7132F5]/30 text-xs">
 <div className="flex items-center justify-between mb-2">
 <span className="text-purple-200 font-semibold">Embedded Wallet (No app needed)</span>
 <span className="text-[10px] text-purple-300 font-mono">Privy Engine</span>
 </div>
 <input
 type="email"
 value={emailInput}
 onChange={(e) => setEmailInput(e.target.value)}
 placeholder="Enter your email to pay"
 className="w-full px-3 py-2.5 bg-black/80 rounded-lg border border-white/15 text-white font-mono text-xs focus:outline-none focus:border-[#7132F5] min-h-[42px]"
 />
 <div className="mt-2 text-[11px] text-[#9CA3AF]">
 A non-custodial smart wallet is securely generated from your email.
 </div>
 </div>
 ) : (
 <div className="p-3.5 sm:p-4 rounded-xl bg-white/[0.03] border border-white/10 text-xs space-y-2">
 <div className="text-[#9CA3AF] mb-1">Choose Connected Provider:</div>
 <div className="grid grid-cols-3 gap-2">
 {(['rainbow', 'metamask', 'coinbase'] as const).map((w) => (
 <button
 key={w}
 type="button"
 onClick={() => setSelectedWallet(w)}
 className={`p-2.5 rounded-lg border text-xs font-semibold capitalize transition-all cursor-pointer min-h-[42px] flex items-center justify-center ${
 selectedWallet === w
 ? 'border-[#7132F5] bg-[#7132F5]/25 text-[#D8B4FE]'
 : 'border-white/10 bg-black/40 text-[#9CA3AF] hover:text-white'
 }`}
 >
 {w}
 </button>
 ))}
 </div>
 </div>
 )}
 </div>

 {/* Network Fee & Speed Info */}
 <div className="p-3 sm:p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col xs:flex-row items-start xs:items-center justify-between gap-1.5 xs:gap-0 text-xs text-[#9CA3AF] mb-5 sm:mb-6">
 <div className="flex items-center gap-1.5">
 <Zap className="w-3.5 h-3.5 text-[#A78BFA] shrink-0" />
 <span>Ink Chain Finality: <strong className="text-white font-mono">~1.8s</strong></span>
 </div>
 <div className="flex items-center gap-1.5">
 <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
 <span>Estimated Gas: <strong className="text-white font-mono">&lt; $0.001</strong></span>
 </div>
 </div>

 {/* Pay Button */}
 <button
 onClick={handlePay}
 className="w-full py-4 rounded-xl bg-[#7132F5] hover:bg-[#854BFF] text-white font-extrabold text-sm sm:text-base tracking-wide flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(113,50,245,0.45)] transition-all cursor-pointer min-h-[48px]"
 >
 <span>Pay ${paymentAmount.toFixed(2)} USDC</span>
 <ArrowRight className="w-4 h-4" />
 </button>
 </div>
 )}

 {status === 'processing' && (
 <div className="py-10 sm:py-12 text-center space-y-6 animate-in fade-in duration-200">
 <div className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto flex items-center justify-center">
 <div className="absolute inset-0 rounded-full border-4 border-[#7132F5]/30 border-t-[#7132F5] animate-spin" />
 <InkChainIcon size={28} />
 </div>

 <div>
 <span className="font-mono text-xs uppercase tracking-widest text-[#A78BFA] font-semibold">
 INK CHAIN SETTLEMENT IN PROGRESS
 </span>
 <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
 Submitting Transaction
 </h3>
 <p className="text-xs sm:text-sm text-[#9CA3AF] max-w-xs mx-auto mt-2 font-mono">
 Broadcasting to Kraken L2 sequencer...
 </p>
 </div>

 <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 max-w-xs mx-auto text-xs font-mono text-[#9CA3AF] space-y-1.5 text-left">
 <div className="flex justify-between">
 <span>Network:</span>
 <span className="text-white">Ink Chain</span>
 </div>
 <div className="flex justify-between">
 <span>Amount:</span>
 <span className="text-[#C4B5FD] font-bold">${paymentAmount.toFixed(2)} USDC</span>
 </div>
 <div className="flex justify-between">
 <span>Estimated Finality:</span>
 <span className="text-emerald-400">1.8 seconds</span>
 </div>
 </div>
 </div>
 )}

 {status === 'success' && (
 <div className="py-4 sm:py-6 text-center space-y-5 sm:space-y-6 animate-in zoom-in-95 duration-200">
 <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(16,185,129,0.3)]">
 <Check className="w-7 h-7 sm:w-8 sm:h-8" />
 </div>

 <div>
 <span className="font-mono text-xs uppercase tracking-widest text-emerald-400 font-semibold">
 TRANSACTION CONFIRMED
 </span>
 <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
 Payment Successful!
 </h3>
 <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono mt-2">
 ${paymentAmount.toFixed(2)} <span className="text-[#C4B5FD] text-base">USDC</span>
 </p>
 </div>

 {/* Receipt Box */}
 <div className="p-3.5 sm:p-4 rounded-2xl bg-black border border-white/15 text-left font-mono text-xs space-y-2">
 <div className="flex items-center justify-between pb-2 border-b border-white/10">
 <span className="text-[#9CA3AF]">Status</span>
 <span className="text-emerald-400 font-bold">SETTLED ONCHAIN</span>
 </div>
 <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-1">
 <span className="text-[#9CA3AF] shrink-0">Recipient:</span>
 <span className="text-white truncate min-w-0">{currentLink.recipientName} ({currentLink.recipientAddress})</span>
 </div>
 <div className="flex items-center justify-between">
 <span className="text-[#9CA3AF]">Gross Paid:</span>
 <span className="text-white">${paymentAmount.toFixed(2)} USDC</span>
 </div>
 <div className="flex items-center justify-between">
 <span className="text-[#9CA3AF]">Platform Fee (1%):</span>
 <span className="text-[#C4B5FD]">-${platformFee.toFixed(2)} USDC</span>
 </div>
 <div className="flex items-center justify-between pt-1 border-t border-white/5">
 <span className="text-[#9CA3AF]">Net Settled to Merchant:</span>
 <span className="text-emerald-400 font-bold">${netAmount.toFixed(2)} USDC</span>
 </div>
 <div className="flex items-center justify-between">
 <span className="text-[#9CA3AF]">Block Number:</span>
 <span className="text-white">#2,948,114</span>
 </div>
 <div className="flex items-center justify-between">
 <span className="text-[#9CA3AF]">Tx Hash:</span>
 <span className="text-[#C4B5FD] font-mono">0x71a2...98c4</span>
 </div>
 <div className="flex items-center justify-between">
 <span className="text-[#9CA3AF]">Network Gas:</span>
 <span className="text-emerald-400">&lt; $0.001 ETH</span>
 </div>
 </div>

 <div className="space-y-3 pt-2">
 <a
 href="https://explorer.inkonchain.com"
 target="_blank"
 rel="noreferrer"
 className="w-full py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs tracking-wider flex items-center justify-center gap-1.5 transition-colors min-h-[44px]"
 >
 <span>View on Ink Chain Explorer</span>
 <ExternalLink className="w-3.5 h-3.5 text-[#A78BFA]" />
 </a>

 <button
 onClick={handleReset}
 className="w-full py-3.5 rounded-xl bg-[#7132F5] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-[#854BFF] transition-all cursor-pointer shadow-md shadow-[#7132F5]/30 min-h-[44px]"
 >
 <RefreshCw className="w-3.5 h-3.5" />
 <span>Simulate Another Payment</span>
 </button>
 </div>
 </div>
 )}
 </div>
 </div>
 );
};
