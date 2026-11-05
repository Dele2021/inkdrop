'use client';

import React from 'react';

export const InkDropLogo = ({
 className = '',
 size = 28,
}) => (
 <div className={`flex items-center gap-2.5 font-sans font-bold tracking-tight select-none ${className}`}>
 <div className="relative flex items-center justify-center">
 <svg
 width={size}
 height={size}
 viewBox="0 0 32 32"
 fill="none"
 xmlns="http://www.w3.org/2000/svg"
 className="transition-transform duration-300 hover:scale-105"
 >
 <path
 d="M16 3C16 3 7 14.8 7 21a9 9 0 0018 0c0-6.2-9-18-9-18z"
 fill="url(#inkdrop-grad)"
 />
 <path
 d="M13.5 17.5c0 3 2.5 5 5 5"
 stroke="#FFFFFF"
 strokeWidth="2"
 strokeLinecap="round"
 strokeOpacity="0.8"
 />
 <defs>
 <linearGradient id="inkdrop-grad" x1="16" y1="3" x2="16" y2="30" gradientUnits="userSpaceOnUse">
 <stop stopColor="#9462FF" />
 <stop offset="1" stopColor="#7132F5" />
 </linearGradient>
 </defs>
 </svg>
 {/* Glow pulse */}
 <div className="absolute inset-0 bg-[#7132F5]/40 blur-md rounded-full pointer-events-none -z-10" />
 </div>
 <span className="text-xl font-extrabold tracking-tight text-white flex items-center">
 INK<span className="text-[#8B5CF6]">DROP</span>
 </span>
 </div>
);

export const UsdcIcon = ({
 className = '',
 size = 20,
}) => (
 <svg
 width={size}
 height={size}
 viewBox="0 0 24 24"
 fill="none"
 xmlns="http://www.w3.org/2000/svg"
 className={`inline-block shrink-0 align-middle ${className}`}
 >
 <circle cx="12" cy="12" r="10.5" fill="#2775CA" />
 <path
 d="M13.8 14.5c0-1.1-.7-1.6-2.2-1.9-1.3-.2-1.6-.5-1.6-1.1 0-.6.5-1 1.4-1 .8 0 1.5.3 2 .8l.8-.9c-.6-.6-1.5-.9-2.3-1V8.5h-1v.9c-1.1.1-2 .8-2 1.9 0 1.1.7 1.6 2.2 1.9 1.4.3 1.6.6 1.6 1.1 0 .7-.6 1.2-1.6 1.2-1 0-1.8-.4-2.4-1.1l-.9.9c.7.9 1.8 1.3 2.8 1.4v.9h1v-.9c1.2-.1 2.2-.8 2.2-2.1z"
 fill="#FFFFFF"
 />
 </svg>
);

export const InkChainIcon = ({
 className = '',
 size = 20,
}) => (
 <svg
 width={size}
 height={size}
 viewBox="0 0 24 24"
 fill="none"
 xmlns="http://www.w3.org/2000/svg"
 className={`inline-block shrink-0 align-middle ${className}`}
 >
 <circle cx="12" cy="12" r="10.5" fill="#7132F5" />
 <path
 d="M12 6.5a5.5 5.5 0 00-5.5 5.5c0 3 2.5 5.5 5.5 5.5 2 0 3.7-1 4.7-2.6a1 1 0 10-1.7-1 3.5 3.5 0 01-3 1.6 3.5 3.5 0 01-3.5-3.5 3.5 3.5 0 013.5-3.5c1.2 0 2.2.6 2.8 1.5a1 1 0 001.7-1A5.5 5.5 0 0012 6.5z"
 fill="#FFFFFF"
 />
 <circle cx="12" cy="12" r="1.8" fill="#FFFFFF" />
 </svg>
);

export const EthIcon = ({
 className = '',
 size = 20,
}) => (
 <svg
 width={size}
 height={size}
 viewBox="0 0 24 24"
 fill="none"
 xmlns="http://www.w3.org/2000/svg"
 className={`inline-block shrink-0 align-middle ${className}`}
 >
 <circle cx="12" cy="12" r="10.5" fill="#1C1E26" stroke="#374151" strokeWidth="1" />
 <path d="M12 5l-4.5 7.5L12 15l4.5-2.5L12 5z" fill="#93C5FD" fillOpacity="0.8" />
 <path d="M12 16l-4.5-2.5L12 19l4.5-5.5L12 16z" fill="#60A5FA" />
 </svg>
);
