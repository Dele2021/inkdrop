'use client';

import React, { useState } from 'react';
import { X, Mail, Wallet, ShieldCheck, ArrowRight, CheckCircle2, TrendingUp, LogOut } from 'lucide-react';
import { InkChainIcon, UsdcIcon } from './Icons';


export const AuthModal = ({
 isOpen,
 onClose,
 onOpenCreateLink,
}) => {
 const [isLoggedIn, setIsLoggedIn] = useState(false);
 const [email, setEmail] = useState('creator@studio.design');
 const [isLoading, setIsLoading] = useState(false);

 if (!isOpen) return null;

 const handleLogin = (e) => {
 e.preventDefault();
 setIsLoading(true);
 setTimeout(() => {
 setIsLoading(false);
 setIsLoggedIn(true);
 }, 700);
 };

 return (
 <div
 className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-200"
 onClick={onClose}
 >
 <div
 className="relative w-full max-w-md bg-[#080b11] border border-white/15 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.95)] max-h-[90vh] overflow-y-auto"
 onClick={(e) => e.stopPropagation()}
 >
 <button
 onClick={onClose}
 className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 text-[#9CA3AF] hover:text-white border border-white/10 transition-colors cursor-pointer flex items-center justify-center z-10"
 aria-label="Close dialog"
 >
 <X className="w-5 h-5" />
 </button>

 {!isLoggedIn ? (
 <div>
 <div className="mb-6 text-center pr-6 sm:pr-0">
 <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#7132F5] to-purple-800 flex items-center justify-center mx-auto mb-4 text-white font-extrabold shadow-lg shadow-[#7132F5]/30">
 <InkChainIcon size={24} />
 </div>
 <h3 className="text-xl sm:text-2xl font-bold text-white">Log in to InkDrop</h3>
 <p className="text-xs text-[#9CA3AF] mt-1.5">
 Privy-powered non-custodial authentication. No seed phrases needed.
 </p>
 </div>

 <form onSubmit={handleLogin} className="space-y-4">
 <div>
 <label className="block text-xs font-mono uppercase tracking-wider text-[#9CA3AF] mb-1.5">
 Email Address
 </label>
 <div className="relative">
 <input
 type="email"
 required
 value={email}
 onChange={(e) => setEmail(e.target.value)}
 placeholder="you@domain.com"
 className="w-full px-4 py-3 bg-black/70 rounded-xl border border-white/15 text-white text-sm focus:outline-none focus:border-[#7132F5] transition-all min-h-[44px]"
 />
 </div>
 </div>

 <button
 type="submit"
 disabled={isLoading}
 className="w-full py-3.5 rounded-xl bg-[#7132F5] hover:bg-[#854BFF] text-white font-extrabold text-sm tracking-wide flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_20px_rgba(113,50,245,0.45)] disabled:opacity-50 min-h-[46px]"
 >
 <span>{isLoading ? 'Verifying with Privy...' : 'Continue with Email'}</span>
 <ArrowRight className="w-4 h-4" />
 </button>
 </form>

 <div className="relative my-6 text-center">
 <div className="absolute inset-0 flex items-center">
 <div className="w-full border-t border-white/10" />
 </div>
 <span className="relative bg-[#080b11] px-3 text-xs font-mono text-[#9CA3AF]">
 OR CONNECT WALLET
 </span>
 </div>

 <div className="space-y-2">
 <button
 onClick={() => {
 setIsLoading(true);
 setTimeout(() => {
 setIsLoading(false);
 setIsLoggedIn(true);
 }, 600);
 }}
 className="w-full py-3.5 px-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 text-white font-medium text-xs flex items-center justify-between transition-colors cursor-pointer min-h-[46px]"
 >
 <span className="flex items-center gap-2">
 <Wallet className="w-4 h-4 text-[#A78BFA]" />
 <span>MetaMask / Rainbow / Coinbase</span>
 </span>
 <span className="text-[10px] font-mono text-[#9CA3AF]">Web3</span>
 </button>
 </div>
 </div>
 ) : (
 /* Merchant / Creator Dashboard preview */
 <div className="space-y-6">
 <div className="flex items-center justify-between pb-4 border-b border-white/10">
 <div className="flex items-center gap-3">
 <div className="w-10 h-10 rounded-full bg-[#7132F5] text-white font-extrabold flex items-center justify-center text-sm">
 CR
 </div>
 <div>
 <div className="text-white font-bold text-sm">Creator Account</div>
 <div className="text-[11px] text-[#9CA3AF] font-mono">{email}</div>
 </div>
 </div>
 <button
 onClick={() => setIsLoggedIn(false)}
 className="text-white/60 hover:text-white p-1.5 transition-colors cursor-pointer"
 title="Disconnect"
 >
 <LogOut className="w-4 h-4" />
 </button>
 </div>

 {/* Quick Metrics */}
 <div className="grid grid-cols-2 gap-3">
 <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
 <span className="text-[11px] font-mono text-[#9CA3AF]">30D Volume</span>
 <div className="text-xl font-bold text-white font-mono mt-1">$14,250.00</div>
 <div className="text-[10px] text-emerald-400 font-mono mt-0.5">1% Flat Platform Fee (99% Net)</div>
 </div>

 <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
 <span className="text-[11px] font-mono text-[#9CA3AF]">Active Links</span>
 <div className="text-xl font-bold text-white font-mono mt-1">4 Links</div>
 <div className="text-[10px] text-[#A78BFA] font-mono mt-0.5">Ink Chain L2</div>
 </div>
 </div>

 {/* Recent Link */}
 <div className="p-3.5 rounded-xl bg-black/60 border border-white/10 text-xs">
 <div className="flex items-center justify-between text-[#9CA3AF] font-mono text-[10px] mb-1">
 <span>LATEST PAYMENT</span>
 <span className="text-emerald-400">12 min ago</span>
 </div>
 <div className="flex items-center justify-between text-white font-semibold">
 <span>UI Architecture Sprint</span>
 <span className="text-emerald-400 font-mono">+1,200 USDC</span>
 </div>
 </div>

 <div className="pt-2">
 <button
 onClick={() => {
 onClose();
 onOpenCreateLink();
 }}
 className="w-full py-3.5 rounded-xl bg-[#7132F5] hover:bg-[#854BFF] text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_20px_rgba(113,50,245,0.5)]"
 >
 <span>Create New Payment Link</span>
 <ArrowRight className="w-4 h-4" />
 </button>
 </div>
 </div>
 )}
 </div>
 </div>
 );
};
