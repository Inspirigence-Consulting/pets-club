'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setVisible(false);
    // Enable analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'granted',
      });
    }
  };

  const handleReject = () => {
    localStorage.setItem('cookie-consent', 'rejected');
    setVisible(false);
    // Keep analytics disabled
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
      });
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 20 }}
          className="fixed bottom-0 left-0 right-0 z-[60] p-4 md:p-6"
        >
          <div className="container-luxury">
            <div className="bg-white border border-[var(--color-cream-dark)] shadow-[var(--shadow-elevated)] p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="flex-1">
                <h3 className="font-[var(--font-heading)] text-lg font-semibold text-[var(--color-charcoal)] mb-2">
                  Respect de votre vie privée
                </h3>
                <p className="text-sm text-[var(--color-text-light)] leading-relaxed">
                  Nous utilisons des cookies pour améliorer votre expérience sur notre site,
                  analyser le trafic et personnaliser le contenu. Vous pouvez accepter ou refuser
                  l&apos;utilisation de ces cookies.
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={handleReject}
                  className="px-5 py-2.5 text-sm font-medium text-[var(--color-text-light)] hover:text-[var(--color-text)] border border-[var(--color-cream-dark)] hover:border-[var(--color-text-muted)] transition-all"
                >
                  Refuser
                </button>
                <button
                  onClick={handleAccept}
                  className="btn-primary text-sm"
                >
                  Accepter
                </button>
              </div>
              <button
                onClick={handleReject}
                className="absolute top-3 right-3 md:hidden text-[var(--color-text-muted)]"
                aria-label="Fermer"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}
