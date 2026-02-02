'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Heart, MessageCircle, X, Grid3X3, ExternalLink } from 'lucide-react';
import { INSTAGRAM_URL } from '@/lib/constants';
import { cldImg } from '@/lib/cloudinary';

const PROFILE = {
  username: 'thepetsclubmaroc',
  fullName: 'The Pets Club',
  posts: 260,
  followers: '11.6k',
  following: 771,
  bio: [
    'Élevage éthique professionnel',
    '🐶 Bouledogue français',
    '🦊 Spitz pomeranian',
    '🐕 Berger australien',
    '📩 Suivi et accompagnement de A à Z',
  ],
};

const instagramPosts = [
  { id: '1', image: cldImg('visual-showcase/after_WhatsApp Image 2026-01-28 at 16.50.15', 'w_600,h_600,c_fill,g_auto,q_auto,f_auto'), imageLarge: cldImg('visual-showcase/after_WhatsApp Image 2026-01-28 at 16.50.15', 'w_1200,h_1200,c_fill,g_auto,q_auto,f_auto'), likes: '2.4k', comments: '48' },
  { id: '2', image: cldImg('visual-showcase/before_WhatsApp Image 2026-01-28 at 17.06.36', 'w_600,h_600,c_fill,g_auto,q_auto,f_auto'), imageLarge: cldImg('visual-showcase/before_WhatsApp Image 2026-01-28 at 17.06.36', 'w_1200,h_1200,c_fill,g_auto,q_auto,f_auto'), likes: '1.8k', comments: '32' },
  { id: '3', image: cldImg('visual-showcase/after_WhatsApp Image 2026-01-28 at 16.15.24 (1)', 'w_600,h_600,c_fill,g_auto,q_auto,f_auto'), imageLarge: cldImg('visual-showcase/after_WhatsApp Image 2026-01-28 at 16.15.24 (1)', 'w_1200,h_1200,c_fill,g_auto,q_auto,f_auto'), likes: '3.1k', comments: '67' },
  { id: '4', image: cldImg('visual-showcase/before_WhatsApp Image 2026-01-28 at 15.23.28 (4)', 'w_600,h_600,c_fill,g_auto,q_auto,f_auto'), imageLarge: cldImg('visual-showcase/before_WhatsApp Image 2026-01-28 at 15.23.28 (4)', 'w_1200,h_1200,c_fill,g_auto,q_auto,f_auto'), likes: '2.7k', comments: '41' },
  { id: '5', image: cldImg('visual-showcase/before_WhatsApp Image 2026-01-28 at 15.23.28 (6)', 'w_600,h_600,c_fill,g_auto,q_auto,f_auto'), imageLarge: cldImg('visual-showcase/before_WhatsApp Image 2026-01-28 at 15.23.28 (6)', 'w_1200,h_1200,c_fill,g_auto,q_auto,f_auto'), likes: '1.5k', comments: '28' },
  { id: '6', image: cldImg('visual-showcase/after_WhatsApp Image 2026-01-28 at 17.25.03', 'w_600,h_600,c_fill,g_auto,q_auto,f_auto'), imageLarge: cldImg('visual-showcase/after_WhatsApp Image 2026-01-28 at 17.25.03', 'w_1200,h_1200,c_fill,g_auto,q_auto,f_auto'), likes: '4.2k', comments: '89' },
];

export default function InstagramFeed() {
  const [selectedPost, setSelectedPost] = useState<typeof instagramPosts[number] | null>(null);

  const closeLightbox = useCallback(() => setSelectedPost(null), []);

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container-luxury max-w-[935px]">
        {/* Instagram Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-6 md:gap-12 mb-10 px-4"
        >
          {/* Profile picture */}
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0"
          >
            <div className="w-20 h-20 md:w-[150px] md:h-[150px] rounded-full p-[3px] bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full rounded-full bg-white p-[3px]">
                <div className="w-full h-full rounded-full bg-white overflow-hidden flex items-center justify-center">
                  <Image
                    src="/images/logo-pets-club-white.png"
                    alt={PROFILE.fullName}
                    width={150}
                    height={150}
                    className="w-[60%] h-auto object-contain invert"
                  />
                </div>
              </div>
            </div>
          </a>

          {/* Profile info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <h3
                className="text-xl md:text-2xl font-semibold text-[var(--color-charcoal)]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {PROFILE.username}
              </h3>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#0095f6] text-white text-sm font-semibold hover:bg-[#1877f2] transition-colors"
              >
                Suivre
              </a>
            </div>

            {/* Stats */}
            <div className="hidden md:flex items-center gap-8 mb-3">
              <span className="text-sm text-[var(--color-text)]">
                <strong className="font-semibold">{PROFILE.posts}</strong> publications
              </span>
              <span className="text-sm text-[var(--color-text)]">
                <strong className="font-semibold">{PROFILE.followers}</strong> followers
              </span>
              <span className="text-sm text-[var(--color-text)]">
                <strong className="font-semibold">{PROFILE.following}</strong> suivi(e)s
              </span>
            </div>

            {/* Bio */}
            <div className="hidden md:block">
              <p className="text-sm font-semibold text-[var(--color-charcoal)]">
                {PROFILE.fullName}
              </p>
              {PROFILE.bio.map((line, i) => (
                <p key={i} className="text-sm text-[var(--color-text-light)] leading-snug">
                  {line}
                </p>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Mobile stats row */}
        <div className="flex md:hidden items-center justify-around py-3 border-t border-b border-[var(--color-cream-dark)] mb-3">
          <div className="text-center">
            <p className="text-sm font-semibold text-[var(--color-charcoal)]">{PROFILE.posts}</p>
            <p className="text-[11px] text-[var(--color-text-muted)]">publications</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-[var(--color-charcoal)]">{PROFILE.followers}</p>
            <p className="text-[11px] text-[var(--color-text-muted)]">followers</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-[var(--color-charcoal)]">{PROFILE.following}</p>
            <p className="text-[11px] text-[var(--color-text-muted)]">suivi(e)s</p>
          </div>
        </div>

        {/* Grid tab indicator */}
        <div className="flex items-center justify-center gap-2 py-3 border-t border-[var(--color-cream-dark)] mb-1">
          <Grid3X3 size={14} className="text-[var(--color-charcoal)]" />
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-charcoal)]">
            Publications
          </span>
        </div>

        {/* Photo Grid - 3-column Instagram style */}
        <div className="grid grid-cols-3 gap-1 md:gap-4">
          {instagramPosts.map((post, i) => (
            <motion.button
              key={post.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              onClick={() => setSelectedPost(post)}
              className="aspect-square relative group overflow-hidden bg-[var(--color-cream)] rounded-md md:rounded-lg cursor-pointer"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{
                  backgroundImage: `url(${post.image})`,
                  backgroundColor: 'var(--color-cream-dark)',
                }}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                <div className="flex items-center gap-4 md:gap-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-90 group-hover:scale-100">
                  <span className="flex items-center gap-1.5 text-white text-sm font-bold">
                    <Heart size={18} className="fill-white" />
                    {post.likes}
                  </span>
                  <span className="flex items-center gap-1.5 text-white text-sm font-bold">
                    <MessageCircle size={18} className="fill-white" />
                    {post.comments}
                  </span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* View on Instagram link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-gold)] transition-colors group"
          >
            Voir plus sur Instagram
            <ExternalLink size={14} className="transition-transform group-hover:translate-x-0.5" />
          </a>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lightbox-overlay"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="relative max-w-[90vw] max-h-[85vh] w-[600px]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={closeLightbox}
                className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors z-10"
                aria-label="Fermer"
              >
                <X size={28} />
              </button>

              {/* Image */}
              <div className="w-full aspect-square rounded-lg overflow-hidden bg-black">
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${selectedPost.imageLarge})`,
                  }}
                />
              </div>

              {/* Info bar */}
              <div className="flex items-center gap-6 mt-4">
                <span className="flex items-center gap-2 text-white/80 text-sm font-medium">
                  <Heart size={18} className="text-red-400 fill-red-400" />
                  {selectedPost.likes}
                </span>
                <span className="flex items-center gap-2 text-white/80 text-sm font-medium">
                  <MessageCircle size={18} />
                  {selectedPost.comments}
                </span>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto flex items-center gap-1.5 text-white/50 hover:text-white text-sm transition-colors"
                >
                  <Instagram size={16} />
                  Voir sur Instagram
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
