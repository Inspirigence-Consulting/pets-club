'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { mockGalleryItems } from '@/lib/mock-data';

type GalleryCategory = 'all' | 'champions' | 'families' | 'behind-scenes' | 'community';

const categories: { value: GalleryCategory; label: string }[] = [
  { value: 'all', label: 'Tout' },
  { value: 'champions', label: 'Nos Champions' },
  { value: 'families', label: 'Familles Heureuses' },
  { value: 'behind-scenes', label: 'Coulisses' },
  { value: 'community', label: 'Communauté' },
];

export default function GalleryPage() {
  const [category, setCategory] = useState<GalleryCategory>('all');
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = useMemo(() => {
    if (category === 'all') return mockGalleryItems;
    return mockGalleryItems.filter((item) => item.category === category);
  }, [category]);

  const goNext = useCallback(() => {
    if (lightbox !== null && lightbox < filtered.length - 1) setLightbox(lightbox + 1);
  }, [lightbox, filtered.length]);

  const goPrev = useCallback(() => {
    if (lightbox !== null && lightbox > 0) setLightbox(lightbox - 1);
  }, [lightbox]);

  useEffect(() => {
    if (lightbox === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightbox, goNext, goPrev]);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-24 bg-[#0a1a10] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1a10]/80 to-[#0a1a10]" />
        <div className="absolute top-0 right-[15%] w-[200px] h-[200px] pointer-events-none">
          <div className="absolute inset-0 rounded-full border border-[var(--color-gold)]/[0.06]" />
        </div>
        <div className="absolute top-0 right-0 w-[40%] h-full bg-gradient-to-l from-[var(--color-gold)]/[0.02] to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--color-gold)]/20 to-transparent" />

        <div className="container-luxury relative z-10 text-center">
          <Breadcrumbs items={[{ label: 'Galerie' }]} light />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="w-8 h-[1px] bg-[var(--color-gold)]/40" />
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[var(--color-gold-light)]">
              Galerie
            </span>
            <div className="w-8 h-[1px] bg-[var(--color-gold)]/40" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-[var(--font-heading)] text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            Notre <span className="text-gradient-gold italic">Univers</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-white/50 max-w-xl mx-auto leading-relaxed"
          >
            Champions, familles heureuses, coulisses de notre élevage et moments de vie partagés.
          </motion.p>
        </div>
      </section>

      {/* Gallery */}
      <section className="section-padding">
        <div className="container-luxury">
          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setCategory(cat.value)}
                className={`px-5 py-2 text-xs font-medium tracking-wide rounded-full transition-all duration-300 ${
                  category === cat.value
                    ? 'bg-[var(--color-primary)] text-white shadow-[0_2px_10px_rgba(26,58,42,0.2)]'
                    : 'bg-[var(--color-cream)] text-[var(--color-text-light)] hover:bg-[var(--color-cream-dark)] hover:text-[var(--color-charcoal)]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="group cursor-pointer"
                  onClick={() => setLightbox(i)}
                >
                  <div className="aspect-square relative overflow-hidden bg-[var(--color-cream)]">
                    <div
                      role="img"
                      aria-label={item.caption}
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{
                        backgroundImage: `url(${item.image})`,
                        backgroundColor: 'var(--color-cream-dark)',
                      }}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-500">
                      <p className="text-sm text-white">{item.caption}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 md:p-8"
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-4 right-4 md:top-6 md:right-6 text-white/60 hover:text-white transition-colors z-10"
              aria-label="Fermer"
            >
              <X size={28} />
            </button>

            {/* Prev button */}
            {lightbox > 0 && (
              <button
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
                aria-label="Photo précédente"
              >
                <ChevronLeft size={24} className="text-white" />
              </button>
            )}

            {/* Next button */}
            {lightbox < filtered.length - 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
                aria-label="Photo suivante"
              >
                <ChevronRight size={24} className="text-white" />
              </button>
            )}

            <motion.div
              key={lightbox}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-4xl max-h-[80vh] relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="w-full h-[70vh] bg-contain bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${filtered[lightbox]?.image})`,
                }}
              />
              <div className="text-center mt-4">
                <p className="text-white/80">
                  {filtered[lightbox]?.caption}
                </p>
                <p className="text-white/40 text-xs mt-1">
                  {lightbox + 1} / {filtered.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Community submissions */}
      <section className="section-padding bg-[var(--color-cream)]">
        <div className="container-narrow text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-[var(--font-heading)] text-3xl font-bold text-[var(--color-charcoal)] mb-4">
              Partagez Vos Moments
            </h2>
            <p className="text-[var(--color-text-light)] mb-8 max-w-md mx-auto">
              Vous êtes membre de la famille Pet&apos;s Club ? Partagez vos plus beaux moments avec votre compagnon.
            </p>
            <a
              href="mailto:contact@thepetsclub.ma?subject=Photo pour la galerie"
              className="btn-outline"
            >
              Envoyer Vos Photos
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
