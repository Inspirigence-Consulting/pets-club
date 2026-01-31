'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { WHATSAPP_URL } from '@/lib/constants';

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  const [tooltip, setTooltip] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000);
    const tooltipTimer = setTimeout(() => setTooltip(false), 8000);
    return () => {
      clearTimeout(timer);
      clearTimeout(tooltipTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end gap-3">
      <AnimatePresence>
        {tooltip && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="bg-white rounded-lg shadow-[var(--shadow-elevated)] p-4 max-w-[200px] relative"
          >
            <button
              onClick={() => setTooltip(false)}
              className="absolute top-1 right-1 text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
              aria-label="Fermer"
            >
              <X size={14} />
            </button>
            <p className="text-sm text-[var(--color-text)]">
              Une question ? Contactez-nous sur WhatsApp !
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative">
        {/* Pulse rings */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-[pulseRing_2s_ease-out_infinite]" />
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-[pulseRing_2s_ease-out_1s_infinite]" />

        <motion.a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
          aria-label="Contactez-nous sur WhatsApp"
        >
          <MessageCircle size={26} className="text-white" fill="white" />
        </motion.a>
      </div>
    </div>
  );
}
