import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'À propos, notre histoire d\'éleveur au Maroc depuis 2010',
  description:
    "Pet's Club Maroc, éleveur de Spitz Nain et Berger Australien depuis plus de 15 ans. Découvrez notre parcours, notre équipe et notre engagement pour un élevage familial et responsable.",
  alternates: { canonical: '/a-propos' },
  openGraph: {
    title: "Notre Histoire | Pet's Club Maroc",
    description:
      "De notre premier Spitz Nain en 2010 à plus de 200 familles accompagnées. Découvrez le parcours de Pet's Club Maroc.",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
