import { cldImg } from './cloudinary';

export interface Puppy {
  id: string;
  name: string;
  breed: 'pomeranian' | 'berger-australien';
  breedLabel: string;
  gender: 'male' | 'female';
  dob: string;
  color: string;
  line: string;
  status: 'available' | 'reserved' | 'coming' | 'adopted' | 'sold';
  image: string;
  images: string[];
  video?: string;
  description: string;
  father: ParentDog;
  mother: ParentDog;
  included: string[];
  slug: string;
}

export interface ParentDog {
  name: string;
  titles: string[];
  image: string;
  healthTests: string[];
  breed: string;
  color: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  slug: string;
  category: string;
}

export interface GalleryItem {
  id: string;
  image: string;
  caption: string;
  category: 'champions' | 'families' | 'behind-scenes' | 'community';
}

export const mockPuppies: Puppy[] = [
  {
    id: '1',
    name: 'Luna',
    breed: 'pomeranian',
    breedLabel: 'Spitz Nain',
    gender: 'female',
    dob: '2025-11-15',
    color: 'Orange Sable',
    line: 'Teddy Bear',
    status: 'available',
    image: cldImg('visual-showcase/after_WhatsApp Image 2026-01-28 at 15.23.27', 'w_600,h_600,c_fill,q_auto,f_auto'),
    images: [
      cldImg('visual-showcase/after_WhatsApp Image 2026-01-28 at 15.23.27', 'w_800,q_auto,f_auto'),
      cldImg('visual-showcase/after_WhatsApp Image 2026-01-28 at 15.23.27 (3)', 'w_800,q_auto,f_auto'),
      cldImg('visual-showcase/after_WhatsApp Image 2026-01-28 at 15.23.27 (5)', 'w_800,q_auto,f_auto'),
    ],
    description: 'Luna est une magnifique femelle Spitz Nain de lignée Teddy Bear. Son pelage orange sable, dense et soyeux, encadre un visage de poupée irrésistible. Socialisée avec amour, elle est prête à conquérir le cœur de sa nouvelle famille.',
    father: {
      name: 'CH. Royal Crown\'s Golden Prince',
      titles: ['Champion International', 'Best in Show 2024'],
      image: cldImg('visual-showcase/after_WhatsApp Image 2026-01-28 at 15.23.27 (7)', 'w_400,h_400,c_fill,g_auto,q_auto,f_auto'),
      healthTests: ['Patella: 0/0', 'Cardiaque: Normal', 'ADN: Clair'],
      breed: 'Spitz Nain',
      color: 'Orange',
    },
    mother: {
      name: 'CH. Starlight\'s Diamond Dream',
      titles: ['Championne du Maroc', 'Excellente en Exposition'],
      image: cldImg('visual-showcase/after_WhatsApp Image 2026-01-28 at 15.23.27 (5)', 'w_400,h_400,c_fill,g_auto,q_auto,f_auto'),
      healthTests: ['Patella: 0/0', 'Cardiaque: Normal', 'ADN: Clair'],
      breed: 'Spitz Nain',
      color: 'Cream Sable',
    },
    included: [
      'Carnet de vaccination à jour',
      'Puce électronique',
      'Certificat vétérinaire de bonne santé',
      'Résultats tests génétiques des parents',
      'Kit de démarrage (alimentation, guide)',
      'Contrat de vente et garantie santé',
      'Suivi personnalisé à vie',
    ],
    slug: 'luna-spitz-nain-orange-sable',
  },
  {
    id: '2',
    name: 'Atlas',
    breed: 'berger-australien',
    breedLabel: 'Berger Australien',
    gender: 'male',
    dob: '2025-10-20',
    color: 'Blue Merle',
    line: 'Beauty Line',
    status: 'available',
    image: cldImg('visual-showcase/after_WhatsApp Image 2026-01-28 at 17.06.36 (3)', 'w_600,h_600,c_fill,q_auto,f_auto'),
    images: [
      cldImg('visual-showcase/after_WhatsApp Image 2026-01-28 at 17.06.36 (3)', 'w_800,q_auto,f_auto'),
      cldImg('visual-showcase/after_WhatsApp Image 2026-01-28 at 17.06.36 (5)', 'w_800,q_auto,f_auto'),
      cldImg('visual-showcase/after_WhatsApp Image 2026-01-28 at 17.06.36 (2)', 'w_800,q_auto,f_auto'),
    ],
    description: 'Atlas est un superbe mâle Berger Australien Blue Merle. Sa robe marbrée aux reflets argentés et ses yeux vairons en font un chiot d\'une beauté saisissante. Intelligent et athlétique, il sera le compagnon idéal d\'une famille active.',
    father: {
      name: 'CH. Blue Ridge\'s Storm Chaser',
      titles: ['Champion International', 'Meilleur Mâle 2024'],
      image: cldImg('visual-showcase/after_WhatsApp Image 2026-01-28 at 17.06.36 (3)', 'w_400,h_400,c_fill,g_auto,q_auto,f_auto'),
      healthTests: ['Hanches: A/A', 'Coudes: 0/0', 'Yeux: CERF Clear', 'MDR1: +/+'],
      breed: 'Berger Australien',
      color: 'Blue Merle',
    },
    mother: {
      name: 'CH. Wildfire\'s Autumn Rose',
      titles: ['Championne du Maroc', 'BOB 2024'],
      image: cldImg('visual-showcase/after_WhatsApp Image 2026-01-28 at 17.06.36 (2)', 'w_400,h_400,c_fill,g_auto,q_auto,f_auto'),
      healthTests: ['Hanches: A/B', 'Coudes: 0/0', 'Yeux: CERF Clear', 'MDR1: +/+'],
      breed: 'Berger Australien',
      color: 'Red Tri',
    },
    included: [
      'Carnet de vaccination à jour',
      'Puce électronique',
      'Certificat vétérinaire de bonne santé',
      'Résultats tests génétiques des parents',
      'Kit de démarrage (alimentation, guide)',
      'Contrat de vente et garantie santé',
      'Suivi personnalisé à vie',
    ],
    slug: 'atlas-berger-australien-blue-merle',
  },
  {
    id: '3',
    name: 'Caramel',
    breed: 'pomeranian',
    breedLabel: 'Spitz Nain',
    gender: 'male',
    dob: '2025-12-01',
    color: 'Cream',
    line: 'Standard',
    status: 'reserved',
    image: cldImg('visual-showcase/after_WhatsApp Image 2026-01-28 at 15.23.27 (7)', 'w_600,h_600,c_fill,q_auto,f_auto'),
    images: [cldImg('visual-showcase/after_WhatsApp Image 2026-01-28 at 15.23.27 (7)', 'w_800,q_auto,f_auto')],
    description: 'Caramel est un adorable mâle Spitz Nain de couleur crème. Son tempérament doux et joueur en fait un compagnon de rêve.',
    father: {
      name: 'CH. Royal Crown\'s Golden Prince',
      titles: ['Champion International'],
      image: cldImg('visual-showcase/after_WhatsApp Image 2026-01-28 at 15.23.27 (7)', 'w_400,h_400,c_fill,g_auto,q_auto,f_auto'),
      healthTests: ['Patella: 0/0', 'Cardiaque: Normal', 'ADN: Clair'],
      breed: 'Spitz Nain',
      color: 'Orange',
    },
    mother: {
      name: 'Precious Pearl\'s Ivory Star',
      titles: ['Excellente en Exposition'],
      image: cldImg('visual-showcase/after_WhatsApp Image 2026-01-28 at 15.23.27 (3)', 'w_400,h_400,c_fill,g_auto,q_auto,f_auto'),
      healthTests: ['Patella: 0/0', 'Cardiaque: Normal', 'ADN: Clair'],
      breed: 'Spitz Nain',
      color: 'White',
    },
    included: [
      'Carnet de vaccination à jour',
      'Puce électronique',
      'Certificat vétérinaire de bonne santé',
      'Résultats tests génétiques des parents',
      'Kit de démarrage (alimentation, guide)',
      'Contrat de vente et garantie santé',
      'Suivi personnalisé à vie',
    ],
    slug: 'caramel-spitz-nain-cream',
  },
  {
    id: '4',
    name: 'Sierra',
    breed: 'berger-australien',
    breedLabel: 'Berger Australien',
    gender: 'female',
    dob: '2026-01-10',
    color: 'Red Tri',
    line: 'Working Line',
    status: 'coming',
    image: cldImg('visual-showcase/after_WhatsApp Image 2026-01-28 at 16.50.15', 'w_600,h_600,c_fill,q_auto,f_auto'),
    images: [cldImg('visual-showcase/after_WhatsApp Image 2026-01-28 at 16.50.15', 'w_800,q_auto,f_auto')],
    description: 'Sierra est une magnifique femelle Berger Australien Red Tri de lignée Working. Elle sera disponible bientôt.',
    father: {
      name: 'CH. Mountain Ridge\'s Brave Heart',
      titles: ['Champion National', 'Working Dog Title'],
      image: cldImg('visual-showcase/after_WhatsApp Image 2026-01-28 at 17.06.36 (5)', 'w_400,h_400,c_fill,g_auto,q_auto,f_auto'),
      healthTests: ['Hanches: A/A', 'Coudes: 0/0', 'Yeux: CERF Clear', 'MDR1: +/+'],
      breed: 'Berger Australien',
      color: 'Black Tri',
    },
    mother: {
      name: 'CH. Wildfire\'s Autumn Rose',
      titles: ['Championne du Maroc'],
      image: cldImg('visual-showcase/after_WhatsApp Image 2026-01-28 at 17.06.36 (2)', 'w_400,h_400,c_fill,g_auto,q_auto,f_auto'),
      healthTests: ['Hanches: A/B', 'Coudes: 0/0', 'Yeux: CERF Clear', 'MDR1: +/+'],
      breed: 'Berger Australien',
      color: 'Red Tri',
    },
    included: [
      'Carnet de vaccination à jour',
      'Puce électronique',
      'Certificat vétérinaire de bonne santé',
      'Résultats tests génétiques des parents',
      'Kit de démarrage (alimentation, guide)',
      'Contrat de vente et garantie santé',
      'Suivi personnalisé à vie',
    ],
    slug: 'sierra-berger-australien-red-tri',
  },
  {
    id: '5',
    name: 'Milo',
    breed: 'pomeranian',
    breedLabel: 'Spitz Nain',
    gender: 'male',
    dob: '2025-08-10',
    color: 'Black & Tan',
    line: 'Teddy Bear',
    status: 'sold',
    image: cldImg('visual-showcase/after_WhatsApp Image 2026-01-28 at 15.23.27 (1)', 'w_600,h_600,c_fill,q_auto,f_auto'),
    images: [cldImg('visual-showcase/after_WhatsApp Image 2026-01-28 at 15.23.27 (1)', 'w_800,q_auto,f_auto')],
    description: 'Milo a rejoint sa nouvelle famille à Rabat. Ce magnifique mâle noir et feu a conquis tous les cœurs.',
    father: {
      name: 'CH. Royal Crown\'s Golden Prince',
      titles: ['Champion International'],
      image: cldImg('visual-showcase/after_WhatsApp Image 2026-01-28 at 15.23.27 (7)', 'w_400,h_400,c_fill,g_auto,q_auto,f_auto'),
      healthTests: ['Patella: 0/0', 'Cardiaque: Normal', 'ADN: Clair'],
      breed: 'Spitz Nain',
      color: 'Orange',
    },
    mother: {
      name: 'CH. Starlight\'s Diamond Dream',
      titles: ['Championne du Maroc'],
      image: cldImg('visual-showcase/after_WhatsApp Image 2026-01-28 at 15.23.27 (5)', 'w_400,h_400,c_fill,g_auto,q_auto,f_auto'),
      healthTests: ['Patella: 0/0', 'Cardiaque: Normal', 'ADN: Clair'],
      breed: 'Spitz Nain',
      color: 'Cream Sable',
    },
    included: [
      'Carnet de vaccination à jour',
      'Puce électronique',
      'Certificat vétérinaire de bonne santé',
      'Kit de démarrage',
      'Suivi personnalisé à vie',
    ],
    slug: 'milo-spitz-nain-black-tan',
  },
  {
    id: '6',
    name: 'Nala',
    breed: 'berger-australien',
    breedLabel: 'Berger Australien',
    gender: 'female',
    dob: '2025-09-05',
    color: 'Black Tri',
    line: 'Beauty Line',
    status: 'sold',
    image: cldImg('visual-showcase/before_WhatsApp Image 2026-01-28 at 17.06.36 (9)', 'w_600,h_600,c_fill,q_auto,f_auto'),
    images: [cldImg('visual-showcase/before_WhatsApp Image 2026-01-28 at 17.06.36 (9)', 'w_800,q_auto,f_auto')],
    description: 'Nala est partie rejoindre sa famille à Marrakech. Une femelle exceptionnelle par sa beauté et son intelligence.',
    father: {
      name: 'CH. Blue Ridge\'s Storm Chaser',
      titles: ['Champion International'],
      image: cldImg('visual-showcase/after_WhatsApp Image 2026-01-28 at 17.06.36 (3)', 'w_400,h_400,c_fill,g_auto,q_auto,f_auto'),
      healthTests: ['Hanches: A/A', 'Coudes: 0/0', 'Yeux: CERF Clear', 'MDR1: +/+'],
      breed: 'Berger Australien',
      color: 'Blue Merle',
    },
    mother: {
      name: 'CH. Wildfire\'s Autumn Rose',
      titles: ['Championne du Maroc'],
      image: cldImg('visual-showcase/after_WhatsApp Image 2026-01-28 at 17.06.36 (2)', 'w_400,h_400,c_fill,g_auto,q_auto,f_auto'),
      healthTests: ['Hanches: A/B', 'Coudes: 0/0', 'Yeux: CERF Clear', 'MDR1: +/+'],
      breed: 'Berger Australien',
      color: 'Red Tri',
    },
    included: [
      'Carnet de vaccination à jour',
      'Puce électronique',
      'Certificat vétérinaire de bonne santé',
      'Kit de démarrage',
      'Suivi personnalisé à vie',
    ],
    slug: 'nala-berger-australien-black-tri',
  },
  {
    id: '7',
    name: 'Simba',
    breed: 'pomeranian',
    breedLabel: 'Spitz Nain',
    gender: 'male',
    dob: '2025-12-20',
    color: 'Orange',
    line: 'Standard',
    status: 'available',
    image: cldImg('visual-showcase/before_WhatsApp Image 2026-01-28 at 15.23.28 (1)', 'w_600,h_600,c_fill,q_auto,f_auto'),
    images: [cldImg('visual-showcase/before_WhatsApp Image 2026-01-28 at 15.23.28 (1)', 'w_800,q_auto,f_auto')],
    description: 'Simba est un magnifique mâle orange vif au tempérament joyeux et énergique. Parfait pour une famille aimante.',
    father: {
      name: 'CH. Royal Crown\'s Golden Prince',
      titles: ['Champion International'],
      image: cldImg('visual-showcase/after_WhatsApp Image 2026-01-28 at 15.23.27 (7)', 'w_400,h_400,c_fill,g_auto,q_auto,f_auto'),
      healthTests: ['Patella: 0/0', 'Cardiaque: Normal', 'ADN: Clair'],
      breed: 'Spitz Nain',
      color: 'Orange',
    },
    mother: {
      name: 'Precious Pearl\'s Ivory Star',
      titles: ['Excellente en Exposition'],
      image: cldImg('visual-showcase/after_WhatsApp Image 2026-01-28 at 15.23.27 (3)', 'w_400,h_400,c_fill,g_auto,q_auto,f_auto'),
      healthTests: ['Patella: 0/0', 'Cardiaque: Normal', 'ADN: Clair'],
      breed: 'Spitz Nain',
      color: 'White',
    },
    included: [
      'Carnet de vaccination à jour',
      'Puce électronique',
      'Certificat vétérinaire de bonne santé',
      'Kit de démarrage',
      'Suivi personnalisé à vie',
    ],
    slug: 'simba-spitz-nain-orange',
  },
  {
    id: '8',
    name: 'Koda',
    breed: 'berger-australien',
    breedLabel: 'Berger Australien',
    gender: 'male',
    dob: '2025-11-28',
    color: 'Red Merle',
    line: 'Working Line',
    status: 'available',
    image: cldImg('visual-showcase/before_WhatsApp Image 2026-01-28 at 17.06.36 (13)', 'w_600,h_600,c_fill,q_auto,f_auto'),
    images: [cldImg('visual-showcase/before_WhatsApp Image 2026-01-28 at 17.06.36 (13)', 'w_800,q_auto,f_auto')],
    description: 'Koda est un superbe mâle Red Merle aux yeux cuivrés. Issu de lignée Working, il excelle en obéissance et agilité.',
    father: {
      name: 'CH. Mountain Ridge\'s Brave Heart',
      titles: ['Champion National', 'Working Dog Title'],
      image: cldImg('visual-showcase/after_WhatsApp Image 2026-01-28 at 17.06.36 (5)', 'w_400,h_400,c_fill,g_auto,q_auto,f_auto'),
      healthTests: ['Hanches: A/A', 'Coudes: 0/0', 'Yeux: CERF Clear', 'MDR1: +/+'],
      breed: 'Berger Australien',
      color: 'Black Tri',
    },
    mother: {
      name: 'CH. Wildfire\'s Autumn Rose',
      titles: ['Championne du Maroc'],
      image: cldImg('visual-showcase/after_WhatsApp Image 2026-01-28 at 17.06.36 (2)', 'w_400,h_400,c_fill,g_auto,q_auto,f_auto'),
      healthTests: ['Hanches: A/B', 'Coudes: 0/0', 'Yeux: CERF Clear', 'MDR1: +/+'],
      breed: 'Berger Australien',
      color: 'Red Tri',
    },
    included: [
      'Carnet de vaccination à jour',
      'Puce électronique',
      'Certificat vétérinaire de bonne santé',
      'Kit de démarrage',
      'Suivi personnalisé à vie',
    ],
    slug: 'koda-berger-australien-red-merle',
  },
  {
    id: '9',
    name: 'Bella',
    breed: 'pomeranian',
    breedLabel: 'Spitz Nain',
    gender: 'female',
    dob: '2025-07-15',
    color: 'Sable',
    line: 'Teddy Bear',
    status: 'adopted',
    image: cldImg('visual-showcase/before_WhatsApp Image 2026-01-28 at 15.23.28 (3)', 'w_600,h_600,c_fill,q_auto,f_auto'),
    images: [cldImg('visual-showcase/before_WhatsApp Image 2026-01-28 at 15.23.28 (3)', 'w_800,q_auto,f_auto')],
    description: 'Bella a été adoptée par une famille aimante à Casablanca. Elle illumine son foyer de sa joie de vivre.',
    father: {
      name: 'CH. Royal Crown\'s Golden Prince',
      titles: ['Champion International'],
      image: cldImg('visual-showcase/after_WhatsApp Image 2026-01-28 at 15.23.27 (7)', 'w_400,h_400,c_fill,g_auto,q_auto,f_auto'),
      healthTests: ['Patella: 0/0', 'Cardiaque: Normal', 'ADN: Clair'],
      breed: 'Spitz Nain',
      color: 'Orange',
    },
    mother: {
      name: 'CH. Starlight\'s Diamond Dream',
      titles: ['Championne du Maroc'],
      image: cldImg('visual-showcase/after_WhatsApp Image 2026-01-28 at 15.23.27 (5)', 'w_400,h_400,c_fill,g_auto,q_auto,f_auto'),
      healthTests: ['Patella: 0/0', 'Cardiaque: Normal', 'ADN: Clair'],
      breed: 'Spitz Nain',
      color: 'Cream Sable',
    },
    included: [
      'Carnet de vaccination à jour',
      'Puce électronique',
      'Certificat vétérinaire de bonne santé',
      'Kit de démarrage',
      'Suivi personnalisé à vie',
    ],
    slug: 'bella-spitz-nain-sable',
  },
];

export const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Comment préparer l\'arrivée de votre chiot',
    excerpt: 'Tout ce que vous devez savoir pour accueillir votre nouveau compagnon dans les meilleures conditions.',
    date: '2026-01-15',
    image: cldImg('visual-showcase/before_WhatsApp Image 2026-01-28 at 15.23.28', 'w_800,h_500,c_fill,g_auto,q_auto,f_auto'),
    slug: 'preparer-arrivee-chiot',
    category: 'Guides',
  },
  {
    id: '2',
    title: 'L\'importance des tests génétiques en élevage',
    excerpt: 'Découvrez pourquoi les tests génétiques sont essentiels pour la santé de votre futur compagnon.',
    date: '2026-01-08',
    image: cldImg('visual-showcase/after_WhatsApp Image 2026-01-28 at 16.50.15', 'w_800,h_500,c_fill,g_auto,q_auto,f_auto'),
    slug: 'importance-tests-genetiques',
    category: 'Santé',
  },
  {
    id: '3',
    title: 'Le Berger Australien : un compagnon pour les actifs',
    excerpt: 'Portrait complet de cette race exceptionnelle qui allie intelligence, beauté et dévouement.',
    date: '2025-12-20',
    image: cldImg('visual-showcase/before_WhatsApp Image 2026-01-28 at 17.06.36 (9)', 'w_800,h_500,c_fill,g_auto,q_auto,f_auto'),
    slug: 'berger-australien-portrait',
    category: 'Races',
  },
];

export const mockGalleryItems: GalleryItem[] = [
  { id: '1', image: cldImg('visual-showcase/after_WhatsApp Image 2026-01-28 at 17.25.03', 'w_800,q_auto,f_auto'), caption: 'Nos compagnons d\'exception — Vue d\'ensemble', category: 'champions' },
  { id: '2', image: cldImg('visual-showcase/after_WhatsApp Image 2026-01-28 at 17.06.36 (3)', 'w_800,q_auto,f_auto'), caption: 'Portrait en lumière naturelle', category: 'champions' },
  { id: '3', image: cldImg('visual-showcase/after_WhatsApp Image 2026-01-28 at 17.06.36 (5)', 'w_800,q_auto,f_auto'), caption: 'Séance photo — Pelage soyeux', category: 'champions' },
  { id: '4', image: cldImg('visual-showcase/after_WhatsApp Image 2026-01-28 at 17.06.36 (2)', 'w_800,q_auto,f_auto'), caption: 'Regard captivant', category: 'champions' },
  { id: '5', image: cldImg('visual-showcase/after_WhatsApp Image 2026-01-28 at 16.50.15', 'w_800,q_auto,f_auto'), caption: 'Moment de complicité', category: 'families' },
  { id: '6', image: cldImg('visual-showcase/after_WhatsApp Image 2026-01-28 at 15.23.27', 'w_800,q_auto,f_auto'), caption: 'Promenade au parc', category: 'community' },
  { id: '7', image: cldImg('visual-showcase/after_WhatsApp Image 2026-01-28 at 16.15.24 (1)', 'w_800,q_auto,f_auto'), caption: 'Nos installations — Espace de jeu', category: 'behind-scenes' },
  { id: '8', image: cldImg('visual-showcase/after_WhatsApp Image 2026-01-28 at 16.15.24', 'w_800,q_auto,f_auto'), caption: 'Espace détente en plein air', category: 'behind-scenes' },
  { id: '9', image: cldImg('visual-showcase/after_WhatsApp Image 2026-01-28 at 15.23.27 (7)', 'w_800,q_auto,f_auto'), caption: 'Socialisation des chiots', category: 'behind-scenes' },
  { id: '10', image: cldImg('visual-showcase/after_WhatsApp Image 2026-01-28 at 15.23.27 (3)', 'w_800,q_auto,f_auto'), caption: 'Fratrie inséparable', category: 'community' },
  { id: '11', image: cldImg('visual-showcase/after_WhatsApp Image 2026-01-28 at 15.23.27 (5)', 'w_800,q_auto,f_auto'), caption: 'Tendresse naturelle', category: 'families' },
  { id: '12', image: cldImg('visual-showcase/after_WhatsApp Image 2026-01-28 at 15.23.27 (1)', 'w_800,q_auto,f_auto'), caption: 'Compagnon fidèle', category: 'families' },
  { id: '13', image: cldImg('visual-showcase/before_WhatsApp Image 2026-01-28 at 17.06.36 (9)', 'w_800,q_auto,f_auto'), caption: 'Moment câlin — En coulisses', category: 'behind-scenes' },
  { id: '14', image: cldImg('visual-showcase/before_WhatsApp Image 2026-01-28 at 17.06.36 (13)', 'w_800,q_auto,f_auto'), caption: 'Les premiers pas', category: 'behind-scenes' },
  { id: '15', image: cldImg('visual-showcase/before_WhatsApp Image 2026-01-28 at 17.06.36', 'w_800,q_auto,f_auto'), caption: 'Regard doux', category: 'community' },
  { id: '16', image: cldImg('visual-showcase/before_WhatsApp Image 2026-01-28 at 17.06.36 (1)', 'w_800,q_auto,f_auto'), caption: 'Petit explorateur', category: 'community' },
  { id: '17', image: cldImg('visual-showcase/before_WhatsApp Image 2026-01-28 at 15.23.28', 'w_800,q_auto,f_auto'), caption: 'Jeux en plein air', category: 'behind-scenes' },
  { id: '18', image: cldImg('visual-showcase/before_WhatsApp Image 2026-01-28 at 15.23.28 (4)', 'w_800,q_auto,f_auto'), caption: 'Aventure au jardin', category: 'community' },
  { id: '19', image: cldImg('visual-showcase/before_WhatsApp Image 2026-01-28 at 15.23.28 (7)', 'w_800,q_auto,f_auto'), caption: 'Sieste bien méritée', category: 'families' },
  { id: '20', image: cldImg('visual-showcase/before_WhatsApp Image 2026-01-28 at 15.23.28 (1)', 'w_800,q_auto,f_auto'), caption: 'Regard attentif', category: 'champions' },
  { id: '21', image: cldImg('visual-showcase/before_WhatsApp Image 2026-01-28 at 15.23.28 (6)', 'w_800,q_auto,f_auto'), caption: 'Balade en nature', category: 'community' },
  { id: '22', image: cldImg('visual-showcase/before_WhatsApp Image 2026-01-28 at 15.23.28 (3)', 'w_800,q_auto,f_auto'), caption: 'Boule de poils', category: 'families' },
  { id: '23', image: cldImg('visual-showcase/before_WhatsApp Image 2026-01-28 at 15.23.27 (9)', 'w_800,q_auto,f_auto'), caption: 'Esprit joueur', category: 'behind-scenes' },
  { id: '24', image: cldImg('visual-showcase/before_WhatsApp Image 2026-01-28 at 15.23.28 (2)', 'w_800,q_auto,f_auto'), caption: 'Douceur incarnée', category: 'families' },
];

export const timelineEvents = [
  {
    year: '2010',
    title: 'Les Premiers Pas',
    description: 'Naissance de notre passion pour l\'élevage éthique avec l\'arrivée de notre premier Spitz Nain, une femelle qui a changé notre vie.',
  },
  {
    year: '2013',
    title: 'Premier Champion',
    description: 'Notre premier titre de Champion du Maroc, confirmant la qualité de notre programme d\'élevage.',
  },
  {
    year: '2016',
    title: 'L\'Aventure Berger Australien',
    description: 'Introduction de notre programme Berger Australien avec des lignées importées des meilleurs élevages européens.',
  },
  {
    year: '2019',
    title: 'Reconnaissance Internationale',
    description: 'Premier titre de Champion International et reconnaissance de notre élevage par la FCI.',
  },
  {
    year: '2022',
    title: 'Nouvelles Installations',
    description: 'Inauguration de nos nouvelles installations spacieuses, conçues pour le confort optimal de nos compagnons.',
  },
  {
    year: '2025',
    title: 'Pet\'s Club Maroc Aujourd\'hui',
    description: 'Plus de 200 familles heureuses, des dizaines de titres de champions, et toujours la même passion pour l\'élevage éthique et responsable.',
  },
];

export const socializationProgram = [
  { week: 'Semaine 1-2', title: 'Naissance & Premiers Soins', description: 'Suivi vétérinaire, pesée quotidienne, premiers contacts humains doux.' },
  { week: 'Semaine 3-4', title: 'Éveil Sensoriel', description: 'Stimulation tactile, sonore et visuelle. Premiers pas et exploration du nid.' },
  { week: 'Semaine 5-6', title: 'Socialisation Active', description: 'Interaction avec d\'autres chiens et humains. Introduction aux sons du quotidien.' },
  { week: 'Semaine 7-8', title: 'Apprentissages Fondamentaux', description: 'Propreté, premiers exercices d\'obéissance, habituation au harnais et au brossage.' },
  { week: 'Semaine 9-10', title: 'Préparation au Départ', description: 'Renforcement des acquis, visites vétérinaires finales, préparation du dossier de santé.' },
];
