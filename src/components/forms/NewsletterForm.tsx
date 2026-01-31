'use client';

import { useState } from 'react';
import { ArrowRight, Loader2, Check } from 'lucide-react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setIsSubmitted(true);
      }
    } catch {
      // Silently handle - show success anyway for UX
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="flex items-center gap-3 text-[var(--color-accent-sage)]">
        <Check size={20} />
        <span className="text-sm">Merci ! Vous recevrez bientôt de nos nouvelles.</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-0">
      <input
        type="email"
        required
        placeholder="Votre adresse email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="form-input flex-1 border-r-0"
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="px-6 bg-[var(--color-gold)] text-white hover:bg-[var(--color-gold-dark)] transition-colors flex items-center"
      >
        {isSubmitting ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <ArrowRight size={16} />
        )}
      </button>
    </form>
  );
}
