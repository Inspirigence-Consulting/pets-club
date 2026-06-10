import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Berger Australien à vendre au Maroc',
  description:
    "Le Berger Australien : intelligence, grâce et loyauté. Découvrez nos lignées Working Line et Beauty Line au Maroc.",
  alternates: { canonical: '/races/berger-australien' },
  openGraph: {
    title: "Berger Australien | Pet's Club Maroc",
    description:
      "Un compagnon athlétique et intelligent. Lignées sélectionnées pour le tempérament et la santé.",
  },
};

export default function AustralianShepherdLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
