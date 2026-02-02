import type { Metadata } from 'next';
import Script from 'next/script';
import { FAQ_ITEMS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Contact — Réserver un chiot Spitz Nain ou Berger Australien au Maroc',
  description:
    "Contactez Pet's Club Maroc par WhatsApp, email ou formulaire. Réservation de chiots, visite de l'élevage, appel vidéo. Réponse sous 24 h.",
  openGraph: {
    title: "Contactez-nous | Pet's Club Maroc",
    description:
      "Réservez un chiot, planifiez une visite ou posez vos questions. Nous répondons sous 24 h.",
  },
};

function FAQSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <Script
      id="faq-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <FAQSchema />
      {children}
    </>
  );
}
