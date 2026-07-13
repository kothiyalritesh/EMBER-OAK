'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

const products = [
  {
    name: 'Ember Latte',
    description: 'Velvety espresso, steamed milk, and a touch of caramel warmth.',
    price: '₹240',
    tag: 'Signature',
    notes: 'Balanced, smooth, and deeply comforting — our most-loved cup.',
    img: 'https://images.unsplash.com/photo-1561882468-9110e03e0f78?w=600&q=80',
    alt: 'Ember latte with latte art in a ceramic cup',
  },
  {
    name: 'Oak Cold Brew',
    description: 'Slow-steeped 18 hours. Dark chocolate notes, naturally sweet.',
    price: '₹280',
    tag: 'Cold Brew',
    notes: 'Brewed at 4°C for a low-acid, silky-smooth finish.',
    img: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600&q=80',
    alt: 'Oak cold brew in a tall glass with ice',
  },
  {
    name: 'Cinnamon Cloud Cappuccino',
    description: 'Espresso, microfoam, cinnamon dust, and a soft finish.',
    price: '₹260',
    tag: 'Seasonal',
    notes: 'A warm embrace in a cup — topped with house-spiced cinnamon.',
    img: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&q=80',
    alt: 'Cinnamon cappuccino with foam art',
  },
  {
    name: 'Midnight Mocha',
    description: 'Cocoa-rich espresso with roasted hazelnut depth.',
    price: '₹290',
    tag: 'Indulgent',
    notes: 'Dark chocolate meets single-origin espresso for a bold finish.',
    img: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=600&q=80',
    alt: 'Midnight mocha with chocolate drizzle',
  },
];

export default function MenuSection() {
  const ref    = useRef(null);
  const inView  = useInView(ref, { once: true, margin: '-80px' });
  const [active, setActive] = useState(null);

  return (
    <section ref={ref} id="menu" className="section-pad" style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'linear-gradient(180deg, transparent, rgba(58,36,24,0.18) 50%, transparent)',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <motion.div
          style={{ textAlign: 'center', maxWidth: '580px', margin: '0 auto 72px' }}
          initial={{ opacity: 0, y: 36 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25,0.1,0.25,1] }}
        >
          <span className="label-text" style={{ display: 'block', marginBottom: '16px' }}>Signatures</span>
          <h2 className="section-heading">
            Crafted for<br />
            <span className="text-grad">Every Mood</span>
          </h2>
          <div className="divider center" />
          <p className="body-text" style={{ margin: '0 auto', maxWidth: '460px' }}>
            From velvety morning lattes to slow-steeped cold brews — each drink is a composition of flavour, texture, and aroma.
          </p>
        </motion.div>

        {/* Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '20px',
        }}>
          {products.map((p, i) => (
            <MenuCard
              key={p.name}
              product={p}
              index={i}
              isActive={active === i}
              onEnter={() => setActive(i)}
              onLeave={() => setActive(null)}
            />
          ))}
        </div>

        {/* View full menu */}
        <motion.div
          style={{ textAlign: 'center', marginTop: '52px' }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
        >
          <button style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontFamily: 'var(--font-accent)',
            fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'rgba(243,230,208,0.45)',
            transition: 'color 0.3s',
            position: 'relative',
          }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--caramel)'; e.currentTarget.querySelector('span').style.width = '100%'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(243,230,208,0.45)'; e.currentTarget.querySelector('span').style.width = '0'; }}
          >
            View Full Menu
            <span style={{
              display: 'block', height: '1px',
              background: 'var(--caramel)',
              width: '0', transition: 'width 0.3s ease',
              marginTop: '4px',
            }} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}

function MenuCard({ product, index, isActive, onEnter, onLeave }) {
  const ref    = useRef(null);
  const inView  = useInView(ref, { once: true, margin: '-20px' });

  return (
    <motion.div
      ref={ref}
      className="card"
      initial={{ opacity: 0, y: 56 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25,0.1,0.25,1] }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{ padding: 0, cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
    >
      {/* Image */}
      <div style={{
        position: 'relative',
        height: 'clamp(180px, 22vw, 220px)',
        overflow: 'hidden',
        borderRadius: 'var(--radius-card) var(--radius-card) 0 0',
        flexShrink: 0,
      }}>
        <Image
          src={product.img}
          alt={product.alt}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          style={{
            objectFit: 'cover',
            transition: 'transform 0.7s cubic-bezier(0.4,0,0.2,1)',
            transform: isActive ? 'scale(1.07)' : 'scale(1)',
          }}
        />
        {/* Overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(18,16,14,0.1) 0%, rgba(18,16,14,0.55) 100%)',
        }} />
        {/* Tag */}
        <span style={{
          position: 'absolute', top: '14px', left: '14px',
          padding: '4px 12px',
          background: 'rgba(18,16,14,0.72)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(200,138,74,0.2)',
          borderRadius: '999px',
          fontFamily: 'var(--font-accent)',
          fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase',
          color: 'var(--caramel)',
        }}>
          {product.tag}
        </span>
        {/* Price */}
        <span style={{
          position: 'absolute', bottom: '14px', right: '14px',
          fontFamily: 'var(--font-heading)',
          fontSize: '1.5rem',
          color: 'var(--cream)',
          textShadow: '0 2px 8px rgba(0,0,0,0.5)',
        }}>
          {product.price}
        </span>
      </div>

      {/* Content */}
      <div style={{ padding: '24px 24px 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 className="card-heading" style={{
          marginBottom: '8px',
          transition: 'color 0.3s',
          color: isActive ? 'var(--caramel)' : 'var(--cream)',
        }}>
          {product.name}
        </h3>
        <p className="body-text" style={{ fontSize: '0.875rem', lineHeight: 1.6, flex: 1 }}>
          {product.description}
        </p>

        {/* Notes on hover */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={isActive ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{ overflow: 'hidden' }}
        >
          <p style={{
            fontSize: '0.8rem', fontStyle: 'italic',
            color: 'rgba(200,138,74,0.7)',
            borderTop: '1px solid rgba(200,138,74,0.1)',
            paddingTop: '10px', marginTop: '10px',
          }}>
            {product.notes}
          </p>
        </motion.div>

        {/* View notes */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '4px',
          marginTop: '14px',
          transition: 'gap 0.3s',
        }}>
          <span style={{ fontSize: '0.78rem', color: 'rgba(200,138,74,0.5)' }}>View notes</span>
          <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="rgba(200,138,74,0.5)" strokeWidth={2}
            style={{ transition: 'transform 0.3s', transform: isActive ? 'translateX(4px)' : 'translateX(0)' }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}
