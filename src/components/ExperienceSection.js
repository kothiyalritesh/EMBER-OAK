'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

const features = [
  {
    title: 'Warm Ambient Interiors',
    desc: 'Natural wood, soft amber lighting, and handcrafted furniture create an atmosphere of unhurried comfort.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2m-3.5-7.5-1.4 1.4M6.9 17.1l-1.4 1.4m0-12.8 1.4 1.4m9.8 9.8 1.4 1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: 'Quiet Working Corners',
    desc: 'Thoughtfully placed nooks with natural light, power outlets, and just enough distance from the bustle.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8m-4-4v4" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: 'Evening Coffee Tastings',
    desc: 'Weekly guided sessions exploring espresso notes, roast profiles, and brewing methods with our head barista.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M17 8h1a4 4 0 010 8h-1M3 8h14v9a4 4 0 01-4 4H7a4 4 0 01-4-4V8z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

export default function ExperienceSection() {
  const ref    = useRef(null);
  const inView  = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} id="space" className="section-pad" style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'linear-gradient(180deg, rgba(58,36,24,0.12) 0%, transparent 50%, rgba(58,36,24,0.08) 100%)',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 440px), 1fr))',
          gap: 'clamp(40px, 6vw, 80px)',
          alignItems: 'center',
        }}>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.85, ease: [0.25,0.1,0.25,1] }}
            style={{ position: 'relative' }}
          >
            <div style={{
              position: 'relative',
              borderRadius: 'var(--radius-img)',
              overflow: 'hidden',
              aspectRatio: '4/5',
              minHeight: '380px',
              maxHeight: '560px',
              boxShadow: '0 28px 72px rgba(0,0,0,0.5)',
            }}>
              <Image
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80"
                alt="Warm cozy cafe interior with wood and soft lighting"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover', objectPosition: 'center', transition: 'transform 0.7s ease' }}
                className="exp-img"
              />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(180deg, rgba(18,16,14,0.08) 0%, rgba(18,16,14,0.42) 100%)',
              }} />
            </div>

            {/* Badge */}
            <div style={{
              position: 'absolute', bottom: '-16px', right: '-12px',
              padding: '12px 20px',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '14px',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            }}>
              <p style={{ fontFamily: 'var(--font-subheading)', fontSize: '0.9rem', color: 'var(--caramel)' }}>Est. 2024</p>
              <p style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '2px' }}>Indiranagar, Bengaluru</p>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.18, ease: [0.25,0.1,0.25,1] }}
          >
            <span className="label-text" style={{ display: 'block', marginBottom: '16px' }}>The Space</span>
            <h2 className="section-heading" style={{ marginBottom: '0' }}>
              Designed for<br />
              <span className="text-grad">Slow Conversations.</span>
            </h2>
            <div className="divider" />
            <p className="body-text" style={{ marginBottom: '40px', maxWidth: '440px' }}>
              Our space blends warm wood, soft lighting, quiet corners, and handcrafted details — made for people who love coffee without the rush.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 18 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                  style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}
                  className="feature-row"
                >
                  <div style={{
                    flexShrink: 0,
                    width: '40px', height: '40px',
                    borderRadius: '10px',
                    background: 'rgba(200,138,74,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--caramel)',
                    transition: 'background 0.3s, color 0.3s',
                  }} className="feat-icon">
                    {f.icon}
                  </div>
                  <div>
                    <h4 style={{
                      fontFamily: 'var(--font-subheading)',
                      fontSize: '1rem',
                      color: 'var(--cream)',
                      marginBottom: '4px',
                      transition: 'color 0.3s',
                    }} className="feat-title">
                      {f.title}
                    </h4>
                    <p className="body-text" style={{ fontSize: '0.875rem' }}>{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .exp-img:hover { transform: scale(1.04) !important; }
        .feature-row:hover .feat-icon { background: var(--caramel) !important; color: var(--bg) !important; }
        .feature-row:hover .feat-title { color: var(--caramel) !important; }
      `}</style>
    </section>
  );
}
