'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * AnimatedText - Reveals text line-by-line with a staggered fade-up animation
 * Uses Framer Motion for smooth, declarative text reveals
 * Chosen over GSAP for this because it's simpler for text-on-mount animations
 */
export function AnimatedText({ text, className = '', delay = 0, once = true }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: '-50px' });

  const words = text.split(' ');

  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: '100%', opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: '100%', opacity: 0 }}
            transition={{
              duration: 0.6,
              delay: delay + i * 0.05,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            {word}
            {i < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/**
 * AnimatedLetters - Reveals text character-by-character
 * More dramatic than word reveal, used for headlines
 */
export function AnimatedLetters({ text, className = '', delay = 0, once = true }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: '-50px' });

  const letters = text.split('');

  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {letters.map((letter, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: '120%', opacity: 0, rotateX: -90 }}
            animate={
              isInView
                ? { y: 0, opacity: 1, rotateX: 0 }
                : { y: '120%', opacity: 0, rotateX: -90 }
            }
            transition={{
              duration: 0.5,
              delay: delay + i * 0.03,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/**
 * FadeUp - Simple fade-up animation for any content
 */
export function FadeUp({
  children,
  className = '',
  delay = 0,
  duration = 0.6,
  once = true,
  y = 40,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: '-30px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ y, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : { y, opacity: 0 }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * ScaleIn - Scale-up animation for cards and elements
 */
export function ScaleIn({
  children,
  className = '',
  delay = 0,
  once = true,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
}