import { CATALOGUE } from './cloudinary';

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

/** Everything that ships with every Pet's Club puppy (from the cattery's own list). */
const INCLUDED = [
  'Lignée championne importée',
  'Vaccins à jour et vermifuge',
  'Puce électronique enregistrée',
  'Pedigree et passeport vétérinaire',
  'Contrat de vente et garantie santé',
  'Appel vidéo en direct avant toute décision',
  'Suivi et accompagnement à vie',
];

const POM_SIRE: ParentDog = {
  name: 'Étalon Spitz Nain importé',
  titles: [],
  image: CATALOGUE.pomMaleOrange,
  healthTests: [],
  breed: 'Spitz Nain',
  color: 'Orange',
};

const POM_DAM: ParentDog = {
  name: 'Femelle Spitz Nain importée',
  titles: [],
  image: CATALOGUE.pomFemelleOrange,
  healthTests: [],
  breed: 'Spitz Nain',
  color: 'Orange micro',
};

const AUSSIE_SIRE: ParentDog = {
  name: 'Étalon Berger Australien pedigree',
  titles: [],
  image: CATALOGUE.aussieMerle,
  healthTests: [],
  breed: 'Berger Australien',
  color: 'Bleu merle',
};

const AUSSIE_DAM: ParentDog = {
  name: 'Femelle Berger Australien pedigree',
  titles: [],
  image: CATALOGUE.aussieTricolore,
  healthTests: [],
  breed: 'Berger Australien',
  color: 'Black tricolore',
};

export const mockPuppies: Puppy[] = [
  {
    id: '1',
    name: 'Phénix',
    breed: 'pomeranian',
    breedLabel: 'Spitz Nain',
    gender: 'male',
    dob: '2026-03-10',
    color: 'Orange',
    line: 'Lignée importée',
    status: 'available',
    image: CATALOGUE.pomMaleOrange,
    images: [CATALOGUE.pomMaleOrange],
    description:
      "Phénix a la robe orange dense et le visage rond des plus belles lignées Spitz Nain. Il a grandi entouré de sa mère et de sa fratrie, il est propre et habitué aux bruits du quotidien. Vacciné, pucé, pedigree en main, il est prêt à rejoindre sa famille.",
    father: POM_SIRE,
    mother: POM_DAM,
    included: INCLUDED,
    slug: 'spitz-nain-male-orange',
  },
  {
    id: '2',
    name: 'Clémentine',
    breed: 'pomeranian',
    breedLabel: 'Spitz Nain',
    gender: 'female',
    dob: '2026-03-10',
    color: 'Orange micro',
    line: 'Format micro',
    status: 'available',
    image: CATALOGUE.pomFemelleOrange,
    images: [CATALOGUE.pomFemelleOrange],
    description:
      "Clémentine est une femelle orange au format micro, le gabarit le plus recherché du Spitz Nain. Tempérament doux, déjà sociable et pleine de vie. Elle part avec son carnet de santé complet et son pedigree.",
    father: POM_SIRE,
    mother: POM_DAM,
    included: INCLUDED,
    slug: 'spitz-nain-femelle-orange-micro',
  },
  {
    id: '3',
    name: 'Olympe',
    breed: 'pomeranian',
    breedLabel: 'Spitz Nain',
    gender: 'female',
    dob: '2024-05-01',
    color: 'Noir & blanc',
    line: 'Micro adulte',
    status: 'available',
    image: CATALOGUE.pomFemelleNoirBlanc,
    images: [CATALOGUE.pomFemelleNoirBlanc],
    description:
      "Olympe est une femelle micro adulte noir et blanc, sous la barre des 1,5 kg. Une couleur rare et un format de poche, idéale pour qui cherche une compagne déjà formée et facile à vivre. Pedigree et garantie santé inclus.",
    father: POM_SIRE,
    mother: POM_DAM,
    included: INCLUDED,
    slug: 'spitz-nain-femelle-noir-blanc-micro',
  },
  {
    id: '4',
    name: 'Néo',
    breed: 'berger-australien',
    breedLabel: 'Berger Australien',
    gender: 'male',
    dob: '2026-03-10',
    color: 'Black tricolore, yeux verts',
    line: 'Pedigree',
    status: 'available',
    image: CATALOGUE.aussieTricolore,
    images: [CATALOGUE.aussieTricolore],
    description:
      "Néo est un mâle Berger Australien black tricolore aux yeux verts, avec pedigree. Vif, curieux et déjà très réceptif aux premières commandes. Il conviendra parfaitement à une famille active qui aime bouger et apprendre avec son chien.",
    father: AUSSIE_SIRE,
    mother: AUSSIE_DAM,
    included: INCLUDED,
    slug: 'berger-australien-male-tricolore',
  },
  {
    id: '5',
    name: 'Saphir',
    breed: 'berger-australien',
    breedLabel: 'Berger Australien',
    gender: 'male',
    dob: '2026-03-10',
    color: 'Bleu merle tan, yeux bleus',
    line: 'Pièce unique',
    status: 'available',
    image: CATALOGUE.aussieMerle,
    images: [CATALOGUE.aussieMerle],
    description:
      "Saphir est un mâle bleu merle tan aux yeux bleus, avec pedigree. Une robe marbrée d'argent et un regard saisissant qui en font une véritable pièce unique. Athlétique et intelligent, il s'épanouira auprès d'une famille sportive.",
    father: AUSSIE_SIRE,
    mother: AUSSIE_DAM,
    included: INCLUDED,
    slug: 'berger-australien-male-bleu-merle',
  },
  {
    id: '6',
    name: 'Portée Blanche',
    breed: 'pomeranian',
    breedLabel: 'Spitz Nain',
    gender: 'female',
    dob: '2026-05-15',
    color: 'Blanc',
    line: 'Format micro',
    status: 'coming',
    image: CATALOGUE.pomBlancsPortee,
    images: [CATALOGUE.pomBlancsPortee],
    description:
      "Notre portée blanche micro arrive bientôt. Le blanc est la couleur la plus rare et la plus demandée chez le Spitz Nain. Les réservations sont déjà ouvertes pour les familles qui veulent en accueillir un.",
    father: POM_SIRE,
    mother: POM_DAM,
    included: INCLUDED,
    slug: 'spitz-nain-portee-blanche',
  },
];

export const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: "Checklist : tout préparer avant l'arrivée de votre chiot",
    excerpt:
      "Gamelles, couchage, espace sécurisé, premier rendez-vous vétérinaire. La liste complète pour ne rien oublier le jour J.",
    date: '2026-01-15',
    image: CATALOGUE.pomMaleOrange,
    slug: 'preparer-arrivee-chiot',
    category: 'Guides',
  },
  {
    id: '2',
    title: 'Tests génétiques : pourquoi ils changent tout pour la santé de votre chiot',
    excerpt:
      "Patella, MDR1, dysplasie : ce que ces tests révèlent et pourquoi un éleveur sérieux ne s'en passe pas.",
    date: '2026-01-08',
    image: CATALOGUE.aussieTricolore,
    slug: 'importance-tests-genetiques',
    category: 'Santé',
  },
  {
    id: '3',
    title: 'Le Berger Australien est-il fait pour vous ? Guide honnête',
    excerpt:
      "Intelligent et beau, oui. Mais aussi exigeant en exercice et en stimulation. Voici ce qu'il faut savoir avant de craquer.",
    date: '2025-12-20',
    image: CATALOGUE.aussieMerle,
    slug: 'berger-australien-portrait',
    category: 'Races',
  },
];

export const mockGalleryItems: GalleryItem[] = [
  { id: '1', image: CATALOGUE.aussieMerle, caption: 'Berger Australien bleu merle, yeux bleus', category: 'champions' },
  { id: '2', image: CATALOGUE.pomMaleOrange, caption: 'Spitz Nain orange, mâle', category: 'champions' },
  { id: '3', image: CATALOGUE.aussieTricolore, caption: 'Berger Australien black tricolore, yeux verts', category: 'champions' },
  { id: '4', image: CATALOGUE.pomFemelleOrange, caption: 'Femelle orange, format micro', category: 'champions' },
  { id: '5', image: CATALOGUE.pomFemelleNoirBlanc, caption: 'Spitz Nain noir et blanc, micro adulte', category: 'families' },
  { id: '6', image: CATALOGUE.pomBlancsPortee, caption: 'Portée blanche, bientôt disponible', category: 'community' },
  { id: '7', image: CATALOGUE.pomMaleOrange, caption: 'Pelage orange dense et soyeux', category: 'behind-scenes' },
  { id: '8', image: CATALOGUE.aussieTricolore, caption: 'Socialisation au quotidien', category: 'behind-scenes' },
  { id: '9', image: CATALOGUE.pomFemelleOrange, caption: 'Tendresse naturelle', category: 'families' },
  { id: '10', image: CATALOGUE.aussieMerle, caption: 'Regard captivant du merle', category: 'community' },
  { id: '11', image: CATALOGUE.pomFemelleNoirBlanc, caption: 'Boule de poils noir et blanc', category: 'families' },
  { id: '12', image: CATALOGUE.aussieTricolore, caption: 'Compagnon fidèle et athlétique', category: 'community' },
];

export const timelineEvents = [
  {
    year: '2010',
    title: 'Un premier Spitz Nain',
    description:
      "Notre première femelle Spitz Nain rejoint la famille. Ce qui était un coup de cœur devient rapidement un projet de vie.",
  },
  {
    year: '2013',
    title: 'Premier titre de Champion du Maroc',
    description:
      "L'un de nos Spitz Nain décroche le titre de Champion du Maroc, la confirmation que notre approche fonctionne.",
  },
  {
    year: '2016',
    title: "Le Berger Australien entre dans l'élevage",
    description:
      'Nous importons nos premières lignées de Berger Australien depuis des élevages européens reconnus.',
  },
  {
    year: '2019',
    title: 'Premier Champion International',
    description:
      "L'un de nos reproducteurs obtient le titre de Champion International. Notre élevage est reconnu par la FCI.",
  },
  {
    year: '2022',
    title: 'De nouvelles installations',
    description:
      'Nous inaugurons un espace plus grand, pensé pour le confort des chiens et la socialisation des chiots.',
  },
  {
    year: '2025',
    title: 'Plus de 200 familles accompagnées',
    description:
      "Des titres de champions, 200 familles dans notre communauté, et toujours la même exigence qu'au premier jour.",
  },
];

export const socializationProgram = [
  { week: 'Semaine 1-2', title: 'Naissance et premiers soins', description: 'Pesée quotidienne, suivi vétérinaire, maintien au chaud. Les chiots restent avec leur mère 24 h/24. Contact humain doux et limité.' },
  { week: 'Semaine 3-4', title: 'Éveil des sens', description: 'Les chiots commencent à entendre et à voir. Nous introduisons des textures variées, des sons doux et des manipulations régulières pour stimuler leur développement.' },
  { week: 'Semaine 5-6', title: 'Premiers contacts sociaux', description: "Interactions avec d'autres chiens adultes et avec différents membres de l'équipe. Les chiots découvrent les bruits de la maison : aspirateur, sonnette, musique." },
  { week: 'Semaine 7-8', title: 'Les bases du quotidien', description: "Apprentissage de la propreté, habituation au harnais et au brossage, premiers exercices de rappel. Le chiot commence à construire sa confiance." },
  { week: 'Semaine 9-10', title: 'Prêt pour la famille', description: 'Renforcement de tous les acquis, dernier bilan vétérinaire, constitution du dossier de santé complet. Le chiot est prêt à partir sereinement.' },
];
