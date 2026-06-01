/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ScreenType, UserProfile } from './types';
import PhoneMockup from './components/PhoneMockup';
import BrandGuide from './components/BrandGuide';
import StaticScreensRow from './components/StaticScreensRow';
import BrandLogo from './components/BrandLogo';
import { 
  Sparkles, 
  Layers, 
  MapPin, 
  BookOpen, 
  Activity, 
  HelpCircle, 
  Tablet, 
  Smartphone, 
  CheckCircle2, 
  Zap,
  Volume2,
  Clock,
  ExternalLink
} from 'lucide-react';

export default function App() {
  // Global interactive states
  const [registeredUser, setRegisteredUser] = useState<UserProfile | null>(() => {
    try {
      const savedProfile = localStorage.getItem('edunest_user_profile');
      return savedProfile ? JSON.parse(savedProfile) : null;
    } catch {
      return null;
    }
  });

  const [activeScreen, setActiveScreen] = useState<ScreenType>(() => {
    try {
      const savedProfile = localStorage.getItem('edunest_user_profile');
      return savedProfile ? 'home' : 'registration';
    } catch {
      return 'registration';
    }
  });

  const [selectedPlaceId, setSelectedPlaceId] = useState<string>('place-1');
  const [selectedProgramId, setSelectedProgramId] = useState<string>('prog-1');
  const [sensorStatus, setSensorStatus] = useState<string>('Idle / Auto-Optimized');
  const [navWarning, setNavWarning] = useState<string | null>(null);

  const handleRegister = (profile: UserProfile) => {
    setRegisteredUser(profile);
    localStorage.setItem('edunest_user_profile', JSON.stringify(profile));
    setActiveScreen('home');
    setNavWarning(null);
  };

  const handleSignOut = () => {
    setRegisteredUser(null);
    localStorage.removeItem('edunest_user_profile');
    setActiveScreen('registration');
  };

  // Triggering visual state changes on the mock phone
  const handleSelectScreen = (screen: ScreenType, argId?: string) => {
    // If not registered, force user to register first
    if (!registeredUser && screen !== 'registration') {
      setActiveScreen('registration');
      setNavWarning("Please build and submit your user profile inside the iPhone emulator registration page first!");
      
      // Clear warning after 5 seconds
      setTimeout(() => setNavWarning(null), 5000);
      
      const emulator = document.getElementById('phone-emulator-container');
      if (emulator) {
        emulator.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setActiveScreen(screen);
    setNavWarning(null);

    if ((screen === 'place-detail' || screen === 'places') && argId) {
      setSelectedPlaceId(argId);
    }
    if ((screen === 'program-detail' || screen === 'programs') && argId) {
      setSelectedProgramId(argId);
    }
    
    // Auto scroll the browser window up to let the user see the change instantly in the Phone emulator
    const emulator = document.getElementById('phone-emulator-container');
    if (emulator) {
      emulator.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Mock sensory override effects
  const triggerQuietMode = () => {
    setSensorStatus('Spiked: Silent hour telemetry active (-25 dB)');
    setTimeout(() => setSensorStatus('Running live calibration...'), 5000);
  };

  const triggerCrowdRush = () => {
    setSensorStatus('Spiked: High-School study group spike registered');
    setTimeout(() => setSensorStatus('Running live calibration...'), 5000);
  };

  return (
    <div id="edu-nest-app" className="min-h-screen bg-slate-50 bg-fluid-radial text-slate-800 font-sans selection:bg-indigo-100 selection:text-indigo-950 px-4 md:px-0 relative overflow-hidden">
      
      {/* Immersive UI Background Blobs */}
      <div className="absolute top-[-10%] right-[-5%] -z-10 w-[600px] h-[600px] bg-indigo-200/40 rounded-full blur-[130px] opacity-75 pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] -z-10 w-[550px] h-[550px] bg-teal-100/40 rounded-full blur-[120px] opacity-75 pointer-events-none" />
      <div className="absolute top-[40%] left-[30%] -z-10 w-[300px] h-[300px] bg-purple-200/30 rounded-full blur-[100px] opacity-60 pointer-events-none" />

      {/* Main Container */}
      <div className="mx-auto max-w-7xl px-5 py-6 space-y-10 md:px-12 md:py-10">
        
        {/* Navigation Bar Header */}
        <header id="nav-header" className="flex flex-col justify-between gap-5 border-b border-slate-200/60 pb-6 md:flex-row md:items-center">
          <div className="flex items-center gap-2">
            <BrandLogo withText={true} withSlogan={true} size={48} />
          </div>

          {/* Slogan, Status & Links */}
          <div className="flex flex-wrap items-center gap-4 text-sm font-semibold text-slate-500">
            <span className="hidden sm:inline font-sans font-semibold text-slate-500 text-xs">
              Your space. Your future.
            </span>
            <div className="hidden sm:block h-4 w-[1px] bg-slate-300" />
            
            {/* Real-time Indicator Badge */}
            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100/60 px-3 py-1 rounded-full text-emerald-800 text-[11px] font-mono shadow-2xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Platform Live
            </div>

            <div className="flex items-center gap-2">
              <a 
                href="#phone-emulator-container"
                className="rounded-xl border border-slate-200/80 bg-white hover:bg-slate-50 text-slate-600 font-semibold text-xs py-2 px-3.5 shadow-xs flex items-center gap-1.5 transition"
              >
                <Smartphone className="w-4 h-4 text-slate-500" />
                Live Demo
              </a>
              <a 
                href="#brand-guide"
                className="rounded-xl border border-slate-200/80 bg-white hover:bg-slate-50 text-slate-600 font-semibold text-xs py-2 px-3.5 shadow-xs flex items-center gap-1.5 transition"
              >
                <Layers className="w-4 h-4 text-slate-500" />
                Tokens
              </a>
            </div>
          </div>
        </header>

        {/* SECTION 1: EMULATOR + CONTROLLER CORE PLAYGROUND */}
        <section id="demo-playground" className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start mt-6">
          
          {/* LEFT PANEL: Interactive Mobile Phone Mockup (Col span 5) */}
          <div id="phone-emulator-container" className="lg:col-span-5 flex flex-col items-center">
            <div className="mb-4 text-center w-full max-w-[320px]">
              <span className="rounded-full bg-indigo-50 border border-indigo-150 px-3.5 py-1 text-[11px] font-bold text-indigo-700 font-mono inline-flex items-center gap-1.5 shadow-3xs">
                <Smartphone className="w-3.5 h-3.5 animate-bounce" />
                Click Viewports Below & Taps on Screen
              </span>
              <p className="text-[11px] text-slate-400 font-sans mt-1.5">Fully operational simulation of iPhone 15 Pro hardware</p>
              
              {/* Onboarding Visual Warning Banner */}
              {navWarning && (
                <div role="alert" className="mt-3 p-3 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-900 text-[11px] font-medium leading-relaxed shadow-md animate-pulse">
                  <span className="font-bold">⚠️ Onboarding Required</span>
                  <p className="mt-0.5 text-amber-800">{navWarning}</p>
                </div>
              )}
            </div>

            <PhoneMockup 
              currentScreen={activeScreen}
              selectedPlaceId={selectedPlaceId}
              selectedProgramId={selectedProgramId}
              onScreenChange={handleSelectScreen}
              registeredUser={registeredUser}
              onRegister={handleRegister}
              onSignOut={handleSignOut}
            />
          </div>

          {/* RIGHT PANEL: Live Calibration Control Deck & Tech Specs (Col span 7) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Value Proposition Hero Card */}
            <div className="rounded-3xl border border-slate-100 bg-white/90 backdrop-blur-md p-6 md:p-8 shadow-xl shadow-slate-200/30 relative overflow-hidden flex flex-col justify-between card-spring">
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-indigo-100/30 via-purple-100/20 to-transparent -z-10 rounded-bl-[100px]" />
              
              <div className="space-y-4">
                <span className="rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-mono text-[9px] uppercase tracking-widest font-bold px-3.5 py-1 inline-block">
                  PRODUCT VISION
                </span>
                
                <h1 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 leading-tight">
                  Discover quiet <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-500 bg-clip-text text-transparent">study spaces</span> & build your future in deep flow.
                </h1>
                
                <p className="text-sm text-slate-600 font-sans leading-relaxed">
                  EduNest couples spatial telemetry sensors with advanced curricula and fellowships, helping students discover, work, and secure qualifications free from cognitive clutter.
                </p>
              </div>

              {/* Quick Metrics display */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-100 mt-6 text-center">
                <div className="space-y-1">
                  <span className="text-lg font-bold text-indigo-600 font-display">14+</span>
                  <p className="text-[11px] text-slate-400 font-semibold font-sans uppercase">Ambient Cafes</p>
                </div>
                <div className="space-y-1">
                  <span className="text-lg font-bold text-purple-600 font-display">250+</span>
                  <p className="text-[11px] text-slate-400 font-semibold font-sans uppercase">Online Syllabuses</p>
                </div>
                <div className="space-y-1">
                  <span className="text-lg font-bold text-teal-600 font-display">$85K+</span>
                  <p className="text-[11px] text-slate-400 font-semibold font-sans uppercase">Active Grants</p>
                </div>
              </div>
            </div>

            {/* Live Sensory Override calibration signals controller */}
            <div className="rounded-3xl border border-slate-100 bg-white/95 p-6 shadow-md card-spring">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-4">
                <Activity className="w-5 h-5 text-indigo-600 animate-pulse" />
                <div>
                  <h3 className="font-display text-sm font-bold text-slate-900 uppercase tracking-wide">Sensory Simulator Override</h3>
                  <p className="text-[11px] text-slate-400 font-sans">Simulate continuous ambient IoT feedback streams</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-xl text-xs font-semibold">
                  <span className="text-slate-500 font-sans">IoT Hub Status Indicator:</span>
                  <span className="font-mono text-indigo-700 bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded-lg animate-pulse">
                    {sensorStatus}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3.5">
                  {/* BUTTON A */}
                  <button
                    onClick={triggerQuietMode}
                    className="group rounded-2xl border border-indigo-100 bg-indigo-50/20 hover:bg-indigo-50 p-4 flex flex-col justify-between text-left transition duration-200 cursor-pointer"
                  >
                    <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center mb-2 shadow-xs group-hover:scale-105 transition">
                      <Volume2 className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block font-display text-[12px] font-bold text-indigo-950">Engage Silent Study Hour</span>
                      <span className="text-[10px] text-indigo-600 mt-1 block">Drops all workspace decibels to quiet levels in real-time</span>
                    </div>
                  </button>

                  {/* BUTTON B */}
                  <button
                    onClick={triggerCrowdRush}
                    className="group rounded-2xl border border-rose-100 bg-rose-50/10 hover:bg-rose-50 p-4 flex flex-col justify-between text-left transition duration-200 cursor-pointer"
                  >
                    <div className="w-7 h-7 rounded-lg bg-rose-600 text-white flex items-center justify-center mb-2 shadow-xs group-hover:scale-105 transition">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block font-display text-[12px] font-bold text-rose-950">Afternoon Coffee Rush</span>
                      <span className="text-[10px] text-rose-600 mt-1 block">Fills coworking spaces to high occupancy ratios</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Design system Guidelines panel */}
            <BrandGuide />

          </div>

        </section>

        {/* SECTION 2: THE PRESENTATION BOARD OF SCREENS */}
        <section id="board-grid" className="pt-10 border-t border-slate-200/80">
          <StaticScreensRow onSelectScreen={handleSelectScreen} />
        </section>

        {/* Footer info brand */}
        <footer className="pt-10 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center text-xs text-slate-400 gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-600 font-display">EduNest Dashboard Applet</span>
            <span>·</span>
            <span>All sensory indicators calculated natively in client React state</span>
          </div>
          <div>
            <span>Developed for Sopio Chutlashvili · Georgia Tech Alliance &copy; 2026</span>
          </div>
        </footer>

      </div>
    </div>
  );
}
