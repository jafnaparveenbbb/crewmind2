import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import crewmindLogo from '../assets/crewmind-logo-02.png';

/**
 * Character slice definitions directly from CREWMIND LOGO-02.png (viewBox: 0 0 807 138)
 * Ensures 100% exact letter shapes, proportions, and kerning matching the official reference.
 * Glyphs: c, r, e, w, m, i, n, d, .
 */
const CHAR_SLICES = [
  { id: 'c', x: 0, w: 98, cx: 49 },
  { id: 'r', x: 98, w: 59, cx: 127.5 },
  { id: 'e', x: 157, w: 89, cx: 201.5 },
  { id: 'w', x: 246, w: 132, cx: 312 },
  { id: 'm', x: 378, w: 147, cx: 451.5 },
  { id: 'i', x: 525, w: 41, cx: 545.5 },
  { id: 'n', x: 566, w: 96, cx: 614 },
  { id: 'd', x: 662, w: 104, cx: 714 },
  { id: 'dot', x: 766, w: 41, cx: 786.5 },
];

/**
 * PageLoader
 * Letter-by-letter animation using the exact reference logo 'crewmind.'
 * Medium-slow, smooth, deliberate arrival and settle with a buttery exit into the hero section.
 */
export default function PageLoader({ onComplete }) {
  const loaderRef = useRef(null);
  const logoWrapRef = useRef(null);
  const charRefs = useRef([]);

  useEffect(() => {
    // Force instant scroll to top on mount
    window.scrollTo(0, 0);

    const loader = loaderRef.current;
    const logoWrap = logoWrapRef.current;
    if (!loader || !logoWrap) return;

    // Initial state: hide individual character slices and anchor transform origins
    CHAR_SLICES.forEach((slice, idx) => {
      const el = charRefs.current[idx];
      if (el) {
        gsap.set(el, {
          opacity: 0,
          y: 7,
          transformOrigin: `${slice.cx}px 69px`,
        });
      }
    });

    const tl = gsap.timeline({
      delay: 0.15,
      onComplete: () => {
        // 1. Gently dissolve the wordmark with a subtle scale drift
        gsap.to(logoWrap, {
          opacity: 0,
          scale: 0.985,
          duration: 0.45,
          ease: 'power2.inOut',
        });

        // 2. Buttery smooth fade-out of the dark navy background into the hero section
        gsap.to(loader, {
          opacity: 0,
          duration: 0.6,
          delay: 0.15,
          ease: 'power3.inOut',
          onComplete: () => {
            if (onComplete) onComplete();
          },
        });
      },
    });

    // Staggered emergence of the 9 glyphs with natural, comfortable cadence
    const staggerDelays = [0.06, 0.28, 0.16, 0.44, 0.10, 0.58, 0.36, 0.70, 0.82];

    CHAR_SLICES.forEach((slice, idx) => {
      const el = charRefs.current[idx];
      if (!el) return;
      const charDelay = staggerDelays[idx];

      tl.to(
        el,
        {
          opacity: 1,
          y: 0,
          duration: 0.24,
          ease: 'power2.out',
        },
        charDelay
      )
      .to(
        el,
        {
          opacity: 0.4,
          duration: 0.12,
        },
        charDelay + 0.18
      )
      .to(
        el,
        {
          opacity: 1,
          duration: 0.16,
        },
        charDelay + 0.28
      );
    });

    // Settle beat: subtle collective breath as all characters lock into place
    const validChars = charRefs.current.filter(Boolean);
    tl.to(
      validChars,
      {
        scale: 1.035,
        duration: 0.24,
        delay: 0.12,
        stagger: 0.02,
        ease: 'power1.out',
        yoyo: true,
        repeat: 1,
      }
    )
    // Generous, confident hold on the complete settled wordmark
    .to(logoWrap, { duration: 0.65 });

    return () => {
      tl.kill();
      gsap.killTweensOf([loader, logoWrap, ...charRefs.current]);
    };
  }, [onComplete]);

  return (
    <div ref={loaderRef} className="page-loader" aria-label="Loading Crewmind">
      <div ref={logoWrapRef} className="loader-logo-wrap">
        <svg
          viewBox="0 0 807 138"
          className="loader-logo-svg"
          aria-label="crewmind."
          role="img"
        >
          <defs>
            {CHAR_SLICES.map((slice) => (
              <clipPath key={slice.id} id={`loader-clip-${slice.id}`}>
                <rect x={slice.x} y="0" width={slice.w} height="138" />
              </clipPath>
            ))}
          </defs>
          {CHAR_SLICES.map((slice, index) => (
            <g
              key={slice.id}
              ref={(el) => (charRefs.current[index] = el)}
              clipPath={`url(#loader-clip-${slice.id})`}
            >
              <image
                href={crewmindLogo}
                xlinkHref={crewmindLogo}
                width="807"
                height="138"
              />
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
