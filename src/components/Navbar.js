'use client';

import { usePrivy } from '@privy-io/react-auth';
import React, { useState, useEffect } from 'react';
import { InkDropLogo } from './Icons';
import { Menu, X, ArrowUpRight, Volume2, VolumeX } from 'lucide-react';
import { playMicroSound, setSoundEnabled, getSoundEnabled } from '../utils/sound';


export const Navbar = ({
 onOpenCreateModal,
 onOpenAuthModal,
}) => {
 const [isScrolled, setIsScrolled] = useState(false);
 const { login, authenticated, logout } = usePrivy();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
 const [soundActive, setSoundActive] = useState(getSoundEnabled());

 useEffect(() => {
 const handleScroll = () => {
 setIsScrolled(window.scrollY > 20);
 };
 window.addEventListener('scroll', handleScroll, { passive: true });
 return () => window.removeEventListener('scroll', handleScroll);
 }, []);

 const toggleSound = () => {
 const next = !soundActive;
 setSoundActive(next);
 setSoundEnabled(next);
 if (next) {
 setTimeout(() => playMicroSound('confirm'), 50);
 }
 };

 const navLinks = [
 { label: 'How It Works', href: '#how-it-works' },
 { label: 'Features', href: '#features' },
 { label: 'Pricing (1%)', href: '#calculator' },
 { label: 'Security', href: '#security' },
 ];

 const handleLinkClick = (e, href) => {
 e.preventDefault();
 playMicroSound('click');
 setMobileMenuOpen(false);
 const target = document.querySelector(href);
 if (target) {
 target.scrollIntoView({ behavior: 'smooth' });
 }
 };

 return (
 <header
 className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
 isScrolled
 ? 'bg-black/85 backdrop-blur-md border-b border-white/[0.08] py-3.5 shadow-2xl shadow-black/80'
 : 'bg-black/60 backdrop-blur-sm border-b border-white/[0.04] py-4'
 }`}
 >
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-6">
 {/* Left: InkDrop logo + Live status badge */}
 <div className="flex items-center gap-4">
 <a
 href="#"
 className="shrink-0 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7132F5] rounded-lg p-1"
 aria-label="InkDrop Home"
 onClick={() => playMicroSound('tick')}
 >
 <InkDropLogo />
 </a>

 <div className="hidden xl:flex items-center gap-2 pl-3 border-l border-white/10 font-mono text-[11px] text-[#9CA3AF]">
 <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
 <span className="text-white/80">[ INK L2: 1.8s FINALITY · 1% FEE ]</span>
 </div>
 </div>

 {/* Center: 5 anchor links */}
 <nav
 className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-[#9CA3AF]"
 aria-label="Main Navigation"
 >
 {navLinks.map((link) => (
 <a
 key={link.label}
 href={link.href}
 onClick={(e) => handleLinkClick(e, link.href)}
 onMouseEnter={() => playMicroSound('tick')}
 className="hover:text-white transition-colors duration-200 tracking-wide text-[13px] lg:text-[14px] whitespace-nowrap"
 >
 {link.label}
 </a>
 ))}
 </nav>

 {/* Right: Sound toggle + Log In + Get Started */}
 <div className="hidden md:flex items-center gap-3 shrink-0">
 {/* Blackalgo-style SFX Toggle button */}
 <button
 onClick={toggleSound}
 className={`px-2.5 py-1.5 rounded-full border text-[11px] font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
 soundActive
 ? 'border-[#7132F5] bg-[#7132F5]/20 text-[#D8B4FE] shadow-[0_0_15px_rgba(113,50,245,0.4)]'
 : 'border-white/10 bg-white/[0.02] text-[#9CA3AF] hover:text-white hover:border-white/20'
 }`}
 title={soundActive ? 'Mute Micro-interactions' : 'Enable Cyberpunk SFX'}
 >
 {soundActive ? (
 <>
 <Volume2 className="w-3.5 h-3.5 text-[#A78BFA]" />
 <span className="flex items-center gap-0.5">
 <span className="w-0.5 h-2 bg-[#8B5CF6] animate-pulse" />
 <span className="w-0.5 h-3 bg-[#A78BFA] animate-pulse" style={{ animationDelay: '120ms' }} />
 <span className="w-0.5 h-1.5 bg-[#8B5CF6] animate-pulse" style={{ animationDelay: '240ms' }} />
 </span>
 <span className="text-[10px]">SFX: ON</span>
 </>
 ) : (
 <>
 <VolumeX className="w-3.5 h-3.5 opacity-60" />
 <span className="text-[10px]">SFX: OFF</span>
 </>
 )}
 </button>

 <button
 onClick={() => {
 playMicroSound('click');
 authenticated ? logout() : login();
 }}
 className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white/90 hover:text-white border border-white/15 hover:border-white/40 rounded-full transition-all duration-200 bg-white/[0.02] hover:bg-white/[0.06] active:scale-95 cursor-pointer"
 >
 Log In
 </button>
 <button
 onClick={() => {
 playMicroSound('click');
 onOpenCreateModal();
 }}
 className="group relative inline-flex items-center gap-2 px-5 py-2 text-xs font-bold uppercase tracking-wider text-white bg-[#7132F5] hover:bg-[#854BFF] rounded-full transition-all duration-200 shadow-[0_0_25px_rgba(113,50,245,0.45)] hover:shadow-[0_0_35px_rgba(113,50,245,0.75)] active:scale-95 cursor-pointer"
 >
 <span>Create Link</span>
 <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
 </button>
 </div>

 {/* Mobile menu toggle */}
 <div className="flex md:hidden items-center gap-2">
 <button
 onClick={onOpenCreateModal}
 className="px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-white bg-[#7132F5] rounded-full active:scale-95 shadow-[0_0_15px_rgba(113,50,245,0.4)] min-h-[40px] flex items-center justify-center"
 >
 Start
 </button>
 <button
 onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
 className="w-11 h-11 flex items-center justify-center text-[#9CA3AF] hover:text-white focus:outline-none focus:ring-1 focus:ring-[#7132F5] rounded-lg active:bg-white/5"
 aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
 >
 {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
 </button>
 </div>
 </div>

 {/* Mobile menu dropdown */}
 {mobileMenuOpen && (
 <div className="md:hidden bg-black/95 backdrop-blur-2xl border-b border-white/10 px-5 py-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
 <div className="flex flex-col space-y-1">
 {navLinks.map((link) => (
 <a
 key={link.label}
 href={link.href}
 onClick={(e) => handleLinkClick(e, link.href)}
 className="text-base font-medium text-[#9CA3AF] hover:text-white py-3 px-2 rounded-lg hover:bg-white/[0.04] border-b border-white/5 transition-colors flex items-center justify-between"
 >
 <span>{link.label}</span>
 <span className="text-xs font-mono text-[#7132F5]">→</span>
 </a>
 ))}
 </div>

 <div className="pt-3 flex flex-col gap-3">
 <button
 onClick={() => {
 setMobileMenuOpen(false);
 authenticated ? logout() : login();
 }}
 className="w-full py-3 text-sm font-semibold tracking-wider text-white border border-white/20 rounded-xl hover:bg-white/5 active:scale-95 transition-all text-center min-h-[44px]"
 >
 Log In
 </button>
 <button
 onClick={() => {
 setMobileMenuOpen(false);
 onOpenCreateModal();
 }}
 className="w-full py-3 text-sm font-bold uppercase tracking-wider text-white bg-[#7132F5] hover:bg-[#854BFF] rounded-xl active:scale-95 transition-all text-center shadow-[0_0_20px_rgba(113,50,245,0.5)] min-h-[44px]"
 >
 Get Started →
 </button>
 </div>
 </div>
 )}
 </header>
 );
};

