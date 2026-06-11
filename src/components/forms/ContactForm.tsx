'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2 } from 'lucide-react';
import { FORM_SUBJECTS } from '@/lib/constants';

interface ContactFormProps {
  defaultSubject?: string;
  puppyName?: string;
  lang?: 'fr' | 'en';
}

const SUBJECTS_EN = [
  { value: 'general', label: 'General enquiry' },
  { value: 'reserve', label: 'Reserve a companion' },
  { value: 'visit', label: 'Schedule a visit' },
  { value: 'video-call', label: 'Schedule a video call' },
  { value: 'waiting-list', label: 'Join the waiting list' },
];

const COPY = {
  fr: {
    successTitle: 'Message envoyé',
    successBody: 'Merci pour votre message. Notre équipe vous contactera dans les plus brefs délais.',
    name: 'Nom complet *',
    namePh: 'Votre nom',
    email: 'Email',
    emailPh: 'votre@email.com (facultatif)',
    whatsapp: 'WhatsApp *',
    city: 'Ville',
    cityPh: 'Votre ville',
    subject: 'Objet de votre demande *',
    message: 'Message',
    messagePh: 'Parlez-nous de vos attentes...',
    sending: 'Envoi en cours...',
    send: 'Envoyer',
    err: 'Une erreur est survenue.',
    connErr: 'Erreur de connexion. Veuillez réessayer.',
    privacy: 'En soumettant ce formulaire, vous acceptez notre politique de confidentialité.',
    interested: (p: string) => `Je suis intéressé(e) par ${p}.`,
  },
  en: {
    successTitle: 'Message sent',
    successBody: 'Thank you for reaching out. Our team will get back to you shortly.',
    name: 'Full name *',
    namePh: 'Your name',
    email: 'Email',
    emailPh: 'you@email.com (optional)',
    whatsapp: 'WhatsApp *',
    city: 'City',
    cityPh: 'Your city',
    subject: 'How can we help? *',
    message: 'Message',
    messagePh: 'Tell us what you are looking for...',
    sending: 'Sending...',
    send: 'Send',
    err: 'Something went wrong.',
    connErr: 'Connection error. Please try again.',
    privacy: 'By submitting this form, you accept our privacy policy.',
    interested: (p: string) => `I'm interested in ${p}.`,
  },
};

export default function ContactForm({ defaultSubject = 'general', puppyName, lang = 'fr' }: ContactFormProps) {
  const t = COPY[lang];
  const subjects = lang === 'en' ? SUBJECTS_EN : FORM_SUBJECTS;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    city: '',
    subject: defaultSubject,
    message: puppyName ? t.interested(puppyName) : '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Capture UTM params from URL
      const urlParams = new URLSearchParams(window.location.search);
      const utmParams = {
        utm_source: urlParams.get('utm_source') || '',
        utm_medium: urlParams.get('utm_medium') || '',
        utm_campaign: urlParams.get('utm_campaign') || '',
      };

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          puppyName,
          source: window.location.pathname,
          ...utmParams,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || t.err);
        return;
      }

      setIsSubmitted(true);
    } catch {
      setError(t.connErr);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[var(--color-accent-sage)]/10 flex items-center justify-center">
          <svg className="w-8 h-8 text-[var(--color-accent-sage)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-[var(--font-heading)] text-2xl font-bold text-[var(--color-charcoal)] mb-3">
          {t.successTitle}
        </h3>
        <p className="text-[var(--color-text-light)]">
          {t.successBody}
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
            {t.name}
          </label>
          <input
            type="text"
            required
            className="form-input"
            placeholder={t.namePh}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
            {t.email}
          </label>
          <input
            type="email"
            className="form-input"
            placeholder={t.emailPh}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
            {t.whatsapp}
          </label>
          <input
            type="tel"
            required
            className="form-input"
            placeholder="+212 6XX XXX XXX"
            value={formData.whatsapp}
            onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
            {t.city}
          </label>
          <input
            type="text"
            className="form-input"
            placeholder={t.cityPh}
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
          {t.subject}
        </label>
        <select
          required
          className="form-input"
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
        >
          {subjects.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
          {t.message}
        </label>
        <textarea
          rows={4}
          className="form-input resize-none"
          placeholder={t.messagePh}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full justify-center"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            {t.sending}
          </>
        ) : (
          <>
            <Send size={16} />
            {t.send}
          </>
        )}
      </button>

      {error && (
        <p className="text-sm text-red-500 text-center">{error}</p>
      )}

      <p className="text-xs text-[var(--color-text-muted)] text-center">
        {t.privacy}
      </p>
    </form>
  );
}
