'use client'
import { useState } from 'react'
const CONTRACT = '0x7F8798eA489379659341498B75F348F29aeB5A2'
const steps = [
  {n:'01',title:'Set your amount',desc:'Enter how much USDC you want to receive.'},
  {n:'02',title:'Get your link',desc:'InkDrop creates a unique payment URL tied to your wallet on Ink Chain.'},
  {n:'03',title:'Share it',desc:'Send the link to your client via any channel.'},
  {n:'04',title:'Get paid',desc:'99% lands in your wallet instantly. InkDrop takes 1%.'},
]
export default function HowItWorksSection({ onOpenCreateModal }) {
  const [copied, setCopied] = useState(false)
  function copy() { navigator.clipboard.writeText(CONTRACT); setCopied(true); setTimeout(()=>setCopied(false),2000) }
  return (
    <section id="how-it-works" className="relative py-20 px-4 sm:px-6 lg:px-8 fade-in-section">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-3">How it works</h2>
          <p className="text-[#9CA3AF]">From zero to paid in under a minute.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {steps.map(({n,title,desc}) => (
            <div key={n} className="glass-card glass-card-hover rounded-2xl p-6 border border-white/[0.06]">
              <div className="text-3xl font-black mb-4" style={{background:'linear-gradient(135deg,#7132F5,#9b6dff)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>{n}</div>
              <h3 className="text-white font-semibold text-sm mb-2">{title}</h3>
              <p className="text-[#6B7280] text-xs leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
        <div className="rounded-2xl border border-white/[0.08] p-6 sm:p-8 text-center" style={{background:'rgba(8,11,18,0.9)'}}>
          <h3 className="text-white font-bold text-xl mb-2">Transparent & verifiable</h3>
          <p className="text-[#9CA3AF] text-sm mb-6">Every payment is on-chain. Fully auditable.</p>
          <div className="inline-block rounded-xl p-4 border border-white/[0.06] mb-6 text-left" style={{background:'rgba(113,50,245,0.05)'}}>
            <div className="text-[11px] font-mono text-[#9CA3AF] uppercase mb-1">Contract</div>
            <div className="font-mono text-xs text-white mb-2">{CONTRACT}</div>
            <button onClick={copy} className="text-[11px] text-[#7132F5] hover:text-[#9b6dff]">{copied ? '✓ Copied!' : 'Copy address'}</button>
          </div>
          <div className="mt-2">
            <button onClick={onOpenCreateModal} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-sm cta-pulse" style={{background:'linear-gradient(135deg,#7132F5,#9b6dff)'}}>
              Create your first payment link →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
