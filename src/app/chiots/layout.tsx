import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nos Chiots',
  description:
    "Découvrez nos chiots Spitz Nain et Berger Australien disponibles. Tous issus de lignées championnes, élevés en famille avec amour.",
  openGraph: {
    title: "Nos Chiots | Pet's Club Maroc",
    description:
      "Des compagnons d'exception, élevés avec amour. Découvrez nos chiots disponibles.",
  },
};

export default function PuppiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
