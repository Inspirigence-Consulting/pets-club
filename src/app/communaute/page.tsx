'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Download, Calendar, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import SectionHeading from '@/components/ui/SectionHeading';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import NewsletterForm from '@/components/forms/NewsletterForm';
import { mockBlogPosts } from '@/lib/mock-data';
import { formatDate } from '@/lib/utils';
import { WHATSAPP_URL } from '@/lib/constants';
import { cldImg } from '@/lib/cloudinary';

export default function CommunityPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-24 bg-[#0a1a10] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1a10]/80 to-[#0a1a10]" />
        <div className="absolute top-[20%] right-[12%] w-[250px] h-[250px] pointer-events-none">
          <div className="absolute inset-0 rounded-full border border-[var(--color-gold)]/[0.06]" />
          <div className="absolute inset-6 rounded-full border border-[var(--color-gold)]/[0.04]" />
        </div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--color-gold)]/20 to-transparent" />

        <div className="container-luxury relative z-10 text-center">
          <Breadcrumbs items={[{ label: 'Communauté' }]} light />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="w-8 h-[1px] bg-[var(--color-gold)]/40" />
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[var(--color-gold-light)]">
              Communauté
            </span>
            <div className="w-8 h-[1px] bg-[var(--color-gold)]/40" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-[var(--font-heading)] text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            La Famille{' '}
            <span className="text-gradient-gold italic">Pet&apos;s Club</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-white/50 max-w-xl mx-auto leading-relaxed"
          >
            Ressources, actualités et une communauté passionnée pour accompagner chaque étape de votre aventure.
          </motion.p>
        </div>
      </section>

      {/* Blog / Resources */}
      <section className="section-padding">
        <div className="container-luxury">
          <SectionHeading
            subtitle="Blog & Ressources"
            title="Nos Derniers Articles"
            description="Conseils, guides et actualités pour les amoureux des chiens."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mockBlogPosts.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-luxury group"
              >
                <div className="aspect-[16/10] relative overflow-hidden bg-[var(--color-cream)]">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{
                      backgroundImage: `url(${post.image})`,
                      backgroundColor: 'var(--color-cream-dark)',
                    }}
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-semibold tracking-wider uppercase text-[var(--color-gold)]">
                      {post.category}
                    </span>
                    <span className="text-xs text-[var(--color-text-muted)]">
                      {formatDate(post.date)}
                    </span>
                  </div>
                  <h3 className="font-[var(--font-heading)] text-lg font-semibold text-[var(--color-charcoal)] mb-3 group-hover:text-[var(--color-gold)] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text-light)] leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-[var(--color-primary)] group-hover:text-[var(--color-gold)] transition-colors">
                    Lire la suite
                    <ArrowRight size={14} />
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Preparation Guide */}
      <section className="section-padding bg-[var(--color-cream)]">
        <div className="container-narrow">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="aspect-[4/3] relative bg-[var(--color-cream-dark)]">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${cldImg('visual-showcase/before_WhatsApp Image 2026-01-28 at 15.23.28 (7)', 'w_800,h_600,c_fill,g_auto,q_auto,f_auto')})`,
                    backgroundColor: 'var(--color-cream-dark)',
                  }}
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--color-gold)] mb-4 block">
                Guide Gratuit
              </span>
              <h2 className="font-[var(--font-heading)] text-3xl font-bold text-[var(--color-charcoal)] mb-4">
                Préparer l&apos;Arrivée de Votre Compagnon
              </h2>
              <p className="text-[var(--color-text-light)] leading-relaxed mb-6">
                Notre guide complet pour vous aider à préparer votre foyer, choisir les bons accessoires
                et accueillir votre nouveau compagnon dans les meilleures conditions.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Check-list complète d\'accueil',
                  'Conseils nutrition adaptés',
                  'Guide de socialisation',
                  'Premiers jours à la maison',
                  'Contacts vétérinaires recommandés',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-[var(--color-text)]">
                    <Download size={14} className="text-[var(--color-gold)]" />
                    {item}
                  </li>
                ))}
              </ul>
              <div>
                <p className="text-sm text-[var(--color-text-muted)] mb-3">
                  Entrez votre email pour recevoir le guide :
                </p>
                <NewsletterForm />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Join Community */}
      <section className="section-padding">
        <div className="container-luxury">
          <SectionHeading
            subtitle="Rejoignez-Nous"
            title="Notre Communauté"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* WhatsApp Group */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 bg-white border border-[var(--color-cream-dark)] text-center"
            >
              <div className="w-14 h-14 mx-auto mb-4 bg-[#25D366]/10 rounded-full flex items-center justify-center">
                <MessageCircle size={24} className="text-[#25D366]" />
              </div>
              <h3 className="font-[var(--font-heading)] text-xl font-semibold text-[var(--color-charcoal)] mb-3">
                Groupe WhatsApp
              </h3>
              <p className="text-sm text-[var(--color-text-light)] mb-6">
                Rejoignez notre communauté WhatsApp pour partager, échanger et rester connecté avec les autres familles Pet&apos;s Club.
              </p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Rejoindre le Groupe
              </a>
            </motion.div>

            {/* Newsletter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="p-8 bg-white border border-[var(--color-cream-dark)] text-center"
            >
              <div className="w-14 h-14 mx-auto mb-4 bg-[var(--color-gold)]/10 rounded-full flex items-center justify-center">
                <Calendar size={24} className="text-[var(--color-gold)]" />
              </div>
              <h3 className="font-[var(--font-heading)] text-xl font-semibold text-[var(--color-charcoal)] mb-3">
                Newsletter
              </h3>
              <p className="text-sm text-[var(--color-text-light)] mb-6">
                Recevez en avant-première les annonces de nouvelles portées, nos conseils et les actualités de l&apos;élevage.
              </p>
              <div className="max-w-xs mx-auto">
                <NewsletterForm />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Owner Stories CTA */}
      <section className="section-padding bg-[var(--color-primary-dark)]">
        <div className="container-luxury text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-[var(--font-heading)] text-3xl md:text-4xl font-bold text-white mb-6">
              Partagez Votre Histoire
            </h2>
            <p className="text-white/60 mb-8 max-w-md mx-auto">
              Vous êtes membre de la famille Pet&apos;s Club ? Racontez-nous votre aventure avec votre compagnon.
            </p>
            <a
              href="mailto:contact@thepetsclub.ma?subject=Mon histoire avec mon compagnon Pet's Club"
              className="btn-gold"
            >
              Raconter Mon Histoire
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
