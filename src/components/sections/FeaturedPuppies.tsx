'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import PuppyCard from '@/components/ui/PuppyCard';
import { mockPuppies } from '@/lib/mock-data';

export default function FeaturedPuppies() {
  const featured = mockPuppies.filter((p) => p.status === 'available' || p.status === 'coming').slice(0, 4);

  return (
    <section className="section-padding bg-[var(--color-warm-white)] relative">
      <div className="container-luxury">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[1px] bg-[var(--color-gold)]" />
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--color-gold)]">
                Nos Chiots
              </span>
            </div>
            <h2 className="font-[var(--font-heading)] text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-charcoal)] mb-4">
              Chiots disponibles
            </h2>
            <p className="text-[var(--color-text-light)] max-w-lg leading-relaxed">
              Chaque chiot grandit chez nous pendant 10 semaines, entouré de sa mère et de sa fratrie.
              Voici ceux qui sont prêts à rejoindre leur nouvelle famille.
            </p>
          </div>
          <Link
            href="/chiots"
            className="group inline-flex items-center gap-2 text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-gold)] transition-colors shrink-0"
          >
            Voir tous nos chiots
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((puppy, i) => (
            <PuppyCard key={puppy.id} puppy={puppy} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-14"
        >
          <Link href="/chiots" className="btn-gold inline-flex items-center gap-2">
            Voir tous les chiots
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
