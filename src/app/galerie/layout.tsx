import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Galerie — Photos de nos Spitz Nain, Bergers Australiens et familles',
  description:
    "Découvrez en photos nos chiots Spitz Nain et Berger Australien, nos champions titrés, les familles qui nous font confiance et les coulisses de l'élevage Pet's Club Maroc.",
  openGraph: {
    title: "Galerie photos | Pet's Club Maroc",
    description:
      "Nos chiots, nos champions et nos familles en images. Découvrez les coulisses de Pet's Club Maroc.",
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
