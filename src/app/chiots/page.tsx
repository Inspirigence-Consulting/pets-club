'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Grid3X3, LayoutGrid, Heart } from 'lucide-react';
import PuppyCard from '@/components/ui/PuppyCard';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { mockPuppies, type Puppy } from '@/lib/mock-data';

type FilterBreed = 'all' | 'pomeranian' | 'berger-australien';
type FilterStatus = 'all' | 'available' | 'reserved' | 'coming' | 'sold';
type ViewMode = 'feed' | 'grid';

export default function PuppiesPage() {
  const [breed, setBreed] = useState<FilterBreed>('all');
  const [status, setStatus] = useState<FilterStatus>('all');
  const [view, setView] = useState<ViewMode>('feed');

  // The public catalogue is the cattery's real inventory (see lib/mock-data).
  const puppies: Puppy[] = mockPuppies;

  const filtered = useMemo(() => {
    return puppies.filter((p) => {
      if (breed !== 'all' && p.breed !== breed) return false;
      if (status !== 'all' && p.status !== status) return false;
      return true;
    });
  }, [puppies, breed, status]);

  const availableCount = puppies.filter(p => p.status === 'available').length;
  const totalCount = puppies.length;

  return (
    <>
      {/* Profile-style header */}
      <section className="relative pt-40 pb-0 bg-[var(--color-warm-white)]">
        <div className="container-luxury">
          <Breadcrumbs items={[{ label: 'Nos Chiots' }]} />

          {/* Instagram-style profile header */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8 py-8">
            {/* Avatar / Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-20 h-20 md:w-28 md:h-28 rounded-full border-2 border-[var(--color-gold)]/30 p-[3px] shrink-0"
            >
              <div className="w-full h-full rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] flex items-center justify-center">
                <span className="text-xl md:text-2xl font-bold text-[var(--color-gold)]">PC</span>
              </div>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex-1"
            >
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-charcoal)]">
                  Nos Chiots
                </h1>
                <div className="px-2.5 py-0.5 bg-[var(--color-accent-sage)]/10 text-[var(--color-accent-sage)] text-xs font-semibold rounded-full">
                  {availableCount} disponibles
                </div>
              </div>

              {/* Stats row */}
              <div className="flex gap-6 mb-3">
                <div>
                  <span className="font-bold text-[var(--color-charcoal)]">{totalCount}</span>
                  <span className="text-sm text-[var(--color-text-muted)] ml-1.5">chiots</span>
                </div>
                <div>
                  <span className="font-bold text-[var(--color-charcoal)]">200+</span>
                  <span className="text-sm text-[var(--color-text-muted)] ml-1.5">familles</span>
                </div>
                <div>
                  <span className="font-bold text-[var(--color-charcoal)]">2</span>
                  <span className="text-sm text-[var(--color-text-muted)] ml-1.5">races</span>
                </div>
              </div>

              <p className="text-sm text-[var(--color-text-light)] max-w-lg">
                Chaque chiot est issu de reproducteurs titrés et testés génétiquement.
                Il grandit chez nous pendant 10 semaines avant de rejoindre sa famille.
              </p>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex gap-3"
            >
              <Link href="/contact" className="btn-gold text-xs">
                <Heart size={14} />
                Liste d&apos;attente
              </Link>
            </motion.div>
          </div>

          {/* Filter tabs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="border-t border-[var(--color-cream-dark)]"
          >
            <div className="flex items-center justify-between py-3">
              {/* Breed filter pills */}
              <div className="flex gap-2 overflow-x-auto flex-nowrap scrollbar-hide pb-1">
                {([
                  { value: 'all' as FilterBreed, label: 'Tous' },
                  { value: 'pomeranian' as FilterBreed, label: 'Spitz Nain' },
                  { value: 'berger-australien' as FilterBreed, label: 'Berger Australien' },
                ] as const).map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setBreed(opt.value)}
                    className={`px-4 py-1.5 text-xs font-medium whitespace-nowrap transition-all duration-300 rounded-full ${
                      breed === opt.value
                        ? 'bg-[var(--color-primary)] text-white'
                        : 'bg-[var(--color-cream)] text-[var(--color-text-light)] hover:bg-[var(--color-cream-dark)]'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
                <div className="w-px h-6 bg-[var(--color-cream-dark)] mx-1 self-center" />
                {([
                  { value: 'all' as FilterStatus, label: 'Tout statut' },
                  { value: 'available' as FilterStatus, label: 'Disponible' },
                  { value: 'reserved' as FilterStatus, label: 'Réservé' },
                  { value: 'sold' as FilterStatus, label: 'Vendu' },
                ] as const).map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setStatus(opt.value)}
                    className={`px-4 py-1.5 text-xs font-medium whitespace-nowrap transition-all duration-300 rounded-full ${
                      status === opt.value
                        ? 'bg-[var(--color-gold)] text-white'
                        : 'bg-[var(--color-cream)] text-[var(--color-text-light)] hover:bg-[var(--color-cream-dark)]'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              {/* View toggle */}
              <div className="hidden md:flex gap-1 ml-4">
                <button
                  onClick={() => setView('feed')}
                  className={`p-2 transition-colors ${view === 'feed' ? 'text-[var(--color-charcoal)]' : 'text-[var(--color-text-muted)]'}`}
                  aria-label="Vue grille compacte"
                >
                  <Grid3X3 size={18} />
                </button>
                <button
                  onClick={() => setView('grid')}
                  className={`p-2 transition-colors ${view === 'grid' ? 'text-[var(--color-charcoal)]' : 'text-[var(--color-text-muted)]'}`}
                  aria-label="Vue en cartes"
                >
                  <LayoutGrid size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feed Grid */}
      <section className="pb-16 bg-[var(--color-warm-white)]">
        <div className="container-luxury">
            <AnimatePresence mode="wait">
              {filtered.length > 0 ? (
                <motion.div
                  key={`${breed}-${status}-${view}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {view === 'feed' ? (
                    <div className="feed-grid">
                      {filtered.map((puppy, i) => (
                        <PuppyCard key={puppy.id} puppy={puppy} index={i} variant="feed" />
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {filtered.map((puppy, i) => (
                        <PuppyCard key={puppy.id} puppy={puppy} index={i} variant="grid" />
                      ))}
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--color-cream)] flex items-center justify-center">
                    <Heart size={24} className="text-[var(--color-text-muted)]" />
                  </div>
                  <p className="text-lg text-[var(--color-text-muted)] mb-4">
                    Aucun chiot ne correspond à vos critères.
                  </p>
                  <Link href="/contact" className="btn-outline">
                    Rejoindre la Liste d&apos;Attente
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
        </div>
      </section>

      {/* Investment section */}
      <section className="section-padding bg-[var(--color-primary-dark)] noise-overlay">
        <div className="container-narrow text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-8 h-[1px] bg-[var(--color-gold)]/40" />
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--color-gold-light)]">
                Investissement
              </span>
              <div className="w-8 h-[1px] bg-[var(--color-gold)]/40" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Tarifs sur demande
            </h2>
            <p className="text-white/75 max-w-xl mx-auto leading-relaxed mb-10">
              Le prix dépend de la race, de la lignée et du profil de chaque chiot.
              Nous préférons en discuter directement avec vous plutôt que d&apos;afficher un chiffre
              qui ne tiendrait pas compte de vos attentes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-gold">
                Nous contacter pour les tarifs
              </Link>
              <Link href="/contact" className="btn-outline border-white/20 text-white/80 hover:bg-white/5 hover:border-white/40 hover:text-white">
                Planifier un appel vidéo
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
