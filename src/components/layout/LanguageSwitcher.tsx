'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

// FR <-> EN path mapping (only the public buyer-journey pages have an English twin).
const TO_EN: Record<string, string> = {
  '/': '/en',
  '/chiots': '/en/chiots',
  '/contact': '/en/contact',
};
const TO_FR: Record<string, string> = {
  '/en': '/',
  '/en/chiots': '/chiots',
  '/en/contact': '/contact',
};

interface LanguageSwitcherProps {
  light?: boolean;
}

export default function LanguageSwitcher({ light = false }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();
  const isEn = pathname === '/en' || pathname.startsWith('/en/');

  const go = (lang: 'fr' | 'en') => {
    if (lang === 'en' && !isEn) {
      router.push(TO_EN[pathname] || '/en');
    } else if (lang === 'fr' && isEn) {
      router.push(TO_FR[pathname] || '/');
    }
  };

  return (
    <div
      className={cn(
        'flex items-center gap-1 text-xs font-semibold',
        light ? 'text-white/70' : 'text-[var(--color-text-light)]'
      )}
    >
      <Globe size={14} className="mr-1 opacity-70" />
      <button
        onClick={() => go('fr')}
        className={cn(
          'px-1.5 py-0.5 rounded transition-colors',
          !isEn ? 'text-[var(--color-gold)]' : 'opacity-70 hover:opacity-100'
        )}
      >
        FR
      </button>
      <span className="opacity-30">/</span>
      <button
        onClick={() => go('en')}
        className={cn(
          'px-1.5 py-0.5 rounded transition-colors',
          isEn ? 'text-[var(--color-gold)]' : 'opacity-70 hover:opacity-100'
        )}
      >
        EN
      </button>
    </div>
  );
}
