/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { StudyPlace, Program, Opportunity } from './types';

export const STUDY_PLACES: StudyPlace[] = [
  {
    id: 'place-1',
    name: 'სტამბა ქოვორქინგი • Stamba Coworking',
    type: 'coworking',
    rating: 4.9,
    reviewsCount: 142,
    address: 'მერაბ კოსტავას ქუჩა 14, თბილისი',
    distance: '0.4 კმ',
    noiseLevel: 22,
    wifiQuality: 98,
    outlets: 'Excellent',
    lighting: 'Natural',
    crowdLevel: 45,
    isOpen: true,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80',
    tags: ['ჩუმი', 'სწრაფი Wi-Fi', 'როზეტები კედლებში', 'ბუნებრივი შუქი'],
    lat: 41.7092,
    lng: 44.7915,
    reviews: [
      {
        id: 'rev-1',
        author: 'ნიკა კავთარაძე',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: 'გუშინ',
        comment: 'გამორჩეულად მშვიდი გარემო სწრაფი ოპტიკური ინტერნეტით. როზეტები ჩაშენებულია ყველა მაგიდაზე. ძალიან გირჩევთ ფოკუს-ბუთებს!'
      },
      {
        id: 'rev-2',
        author: 'ლუკა ტაბატაძე',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: '3 დღის წინ',
        comment: 'ძალიან ზომიერი ხმაური, კარგი განათება. უგემრიელესი ფილტრ-ყავა აქვთ და სავარძლები საათობით მუშაობისას ზურგს არ გტკენს.'
      }
    ]
  },
  {
    id: 'place-2',
    name: 'ფაბრიკა თბილისი • Fabrika Hub',
    type: 'cafe',
    rating: 4.7,
    reviewsCount: 89,
    address: 'ეგნატე ნინოშვილის ქუჩა 8, თბილისი',
    distance: '1.2 კმ',
    noiseLevel: 58,
    wifiQuality: 88,
    outlets: 'Moderate',
    lighting: 'Warm',
    crowdLevel: 75,
    isOpen: true,
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80',
    tags: ['ესთეტიკური', 'კარგი ყავა', 'ღია სივრცე', 'სოციალური'],
    lat: 41.7096,
    lng: 44.8052,
    reviews: [
      {
        id: 'rev-3',
        author: 'სალომე ბერიძე',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        rating: 4,
        date: '1 კვირის წინ',
        comment: 'შესანიშნავი მუსიკა და სასიამოვნო ატმოსფერო. ნაშუადღევს ხალხმრავლობაა ხოლმე, მაგრამ უკანა მაგიდებთან ყოველთვისაა თავისუფალი დენის წყარო.'
      }
    ]
  },
  {
    id: 'place-3',
    name: 'საქართველოს პარლამენტის ეროვნული ბიბლიოთეკა',
    type: 'library',
    rating: 4.8,
    reviewsCount: 204,
    address: 'ლადო გუდიაშვილის ქუჩა 7, თბილისი',
    distance: '1.5 კმ',
    noiseLevel: 12,
    wifiQuality: 78,
    outlets: 'Excellent',
    lighting: 'Bright',
    crowdLevel: 30,
    isOpen: true,
    image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=600&q=80',
    tags: ['აკადემიური', 'სრული სიჩუმე', 'უფასო', 'ისტორიული ბიბლიოთეკა'],
    lat: 41.6974,
    lng: 44.8001,
    reviews: [
      {
        id: 'rev-4',
        author: 'დიტო ალავიძე',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: '5 დღის წინ',
        comment: 'ნამდვილი არქიტექტურული საოცრება სწავლისთვის. მაღალი ჭერი, აკადემიური აურა და ღრმა ფოკუსირებისთვის საუკეთესო მყუდრო მაგიდები.'
      }
    ]
  },
  {
    id: 'place-4',
    name: 'ტექნოპარკი თბილისი • Tech Park Georgia',
    type: 'coworking',
    rating: 5.0,
    reviewsCount: 56,
    address: 'ინოვაციების ქუჩა 7, ოქროყანა',
    distance: '3.2 კმ',
    noiseLevel: 18,
    wifiQuality: 99,
    outlets: 'Excellent',
    lighting: 'Natural',
    crowdLevel: 15,
    isOpen: true,
    image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=600&q=80',
    tags: ['ინოვაციური', 'მოსახერხებელი', 'ულტრა ჩუმი', 'სამუშაო ეკრანები'],
    lat: 41.7118,
    lng: 44.7314,
    reviews: [
      {
        id: 'rev-5',
        author: 'მარიამ ჟღენტი',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: '2 კვირის წინ',
        comment: 'ზოგიერთ მაგიდაზე გხვდება სპეციალური 4K მონიტორი, რომელსაც შეგიძლია დაუკავშირო ლეპტოპი. საოცარი კომფორტია სრული ფოკუსისთვის!'
      }
    ]
  }
];

export const PROGRAMS: Program[] = [
  {
    id: 'prog-1',
    title: 'Full-Stack ხელოვნური ინტელექტის დეველოპმენტი და Cloud ინტეგრაცია',
    provider: 'EduNest აკადემია × Google Cloud პარტნიორი',
    category: 'Tech',
    type: 'Online',
    priceType: 'Paid',
    price: '$249',
    duration: '12 კვირა',
    rating: 4.9,
    enrollments: 4890,
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80',
    tags: ['AI აგენტები', 'React', 'TypeScript', 'Node.js'],
    description: 'შეისწავლეთ AI აგენტების არქიტექტურა, ფულსტეკ დეველოპმენტი და Cloud სისტემების მასშტაბირება პრაქტიკული ლაბორატორიებითა და წამყვანი მენტორების კვირეული რეცენზიებით.'
  },
  {
    id: 'prog-2',
    title: 'სუვერენული ინგლისური: პროფესიული რიტორიკა და ბიზნეს კომუნიკაცია',
    provider: 'ოქსფორდის რიტორიკის გილდია',
    category: 'Languages',
    type: 'Online',
    priceType: 'Free',
    price: 'უფასო',
    duration: '6 კვირა',
    rating: 4.8,
    enrollments: 12400,
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80',
    tags: ['საჯარო გამოსვლა', 'დარწმუნების უნარი', 'ბიზნეს ინგლისური'],
    description: 'დაეუფლეთ ელიტურ ვერბალურ სტრუქტურებსა და წერის სტილს, რათა დამაჯერებლად წარადგინოთ თქვენი იდეები საერთაშორისო ასპარეზზე.'
  },
  {
    id: 'prog-3',
    title: 'სტარტაპის სტრატეგიული სისტემები და ვენჩურული კაპიტალი',
    provider: 'სილიკონ ველის დამფუძნებელთა მატრიცა',
    category: 'Business',
    type: 'Offline',
    priceType: 'Paid',
    price: '$750',
    duration: '4 კვირა',
    rating: 4.9,
    enrollments: 1100,
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=600&q=80',
    tags: ['ინვესტიციები', 'სტარტაპის ეკონომიკა', 'Pitch Deck'],
    description: 'ინტენსიური სასწავლო პროგრამა, რომელიც დაფუძნებულია რეალური იუნიკორნების ეკონომიკაზე, ბაზარზე შესვლის ტაქტიკასა და პრეზენტაციების შემუშავებაზე.'
  },
  {
    id: 'prog-4',
    title: 'IELTS Mastery ინტენსიური კურსი და აქცენტის კორექცია',
    provider: 'კემბრიჯის უმაღლესი განათლება',
    category: 'Exams',
    type: 'Online',
    priceType: 'Paid',
    price: '$99',
    duration: '8 კვირა',
    rating: 4.7,
    enrollments: 8430,
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=600&q=80',
    tags: ['IELTS 8.5+', 'სასაუბრო პრაქტიკა', 'გამოცდის სექტორები'],
    description: 'გარანტირებული სასწავლო ტაქტიკა და დეტალური კვირეული უკუკავშირი თქვენი ქულის 8.5+ მაჩვენებლამდე გასაზრდელად.'
  }
];

export const OPPORTUNITIES: Opportunity[] = [
  {
    id: 'opt-1',
    title: 'NextGen ტექნოლოგიური პიონერების სტიპენდია 2026',
    organization: 'Google დეველოპერები & EduNest ალიანსი',
    type: 'Scholarship',
    location: 'გლობალური (ონლაინ)',
    deadline: '30 ივნისი, 2026',
    amount: '12,000$ გრანტი',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80',
    tags: ['ტექ გრანტი', 'მენტორობა', 'ფინანსური დახმარება'],
    description: 'მიზნად ისახავს განვითარებადი ქვეყნების გამორჩეული ახალგაზრდების მხარდაჭერას პირდაპირი საფინანსო დახმარებით, ტექნიკითა და მენტორობით.'
  },
  {
    id: 'opt-2',
    title: 'პროდუქტის დიზაინისა და UX მკვლევარის სტაჟირება',
    organization: 'Notion HQ (სან-ფრანცისკო)',
    type: 'Internship',
    location: 'ჰიბრიდული / აშშ',
    deadline: '15 ივლისი, 2026',
    amount: '6,500$ თვეში',
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=600&q=80',
    tags: ['ანაზღაურებადი', 'Figma', 'პროდუქტ დიზაინი'],
    description: 'შემოუერთდით Notion-ის გუნდს, შეისწავლეთ მომხმარებელთა გამოცდილება და მიიღეთ მონაწილეობა რეალური ინტერფეისების დაპროექტებაში.'
  },
  {
    id: 'opt-3',
    title: 'უმცროსი პროგრამული უზრუნველყოფის ინჟინერი (Real-time)',
    organization: 'Airbnb Global Engineering',
    type: 'Remote Work',
    location: 'სრულად დისტანციური',
    deadline: '1 ივლისი, 2026',
    amount: '110,000$ წელიწადში',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
    tags: ['სრული განაკვეთი', 'React / Node.js', 'დისტრიბუციული სისტემები'],
    description: 'შემოუერთდით Airbnb-ის ინფრასტრუქტურულ გუნდს. იმუშავეთ მაღალი დატვირთვის მქონე რეალურ რეზერვაციის სერვისებზე.'
  }
];
