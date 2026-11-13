'use client';
import React, { useEffect, useRef } from 'react';
import { SpotlightCard } from './SpotlightCard';

const cards = [
  {
    tag: 'FREELANCERS',
    title: 'Get paid in seconds',
    desc: 'Share a link. Client pays in USDC. Funds arrive in your wallet instantly — no bank, no wait.',
    accent: '#8B5CF6',
    glow: 'rgba(139,92,246,0.12)',
  },
  {
    tag: 'GLOBAL SELLERS',
    title: 'No borders, no fees',
    desc: 'Accept payments from anywhere on earth. No currency conversion, no international transfer delays.',
    accent: '#6366F1',
    glow: 'rgba(99,102,241,0.10)',
  },
  {
    tag: 'BUSINESSES',
    title: 'Checkout without friction',
    desc: 'Create payment links in one click. Customers pay directly from their wallet — no signup required.',
    accent: '#A78BFA',
    glow: 'rgba(167,139,250,0.10)',
  },
];

export const NetworkSection = () => {
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

    const cx = W / 2, cy = H / 2;
    const R = Math.min(W, H) * 0.42;

    // Build geodesic grid points
    const gridLines = [];
    for (let lat = -75; lat <= 75; lat += 15) {
      const pts = [];
      for (let lon = 0; lon <= 361; lon += 2) {
        const phi = (lat * Math.PI) / 180;
        const theta = (lon * Math.PI) / 180;
        const x3 = R * Math.cos(phi) * Math.cos(theta);
        const y3 = R * Math.sin(phi);
        const z3 = R * Math.cos(phi) * Math.sin(theta);
        const sc = (R * 2.2) / (R * 2.2 + z3);
        pts.push({ x: cx + x3 * sc, y: cy - y3 * sc, z: z3 });
      }
      gridLines.push(pts);
    }
    for (let lon = 0; lon < 360; lon += 15) {
      const pts = [];
      for (let lat = -90; lat <= 90; lat += 2) {
        const phi = (lat * Math.PI) / 180;
        const theta = (lon * Math.PI) / 180;
        const x3 = R * Math.cos(phi) * Math.cos(theta);
        const y3 = R * Math.sin(phi);
        const z3 = R * Math.cos(phi) * Math.sin(theta);
        const sc = (R * 2.2) / (R * 2.2 + z3);
        pts.push({ x: cx + x3 * sc, y: cy - y3 * sc, z: z3 });
      }
      gridLines.push(pts);
    }

    // Purple/violet palette matching InkDrop
    const arcColors = [
      '#7132F5','#8B5CF6','#A78BFA','#C4B5FD',
      '#6366F1','#4F46E5','#9333EA','#7C3AED',
    ];

    // Only spawn arcs between points on the FRONT hemisphere (lon -90..90)
    function frontArc(i) {
      return {
        lat1: (Math.random() - 0.5) * 140,
        lon1: (Math.random() - 0.5) * 160,  // -80..80 front face
        lat2: (Math.random() - 0.5) * 140,
        lon2: (Math.random() - 0.5) * 160,
        color: arcColors[i % arcColors.length],
        progress: Math.random(),
        speed: 0.0025 + Math.random() * 0.003,
        trailLen: 0.1 + Math.random() * 0.08,
      };
    }
    const arcs = Array.from({ length: 14 }, (_, i) => frontArc(i));

    function latLonTo3D(lat, lon) {
      const phi = (lat * Math.PI) / 180;
      const theta = (lon * Math.PI) / 180;
      return {
        x: R * Math.cos(phi) * Math.cos(theta),
        y: R * Math.sin(phi),
        z: R * Math.cos(phi) * Math.sin(theta),
      };
    }

    function project(p) {
      const sc = (R * 2.2) / (R * 2.2 + p.z);
      return { x: cx + p.x * sc, y: cy - p.y * sc, z: p.z };
    }

    function slerp(a, b, t) {
      const dot = Math.max(-1, Math.min(1, (a.x*b.x + a.y*b.y + a.z*b.z) / (R*R)));
      const omega = Math.acos(dot);
      if (Math.abs(omega) < 0.001) return { x: a.x*(1-t)+b.x*t, y: a.y*(1-t)+b.y*t, z: a.z*(1-t)+b.z*t };
      const s = Math.sin(omega);
      return {
        x: (Math.sin((1-t)*omega)/s)*a.x + (Math.sin(t*omega)/s)*b.x,
        y: (Math.sin((1-t)*omega)/s)*a.y + (Math.sin(t*omega)/s)*b.y,
        z: (Math.sin((1-t)*omega)/s)*a.z + (Math.sin(t*omega)/s)*b.z,
      };
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);

      // Subtle radial glow at center
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 1.1);
      glow.addColorStop(0, 'rgba(113,50,245,0.06)');
      glow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, W, H);

      // Grid lines — front hemisphere brighter
      gridLines.forEach(pts => {
        for (let i = 1; i < pts.length; i++) {
          const p = pts[i], pp = pts[i-1];
          if (p.z < -R * 0.05 || pp.z < -R * 0.05) continue;
          const brightness = Math.max(0, (p.z + R) / (R * 2));
          ctx.beginPath();
          ctx.moveTo(pp.x, pp.y);
          ctx.lineTo(p.x, p.y);
          ctx.strokeStyle = `rgba(167,139,250,${0.08 + brightness * 0.1})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      });

      // Animated arcs with glow
      arcs.forEach(arc => {
        arc.progress += arc.speed;
        if (arc.progress > 1 + arc.trailLen) {
          const fresh = frontArc(Math.floor(Math.random() * arcColors.length));
          Object.assign(arc, fresh, { progress: -arc.trailLen });
        }

        const p1 = latLonTo3D(arc.lat1, arc.lon1);
        const p2 = latLonTo3D(arc.lat2, arc.lon2);
        const start = Math.max(0, arc.progress - arc.trailLen);
        const end = Math.min(1, arc.progress);
        if (start >= end) return;

        const steps = 50;
        const visiblePts = [];
        for (let s = 0; s <= steps; s++) {
          const frac = start + (end - start) * (s / steps);
          const p = slerp(p1, p2, frac);
          const proj = project(p);
          if (proj.z > 0) visiblePts.push({ ...proj, frac: s / steps });
        }
        if (visiblePts.length < 2) return;

        // Glow pass
        ctx.beginPath();
        visiblePts.forEach((pt, i) => i === 0 ? ctx.moveTo(pt.x, pt.y) : ctx.lineTo(pt.x, pt.y));
        ctx.strokeStyle = arc.color + '30';
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Sharp arc
        const alpha = Math.min(1, Math.min((arc.progress + arc.trailLen) / 0.15, (1 + arc.trailLen - arc.progress) / 0.2));
        ctx.beginPath();
        visiblePts.forEach((pt, i) => i === 0 ? ctx.moveTo(pt.x, pt.y) : ctx.lineTo(pt.x, pt.y));
        ctx.strokeStyle = arc.color + Math.round(alpha * 200).toString(16).padStart(2,'0');
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Bright head dot
        const last = visiblePts[visiblePts.length - 1];
        if (last && arc.progress < 1) {
          ctx.beginPath();
          ctx.arc(last.x, last.y, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = arc.color;
          ctx.fill();
          // Dot glow
          const dg = ctx.createRadialGradient(last.x, last.y, 0, last.x, last.y, 8);
          dg.addColorStop(0, arc.color + '60');
          dg.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = dg;
          ctx.fillRect(last.x - 8, last.y - 8, 16, 16);
        }
      });

      animFrame = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(animFrame);
  }, []);

  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06] bg-[#020408] overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(113,50,245,0.09) 0%, transparent 70%)' }} />
      <div className="max-w-7xl mx-auto relative">
        <div className="mb-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#A78BFA] font-semibold">[ 00 / NETWORK ]</span>
        </div>
        <div className="max-w-3xl mb-14">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Payments crossing borders in seconds.
          </h2>
          <p className="text-base sm:text-lg text-[#9CA3AF]">
            InkDrop runs on Ink — a global settlement layer that moves money like the internet moves information.
          </p>
        </div>

        <div className="relative rounded-2xl overflow-hidden border border-white/[0.08]"
          style={{ height: 420, background: 'radial-gradient(ellipse at 50% 50%, #0d0520 0%, #020408 75%)' }}>
          <canvas ref={canvasRef} className="w-full h-full" style={{ display: 'block' }} />
          <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
            style={{ background: 'linear-gradient(to top, #020408, transparent)' }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-8">
          {cards.map(c => (
            <SpotlightCard key={c.tag} className="flex flex-col" spotlightColor={c.glow}>
              <div className="absolute top-0 left-0 right-0 h-[2px] opacity-70"
                style={{ background: `linear-gradient(90deg, transparent, ${c.accent}, transparent)` }} />
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: c.accent }} />
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#9CA3AF] font-semibold">{c.tag}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{c.title}</h3>
              <p className="text-sm text-[#9CA3AF] leading-relaxed">{c.desc}</p>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
};
