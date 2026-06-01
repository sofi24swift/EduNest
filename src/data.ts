/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { StudyPlace, Program, Opportunity } from './types';

export const STUDY_PLACES: StudyPlace[] = [
  {
    id: 'place-1',
    name: 'The Glasshouse Coworking Desk',
    type: 'coworking',
    rating: 4.9,
    reviewsCount: 142,
    address: '42 Spero Boulevard, Innovation District',
    distance: '0.4 mi',
    noiseLevel: 22, // ultra quiet
    wifiQuality: 96, // speed metric / 100
    outlets: 'Excellent',
    lighting: 'Natural',
    crowdLevel: 45, // 45% full
    isOpen: true,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80',
    tags: ['Quiet', 'Wi-Fi 6', 'Outlets', 'Natural Light'],
    reviews: [
      {
        id: 'rev-1',
        author: 'Nika Kavtaradze',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: 'Yesterday',
        comment: 'Absolutely spectacular quiet space with high-speed fiber internet. Outlets are embedded in every desk. Highly recommend the focus booths!'
      },
      {
        id: 'rev-2',
        author: 'Luka Tabatadze',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: '3 days ago',
        comment: 'Super polite hosts. Unlimited premium drip coffee. It has custom posture chairs that save your back during 6-hour coding stretches.'
      }
    ]
  },
  {
    id: 'place-2',
    name: 'Nest & Brew Coffee House',
    type: 'cafe',
    rating: 4.7,
    reviewsCount: 89,
    address: '88 Linden St, Creative Quarter',
    distance: '1.2 mi',
    noiseLevel: 58, // moderate chic background buzz
    wifiQuality: 82,
    outlets: 'Moderate',
    lighting: 'Warm',
    crowdLevel: 75,
    isOpen: true,
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80',
    tags: ['Aesthetic', 'Wi-Fi', 'Outlets', 'Great Coffee'],
    reviews: [
      {
        id: 'rev-3',
        author: 'Salome Beridze',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        rating: 4,
        date: '1 week ago',
        comment: 'Great lattes and lovely ambient jazz music. It gets a bit busy around 2 PM, but the back tables always have available wall outlets.'
      }
    ]
  },
  {
    id: 'place-3',
    name: 'Aethelgard Memorial Library',
    type: 'library',
    rating: 4.8,
    reviewsCount: 204,
    address: 'Collegiate Hill, Old Town',
    distance: '1.5 mi',
    noiseLevel: 12, // pin drop silent
    wifiQuality: 74,
    outlets: 'Excellent',
    lighting: 'Bright',
    crowdLevel: 30,
    isOpen: true,
    image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=600&q=80',
    tags: ['Silent', 'Free', 'Outlets', 'Historical'],
    reviews: [
      {
        id: 'rev-4',
        author: 'Dito Alavidze',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: '5 days ago',
        comment: 'The architectural masterpiece of study spaces. Stunning high vaulted ceilings and deep focus desks. Pure silent luxury.'
      }
    ]
  },
  {
    id: 'place-4',
    name: 'Prism Lab Workspace & Studio',
    type: 'coworking',
    rating: 5.0,
    reviewsCount: 56,
    address: 'Suite 300, The Helix Highrise',
    distance: '1.8 mi',
    noiseLevel: 18,
    wifiQuality: 99,
    outlets: 'Excellent',
    lighting: 'Natural',
    crowdLevel: 15,
    isOpen: true,
    image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=600&q=80',
    tags: ['State-of-the-art', 'Ergonomic', 'Dual Monitored', 'Ultra Quiet'],
    reviews: [
      {
        id: 'rev-5',
        author: 'Mariam Jgenti',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: '2 weeks ago',
        comment: 'They provide actual 27-inch 4K monitors at some desks you can plug your USB-C laptop into. Insane quality for deep-work sessions!'
      }
    ]
  }
];

export const PROGRAMS: Program[] = [
  {
    id: 'prog-1',
    title: 'Full Stack AI Development & Cloud Integration',
    provider: 'EduNest Academy × Google Cloud Partner',
    category: 'Tech',
    type: 'Online',
    priceType: 'Paid',
    price: '$249',
    duration: '12 Weeks',
    rating: 4.9,
    enrollments: 4890,
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80',
    tags: ['AI Agents', 'React', 'TypeScript', 'Node.js'],
    description: 'Master AI Orchestration, modern full-stack development, and cloud services scaling with hands-on labs and direct mentor feedback.'
  },
  {
    id: 'prog-2',
    title: 'Sovereign English: Advanced Rhetoric & Business Pitching',
    provider: 'Oxford Rhetoric Guild',
    category: 'Languages',
    type: 'Online',
    priceType: 'Free',
    price: 'Free',
    duration: '6 Weeks',
    rating: 4.8,
    enrollments: 12400,
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80',
    tags: ['Public Speaking', 'Persuasion', 'Professional English'],
    description: 'Equip yourself with elite verbal frameworks, written composition skills, and executive communication structures for international setups.'
  },
  {
    id: 'prog-3',
    title: 'Strategic Startup Systems & Tech Venture Capital',
    provider: 'Silicon Valley Founders Lab',
    category: 'Business',
    type: 'Offline',
    priceType: 'Paid',
    price: '$750',
    duration: '4 Weeks',
    rating: 4.9,
    enrollments: 1100,
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=600&q=80',
    tags: ['Venturing', 'Unit Economics', 'Investor Readiness'],
    description: 'A cohort-based classroom program designed to run through the strict unit economics, product-market fit tests, and deck builders of unicorns.'
  },
  {
    id: 'prog-4',
    title: 'IELTS Mastery Intensive & Accent Neutralization',
    provider: 'Cambridge Premier Educators',
    category: 'Exams',
    type: 'Online',
    priceType: 'Paid',
    price: '$99',
    duration: '8 Weeks',
    rating: 4.7,
    enrollments: 8430,
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=600&q=80',
    tags: ['IELTS 8.5+', 'Spoken Fluency', 'Examiner Secrets'],
    description: 'Guaranteed tactics and deep feedback cycles to scale speaking, listening, writing, and reading metrics from 6.0 towards 8.5+ scoreboards.'
  }
];

export const OPPORTUNITIES: Opportunity[] = [
  {
    id: 'opt-1',
    title: 'NextGen Tech Pioneers Scholarship 2026',
    organization: 'Google Developers × EduNest Alliance',
    type: 'Scholarship',
    location: 'Global (Online Study)',
    deadline: 'June 30, 2026',
    amount: '$12,000 Award',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80',
    tags: ['Tech Grant', 'Mentorship', 'Equity Inclusion'],
    description: 'Aiming to empower top-tier students from emerging tech markets with direct funding, high-spec work gear, and 12 months select mentorship.'
  },
  {
    id: 'opt-2',
    title: 'UX Researcher & Product Design Scholar',
    organization: 'Notion HQ (San Francisco Bridge)',
    type: 'Internship',
    location: 'Remote / Hybrid US',
    deadline: 'July 15, 2026',
    amount: '$6,500/Month',
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=600&q=80',
    tags: ['Paid Internship', 'UX Research', 'Figma Systems'],
    description: 'Join the product team shaping the future of workspace software. Own real streams from research scripts to high-fidelity wireframe launches.'
  },
  {
    id: 'opt-3',
    title: 'Junior Software Engineer (Real-Time Systems)',
    organization: 'Airbnb Global Engineering',
    type: 'Remote Work',
    location: 'Fully Remote (Americas/EMEA)',
    deadline: 'July 01, 2026',
    amount: '$110,000/Year',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
    tags: ['Full Time', 'React / Node.js', 'Distributed Systems'],
    description: 'Contribute to Airbnb’s Core Services team. Focus on high-throughput, low-latency live booking status microservices.'
  }
];
