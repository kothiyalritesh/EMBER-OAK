'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';

const NAV_LINKS = [
  { label: 'Ritual', href: '#ritual' },
  { label: 'Menu',   href: '#menu'   },
  { label: 'Origin', href: '#origin' },
  { label: 'Space',  href: '#space'  },
  { label: 'Visit',  href: '#visit'  },
];

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active,     setActive]     = useState('');
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.25 });

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      // Active section tracking
      const sections = NAV_LINKS.map(l => document.querySelector(l.href));
      let current = '';
      sections.forEach(sec => {
        if (!sec) return;
        const rect = sec.getBoundingClientRect();
        if (rect.top <= 120) current = '#' + sec.id;
      });
      setActive(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const go = useCallback((href) => {
    setMobileOpen(false);
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }, mobileOpen ? 300 : 0);
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        role="navigation"
        aria-label="Main navigation"
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          height: '72px',
          transition: 'background 0.45s ease, border-color 0.45s ease, box-shadow 0.45s ease',
          background: scrolled ? 'rgba(14,11,9,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(24px) saturate(1.4)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(1.4)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(243,230,208,0.08)' : '1px solid transparent',
          boxShadow: scrolled ? '0 4px 32px rgba(0,0,0,0.25)' : 'none',
        }}
      >
        <motion.div
          aria-hidden="true"
          style={{
            scaleX: smoothProgress,
            transformOrigin: '0 50%',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: 'linear-gradient(90deg, var(--caramel), var(--gold))',
          }}
        />
        <div className="container" style={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px',
        }}>
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Ember and Oak — scroll to top"
            style={{
              fontFamily: 'var(--font-wordmark)',
              fontSize: 'clamp(1rem, 1.3vw, 1.2rem)',
              letterSpacing: '0.15em',
              color: 'var(--cream)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              transition: 'color 0.3s ease',
              flexShrink: 0,
              padding: '4px 0',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--caramel)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--cream)'}
          >
            EMBER &amp; OAK
          </button>

          {/* Desktop links */}
          <div
            className="nav-desktop"
            style={{ display: 'flex', alignItems: 'center', gap: 'clamp(24px, 3vw, 40px)' }}
          >
            {NAV_LINKS.map(link => {
              const isActive = active === link.href;
              return (
                <button
                  key={link.label}
                  onClick={() => go(link.href)}
                  aria-current={isActive ? 'page' : undefined}
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(0.82rem, 0.95vw, 0.92rem)',
                    letterSpacing: '0.04em',
                    color: isActive ? 'var(--cream)' : 'rgba(243,230,208,0.65)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    position: 'relative',
                    padding: '6px 0',
                    transition: 'color 0.3s ease',
                  }}
                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = 'rgba(243,230,208,0.9)'; }}
                  onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = 'rgba(243,230,208,0.65)'; }}
                >
                  {link.label}
                  <span style={{
                    position: 'absolute', bottom: 0, left: 0,
                    height: '1.5px',
                    width: isActive ? '100%' : '0',
                    background: 'linear-gradient(90deg, var(--caramel), var(--gold))',
                    transition: 'width 0.35s ease',
                    borderRadius: '2px',
                  }} className="nav-underline" />
                </button>
              );
            })}
          </div>

          {/* CTA */}
          <button
            onClick={() => go('#visit')}
            className="btn-primary nav-cta"
            style={{ padding: '10px 22px', minHeight: '40px', fontSize: '0.82rem', letterSpacing: '0.04em' }}
            aria-label="Reserve a table"
          >
            Reserve a Table
          </button>

          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen(v => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            className="nav-hamburger"
            style={{
              display: 'none',
              flexDirection: 'column',
              gap: '5px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '10px 8px',
              borderRadius: '8px',
              transition: 'background 0.2s',
            }}
          >
            {[0, 1, 2].map(i => (
              <motion.span
                key={i}
                style={{
                  display: 'block',
                  width: i === 1 ? '18px' : '24px',
                  height: '1.5px',
                  background: 'var(--cream)',
                  borderRadius: '2px',
                  transformOrigin: 'center',
                }}
                animate={
                  i === 0 ? (mobileOpen ? { rotate: 45, y: 6.5, width: '24px' } : { rotate: 0, y: 0, width: '24px' }) :
                  i === 1 ? (mobileOpen ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }) :
                             (mobileOpen ? { rotate: -45, y: -6.5, width: '24px' } : { rotate: 0, y: 0, width: '24px' })
                }
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              />
            ))}
          </button>
        </div>
      </motion.nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              position: 'fixed', inset: 0, zIndex: 99,
              background: 'rgba(12,10,8,0.97)',
              backdropFilter: 'blur(28px)',
              WebkitBackdropFilter: 'blur(28px)',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: '8px',
            }}
          >
            {/* Ambient glow */}
            <div aria-hidden="true" style={{
              position: 'absolute',
              width: '400px', height: '400px', borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(200,138,74,0.06) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />

            {NAV_LINKS.map((link, i) => (
              <motion.button
                key={link.label}
                onClick={() => go(link.href)}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 + 0.1, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(2rem, 7vw, 2.8rem)',
                  color: active === link.href ? 'var(--caramel)' : 'var(--cream)',
                  background: 'none', border: 'none', cursor: 'pointer',
                  transition: 'color 0.3s',
                  padding: '8px 24px',
                  letterSpacing: '-0.01em',
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--caramel)'}
                onMouseLeave={e => e.currentTarget.style.color = active === link.href ? 'var(--caramel)' : 'var(--cream)'}
              >
                {link.label}
              </motion.button>
            ))}

            <motion.button
              onClick={() => go('#visit')}
              className="btn-primary"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.4 }}
              style={{ marginTop: '24px', minWidth: '200px', justifyContent: 'center' }}
            >
              Reserve a Table
            </motion.button>

            {/* Bottom tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              style={{
                position: 'absolute', bottom: '32px',
                fontFamily: 'var(--font-accent)',
                fontSize: '10px', letterSpacing: '0.22em',
                color: 'rgba(243,230,208,0.2)',
                textTransform: 'uppercase',
              }}
            >
              Slow Roasted · Beautifully Served
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 767px) {
          .nav-desktop { display: none !important; }
          .nav-cta     { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
        .nav-desktop button:hover .nav-underline { width: 100% !important; }
      `}</style>
    </>
  );
}
