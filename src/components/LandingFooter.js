'use client';
import Link from 'next/link';

export function LandingFooter({ onOpenCreateModal, onOpenDemoModal }) {
  return (
    <footer className="border-t border-white/[0.06] bg-black">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 border-b border-white/[0.04] max-w-7xl mx-auto">
        <span className="font-mono text-[10px] text-white/20 tracking-widest uppercase">[ 05 / 05 COMPLETE ]</span>
        <span className="font-mono text-[10px] text-white/20 tracking-widest uppercase">[ END ]</span>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-2 mb-4 w-fit">
              <div className="w-7 h-7 rounded-lg bg-[#7132F5] flex items-center justify-center shadow-[0_0_15px_rgba(113,50,245,0.5)]">
                <span className="text-white font-black text-sm font-mono">↓</span>
              </div>
              <span className="font-bold text-white text-base tracking-tight">Ink<span className="text-[#A78BFA]">Drop</span></span>
            </Link>
            <p className="text-sm text-[#9CA3AF] leading-relaxed max-w-xs">Non-custodial crypto payment links on Ink Chain. Send a link, get paid in USDC. Zero fees, instant settlement.</p>
          </div>
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {[
              { heading: 'Product', links: [{ label: 'Create Link', action: onOpenCreateModal }, { label: 'Live Demo', action: onOpenDemoModal }, { label: 'How It Works', href: '#how-it-works' }] },
              { heading: 'Docs', links: [{ label: 'Contract ↗', href: 'https://explorer.inkonchain.com/address/0x7F8798eA489379659341498B75F348F29aeB5A2' }, { label: 'Ink Chain ↗', href: 'https://inkonchain.com' }] },
              { heading: 'Legal', links: [{ label: 'Non-custodial', href: '#security' }, { label: 'Open Source ↗', href: 'https://github.com/Dele2021/inkdrop' }] },
              { heading: 'Account', links: [{ label: 'Live Demo', action: onOpenDemoModal }, { label: 'Get Started', action: onOpenCreateModal }] },
            ].map(col => (
              <div key={col.heading}>
                <div className="text-xs font-mono uppercase tracking-wider text-[#9CA3AF]/60 mb-4">{col.heading}</div>
                <ul className="space-y-3">
                  {col.links.map(link => (
                    <li key={link.label}>
                      {'action' in link
                        ? <button onClick={link.action} className="text-sm text-[#9CA3AF] hover:text-white transition-colors cursor-pointer">{link.label}</button>
                        : <a href={link.href} target={link.href?.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="text-sm text-[#9CA3AF] hover:text-white transition-colors">{link.label}</a>
                      }
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-white/[0.06] text-center sm:text-left">
          <span className="text-xs font-mono text-[#9CA3AF]/40">© 2024 InkDrop · Built on Ink Chain by Kraken · Non-custodial USDC payments</span>
        </div>
      </div>
    </footer>
  );
}
