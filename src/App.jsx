import React, { useEffect, useState, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import PageLoader from './components/PageLoader';
import CustomCursor from './components/CustomCursor';
import ScrollArrow from './components/ScrollArrow';

import HeroScroll from './sections/HeroScroll';
import AboutSection from './sections/AboutSection';
import IconCards from './sections/IconCards';
import HorizontalStats from './sections/HorizontalStats';
import CoreValues from './sections/CoreValues';
import WhatMakesUsDifferent from './sections/WhatMakesUsDifferent';
import ManagementPartners from './sections/ManagementPartners';
import ClosingCTA from './sections/ClosingCTA';
import Footer from './sections/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [loading, setLoading] = useState(true);
  const [arrowVisible, setArrowVisible] = useState(true);
  const lenisRef = useRef(null);

  useEffect(() => {
    // 1. Force manual scroll restoration to 0
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    // 2. Initialize Lenis Smooth Scrolling with responsive, faster scroll speed
    const lenis = new Lenis({
      duration: 0.85,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.25,
      touchMultiplier: 2.2,
      infinite: false
    });
    lenisRef.current = lenis;
    lenis.scrollTo(0, { immediate: true });

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Track scroll position for header state & scroll arrow visibility
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 50) {
        document.body.classList.remove('at-top');
      } else {
        document.body.classList.add('at-top');
        document.body.setAttribute('theme', 'navy');
      }

      // Hide scroll indicator arrow when scrolled past Hero
      if (scrollY > window.innerHeight * 2.8) {
        setArrowVisible(false);
      } else {
        setArrowVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      lenis.destroy();
      ScrollTrigger.getAll().forEach(t => t.kill());
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'auto';
      }
    };
  }, []);

  const handleLoaderComplete = () => {
    setLoading(false);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
      lenisRef.current.resize();
    }
    // Refresh ScrollTrigger cleanly once layout and loader are settled
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);
  };

  const handleScrollArrowClick = () => {
    const footer = document.getElementById('footer') || document.querySelector('footer');
    if (footer && lenisRef.current) {
      lenisRef.current.scrollTo(footer, { duration: 1.8 });
    } else if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="significo-app">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Initial Loading Screen */}
      {loading && <PageLoader onComplete={handleLoaderComplete} />}

      {/* Sticky Scroll Indicator Arrow */}
      <ScrollArrow onClick={handleScrollArrowClick} isVisible={arrowVisible} />

      {/* Main Page Content */}
      <main className="main">
        {/* 1. Hero Experience (Theme: Navy #00063D) */}
        <HeroScroll isLoaded={!loading} />

        {/* 2. About / Meet Crewmind (Theme: White #FFFFFF) */}
        <AboutSection />

        {/* 3. Services / Live Productions Support (Theme: White #FFFFFF) */}
        <IconCards />

        {/* 4. Horizontal Stats / Impact in Numbers (Theme: White #FFFFFF) */}
        <HorizontalStats />

        {/* 5. The Industry Is Changing / Core Values (Theme: White #FFFFFF) */}
        <CoreValues />

        {/* 6. Why Management Teams Partner With Us (Theme: White #FFFFFF) */}
        <ManagementPartners />

        {/* 7. What Makes Us Different (Theme: White #FFFFFF) */}
        <WhatMakesUsDifferent />

        {/* 8. Closing CTA (Theme: White #FFFFFF) */}
        <ClosingCTA />

        {/* 9. Grand Footer (Theme: Black #000000) */}
        <Footer />
      </main>
    </div>
  );
}
