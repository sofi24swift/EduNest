export interface TranslationDict {
  sloganTitle: string;
  sloganSubtitle: string;
  sloganBadge: string;
  sloganDesc: string;
  searchPlaceholder: string;
  infraHeader: string;
  hub1Title: string;
  hub1Sub: string;
  hub2Title: string;
  hub2Sub: string;
  hub3Title: string;
  hub3Sub: string;
  homeTitle: string;
  welcomeBack: string;
  greetings: string;
  
  // Tabs
  tabHome: string;
  tabSpaces: string;
  tabMap: string;
  tabCourses: string;
  tabGrants: string;

  // Profiles and forms
  profileTitle: string;
  selectedFields: string;
  platformMode: string;
  activeMember: string;
  accountId: string;
  resetProfile: string;
  closeBtn: string;
  joinTitle: string;
  joinSubtitle: string;
  fullName: string;
  fullNamePlaceholder: string;
  email: string;
  password: string;
  passwordPlaceholder: string;
  confirmPassword: string;
  confirmPasswordPlaceholder: string;
  interestsLabel: string;
  createAcc: string;
  alreadyHaveAcc: string;
  loginBtn: string;

  // Extra Details
  backBtn: string;
  distance: string;
  noiseLevel: string;
  wifiQuality: string;
  powerOutlets: string;
  crowdLabel: string;
  isOpen: string;
  isClosed: string;
  directionBtn: string;
  bookBtn: string;
  reviewsHeader: string;
  addReview: string;
  yourName: string;
  reviewComment: string;
  reviewPlaceholder: string;
  submitReview: string;
  reviewsCount: string;
  courseDuration: string;
  courseRating: string;
  enrollBtn: string;
  enrolledStatus: string;
  programsTitle: string;
  grantsTitle: string;
  programLabel: string;
  opportunityLabel: string;
  allCategories: string;

  // Chatbot
  aiAssistant: string;
  aiWelcome: string;
  aiPlaceholder: string;
  aiSend: string;
  aiThinking: string;
  aiBannerTitle: string;
  aiBannerDesc: string;
  aiBannerBtn: string;
  buyPremiumBtn: string;
  premiumStatus: string;
}

export const TRANSLATIONS: Record<'ka' | 'en' | 'de', TranslationDict> = {
  ka: {
    sloganTitle: "ნაკლები ძიება,",
    sloganSubtitle: "მეტი განვითარება.",
    sloganBadge: "პრემიუმ სისტემა",
    sloganDesc: "მოძებნე მყუდრო სამუშაო სივრცეები თბილისში, განაგრძე სწავლა და მოიპოვე გრანტები.",
    searchPlaceholder: "მოძებნე სივრცეები, განაცხადები...",
    infraHeader: "EduNest ინფრასტრუქტურა",
    hub1Title: "მყუდრო სივრცეები",
    hub1Sub: "ქოვორქინგი / კაფეები",
    hub2Title: "აკადემიური კურსები",
    hub2Sub: "დაეუფლე პროფესიას",
    hub3Title: "სასწავლო გრანტები",
    hub3Sub: "რესურსები სწავლისთვის",
    homeTitle: "მთავარი",
    welcomeBack: "წარმატებულ დღეს გისურვებთ!",
    greetings: "სალამი",

    tabHome: "მთავარი",
    tabSpaces: "სივრცეები",
    tabMap: "რუკა GPA",
    tabCourses: "კურსები",
    tabGrants: "გრანტები",

    profileTitle: "პირადი პროფილი",
    selectedFields: "არჩეული სასწავლო სფეროები",
    platformMode: "პლატფორმის რეჟიმი:",
    activeMember: "აქტიური წევრი",
    accountId: "ანგარიშის ID:",
    resetProfile: "პროფილის გადატვირთვა / გამოსვლა 🔄",
    closeBtn: "დახურვა",
    joinTitle: "შემოუერთდი EduNest-ს",
    joinSubtitle: "დაიწყე შენთვის იდეალური სასწავლო სივრცეების აღმოჩენა",
    fullName: "სრული სახელი",
    fullNamePlaceholder: "მაგ: მაია ჩენი",
    email: "ელ-ფოსტა",
    password: "პაროლი",
    passwordPlaceholder: "მინიმუმ 8 სიმბოლო",
    confirmPassword: "დაადასტურეთ პაროლი",
    confirmPasswordPlaceholder: "გაიმეორეთ პაროლი",
    interestsLabel: "აირჩიეთ თქვენი ინტერესები",
    createAcc: "ანგარიშის შექმნა",
    alreadyHaveAcc: "უკვე გაქვთ ანგარიში?",
    loginBtn: "შესვლა",

    backBtn: "უკან",
    distance: "მანძილი",
    noiseLevel: "ხმაურის დონე",
    wifiQuality: "Wi-Fi ხარისხი",
    powerOutlets: "როზეტები",
    crowdLabel: "დატვირთვა",
    isOpen: "ღიაა",
    isClosed: "დაკეტილია",
    directionBtn: "მიმართულებები 🧭",
    bookBtn: "როზეტის დაჯავშნა 🔌",
    reviewsHeader: "მომხმარებელთა შეფასებები",
    addReview: "შეფასების დამატება",
    yourName: "შენი სახელი",
    reviewComment: "შეფასების კომენტარი",
    reviewPlaceholder: "დაწერე შენი აზრი ამ სივრცეზე...",
    submitReview: "შეფასების გაგზავნა ⭐",
    reviewsCount: "შეფასება",
    courseDuration: "ხანგრძლივობა",
    courseRating: "რეიტინგი",
    enrollBtn: "კურსზე რეგისტრაცია",
    enrolledStatus: "✓ კურსი არჩეულია",
    programsTitle: "აკადემიური პროგრამები",
    grantsTitle: "სასტიპენდიო გრანტები",
    programLabel: "პროგრამა",
    opportunityLabel: "გაცვლითი / გრანტი",
    allCategories: "ყველა კატეგორია",

    // Chatbot
    aiAssistant: "EduNest AI ასისტენტი",
    aiWelcome: "გამარჯობა! მე ვარ EduNest-ის ხელოვნური ინტელექტი, შენი პერსონალური ასისტენტი. რით შემიძლია დაგეხმარო დღეს? 🚀",
    aiPlaceholder: "ჰკითხე სივრცეებზე, კურსებზე ან გრანტებზე...",
    aiSend: "გაგზავნა",
    aiThinking: "ფიქრობს...",
    aiBannerTitle: "EduNest AI ასისტენტი ⚡",
    aiBannerDesc: "მიიღე მყისიერი რეკომენდაციები შენს ინტერესებზე ორიენტირებული სივრცეებისა და კურსების შესახებ.",
    aiBannerBtn: "ჩეთში შესვლა",
    buyPremiumBtn: "პრემიუმის შეძენა",
    premiumStatus: "პრემიუმ მომხმარებელი"
  },
  en: {
    sloganTitle: "Less searching,",
    sloganSubtitle: "More developing.",
    sloganBadge: "Premium System",
    sloganDesc: "Find cozy study spots in Tbilisi, advance your skills, and capture remote scholarship grants.",
    searchPlaceholder: "Search spots, programs, courses...",
    infraHeader: "EduNest Infrastructure",
    hub1Title: "Cozy Study spots",
    hub1Sub: "Coworkings & Cafes",
    hub2Title: "Academic Courses",
    hub2Sub: "Master New Skills",
    hub3Title: "Laptops & Grants",
    hub3Sub: "Resources for Learning",
    homeTitle: "Home",
    welcomeBack: "Have a spectacular day!",
    greetings: "Hello",

    tabHome: "Home",
    tabSpaces: "Spaces",
    tabMap: "Map GPx",
    tabCourses: "Courses",
    tabGrants: "Grants",

    profileTitle: "User Profile",
    selectedFields: "Selected Study Areas",
    platformMode: "Platform Mode:",
    activeMember: "Active Member",
    accountId: "Account ID:",
    resetProfile: "Reset Profile / Sign Out 🔄",
    closeBtn: "Close",
    joinTitle: "Join EduNest",
    joinSubtitle: "Start discovering your perfect study spaces",
    fullName: "Full Name",
    fullNamePlaceholder: "e.g., Maya Chen",
    email: "Email Address",
    password: "Password",
    passwordPlaceholder: "Min. 8 characters",
    confirmPassword: "Confirm Password",
    confirmPasswordPlaceholder: "Re-enter your password",
    interestsLabel: "Select Your Interests",
    createAcc: "Create Account",
    alreadyHaveAcc: "Already have an account?",
    loginBtn: "Log in",

    backBtn: "Back",
    distance: "Distance",
    noiseLevel: "Noise Level",
    wifiQuality: "Wi-Fi Quality",
    powerOutlets: "Outlets",
    crowdLabel: "Crowd Level",
    isOpen: "Open",
    isClosed: "Closed",
    directionBtn: "Directions 🧭",
    bookBtn: "Reserve Socket 🔌",
    reviewsHeader: "User Reviews",
    addReview: "Add Review",
    yourName: "Your Name",
    reviewComment: "Review Comment",
    reviewPlaceholder: "Write your review about this spot...",
    submitReview: "Submit Review ⭐",
    reviewsCount: "reviews",
    courseDuration: "Duration",
    courseRating: "Rating",
    enrollBtn: "Register for Course",
    enrolledStatus: "✓ Enrolled",
    programsTitle: "Academic Programs",
    grantsTitle: "Scholarship Grants",
    programLabel: "Program",
    opportunityLabel: "Opportunity / Grant",
    allCategories: "All Categories",

    // Chatbot
    aiAssistant: "EduNest AI Assistant",
    aiWelcome: "Hello! I am EduNest AI, your personalized assistant. How can I help you discover study spaces, courses, or grants in Tbilisi today? 🚀",
    aiPlaceholder: "Ask about quiet coworings, tech courses or scholarships...",
    aiSend: "Send",
    aiThinking: "Thinking...",
    aiBannerTitle: "EduNest AI Assistant ⚡",
    aiBannerDesc: "Receive instant recommendations tailored to your profile, interests, and study format.",
    aiBannerBtn: "Start AI Chat",
    buyPremiumBtn: "Get Premium",
    premiumStatus: "Premium Member"
  },
  de: {
    sloganTitle: "Weniger Suchen,",
    sloganSubtitle: "Mehr Wachsen,",
    sloganBadge: "Premium-System",
    sloganDesc: "Finden Sie gemütliche Lernräume in Tiflis, entwickeln Sie Ihre Fähigkeiten und sichern Sie sich Stipendien.",
    searchPlaceholder: "Lernorte, Kurse, Stipendien suchen...",
    infraHeader: "EduNest Infrastruktur",
    hub1Title: "Gemütliche Lernorte",
    hub1Sub: "Coworking & Cafés",
    hub2Title: "Lehrgänge & Kurse",
    hub2Sub: "Meistern Sie neue Skills",
    hub3Title: "Laptops & Stipendien",
    hub3Sub: "Ressourcen fürs Lernen",
    homeTitle: "Startseite",
    welcomeBack: "Einen erfolgreichen Tag!",
    greetings: "Hallo",

    tabHome: "Start",
    tabSpaces: "Lernorte",
    tabMap: "Karte GPA",
    tabCourses: "Kurse",
    tabGrants: "Stipendien",

    profileTitle: "Benutzerprofil",
    selectedFields: "Ausgewählte Studienbereiche",
    platformMode: "Plattform-Modus:",
    activeMember: "Aktives Mitglied",
    accountId: "Kontonummer:",
    resetProfile: "Profil zurücksetzen / Abmelden 🔄",
    closeBtn: "Schließen",
    joinTitle: "EduNest beitreten",
    joinSubtitle: "Entdecken Sie die besten Lernräume in Ihrer Nähe",
    fullName: "Vollständiger Name",
    fullNamePlaceholder: "z.B. Maya Chen",
    email: "E-Mail-Adresse",
    password: "Passwort",
    passwordPlaceholder: "Mindestens 8 Zeichen",
    confirmPassword: "Passwort bestätigen",
    confirmPasswordPlaceholder: "Passwort wiederholen",
    interestsLabel: "Wählen Sie Ihre Interessen",
    createAcc: "Konto erstellen",
    alreadyHaveAcc: "Haben Sie bereits ein Konto?",
    loginBtn: "Einloggen",

    backBtn: "Zurück",
    distance: "Entfernung",
    noiseLevel: "Lärmpegel",
    wifiQuality: "Wi-Fi-Qualität",
    powerOutlets: "Steckdosen",
    crowdLabel: "Auslastung",
    isOpen: "Geöffnet",
    isClosed: "Geschlossen",
    directionBtn: "Wegbeschreibung 🧭",
    bookBtn: "Steckdose reservieren 🔌",
    reviewsHeader: "Nutzerbewertungen",
    addReview: "Bewertung abgeben",
    yourName: "Ihr Name",
    reviewComment: "Ihre Bewertung",
    reviewPlaceholder: "Teilen Sie Ihre Erfahrungen mit diesem Ort...",
    submitReview: "Bewertung absenden ⭐",
    reviewsCount: "Bewertungen",
    courseDuration: "Dauer",
    courseRating: "Bewertung",
    enrollBtn: "Kurs belegen",
    enrolledStatus: "✓ Belegt",
    programsTitle: "Akademische Programme",
    grantsTitle: "Lernstipendien",
    programLabel: "Programm",
    opportunityLabel: "Austausch / Stipendium",
    allCategories: "Alle Kategorien",

    // Chatbot
    aiAssistant: "EduNest AI Assistent",
    aiWelcome: "Hallo! Ich am EduNest AI, dein persönlicher Begleiter. Wie kann ich dir heute helfen, erstklassige Coworking-Spaces, Bibliotheken oder Fördermittel in Tiflis zu entdecken? 🚀",
    aiPlaceholder: "Frage mich nach leisen Cafés, IT-Kursen oder Stipendien...",
    aiSend: "Senden",
    aiThinking: "Denkt nach...",
    aiBannerTitle: "EduNest AI Assistent ⚡",
    aiBannerDesc: "Erhalten Sie sofort maßgeschneiderte Empfehlungen basierend auf Ihren Interessen und Ihrem Studienziel.",
    aiBannerBtn: "AI-Chat starten",
    buyPremiumBtn: "Premium holen",
    premiumStatus: "Premium-Mitglied"
  }
};
