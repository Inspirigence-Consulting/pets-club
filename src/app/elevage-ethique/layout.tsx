import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Élevage éthique de chiens au Maroc',
  description:
    "Notre philosophie d'élevage éthique : tests génétiques, socialisation de 10 semaines, suivi vétérinaire rigoureux et accompagnement à vie.",
  alternates: { canonical: '/elevage-ethique' },
  openGraph: {
    title: "Élevage Éthique | Pet's Club Maroc",
    description:
      "Le bien-être de nos compagnons n'est pas une option, c'est notre raison d'être.",
  },
};

export default function EthicalBreedingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
