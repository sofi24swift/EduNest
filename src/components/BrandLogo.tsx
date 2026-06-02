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
      {/* Abstract Logo */}
      <div 
        className="relative flex items-center justify-center shrink-0 rounded-2xl bg-gradient-to-tr from-blue-600 via-purple-600 to-teal-400 p-0.5 shadow-md shadow-purple-500/10"
        style={{ width: size, height: size }}
      >
        <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-white">
          <svg
            viewBox="0 0 100 100"
            className="w-[85%] h-[85%]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Outer Ring - Circular frame of gradient (matching image) */}
            <path
              d="M 21 62 A 32 32 0 1 1 79 62"
              stroke="url(#unitedLogoGrad)"
              strokeWidth="9.2"
              strokeLinecap="round"
              fill="none"
            />

            {/* Core Element 1: Graduation Mortarboard Cap in Slate-900 / Deep Black */}
            {/* Skull Cap Base under Diamond */}
            <path
              d="M 44.5 30 L 44.5 36.5 C 44.5 41, 55.5 41, 55.5 36.5 L 55.5 30 Z"
              fill="#0f172a"
            />
            {/* Diamond Top Plate */}
            <path
              d="M 50 19 L 71 27 L 50 35 L 29 27 Z"
              fill="#0f172a"
            />
            {/* Cap Button */}
            <circle cx="50" cy="27" r="1.5" fill="#0f172a" />
            {/* Tassel String */}
            <path
              d="M 50 27 C 60 27, 68 28, 68 33 L 68 39"
              stroke="#0f172a"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
            {/* Tassel Band */}
            <rect x="66.5" y="39" width="3" height="1.5" rx="0.5" fill="#0f172a" />
            {/* Tassel Brush Drop */}
            <rect x="66.5" y="41" width="3" height="10" rx="1.5" fill="#0f172a" />

            {/* Core Element 2: Stylized school desk with tapered splayed legs */}
            {/* Flat Table top */}
            <rect x="40" y="52" width="20" height="3.5" rx="1" fill="#0f172a" />
            {/* Support apron */}
            <rect x="42.5" y="55.5" width="15" height="2.5" fill="#0f172a" />
            {/* Left and Right tapered legs */}
            <polygon points="43.5,58 46.5,58 45,71 42.5,71" fill="#0f172a" />
            <polygon points="53.5,58 56.5,58 57.5,71 55,71" fill="#0f172a" />

            {/* Core Element 3: Dual layers of beautiful nested book pages wings */}
            {/* Top / Inner Book Wing (Left & Right) */}
            <path
              d="M 50 72 C 38 63, 28 60, 21 62 C 28 69, 38 74, 50 80 Z"
              fill="url(#unitedLogoGrad)"
            />
            <path
              d="M 50 72 C 62 63, 72 60, 79 62 C 72 69, 62 74, 50 80 Z"
              fill="url(#unitedLogoGrad)"
            />

            {/* Bottom / Outer Book Wing Layer */}
            <path
              d="M 50 80 C 38 75, 28 71, 22 73 C 29 80, 39 85, 50 89 Z"
              fill="url(#unitedLogoGrad)"
            />
            <path
              d="M 50 80 C 62 75, 72 71, 78 73 C 71 80, 61 85, 50 89 Z"
              fill="url(#unitedLogoGrad)"
            />

            {/* Connected Rainbow Gradient */}
            <defs>
              <linearGradient id="unitedLogoGrad" x1="15" y1="20" x2="85" y2="85" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#10b981" /> {/* Luminous Green-Teal */}
                <stop offset="30%" stopColor="#06b6d4" /> {/* Electric Cyan */}
                <stop offset="55%" stopColor="#2563eb" /> {/* Luminous Royal Blue */}
                <stop offset="80%" stopColor="#4f46e5" /> {/* Indigo */}
                <stop offset="100%" stopColor="#7c3aed" /> {/* Purple-Violet */}
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Brand Text Content */}
      {withText && (
        <div className="flex flex-col">
          <span className="font-display text-xl font-bold tracking-tight text-slate-900">
            Edu<span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Nest</span>
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
