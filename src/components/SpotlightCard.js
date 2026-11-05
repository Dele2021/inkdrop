'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState } from 'react';
import { playMicroSound } from '../utils/sound';


export const SpotlightCard = ({
 children,
 className = '',
 spotlightColor = 'rgba(113, 50, 245, 0.16)',
 showCorners = true,
 onMouseEnter,
 ...props
}) => {
 const cardRef = useRef(null);
 const [position, setPosition] = useState({ x: 0, y: 0 });
 const [isHovered, setIsHovered] = useState(false);

 const handleMouseMove = (e) => {
 if (!cardRef.current) return;
 const rect = cardRef.current.getBoundingClientRect();
 setPosition({
 x: e.clientX - rect.left,
 y: e.clientY - rect.top,
 });
 };

 const handleMouseEnter = (e) => {
 setIsHovered(true);
 playMicroSound('tick');
 if (onMouseEnter) onMouseEnter(e);
 };

 const handleMouseLeave = () => {
 setIsHovered(false);
 };

 return (
 <div
 ref={cardRef}
 onMouseMove={handleMouseMove}
 onMouseEnter={handleMouseEnter}
 onMouseLeave={handleMouseLeave}
 className={`relative rounded-2xl bg-[#080b12]/90 border border-white/10 overflow-hidden transition-all duration-300 group ${className}`}
 {...props}
 >
 {/* Dynamic Cursor Spotlight Beam */}
 <div
 className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300 opacity-0 group-hover:opacity-100 z-0"
 style={{
 background: isHovered
 ? `radial-gradient(400px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 75%)`
 : undefined,
 }}
 />

 {/* Dynamic Edge Border Highlight */}
 <div
 className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300 opacity-0 group-hover:opacity-100 z-0 border border-[#7132F5]/40"
 style={{
 maskImage: isHovered
 ? `radial-gradient(220px circle at ${position.x}px ${position.y}px, black, transparent)`
 : undefined,
 WebkitMaskImage: isHovered
 ? `radial-gradient(220px circle at ${position.x}px ${position.y}px, black, transparent)`
 : undefined,
 }}
 />

 {/* Cyberpunk/Fintech Corner Crosshairs (blackalgo.com style) */}
 {showCorners && (
 <>
 <span className="absolute top-2 left-2.5 font-mono text-[9px] text-white/20 group-hover:text-[#A78BFA] transition-colors pointer-events-none select-none z-10">
 +
 </span>
 <span className="absolute top-2 right-2.5 font-mono text-[9px] text-white/20 group-hover:text-[#A78BFA] transition-colors pointer-events-none select-none z-10">
 +
 </span>
 <span className="absolute bottom-2 left-2.5 font-mono text-[9px] text-white/20 group-hover:text-[#A78BFA] transition-colors pointer-events-none select-none z-10">
 +
 </span>
 <span className="absolute bottom-2 right-2.5 font-mono text-[9px] text-white/20 group-hover:text-[#A78BFA] transition-colors pointer-events-none select-none z-10">
 +
 </span>
 </>
 )}

 {/* Content */}
 <div className="relative z-10">{children}</div>
 </div>
 );
};
