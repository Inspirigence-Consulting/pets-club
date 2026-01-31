import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Communauté',
  description:
    "Rejoignez la communauté Pet's Club Maroc : blog, guides, newsletter et groupe WhatsApp pour les amoureux des chiens.",
  openGraph: {
    title: "Communauté | Pet's Club Maroc",
    description:
      "Ressources, actualités et une communauté passionnée pour accompagner votre aventure.",
  },
};

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
