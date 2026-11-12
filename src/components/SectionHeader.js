'use client';

import React from 'react';


export const SectionHeader = ({
 number,
 total = '08',
 tag,
 className = '',
}) => {
 return (
 <div
 className={`flex items-center gap-3 font-mono text-xs text-[#9CA3AF]/70 tracking-wider uppercase select-none ${className}`}
 aria-label={`Section ${number} of ${total}: ${tag}`}
 >
 <span className="text-[#8B5CF6] font-semibold">
 [ {number} / {total} ]
 </span>
 <span className="text-white/20">·</span>
 <span className="text-[#9CA3AF]/60">[ {tag} ]</span>
 </div>
 );
};
