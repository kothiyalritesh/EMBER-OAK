'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const stagger = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.14, delayChildren: 0.2 } },
};
const item = {
  hidden:  { y: 40, opacity: 0 },
  visible: { y: 0,  opacity: 1, transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] } },
};

export default function Hero() {
  return (
    <section
      id="hero"
      aria-label="Hero — Ember and Oak"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        paddingTop:    'clamp(80px, 10vh, 100px)',
        paddingBottom: 'clamp(60px, 6vh, 80px)',
        background: 'linear-gradient(155deg, #1E1510 0%, #12100E 50%, #0D0B09 100%)',
      }}
    >
      {/* ── Ambient glows ── */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '5%', right: '0%',
        width: 'clamp(600px, 65vw, 1000px)', height: 'clamp(600px, 65vw, 1000px)',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(200,138,74,0.06) 0%, transparent 60%)',
        pointerEvents: 'none', zIndex: 0, filter: 'blur(2px)',
      }} />
      <div aria-hidden="true" style={{
        position: 'absolute', bottom: '0%', left: '-5%',
        width: 'clamp(400px, 50vw, 800px)', height: 'clamp(400px, 50vw, 800px)',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(58,36,24,0.5) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* ── Main layout ── */}
      <div className="container" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
        <div className="hero-grid">

          {/* ── LEFT: Text ── */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            style={{ position: 'relative', zIndex: 10, isolation: 'isolate', maxWidth: '580px' }}
          >
            {/* Status pill */}
            <motion.div variants={item} style={{ marginBottom: 'clamp(24px, 2.5vw, 32px)' }}>
              <span className="hero-status" style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                padding: '12px 28px',
                border: '1px solid rgba(200,138,74,0.32)',
                borderRadius: '999px',
                background: 'rgba(58,36,24,0.6)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                boxShadow: '0 4px 28px rgba(0,0,0,0.35)',
              }}>
                <span style={{
                  width: '7px', height: '7px', borderRadius: '50%',
                  background: 'var(--caramel)',
                  animation: 'glow-pulse 2.4s ease-in-out infinite',
                  flexShrink: 0,
                }} />
                <span className="label-text" style={{ fontSize: '12px' }}>
                  Now Open · Indiranagar, Bengaluru
                </span>
              </span>
            </motion.div>

            {/* Headline - using globals.css hero-headline for fluid sizing */}
            <motion.h1
              variants={item}
              className="hero-headline"
              style={{
                marginBottom: 'clamp(22px, 2.8vw, 36px)',
                position: 'relative',
                zIndex: 10,
                isolation: 'isolate',
              }}
            >
              <span style={{ color: 'var(--cream)', display: 'block' }}>Slow Roasted.</span>
              <span className="text-grad" style={{ display: 'block' }}>Beautifully Served.</span>
            </motion.h1>

            {/* Body */}
            <motion.p
              variants={item}
              style={{
                maxWidth: '480px',
                marginBottom: 'clamp(36px, 4.5vw, 56px)',
                fontSize: 'clamp(1.05rem, 1.3vw, 1.18rem)',
                lineHeight: '1.9',
                color: 'var(--muted-strong)',
                fontWeight: 400,
              }}
            >
              An artisan coffee house crafted for quiet mornings, warm conversations,
              and perfectly balanced brews.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={item}
              className="hero-actions"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 'clamp(14px, 2vw, 22px)',
                marginBottom: 'clamp(44px, 5.5vw, 72px)',
              }}
            >
              <button
                className="btn-primary"
                onClick={() => document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth' })}
                aria-label="Explore our menu"
              >
                Explore Menu
                <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              <button
                className="btn-secondary"
                onClick={() => document.querySelector('#visit')?.scrollIntoView({ behavior: 'smooth' })}
                aria-label="Reserve a table"
              >
                Reserve a Table
              </button>
            </motion.div>

            {/* Social proof */}
            <motion.div
              className="hero-social-proof"
              variants={item}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'clamp(20px, 2.5vw, 32px)',
                paddingTop: '32px',
                borderTop: '1px solid rgba(243,230,208,0.1)',
              }}
            >
              <div style={{ display: 'flex', flexShrink: 0 }} aria-hidden="true">
                {['#C88A4A', '#8B5E3C', '#D6A15F'].map((bg, i) => (
                  <div key={i} style={{
                    width: '46px', height: '46px', borderRadius: '50%',
                    border: '2.5px solid #12100E',
                    background: `linear-gradient(135deg, ${bg}, #3A2418)`,
                    marginLeft: i > 0 ? '-13px' : '0',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.45)',
                  }} />
                ))}
              </div>
              <div>
                <p style={{
                  fontSize: 'clamp(0.92rem, 1.1vw, 1.02rem)',
                  fontWeight: 600,
                  color: 'var(--cream)',
                  marginBottom: '4px',
                  lineHeight: 1.3,
                }}>
                  4.9 ★ from 500+ guests
                </p>
                <p style={{
                  fontSize: 'clamp(0.84rem, 0.95vw, 0.9rem)',
                  color: 'var(--muted)',
                  lineHeight: 1.4,
                }}>
                  Bengaluru’s favourite craft coffee
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Image ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.3, delay: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ position: 'relative', zIndex: 5, width: '100%' }}
          >
            {/* Main image wrapper - 20-25% wider than before */}
            <div style={{
              position: 'relative',
              borderRadius: 'var(--radius-img)',
              overflow: 'hidden',
              width: '100%',
              maxWidth: 'clamp(440px, 42vw, 600px)',
              marginLeft: 'auto',
              aspectRatio: '4/5',
              boxShadow: 'var(--shadow-hero)',
              transform: 'translateZ(0)',
            }}>
              <Image
                src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1000&q=90"
                alt="Premium artisan coffee cup with latte art at Ember and Oak"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 42vw"
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center 30%',
                  transition: 'transform 1.2s cubic-bezier(0.25,0.1,0.25,1)',
                }}
                className="hero-img"
              />
              {/* Gradient overlay */}
              <div aria-hidden="true" style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(180deg, rgba(18,16,14,0.08) 0%, rgba(18,16,14,0.5) 100%)',
                pointerEvents: 'none',
              }} />
              {/* Warm glow inside image */}
              <div aria-hidden="true" style={{
                position: 'absolute', top: '-10%', right: '-10%',
                width: '65%', height: '65%', borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(200,138,74,0.2) 0%, transparent 65%)',
                pointerEvents: 'none',
                filter: 'blur(32px)',
              }} />
            </div>

            {/* Badge: Single Origin */}
            <motion.div
              className="hero-origin-badge"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              style={{
                position: 'absolute',
                bottom: 'clamp(36px, 5vw, 60px)',
                left:   'clamp(-28px, -4vw, -44px)',
                padding: '18px 26px',
                background: 'rgba(10,8,6,0.94)',
                backdropFilter: 'blur(28px)',
                WebkitBackdropFilter: 'blur(28px)',
                border: '1px solid rgba(200,138,74,0.3)',
                borderRadius: '20px',
                zIndex: 6,
                boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
              }}
            >
              <p style={{
                fontSize: '11px',
                color: 'var(--caramel)',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-accent)',
                marginBottom: '6px',
              }}>Single Origin</p>
              <p style={{
                fontSize: '1rem',
                color: 'var(--cream)',
                fontWeight: 500,
                lineHeight: 1.3,
              }}>Ethically Sourced</p>
            </motion.div>

            {/* Badge: Artisan Roast */}
            <motion.div
              className="hero-roast-badge"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              style={{
                position: 'absolute',
                top:   'clamp(36px, 5vw, 60px)',
                right: 'clamp(-16px, -2vw, -24px)',
                padding: '14px 22px',
                background: 'rgba(10,8,6,0.94)',
                backdropFilter: 'blur(28px)',
                WebkitBackdropFilter: 'blur(28px)',
                border: '1px solid rgba(200,138,74,0.3)',
                borderRadius: '18px',
                zIndex: 7,
                boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
              }}
            >
              <p style={{
                fontSize: '11px',
                color: 'var(--caramel)',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-accent)',
              }}>Artisan Roast</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8 }}
        aria-hidden="true"
        style={{
          position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px',
          zIndex: 3,
        }}
      >
        <span className="label-text" style={{ fontSize: '9px', color: 'rgba(243,230,208,0.25)', letterSpacing: '0.3em' }}>
          SCROLL
        </span>
        <motion.div
          style={{ width: '1px', background: 'linear-gradient(to bottom, var(--caramel), transparent)', borderRadius: '1px' }}
          animate={{ height: [8, 40, 8] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* ── Responsive grid styles ── */}
      <style>{`
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1.3fr;
          gap: clamp(80px, 12vw, 160px);
          align-items: center;
        }
        .hero-img:hover { transform: scale(1.04) !important; }

        /* Desktop large (1600px+) - balanced two-column */
        @media (min-width: 1600px) {
          .hero-grid {
            gap: 180px;
          }
        }

        /* Desktop (1200-1599px) */
        @media (max-width: 1199px) {
          .hero-grid {
            gap: clamp(60px, 8vw, 100px);
          }
        }

        /* Laptop (992-1199px) */
        @media (max-width: 992px) {
          .hero-grid {
            gap: clamp(40px, 6vw, 72px);
          }
        }

        /* Tablet (768-991px) - stack vertically, text first */
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr;
            gap: clamp(48px, 8vw, 64px);
          }
          #hero {
            padding-top: 100px !important;
            padding-bottom: 60px !important;
            min-height: auto !important;
          }
        }

        /* Mobile (<768px) - fully stacked, centered */
        @media (max-width: 480px) {
          .hero-grid {
            gap: 40px;
          }
          #hero {
            padding-top: 90px !important;
            padding-bottom: 48px !important;
          }
          .hero-status {
            max-width: 100%;
            padding: 10px 14px !important;
          }
          .hero-status .label-text {
            font-size: 9px !important;
            letter-spacing: 0.13em !important;
            white-space: nowrap;
          }
          .hero-actions .btn-primary,
          .hero-actions .btn-secondary {
            width: 100%;
          }
          .hero-origin-badge {
            left: 12px !important;
            bottom: 18px !important;
            padding: 14px 18px !important;
          }
          .hero-roast-badge {
            top: 14px !important;
            right: 12px !important;
            padding: 11px 15px !important;
          }
        }
      `}</style>
    </section>
  );
}
