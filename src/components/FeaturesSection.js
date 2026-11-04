'use client'
const features = [
  {title:'One-click payment links',desc:'Generate a unique payment URL in seconds. Share via email, Telegram, Twitter — anywhere.'},
  {title:'Instant USDC settlement',desc:'Funds hit your wallet the moment payment is made. No waiting, no batching, no delays.'},
  {title:'Non-custodial',desc:'Your funds go directly to your wallet. InkDrop never holds your money.'},
  {title:'Ink Chain native',desc:"Built on Ink — Kraken's OP Stack L2. Fast, cheap, and built for payments."},
]
export default function FeaturesSection() {
  return (
    <section id="features" className="relative py-20 px-4 sm:px-6 lg:px-8 fade-in-section">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-3">Everything you need to get paid</h2>
          <p className="text-[#9CA3AF] max-w-xl mx-auto">No wallet setup required for payers. No KYC. No complexity.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map(({title,desc},i) => (
            <div key={i} className="glass-card glass-card-hover rounded-2xl p-6 border border-white/[0.06]">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-lg" style={{background:'rgba(113,50,245,0.15)'}}>
                {['🔗','⚡','🛡️','🌐'][i]}
              </div>
              <h3 className="text-white font-semibold text-sm mb-2">{title}</h3>
              <p className="text-[#6B7280] text-xs leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
