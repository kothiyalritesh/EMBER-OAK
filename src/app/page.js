'use client';

import { useEffect, useState } from 'react';
import useLenis from '@/hooks/useLenis';
import Loader from '@/components/Loader';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import RitualSection from '@/components/RitualSection';
import MenuSection from '@/components/MenuSection';
import OriginParallax from '@/components/OriginParallax';
import ExperienceSection from '@/components/ExperienceSection';
import TastingSection from '@/components/TastingSection';
import Testimonials from '@/components/Testimonials';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import FloatingBeans from '@/components/FloatingBeans';

/**
 * Main page - Assembles all sections with smooth scroll, loader, and grain overlay
 * 
 * Animation Libraries Used:
 * - Framer Motion: Page load animations, hero text reveals, scroll-triggered section entries,
 *   card hover effects, mobile menu, form micro-interactions. Chosen for its React-first API,
 *   easy declarative syntax, and built-in layout animations.
 * - GSAP (available): For complex scroll-triggered timelines if needed. Used via ScrollTrigger
 *   in the parallax section.
 * - React Three Fiber / Drei: Lightweight 3D coffee bean in hero. Chosen for declarative
 *   3D in React with excellent performance and small bundle overhead.
 * - Lenis: Smooth scrolling for a premium feel. Chosen for its lightweight footprint
 *   and customizable easing.
 */

export default function Home() {
  const [loading, setLoading] = useState(true);

  useLenis();

  useEffect(() => {
    document.body.style.overflow = loading ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [loading]);

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}

      {!loading && (
        <main id="main-content" className="relative">
          <FloatingBeans />
          <Navbar />
          <Hero />
          <RitualSection />
          <MenuSection />
          <OriginParallax />
          <ExperienceSection />
          <TastingSection />
          <Testimonials />
          <ContactSection />
          <Footer />
        </main>
      )}
    </>
  );
}
