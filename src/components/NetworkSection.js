'use client';
import { useEffect, useRef } from 'react';

export const NetworkSection = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animFrame;
    let t = 0;

    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;
    canvas.width = W * window.devicePixelRatio;
    canvas.height = H * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const cx = W / 2, cy = H / 2;
    const R = Math.min(W, H) * 0.38;

    // Geodesic sphere lines
    const gridLines = [];
    // Latitude rings
    for (let lat = -75; lat <= 75; lat += 15) {
      const pts = [];
      for (let lon = 0; lon <= 360; lon += 3) {
        const phi = (lat * Math.PI) / 180;
        const theta = (lon * Math.PI) / 180;
        const x3 = R * Math.cos(phi) * Math.cos(theta);
        const y3 = R * Math.sin(phi);
        const z3 = R * Math.cos(phi) * Math.sin(theta);
        // perspective
        const scale = (R * 2) / (R * 2 + z3);
        pts.push({ x: cx + x3 * scale, y: cy - y3 * scale, z: z3 });
      }
      gridLines.push(pts);
    }
    // Longitude meridians
    for (let lon = 0; lon < 360; lon += 15) {
      const pts = [];
      for (let lat = -90; lat <= 90; lat += 3) {
        const phi = (lat * Math.PI) / 180;
        const theta = (lon * Math.PI) / 180;
        const x3 = R * Math.cos(phi) * Math.cos(theta);
        const y3 = R * Math.sin(phi);
        const z3 = R * Math.cos(phi) * Math.sin(theta);
        const scale = (R * 2) / (R * 2 + z3);
        pts.push({ x: cx + x3 * scale, y: cy - y3 * scale, z: z3 });
      }
      gridLines.push(pts);
    }

    // Animated arcs — colorful, like doublezero
    const arcColors = ['#8B5CF6','#6366F1','#EC4899','#F59E0B','#10B981','#3B82F6','#EF4444','#F97316'];
    const arcs = Array.from({ length: 12 }, (_, i) => ({
      lat1: (Math.random() - 0.5) * 150,
      lon1: Math.random() * 360,
      lat2: (Math.random() - 0.5) * 150,
      lon2: Math.random() * 360,
      color: arcColors[i % arcColors.length],
      progress: Math.random(),
      speed: 0.003 + Math.random() * 0.004,
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
      const scale = (R * 2) / (R * 2 + p.z);
      return { x: cx + p.x * scale, y: cy - p.y * scale, z: p.z };
    }

    function slerp(a, b, t) {
      // spherical interpolation
      const dot = (a.x * b.x + a.y * b.y + a.z * b.z) / (R * R);
      const clamped = Math.max(-1, Math.min(1, dot));
      const omega = Math.acos(clamped);
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

      // Draw grid lines (only front-facing)
      gridLines.forEach(pts => {
        ctx.beginPath();
        let started = false;
        pts.forEach(p => {
          if (p.z > -R * 0.3) {
            const alpha = Math.max(0, (p.z + R * 0.3) / (R * 1.3));
            if (!started) { ctx.moveTo(p.x, p.y); started = true; }
            else ctx.lineTo(p.x, p.y);
          } else { started = false; }
        });
        ctx.strokeStyle = `rgba(170,170,180,${0.25})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      });

      // Draw arcs
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

        // Draw trail
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
          if (proj.z < -R * 0.1) continue; // behind sphere
          if (first) { ctx.moveTo(proj.x, proj.y); first = false; }
          else ctx.lineTo(proj.x, proj.y);
        }

        const alpha = Math.min(1, Math.min(arc.progress / 0.1, (1.3 - arc.progress) / 0.3));
        ctx.strokeStyle = arc.color + Math.round(alpha * 200).toString(16).padStart(2, '0');
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Dot at head
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

      t += 0.005;
      animFrame = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(animFrame);
  }, []);

  const cards = [
    {
      tag: 'FREELANCERS',
      title: 'Get paid in seconds',
      desc: 'Share a link. Client pays in USDC. Funds arrive in your wallet instantly — no bank, no wait.',
    },
    {
      tag: 'GLOBAL SELLERS',
      title: 'No borders, no fees',
      desc: 'Accept payments from anywhere. No currency conversion. No international transfer delays.',
    },
    {
      tag: 'BUSINESSES',
      title: 'Checkout without friction',
      desc: 'Create payment links in one click. Customers pay directly from their wallet — no signup required.',
    },
  ];

  return (
    <section className="bg-gray-50 py-24">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-light text-center text-gray-900 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
          Payments Without Borders
        </h2>
        <p className="text-center text-gray-500 mb-12 text-lg">Send USDC globally. Arrive instantly. Keep what you earn.</p>

        <div className="relative rounded-2xl overflow-hidden bg-white border border-gray-100" style={{ height: 420 }}>
          <canvas ref={canvasRef} className="w-full h-full" style={{ display: 'block' }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {cards.map((c, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-purple-500 inline-block" />
                <span className="text-xs font-semibold tracking-widest text-gray-500">{c.tag}</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{c.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
