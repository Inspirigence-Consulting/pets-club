import type { Metadata } from 'next';
import EnLanding from '@/components/en/EnLanding';

export const metadata: Metadata = {
  title: 'The Pets Club Morocco | Pomeranian & Australian Shepherd Breeder',
  description:
    'Pomeranian and Australian Shepherd puppies from champion bloodlines, raised in the family in Morocco. Genetic testing, full health record, lifetime support and worldwide delivery.',
  alternates: {
    canonical: '/en',
    languages: { 'fr-MA': '/', 'en': '/en' },
  },
  openGraph: {
    title: 'The Pets Club Morocco | Pomeranian & Australian Shepherd Breeder',
    description:
      'Champion-line Pomeranian and Australian Shepherd puppies, raised in the family in Morocco. Health-tested, guaranteed, lifetime support. Worldwide delivery.',
    type: 'website',
    locale: 'en',
    siteName: "Pet's Club Morocco",
    url: 'https://thepetsclub.ma/en',
  },
};

export default function EnHomePage() {
  return <EnLanding />;
}
