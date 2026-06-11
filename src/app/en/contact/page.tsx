import type { Metadata } from 'next';
import EnContact from '@/components/en/EnContact';

export const metadata: Metadata = {
  title: 'Contact | The Pets Club Morocco',
  description:
    'Contact The Pets Club Morocco about a Pomeranian or Australian Shepherd puppy. Reservation, cattery visit, video call. We reply within 24 hours.',
  alternates: {
    canonical: '/en/contact',
    languages: { 'fr-MA': '/contact', 'en': '/en/contact' },
  },
};

export default async function EnContactPage({
  searchParams,
}: {
  searchParams: Promise<{ puppy?: string }>;
}) {
  const { puppy } = await searchParams;
  return <EnContact puppy={puppy} />;
}
