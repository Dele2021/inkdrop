'use client'
import { useState } from 'react'
export default function CalculatorSection({ onOpenCreateModal }) {
  const [amount, setAmount] = useState(1000)
  const fee = amount * 0.01
  const net = amount * 0.99
  return (
    <section id="calculator" className="relative py-20 px-4 sm:px-6 lg:px-8 fade-in-section">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-3">Fee calculator</h2>
          <p className="text-[#9CA3AF]">See exactly what you receive. No surprises.</p>
        </div>
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/[0.08]">
          <div className="mb-4">
            <label className="block text-xs font-mono text-[#9CA3AF] uppercase mb-2">Invoice amount (USDC)</label>
            <input type="number" min={1} max={1000000} value={amount} onChange={e => setAmount(Math.max(1,Number(e.target.value)))} suppressHydrationWarning
              className="w-full px-4 py-3.5 bg-black/80 rounded-xl border border-white/15 text-white text-lg font-semibold focus:outline-none" placeholder="1000" />
          </div>
          <input type="range" min={1} max={50000} step={100} value={amount} onChange={e => setAmount(Number(e.target.value))} suppressHydrationWarning
            className="w-full h-2 rounded-lg appearance-none cursor-pointer mb-8" style={{accentColor:'#7132F5'}} />
          <div className="space-y-3 mb-6">
            <div className="flex justify-between items-center py-3 border-b border-white/[0.06]">
              <span className="text-[#9CA3AF] text-sm">Invoice total</span>
              <span className="text-white font-semibold">${amount.toLocaleString()} USDC</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-white/[0.06]">
              <span className="text-[#9CA3AF] text-sm">Platform fee (1%)</span>
              <span className="text-[#EF4444] font-semibold">-${fee.toFixed(2)} USDC</span>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-white font-semibold">You receive</span>
              <span className="text-xl font-bold" style={{color:'#4ade80'}}>${net.toFixed(2)} USDC</span>
            </div>
          </div>
          <button onClick={onOpenCreateModal} className="w-full py-3.5 rounded-xl text-white font-semibold text-sm cta-pulse" style={{background:'linear-gradient(135deg,#7132F5,#9b6dff)'}}>
            Create payment link for ${net.toFixed(2)} USDC
          </button>
        </div>
      </div>
    </section>
  )
}
