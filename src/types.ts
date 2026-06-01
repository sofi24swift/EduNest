/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface StudyPlace {
  id: string;
  name: string;
  type: 'cafe' | 'library' | 'coworking';
  rating: number;
  reviewsCount: number;
  address: string;
  distance: string;
  noiseLevel: number; // 1-100 (10 is quiet, 80 is loud)
  wifiQuality: number; // Mbps or score out of 100
  outlets: 'Excellent' | 'Moderate' | 'Sparse';
  lighting: 'Natural' | 'Bright' | 'Warm';
  crowdLevel: number; // 1-100%
  isOpen: boolean;
  image: string;
  tags: string[];
  reviews: Review[];
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Program {
  id: string;
  title: string;
  provider: string;
  category: 'Tech' | 'Languages' | 'Business' | 'Exams';
  type: 'Online' | 'Offline';
  priceType: 'Free' | 'Paid';
  price: string;
  duration: string;
  rating: number;
  enrollments: number;
  image: string;
  tags: string[];
  description: string;
}

export interface Opportunity {
  id: string;
  title: string;
  organization: string;
  type: 'Scholarship' | 'Internship' | 'Remote Work';
  location: string;
  deadline: string;
  amount?: string; // e.g. "$5,000/yr" or "Paid"
  image: string;
  tags: string[];
  description: string;
}

export type ScreenType = 'registration' | 'home' | 'places' | 'place-detail' | 'programs' | 'program-detail' | 'opportunities';

export interface UserProfile {
  name: string;
  avatar: string;
  studyGoal: string;
  learningMode: 'Online' | 'Offline' | 'Distant' | 'Hybrid';
}

