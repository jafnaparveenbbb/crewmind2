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

    // 2. Initialize Lenis Smooth Scrolling for wheel/trackpad input only.
    // Touch keeps the browser's native scrolling: on iOS, Lenis' simulated touch inertia (syncTouch)
    // overshoots several sections per flick and runs the scroll on the main thread. Every pinned
    // section is CSS-sticky, so pins stay in step with native scrolling without Lenis driving touch.
    // Reduced motion is deliberately not respected: the site always shows the full choreography.
    const lenis = new Lenis({
      duration: 0.85,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 1.25,
      infinite: false,
      respectReducedMotion: false
    });
    lenisRef.current = lenis;
    window.__lenis = lenis;
    lenis.scrollTo(0, { immediate: true });

    // Keep the page at the top while the loader covers it, so a swipe during loading can't scroll
    // the page underneath (which then flashed the footer before jumping back to the hero)
    document.documentElement.classList.add('is-loading');
    lenis.stop();

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Named ticker callback so it can be strictly registered and removed without leaking in React Strict Mode
    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    // Track scroll position for header state (reads scrollY only, so no layout is forced mid-scroll)
    let atTop = null;
    const handleScroll = () => {
      const nowAtTop = window.scrollY <= 50;
      if (nowAtTop === atTop) return;
      atTop = nowAtTop;
      document.body.classList.toggle('at-top', nowAtTop);
      if (nowAtTop) document.body.setAttribute('theme', 'navy');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Hide scroll indicator arrow once About starts entering, so it never sits over About's
    // content (e.g. the Support Early bubble). Desktop and mobile heroes have different lengths.
    const about = document.getElementById('about');
    const arrowTrigger = about
      ? ScrollTrigger.create({
          trigger: about,
          start: 'top 95%',
          end: 'max',
          onToggle: (self) => setArrowVisible(!self.isActive)
        })
      : null;

    // Orientation changes need no handler of their own: they change the width, so ScrollTrigger's
    // resize auto-refresh recalculates every section and Lenis re-measures via its ResizeObserver.

    return () => {
      window.removeEventListener('scroll', handleScroll);
      arrowTrigger?.kill();
      document.documentElement.classList.remove('is-loading');

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
    document.documentElement.classList.remove('is-loading');
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true, force: true });
      lenisRef.current.start();
      lenisRef.current.resize();
    }
    // Refresh ScrollTrigger once the loader has unmounted and the next frame has laid out
    cancelAnimationFrame(loaderRefreshTimerRef.current);
    loaderRefreshTimerRef.current = requestAnimationFrame(() => {
      loaderRefreshTimerRef.current = requestAnimationFrame(() => ScrollTrigger.refresh());
    });
  };

  useEffect(() => {
    return () => {
      cancelAnimationFrame(loaderRefreshTimerRef.current);
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
          <HeroScrollMobile />
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
