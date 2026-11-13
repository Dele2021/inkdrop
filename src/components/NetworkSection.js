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
    accent: '#3B82F6',
    glow: 'rgba(59,130,246,0.10)',
  },
  {
    tag: 'BUSINESSES',
    title: 'Checkout without friction',
    desc: 'Create payment links in one click. Customers pay directly from their wallet — no signup required.',
    accent: '#10B981',
    glow: 'rgba(16,185,129,0.10)',
  },
];

export const NetworkSection = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animFrame;

    const resize = () => {
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      canvas.width = W * window.devicePixelRatio;
      canvas.height = H * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      return { W, H };
    };

    let { W, H } = resize();
    const cx = W / 2, cy = H / 2;
    const R = Math.min(W, H) * 0.38;

    // Build geodesic grid
    const gridLines = [];
    for (let lat = -75; lat <= 75; lat += 15) {
      const pts = [];
      for (let lon = 0; lon <= 360; lon += 3) {
        const phi = (lat * Math.PI) / 180;
        const theta = (lon * Math.PI) / 180;
        const x3 = R * Math.cos(phi) * Math.cos(theta);
        const y3 = R * Math.sin(phi);
        const z3 = R * Math.cos(phi) * Math.sin(theta);
        const sc = (R * 2) / (R * 2 + z3);
        pts.push({ x: cx + x3 * sc, y: cy - y3 * sc, z: z3 });
      }
      gridLines.push(pts);
    }
    for (let lon = 0; lon < 360; lon += 15) {
      const pts = [];
      for (let lat = -90; lat <= 90; lat += 3) {
        const phi = (lat * Math.PI) / 180;
        const theta = (lon * Math.PI) / 180;
        const x3 = R * Math.cos(phi) * Math.cos(theta);
        const y3 = R * Math.sin(phi);
        const z3 = R * Math.cos(phi) * Math.sin(theta);
        const sc = (R * 2) / (R * 2 + z3);
        pts.push({ x: cx + x3 * sc, y: cy - y3 * sc, z: z3 });
      }
      gridLines.push(pts);
    }

    const arcColors = ['#A78BFA', '#8B5CF6', '#7132F5', '#3B82F6', '#10B981', '#C4B5FD', '#6366F1', '#F59E0B'];

    const arcs = Array.from({ length: 10 }, (_, i) => ({
      lat1: (Math.random() - 0.5) * 150,
      lon1: Math.random() * 360,
      lat2: (Math.random() - 0.5) * 150,
      lon2: Math.random() * 360,
      color: arcColors[i % arcColors.length],
      progress: Math.random(),
      speed: 0.003 + Math.random() * 0.003,
    }));

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
      const sc = (R * 2) / (R * 2 + p.z);
      return { x: cx + p.x * sc, y: cy - p.y * sc, z: p.z };
    }

    function slerp(a, b, t) {
      const dot = Math.max(-1, Math.min(1, (a.x * b.x + a.y * b.y + a.z * b.z) / (R * R)));
      const omega = Math.acos(dot);
      if (Math.abs(omega) < 0.001) return a;
      const s = Math.sin(omega);
      return {
        x: (Math.sin((1 - t) * omega) / s) * a.x + (Math.sin(t * omega) / s) * b.x,
        y: (Math.sin((1 - t) * omega) / s) * a.y + (Math.sin(t * omega) / s) * b.y,
        z: (Math.sin((1 - t) * omega) / s) * a.z + (Math.sin(t * omega) / s) * b.z,
      };
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);

      // Grid lines
      gridLines.forEach(pts => {
        ctx.beginPath();
        let started = false;
        pts.forEach(p => {
          if (p.z > -R * 0.2) {
            if (!started) { ctx.moveTo(p.x, p.y); started = true; }
            else ctx.lineTo(p.x, p.y);
          } else { started = false; }
        });
        ctx.strokeStyle = 'rgba(167,139,250,0.12)';
        ctx.lineWidth = 0.5;
        ctx.stroke();
      });

      // Animated arcs
      arcs.forEach(arc => {
        arc.progress += arc.speed;
        if (arc.progress > 1.3) {
          arc.progress = -0.1;
          arc.lat1 = (Math.random() - 0.5) * 150;
          arc.lon1 = Math.random() * 360;
          arc.lat2 = (Math.random() - 0.5) * 150;
          arc.lon2 = Math.random() * 360;
        }

        const p1 = latLonTo3D(arc.lat1, arc.lon1);
        const p2 = latLonTo3D(arc.lat2, arc.lon2);
        const trailLen = 0.18;
        const start = Math.max(0, arc.progress - trailLen);
        const end = Math.min(1, arc.progress);
        if (start >= end) return;

        ctx.beginPath();
        const steps = 40;
        let first = true;
        for (let s = 0; s <= steps; s++) {
          const frac = start + (end - start) * (s / steps);
          const p = slerp(p1, p2, frac);
          const proj = project(p);
          if (proj.z < -R * 0.1) continue;
          if (first) { ctx.moveTo(proj.x, proj.y); first = false; }
          else ctx.lineTo(proj.x, proj.y);
        }

        const alpha = Math.min(1, Math.min(arc.progress / 0.1, (1.3 - arc.progress) / 0.3));
        const hex = Math.round(alpha * 220).toString(16).padStart(2, '0');
        ctx.strokeStyle = arc.color + hex;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Head dot
        if (arc.progress < 1) {
          const headPt = slerp(p1, p2, Math.min(1, arc.progress));
          const headProj = project(headPt);
          if (headProj.z > -R * 0.1) {
            ctx.beginPath();
            ctx.arc(headProj.x, headProj.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = arc.color;
            ctx.fill();
          }
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
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(113,50,245,0.08) 0%, transparent 70%)' }} />
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

        {/* Globe canvas */}
        <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] mb-10"
          style={{ height: 380, background: 'radial-gradient(ellipse at 50% 50%, #0d0520 0%, #020408 70%)' }}>
          <canvas ref={canvasRef} className="w-full h-full" style={{ display: 'block' }} />
          {/* Fade bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
            style={{ background: 'linear-gradient(to top, #020408, transparent)' }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {cards.map(c => (
            <SpotlightCard key={c.tag} className="flex flex-col" spotlightColor={c.glow}>
              <div className="absolute top-0 left-0 right-0 h-[2px] opacity-60"
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
