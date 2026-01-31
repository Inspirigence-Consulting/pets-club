import Hero from '@/components/sections/Hero';
import TrustBadges from '@/components/sections/TrustBadges';
import FeaturedPuppies from '@/components/sections/FeaturedPuppies';
import BreedShowcase from '@/components/sections/BreedShowcase';
import Differentiators from '@/components/sections/Differentiators';
import Testimonials from '@/components/sections/Testimonials';
import InstagramFeed from '@/components/sections/InstagramFeed';
import Newsletter from '@/components/sections/Newsletter';

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBadges />
      <FeaturedPuppies />
      <BreedShowcase />
      <Differentiators />
      <Testimonials />
      <InstagramFeed />
      <Newsletter />
    </>
  );
}
