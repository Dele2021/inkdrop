"use client";

import { useId } from "react";

export function GhostLogo({ size = 32 }) {
  const gradId = useId();
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 3C11.4 3 6 8.4 6 15v12c0 1.2 0.6 2.4 1.8 3 0.6 0.6 1.8 0.6 2.4 0L12 28.8l1.8 1.2c0.6 0.6 1.8 0.6 2.4 0L18 28.8l1.8 1.2c0.6 0.6 1.8 0.6 2.4 0L24 28.8l1.8 1.2c0.6 0.6 1.8 0.6 2.4 0 1.2-0.6 1.8-1.8 1.8-3V15c0-6.6-5.4-12-12-12z"
        fill={`url(#ghost-grad-${gradId})`}
      />
      <circle cx="13.5" cy="16" r="2.5" fill="#000" />
      <circle cx="22.5" cy="16" r="2.5" fill="#000" />
      <defs>
        <linearGradient id={`ghost-grad-${gradId}`} x1="6" y1="3" x2="30" y2="33">
          <stop offset="0%" stopColor="#9E70FF" />
          <stop offset="100%" stopColor="#7132F5" />
        </linearGradient>
      </defs>
    </svg>
  );
}
