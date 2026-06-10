/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ScreenType, UserProfile } from './types';
import PhoneMockup from './components/PhoneMockup';
import { Smartphone } from 'lucide-react';

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
      setNavWarning("გთხოვთ, შექმნათ თქვენი მომხმარებლის პროფილი, სანამ ნავიგაციას გააგრძელებთ!");
      
      // Clear warning after 5 seconds
      setTimeout(() => setNavWarning(null), 5000);
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
  };

  return (
    <div id="edu-nest-app" className="min-h-screen bg-[#0f172a] text-slate-100 flex md:items-center md:justify-center select-none relative overflow-hidden">
      
      {/* Immersive radial glow backdrops to make the phone pop beautifully */}
      <div className="absolute top-[-15%] right-[-10%] w-[600px] h-[600px] bg-indigo-500/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-15%] left-[-10%] w-[550px] h-[550px] bg-teal-500/15 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-[40%] left-[20%] w-[350px] h-[350px] bg-purple-500/10 rounded-full blur-[110px] pointer-events-none" />

      {/* Centered Emulator Canvas */}
      <div className="relative flex flex-col items-center w-full h-screen md:h-auto md:max-w-md md:py-4">
        
        {/* Onboarding Visual Warning Banner */}
        {navWarning && (
          <div role="alert" className="mb-4 w-full p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs font-semibold leading-relaxed shadow-lg animate-pulse text-center absolute top-2 left-0 right-0 z-50 md:relative md:top-auto">
            <span className="font-bold">⚠️ საჭიროა ავტორიზაცია</span>
            <p className="mt-0.5 text-amber-300/90">{navWarning}</p>
          </div>
        )}

        <PhoneMockup 
          currentScreen={activeScreen}
          selectedPlaceId={selectedPlaceId}
          selectedProgramId={selectedProgramId}
          onScreenChange={handleSelectScreen}
          registeredUser={registeredUser}
          onRegister={handleRegister}
          onSignOut={handleSignOut}
        />
        
        {/* Subtle decorative presentation element beneath the phone */}
        <div className="mt-4 text-center hidden md:block">
          <span className="rounded-full bg-slate-800/60 border border-slate-700/40 px-3.5 py-1 text-[10px] font-bold text-slate-400 font-mono inline-flex items-center gap-1.5 shadow-md">
            <Smartphone className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
            EduNest • თბილისის სივრცეები
          </span>
        </div>
      </div>
    </div>
  );
}
