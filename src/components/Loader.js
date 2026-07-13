'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Loader({ onComplete }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(false), 2400);
    const t2 = setTimeout(() => onComplete?.(), 3100);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          exit={{ opacity: 0, scale: 1.04, filter: 'blur(6px)', transition: { duration: 0.7, ease: [0.4,0,0.2,1] } }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9998,
            background: '#12100E',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: '16px',
          }}
        >
          {/* Glow */}
          <div style={{
            position: 'absolute',
            width: '360px', height: '360px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(200,138,74,0.09) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          {/* Steam lines */}
          {[-1, 0, 1].map((offset, i) => (
            <motion.div
              key={i}
              style={{
                position: 'absolute',
                width: '1px', height: '56px',
                left: `calc(50% + ${offset * 18}px)`,
                top: 'calc(50% - 80px)',
                background: 'linear-gradient(to top, transparent, rgba(200,138,74,0.28), transparent)',
              }}
              animate={{ opacity: [0, 0.5, 0], y: [0, -40, -80], scaleX: [1, 1.4, 0.6] }}
              transition={{ duration: 2.2, delay: i * 0.28, repeat: Infinity, ease: 'easeOut' }}
            />
          ))}

          {/* Wordmark */}
          <motion.div
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.25,0.1,0.25,1] }}
          >
            <motion.h1
              style={{
                fontFamily: 'var(--font-wordmark)',
                fontSize: 'clamp(1.8rem, 5vw, 2.8rem)',
                color: 'var(--cream)',
                letterSpacing: '0.14em',
              }}
              initial={{ letterSpacing: '0.5em', opacity: 0 }}
              animate={{ letterSpacing: '0.14em', opacity: 1 }}
              transition={{ duration: 1.3, ease: [0.25,0.1,0.25,1] }}
            >
              EMBER &amp; OAK
            </motion.h1>

            <motion.div
              style={{ height: '1px', background: 'linear-gradient(90deg, transparent, var(--caramel), transparent)' }}
              initial={{ width: 0 }}
              animate={{ width: '64px' }}
              transition={{ duration: 0.9, delay: 0.5 }}
            />

            <motion.p
              style={{
                fontFamily: 'var(--font-accent)',
                fontSize: '11px',
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: 'rgba(243,230,208,0.42)',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              Artisan Coffee House
            </motion.p>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            style={{
              position: 'absolute', bottom: '28%',
              width: '100px', height: '1px',
              background: 'rgba(200,138,74,0.1)',
              borderRadius: '2px', overflow: 'hidden',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.div
              style={{ height: '100%', background: 'linear-gradient(90deg, transparent, var(--caramel), transparent)' }}
              initial={{ x: '-100%' }}
              animate={{ x: '200%' }}
              transition={{ duration: 1.6, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
