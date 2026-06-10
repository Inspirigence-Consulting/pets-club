import type { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import TrustBadges from '@/components/sections/TrustBadges';
import FeaturedPuppies from '@/components/sections/FeaturedPuppies';
import BreedShowcase from '@/components/sections/BreedShowcase';
import Differentiators from '@/components/sections/Differentiators';
import InstagramFeed from '@/components/sections/InstagramFeed';
import Newsletter from '@/components/sections/Newsletter';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBadges />
      <FeaturedPuppies />
      <BreedShowcase />
      <Differentiators />
      <InstagramFeed />
      <Newsletter />
    </>
  );
}
