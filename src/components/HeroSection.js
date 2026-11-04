'use client'
export default function HeroSection({ onOpenCreateModal }) {
  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 fade-in-section">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] mb-6">
          <span className="text-xs text-[#9CA3AF]">Built on Ink Chain · USDC payments</span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
          Crypto payments,{' '}
          <span style={{background:'linear-gradient(135deg,#7132F5,#9b6dff)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>stupidly simple</span>
        </h1>
        <p className="text-lg text-[#9CA3AF] max-w-2xl mx-auto mb-8 leading-relaxed">
          Create a payment link in seconds. Share it anywhere. Get paid in USDC on Ink Chain. Just 1% platform fee — you keep 99%.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-16">
          <button onClick={onOpenCreateModal} className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-sm cta-pulse" style={{background:'linear-gradient(135deg,#7132F5,#9b6dff)'}}>
            Create Payment Link →
          </button>
          <a href="#how-it-works" className="inline-flex items-center justify-center px-6 py-3 rounded-xl text-[#9CA3AF] font-medium text-sm border border-white/10 hover:text-white transition-colors">
            See how it works
          </a>
        </div>
        <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto">
          {[{label:'Platform fee',value:'1%'},{label:'You receive',value:'99%'},{label:'Settlement',value:'Instant'}].map(({label,value}) => (
            <div key={label} className="glass-card rounded-xl p-3 border border-white/[0.06]">
              <div className="text-xl font-bold text-white">{value}</div>
              <div className="text-[11px] text-[#6B7280] mt-0.5">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
