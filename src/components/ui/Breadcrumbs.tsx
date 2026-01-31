'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  light?: boolean;
}

export default function Breadcrumbs({ items, light = false }: BreadcrumbsProps) {
  return (
    <nav aria-label="Fil d'Ariane" className="mb-6">
      <ol className="flex items-center flex-wrap gap-1 text-sm">
        <li>
          <Link
            href="/"
            className={`flex items-center gap-1 transition-colors ${
              light
                ? 'text-white/50 hover:text-white/80'
                : 'text-[var(--color-text-muted)] hover:text-[var(--color-gold)]'
            }`}
          >
            <Home size={14} />
            <span className="sr-only">Accueil</span>
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1">
            <ChevronRight
              size={12}
              className={light ? 'text-white/30' : 'text-[var(--color-text-muted)]'}
            />
            {item.href && i < items.length - 1 ? (
              <Link
                href={item.href}
                className={`transition-colors ${
                  light
                    ? 'text-white/50 hover:text-white/80'
                    : 'text-[var(--color-text-muted)] hover:text-[var(--color-gold)]'
                }`}
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={
                  light
                    ? 'text-white/80 font-medium'
                    : 'text-[var(--color-text)] font-medium'
                }
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
