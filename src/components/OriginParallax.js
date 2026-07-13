'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

const stats = [
  { num: '3',    label: 'Sourcing Regions' },
  { num: '18h',  label: 'Cold Brew Steep'  },
  { num: '95+',  label: 'Bean Score'       },
  { num: '100%', label: 'Sustainable'      },
];

export default function OriginParallax() {
  const sectionRef = useRef(null);
  const bgRef      = useRef(null);
  const textRef    = useRef(null);
  const inView     = useInView(sectionRef, { once: true, margin: '-80px' });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    let raf;
    const onScroll = () => {
      raf = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, 1 - rect.bottom / (window.innerHeight + rect.height)));
        if (bgRef.current)   bgRef.current.style.transform   = `translateY(${progress * -50}px) scale(1.06)`;
        if (textRef.current) textRef.current.style.transform = `translateY(${progress * 22}px)`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="origin"
      style={{
        position: 'relative',
        minHeight: '75vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Background image */}
      <div ref={bgRef} style={{ position: 'absolute', inset: '-8%', willChange: 'transform' }}>
        <Image
          src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1400&q=80"
          alt="Roasted coffee beans close up"
          fill
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
        {/* Dark overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(18,16,14,0.72) 0%, rgba(18,16,14,0.55) 50%, rgba(18,16,14,0.82) 100%)',
        }} />
      </div>

      {/* Content */}
      <div
        ref={textRef}
        className="container"
        style={{ position: 'relative', zIndex: 1, textAlign: 'center', paddingTop: '100px', paddingBottom: '100px', willChange: 'transform' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.25,0.1,0.25,1] }}
        >
          {/* Label */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '28px' }}>
            <div style={{ width: '32px', height: '1px', background: 'var(--caramel)' }} />
            <span className="label-text">Our Origins</span>
            <div style={{ width: '32px', height: '1px', background: 'var(--caramel)' }} />
          </div>

          <h2 className="section-heading" style={{ marginBottom: '24px' }}>
            From Mountain Farms<br />
            <span className="text-grad">to Morning Tables.</span>
          </h2>

          <p className="body-text" style={{ maxWidth: '560px', margin: '0 auto 56px', fontSize: '1.05rem' }}>
            Our beans are sourced in small batches, roasted slowly, and brewed with precision to bring out natural sweetness, depth, and aroma.
          </p>

          {/* Stats */}
          <div style={{
            display: 'flex', flexWrap: 'wrap',
            justifyContent: 'center', gap: 'clamp(24px, 5vw, 64px)',
            paddingTop: '40px',
            borderTop: '1px solid rgba(243,230,208,0.1)',
          }}>
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                style={{ textAlign: 'center' }}
              >
                <div style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  color: 'var(--caramel)',
                  lineHeight: 1,
                  marginBottom: '6px',
                }}>
                  {s.num}
                </div>
                <div className="label-text" style={{ color: 'rgba(243,230,208,0.45)' }}>{s.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '120px',
        background: 'linear-gradient(to top, #12100E, transparent)',
        pointerEvents: 'none',
      }} />
    </section>
  );
}
