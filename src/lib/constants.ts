export const SITE_NAME = "Pet's Club Maroc";
export const SITE_DESCRIPTION = "Éleveur de Spitz Nain (Pomeranian) et Berger Australien au Maroc — lignées championnes, suivi vétérinaire complet et accompagnement personnalisé à vie";
export const WHATSAPP_NUMBER = "+212653214751";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}`;
export const INSTAGRAM_URL = "https://www.instagram.com/thepetsclubmaroc/";
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
  { number: "200+", label: "Familles nous font confiance" },
  { number: "15+", label: "Ans de savoir-faire" },
  { number: "100%", label: "Chiots garantis en santé" },
  { number: "50+", label: "Titres de champions" },
] as const;

export const DIFFERENTIATORS = [
  {
    title: "Des lignées qui parlent d'elles-mêmes",
    description: "Nos reproducteurs portent des titres de champions internationaux. Chaque portée hérite d'un patrimoine génétique sélectionné pour la santé, la beauté et l'équilibre du tempérament.",
    icon: "trophy",
  },
  {
    title: "Un suivi vétérinaire sans compromis",
    description: "Vaccinations à jour, puce électronique, tests génétiques des parents et certificat de santé : chaque chiot quitte notre élevage avec un dossier médical complet.",
    icon: "heart",
  },
  {
    title: "10 semaines de socialisation",
    description: "Avant de rejoindre votre foyer, chaque chiot vit 10 semaines de stimulation, de jeux et de contacts humains. Résultat : un compagnon confiant et bien dans ses pattes.",
    icon: "users",
  },
  {
    title: "On reste là, même après l'adoption",
    description: "Questions sur la nutrition, le comportement, la santé ? Nous restons joignables par WhatsApp, par téléphone ou en personne — aussi longtemps que votre compagnon vivra.",
    icon: "shield",
  },
] as const;

export const BREEDS = {
  pomeranian: {
    name: "Spitz Nain",
    nameEn: "Pomeranian",
    slug: "pomeranian",
    tagline: "Une boule d'énergie au pelage de soie, un caractère bien trempé dans un format de poche.",
    description: "Ne vous fiez pas à sa petite taille : le Spitz Nain a le tempérament d'un grand chien. Joueur, fidèle et débordant d'affection, il s'adapte aussi bien à un appartement qu'à une maison avec jardin. Son pelage épais et son regard pétillant font le reste.",
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
    tagline: "Athlète, penseur, compagnon de vie — le Berger Australien ne fait jamais les choses à moitié.",
    description: "Si vous cherchez un chien qui vous suit partout — randonnée, course, canapé compris — le Berger Australien est fait pour vous. Vif d'esprit, athlétique et d'une loyauté rare, il tisse un lien profond avec sa famille. Sa beauté saisissante et ses yeux souvent vairons ne font qu'ajouter au tableau.",
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
    text: "Luna est arrivée chez nous à 10 semaines, propre, sociable et pleine de vie. On a senti dès le premier appel que l'équipe connaissait chaque chiot par son nom. Aujourd'hui encore, ils répondent à nos questions sur WhatsApp.",
    breed: "Spitz Nain",
    rating: 5,
  },
  {
    name: "Famille Benkirane",
    location: "Rabat",
    text: "Quand on a visité l'élevage, les chiens vivaient dans le salon, pas dans des cages. Ça a tout changé pour nous. Atlas est devenu le meilleur ami de nos enfants en moins d'une semaine.",
    breed: "Berger Australien",
    rating: 5,
  },
  {
    name: "Isabelle D.",
    location: "Marrakech",
    text: "C'est ma troisième adoption chez Pet's Club. À chaque fois, le même sérieux, le même carnet de santé complet, le même suivi après l'adoption. Je ne cherche plus ailleurs.",
    breed: "Spitz Nain",
    rating: 5,
  },
  {
    name: "Karim & Leila M.",
    location: "Tanger",
    text: "On nous a montré les résultats des tests génétiques des deux parents avant même qu'on pose la question. Ce niveau de transparence, on ne l'avait trouvé nulle part au Maroc.",
    breed: "Spitz Nain",
    rating: 5,
  },
  {
    name: "Famille Alaoui",
    location: "Fès",
    text: "De la première vidéo du chiot jusqu'au jour où on l'a récupéré, tout était cadré. Le kit de démarrage, le guide de nutrition, le rendez-vous vétérinaire déjà planifié. On s'est sentis accompagnés, pas livrés à nous-mêmes.",
    breed: "Berger Australien",
    rating: 5,
  },
] as const;

export const FAQ_ITEMS = [
  {
    question: "Comment se passe la réservation d'un chiot ?",
    answer: "Tout commence par un échange — par WhatsApp, téléphone ou email — pour comprendre votre mode de vie et vos attentes. Ensuite, nous organisons une visite de l'élevage ou un appel vidéo pour vous présenter les chiots. Si le courant passe des deux côtés, la réservation est confirmée avec un acompte. Nous choisissons autant nos familles que vous choisissez votre compagnon.",
  },
  {
    question: "Combien coûte un chiot Pet's Club Maroc ?",
    answer: "Le montant dépend de la race, de la lignée et du profil de chaque chiot. Plutôt que d'afficher un prix en ligne, nous préférons en discuter avec vous directement. Chaque chiot part avec son carnet de vaccination à jour, sa puce électronique, son certificat de santé, les résultats génétiques des parents et un kit de démarrage complet.",
  },
  {
    question: "Les chiots sont-ils vaccinés et pucés avant le départ ?",
    answer: "Oui, sans exception. Chaque chiot quitte notre élevage avec un carnet de vaccination à jour, une puce électronique enregistrée à votre nom, un certificat de santé délivré par notre vétérinaire partenaire et les résultats des tests génétiques de ses parents.",
  },
  {
    question: "Vous livrez en dehors du Maroc ?",
    answer: "Oui. Nous avons déjà accompagné des familles en Europe, dans le Golfe et en Amérique du Nord. Nous gérons les démarches administratives d'exportation et travaillons avec des transporteurs animaliers certifiés pour que le voyage se passe en toute sécurité.",
  },
  {
    question: "À quel âge un chiot peut-il quitter l'élevage ?",
    answer: "Jamais avant 10 semaines. Ces premières semaines avec la mère et la fratrie sont déterminantes pour le développement émotionnel et social du chiot. Un chiot bien socialisé dès le départ, c'est un compagnon plus serein et mieux adapté à la vie de famille.",
  },
  {
    question: "Que se passe-t-il après l'adoption ?",
    answer: "On ne vous laisse pas seul. Vous gardez un accès direct à notre équipe — par WhatsApp, téléphone ou en personne — pour toute question sur la nutrition, le comportement ou la santé. Pas de date d'expiration : cet accompagnement dure toute la vie de votre compagnon.",
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
