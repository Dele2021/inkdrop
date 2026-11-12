'use client';
<<<<<<< HEAD
import { useEffect, useRef } from 'react';

// World map dot grid — approximate land masses
const DOT_MAP = [
  // North America
  ...Array.from({ length: 200 }, () => {
    const lat = 25 + Math.random() * 45;
    const lon = -130 + Math.random() * 65;
    return [lat, lon];
  }),
  // Europe
  ...Array.from({ length: 150 }, () => {
    const lat = 35 + Math.random() * 30;
    const lon = -10 + Math.random() * 45;
    return [lat, lon];
  }),
  // Africa
  ...Array.from({ length: 180 }, () => {
    const lat = -30 + Math.random() * 65;
    const lon = -20 + Math.random() * 55;
    return [lat, lon];
  }),
  // Asia
  ...Array.from({ length: 300 }, () => {
    const lat = 5 + Math.random() * 60;
    const lon = 30 + Math.random() * 110;
    return [lat, lon];
  }),
  // South America
  ...Array.from({ length: 130 }, () => {
    const lat = -50 + Math.random() * 60;
    const lon = -80 + Math.random() * 45;
    return [lat, lon];
  }),
  // Australia
  ...Array.from({ length: 80 }, () => {
    const lat = -40 + Math.random() * 30;
    const lon = 115 + Math.random() * 40;
    return [lat, lon];
  }),
];

// City nodes
const CITIES = [
  { name: 'London', lat: 51.5, lon: -0.1 },
  { name: 'Lagos', lat: 6.5, lon: 3.4 },
  { name: 'New York', lat: 40.7, lon: -74.0 },
  { name: 'Dubai', lat: 25.2, lon: 55.3 },
  { name: 'Singapore', lat: 1.35, lon: 103.8 },
  { name: 'Tokyo', lat: 35.7, lon: 139.7 },
  { name: 'São Paulo', lat: -23.5, lon: -46.6 },
  { name: 'Sydney', lat: -33.9, lon: 151.2 },
  { name: 'Nairobi', lat: -1.3, lon: 36.8 },
  { name: 'Mumbai', lat: 19.1, lon: 72.9 },
];

// Connections between cities
const CONNECTIONS = [
  [0, 2], [0, 3], [0, 1], [0, 4], [2, 6], [2, 3],
  [3, 4], [4, 5], [4, 9], [1, 8], [5, 7], [3, 9],
  [0, 9], [2, 1], [4, 7],
];

export default function GlobalMapSection() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animFrame;

    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;
    canvas.width = W * window.devicePixelRatio;
    canvas.height = H * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    function project(lat, lon) {
      const x = ((lon + 180) / 360) * W;
      const y = ((90 - lat) / 180) * H;
      return { x, y };
    }

    // Precompute dot positions (stable random, seeded)
    const dots = DOT_MAP.map(([lat, lon]) => project(lat, lon));

    // Precompute city positions
    const cityPos = CITIES.map(c => project(c.lat, c.lon));

    // Travelling dots on connections
    const travellers = CONNECTIONS.map(([a, b]) => ({
      from: a,
      to: b,
      progress: Math.random(),
      speed: 0.003 + Math.random() * 0.003,
    }));

    // Arc draw-in animation (each arc draws in over time)
    const arcProgress = CONNECTIONS.map(() => Math.random() * 0.5);

    function bezierPoint(p1, p2, t) {
      // Curved arc — control point lifted upward
      const mx = (p1.x + p2.x) / 2;
      const my = (p1.y + p2.y) / 2;
      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const cpx = mx;
      const cpy = my - dist * 0.25;
      // quadratic bezier
      const ix = (1 - t) * (1 - t) * p1.x + 2 * (1 - t) * t * cpx + t * t * p2.x;
      const iy = (1 - t) * (1 - t) * p1.y + 2 * (1 - t) * t * cpy + t * t * p2.y;
      return { x: ix, y: iy };
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);

      // Draw dot grid
      dots.forEach(d => {
        ctx.beginPath();
        ctx.arc(d.x, d.y, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(180,185,200,0.5)';
        ctx.fill();
      });

      // Draw arcs
      CONNECTIONS.forEach(([a, b], i) => {
        arcProgress[i] = Math.min(1, arcProgress[i] + 0.004);
        const p1 = cityPos[a];
        const p2 = cityPos[b];
        const steps = 60;
        const drawTo = Math.floor(arcProgress[i] * steps);

        ctx.beginPath();
        for (let s = 0; s <= drawTo; s++) {
          const pt = bezierPoint(p1, p2, s / steps);
          if (s === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.strokeStyle = 'rgba(99,102,241,0.35)';
        ctx.lineWidth = 1.2;
        ctx.stroke();
      });

      // Draw city squares
      cityPos.forEach((p, i) => {
        const size = 5;
        ctx.fillStyle = 'rgba(99,102,241,0.9)';
        ctx.fillRect(p.x - size / 2, p.y - size / 2, size, size);
        ctx.strokeStyle = 'rgba(255,255,255,0.8)';
        ctx.lineWidth = 1;
        ctx.strokeRect(p.x - size / 2, p.y - size / 2, size, size);
      });

      // Animated travelling dots
      travellers.forEach(tv => {
        tv.progress += tv.speed;
        if (tv.progress > 1) tv.progress = 0;

        const p1 = cityPos[tv.from];
        const p2 = cityPos[tv.to];
        const pt = bezierPoint(p1, p2, tv.progress);

        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.95)';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 2.5, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(99,102,241,0.9)';
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      animFrame = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(animFrame);
  }, []);

  return (
    <section className="bg-white py-24">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-light text-center text-gray-900 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
          Send Money Anywhere, Instantly
        </h2>
        <p className="text-center text-gray-500 mb-12 text-lg">
          InkDrop runs on Ink — an L2 built for global, low-cost settlement.
        </p>

        <div className="relative rounded-2xl overflow-hidden bg-gray-50 border border-gray-100" style={{ height: 340 }}>
          <canvas ref={canvasRef} className="w-full h-full" style={{ display: 'block' }} />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
          {[
            { label: 'Settlement', value: '< 2s' },
            { label: 'Gas cost', value: '< $0.001' },
            { label: 'Uptime', value: '99.9%' },
            { label: 'Chain ID', value: '57073' },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl font-semibold text-gray-900">{s.value}</div>
              <div className="text-sm text-gray-400 mt-1">{s.label}</div>
=======
import React from 'react';

const cities = [
  { name: 'London',    x: 480, y: 148 },
  { name: 'New York',  x: 270, y: 178 },
  { name: 'Lagos',     x: 490, y: 268 },
  { name: 'Dubai',     x: 598, y: 210 },
  { name: 'Singapore', x: 730, y: 290 },
  { name: 'Tokyo',     x: 798, y: 178 },
  { name: 'Sao Paulo', x: 310, y: 338 },
  { name: 'Sydney',    x: 820, y: 370 },
];
const arcs = [[0,1,0],[0,2,0.6],[0,3,1.1],[1,6,0.3],[3,4,0.8],[4,5,0.4],[2,3,1.4],[1,0,1.8],[4,7,1.0],[5,2,2.2]];

function arcPath(a, b) {
  const mx = (a.x + b.x) / 2;
  const my = Math.min(a.y, b.y) - Math.abs(b.x - a.x) * 0.22;
  return `M${a.x},${a.y} Q${mx},${my} ${b.x},${b.y}`;
}

export const GlobalMapSection = () => (
  <section className="relative py-28 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06] bg-[#060810] overflow-hidden">
    <div className="absolute inset-0 pointer-events-none"
      style={{ background: 'radial-gradient(ellipse at 50% 60%, rgba(113,50,245,0.08) 0%, transparent 65%)' }} />
    <div className="max-w-7xl mx-auto relative">
      <div className="mb-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#A78BFA] font-semibold">[ GLOBAL ]</span>
      </div>
      <div className="max-w-2xl mb-10">
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
          Instant payments, anywhere on earth.
        </h2>
        <p className="text-base sm:text-lg text-[#9CA3AF]">
          Every InkDrop payment settles in under 2 seconds on Ink Chain — from London to Lagos, New York to Singapore.
        </p>
      </div>
      <div className="relative w-full rounded-2xl overflow-hidden border border-white/[0.07] bg-[#07090f]"
        style={{ boxShadow: '0 0 80px -20px rgba(113,50,245,0.25)' }}>
        <svg viewBox="0 0 1000 500" className="w-full">
          <defs>
            <filter id="mapGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            {arcs.map(([si,di],i) => (
              <linearGradient key={i} id={`maparc${i}`}
                x1={cities[si].x} y1={cities[si].y}
                x2={cities[di].x} y2={cities[di].y}
                gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#7132F5" stopOpacity="0.9"/>
                <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.5"/>
              </linearGradient>
            ))}
          </defs>
          <rect width="1000" height="500" fill="#07090f"/>
          {Array.from({length:38}).map((_,row) =>
            Array.from({length:77}).map((_,col) => (
              <circle key={`${row}-${col}`} cx={col*13+6} cy={row*13+6} r="0.6" fill="#ffffff" opacity="0.05"/>
            ))
          )}
          {arcs.map(([si,di,delay],i) => {
            const a = cities[si], b = cities[di];
            const d = arcPath(a,b);
            return (
              <path key={i} d={d} fill="none" stroke={`url(#maparc${i})`} strokeWidth="1.2" opacity="0.7"
                strokeDasharray="300" strokeDashoffset="300"
                style={{ animation: `drawArc 1.8s ease-out forwards`, animationDelay: `${delay}s` }}/>
            );
          })}
          {arcs.map(([si,di,delay],i) => {
            const a = cities[si], b = cities[di];
            const d = arcPath(a,b);
            return (
              <g key={`td${i}`} filter="url(#mapGlow)">
                <circle r="3" fill="#A78BFA" opacity="0.95">
                  <animateMotion dur="2.4s" repeatCount="indefinite" begin={`${delay+0.3}s`} path={d}/>
                </circle>
              </g>
            );
          })}
          {cities.map((c,i) => (
            <g key={c.name}>
              <circle cx={c.x} cy={c.y} r="10" fill="#7132F5" opacity="0.08"
                style={{ animation: `cityPulse 3s ease-in-out infinite`, animationDelay: `${i*0.3}s` }}/>
              <circle cx={c.x} cy={c.y} r="4" fill="#0a0d14" stroke="#8B5CF6" strokeWidth="1.2"/>
              <circle cx={c.x} cy={c.y} r="2" fill="#C4B5FD"/>
              <text x={c.x} y={c.y-9} textAnchor="middle" fontSize="10" fill="#9CA3AF" fontFamily="monospace" fontWeight="600">{c.name}</text>
            </g>
          ))}
        </svg>
        <div className="flex flex-wrap items-center justify-around gap-4 px-6 py-4 border-t border-white/[0.07]">
          {[['~1.8s','Settlement'],['< $0.001','Gas cost'],['24/7','Always live'],['57073','Ink Chain ID']].map(([v,l]) => (
            <div key={l} className="text-center">
              <div className="font-mono text-lg font-extrabold text-white">{v}</div>
              <div className="font-mono text-[10px] text-[#9CA3AF] uppercase tracking-wider">{l}</div>
>>>>>>> f8e69e0fccbd0e8861b6c99532984d8a3a727d0f
            </div>
          ))}
        </div>
      </div>
<<<<<<< HEAD
    </section>
  );
}
=======
    </div>
    <style>{`
      @keyframes drawArc { to { stroke-dashoffset: 0; } }
      @keyframes cityPulse { 0%,100%{r:10;opacity:0.08} 50%{r:16;opacity:0.14} }
    `}</style>
  </section>
);
>>>>>>> f8e69e0fccbd0e8861b6c99532984d8a3a727d0f
