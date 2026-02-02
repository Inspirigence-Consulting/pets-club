import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Marketplace - Annonces Chiots & Chiens au Maroc',
  description:
    'Trouvez votre compagnon sur la marketplace Pet\'s Club Maroc. Annonces vérifiées de chiots et chiens de qualité, vendus par des particuliers et éleveurs au Maroc.',
  openGraph: {
    title: "Marketplace | Pet's Club Maroc",
    description:
      "Annonces vérifiées de chiots et chiens de qualité au Maroc. Trouvez votre compagnon idéal.",
  },
};

export default function MarketplaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
