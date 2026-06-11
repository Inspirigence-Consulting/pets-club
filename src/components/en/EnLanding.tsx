'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Trophy,
  Heart,
  Users,
  Shield,
  ShieldCheck,
  Video,
  FileText,
  ArrowRight,
  Instagram,
  Star,
} from 'lucide-react';
import { INSTAGRAM_URL } from '@/lib/constants';
import { mockPuppies } from '@/lib/mock-data';
import ContactForm from '@/components/forms/ContactForm';

const TRUST = [
  { icon: Star, number: '11.8K', label: 'Instagram followers' },
  { icon: ShieldCheck, number: '100%', label: 'Vaccinated, chipped, pedigree' },
  { icon: Trophy, number: '2', label: 'Signature breeds' },
  { icon: Heart, number: 'Lifetime', label: 'Support after adoption' },
];

const WHY = [
  {
    icon: Trophy,
    title: 'Bloodlines that speak for themselves',
    text: 'Our breeding dogs carry international champion titles. Every litter inherits genetics selected for health, beauty and a balanced temperament.',
  },
  {
    icon: Heart,
    title: 'Veterinary care with no compromise',
    text: 'Up-to-date vaccinations, microchip, parental genetic testing and a health certificate: every puppy leaves us with a complete medical file.',
  },
  {
    icon: Users,
    title: '10 weeks of socialisation',
    text: 'Before joining your home, each puppy spends 10 weeks of play, stimulation and human contact. The result is a confident, well-adjusted companion.',
  },
  {
    icon: Shield,
    title: 'We stay with you after adoption',
    text: 'Questions on nutrition, behaviour or health? We stay reachable on WhatsApp, by phone or in person, for as long as your companion lives.',
  },
];

const BREEDS = [
  {
    name: 'Pomeranian',
    image: '/images/insta/ig_08.webp',
    fallback: '#d4bc7c',
    tagline:
      'A silky coat and a big personality in a pocket size. Playful, loyal and full of affection.',
    stats: [
      { label: 'Weight', value: '1.8-3.5 kg' },
      { label: 'Lifespan', value: '12-16 yrs' },
    ],
  },
  {
    name: 'Australian Shepherd',
    image: '/images/insta/ig_12.webp',
    fallback: '#8fa88b',
    tagline:
      'Athlete, thinker, lifelong companion. Sharp, loyal and devoted, with striking looks and often two-coloured eyes.',
    stats: [
      { label: 'Weight', value: '18-30 kg' },
      { label: 'Lifespan', value: '12-15 yrs' },
    ],
  },
];

const FAQ = [
  {
    q: 'How does reserving a puppy work?',
    a: 'It starts with a conversation (WhatsApp, phone or email) so we understand your lifestyle and expectations. We then arrange a visit to the cattery or a live video call to introduce the puppies. If it feels right on both sides, the reservation is confirmed by signed contract. We choose our families as carefully as you choose your companion.',
  },
  {
    q: 'How much is a Pet’s Club puppy?',
    a: 'It depends on the breed, the bloodline and each puppy. Rather than posting a price online, we prefer to discuss it with you directly. Every puppy leaves with up-to-date vaccinations, a registered microchip, a health certificate, parental genetic results and a complete starter kit.',
  },
  {
    q: 'Are the puppies vaccinated and chipped before they leave?',
    a: 'Yes, without exception. Each puppy leaves with an up-to-date vaccination record, a microchip registered in your name, a health certificate from our partner vet and the parents’ genetic test results.',
  },
  {
    q: 'Do you deliver outside Morocco?',
    a: 'Yes. We have already placed puppies with families in Europe, the Gulf and North America. We handle the export paperwork and work with certified pet transporters so the journey is safe.',
  },
  {
    q: 'At what age can a puppy leave?',
    a: 'Never before 10 weeks. Those first weeks with the mother and littermates are decisive for emotional and social development. A well-socialised puppy is a calmer companion, better suited to family life.',
  },
];

function enStatus(s: string): { label: string; cls: string } {
  switch (s) {
    case 'available':
      return { label: 'Available', cls: 'bg-[var(--color-accent-sage)]/90' };
    case 'reserved':
      return { label: 'Reserved', cls: 'bg-[var(--color-accent-terracotta)]/90' };
    case 'coming':
      return { label: 'Coming soon', cls: 'bg-[var(--color-gold)]/90' };
    default:
      return { label: 'Adopted', cls: 'bg-black/60' };
  }
}

export default function EnLanding() {
  const puppies = mockPuppies
    .filter((p) => p.status === 'available' || p.status === 'coming')
    .slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen bg-black overflow-hidden flex items-center">
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute top-[100px] right-0 w-[50%] h-[683px] hidden lg:block"
        >
          <div className="relative w-full h-full rounded-[105px] overflow-hidden">
            <Image
              src="/images/hero-dog.webp"
              alt="Australian Shepherd - The Pets Club Morocco"
              fill
              className="object-cover object-center"
              priority
              sizes="(max-width: 1024px) 0vw, 50vw"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute inset-0 lg:hidden"
        >
          <Image
            src="/images/hero-dog-mobile.webp"
            alt="Australian Shepherd"
            fill
            className="object-cover object-right-top opacity-30"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40" />
        </motion.div>

        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 lg:px-[120px] pt-[160px] pb-[120px] lg:pt-[200px] lg:pb-[160px]">
          <div className="max-w-[612px]">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4 }}
              className="text-white text-[28px] md:text-[32px] lg:text-[34px] font-black leading-[1.12] uppercase"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Champion-line puppies,
              <br />
              raised in the family in Morocco.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-8 text-[#eee] text-[15px] md:text-[16px] leading-relaxed max-w-[563px]"
              style={{ fontFamily: 'var(--font-subtitle)' }}
            >
              Pomeranian and Australian Shepherd puppies from titled parents. Genetic testing,
              a complete health record, and support that lasts a lifetime. Worldwide delivery.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-12 flex flex-wrap gap-4"
            >
              <Link
                href="/en/chiots"
                className="inline-flex items-center justify-center px-7 py-4 rounded-full bg-gradient-to-r from-[var(--color-gold)] to-[var(--color-gold-dark)] text-white text-[14px] lg:text-[15px] font-semibold tracking-wide hover:shadow-[0_6px_24px_rgba(197,165,90,0.45)] hover:-translate-y-0.5 active:scale-[0.97] transition duration-200"
              >
                See available puppies
              </Link>
              <Link
                href="/en/contact"
                className="inline-flex items-center justify-center px-7 py-4 rounded-full border border-white/30 text-white text-[14px] lg:text-[15px] font-semibold tracking-wide hover:bg-white/10 hover:border-white/50 active:scale-[0.97] transition duration-200"
              >
                Contact us
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="relative -mt-12 z-20">
        <div className="container-luxury">
          <div className="bg-white/90 backdrop-blur-xl shadow-[0_8px_60px_rgba(0,0,0,0.08)] border border-[var(--color-gold)]/10 rounded-2xl grid grid-cols-2 lg:grid-cols-4">
            {TRUST.map((b, i) => (
              <div
                key={b.label}
                className="relative p-8 md:p-10 text-center border-b lg:border-b-0 border-r border-[var(--color-cream-dark)]/50 last:border-r-0 [&:nth-child(2)]:border-r-0 lg:[&:nth-child(2)]:border-r"
              >
                <div className="w-10 h-10 mx-auto mb-4 flex items-center justify-center rounded-full bg-[var(--color-gold)]/[0.08]">
                  <b.icon size={18} className="text-[var(--color-gold)]" strokeWidth={1.5} />
                </div>
                <span className="block font-[var(--font-heading)] text-3xl md:text-4xl font-bold text-[var(--color-gold)] mb-2">
                  {b.number}
                </span>
                <span className="text-xs tracking-[0.1em] uppercase text-[var(--color-text-light)]">
                  {b.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section id="why" className="section-padding bg-[var(--color-primary-dark)] noise-overlay relative overflow-hidden scroll-mt-24">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--color-gold)]/20 to-transparent" />
        <div className="container-luxury relative z-10">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-8 h-[1px] bg-[var(--color-gold)]/40" />
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--color-gold-light)]">
                Our approach
              </span>
              <div className="w-8 h-[1px] bg-[var(--color-gold)]/40" />
            </div>
            <h2 className="font-[var(--font-heading)] text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              What sets us apart
            </h2>
            <p className="mt-6 text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
              Fifteen years of breeding taught us one thing: a great puppy is prepared long before it is born.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY.map((item) => (
              <div
                key={item.title}
                className="relative p-8 border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm hover:border-[var(--color-gold)]/20 hover:bg-white/[0.05] hover:-translate-y-1.5 transition-all duration-500 h-full rounded-xl"
              >
                <div className="w-14 h-14 mb-6 flex items-center justify-center rounded-full border border-[var(--color-gold)]/20 bg-[var(--color-gold)]/[0.05]">
                  <item.icon size={24} className="text-[var(--color-gold-light)]" strokeWidth={1.5} />
                </div>
                <h3 className="font-[var(--font-heading)] text-xl font-semibold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-white/70 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Breeds */}
      <section id="breeds" className="bg-[var(--color-cream)] scroll-mt-24">
        <div className="container-luxury section-padding pb-0">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-8 h-[1px] bg-[var(--color-gold)]/40" />
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--color-gold)]">
                Our breeds
              </span>
              <div className="w-8 h-[1px] bg-[var(--color-gold)]/40" />
            </div>
            <h2 className="font-[var(--font-heading)] text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-charcoal)]">
              Two signature breeds
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {BREEDS.map((breed) => (
            <div key={breed.name} className="group relative overflow-hidden">
              <Link href="/en/chiots" className="block">
                <div className="aspect-[3/4] lg:aspect-auto lg:min-h-[600px] relative">
                  <div
                    role="img"
                    aria-label={breed.name}
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-110"
                    style={{ backgroundImage: `url(${breed.image})`, backgroundColor: breed.fallback }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/5" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 lg:p-14">
                    <h3 className="font-[var(--font-heading)] text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                      {breed.name}
                    </h3>
                    <p className="text-white/85 mb-6 max-w-md leading-relaxed text-[15px]">
                      {breed.tagline}
                    </p>
                    <div className="flex gap-6 mb-8">
                      {breed.stats.map((s) => (
                        <div key={s.label} className="text-center">
                          <span className="block text-lg font-bold text-[var(--color-gold-light)]">
                            {s.value}
                          </span>
                          <span className="text-[10px] tracking-[0.15em] uppercase text-white/65">
                            {s.label}
                          </span>
                        </div>
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-gold-light)] group-hover:text-white transition-colors">
                      See the puppies
                      <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Available puppies */}
      <section className="section-padding bg-[var(--color-warm-white)]">
        <div className="container-luxury">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-[1px] bg-[var(--color-gold)]" />
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--color-gold)]">
                  Our puppies
                </span>
              </div>
              <h2 className="font-[var(--font-heading)] text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-charcoal)] mb-4">
                Available puppies
              </h2>
              <p className="text-[var(--color-text-light)] max-w-lg leading-relaxed">
                Each puppy grows with us for 10 weeks, surrounded by its mother and littermates.
                Here are the ones ready to meet their new family.
              </p>
            </div>
            <Link
              href="/en/chiots"
              className="group inline-flex items-center gap-2 text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-gold)] transition-colors shrink-0"
            >
              See all puppies
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {puppies.map((p) => {
              const st = enStatus(p.status);
              const breedEn = p.breed === 'pomeranian' ? 'Pomeranian' : 'Australian Shepherd';
              return (
                <Link key={p.id} href="/en/chiots" className="card-luxury group rounded-2xl overflow-hidden block">
                  <div className="relative aspect-[4/5] overflow-hidden bg-[var(--color-cream)]">
                    <Image
                      src={p.image}
                      alt={`${p.name} - ${breedEn}`}
                      fill
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute top-4 left-4 z-20">
                      <span className={`inline-flex items-center px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white rounded-md ${st.cls}`}>
                        {st.label}
                      </span>
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
        </div>
      </section>

      {/* Instagram social proof */}
      <section id="gallery" className="py-16 md:py-20 bg-white scroll-mt-24">
        <div className="container-luxury max-w-[935px]">
          <div className="flex items-center gap-6 md:gap-12 mb-10 px-4">
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="shrink-0">
              <div className="w-20 h-20 md:w-[150px] md:h-[150px] rounded-full p-[3px] bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]">
                <div className="w-full h-full rounded-full bg-white p-[3px]">
                  <div className="w-full h-full rounded-full bg-white overflow-hidden flex items-center justify-center">
                    <Image
                      src="/images/logo-pets-club-white.png"
                      alt="The Pets Club"
                      width={150}
                      height={150}
                      className="w-[60%] h-auto object-contain invert"
                    />
                  </div>
                </div>
              </div>
            </a>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <h3 className="text-xl md:text-2xl font-semibold text-[var(--color-charcoal)]" style={{ fontFamily: 'var(--font-display)' }}>
                  thepetsclubmaroc
                </h3>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#0095f6] text-white text-sm font-semibold hover:bg-[#1877f2] transition-colors"
                >
                  Follow
                </a>
              </div>
              <div className="flex items-center gap-8 mb-3">
                <span className="text-sm text-[var(--color-text)]"><strong>264</strong> posts</span>
                <span className="text-sm text-[var(--color-text)]"><strong>11.8k</strong> followers</span>
              </div>
              <p className="text-sm text-[var(--color-text-light)] leading-snug">
                Professional, ethical breeder. Pomeranian and Australian Shepherd. Full support from A to Z.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-1 md:gap-4">
            {['ig_08', 'ig_02', 'ig_12', 'ig_09', 'ig_11', 'ig_06'].map((id) => (
              <a
                key={id}
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="aspect-square relative group overflow-hidden bg-[var(--color-cream)] rounded-md md:rounded-lg"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(/images/insta/${id}.webp)` }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <Instagram size={22} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Lead capture */}
      <section id="reserve" className="section-padding bg-[var(--color-cream)] scroll-mt-24">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-[1px] bg-[var(--color-gold)]/50" />
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--color-gold)]">
                  Reserve a puppy
                </span>
              </div>
              <h2 className="font-[var(--font-heading)] text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-charcoal)] mb-5">
                Leave your details, we will call you back
              </h2>
              <p className="text-[var(--color-text-light)] leading-relaxed mb-8 max-w-md">
                Tell us which breed you are interested in and your city. Our team reaches out on
                WhatsApp with the available puppies and arranges a live video call.
              </p>
              <div className="space-y-5">
                {[
                  { icon: ShieldCheck, t: 'Health-verified puppies', d: 'Vaccinated, chipped and with a complete health file before they leave.' },
                  { icon: Video, t: 'A live video call before you decide', d: 'See your puppy in real time, ask your questions, choose with confidence.' },
                  { icon: FileText, t: 'Contract and lifetime support', d: 'Reservation by written contract and guidance long after adoption.' },
                ].map((p) => (
                  <div key={p.t} className="flex gap-4">
                    <div className="shrink-0 w-11 h-11 rounded-full bg-[var(--color-gold)]/10 flex items-center justify-center">
                      <p.icon size={20} className="text-[var(--color-gold)]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[var(--color-charcoal)] mb-1">{p.t}</h3>
                      <p className="text-sm text-[var(--color-text-light)] leading-relaxed">{p.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-xl shadow-black/[0.04] border border-[var(--color-charcoal)]/[0.06] p-7 md:p-9">
              <ContactForm lang="en" defaultSubject="reserve" />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-white">
        <div className="container-narrow">
          <div className="text-center mb-12">
            <h2 className="font-[var(--font-heading)] text-3xl md:text-4xl font-bold text-[var(--color-charcoal)]">
              Frequently asked questions
            </h2>
          </div>
          <div className="space-y-4">
            {FAQ.map((item) => (
              <details
                key={item.q}
                className="group border border-[var(--color-cream-dark)] rounded-xl p-5 bg-[var(--color-cream)]/30"
              >
                <summary className="flex items-center justify-between cursor-pointer font-semibold text-[var(--color-charcoal)] list-none">
                  {item.q}
                  <ArrowRight size={16} className="text-[var(--color-gold)] transition-transform group-open:rotate-90" />
                </summary>
                <p className="mt-3 text-sm text-[var(--color-text-light)] leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
