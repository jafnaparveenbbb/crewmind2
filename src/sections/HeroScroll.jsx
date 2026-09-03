import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ASSETS } from '../utils/assets';
import Navbar from '../components/Navbar';

gsap.registerPlugin(ScrollTrigger);

export default function HeroScroll({ isLoaded = true }) {
  const containerRef = useRef(null);
  const stickyRef = useRef(null);
  const navRef = useRef(null);
  const videoBoxRef = useRef(null);
  const videoElementRef = useRef(null);
  const rowsParentRef = useRef(null);
  const targetImageRef = useRef(null);
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);
  const row3Ref = useRef(null);
  const subtitleRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    const container = containerRef.current;
    const stickyFrame = stickyRef.current;
    const videoBox = videoBoxRef.current;
    const videoElement = videoElementRef.current;
    const rowsParent = rowsParentRef.current;
    const targetImage = targetImageRef.current;
    const row1 = row1Ref.current;
    const row2 = row2Ref.current;
    const row3 = row3Ref.current;
    const subtitle = subtitleRef.current;
    const heroBottom = bottomRef.current;

    if (!container || !stickyFrame || !videoBox || !rowsParent) return;

    // Explicitly play video
    if (videoElement) {
      videoElement.play().catch(() => { });
    }

    // Function to calculate exact relative offset of target circular portrait
    const getTargetCoords = () => {
      if (!targetImage || !stickyFrame) {
        return { x: 0, y: 0, size: 55 };
      }

      // Temporarily measure at full scale 1
      const savedScale = gsap.getProperty(rowsParent, "scale") || 1;
      gsap.set(rowsParent, { scale: 1 });

      const targetRect = targetImage.getBoundingClientRect();
      const stickyRect = stickyFrame.getBoundingClientRect();

      const centerX = stickyRect.left + stickyRect.width / 2;
      const centerY = stickyRect.top + stickyRect.height / 2;

      const targetCenterX = targetRect.left + targetRect.width / 2;
      const targetCenterY = targetRect.top + targetRect.height / 2;

      // Restore scale
      gsap.set(rowsParent, { scale: savedScale });

      return {
        x: targetCenterX - centerX,
        y: targetCenterY - centerY,
        size: targetRect.width || (isMobile ? 32 : 55)
      };
    };

    let targetCoords = getTargetCoords();

    // Initial setup at scrollY = 0
    gsap.set(videoBox, {
      width: "100vw",
      height: "100vh",
      borderRadius: "0%",
      x: 0,
      y: 0,
      opacity: 1,
      zIndex: 15
    });

    gsap.set(rowsParent, {
      opacity: 0,
      scale: 0.25,
      transformOrigin: "center center"
    });

    if (subtitle) gsap.set(subtitle, { opacity: 0, y: 30 });
    if (heroBottom) gsap.set(heroBottom, { opacity: 1, y: 0 });

    const intermediateCircleSize = isMobile ? "24vw" : "14vw";

    // Master ScrollTrigger Pinned Timeline (Pinned to 100vw x 100vh throughout 350vh scroll)
    const masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        pin: stickyFrame,
        pinSpacing: false,
        scrub: 0.5,
        invalidateOnRefresh: true,
        onRefresh: () => {
          targetCoords = getTargetCoords();
        }
      }
    });

    // =========================================================================
    // THE EXACT HERO TRANSITION SEQUENCE:
    // 1. [0.0 - 1.0]: Fullscreen Video holds at top of page, bottom sentence is fully visible
    // 2. [0.6 - 2.2]: Bottom sentence diminishes/fades out smoothly as video begins zooming
    // 3. [1.0 - 4.2]: Video physically ZOOMS OUT from 100vw/100vh -> 14vw circular medallion at center
    // 4. [3.6 - 6.8]: Typography field emerges & expands from center (scale 0.25 -> 1.0)
    // 5. [4.6 - 7.6]: Circular Video FLIES from center into TARGET PORTRAIT IMAGE position & size
    // 6. [7.2 - 7.8]: Circular Video seamlessly merges and becomes that portrait in the typography row
    // 7. [4.8 - 9.0]: Multi-directional horizontal row scrub (x: ±14%)
    // 8. [4.2 - 6.5]: Top subtitle floats in at top of viewport
    // 9. [8.8 - 10.0]: Settled state holds, then pin releases into Section 2
    // =========================================================================

    // Step 1b: Fade out navbar and bottom hero text as video begins zooming
    if (navRef.current) {
      masterTl.to(navRef.current, {
        opacity: 0,
        y: -22,
        duration: 1.4,
        ease: "power2.out"
      }, 0.4);
    }

    if (heroBottom) {
      masterTl.to(heroBottom, {
        opacity: 0,
        y: -18,
        duration: 1.6,
        ease: "power2.out"
      }, 0.6);
    }

    // Step 2: Physical Zoom Out into Central Circular Medallion
    masterTl.to(videoBox, {
      width: intermediateCircleSize,
      height: intermediateCircleSize,
      borderRadius: "50%",
      boxShadow: "0 20px 60px rgba(0, 0, 0, 0.8)",
      duration: 3.2,
      ease: "power2.inOut"
    }, 1.0);

    // Step 3: Typography Emerges & Expands Outward from Origin
    masterTl.to(rowsParent, {
      opacity: 1,
      scale: 1,
      duration: 3.2,
      ease: "power2.out"
    }, 3.6);

    // Step 4: Circular Video Flies and Lands onto Target Typography Portrait
    masterTl.to(videoBox, {
      x: () => targetCoords.x,
      y: () => targetCoords.y,
      width: () => `${targetCoords.size}px`,
      height: () => `${targetCoords.size}px`,
      duration: 3.0,
      ease: "power2.inOut"
    }, 4.6);

    // Step 5: Seamless Hand-off to Target Image
    masterTl.to(videoBox, {
      opacity: 0,
      duration: 0.6,
      ease: "power1.in"
    }, 7.2);

    // Step 6: Top Subtitle (Centered at Top of Hero like 2nd image)
    if (subtitle) {
      masterTl.to(subtitle, {
        opacity: 1,
        y: 0,
        duration: 1.8,
        ease: "power2.out"
      }, 4.2);
    }

    // Step 7: Opposing Multi-directional Row Movement
    const shiftPercent = isMobile ? 25 : 14;
    masterTl
      .to(row1, { x: `+=${shiftPercent}%`, ease: "none", duration: 8 }, 1.0)
      .to(row2, { x: `-=${shiftPercent}%`, ease: "none", duration: 8 }, 1.0)
      .to(row3, { x: `+=${shiftPercent}%`, ease: "none", duration: 8 }, 1.0);

    // Step 8: Settle before pin release
    masterTl.to(stickyFrame, {
      opacity: 0.1,
      duration: 1.2,
      ease: "power1.in"
    }, 9.0);

    if (isLoaded) {
      setTimeout(() => {
        targetCoords = getTargetCoords();
        ScrollTrigger.refresh();
      }, 150);
    }

    const handleResize = () => {
      targetCoords = getTargetCoords();
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach(t => {
        if (t.vars.trigger === container) t.kill();
      });
    };
  }, [isLoaded]);

  const circles = ASSETS.hero.circles;

  return (
    <section ref={containerRef} className="home-sticky">
      {/* Pinned Sticky Frame (Always in viewport 100vw x 100vh during scroll) */}
      <div ref={stickyRef} className="hero-sticky-frame">

        {/* Top Navbar: Exclusively in Hero */}
        <div ref={navRef} className="hero-nav-layer">
          <Navbar />
        </div>

        {/* 1. Flying Circular Video Layer (Full-screen -> Center Circle -> Travels into Target Portrait) */}
        <div ref={videoBoxRef} className="hero__video-box">
          <video
            ref={videoElementRef}
            muted
            autoPlay
            loop
            playsInline
            preload="auto"
            crossOrigin="anonymous"
            poster={ASSETS.hero.placeholderPc}
          >
            <source src={ASSETS.hero.videoDesktop} type="video/mp4" />
          </video>
        </div>

        {/* 2. Top Subtitle (Centered horizontally, positioned at top of hero above typography) */}
        <div ref={subtitleRef} className="hero__subtitle">
          <h3 className="f-24 is--title">
            We help teams stay supported
            <br />
            before challenges become disruptions.
          </h3>
        </div>

        {/* 3. Black Typographic Canvas with Oversized Words & 24 Circular Real Portraits */}
        <div ref={rowsParentRef} className="hero__rows--parent">
          <div className="hero__rows">

            {/* Row 1 */}
            <div ref={row1Ref} className="hero__row">
              <div className="hero__line">
                <span className="hero__word">artists</span>
                <div className="hero__circle">
                  <img src={circles[0].img} alt="Artists" loading="eager" />
                </div>
                <span className="hero__word">tour managers</span>
                <div className="hero__circle">
                  <img src={circles[1].img} alt="Tour Managers" loading="eager" />
                </div>
              </div>
              <div className="hero__line">
                <span className="hero__word">production teams</span>
                <div className="hero__circle">
                  <img src={circles[2].img} alt="Production Teams" loading="eager" />
                </div>
                <span className="hero__word">technical crews</span>
                <div className="hero__circle">
                  <img src={circles[3].img} alt="Technical Crews" loading="eager" />
                </div>
              </div>
              <div className="hero__line">
                <span className="hero__word">festivals</span>
                <div className="hero__circle">
                  <img src={circles[4].img} alt="Festivals" loading="eager" />
                </div>
                <span className="hero__word">live events</span>
                <div className="hero__circle">
                  <img src={circles[5].img} alt="Live Events" loading="eager" />
                </div>
              </div>
            </div>

            {/* Row 2 */}
            <div ref={row2Ref} className="hero__row">
              <div className="hero__line">
                <span className="hero__word">artists</span>
                <div className="hero__circle">
                  <img src={circles[6].img} alt="Artists" loading="eager" />
                </div>
                <span className="hero__word">tour managers</span>
                {/* Target circular portrait where video lands and merges */}
                <div ref={targetImageRef} className="hero__circle is--target">
                  <img src={circles[7].img} alt="Tour Managers" loading="eager" />
                </div>
              </div>
              <div className="hero__line">
                <span className="hero__word">production teams</span>
                <div className="hero__circle">
                  <img src={circles[8].img} alt="Production Teams" loading="eager" />
                </div>
                <span className="hero__word">technical crews</span>
                <div className="hero__circle">
                  <img src={circles[9].img} alt="Technical Crews" loading="eager" />
                </div>
              </div>
              <div className="hero__line">
                <span className="hero__word">festivals</span>
                <div className="hero__circle">
                  <img src={circles[10].img} alt="Festivals" loading="eager" />
                </div>
                <span className="hero__word">live events</span>
                <div className="hero__circle">
                  <img src={circles[11].img} alt="Live Events" loading="eager" />
                </div>
              </div>
            </div>

            {/* Row 3 */}
            <div ref={row3Ref} className="hero__row">
              <div className="hero__line">
                <span className="hero__word">artists</span>
                <div className="hero__circle">
                  <img src={circles[12].img} alt="Artists" loading="eager" />
                </div>
                <span className="hero__word">tour managers</span>
                <div className="hero__circle">
                  <img src={circles[13].img} alt="Tour Managers" loading="eager" />
                </div>
              </div>
              <div className="hero__line">
                <span className="hero__word">production teams</span>
                <div className="hero__circle">
                  <img src={circles[14].img} alt="Production Teams" loading="eager" />
                </div>
                <span className="hero__word">technical crews</span>
                <div className="hero__circle">
                  <img src={circles[15].img} alt="Technical Crews" loading="eager" />
                </div>
              </div>
              <div className="hero__line">
                <span className="hero__word">festivals</span>
                <div className="hero__circle">
                  <img src={circles[16].img} alt="Festivals" loading="eager" />
                </div>
                <span className="hero__word">live events</span>
                <div className="hero__circle">
                  <img src={circles[17].img} alt="Live Events" loading="eager" />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 4. Bottom Hero Description (Initial client view on landing matching Image 1 & 2) */}
        <div ref={bottomRef} className="hero__bottom">
          <div className="hero__descr">
            <h4 className="f-24">
              Embedded
              <br />
              psychological support
              <br />
              for touring crews.
            </h4>
          </div>
        </div>

      </div>
    </section>
  );
}
