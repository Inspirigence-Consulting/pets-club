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

const breed = BREEDS.australianShepherd;

export default function AustralianShepherdPage() {
  const puppies = mockPuppies.filter((p) => p.breed === 'berger-australien');

  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-28 bg-[#0a1a10] overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: `url(${cldImg('visual-showcase/after_WhatsApp Image 2026-01-28 at 17.06.36 (5)', 'w_1600,h_900,c_fill,g_auto,q_auto,f_auto')})`, backgroundColor: '#8fa88b' }}
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
          <Breadcrumbs items={[{ label: 'Nos Races', href: '#' }, { label: 'Berger Australien' }]} light />
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
              className="text-lg text-white/75 italic leading-relaxed"
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
                  style={{ backgroundImage: `url(${cldImg('visual-showcase/before_WhatsApp Image 2026-01-28 at 17.06.36 (9)', 'w_800,h_800,c_fill,g_auto,q_auto,f_auto')})`, backgroundColor: 'var(--color-cream-dark)' }}
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-[var(--font-heading)] text-3xl font-bold text-[var(--color-charcoal)] mb-6">
                Le chien qui ne tient jamais en place (et c&apos;est pour ça qu&apos;on l&apos;aime)
              </h2>
              <p className="text-[var(--color-text-light)] leading-relaxed mb-8">
                {breed.description}
              </p>

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
            title="Working Line ou Beauty Line : selon votre quotidien"
            description="Famille sportive ou famille tranquille ? Nous avons deux profils de Berger Australien, chacun avec ses forces."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                name: 'Working Line',
                desc: 'Sélectionnés pour leur vivacité d\'esprit et leur endurance. Ces Bergers Australiens sont faits pour bouger : randonnée, agility, canicross. Le compagnon idéal des familles qui aiment sortir.',
                traits: ['Vivacité d\'esprit', 'Endurance', 'Drive naturel', 'Obéissance innée'],
              },
              {
                name: 'Beauty Line',
                desc: 'Des robes spectaculaires, une morphologie conforme au standard FCI et un tempérament plus posé. Parfait pour les familles qui veulent un beau chien au quotidien, sans forcément courir un marathon chaque week-end.',
                traits: ['Robes spectaculaires', 'Morphologie standard', 'Tempérament posé', 'Présence en ring'],
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
                  {line.name}
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
              title="Nos Chiots Berger Australien"
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

      {/* Care */}
      <section className="section-padding bg-[var(--color-cream)]">
        <div className="container-narrow">
          <SectionHeading
            subtitle="Bien-Être"
            title="Ce qu'il faut savoir avant d'adopter un Aussie"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: 'Exercice quotidien', desc: 'Comptez 1 à 2 heures d\'activité par jour — randonnée, jeux de balle, agility. Un Aussie qui ne se dépense pas assez trouvera lui-même de quoi s\'occuper (et vos chaussures risquent d\'en pâtir).' },
              { title: 'Stimulation mentale', desc: 'Ce chien apprend vite et s\'ennuie encore plus vite. Puzzles, nouvelles commandes, jeux de recherche : occupez son cerveau autant que ses pattes.' },
              { title: 'Toilettage', desc: 'Son double pelage demande un brossage 2 à 3 fois par semaine, plus souvent en période de mue au printemps et en automne. Rien d\'insurmontable, mais il faut s\'y tenir.' },
              { title: 'Santé', desc: 'Yeux, hanches et gène MDR1 sont les points de vigilance de la race. Nos chiots partent avec un dossier santé complet, résultats génétiques inclus, pour que votre vétérinaire ait toutes les informations dès le premier rendez-vous.' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 border border-[var(--color-cream-dark)]"
              >
                <h3 className="font-[var(--font-heading)] text-lg font-semibold text-[var(--color-charcoal)] mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--color-text-light)] leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-[var(--color-primary-dark)]">
        <div className="container-luxury text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-[var(--font-heading)] text-3xl md:text-4xl font-bold text-white mb-6">
              Le Berger Australien, c&apos;est pour vous ?
            </h2>
            <p className="text-white/75 mb-8 max-w-md mx-auto">
              Découvrez nos chiots disponibles ou inscrivez-vous pour être prévenu des prochaines portées.
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
