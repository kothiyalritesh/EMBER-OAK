'use client';

const exploreLinks = [
  { label: 'Our Ritual', href: '#ritual' },
  { label: 'Menu',       href: '#menu'   },
  { label: 'The Space',  href: '#space'  },
  { label: 'Visit Us',   href: '#visit'  },
];

const socialLinks = [
  { label: 'Instagram', href: '#' },
  { label: 'Facebook',  href: '#' },
  { label: 'Google Maps', href: '#' },
  { label: 'Contact',   href: '#visit' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  const go = (href) => {
    if (href.startsWith('#')) {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer style={{
      position: 'relative',
      borderTop: '1px solid rgba(243,230,208,0.07)',
      background: 'linear-gradient(180deg, transparent, rgba(58,36,24,0.18))',
    }}>
      {/* Top glow line */}
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: '200px', height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(200,138,74,0.2), transparent)',
      }} />

      <div className="container" style={{ paddingTop: '72px', paddingBottom: '40px' }}>
        {/* Main grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 'clamp(32px, 4vw, 56px)',
          marginBottom: '56px',
        }}>

          {/* Brand */}
          <div style={{ gridColumn: 'span 1' }}>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              style={{
                fontFamily: 'var(--font-wordmark)',
                fontSize: '1.1rem',
                letterSpacing: '0.14em',
                color: 'var(--cream)',
                background: 'none', border: 'none', cursor: 'pointer',
                display: 'block', marginBottom: '16px',
                transition: 'color 0.3s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--caramel)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--cream)'}
            >
              EMBER &amp; OAK
            </button>
            <p style={{
              fontSize: '0.875rem',
              color: 'rgba(243,230,208,0.42)',
              lineHeight: 1.7,
              maxWidth: '240px',
            }}>
              An artisan coffee house for slow mornings, warm conversations, and beautifully balanced brews.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-accent)',
              fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'var(--caramel)', marginBottom: '20px',
            }}>
              Explore
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {exploreLinks.map(l => (
                <li key={l.label}>
                  <button
                    onClick={() => go(l.href)}
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      fontSize: '0.9rem',
                      color: 'rgba(243,230,208,0.5)',
                      transition: 'color 0.3s',
                      padding: 0,
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--caramel)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(243,230,208,0.5)'}
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
              fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'var(--caramel)', marginBottom: '20px',
            }}>
              Connect
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {socialLinks.map(l => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    onClick={l.href.startsWith('#') ? (e) => { e.preventDefault(); go(l.href); } : undefined}
                    style={{
                      fontSize: '0.9rem',
                      color: 'rgba(243,230,208,0.5)',
                      textDecoration: 'none',
                      transition: 'color 0.3s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--caramel)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(243,230,208,0.5)'}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-accent)',
              fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'var(--caramel)', marginBottom: '20px',
            }}>
              Stay Updated
            </h4>
            <p style={{ fontSize: '0.875rem', color: 'rgba(243,230,208,0.42)', marginBottom: '16px', lineHeight: 1.6 }}>
              Tasting events, new brews, and seasonal menus.
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="email"
                placeholder="Your email"
                style={{
                  flex: 1,
                  height: '42px',
                  padding: '0 14px',
                  background: 'rgba(243,230,208,0.04)',
                  border: '1px solid rgba(243,230,208,0.1)',
                  borderRadius: '10px',
                  color: 'var(--cream)',
                  fontSize: '0.85rem',
                  outline: 'none',
                  minWidth: 0,
                  transition: 'border-color 0.3s',
                }}
                onFocus={e => e.target.style.borderColor = 'var(--caramel)'}
                onBlur={e => e.target.style.borderColor = 'rgba(243,230,208,0.1)'}
              />
              <button
                style={{
                  height: '42px',
                  padding: '0 16px',
                  background: 'var(--caramel)',
                  color: 'var(--bg)',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'background 0.3s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--gold)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--caramel)'}
              >
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          paddingTop: '28px',
          borderTop: '1px solid rgba(243,230,208,0.06)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
        }}>
          <p style={{ fontSize: '0.78rem', color: 'rgba(243,230,208,0.28)' }}>
            &copy; {year} EMBER &amp; OAK. Crafted with warmth.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '0.78rem', color: 'rgba(243,230,208,0.2)' }}>
              Slow roasted. Beautifully served.
            </span>
            <div style={{
              width: '8px', height: '8px', borderRadius: '50%',
              background: 'var(--caramel)',
              opacity: 0.6,
            }} />
          </div>
        </div>
      </div>
    </footer>
  );
}
