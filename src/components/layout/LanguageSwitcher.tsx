'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const languages = [
  { code: 'fr', label: 'Français', flag: 'FR' },
  { code: 'en', label: 'English', flag: 'EN' },
  { code: 'es', label: 'Español', flag: 'ES' },
  { code: 'it', label: 'Italiano', flag: 'IT' },
  { code: 'de', label: 'Deutsch', flag: 'DE' },
  { code: 'ar', label: 'العربية', flag: 'AR' },
];

interface LanguageSwitcherProps {
  light?: boolean;
}

export default function LanguageSwitcher({ light = false }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('fr');

  const current = languages.find((l) => l.code === currentLang) || languages[0];

  const handleSelect = (code: string) => {
    setCurrentLang(code);
    setIsOpen(false);

    // Set HTML dir for RTL
    if (code === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl');
      document.documentElement.setAttribute('lang', 'ar');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
      document.documentElement.setAttribute('lang', code);
    }

    // In production, this would trigger next-intl locale change
    // or redirect to /{locale}/current-path
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors rounded-sm',
          light
            ? 'text-white/70 hover:text-white'
            : 'text-[var(--color-text-light)] hover:text-[var(--color-text)]'
        )}
      >
        <Globe size={14} />
        <span>{current.flag}</span>
        <ChevronDown size={12} className={cn('transition-transform', isOpen && 'rotate-180')} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.15 }}
              className="absolute top-full right-0 mt-2 bg-white shadow-[var(--shadow-elevated)] border border-[var(--color-cream-dark)] min-w-[160px] py-1 z-50"
            >
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleSelect(lang.code)}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors text-left',
                    currentLang === lang.code
                      ? 'bg-[var(--color-cream)] text-[var(--color-gold)] font-medium'
                      : 'text-[var(--color-text)] hover:bg-[var(--color-cream)]'
                  )}
                >
                  <span className="text-xs font-mono w-5">{lang.flag}</span>
                  <span>{lang.label}</span>
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
