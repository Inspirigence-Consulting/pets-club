'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { label: 'Accueil', href: '/' },
  { label: 'Notre Histoire', href: '/a-propos' },
  {
    label: 'Nos Races',
    href: '#',
    children: [
      { label: 'Spitz Nain (Pomeranian)', href: '/races/pomeranian' },
      { label: 'Berger Australien', href: '/races/berger-australien' },
    ],
  },
  { label: 'Élevage Éthique', href: '/elevage-ethique' },
  { label: 'Galerie', href: '/galerie' },
  { label: 'Communauté', href: '/communaute' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileSubOpen, setMobileSubOpen] = useState(false);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleDropdownEnter = () => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => setDropdownOpen(false), 150);
  };

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 h-[88px] flex items-center transition-all duration-500',
          scrolled
            ? 'backdrop-blur-[13px] bg-black/70 shadow-[0_2px_20px_rgba(0,0,0,0.3)]'
            : 'backdrop-blur-[13px] bg-black/40'
        )}
      >
        <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-[80px] flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-10 shrink-0">
            <Image
              src="/images/logo-pets-club-white.png"
              alt="The Pets Club"
              width={170}
              height={36}
              className="h-[36px] w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6" style={{ fontFamily: 'var(--font-display)' }}>
            {NAV_ITEMS.map((item) => (
              item.children ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={handleDropdownEnter}
                  onMouseLeave={handleDropdownLeave}
                >
                  <button
                    className="nav-link-underline text-[14px] font-semibold text-white/50 hover:text-white transition-colors duration-300 flex items-center gap-1"
                  >
                    {item.label}
                    <ChevronDown size={14} className={cn('transition-transform duration-200', dropdownOpen && 'rotate-180')} />
                  </button>
                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-3"
                      >
                        <div className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl py-2 min-w-[220px] shadow-2xl">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="block px-5 py-2.5 text-[13px] font-medium text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="nav-link-underline text-[14px] font-semibold text-white/50 hover:text-white transition-colors duration-300"
                >
                  {item.label}
                </Link>
              )
            ))}
          </nav>

          {/* Right side: CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/chiots" className="glass-btn text-[13px]">
              Nos Chiots
            </Link>
            <Link href="/contact" className="glass-btn text-[13px]">
              Contact
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden relative z-10 p-2 text-white"
            aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl"
          >
            <motion.nav
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center justify-center h-full gap-1 pt-20"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {NAV_ITEMS.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className="text-center"
                >
                  {item.children ? (
                    <>
                      <button
                        onClick={() => setMobileSubOpen(!mobileSubOpen)}
                        className="py-3 text-xl font-semibold text-white/80 hover:text-white transition-colors inline-flex items-center gap-2"
                      >
                        {item.label}
                        <ChevronDown size={18} className={cn('transition-transform duration-200', mobileSubOpen && 'rotate-180')} />
                      </button>
                      <AnimatePresence>
                        {mobileSubOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            {item.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                onClick={() => setIsOpen(false)}
                                className="block py-2 text-base text-white/50 hover:text-white transition-colors"
                              >
                                {child.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="block py-3 text-xl font-semibold text-white/80 hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  )}
                </motion.div>
              ))}

              <div className="mt-8 flex flex-col items-center gap-4">
                <Link
                  href="/chiots"
                  onClick={() => setIsOpen(false)}
                  className="glass-btn text-sm px-8"
                >
                  Nos Chiots
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="glass-btn text-sm px-8"
                >
                  Contact
                </Link>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
