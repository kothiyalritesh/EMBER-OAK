'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

const products = [
  {
    name: 'Espresso',
    description: 'A precise double shot with dark chocolate depth and a caramel finish.',
    price: '₹180',
    tag: 'Classic',
    notes: 'Balanced, smooth, and deeply comforting — our most-loved cup.',
    img: 'https://images.unsplash.com/photo-1561882468-9110e03e0f78?w=700&q=85',
    alt: 'Ember latte with latte art in a ceramic cup',
  },
  {
    name: 'Cappuccino',
    description: 'Velvety espresso, steamed milk, and cloud-soft microfoam.',
    price: '₹220',
    tag: 'House Favourite',
    notes: 'Brewed at 4°C for a low-acid, silky-smooth finish.',
    img: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=700&q=85',
    alt: 'Oak cold brew in a tall glass with ice',
  },
  {
    name: 'Signature Latte',
    description: 'Espresso, silky milk, cinnamon warmth, and a soft caramel finish.',
    price: '₹260',
    tag: 'Signature',
    notes: 'A warm embrace in a cup — topped with house-spiced cinnamon.',
    img: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=700&q=85',
    alt: 'Cinnamon cappuccino with foam art',
  },
  {
    name: 'Cold Brew',
    description: 'Slow-steeped for 18 hours with cocoa notes and natural sweetness.',
    price: '₹280',
    tag: 'Slow Steeped',
    notes: 'Dark chocolate meets single-origin espresso for a bold finish.',
    img: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=700&q=85',
    alt: 'Midnight mocha with chocolate drizzle',
  },
];

export default function MenuSection() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [active, setActive] = useState(null);

  return (
    <section ref={ref} id="menu" className="section-pad" style={{ position: 'relative', overflow: 'hidden' }}>
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'linear-gradient(180deg, transparent, rgba(58,36,24,0.15) 50%, transparent)',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <motion.div
          style={{ textAlign: 'center', maxWidth: '620px', margin: '0 auto clamp(64px, 8vw, 100px)' }}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span className="label-text" style={{ display: 'block', marginBottom: '18px' }}>Signatures</span>
          <h2
            className="section-heading"
            style={{ lineHeight: 1.03 }}
          >
            Crafted for<br />
            <span className="text-grad">Every Mood</span>
          </h2>
          <div className="divider center" />
          <p className="body-text" style={{ margin: '0 auto', maxWidth: '500px' }}>
            From velvety morning lattes to slow-steeped cold brews — each drink is a composition of flavour, texture, and aroma.
          </p>
        </motion.div>

        {/* Cards - 4 columns on desktop, 2 on tablet, 1 on mobile */}
        <div className="menu-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 'clamp(28px, 3.5vw, 44px)',
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
          style={{ textAlign: 'center', marginTop: 'clamp(48px, 6vw, 72px)' }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
        >
          <button
            className="menu-more-btn"
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: 'var(--font-accent)',
              fontSize: '12px', letterSpacing: '0.22em', textTransform: 'uppercase',
              color: 'rgba(243,230,208,0.5)',
              transition: 'color 0.3s',
              position: 'relative',
              padding: '10px 0',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--caramel)'; e.currentTarget.querySelector('span').style.width = '100%'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(243,230,208,0.5)'; e.currentTarget.querySelector('span').style.width = '0'; }}
          >
            View Full Menu
            <span style={{
              display: 'block', height: '1.5px',
              background: 'linear-gradient(90deg, var(--caramel), var(--gold))',
              width: '0', transition: 'width 0.35s ease',
              marginTop: '6px',
              borderRadius: '2px',
            }} />
          </button>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 1100px) {
          .menu-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 580px) {
          .menu-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function MenuCard({ product, index, isActive, onEnter, onLeave }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-20px' });

  return (
    <motion.article
      ref={ref}
      className="card menu-card"

      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      tabIndex={0}
      aria-label={`${product.name}, ${product.price}. ${product.description}`}
      style={{ padding: 0, cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
    >
      {/* Image */}
      <div style={{
        position: 'relative',
        height: 'clamp(260px, 28vw, 320px)',
        overflow: 'hidden',
        borderRadius: 'var(--radius-card) var(--radius-card) 0 0',
        flexShrink: 0,
      }}>
        <Image
          src={product.img}
          alt={product.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          style={{
            objectFit: 'cover',
            transition: 'transform 0.75s cubic-bezier(0.4,0,0.2,1)',
            transform: isActive ? 'scale(1.12)' : 'scale(1.02)',
          }}
        />
        {/* Gradient */}
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(18,16,14,0.08) 0%, rgba(18,16,14,0.6) 100%)',
          transition: 'opacity 0.4s ease',
        }} />
        {/* Tag */}
        <span style={{
          position: 'absolute', top: '16px', left: '16px',
          padding: '6px 14px',
          background: 'rgba(14,11,9,0.78)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(200,138,74,0.22)',
          borderRadius: '999px',
          fontFamily: 'var(--font-accent)',
          fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase',
          color: 'var(--caramel)',
        }}>
          {product.tag}
        </span>
        {/* Price */}
        <span style={{
          position: 'absolute', bottom: '16px', right: '16px',
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(1.4rem, 2.2vw, 1.8rem)',
          color: 'var(--cream)',
          textShadow: '0 2px 12px rgba(0,0,0,0.6)',
          fontWeight: 700,
        }}>
          {product.price}
        </span>
      </div>

      {/* Content */}
      <div style={{ padding: 'clamp(22px, 3vw, 32px)', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 className="card-heading" style={{
          marginBottom: '14px',
          transition: 'color 0.3s ease',
          color: isActive ? 'var(--caramel)' : 'var(--cream)',
          fontSize: 'clamp(1.2rem, 1.5vw, 1.35rem)',
        }}>
          {product.name}
        </h3>
        <p className="card-text" style={{
          flex: 1,
          color: 'var(--muted-strong)',
        }}>
          {product.description}
        </p>

        {/* Tasting notes (no layout push): reserve space, then fade/slide */}
        <motion.div
          initial={false}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            overflow: 'hidden',
            height: '86px',
          }}
        >
          <p style={{
            fontSize: '0.85rem',
            fontStyle: 'italic',
            color: 'rgba(200,138,74,0.8)',
            borderTop: '1px solid rgba(200,138,74,0.12)',
            paddingTop: '14px',
            marginTop: '14px',
            lineHeight: 1.7,
          }}>
            {product.notes}
          </p>
        </motion.div>

        {/* CTA row */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          marginTop: '18px',
        }}>
          <span style={{
            fontSize: '0.8rem',
            color: isActive ? 'var(--caramel)' : 'rgba(200,138,74,0.5)',
            transition: 'color 0.3s',
            fontFamily: 'var(--font-accent)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}>
            Tasting notes
          </span>
          <svg
            width="12" height="12" fill="none" viewBox="0 0 24 24"
            stroke={isActive ? 'var(--caramel)' : 'rgba(200,138,74,0.5)'}
            strokeWidth={2.2}
            aria-hidden="true"
            style={{ transition: 'transform 0.3s ease, stroke 0.3s', transform: isActive ? 'translateX(5px)' : 'translateX(0)' }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </motion.article>
  );
}
