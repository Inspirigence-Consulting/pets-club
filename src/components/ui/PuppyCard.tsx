'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart, MapPin } from 'lucide-react';
import { cn, calculateAge } from '@/lib/utils';
import { PUPPY_STATUSES } from '@/lib/constants';
import type { Puppy } from '@/lib/mock-data';

interface PuppyCardProps {
  puppy: Puppy;
  index?: number;
  variant?: 'grid' | 'feed';
}

export default function PuppyCard({ puppy, index = 0, variant = 'grid' }: PuppyCardProps) {
  const status = PUPPY_STATUSES[puppy.status];
  const isSold = puppy.status === 'sold';

  if (variant === 'feed') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.05, ease: [0.23, 1, 0.32, 1] }}
      >
        <Link href={`/chiots/${puppy.slug}`} className="block group relative">
          <div className={cn(
            'aspect-square relative overflow-hidden bg-[var(--color-cream)] rounded-lg',
            isSold && 'after:absolute after:inset-0 after:bg-black/30 after:z-10'
          )}>
            <Image
              src={puppy.image}
              alt={`${puppy.name} - ${puppy.breedLabel}`}
              fill
              className="object-cover object-center transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="text-center text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <Heart size={24} className="mx-auto mb-2" />
                <span className="text-xs uppercase tracking-widest">Voir</span>
              </div>
            </div>
            {/* Status badge */}
            <div className="absolute top-3 left-3 z-30">
              <span className={cn(
                'inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm rounded-md',
                puppy.status === 'available' && 'bg-[var(--color-accent-sage)]/90',
                puppy.status === 'reserved' && 'bg-[var(--color-accent-terracotta)]/90',
                puppy.status === 'coming' && 'bg-[var(--color-gold)]/90',
                puppy.status === 'sold' && 'bg-black/60'
              )}>
                <span className={cn(
                  'status-dot',
                  `status-dot-${puppy.status}`
                )} style={{ width: 6, height: 6 }} />
                {status.label}
              </span>
            </div>
            {/* Name overlay at bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent z-20">
              <p className="text-white text-sm font-semibold">{puppy.name}</p>
              <p className="text-white/75 text-[11px]">{puppy.breedLabel}</p>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.23, 1, 0.32, 1] }}
      className="card-luxury group rounded-2xl overflow-hidden"
    >
      <Link href={`/chiots/${puppy.slug}`}>
        {/* Image */}
        <div className={cn(
          'relative aspect-[4/5] overflow-hidden bg-[var(--color-cream)]',
          isSold && 'after:absolute after:inset-0 after:bg-black/20 after:z-10'
        )}>
          <Image
            src={puppy.image}
            alt={`${puppy.name} - ${puppy.breedLabel}`}
            fill
            className="object-cover object-center transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          {/* Status badge */}
          <div className="absolute top-4 left-4 z-20">
            <span className={cn('badge-luxury', status.class)}>
              {status.label}
            </span>
          </div>
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
          <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] translate-y-1 group-hover:translate-y-0 z-20">
            <span className="btn-gold text-xs w-full justify-center">
              En savoir plus
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="p-5">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-[var(--color-charcoal)]">
              {puppy.name}
            </h3>
            <span className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider">
              {puppy.gender === 'male' ? 'Male' : 'Femelle'}
            </span>
          </div>

          <p className="text-sm text-[var(--color-gold)] font-medium mb-3">
            {puppy.breedLabel} &middot; {puppy.line}
          </p>

          <div className="flex items-center gap-4 text-xs text-[var(--color-text-muted)]">
            <span className="flex items-center gap-1">
              <Heart size={12} />
              {calculateAge(puppy.dob)}
            </span>
            <span className="flex items-center gap-1">
              <MapPin size={12} />
              {puppy.color}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
