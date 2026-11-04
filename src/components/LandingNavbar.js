'use client'
import { useState } from 'react'
export default function LandingNavbar() {
  const [open, setOpen] = useState(false)
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06]" style={{background:'rgba(5,8,17,0.85)',backdropFilter:'blur(12px)'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{background:'linear-gradient(135deg,#7132F5,#9b6dff)'}}>
              <span className="text-white text-xs font-bold">ID</span>
            </div>
            <span className="text-white font-semibold text-sm">InkDrop</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            {['Features','How it works','Calculator'].map(item => (
              <a key={item} href={`#${item.toLowerCase().replace(/ /g,'-')}`} className="text-[#9CA3AF] hover:text-white text-sm transition-colors">{item}</a>
            ))}
          </div>
          <a href="#calculator" className="hidden md:flex px-4 py-2 rounded-lg text-sm font-medium text-white cta-pulse" style={{background:'linear-gradient(135deg,#7132F5,#9b6dff)'}}>Create Payment Link</a>
          <button className="md:hidden text-white p-2" onClick={() => setOpen(!open)}>
            <div className="w-5 h-0.5 bg-white mb-1"/><div className="w-5 h-0.5 bg-white mb-1"/><div className="w-5 h-0.5 bg-white"/>
          </button>
        </div>
        {open && (
          <div className="md:hidden py-4 border-t border-white/[0.06] space-y-3">
            {['Features','How it works','Calculator'].map(item => (
              <a key={item} href={`#${item.toLowerCase().replace(/ /g,'-')}`} onClick={() => setOpen(false)} className="block text-[#9CA3AF] hover:text-white text-sm py-1">{item}</a>
            ))}
            <a href="#calculator" className="block px-4 py-2 rounded-lg text-sm font-medium text-white text-center" style={{background:'linear-gradient(135deg,#7132F5,#9b6dff)'}}>Create Payment Link</a>
          </div>
        )}
      </div>
    </nav>
  )
}
