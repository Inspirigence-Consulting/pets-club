'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, type PanInfo } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { TESTIMONIALS } from '@/lib/constants';

const SWIPE_THRESHOLD = 50;
const DRAG_ELASTIC = 0.3;

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < count ? 'text-amber-400 fill-amber-400' : 'text-white/20'}
        />
      ))}
    </div>
  );
}

const slideVariants = {
  enter: (d: number) => ({
    x: d > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.9,
    filter: 'blur(8px)',
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
  },
  exit: (d: number) => ({
    x: d > 0 ? -300 : 300,
    opacity: 0,
    scale: 0.9,
    filter: 'blur(8px)',
  }),
};

function TestimonialSlide({
  testimonial,
  direction,
  onDragEnd,
}: {
  testimonial: (typeof TESTIMONIALS)[number];
  direction: number;
  onDragEnd: (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
}) {
  return (
    <motion.div
      custom={direction}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        x: { type: 'spring', stiffness: 200, damping: 30 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 },
        filter: { duration: 0.4 },
      }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={DRAG_ELASTIC}
      onDragEnd={onDragEnd}
      className="absolute inset-0 flex items-center justify-center px-4 cursor-grab active:cursor-grabbing"
    >
      <div className="relative w-full max-w-[720px] mx-auto select-none">
        {/* Glass card */}
        <div className="relative overflow-hidden rounded-[32px] p-8 md:p-12">
          {/* Glassmorphism background */}
          <div className="absolute inset-0 bg-white/[0.06] backdrop-blur-xl border border-white/[0.1] rounded-[32px]" />
          {/* Inner glow */}
          <div
            className="absolute inset-0 rounded-[32px] pointer-events-none"
            style={{
              boxShadow:
                'inset 1px 1px 2px rgba(255,255,255,0.15), inset -1px -1px 2px rgba(255,255,255,0.05)',
            }}
          />

          <div className="relative z-10">
            {/* Quote icon */}
            <div className="mb-6">
              <Quote size={36} className="text-white/30" strokeWidth={1} />
            </div>

            {/* Stars */}
            <StarRating count={testimonial.rating} />

            {/* Text */}
            <p
              className="mt-6 text-white/90 text-[17px] md:text-[19px] leading-[1.7] font-light"
              style={{ fontFamily: 'var(--font-subtitle)' }}
            >
              &ldquo;{testimonial.text}&rdquo;
            </p>

            {/* Author */}
            <div className="mt-8 flex items-center gap-4">
              {/* Avatar */}
              <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm border border-white/20 rounded-full" />
                <div className="relative w-full h-full flex items-center justify-center">
                  <span
                    className="text-lg font-bold text-white/80"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
              </div>
              <div>
                <p
                  className="text-white text-sm font-semibold"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {testimonial.name}
                </p>
                <p className="text-white/65 text-xs mt-0.5">
                  {testimonial.location} &middot;{' '}
                  <span className="text-amber-400/70">{testimonial.breed}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  const [[activeIndex, direction], setActive] = useState([0, 0]);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const bgX = useTransform(mouseX, [0, 1], [-15, 15]);
  const bgY = useTransform(mouseY, [0, 1], [-15, 15]);

  const paginate = useCallback(
    (dir: number) => {
      setActive(([prev]) => {
        const next = (prev + dir + TESTIMONIALS.length) % TESTIMONIALS.length;
        return [next, dir];
      });
    },
    []
  );

  const handleDragEnd = useCallback(
    (_e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      const { offset, velocity } = info;
      // Swipe detection: either large offset or fast velocity
      if (offset.x < -SWIPE_THRESHOLD || velocity.x < -500) {
        paginate(1);
      } else if (offset.x > SWIPE_THRESHOLD || velocity.x > 500) {
        paginate(-1);
      }
    },
    [paginate]
  );

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => paginate(1), 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, paginate]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <section
      className="relative py-24 md:py-32 bg-black overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Animated background orbs */}
      <motion.div
        className="absolute top-[-200px] right-[-100px] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          x: bgX,
          y: bgY,
          background:
            'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)',
        }}
      />
      <motion.div
        className="absolute bottom-[-150px] left-[-100px] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          x: bgX,
          y: bgY,
          background:
            'radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 70%)',
        }}
      />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="container-luxury relative z-10">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-white/30" />
            <span
              className="text-[11px] font-semibold tracking-[0.3em] uppercase text-white/70"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Témoignages
            </span>
            <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-white/30" />
          </motion.div>

          <h2
            className="text-3xl md:text-4xl lg:text-[42px] font-black text-white uppercase leading-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Ils nous ont
            <br />
            <span className="text-white/55">fait confiance</span>
          </h2>
        </motion.div>

        {/* Carousel with drag/swipe */}
        <div
          className="relative h-[400px] md:h-[380px] touch-pan-y"
          onTouchStart={() => setIsAutoPlaying(false)}
        >
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <TestimonialSlide
              key={activeIndex}
              testimonial={TESTIMONIALS[activeIndex]}
              direction={direction}
              onDragEnd={handleDragEnd}
            />
          </AnimatePresence>
        </div>

        {/* Swipe hint (mobile only) */}
        <p className="text-center text-white/50 text-xs mt-2 md:hidden">
          Glissez pour voir plus
        </p>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex items-center justify-center gap-6 mt-6"
        >
          {/* Prev button */}
          <button
            onClick={() => paginate(-1)}
            className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-white/55 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-300"
            aria-label="Témoignage précédent"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive([i, i > activeIndex ? 1 : -1])}
                className="relative p-1"
                aria-label={`Témoignage ${i + 1}`}
              >
                <motion.div
                  className="rounded-full"
                  animate={{
                    width: i === activeIndex ? 24 : 8,
                    height: 8,
                    backgroundColor:
                      i === activeIndex
                        ? 'rgba(255,255,255,0.8)'
                        : 'rgba(255,255,255,0.2)',
                  }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                />
                {/* Active dot progress bar (auto-play indicator) */}
                {i === activeIndex && isAutoPlaying && (
                  <motion.div
                    className="absolute top-1 left-1 h-2 rounded-full bg-white/40"
                    initial={{ width: 0 }}
                    animate={{ width: 24 }}
                    transition={{ duration: 6, ease: 'linear' }}
                    key={`progress-${activeIndex}`}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Next button */}
          <button
            onClick={() => paginate(1)}
            className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-white/55 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-300"
            aria-label="Témoignage suivant"
          >
            <ChevronRight size={18} />
          </button>
        </motion.div>

        {/* Bottom stat strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-16 flex items-center justify-center gap-8 md:gap-16"
        >
          {[
            { value: '200+', label: 'Familles accompagnées' },
            { value: '5.0', label: 'Note moyenne' },
            { value: '100%', label: 'Nous recommandent' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p
                className="text-2xl md:text-3xl font-black text-white/90"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {stat.value}
              </p>
              <p className="text-[11px] text-white/60 mt-1 uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
