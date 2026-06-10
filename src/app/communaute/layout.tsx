import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog et communauté, conseils chiens, guides et actualités',
  description:
    "Articles, guides pratiques et actualités pour les propriétaires de Spitz Nain et Berger Australien. Rejoignez la communauté Pet's Club Maroc sur WhatsApp et par newsletter.",
  alternates: { canonical: '/communaute' },
  openGraph: {
    title: "Blog & Communauté | Pet's Club Maroc",
    description:
      "Conseils d'élevage, guides pour nouveaux propriétaires et actualités de Pet's Club Maroc.",
  },
};

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
