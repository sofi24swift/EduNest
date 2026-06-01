/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { STUDY_PLACES, PROGRAMS, OPPORTUNITIES } from '../data';
import { ScreenType, StudyPlace, Program, Opportunity } from '../types';
import { MapPin, BookOpen, GraduationCap, Search, Star, Wifi, Battery, Signal, Zap, Award, Calendar, Book, Sparkles } from 'lucide-react';

interface StaticScreensRowProps {
  onSelectScreen: (screen: ScreenType, argId?: string) => void;
}

export default function StaticScreensRow({ onSelectScreen }: StaticScreensRowProps) {
  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="flex flex-col gap-2">
        <h3 className="font-display text-2xl font-bold tracking-tight text-slate-800 flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-indigo-600 animate-pulse" />
          Multi-Screen Presentation Board
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed max-w-3xl">
          Pitch presentation layout showing our core customer journeys. Tapping the <span className="font-bold text-indigo-600">"Interactive Test-Drive"</span> on any board instantly shifts the focus of the live mobile emulator to that specific state!
        </p>
      </div>

      {/* Grid of screens */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 xl:grid-cols-3">
        
        {/* ========================================================= */}
        {/* CARD 1: HOME SCREEN MOCKUP */}
        {/* ========================================================= */}
        <div className="group relative flex flex-col items-center">
          <div className="absolute top-2 left-2 z-10 rounded-full bg-blue-600 text-white font-mono text-[9px] uppercase tracking-widest font-bold px-3 py-1 shadow-lg shadow-blue-500/20">
            UI Deck 01 // Home
          </div>
          
          {/* Simulated Phone Shell */}
          <div className="w-full max-w-[290px] rounded-[38px] border-[5px] border-slate-800 bg-slate-50 shadow-2xl transition duration-300 group-hover:-translate-y-1.5 group-hover:shadow-indigo-500/10 flex flex-col overflow-hidden">
            {/* Status Bar */}
            <div className="bg-white/80 backdrop-blur-md px-5 pt-3 pb-1 border-b border-slate-100 flex justify-between items-center text-[10px] text-slate-600 font-medium">
              <span className="font-mono">09:41</span>
              {/* Camera Island */}
              <div className="w-16 h-4 bg-slate-900 rounded-full" />
              <div className="flex items-center gap-1">
                <Signal className="w-3 h-3" />
                <Wifi className="w-3 h-3" />
                <div className="w-4 h-2 border border-slate-700 rounded-sm p-0.5 flex items-center">
                  <div className="w-full h-full bg-slate-700 rounded-2xs" />
                </div>
              </div>
            </div>

            {/* Core Content View */}
            <div className="flex-1 bg-white p-4 h-[440px] overflow-y-auto select-none">
              {/* Header section with Greeting */}
              <div className="flex items-center justify-between mt-1 mb-4">
                <div>
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest">Welcome Workspace</span>
                  <h4 className="font-display text-lg font-bold text-slate-800">Hello, Nika 👋</h4>
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-purple-100 overflow-hidden shadow-sm">
                  <img
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80"
                    alt="Nika User Avatar"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Slogan banner */}
              <div className="rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-500 text-white p-3.5 mb-4 shadow-md shadow-indigo-600/10">
                <span className="text-[8px] font-mono tracking-widest uppercase opacity-75">Platform Slogan</span>
                <p className="font-display text-xs font-bold leading-tight mt-0.5">“Your space. Your future.”</p>
                <p className="text-[10px] opacity-90 mt-1 leading-normal font-sans">Connecting students with high-speed quiet zones nearby.</p>
              </div>

              {/* Mock Search Bar */}
              <div className="rounded-full bg-slate-50 border border-slate-150 p-2.5 flex items-center gap-2 mb-4">
                <Search className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-xs text-slate-400 font-sans">Search places, programs, events...</span>
              </div>

              {/* Categories */}
              <h5 className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-2.5">Quick Hubs</h5>
              <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                <div className="rounded-xl border border-slate-100 bg-blue-50/50 p-2 flex flex-col items-center gap-1 cursor-pointer">
                  <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold text-blue-900">Places</span>
                </div>
                <div className="rounded-xl border border-slate-100 bg-purple-50/50 p-2 flex flex-col items-center gap-1 cursor-pointer">
                  <div className="w-7 h-7 rounded-lg bg-purple-600 text-white flex items-center justify-center">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold text-purple-900">Programs</span>
                </div>
                <div className="rounded-xl border border-slate-100 bg-teal-50/50 p-2 flex flex-col items-center gap-1 cursor-pointer">
                  <div className="w-7 h-7 rounded-lg bg-teal-600 text-white flex items-center justify-center">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold text-teal-900">Grants</span>
                </div>
              </div>

              {/* Featured Showcase */}
              <div className="mb-2">
                <div className="flex justify-between items-center mb-2">
                  <h6 className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Recommended Spaces</h6>
                  <span className="text-[9px] text-blue-600 font-bold">See All</span>
                </div>
                <div className="rounded-xl border border-slate-100 overflow-hidden bg-slate-50 flex gap-2.5 p-2 items-center">
                  <div className="w-14 h-14 rounded-lg overflow-hidden bg-slate-200 shrink-0">
                    <img src={STUDY_PLACES[0].image} className="w-full h-full object-cover" referrerPolicy="no-referrer" alt="" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h7 className="block text-[11px] font-bold text-slate-800 truncate">{STUDY_PLACES[0].name}</h7>
                    <span className="text-[10px] text-slate-500 font-sans block">{STUDY_PLACES[0].distance} · {STUDY_PLACES[0].type}</span>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Star className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
                      <span className="text-[10px] font-bold text-slate-700">{STUDY_PLACES[0].rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Simulated home button area */}
            <div className="bg-white border-t border-slate-100 py-1.5 flex justify-center">
              <div className="w-24 h-1 bg-slate-300 rounded-full" />
            </div>
          </div>

          <button
            onClick={() => onSelectScreen('home')}
            className="mt-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs py-2 px-5 shadow-lg shadow-indigo-500/20 flex items-center gap-2 transition"
          >
            <Zap className="w-3.5 h-3.5" />
            Interactive Test-Drive
          </button>
        </div>


        {/* ========================================================= */}
        {/* CARD 2: NEARBY PLACES DISCOVER FLOW */}
        {/* ========================================================= */}
        <div className="group relative flex flex-col items-center">
          <div className="absolute top-2 left-2 z-10 rounded-full bg-purple-600 text-white font-mono text-[9px] uppercase tracking-widest font-bold px-3 py-1 shadow-lg shadow-purple-500/20">
            UI Deck 02 // Places
          </div>

          {/* Simulated Phone Shell */}
          <div className="w-full max-w-[290px] rounded-[38px] border-[5px] border-slate-800 bg-slate-50 shadow-2xl transition duration-300 group-hover:-translate-y-1.5 group-hover:shadow-purple-500/10 flex flex-col overflow-hidden">
            {/* Status Bar */}
            <div className="bg-white/80 backdrop-blur-md px-5 pt-3 pb-1 border-b border-slate-100 flex justify-between items-center text-[10px] text-slate-600 font-medium">
              <span className="font-mono">09:41</span>
              <div className="w-16 h-4 bg-slate-900 rounded-full" />
              <div className="flex items-center gap-1">
                <Signal className="w-3 h-3" />
                <Wifi className="w-3 h-3" />
                <div className="w-4 h-2 border border-slate-700 rounded-sm p-0.5 flex items-center">
                  <div className="w-full h-full bg-slate-700 rounded-2xs" />
                </div>
              </div>
            </div>

            {/* Core Content View */}
            <div className="flex-1 bg-slate-50 p-3 h-[440px] overflow-y-auto select-none space-y-3">
              {/* Header and Toggle */}
              <div className="flex items-center justify-between pt-1">
                <h4 className="font-display text-sm font-bold text-slate-800">Study Places Discover</h4>
                {/* Simulated list/map toggle */}
                <div className="rounded-lg bg-purple-100/60 p-0.5 flex border border-purple-200 text-[10px] font-bold">
                  <span className="rounded-md bg-white px-2.5 py-0.5 text-purple-700 font-semibold shadow-2xs">List</span>
                  <span className="px-2.5 py-0.5 text-slate-500">Map</span>
                </div>
              </div>

              {/* Mini tag search filters preview */}
              <div className="flex gap-1.5 overflow-x-auto pb-1 block">
                <span className="rounded-full bg-purple-600 text-white px-2.5 py-0.5 text-[9px] font-bold shrink-0">⭐ Rated 4.8+</span>
                <span className="rounded-full bg-white border border-slate-200 text-slate-700 px-2.5 py-0.5 text-[9px] shrink-0">Quiet</span>
                <span className="rounded-full bg-white border border-slate-200 text-slate-700 px-2.5 py-0.5 text-[9px] shrink-0">Wi-Fi 6</span>
              </div>

              {/* Places Cards list - Render top 2 places */}
              {STUDY_PLACES.map((place) => (
                <div
                  key={place.id}
                  onClick={() => onSelectScreen('place-detail', place.id)}
                  className="rounded-2xl border border-slate-100 bg-white shadow-xs p-2.5 space-y-2 cursor-pointer hover:border-purple-200 transition"
                >
                  <div className="relative h-28 w-full rounded-xl overflow-hidden bg-slate-200">
                    <img src={place.image} className="w-full h-full object-cover" referrerPolicy="no-referrer" alt="" />
                    <div className="absolute top-2 right-2 rounded-lg bg-white/90 backdrop-blur-xs px-2 py-0.5 flex items-center gap-1 shadow-xs text-[10px] font-bold text-slate-800">
                      <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                      {place.rating}
                    </div>
                    {/* Distance Badge */}
                    <div className="absolute bottom-2 left-2 rounded bg-slate-900/70 text-white px-2 py-0.5 font-mono text-[9px]">
                      {place.distance} away
                    </div>
                  </div>

                  <div>
                    <h5 className="font-display text-xs font-bold text-slate-800 truncate">{place.name}</h5>
                    <p className="text-[10px] text-slate-500 font-sans truncate">{place.address}</p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {place.tags.slice(0, 3).map((tag, idx) => (
                        <span key={idx} className="rounded-sm bg-slate-100 px-1.5 py-0.5 text-[8px] font-semibold text-slate-600 font-sans">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Simulated home button area */}
            <div className="bg-white border-t border-slate-100 py-1.5 flex justify-center">
              <div className="w-24 h-1 bg-slate-300 rounded-full" />
            </div>
          </div>

          <button
            onClick={() => onSelectScreen('places')}
            className="mt-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs py-2 px-5 shadow-lg shadow-purple-500/20 flex items-center gap-2 transition"
          >
            <Zap className="w-3.5 h-3.5" />
            Interactive Test-Drive
          </button>
        </div>


        {/* ========================================================= */}
        {/* CARD 3: EDUCATIONAL PROGRAMS FLOW */}
        {/* ========================================================= */}
        <div className="group relative flex flex-col items-center">
          <div className="absolute top-2 left-2 z-10 rounded-full bg-teal-600 text-white font-mono text-[9px] uppercase tracking-widest font-bold px-3 py-1 shadow-lg shadow-teal-500/20">
            UI Deck 03 // Courses
          </div>

          {/* Simulated Phone Shell */}
          <div className="w-full max-w-[290px] rounded-[38px] border-[5px] border-slate-800 bg-slate-50 shadow-2xl transition duration-300 group-hover:-translate-y-1.5 group-hover:shadow-teal-500/10 flex flex-col overflow-hidden">
            {/* Status Bar */}
            <div className="bg-white/80 backdrop-blur-md px-5 pt-3 pb-1 border-b border-slate-100 flex justify-between items-center text-[10px] text-slate-600 font-medium">
              <span className="font-mono">09:41</span>
              <div className="w-16 h-4 bg-slate-900 rounded-full" />
              <div className="flex items-center gap-1">
                <Signal className="w-3 h-3" />
                <Wifi className="w-3 h-3" />
                <div className="w-4 h-2 border border-slate-700 rounded-sm p-0.5 flex items-center">
                  <div className="w-full h-full bg-slate-700 rounded-2xs" />
                </div>
              </div>
            </div>

            {/* Core Content View */}
            <div className="flex-1 bg-slate-50 p-3 h-[440px] overflow-y-auto select-none space-y-3">
              {/* Header and Toggle */}
              <div className="flex items-center justify-between pt-1">
                <h4 className="font-display text-sm font-bold text-slate-800">Premium Curriculums</h4>
                <div className="rounded bg-teal-50 text-teal-800 border border-teal-200 text-[8px] font-mono px-1.5 py-0.5 uppercase tracking-wider font-bold">
                  Verified Courses
                </div>
              </div>

              {/* Render top 2 programs */}
              {PROGRAMS.slice(0, 2).map((prog) => (
                <div
                  key={prog.id}
                  className="rounded-2xl border border-slate-100 bg-white p-2.5 shadow-xs space-y-2 hover:border-teal-200 transition"
                >
                  <div className="relative h-24 w-full rounded-xl overflow-hidden bg-slate-200">
                    <img src={prog.image} className="w-full h-full object-cover" referrerPolicy="no-referrer" alt="" />
                    <div className="absolute top-2 left-2 rounded bg-teal-600 text-white font-mono font-bold text-[9px] px-2 py-0.5">
                      {prog.category}
                    </div>
                    <div className="absolute bottom-2 right-2 rounded-full bg-white/95 px-2 py-0.5 flex items-center gap-0.5 text-[9px] font-bold text-slate-800">
                      <Star className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
                      {prog.rating}
                    </div>
                  </div>

                  <div>
                    <h5 className="font-display text-xs font-bold text-slate-800 leading-tight truncate">{prog.title}</h5>
                    <p className="text-[10px] text-slate-500 font-sans mt-0.5 truncate">{prog.provider}</p>

                    <div className="flex justify-between items-center mt-2.5 border-t border-slate-100 pt-2 text-[10px]">
                      <span className="font-sans font-semibold text-slate-500">{prog.duration}</span>
                      <span className="font-mono font-bold text-teal-600">{prog.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Simulated home button area */}
            <div className="bg-white border-t border-slate-100 py-1.5 flex justify-center">
              <div className="w-24 h-1 bg-slate-300 rounded-full" />
            </div>
          </div>

          <button
            onClick={() => onSelectScreen('programs')}
            className="mt-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs py-2 px-5 shadow-lg shadow-teal-500/20 flex items-center gap-2 transition"
          >
            <Zap className="w-3.5 h-3.5" />
            Interactive Test-Drive
          </button>
        </div>

      </div>
    </div>
  );
}
