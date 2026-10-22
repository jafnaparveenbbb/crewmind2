import React, { useEffect, useState, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import PageLoader from './components/PageLoader';
import CustomCursor from './components/CustomCursor';
import ScrollArrow from './components/ScrollArrow';

import HeroScroll from './sections/HeroScroll';
import HeroScrollMobile from './sections/HeroScrollMobile';
import AboutSection from './sections/AboutSection';
import IconCards from './sections/IconCards';
import HorizontalStats from './sections/HorizontalStats';
import CoreValues from './sections/CoreValues';
import WhatMakesUsDifferent from './sections/WhatMakesUsDifferent';
import ManagementPartners from './sections/ManagementPartners';
import ClosingCTA from './sections/ClosingCTA';
import Footer from './sections/Footer';

gsap.registerPlugin(ScrollTrigger);

// Configure ScrollTrigger for mobile resize stability:
// - ignoreMobileResize: true ignores vertical viewport fluctuations (< 25%) caused by mobile browser address bars collapsing/expanding on scroll.
// - autoRefreshEvents ensures necessary recalculations continue to occur on initial load, DOMContentLoaded, visibility change, and genuine window resizes.
ScrollTrigger.config({
  ignoreMobileResize: true,
  autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load,resize'
});

export default function App() {
  const [loading, setLoading] = useState(true);
  const [arrowVisible, setArrowVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth <= 767;
    }
    return false;
  });
  const lenisRef = useRef(null);
  const loaderRefreshTimerRef = useRef(null);

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 767px)');
    const handleMediaChange = (e) => {
      setIsMobile(e.matches);
    };
    if (mql.addEventListener) {
      mql.addEventListener('change', handleMediaChange);
    } else {
      mql.addListener(handleMediaChange);
    }
    return () => {
      if (mql.removeEventListener) {
        mql.removeEventListener('change', handleMediaChange);
      } else {
        mql.removeListener(handleMediaChange);
      }
    };
  }, []);

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
      touchMultiplier: 1.15,
      infinite: false
    });
    lenisRef.current = lenis;
    window.__lenis = lenis;
    lenis.scrollTo(0, { immediate: true });

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Named ticker callback so it can be strictly registered and removed without leaking in React Strict Mode
    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateLenis);
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

    // Handle orientation changes gracefully with a debounced recalculation
    let orientationTimer = null;
    const handleOrientationChange = () => {
      clearTimeout(orientationTimer);
      orientationTimer = setTimeout(() => {
        if (lenisRef.current) {
          lenisRef.current.resize();
        }
        ScrollTrigger.refresh();
      }, 200);
    };

    window.addEventListener('orientationchange', handleOrientationChange, { passive: true });

    return () => {
      clearTimeout(orientationTimer);
      window.removeEventListener('orientationchange', handleOrientationChange);
      window.removeEventListener('scroll', handleScroll);

      // Clean up Lenis scroll listener
      lenis.off('scroll', ScrollTrigger.update);

      // Remove the exact ticker callback before destroying Lenis to prevent stale rAF loops
      gsap.ticker.remove(updateLenis);

      lenis.destroy();
      lenisRef.current = null;
      if (window.__lenis === lenis) {
        delete window.__lenis;
      }

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
    clearTimeout(loaderRefreshTimerRef.current);
    loaderRefreshTimerRef.current = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);
  };

  useEffect(() => {
    return () => {
      clearTimeout(loaderRefreshTimerRef.current);
    };
  }, []);

  const handleScrollArrowClick = () => {
    const footer = document.getElementById('footer') || document.querySelector('footer');
    if (footer && lenisRef.current) {
      lenisRef.current.scrollTo(footer, { duration: 1.8 });
    } else if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="crewmind-app">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Initial Loading Screen */}
      {loading && <PageLoader onComplete={handleLoaderComplete} />}

      {/* Sticky Scroll Indicator Arrow */}
      <ScrollArrow onClick={handleScrollArrowClick} isVisible={arrowVisible} />

      {/* Main Page Content */}
      <main className="main">
        {/* 1. Hero Experience (Theme: Navy #00063D) */}
        {isMobile ? (
          <HeroScrollMobile isLoaded={!loading} />
        ) : (
          <HeroScroll isLoaded={!loading} />
        )}

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
