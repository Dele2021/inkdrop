'use client'
export default function GlobalGlowBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div className="absolute animate-glow-pulse" style={{width:'600px',height:'600px',background:'radial-gradient(circle, rgba(113,50,245,0.12) 0%, transparent 70%)',left:'50%',top:'20%'}} />
      <div className="absolute" style={{width:'400px',height:'400px',background:'radial-gradient(circle, rgba(113,50,245,0.07) 0%, transparent 70%)',left:'10%',top:'60%'}} />
    </div>
  )
}
