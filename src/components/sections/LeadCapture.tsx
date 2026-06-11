'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Video, FileText } from 'lucide-react';
import ContactForm from '@/components/forms/ContactForm';

const POINTS = [
  {
    icon: ShieldCheck,
    title: 'Chiots sante verifiee',
    text: 'Vaccines, vermifuges, puce electronique et carnet a jour avant le depart.',
  },
  {
    icon: Video,
    title: "Appel video avant de decider",
    text: 'Voyez votre chiot en direct, posez vos questions, choisissez en confiance.',
  },
  {
    icon: FileText,
    title: 'Contrat et suivi a vie',
    text: 'Reservation par contrat ecrit et accompagnement apres adoption.',
  },
];

export default function LeadCapture() {
  return (
    <section id="reserver" className="section-padding bg-[var(--color-cream)] scroll-mt-24">
      <div className="container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: pitch */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[1px] bg-[var(--color-gold)]/50" />
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--color-gold)]">
                Reserver un chiot
              </span>
            </div>
            <h2 className="font-[var(--font-heading)] text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-charcoal)] mb-5">
              Laissez vos coordonnees, nous vous rappelons
            </h2>
            <p className="text-[var(--color-text-light)] leading-relaxed mb-8 max-w-md">
              Dites-nous la race qui vous interesse et votre ville. Notre equipe vous
              contacte sur WhatsApp avec les chiots disponibles et organise un appel video.
            </p>

            <div className="space-y-5">
              {POINTS.map((p) => (
                <div key={p.title} className="flex gap-4">
                  <div className="shrink-0 w-11 h-11 rounded-full bg-[var(--color-gold)]/10 flex items-center justify-center">
                    <p.icon size={20} className="text-[var(--color-gold)]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--color-charcoal)] mb-1">
                      {p.title}
                    </h3>
                    <p className="text-sm text-[var(--color-text-light)] leading-relaxed">
                      {p.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: form card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="bg-white rounded-2xl shadow-xl shadow-black/[0.04] border border-[var(--color-charcoal)]/[0.06] p-7 md:p-9"
          >
            <ContactForm defaultSubject="reserve" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
