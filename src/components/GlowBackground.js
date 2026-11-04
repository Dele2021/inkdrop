'use client';

export function GlobalGlowBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden" aria-hidden="true">
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[950px] h-[580px] rounded-full blur-[140px] opacity-35"
        style={{ background: 'radial-gradient(ellipse at center, #7132F5 0%, #4C1D95 45%, transparent 70%)' }} />
      <div className="absolute top-[8%] left-1/2 -translate-x-[48%] w-[850px] h-[480px] rounded-full blur-[160px] opacity-25"
        style={{ background: 'radial-gradient(ellipse at center, #9333EA 0%, #581C87 50%, transparent 75%)' }} />
      <div className="absolute top-[38%] left-[8%] w-[680px] h-[680px] rounded-full blur-[180px] opacity-20"
        style={{ background: 'radial-gradient(circle, #7132F5 0%, transparent 70%)' }} />
      <div className="absolute top-[58%] right-[5%] w-[750px] h-[650px] rounded-full blur-[170px] opacity-20"
        style={{ background: 'radial-gradient(circle, #6D28D9 0%, #31104B 60%, transparent 75%)' }} />
      <div className="absolute bottom-[2%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] rounded-full blur-[150px] opacity-30"
        style={{ background: 'radial-gradient(ellipse at center, #7132F5 0%, #581C87 45%, transparent 70%)' }} />
      <div className="absolute inset-0 noise-overlay pointer-events-none" />
    </div>
  );
}
