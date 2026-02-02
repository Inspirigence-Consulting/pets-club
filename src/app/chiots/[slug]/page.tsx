'use client';

import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Check, Heart, Shield, Calendar, MapPin, X, Loader2 } from 'lucide-react';
import { mockPuppies, type Puppy } from '@/lib/mock-data';
import { PUPPY_STATUSES } from '@/lib/constants';
import { calculateAge, cn } from '@/lib/utils';
import ContactForm from '@/components/forms/ContactForm';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

/* eslint-disable @typescript-eslint/no-explicit-any */
function mapApiPuppyDetail(apiPuppy: any): Puppy {
  const breed = apiPuppy.litter?.sire?.breed?.toLowerCase() || '';
  const breedSlug = breed.includes('pomeranian')
    ? 'pomeranian'
    : breed.includes('australien') || breed.includes('australian')
      ? 'berger-australien'
      : 'pomeranian';
  const breedLabel = breedSlug === 'pomeranian' ? 'Spitz Nain' : 'Berger Australien';

  // healthTests is a Json? field - object like { patella: "Clear", cardiac: "Normal" }
  const sireHealthTests = apiPuppy.litter?.sire?.healthTests;
  const damHealthTests = apiPuppy.litter?.dam?.healthTests;

  const formatHealthTests = (tests: any): string[] => {
    if (!tests) return [];
    if (Array.isArray(tests)) return tests.map(String);
    if (typeof tests === 'object') {
      return Object.entries(tests).map(([key, value]) => `${key}: ${value}`);
    }
    return [];
  };

  const statusMap: Record<string, Puppy['status']> = {
    AVAILABLE: 'available',
    RESERVED: 'reserved',
    SOLD: 'sold',
    ADOPTED: 'adopted',
  };

  return {
    id: apiPuppy.id,
    name: apiPuppy.name,
    breed: breedSlug as 'pomeranian' | 'berger-australien',
    breedLabel,
    gender: apiPuppy.gender === 'MALE' ? 'male' : 'female',
    dob: apiPuppy.dateOfBirth?.split('T')[0] || '',
    color: apiPuppy.color || '',
    line: apiPuppy.litter?.name || '',
    status: statusMap[apiPuppy.status] || 'available',
    image: apiPuppy.photos?.[0] || '/images/placeholder-puppy.jpg',
    images:
      apiPuppy.photos?.length > 0
        ? apiPuppy.photos
        : ['/images/placeholder-puppy.jpg'],
    description: apiPuppy.description || '',
    father: {
      name: apiPuppy.litter?.sire?.name || 'Inconnu',
      titles: Array.isArray(apiPuppy.litter?.sire?.titles)
        ? apiPuppy.litter.sire.titles
        : [],
      image: apiPuppy.litter?.sire?.photo || '/images/placeholder-dog.jpg',
      healthTests: formatHealthTests(sireHealthTests),
      breed: apiPuppy.litter?.sire?.breed || '',
      color: apiPuppy.litter?.sire?.color || '',
    },
    mother: {
      name: apiPuppy.litter?.dam?.name || 'Inconnu',
      titles: Array.isArray(apiPuppy.litter?.dam?.titles)
        ? apiPuppy.litter.dam.titles
        : [],
      image: apiPuppy.litter?.dam?.photo || '/images/placeholder-dog.jpg',
      healthTests: formatHealthTests(damHealthTests),
      breed: apiPuppy.litter?.dam?.breed || '',
      color: apiPuppy.litter?.dam?.color || '',
    },
    included: [
      'Carnet de vaccination à jour',
      'Puce électronique',
      'Certificat de santé',
      'Kit de démarrage',
    ],
    slug: apiPuppy.slug,
  };
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export default function PuppyDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [puppy, setPuppy] = useState<Puppy | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function fetchPuppy() {
      try {
        const res = await fetch(`/api/puppies/${slug}`);
        if (!res.ok) throw new Error('API error');
        const json = await res.json();
        if (!cancelled) {
          setPuppy(mapApiPuppyDetail(json));
        }
      } catch {
        // Fallback to mock data when API is unavailable
        const mockPuppy = mockPuppies.find((p) => p.slug === slug);
        if (!cancelled) {
          if (mockPuppy) {
            setPuppy(mockPuppy);
          } else {
            setNotFound(true);
          }
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchPuppy();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-40">
        <Loader2 size={32} className="animate-spin text-[var(--color-gold)] mb-4" />
        <p className="text-sm text-[var(--color-text-muted)]">
          Chargement...
        </p>
      </div>
    );
  }

  if (notFound || !puppy) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-40">
        <div className="text-center">
          <h1 className="font-[var(--font-heading)] text-3xl font-bold text-[var(--color-charcoal)] mb-4">
            Chiot non trouvé
          </h1>
          <Link href="/chiots" className="btn-outline">
            Retour aux chiots
          </Link>
        </div>
      </div>
    );
  }

  const status = PUPPY_STATUSES[puppy.status];

  return (
    <>
      <section className="pt-40 pb-8">
        <div className="container-luxury">
          <Breadcrumbs items={[{ label: 'Nos Chiots', href: '/chiots' }, { label: puppy.name }]} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Images */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="aspect-[4/5] relative mb-4 bg-[var(--color-cream)]">
                <Image
                  src={puppy.images[activeImage]}
                  alt={`${puppy.name} - Photo ${activeImage + 1}`}
                  fill
                  className="object-cover object-center transition-all duration-500"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute top-4 left-4">
                  <span className={cn('badge-luxury', status.class)}>
                    {status.label}
                  </span>
                </div>
              </div>
              {puppy.images.length > 1 && (
                <div className="flex gap-2">
                  {puppy.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={cn(
                        'w-20 h-20 relative overflow-hidden border-2 transition-all',
                        activeImage === i
                          ? 'border-[var(--color-gold)]'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      )}
                    >
                      <Image
                        src={img}
                        alt={`${puppy.name} - Miniature ${i + 1}`}
                        fill
                        className="object-cover object-center"
                        sizes="80px"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--color-gold)] mb-2 block">
                {puppy.breedLabel}
              </span>
              <h1 className="font-[var(--font-heading)] text-4xl md:text-5xl font-bold text-[var(--color-charcoal)] mb-4">
                {puppy.name}
              </h1>

              {/* Quick info */}
              <div className="grid grid-cols-2 gap-4 mb-8 py-6 border-y border-[var(--color-cream-dark)]">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar size={14} className="text-[var(--color-gold)]" />
                  <span className="text-[var(--color-text-light)]">Âge :</span>
                  <span className="font-medium text-[var(--color-charcoal)]">{calculateAge(puppy.dob)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Heart size={14} className="text-[var(--color-gold)]" />
                  <span className="text-[var(--color-text-light)]">Genre :</span>
                  <span className="font-medium text-[var(--color-charcoal)]">{puppy.gender === 'male' ? 'Mâle' : 'Femelle'}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin size={14} className="text-[var(--color-gold)]" />
                  <span className="text-[var(--color-text-light)]">Couleur :</span>
                  <span className="font-medium text-[var(--color-charcoal)]">{puppy.color}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Shield size={14} className="text-[var(--color-gold)]" />
                  <span className="text-[var(--color-text-light)]">Lignée :</span>
                  <span className="font-medium text-[var(--color-charcoal)]">{puppy.line}</span>
                </div>
              </div>

              <p className="text-[var(--color-text-light)] leading-relaxed mb-8">
                {puppy.description}
              </p>

              {/* What's included */}
              <div className="mb-8">
                <h3 className="font-[var(--font-heading)] text-lg font-semibold text-[var(--color-charcoal)] mb-4">
                  Ce Qui Est Inclus
                </h3>
                <ul className="space-y-3">
                  {puppy.included.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-[var(--color-text)]">
                      <Check size={16} className="text-[var(--color-accent-sage)] shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Investment */}
              <div className="p-6 bg-[var(--color-cream)] mb-8">
                <h3 className="font-[var(--font-heading)] text-lg font-semibold text-[var(--color-charcoal)] mb-2">
                  Tarif sur demande
                </h3>
                <p className="text-sm text-[var(--color-text-light)] leading-relaxed">
                  Le prix pour accueillir {puppy.name} dépend de son profil et de sa lignée.
                  Contactez-nous pour en discuter — nous répondons sous 24 h.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setShowForm(true)}
                  className="btn-gold flex-1 justify-center"
                >
                  Réserver {puppy.name}
                </button>
                <Link
                  href="/contact"
                  className="btn-outline flex-1 justify-center"
                >
                  Planifier un Appel Vidéo
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Parents */}
      <section className="section-padding bg-[var(--color-cream)]">
        <div className="container-luxury">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--color-gold)] mb-4 block">
              Les Parents
            </span>
            <h2 className="font-[var(--font-heading)] text-3xl font-bold text-[var(--color-charcoal)]">
              Parents de {puppy.name}
            </h2>
            <div className="divider-gold mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              { parent: puppy.father, label: 'Père' },
              { parent: puppy.mother, label: 'Mère' },
            ].map(({ parent, label }) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white p-6 border border-[var(--color-cream-dark)]"
              >
                <div className="flex gap-6">
                  <div className="w-24 h-24 shrink-0 relative overflow-hidden bg-[var(--color-cream-dark)]">
                    <Image
                      src={parent.image}
                      alt={`${parent.name} - ${label}`}
                      fill
                      className="object-cover object-center"
                      sizes="96px"
                    />
                  </div>
                  <div>
                    <span className="text-xs font-semibold tracking-wider uppercase text-[var(--color-gold)] block mb-1">
                      {label}
                    </span>
                    <h3 className="font-[var(--font-heading)] text-lg font-semibold text-[var(--color-charcoal)] mb-2">
                      {parent.name}
                    </h3>
                    <p className="text-xs text-[var(--color-text-light)] mb-1">
                      {parent.breed} &middot; {parent.color}
                    </p>
                  </div>
                </div>

                {/* Titles */}
                {parent.titles.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-[var(--color-cream-dark)]">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
                      Titres
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {parent.titles.map((title) => (
                        <span key={title} className="px-2 py-1 bg-[var(--color-cream)] text-xs text-[var(--color-text)]">
                          {title}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Health tests */}
                {parent.healthTests.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-[var(--color-cream-dark)]">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
                      Tests de Santé
                    </p>
                    <div className="space-y-1">
                      {parent.healthTests.map((test) => (
                        <div key={test} className="flex items-center gap-2 text-xs text-[var(--color-text)]">
                          <Check size={12} className="text-[var(--color-accent-sage)]" />
                          {test}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reservation Form Slide-in */}
      <AnimatePresence>
        {showForm && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setShowForm(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-lg bg-white z-50 overflow-y-auto"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="font-[var(--font-heading)] text-2xl font-bold text-[var(--color-charcoal)]">
                      Réserver {puppy.name}
                    </h2>
                    <p className="text-sm text-[var(--color-text-light)]">
                      Remplissez le formulaire ci-dessous
                    </p>
                  </div>
                  <button
                    onClick={() => setShowForm(false)}
                    className="p-2 hover:bg-[var(--color-cream)] transition-colors"
                    aria-label="Fermer"
                  >
                    <X size={20} />
                  </button>
                </div>
                <ContactForm defaultSubject="reserve" puppyName={puppy.name} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
