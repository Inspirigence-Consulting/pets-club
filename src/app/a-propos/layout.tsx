import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'À Propos',
  description:
    "Découvrez l'histoire de Pet's Club Maroc, éleveur passionné de Spitz Nain et Berger Australien au Maroc depuis plus de 15 ans.",
  openGraph: {
    title: "À Propos | Pet's Club Maroc",
    description:
      "Notre passion, notre histoire, notre engagement pour l'élevage éthique de compagnons d'exception.",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
