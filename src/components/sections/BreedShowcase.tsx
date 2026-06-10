'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { BREEDS } from '@/lib/constants';

const breeds = [
  {
    ...BREEDS.pomeranian,
    href: '/races/pomeranian',
    image: '/images/insta/ig_08.webp',
    fallbackColor: '#d4bc7c',
    stats: [
      { label: 'Poids', value: '1.8-3.5 kg' },
      { label: 'Vie', value: '12-16 ans' },
    ],
  },
  {
    ...BREEDS.australianShepherd,
    href: '/races/berger-australien',
    image: '/images/insta/ig_12.webp',
    fallbackColor: '#8fa88b',
    stats: [
      { label: 'Poids', value: '18-30 kg' },
      { label: 'Vie', value: '12-15 ans' },
    ],
  },
];

export default function BreedShowcase() {
  return (
    <section className="bg-[var(--color-cream)]">
      <div className="container-luxury section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-[1px] bg-[var(--color-gold)]/40" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--color-gold)]">
              Nos Races
            </span>
            <div className="w-8 h-[1px] bg-[var(--color-gold)]/40" />
          </div>
          <h2 className="font-[var(--font-heading)] text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-charcoal)]">
            Nos deux races
          </h2>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2">
        {breeds.map((breed, i) => (
          <motion.div
            key={breed.slug}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.15 }}
            className="group relative overflow-hidden"
          >
            <Link href={breed.href} className="block">
              <div className="aspect-[3/4] lg:aspect-auto lg:min-h-[700px] relative">
                <div
                  role="img"
                  aria-label={`${breed.name} (${breed.nameEn})`}
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-110"
                  style={{
                    backgroundImage: `url(${breed.image})`,
                    backgroundColor: breed.fallbackColor,
                  }}
                />
                {/* Multi-layer gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/5" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 lg:p-14">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.15 + 0.2 }}
                    className="flex items-center gap-3 mb-4"
                  >
                    <div className="w-6 h-[1px] bg-[var(--color-gold)]" />
                    <span className="text-[11px] tracking-[0.3em] uppercase text-[var(--color-gold-light)] font-medium">
                      {breed.nameEn}
                    </span>
                  </motion.div>

                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.15 + 0.3 }}
                    className="font-[var(--font-heading)] text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 group-hover:translate-x-2 transition-transform duration-500"
                  >
                    {breed.name}
                  </motion.h3>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.15 + 0.4 }}
                    className="text-white/85 mb-6 max-w-md leading-relaxed text-[15px]"
                  >
                    {breed.tagline}
                  </motion.p>

                  {/* Mini stats */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.15 + 0.5 }}
                    className="flex gap-6 mb-8"
                  >
                    {breed.stats.map((stat) => (
                      <div key={stat.label} className="text-center">
                        <span className="block text-lg font-bold text-[var(--color-gold-light)]">{stat.value}</span>
                        <span className="text-[10px] tracking-[0.15em] uppercase text-white/65">{stat.label}</span>
                      </div>
                    ))}
                  </motion.div>

                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.15 + 0.6 }}
                    className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-gold-light)] group-hover:text-white transition-colors duration-500"
                  >
                    Découvrir la race
                    <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-2" />
                  </motion.span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
