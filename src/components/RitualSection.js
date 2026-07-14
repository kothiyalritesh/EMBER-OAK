'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const rituals = [
  {
    num: '01',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" />
      </svg>
    ),
    title: 'Hand-Selected Beans',
    description: 'Small-batch beans sourced from sustainable farms across India and Ethiopia — only the top 5% of each harvest.',
  },
  {
    num: '02',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3.5 2" strokeLinecap="round" />
      </svg>
    ),
    title: 'Slow Roasting',
    description: 'Roasted carefully at precise temperatures to unlock chocolate, caramel, stone fruit, and subtle spice notes.',
  },
  {
    num: '03',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
        <path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3M3 16v3a2 2 0 002 2h3m8 0h3a2 2 0 002-2v-3" strokeLinecap="round" />
      </svg>
    ),
    title: 'Artful Brewing',
    description: 'Every espresso, latte, and cold brew is measured for consistency — sweetness extracted, bitterness left behind.',
  },
  {
    num: '04',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 22V12h6v10" strokeLinecap="round" />
      </svg>
    ),
    title: 'Served With Care',
    description: 'Warm wood, soft lighting, and intentional quiet — a space designed for unhurried mornings and real conversations.',
  },
];

export default function RitualSection() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} id="ritual" className="section-pad" style={{ position: 'relative', overflow: 'hidden' }}>
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at top center, rgba(200,138,74,0.05) 0%, transparent 55%)',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <motion.div
          style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto clamp(64px, 8vw, 100px)' }}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span className="label-text" style={{ display: 'block', marginBottom: '18px' }}>Our Process</span>
          <h2 className="section-heading">
            The Ritual Behind<br />
            <span className="text-grad">Every Cup</span>
          </h2>
          <div className="divider center" />
          <p className="body-text" style={{ margin: '0 auto', maxWidth: '500px' }}>
            From bean selection to the final sip — every step is intentional, crafted to elevate your experience.
          </p>
        </motion.div>

        {/* Grid - 4 columns on desktop, 2 on tablet, 1 on mobile */}
        <div className="ritual-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 'clamp(28px, 3.5vw, 44px)',
        }}>
          {rituals.map((r, i) => (
            <RitualCard key={r.title} ritual={r} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function RitualCard({ ritual, index }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-20px' });

  return (
    <motion.article
      ref={ref}
      className="card ritual-card"
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      style={{ minHeight: '380px', display: 'flex', flexDirection: 'column', cursor: 'default' }}
    >
      {/* Background number */}
      <span aria-hidden="true" style={{
        position: 'absolute', top: '24px', right: '28px',
        fontFamily: 'var(--font-heading)',
        fontSize: '3.6rem',
        color: 'rgba(200,138,74,0.07)',
        lineHeight: 1,
        userSelect: 'none',
        transition: 'color 0.4s ease',
      }} className="ritual-num">
        {ritual.num}
      </span>

      {/* Icon */}
      <div
        className="ritual-icon"
        style={{
          width: '64px', height: '64px',
          borderRadius: '18px',
          background: 'rgba(200,138,74,0.1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--caramel)',
          marginBottom: '32px',
          transition: 'background 0.35s ease, color 0.35s ease, transform 0.35s ease',
          flexShrink: 0,
        }}
      >
        {ritual.icon}
      </div>

      <h3 className="card-heading" style={{ marginBottom: '18px', fontSize: 'clamp(1.2rem, 1.5vw, 1.4rem)' }}>
        {ritual.title}
      </h3>
      <p className="card-text" style={{
        flex: 1,
        color: 'var(--muted-strong)',
      }}>
        {ritual.description}
      </p>

      {/* Bottom accent */}
      <div className="ritual-line" style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: '2px',
        background: 'linear-gradient(90deg, var(--caramel), var(--gold))',
        borderRadius: '0 0 var(--radius-card) var(--radius-card)',
        opacity: 0,
        transition: 'opacity 0.35s ease',
      }} />

      <style>{`
        .ritual-card:hover .ritual-icon {
          background: var(--caramel) !important;
          color: var(--bg) !important;
          transform: scale(1.08) !important;
        }
        .ritual-card:hover .ritual-line { opacity: 1 !important; }
        .ritual-card:hover .ritual-num { color: rgba(200,138,74,0.14) !important; }

        @media (max-width: 1100px) {
          .ritual-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 580px) {
          .ritual-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </motion.article>
  );
}
