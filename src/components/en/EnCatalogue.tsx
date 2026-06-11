'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { mockPuppies } from '@/lib/mock-data';

function enStatus(s: string): { label: string; cls: string } {
  switch (s) {
    case 'available':
      return { label: 'Available', cls: 'bg-[var(--color-accent-sage)]/90' };
    case 'reserved':
      return { label: 'Reserved', cls: 'bg-[var(--color-accent-terracotta)]/90' };
    case 'coming':
      return { label: 'Coming soon', cls: 'bg-[var(--color-gold)]/90' };
    case 'sold':
      return { label: 'Sold', cls: 'bg-black/60' };
    default:
      return { label: 'Adopted', cls: 'bg-black/60' };
  }
}

export default function EnCatalogue() {
  return (
    <>
      <section className="relative pt-40 pb-20 bg-[#0a1a10] overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--color-gold)]/20 to-transparent" />
        <div className="container-luxury relative z-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-[1px] bg-[var(--color-gold)]/40" />
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[var(--color-gold-light)]">
              Our puppies
            </span>
            <div className="w-8 h-[1px] bg-[var(--color-gold)]/40" />
          </div>
          <h1 className="font-[var(--font-heading)] text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Available <span className="text-gradient-gold italic">puppies</span>
          </h1>
          <p className="text-lg text-white/75 max-w-xl mx-auto leading-relaxed">
            Pomeranian and Australian Shepherd from champion bloodlines, raised in the family.
            Prices and full details are shared on WhatsApp.
          </p>
        </div>
      </section>

      <section className="section-padding bg-[var(--color-warm-white)]">
        <div className="container-luxury">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockPuppies.map((p) => {
              const st = enStatus(p.status);
              const breedEn = p.breed === 'pomeranian' ? 'Pomeranian' : 'Australian Shepherd';
              return (
                <Link
                  key={p.id}
                  href={`/en/contact?puppy=${encodeURIComponent(p.name)}`}
                  className="card-luxury group rounded-2xl overflow-hidden block"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-[var(--color-cream)]">
                    <Image
                      src={p.image}
                      alt={`${p.name} - ${breedEn}`}
                      fill
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute top-4 left-4 z-20">
                      <span className={`inline-flex items-center px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white rounded-md ${st.cls}`}>
                        {st.label}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition duration-300 translate-y-1 group-hover:translate-y-0 z-20">
                      <span className="btn-gold text-xs w-full justify-center">Enquire</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-[var(--color-charcoal)]">{p.name}</h3>
                      <span className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider">
                        {p.gender === 'male' ? 'Male' : 'Female'}
                      </span>
                    </div>
                    <p className="text-sm text-[var(--color-gold)] font-medium">{breedEn}</p>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="text-center mt-14">
            <Link href="/en/contact" className="btn-gold inline-flex items-center gap-2">
              Reserve a puppy
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
