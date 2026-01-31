'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  location: string;
  text: string;
  breed: string;
  image?: string;
  index?: number;
}

export default function TestimonialCard({
  name,
  location,
  text,
  breed,
  image,
  index = 0,
}: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="relative bg-white p-8 md:p-10 group hover:shadow-[0_8px_40px_rgba(197,165,90,0.08)] transition-all duration-700"
    >
      {/* Top gold accent */}
      <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-[var(--color-gold)]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      {/* Stars */}
      <div className="flex gap-1 mb-6">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={14} className="text-[var(--color-gold)] fill-[var(--color-gold)]" />
        ))}
      </div>

      <p className="text-[var(--color-text)] leading-relaxed mb-8 text-[15px]">
        &ldquo;{text}&rdquo;
      </p>

      <div className="flex items-center gap-4 pt-6 border-t border-[var(--color-cream-dark)]">
        <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[var(--color-gold)]/20 shrink-0">
          {image ? (
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${image})`, backgroundColor: 'var(--color-cream)' }}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] flex items-center justify-center">
              <span className="text-sm font-bold text-[var(--color-gold-light)]">
                {name.charAt(0)}
              </span>
            </div>
          )}
        </div>
        <div>
          <p className="text-sm font-semibold text-[var(--color-charcoal)]">{name}</p>
          <p className="text-xs text-[var(--color-text-muted)]">
            {location} &middot; <span className="text-[var(--color-gold)]">{breed}</span>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
