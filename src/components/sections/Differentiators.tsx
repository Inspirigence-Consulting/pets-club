'use client';

import { motion } from 'framer-motion';
import { Trophy, Heart, Users, Shield } from 'lucide-react';
import { DIFFERENTIATORS } from '@/lib/constants';

const iconMap = {
  trophy: Trophy,
  heart: Heart,
  users: Users,
  shield: Shield,
};

export default function Differentiators() {
  return (
    <section className="section-padding bg-[var(--color-primary-dark)] noise-overlay relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--color-gold)]/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--color-gold)]/20 to-transparent" />
      <div className="absolute top-[20%] right-[5%] w-[300px] h-[300px] rounded-full bg-[var(--color-gold)]/[0.03] blur-3xl" />
      <div className="absolute bottom-[10%] left-[5%] w-[200px] h-[200px] rounded-full bg-[var(--color-gold)]/[0.02] blur-3xl" />

      <div className="container-luxury relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-[1px] bg-[var(--color-gold)]/40" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--color-gold-light)]">
              Pourquoi Nous Choisir
            </span>
            <div className="w-8 h-[1px] bg-[var(--color-gold)]/40" />
          </div>
          <h2 className="font-[var(--font-heading)] text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            L&apos;Excellence à Chaque Étape
          </h2>
          <p className="mt-6 text-lg text-white/50 max-w-2xl mx-auto leading-relaxed">
            Notre engagement pour le bien-être animal et la satisfaction de nos familles
            se reflète dans chaque aspect de notre élevage.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DIFFERENTIATORS.map((item, i) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="group relative"
              >
                <div className="relative p-8 border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm hover:border-[var(--color-gold)]/20 hover:bg-white/[0.05] hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)] transition-all duration-500 h-full">
                  {/* Corner accent */}
                  <div className="absolute top-0 left-0 w-6 h-[1px] bg-[var(--color-gold)]/30 group-hover:w-10 transition-all duration-500" />
                  <div className="absolute top-0 left-0 w-[1px] h-6 bg-[var(--color-gold)]/30 group-hover:h-10 transition-all duration-500" />

                  <div className="w-14 h-14 mb-6 flex items-center justify-center rounded-full border border-[var(--color-gold)]/20 bg-[var(--color-gold)]/[0.05] group-hover:border-[var(--color-gold)]/40 group-hover:bg-[var(--color-gold)]/[0.1] transition-all duration-500">
                    <Icon size={24} className="text-[var(--color-gold-light)] icon-bounce" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-[var(--font-heading)] text-xl font-semibold text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-white/40 leading-relaxed group-hover:text-white/60 transition-colors duration-500">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
