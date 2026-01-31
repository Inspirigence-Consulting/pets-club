'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2, Check } from 'lucide-react';

export default function WaitingListForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    city: '',
    breedPreference: '',
    timeline: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/waiting-list', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
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
          <Check size={32} className="text-[var(--color-accent-sage)]" />
        </div>
        <h3 className="font-[var(--font-heading)] text-2xl font-bold text-[var(--color-charcoal)] mb-3">
          Inscription confirmée
        </h3>
        <p className="text-[var(--color-text-light)]">
          Vous êtes sur notre liste d&apos;attente. Nous vous contacterons dès qu&apos;un compagnon correspondant à vos attentes sera disponible.
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
            Race souhaitée
          </label>
          <select
            className="form-input"
            value={formData.breedPreference}
            onChange={(e) => setFormData({ ...formData, breedPreference: e.target.value })}
          >
            <option value="">Pas de préférence</option>
            <option value="pomeranian">Spitz Nain (Pomeranian)</option>
            <option value="berger-australien">Berger Australien</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
            Délai souhaité
          </label>
          <select
            className="form-input"
            value={formData.timeline}
            onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
          >
            <option value="">Flexible</option>
            <option value="1-3months">1 à 3 mois</option>
            <option value="3-6months">3 à 6 mois</option>
            <option value="6months+">Plus de 6 mois</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
          Message (optionnel)
        </label>
        <textarea
          rows={3}
          className="form-input resize-none"
          placeholder="Parlez-nous de vos attentes, préférences de couleur, genre..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        />
      </div>

      {error && (
        <p className="text-sm text-red-500 text-center">{error}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-gold w-full justify-center"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Inscription en cours...
          </>
        ) : (
          <>
            <Send size={16} />
            Rejoindre la Liste d&apos;Attente
          </>
        )}
      </button>
    </form>
  );
}
