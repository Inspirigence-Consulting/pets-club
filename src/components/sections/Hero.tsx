'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-black overflow-hidden flex items-center">
      {/* Hero dog image - right side, large with rounded corners */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className="absolute top-[100px] right-0 w-[50%] h-[683px] hidden lg:block"
      >
        <div className="relative w-full h-full rounded-[105px] overflow-hidden">
          <Image
            src="/images/hero-dog.png"
            alt="Berger Australien - The Pets Club Maroc"
            fill
            className="object-cover object-center"
            priority
            sizes="(max-width: 1024px) 0vw, 50vw"
          />
        </div>
      </motion.div>

      {/* Mobile dog image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute inset-0 lg:hidden"
      >
        <Image
          src="/images/hero-dog.png"
          alt="Berger Australien"
          fill
          className="object-cover object-right-top opacity-30"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40" />
      </motion.div>

      {/* Bottom gradient ellipse - CSS recreation of the Figma blurred ellipse */}
      <div
        className="absolute bottom-[-30px] left-[35%] w-[80%] h-[110px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.8) 0%, transparent 70%)',
          filter: 'blur(30px)',
        }}
        aria-hidden="true"
      />

      {/* Content - left side */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 lg:px-[120px] pt-[160px] pb-[120px] lg:pt-[200px] lg:pb-[160px]">
        <div className="max-w-[612px]">
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="text-white text-[28px] md:text-[32px] lg:text-[34px] font-black leading-[1.12] uppercase"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Des chiots de lignées championnes,
            <br />
            élevés en famille au Maroc.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8 text-[#eee] text-[15px] md:text-[16px] leading-relaxed max-w-[563px]"
            style={{ fontFamily: 'var(--font-subtitle)' }}
          >
            Spitz Nain et Berger Australien issus de reproducteurs titrés.
            Tests génétiques, carnet de santé complet et suivi après adoption.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-12 flex flex-wrap gap-4"
          >
            <Link
              href="/chiots"
              className="inline-flex items-center justify-center px-7 py-4 rounded-full bg-gradient-to-r from-[var(--color-gold)] to-[var(--color-gold-dark)] text-white text-[14px] lg:text-[15px] font-semibold tracking-wide hover:shadow-[0_6px_24px_rgba(197,165,90,0.45)] hover:-translate-y-0.5 transition-all duration-300"
            >
              Voir les chiots disponibles
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-7 py-4 rounded-full border border-white/30 text-white text-[14px] lg:text-[15px] font-semibold tracking-wide hover:bg-white/10 hover:border-white/50 transition-all duration-300"
            >
              Nous écrire
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
