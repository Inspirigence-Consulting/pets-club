import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    "Contactez Pet's Club Maroc pour réserver un chiot, planifier une visite ou poser vos questions. Réponse sous 24h.",
  openGraph: {
    title: "Contact | Pet's Club Maroc",
    description:
      "Une question, une demande de réservation ou envie de planifier une visite ? Nous sommes à votre écoute.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
