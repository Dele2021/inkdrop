'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export function LandingNavbar({ onOpenCreateModal, onOpenDemoModal }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Features', href: '#features' },
    { label: 'Calculator', href: '#calculator' },
    { label: 'Security', href: '#security' },
  ];

  return (
    <header className={'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ' + (scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/[0.06]' : 'bg-transparent')}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-7 h-7 rounded-lg bg-[#7132F5] flex items-center justify-center shadow-[0_0_15px_rgba(113,50,245,0.5)]">
              <span className="text-white font-black text-sm font-mono">↓</span>
            </div>
            <span className="font-bold text-white text-base tracking-tight">Ink<span className="text-[#A78BFA]">Drop</span></span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <a key={link.href} href={link.href} className="px-3 py-2 text-sm text-[#9CA3AF] hover:text-white transition-colors rounded-lg hover:bg-white/[0.04]">{link.label}</a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <button onClick={onOpenDemoModal} className="px-4 py-2 text-sm text-[#9CA3AF] hover:text-white transition-colors cursor-pointer">Live Demo</button>
            <button onClick={onOpenCreateModal} className="px-4 py-2 rounded-full bg-[#7132F5] hover:bg-[#854BFF] text-white text-sm font-semibold transition-all cursor-pointer shadow-[0_0_15px_rgba(113,50,245,0.4)]">Get Started</button>
          </div>

          <button className="md:hidden p-2 text-[#9CA3AF] hover:text-white cursor-pointer" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
      {mobileOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-b border-white/[0.06] px-4 pb-4">
          <nav className="flex flex-col gap-1 pt-2">
            {navLinks.map(link => (
              <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="px-3 py-3 text-sm text-[#9CA3AF] hover:text-white transition-colors">{link.label}</a>
            ))}
            <div className="flex gap-3 mt-3 pt-3 border-t border-white/[0.06]">
              <button onClick={() => { onOpenDemoModal(); setMobileOpen(false); }} className="flex-1 py-2.5 text-sm text-[#9CA3AF] border border-white/10 rounded-full cursor-pointer">Live Demo</button>
              <button onClick={() => { onOpenCreateModal(); setMobileOpen(false); }} className="flex-1 py-2.5 rounded-full bg-[#7132F5] text-white text-sm font-semibold cursor-pointer">Get Started</button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
