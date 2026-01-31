'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import SectionHeading from '@/components/ui/SectionHeading';
import PuppyCard from '@/components/ui/PuppyCard';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { BREEDS } from '@/lib/constants';
import { mockPuppies } from '@/lib/mock-data';
import { cldImg } from '@/lib/cloudinary';

const breed = BREEDS.pomeranian;

export default function PomeranianPage() {
  const puppies = mockPuppies.filter((p) => p.breed === 'pomeranian');

  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-28 bg-[#0a1a10] overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: `url(${cldImg('visual-showcase/after_WhatsApp Image 2026-01-28 at 15.23.27 (1)', 'w_1600,h_900,c_fill,g_auto,q_auto,f_auto')})`, backgroundColor: '#d4bc7c' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1a10]/95 via-[#0a1a10]/70 to-[#0a1a10]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a10] via-transparent to-[#0a1a10]/50" />
        </div>
        <div className="absolute top-[15%] right-[5%] w-[350px] h-[350px] pointer-events-none">
          <div className="absolute inset-0 rounded-full border border-[var(--color-gold)]/[0.06]" />
          <div className="absolute inset-8 rounded-full border border-[var(--color-gold)]/[0.04]" />
        </div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--color-gold)]/20 to-transparent" />

        <div className="container-luxury relative z-10">
          <Breadcrumbs items={[{ label: 'Nos Races', href: '/#races' }, { label: 'Spitz Nain' }]} light />
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-8 h-[1px] bg-[var(--color-gold)]/40" />
              <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[var(--color-gold-light)]">
                {breed.nameEn}
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-[var(--font-heading)] text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            >
              {breed.name}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-white/50 italic leading-relaxed"
            >
              {breed.tagline}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="section-padding">
        <div className="container-narrow">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="aspect-square relative">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${cldImg('visual-showcase/after_WhatsApp Image 2026-01-28 at 15.23.27', 'w_800,h_800,c_fill,g_auto,q_auto,f_auto')})`, backgroundColor: 'var(--color-cream-dark)' }}
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-[var(--font-heading)] text-3xl font-bold text-[var(--color-charcoal)] mb-6">
                Le Spitz Nain, c&apos;est l&apos;élégance dans un format compact
              </h2>
              <p className="text-[var(--color-text-light)] leading-relaxed mb-8">
                {breed.description}
              </p>

              {/* Characteristics */}
              <div className="grid grid-cols-2 gap-4">
                {breed.characteristics.map((char) => (
                  <div key={char.label} className="p-4 bg-[var(--color-cream)]">
                    <span className="text-xs font-semibold tracking-wider uppercase text-[var(--color-gold)] block mb-1">
                      {char.label}
                    </span>
                    <span className="text-sm font-medium text-[var(--color-charcoal)]">
                      {char.value}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bloodlines */}
      <section className="section-padding bg-[var(--color-cream)]">
        <div className="container-luxury">
          <SectionHeading
            subtitle="Nos Lignées"
            title="Teddy Bear & Standard"
            description="Nous élevons deux types de Spitz Nain, chacun avec ses qualités uniques et son charme distinctif."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                name: 'Teddy Bear',
                desc: 'Un museau court, un visage rond comme une peluche. Le Teddy Bear est la quintessence de la mignonnerie avec son expression douce et ses traits ronds qui font fondre les cœurs.',
                traits: ['Museau court', 'Visage rond', 'Pelage dense', 'Expression douce'],
              },
              {
                name: 'Standard',
                desc: 'Le Spitz Nain classique dans toute sa splendeur. Un museau plus allongé, une allure fière et un port de tête élégant qui rappelle ses origines royales.',
                traits: ['Museau classique', 'Port noble', 'Silhouette élégante', 'Regard vif'],
              },
            ].map((line, i) => (
              <motion.div
                key={line.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-white p-8 border border-[var(--color-cream-dark)]"
              >
                <h3 className="font-[var(--font-heading)] text-2xl font-semibold text-[var(--color-charcoal)] mb-4">
                  Lignée {line.name}
                </h3>
                <p className="text-sm text-[var(--color-text-light)] leading-relaxed mb-6">
                  {line.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {line.traits.map((trait) => (
                    <span key={trait} className="px-3 py-1 bg-[var(--color-cream)] text-xs text-[var(--color-text-light)]">
                      {trait}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Available Puppies */}
      {puppies.length > 0 && (
        <section className="section-padding">
          <div className="container-luxury">
            <SectionHeading
              subtitle="Disponibles"
              title="Nos Chiots Spitz Nain"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {puppies.map((puppy, i) => (
                <PuppyCard key={puppy.id} puppy={puppy} index={i} />
              ))}
            </div>
            <div className="text-center mt-12">
              <Link href="/chiots" className="btn-outline inline-flex items-center gap-2">
                Voir Tous Nos Chiots
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section-padding bg-[var(--color-primary-dark)]">
        <div className="container-luxury text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-[var(--font-heading)] text-3xl md:text-4xl font-bold text-white mb-6">
              Le Spitz Nain Vous Fait Craquer ?
            </h2>
            <p className="text-white/60 mb-8 max-w-md mx-auto">
              Contactez-nous pour en savoir plus sur nos chiots disponibles ou rejoignez notre liste d&apos;attente.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-gold">
                Réserver Mon Compagnon
              </Link>
              <Link href="/contact" className="btn-outline border-white/30 text-white hover:bg-white hover:text-[var(--color-primary)]">
                Rejoindre la Liste d&apos;Attente
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
