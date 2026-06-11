import type { Metadata } from 'next';
import EnCatalogue from '@/components/en/EnCatalogue';

export const metadata: Metadata = {
  title: 'Available Puppies | The Pets Club Morocco',
  description:
    'Browse available Pomeranian and Australian Shepherd puppies from champion bloodlines. Vaccinated, microchipped, with pedigree and health guarantee. Worldwide delivery.',
  alternates: {
    canonical: '/en/chiots',
    languages: { 'fr-MA': '/chiots', 'en': '/en/chiots' },
  },
};

export default function EnChiotsPage() {
  return <EnCatalogue />;
}
