'use client';

import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { TRUST_BADGES } from '@/lib/constants';
import { Trophy, Heart, ShieldCheck, Star } from 'lucide-react';

const icons = [Trophy, Star, ShieldCheck, Heart];

function AnimatedNumber({ value }: { value: string }) {
  const num = parseInt(value.replace(/\D/g, ''));
  const suffix = value.replace(/\d/g, '');
  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (v) => Math.round(v));
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const unsubscribe = rounded.on('change', (v) => {
      if (ref.current) ref.current.textContent = v + suffix;
    });
    return () => unsubscribe();
  }, [rounded, suffix]);

  return (
    <motion.span
      ref={ref}
      onViewportEnter={() => {
        animate(motionVal, num, { duration: 2, ease: 'easeOut' });
      }}
    >
      0{suffix}
    </motion.span>
  );
}

export default function TrustBadges() {
  return (
    <section className="relative -mt-12 z-20">
      <div className="container-luxury">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white/80 backdrop-blur-xl shadow-[0_8px_60px_rgba(0,0,0,0.08)] border border-[var(--color-gold)]/10 rounded-2xl"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {TRUST_BADGES.map((badge, i) => {
              const Icon = icons[i];
              return (
                <motion.div
                  key={badge.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className="relative p-8 md:p-10 text-center border-b lg:border-b-0 border-r border-[var(--color-cream-dark)]/50 last:border-r-0 [&:nth-child(2)]:border-r-0 lg:[&:nth-child(2)]:border-r group hover:bg-[var(--color-cream)]/30 transition-all duration-500 hover:-translate-y-1"
                >
                  <div className="w-10 h-10 mx-auto mb-4 flex items-center justify-center rounded-full bg-[var(--color-gold)]/[0.08] group-hover:bg-[var(--color-gold)]/[0.15] transition-colors duration-500">
                    <Icon size={18} className="text-[var(--color-gold)] group-hover:scale-125 transition-transform duration-300" strokeWidth={1.5} />
                  </div>
                  <span className="block font-[var(--font-heading)] text-3xl md:text-4xl font-bold text-[var(--color-gold)] mb-2">
                    <AnimatedNumber value={badge.number} />
                  </span>
                  <span className="text-xs tracking-[0.1em] uppercase text-[var(--color-text-light)]">
                    {badge.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
