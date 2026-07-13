'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const Coffee3D = dynamic(() => import('./Coffee3D'), {
  ssr: false,
  loading: () => (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(200,138,74,0.08)', animation: 'glow-pulse 2s ease-in-out infinite' }} />
    </div>
  ),
});

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.14, delayChildren: 0.2 } },
};
const item = {
  hidden: { y: 48, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.25,0.1,0.25,1] } },
};

export default function Hero() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        paddingTop: '96px',
        paddingBottom: '60px',
        background: 'linear-gradient(160deg, #1D1713 0%, #12100E 60%)',
      }}
    >
      {/* Background glow */}
      <div style={{
        position: 'absolute', top: '20%', right: '10%',
        width: '600px', height: '600px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(200,138,74,0.07) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '10%', left: '5%',
        width: '400px', height: '400px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(58,36,24,0.5) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
          gap: 'clamp(40px, 6vw, 80px)',
          alignItems: 'center',
        }}>

          {/* ── Left: Text ── */}
          <motion.div variants={stagger} initial="hidden" animate={inView ? 'visible' : 'hidden'}>

            {/* Label */}
            <motion.div variants={item} style={{ marginBottom: '28px' }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '7px 16px',
                border: '1px solid rgba(200,138,74,0.22)',
                borderRadius: '999px',
                background: 'rgba(58,36,24,0.35)',
                backdropFilter: 'blur(8px)',
              }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--caramel)', animation: 'glow-pulse 2s ease-in-out infinite' }} />
                <span className="label-text" style={{ fontSize: '10px' }}>Now Open · Indiranagar, Bengaluru</span>
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1 variants={item} className="hero-headline" style={{ marginBottom: '24px' }}>
              <span style={{ color: 'var(--cream)', display: 'block' }}>Slow Roasted.</span>
              <span className="text-grad" style={{ display: 'block' }}>Beautifully Served.</span>
            </motion.h1>

            {/* Sub */}
            <motion.p variants={item} className="body-text" style={{ maxWidth: '440px', marginBottom: '40px', fontSize: '1.05rem' }}>
              An artisan coffee house crafted for quiet mornings, warm conversations, and perfectly balanced brews.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={item} style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginBottom: '48px' }}>
              <button
                className="btn-primary"
                onClick={() => document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Explore Menu
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              <button
                className="btn-secondary"
                onClick={() => document.querySelector('#visit')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Reserve a Table
              </button>
            </motion.div>

            {/* Social proof */}
            <motion.div variants={item} style={{
              display: 'flex', alignItems: 'center', gap: '16px',
              paddingTop: '28px',
              borderTop: '1px solid rgba(243,230,208,0.07)',
            }}>
              <div style={{ display: 'flex' }}>
                {[0,1,2].map(i => (
                  <div key={i} style={{
                    width: '34px', height: '34px', borderRadius: '50%',
                    border: '2px solid #12100E',
                    background: `linear-gradient(135deg, #C88A4A, #3A2418)`,
                    marginLeft: i > 0 ? '-10px' : '0',
                  }} />
                ))}
              </div>
              <div>
                <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--cream)' }}>4.9 ★ from 500+ guests</p>
                <p style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>Bengaluru's favourite craft coffee</p>
              </div>
            </motion.div>
          </motion.div>

          {/* ── Right: Visual ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.4, ease: [0.25,0.1,0.25,1] }}
            style={{ position: 'relative' }}
          >
            {/* Coffee image */}
            <div style={{
              position: 'relative',
              borderRadius: 'var(--radius-img)',
              overflow: 'hidden',
              aspectRatio: '4/5',
              maxHeight: '580px',
              boxShadow: '0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(200,138,74,0.08)',
            }}>
              <Image
                src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80"
                alt="Premium artisan coffee cup with latte art"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover', objectPosition: 'center' }}
              />
              {/* Warm overlay */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(180deg, rgba(18,16,14,0.1) 0%, rgba(18,16,14,0.45) 100%)',
              }} />
              {/* Glow */}
              <div style={{
                position: 'absolute', top: '-20%', right: '-20%',
                width: '70%', height: '70%', borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(200,138,74,0.18) 0%, transparent 65%)',
                pointerEvents: 'none',
              }} />
            </div>

            {/* 3D bean overlay */}
            <div style={{
              position: 'absolute',
              top: '-40px', right: '-40px',
              width: '180px', height: '180px',
              zIndex: 2,
            }}>
              <Coffee3D />
            </div>

            {/* Floating labels */}
            <div style={{
              position: 'absolute', bottom: '28px', left: '-16px',
              padding: '10px 18px',
              background: 'rgba(18,16,14,0.82)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(200,138,74,0.18)',
              borderRadius: '12px',
              zIndex: 2,
            }}>
              <p style={{ fontSize: '11px', color: 'var(--caramel)', letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'var(--font-accent)' }}>Single Origin</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--cream)', marginTop: '2px' }}>Ethically Sourced</p>
            </div>

            <div style={{
              position: 'absolute', top: '28px', right: '-8px',
              padding: '8px 14px',
              background: 'rgba(18,16,14,0.82)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(200,138,74,0.18)',
              borderRadius: '10px',
              zIndex: 2,
            }}>
              <p style={{ fontSize: '11px', color: 'var(--caramel)', letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'var(--font-accent)' }}>Artisan Roast</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        style={{
          position: 'absolute', bottom: '28px', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
        }}
      >
        <span className="label-text" style={{ fontSize: '9px', color: 'rgba(243,230,208,0.28)' }}>Scroll</span>
        <motion.div
          style={{ width: '1px', background: 'linear-gradient(to bottom, var(--caramel), transparent)' }}
          animate={{ height: [8, 28, 8] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      <style>{`
        @media (max-width: 767px) {
          #hero { padding-top: 88px !important; }
        }
      `}</style>
    </section>
  );
}
