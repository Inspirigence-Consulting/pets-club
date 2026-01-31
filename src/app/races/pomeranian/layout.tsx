import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Spitz Nain (Pomeranian)',
  description:
    "Le Spitz Nain : petit format, grand caractère. Découvrez nos lignées Teddy Bear et Standard de Pomeranian au Maroc.",
  openGraph: {
    title: "Spitz Nain | Pet's Club Maroc",
    description:
      "L'élégance dans un format compact. Lignées Teddy Bear & Standard sélectionnées avec soin.",
  },
};

export default function PomeranianLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
