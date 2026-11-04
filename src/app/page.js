'use client'
import { useState, useEffect } from 'react'
import GlobalGlowBackground from '@/components/GlobalGlowBackground'
import LandingNavbar from '@/components/LandingNavbar'
import HeroSection from '@/components/HeroSection'
import FeaturesSection from '@/components/FeaturesSection'
import HowItWorksSection from '@/components/HowItWorksSection'
import CalculatorSection from '@/components/CalculatorSection'

export default function HomePage() {
  const [showModal, setShowModal] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('is-visible') }),
      { threshold: 0.1 }
    )
    document.querySelectorAll('.fade-in-section').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
  return (
    <div className="relative min-h-screen bg-[#050811]">
      <GlobalGlowBackground />
      <LandingNavbar />
      <main>
        <HeroSection onOpenCreateModal={() => setShowModal(true)} />
        <FeaturesSection />
        <HowItWorksSection onOpenCreateModal={() => setShowModal(true)} />
        <CalculatorSection onOpenCreateModal={() => setShowModal(true)} />
      </main>
      <footer className="border-t border-white/[0.06] py-8 px-4 text-center">
        <p className="text-[#6B7280] text-xs">InkDrop · Built on Ink Chain · 1% platform fee · Non-custodial</p>
      </footer>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{background:'rgba(0,0,0,0.8)',backdropFilter:'blur(8px)'}} onClick={() => setShowModal(false)}>
          <div className="glass-card rounded-2xl p-8 border border-white/[0.1] max-w-sm w-full text-center" onClick={e => e.stopPropagation()}>
            <h3 className="text-white font-bold text-lg mb-2">Coming soon</h3>
            <p className="text-[#9CA3AF] text-sm mb-6">Payment link creation launching shortly.</p>
            <button onClick={() => setShowModal(false)} className="w-full py-3 rounded-xl text-white font-semibold text-sm" style={{background:'linear-gradient(135deg,#7132F5,#9b6dff)'}}>Got it</button>
          </div>
        </div>
      )}
    </div>
  )
}
