'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const testimonials = [
  {
    text: "The kind of cafe where time slows down. Their cold brew is easily the best I've had.",
    author: 'Aanya Mehra',
    role: 'Regular at Ember & Oak',
    initials: 'AM',
    rating: 5,
  },
  {
    text: 'Beautiful interiors, warm service, and coffee that feels genuinely crafted.',
    author: 'Kabir Sethi',
    role: 'Coffee Enthusiast',
    initials: 'KS',
    rating: 5,
  },
  {
    text: 'EMBER & OAK feels more like a ritual than a cafe. I come here every Friday.',
    author: 'Rhea Kapoor',
    role: 'Food & Beverage Writer',
    initials: 'RK',
    rating: 5,
  },
];

export default function Testimonials() {
  const ref   = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="section-pad" style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'linear-gradient(180deg, transparent, rgba(58,36,24,0.1) 50%, transparent)',
      }} />

      <div ref={ref} className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <motion.div
          style={{ textAlign: 'center', maxWidth: '560px', margin: '0 auto 72px' }}
          initial={{ opacity: 0, y: 36 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span className="label-text" style={{ display: 'block', marginBottom: '16px' }}>Guest Notes</span>
          <h2 className="section-heading">
            Loved by People<br />
            <span className="text-grad">Who Love Slow Coffee</span>
          </h2>
          <div className="divider center" />
        </motion.div>

        {/* Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
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
  const ref   = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-20px' });

  return (
    <motion.div
      ref={ref}
      className="card"
      initial={{ opacity: 0, y: 56 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.13, ease: [0.25, 0.1, 0.25, 1] }}
      style={{ minHeight: '260px', display: 'flex', flexDirection: 'column' }}
    >
      {/* Big quote mark */}
      <div style={{
        fontFamily: 'var(--font-heading)',
        fontSize: '4.5rem',
        lineHeight: 0.8,
        color: 'rgba(200,138,74,0.12)',
        marginBottom: '16px',
        transition: 'color 0.35s',
        userSelect: 'none',
      }} className="quote-mark">
        &ldquo;
      </div>

      {/* Stars */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <svg key={i} width="14" height="14" viewBox="0 0 20 20" fill="var(--caramel)">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      {/* Quote text */}
      <p style={{
        fontSize: '1rem',
        lineHeight: 1.7,
        color: 'rgba(243,230,208,0.75)',
        fontStyle: 'italic',
        fontWeight: 300,
        flex: 1,
        marginBottom: '28px',
      }}>
        &ldquo;{testimonial.text}&rdquo;
      </p>

      {/* Author */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '14px',
        paddingTop: '20px',
        borderTop: '1px solid rgba(243,230,208,0.07)',
      }}>
        <div style={{
          width: '40px', height: '40px', borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--caramel), #3A2418)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '0.75rem', fontWeight: 600, color: 'var(--cream)',
          flexShrink: 0,
        }}>
          {testimonial.initials}
        </div>
        <div>
          <p style={{ fontFamily: 'var(--font-subheading)', fontSize: '0.95rem', color: 'var(--cream)' }}>
            {testimonial.author}
          </p>
          <p style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: '2px' }}>
            {testimonial.role}
          </p>
        </div>
      </div>

      <style>{`
        .card:hover .quote-mark { color: rgba(200,138,74,0.28) !important; }
      `}</style>
    </motion.div>
  );
}
