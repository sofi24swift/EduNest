/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  StudyPlace, 
  Program, 
  Opportunity, 
  ScreenType, 
  Review,
  UserProfile
} from '../types';
import { 
  STUDY_PLACES, 
  PROGRAMS, 
  OPPORTUNITIES 
} from '../data';
import { 
  MapPin, 
  BookOpen, 
  GraduationCap, 
  Home, 
  Search, 
  Star, 
  Wifi, 
  Battery, 
  Signal, 
  Clock, 
  VolumeX, 
  Volume2,
  Tv, 
  Grid, 
  Users, 
  Send, 
  Share2, 
  Compass, 
  ChevronLeft, 
  CircleDot, 
  Filter,
  Layers,
  Sparkles,
  ArrowRight,
  Info,
  Calendar,
  Lock,
  User,
  CheckCircle2,
  AlertCircle,
  HelpCircle
} from 'lucide-react';

interface PhoneMockupProps {
  currentScreen: ScreenType;
  selectedPlaceId?: string;
  selectedProgramId?: string;
  onScreenChange: (screen: ScreenType, argId?: string) => void;
  registeredUser: UserProfile | null;
  onRegister: (profile: UserProfile) => void;
  onSignOut: () => void;
}

export default function PhoneMockup({
  currentScreen,
  selectedPlaceId,
  selectedProgramId,
  onScreenChange,
  registeredUser,
  onRegister,
  onSignOut,
}: PhoneMockupProps) {
  // App states
  const [placesList, setPlacesList] = useState<StudyPlace[]>(STUDY_PLACES);
  const [placesSearch, setPlacesSearch] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  
  // Programs screen filters
  const [selectedProgCategory, setSelectedProgCategory] = useState<'All' | 'Tech' | 'Languages' | 'Business' | 'Exams'>('All');
  const [programsPriceFilter, setProgramsPriceFilter] = useState<'All' | 'Free' | 'Paid'>('All');
  
  // Opportunities screen filters
  const [selectedOppType, setSelectedOppType] = useState<'All' | 'Scholarship' | 'Internship' | 'Remote Work'>('All');

  // Registration form values
  const [regName, setRegName] = useState('Nika');
  const [regGoal, setRegGoal] = useState('Tech');
  const [regMode, setRegMode] = useState<'Online' | 'Offline' | 'Distant' | 'Hybrid'>('Online');
  const [regAvatar, setRegAvatar] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80');

  // Enrollment state
  const [enrolledProgramIds, setEnrolledProgramIds] = useState<string[]>([]);
  const [enrollmentEmail, setEnrollmentEmail] = useState('sopia.chutlashvilite04@geolab.edu.ge');
  const [enrollSuccessMessage, setEnrollSuccessMessage] = useState(false);

  const AVATARS = [
    { name: 'Sopia Scholar', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80' },
    { name: 'Nika Dev', url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80' },
    { name: 'Global Nomad', url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80' },
    { name: 'Design Architect', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80' }
  ];

  // New review state
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [reviewError, setReviewError] = useState('');

  // Find currently active place for details
  const activePlace = useMemo(() => {
    return placesList.find(p => p.id === (selectedPlaceId || 'place-1')) || placesList[0];
  }, [placesList, selectedPlaceId]);

  // Find currently active program for detailed description
  const activeProgram = useMemo(() => {
    return PROGRAMS.find(p => p.id === (selectedProgramId || 'prog-1')) || PROGRAMS[0];
  }, [selectedProgramId]);

  const [profileSheetOpen, setProfileSheetOpen] = useState(false);

  // Filtered Places for Discovery Screen
  const filteredPlaces = useMemo(() => {
    if (!placesSearch.trim()) return placesList;
    const term = placesSearch.toLowerCase();
    return placesList.filter(p => 
      p.name.toLowerCase().includes(term) || 
      p.type.toLowerCase().includes(term) || 
      p.address.toLowerCase().includes(term) ||
      p.tags.some(tag => tag.toLowerCase().includes(term))
    );
  }, [placesList, placesSearch]);

  // Filtered Programs
  const filteredPrograms = useMemo(() => {
    return PROGRAMS.filter(p => {
      const matchCat = selectedProgCategory === 'All' || p.category === selectedProgCategory;
      const matchPrice = programsPriceFilter === 'All' || p.priceType === programsPriceFilter;
      return matchCat && matchPrice;
    });
  }, [selectedProgCategory, programsPriceFilter]);

  // Filtered Opportunities
  const filteredOpportunities = useMemo(() => {
    return OPPORTUNITIES.filter(o => {
      return selectedOppType === 'All' || o.type === selectedOppType;
    });
  }, [selectedOppType]);

  // Submit Interactive Review handler
  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) {
      setReviewError('Please fill out your name and write a comment.');
      return;
    }

    const addedRev: Review = {
      id: `user-rev-${Date.now()}`,
      author: newReviewAuthor.trim(),
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      rating: newReviewRating,
      date: 'Just now',
      comment: newReviewComment.trim()
    };

    // Update places list with this review and recalculate average rating
    const updated = placesList.map(p => {
      if (p.id === activePlace.id) {
        const nextReviews = [addedRev, ...p.reviews];
        const nextAvg = parseFloat(
          (nextReviews.reduce((sum, r) => sum + r.rating, 0) / nextReviews.length).toFixed(1)
        );
        return {
          ...p,
          reviews: nextReviews,
          reviewsCount: nextReviews.length,
          rating: nextAvg
        };
      }
      return p;
    });

    setPlacesList(updated);
    setNewReviewAuthor('');
    setNewReviewComment('');
    setNewReviewRating(5);
    setReviewError('');
  };

  // Noise helper badge
  const getNoiseLabel = (noise: number) => {
    if (noise < 20) return { text: 'Silent Focus', color: 'bg-emerald-50 text-emerald-700 border-emerald-100' };
    if (noise < 35) return { text: 'Quiet Ambient', color: 'bg-teal-50 text-teal-700 border-teal-100' };
    if (noise < 55) return { text: 'Moderate Vibe', color: 'bg-amber-50 text-amber-700 border-amber-100' };
    return { text: 'Social Buzz', color: 'bg-rose-50 text-rose-700 border-rose-100' };
  };

  // Crowd capacity helper
  const getCrowdLabel = (pct: number) => {
    if (pct < 30) return { text: 'Plenty of Seats', color: 'text-emerald-600' };
    if (pct < 65) return { text: 'Filling Up Slow', color: 'text-amber-600' };
    return { text: 'Almost Full Capacity', color: 'text-rose-600 font-bold animate-pulse' };
  };

  return (
    <div className="relative mx-auto w-full max-w-[360px] rounded-[52px] border-[12px] border-slate-900 bg-slate-950 p-0.5 iphone-bezel select-none overflow-hidden">
      
      {/* Camera Notch Dynamic Island */}
      <div className="absolute top-4 left-1/2 z-50 h-[30px] w-[110px] -translate-x-1/2 rounded-full bg-black flex items-center justify-between px-2.5 shadow-inner">
        <div className="h-2 w-2 rounded-full bg-slate-900/60" />
        <div className="h-1 text-[8px] text-green-400 font-mono flex items-center gap-1">
          <CircleDot className="w-2 h-2 animate-ping" />
          <span className="text-[7px]">EduNest-Live</span>
        </div>
        <div className="h-1 w-4 rounded-full bg-slate-900" />
      </div>

      {/* Screen Container */}
      <div className="h-[680px] w-full rounded-[40px] bg-slate-50 flex flex-col overflow-hidden relative">

        {/* Dynamic iOS status bar */}
        <div className="bg-white/95 backdrop-blur-md px-7 pt-4 pb-1.5 border-b border-slate-100 flex justify-between items-center text-xs text-slate-800 font-semibold z-40 shrink-0">
          <span className="font-sans font-bold select-none">09:41 AM</span>
          <div className="flex items-center gap-1.5">
            <Signal className="w-3.5 h-3.5 text-slate-800" />
            <Wifi className="w-3.5 h-3.5 text-slate-800" />
            <div className="h-3 w-6 border-2 border-slate-800 rounded-md p-0.5 flex items-center bg-transparent gap-0.5">
              <div className="w-3 h-1.5 bg-slate-800 rounded-xs" />
            </div>
          </div>
        </div>

        {/* Dynamic Nav Tree Body with AnimatePresence */}
        <div className="flex-1 overflow-y-auto pb-20 relative">
          <AnimatePresence mode="wait">

            {/* 0. REGISTRATION ONBOARDING SCREEN */}
            {currentScreen === 'registration' && (
              <motion.div
                key="registration"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="p-5 space-y-6"
              >
                {/* Brand Showcase */}
                <div className="text-center space-y-2 mt-4 inline-block w-full">
                  <div className="flex justify-center">
                    <div className="w-18 h-18 rounded-2xl bg-white p-2.5 shadow-md shadow-indigo-100 flex items-center justify-center border border-indigo-50/50">
                      <svg
                        viewBox="0 0 100 100"
                        className="w-full h-full"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M 24 22 A 36 36 0 1 0 76 22"
                          stroke="url(#ringGradReg)"
                          strokeWidth="7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          fill="none"
                        />
                        <path
                          d="M 50 14 L 78 24 L 50 34 L 22 24 Z"
                          fill="#4f46e5"
                        />
                        <path
                          d="M 33 24.5 V 30 C 33 34.5 67 34.5 67 30 V 24.5 Z"
                          fill="#312e81"
                        />
                        <path
                          d="M 50 24 L 75 25 L 75 36"
                          stroke="#312e81"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          fill="none"
                        />
                        <defs>
                          <linearGradient id="ringGradReg" x1="24" y1="22" x2="76" y2="90" gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stopColor="#2dd4bf" />
                            <stop offset="100%" stopColor="#6366f1" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h2 className="font-display text-2xl font-black tracking-tight text-slate-900">EduNest</h2>
                    <p className="text-[11px] text-slate-500 font-medium font-sans mt-0.5">Your space. Your future.</p>
                  </div>
                </div>

                {/* Greeting Card banner */}
                <div className="rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-teal-500 text-white p-4 shadow-md text-left relative overflow-hidden">
                  <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-white/5 rounded-full blur-xl" />
                  <span className="font-mono text-[8px] uppercase tracking-widest text-indigo-100 opacity-90 block">Onboarding Setup</span>
                  <h3 className="font-display text-sm font-bold mt-1 leading-snug">
                    Build your study identity
                  </h3>
                  <p className="text-[10px] text-indigo-50 opacity-90 leading-relaxed mt-1 font-sans">
                    Setup your customized workspace indicators & curricula blueprints.
                  </p>
                </div>

                {/* Form fields */}
                <div className="space-y-4 text-xs font-sans">
                  {/* Name Input */}
                  <div className="space-y-1.5">
                    <label className="block text-slate-500 font-bold uppercase tracking-wider text-[9px]">Your Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        placeholder="Nika Chutlashvili"
                        className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-xs shadow-3xs outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 font-semibold text-slate-800"
                      />
                    </div>
                  </div>

                  {/* Objective Category pills */}
                  <div className="space-y-1.5">
                    <label className="block text-slate-500 font-bold uppercase tracking-wider text-[9px]">Your Current Goal / Track</label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { key: 'Tech', label: '💻 Tech / AI Coding' },
                        { key: 'Languages', label: '✍️ Languages' },
                        { key: 'Business', label: '📈 Business / VC' },
                        { key: 'Exams', label: '🎓 Exams / IELTS' },
                      ].map((item) => (
                        <button
                          key={item.key}
                          type="button"
                          onClick={() => setRegGoal(item.key)}
                          className={`rounded-xl p-2.5 text-center font-bold tracking-tight border transition-all cursor-pointer ${regGoal === item.key ? 'bg-indigo-50 border-indigo-500 text-indigo-950 font-extrabold shadow-2xs' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Preference Select list */}
                  <div className="space-y-1.5">
                    <label className="block text-slate-500 font-bold uppercase tracking-wider text-[9px]">Preferred Study Format</label>
                    <select
                      value={regMode}
                      onChange={(e) => setRegMode(e.target.value as any)}
                      className="w-full rounded-xl border border-slate-200 bg-white py-2.5 px-3 shadow-3xs outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 font-semibold text-slate-700 cursor-pointer"
                    >
                      <option value="Online">🌐 Online Study (Self-paced)</option>
                      <option value="Offline">🏫 Offline focus (In-person classes)</option>
                      <option value="Distant">📍 Distant Study (Hybrid options)</option>
                      <option value="Hybrid">🤝 Cohort system (Mixed groups)</option>
                    </select>
                  </div>

                  {/* Avatar Picker list */}
                  <div className="space-y-1.5">
                    <label className="block text-slate-500 font-bold uppercase tracking-wider text-[9px]">Select Profile Avatar</label>
                    <div className="flex justify-around py-1">
                      {AVATARS.map((avatar, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setRegAvatar(avatar.url)}
                          className={`relative w-11 h-11 rounded-full border-2 overflow-hidden transition-all duration-200 cursor-pointer ${regAvatar === avatar.url ? 'border-indigo-600 scale-110 shadow-md ring-4 ring-indigo-100' : 'border-slate-200 opacity-70 hover:opacity-100'}`}
                        >
                          <img src={avatar.url} alt={avatar.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="button"
                    onClick={() => {
                      onRegister({
                        name: regName.trim() || 'Nika',
                        avatar: regAvatar,
                        studyGoal: regGoal,
                        learningMode: regMode,
                      });
                    }}
                    className="w-full mt-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 text-xs uppercase tracking-wider shadow-md hover:brightness-115 transition duration-150 cursor-pointer flex items-center justify-center gap-2"
                  >
                    🚀 Enter Study Nest Workspace
                  </button>
                </div>
              </motion.div>
            )}

            {/* 1. HOME SCREEN */}
            {currentScreen === 'home' && (
              <motion.div
                key="home"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.2 }}
                className="p-5 space-y-5"
              >
                {/* Greeting banner */}
                <div className="flex items-center justify-between mt-2">
                  <div>
                    <span className="font-mono text-[9px] text-slate-400 uppercase tracking-widest font-bold">Good study day</span>
                    <h2 className="font-display text-xl font-bold text-slate-900">Hello, {registeredUser ? registeredUser.name : 'Nika'} 👋</h2>
                  </div>
                  <div 
                    onClick={() => setProfileSheetOpen(true)}
                    className="relative group cursor-pointer"
                  >
                    <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 opacity-60 blur-xs group-hover:opacity-100 transition" />
                    <div className="relative w-11 h-11 rounded-full border border-white overflow-hidden shadow-xs">
                      <img
                        src={registeredUser ? registeredUser.avatar : "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80"}
                        alt="User Avatar"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                </div>

                {/* Brand slogan graphic */}
                <div className="rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-teal-500 text-white p-4.5 shadow-lg shadow-indigo-600/10 relative overflow-hidden">
                  <div className="absolute -right-4 -bottom-4 w-28 h-28 bg-white/5 rounded-full blur-xl" />
                  <div className="absolute top-2 right-2 rounded-full bg-white/10 px-2 py-0.5 text-[8px] uppercase tracking-widest font-mono">
                    AIS Live Engine
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-indigo-100 opacity-90 block">Premium Workspace System</span>
                  <h3 className="font-display text-lg font-bold mt-1 leading-snug">
                    “Your space.<br />Your future.”
                  </h3>
                  <p className="text-xs text-indigo-50 opacity-95 line-height-normal mt-2.5 font-sans leading-relaxed">
                    Instantly pinpoint noise-optimised spaces with guaranteed seating and high-speed Wi-Fi.
                  </p>
                </div>

                {/* Fast Search proxy bar */}
                <div 
                  onClick={() => onScreenChange('places')}
                  className="rounded-xl border border-slate-200 bg-white p-3 flex items-center gap-3 shadow-xs hover:border-indigo-400 transition cursor-pointer"
                >
                  <Search className="w-4 h-4 text-slate-400" />
                  <span className="text-xs text-slate-400 font-sans">Search places, programs, events...</span>
                </div>

                {/* Hub categories cards */}
                <div>
                  <h4 className="font-display text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3">Core Opportunities Dashboard</h4>
                  <div className="grid grid-cols-3 gap-2.5">
                    
                    {/* HUB 1: PLACES */}
                    <div 
                      onClick={() => onScreenChange('places')}
                      className="rounded-2xl border border-indigo-100 bg-indigo-50/50 p-3 flex flex-col gap-2 cursor-pointer hover:bg-indigo-50 hover:shadow-xs transition duration-200"
                    >
                      <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="block font-display text-[12px] font-bold text-indigo-950">Study Places</span>
                        <span className="text-[9px] text-indigo-600 font-sans mt-0.5 block">{placesList.length} Spaces</span>
                      </div>
                    </div>

                    {/* HUB 2: PROGRAMS */}
                    <div 
                      onClick={() => onScreenChange('programs')}
                      className="rounded-2xl border border-purple-100 bg-purple-50/50 p-3 flex flex-col gap-2 cursor-pointer hover:bg-purple-50 hover:shadow-xs transition duration-200"
                    >
                      <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-xs">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="block font-display text-[12px] font-bold text-purple-950">Programs</span>
                        <span className="text-[9px] text-purple-600 font-sans mt-0.5 block">{PROGRAMS.length} Curriculums</span>
                      </div>
                    </div>

                    {/* HUB 3: OPPORTUNITIES */}
                    <div 
                      onClick={() => onScreenChange('opportunities')}
                      className="rounded-2xl border border-teal-100 bg-teal-50/50 p-3 flex flex-col gap-2 cursor-pointer hover:bg-teal-50 hover:shadow-xs transition duration-200"
                    >
                      <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-xs">
                        <GraduationCap className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="block font-display text-[12px] font-bold text-teal-950">Opportunities</span>
                        <span className="text-[9px] text-teal-600 font-sans mt-0.5 block">{OPPORTUNITIES.length} Scholarships</span>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Curated Feed Item */}
                <div className="rounded-2xl border border-slate-100 bg-white p-4 space-y-3 shadow-xs">
                  <div className="flex justify-between items-center border-b border-slate-50 pb-2">
                    <span className="rounded-full bg-amber-50 border border-amber-100 text-amber-800 text-[9px] font-bold font-sans px-2 py-0.5 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-500 fill-amber-500" />
                      Spotlight Workspace
                    </span>
                    <span className="text-[9px] text-slate-400 font-semibold flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Updated just now
                    </span>
                  </div>

                  <div 
                    onClick={() => onScreenChange('place-detail', 'place-1')}
                    className="flex gap-3 items-center cursor-pointer hover:-translate-y-0.5 transition"
                  >
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-200 shrink-0 shadow-xs">
                      <img src={placesList[0].image} className="w-full h-full object-cover" referrerPolicy="no-referrer" alt="" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-display text-sm font-bold text-slate-800 truncate">{placesList[0].name}</h4>
                      <p className="text-[10px] text-slate-500 mt-0.5 font-sans flex items-center leading-none gap-1">
                        <MapPin className="w-3 h-3 text-red-500 shrink-0" />
                        {placesList[0].address}
                      </p>
                      <div className="flex items-center gap-2 mt-1.5 font-mono text-[9px] text-slate-600 font-semibold">
                        <span className="text-emerald-600">AIS Index: {100 - placesList[0].noiseLevel}%</span>
                        <span>·</span>
                        <span className="text-slate-500">{placesList[0].distance} away</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 2. PLACES DISCOVER SCREEN */}
            {currentScreen === 'places' && (
              <motion.div
                key="places"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.2 }}
                className="p-4 space-y-4"
              >
                {/* Header */}
                <div className="flex items-center justify-between mt-1">
                  <div>
                    <h2 className="font-display text-lg font-bold text-slate-900">Nearby Study Places</h2>
                    <p className="text-[11px] text-slate-500 font-sans">Verified real-time ambient signals</p>
                  </div>
                  
                  {/* View Type selector list vs map */}
                  <div className="rounded-lg bg-slate-200/60 p-0.5 flex border border-slate-200 text-xs font-semibold">
                    <button 
                      onClick={() => setViewMode('list')}
                      className={`rounded-md px-3 py-1 font-bold transition text-[11px] ${viewMode === 'list' ? 'bg-white text-blue-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'}`}
                    >
                      List
                    </button>
                    <button 
                      onClick={() => setViewMode('map')}
                      className={`rounded-md px-3 py-1 font-bold transition text-[11px] ${viewMode === 'map' ? 'bg-white text-blue-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'}`}
                    >
                      Map
                    </button>
                  </div>
                </div>

                {/* Active Tag input */}
                <div className="rounded-xl border border-slate-200 bg-white p-2.5 flex items-center gap-2 shadow-xs">
                  <Search className="w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search cafes, library tags..."
                    value={placesSearch}
                    onChange={(e) => setPlacesSearch(e.target.value)}
                    className="w-full bg-transparent border-0 ring-0 outline-none text-xs font-sans text-slate-700"
                  />
                  {placesSearch && (
                    <button 
                      onClick={() => setPlacesSearch('')}
                      className="font-mono text-[9px] text-slate-400 bg-slate-100 hover:bg-slate-200 rounded px-1.5 py-0.5"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Subheader and items list count */}
                <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 tracking-wider uppercase font-bold">
                  <span>Displaying {filteredPlaces.length} Workspaces</span>
                  <span>Sort by: Distance</span>
                </div>

                {/* LIST VIEW */}
                {viewMode === 'list' ? (
                  <div className="space-y-3.5">
                    {filteredPlaces.length > 0 ? (
                      filteredPlaces.map((place) => (
                        <div
                          key={place.id}
                          onClick={() => onScreenChange('place-detail', place.id)}
                          className="rounded-2xl border border-slate-100 bg-white shadow-xs p-3 space-y-2.5 cursor-pointer hover:border-blue-300 transition duration-200 group relative"
                        >
                          {/* Rating and Distance Floating items */}
                          <div className="relative h-32 w-full rounded-xl overflow-hidden bg-slate-200">
                            <img src={place.image} className="w-full h-full object-cover transition duration-300 group-hover:scale-[1.03]" referrerPolicy="no-referrer" alt="" />
                            
                            <div className="absolute top-2.5 right-2.5 rounded-lg bg-white/95 backdrop-blur-xs px-2.5 py-1 flex items-center gap-1 shadow-sm text-xs font-bold text-slate-800">
                              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                              {place.rating}
                            </div>
                            <div className="absolute bottom-2.5 left-2.5 rounded bg-slate-900/70 text-white px-2 py-0.5 text-[9px] font-mono">
                              {place.distance} away
                            </div>
                          </div>

                          {/* Detail summary */}
                          <div>
                            <div className="flex justify-between items-start">
                              <h3 className="font-display text-sm font-bold text-slate-900 group-hover:text-blue-600 transition truncate pr-4">{place.name}</h3>
                              <span className="rounded-full bg-blue-50 text-blue-800 text-[8px] font-mono font-bold px-2 py-0.5 shrink-0 uppercase">
                                {place.type}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 font-sans truncate mt-0.5">{place.address}</p>

                            {/* Signal trackers preview */}
                            <div className="flex gap-3 mt-2 font-mono text-[9px] text-slate-600 bg-slate-50 p-1.5 rounded-lg border border-slate-100">
                              <span className="flex items-center gap-1 text-teal-600 font-bold">
                                <VolumeX className="w-3 h-3 shrink-0" />
                                {place.noiseLevel} dB
                              </span>
                              <span>·</span>
                              <span className="flex items-center gap-1 text-indigo-600 font-bold">
                                <Wifi className="w-3 h-3 shrink-0" />
                                {place.wifiQuality} Mbps
                              </span>
                              <span>·</span>
                              <span className="font-semibold text-slate-600">
                                Cap: {place.crowdLevel}%
                              </span>
                            </div>

                            {/* Tags display list */}
                            <div className="flex flex-wrap gap-1 mt-2.5">
                              {place.tags.map((tag, i) => (
                                <span key={i} className="rounded-sm bg-slate-100 px-1.5 py-0.5 text-[8px] font-bold text-slate-600 font-sans">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="rounded-2xl bg-white border border-slate-200 p-8 text-center">
                        <Info className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                        <h4 className="font-display text-sm font-bold text-slate-800">No study spaces found</h4>
                        <p className="text-xs text-slate-500 mt-1 font-sans">Try removing search keywords to view listing</p>
                      </div>
                    )}
                  </div>
                ) : (
                  /* PREMIUM INTEGRATED SVG GEOMETRIC MAP VIEW */
                  <div className="rounded-2xl border border-slate-300 bg-white p-3 h-[380px] overflow-hidden relative shadow-sm flex flex-col justify-between">
                    <div className="p-2 border-b border-indigo-150 flex justify-between items-center">
                      <span className="text-[9px] font-mono font-bold text-indigo-600 uppercase tracking-widest flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping shrink-0" />
                        Interactive Sensor Grid map
                      </span>
                      <span className="text-[9px] text-slate-400 italic">Tap pins to investigate</span>
                    </div>

                    {/* Vector Map Blueprint */}
                    <div className="flex-1 relative bg-slate-50/50 rounded-xl overflow-hidden mt-2 select-none border border-slate-200">
                      
                      {/* Blueprint Grid Lines */}
                      <svg className="absolute inset-0 w-full h-full opacity-10" width="100%" height="100%">
                        <defs>
                          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="1" />
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                      </svg>

                      {/* Map abstract park & lakes layout */}
                      <div className="absolute top-[30%] left-[20%] w-24 h-16 rounded-full bg-emerald-100/40 blur-md transform rotate-12" />
                      <div className="absolute top-[50%] left-[60%] w-28 h-20 rounded-full bg-blue-100/40 blur-md" />

                      {/* Road tracks */}
                      <div className="absolute h-full w-4 bg-slate-200/50 left-[50%] -translate-x-[50%]" />
                      <div className="absolute w-full h-4 bg-slate-200/50 top-[60%] -translate-y-[50%]" />

                      {/* Interactive Place Markers */}
                      {placesList.map((place, index) => {
                        // Spread pins visually across map space
                        const coordinates = [
                          { top: '25%', left: '30%' }, // Glasshouse
                          { top: '45%', left: '75%' }, // Nest & Brew
                          { top: '75%', left: '25%' }, // Library
                          { top: '15%', left: '65%' }, // Prism Lab
                        ];
                        const coord = coordinates[index] || { top: '50%', left: '50%' };
                        
                        return (
                          <div 
                            key={place.id}
                            style={{ top: coord.top, left: coord.left }}
                            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10 group"
                            onClick={() => onScreenChange('place-detail', place.id)}
                          >
                            <div className="relative cursor-pointer transition duration-200 hover:scale-110 flex flex-col items-center">
                              {/* Glowing background pin pulse */}
                              <div className="h-4 w-4 bg-indigo-600 rounded-full absolute -top-1 blur-xs animate-ping opacity-50" />
                              
                              {/* Actual map pin shape */}
                              <div className="rounded-full bg-indigo-600 text-white p-2 shadow-md border-2 border-white flex items-center justify-center">
                                <MapPin className="w-3 h-3 text-white" />
                              </div>

                              {/* Small preview card hovering on pin marker */}
                              <div className="absolute bottom-8 rounded-lg bg-slate-900 text-white p-2 shadow-xl border border-slate-700 text-center min-w-[120px] pointer-events-none opacity-0 group-hover:opacity-100 transition duration-150 transform translate-y-1">
                                <p className="text-[10px] font-bold font-display truncate leading-tight">{place.name}</p>
                                <span className="text-[8px] text-slate-400 font-mono block mt-0.5">AIS Score: {100 - place.noiseLevel}%</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-2 text-center">
                      <p className="text-[10px] text-slate-500 font-sans leading-relaxed">
                        Each location broadcasts continuous telemetry updating noise levels, Wi-Fi speed indices, and current occupancy counts.
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* 3. PLACE DETAIL SCREEN */}
            {currentScreen === 'place-detail' && (
              <motion.div
                key="place-detail"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                {/* Back button and title */}
                <div className="px-4 pt-4 flex justify-between items-center">
                  <button 
                    onClick={() => onScreenChange('places')}
                    className="rounded-full bg-white border border-slate-200 p-1.5 hover:bg-slate-50 transition shadow-2xs flex items-center justify-center shrink-0"
                  >
                    <ChevronLeft className="w-5 h-5 text-slate-700" />
                  </button>
                  <span className="font-display text-xs font-bold text-slate-400 uppercase tracking-widest">Detail Dossier</span>
                  <button className="rounded-full bg-white border border-slate-200 p-1.5 text-slate-600 flex items-center justify-center shadow-2xs">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Hero Header Cover image */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-200">
                  <img src={activePlace.image} className="w-full h-full object-cover" referrerPolicy="no-referrer" alt="" />
                  <div className="absolute top-3 left-4 rounded bg-emerald-600 text-white px-2.5 py-0.5 font-sans font-bold text-[10px] uppercase">
                    {activePlace.isOpen ? 'Open Now' : 'Closed'}
                  </div>
                  <div className="absolute bottom-3 right-4 rounded-full bg-white/95 backdrop-blur-xs px-3 py-1 font-bold flex items-center gap-1 text-xs text-slate-800 shadow-sm">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    {activePlace.rating} ({activePlace.reviewsCount} reviews)
                  </div>
                </div>

                <div className="px-4 space-y-4 pb-4">
                  {/* Title metadata */}
                  <div>
                    <h2 className="font-display text-lg font-bold text-slate-900 leading-tight">{activePlace.name}</h2>
                    <p className="text-xs text-slate-500 font-sans mt-0.5">{activePlace.address}</p>
                  </div>

                  {/* Environment Metrics Grid */}
                  <div className="grid grid-cols-3 gap-2 text-center">
                    {/* Noise Indicator */}
                    <div className="rounded-xl border border-slate-150 bg-white p-2.5 flex flex-col justify-between align-center relative overflow-hidden">
                      <span className="text-[9px] font-mono font-bold text-slate-400 tracking-wider block">NOISE ACCENT</span>
                      
                      {/* Mini visual indicator meter */}
                      <div className="my-2 flex justify-center">
                        <div className="w-full max-w-[50px] bg-slate-100 rounded-full h-2.5 overflow-hidden border border-slate-200 flex">
                          <div 
                            style={{ width: `${activePlace.noiseLevel}%` }} 
                            className={`h-full rounded-full ${activePlace.noiseLevel < 35 ? 'bg-emerald-500' : activePlace.noiseLevel < 60 ? 'bg-amber-400' : 'bg-red-500'}`} 
                          />
                        </div>
                      </div>

                      <span className="text-xs font-mono font-bold text-slate-800 block">{activePlace.noiseLevel} dB</span>
                      <span className="text-[8px] font-semibold text-slate-500 leading-tight block mt-1">
                        {getNoiseLabel(activePlace.noiseLevel).text}
                      </span>
                    </div>

                    {/* Wifi Indicator */}
                    <div className="rounded-xl border border-slate-150 bg-white p-2.5 flex flex-col justify-between align-center">
                      <span className="text-[9px] font-mono font-bold text-slate-400 tracking-wider block">WI-FI SPEED</span>
                      
                      {/* Connection speed metric */}
                      <div className="my-2 flex items-center justify-center gap-1 text-slate-700">
                        <Wifi className="w-4 h-4 text-indigo-600 animate-pulse" />
                      </div>

                      <span className="text-xs font-mono font-bold text-slate-800 block">{activePlace.wifiQuality} Mbps</span>
                      <span className="text-[8px] font-semibold text-slate-500 leading-tight block mt-1">
                        Premium Fiber
                      </span>
                    </div>

                    {/* Crowd indicator */}
                    <div className="rounded-xl border border-slate-150 bg-white p-2.5 flex flex-col justify-between align-center">
                      <span className="text-[9px] font-mono font-bold text-slate-400 tracking-wider block">OCCUPANCY</span>
                      
                      {/* Progress bar preview */}
                      <div className="my-2 flex justify-center">
                        <div className="w-full max-w-[50px] bg-slate-100 rounded-full h-2.5 overflow-hidden border border-slate-200">
                          <div style={{ width: `${activePlace.crowdLevel}%` }} className="h-full bg-blue-600 rounded-full" />
                        </div>
                      </div>

                      <span className="text-xs font-mono font-bold text-slate-800 block">{activePlace.crowdLevel}% Capacity</span>
                      <span className="text-[8px] font-semibold text-slate-500 leading-tight block mt-1">
                        {getCrowdLabel(activePlace.crowdLevel).text}
                      </span>
                    </div>
                  </div>

                  {/* Physical attributes details */}
                  <div className="rounded-xl border border-slate-100 bg-slate-50 p-3 space-y-2 text-xs">
                    <h4 className="font-display text-[10px] font-bold uppercase tracking-widest text-slate-400">Workspace Amenities</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex justify-between border-b border-slate-100 pb-1">
                        <span className="text-slate-500">Power Plugs:</span>
                        <span className="font-bold text-slate-800">{activePlace.outlets}</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-100 pb-1">
                        <span className="text-slate-500">Lighting style:</span>
                        <span className="font-bold text-slate-800">{activePlace.lighting}</span>
                      </div>
                      <div className="flex justify-between pb-1">
                        <span className="text-slate-500">Estimated distance:</span>
                        <span className="font-bold text-slate-800 font-mono">{activePlace.distance}</span>
                      </div>
                      <div className="flex justify-between pb-1">
                        <span className="text-slate-500">Workspace pricing:</span>
                        <span className="font-bold text-slate-800">Free Access</span>
                      </div>
                    </div>
                  </div>

                  {/* Reviews lists feed */}
                  <div className="space-y-3">
                    <h3 className="font-display text-sm font-bold text-slate-900 border-b border-slate-100 pb-1.5">
                      Community Feedback ({activePlace.reviews.length})
                    </h3>

                    {/* Interactive review text submit form */}
                    <form onSubmit={handleAddReview} className="rounded-xl border border-blue-100 bg-blue-50/20 p-3 space-y-2.5">
                      <span className="block font-display text-[10px] font-bold text-blue-900 uppercase tracking-wider">Write an Ambient Review</span>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="Your Name (e.g., Nika)"
                          value={newReviewAuthor}
                          onChange={(e) => setNewReviewAuthor(e.target.value)}
                          className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-sans outline-none focus:border-blue-400"
                        />
                        <select
                          value={newReviewRating}
                          onChange={(e) => setNewReviewRating(Number(e.target.value))}
                          className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-sans outline-none focus:border-blue-400 text-slate-700"
                        >
                          <option value={5}>🌟 5.0 (Perfect Flow)</option>
                          <option value={4}>⭐ 4.0 (Good Focus)</option>
                          <option value={3}>⭐ 3.0 (Moderate)</option>
                          <option value={2}>⭐ 2.0 (Noisy/Busy)</option>
                        </select>
                      </div>

                      <textarea
                        rows={2}
                        placeholder="Write your brief workspace review comments..."
                        value={newReviewComment}
                        onChange={(e) => setNewReviewComment(e.target.value)}
                        className="w-full rounded-lg border border-slate-200 bg-white p-2 text-xs font-sans outline-none focus:border-blue-400 resize-none"
                      />

                      {reviewError && (
                        <p className="text-[10px] font-bold text-rose-600 font-sans">{reviewError}</p>
                      )}

                      <button
                        type="submit"
                        className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] uppercase py-1.5 flex items-center justify-center gap-1.5 transition shrink-0"
                      >
                        <Send className="w-3 h-3" />
                        Post Review
                      </button>
                    </form>

                    {/* Feed output */}
                    <div className="space-y-3 pt-1">
                      {activePlace.reviews.map((rev) => (
                        <div key={rev.id} className="bg-white rounded-xl p-3 border border-slate-100 flex gap-2.5 items-start">
                          <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-200 shrink-0 border border-slate-150">
                            <img src={rev.avatar} className="w-full h-full object-cover" referrerPolicy="no-referrer" alt="" />
                          </div>
                          <div className="min-w-0 flex-1 space-y-1">
                            <div className="flex justify-between items-center text-[10px]">
                              <span className="font-bold text-slate-800">{rev.author}</span>
                              <span className="text-slate-400 font-sans">{rev.date}</span>
                            </div>
                            <div className="flex items-center gap-0.5">
                              {Array.from({ length: 5 }).map((_, termI) => (
                                <Star 
                                  key={termI} 
                                  className={`w-2.5 h-2.5 ${termI < rev.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`} 
                                />
                              ))}
                            </div>
                            <p className="text-[11px] text-slate-600 font-sans leading-relaxed pt-0.5">
                              {rev.comment}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>
                </div>
              </motion.div>
            )}

            {/* 4. PROGRAMS CURRICULUMS SCREEN */}
            {currentScreen === 'programs' && (
              <motion.div
                key="programs"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.2 }}
                className="p-4 space-y-4"
              >
                {/* Header */}
                <div>
                  <h2 className="font-display text-lg font-bold text-slate-900">Discover Programs</h2>
                  <p className="text-[11px] text-slate-500 font-sans">Premium academic curriculum, bootcamps and certifications</p>
                </div>

                {/* Filters Row */}
                <div className="space-y-2">
                  {/* Category Filter Pills scroll */}
                  <div className="flex gap-1.5 overflow-x-auto pb-1 block">
                    {(['All', 'Tech', 'Languages', 'Business', 'Exams'] as const).map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedProgCategory(cat)}
                        className={`rounded-full px-3 py-1 text-[10px] font-bold shrink-0 transition ${selectedProgCategory === cat ? 'bg-purple-600 text-white shadow-xs' : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Pricing type Filter Pills */}
                  <div className="flex gap-2">
                    <span className="text-[10px] text-slate-400 font-mono font-bold uppercase py-0.5 self-center">Price:</span>
                    {(['All', 'Free', 'Paid'] as const).map((priceT) => (
                      <button
                        key={priceT}
                        onClick={() => setProgramsPriceFilter(priceT)}
                        className={`rounded-md px-2.5 py-0.5 text-[9px] font-bold transition uppercase ${programsPriceFilter === priceT ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-500 hover:text-slate-800'}`}
                      >
                        {priceT}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Programs lists */}
                <div className="space-y-4.5">
                  {filteredPrograms.length > 0 ? (
                    filteredPrograms.map((prog) => (
                      <div
                        key={prog.id}
                        onClick={() => onScreenChange('program-detail', prog.id)}
                        className="rounded-2xl border border-slate-100 bg-white shadow-xs overflow-hidden flex flex-col group cursor-pointer hover:border-purple-300 transition duration-200"
                      >
                        <div className="relative h-28 w-full bg-slate-200">
                          <img src={prog.image} className="w-full h-full object-cover transition duration-300 group-hover:scale-[1.02]" referrerPolicy="no-referrer" alt="" />
                          <div className="absolute top-2.5 left-2.5 bg-purple-600 text-white font-mono text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded">
                            {prog.category}
                          </div>
                          
                          {/* Price badge right */}
                          <div className="absolute top-2.5 right-2.5 bg-slate-900/85 backdrop-blur-xs text-white font-mono text-[9px] font-bold px-2 py-0.5 rounded">
                            {prog.price}
                          </div>

                          <div className="absolute bottom-2.5 right-2.5 rounded-full bg-white/95 px-2.5 py-0.5 flex items-center gap-0.5 text-[10px] font-bold text-slate-800">
                            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                            {prog.rating}
                          </div>
                        </div>

                        <div className="p-3.5 space-y-1.5">
                          <h4 className="font-display text-xs font-bold text-slate-900 leading-snug">{prog.title}</h4>
                          <p className="text-[10px] text-slate-500 font-sans">{prog.provider}</p>
                          <p className="text-[10px] text-slate-600 font-sans leading-normal line-clamp-2 pt-0.5">
                            {prog.description}
                          </p>

                          <div className="flex justify-between items-center text-[10px] pt-3 border-t border-slate-100 mt-2.5">
                            <span className="font-semibold text-slate-500 font-sans flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-slate-400" />
                              {prog.duration}
                            </span>
                            
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                onScreenChange('program-detail', prog.id);
                              }}
                              className="rounded px-2.5 py-1 bg-purple-50 text-purple-700 hover:bg-purple-100 text-[10px] font-bold transition flex items-center gap-1 cursor-pointer"
                            >
                              Syllabus
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-2xl bg-white border border-slate-200 p-8 text-center">
                      <BookOpen className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                      <h4 className="font-display text-sm font-bold text-slate-800">No programs listed</h4>
                      <p className="text-xs text-slate-500 mt-1 font-sans">Try widening filters or category selector</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* 4.5 PROGRAM DETAIL VIEW */}
            {currentScreen === 'program-detail' && (
              <motion.div
                key="program-detail"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                {/* Back button and title */}
                <div className="px-4 pt-4 flex justify-between items-center">
                  <button 
                    onClick={() => onScreenChange('programs')}
                    className="rounded-full bg-white border border-slate-200 p-1.5 hover:bg-slate-50 transition shadow-2xs flex items-center justify-center shrink-0 cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5 text-slate-700" />
                  </button>
                  <span className="font-display text-[11px] font-bold text-slate-400">Program Blueprint</span>
                  <button className="rounded-full bg-white border border-slate-200 p-1.5 text-slate-600 flex items-center justify-center shadow-2xs cursor-not-allowed">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Cover Image with Price Tag */}
                <div className="relative h-44 w-full bg-slate-200">
                  <img src={activeProgram.image} className="w-full h-full object-cover" referrerPolicy="no-referrer" alt="" />
                  
                  {/* Category Pill Tag floating left */}
                  <div className="absolute top-3 left-4 rounded bg-purple-600 text-white px-2.5 py-0.5 font-sans font-bold text-[10px] uppercase tracking-wider">
                    {activeProgram.category}
                  </div>

                  {/* Rating Badge */}
                  <div className="absolute bottom-3 right-4 rounded-full bg-white/95 px-3 py-1 font-bold flex items-center gap-1 text-xs text-slate-800 shadow-sm">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    {activeProgram.rating} ({activeProgram.enrollments.toLocaleString()} enrolled)
                  </div>
                </div>

                <div className="px-4 space-y-4 pb-6 font-sans">
                  {/* Title and Provider details */}
                  <div className="space-y-1">
                    <span className="text-[10px] text-purple-600 font-bold uppercase tracking-wider block">{activeProgram.provider}</span>
                    <h2 className="font-display text-base font-bold text-slate-900 leading-tight">{activeProgram.title}</h2>
                  </div>

                  {/* Crucial Parameters Grid (Price, Format, Online/Offline, etc.) */}
                  <div className="grid grid-cols-3 gap-2.5 text-center">
                    {/* Price Block */}
                    <div className="rounded-xl border border-purple-100 bg-purple-50/25 p-2.5 flex flex-col justify-between items-center">
                      <span className="text-[9px] font-mono font-bold text-slate-400 tracking-wider block">PRICE TAG</span>
                      <span className="text-sm font-black text-purple-700 block mt-1">{activeProgram.price}</span>
                      <span className="text-[8px] font-semibold text-slate-500 mt-1 block leading-tight">One-time payment</span>
                    </div>

                    {/* Format block (Online vs Distant) */}
                    <div className="rounded-xl border border-indigo-100 bg-white p-2.5 flex flex-col justify-between items-center">
                      <span className="text-[9px] font-mono font-bold text-slate-400 tracking-wider block">SETUP FORMAT</span>
                      <span className="text-xs font-bold text-slate-800 mt-1 flex items-center justify-center gap-1">
                        <Wifi className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                        <span className="truncate">{activeProgram.type}</span>
                      </span>
                      <span className="text-[8px] font-semibold text-slate-500 mt-1 block leading-tight">
                        {activeProgram.type === 'Online' ? 'Global Access' : 'Distant study'}
                      </span>
                    </div>

                    {/* Schedule block */}
                    <div className="rounded-xl border border-slate-150 bg-white p-2.5 flex flex-col justify-between items-center">
                      <span className="text-[9px] font-mono font-bold text-slate-400 tracking-wider block">DURATION</span>
                      <span className="text-xs font-bold text-slate-800 mt-1 block">{activeProgram.duration}</span>
                      <span className="text-[8px] font-semibold text-slate-500 mt-1 block leading-tight">Direct syllabus</span>
                    </div>
                  </div>

                  {/* Course Description */}
                  <div className="space-y-1.5 text-xs">
                    <h3 className="font-display text-[10px] font-bold text-slate-400 uppercase tracking-widest">About this Curricula</h3>
                    <p className="text-slate-600 leading-relaxed text-[11px] font-sans">
                      {activeProgram.description} Complete rigorous project sprints, earn peer feedback, and unlock certificate credits designed in concert with top tech universities and partners.
                    </p>
                  </div>

                  {/* Syllabus Outline accordion */}
                  <div className="space-y-2 text-xs">
                    <h3 className="font-display text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-1">Weekly Course Blueprint</h3>
                    
                    <div className="space-y-1.5 font-sans">
                      {[
                        { title: 'Week 1-4: Foundation & Advanced Concepts', desc: 'Core variables, setup structures, environment configuration, and code alignment.' },
                        { title: 'Week 5-8: Real-Time Telemetry Systems', desc: 'Working with IoT sensors, dynamic sockets, and responsive interface matrices.' },
                        { title: 'Week 9+ : Capstone Presentation Deck', desc: 'Build, compile, and present an end-to-end full stack thesis project to corporate founders.' }
                      ].map((week, idx) => (
                        <div key={idx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 space-y-0.5">
                          <span className="font-bold text-slate-800 text-[11px] block">{week.title}</span>
                          <p className="text-[10px] text-slate-500">{week.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Application/Enrollment Form */}
                  <div className="rounded-2xl border border-indigo-100 bg-indigo-50/20 p-4 space-y-3">
                    <div className="flex justify-between items-center border-b border-indigo-100/50 pb-2">
                      <span className="font-display text-[10px] font-bold text-indigo-900 uppercase tracking-wider flex items-center gap-1">
                        <Lock className="w-3 h-3 text-indigo-500" />
                        Guaranteed Enrollment Port
                      </span>
                      <span className="text-[9px] font-mono text-indigo-600 font-bold bg-indigo-50 px-1.5 py-0.5 rounded">
                        COHORT OPEN
                      </span>
                    </div>

                    {enrolledProgramIds.includes(activeProgram.id) ? (
                      <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1.5 text-center animate-fadeIn">
                        <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <h4 className="font-display text-[12px] font-black text-emerald-950">Successfully Cohort-Enrolled</h4>
                        <p className="text-[10px] text-emerald-600 font-mono">
                          Access keys forwarded safely to: {enrollmentEmail}
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2.5">
                        <p className="text-[10px] text-slate-500 leading-normal">
                          Provide your academic email to lock in corporate grants and enroll immediately.
                        </p>
                        <div className="flex gap-1.5">
                          <input
                            type="email"
                            value={enrollmentEmail}
                            onChange={(e) => setEnrollmentEmail(e.target.value)}
                            placeholder="your.name@academy.edu"
                            className="bg-white border border-slate-200 rounded-lg py-1.5 px-2.5 text-[10px] flex-1 outline-none text-slate-600 focus:border-indigo-500 font-sans"
                          />
                          <button
                            onClick={() => {
                              if (!enrollmentEmail.trim()) return;
                              setEnrolledProgramIds([...enrolledProgramIds, activeProgram.id]);
                            }}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[10px] px-3.5 rounded-lg transition uppercase tracking-wider cursor-pointer"
                          >
                            Enroll
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* 5. OPPORTUNITIES DASHBOARD */}
            {currentScreen === 'opportunities' && (
              <motion.div
                key="opportunities"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.2 }}
                className="p-4 space-y-4"
              >
                {/* Header */}
                <div>
                  <h2 className="font-display text-lg font-bold text-slate-900">Scholarships & Grants</h2>
                  <p className="text-[11px] text-slate-500 font-sans">Remote work opportunities, travel grants and fund trackers</p>
                </div>

                {/* Category Pill selectors */}
                <div className="flex gap-1.5 pb-1">
                  {(['All', 'Scholarship', 'Internship', 'Remote Work'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedOppType(type)}
                      className={`rounded-full px-2.5 py-0.5 text-[9px] font-bold transition shrink-0 ${selectedOppType === type ? 'bg-teal-600 text-white shadow-xs' : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'}`}
                    >
                      {type}
                    </button>
                  ))}
                </div>

                {/* Opportunities lists */}
                <div className="space-y-4">
                  {filteredOpportunities.map((opp) => (
                    <div
                      key={opp.id}
                      className="rounded-2xl border border-slate-100 bg-white shadow-xs overflow-hidden p-3 space-y-3 group"
                    >
                      {/* Top banner */}
                      <div className="flex gap-3 items-center">
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-200 shrink-0">
                          <img src={opp.image} className="w-full h-full object-cover" referrerPolicy="no-referrer" alt="" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="rounded bg-teal-50 border border-teal-100 text-teal-800 text-[8px] font-mono font-bold px-1.5 py-0.5 uppercase tracking-wider">
                            {opp.type}
                          </span>
                          <h3 className="font-display text-xs font-bold text-slate-900 truncate mt-0.5">{opp.title}</h3>
                          <p className="text-[10px] text-slate-500 font-sans truncate">{opp.organization}</p>
                        </div>
                      </div>

                      {/* Description summary snippet */}
                      <p className="text-[10px] text-slate-600 font-sans leading-normal">
                        {opp.description}
                      </p>

                      {/* Technical specifications and Deadline tags */}
                      <div className="bg-slate-50 rounded-xl p-2.5 flex justify-between items-center text-[9px] font-semibold text-slate-600">
                        <span className="font-sans flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          Apply: <strong>{opp.deadline}</strong>
                        </span>
                        
                        <span className="font-mono text-teal-600 font-bold bg-teal-50/50 px-2 py-0.5 rounded border border-teal-100/50">
                          {opp.amount || 'Opportunity Open'}
                        </span>
                      </div>

                      {/* Trigger Call to action */}
                      <div className="flex gap-2">
                        <button className="flex-1 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-bold text-[9px] uppercase py-2 transition tracking-wider">
                          Apply Now
                        </button>
                        <button className="rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 px-2.5 transition">
                          <Info className="w-3.5 h-3.5" />
                        </button>
                      </div>

                    </div>
                  ))}
                </div>

              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Global floating bottom Navigation Bar (frosted glass glassmorphism effect) */}
        {currentScreen !== 'registration' && (
          <div className="absolute bottom-3 left-4 right-4 z-40 rounded-2xl border border-slate-200/50 bg-white/80 backdrop-blur-md p-1.5 shadow-lg shadow-slate-300/20">
            <div className="flex justify-around items-center">
              
              {/* Item 1: Home */}
              <button
                onClick={() => onScreenChange('home')}
                className={`flex flex-col items-center justify-center p-1.5 rounded-xl transition cursor-pointer ${currentScreen === 'home' ? 'text-blue-600 bg-blue-50/50' : 'text-slate-400 hover:text-slate-800'}`}
              >
                <Home className="w-5 h-5 shrink-0" />
                <span className="text-[9px] font-bold font-sans mt-0.5">Home</span>
              </button>

              {/* Item 2: Spaces */}
              <button
                onClick={() => onScreenChange('places')}
                className={`flex flex-col items-center justify-center p-1.5 rounded-xl transition cursor-pointer ${currentScreen === 'places' || currentScreen === 'place-detail' ? 'text-purple-600 bg-purple-50/50' : 'text-slate-400 hover:text-slate-800'}`}
              >
                <MapPin className="w-5 h-5 shrink-0" />
                <span className="text-[9px] font-bold font-sans mt-0.5">Spaces</span>
              </button>

              {/* Item 3: Classes */}
              <button
                onClick={() => onScreenChange('programs')}
                className={`flex flex-col items-center justify-center p-1.5 rounded-xl transition cursor-pointer ${currentScreen === 'programs' || currentScreen === 'program-detail' ? 'text-teal-600 bg-teal-50/50' : 'text-slate-400 hover:text-slate-800'}`}
              >
                <BookOpen className="w-5 h-5 shrink-0" />
                <span className="text-[9px] font-bold font-sans mt-0.5">Classes</span>
              </button>

              {/* Item 4: Grants */}
              <button
                onClick={() => onScreenChange('opportunities')}
                className={`flex flex-col items-center justify-center p-1.5 rounded-xl transition cursor-pointer ${currentScreen === 'opportunities' ? 'text-rose-600 bg-rose-50/50' : 'text-slate-400 hover:text-slate-800'}`}
              >
                <GraduationCap className="w-5 h-5 shrink-0" />
                <span className="text-[9px] font-bold font-sans mt-0.5">Grants</span>
              </button>

            </div>
          </div>
        )}

        {/* PROFILE DRAWER SHEET OVERLAY */}
        {profileSheetOpen && (
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex flex-col justify-end">
            <div 
              className="absolute inset-0" 
              onClick={() => setProfileSheetOpen(false)}
            />
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              className="relative bg-white rounded-t-3xl p-5 space-y-4 shadow-xl z-55 max-h-[85%] overflow-y-auto"
            >
              <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto" />
              
              <div className="flex items-center gap-3.5 pt-2">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-indigo-100 shrink-0">
                  <img src={registeredUser ? registeredUser.avatar : "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80"} alt="" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-display text-sm font-bold text-slate-900">{registeredUser ? registeredUser.name : 'Nika'}</h3>
                  <span className="text-[10px] text-slate-500 font-mono">ID: EN-7392-M</span>
                </div>
              </div>

              <div className="space-y-2.5 pt-1.5 text-xs">
                {/* Preference Specs */}
                <div className="bg-slate-50 rounded-xl p-3 space-y-2 font-sans">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Track Category:</span>
                    <span className="font-bold text-slate-800">💻 {registeredUser ? registeredUser.studyGoal : 'Tech'}</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-100 pt-1.5">
                    <span className="text-slate-500">Format Option:</span>
                    <span className="font-bold text-slate-800">🌐 {registeredUser ? registeredUser.learningMode : 'Online'}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setProfileSheetOpen(false);
                    onSignOut();
                  }}
                  className="w-full py-2.5 rounded-xl border border-rose-250 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  Log out & reset Onboarding
                </button>

                <button
                  onClick={() => setProfileSheetOpen(false)}
                  className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold transition flex items-center justify-center cursor-pointer"
                >
                  Close Panel
                </button>
              </div>
            </motion.div>
          </div>
        )}

      </div>
    </div>
  );
}
