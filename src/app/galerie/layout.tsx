import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Galerie',
  description:
    "Galerie photos de Pet's Club Maroc : nos champions, familles heureuses, coulisses de l'élevage et moments de vie partagés.",
  openGraph: {
    title: "Galerie | Pet's Club Maroc",
    description:
      "Champions, familles heureuses et coulisses de notre élevage en images.",
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
