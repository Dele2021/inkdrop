'use client';
import React, { useEffect, useRef } from 'react';

const CITIES = [
  { name: 'London',    lat: 51.5,  lon: -0.1  },
  { name: 'Lagos',     lat: 6.5,   lon: 3.4   },
  { name: 'New York',  lat: 40.7,  lon: -74.0 },
  { name: 'Dubai',     lat: 25.2,  lon: 55.3  },
  { name: 'Singapore', lat: 1.35,  lon: 103.8 },
  { name: 'Tokyo',     lat: 35.7,  lon: 139.7 },
  { name: 'São Paulo', lat: -23.5, lon: -46.6 },
  { name: 'Sydney',    lat: -33.9, lon: 151.2 },
  { name: 'Nairobi',   lat: -1.3,  lon: 36.8  },
  { name: 'Mumbai',    lat: 19.1,  lon: 72.9  },
];

const CONNECTIONS = [
  [0,2],[0,3],[0,1],[0,4],[2,6],[2,3],
  [3,4],[4,5],[4,9],[1,8],[5,7],[3,9],
  [0,9],[2,1],[4,7],
];

export const GlobalMapSection = () => {
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

    // Dot grid — approximate continents
    const rng = (seed) => { let s = seed; return () => { s = (s * 1664525 + 1013904223) & 0xffffffff; return (s >>> 0) / 0xffffffff; }; };
    const rand = rng(42);
    const dots = [];
    const landRects = [
      [25,70,-130,-65],[35,65,-10,35],[5,70,30,140],[-30,35,-20,55],
      [-50,10,-80,-35],[-40,-10,115,155],[60,75,15,60],
    ];
    for (let i = 0; i < 900; i++) {
      const r = landRects[Math.floor(rand() * landRects.length)];
      const lat = r[0] + rand() * (r[1] - r[0]);
      const lon = r[2] + rand() * (r[3] - r[2]);
      dots.push(project(lat, lon));
    }

    const cityPos = CITIES.map(c => project(c.lat, c.lon));

    const arcProgress = CONNECTIONS.map(() => Math.random() * 0.4);

    const travellers = CONNECTIONS.map(([a, b]) => ({
      from: a, to: b,
      progress: Math.random(),
      speed: 0.0025 + Math.random() * 0.003,
    }));

    function bezierPt(p1, p2, t) {
      const mx = (p1.x + p2.x) / 2;
      const dist = Math.sqrt((p2.x-p1.x)**2 + (p2.y-p1.y)**2);
      const cpy = (p1.y + p2.y) / 2 - dist * 0.28;
      return {
        x: (1-t)*(1-t)*p1.x + 2*(1-t)*t*mx + t*t*p2.x,
        y: (1-t)*(1-t)*p1.y + 2*(1-t)*t*cpy + t*t*p2.y,
      };
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);

      // Dot grid
      dots.forEach(d => {
        ctx.beginPath();
        ctx.arc(d.x, d.y, 1.3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(167,139,250,0.18)';
        ctx.fill();
      });

      // Arcs with glow
      CONNECTIONS.forEach(([a, b], i) => {
        arcProgress[i] = Math.min(1, arcProgress[i] + 0.003);
        const p1 = cityPos[a];
        const p2 = cityPos[b];
        const steps = 60;
        const drawTo = Math.floor(arcProgress[i] * steps);

        // Glow pass
        ctx.beginPath();
        for (let s = 0; s <= drawTo; s++) {
          const pt = bezierPt(p1, p2, s / steps);
          if (s === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.strokeStyle = 'rgba(113,50,245,0.15)';
        ctx.lineWidth = 4;
        ctx.stroke();

        // Main arc
        ctx.beginPath();
        for (let s = 0; s <= drawTo; s++) {
          const pt = bezierPt(p1, p2, s / steps);
          if (s === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.strokeStyle = 'rgba(167,139,250,0.4)';
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // City squares with glow
      cityPos.forEach(p => {
        // glow
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 10);
        grad.addColorStop(0, 'rgba(167,139,250,0.4)');
        grad.addColorStop(1, 'rgba(167,139,250,0)');
        ctx.fillStyle = grad;
        ctx.fillRect(p.x - 10, p.y - 10, 20, 20);
        // square
        const size = 5;
        ctx.fillStyle = '#A78BFA';
        ctx.fillRect(p.x - size/2, p.y - size/2, size, size);
        ctx.strokeStyle = 'rgba(255,255,255,0.6)';
        ctx.lineWidth = 0.8;
        ctx.strokeRect(p.x - size/2, p.y - size/2, size, size);
      });

      // Travelling dots
      travellers.forEach(tv => {
        tv.progress += tv.speed;
        if (tv.progress > 1) tv.progress = 0;
        const pt = bezierPt(cityPos[tv.from], cityPos[tv.to], tv.progress);
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.9)';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 2.5, 0, Math.PI * 2);
        ctx.strokeStyle = '#A78BFA';
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      animFrame = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(animFrame);
  }, []);

  const stats = [
    { label: 'Settlement', value: '< 2s' },
    { label: 'Gas cost', value: '< $0.001' },
    { label: 'Uptime', value: '99.9%' },
    { label: 'Chain ID', value: '57073' },
  ];

  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06] bg-[#04060f] overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(113,50,245,0.07) 0%, transparent 70%)' }} />
      <div className="max-w-7xl mx-auto relative">
        <div className="mb-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#A78BFA] font-semibold">[ 04 / GLOBAL REACH ]</span>
        </div>
        <div className="max-w-3xl mb-14">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Send money anywhere, instantly.
          </h2>
          <p className="text-base sm:text-lg text-[#9CA3AF]">
            From Lagos to London in one transaction. InkDrop settles across borders without banks, fees, or delays.
          </p>
        </div>

        <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] mb-10"
          style={{ height: 300, background: '#020408' }}>
          <canvas ref={canvasRef} className="w-full h-full" style={{ display: 'block' }} />
          <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
            style={{ background: 'linear-gradient(to top, #04060f, transparent)' }} />
          <div className="absolute top-0 left-0 right-0 h-10 pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, #04060f, transparent)' }} />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div key={i} className="p-6 rounded-2xl border border-white/[0.08] bg-white/[0.02] text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-white mb-1">{s.value}</div>
              <div className="font-mono text-[11px] uppercase tracking-widest text-[#9CA3AF]">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
