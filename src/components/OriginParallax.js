'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

const stats = [
  { value: 3,   suffix: '',  label: 'Farms' },
  { value: 18,  suffix: 'h', label: 'Roast Cycle' },
  { value: 95,  suffix: '%', label: 'Organic' },
  { value: 100, suffix: '%', label: 'Hand Selected' },
];

function AnimatedStat({ value, suffix, active }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!active) return undefined;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const start = performance.now();
    let frameId;

    const tick = (now) => {
      const progress = reduceMotion ? 1 : Math.min((now - start) / 1300, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(value * eased));
      if (progress < 1) frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [active, value]);

  return <>{display}{suffix}</>;
}

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
        {/* Dark overlay — stronger so text always reads */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(18,16,14,0.85) 0%, rgba(18,16,14,0.65) 40%, rgba(18,16,14,0.65) 60%, rgba(18,16,14,0.90) 100%)',
        }} />
      </div>

      {/* Content */}
      <div
        ref={textRef}
        className="container"
        style={{ position: 'relative', zIndex: 1, textAlign: 'center', paddingTop: 'clamp(120px, 14vw, 160px)', paddingBottom: 'clamp(120px, 14vw, 160px)', willChange: 'transform' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.25,0.1,0.25,1] }}
        >
          {/* Label */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', marginBottom: '32px' }}>
            <div style={{ width: '36px', height: '1px', background: 'var(--caramel)' }} />
            <span className="label-text">Our Origins</span>
            <div style={{ width: '36px', height: '1px', background: 'var(--caramel)' }} />
          </div>

          <h2 className="section-heading" style={{ marginBottom: '32px' }}>
            From Mountain Farms<br />
            <span className="text-grad">to Morning Tables.</span>
          </h2>

          <p className="body-text" style={{ maxWidth: '580px', margin: '0 auto clamp(56px, 7vw, 80px)', fontSize: 'clamp(1.05rem, 1.2vw, 1.15rem)', color: 'var(--muted-strong)' }}>
            Our beans are sourced in small batches, roasted slowly, and brewed with precision to bring out natural sweetness, depth, and aroma.
          </p>

          {/* Stats */}
          <div style={{
            display: 'flex', flexWrap: 'wrap',
            justifyContent: 'center', gap: 'clamp(36px, 6vw, 80px)',
            paddingTop: '48px',
            borderTop: '1px solid rgba(243,230,208,0.12)',
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
                  fontSize: 'clamp(2.6rem, 5vw, 3.6rem)',
                  color: 'var(--caramel)',
                  lineHeight: 1,
                  marginBottom: '10px',
                  letterSpacing: '-0.02em',
                }}>
                  <AnimatedStat value={s.value} suffix={s.suffix} active={inView} />
                </div>
                <div className="label-text" style={{ color: 'rgba(243,230,208,0.65)', fontSize: '12px' }}>{s.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '140px',
        background: 'linear-gradient(to top, #12100E, transparent)',
        pointerEvents: 'none',
      }} />
    </section>
  );
}
