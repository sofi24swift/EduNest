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
            {/* Outer Ring - Open gradient circle (Swiss/Tech design) */}
            <path
              d="M 24 22 A 36 36 0 1 0 76 22"
              stroke="url(#ringGrad)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />

            {/* Core Element 1: Graduation Mortarboard Cap */}
            {/* Diamond top plate */}
            <path
              d="M 50 14 L 78 24 L 50 34 L 22 24 Z"
              fill="#0f172a"
              className="fill-slate-900"
            />
            {/* Cap bottom skull container */}
            <path
              d="M 33 24.5 V 30 C 33 34.5 67 34.5 67 30 V 24.5 Z"
              fill="#1e293b"
              className="fill-slate-800"
            />
            {/* Cap tassel */}
            <path
              d="M 50 24 L 75 25 L 75 36"
              stroke="#0f172a"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            {/* Tassel brush */}
            <line
              x1="75" y1="36" x2="75" y2="40"
              stroke="#0f172a"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Core Element 2: Stylized study desk table and stool underneath */}
            {/* Flat Table top */}
            <path
              d="M 33 46 H 67"
              stroke="#0f172a"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
            />
            {/* Table legs */}
            <path
              d="M 37 46 V 61"
              stroke="#0f172a"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 63 46 V 61"
              stroke="#0f172a"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
            {/* Stool chair seats */}
            <path
              d="M 43 54 H 57"
              stroke="#0f172a"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
            {/* Stool legs */}
            <path
              d="M 46 54 V 61"
              stroke="#0f172a"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 54 54 V 61"
              stroke="#0f172a"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />

            {/* Core Element 3: Dual layers of beautiful nested book pages wings */}
            {/* Top / Inner Book Wing (Left & Right) */}
            <path
              d="M 50 69 C 39 67 24 55 18 47 C 23 52 35 59 50 60 Z"
              fill="url(#leftPageGrad)"
            />
            <path
              d="M 50 69 C 61 67 76 55 82 47 C 77 52 65 59 50 60 Z"
              fill="url(#rightPageGrad)"
            />

            {/* Bottom / Outer Book Wing Layer */}
            <path
              d="M 50 78 C 36 76 22 66 16 57 C 21 61 33 67 50 68 Z"
              fill="url(#leftPageOuterGrad)"
            />
            <path
              d="M 50 78 C 64 76 78 66 84 57 C 79 61 67 67 50 68 Z"
              fill="url(#rightPageOuterGrad)"
            />

            {/* Gradients */}
            <defs>
              {/* Outer Ring Gradient - Teal to Indigo */}
              <linearGradient id="ringGrad" x1="24" y1="22" x2="76" y2="90" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#2dd4bf" /> {/* Teal */}
                <stop offset="50%" stopColor="#3b82f6" /> {/* Blue */}
                <stop offset="100%" stopColor="#6366f1" /> {/* Indigo */}
              </linearGradient>

              {/* Book Left wing gradients */}
              <linearGradient id="leftPageGrad" x1="18" y1="47" x2="50" y2="69" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#14b8a6" />
                <stop offset="100%" stopColor="#6366f1" />
              </linearGradient>
              {/* Book Right wing gradients */}
              <linearGradient id="rightPageGrad" x1="82" y1="47" x2="50" y2="69" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>

              {/* Book Outer bottom layers gradient */}
              <linearGradient id="leftPageOuterGrad" x1="16" y1="57" x2="50" y2="78" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#0d9488" />
                <stop offset="100%" stopColor="#4f46e5" />
              </linearGradient>
              <linearGradient id="rightPageOuterGrad" x1="84" y1="57" x2="50" y2="78" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#4f46e5" />
                <stop offset="100%" stopColor="#2563eb" />
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
