'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

export default function TastingSection() {
  const ref   = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="section-pad" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            position: 'relative',
            borderRadius: '28px',
            overflow: 'hidden',
            minHeight: 'clamp(560px, 65vh, 680px)',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {/* Background image */}
          <Image
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1400&q=80"
            alt="Coffee tasting evening at Ember and Oak"
            fill
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
          />
          {/* Dark overlay — stronger for legibility */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(105deg, rgba(18,16,14,0.94) 0%, rgba(18,16,14,0.72) 55%, rgba(18,16,14,0.52) 100%)',
          }} />

          {/* Animated warm glow */}
          <motion.div
            style={{ position: 'absolute', inset: 0, opacity: 0.22, pointerEvents: 'none' }}
            animate={{
              background: [
                'radial-gradient(circle at 15% 50%, rgba(200,138,74,0.22), transparent 55%)',
                'radial-gradient(circle at 80% 50%, rgba(200,138,74,0.22), transparent 55%)',
                'radial-gradient(circle at 15% 50%, rgba(200,138,74,0.22), transparent 55%)',
              ],
            }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Steam lines */}
          {[0, 1, 2, 3].map(i => (
            <motion.div
              key={i}
              style={{
                position: 'absolute',
                width: '1px', height: '72px',
                left: `${18 + i * 20}%`, bottom: '16%',
                background: 'linear-gradient(to top, transparent, rgba(200,138,74,0.15), transparent)',
                pointerEvents: 'none',
              }}
              animate={{ opacity: [0, 0.45, 0], y: [0, -44, -96], scaleX: [1, 1.6, 0.5] }}
              transition={{ duration: 3.5 + i * 0.4, repeat: Infinity, delay: i * 0.5, ease: 'easeOut' }}
            />
          ))}

          {/* Content */}
          <div style={{
            position: 'relative', zIndex: 1,
            width: '100%',
            padding: 'clamp(56px, 8vw, 120px)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '48px',
          }}>
            {/* Left text */}
            <div style={{ maxWidth: '540px' }}>
              <motion.span
                className="label-text"
                style={{ display: 'block', marginBottom: '18px' }}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 }}
              >
                Weekly Experience
              </motion.span>

              <motion.h2
                className="section-heading"
                style={{ marginBottom: '24px' }}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 }}
              >
                Friday<br />
                <span className="text-grad">Tasting Evenings</span>
              </motion.h2>

              <motion.p
                className="body-text"
                style={{ maxWidth: '440px', marginBottom: 'clamp(32px, 4vw, 48px)', color: 'var(--muted-strong)', lineHeight: '1.88' }}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 }}
              >
                Join our guided tasting ritual and discover espresso notes, roast profiles, brewing methods, and pairing experiences.
              </motion.p>

              {/* Details row */}
              <motion.div
                style={{ display: 'flex', flexWrap: 'wrap', gap: '32px' }}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.5 }}
              >
                {[
                  { label: 'Time',     val: '6:00 – 8:00 PM' },
                  { label: 'Duration', val: '2 Hours'         },
                  { label: 'Guests',   val: 'Max 12'          },
                ].map(d => (
                  <div key={d.label}>
                    <p className="label-text" style={{ color: 'rgba(243,230,208,0.38)', marginBottom: '6px' }}>{d.label}</p>
                    <p style={{ fontSize: '0.95rem', color: 'var(--cream)', fontWeight: 500 }}>{d.val}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right CTA */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.45, duration: 0.6 }}
            >
              <button
                className="btn-primary"
                onClick={() => document.querySelector('#visit')?.scrollIntoView({ behavior: 'smooth' })}
                style={{ fontSize: '1rem', padding: '18px 48px', minHeight: '60px' }}
              >
                Book a Tasting
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}