export const SITE_NAME = "Pet's Club Maroc";
export const SITE_DESCRIPTION = "Élevage premium et éthique de Spitz Nain (Pomeranian) et Berger Australien au Maroc";
export const WHATSAPP_NUMBER = "+212653214751";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}`;
export const INSTAGRAM_URL = "https://instagram.com/thepetsclubmaroc";
export const FACEBOOK_URL = "https://facebook.com/thepetsclubmaroc";

export interface NavLink {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

export const NAV_LINKS: NavLink[] = [
  { label: "Accueil", href: "/" },
  { label: "Notre Histoire", href: "/a-propos" },
  { label: "Élevage Éthique", href: "/elevage-ethique" },
  {
    label: "Nos Races",
    href: "#",
    children: [
      { label: "Spitz Nain (Pomeranian)", href: "/races/pomeranian" },
      { label: "Berger Australien", href: "/races/berger-australien" },
    ],
  },
  { label: "Nos Chiots", href: "/chiots" },
  { label: "Galerie", href: "/galerie" },
  { label: "Communauté", href: "/communaute" },
  { label: "Contact", href: "/contact" },
];

export const TRUST_BADGES = [
  { number: "200+", label: "Familles heureuses" },
  { number: "15+", label: "Années d'expérience" },
  { number: "100%", label: "Garantie santé" },
  { number: "50+", label: "Champions en lignée" },
] as const;

export const DIFFERENTIATORS = [
  {
    title: "Lignées Champions",
    description: "Nos reproducteurs sont issus de lignées championnes internationales, garantissant beauté et tempérament d'exception.",
    icon: "trophy",
  },
  {
    title: "Suivi Vétérinaire",
    description: "Chaque chiot bénéficie d'un suivi vétérinaire complet, vaccinations, puces et tests génétiques.",
    icon: "heart",
  },
  {
    title: "Socialisation Premium",
    description: "Programme de socialisation de 10 semaines pour un compagnon équilibré et bien adapté à sa nouvelle famille.",
    icon: "users",
  },
  {
    title: "Accompagnement à Vie",
    description: "Notre relation ne s'arrête pas à l'adoption. Nous restons disponibles pour vous guider tout au long de la vie de votre compagnon.",
    icon: "shield",
  },
] as const;

export const BREEDS = {
  pomeranian: {
    name: "Spitz Nain",
    nameEn: "Pomeranian",
    slug: "pomeranian",
    tagline: "Le Spitz Nain, c'est l'élégance dans un format compact...",
    description: "Petit par la taille, immense par le caractère. Le Spitz Nain séduit par son pelage soyeux, son regard vif et son attachement inconditionnel à sa famille.",
    bloodlines: ["Teddy Bear", "Standard"],
    characteristics: [
      { label: "Poids", value: "1.8 - 3.5 kg" },
      { label: "Espérance de vie", value: "12 - 16 ans" },
      { label: "Tempérament", value: "Vif, Affectueux, Loyal" },
      { label: "Entretien", value: "Brossage régulier" },
    ],
  },
  australianShepherd: {
    name: "Berger Australien",
    nameEn: "Australian Shepherd",
    slug: "berger-australien",
    tagline: "Le Berger Australien incarne l'intelligence, la grâce et la loyauté...",
    description: "Athlétique, intelligent et d'une beauté saisissante, le Berger Australien est le compagnon idéal pour les familles actives qui recherchent un lien profond avec leur animal.",
    bloodlines: ["Working Line", "Beauty Line"],
    characteristics: [
      { label: "Poids", value: "18 - 30 kg" },
      { label: "Espérance de vie", value: "12 - 15 ans" },
      { label: "Tempérament", value: "Intelligent, Énergique, Dévoué" },
      { label: "Entretien", value: "Exercice quotidien" },
    ],
  },
} as const;

export const TESTIMONIALS = [
  {
    name: "Sophie & Marc L.",
    location: "Casablanca",
    text: "Notre petit Luna est arrivée parfaitement socialisée et en pleine santé. L'accompagnement de Pet's Club Maroc a été exceptionnel du premier contact jusqu'à aujourd'hui.",
    breed: "Spitz Nain",
    rating: 5,
  },
  {
    name: "Famille Benkirane",
    location: "Rabat",
    text: "Atlas, notre Berger Australien, fait le bonheur de toute la famille. Le professionnalisme et l'éthique de l'élevage nous ont convaincus dès la première visite.",
    breed: "Berger Australien",
    rating: 5,
  },
  {
    name: "Isabelle D.",
    location: "Marrakech",
    text: "Troisième adoption chez Pet's Club et toujours la même qualité, le même amour. Ils sont véritablement passionnés par le bien-être de chaque compagnon.",
    breed: "Spitz Nain",
    rating: 5,
  },
  {
    name: "Karim & Leila M.",
    location: "Tanger",
    text: "Nous avons été impressionnés par le suivi vétérinaire impeccable et la transparence totale. Notre Pomeranian est un vrai petit prince, en parfaite santé.",
    breed: "Spitz Nain",
    rating: 5,
  },
  {
    name: "Famille Alaoui",
    location: "Fès",
    text: "Le processus d'adoption a été fluide et rassurant. L'équipe nous a guidés à chaque étape, de la réservation jusqu'à l'intégration à la maison. Un service 5 étoiles.",
    breed: "Berger Australien",
    rating: 5,
  },
] as const;

export const FAQ_ITEMS = [
  {
    question: "Comment réserver un chiot ?",
    answer: "La réservation se fait en plusieurs étapes : contactez-nous pour discuter de vos attentes, planifiez une visite ou un appel vidéo, puis confirmez votre réservation. Nous prenons le temps de nous assurer que chaque compagnon rejoint la famille idéale.",
  },
  {
    question: "Quel est l'investissement pour accueillir un compagnon ?",
    answer: "L'investissement varie selon la race, la lignée et le potentiel de chaque chiot. Nous vous invitons à nous contacter directement pour une discussion personnalisée. Chaque compagnon part avec un dossier santé complet, ses vaccinations, sa puce électronique et un kit de démarrage.",
  },
  {
    question: "Les chiots sont-ils vaccinés et pucés ?",
    answer: "Absolument. Chaque chiot quitte notre élevage avec un carnet de vaccination à jour, une puce électronique enregistrée, un certificat de santé vétérinaire et les résultats des tests génétiques des parents.",
  },
  {
    question: "Proposez-vous la livraison à l'étranger ?",
    answer: "Oui, nous accompagnons les familles internationales dans toutes les démarches d'exportation. Nous travaillons avec des transporteurs animaliers certifiés pour garantir un voyage sûr et confortable pour votre compagnon.",
  },
  {
    question: "À quel âge les chiots peuvent-ils rejoindre leur famille ?",
    answer: "Nos chiots restent avec leur mère et leurs frères et sœurs pendant 10 semaines minimum. Cette période est essentielle pour leur développement émotionnel et leur socialisation. C'est notre engagement pour le bien-être de chaque compagnon.",
  },
  {
    question: "Comment se passe le suivi après adoption ?",
    answer: "Notre relation ne s'arrête jamais. Vous bénéficiez d'un accompagnement personnalisé à vie : conseils nutrition, comportement, santé. Nous restons disponibles par WhatsApp, téléphone ou en personne.",
  },
] as const;

export const PUPPY_STATUSES: Record<string, { label: string; class: string }> = {
  available: { label: "Disponible", class: "badge-available" },
  reserved: { label: "Réservé", class: "badge-reserved" },
  coming: { label: "Bientôt disponible", class: "badge-coming" },
  sold: { label: "Vendu", class: "badge-sold" },
  adopted: { label: "Adopté", class: "badge-luxury" },
};

export const FORM_SUBJECTS = [
  { value: "general", label: "Renseignement général" },
  { value: "reserve", label: "Réserver un compagnon" },
  { value: "visit", label: "Planifier une visite" },
  { value: "video-call", label: "Planifier un appel vidéo" },
  { value: "waiting-list", label: "Rejoindre la liste d'attente" },
] as const;
