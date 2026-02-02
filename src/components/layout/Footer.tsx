'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import { NAV_LINKS, WHATSAPP_URL, INSTAGRAM_URL, FACEBOOK_URL, SITE_NAME } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="bg-[#0a1a10] text-white/80 relative overflow-hidden">
      {/* Decorative top border */}
      <div className="h-px bg-gradient-to-r from-transparent via-[var(--color-gold)]/30 to-transparent" />

      {/* Background decorations */}
      <div className="absolute top-[20%] right-0 w-[400px] h-[400px] rounded-full bg-[var(--color-gold)]/[0.02] blur-3xl" />
      <div className="absolute bottom-0 left-[10%] w-[300px] h-[300px] rounded-full bg-[var(--color-primary)]/20 blur-3xl" />

      {/* CTA Banner */}
      <div className="container-luxury pt-16 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative p-10 md:p-14 border border-[var(--color-gold)]/10 bg-white/[0.02] backdrop-blur-sm text-center mb-16 rounded-2xl"
        >
          <div className="absolute top-0 left-0 w-12 h-[1px] bg-[var(--color-gold)]/40" />
          <div className="absolute top-0 left-0 w-[1px] h-12 bg-[var(--color-gold)]/40" />
          <div className="absolute bottom-0 right-0 w-12 h-[1px] bg-[var(--color-gold)]/40" />
          <div className="absolute bottom-0 right-0 w-[1px] h-12 bg-[var(--color-gold)]/40" />

          <h3 className="font-[var(--font-heading)] text-2xl md:text-3xl font-bold text-white mb-4">
            Prêt à rencontrer votre futur compagnon ?
          </h3>
          <p className="text-white/75 mb-8 max-w-md mx-auto">
            Consultez nos chiots disponibles ou écrivez-nous pour organiser une visite de l&apos;élevage.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[var(--color-gold)] to-[var(--color-gold-dark)] text-white text-sm font-medium uppercase tracking-[0.1em] hover:shadow-[0_8px_30px_rgba(197,165,90,0.3)] transition-all duration-500 hover:-translate-y-0.5 group"
          >
            Nous Contacter
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>

      {/* Main Footer */}
      <div className="container-luxury pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <span className="font-[var(--font-heading)] text-2xl font-bold text-white">
                Pet&apos;s Club
              </span>
              <br />
              <span className="text-[10px] tracking-[0.4em] uppercase text-[var(--color-gold)]">
                Maroc
              </span>
            </div>
            <p className="text-sm leading-relaxed text-white/70 mb-8">
              Éleveur de Spitz Nain et Berger Australien au Maroc depuis 2010.
              Lignées championnes, chiots socialisés en famille, accompagnement à vie.
            </p>
            <div className="flex gap-3">
              {[
                { href: INSTAGRAM_URL, icon: Instagram, label: 'Instagram' },
                { href: FACEBOOK_URL, icon: Facebook, label: 'Facebook' },
                { href: WHATSAPP_URL, icon: Phone, label: 'WhatsApp' },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center border border-white/15 text-white/70 hover:border-[var(--color-gold)]/50 hover:text-[var(--color-gold)] hover:bg-[var(--color-gold)]/[0.05] transition-all duration-500"
                  aria-label={label}
                >
                  <Icon size={16} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[var(--color-gold)] mb-8">
              Navigation
            </h4>
            <ul className="space-y-3.5">
              {NAV_LINKS.filter(l => !l.children).map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-[var(--color-gold-light)] hover:translate-x-1 inline-block transition-all duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Nos Races */}
          <div>
            <h4 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[var(--color-gold)] mb-8">
              Nos Races
            </h4>
            <ul className="space-y-3.5">
              {[
                { href: '/races/pomeranian', label: 'Spitz Nain (Pomeranian)' },
                { href: '/races/berger-australien', label: 'Berger Australien' },
                { href: '/chiots', label: 'Chiots Disponibles' },
                { href: '/elevage-ethique', label: 'Notre Éthique' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-white/70 hover:text-[var(--color-gold-light)] hover:translate-x-1 inline-block transition-all duration-300"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[var(--color-gold)] mb-8">
              Contact
            </h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-3">
                <MapPin size={14} className="text-[var(--color-gold)]/60 mt-1 shrink-0" />
                <span className="text-sm text-white/70">
                  8 Avenue Oqba - Agdal, Rabat
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={14} className="text-[var(--color-gold)]/60 mt-1 shrink-0" />
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/70 hover:text-[var(--color-gold-light)] transition-colors"
                >
                  +212 6 53 21 47 51
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={14} className="text-[var(--color-gold)]/60 mt-1 shrink-0" />
                <a
                  href="mailto:thepetsclubma@gmail.com"
                  className="text-sm text-white/70 hover:text-[var(--color-gold-light)] transition-colors"
                >
                  thepetsclubma@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.06]">
        <div className="container-luxury py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/55">
            &copy; {new Date().getFullYear()} {SITE_NAME}. Tous droits réservés. — Website réalisé par{' '}
            <a
              href="https://inspirigence-consulting.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-[var(--color-gold)] transition-colors"
            >
              Inspirigence
            </a>
          </p>
          <div className="flex gap-8 text-xs text-white/55">
            <Link href="/mentions-legales" className="hover:text-white/70 transition-colors">
              Mentions Légales
            </Link>
            <Link href="/politique-confidentialite" className="hover:text-white/70 transition-colors">
              Politique de Confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
