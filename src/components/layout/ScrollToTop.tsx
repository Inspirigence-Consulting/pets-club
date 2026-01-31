'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -4, 0],
          }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{
            opacity: { duration: 0.3 },
            scale: { duration: 0.3 },
            y: {
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          }}
          whileHover={{ scale: 1.1, y: 0 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-40 w-11 h-11 bg-[var(--color-primary)] text-white flex items-center justify-center shadow-lg hover:bg-[var(--color-primary-light)] transition-colors"
          aria-label="Retour en haut"
        >
          <ArrowUp size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
