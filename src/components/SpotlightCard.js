'use client'
import { useRef } from 'react'
export default function SpotlightCard({ children, className = '' }) {
  const ref = useRef(null)
  function handleMouseMove(e) {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    ref.current.style.setProperty('--mouse-x', `${e.clientX - r.left}px`)
    ref.current.style.setProperty('--mouse-y', `${e.clientY - r.top}px`)
  }
  return (
    <div ref={ref} onMouseMove={handleMouseMove} className={`relative rounded-2xl border border-white/[0.08] overflow-hidden ${className}`} style={{background:'rgba(8,11,18,0.9)'}}>
      <div className="pointer-events-none absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300" style={{background:'radial-gradient(300px circle at var(--mouse-x,50%) var(--mouse-y,50%), rgba(113,50,245,0.08), transparent 70%)'}} />
      {children}
    </div>
  )
}
