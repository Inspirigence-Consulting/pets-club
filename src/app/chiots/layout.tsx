import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chiots Spitz Nain & Berger Australien à vendre au Maroc',
  description:
    "Chiots Spitz Nain (Pomeranian) et Berger Australien disponibles au Maroc. Lignées championnes, socialisés 10 semaines, vaccinés et pucés. Consultez nos chiots et réservez.",
  alternates: { canonical: '/chiots' },
  openGraph: {
    title: "Chiots disponibles | Pet's Club Maroc",
    description:
      "Spitz Nain et Berger Australien de lignées championnes. Chiots socialisés, vaccinés, avec suivi à vie.",
  },
};

export default function PuppiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
