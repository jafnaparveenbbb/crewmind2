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
  const centerCircleRef = useRef(null);
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);
  const row3Ref = useRef(null);
  const row4Ref = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    const container = containerRef.current;
    const stickyFrame = stickyRef.current;
    const videoBox = videoBoxRef.current;
    const videoElement = videoElementRef.current;
    const rowsParent = rowsParentRef.current;
    const centerCircle = centerCircleRef.current;
    const row1 = row1Ref.current;
    const row2 = row2Ref.current;
    const row3 = row3Ref.current;
    const row4 = row4Ref.current;
    const heroBottom = bottomRef.current;

    if (!container || !stickyFrame || !videoBox || !rowsParent) return;

    if (videoElement) {
      videoElement.play().catch(() => { });
    }

    // Precise geometric calculation of center circle coordinates & radius relative to sticky frame
    const getTargetCoordinates = () => {
      const isMob = window.innerWidth <= 768;
      const defaultRadius = isMob ? 26 : 36;
      if (!centerCircle || !stickyFrame) {
        return {
          clipX: window.innerWidth / 2,
          clipY: window.innerHeight / 2,
          radius: defaultRadius
        };
      }

      // Temporarily measure in neutral scale and transform
      const savedScale = gsap.getProperty(rowsParent, "scale") || 1;
      const savedOrigin = gsap.getProperty(rowsParent, "transformOrigin") || "50% 50%";
      const savedX1 = gsap.getProperty(row1, "x") || 0;
      const savedX2 = gsap.getProperty(row2, "x") || 0;
      const savedX3 = gsap.getProperty(row3, "x") || 0;
      const savedX4 = row4 ? (gsap.getProperty(row4, "x") || 0) : 0;

      gsap.set(rowsParent, { scale: 1, transformOrigin: "50% 50%" });
      gsap.set([row1, row2, row3, row4].filter(Boolean), { x: 0 });

      const targetRect = centerCircle.getBoundingClientRect();
      const stickyRect = stickyFrame.getBoundingClientRect();

      const clipX = Math.round(targetRect.left + targetRect.width / 2 - stickyRect.left);
      const clipY = Math.round(targetRect.top + targetRect.height / 2 - stickyRect.top);
      const radius = Math.round(targetRect.width / 2) || defaultRadius;

      // Restore
      gsap.set(rowsParent, { scale: savedScale, transformOrigin: savedOrigin });
      gsap.set(row1, { x: savedX1 });
      gsap.set(row2, { x: savedX2 });
      gsap.set(row3, { x: savedX3 });
      if (row4) gsap.set(row4, { x: savedX4 });

      return { clipX, clipY, radius };
    };

    let { clipX, clipY, radius } = getTargetCoordinates();

    const isMob = window.innerWidth <= 768;
    const initialTextScale = isMob ? 4.2 : 5.6;

    // 1. Initial State: Video is 100% Fullscreen, centered right on the target coordinates
    gsap.set(videoBox, {
      clipPath: `circle(150vmax at ${clipX}px ${clipY}px)`,
      opacity: 1,
      zIndex: 15
    });

    // 2. Initial State: Typography starts enlarged, anchored directly at (clipX, clipY)
    gsap.set(rowsParent, {
      opacity: 1,
      scale: initialTextScale,
      transformOrigin: `${clipX}px ${clipY}px`
    });

    gsap.set([row1, row2, row3, row4].filter(Boolean), { x: 0 });

    if (heroBottom) gsap.set(heroBottom, { opacity: 1, y: 0 });

    const shiftAmount = isMob ? (window.innerWidth * 0.45) : (window.innerWidth * 0.28);

    // Master ScrollTrigger Pinned Timeline (Pinned across 400vh scroll with smooth 1.2s scrub damping)
    const masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        pin: stickyFrame,
        pinSpacing: false,
        scrub: 0.8,
        invalidateOnRefresh: true,
        onEnterBack: () => document.body.setAttribute('theme', 'navy'),
        onRefresh: () => {
          const updated = getTargetCoordinates();
          clipX = updated.clipX;
          clipY = updated.clipY;
          radius = updated.radius;
          gsap.set(rowsParent, { transformOrigin: `${clipX}px ${clipY}px` });
        }
      }
    });

    // Step 1: Fade out navbar and bottom description gently on early scroll
    if (navRef.current) {
      masterTl.to(navRef.current, {
        opacity: 0,
        y: -20,
        duration: 1.2,
        ease: "power2.out"
      }, 0.0);
    }

    if (heroBottom) {
      masterTl.to(heroBottom, {
        opacity: 0,
        y: -15,
        duration: 1.5,
        ease: "power2.out"
      }, 0.0);
    }

    // Step 2: Luxurious, gradual zoom-out of video from Fullscreen directly to center circle
    masterTl.fromTo(videoBox, {
      clipPath: `circle(150vmax at ${clipX}px ${clipY}px)`
    }, {
      clipPath: () => `circle(${radius}px at ${clipX}px ${clipY}px)`,
      duration: 5.4,
      ease: "power2.inOut"
    }, 0.0);

    // Step 3: Typography zooms out in parallel from enlarged size anchored on the target circle
    masterTl.fromTo(rowsParent, {
      scale: initialTextScale
    }, {
      scale: 1.0,
      duration: 5.2,
      ease: "power2.out"
    }, 0.0);

    // Fade in all circle images with subtle stagger during the zoom-out
    const circleImgs = rowsParent.querySelectorAll('.hero__circle img');
    if (circleImgs.length > 0) {
      masterTl.fromTo(circleImgs, {
        opacity: 0.15,
        scale: 0.85
      }, {
        opacity: 1,
        scale: 1.05,
        duration: 2.8,
        stagger: {
          each: 0.08,
          from: "center"
        },
        ease: "power1.out"
      }, 0.5);
    }

    // Step 4: Seamless Hand-off - Video dissolves cleanly into the perfectly aligned Central Circle Image
    masterTl.to(videoBox, {
      opacity: 0,
      duration: 0.8,
      ease: "power1.in"
    }, 4.8);

    // Step 5: Horizontal gliding of rows starts AFTER video has completely settled into the circle
    masterTl
      .to(row1, { x: `+=${shiftAmount}px`, ease: "none", duration: 3.8 }, 5.6)
      .to(row2, { x: `-=${shiftAmount}px`, ease: "none", duration: 3.8 }, 5.6)
      .to(row3, { x: `+=${shiftAmount}px`, ease: "none", duration: 3.8 }, 5.6);

    if (row4) {
      masterTl.to(row4, { x: `-=${shiftAmount}px`, ease: "none", duration: 3.8 }, 5.6);
    }

    // Step 6: THE ICONIC SIGNIFICIO EXIT ZOOM-OUT TRANSITION INTO NEXT SECTION
    // Pull back entire typography field into 3D perspective as Next Section reveals
    masterTl.to(rowsParent, {
      scale: isMobile ? 0.92 : 0.85,
      duration: 1.2,
      ease: "power2.inOut"
    }, 8.6);

    const refreshLayout = () => {
      const updated = getTargetCoordinates();
      clipX = updated.clipX;
      clipY = updated.clipY;
      radius = updated.radius;
      gsap.set(rowsParent, { transformOrigin: `${clipX}px ${clipY}px` });
      ScrollTrigger.refresh();
    };

    if (document.fonts) {
      document.fonts.ready.then(refreshLayout);
    }

    if (isLoaded) {
      setTimeout(refreshLayout, 200);
    }

    window.addEventListener('resize', refreshLayout);

    return () => {
      window.removeEventListener('resize', refreshLayout);
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

        {/* 1. Flying Circular Video Layer (Full-screen -> Center Circle -> Lands right on the Target Portrait) */}
        <div ref={videoBoxRef} className="hero__video-box">
          <video
            ref={videoElementRef}
            muted
            autoPlay
            loop
            playsInline
            preload="auto"
            crossOrigin="anonymous"
            poster={typeof window !== 'undefined' && window.innerWidth <= 768 ? ASSETS.hero.placeholderMob : ASSETS.hero.placeholderPc}
          >
            <source src={typeof window !== 'undefined' && window.innerWidth <= 768 ? ASSETS.hero.videoMobile : ASSETS.hero.videoDesktop} type="video/mp4" />
          </video>
        </div>

        {/* 2. Black Typographic Canvas with Oversized Words & Circular Real Portraits */}
        <div ref={rowsParentRef} className="hero__rows--parent">
          <div className="hero__rows">

            {/* Row 1 */}
            <div ref={row1Ref} className="hero__row">
              <span className="hero__word">tour managers</span>
              <div className="hero__circle">
                <img src={circles[0]?.img} alt="Tour Managers" loading="eager" />
              </div>
              <span className="hero__word">artists</span>
              <div className="hero__circle">
                <img src={circles[1]?.img} alt="Artists" loading="eager" />
              </div>
              <span className="hero__word">production teams</span>
              <div className="hero__circle">
                <img src={circles[2]?.img} alt="Production Teams" loading="eager" />
              </div>
              <span className="hero__word">technical crews</span>
              <div className="hero__circle">
                <img src={circles[3]?.img} alt="Technical Crews" loading="eager" />
              </div>
              <span className="hero__word">festivals</span>
              <div className="hero__circle">
                <img src={circles[4]?.img} alt="Festivals" loading="eager" />
              </div>
              <span className="hero__word">live events</span>
              <div className="hero__circle">
                <img src={circles[5]?.img} alt="Live Events" loading="eager" />
              </div>
            </div>

            {/* Row 2 (Balanced with target circle in dead center) */}
            <div ref={row2Ref} className="hero__row">
              <span className="hero__word">live events</span>
              <div className="hero__circle">
                <img src={circles[11]?.img} alt="Live Events" loading="eager" />
              </div>
              <span className="hero__word">artists</span>
              <div className="hero__circle">
                <img src={circles[6]?.img} alt="Artists" loading="eager" />
              </div>
              <span className="hero__word">production teams</span>

              {/* TARGET CENTER CIRCLE (Exact concentric match for contracting video) */}
              <div ref={centerCircleRef} className="hero__circle hero__circle--target">
                <img src={circles[8]?.img} alt="Central Circle Target" loading="eager" />
              </div>

              <span className="hero__word">technical crews</span>
              <div className="hero__circle">
                <img src={circles[9]?.img} alt="Technical Crews" loading="eager" />
              </div>
              <span className="hero__word">festivals</span>
              <div className="hero__circle">
                <img src={circles[10]?.img} alt="Festivals" loading="eager" />
              </div>
              <span className="hero__word">tour managers</span>
            </div>

            {/* Row 3 */}
            <div ref={row3Ref} className="hero__row">
              <span className="hero__word">festivals</span>
              <div className="hero__circle">
                <img src={circles[12]?.img} alt="Festivals" loading="eager" />
              </div>
              <span className="hero__word">live events</span>
              <div className="hero__circle">
                <img src={circles[13]?.img} alt="Live Events" loading="eager" />
              </div>
              <span className="hero__word">artists</span>
              <div className="hero__circle">
                <img src={circles[14]?.img} alt="Artists" loading="eager" />
              </div>
              <span className="hero__word">tour managers</span>
              <div className="hero__circle">
                <img src={circles[15]?.img} alt="Tour Managers" loading="eager" />
              </div>
              <span className="hero__word">production teams</span>
              <div className="hero__circle">
                <img src={circles[16]?.img} alt="Production Teams" loading="eager" />
              </div>
              <span className="hero__word">technical crews</span>
              <div className="hero__circle">
                <img src={circles[17]?.img} alt="Technical Crews" loading="eager" />
              </div>
            </div>

            {/* Row 4 (Mobile Only: 4th Horizontal Line with Distinct Portraits) */}
            <div ref={row4Ref} className="hero__row hero__row--mobile-only">
              <span className="hero__word">tour managers</span>
              <div className="hero__circle">
                <img src={circles[18]?.img} alt="Tour Managers" loading="eager" />
              </div>
              <span className="hero__word">artists</span>
              <div className="hero__circle">
                <img src={circles[19]?.img} alt="Artists" loading="eager" />
              </div>
              <span className="hero__word">live events</span>
              <div className="hero__circle">
                <img src={circles[20]?.img} alt="Live Events" loading="eager" />
              </div>
              <span className="hero__word">technical crews</span>
              <div className="hero__circle">
                <img src={circles[21]?.img} alt="Technical Crews" loading="eager" />
              </div>
              <span className="hero__word">production teams</span>
              <div className="hero__circle">
                <img src={circles[22]?.img} alt="Production Teams" loading="eager" />
              </div>
              <span className="hero__word">festivals</span>
              <div className="hero__circle">
                <img src={circles[23]?.img} alt="Festivals" loading="eager" />
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
