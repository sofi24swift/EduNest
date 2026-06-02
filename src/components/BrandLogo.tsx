/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: number;
  withText?: boolean;
  withSlogan?: boolean;
}

export default function BrandLogo({
  className = '',
  size = 40,
  withText = false,
  withSlogan = false,
}: BrandLogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Abstract Logo matching the photo */}
      <div 
        className="relative flex items-center justify-center shrink-0 rounded-2xl bg-gradient-to-tr from-[#06b6d4] via-[#2563eb] to-[#7c3aed] shadow-sm shadow-indigo-500/15"
        style={{ width: size, height: size }}
      >
        <svg
          viewBox="0 0 64 64"
          className="w-[60%] h-[60%]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Graduation Cap Diamond Top Plate */}
          <path 
            d="M 32 15 L 54 24.5 L 32 34 L 10 24.5 Z" 
            fill="white" 
          />
          {/* Cap Base under Diamond */}
          <path 
            d="M 21.5 29 L 21.5 37 C 21.5 42, 42.5 42, 42.5 37 L 42.5 29" 
            stroke="white" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            fill="none" 
          />
          {/* Tassel String & Tassel Drop */}
          <path 
            d="M 32 24.5 C 41.5 24.5, 45.5 27, 45.5 32 L 45.5 38" 
            stroke="white" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            fill="none" 
          />
          <circle cx="45.5" cy="40" r="1.5" fill="white" />
        </svg>
      </div>

      {/* Brand Text Content */}
      {withText && (
        <div className="flex flex-col">
          <span className="font-display text-xl font-bold tracking-tight text-slate-900">
            Edu<span className="bg-gradient-to-r from-teal-500 via-blue-600 to-purple-600 bg-clip-text text-transparent">Nest</span>
          </span>
          {withSlogan && (
            <span className="font-sans text-[10px] font-medium tracking-wider uppercase text-slate-400">
              Your space. Your future.
            </span>
          )}
        </div>
      )}
    </div>
  );
}
