'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const rituals = [
  {
    num: '01',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" opacity="0.9"/>
      </svg>
    ),
    title: 'Hand-Selected Beans',
    description: 'Small-batch beans sourced from sustainable farms across India and Ethiopia — only the top 5% of each harvest.',
  },
  {
    num: '02',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Slow Roasting',
    description: 'Roasted carefully at precise temperatures to unlock chocolate, caramel, stone fruit, and subtle spice notes.',
  },
  {
    num: '03',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3M3 16v3a2 2 0 002 2h3m8 0h3a2 2 0 002-2v-3" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Balanced Brewing',
    description: 'Every espresso, latte, and cold brew is measured for consistency — sweetness extracted, bitterness left behind.',
  },
  {
    num: '04',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 22V12h6v10" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Calm Atmosphere',
    description: 'Warm wood, soft lighting, and intentional quiet — a space designed for unhurried mornings and real conversations.',
  },
];

export default function RitualSection() {
  const ref   = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} id="ritual" className="section-pad" style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at top, rgba(200,138,74,0.04) 0%, transparent 60%)',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <motion.div
          style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 72px' }}
          initial={{ opacity: 0, y: 36 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25,0.1,0.25,1] }}
        >
          <span className="label-text" style={{ display: 'block', marginBottom: '16px' }}>Our Process</span>
          <h2 className="section-heading">
            The Ritual Behind<br />
            <span className="text-grad">Every Cup</span>
          </h2>
          <div className="divider center" />
          <p className="body-text" style={{ margin: '0 auto', maxWidth: '480px' }}>
            From bean selection to the final sip — every step is intentional, crafted to elevate your experience.
          </p>
        </motion.div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '20px',
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
  const ref   = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-20px' });

  return (
    <motion.div
      ref={ref}
      className="card"
      initial={{ opacity: 0, y: 56 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25,0.1,0.25,1] }}
      style={{ minHeight: '280px', display: 'flex', flexDirection: 'column' }}
    >
      {/* Number */}
      <span style={{
        position: 'absolute', top: '20px', right: '24px',
        fontFamily: 'var(--font-heading)',
        fontSize: '2.8rem',
        color: 'rgba(200,138,74,0.08)',
        lineHeight: 1,
        userSelect: 'none',
      }}>
        {ritual.num}
      </span>

      {/* Icon */}
      <div style={{
        width: '52px', height: '52px',
        borderRadius: '14px',
        background: 'rgba(200,138,74,0.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--caramel)',
        marginBottom: '24px',
        transition: 'background 0.3s, color 0.3s',
        flexShrink: 0,
      }}
        className="ritual-icon"
      >
        {ritual.icon}
      </div>

      <h3 className="card-heading" style={{ marginBottom: '12px' }}>{ritual.title}</h3>
      <p className="body-text" style={{ fontSize: '0.9rem', lineHeight: 1.65, flex: 1 }}>{ritual.description}</p>

      {/* Bottom accent line */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: '2px',
        background: 'linear-gradient(90deg, var(--caramel), var(--gold))',
        borderRadius: '0 0 var(--radius-card) var(--radius-card)',
        opacity: 0,
        transition: 'opacity 0.35s ease',
      }} className="ritual-line" />

      <style>{`
        .card:hover .ritual-icon { background: var(--caramel) !important; color: var(--bg) !important; }
        .card:hover .ritual-line { opacity: 1 !important; }
      `}</style>
    </motion.div>
  );
}
