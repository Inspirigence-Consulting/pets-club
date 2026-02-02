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
    description: 'Luna a le pelage orange sable des plus belles lignées Teddy Bear : dense, soyeux, avec ce visage rond qui fait craquer tout le monde. Elle a grandi avec ses frères et sœurs, elle est propre et habituée aux bruits du quotidien. Elle est prête.',
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
    description: 'Atlas a la robe Blue Merle marbrée d\'argent et les yeux vairons qui font la signature du Berger Australien. Vif, curieux et déjà très réceptif aux commandes de base. Il conviendra parfaitement à une famille active qui aime bouger.',
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
    description: 'Caramel est un mâle crème au tempérament doux et joueur. Il adore les câlins autant que les sessions de jeu. Déjà réservé par une famille de Rabat.',
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
    description: 'Sierra est une femelle Red Tri issue de notre lignée Working. Née le 10 janvier, elle est en plein programme de socialisation et sera disponible à partir de mi-mars.',
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
    description: 'Milo a rejoint sa famille à Rabat. Ce mâle Black & Tan de lignée Teddy Bear s\'est adapté dès le premier jour — sa famille nous envoie encore des photos régulièrement.',
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
    description: 'Nala vit aujourd\'hui à Marrakech. Black Tri de lignée Beauty, elle combine une morphologie conforme au standard et un caractère affectueux qui a séduit sa famille dès la première rencontre.',
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
    description: 'Simba est un mâle orange vif, joyeux et plein d\'énergie. Lignée Standard, il a le port fier et le regard vif qui caractérisent les meilleurs Spitz Nain. Disponible dès maintenant.',
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
    description: 'Koda est un mâle Red Merle aux yeux cuivrés, issu de notre lignée Working. Déjà très réceptif aux exercices d\'obéissance, il sera parfait pour une famille sportive ou passionnée d\'agility.',
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
    description: 'Bella vit à Casablanca depuis l\'été dernier. Sable de lignée Teddy Bear, elle a conquis sa famille avec sa joie de vivre contagieuse et son tempérament câlin.',
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
    title: 'Checklist : tout préparer avant l\'arrivée de votre chiot',
    excerpt: 'Gamelles, couchage, clôtures, premier rendez-vous vétérinaire — la liste complète pour ne rien oublier le jour J.',
    date: '2026-01-15',
    image: cldImg('visual-showcase/before_WhatsApp Image 2026-01-28 at 15.23.28', 'w_800,h_500,c_fill,g_auto,q_auto,f_auto'),
    slug: 'preparer-arrivee-chiot',
    category: 'Guides',
  },
  {
    id: '2',
    title: 'Tests génétiques : pourquoi ils changent tout pour la santé de votre chiot',
    excerpt: 'Patella, MDR1, dysplasie — ce que ces tests révèlent et pourquoi un éleveur sérieux ne s\'en passe pas.',
    date: '2026-01-08',
    image: cldImg('visual-showcase/after_WhatsApp Image 2026-01-28 at 16.50.15', 'w_800,h_500,c_fill,g_auto,q_auto,f_auto'),
    slug: 'importance-tests-genetiques',
    category: 'Santé',
  },
  {
    id: '3',
    title: 'Le Berger Australien est-il fait pour vous ? Guide honnête',
    excerpt: 'Intelligent et beau, oui. Mais aussi exigeant en exercice et en stimulation. Voici ce qu\'il faut savoir avant de craquer.',
    date: '2025-12-20',
    image: cldImg('visual-showcase/before_WhatsApp Image 2026-01-28 at 17.06.36 (9)', 'w_800,h_500,c_fill,g_auto,q_auto,f_auto'),
    slug: 'berger-australien-portrait',
    category: 'Races',
  },
];

export const mockGalleryItems: GalleryItem[] = [
  { id: '1', image: cldImg('visual-showcase/after_WhatsApp Image 2026-01-28 at 17.25.03', 'w_800,q_auto,f_auto'), caption: 'Nos compagnons d\'exception - Vue d\'ensemble', category: 'champions' },
  { id: '2', image: cldImg('visual-showcase/after_WhatsApp Image 2026-01-28 at 17.06.36 (3)', 'w_800,q_auto,f_auto'), caption: 'Portrait en lumière naturelle', category: 'champions' },
  { id: '3', image: cldImg('visual-showcase/after_WhatsApp Image 2026-01-28 at 17.06.36 (5)', 'w_800,q_auto,f_auto'), caption: 'Séance photo - Pelage soyeux', category: 'champions' },
  { id: '4', image: cldImg('visual-showcase/after_WhatsApp Image 2026-01-28 at 17.06.36 (2)', 'w_800,q_auto,f_auto'), caption: 'Regard captivant', category: 'champions' },
  { id: '5', image: cldImg('visual-showcase/after_WhatsApp Image 2026-01-28 at 16.50.15', 'w_800,q_auto,f_auto'), caption: 'Moment de complicité', category: 'families' },
  { id: '6', image: cldImg('visual-showcase/after_WhatsApp Image 2026-01-28 at 15.23.27', 'w_800,q_auto,f_auto'), caption: 'Promenade au parc', category: 'community' },
  { id: '7', image: cldImg('visual-showcase/after_WhatsApp Image 2026-01-28 at 16.15.24 (1)', 'w_800,q_auto,f_auto'), caption: 'Nos installations - Espace de jeu', category: 'behind-scenes' },
  { id: '8', image: cldImg('visual-showcase/after_WhatsApp Image 2026-01-28 at 16.15.24', 'w_800,q_auto,f_auto'), caption: 'Espace détente en plein air', category: 'behind-scenes' },
  { id: '9', image: cldImg('visual-showcase/after_WhatsApp Image 2026-01-28 at 15.23.27 (7)', 'w_800,q_auto,f_auto'), caption: 'Socialisation des chiots', category: 'behind-scenes' },
  { id: '10', image: cldImg('visual-showcase/after_WhatsApp Image 2026-01-28 at 15.23.27 (3)', 'w_800,q_auto,f_auto'), caption: 'Fratrie inséparable', category: 'community' },
  { id: '11', image: cldImg('visual-showcase/after_WhatsApp Image 2026-01-28 at 15.23.27 (5)', 'w_800,q_auto,f_auto'), caption: 'Tendresse naturelle', category: 'families' },
  { id: '12', image: cldImg('visual-showcase/after_WhatsApp Image 2026-01-28 at 15.23.27 (1)', 'w_800,q_auto,f_auto'), caption: 'Compagnon fidèle', category: 'families' },
  { id: '13', image: cldImg('visual-showcase/before_WhatsApp Image 2026-01-28 at 17.06.36 (9)', 'w_800,q_auto,f_auto'), caption: 'Moment câlin - En coulisses', category: 'behind-scenes' },
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
    title: 'Un premier Spitz Nain',
    description: 'Notre première femelle Spitz Nain rejoint la famille. Ce qui était un coup de cœur devient rapidement un projet de vie.',
  },
  {
    year: '2013',
    title: 'Premier titre de Champion du Maroc',
    description: 'L\'un de nos Spitz Nain décroche le titre de Champion du Maroc — la confirmation que notre approche fonctionne.',
  },
  {
    year: '2016',
    title: 'Le Berger Australien entre dans l\'élevage',
    description: 'Nous importons nos premières lignées de Berger Australien depuis des élevages européens reconnus.',
  },
  {
    year: '2019',
    title: 'Premier Champion International',
    description: 'L\'un de nos reproducteurs obtient le titre de Champion International. Notre élevage est reconnu par la FCI.',
  },
  {
    year: '2022',
    title: 'De nouvelles installations',
    description: 'Nous inaugurons un espace plus grand, pensé pour le confort des chiens et la socialisation des chiots.',
  },
  {
    year: '2025',
    title: 'Plus de 200 familles accompagnées',
    description: 'Des dizaines de titres de champions, 200 familles dans notre communauté, et toujours la même exigence qu\'au premier jour.',
  },
];

export const socializationProgram = [
  { week: 'Semaine 1-2', title: 'Naissance et premiers soins', description: 'Pesée quotidienne, suivi vétérinaire, maintien au chaud. Les chiots restent avec leur mère 24 h/24. Contact humain doux et limité.' },
  { week: 'Semaine 3-4', title: 'Éveil des sens', description: 'Les chiots commencent à entendre et à voir. Nous introduisons des textures variées, des sons doux et des manipulations régulières pour stimuler leur développement.' },
  { week: 'Semaine 5-6', title: 'Premiers contacts sociaux', description: 'Interactions avec d\'autres chiens adultes et avec différents membres de l\'équipe. Les chiots découvrent les bruits de la maison : aspirateur, sonnette, musique.' },
  { week: 'Semaine 7-8', title: 'Les bases du quotidien', description: 'Apprentissage de la propreté, habituation au harnais et au brossage, premiers exercices de rappel. Le chiot commence à construire sa confiance.' },
  { week: 'Semaine 9-10', title: 'Prêt pour la famille', description: 'Renforcement de tous les acquis, dernier bilan vétérinaire, constitution du dossier de santé complet. Le chiot est prêt à partir sereinement.' },
];
