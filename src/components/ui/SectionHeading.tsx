'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  subtitle?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  light?: boolean;
}

export default function SectionHeading({
  subtitle,
  title,
  description,
  align = 'center',
  light = false,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      className={cn(
        'mb-12 md:mb-16',
        align === 'center' ? 'text-center' : 'text-left'
      )}
    >
      {subtitle && (
        <span className={cn(
          'inline-block text-xs font-semibold tracking-[0.2em] uppercase mb-4',
          light ? 'text-[var(--color-gold-light)]' : 'text-[var(--color-gold)]'
        )}>
          {subtitle}
        </span>
      )}
      <h2 className={cn(
        'font-[var(--font-heading)] text-3xl md:text-4xl lg:text-5xl font-bold mb-4',
        light ? 'text-white' : 'text-[var(--color-charcoal)]'
      )}>
        {title}
      </h2>
      <div className={cn(
        'divider-gold mx-auto mt-6',
        align === 'left' && 'mx-0'
      )} />
      {description && (
        <p className={cn(
          'mt-6 text-lg max-w-2xl leading-relaxed',
          align === 'center' && 'mx-auto',
          light ? 'text-white/70' : 'text-[var(--color-text-light)]'
        )}>
          {description}
        </p>
      )}
    </motion.div>
  );
}
