'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import SectionHeading from '@/components/ui/SectionHeading';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { timelineEvents } from '@/lib/mock-data';
import { cldImg } from '@/lib/cloudinary';

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-24 bg-[#0a1a10] overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-15"
            style={{ backgroundImage: `url(${cldImg('visual-showcase/after_WhatsApp Image 2026-01-28 at 16.15.24', 'w_1600,h_900,c_fill,g_auto,q_auto,f_auto')})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1a10]/90 via-[#0a1a10]/60 to-[#0a1a10]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a10] via-transparent to-[#0a1a10]/60" />
          <div className="absolute top-0 right-0 w-[50%] h-full bg-gradient-to-l from-[var(--color-gold)]/[0.03] to-transparent" />
        </div>
        {/* Decorative rings */}
        <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] pointer-events-none">
          <div className="absolute inset-0 rounded-full border border-[var(--color-gold)]/[0.06]" />
          <div className="absolute inset-6 rounded-full border border-[var(--color-gold)]/[0.04]" />
        </div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--color-gold)]/20 to-transparent" />

        <div className="container-luxury relative z-10 text-center">
          <Breadcrumbs items={[{ label: 'À Propos' }]} light />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="w-8 h-[1px] bg-[var(--color-gold)]/40" />
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[var(--color-gold-light)]">
              Notre Histoire
            </span>
            <div className="w-8 h-[1px] bg-[var(--color-gold)]/40" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-[var(--font-heading)] text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            Une Passion,{' '}
            <span className="text-gradient-gold italic">Une Mission</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-white/50 max-w-xl mx-auto leading-relaxed"
          >
            Depuis plus de 15 ans, nous dédions notre vie à l&apos;élevage éthique
            et responsable de compagnons d&apos;exception.
          </motion.p>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding">
        <div className="container-narrow">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="aspect-[4/5] relative">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${cldImg('visual-showcase/after_WhatsApp Image 2026-01-28 at 16.50.15', 'w_800,h_1000,c_fill,g_auto,q_auto,f_auto')})`,
                    backgroundColor: 'var(--color-cream-dark)',
                  }}
                />
                <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-[var(--color-gold)]/10 -z-10" />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--color-gold)] mb-4 block">
                Qui Sommes-Nous
              </span>
              <h2 className="font-[var(--font-heading)] text-3xl md:text-4xl font-bold text-[var(--color-charcoal)] mb-6">
                L&apos;Amour des Animaux, La Quête de l&apos;Excellence
              </h2>
              <div className="space-y-4 text-[var(--color-text-light)] leading-relaxed">
                <p>
                  Pet&apos;s Club Maroc est né d&apos;une passion profonde pour les chiens et d&apos;une conviction :
                  chaque compagnon mérite d&apos;être élevé dans les meilleures conditions, avec amour et respect.
                </p>
                <p>
                  Notre élevage familial se distingue par son engagement envers la santé génétique,
                  la socialisation précoce et le suivi personnalisé de chaque famille.
                  Nous ne sommes pas un simple élevage — nous sommes une famille qui partage ses compagnons
                  avec d&apos;autres familles.
                </p>
                <p>
                  Chaque chiot qui quitte notre maison emporte avec lui des semaines de soins attentifs,
                  de jeux et d&apos;apprentissages. Et chaque famille qui nous fait confiance rejoint notre
                  communauté pour la vie.
                </p>
              </div>
              <Link href="/elevage-ethique" className="btn-outline mt-8 inline-flex items-center gap-2">
                Notre Éthique
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-[var(--color-cream)]">
        <div className="container-narrow">
          <SectionHeading
            subtitle="Notre Parcours"
            title="Les Étapes Clés"
          />

          <div className="relative">
            {/* Center line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-[var(--color-gold)]/30 md:-translate-x-px" />

            <div className="space-y-12">
              {timelineEvents.map((event, i) => (
                <motion.div
                  key={event.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative flex flex-col md:flex-row gap-8 ${
                    i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-[var(--color-gold)] rounded-full -translate-x-1.5 mt-2 z-10" />

                  {/* Content */}
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                    <span className="text-sm font-bold text-[var(--color-gold)]">{event.year}</span>
                    <h3 className="font-[var(--font-heading)] text-xl font-semibold text-[var(--color-charcoal)] mt-1 mb-2">
                      {event.title}
                    </h3>
                    <p className="text-sm text-[var(--color-text-light)] leading-relaxed">
                      {event.description}
                    </p>
                  </div>

                  {/* Spacer for other side */}
                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding">
        <div className="container-luxury">
          <SectionHeading
            subtitle="Notre Équipe"
            title="Les Visages de Pet's Club"
            description="Une équipe passionnée et dévouée au bien-être de chaque compagnon."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { name: 'Fondateur', role: 'Directeur & Éleveur Principal', desc: 'Plus de 15 ans d\'expérience en cynophilie et élevage éthique.' },
              { name: 'Vétérinaire Partenaire', role: 'Suivi Santé', desc: 'Surveillance médicale continue et protocoles de santé rigoureux.' },
              { name: 'Responsable Socialisation', role: 'Programme Chiot', desc: 'Développement comportemental et préparation à la vie en famille.' },
            ].map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center"
              >
                <div className="w-32 h-32 mx-auto mb-6 bg-[var(--color-cream)] rounded-full flex items-center justify-center">
                  <span className="text-2xl font-[var(--font-heading)] text-[var(--color-gold)]">
                    {member.name.charAt(0)}
                  </span>
                </div>
                <h3 className="font-[var(--font-heading)] text-lg font-semibold text-[var(--color-charcoal)]">
                  {member.name}
                </h3>
                <p className="text-sm text-[var(--color-gold)] mb-2">{member.role}</p>
                <p className="text-sm text-[var(--color-text-light)]">{member.desc}</p>
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
              Prêt à Accueillir Votre Compagnon ?
            </h2>
            <p className="text-white/60 mb-8 max-w-md mx-auto">
              Découvrez nos chiots disponibles ou contactez-nous pour planifier une visite.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/chiots" className="btn-gold">
                Découvrir Nos Chiots
              </Link>
              <Link href="/contact" className="btn-outline border-white/30 text-white hover:bg-white hover:text-[var(--color-primary)]">
                Nous Contacter
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
