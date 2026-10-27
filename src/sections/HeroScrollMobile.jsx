import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ASSETS } from '../utils/assets';
import { playWhenAllowed } from '../utils/playWhenAllowed';
import Navbar from '../components/Navbar';

gsap.registerPlugin(ScrollTrigger);

export default function HeroScrollMobile({ isLoaded = true }) {
  const containerRef = useRef(null);
  const stickyRef = useRef(null);
  const navRef = useRef(null);
  const videoBoxRef = useRef(null);
  const videoElementRef = useRef(null);
  const rowsParentRef = useRef(null);
  const centerCircleRef = useRef(null);
  const centerImgRef = useRef(null);
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);
  const row3Ref = useRef(null);
  const bottomRef = useRef(null);
  const refreshLayoutRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
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

    // Gracefully handle mobile video autoplay (retries on first touch if autoplay is blocked)
    const stopVideoRetry = playWhenAllowed(videoElement);

    // Precise calculation of target center circle coordinates & radius relative to sticky frame
    const getTargetCoordinates = () => {
      const defaultRadius = Math.round(window.innerWidth * 0.065) || 24;
      const centeredX = Math.round(window.innerWidth / 2);
      const centeredY = Math.round(window.innerHeight / 2);

      if (!centerCircle || !stickyFrame) {
        return {
          clipX: centeredX,
          clipY: centeredY,
          radius: defaultRadius
        };
      }

      // Temporarily read in neutral scale and position to avoid transform bias
      const savedScale = gsap.getProperty(rowsParent, 'scale') || 1;
      const savedY = gsap.getProperty(rowsParent, 'y') || 0;
      const savedOrigin = gsap.getProperty(rowsParent, 'transformOrigin') || '50% 50%';
      const savedX1 = gsap.getProperty(row1, 'x') || 0;
      const savedX2 = gsap.getProperty(row2, 'x') || 0;
      const savedX3 = gsap.getProperty(row3, 'x') || 0;
      const rowsInner = rowsParent.firstElementChild;
      const savedInnerScale = gsap.getProperty(rowsInner, 'scale') || 1;

      gsap.set(rowsInner, { scale: 1 });
      gsap.set(rowsParent, { scale: 1, y: 0, transformOrigin: '50% 50%' });
      gsap.set([row1, row2, row3], { x: 0 });

      const targetRect = centerCircle.getBoundingClientRect();
      const stickyRect = stickyFrame.getBoundingClientRect();

      // Ensure clipX is centered to avoid asymmetric flex drift
      const rawClipX = Math.round(targetRect.left + targetRect.width / 2 - stickyRect.left);
      const calculatedClipX = Math.abs(rawClipX - centeredX) < 60 ? centeredX : rawClipX;
      const calculatedClipY = Math.round(targetRect.top + targetRect.height / 2 - stickyRect.top) || centeredY;
      const calculatedRadius = Math.round(targetRect.width / 2) || defaultRadius;

      // Restore transforms
      gsap.set(rowsInner, { scale: savedInnerScale });
      gsap.set(rowsParent, { scale: savedScale, y: savedY, transformOrigin: savedOrigin });
      gsap.set(row1, { x: savedX1 });
      gsap.set(row2, { x: savedX2 });
      gsap.set(row3, { x: savedX3 });

      return {
        clipX: calculatedClipX,
        clipY: calculatedClipY,
        radius: calculatedRadius
      };
    };

    let { clipX, clipY, radius } = getTargetCoordinates();

    const ctx = gsap.context(() => {
      const initialTextScale = 3.8;

      // Rows travel about one word-width, matching the desktop glide relative to the type size
      const shiftDistance = Math.round(window.innerWidth * 0.5);

      // 1. Initial State: Video is 100% fullscreen, centered on the target coordinate
      gsap.set(videoBox, {
        clipPath: `circle(150vmax at ${clipX}px ${clipY}px)`,
        opacity: 1,
        zIndex: 15
      });

      // 2. Initial State: Typography begins enlarged, anchored directly at (clipX, clipY)
      gsap.set(rowsParent, {
        opacity: 1,
        scale: initialTextScale,
        y: 0,
        transformOrigin: `${clipX}px ${clipY}px`
      });

      gsap.set([row1, row2, row3], { x: 0 });

      if (heroBottom) gsap.set(heroBottom, { opacity: 1, y: 0 });
      if (navRef.current) gsap.set(navRef.current, { opacity: 1, y: 0 });

      // Ensure the central target image is ready and visible underneath the video
      if (centerImgRef.current) {
        gsap.set(centerImgRef.current, { opacity: 1, scale: 1.05 });
      }

      // Master Mobile Timeline: same stage timings as desktop. Ending at "bottom bottom" means the
      // whole sequence settles exactly as About's top edge reaches the bottom of the viewport.
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom bottom',
          pin: stickyFrame,
          pinSpacing: false,
          scrub: 0.25,
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

      // Stage 1: Fade out top navbar and bottom description on early scroll
      if (navRef.current) {
        masterTl.to(navRef.current, {
          opacity: 0,
          y: -18,
          duration: 1.2,
          ease: 'power2.out'
        }, 0.0);
      }

      if (heroBottom) {
        masterTl.to(heroBottom, {
          opacity: 0,
          y: -15,
          duration: 1.5,
          ease: 'power2.out'
        }, 0.0);
      }

      // Stage 2: Contract fullscreen video smoothly into central circle
      masterTl.fromTo(videoBox, {
        clipPath: `circle(150vmax at ${clipX}px ${clipY}px)`
      }, {
        clipPath: () => `circle(${radius}px at ${clipX}px ${clipY}px)`,
        duration: 5.4,
        ease: 'power2.inOut'
      }, 0.0);

      // Stage 3: Typography zooms out in parallel from enlarged size anchored on target circle
      masterTl.fromTo(rowsParent, {
        scale: initialTextScale
      }, {
        scale: 1.0,
        duration: 5.2,
        ease: 'power2.out'
      }, 0.0);

      // Fade in peripheral circle images with subtle stagger during zoom-out
      const otherImgs = rowsParent.querySelectorAll('.hero-mob__circle:not(.hero-mob__circle--target) img');
      if (otherImgs.length > 0) {
        masterTl.fromTo(otherImgs, {
          opacity: 0.2,
          scale: 0.85
        }, {
          opacity: 1,
          scale: 1.05,
          duration: 2.8,
          stagger: {
            each: 0.08,
            from: 'center'
          },
          ease: 'power1.out'
        }, 0.5);
      }

      // Stage 4: Seamless handoff - Video dissolves into the perfectly aligned underlying circular portrait
      masterTl.to(videoBox, {
        opacity: 0,
        duration: 0.8,
        ease: 'power1.in'
      }, 4.8);

      // Stage 5: Horizontal gliding of rows starts once video has cleanly settled into circle
      masterTl
        .to(row1, { x: `+=${shiftDistance}px`, ease: 'none', duration: 3.8 }, 5.6)
        .to(row2, { x: `-=${shiftDistance}px`, ease: 'none', duration: 3.8 }, 5.6)
        .to(row3, { x: `+=${shiftDistance}px`, ease: 'none', duration: 3.8 }, 5.6);

      // Stage 6: Exit zoom-out, pulling the typography field back before About covers the hero.
      // Scales the inner rows so the parent's 100vw overflow clip stays edge-to-edge.
      masterTl.to(rowsParent.firstElementChild, {
        scale: 0.85,
        duration: 1.2,
        ease: 'power2.inOut'
      }, 8.6);

    }, container);

    const refreshLayout = () => {
      if (!isMounted) return;
      const updated = getTargetCoordinates();
      clipX = updated.clipX;
      clipY = updated.clipY;
      radius = updated.radius;
      gsap.set(rowsParent, { transformOrigin: `${clipX}px ${clipY}px` });
      ScrollTrigger.refresh();
    };

    refreshLayoutRef.current = refreshLayout;

    if (document.fonts) {
      document.fonts.ready.then(() => {
        if (isMounted) refreshLayout();
      });
    }

    // Filtered resize handling:
    // Ignores minor mobile address bar fluctuations (< 25%), while responding cleanly to genuine width/orientation changes
    let lastWidth = window.innerWidth;
    let lastHeight = window.innerHeight;
    let resizeTimer = null;

    const handleResize = () => {
      const currentWidth = window.innerWidth;
      const currentHeight = window.innerHeight;
      const widthChanged = currentWidth !== lastWidth;
      const significantHeightChange = Math.abs(currentHeight - lastHeight) > currentHeight * 0.25;

      if (widthChanged || significantHeightChange) {
        lastWidth = currentWidth;
        lastHeight = currentHeight;
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          if (isMounted) refreshLayout();
        }, 150);
      }
    };

    const handleOrientation = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (isMounted) refreshLayout();
      }, 200);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('orientationchange', handleOrientation, { passive: true });

    return () => {
      isMounted = false;
      stopVideoRetry();
      refreshLayoutRef.current = null;
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientation);
      ctx.revert();
    };
  }, []);

  // Sync with loader completion
  useEffect(() => {
    if (!isLoaded) return;
    const timer = setTimeout(() => {
      refreshLayoutRef.current?.();
    }, 200);
    return () => clearTimeout(timer);
  }, [isLoaded]);

  const circles = ASSETS.hero.circles;

  const handleImageError = (e) => {
    e.currentTarget.style.visibility = 'hidden';
  };

  return (
    <section ref={containerRef} className="hero-mob-sticky">
      {/* Pinned Sticky Frame (100vw x 100dvh during scroll) */}
      <div ref={stickyRef} className="hero-mob-sticky-frame">

        {/* Top Navbar Layer */}
        <div ref={navRef} className="hero-mob-nav-layer">
          <Navbar />
        </div>

        {/* 1. Contracting Video Layer (Fullscreen -> Center Circle -> Dissolve) */}
        <div ref={videoBoxRef} className="hero-mob__video-box">
          <video
            ref={videoElementRef}
            muted
            autoPlay
            loop
            playsInline
            preload="auto"
            crossOrigin="anonymous"
            poster={ASSETS.hero.placeholderMob}
          >
            <source src={ASSETS.hero.videoMobile} type="video/mp4" />
          </video>
        </div>

        {/* 2. Typographic Field with Oversized Words & Perfectly Concentric Target Circle */}
        <div ref={rowsParentRef} className="hero-mob__rows--parent">
          <div className="hero-mob__rows">

            {/* Row 1 */}
            <div ref={row1Ref} className="hero-mob__row">
              <span className="hero-mob__word">tour managers</span>
              <div className="hero-mob__circle">
                <img src={circles[0]?.img} alt="Tour Managers" loading="eager" onError={handleImageError} />
              </div>
              <span className="hero-mob__word">artists</span>
              <div className="hero-mob__circle">
                <img src={circles[1]?.img} alt="Artists" loading="eager" onError={handleImageError} />
              </div>
              <span className="hero-mob__word">production teams</span>
              <div className="hero-mob__circle">
                <img src={circles[2]?.img} alt="Production Teams" loading="eager" onError={handleImageError} />
              </div>
              <span className="hero-mob__word">technical crews</span>
              <div className="hero-mob__circle">
                <img src={circles[3]?.img} alt="Technical Crews" loading="eager" onError={handleImageError} />
              </div>
              <span className="hero-mob__word">festivals</span>
              <div className="hero-mob__circle">
                <img src={circles[4]?.img} alt="Festivals" loading="eager" onError={handleImageError} />
              </div>
              <span className="hero-mob__word">live events</span>
              <div className="hero-mob__circle">
                <img src={circles[5]?.img} alt="Live Events" loading="eager" onError={handleImageError} />
              </div>
            </div>

            {/* Row 2 (Balanced symmetrically around the central target circle) */}
            <div ref={row2Ref} className="hero-mob__row hero-mob__row--center">
              <div className="hero-mob__row-half hero-mob__row-half--left">
                <span className="hero-mob__word">live events</span>
                <div className="hero-mob__circle">
                  <img src={circles[11]?.img} alt="Live Events" loading="eager" onError={handleImageError} />
                </div>
                <span className="hero-mob__word">artists</span>
                <div className="hero-mob__circle">
                  <img src={circles[6]?.img} alt="Artists" loading="eager" onError={handleImageError} />
                </div>
                <span className="hero-mob__word">production teams</span>
              </div>

              {/* TARGET CENTER CIRCLE (Dead center of Row 2 and the viewport) */}
              <div ref={centerCircleRef} className="hero-mob__circle hero-mob__circle--target">
                <img
                  ref={centerImgRef}
                  src={circles[8]?.img}
                  alt="Central Circle Target"
                  loading="eager"
                  onError={handleImageError}
                />
              </div>

              <div className="hero-mob__row-half hero-mob__row-half--right">
                <span className="hero-mob__word">technical crews</span>
                <div className="hero-mob__circle">
                  <img src={circles[9]?.img} alt="Technical Crews" loading="eager" onError={handleImageError} />
                </div>
                <span className="hero-mob__word">festivals</span>
                <div className="hero-mob__circle">
                  <img src={circles[10]?.img} alt="Festivals" loading="eager" onError={handleImageError} />
                </div>
                <span className="hero-mob__word">tour managers</span>
              </div>
            </div>

            {/* Row 3 */}
            <div ref={row3Ref} className="hero-mob__row">
              <span className="hero-mob__word">festivals</span>
              <div className="hero-mob__circle">
                <img src={circles[12]?.img} alt="Festivals" loading="eager" onError={handleImageError} />
              </div>
              <span className="hero-mob__word">live events</span>
              <div className="hero-mob__circle">
                <img src={circles[13]?.img} alt="Live Events" loading="eager" onError={handleImageError} />
              </div>
              <span className="hero-mob__word">artists</span>
              <div className="hero-mob__circle">
                <img src={circles[14]?.img} alt="Artists" loading="eager" onError={handleImageError} />
              </div>
              <span className="hero-mob__word">tour managers</span>
              <div className="hero-mob__circle">
                <img src={circles[15]?.img} alt="Tour Managers" loading="eager" onError={handleImageError} />
              </div>
              <span className="hero-mob__word">production teams</span>
              <div className="hero-mob__circle">
                <img src={circles[16]?.img} alt="Production Teams" loading="eager" onError={handleImageError} />
              </div>
              <span className="hero-mob__word">technical crews</span>
              <div className="hero-mob__circle">
                <img src={circles[17]?.img} alt="Technical Crews" loading="eager" onError={handleImageError} />
              </div>
            </div>

          </div>
        </div>

        {/* 3. Bottom Hero Description */}
        <div ref={bottomRef} className="hero-mob__bottom">
          <div className="hero-mob__descr">
            <h4>
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
