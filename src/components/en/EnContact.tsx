'use client';

import { Phone, Instagram } from 'lucide-react';
import { WHATSAPP_URL, INSTAGRAM_URL } from '@/lib/constants';
import ContactForm from '@/components/forms/ContactForm';

export default function EnContact({ puppy }: { puppy?: string }) {
  return (
    <>
      <section className="relative pt-40 pb-24 bg-[#0a1a10] overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--color-gold)]/20 to-transparent" />
        <div className="container-luxury relative z-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-[1px] bg-[var(--color-gold)]/40" />
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[var(--color-gold-light)]">
              Contact
            </span>
            <div className="w-8 h-[1px] bg-[var(--color-gold)]/40" />
          </div>
          <h1 className="font-[var(--font-heading)] text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Let&apos;s talk about your <span className="text-gradient-gold italic">future companion</span>
          </h1>
          <p className="text-lg text-white/75 max-w-xl mx-auto leading-relaxed">
            Reservation, a visit to the cattery, or a question about a breed or a specific puppy.
            We reply within 24 hours.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="font-[var(--font-heading)] text-2xl font-bold text-[var(--color-charcoal)] mb-4">
                  Reach us directly
                </h2>
                <p className="text-[var(--color-text-light)] leading-relaxed">
                  The fastest way is WhatsApp. We share photos, videos and arrange a live call so
                  you can see your puppy before you decide.
                </p>
              </div>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 rounded-xl border border-[var(--color-cream-dark)] hover:border-[var(--color-gold)]/40 transition-colors"
              >
                <div className="w-11 h-11 rounded-full bg-[var(--color-gold)]/10 flex items-center justify-center shrink-0">
                  <Phone size={20} className="text-[var(--color-gold)]" />
                </div>
                <div>
                  <p className="font-semibold text-[var(--color-charcoal)]">WhatsApp</p>
                  <p className="text-sm text-[var(--color-text-light)]">+212 6 53 21 47 51</p>
                </div>
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 rounded-xl border border-[var(--color-cream-dark)] hover:border-[var(--color-gold)]/40 transition-colors"
              >
                <div className="w-11 h-11 rounded-full bg-[var(--color-gold)]/10 flex items-center justify-center shrink-0">
                  <Instagram size={20} className="text-[var(--color-gold)]" />
                </div>
                <div>
                  <p className="font-semibold text-[var(--color-charcoal)]">Instagram</p>
                  <p className="text-sm text-[var(--color-text-light)]">@thepetsclubmaroc</p>
                </div>
              </a>
            </div>

            <div className="lg:col-span-3 bg-white rounded-2xl shadow-xl shadow-black/[0.04] border border-[var(--color-charcoal)]/[0.06] p-7 md:p-9">
              <ContactForm lang="en" defaultSubject={puppy ? 'reserve' : 'general'} puppyName={puppy} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
