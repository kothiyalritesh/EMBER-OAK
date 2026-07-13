'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { label: 'Ritual', href: '#ritual' },
  { label: 'Menu',   href: '#menu'   },
  { label: 'Origin', href: '#origin' },
  { label: 'Space',  href: '#space'  },
  { label: 'Visit',  href: '#visit'  },
];

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const go = (href) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          height: '72px',
          transition: 'background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease',
          background: scrolled ? 'rgba(18,16,14,0.88)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(243,230,208,0.08)' : '1px solid transparent',
        }}
      >
        <div className="container" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{
              fontFamily: 'var(--font-wordmark)',
              fontSize: '1.15rem',
              letterSpacing: '0.14em',
              color: 'var(--cream)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              transition: 'color 0.3s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--caramel)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--cream)'}
          >
            EMBER &amp; OAK
          </button>

          {/* Desktop links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '36px' }} className="nav-desktop">
            {NAV_LINKS.map(link => (
              <button
                key={link.label}
                onClick={() => go(link.href)}
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.9rem',
                  letterSpacing: '0.04em',
                  color: 'rgba(243,230,208,0.72)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  position: 'relative',
                  padding: '4px 0',
                  transition: 'color 0.3s',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--cream)'; e.currentTarget.querySelector('span').style.width = '100%'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(243,230,208,0.72)'; e.currentTarget.querySelector('span').style.width = '0'; }}
              >
                {link.label}
                <span style={{
                  position: 'absolute', bottom: 0, left: 0,
                  height: '1px', width: '0',
                  background: 'var(--caramel)',
                  transition: 'width 0.3s ease',
                }} />
              </button>
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={() => go('#visit')}
            className="btn-primary nav-cta"
            style={{ padding: '10px 24px', minHeight: '42px', fontSize: '0.85rem' }}
          >
            Reserve a Table
          </button>

          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Toggle menu"
            className="nav-hamburger"
            style={{
              display: 'none',
              flexDirection: 'column',
              gap: '5px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
            }}
          >
            {[0,1,2].map(i => (
              <motion.span
                key={i}
                style={{ display: 'block', width: '24px', height: '1.5px', background: 'var(--cream)', borderRadius: '2px' }}
                animate={
                  i === 0 ? (mobileOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }) :
                  i === 1 ? (mobileOpen ? { opacity: 0 } : { opacity: 1 }) :
                             (mobileOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 })
                }
                transition={{ duration: 0.28 }}
              />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 99,
              background: 'rgba(18,16,14,0.97)',
              backdropFilter: 'blur(24px)',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: '32px',
            }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.button
                key={link.label}
                onClick={() => go(link.href)}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.38 }}
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.6rem, 6vw, 2.4rem)',
                  color: 'var(--cream)',
                  background: 'none', border: 'none', cursor: 'pointer',
                  transition: 'color 0.3s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--caramel)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--cream)'}
              >
                {link.label}
              </motion.button>
            ))}
            <motion.button
              onClick={() => go('#visit')}
              className="btn-primary"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38, duration: 0.38 }}
              style={{ marginTop: '8px', width: '220px', justifyContent: 'center' }}
            >
              Reserve a Table
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 767px) {
          .nav-desktop { display: none !important; }
          .nav-cta     { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
