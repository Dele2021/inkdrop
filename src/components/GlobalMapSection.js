'use client';
import React, { useEffect, useRef } from 'react';

// City nodes — same layout as doublezero map
const CITIES = [
  { name: 'New York',   lat: 40.7,  lon: -74.0 },
  { name: 'São Paulo',  lat: -23.5, lon: -46.6 },
  { name: 'London',     lat: 51.5,  lon: -0.1  },
  { name: 'Lagos',      lat: 6.5,   lon: 3.4   },
  { name: 'Nairobi',    lat: -1.3,  lon: 36.8  },
  { name: 'Dubai',      lat: 25.2,  lon: 55.3  },
  { name: 'Mumbai',     lat: 19.1,  lon: 72.9  },
  { name: 'Singapore',  lat: 1.35,  lon: 103.8 },
  { name: 'Tokyo',      lat: 35.7,  lon: 139.7 },
  { name: 'Sydney',     lat: -33.9, lon: 151.2 },
];

const CONNECTIONS = [
  [0,2],[0,1],[0,5],[2,3],[2,5],[2,6],
  [3,4],[4,5],[5,6],[5,7],[6,7],[7,8],
  [7,9],[8,9],[0,3],[1,3],[2,7],
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

    // Mercator projection with padding
    const padX = W * 0.05, padY = H * 0.08;
    function project(lat, lon) {
      const x = padX + ((lon + 180) / 360) * (W - padX * 2);
      const y = padY + ((90 - lat) / 180) * (H - padY * 2);
      return { x, y };
    }

    // Deterministic dot grid for continents
    const dots = [];
    const seed = (n) => { let s=n*2654435761; return ()=>{ s^=s<<13; s^=s>>17; s^=s<<5; return (s>>>0)/0xffffffff; }; };
    const r = seed(42);
    // Continent bounding boxes [latMin, latMax, lonMin, lonMax, density]
    const regions = [
      [25,70,-130,-60,220],   // N America
      [-55,15,-82,-34,120],   // S America
      [35,70,-10,40,150],     // Europe
      [-35,37,-18,52,180],    // Africa
      [5,75,25,145,320],      // Asia
      [-45,-10,112,154,80],   // Australia
    ];
    regions.forEach(([latMin,latMax,lonMin,lonMax,count]) => {
      for (let i=0; i<count; i++) {
        const lat = latMin + r()*(latMax-latMin);
        const lon = lonMin + r()*(lonMax-lonMin);
        dots.push(project(lat,lon));
      }
    });

    const cityPos = CITIES.map(c => project(c.lat, c.lon));

    // Arc draw-in state
    const arcState = CONNECTIONS.map(() => ({ progress: Math.random() * 0.3, drawn: false }));

    // Travelling dots — multiple per connection
    const travellers = [];
    CONNECTIONS.forEach(([a,b], i) => {
      const count = 1 + Math.floor(Math.random() * 2);
      for (let k=0; k<count; k++) {
        travellers.push({
          conn: i, from: a, to: b,
          progress: k/count + Math.random()*0.3,
          speed: 0.002 + Math.random()*0.002,
        });
      }
    });

    function bezierCtrl(p1, p2) {
      const mx = (p1.x + p2.x) / 2;
      const dist = Math.hypot(p2.x-p1.x, p2.y-p1.y);
      return { x: mx, y: (p1.y+p2.y)/2 - dist * 0.3 };
    }

    function bezierPt(p1, cp, p2, t) {
      return {
        x: (1-t)*(1-t)*p1.x + 2*(1-t)*t*cp.x + t*t*p2.x,
        y: (1-t)*(1-t)*p1.y + 2*(1-t)*t*cp.y + t*t*p2.y,
      };
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);

      // --- Dot grid ---
      dots.forEach(d => {
        ctx.beginPath();
        ctx.arc(d.x, d.y, 1.4, 0, Math.PI*2);
        ctx.fillStyle = 'rgba(167,139,250,0.22)';
        ctx.fill();
      });

      // --- Arcs ---
      CONNECTIONS.forEach(([a,b], i) => {
        arcState[i].progress = Math.min(1, arcState[i].progress + 0.004);
        const p1 = cityPos[a], p2 = cityPos[b];
        const cp = bezierCtrl(p1, p2);
        const steps = 80;
        const drawTo = Math.floor(arcState[i].progress * steps);

        // Glow
        ctx.beginPath();
        for (let s=0; s<=drawTo; s++) {
          const pt = bezierPt(p1, cp, p2, s/steps);
          s===0 ? ctx.moveTo(pt.x,pt.y) : ctx.lineTo(pt.x,pt.y);
        }
        ctx.strokeStyle = 'rgba(113,50,245,0.2)';
        ctx.lineWidth = 5;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Main line
        ctx.beginPath();
        for (let s=0; s<=drawTo; s++) {
          const pt = bezierPt(p1, cp, p2, s/steps);
          s===0 ? ctx.moveTo(pt.x,pt.y) : ctx.lineTo(pt.x,pt.y);
        }
        ctx.strokeStyle = 'rgba(167,139,250,0.5)';
        ctx.lineWidth = 1.2;
        ctx.stroke();
      });

      // --- City nodes (square markers like doublezero) ---
      cityPos.forEach((p, i) => {
        // Outer glow ring
        const gr = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,14);
        gr.addColorStop(0, 'rgba(167,139,250,0.35)');
        gr.addColorStop(1, 'rgba(113,50,245,0)');
        ctx.fillStyle = gr;
        ctx.fillRect(p.x-14, p.y-14, 28, 28);

        // Square node
        const sz = 6;
        ctx.fillStyle = '#7132F5';
        ctx.fillRect(p.x-sz/2, p.y-sz/2, sz, sz);
        ctx.strokeStyle = 'rgba(196,181,253,0.8)';
        ctx.lineWidth = 1;
        ctx.strokeRect(p.x-sz/2, p.y-sz/2, sz, sz);

        // Inner bright dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI*2);
        ctx.fillStyle = '#C4B5FD';
        ctx.fill();
      });

      // --- Travelling dots ---
      travellers.forEach(tv => {
        tv.progress += tv.speed;
        if (tv.progress > 1) tv.progress = 0;
        const [a,b] = CONNECTIONS[tv.conn];
        const p1 = cityPos[a], p2 = cityPos[b];
        const cp = bezierCtrl(p1,p2);
        const pt = bezierPt(p1, cp, p2, tv.progress);

        // Glow
        const dg = ctx.createRadialGradient(pt.x,pt.y,0,pt.x,pt.y,6);
        dg.addColorStop(0,'rgba(196,181,253,0.6)');
        dg.addColorStop(1,'rgba(0,0,0,0)');
        ctx.fillStyle = dg;
        ctx.fillRect(pt.x-6,pt.y-6,12,12);

        // White dot with purple ring
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 2.5, 0, Math.PI*2);
        ctx.fillStyle = '#fff';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 2.5, 0, Math.PI*2);
        ctx.strokeStyle = '#8B5CF6';
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
    { label: 'Gas cost',   value: '< $0.001' },
    { label: 'Uptime',     value: '99.9%' },
    { label: 'Chain ID',   value: '57073' },
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

        <div className="relative rounded-2xl overflow-hidden border border-white/[0.08]"
          style={{ height: 320, background: 'linear-gradient(180deg, #060412 0%, #020408 100%)' }}>
          <canvas ref={canvasRef} className="w-full h-full" style={{ display: 'block' }} />
          <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
            style={{ background: 'linear-gradient(to top, #04060f, transparent)' }} />
          <div className="absolute top-0 left-0 right-0 h-10 pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, #04060f, transparent)' }} />
          <div className="absolute left-0 top-0 bottom-0 w-16 pointer-events-none"
            style={{ background: 'linear-gradient(to right, #04060f, transparent)' }} />
          <div className="absolute right-0 top-0 bottom-0 w-16 pointer-events-none"
            style={{ background: 'linear-gradient(to left, #04060f, transparent)' }} />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {stats.map((s,i) => (
            <div key={i} className="p-5 rounded-2xl border border-white/[0.08] bg-white/[0.02] text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-white mb-1">{s.value}</div>
              <div className="font-mono text-[11px] uppercase tracking-widest text-[#6B7280]">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
