'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const testimonials = [
  {
    text: "The kind of cafe where time slows down. Their cold brew is easily the best I've had in the city.",
    author: 'Aanya Mehra',
    role: 'Regular at Ember & Oak',
    initials: 'AM',
    rating: 5,
    gradient: 'linear-gradient(135deg, #C88A4A, #8B5E3C)',
  },
  {
    text: 'Beautiful interiors, warm service, and coffee that feels genuinely crafted with intention.',
    author: 'Kabir Sethi',
    role: 'Coffee Enthusiast',
    initials: 'KS',
    rating: 5,
    gradient: 'linear-gradient(135deg, #D6A15F, #6B4226)',
  },
  {
    text: 'EMBER & OAK feels more like a ritual than a cafe. I come here every Friday without fail.',
    author: 'Rhea Kapoor',
    role: 'Food & Beverage Writer',
    initials: 'RK',
    rating: 5,
    gradient: 'linear-gradient(135deg, #B87A3A, #3A2418)',
  },
];

export default function Testimonials() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="section-pad" style={{ position: 'relative', overflow: 'hidden' }}>
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'linear-gradient(180deg, transparent, rgba(58,36,24,0.1) 50%, transparent)',
      }} />

      <div ref={ref} className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <motion.div
          style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto clamp(64px, 8vw, 100px)' }}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span className="label-text" style={{ display: 'block', marginBottom: '18px' }}>Guest Notes</span>
          <h2 className="section-heading">
            Loved by People<br />
            <span className="text-grad">Who Love Slow Coffee</span>
          </h2>
          <div className="divider center" />
        </motion.div>

        {/* Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
          gap: 'clamp(28px, 3.5vw, 44px)',
        }}>
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.author} testimonial={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial, index }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-20px' });

  return (
    <motion.article
      ref={ref}
      className="card testi-card"
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.13, ease: [0.25, 0.1, 0.25, 1] }}
      style={{ minHeight: '380px', display: 'flex', flexDirection: 'column' }}
    >
      {/* Quote mark */}
      <div
        className="quote-mark"
        aria-hidden="true"
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '7.5rem',
          lineHeight: 0.65,
          color: 'rgba(200,138,74,0.14)',
          marginBottom: '14px',
          transition: 'color 0.4s ease',
          userSelect: 'none',
          letterSpacing: '-0.02em',
        }}
      >
        &ldquo;
      </div>

      {/* Stars */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '20px' }} aria-label={`${testimonial.rating} out of 5 stars`}>
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <svg key={i} width="15" height="15" viewBox="0 0 20 20" fill="var(--caramel)" aria-hidden="true">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      {/* Quote text */}
      <blockquote style={{
        fontSize: 'clamp(1.05rem, 1.25vw, 1.15rem)',
        lineHeight: 1.92,
        color: 'var(--muted-strong)',
        fontStyle: 'italic',
        fontWeight: 400,
        flex: 1,
        marginBottom: '32px',
        quotes: 'none',
      }}>
        &ldquo;{testimonial.text}&rdquo;
      </blockquote>

      {/* Author */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '16px',
        paddingTop: '22px',
        borderTop: '1px solid rgba(243,230,208,0.09)',
      }}>
        <div
          aria-hidden="true"
          style={{
            width: '56px', height: '56px', borderRadius: '50%',
            background: testimonial.gradient,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.85rem', fontWeight: 600, color: 'var(--cream)',
            flexShrink: 0,
            boxShadow: '0 0 0 3px rgba(200,138,74,0.2), 0 4px 16px rgba(0,0,0,0.4)',
            letterSpacing: '0.04em',
          }}
        >
          {testimonial.initials}
        </div>
        <div>
          <p style={{
            fontFamily: 'var(--font-subheading)',
            fontSize: 'clamp(0.95rem, 1.15vw, 1.05rem)',
            color: 'var(--cream)',
            lineHeight: 1.3,
            marginBottom: '4px',
          }}>
            {testimonial.author}
          </p>
          <p style={{
            fontSize: 'clamp(0.8rem, 0.9vw, 0.85rem)',
            color: 'var(--muted)',
            lineHeight: 1.4,
          }}>
            {testimonial.role}
          </p>
        </div>
      </div>

      <style>{`
        .testi-card:hover .quote-mark { color: rgba(200,138,74,0.3) !important; }
      `}</style>
    </motion.article>
  );
}