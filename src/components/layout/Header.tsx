'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Instagram, LogIn } from 'lucide-react';
import { cn } from '@/lib/utils';
import { INSTAGRAM_URL } from '@/lib/constants';
import LanguageSwitcher from '@/components/layout/LanguageSwitcher';

const NAV_ITEMS = [
  { label: 'Nos Chiots', href: '/chiots' },
  {
    label: 'Nos Races',
    href: '#',
    children: [
      { label: 'Spitz Nain (Pomeranian)', href: '/races/pomeranian' },
      { label: 'Berger Australien', href: '/races/berger-australien' },
    ],
  },
  { label: 'Marketplace', href: '/marketplace' },
  { label: 'Élevage Éthique', href: '/elevage-ethique' },
  { label: 'Galerie', href: '/galerie' },
];

const EN_NAV_ITEMS = [
  { label: 'Puppies', href: '/en/chiots' },
  {
    label: 'Breeds',
    href: '#',
    children: [
      { label: 'Pomeranian', href: '/en#breeds' },
      { label: 'Australian Shepherd', href: '/en#breeds' },
    ],
  },
  { label: 'Why us', href: '/en#why' },
  { label: 'Gallery', href: '/en#gallery' },
];

export default function Header({ solid = false }: { solid?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileSubOpen, setMobileSubOpen] = useState(false);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();
  const isEn = pathname === '/en' || pathname.startsWith('/en/');
  const navItems = isEn ? EN_NAV_ITEMS : NAV_ITEMS;
  const homeHref = isEn ? '/en' : '/';
  const contactHref = isEn ? '/en/contact' : '/contact';
  const loginLabel = isEn ? 'Sign in' : 'Se connecter';

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(href + '/');

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
          solid
            ? 'bg-black shadow-[0_2px_20px_rgba(0,0,0,0.3)]'
            : scrolled
              ? 'backdrop-blur-[13px] bg-black/85 shadow-[0_2px_20px_rgba(0,0,0,0.3)]'
              : 'backdrop-blur-[13px] bg-black/40'
        )}
      >
        <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-[80px] flex items-center justify-between">
          {/* Logo */}
          <Link href={homeHref} className="relative z-10 shrink-0">
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
            {navItems.map((item) => (
              item.children ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={handleDropdownEnter}
                  onMouseLeave={handleDropdownLeave}
                >
                  <button
                    className="nav-link-underline text-[14px] font-semibold text-white/80 hover:text-white transition-colors duration-300 flex items-center gap-1"
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
                        <div className="bg-black/80 backdrop-blur-xl border border-white/15 rounded-xl py-2 min-w-[220px] shadow-2xl">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="block px-5 py-2.5 text-[13px] font-medium text-white/80 hover:text-white hover:bg-white/5 transition-colors"
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
                  className={cn('nav-link-underline text-[14px] font-semibold hover:text-white transition-colors duration-300', isActive(item.href) ? 'text-white' : 'text-white/80')}
                >
                  {item.label}
                </Link>
              )
            ))}
          </nav>

          {/* Right side: CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <LanguageSwitcher light />
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/25 text-white/80 hover:text-white hover:border-white/40 hover:bg-white/10 transition-all duration-300"
              aria-label="Instagram"
            >
              <Instagram size={16} />
            </a>
            <Link href="/login" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[var(--color-gold)] to-[var(--color-gold-dark)] text-white text-[13px] font-semibold tracking-wide hover:shadow-[0_4px_20px_rgba(197,165,90,0.4)] hover:-translate-y-0.5 transition-all duration-300">
              <LogIn size={15} />
              {loginLabel}
            </Link>
            <Link href={contactHref} className="inline-flex items-center justify-center px-5 py-2.5 rounded-full border border-white/25 text-white/90 text-[13px] font-semibold tracking-wide hover:bg-white/10 hover:border-white/40 transition-all duration-300">
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
              {navItems.map((item, i) => (
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
                                className="block py-2 text-base text-white/65 hover:text-white transition-colors"
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
                <LanguageSwitcher light />
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-[var(--color-gold)] to-[var(--color-gold-dark)] text-white text-sm font-semibold tracking-wide hover:shadow-[0_4px_20px_rgba(197,165,90,0.4)] transition-all duration-300"
                >
                  <LogIn size={16} />
                  {loginLabel}
                </Link>
                <Link
                  href={contactHref}
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center justify-center px-8 py-3 rounded-full border border-white/30 text-white text-sm font-semibold tracking-wide hover:bg-white/10 hover:border-white/50 transition-all duration-300"
                >
                  Contact
                </Link>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors mt-2"
                >
                  <Instagram size={18} />
                  @thepetsclubmaroc
                </a>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
