'use client';

import { motion } from 'framer-motion';
import NewsletterForm from '@/components/forms/NewsletterForm';

export default function Newsletter() {
  return (
    <section className="py-20 md:py-28 bg-[var(--color-primary-dark)] noise-overlay relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--color-gold)]/20 to-transparent" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-gold)]/[0.03] rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[var(--color-gold)]/[0.02] rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />

      {/* Geometric accent */}
      <div className="absolute top-[20%] right-[10%] w-[200px] h-[200px] pointer-events-none">
        <div className="absolute inset-0 rounded-full border border-[var(--color-gold)]/[0.06]" />
        <div className="absolute inset-4 rounded-full border border-[var(--color-gold)]/[0.04]" />
      </div>

      <div className="container-narrow relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-[1px] bg-[var(--color-gold)]/40" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--color-gold-light)]">
              Newsletter
            </span>
            <div className="w-8 h-[1px] bg-[var(--color-gold)]/40" />
          </div>
          <h2 className="font-[var(--font-heading)] text-3xl md:text-4xl font-bold text-white mb-4">
            Ne ratez aucune portée
          </h2>
          <p className="mt-4 text-white/75 max-w-md mx-auto leading-relaxed">
            Inscrivez-vous pour recevoir les annonces de nouvelles naissances,
            nos conseils pour futurs propriétaires et les coulisses de l&apos;élevage.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-md mx-auto"
        >
          <NewsletterForm />
        </motion.div>
      </div>
    </section>
  );
}
