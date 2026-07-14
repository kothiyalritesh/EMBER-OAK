'use client';

import { useState } from 'react';

const exploreLinks = [
  { label: 'Our Ritual', href: '#ritual' },
  { label: 'Menu',       href: '#menu'   },
  { label: 'The Space',  href: '#space'  },
  { label: 'Visit Us',   href: '#visit'  },
];

const socialLinks = [
  { label: 'Instagram',   href: '#',      external: false },
  { label: 'Facebook',    href: '#',      external: false },
  { label: 'Google Maps', href: 'https://www.google.com/maps/search/?api=1&query=Indiranagar+Bengaluru', external: true },
  { label: 'Contact',     href: '#visit', external: false },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const [email,     setEmail]     = useState('');
  const [subState,  setSubState]  = useState('idle'); // idle | success | error

  const go = (href) => {
    if (href.startsWith('#')) {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) { setSubState('error'); return; }
    setSubState('success');
    setEmail('');
    setTimeout(() => setSubState('idle'), 4000);
  };

  const linkStyle = {
    background: 'none', border: 'none', cursor: 'pointer',
    fontSize: 'clamp(0.875rem, 1vw, 0.95rem)',
    color: 'rgba(243,230,208,0.55)',
    transition: 'color 0.3s ease',
    padding: '3px 0',
    textAlign: 'left',
    lineHeight: 1.6,
  };

  return (
    <footer style={{
      position: 'relative',
      borderTop: '1px solid rgba(243,230,208,0.07)',
      background: 'linear-gradient(180deg, transparent, rgba(20,14,10,0.6))',
    }}>
      {/* Top glow line */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: 'clamp(120px, 20vw, 240px)', height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(200,138,74,0.25), transparent)',
      }} />

      <div className="container" style={{ paddingTop: 'clamp(100px, 12vw, 160px)', paddingBottom: 'clamp(48px, 6vw, 72px)' }}>
        {/* Main grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
          gap: 'clamp(48px, 6vw, 80px)',
          marginBottom: 'clamp(56px, 7vw, 88px)',
        }}>

          {/* Brand */}
          <div>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Scroll to top"
              style={{
                fontFamily: 'var(--font-wordmark)',
                fontSize: 'clamp(1.1rem, 1.3vw, 1.25rem)',
                letterSpacing: '0.15em',
                color: 'var(--cream)',
                background: 'none', border: 'none', cursor: 'pointer',
                display: 'block', marginBottom: '20px',
                transition: 'color 0.3s',
                padding: 0,
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--caramel)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--cream)'}
            >
              EMBER & OAK
            </button>
            <p style={{
              fontSize: 'clamp(0.9rem, 1vw, 1rem)',
              color: 'rgba(243,230,208,0.55)',
              lineHeight: 1.85,
              maxWidth: '260px',
            }}>
              An artisan coffee house for slow mornings, warm conversations, and beautifully balanced brews.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-accent)',
              fontSize: '12px', letterSpacing: '0.22em', textTransform: 'uppercase',
              color: 'var(--caramel)', marginBottom: '24px',
            }}>
              Explore
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {exploreLinks.map(l => (
                <li key={l.label}>
                  <button
                    onClick={() => go(l.href)}
                    style={linkStyle}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--caramel)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(243,230,208,0.55)'}
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-accent)',
              fontSize: '12px', letterSpacing: '0.22em', textTransform: 'uppercase',
              color: 'var(--caramel)', marginBottom: '24px',
            }}>
              Connect
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {socialLinks.map(l => (
                <li key={l.label}>
                  {l.external ? (
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ ...linkStyle, display: 'inline-block', textDecoration: 'none' }}
                      onMouseEnter={e => e.currentTarget.style.color = 'var(--caramel)'}
                      onMouseLeave={e => e.currentTarget.style.color = 'rgba(243,230,208,0.55)'}
                    >
                      {l.label}
                    </a>
                  ) : (
                    <button
                      onClick={() => go(l.href)}
                      style={linkStyle}
                      onMouseEnter={e => e.currentTarget.style.color = 'var(--caramel)'}
                      onMouseLeave={e => e.currentTarget.style.color = 'rgba(243,230,208,0.55)'}
                    >
                      {l.label}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter - made more prominent */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-accent)',
              fontSize: '12px', letterSpacing: '0.22em', textTransform: 'uppercase',
              color: 'var(--caramel)', marginBottom: '24px',
            }}>
              Stay Updated
            </h4>
            <p style={{
              fontSize: 'clamp(0.9rem, 1vw, 1rem)',
              color: 'var(--muted)',
              marginBottom: '22px',
              lineHeight: 1.8,
            }}>
              Tasting events, new brews, and seasonal menus — delivered to your inbox.
            </p>

            {subState === 'success' ? (
              <p style={{
                fontSize: '0.9rem',
                color: 'var(--caramel)',
                padding: '14px 18px',
                background: 'rgba(200,138,74,0.08)',
                border: '1px solid rgba(200,138,74,0.2)',
                borderRadius: '12px',
                lineHeight: 1.5,
              }}>
                ✓ You’re on the list!
              </p>
            ) : (
              <form onSubmit={handleSubscribe} noValidate aria-label="Newsletter signup">
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="email"
                    value={email}
                    onChange={e => { setEmail(e.target.value); setSubState('idle'); }}
                    placeholder="Your email address"
                    aria-label="Email address for newsletter"
                    aria-invalid={subState === 'error'}
                    style={{
                      flex: 1,
                      height: '52px',
                      padding: '0 16px',
                      background: 'rgba(243,230,208,0.04)',
                      border: `1px solid ${subState === 'error' ? 'rgba(224,112,112,0.5)' : 'rgba(243,230,208,0.12)'}`,
                      borderRadius: '12px',
                      color: 'var(--cream)',
                      fontSize: '0.875rem',
                      outline: 'none',
                      minWidth: 0,
                      transition: 'border-color 0.3s, box-shadow 0.3s',
                    }}
                    onFocus={e => { e.target.style.borderColor = 'var(--caramel)'; e.target.style.boxShadow = '0 0 0 3px rgba(200,138,74,0.12)'; }}
                    onBlur={e => { e.target.style.borderColor = subState === 'error' ? 'rgba(224,112,112,0.5)' : 'rgba(243,230,208,0.12)'; e.target.style.boxShadow = 'none'; }}
                  />
                  <button
                    type="submit"
                    style={{
                      height: '52px',
                      padding: '0 24px',
                      background: 'linear-gradient(135deg, var(--caramel), var(--gold))',
                      color: '#0E0B09',
                      border: 'none',
                      borderRadius: '12px',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      letterSpacing: '0.03em',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(200,138,74,0.3)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
                  >
                    Join
                  </button>
                </div>
                {subState === 'error' && (
                  <p style={{ fontSize: '0.75rem', color: '#e07070', marginTop: '6px' }}>
                    Please enter a valid email address.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="section-sep" style={{ marginBottom: 'clamp(28px, 3.5vw, 36px)' }} />

        {/* Bottom bar */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '18px',
        }}>
          <p style={{ fontSize: '0.8rem', color: 'rgba(243,230,208,0.3)', lineHeight: 1.5 }}>
            &copy; {year} EMBER & OAK. Crafted with warmth.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px', flexWrap: 'wrap' }}>
            <a
              href="https://github.com/kothiyalritesh/EMBER-OAK"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: '0.8rem',
                color: 'rgba(243,230,208,0.35)',
                textDecoration: 'none',
                border: '1px solid rgba(243,230,208,0.1)',
                padding: '6px 14px',
                borderRadius: '999px',
                transition: 'border-color 0.3s, color 0.3s',
                lineHeight: 1,
              }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--cream)'; e.currentTarget.style.borderColor = 'rgba(200,138,74,0.35)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(243,230,208,0.35)'; e.currentTarget.style.borderColor = 'rgba(243,230,208,0.1)'; }}
            >
              View GitHub
            </a>
            <span style={{ fontSize: '0.8rem', color: 'rgba(243,230,208,0.2)', letterSpacing: '0.04em' }}>
              Slow roasted. Beautifully served.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
