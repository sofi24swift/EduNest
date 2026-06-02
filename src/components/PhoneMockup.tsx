/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
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
  HelpCircle,
  Map,
  X,
  Navigation,
  ZoomIn,
  ZoomOut,
  Sliders,
  ChevronRight,
  RefreshCw
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
  
  // Custom sensory environment simulation states (migrated internal to the phone as requested!)
  const [currentDecibelOverride, setCurrentDecibelOverride] = useState<number>(0); // Noise reducer factor (minus dB)
  const [sensoryPreset, setSensoryPreset] = useState<'Auto' | 'SilentHour' | 'CoffeeRush'>('Auto');

  // Programs screen filters
  const [selectedProgCategory, setSelectedProgCategory] = useState<'All' | 'Tech' | 'Languages' | 'Business' | 'Exams'>('All');
  const [programsPriceFilter, setProgramsPriceFilter] = useState<'All' | 'Free' | 'Paid'>('All');
  
  // Opportunities screen filters
  const [selectedOppType, setSelectedOppType] = useState<'All' | 'Scholarship' | 'Internship' | 'Remote Work'>('All');

  // Mapping & Real-time Location variables (Tbilisi, Georgia)
  // Base coordinates: Geolab / Rustaveli Metro area (41.7032, 44.7975)
  const [userCoords, setUserCoords] = useState({ lat: 41.7032, lng: 44.7975 });
  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsError, setGpsError] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1.0);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [mapDragging, setMapDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [selectedMapPinId, setSelectedMapPinId] = useState<string | null>(null);

  // New Interactive Map State Variables
  const [mapFilter, setMapFilter] = useState<'all' | 'coworking' | 'cafe' | 'library' | 'quiet'>('all');
  const [selectedLandmark, setSelectedLandmark] = useState<string | null>(null);
  const [activeMapTab, setActiveMapTab] = useState<'basic' | 'outlets' | 'sensory'>('basic');
  const [liveDecibels, setLiveDecibels] = useState(25);
  const [bookedSeats, setBookedSeats] = useState<string[]>([]); // To track booked sockets

  // Registration form values
  const [regName, setRegName] = useState('მაია ჩენი');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['ტექნოლოგიები', 'ხელოვნური ინტელექტი', 'დიზაინი']);
  const [regGoal, setRegGoal] = useState('Tech');
  const [regMode, setRegMode] = useState<'Online' | 'Offline' | 'Distant' | 'Hybrid'>('Online');
  const [regAvatar, setRegAvatar] = useState('https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80');

  // Enrollment state
  const [enrolledProgramIds, setEnrolledProgramIds] = useState<string[]>([]);
  const [enrollmentEmail, setEnrollmentEmail] = useState('sopia.chutlashvilite04@geolab.edu.ge');

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

  const [profileSheetOpen, setProfileSheetOpen] = useState(false);

  // Active place descriptor
  const activePlace = useMemo(() => {
    return placesList.find(p => p.id === (selectedPlaceId || 'place-1')) || placesList[0];
  }, [placesList, selectedPlaceId]);

  // Active program descriptor
  const activeProgram = useMemo(() => {
    return PROGRAMS.find(p => p.id === (selectedProgramId || 'prog-1')) || PROGRAMS[0];
  }, [selectedProgramId]);

  // Adjust places dynamic noise and capacity based on simulator override presets
  const placesWithSensoryOverride = useMemo(() => {
    return placesList.map(place => {
      let noise = place.noiseLevel;
      let crowd = place.crowdLevel;

      if (sensoryPreset === 'SilentHour') {
        noise = Math.max(10, Math.round(place.noiseLevel * 0.4)); // Slash noise
        crowd = Math.max(15, Math.round(place.crowdLevel * 0.5));
      } else if (sensoryPreset === 'CoffeeRush') {
        noise = Math.min(95, Math.round(place.noiseLevel * 1.35)); // Bump noise
        crowd = Math.min(98, Math.round(place.crowdLevel * 1.4));
      }

      // Apply decibel slider reducer slider if any
      if (currentDecibelOverride > 0) {
        noise = Math.max(8, noise - currentDecibelOverride);
      }

      return {
        ...place,
        noiseLevel: noise,
        crowdLevel: crowd
      };
    });
  }, [placesList, sensoryPreset, currentDecibelOverride]);

  // Request actual GPS coordinates of user with fallback to Tbilisi
  const handleRequestLiveGPS = () => {
    setGpsLoading(true);
    setGpsError(null);
    if (!navigator.geolocation) {
      setGpsError("GPS-ი მხარდაუჭერელია ბრაუზერის მიერ.");
      setGpsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setGpsLoading(false);
      },
      (error) => {
        console.error("GPS Error, staying in Tbilisi central coordinates: ", error);
        setGpsError("ბრაუზერმა დაბლოკა GPS. გამოყენებულია თბილისის ნაგულისხმევი ლოკაცია.");
        setUserCoords({ lat: 41.7032, lng: 44.7975 }); // Geolab center
        setGpsLoading(false);
      },
      { enableHighAccuracy: true, timeout: 6000 }
    );
  };

  // Convert GPS Coordinates to kilometers using Haversine Formula
  const calculateHaversineDistanceKm = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Earth's Radius (km)
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return parseFloat((R * c).toFixed(2));
  };

  // Compute live distance metrics dynamically from my position for all places
  const processedPlacesList = useMemo(() => {
    return placesWithSensoryOverride.map(place => {
      const distanceKm = place.lat && place.lng 
        ? calculateHaversineDistanceKm(userCoords.lat, userCoords.lng, place.lat, place.lng)
        : 1.2;
      return {
        ...place,
        distance: `${distanceKm} კმ`
      };
    });
  }, [placesWithSensoryOverride, userCoords]);

  // Simulated live decibels fluctuation
  useEffect(() => {
    let interval: any = null;
    if (currentScreen === 'map' && selectedMapPinId) {
      const pin = processedPlacesList.find(p => p.id === selectedMapPinId);
      if (pin) {
        setLiveDecibels(pin.noiseLevel);
        interval = setInterval(() => {
          setLiveDecibels(prev => {
            const fluctuation = Math.floor(Math.random() * 5) - 2; // -2 to +2
            const newVal = prev + fluctuation;
            return Math.max(12, Math.min(85, newVal));
          });
        }, 1500);
      }
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [currentScreen, selectedMapPinId, processedPlacesList]);

  // Filtered Places for Discovery Screen
  const filteredPlaces = useMemo(() => {
    if (!placesSearch.trim()) return processedPlacesList;
    const term = placesSearch.toLowerCase();
    return processedPlacesList.filter(p => 
      p.name.toLowerCase().includes(term) || 
      p.address.toLowerCase().includes(term) ||
      p.tags.some(tag => tag.toLowerCase().includes(term))
    );
  }, [processedPlacesList, placesSearch]);

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
      setReviewError('გთხოვთ შეავსოთ თქვენი სახელი და დაწეროთ კომენტარი.');
      return;
    }

    const addedRev: Review = {
      id: `user-rev-${Date.now()}`,
      author: newReviewAuthor.trim(),
      avatar: registeredUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      rating: newReviewRating,
      date: 'ახლახან',
      comment: newReviewComment.trim()
    };

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

  // Noise decibel translation dictionary
  const getNoiseLabel = (noise: number) => {
    if (noise < 20) return { text: 'სრული სიჩუმე 🤫', color: 'bg-emerald-50 text-emerald-700 border-emerald-100' };
    if (noise < 35) return { text: 'ჩუმი გარემო 🍃', color: 'bg-teal-50 text-teal-700 border-teal-100' };
    if (noise < 55) return { text: 'ზომიერი ხმაური ☕', color: 'bg-amber-50 text-amber-700 border-amber-100' };
    return { text: 'ხალხმრავალი ჟრიამული 📣', color: 'bg-rose-50 text-rose-700 border-rose-100' };
  };

  // Crowd capacity helper translation
  const getCrowdLabel = (pct: number) => {
    if (pct < 30) return { text: 'ბევრი თავისუფალი ადგილია ✅', color: 'text-emerald-600' };
    if (pct < 65) return { text: 'ადგილები ივსება ნელ-ნელა ⚡', color: 'text-amber-600' };
    return { text: 'თითქმის შევსებულია! 🔥', color: 'text-rose-600 font-bold animate-pulse' };
  };

  // Map projections math: Tbilisi boundaries
  // minLat = 41.685, maxLat = 41.720, minLng = 44.725, maxLng = 44.825
  const getProjectedCoordinates = (lat: number, lng: number) => {
    const minLat = 41.682;
    const maxLat = 41.722;
    const minLng = 44.720;
    const maxLng = 44.820;

    const width = 360;
    const height = 480;

    const x = Math.round(((lng - minLng) / (maxLng - minLng)) * width);
    const y = Math.round(height - ((lat - minLat) / (maxLat - minLat)) * height);

    return { x, y };
  };

  const myLocationProjCoords = useMemo(() => {
    return getProjectedCoordinates(userCoords.lat, userCoords.lng);
  }, [userCoords]);

  // Selected Pin coordinates or general info
  const activePinPlace = useMemo(() => {
    return processedPlacesList.find(p => p.id === selectedMapPinId);
  }, [processedPlacesList, selectedMapPinId]);

  // Drag handlers for Map panning
  const handleMapMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    setMapDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMapMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!mapDragging) return;
    setPanOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMapMouseUpOrLeave = () => {
    setMapDragging(false);
  };

  // Render Georgian user track and goals
  const getStudyGoalLabelGeorgian = (goal: string) => {
    switch(goal) {
      case 'Tech': return '💻 პროგრამირება & AI';
      case 'Languages': return '✍️ უცხო ენები & IELTS';
      case 'Business': return '📈 ბიზნესი & ვენჩურები';
      default: return '🎓 გამოცდები';
    }
  };

  const getLearningModeLabelGeorgian = (mode: string) => {
    switch(mode) {
      case 'Online': return '🌐 ონლაინ სწავლა (დისტანციური)';
      case 'Offline': return '🏫 დასწრებით (ლოკალურ სივრცეებში)';
      case 'Distant': return '📍 ჰიბრიდული სწავლების ფორმატი';
      default: return '🤝 კოჰორტები (ჯგუფური)';
    }
  };

  return (
    <div className="relative mx-auto w-full max-w-[360px] rounded-[52px] border-[12px] border-slate-900 bg-slate-950 p-0.5 iphone-bezel select-none overflow-hidden shadow-2xl">
      
      {/* Camera Notch Dynamic Island */}
      <div className="absolute top-4 left-1/2 z-50 h-[30px] w-[124px] -translate-x-1/2 rounded-full bg-black flex items-center justify-between px-2.5 shadow-inner">
        <div className="h-2 w-2 rounded-full bg-slate-900/60" />
        <div className="h-1 text-[8px] text-teal-400 font-mono flex items-center gap-1">
          <CircleDot className="w-1.5 h-1.5 animate-pulse bg-teal-400 rounded-full" />
          <span className="text-[7.5px] font-bold tracking-tight">EduNest-Live</span>
        </div>
        <div className="h-1 w-3 rounded-full bg-slate-900" />
      </div>

      {/* Main Simulated Phone screen */}
      <div className="h-[680px] w-full rounded-[40px] bg-slate-50 flex flex-col overflow-hidden relative">

        {/* Dynamic iOS Status Bar with current time */}
        <div className="bg-white/95 backdrop-blur-md px-7 pt-4 pb-1.5 border-b border-slate-100 flex justify-between items-center text-[11px] text-slate-800 font-bold z-40 shrink-0">
          <span className="font-sans font-black select-none">12:30 PM</span>
          <div className="flex items-center gap-1.5">
            <Signal className="w-3.5 h-3.5 text-slate-800" />
            <span className="text-[10px] font-mono font-extrabold text-teal-600">5G</span>
            <Wifi className="w-3.5 h-3.5 text-slate-800" />
            <div className="h-3 w-6 border-2 border-slate-800 rounded-md p-0.5 flex items-center bg-transparent gap-0.5">
              <div className="w-3.5 h-1.5 bg-slate-800 rounded-xs" />
            </div>
          </div>
        </div>

        {/* Dynamic screen content panel */}
        <div className="flex-1 overflow-y-auto pb-20 relative bg-[#f8fafc]">
          <AnimatePresence mode="wait">

            {/* 0. REGISTRATION ONBOARDING SCREEN MATCHING THE UPLOADED PHOTO */}
            {currentScreen === 'registration' && (
              <motion.div
                key="registration"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="p-5 space-y-5 bg-[#f4f7fe]/80 min-h-full font-sans text-center"
              >
                {/* Brand Showcase Logo matched to the photo */}
                <div className="space-y-2 mt-2 w-full select-none">
                  <div className="flex justify-center">
                    {/* Rounded squircle gradient holder matching the image */}
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#06b6d4] via-[#2563eb] to-[#7c3aed] flex items-center justify-center shadow-md animate-pulse">
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
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-bold tracking-tight text-[#0f172a] mt-2 leading-none">შემოუერთდი EduNest-ს</h2>
                    <p className="text-[10px] text-slate-500 font-medium mt-1">დაიწყე შენთვის იდეალური სასწავლო სივრცეების აღმოჩენა</p>
                  </div>
                </div>

                {/* Registration Card matches image style */}
                <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm text-left space-y-3.5 pt-4">
                  
                  {/* Full Name field */}
                  <div className="space-y-1">
                    <label className="block text-slate-800 font-extrabold text-[8.5px] tracking-wide uppercase">სრული სახელი</label>
                    <input
                      type="text"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="მაგ: მაია ჩენი"
                      className="w-full rounded-xl border border-slate-200 bg-white py-2 px-3 text-[10.5px] font-semibold text-slate-800 focus:border-indigo-500 outline-none transition font-sans placeholder-slate-400"
                    />
                  </div>

                  {/* Email field */}
                  <div className="space-y-1">
                    <label className="block text-slate-800 font-extrabold text-[8.5px] tracking-wide uppercase">ელ-ფოსტა</label>
                    <input
                      type="email"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full rounded-xl border border-slate-200 bg-white py-2 px-3 text-[10.5px] font-semibold text-slate-800 focus:border-indigo-500 outline-none transition font-sans placeholder-slate-400"
                    />
                  </div>

                  {/* Password field */}
                  <div className="space-y-1">
                    <label className="block text-slate-800 font-extrabold text-[8.5px] tracking-wide uppercase">პაროლი</label>
                    <input
                      type="password"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="მინიმუმ 8 სიმბოლო"
                      className="w-full rounded-xl border border-slate-200 bg-white py-2 px-3 text-[10.5px] font-semibold text-slate-800 focus:border-indigo-500 outline-none transition font-sans placeholder-slate-400"
                    />
                  </div>

                  {/* Confirm Password field */}
                  <div className="space-y-1">
                    <label className="block text-slate-800 font-extrabold text-[8.5px] tracking-wide uppercase">დაადასტურეთ პაროლი</label>
                    <input
                      type="password"
                      value={regConfirmPassword}
                      onChange={(e) => setRegConfirmPassword(e.target.value)}
                      placeholder="გაიმეორეთ პაროლი"
                      className="w-full rounded-xl border border-slate-200 bg-white py-2 px-3 text-[10.5px] font-semibold text-slate-800 focus:border-indigo-500 outline-none transition font-sans placeholder-slate-400"
                    />
                  </div>

                  {/* Select Your Interests capsule grid */}
                  <div className="space-y-1 pt-1">
                    <label className="block text-slate-800 font-extrabold text-[8.5px] tracking-wide uppercase">აირჩიეთ თქვენი ინტერესები</label>
                    <div className="flex flex-wrap gap-1.5 pt-1 max-h-[140px] overflow-y-auto no-scrollbar">
                      {[
                        'ფინანსები', 'ტექნოლოგიები', 'ხელოვნური ინტელექტი', 'მედიცინა', 
                        'ბიზნესი', 'მეწარმეობა', 'საინჟინრო საქმე', 
                        'დიზაინი', 'მარკეტინგი', 'უცხო ენები', 'მეცნიერება', 
                        'პოლიტიკა', 'სამართალი'
                      ].map((interest) => {
                        const isSelected = selectedInterests.includes(interest);
                        return (
                          <button
                            key={interest}
                            type="button"
                            onClick={() => {
                              if (isSelected) {
                                setSelectedInterests(prev => prev.filter(x => x !== interest));
                              } else {
                                setSelectedInterests(prev => [...prev, interest]);
                              }
                            }}
                            className={`text-[8.5px] px-3 py-1.5 rounded-full font-bold transition-all border cursor-pointer ${
                              isSelected
                                ? 'bg-gradient-to-r from-[#06b6d4] to-[#7c3aed] text-white border-transparent shadow-3xs'
                                : 'bg-slate-50/70 hover:bg-slate-100 text-slate-600 border-slate-150'
                            }`}
                          >
                            {interest}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Register action button matches photo blue/cyan gradient */}
                  <button
                    type="button"
                    onClick={() => {
                      onRegister({
                        name: regName.trim() || 'მაია ჩენი',
                        avatar: regAvatar,
                        studyGoal: selectedInterests[0] || 'ტექნოლოგიები',
                        learningMode: 'Offline',
                        email: regEmail.trim() || 'your@email.com',
                        interests: selectedInterests,
                      });
                    }}
                    className="w-full mt-3 rounded-xl bg-gradient-to-r from-[#06b6d4] via-[#2563eb] to-[#7c3aed] text-white font-extrabold py-2.5 text-[10.5px] uppercase tracking-wider shadow-sm hover:opacity-95 transition cursor-pointer flex items-center justify-center gap-2"
                  >
                    ანგარიშის შექმნა
                  </button>

                  {/* Already have an account text links */}
                  <div className="pt-2 text-center">
                    <p className="text-[9.5px] text-slate-400 font-semibold font-sans">
                      უკვე გაქვთ ანგარიში?{' '}
                      <button
                        type="button"
                        onClick={() => {
                          onRegister({
                            name: regName.trim() || 'მაია ჩენი',
                            avatar: regAvatar,
                            studyGoal: selectedInterests[0] || 'ტექნოლოგიები',
                            learningMode: 'Offline',
                            email: regEmail.trim() || 'your@email.com',
                            interests: selectedInterests,
                          });
                        }}
                        className="text-[#06b6d4] font-extrabold hover:underline cursor-pointer"
                      >
                        შესვლა
                      </button>
                    </p>
                  </div>

                </div>
              </motion.div>
            )}

            {/* 1. GEORGIAN HOME SCREEN */}
            {currentScreen === 'home' && (
              <motion.div
                key="home"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.2 }}
                className="p-5 space-y-5"
              >
                {/* Greeting banner header */}
                <div className="flex items-center justify-between mt-2">
                  <div>
                    <span className="font-mono text-[9px] text-slate-400 uppercase tracking-widest font-bold">წარმატებულ დღეს გისურვებთ!</span>
                    <h2 className="font-display text-xl font-bold text-slate-900 leading-tight">სალამი, {registeredUser ? registeredUser.name : 'ნიკა'} 👋</h2>
                  </div>
                  <div 
                    onClick={() => setProfileSheetOpen(true)}
                    className="relative group cursor-pointer"
                  >
                    <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#06b6d4] to-[#7c3aed] opacity-60 blur-xs" />
                    <div className="relative w-11 h-11 rounded-full border-2 border-white overflow-hidden shadow-xs flex items-center justify-center bg-gradient-to-tr from-[#06b6d4] via-[#2563eb] to-[#7c3aed] text-white text-xs font-black">
                      {registeredUser?.name ? registeredUser.name.charAt(0).toUpperCase() : 'M'}
                    </div>
                  </div>
                </div>

                {/* Dynamic EduNest Core Slogan Showcase */}
                <div className="rounded-2xl bg-gradient-to-tr from-indigo-700 via-purple-700 to-teal-500 text-white p-4.5 shadow-md relative overflow-hidden">
                  <div className="absolute -right-4 -bottom-4 w-28 h-28 bg-white/5 rounded-full blur-xl" />
                  <div className="absolute top-2 right-2 rounded-full bg-white/10 px-2 py-0.5 text-[8px] uppercase tracking-widest font-mono">
                    ONLINE BLUEPRINT
                  </div>
                  <span className="font-mono text-[8px] uppercase tracking-widest text-indigo-150 opacity-90 block">პრემიუმ სისტემა</span>
                  <h3 className="font-display text-[15px] font-bold mt-1 leading-snug">
                    „შენი სივრცე.<br />შენი მომავალი.“
                  </h3>
                  <p className="text-[10px] text-indigo-50 opacity-95 mt-2 font-sans leading-relaxed">
                    მოძებნე მყუდრო სამუშაო სივრცეები თბილისში, განაგრძე სწავლა და მოიპოვე გრანტები.
                  </p>
                </div>

                {/* Quick Search proxy redirecting to Places page */}
                <div 
                  onClick={() => onScreenChange('places')}
                  className="rounded-xl border border-slate-200 bg-white p-3 flex items-center gap-3 shadow-3xs cursor-pointer hover:border-indigo-400 transition"
                >
                  <Search className="w-4 h-4 text-slate-400" />
                  <span className="text-[11px] text-slate-400 font-sans">მოძებნე სივრცეები, განაცხადები...</span>
                </div>

                {/* Opportunities hub categories in Georgian */}
                <div className="space-y-2.5">
                  <h4 className="font-display text-[9px] font-bold uppercase tracking-wider text-slate-400">EduNest ინფრასტრუქტურა</h4>
                  <div className="grid grid-cols-3 gap-2">
                    
                    {/* HUB 1: SPACES */}
                    <div 
                      onClick={() => onScreenChange('places')}
                      className="rounded-2xl border border-indigo-100 bg-indigo-50/40 p-3 flex flex-col gap-2 cursor-pointer hover:bg-indigo-50 transition"
                    >
                      <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="block font-display text-[11px] font-bold text-slate-800 leading-none">სივრცეები</span>
                        <span className="text-[8.5px] text-indigo-600 font-sans font-bold mt-1 block">{placesList.length} წერტილი</span>
                      </div>
                    </div>

                    {/* HUB 2: MAP */}
                    <div 
                      onClick={() => onScreenChange('map')}
                      className="rounded-2xl border border-teal-100 bg-teal-50/40 p-3 flex flex-col gap-2 cursor-pointer hover:bg-teal-50 transition"
                    >
                      <div className="w-8 h-8 rounded-xl bg-teal-600 text-white flex items-center justify-center">
                        <Map className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="block font-display text-[11px] font-bold text-slate-800 leading-none">რუკა (GPS)</span>
                        <span className="text-[8.5px] text-teal-600 font-sans font-bold mt-1 block">ცოცხალი</span>
                      </div>
                    </div>

                    {/* HUB 3: CLASSES */}
                    <div 
                      onClick={() => onScreenChange('programs')}
                      className="rounded-2xl border border-purple-100 bg-purple-50/40 p-3 flex flex-col gap-2 cursor-pointer hover:bg-purple-50 transition"
                    >
                      <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="block font-display text-[11px] font-bold text-slate-800 leading-none">კურსები</span>
                        <span className="text-[8.5px] text-purple-600 font-sans font-bold mt-1 block">{PROGRAMS.length} სილაბუსი</span>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Spotlit curated Space banner in Georgian */}
                <div className="rounded-2xl border border-slate-100 bg-white p-4 space-y-3 shadow-3xs">
                  <div className="flex justify-between items-center border-b border-slate-50 pb-2">
                    <span className="rounded-full bg-amber-50 border border-amber-100 text-amber-850 text-[8.5px] font-bold px-2 py-0.5 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-500 fill-amber-500" />
                      საუკეთესო სივრცე დღეს
                    </span>
                    <span className="text-[8.5px] text-slate-400 font-semibold font-mono flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      განახლდა ახლახან
                    </span>
                  </div>

                  <div 
                    onClick={() => onScreenChange('place-detail', 'place-1')}
                    className="flex gap-3 items-center cursor-pointer hover:-translate-y-0.5 transition"
                  >
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-200 shrink-0 shadow-3xs">
                      <img src={processedPlacesList[0].image} className="w-full h-full object-cover" referrerPolicy="no-referrer" alt="" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-display text-xs font-bold text-slate-850 truncate leading-tight">{processedPlacesList[0].name}</h4>
                      <p className="text-[9.5px] text-slate-500 font-sans mt-0.5 truncate flex items-center gap-1 leading-none">
                        <MapPin className="w-2.5 h-2.5 text-rose-500 shrink-0" />
                        {processedPlacesList[0].address}
                      </p>
                      <div className="flex items-center gap-2 mt-1 font-mono text-[9px] text-slate-600">
                        <span className="text-emerald-600 font-bold">ხმაური: {100 - processedPlacesList[0].noiseLevel}% მშვიდი</span>
                        <span>·</span>
                        <span className="text-indigo-600 font-bold">{processedPlacesList[0].distance}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 2. GEORGIAN PLACES LIST DISCOVERY SCREEN */}
            {currentScreen === 'places' && (
              <motion.div
                key="places"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.2 }}
                className="p-4 space-y-4"
              >
                {/* Header title */}
                <div className="flex items-center justify-between pt-1">
                  <div>
                    <h2 className="font-display text-lg font-black text-slate-900 tracking-tight">სწავლის სივრცეები</h2>
                    <p className="text-[10px] text-slate-400 font-medium">თბილისის მყუდრო წერტილები</p>
                  </div>
                  <button 
                    onClick={() => onScreenChange('map')}
                    className="p-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-[10px] flex items-center gap-1 cursor-pointer shadow-3xs"
                  >
                    <Map className="w-3.5 h-3.5" />
                    რუკის ხედი
                  </button>
                </div>

                {/* Filter and search parameters */}
                <div className="space-y-2">
                  <div className="relative">
                    <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={placesSearch}
                      onChange={(e) => setPlacesSearch(e.target.value)}
                      placeholder="მოძებნე მაგიდები, კაფე, მისამართი..."
                      className="w-full text-xs font-semibold pl-10 pr-4 py-2 bg-white text-slate-800 rounded-xl border border-slate-200 shadow-3xs outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                {/* Quick decibel override setting dashboard slider info */}
                <div className="bg-indigo-50/45 border border-indigo-100/60 rounded-2xl p-3 space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1.5 text-indigo-950 font-bold text-[10px] uppercase">
                      <Sliders className="w-3.5 h-3.5 text-indigo-600" />
                      გარემო პირობების სიმულატორი
                    </div>
                    <span className="text-[8px] font-mono font-bold text-indigo-600 bg-indigo-50 px-1 rounded">
                      ცოცხალი IoT
                    </span>
                  </div>

                  <div className="flex gap-1.5 pt-1">
                    {[
                      { key: 'Auto', label: '⚙️ ავტო ლოგიკა' },
                      { key: 'SilentHour', label: '🤫 Silent საათი' },
                      { key: 'CoffeeRush', label: '☕ ყავის რიგები' }
                    ].map(preset => (
                      <button
                        key={preset.key}
                        onClick={() => setSensoryPreset(preset.key as any)}
                        className={`text-[9.5px] px-2 py-1 rounded-lg border flex-1 font-bold ${sensoryPreset === preset.key ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white border-slate-200 text-slate-600'}`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* List of Places inside Tbilisi */}
                <div className="space-y-3.5">
                  {filteredPlaces.length === 0 ? (
                    <div className="p-8 text-center text-slate-400 text-xs">
                      <AlertCircle className="w-8 h-8 mx-auto text-slate-350 mb-2" />
                      თქვენი ძიებით სივრცეები ვერ მოიძებნა.
                    </div>
                  ) : (
                    filteredPlaces.map((place) => (
                      <div
                        key={place.id}
                        onClick={() => onScreenChange('place-detail', place.id)}
                        className="rounded-2xl border border-slate-100 bg-white hover:border-indigo-350 hover:shadow-2xs transition duration-200 overflow-hidden flex flex-col group cursor-pointer shadow-3xs"
                      >
                        <div className="relative h-28 w-full bg-slate-200">
                          <img src={place.image} className="w-full h-full object-cover" referrerPolicy="no-referrer" alt="" />
                          <div className="absolute top-2.5 right-2.5 rounded-full bg-white/95 backdrop-blur-md px-2.5 py-1 font-sans font-bold flex items-center gap-1 text-[11px] text-slate-800 shadow-sm">
                            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                            {place.rating}
                          </div>
                          
                          <div className="absolute bottom-2.5 left-2.5 rounded bg-indigo-600 text-white px-2 py-0.5 font-sans font-black text-[9px] uppercase tracking-wider">
                            {place.type === 'coworking' ? 'ქოვორქინგი' : place.type === 'cafe' ? 'კაფე' : 'ბიბლიოთეკა'}
                          </div>
                        </div>

                        <div className="p-3.5 space-y-2">
                          <div className="space-y-0.5">
                            <h3 className="font-display text-xs font-black text-slate-900 group-hover:text-indigo-600 transition truncate leading-snug">
                              {place.name}
                            </h3>
                            <p className="text-[10px] text-slate-400 font-sans flex items-center gap-1 mt-0.5 truncate leading-none">
                              <MapPin className="w-3 h-3 text-rose-500 shrink-0" />
                              {place.address}
                            </p>
                          </div>

                          <div className="flex flex-wrap gap-1">
                            {place.tags.slice(0, 3).map((tag, i) => (
                              <span key={i} className="rounded-md bg-slate-50 border border-slate-100 text-slate-500 font-sans font-medium text-[8.5px] px-1.5 py-0.5">
                                {tag}
                              </span>
                            ))}
                          </div>

                          <div className="flex justify-between items-center text-[9.5px] border-t border-slate-50 pt-2.5 mt-1 font-semibold text-slate-600">
                            <span className="flex items-center gap-1 text-indigo-700">
                              <Compass className="w-3.5 h-3.5 text-slate-400" />
                              მანძილი: <strong>{place.distance}</strong>
                            </span>
                            
                            <span className={`px-2 py-0.5 rounded-full border text-[8.5px] ${getNoiseLabel(place.noiseLevel).color}`}>
                              {getNoiseLabel(place.noiseLevel).text}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            )}

            {/* 3. NEW STUNNING INTERACTIVE MAP SCREEN */}
            {currentScreen === 'map' && (
              <motion.div
                key="map"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col h-full bg-slate-50"
              >
                {/* Georgian Map View Header Overlay */}
                <div className="p-4 bg-white border-b border-slate-100 shrink-0 shadow-3xs">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="font-display text-md font-black text-slate-900 leading-none">ცოცხალი საორიენტაციო რუკა</h2>
                      <p className="text-[9.5px] text-slate-400 font-medium mt-1">ინტერაქტიული GPS ნავიგაცია და სენსორები</p>
                    </div>
                    
                    <button
                      onClick={handleRequestLiveGPS}
                      disabled={gpsLoading}
                      className="p-1 px-2.5 text-[9px] rounded-lg border border-slate-200 font-bold flex items-center gap-1 cursor-pointer bg-slate-50 text-slate-700 hover:bg-slate-100 transition shadow-3xs"
                    >
                      {gpsLoading ? (
                        <RefreshCw className="w-3 h-3 animate-spin text-teal-600" />
                      ) : (
                        <Navigation className="w-3 h-3 text-teal-600 animate-pulse" />
                      )}
                      GPS-ლოკატორი
                    </button>
                  </div>

                  {/* Enhanced Horizontal Map Filter Category Chips */}
                  <div className="flex gap-1.5 mt-3 overflow-x-auto no-scrollbar pb-1 select-none">
                    {[
                      { id: 'all', label: '🌐 ყველა სივრცე' },
                      { id: 'coworking', label: '💼 მხოლოდ ქოვორქინგი' },
                      { id: 'cafe', label: '☕ კაფეები' },
                      { id: 'library', label: '🏛️ ბიბლიოთეკა' },
                      { id: 'quiet', label: '🤫 ძალიან ჩუმი (≤30 dB)' }
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          setMapFilter(item.id as any);
                          setSelectedLandmark(null);
                        }}
                        className={`text-[8.5px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap transition border ${
                          mapFilter === item.id
                            ? 'bg-teal-600 text-white border-teal-600 shadow-2xs'
                            : 'bg-slate-50 text-slate-600 border-slate-100 hover:bg-slate-100'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>

                  {/* GPS Success or Error Indicator banner */}
                  {gpsError && (
                    <div className="mt-2 text-[8px] bg-amber-50 rounded p-1.5 border border-amber-200 text-amber-800 font-sans flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{gpsError}</span>
                    </div>
                  )}
                </div>

                {/* SVG Vector Interactive Map Display Container */}
                <div className="relative bg-[#080d1a] h-[340px] select-none overflow-hidden border-b border-slate-200">
                  
                  {/* Floating Action Overlay for Active Landmark Info */}
                  {selectedLandmark && (
                    <div className="absolute top-2.5 left-2.5 right-14 z-40 bg-slate-900/95 border border-slate-800 text-white p-2 rounded-xl text-[9px] shadow-lg animate-fadeIn flex items-start gap-2 backdrop-blur-xs">
                      <span className="text-sm shrink-0">📍</span>
                      <div className="min-w-0 flex-1">
                        <h5 className="font-extrabold text-[#00e5ff] truncate leading-tight">
                          {selectedLandmark === 'lnd-1' ? 'მთაწმინდის ანძა 🗼' : selectedLandmark === 'lnd-2' ? 'მშვიდობის ხიდი 🌉' : 'ეროვნული ბიბლიოთეკა 🏛️'}
                        </h5>
                        <p className="text-slate-300 text-[8.5px] mt-0.5 leading-normal">
                          {selectedLandmark === 'lnd-1'
                            ? 'Tbilisi TV Tower — მშვენიერი ხედი და მშვიდი აურა მთაწმინდაზე 🌲'
                            : selectedLandmark === 'lnd-2'
                            ? 'Bridge of Peace — დააკავშირებს ძველ თბილისს რიყის პარკთან 🌊'
                            : 'National Library — იდეალური აკადემიური სივრცე და კვლევის ცენტრი 📚'}
                        </p>
                      </div>
                      <button onClick={() => setSelectedLandmark(null)} className="text-slate-400 hover:text-white shrink-0 p-0.5">
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )}

                  {/* Zoom Controls inside layout */}
                  <div className="absolute top-3 right-3 z-30 flex flex-col gap-1.5">
                    <button
                      onClick={() => setZoomLevel(prev => Math.min(2.5, prev + 0.25))}
                      className="bg-slate-900/80 hover:bg-slate-900 text-white border border-slate-800 p-1.5 rounded-lg shadow-md flex items-center justify-center shrink-0 cursor-pointer transition select-none"
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setZoomLevel(prev => Math.max(0.75, prev - 0.25))}
                      className="bg-slate-900/80 hover:bg-slate-900 text-white border border-slate-800 p-1.5 rounded-lg shadow-md flex items-center justify-center shrink-0 cursor-pointer transition select-none"
                    >
                      <ZoomOut className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        setZoomLevel(1.0);
                        setPanOffset({ x: 0, y: 0 });
                        setSelectedMapPinId(null);
                        setSelectedLandmark(null);
                      }}
                      className="bg-slate-900/80 hover:bg-slate-900 text-[#00e5ff] border border-slate-800 p-1 rounded-lg shadow-md flex items-center justify-center shrink-0 cursor-pointer text-[8px] font-bold transition select-none"
                    >
                      რესეტი
                    </button>
                  </div>

                  {/* GPS center focus button */}
                  <div className="absolute bottom-3 right-3 z-30">
                    <button
                      onClick={() => {
                        setPanOffset({ x: 0, y: 0 });
                        setZoomLevel(1.3);
                      }}
                      className="bg-teal-600 hover:bg-teal-700 text-white p-2 rounded-xl shadow-lg flex items-center gap-1 text-[9px] font-bold cursor-pointer transition"
                    >
                      <Navigation className="w-3 h-3 animate-bounce" />
                      როუტი Geolab-ზე
                    </button>
                  </div>

                  {/* SVG Map Canvas Viewport with Panning support */}
                  <svg
                    viewBox="0 0 360 480"
                    className="w-full h-[380px] cursor-grab active:cursor-grabbing"
                    onMouseDown={handleMapMouseDown}
                    onMouseMove={handleMapMouseMove}
                    onMouseUp={handleMapMouseUpOrLeave}
                    onMouseLeave={handleMapMouseUpOrLeave}
                  >
                    {/* SVG Viewport Transformer matrix */}
                    <g transform={`translate(${panOffset.x}, ${panOffset.y}) scale(${zoomLevel})`}>
                      
                      {/* Grid overlay mesh for futuristic tech map vibe */}
                      <pattern id="premiumCityGrid" width="30" height="30" patternUnits="userSpaceOnUse">
                        <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#101827" strokeWidth="0.8" />
                        <circle cx="0" cy="0" r="0.8" fill="#1e293b" />
                      </pattern>
                      <rect width="1200" height="1200" x="-400" y="-400" fill="url(#premiumCityGrid)" />

                      {/* Concentric Search Radar Circles Overlay from Geolab */}
                      <circle cx="271" cy="196" r="45" fill="none" stroke="#2563eb" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.3" />
                      <circle cx="271" cy="196" r="95" fill="none" stroke="#2563eb" strokeWidth="0.5" strokeDasharray="3 5" opacity="0.15" />
                      <circle cx="271" cy="196" r="160" fill="none" stroke="#2563eb" strokeWidth="0.5" strokeDasharray="4 6" opacity="0.1" />

                      {/* GEORGIAN LANDSCAPE: VAKE PARK (Emerald Zone) */}
                      <path
                        d="M -20 180 L 110 210 L 125 320 L -20 280 Z"
                        fill="#10b981"
                        fillOpacity="0.12"
                        stroke="#10b981"
                        strokeWidth="0.8"
                        strokeDasharray="3 2"
                        opacity="0.7"
                      />
                      <text x="35" y="245" fill="#10b981" fontSize="6.5" fontWeight="bold" opacity="0.6">
                        ვაკის პარკი • Vake Park 🌳
                      </text>

                      {/* GEORGIAN LANDSCAPE: MTATSMINDA FOREST & FUNICULAR */}
                      <path
                        d="M 60 330 Q 140 370, 95 440 T -10 390 Z"
                        fill="#059669"
                        fillOpacity="0.11"
                        stroke="#059669"
                        strokeWidth="0.6"
                        opacity="0.6"
                      />
                      <text x="50" y="380" fill="#059669" fontSize="6.5" fontWeight="bold" opacity="0.5" transform="rotate(-15 50 380)">
                        მთაწმინდის ტყე-პარკი
                      </text>

                      {/* GEORGIAN LANDSCAPE: RIKE PARK (Teal Grass) */}
                      <path
                        d="M 285 270 Q 300 250, 315 285 T 295 330 T 270 295 Z"
                        fill="#0d9488"
                        fillOpacity="0.15"
                        stroke="#0d9488"
                        strokeWidth="0.7"
                        opacity="0.8"
                      />
                      <text x="290" y="295" fill="#2dd4bf" fontSize="5.5" fontWeight="bold" opacity="0.7">
                        რიყის პარკი
                      </text>

                      {/* GEORGIAN WATER LAYERS: LISI LAKE (Luminous Indigo Oval) */}
                      <ellipse cx="65" cy="70" rx="35" ry="16" fill="#00e5ff" fillOpacity="0.18" stroke="#00e5ff" strokeWidth="1" strokeDasharray="4 2" />
                      <text x="65" y="72" fill="#00e5ff" fontSize="5.5" fontWeight="black" textAnchor="middle" opacity="0.65">
                        ლისის ტბა • Lisi Lake 💧
                      </text>

                      {/* TBILISI MTKVARI RIVER (Cyber Blue neon glow sweep) */}
                      {/* Thicker River Underglow */}
                      <path
                        d="M -150 420 Q 130 300, 240 320 T 520 180"
                        stroke="#0284c7"
                        strokeWidth="15"
                        fill="none"
                        opacity="0.15"
                        strokeLinecap="round"
                      />
                      {/* River main flow */}
                      <path
                        d="M -150 420 Q 130 300, 240 320 T 520 180"
                        stroke="#0ea5e9"
                        strokeWidth="6"
                        fill="none"
                        opacity="0.6"
                        strokeLinecap="round"
                      />
                      <text x="220" y="295" fill="#38bdf8" fontSize="7" fontWeight="bold" opacity="0.6" transform="rotate(7 220 295)">
                        მდ. მტკვარი • Mtkvari River 🌊
                      </text>

                      {/* MAJOR ROAD NETWORK (Double neon white/slate outlines) */}
                      {/* Melikishvili & Rustaveli Avenue */}
                      <path d="M 70 340 L 271 210 L 330 190" stroke="#1e293b" strokeWidth="6" strokeLinecap="round" opacity="0.6" />
                      <path d="M 70 340 L 271 210 L 330 190" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
                      <text x="145" y="270" fill="#94a3b8" fontSize="6" fontWeight="bold" opacity="0.5" transform="rotate(-33 145 270)">
                        რუსთაველის გამზირი (Rustaveli Ave)
                      </text>

                      {/* Merab Kostava Street */}
                      <path d="M 271 210 L 290 120 L 360 80" stroke="#1e293b" strokeWidth="6" strokeLinecap="round" opacity="0.6" />
                      <path d="M 271 210 L 290 120 L 360 80" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
                      <text x="310" y="140" fill="#94a3b8" fontSize="6" fontWeight="bold" opacity="0.5" transform="rotate(-74 310 140)">
                        კოზმავას ქ. (Kostava St)
                      </text>

                      {/* Chavchavadze Avenue */}
                      <path d="M -50 250 L 70 340" stroke="#1e293b" strokeWidth="6" strokeLinecap="round" opacity="0.6" />
                      <path d="M -50 250 L 70 340" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
                      <text x="5" y="295" fill="#94a3b8" fontSize="6" fontWeight="bold" opacity="0.5" transform="rotate(37 5 295)">
                        ჭავჭავაძის გამზ.
                      </text>

                      {/* Pekini Avenue */}
                      <path d="M 120 180 L 250 110 L 290 120" stroke="#101827" strokeWidth="5.5" strokeLinecap="round" />
                      <path d="M 120 180 L 250 110 L 290 120" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
                      <text x="180" y="140" fill="#64748b" fontSize="5.5" opacity="0.5" transform="rotate(-28 180 140)">
                        პეკინის გამზ. (Pekini St)
                      </text>

                      {/* DISTRICT LABELS */}
                      <rect x="235" y="60" width="60" height="12" rx="3" fill="#0f172a" stroke="#1e293b" strokeWidth="0.5" opacity="0.5" />
                      <text x="265" y="68" fill="#64748b" fontSize="5.5" fontWeight="black" textAnchor="middle" letterSpacing="0.5" opacity="0.6">
                        საბურთალო
                      </text>

                      <rect x="290" y="440" width="60" height="12" rx="3" fill="#0f172a" stroke="#1e293b" strokeWidth="0.5" opacity="0.5" />
                      <text x="320" y="448" fill="#64748b" fontSize="5.5" fontWeight="black" textAnchor="middle" letterSpacing="0.5" opacity="0.6">
                        ძველი თბილისი
                      </text>

                      {/* INTERACTIVE CLICKABLE CITY LANDMARKS */}
                      {[
                        { id: 'lnd-1', x: 75, y: 395, name: 'Tbilisi TV Tower', color: '#00e5ff' },
                        { id: 'lnd-2', x: 300, y: 285, name: 'Bridge of Peace', color: '#38bdf8' },
                        { id: 'lnd-3', x: 230, y: 195, name: 'National Library', color: '#fb923c' }
                      ].map((landmark) => (
                        <g
                          key={landmark.id}
                          transform={`translate(${landmark.x}, ${landmark.y})`}
                          className="cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedLandmark(landmark.id);
                          }}
                        >
                          <circle cx="0" cy="0" r="7" fill={landmark.color} fillOpacity="0.2" className="animate-pulse" />
                          <circle cx="0" cy="0" r="3.5" fill={landmark.color} stroke="#ffffff" strokeWidth="0.8" />
                          <circle cx="0" cy="0" r="1.5" fill="#020617" />
                        </g>
                      ))}

                      {/* SOPHISTICATED NEON GPS walking route overlay (only if Study Space pin is selected) */}
                      {activePinPlace && activePinPlace.lat && activePinPlace.lng && (
                        <g>
                          {(() => {
                            const destProj = getProjectedCoordinates(activePinPlace.lat, activePinPlace.lng);
                            
                            // Multi-segment street mimicking path
                            const midX = myLocationProjCoords.x;
                            const midY = destProj.y;
                            const pathStr = `M ${myLocationProjCoords.x} ${myLocationProjCoords.y} L ${midX} ${midY} L ${destProj.x} ${destProj.y}`;
                            
                            return (
                              <>
                                {/* Glowing highway underglow */}
                                <path
                                  d={pathStr}
                                  fill="none"
                                  stroke="#10b981"
                                  strokeWidth="5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  opacity="0.25"
                                />
                                {/* Main animated route dashed line */}
                                <path
                                  d={pathStr}
                                  fill="none"
                                  stroke="#10b981"
                                  strokeWidth="2.2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeDasharray="4 3"
                                  className="animate-pulse"
                                />
                                {/* Soft sonar target ring */}
                                <circle cx={destProj.x} cy={destProj.y} r="22" fill="none" stroke="#10b981" strokeWidth="0.8" strokeDasharray="2 3" opacity="0.5" />
                              </>
                            );
                          })()}
                        </g>
                      )}

                      {/* MY USER LOCATION: Gps Pulse Circle */}
                      <g transform={`translate(${myLocationProjCoords.x}, ${myLocationProjCoords.y})`}>
                        <circle cx="0" cy="0" r="12" fill="#3b82f6" opacity="0.3" className="animate-ping" style={{ transformOrigin: 'center' }} />
                        <circle cx="0" cy="0" r="6.5" fill="#1d4ed8" opacity="0.4" />
                        <circle cx="0" cy="0" r="4.2" fill="#ffffff" stroke="#2563eb" strokeWidth="2.2" />
                        <text x="8" y="2.5" fill="#38bdf8" fontSize="6" fontWeight="extrabold" className="font-sans">
                          მე (Geolab) 📍
                        </text>
                      </g>

                      {/* STUDY PLACES INTERACTIVE PIN MARKERS */}
                      {processedPlacesList
                        .filter(p => {
                          if (mapFilter === 'all') return true;
                          if (mapFilter === 'quiet') return p.noiseLevel <= 30;
                          return p.type === mapFilter;
                        })
                        .map((place) => {
                          if (!place.lat || !place.lng) return null;
                          const proj = getProjectedCoordinates(place.lat, place.lng);
                          const isSelected = selectedMapPinId === place.id;
                          
                          // Type matches colors
                          const pinColor = isSelected 
                            ? '#a855f7' // Neon purple for selection
                            : place.type === 'coworking' 
                            ? '#3b82f6' // Blue for co-work
                            : place.type === 'cafe' 
                            ? '#22c55e' // Jade Green for cafes
                            : '#eab308'; // Amber for library
                          
                          return (
                            <g
                              key={place.id}
                              transform={`translate(${proj.x}, ${proj.y})`}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedMapPinId(place.id);
                                setSelectedLandmark(null);
                              }}
                              className="cursor-pointer group transition duration-300"
                            >
                              {/* Glowing background ring */}
                              <circle cx="0" cy="-2.5" r="10" fill={pinColor} opacity={isSelected ? 0.35 : 0.08} className={isSelected ? 'animate-ping' : 'group-hover:scale-125 duration-300'} />
                              
                              {/* Pin shadow ellipse */}
                              <ellipse cx="0" cy="6" rx="4.2" ry="1.2" fill="#000000" opacity="0.45" />

                              {/* Droplet pin map pointer path */}
                              <path
                                d="M 0 -13 C -6 -13 -9.5 -9.5 -9.5 -2.5 C -9.5 4 0 11 0 11 C 0 11 9.5 4 9.5 -2.5 C 9.5 -9.5 6 -13 0 -13 Z"
                                fill={pinColor}
                                stroke="#ffffff"
                                strokeWidth="1.2"
                              />

                              {/* Center icon / point */}
                              <circle cx="0" cy="-2.5" r="3.2" fill="#ffffff" />
                              <circle cx="0" cy="-2.5" r="1.5" fill={isSelected ? '#101827' : pinColor} />

                              {/* Dynamic floating miniature title badge */}
                              <g transform="translate(0, -18)">
                                <rect x="-32" y="-9" width="64" height="9" rx="2" fill="#0f172a" stroke="#1e293b" strokeWidth="0.5" opacity="0.85" />
                                <text x="0" y="-2.5" fill="#f8fafc" fontSize="4.8" fontWeight="bold" textAnchor="middle">
                                  {place.name.split('•')[0].trim().substring(0, 11)}...
                                </text>
                              </g>
                            </g>
                          );
                      })}

                    </g>
                  </svg>
                </div>

                {/* ADVANCED MULTI-TAB BOTTOM DRAWER DETAILS OVERLAY */}
                <div className="bg-white border-t border-slate-100 flex-1 min-h-[170px] shrink-0 shadow-lg flex flex-col font-sans">
                  {activePinPlace ? (
                    <div className="flex flex-col h-full">
                      {/* Subcompact Bottom Sheet Drawer Header */}
                      <div className="px-4 py-2 bg-slate-50 border-b border-slate-100 flex justify-between items-center text-xs shrink-0 select-none">
                        <div className="flex gap-1.5 items-center">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          <h4 className="font-extrabold text-slate-800 text-[10.5px]">სივრცის ცოცხალი მახასიათებლები</h4>
                        </div>
                        <button
                          onClick={() => setSelectedMapPinId(null)}
                          className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Horizontal tab selector for Bottom Sheet */}
                      <div className="flex border-b border-slate-100 shrink-0 select-none bg-slate-50/50">
                        {[
                          { id: 'basic', label: '📝 დეტალები', icon: 'info' },
                          { id: 'outlets', label: '🪑 მაგიდები', icon: 'grid' },
                          { id: 'sensory', label: '📡 სენსორები', icon: 'activity' }
                        ].map((tab) => (
                          <button
                            key={tab.id}
                            onClick={() => setActiveMapTab(tab.id as any)}
                            className={`flex-1 py-1.5 text-[9px] font-black uppercase text-center border-b-2 transition ${
                              activeMapTab === tab.id
                                ? 'border-teal-600 text-teal-700 font-extrabold bg-white'
                                : 'border-transparent text-slate-450 hover:text-slate-700'
                            }`}
                          >
                            {tab.label}
                          </button>
                        ))}
                      </div>

                      {/* Content panel for selected map tab */}
                      <div className="p-3.5 flex-1 overflow-y-auto max-h-[110px] min-h-[90px] select-none">
                        
                        {/* TAB A: BASIC INFORMATION DETAILS */}
                        {activeMapTab === 'basic' && (
                          <div className="space-y-2 animate-fadeIn">
                            <div className="flex gap-2.5 items-start">
                              <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-200 shrink-0 shadow-3xs border border-slate-100">
                                <img src={activePinPlace.image} className="w-full h-full object-cover" referrerPolicy="no-referrer" alt="" />
                              </div>
                              <div className="min-w-0 flex-1 space-y-0.5">
                                <h4 className="font-display text-[11px] font-extrabold text-slate-900 truncate">{activePinPlace.name}</h4>
                                <p className="text-[9px] text-slate-500 truncate">{activePinPlace.address}</p>
                                <div className="flex items-center gap-2 text-[9px] font-bold">
                                  <span className="text-amber-500 flex items-center gap-0.5">
                                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                                    {activePinPlace.rating} ({activePinPlace.reviewsCount})
                                  </span>
                                  <span className="text-teal-600 font-mono">🚶 {activePinPlace.distance} • 5 წთ ფეხით</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-1.5 pt-1.5 border-t border-slate-50 select-none">
                              <button
                                onClick={() => onScreenChange('place-detail', activePinPlace.id)}
                                className="flex-1 py-1 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-black text-[9px] cursor-pointer text-center transition shadow-3xs"
                              >
                                სივრცის სრული გვერდი 🔎
                              </button>
                              <a
                                href={`https://www.google.com/maps/search/?api=1&query=${activePinPlace.lat},${activePinPlace.lng}`}
                                target="_blank"
                                rel="noreferrer"
                                className="py-1 px-3.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold text-[9px] flex items-center justify-center gap-1 transition shadow-3xs"
                              >
                                <Share2 className="w-3 h-3" />
                                ნავიგაცია
                              </a>
                            </div>
                          </div>
                        )}

                        {/* TAB B: OUTLETS / DESK SCHEME BOOKING */}
                        {activeMapTab === 'outlets' && (
                          <div className="space-y-2 animate-fadeIn">
                            <div className="flex justify-between items-center text-[8.5px] text-slate-500 border-b border-blue-50/50 pb-1">
                              <span>🪑 მაგიდის/როზეტის შერჩევა:</span>
                              <span className="font-semibold text-teal-600">სწრაფი დაჯავშნა უფასოდ</span>
                            </div>
                            <div className="grid grid-cols-4 gap-1.5 select-none text-[8px]">
                              {[
                                { id: 'A1', type: 'usb', noise: 'Silent' },
                                { id: 'A2', type: 'plug', noise: 'Silent' },
                                { id: 'B1', type: 'plug', noise: 'Moderate' },
                                { id: 'B2', type: 'usbc', noise: 'Moderate' }
                              ].map((seat) => {
                                const isBooked = bookedSeats.includes(`${activePinPlace.id}-${seat.id}`);
                                return (
                                  <div
                                    key={seat.id}
                                    onClick={() => {
                                      if (isBooked) {
                                        setBookedSeats(prev => prev.filter(x => x !== `${activePinPlace.id}-${seat.id}`));
                                      } else {
                                        setBookedSeats(prev => [...prev, `${activePinPlace.id}-${seat.id}`]);
                                      }
                                    }}
                                    className={`p-1.5 rounded-lg border flex flex-col items-center justify-center cursor-pointer transition ${
                                      isBooked
                                        ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-bold'
                                        : 'bg-slate-50/60 border-slate-200 hover:bg-slate-100 text-slate-700'
                                    }`}
                                  >
                                    <span className="font-extrabold text-[9px]">{seat.id}</span>
                                    {isBooked ? (
                                      <span className="text-[7.5px] text-emerald-600 mt-0.5">✓ დაჯავშნილი</span>
                                    ) : (
                                      <span className="text-[8px] text-slate-405 font-mono mt-0.5">🔌 {seat.type}</span>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* TAB C: SENSORY MONITOR / DECIBELS REALTIME WAVELINE */}
                        {activeMapTab === 'sensory' && (
                          <div className="space-y-2 animate-fadeIn">
                            <div className="flex justify-between items-center text-[8.5px]">
                              <span className="text-slate-500">Live ხმაურის ინდექსი:</span>
                              <span className={`px-1.5 py-0.5 rounded font-black ${
                                liveDecibels < 30 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                              }`}>
                                {liveDecibels} dB
                              </span>
                            </div>

                            {/* Live Sound Spectrum Pulses Bar */}
                            <div className="flex gap-1 h-5 justify-center items-end bg-slate-50/60 rounded-lg p-1">
                              {[1, 2, 3, 4, 5, 6, 7].map((bar) => {
                                const heightFluct = Math.max(
                                  3,
                                  Math.round((liveDecibels / 100) * 16 + (Math.random() * 6 - 3))
                                );
                                return (
                                  <div
                                    key={bar}
                                    style={{ height: `${heightFluct}px` }}
                                    className={`w-3.5 rounded-xs transition-all duration-300 ${
                                      liveDecibels < 30 ? 'bg-teal-500' : 'bg-indigo-500'
                                    }`}
                                  />
                                );
                              })}
                            </div>

                            <p className="text-[8px] text-slate-400 font-sans text-center mt-0.5">
                              {liveDecibels < 30
                                ? '🤫 სრული სიჩუმეა — იდეალურია რთული პროგრამირებისთვის'
                                : '☕ ზომიერი ხმაურია — შესაფერისია მეგობრული აუდიენციისთვის'}
                            </p>
                          </div>
                        )}

                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center py-4 text-slate-400 space-y-1">
                      <Compass className="w-7 h-7 text-slate-300 animate-spin" style={{ animationDuration: '6s' }} />
                      <h4 className="font-display text-xs font-extrabold text-slate-700">სივრცე შეურჩიეზე</h4>
                      <p className="text-[10.5px] text-slate-400 font-medium">დააწკაპუნეთ რუკაზე სასურველ პინს დისტანციის საანგარიშოდ</p>
                    </div>
                  )}
                </div>

              </motion.div>
            )}

            {/* 4. GEORGIAN PLACE DETAILED REVIEW SCREEN */}
            {currentScreen === 'place-detail' && (
              <motion.div
                key="place-detail"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                {/* Visual Cover Header */}
                <div className="relative h-44 w-full bg-slate-200">
                  <img src={activePlace.image} className="w-full h-full object-cover" referrerPolicy="no-referrer" alt="" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  <button 
                    onClick={() => onScreenChange('places')}
                    className="absolute top-3 left-4 rounded-full bg-white/95 border border-slate-200 p-1.5 hover:bg-slate-50 transition shadow-md cursor-pointer flex items-center justify-center shrink-0"
                  >
                    <ChevronLeft className="w-5 h-5 text-slate-700" />
                  </button>

                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <span className="rounded bg-indigo-600 text-white px-2.5 py-0.5 font-sans font-black text-[9px] uppercase tracking-wider inline-block">
                      {activePlace.type === 'coworking' ? 'ქოვორქინგი' : activePlace.type === 'cafe' ? 'კაფე' : 'ბიბლიოთეკა'}
                    </span>
                    <h2 className="font-display text-base font-bold mt-1 text-white leading-tight filter drop-shadow-sm truncate">{activePlace.name}</h2>
                    <p className="text-[10px] text-slate-200 mt-0.5 font-sans truncate flex items-center gap-1 shadow-2xs">
                      <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                      {activePlace.address}
                    </p>
                  </div>
                </div>

                <div className="px-4 space-y-4 pb-6 font-sans">
                  
                  {/* Sensory parameters dashboard panel indicators */}
                  <div className="grid grid-cols-3 gap-2.5 text-center">
                    
                    {/* Quiet level card */}
                    <div className="rounded-xl border border-teal-150 bg-teal-50/15 p-2 flex flex-col justify-between items-center">
                      <span className="text-[8px] font-mono text-slate-400 tracking-wider block">ხმაურის დონე</span>
                      <span className="text-xs font-black text-indigo-950 block mt-1">{activePlace.noiseLevel} dB</span>
                      <span className="text-[8px] font-bold text-teal-700 leading-tight block mt-1">
                        {activePlace.noiseLevel < 25 ? 'უჩუმესი 🤫' : activePlace.noiseLevel < 55 ? 'ნორმალური 👌' : 'ხმაურიანი ☕'}
                      </span>
                    </div>

                    {/* WiFi card */}
                    <div className="rounded-xl border border-indigo-150 bg-indigo-50/10 p-2 flex flex-col justify-between items-center">
                      <span className="text-[8px] font-mono text-slate-400 tracking-wider block">WI-FI სიმძლავრე</span>
                      <span className="text-xs font-black text-indigo-950 block mt-1">{activePlace.wifiQuality}%</span>
                      <span className="text-[8px] font-bold text-indigo-600 leading-tight block mt-1 flex items-center gap-0.5">
                        <Wifi className="w-2.5 h-2.5" />
                        ულტრა სწრაფი
                      </span>
                    </div>

                    {/* Crowd card */}
                    <div className="rounded-xl border border-slate-150 bg-white p-2 flex flex-col justify-between items-center">
                      <span className="text-[8px] font-mono text-slate-400 tracking-wider block">შეევსებულობა</span>
                      <span className="text-xs font-black text-indigo-950 block mt-1">{activePlace.crowdLevel}%</span>
                      <span className="text-[8px] font-bold text-amber-600 leading-tight block mt-1">
                        {activePlace.crowdLevel < 40 ? 'ბევრი ადგილია' : 'ივსება'}
                      </span>
                    </div>

                  </div>

                  {/* Descriptive tags list in Georgian */}
                  <div className="space-y-1.5 text-xs text-slate-500">
                    <h3 className="font-display text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">სივრცის მახასიათებლები</h3>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {activePlace.tags.map((tag, i) => (
                        <span key={i} className="rounded-xl border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-bold text-slate-600 shadow-3xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Reviews List of Georgia Tech students inside Tbilisi */}
                  <div className="space-y-3 pt-1">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-1">
                      <h3 className="font-display text-[9px] font-bold text-slate-400 uppercase tracking-widest">სტუდენტთა შეფასებები ({activePlace.reviewsCount})</h3>
                      <span className="text-[10px] font-bold text-amber-500 flex items-center gap-0.5">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        {activePlace.rating} / 5.0
                      </span>
                    </div>

                    <div className="space-y-3 font-sans">
                      {activePlace.reviews.map((rev) => (
                        <div key={rev.id} className="p-3 rounded-2xl bg-slate-50 border border-slate-100/60 p-3 space-y-1.5 text-xs">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-indigo-100">
                              <img src={rev.avatar} className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <h4 className="font-bold text-slate-900 truncate">{rev.author}</h4>
                              <p className="text-[8.5px] text-slate-400 font-mono select-none">{rev.date}</p>
                            </div>
                            <div className="flex items-center text-[10px] font-black text-amber-500 gap-0.5">
                              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                              {rev.rating}
                            </div>
                          </div>
                          <p className="text-[10.5px] text-slate-600 leading-relaxed font-sans font-medium">{rev.comment}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Add New review Georgian form */}
                  <form onSubmit={handleAddReview} className="p-4 rounded-3xl border border-indigo-150 bg-indigo-50/10 space-y-3.5">
                    <h4 className="font-display text-[10px] font-bold text-indigo-950 uppercase tracking-wider">შეაფასე მუშაობის სივრცე</h4>
                    
                    {reviewError && (
                      <span className="text-[9.5px] text-rose-600 font-bold block bg-rose-50 p-1.5 rounded">{reviewError}</span>
                    )}

                    <div className="space-y-2.5">
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="space-y-1">
                          <label className="block text-slate-400 text-[8.5px] uppercase font-bold">შენი სახელი</label>
                          <input
                            type="text"
                            value={newReviewAuthor}
                            onChange={(e) => setNewReviewAuthor(e.target.value)}
                            placeholder="სახელი"
                            className="w-full bg-white text-black border rounded-xl py-2 px-3 outline-none focus:border-indigo-500"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="block text-slate-400 text-[8.5px] uppercase font-bold">ვარსკვლავები</label>
                          <select
                            value={newReviewRating}
                            onChange={(e) => setNewReviewRating(parseInt(e.target.value))}
                            className="w-full bg-white text-black border rounded-xl py-2 px-2 shadow-3xs outline-none focus:border-indigo-500 cursor-pointer text-amber-600"
                          >
                            <option value="5" className="text-black">⭐⭐⭐⭐⭐ 5 / 5</option>
                            <option value="4" className="text-black">⭐⭐⭐⭐ 4 / 5</option>
                            <option value="3" className="text-black">⭐⭐⭐ 3 / 5</option>
                            <option value="2" className="text-black">⭐⭐ 2 / 5</option>
                            <option value="1" className="text-black">⭐ 1 / 5</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1 text-xs">
                        <label className="block text-slate-400 text-[8.5px] uppercase font-bold">შენი კომენტარი</label>
                        <textarea
                          rows={2}
                          value={newReviewComment}
                          onChange={(e) => setNewReviewComment(e.target.value)}
                          placeholder="დაწერე შენი აზრი ინტერნეტზე, ხმაურზე..."
                          className="w-full bg-white text-black border rounded-xl py-2 px-3 outline-none focus:border-indigo-500 font-sans"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <Send className="w-3.5 h-3.5" />
                        შეფასების გამოქვეყნება
                      </button>
                    </div>
                  </form>

                </div>
              </motion.div>
            )}

            {/* 5. GEORGIAN CLASSES/PROGRAMS PAGE */}
            {currentScreen === 'programs' && (
              <motion.div
                key="programs"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.2 }}
                className="p-4 space-y-4"
              >
                <div>
                  <h2 className="font-display text-lg font-black text-slate-900 tracking-tight leading-none pt-1">სასწავლო პროგრამები</h2>
                  <p className="text-[10px] text-slate-400 font-medium mt-1">აკადემიური კურიკულუმები შენი მიზნებისთვის</p>
                </div>

                {/* Categories filtering tabs inside classes */}
                <div className="space-y-2">
                  <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar shrink-0">
                    {[
                      { key: 'All', label: 'ყველა' },
                      { key: 'Tech', label: '💻 Tech / AI' },
                      { key: 'Languages', label: '✍️ ენები' },
                      { key: 'Business', label: '📈 ბიზნესი' },
                      { key: 'Exams', label: '🎓 IELTS' }
                    ].map(cat => (
                      <button
                        key={cat.key}
                        onClick={() => setSelectedProgCategory(cat.key as any)}
                        className={`text-[9.5px] font-bold px-3 py-1.5 rounded-full border shrink-0 transition cursor-pointer ${selectedProgCategory === cat.key ? 'bg-purple-600 border-purple-600 text-white' : 'bg-white text-slate-500 border-slate-200'}`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    {[
                      { key: 'All', label: 'ნებისმიერი ფასი' },
                      { key: 'Free', label: '🆓 უფასო' },
                      { key: 'Paid', label: '💳 ფასიანი' }
                    ].map(price => (
                      <button
                        key={price.key}
                        onClick={() => setProgramsPriceFilter(price.key as any)}
                        className={`text-[9.5px] font-bold py-1 px-2.5 rounded-lg border flex-1 transition cursor-pointer ${programsPriceFilter === price.key ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-500 border-slate-200'}`}
                      >
                        {price.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Grid of educational blueprints */}
                <div className="space-y-4">
                  {filteredPrograms.map((prog) => (
                    <div
                      key={prog.id}
                      onClick={() => onScreenChange('program-detail', prog.id)}
                      className="rounded-2xl border border-slate-100 bg-white shadow-3xs overflow-hidden flex flex-col group cursor-pointer hover:border-purple-300 transition duration-200"
                    >
                      <div className="relative h-28 w-full bg-slate-200">
                        <img src={prog.image} className="w-full h-full object-cover transition duration-300 group-hover:scale-[1.02]" referrerPolicy="no-referrer" alt="" />
                        
                        <div className="absolute top-2.5 right-2.5 rounded bg-purple-600 text-white px-2.5 py-0.5 font-sans font-black text-[9px] uppercase tracking-wider">
                          {prog.category === 'Tech' ? 'ტექნოლოგიები' : prog.category === 'Languages' ? 'ენები' : prog.category === 'Business' ? 'ბიზნესი' : 'გამოცდები'}
                        </div>
                      </div>

                      <div className="p-3.5 space-y-2 text-xs">
                        <div className="space-y-0.5">
                          <span className="text-[8.5px] text-purple-600 font-bold uppercase tracking-wider block">{prog.provider}</span>
                          <h3 className="font-display text-xs font-black text-slate-900 group-hover:text-purple-600 transition leading-tight mt-0.5">
                            {prog.title}
                          </h3>
                        </div>

                        <p className="text-[10px] text-slate-500 line-clamp-2 leading-relaxed">
                          {prog.description}
                        </p>

                        <div className="flex justify-between items-center text-[9.5px] pt-3 border-t border-slate-100 mt-1 font-semibold text-slate-600">
                          <span className="font-sans flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            ხანგრძლივობა: <strong>{prog.duration}</strong>
                          </span>
                          
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              onScreenChange('program-detail', prog.id);
                            }}
                            className="rounded px-2.5 py-1 bg-purple-50 text-purple-700 hover:bg-purple-100 text-[9.5px] font-bold transition flex items-center gap-1 cursor-pointer"
                          >
                            სილაბუსი
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* 6. GEORGIAN COURSE BLUEPRINT DETAIL SCREEN */}
            {currentScreen === 'program-detail' && (
              <motion.div
                key="program-detail"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                {/* Back button header layout */}
                <div className="px-4 pt-4 flex justify-between items-center">
                  <button 
                    onClick={() => onScreenChange('programs')}
                    className="rounded-full bg-white border border-slate-200 p-1.5 hover:bg-slate-50 transition shadow-3xs flex items-center justify-center shrink-0 cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5 text-slate-700" />
                  </button>
                  <span className="font-display text-[10px] font-bold text-slate-400 uppercase tracking-widest">სილაბუსის სამუშაო დაფა</span>
                  <button className="rounded-full bg-white border border-slate-200 p-1.5 text-slate-600 flex items-center justify-center shadow-3xs cursor-not-allowed">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Image Cover with Floating tag details */}
                <div className="relative h-44 w-full bg-slate-200">
                  <img src={activeProgram.image} className="w-full h-full object-cover" referrerPolicy="no-referrer" alt="" />
                  
                  <div className="absolute top-3 left-4 rounded bg-purple-600 text-white px-2.5 py-0.5 font-sans font-bold text-[9px] uppercase tracking-wider">
                    {activeProgram.category}
                  </div>

                  <div className="absolute bottom-3 right-4 rounded-full bg-white/95 px-3 py-1 font-bold flex items-center gap-1 text-[11px] text-slate-800 shadow-sm">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    {activeProgram.rating} ({activeProgram.enrollments.toLocaleString()} დარეგისტრირდა)
                  </div>
                </div>

                {/* Fields details in Georgian */}
                <div className="px-4 space-y-4 pb-6 font-sans">
                  <div className="space-y-1">
                    <span className="text-[9px] text-purple-600 font-bold uppercase tracking-wider block">{activeProgram.provider}</span>
                    <h2 className="font-display text-base font-bold text-slate-900 leading-snug">{activeProgram.title}</h2>
                  </div>

                  {/* Core specifications parameters */}
                  <div className="grid grid-cols-3 gap-2.5 text-center">
                    
                    {/* Price block */}
                    <div className="rounded-xl border border-purple-100 bg-purple-50/15 p-2 flex flex-col justify-between items-center">
                      <span className="text-[8px] font-mono text-slate-400 tracking-wider block">სწავლის ფასი</span>
                      <span className="text-xs font-black text-purple-700 block mt-1">{activeProgram.price}</span>
                      <span className="text-[7.5px] font-bold text-slate-500 leading-tight block mt-1">ერთჯერადი შენატანი</span>
                    </div>

                    {/* Online vs offline block */}
                    <div className="rounded-xl border border-indigo-100 bg-white p-2 flex flex-col justify-between items-center">
                      <span className="text-[8px] font-mono text-slate-400 tracking-wider block">ფორმატი</span>
                      <span className="text-xs font-black text-slate-800 block mt-1">{activeProgram.type === 'Online' ? '🌐 ონლაინ' : '🏫 დასწრებით'}</span>
                      <span className="text-[7.5px] font-bold text-slate-550 leading-tight block mt-1">კვირეული შეხვედრები</span>
                    </div>

                    {/* Duration specs */}
                    <div className="rounded-xl border border-slate-150 bg-white p-2 flex flex-col justify-between items-center">
                      <span className="text-[8px] font-mono text-slate-400 tracking-wider block">ხანგრძლივობა</span>
                      <span className="text-xs font-black text-slate-800 block mt-1">{activeProgram.duration}</span>
                      <span className="text-[7.5px] font-bold text-slate-550 leading-tight block mt-1 font-sans">აკადემიური დატვირთვა</span>
                    </div>

                  </div>

                  {/* Description of Course */}
                  <div className="space-y-1.5 text-xs text-slate-600">
                    <h3 className="font-display text-[9px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-1">კურიკულუმის შესახებ</h3>
                    <p className="leading-relaxed text-[11px] font-sans">
                      {activeProgram.description} კურსი მოიცავს თეორიულ ლექციებს, ჯგუფურ პროექტებსა და ინდივიდუალურ მენტორშიფს კომპანიების წამყვან სპეციალისტებთან.
                    </p>
                  </div>

                  {/* Weekly syllabus map in Georgian */}
                  <div className="space-y-2 text-xs text-slate-600">
                    <h3 className="font-display text-[9px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-1">ეტაპობრივი გეგმა</h3>
                    
                    <div className="space-y-2 font-sans">
                      {[
                        { step: '01', title: 'საფუძვლები და გარემოს გამართვა', desc: 'პირველი 4 კვირა დაეთმობა ფუნდამენტურ კონცეპტებსა და საჭირო ხელსაწყოების ინსტალაცია-გაცნობას.' },
                        { step: '02', title: 'ინტენსიური პრაქტიკული სპრინტები', desc: 'კვირა 5-8: პრაქტიკული დავალებები და რეალურ კეისებზე დაფუძნებული პროდუქტების აწყობა.' },
                        { step: '03', title: 'სადიპლომო პროექტის პრეზენტაცია', desc: 'საბოლოო ეტაპი: საკუთარი ნამუშევრის წარდგენა მოწვეული დამსაქმებლებისა და ინვესტორების წინაშე.' }
                      ].map((week, idx) => (
                        <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex gap-2.5 items-start">
                          <span className="rounded-lg bg-indigo-100 text-indigo-700 font-mono font-bold px-2 py-0.5 text-[10px]">
                            {week.step}
                          </span>
                          <div className="space-y-0.5 min-w-0 flex-1">
                            <span className="font-bold text-slate-850 text-[11px] block truncate">{week.title}</span>
                            <p className="text-[10px] text-slate-500 leading-normal">{week.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Direct Apply Georgian form to Cohort */}
                  <div className="rounded-2xl border border-purple-150 bg-purple-50/15 p-4 space-y-3 shadow-3xs">
                    <div className="flex justify-between items-center border-b border-purple-100 pb-2">
                      <span className="font-display text-[10px] font-bold text-purple-950 uppercase tracking-wider flex items-center gap-1">
                        <Lock className="w-3.5 h-3.5 text-purple-600" />
                        კორპორატიული საგრანტო ადგილი
                      </span>
                      <span className="text-[8.5px] font-mono text-purple-700 font-bold bg-purple-50 px-2 py-0.5 rounded border border-purple-100">
                        OPEN
                      </span>
                    </div>

                    {enrolledProgramIds.includes(activeProgram.id) ? (
                      <div className="p-3 bg-emerald-50 border border-emerald-250 rounded-xl space-y-1 text-center animate-fadeIn">
                        <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto mb-1">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <h4 className="font-display text-[11px] font-black text-emerald-950">რეგისტრაცია წარმატებით დასრულდა</h4>
                        <p className="text-[9.5px] text-emerald-600 font-mono">
                          სასწავლო ინსტრუქცია გაიგზავნა: {enrollmentEmail}
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2.5">
                        <p className="text-[10px] text-slate-500 leading-normal">
                          დააფიქსირე შენი ელ-ფოსტა უფასო საგრანტო ადგილის მოსაპოვებლად და დასარეგისტრირებლად:
                        </p>
                        <div className="flex gap-2 text-xs">
                          <input
                            type="email"
                            value={enrollmentEmail}
                            onChange={(e) => setEnrollmentEmail(e.target.value)}
                            placeholder="mag: nika@gmail.com"
                            className="bg-white border rounded-lg py-1.5 px-2.5 text-[11px] flex-1 outline-none text-slate-800"
                          />
                          <button
                            onClick={() => {
                              if (!enrollmentEmail.trim()) return;
                              setEnrolledProgramIds([...enrolledProgramIds, activeProgram.id]);
                            }}
                            className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-[10px] px-3.5 rounded-lg transition uppercase tracking-wider cursor-pointer shadow-3xs"
                          >
                            რეგისტრაცია
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                </div>
              </motion.div>
            )}

            {/* 7. GEORGIAN OPPORTUNITIES/GRANTS SCREEN */}
            {currentScreen === 'opportunities' && (
              <motion.div
                key="opportunities"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.2 }}
                className="p-4 space-y-4"
              >
                <div>
                  <h2 className="font-display text-lg font-black text-slate-900 tracking-tight leading-none pt-1">გრანტები და სტიპენდიები</h2>
                  <p className="text-[10px] text-slate-400 font-medium mt-1">ფინანსური მხარდაჭერა შენი მომავლის დასაფინანსებლად</p>
                </div>

                {/* Filter tabs */}
                <div className="flex gap-1.5 overflow-x-auto pb-1 shrink-0 no-scrollbar">
                  {[
                    { key: 'All', label: 'ყველა ტიპი' },
                    { key: 'Scholarship', label: '🎓 სტიპენდია' },
                    { key: 'Internship', label: '💼 სტაჟირება' },
                    { key: 'Remote Work', label: '🌐 დისტანციური სამსახური' }
                  ].map(type => (
                    <button
                      key={type.key}
                      onClick={() => setSelectedOppType(type.key as any)}
                      className={`text-[9.5px] font-bold px-3 py-1.5 rounded-full border shrink-0 transition cursor-pointer ${selectedOppType === type.key ? 'bg-teal-600 border-teal-600 text-white' : 'bg-white text-slate-500 border-slate-200'}`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>

                {/* Output visual feeds */}
                <div className="space-y-4">
                  {filteredOpportunities.map((opp) => (
                    <div
                      key={opp.id}
                      className="rounded-2xl border border-slate-100 bg-white p-3.5 space-y-3.5 group shadow-3xs"
                    >
                      <div className="flex gap-3 items-center">
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-200 shrink-0">
                          <img src={opp.image} className="w-full h-full object-cover" referrerPolicy="no-referrer" alt="" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="rounded bg-teal-50 border border-teal-100 text-teal-800 text-[8px] font-mono font-bold px-1.5 py-0.5 uppercase tracking-wider">
                            {opp.type === 'Scholarship' ? 'სტიპენდია' : opp.type === 'Internship' ? 'სტაჟირება' : 'დისტანციური სამსახური'}
                          </span>
                          <h3 className="font-display text-xs font-bold text-slate-900 truncate mt-1 leading-normal">{opp.title}</h3>
                          <p className="text-[9.5px] text-slate-500 font-sans truncate">{opp.organization}</p>
                        </div>
                      </div>

                      <p className="text-[10.5px] text-slate-600 font-sans leading-relaxed">
                        {opp.description}
                      </p>

                      <div className="bg-slate-50 rounded-xl p-2.5 flex justify-between items-center text-[9px] font-semibold text-slate-600">
                        <span className="font-sans flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          ბოლო ვადა: <strong className="text-slate-800">{opp.deadline}</strong>
                        </span>
                        
                        <span className="font-mono text-teal-600 font-bold bg-teal-50/50 px-2 py-0.5 rounded border border-teal-100/50">
                          {opp.amount}
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <button 
                          onClick={() => alert(`მადლობა დაინტერესებისთვის! განაცხადის ფორმა გაიგზავნა '${opp.organization}'-ში.`)}
                          className="flex-1 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-[10px] uppercase py-2.5 transition tracking-wider cursor-pointer"
                        >
                          განაცხადის გაგზავნა 🚀
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Global bottom presentation Navigation Bar (Frosted glassmorphism design) */}
        {currentScreen !== 'registration' && (
          <div className="absolute bottom-3 left-3 right-3 z-45 rounded-2xl border border-slate-200/50 bg-white/75 backdrop-blur-md p-1 shadow-lg shadow-slate-300/10 shrink-0">
            <div className="flex justify-around items-center">
              
              {/* Item 1: Home */}
              <button
                onClick={() => onScreenChange('home')}
                className={`flex flex-col items-center justify-center p-1.5 px-2 rounded-xl transition cursor-pointer flex-1 ${currentScreen === 'home' ? 'text-indigo-600 bg-indigo-50/50' : 'text-slate-400 hover:text-slate-800'}`}
              >
                <Home className="w-4.5 h-4.5 shrink-0" />
                <span className="text-[8.5px] font-bold font-sans mt-0.5">მთავარი</span>
              </button>

              {/* Item 2: Spaces */}
              <button
                onClick={() => onScreenChange('places')}
                className={`flex flex-col items-center justify-center p-1.5 px-2 rounded-xl transition cursor-pointer flex-1 ${currentScreen === 'places' || currentScreen === 'place-detail' ? 'text-indigo-600 bg-indigo-50/50' : 'text-slate-400 hover:text-slate-800'}`}
              >
                <MapPin className="w-4.5 h-4.5 shrink-0" />
                <span className="text-[8.5px] font-bold font-sans mt-0.5">სივრცეები</span>
              </button>

              {/* Item 3: Vector Map */}
              <button
                onClick={() => onScreenChange('map')}
                className={`flex flex-col items-center justify-center p-1.5 px-2 rounded-xl transition cursor-pointer flex-1 ${currentScreen === 'map' ? 'text-teal-600 bg-teal-50/50' : 'text-slate-400 hover:text-slate-800'}`}
              >
                <Compass className="w-4.5 h-4.5 shrink-0 animate-spin" style={{ animationDuration: currentScreen === 'map' ? '5s' : '0s' }} />
                <span className="text-[8.5px] font-bold font-sans mt-0.5">რუკა GPA</span>
              </button>

              {/* Item 4: Classes */}
              <button
                onClick={() => onScreenChange('programs')}
                className={`flex flex-col items-center justify-center p-1.5 px-2 rounded-xl transition cursor-pointer flex-1 ${currentScreen === 'programs' || currentScreen === 'program-detail' ? 'text-purple-600 bg-purple-50/50' : 'text-slate-400 hover:text-slate-800'}`}
              >
                <BookOpen className="w-4.5 h-4.5 shrink-0" />
                <span className="text-[8.5px] font-bold font-sans mt-0.5">კურსები</span>
              </button>

              {/* Item 5: Grants */}
              <button
                onClick={() => onScreenChange('opportunities')}
                className={`flex flex-col items-center justify-center p-1.5 px-2 rounded-xl transition cursor-pointer flex-1 ${currentScreen === 'opportunities' ? 'text-rose-600 bg-rose-50/50' : 'text-slate-400 hover:text-slate-800'}`}
              >
                <GraduationCap className="w-4.5 h-4.5 shrink-0" />
                <span className="text-[8.5px] font-bold font-sans mt-0.5">გრანტები</span>
              </button>

            </div>
          </div>
        )}

        {/* USER PROFILE DRAWER PANEL */}
        {profileSheetOpen && (
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs z-50 flex flex-col justify-end">
            <div 
              className="absolute inset-0" 
              onClick={() => setProfileSheetOpen(false)}
            />
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              className="relative bg-white rounded-t-3xl p-5 space-y-4 shadow-2xl z-55 max-h-[85%] overflow-y-auto"
            >
              <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto" />
              
              <div className="flex items-center gap-3.5 pt-2">
                <div className="w-11 h-11 rounded-full flex items-center justify-center bg-gradient-to-tr from-[#06b6d4] via-[#2563eb] to-[#7c3aed] text-white text-base font-black shadow-sm shrink-0">
                  {registeredUser?.name ? registeredUser.name.charAt(0).toUpperCase() : 'M'}
                </div>
                <div className="min-w-0">
                  <h3 className="font-display text-[14px] font-extrabold text-slate-900 truncate">{registeredUser ? registeredUser.name : 'მაია ჩენი'}</h3>
                  <span className="text-[9.5px] text-slate-500 font-mono block leading-none mt-0.5">{registeredUser?.email || 'your@email.com'}</span>
                </div>
              </div>

              <div className="space-y-3 pt-1 text-xs">
                
                {/* Modern Track configurations with custom interest tag list */}
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 space-y-3 text-left">
                  <div className="flex flex-col gap-1.5 animate-fade-in">
                    <span className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400">არჩეული სასწავლო სფეროები</span>
                    <div className="flex flex-wrap gap-1 mt-0.5">
                      {registeredUser?.interests && registeredUser.interests.length > 0 ? (
                        registeredUser.interests.map((interest) => (
                          <span key={interest} className="text-[9px] font-bold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100 transition-transform hover:scale-105">
                            {interest}
                          </span>
                        ))
                      ) : (
                        <span className="text-[9px] font-bold px-2.5 py-1 rounded-full bg-indigo-50 text-[#2563eb] border border-[#2563eb]/20">
                          {registeredUser ? registeredUser.studyGoal : 'ტექნოლოგიები'}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="border-t border-slate-150 pt-2.5 flex justify-between items-center text-[11px]">
                    <span className="text-slate-500 font-medium">პლატფორმის რეჟიმი:</span>
                    <span className="font-extrabold text-[#2563eb] bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                      აქტიური წევრი
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-slate-500 font-medium">ანგარიშის ID:</span>
                    <span className="font-mono text-slate-600 font-bold bg-slate-100 px-1.5 py-0.5 rounded text-[9px]">
                      EN-2026-CH
                    </span>
                  </div>
                </div>

                {/* Reset and Logout inside simulator drawer */}
                <button
                  onClick={() => {
                    setProfileSheetOpen(false);
                    onSignOut();
                  }}
                  className="w-full py-2.5 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold transition flex items-center justify-center gap-1.5 cursor-pointer text-[11px]"
                >
                  პროფილის გადატვირთვა / გამოსვლა 🔄
                </button>

                <button
                  onClick={() => setProfileSheetOpen(false)}
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition flex items-center justify-center cursor-pointer text-[11px]"
                >
                  დახურვა
                </button>
              </div>
            </motion.div>
          </div>
        )}

      </div>
    </div>
  );
}
