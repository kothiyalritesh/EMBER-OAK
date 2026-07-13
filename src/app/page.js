'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import useLenis from '@/hooks/useLenis';

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

// Dynamically import heavy components
const Loader = dynamic(() => import('@/components/Loader'), { ssr: false });
const Navbar = dynamic(() => import('@/components/Navbar'), { ssr: false });
const Hero = dynamic(() => import('@/components/Hero'), { ssr: false });
const RitualSection = dynamic(() => import('@/components/RitualSection'), { ssr: false });
const MenuSection = dynamic(() => import('@/components/MenuSection'), { ssr: false });
const OriginParallax = dynamic(() => import('@/components/OriginParallax'), { ssr: false });
const ExperienceSection = dynamic(() => import('@/components/ExperienceSection'), { ssr: false });
const TastingSection = dynamic(() => import('@/components/TastingSection'), { ssr: false });
const Testimonials = dynamic(() => import('@/components/Testimonials'), { ssr: false });
const ContactSection = dynamic(() => import('@/components/ContactSection'), { ssr: false });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });

export default function Home() {
  const [loading, setLoading] = useState(true);
  
  // Initialize smooth scrolling
  useLenis();

  // Prevent scroll during loader
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [loading]);

  return (
    <>
      {/* Page Loader */}
      {loading && <Loader onComplete={() => setLoading(false)} />}

      {/* Main content - only render after loader completes */}
      {!loading && (
        <main className="relative">
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