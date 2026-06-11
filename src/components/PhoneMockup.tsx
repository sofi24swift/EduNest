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
import { TRANSLATIONS } from '../utils/translations';
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
  RefreshCw,
  Crown,
  CreditCard,
  Tag,
  MessageSquare
} from 'lucide-react';

const TEXT_TRANSLATIONS: Record<string, { en: string, de: string }> = {
  // Author names
  'ნიკა კავთარაძე': { en: 'Nika Kavtaradze', de: 'Nika Kawtaradse' },
  'ლუკა ტაბატაძე': { en: 'Luka Tabatadze', de: 'Luka Tabatadse' },
  'ელენე მელიქიშვილი': { en: 'Elene Melikishvili', de: 'Elene Melikischwili' },
  'გიორგი ბერიძე': { en: 'Giorgi Beridze', de: 'Giorgi Beridse' },
  'საბა გოგოლაძე': { en: 'Saba Gogoladze', de: 'Saba Gogoladse' },

  // Dates
  'გუშინ': { en: 'yesterday', de: 'gestern' },
  '3 დღის წინ': { en: '3 days ago', de: 'vor 3 Tagen' },
  '2 დღის წინ': { en: '2 days ago', de: 'vor 2 Tagen' },
  '4 დღის წინ': { en: '4 days ago', de: 'vor 4 Tagen' },
  '1 კვირის წინ': { en: '1 week ago', de: 'vor 1 Woche' },

  // Comments
  'გამორჩეულად მშვიდი გარემო სწრაფი ოპტიკური ინტერნეტით. როზეტები ჩაშენებულია ყველა მაგიდაზე. ძალიან გირჩევთ ფოკუს-ბუთებს!': {
    en: 'Exceptional quiet environment with fast optical fiber internet. Power outlets integrated on all desk spots. Highly recommend focus booths!',
    de: 'Außergewöhnlich ruhige Umgebung mit schnellem Glasfaser-WLAN. Steckdosen sind an allen Schreibtischplätzen integriert. Fokusboxen sehr zu empfehlen!'
  },
  'ძალიან ზომიერი ხმაური, კარგი განათება. უგემრიელესი ფილტრ-ყავა აქვთ და სავარძლები საათობით მუშაობისას ზურგს არ გტკენს.': {
    en: 'Very moderate noise level, excellent lighting. They serve delicious filter coffee and chairs won\'t hurt your back for hours of work.',
    de: 'Sehr mäßiger Lärmpegel, gute Beleuchtung. Sie haben leckeren Filterkaffee und Stühle tun Ihrem Rücken auch nach stundenlanger Arbeit nicht weh.'
  },
  'შესანიშნავი მუსიკა და სასიამოვნო ატმოსფერო. ნაშუადღევს ხალხმრავლობაა ხოლმე, მაგრამ უკანა მაგიდებთან ყოველთვისაა თავისუფალი დენის წყარო.': {
    en: 'Great music and pleasant atmosphere. It gets crowded in the afternoon, but there is always a free outer outlet available near the back desk spots.',
    de: 'Tolle Musik und angenehme Atmosphäre. Nachmittags wird es voll, aber an den hinteren Plätzen gibt es immer freie Steckdosen.'
  },
  'ნამდვილი არქიტექტურული საოცრება სწავლისთვის. მაღალი ჭერი, აკადემიური აურა და ღრმა ფოკუსირებისთვის საუკეთესო მყუდრო მაგიდები.': {
    en: 'A true architectural marvel for study. High ceilings, academic aura, and cozy desks that are perfect for deep focus sessions.',
    de: 'Ein echtes architektonisches Wunderwerk zum Lernen. Hohe Decken, akademische Aura und gemütliche Schreibtische, perfekt für tiefe Konzentration.'
  },
  'ზოგიერთ მაგიდაზე გხვდება სპეციალური 4K მონიტორი, რომელსაც შეგიძლია დაუკავშირო ლეპტოპი. საოცარი კომფორტია სრული ფოკუსისთვის!': {
    en: 'Some desks even feature a dedicated 4K monitor to connect your own laptop to. Incredible comfort for absolute focus sessions!',
    de: 'Einige Schreibtische verfügen sogar über einen eigenen 4K-Monitor für Ihren Laptop. Unglaublicher Komfort für absolute Konzentration!'
  },

  // Study Places Addresses/Other
  'მერაბ კოსტავას ქუჩა 14, თბილისი': {
    en: '14 Merab Kostava Street, Tbilisi',
    de: 'Merab-Kostava-Straße 14, Tiflis'
  },
  'ეგნატე ნინოშვილის ქუჩა 8, თბილისი': {
    en: '8 Egnate Ninoshvili Street, Tbilisi',
    de: 'Egnate-Ninoshvili-Straße 8, Tiflis'
  },
  'ლადო გუდიაშვილის მოედანი, თბილისი': {
    en: 'Lado Gudiashvili Square, Tbilisi',
    de: 'Lado-Gudiaschwili-Platz, Tiflis'
  },
  'ილია ჭავჭავაძის გამზირი 32, თბილისი': {
    en: '32 Ilia Chavchavadze Avenue, Tbilisi',
    de: 'Ilia-Chavchavadze-Allee 32, Tiflis'
  },

  // Categories/Types for opportunities
  'სტიპენდია': { en: 'Scholarship', de: 'Stipendium' },
  'სტაჟირება': { en: 'Internship', de: 'Praktikum' },
  'დისტანციური სამსახური': { en: 'Remote Job', de: 'Remote-Job' },
  'Scholarship': { en: 'Scholarship', de: 'Stipendium' },
  'Internship': { en: 'Internship', de: 'Praktikum' },
  'Remote Work': { en: 'Remote Work', de: 'Remote-Arbeit' },
  'ყველა ტიპი': { en: 'All Types', de: 'Alle Typen' },
  '🎓 სტიპენდია': { en: '🎓 Scholarship', de: '🎓 Stipendium' },
  '💼 სტაჟირება': { en: '💼 Internship', de: '💼 Praktikum' },
  '🌐 დისტანციური სამსახური': { en: '🌐 Remote Job', de: '🌐 Remote-Job' },
  'ყველა': { en: 'All', de: 'Alle' },
  '💻 Tech / AI': { en: '💻 Tech / AI', de: '💻 Tech / KI' },
  '✍️ ენები': { en: '✍️ Languages', de: '✍️ Sprachen' },
  '📈 ბიზნესი': { en: '📈 Business', de: '📈 Business' },
  '🎓 IELTS': { en: '🎓 IELTS', de: '🎓 IELTS' },
  'ნებისმიერი ფასი': { en: 'Any Price', de: 'Beliebiger Preis' },
  '🆓 უფასო': { en: '🆓 Free', de: '🆓 Kostenlos' },
  '💳 ფასიანი': { en: '💳 Paid', de: '💳 Kostenpflichtig' },

  // Map Header Overlay
  'ცოცხალი საორიენტაციო რუკა': { en: 'Live Orientation Map', de: 'Live-Orientierungskarte' },
  'ინტერაქტიული GPS ნავიგაცია და სენსორები': { en: 'Interactive GPS Navigation & Sensors', de: 'Interaktive GPS-Navigation & Sensoren' },

  // Study Places Types
  'ქოვორქინგი': { en: 'Coworking', de: 'Co-Working' },
  'კაფე': { en: 'Cafe', de: 'Café' },
  'ბიბლიოთეკა': { en: 'Library', de: 'Bibliothek' },

  // Study Places Header
  'სწავლის სივრცეები': { en: 'Study Spaces', de: 'Lernbereiche' },
  'თბილისის მყუდრო წერტილები': { en: 'Cozy Tbilisi Spots', de: 'Gemütliche Orte in Tiflis' },
  'რუკის ხედი': { en: 'Map View', de: 'Kartenansicht' },

  // Sensory Simulation Panel
  'გარემო პირობების სიმულატორი': { en: 'Sensory Conditions Simulator', de: 'Umgebungssimulator' },
  'ცოცხალი IoT': { en: 'Live IoT', de: 'Live-IoT' },
  '⚙️ ავტო ლოგიკა': { en: '⚙️ Auto Logic', de: '⚙️ Auto-Logik' },
  '🤫 Silent საათი': { en: '🤫 Silent Hour', de: '🤫 Silent-Stunde' },
  '☕ ყავის რიგები': { en: '☕ Coffee Rush', de: '☕ Kaffee-Ansturm' },
  'თქვენი ძიებით სივრცეები ვერ მოიძებნა.': { en: 'No study spaces found matching your search.', de: 'Keine Lernbereiche für Ihre Suche gefunden.' },

  // Course Programs Header
  'სასწავლო პროგრამები': { en: 'Study Programs', de: 'Studienprogramme' },
  'აკადემიური კურიკულუმები შენი მიზნებისთვის': { en: 'Academic curricula for your study goals', de: 'Academic-Lehrpläne für Ihre Studienziele' },

  // Course detail specifications
  'სწავლის ფასი': { en: 'Course Tuition', de: 'Kursgebühr' },
  'ერთჯერადი შენატანი': { en: 'One-time fee', de: 'Einmalige Gebühr' },
  'ფორმატი': { en: 'Format', de: 'Format' },
  'კვირეული შეხვედრები': { en: 'Weekly meetings', de: 'Wöchentliche Treffen' },
  'ხანგრძლივობა': { en: 'Duration', de: 'Dauer' },
  'აკადემიური დატვირთვა': { en: 'Academic workload', de: 'Akademische Arbeitsbelastung' },
  'კურიკულუმის შესახებ': { en: 'About Curriculum', de: 'Über den Lehrplan' },
  'ეტაპობრივი გეგმა': { en: 'Syllabus Plan', de: 'Lehrplan-Plan' },
  'კორპორატიული საგრანტო ადგილი': { en: 'Corporate Grant Spot', de: 'Corporate-Stipendium' },
  'დააფიქსირე შენი ელ-ფოსტა უფასო საგრანტო ადგილის მოსაპოვებლად და დასარეგისტრირებლად:': {
    en: 'Enter your email address to secure a corporate grant spot and enroll for free:',
    de: 'Geben Sie Ihre E-Mail-Adresse ein, um sich für einen kostenlosen Grant-Platz anzumelden:'
  },
  'რეგისტრაცია': { en: 'Register', de: 'Registrieren' },
  'რეგისტრაცია წარმატებით დასრულდა': { en: 'Registration Completed successfully!', de: 'Registrierung erfolgreich abgeschlossen!' },
  'სასწავლო ინსტრუქცია გაიგზავნა:': { en: 'Study instructions sent to:', de: 'Studienanweisungen gesendet an:' },

  // opportunities
  'გრანტები და სტიპენდიები': { en: 'Grants & Scholarships', de: 'Förderung & Stipendien' },
  'ფინანსური მხარდაჭერა შენი მომავლის დასაფინანსებლად': { en: 'Financial support to enable your academic future', de: 'Finanzielle Unterstützung für Ihre akademische Zukunft' },
  'განაცხადის გაგზავნა 🚀': { en: 'Submit Application 🚀', de: 'Bewerbung einreichen 🚀' },

  // Course Details
  'საფუძვლები და გარემოს გამართვა': { en: 'Foundations & Env Setup', de: 'Grundlagen & Umgebungseinrichtung' },
  'პირველი 4 კვირა დაეთმობა ფუნდამენტურ კონცეპტებსა და საჭირო ხელსაწყოების ინსტალაცია-გაცნობას.': {
    en: 'First 4 weeks will focus on fundamental concepts and introducing target tools.',
    de: 'Die ersten 4 Wochen widmen sich grundlegenden Konzepten und der Einrichtung von Tools.'
  },
  'ინტენსიური პრაქტიკული სპრინტები': { en: 'Intensive Practical Sprints', de: 'Intensive Praxis-Sprints' },
  'კვირა 5-8: პრაქტიკული დავალებები და რეალურ კეისებზე დაფუძნებული პროდუქტების აწყობა.': {
    en: 'Weeks 5-8: Hands-on tasks and building interactive applications based on real cases.',
    de: 'Wochen 5-8: Praktische Aufgaben und Erstellung von Apps auf Basis realer Fallstudien.'
  },
  'სადიპლომო პროექტის პრეზენტაცია': { en: 'Graduation Project Demo Day', de: 'Abschlussprojekt Demo-Tag' },
  'საბოლოო ეტაპი: საკუთარი ნამუშევრის წარდგენა მოწვეული დამსაქმებლებისა და ინვესტორების წინაშე.': {
    en: 'Final stage: Presenting your personal project to invited tech employers and investors.',
    de: 'Letzte Phase: Präsentation des Abschlussprojekts vor Arbeitgebern und Investoren.'
  },

  // Interests list
  'ტექნოლოგიები': { en: 'Technologies', de: 'Technologien' },
  'ხელოვნური ინტელექტი': { en: 'Artificial Intelligence', de: 'Künstliche Intelligenz' },
  'დიზაინი': { en: 'Design', de: 'Design' },
  'ფინანსები': { en: 'Finance', de: 'Finanzen' },
  'მედიცინა': { en: 'Medicine', de: 'Medizin' },
  'ბიზნესი': { en: 'Business', de: 'Wirtschaft' },
  'მეწარმეობა': { en: 'Entrepreneurship', de: 'Unternehmertum' },
  'საინჟინრო საქმე': { en: 'Engineering', de: 'Ingenieurwesen' },
  'უცხო ენები': { en: 'Foreign Languages', de: 'Fremdsprachen' },

  // Map widgets
  'რესეტი': { en: 'Reset', de: 'Zurücksetzen' },
  'როუტი Geolab-ზე': { en: 'Route to Geolab', de: 'Wegbeschreibung zu Geolab' },
  'რიყის პარკი': { en: 'Rike Park', de: 'Rike-Park' },
  'ჭავჭავაძის გამზ.': { en: 'Chavchavadze Ave.', de: 'Tschawtschawadse-Allee' },
  'საბურთალო': { en: 'Saburtalo district', de: 'Saburtalo-Viertel' },
  'ძველი თბილისი': { en: 'Old Tbilisi', de: 'Alt-Tiflis' },
  'ვაკის პარკი • Vake Park 🌳': { en: 'Vake Park 🌳', de: 'Wake-Park 🌳' },
  'მთაწმინდის ტყე-პარკი': { en: 'Mtatsminda Forest Park', de: 'Bergpark Mtazminda' },
  'სივრცის ცოცხალი მახასიათებლები': { en: 'Live Space Parameters', de: 'Live-Lernort-Eigenschaften' },

  '📝 დეტალები': { en: '📝 Details', de: '📝 Details' },
  '🪑 მაგიდები': { en: '🪑 Desks', de: '🪑 Tische' },
  '📡 სენსორები': { en: '📡 Sensors', de: '📡 Sensoren' },
  'სივრცის სრული გვერდი 🔎': { en: 'Full Space Page 🔎', de: 'Vollständige Seite 🔎' },
  '🪑 მაგიდის/როზეტის შერჩევა:': { en: '🪑 Choose Desk/Socket:', de: '🪑 Steckdose/Tisch wählen:' },
  'სწრაფი დაჯავშნა უფასოდ': { en: 'Free instant booking', de: 'Kostenlose Direktbuchung' },
  '✓ დაჯავშნილი': { en: '✓ Booked', de: '✓ Reserviert' },
  'Live ხმაურის ინდექსი:': {  en: 'Live Decibel Index:', de: 'Live-Lärmindex:' },
  '🤫 სრული სიჩუმეა — იდეალურია რთული პროგრამირებისთვის': {
    en: '🤫 Total silence — ideal for complex programming tasks',
    de: '🤫 Absolute Stille — ideal für komplexe Programmieraufgaben'
  },
  '☕ ზომიერი ხმაურია — შესაფერისია მეგობრული აუდიენციისთვის': {
    en: '☕ Moderate noise — suitable for collaborative sessions',
    de: '☕ Mäßiger Lärm — geeignet für kooperative Sitzungen'
  },
  'სივრცე შეურჩიეზე': { en: 'Select a Spot', de: 'Lernort auswählen' },
  'დააწკაპუნეთ რუკაზე სასურველ პინს დისტანციის საანგარიშოდ': {
    en: 'Click any pin on the map to compute direction & distance',
    de: 'Klicken Sie auf eine Stecknadel auf der Karte, um die Entfernung zu berechnen'
  },

  // Map Filter Tags
  '🌐 ყველა სივრცე': { en: '🌐 All Spaces', de: '🌐 Alle Lernorte' },
  '💼 მხოლოდ ქოვორქინგი': { en: '💼 Coworking Only', de: '💼 Nur Co-Working' },
  '☕ კაფეები': { en: '☕ Cafes', de: '☕ Cafés' },
  '🏛️ ბიბლიოთეკა': { en: '🏛️ Libraries', de: '🏛️ Bibliotheken' },
  '🤫 ძალიან ჩუმი (≤30 dB)': { en: '🤫 Very Quiet (≤30 dB)', de: '🤫 Sehr leise (≤30 dB)' },

  // Landmarks
  'მთაწმინდის ანძა 🗼': { en: 'Mtatsminda TV Tower 🗼', de: 'Mtazminda-Fernsehturm 🗼' },
  'მშვიდობის ხიდი 🌉': { en: 'Bridge of Peace 🌉', de: 'Friedensbrücke 🌉' },
  'ეროვნული ბიბლიოთეკა 🏛️': { en: 'National Library 🏛️', de: 'Nationalbibliothek 🏛️' },
  'Tbilisi TV Tower — მშვენიერი ხედი და მშვიდი აურა მთაწმინდაზე 🌲': {
    en: 'Tbilisi TV Tower — scenic mountain view and peaceful atmosphere on Mtatsminda 🌲',
    de: 'Fernsehturm Tiflis — herrlicher Bergblick und friedliche Atmosphäre auf dem Mtazminda 🌲'
  },
  'Bridge of Peace — დააკავშირებს ძველ თბილისს რიყის პარკთან 🌊': {
    en: 'Bridge of Peace — connects Old Tbilisi history with modern Rike Park 🌊',
    de: 'Friedensbrücke — verbindet die Altstadt von Tiflis mit dem Rike-Park 🌊'
  },
  'National Library — იდეალური აკადემიური სივრცე და კვლევის ცენტრი 📚': {
    en: 'National Library — state-of-the-art academic workspace and heritage logs research 📚',
    de: 'Nationalbibliothek — hochmoderne akademische Arbeitsbereiche und Kulturerbeforschung 📚'
  },

  // opportunity types
  'ბოლო ვადა:': { en: 'Deadline:', de: 'Frist:' },

  // course types
  'ენები': { en: 'Languages', de: 'Sprachen' },
  'გამოცდები': { en: 'Exams', de: 'Prüfungen' },
  'სილაბუსი': { en: 'Syllabus', de: 'Lehrplan' },
  'სილაბუსის სამუშაო დაფა': { en: 'Syllabus Dashboard', de: 'Lehrplan-Dashboard' },
  'მოსახერხებელი': { en: 'Comfortable', de: 'Bequem' },
  'ულტრა ჩუმი': { en: 'Ultra Quiet', de: 'Ultra ruhig' },
  'სამუშაო ეკრანები': { en: 'Work Screens', de: 'Arbeitsbildschirme' },
  'მიიღე EduNest VIP': { en: 'Get EduNest VIP', de: 'EduNest VIP holen' },
  'მიიღე ექსკლუზიური ფასდაკლებები და გახსენი სრული AI ჩატბოტ ასისტენტი.': {
    en: 'Get exclusive sales & unlock full AI chatbot assistant.',
    de: 'Erhalten Sie exklusive Rabatte und schalten Sie den KI-Chatbot-Assistenten frei.'
  }
};

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

  // Active language and translations state
  const [activeLanguage, setActiveLanguage] = useState<'ka' | 'en' | 'de'>('ka');
  const t = useMemo(() => TRANSLATIONS[activeLanguage], [activeLanguage]);

  const trans = (str: string) => {
    if (activeLanguage === 'ka') return str;
    const match = TEXT_TRANSLATIONS[str];
    if (match) {
      return activeLanguage === 'en' ? match.en : match.de;
    }
    return str;
  };

  // AI Chatbot states
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'model', text: string }>>([]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [chatbotOpen, setChatbotOpen] = useState(false);

  // Initialize chatbot messages when language changes
  useEffect(() => {
    setChatMessages([
      { role: 'model', text: TRANSLATIONS[activeLanguage].aiWelcome }
    ]);
  }, [activeLanguage]);

  // Chat message sender
  const handleSendChatMessage = async () => {
    if (!chatInput.trim()) return;
    const userMsgText = chatInput;
    setChatInput('');
    
    const newMessages = [...chatMessages, { role: 'user' as const, text: userMsgText }];
    setChatMessages(newMessages);
    setChatLoading(true);

    try {
      const response = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsgText,
          history: chatMessages.slice(1), 
          userProfile: registeredUser,
          language: activeLanguage,
        })
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      setChatMessages([...newMessages, { role: 'model' as const, text: data.text }]);
    } catch (e) {
      console.error(e);
      let errorMsg = 'კავშირის პრობლემაა. გთხოვთ სცადოთ მოგვიანებით.';
      if (activeLanguage === 'en') errorMsg = 'Connection error. Please try again later.';
      if (activeLanguage === 'de') errorMsg = 'Verbindungsfehler. Bitte versuchen Sie es später noch einmal.';
      
      setChatMessages([...newMessages, { role: 'model' as const, text: errorMsg }]);
    } finally {
      setChatLoading(false);
    }
  };

  // Auto scroll to bottom anchor inside the chatbot
  useEffect(() => {
    if (chatbotOpen) {
      setTimeout(() => {
        const anchor = document.getElementById('chat-bottom-anchor');
        anchor?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [chatMessages, chatbotOpen]);
  
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

  // Profile editing states
  const [profileEditing, setProfileEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editInterests, setEditInterests] = useState<string[]>([]);

  // Premium states
  const [premiumModalOpen, setPremiumModalOpen] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'benefits' | 'card' | 'success'>('benefits');
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [premiumPromoReason, setPremiumPromoReason] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState('');

  // Automatically load values when profile modal opens
  useEffect(() => {
    if (profileSheetOpen && registeredUser) {
      setEditName(registeredUser.name);
      setEditEmail(registeredUser.email || '');
      setEditInterests(registeredUser.interests || [registeredUser.studyGoal]);
    }
  }, [profileSheetOpen, registeredUser]);

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
      setGpsError(activeLanguage === 'ka' ? "GPS-ი მხარდაუჭერელია ბრაუზერის მიერ." : activeLanguage === 'en' ? "GPS is not supported by your browser." : "GPS wird von Ihrem Browser nicht unterstützt.");
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
        setGpsError(activeLanguage === 'ka' ? "ბრაუზერმა დაბლოკა GPS. გამოყენებულია თბილისის ნაგულისხმევი ლოკაცია." : activeLanguage === 'en' ? "Browser blocked GPS access. Used default Tbilisi location." : "Browser hat den GPS-Zugriff blockiert. Standardstandort Tiflis verwendet.");
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
        distance: `${distanceKm} ${activeLanguage === 'ka' ? 'კმ' : 'km'}`
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
    <div className="relative mx-auto w-full md:max-w-[420px] h-screen md:h-[740px] md:rounded-3xl bg-slate-50 flex flex-col overflow-hidden md:border md:border-slate-200 md:shadow-2xl select-none">

        {/* Global Multi-Language Switcher Row */}
        <div className="bg-white px-5 py-2 border-b border-slate-100 flex justify-between items-center text-xs text-slate-500 shrink-0 select-none z-40 relative">
          <span className="font-bold text-[9px] uppercase tracking-wider text-slate-400">EduNest Portal</span>
          <div className="flex items-center gap-1">
            {(['ka', 'en', 'de'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setActiveLanguage(lang)}
                className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-tight transition cursor-pointer ${activeLanguage === lang ? 'bg-indigo-650 text-white shadow-3xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                {lang === 'ka' ? 'GE' : lang === 'en' ? 'EN' : 'DE'}
              </button>
            ))}
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
                    <span className="font-mono text-[9px] text-slate-400 uppercase tracking-widest font-bold">{t.welcomeBack}</span>
                    <h2 className="font-display text-xl font-bold text-slate-900 leading-tight">{t.greetings}, {registeredUser ? registeredUser.name : (activeLanguage === 'ka' ? 'ნიკა' : 'Nika')} 👋</h2>
                  </div>
                  <div 
                    onClick={() => setProfileSheetOpen(true)}
                    className="relative group cursor-pointer hover:scale-105 transition duration-150"
                  >
                    <div className={`absolute -inset-1 rounded-full opacity-65 blur-xs ${
                      registeredUser?.isPremium 
                        ? 'bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 animate-pulse' 
                        : 'bg-gradient-to-r from-[#06b6d4] to-[#7c3aed]'
                    }`} />
                    <div className={`relative w-11 h-11 rounded-full border-2 overflow-hidden shadow-xs flex items-center justify-center bg-gradient-to-tr text-white text-xs font-black ${
                      registeredUser?.isPremium 
                        ? 'border-amber-400 from-amber-500 via-amber-600 to-yellow-500' 
                        : 'border-white from-[#06b6d4] via-[#2563eb] to-[#7c3aed]'
                    }`}>
                      {registeredUser?.name ? registeredUser.name.charAt(0).toUpperCase() : 'M'}
                    </div>
                    {registeredUser?.isPremium && (
                      <div className="absolute -top-1 -right-1 bg-amber-400 text-slate-900 rounded-full w-4.5 h-4.5 flex items-center justify-center border border-amber-300 shadow-md">
                        <Crown className="w-2.5 h-2.5 text-slate-900 fill-slate-900" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Dynamic EduNest Core Slogan Showcase */}
                <div className="rounded-2xl bg-gradient-to-tr from-indigo-700 via-purple-700 to-teal-500 text-white p-4.5 shadow-md relative overflow-hidden">
                  <div className="absolute -right-4 -bottom-4 w-28 h-28 bg-white/5 rounded-full blur-xl" />
                  <div className="absolute top-2 right-2 rounded-full bg-white/10 px-2 py-0.5 text-[8px] uppercase tracking-widest font-mono">
                    ONLINE BLUEPRINT
                  </div>
                  <span className="font-mono text-[8px] uppercase tracking-widest text-[#e0e7ff] opacity-90 block">{t.sloganBadge}</span>
                  <h3 className="font-display text-[15px] font-bold mt-1 leading-snug">
                    „{t.sloganTitle}<br />{t.sloganSubtitle}“
                  </h3>
                  <p className="text-[10px] text-[#e0e7ff] opacity-95 mt-2 font-sans leading-relaxed">
                    {t.sloganDesc}
                  </p>
                </div>

                {/* Quick Search proxy redirecting to Places page */}
                <div 
                  onClick={() => onScreenChange('places')}
                  className="rounded-xl border border-slate-200 bg-white p-3 flex items-center gap-3 shadow-3xs cursor-pointer hover:border-indigo-400 transition"
                >
                  <Search className="w-4 h-4 text-slate-400" />
                  <span className="text-[11px] text-slate-400 font-sans">{t.searchPlaceholder}</span>
                </div>

                {/* Premium Promotional Banner / Status on Home Feed */}
                {!registeredUser?.isPremium ? (
                  <div className="bg-gradient-to-r from-amber-500/10 via-purple-600/5 to-indigo-600/10 border border-amber-500/30 rounded-2xl p-4 shadow-xs relative overflow-hidden text-left flex justify-between items-center transition hover:border-amber-500/50">
                    <div className="space-y-1 max-w-[70%]">
                      <div className="flex items-center gap-1.5">
                        <Crown className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                        <span className="font-mono text-[8px] uppercase tracking-widest text-amber-700 font-black">EduNest Premium</span>
                      </div>
                      <h4 className="font-display text-[12px] font-black text-slate-900 leading-tight">
                        {activeLanguage === 'ka' ? 'მიიღე ექსკლუზიური ფასდაკლებები და გახსენი AI ჩატბოტი' : activeLanguage === 'en' ? 'Get Exclusive Sales & Unlock AI Chatbot' : 'Erhalten Sie exklusive Angebote & KI-Chatbot'}
                      </h4>
                      <p className="text-[9px] text-slate-500 leading-tight block">
                        {activeLanguage === 'ka' ? 'გახდი პრემიუმ წევრი და ისარგებლე საუკეთესო ფასდაკლებებითა და სრული AI ასისტენტით!' : activeLanguage === 'en' ? 'Join premium to get exclusive space discounts and unlock our intelligent helper chatbot.' : 'Schalten Sie unbegrenzten KI-Chatbot und exklusive Angebote frei!'}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setPremiumPromoReason('');
                        setPremiumModalOpen(true);
                        setPaymentStep('benefits');
                      }}
                      className="px-3.5 py-2 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-600 text-white font-black text-[9.5px] shadow-sm hover:brightness-105 transition cursor-pointer shrink-0"
                    >
                      {t.buyPremiumBtn}
                    </button>
                  </div>
                ) : (
                  <div className="bg-gradient-to-r from-emerald-500/10 to-indigo-600/10 border border-emerald-500/30 rounded-2xl p-3.5 shadow-xs text-left flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <Crown className="w-5 h-5 text-emerald-600 fill-emerald-600 shrink-0" />
                      <div>
                        <h4 className="text-[11px] font-extrabold text-[#047857]">
                          {activeLanguage === 'ka' ? 'EduNest Premium აქტიურია' : activeLanguage === 'en' ? 'EduNest Premium Active' : 'EduNest Premium Aktiv'}
                        </h4>
                        <p className="text-[9px] text-[#065f46] opacity-90 leading-tight block">
                          {activeLanguage === 'ka' 
                            ? 'გაქვს წვდომა ექსკლუზიურ ფასდაკლებებსა და შეუზღუდავ AI ჩატბოტზე.' 
                            : activeLanguage === 'en' 
                              ? 'Congratulations! You have active access to exclusive sales and unlimited developer chatbot sessions.' 
                              : 'Sie haben unbegrenzten Zugang zu exklusiven Angeboten und unserem KI-Chatbot.'}
                        </p>
                      </div>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#047857] text-[8.5px] font-mono font-extrabold uppercase shrink-0">VIP</span>
                  </div>
                )}

                {/* Opportunities hub categories in Georgian */}
                <div className="space-y-2.5">
                  <h4 className="font-display text-[9px] font-bold uppercase tracking-wider text-slate-400">{t.infraHeader}</h4>
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
                        <span className="block font-display text-[10px] font-bold text-slate-800 leading-none">{t.tabSpaces}</span>
                        <span className="text-[8px] text-indigo-600 font-sans font-bold mt-1 block">
                          {placesList.length} {activeLanguage === 'ka' ? 'წერტილი' : activeLanguage === 'en' ? 'spots' : 'Plätze'}
                        </span>
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
                        <span className="block font-display text-[10px] font-bold text-slate-800 leading-none">{t.tabMap}</span>
                        <span className="text-[8px] text-teal-600 font-sans font-bold mt-1 block">
                          {activeLanguage === 'ka' ? 'ცოცხალი' : activeLanguage === 'en' ? 'Live GPS' : 'Echtzeit'}
                        </span>
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
                        <span className="block font-display text-[10px] font-bold text-slate-800 leading-none">{t.tabCourses}</span>
                        <span className="text-[8px] text-purple-600 font-sans font-bold mt-1 block">
                          {PROGRAMS.length} {activeLanguage === 'ka' ? 'სილაბუსი' : activeLanguage === 'en' ? 'syllabus' : 'Syllabi'}
                        </span>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Spotlit curated Space banner in Georgian */}
                <div className="rounded-2xl border border-slate-100 bg-white p-4 space-y-3 shadow-3xs">
                  <div className="flex justify-between items-center border-b border-slate-50 pb-2">
                    <span className="rounded-full bg-amber-50 border border-amber-100 text-amber-850 text-[8.5px] font-bold px-2 py-0.5 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-500 fill-amber-500" />
                      {activeLanguage === 'ka' ? 'საუკეთესო სივრცე დღეს' : activeLanguage === 'en' ? "Today's Curated Spot" : 'Bester Lernplatz heute'}
                    </span>
                    <span className="text-[8.5px] text-slate-400 font-semibold font-mono flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {activeLanguage === 'ka' ? 'განახლდა ახლახან' : activeLanguage === 'en' ? 'Updated recently' : 'Vor kurzem aktualisiert'}
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
                        <span className="text-emerald-600 font-bold">
                          {activeLanguage === 'ka' ? `ხმაური: ${100 - processedPlacesList[0].noiseLevel}% მშვიდი` : activeLanguage === 'en' ? `Noise: ${100 - processedPlacesList[0].noiseLevel}% quiet` : `Lärm: ${100 - processedPlacesList[0].noiseLevel}% ruhig`}
                        </span>
                        <span>·</span>
                        <span className="text-indigo-650 font-bold">{processedPlacesList[0].distance}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI assistant home promo card */}
                <div className={`rounded-2xl p-0.5 shadow-md ${!registeredUser?.isPremium ? 'bg-gradient-to-tr from-amber-500 via-yellow-500 to-amber-600' : 'bg-gradient-to-tr from-[#06b6d4] to-[#7c3aed]'}`}>
                  <div className="rounded-[14px] bg-slate-900 text-white p-4.5 space-y-3 relative overflow-hidden">
                    <div className="absolute top-[-20%] right-[-20%] w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
                    <div className="flex justify-between items-start">
                      <div className="flex gap-2 items-center">
                        <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center">
                          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                        </div>
                        <h4 className="font-display text-[11px] font-black text-slate-100">{t.aiBannerTitle}</h4>
                      </div>
                      {!registeredUser?.isPremium ? (
                        <span className="rounded-full bg-amber-500/20 border border-amber-500/40 font-mono text-[7px] font-bold px-1.5 py-0.5 text-amber-400 flex items-center gap-0.5 shadow-xs">
                          <Lock className="w-2 h-2 text-amber-400" /> PREMIUM
                        </span>
                      ) : (
                        <span className="rounded-full bg-slate-800 border border-slate-700 font-mono text-[7px] font-bold px-1.5 py-0.5 text-indigo-300">GEMINI POWERED</span>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-400 leading-relaxed font-sans">
                      {t.aiBannerDesc}
                    </p>
                    <button
                      onClick={() => {
                        if (!registeredUser?.isPremium) {
                          setPremiumPromoReason(activeLanguage === 'ka' ? 'რათა გახსნათ AI ჩატბოტ ასისტენტი 🤖' : activeLanguage === 'en' ? 'to unlock AI Chatbot Assistant 🤖' : 'um den KI-Chatbot-Assistenten freizuschalten 🤖');
                          setPremiumModalOpen(true);
                          setPaymentStep('benefits');
                        } else {
                          setChatbotOpen(true);
                        }
                      }}
                      className={`w-full py-2 rounded-xl text-white font-bold text-[10px] shadow-sm transition cursor-pointer flex items-center justify-center gap-1 active:scale-98 ${
                        !registeredUser?.isPremium 
                          ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:brightness-110' 
                          : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500'
                      }`}
                    >
                      {!registeredUser?.isPremium ? (
                        <>
                          <Lock className="w-3.5 h-3.5 text-white" />
                          <span>{activeLanguage === 'ka' ? 'ჩატბოტის გახსნა (Premium)' : activeLanguage === 'en' ? 'Unlock AI Chatbot (Premium)' : 'KI-Chatbot freischalten (Premium)'}</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5 text-white animate-pulse" />
                          {t.aiBannerBtn}
                        </>
                      )}
                    </button>
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
                        {trans(preset.label)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* List of Places inside Tbilisi */}
                <div className="space-y-3.5">
                  {filteredPlaces.length === 0 ? (
                    <div className="p-8 text-center text-slate-400 text-xs">
                      <AlertCircle className="w-8 h-8 mx-auto text-slate-350 mb-2" />
                      {trans('თქვენი ძიებით სივრცეები ვერ მოიძებნა.')}
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
                              {t.distance}: <strong>{place.distance}</strong>
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
                      <h2 className="font-display text-md font-black text-slate-900 leading-none">{trans('ცოცხალი საორიენტაციო რუკა')}</h2>
                      <p className="text-[9.5px] text-slate-400 font-medium mt-1">{trans('ინტერაქტიული GPS ნავიგაცია და სენსორები')}</p>
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
                      {activeLanguage === 'ka' ? 'GPS-ლოკატორი' : activeLanguage === 'en' ? 'GPS Locator' : 'GPS-Ortung'}
                    </button>
                  </div>

                  {/* Enhanced Horizontal Map Filter Category Chips */}
                  <div className="flex gap-1.5 mt-3 overflow-x-auto no-scrollbar pb-1 select-none">
                    {[
                      { id: 'all', label: trans('🌐 ყველა სივრცე') },
                      { id: 'coworking', label: trans('💼 მხოლოდ ქოვორქინგი') },
                      { id: 'cafe', label: trans('☕ კაფეები') },
                      { id: 'library', label: trans('🏛️ ბიბლიოთეკა') },
                      { id: 'quiet', label: trans('🤫 ძალიან ჩუმი (≤30 dB)') }
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
                <span className="text-[8.5px] font-bold font-sans mt-0.5">{t.tabHome}</span>
              </button>

              {/* Item 2: Spaces */}
              <button
                onClick={() => onScreenChange('places')}
                className={`flex flex-col items-center justify-center p-1.5 px-2 rounded-xl transition cursor-pointer flex-1 ${currentScreen === 'places' || currentScreen === 'place-detail' ? 'text-indigo-600 bg-indigo-50/50' : 'text-slate-400 hover:text-slate-800'}`}
              >
                <MapPin className="w-4.5 h-4.5 shrink-0" />
                <span className="text-[8.5px] font-bold font-sans mt-0.5">{t.tabSpaces}</span>
              </button>

              {/* Item 3: Vector Map */}
              <button
                onClick={() => onScreenChange('map')}
                className={`flex flex-col items-center justify-center p-1.5 px-2 rounded-xl transition cursor-pointer flex-1 ${currentScreen === 'map' ? 'text-teal-600 bg-teal-50/50' : 'text-slate-400 hover:text-slate-800'}`}
              >
                <Compass className="w-4.5 h-4.5 shrink-0 animate-spin" style={{ animationDuration: currentScreen === 'map' ? '5s' : '0s' }} />
                <span className="text-[8.5px] font-bold font-sans mt-0.5">{t.tabMap}</span>
              </button>

              {/* Item 4: Classes */}
              <button
                onClick={() => onScreenChange('programs')}
                className={`flex flex-col items-center justify-center p-1.5 px-2 rounded-xl transition cursor-pointer flex-1 ${currentScreen === 'programs' || currentScreen === 'program-detail' ? 'text-purple-600 bg-purple-50/50' : 'text-slate-400 hover:text-slate-800'}`}
              >
                <BookOpen className="w-4.5 h-4.5 shrink-0" />
                <span className="text-[8.5px] font-bold font-sans mt-0.5">{t.tabCourses}</span>
              </button>

              {/* Item 5: Grants */}
              <button
                onClick={() => onScreenChange('opportunities')}
                className={`flex flex-col items-center justify-center p-1.5 px-2 rounded-xl transition cursor-pointer flex-1 ${currentScreen === 'opportunities' ? 'text-rose-600 bg-rose-50/50' : 'text-slate-400 hover:text-slate-800'}`}
              >
                <GraduationCap className="w-4.5 h-4.5 shrink-0" />
                <span className="text-[8.5px] font-bold font-sans mt-0.5">{t.tabGrants}</span>
              </button>

            </div>
          </div>
        )}

        {/* INTERACTIVE AI RECOMMENDATIONS CHATBOT */}
        {chatbotOpen && (
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs z-50 flex flex-col justify-end">
            <div 
              className="absolute inset-0" 
              onClick={() => setChatbotOpen(false)}
            />
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              className="relative bg-slate-900 text-white rounded-t-3xl shadow-2xl z-55 h-[83%] flex flex-col overflow-hidden"
            >
              {/* Drag bar and header */}
              <div className="p-4 bg-slate-800 border-b border-slate-700 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#06b6d4] to-[#7c3aed] flex items-center justify-center shadow-md shadow-indigo-500/10">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-display text-[12px] font-extrabold text-slate-100">{t.aiAssistant}</h3>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[8.5px] text-slate-400 font-bold uppercase tracking-wider">Gemini Active</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setChatbotOpen(false)}
                  className="w-7 h-7 rounded-full bg-slate-700 hover:bg-slate-600 flex items-center justify-center cursor-pointer text-slate-300 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Chat Content conditionally depends on premium status */}
              {!registeredUser?.isPremium ? (
                <div className="flex-1 bg-slate-950 flex flex-col items-center justify-center p-6 text-center space-y-5 animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-slate-900 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-lg relative animate-pulse">
                    <Crown className="w-7 h-7 text-amber-400 fill-amber-400 animate-bounce" />
                    <div className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-red-500 border-2 border-slate-900 flex items-center justify-center">
                      <Lock className="w-2 h-2 text-white" />
                    </div>
                  </div>
                  
                  <div className="space-y-2 max-w-[85%]">
                    <h4 className="font-display text-xs font-black text-amber-400 uppercase tracking-widest leading-none">
                      {activeLanguage === 'ka' ? '🔒 AI ჩატბოტი დაბლოკილია' : activeLanguage === 'en' ? '🔒 AI Chatbot Locked' : '🔒 KI-Chatbot gesperrt'}
                    </h4>
                    <p className="text-[10px] text-slate-300 leading-relaxed font-sans mt-1">
                      {activeLanguage === 'ka' 
                        ? 'მოიპოვე სრული წვდომა ჭკვიან AI ასისტენტთან, რომელიც დაგეხმარება სწავლის სივრცეების შერჩევაში, IT კურიკულუმებისა და საგრანტო შესაძლებლობების პოვნაში.' 
                        : activeLanguage === 'en' 
                          ? 'Unlock full access to our intelligent AI helper to pick the absolute best study spaces, decode IT curricula, and map scholastic grants.' 
                          : 'Holen Sie sich vollen Zugriff auf den intelligenten KI-Berater für Lernbereiche und Studienprogramme.'}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-left w-full space-y-2">
                    <span className="font-mono text-[8px] uppercase tracking-wider text-amber-550 font-black block">{activeLanguage === 'ka' ? 'პრემიუმ წევრობის უპირატესობა' : 'PREMIUM PRIVILEGE'}</span>
                    <ul className="text-[9px] text-slate-400 space-y-1.5 list-disc pl-4 font-medium leading-relaxed">
                      <li>{activeLanguage === 'ka' ? 'შეუზღუდავი AI კონსულტაციები და რეკომენდაციები' : 'Unlimited AI diagnostics and consultations'}</li>
                      <li>{activeLanguage === 'ka' ? 'ინტეგრირებული Gemini-ს უახლესი მოდელი' : 'Powered by modern Google Gemini API'}</li>
                      <li>{activeLanguage === 'ka' ? 'ექსკლუზიური ფასდაკლებები ქოვორქინგ სივრცეებზე' : 'Access premium coworking pricing deals'}</li>
                    </ul>
                  </div>

                  <button
                    onClick={() => {
                      setPremiumPromoReason(activeLanguage === 'ka' ? 'რათა გახსნათ AI ჩატბოტ ასისტენტი 🤖' : activeLanguage === 'en' ? 'to unlock AI Chatbot Assistant 🤖' : 'um den KI-Chatbot-Assistenten freizuschalten 🤖');
                      setPremiumModalOpen(true);
                      setPaymentStep('benefits');
                    }}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:brightness-105 active:scale-98 text-slate-950 font-black text-[11px] transition shadow-lg flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Crown className="w-4 h-4 text-slate-950 fill-slate-950" />
                    <span>{activeLanguage === 'ka' ? 'გახდი პრემიუმი და გახსენი' : activeLanguage === 'en' ? 'Get Premium & Unlock Now' : 'Premium holen & freischalten'}</span>
                  </button>
                </div>
              ) : (
                <>
                  {/* Chat Message Box */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-3.5 no-scrollbar bg-slate-950">
                    {chatMessages.map((msg, idx) => (
                      <div key={idx} className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {msg.role === 'model' && (
                          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#06b6d4] to-[#7c3aed] flex items-center justify-center shadow-md font-sans text-xs shrink-0 self-end">
                            💡
                          </div>
                        )}
                        <div className={`max-w-[78%] rounded-2xl p-3 text-[10.5px] leading-relaxed shadow-sm ${
                          msg.role === 'user' 
                            ? 'bg-gradient-to-tr from-[#2563eb] to-[#7c3aed] text-white rounded-br-xs' 
                            : 'bg-slate-800 text-slate-100 rounded-bl-xs border border-slate-700/50'
                        }`}>
                          {msg.text}
                        </div>
                        {msg.role === 'user' && (
                          <div className="w-7 h-7 rounded-full text-white font-black text-[9px] flex items-center justify-center shrink-0 self-end leading-none bg-indigo-600 border border-indigo-500 shadow-sm">
                            {registeredUser?.name ? registeredUser.name.charAt(0).toUpperCase() : 'U'}
                          </div>
                        )}
                      </div>
                    ))}
                    
                    {chatLoading && (
                      <div className="flex gap-2 justify-start">
                        <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center animate-spin shrink-0">
                          <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
                        </div>
                        <div className="bg-slate-800 text-slate-400 border border-slate-700/50 rounded-2xl rounded-bl-xs p-3 text-[10.5px] flex items-center gap-1.5 shadow-sm">
                          <span className="font-bold">{t.aiThinking}...</span>
                        </div>
                      </div>
                    )}
                    
                    <div id="chat-bottom-anchor" />
                  </div>

                  {/* Suggestions Quick Buttons */}
                  <div className="px-3 py-2 bg-slate-900 border-t border-slate-800 flex gap-1.5 overflow-x-auto no-scrollbar shrink-0">
                    {[
                      {
                        ka: "🔍 მირჩიე ქოვორქინგი",
                        en: "🔍 Coworking recommendation",
                        de: "🔍 Co-Working empfehlen",
                        prompt: activeLanguage === 'ka' 
                          ? "მითხარი, რომელია საუკეთესო მშვიდი ქოვორქინგი თბილისში?" 
                          : activeLanguage === 'en' 
                            ? "What are the best places in Tbilisi with good power outlets and ultra-fast Wi-Fi?" 
                            : "Welche sind die besten Co-Working-Plätze in Tiflis?"
                      },
                      {
                        ka: "💻 საუკეთესო IT კურსები",
                        en: "💻 Best IT courses",
                        de: "💻 Beste IT-Kurse",
                        prompt: activeLanguage === 'ka' 
                          ? "რა ტიპის IT კურსებს ან აკადემიებს მირჩევდი სწავლისთვის?" 
                          : activeLanguage === 'en' 
                            ? "Can you recommend the top tech courses available on EduNest?" 
                            : "Können Sie mir IT-Kurse auf Deutsch empfehlen?"
                      },
                      {
                        ka: "🎓 სასტიპენდიო გრანტები",
                        en: "🎓 Grants & Loans",
                        de: "🎓 Bildungsstipendien",
                        prompt: activeLanguage === 'ka' 
                          ? "როგორ შემიძლია მოვიპოვო დაფინანსება ან გრანტები?" 
                          : activeLanguage === 'en' 
                            ? "What is the scholarship process and how should I apply?" 
                            : "Welche Stipendien sind derzeit verfügbar?"
                      }
                    ].map((s, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setChatInput(s.prompt);
                        }}
                        className="px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-[9px] font-bold text-slate-300 border border-slate-700 whitespace-nowrap cursor-pointer transition shrink-0"
                      >
                        {activeLanguage === 'ka' ? s.ka : activeLanguage === 'en' ? s.en : s.de}
                      </button>
                    ))}
                  </div>

                  {/* Chat typing block */}
                  <div className="p-3 bg-slate-850 border-t border-slate-700 flex gap-2 items-center shrink-0">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSendChatMessage();
                      }}
                      placeholder={t.aiPlaceholder}
                      className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-[11px] font-sans text-white focus:border-indigo-500 outline-none placeholder-slate-500"
                    />
                    <button
                      onClick={handleSendChatMessage}
                      disabled={chatLoading}
                      className="w-8.5 h-8.5 rounded-xl bg-gradient-to-tr from-[#06b6d4] to-[#7c3aed] hover:opacity-95 text-white flex items-center justify-center shadow-md cursor-pointer disabled:opacity-50 transition shrink-0"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        )}

        {/* USER PROFILE DRAWER PANEL (INTERACTIVE / DYNAMICALLY EDITABLE) */}
        {profileSheetOpen && (
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs z-50 flex flex-col justify-end">
            <div 
              className="absolute inset-0" 
              onClick={() => {
                setProfileSheetOpen(false);
                setProfileEditing(false);
              }}
            />
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              className="relative bg-white rounded-t-3xl p-5 space-y-4 shadow-2xl z-55 max-h-[85%] overflow-y-auto"
            >
              <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto" />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 pt-1">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-tr from-[#06b6d4] via-[#2563eb] to-[#7c3aed] text-white text-xs font-black shadow-xs shrink-0 select-none">
                    {editName ? editName.charAt(0).toUpperCase() : 'M'}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display text-[12px] font-extrabold text-slate-900 truncate">{editName || 'მაია ჩენი'}</h3>
                    <span className="text-[9px] text-slate-500 font-mono block leading-none mt-0.5">{editEmail || 'your@email.com'}</span>
                  </div>
                </div>
                
                {/* Toggle editing button */}
                <button
                  type="button"
                  onClick={() => setProfileEditing(!profileEditing)}
                  className="px-2.5 py-1 text-[9px] font-bold rounded-lg border border-slate-250 hover:bg-slate-50 text-slate-700 transition cursor-pointer"
                >
                  {profileEditing ? (activeLanguage === 'ka' ? 'გაუქმება ❌' : activeLanguage === 'en' ? 'Cancel ❌' : 'Abbrechen ❌') : '✏️ ' + (activeLanguage === 'ka' ? 'რედაქტირება' : activeLanguage === 'en' ? 'Edit Profile' : 'Profil bearbeiten')}
                </button>
              </div>

              {profileEditing ? (
                /* EDIT FORM */
                <div className="space-y-3.5 text-left text-xs pt-1">
                  <div className="space-y-1">
                    <label className="block text-slate-800 font-extrabold text-[8.5px] uppercase tracking-wider">{activeLanguage === 'ka' ? 'სრული სახელი' : activeLanguage === 'en' ? 'Full Name' : 'Vollständiger Name'}</label>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white py-1.5 px-3 text-[10px] font-semibold text-slate-800 focus:border-indigo-500 outline-none transition"
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="block text-slate-800 font-extrabold text-[8.5px] uppercase tracking-wider">{activeLanguage === 'ka' ? 'ელ-ფოსტა' : activeLanguage === 'en' ? 'Email Address' : 'E-Mail-Adresse'}</label>
                    <input
                      type="email"
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white py-1.5 px-3 text-[10px] font-semibold text-slate-800 focus:border-indigo-500 outline-none transition"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-slate-800 font-extrabold text-[8.5px] uppercase tracking-wider">{t.selectedFields}</label>
                    <div className="flex flex-wrap gap-1 pt-1 max-h-[100px] overflow-y-auto no-scrollbar">
                      {[
                        'ფინანსები', 'ტექნოლოგიები', 'ხელოვნური ინტელექტი', 'მედიცინა', 
                        'ბიზნესი', 'მეწარმეობა', 'საინჟინრო საქმე', 'დიზაინი', 'უცხო ენები'
                      ].map((interest) => {
                        const isSelected = editInterests.includes(interest);
                        return (
                          <button
                            key={interest}
                            type="button"
                            onClick={() => {
                              if (isSelected) {
                                setEditInterests(prev => prev.filter(x => x !== interest));
                              } else {
                                setEditInterests(prev => [...prev, interest]);
                              }
                            }}
                            className={`text-[8px] px-2.5 py-1 rounded-full font-bold transition-all border cursor-pointer ${
                              isSelected
                                ? 'bg-indigo-600 text-white border-transparent'
                                : 'bg-slate-50 text-slate-600 border-slate-200'
                            }`}
                          >
                            {interest}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      onRegister({
                        name: editName.trim() || 'მაია ჩენი',
                        avatar: registeredUser?.avatar || '',
                        studyGoal: editInterests[0] || 'ტექნოლოგიები',
                        learningMode: registeredUser?.learningMode || 'Offline',
                        email: editEmail.trim() || 'your@email.com',
                        interests: editInterests,
                      });
                      setProfileEditing(false);
                      setProfileSheetOpen(false);
                    }}
                    className="w-full py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-extrabold text-[10.5px] shadow-sm hover:opacity-95 transition cursor-pointer text-center"
                  >
                    {activeLanguage === 'ka' ? 'ცვლილებების შენახვა 💾' : activeLanguage === 'en' ? 'Save Changes 💾' : 'Änderungen speichern 💾'}
                  </button>
                </div>
              ) : (
                /* PROFILE READ-ONLY DISPLAY VIEW WITH MULTILINGUAL COMPATIBILITY */
                <div className="space-y-3 pt-1 text-xs">
                  
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 space-y-3 text-left">
                    <div className="flex flex-col gap-1.5 font-sans">
                      <span className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400">
                        {t.selectedFields}
                      </span>
                      <div className="flex flex-wrap gap-1 mt-0.5">
                        {editInterests && editInterests.length > 0 ? (
                          editInterests.map((interest) => (
                            <span key={interest} className="text-[9px] font-bold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                              {interest}
                            </span>
                          ))
                        ) : (
                          <span className="text-[9px] font-bold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                            {registeredUser ? registeredUser.studyGoal : 'ტექნოლოგიები'}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="border-t border-slate-150 pt-2.5 flex justify-between items-center text-[10.5px] font-sans">
                      <span className="text-slate-500 font-medium">{t.platformMode}:</span>
                      <span className={`font-extrabold px-2 py-0.5 rounded-md border ${
                        registeredUser?.isPremium 
                          ? 'text-amber-700 bg-amber-50 border-amber-200 animate-pulse' 
                          : 'text-[#2563eb] bg-blue-50 border-blue-100'
                      }`}>
                        {registeredUser?.isPremium ? t.premiumStatus : t.activeMember}
                      </span>
                    </div>
 
                    <div className="flex justify-between items-center text-[10.5px] font-sans">
                      <span className="text-slate-500 font-medium">{t.accountId}:</span>
                      <span className="font-mono text-slate-600 font-bold bg-slate-100 px-1.5 py-0.5 rounded text-[8.5px]">
                        EN-2026-CH
                      </span>
                    </div>
                  </div>

                  {/* High quality Premium Membership Purchase Call To Action */}
                  {!registeredUser?.isPremium && (
                    <div className="bg-gradient-to-tr from-amber-500/10 via-amber-600/5 to-purple-600/5 border border-amber-200/60 rounded-2xl p-3.5 text-left flex flex-col gap-2 shadow-xs">
                      <div className="flex items-start gap-2.5">
                        <Crown className="w-5 h-5 text-amber-600 fill-amber-600 mt-0.5 shrink-0" />
                        <div>
                          <h4 className="text-[11px] font-black text-amber-800 uppercase tracking-wide leading-none">
                            {activeLanguage === 'ka' ? 'გახდი EduNest VIP' : activeLanguage === 'en' ? 'Get EduNest VIP' : 'EduNest VIP holen'}
                          </h4>
                           <p className="text-[9px] text-slate-500 leading-normal mt-1">
                            {activeLanguage === 'ka' 
                              ? 'მიიღე ექსკლუზიური ფასდაკლებები და გახსენი სრული AI ჩატბოტ ასისტენტი.' 
                              : activeLanguage === 'en' 
                                ? 'Get exclusive workspace sales, course deals, and unlock our helper chatbot.' 
                                : 'Holen Sie sich exklusive Angebote & schalten Sie den KI-Chatbot frei.'}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setProfileSheetOpen(false);
                          setPremiumPromoReason('');
                          setPremiumModalOpen(true);
                          setPaymentStep('benefits');
                        }}
                        className="w-full py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:brightness-105 text-white font-black transition text-[9.5px] shadow-sm cursor-pointer text-center"
                      >
                        {t.buyPremiumBtn}
                      </button>
                    </div>
                  )}

                  {/* Reset and Logout inside simulator drawer */}
                  <button
                    onClick={() => {
                      setProfileSheetOpen(false);
                      onSignOut();
                    }}
                    className="w-full py-2.5 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold transition flex items-center justify-center gap-1.5 cursor-pointer text-[10.5px]"
                  >
                    {t.resetProfile}
                  </button>

                  <button
                    onClick={() => {
                      setProfileSheetOpen(false);
                      setProfileEditing(false);
                    }}
                    className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition flex items-center justify-center cursor-pointer text-[10.5px]"
                  >
                    {t.closeBtn}
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}

        {/* PREMIUM MEMBERSHIP PAYMENT GATEWAY / SYSTEM OVERLAY */}
        {premiumModalOpen && (
          <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs z-50 flex flex-col justify-end">
            <div 
              className="absolute inset-0 z-40" 
              onClick={() => {
                if (!paymentProcessing) {
                  setPremiumModalOpen(false);
                  setPremiumPromoReason('');
                }
              }}
            />
            
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="relative bg-slate-900 rounded-t-3xl border-t border-slate-800 p-6 space-y-5 text-white z-50 max-h-[92%] overflow-y-auto"
            >
              {/* Gold Top Ring Line indicator */}
              <div className="w-12 h-1 bg-amber-500/30 rounded-full mx-auto" />
              
              {/* Header section with crown badge */}
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/30 text-amber-400">
                    <Crown className="w-4 h-4 text-amber-400 fill-amber-400" />
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-black text-amber-400">EduNest Premium Upgrade</h3>
                    <p className="text-[10px] text-slate-400 font-medium font-mono">LIFETIME ACCESS MEMBERSHIP</p>
                  </div>
                </div>
                {!paymentProcessing && (
                  <button 
                    onClick={() => {
                      setPremiumModalOpen(false);
                      setPremiumPromoReason('');
                    }}
                    className="p-1 rounded-full hover:bg-slate-800 text-slate-500 transition cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              {premiumPromoReason && (
                <div className="bg-amber-500/10 border border-amber-500/30 p-2.5 rounded-xl text-[9px] text-amber-300 font-bold leading-relaxed text-center">
                  ⚠️ {activeLanguage === 'ka' ? `თქვენ გჭირდებათ Premium ${premiumPromoReason}` : activeLanguage === 'en' ? `You need active Premium ${premiumPromoReason}` : `Premium ist erforderlich, ${premiumPromoReason}`}
                </div>
              )}

              {/* STEP A: SHOWCASE EXKLUZIV BENEFITS */}
              {paymentStep === 'benefits' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="space-y-3.5 pt-1">
                    {/* Bullet 1: Exclusive Sales */}
                    <div className="flex gap-3 items-start p-3 rounded-2xl bg-slate-850 border border-slate-800 text-left">
                      <div className="w-8 h-8 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20 shrink-0">
                        <Tag className="w-4 h-4 text-amber-500" />
                      </div>
                      <div>
                        <h4 className="text-[11px] font-black text-slate-100">
                          {activeLanguage === 'ka' ? 'ექსკლუზიური ფასდაკლებები' : activeLanguage === 'en' ? 'Get Exclusive Sales' : 'Exklusive Rabatte'}
                        </h4>
                        <p className="text-[9.5px] text-slate-400 mt-0.5 leading-normal">
                          {activeLanguage === 'ka' 
                            ? 'აღმოაჩინე ექსკლუზიური ფასდაკლებები და სპეციალური შემოთავაზებები საუკეთესო სასწავლო სივრცეებსა თუ წამყვან კურსებზე.' 
                            : activeLanguage === 'en' 
                              ? 'Unlock unique discounts and curated limited-time sales across peak spaces and courses.' 
                              : 'Erhalten Sie Zugriff auf exklusive Angebote und Sonderbereiche.'}
                        </p>
                      </div>
                    </div>

                    {/* Bullet 2: Unlock AI Chatbot */}
                    <div className="flex gap-3 items-start p-3 rounded-2xl bg-slate-850 border border-slate-800 text-left">
                      <div className="w-8 h-8 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20 shrink-0">
                        <MessageSquare className="w-4 h-4 text-amber-500" />
                      </div>
                      <div>
                        <h4 className="text-[11px] font-black text-slate-100">
                          {activeLanguage === 'ka' ? 'ხელოვნური ინტელექტის ჩატბოტი' : activeLanguage === 'en' ? 'Unlock AI Chatbot' : 'KI-Chatbot freischalten'}
                        </h4>
                        <p className="text-[9.5px] text-slate-400 mt-0.5 leading-normal">
                          {activeLanguage === 'ka' 
                            ? 'გახსენი შეუზღუდავი წვდომა ჭკვიან ჩატბოტთან, რომელიც დაგეხმარება სწორი გადაწყვეტილებების მიღებაში.' 
                            : activeLanguage === 'en' 
                              ? 'Shatter boundaries and unlock unlimited personal interactions with our intelligent chat bot.' 
                              : 'Nutzen Sie unbegrenzte Unterhaltungen mit unserem intelligenten KI-Berater.'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Pricing tag block */}
                  <div className="p-4 rounded-2xl bg-gradient-to-tr from-amber-500/10 to-yellow-500/20 border border-amber-500/30 text-center space-y-1">
                    <span className="text-[9px] uppercase tracking-wider text-amber-400 font-bold">{activeLanguage === 'ka' ? 'სპეციალური შემოთავაზება' : 'MEMBERSHIP PRICING'}</span>
                    <div className="font-display text-2xl font-black text-white">
                      9.99 ₾ <span className="text-xs text-slate-400 font-sans font-normal">/ {activeLanguage === 'ka' ? 'ერთჯერადად' : activeLanguage === 'en' ? 'one-time payment' : 'einmalig'}</span>
                    </div>
                    <p className="text-[9px] text-slate-400">
                      {activeLanguage === 'ka' ? 'არავითარი ყოველთვიური გადასახადები! სამუდამო ლიცენზია.' : 'No subscription fees. Lifetime premium benefits permanently.'}
                    </p>
                  </div>

                  <button
                    onClick={() => setPaymentStep('card')}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black text-[11px] transition hover:opacity-95 shadow-lg shadow-amber-500/10 cursor-pointer text-center flex items-center justify-center gap-1.5"
                  >
                    <CreditCard className="w-4 h-4 text-slate-950" />
                    {activeLanguage === 'ka' ? 'გადახდაზე გადასვლა' : activeLanguage === 'en' ? 'Proceed to Secure Payment' : 'Weiter zur Zahlung'}
                  </button>
                </div>
              )}

              {/* STEP B: SECURE PAYMENT CRD INPUTS */}
              {paymentStep === 'card' && (
                <div className="space-y-4 animate-fadeIn text-left text-xs">
                  <div className="flex items-center gap-1.5 justify-between pb-2 border-b border-slate-800">
                    <span className="font-extrabold text-[10px] uppercase tracking-wider text-slate-400">{activeLanguage === 'ka' ? 'შეიყვანეთ ბარათის მონაცემები' : 'Secure Checkout Forms'}</span>
                    <span className="text-slate-400 font-mono text-[10px] font-bold">VIP.9.99_GEL</span>
                  </div>

                  {/* Payment Form Blocks */}
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="block text-slate-400 font-bold text-[8.5px] uppercase tracking-wider">{activeLanguage === 'ka' ? 'ბარათის ნომერი' : 'Card Number'}</label>
                      <div className="relative">
                        <input
                          type="text"
                          maxLength={19}
                          value={cardNumber}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
                            setCardNumber(val);
                          }}
                          placeholder="4000 1234 5678 9010"
                          disabled={paymentProcessing}
                          className="w-full rounded-xl bg-slate-950 border border-slate-800 py-2.5 px-3.5 text-[11px] font-mono font-bold text-white outline-none focus:border-amber-500 transition"
                        />
                        <div className="absolute top-2.5 right-3 text-slate-500">
                          <CreditCard className="w-4 h-4 text-slate-500" />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="block text-slate-400 font-bold text-[8.5px] uppercase tracking-wider">{activeLanguage === 'ka' ? 'მოქმედების ვადა' : 'Expiry Date'}</label>
                        <input
                          type="text"
                          maxLength={5}
                          value={cardExpiry}
                          onChange={(e) => {
                            let val = e.target.value;
                            if (val.length === 2 && !val.includes('/')) {
                              val += '/';
                            }
                            setCardExpiry(val);
                          }}
                          placeholder="MM/YY"
                          disabled={paymentProcessing}
                          className="w-full rounded-xl bg-slate-950 border border-slate-800 py-2.5 px-3.5 text-[11px] font-mono font-bold text-white outline-none focus:border-amber-500 transition text-center"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-slate-400 font-bold text-[8.5px] uppercase tracking-wider">CVV</label>
                        <input
                          type="password"
                          maxLength={3}
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                          placeholder="•••"
                          disabled={paymentProcessing}
                          className="w-full rounded-xl bg-slate-950 border border-slate-800 py-2.5 px-3.5 text-[11px] font-mono font-bold text-white outline-none focus:border-amber-500 transition text-center"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-slate-400 font-bold text-[8.5px] uppercase tracking-wider">{activeLanguage === 'ka' ? 'მფლობელის სახელი' : 'Cardholder Name'}</label>
                      <input
                        type="text"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        placeholder={registeredUser?.name || "e.g. Maya Chen"}
                        disabled={paymentProcessing}
                        className="w-full rounded-xl bg-slate-950 border border-slate-800 py-2.5 px-3.5 text-[11px] font-bold text-white outline-none focus:border-amber-500 transition"
                      />
                    </div>
                  </div>

                  {/* Submit Button with Loader */}
                  <button
                    onClick={() => {
                      if (!cardNumber || !cardExpiry || !cardCvv) {
                        alert(activeLanguage === 'ka' ? 'გთხოვთ შეავსოთ ყველა ველი!' : 'Please fill all fields!');
                        return;
                      }
                      
                      setPaymentProcessing(true);
                      
                      setTimeout(() => {
                        setPaymentProcessing(false);
                        setPaymentStep('success');
                        
                        if (registeredUser) {
                          onRegister({
                            ...registeredUser,
                            isPremium: true
                          });
                        }
                      }, 2000);
                    }}
                    disabled={paymentProcessing}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-[11px] transition hover:brightness-105 disabled:opacity-75 cursor-pointer text-center flex items-center justify-center gap-1.5 mt-2"
                  >
                    {paymentProcessing ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                        {activeLanguage === 'ka' ? 'კავშირი ბანკის სერვერთან...' : 'Authorizing secure payment...'}
                      </>
                    ) : (
                      <>
                        <span>{activeLanguage === 'ka' ? 'გადაიხადე 9.99 GEL' : 'Pay 9.99 GEL'}</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setPaymentStep('benefits')}
                    disabled={paymentProcessing}
                    className="w-full py-2 rounded-xl border border-slate-800 hover:bg-slate-850 text-slate-400 font-bold transition text-[10px] cursor-pointer text-center"
                  >
                    {activeLanguage === 'ka' ? 'უკან დაბრუნება' : 'Back to features'}
                  </button>
                </div>
              )}

              {/* STEP C: PAYMENT SUCCESS ANIMATION */}
              {paymentStep === 'success' && (
                <div className="space-y-5 text-center py-4 animate-zoomIn">
                  <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/30 rounded-full flex items-center justify-center mx-auto text-amber-400 shadow-lg relative animate-bounce">
                    <div className="absolute inset-0 bg-amber-500/15 rounded-full animate-ping pointer-events-none" />
                    <Crown className="w-7 h-7 text-amber-400 fill-amber-400" />
                  </div>

                  <div className="space-y-1.5">
                    <h4 className="font-display text-base font-black text-amber-400">
                      {activeLanguage === 'ka' ? 'აქტივაცია წარმატებულია!' : 'Upgrade Complete!'}
                    </h4>
                    <p className="text-[10px] text-slate-300 leading-relaxed max-w-[85%] mx-auto block font-sans">
                      {activeLanguage === 'ka' 
                        ? 'გილოცავთ! თქვენ წარმატებით შემოუერთდით EduNest Premium-ს. ყველა ფუნქცია სრულად განბლოკილია.' 
                        : 'Congratulations! You have successfully upgraded to EduNest Premium. All features are unlocked.'}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setPremiumModalOpen(false);
                      setPremiumPromoReason('');
                    }}
                    className="px-6 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-[10.5px] transition shadow-md cursor-pointer inline-block"
                  >
                    {activeLanguage === 'ka' ? 'მშვენიერია' : 'Awesome!'}
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}

      </div>
  );
}
