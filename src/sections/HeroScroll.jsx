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
    const heroBottom = bottomRef.current;

    if (!container || !stickyFrame || !videoBox || !rowsParent) return;

    if (videoElement) {
      videoElement.muted = true;
      videoElement.playsInline = true;
      const playVideo = () => {
        const p = videoElement.play();
        if (p && p.catch) {
          p.catch(() => { });
        }
      };
      playVideo();
      videoElement.addEventListener('canplay', playVideo);
      videoElement.addEventListener('loadeddata', playVideo);
      videoElement.addEventListener('loadedmetadata', playVideo);
    }

    // Precise geometric calculation of center circle coordinates & radius relative to sticky frame
    const getTargetCoordinates = () => {
      const defaultRadius = isMobile ? 22 : 36;
      if (!centerCircle || !stickyFrame) {
        const cX = window.innerWidth / 2;
        const cY = window.innerHeight / 2;
        return {
          clipX: cX,
          clipY: cY,
          radius: defaultRadius,
          startRadius: Math.ceil(Math.hypot(cX, cY)) + 10
        };
      }

      // Temporarily measure in neutral scale and transform
      const savedScale = gsap.getProperty(rowsParent, "scale") || 1;
      const savedOrigin = gsap.getProperty(rowsParent, "transformOrigin") || "50% 50%";
      const savedX1 = gsap.getProperty(row1, "x") || 0;
      const savedX2 = gsap.getProperty(row2, "x") || 0;
      const savedX3 = gsap.getProperty(row3, "x") || 0;

      gsap.set(rowsParent, { scale: 1, transformOrigin: "50% 50%" });
      gsap.set([row1, row2, row3], { x: 0 });

      const targetRect = centerCircle.getBoundingClientRect();
      const stickyRect = stickyFrame.getBoundingClientRect();

      // Measure un-transformed base layout radius of target circle to prevent scale distortion
      const baseRadius = Math.round((centerCircle.offsetWidth || 72) / 2) || defaultRadius;

      const clipX = Math.round((targetRect.left - stickyRect.left) + targetRect.width / 2);
      const clipY = Math.round((targetRect.top - stickyRect.top) + targetRect.height / 2);
      const radius = baseRadius;

      // Exact diagonal distance to furthest viewport corner + 10px buffer
      const maxDx = Math.max(clipX, window.innerWidth - clipX);
      const maxDy = Math.max(clipY, window.innerHeight - clipY);
      const startRadius = Math.ceil(Math.hypot(maxDx, maxDy)) + 10;

      // Restore
      gsap.set(rowsParent, { scale: savedScale, transformOrigin: savedOrigin });
      gsap.set(row1, { x: savedX1 });
      gsap.set(row2, { x: savedX2 });
      gsap.set(row3, { x: savedX3 });

      return { clipX, clipY, radius, startRadius };
    };

    let { clipX, clipY, radius, startRadius } = getTargetCoordinates();

    // 1. Initial State: Video starts at EXACT viewport boundary (0% wasted offscreen radius)
    gsap.set(videoBox, {
      clipPath: `circle(${startRadius}px at ${clipX}px ${clipY}px)`,
      opacity: 1,
      zIndex: 15
    });

    // 2. Initial State: Typography starts enlarged (5.6x desktop, 3.8x mobile), anchored directly at (clipX, clipY)
    const initialTextScale = isMobile ? 3.8 : 5.6;
    gsap.set(rowsParent, {
      opacity: 1,
      scale: initialTextScale,
      transformOrigin: `${clipX}px ${clipY}px`
    });

    gsap.set([row1, row2, row3], { x: 0 });

    if (heroBottom) gsap.set(heroBottom, { opacity: 1, y: 0 });

    const shiftAmount = isMobile ? (window.innerWidth * 0.45) : (window.innerWidth * 0.28);

    // Master ScrollTrigger Pinned Timeline
    const masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        pin: stickyFrame,
        pinSpacing: false,
        scrub: 1.2,
        invalidateOnRefresh: true,
        onLeave: () => document.body.setAttribute('theme', 'white'),
        onEnterBack: () => document.body.setAttribute('theme', 'black'),
        onRefresh: () => {
          const updated = getTargetCoordinates();
          clipX = updated.clipX;
          clipY = updated.clipY;
          radius = updated.radius;
          startRadius = updated.startRadius;
          gsap.set(rowsParent, { transformOrigin: `${clipX}px ${clipY}px` });
        }
      }
    });

    // Step 1: Fade out navbar and bottom description gently on early scroll
    if (navRef.current) {
      masterTl.to(navRef.current, {
        opacity: 0,
        y: -20,
        duration: 1.5,
        ease: "none"
      }, 0.0);
    }

    if (heroBottom) {
      masterTl.to(heroBottom, {
        opacity: 0,
        y: -15,
        duration: 1.5,
        ease: "none"
      }, 0.0);
    }

    // Step 2: Immediate 1:1 visual level-by-level contraction from corners down to target circle size
    masterTl.fromTo(videoBox,
      { clipPath: `circle(${startRadius}px at ${clipX}px ${clipY}px)` },
      {
        clipPath: `circle(${radius}px at ${clipX}px ${clipY}px)`,
        duration: 8.0,
        ease: "none"
      },
      0.0
    );

    // Step 3: Typography zooms out in 1:1 lockstep parallel from enlarged size (5.6x -> 1.0x)
    masterTl.to(rowsParent, {
      scale: 1.0,
      duration: 8.0,
      ease: "none"
    }, 0.0);

    // Fade in all circle images progressively during the zoom-out
    const circleImgs = rowsParent.querySelectorAll('.hero__circle img');
    if (circleImgs.length > 0) {
      masterTl.fromTo(circleImgs, {
        opacity: 0.15,
        scale: 0.85
      }, {
        opacity: 1,
        scale: 1.05,
        duration: 3.5,
        stagger: {
          each: 0.08,
          from: "center"
        },
        ease: "none"
      }, 0.8);
    }

    // Step 4: Seamless Hand-off - Video dissolves ONLY AFTER it has completely reached the exact target circle size
    masterTl.to(videoBox, {
      opacity: 0,
      duration: 1.2,
      ease: "none"
    }, 8.0);

    // Step 5: Horizontal gliding of rows starts AFTER video has completely dissolved into the target image
    masterTl
      .to(row1, { x: `+=${shiftAmount}px`, ease: "none", duration: 4.5 }, 9.2)
      .to(row2, { x: `-=${shiftAmount}px`, ease: "none", duration: 4.5 }, 9.2)
      .to(row3, { x: `+=${shiftAmount}px`, ease: "none", duration: 4.5 }, 9.2);

    // Step 6: THE ICONIC SIGNIFICIO EXIT ZOOM-OUT TRANSITION DIRECTLY INTO ABOUT SECTION
    masterTl.to(rowsParent, {
      scale: isMobile ? 0.82 : 0.75,
      opacity: 0,
      duration: 2.0,
      ease: "none"
    }, 13.7);

    masterTl.to(stickyFrame, {
      autoAlpha: 0,
      duration: 1.5,
      ease: "none"
    }, 14.2);

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
            poster={ASSETS.hero.poster}
            muted
            autoPlay
            loop
            playsInline
            preload="auto"
          >
            <source src={ASSETS.hero.videoDesktop} type="video/mp4" />
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
              <div className="hero__circle">
                <img src={circles[7]?.img} alt="Tour Managers" loading="eager" />
              </div>
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
