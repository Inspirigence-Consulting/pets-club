'use client';

import { motion } from 'framer-motion';
import { Check, X, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import SectionHeading from '@/components/ui/SectionHeading';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { socializationProgram } from '@/lib/mock-data';
import { cldImg } from '@/lib/cloudinary';

export default function EthicalBreedingPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-24 bg-[#0a1a10] overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-15"
            style={{ backgroundImage: `url(${cldImg('visual-showcase/after_WhatsApp Image 2026-01-28 at 16.15.24 (1)', 'w_1600,h_900,c_fill,g_auto,q_auto,f_auto')})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1a10]/90 via-[#0a1a10]/60 to-[#0a1a10]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a10] via-transparent to-[#0a1a10]/60" />
          <div className="absolute top-0 left-0 w-[40%] h-full bg-gradient-to-r from-[var(--color-gold)]/[0.03] to-transparent" />
        </div>
        <div className="absolute top-[25%] left-[8%] w-[250px] h-[250px] pointer-events-none">
          <div className="absolute inset-0 rounded-full border border-[var(--color-gold)]/[0.06]" />
          <div className="absolute inset-6 rounded-full border border-[var(--color-gold)]/[0.04]" />
        </div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--color-gold)]/20 to-transparent" />

        <div className="container-luxury relative z-10 text-center">
          <Breadcrumbs items={[{ label: 'Élevage Éthique' }]} light />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="w-8 h-[1px] bg-[var(--color-gold)]/40" />
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[var(--color-gold-light)]">
              Nos Engagements
            </span>
            <div className="w-8 h-[1px] bg-[var(--color-gold)]/40" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-[var(--font-heading)] text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            Élevage{' '}
            <span className="text-gradient-gold italic">Éthique</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-white/50 max-w-xl mx-auto leading-relaxed"
          >
            Un chiot en bonne santé et bien dans sa tête, ça ne s&apos;improvise pas. Voici comment nous travaillons.
          </motion.p>
        </div>
      </section>

      {/* Manifesto */}
      <section className="section-padding">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-[var(--font-heading)] text-3xl md:text-4xl font-bold text-[var(--color-charcoal)] mb-8">
              Ce en quoi nous croyons
            </h2>
            <div className="gold-accent-left text-left max-w-2xl mx-auto">
              <p className="text-lg text-[var(--color-text)] leading-relaxed italic">
                &laquo; On ne produit pas des chiots, on les élève. Chaque décision — du choix des reproducteurs
                au moment où le chiot quitte notre maison — est guidée par une seule question :
                est-ce le mieux pour le chien et pour sa future famille ? Si la réponse est non,
                on ne le fait pas. &raquo;
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                title: 'Tests génétiques avant chaque reproduction',
                desc: 'Patella, cardiaque, ADN, yeux, hanches selon la race : chaque reproducteur est testé pour les maladies héréditaires connues. Pas de résultat clair, pas de reproduction.',
              },
              {
                title: 'Suivi vétérinaire à chaque étape',
                desc: 'De la gestation au départ du chiot : pesée quotidienne, vaccinations, vermifugation et examen de santé par notre vétérinaire partenaire.',
              },
              {
                title: 'Des chiens qui vivent dans la maison',
                desc: 'Nos chiens dorment avec nous, mangent à heures fixes et ont accès à un espace de jeu. Aucun chien ne vit en cage ni en chenil isolé.',
              },
              {
                title: 'Peu de portées, beaucoup de soin',
                desc: 'Nous limitons volontairement le nombre de portées chaque année. Une femelle ne reproduit que si elle est en parfaite santé physique et émotionnelle.',
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4"
              >
                <div className="w-10 h-10 shrink-0 bg-[var(--color-gold)]/10 flex items-center justify-center">
                  <Check size={20} className="text-[var(--color-gold)]" />
                </div>
                <div>
                  <h3 className="font-[var(--font-heading)] text-lg font-semibold text-[var(--color-charcoal)] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text-light)] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Socialization Program */}
      <section className="section-padding bg-[var(--color-cream)]">
        <div className="container-narrow">
          <SectionHeading
            subtitle="Socialisation"
            title="Ce qui se passe pendant les 10 premières semaines"
            description="Chaque phase a un objectif précis. Quand le chiot rejoint sa famille, il a déjà les bases pour s'adapter sereinement."
          />

          <div className="space-y-6">
            {socializationProgram.map((phase, i) => (
              <motion.div
                key={phase.week}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 md:p-8 border border-[var(--color-cream-dark)] flex flex-col md:flex-row gap-6"
              >
                <div className="md:w-36 shrink-0">
                  <span className="text-sm font-bold text-[var(--color-gold)] uppercase tracking-wider">
                    {phase.week}
                  </span>
                </div>
                <div>
                  <h3 className="font-[var(--font-heading)] text-lg font-semibold text-[var(--color-charcoal)] mb-2">
                    {phase.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text-light)] leading-relaxed">
                    {phase.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="section-padding">
        <div className="container-narrow">
          <SectionHeading
            subtitle="Comparer pour comprendre"
            title="Éleveur responsable vs. éleveur de masse"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Ethical */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 border-2 border-[var(--color-accent-sage)]/30"
            >
              <h3 className="font-[var(--font-heading)] text-xl font-semibold text-[var(--color-accent-sage)] mb-6">
                Pet&apos;s Club Maroc
              </h3>
              <ul className="space-y-4">
                {[
                  'Tests génétiques réalisés avant chaque reproduction',
                  'Chiots élevés dans la maison, jamais en cage',
                  '10 semaines de socialisation avec la mère',
                  'Suivi vétérinaire documenté et transmis à la famille',
                  'Nombre de portées volontairement limité',
                  'Accompagnement gratuit et sans limite de durée',
                  'Résultats de santé et lignées consultables sur demande',
                  'Chaque famille est rencontrée avant adoption',
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-[var(--color-text)]">
                    <Check size={16} className="text-[var(--color-accent-sage)] shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Unethical */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="bg-white p-8 border border-red-100"
            >
              <h3 className="font-[var(--font-heading)] text-xl font-semibold text-red-400 mb-6">
                Éleveur Non Responsable
              </h3>
              <ul className="space-y-4">
                {[
                  'Aucun test génétique, aucune vérification de santé',
                  'Chiots en cage ou en chenil sans contact humain',
                  'Séparation de la mère dès 5 ou 6 semaines',
                  'Pas de carnet de santé ni de certificat vétérinaire',
                  'Reproductions à répétition, sans repos pour la femelle',
                  'Plus de nouvelles après le paiement',
                  'Impossible de voir les parents ou les conditions d\'élevage',
                  'Le chiot part au premier acheteur, sans vérification',
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-[var(--color-text-light)]">
                    <X size={16} className="text-red-400 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 10-Week Promise */}
      <section className="section-padding bg-[var(--color-primary-dark)]">
        <div className="container-narrow text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--color-gold-light)] mb-4 block">
              Notre Promesse
            </span>
            <h2 className="font-[var(--font-heading)] text-3xl md:text-4xl font-bold text-white mb-6">
              Pourquoi 10 semaines, pas 6 ou 8 ?
            </h2>
            <div className="divider-gold mx-auto mb-8" />
            <p className="text-white/70 max-w-2xl mx-auto leading-relaxed mb-8">
              Un chiot retiré trop tôt à sa mère risque des problèmes de comportement :
              anxiété, mordillements, difficulté à rester seul. Les semaines 7 à 10 sont celles
              où il apprend les codes sociaux canins, la gestion de la frustration et les bases
              de la propreté. C&apos;est pour cela que nous ne faisons aucune exception à cette règle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/chiots" className="btn-gold">
                Voir les chiots disponibles
                <ArrowRight size={16} />
              </Link>
              <Link href="/contact" className="btn-outline border-white/30 text-white hover:bg-white hover:text-[var(--color-primary)]">
                Organiser une visite
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
