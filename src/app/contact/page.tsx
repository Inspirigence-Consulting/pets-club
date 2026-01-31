'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, ChevronDown } from 'lucide-react';
import { WHATSAPP_URL, FAQ_ITEMS } from '@/lib/constants';
import ContactForm from '@/components/forms/ContactForm';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-24 bg-[#0a1a10] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1a10]/80 to-[#0a1a10]" />
        <div className="absolute top-0 left-[50%] -translate-x-1/2 w-[600px] h-[600px] pointer-events-none opacity-30">
          <div className="absolute inset-0 rounded-full border border-[var(--color-gold)]/[0.05]" />
          <div className="absolute inset-12 rounded-full border border-[var(--color-gold)]/[0.03]" />
        </div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--color-gold)]/20 to-transparent" />

        <div className="container-luxury relative z-10 text-center">
          <Breadcrumbs items={[{ label: 'Contact' }]} light />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="w-8 h-[1px] bg-[var(--color-gold)]/40" />
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[var(--color-gold-light)]">
              Contact
            </span>
            <div className="w-8 h-[1px] bg-[var(--color-gold)]/40" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-[var(--font-heading)] text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            Contactez-<span className="text-gradient-gold italic">Nous</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-white/50 max-w-xl mx-auto leading-relaxed"
          >
            Une question, une demande de réservation ou envie de planifier une visite ?
            Nous sommes à votre écoute.
          </motion.p>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="section-padding">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Info sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <h2 className="font-[var(--font-heading)] text-2xl font-bold text-[var(--color-charcoal)] mb-8">
                Nos Coordonnées
              </h2>

              <div className="space-y-8">
                {/* WhatsApp */}
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 group"
                >
                  <div className="w-12 h-12 bg-[#25D366]/10 flex items-center justify-center shrink-0 group-hover:bg-[#25D366]/20 transition-colors">
                    <Phone size={20} className="text-[#25D366]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--color-charcoal)] mb-1">WhatsApp</h3>
                    <p className="text-sm text-[var(--color-text-light)]">+212 6 00 00 00 00</p>
                    <p className="text-xs text-[var(--color-gold)]">Réponse sous 24h</p>
                  </div>
                </a>

                {/* Email */}
                <a
                  href="mailto:contact@petsclubmaroc.com"
                  className="flex items-start gap-4 group"
                >
                  <div className="w-12 h-12 bg-[var(--color-gold)]/10 flex items-center justify-center shrink-0 group-hover:bg-[var(--color-gold)]/20 transition-colors">
                    <Mail size={20} className="text-[var(--color-gold)]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--color-charcoal)] mb-1">Email</h3>
                    <p className="text-sm text-[var(--color-text-light)]">contact@petsclubmaroc.com</p>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[var(--color-primary)]/10 flex items-center justify-center shrink-0">
                    <MapPin size={20} className="text-[var(--color-primary)]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--color-charcoal)] mb-1">Adresse</h3>
                    <p className="text-sm text-[var(--color-text-light)]">
                      Casablanca, Maroc<br />
                      (Adresse exacte communiquée lors de la prise de rendez-vous)
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[var(--color-accent-sage)]/10 flex items-center justify-center shrink-0">
                    <Clock size={20} className="text-[var(--color-accent-sage)]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--color-charcoal)] mb-1">Horaires</h3>
                    <p className="text-sm text-[var(--color-text-light)]">
                      Lundi - Samedi : 9h00 - 18h00<br />
                      Dimanche : Sur rendez-vous
                    </p>
                  </div>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="mt-8 aspect-[4/3] bg-[var(--color-cream)] flex items-center justify-center">
                <p className="text-sm text-[var(--color-text-muted)]">Carte interactive</p>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <div className="bg-white p-8 md:p-10 border border-[var(--color-cream-dark)]">
                <h2 className="font-[var(--font-heading)] text-2xl font-bold text-[var(--color-charcoal)] mb-2">
                  Envoyez-Nous un Message
                </h2>
                <p className="text-sm text-[var(--color-text-light)] mb-8">
                  Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.
                </p>
                <ContactForm />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-[var(--color-cream)]">
        <div className="container-narrow">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--color-gold)] mb-4 block">
              FAQ
            </span>
            <h2 className="font-[var(--font-heading)] text-3xl md:text-4xl font-bold text-[var(--color-charcoal)]">
              Questions Fréquentes
            </h2>
            <div className="divider-gold mx-auto mt-6" />
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white border border-[var(--color-cream-dark)]"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-[var(--font-heading)] text-lg font-semibold text-[var(--color-charcoal)] pr-4">
                    {item.question}
                  </span>
                  <ChevronDown
                    size={20}
                    className={`text-[var(--color-gold)] shrink-0 transition-transform duration-300 ${
                      openFaq === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6">
                        <p className="text-sm text-[var(--color-text-light)] leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding bg-[var(--color-primary-dark)]">
        <div className="container-luxury text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-[var(--font-heading)] text-3xl md:text-4xl font-bold text-white mb-6">
              Préférez-Vous Nous Appeler ?
            </h2>
            <p className="text-white/60 mb-8 max-w-md mx-auto">
              Nous sommes disponibles sur WhatsApp pour répondre à toutes vos questions en temps réel.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold"
            >
              <Phone size={16} />
              Contacter sur WhatsApp
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
