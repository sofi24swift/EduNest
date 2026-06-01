/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import BrandLogo from './BrandLogo';
import { Sparkles, Compass, AlertCircle, RefreshCw } from 'lucide-react';

export default function BrandGuide() {
  // Interactive mini utility: Noise and Crowd Optimizer
  const [ambientNoise, setAmbientNoise] = useState<number>(30); // in dB
  const [crowdDensity, setCrowdDensity] = useState<number>(40); // in %
  const [hasWifi6, setHasWifi6] = useState<boolean>(true);
  const [hasOutlets, setHasOutlets] = useState<boolean>(true);

  // Compute mock focus score
  const calculateFocusAbility = () => {
    let score = 100;
    // noise penalty: best noise is between 20-40dB. Above 45 penalizes score
    if (ambientNoise > 40) {
      score -= (ambientNoise - 40) * 1.2;
    } else if (ambientNoise < 20) {
      // too quiet has slight cabin fever penalty
      score -= (20 - ambientNoise) * 0.4;
    }
    
    // crowd penalty: above 60% full limits space and focus
    if (crowdDensity > 50) {
      score -= (crowdDensity - 50) * 0.8;
    }

    if (!hasWifi6) score -= 15;
    if (!hasOutlets) score -= 20;

    return Math.max(10, Math.min(100, Math.round(score)));
  };

  const focusScore = calculateFocusAbility();

  const getScoreTag = (score: number) => {
    if (score >= 85) return { text: 'Flow State Zone 🧘', color: 'text-teal-600 bg-teal-50 border-teal-200' };
    if (score >= 65) return { text: 'Efficient Work Mode ⚡', color: 'text-blue-600 bg-blue-50 border-blue-200' };
    if (score >= 45) return { text: 'Moderate Focus Zone ☕', color: 'text-amber-600 bg-amber-50 border-amber-200' };
    return { text: 'Distraction Alert ⚠️', color: 'text-rose-600 bg-rose-50 border-rose-200' };
  };

  const scoreInfo = getScoreTag(focusScore);

  return (
    <div id="brand-guide" className="rounded-3xl border border-slate-100 bg-white p-7 shadow-xl shadow-slate-200/50">
      {/* Header and Branding */}
      <div className="mb-6 flex flex-col justify-between gap-4 border-b border-slate-100 pb-5 md:flex-row md:items-center">
        <div>
          <BrandLogo withText={true} withSlogan={false} size={44} />
          <p className="mt-2 text-sm italic text-slate-500">"Your space. Your future."</p>
        </div>
        <div className="rounded-full border border-purple-150 bg-purple-50/50 px-4 py-1.5 text-xs font-semibold text-purple-700 flex items-center gap-1.5 self-start md:self-auto">
          <Sparkles className="w-3.5 h-3.5 text-purple-600" />
          Startup Pitch Design Spec
        </div>
      </div>

      {/* Brand Value Thesis */}
      <div className="mb-6">
        <h4 className="font-display text-sm font-bold uppercase tracking-wider text-slate-400">Project Mission</h4>
        <p className="mt-2 font-sans text-sm text-slate-600 leading-relaxed">
          The boundaries of education and workspaces are overlapping. Remote students and freelancers are routinely forced to choose between isolation at home or noisy, sub-standard cafes. 
          <strong> EduNest</strong> elegantly bridges this gap: transforming quiet spaces discovery, advanced online curricula, and remote grants into a unified, high-end ecosystem.
        </p>
      </div>

      {/* Design System Elements Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        
        {/* Colors & Typography Cards */}
        <div className="space-y-5 rounded-2xl border border-slate-100 bg-slate-50/50 p-5">
          <div>
            <h5 className="font-display text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Color Blueprint</h5>
            <div className="grid grid-cols-3 gap-3">
              {/* Focus Blue */}
              <div className="flex flex-col gap-1.5">
                <div className="h-10 w-full rounded-lg bg-blue-600 shadow-sm" />
                <span className="font-mono text-[10px] font-bold text-slate-700">Focus Blue</span>
                <span className="font-mono text-[9px] text-slate-400">#2563EB</span>
              </div>
              {/* Intelligence Violet */}
              <div className="flex flex-col gap-1.5">
                <div className="h-10 w-full rounded-lg bg-purple-600 shadow-sm" />
                <span className="font-mono text-[10px] font-bold text-slate-700">Intel Violet</span>
                <span className="font-mono text-[9px] text-slate-400">#7C3AED</span>
              </div>
              {/* Calm Teal */}
              <div className="flex flex-col gap-1.5">
                <div className="h-10 w-full rounded-lg bg-teal-500 shadow-sm" />
                <span className="font-mono text-[10px] font-bold text-slate-700">Calm Teal</span>
                <span className="font-mono text-[9px] text-slate-400">#0D9488</span>
              </div>
            </div>
          </div>

          <div>
            <h5 className="font-display text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Typography Setup</h5>
            <div className="space-y-2">
              <div className="flex justify-between items-baseline border-b border-slate-150 pb-1">
                <span className="text-xs text-slate-500 font-mono">Display Text:</span>
                <span className="text-sm font-semibold font-display text-slate-800">Space Grotesk</span>
              </div>
              <div className="flex justify-between items-baseline border-b border-slate-150 pb-1">
                <span className="text-xs text-slate-500 font-mono">UI Body:</span>
                <span className="text-sm font-medium font-sans text-slate-800">Inter Sans</span>
              </div>
              <div className="flex justify-between items-baseline pb-1">
                <span className="text-xs text-slate-500 font-mono">Metrics / Logs:</span>
                <span className="text-sm font-mono text-slate-800">JetBrains Mono</span>
              </div>
            </div>
          </div>
        </div>

        {/* Space Optimizer Core Interactive Widget */}
        <div className="rounded-2xl border border-slate-150 bg-slate-50/50 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Compass className="w-4 h-4 text-purple-600" />
              <h5 className="font-display text-xs font-bold uppercase tracking-widest text-slate-700">Environment Intelligence</h5>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed mb-4">
              Real-time calculations powering the <strong>EduNest Ambient Index Score (AIS)</strong>. Drag sliders to examine flow potential:
            </p>

            {/* Range Controls */}
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="font-semibold text-slate-700 font-sans">Ambient Noise Level</span>
                  <span className="font-mono font-bold text-slate-600">{ambientNoise} dB</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="90"
                  value={ambientNoise}
                  onChange={(e) => setAmbientNoise(Number(e.target.value))}
                  className="w-full accent-blue-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="font-semibold text-slate-700 font-sans">Crowd Capacity / Density</span>
                  <span className="font-mono font-bold text-slate-600">{crowdDensity}%</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="100"
                  value={crowdDensity}
                  onChange={(e) => setCrowdDensity(Number(e.target.value))}
                  className="w-full accent-purple-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                />
              </div>

              <div className="flex gap-4 pt-1.5">
                <label className="flex items-center gap-2 text-xs font-medium text-slate-600">
                  <input
                    type="checkbox"
                    checked={hasWifi6}
                    onChange={(e) => setHasWifi6(e.target.checked)}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
                  />
                  Wi-Fi 6 Speed
                </label>
                <label className="flex items-center gap-2 text-xs font-medium text-slate-600">
                  <input
                    type="checkbox"
                    checked={hasOutlets}
                    onChange={(e) => setHasOutlets(e.target.checked)}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
                  />
                  Power Plugs
                </label>
              </div>
            </div>
          </div>

          {/* Computed Output */}
          <div className="mt-4 pt-4 border-t border-slate-200 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">Ambient Flow Score</span>
              <span className="font-mono text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-teal-500 bg-clip-text text-transparent">
                {focusScore}/100
              </span>
            </div>
            <div className={`rounded-lg border text-[10px] font-bold px-2.5 py-1 ${scoreInfo.color}`}>
              {scoreInfo.text}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
