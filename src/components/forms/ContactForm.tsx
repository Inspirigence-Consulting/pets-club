'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2 } from 'lucide-react';
import { FORM_SUBJECTS } from '@/lib/constants';

interface ContactFormProps {
  defaultSubject?: string;
  puppyName?: string;
}

export default function ContactForm({ defaultSubject = 'general', puppyName }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    city: '',
    subject: defaultSubject,
    message: puppyName ? `Je suis intéressé(e) par ${puppyName}.` : '',
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
        setError(data.error || 'Une erreur est survenue.');
        return;
      }

      setIsSubmitted(true);
    } catch {
      setError('Erreur de connexion. Veuillez réessayer.');
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
          Message envoyé
        </h3>
        <p className="text-[var(--color-text-light)]">
          Merci pour votre message. Notre équipe vous contactera dans les plus brefs délais.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
            Nom complet *
          </label>
          <input
            type="text"
            required
            className="form-input"
            placeholder="Votre nom"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
            Email *
          </label>
          <input
            type="email"
            required
            className="form-input"
            placeholder="votre@email.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
            WhatsApp *
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
            Ville
          </label>
          <input
            type="text"
            className="form-input"
            placeholder="Votre ville"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
          Objet de votre demande *
        </label>
        <select
          required
          className="form-input"
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
        >
          {FORM_SUBJECTS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
          Message
        </label>
        <textarea
          rows={4}
          className="form-input resize-none"
          placeholder="Parlez-nous de vos attentes..."
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
            Envoi en cours...
          </>
        ) : (
          <>
            <Send size={16} />
            Envoyer
          </>
        )}
      </button>

      {error && (
        <p className="text-sm text-red-500 text-center">{error}</p>
      )}

      <p className="text-xs text-[var(--color-text-muted)] text-center">
        En soumettant ce formulaire, vous acceptez notre politique de confidentialité.
      </p>
    </form>
  );
}
