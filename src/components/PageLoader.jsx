import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

import sliceC from '../assets/logo-slices/c.png';
import sliceR from '../assets/logo-slices/r.png';
import sliceE from '../assets/logo-slices/e.png';
import sliceW from '../assets/logo-slices/w.png';
import sliceM from '../assets/logo-slices/m.png';
import sliceI from '../assets/logo-slices/i.png';
import sliceN from '../assets/logo-slices/n.png';
import sliceD from '../assets/logo-slices/d.png';
import sliceDot from '../assets/logo-slices/dot.png';

/**
 * Exact character slice definitions directly from the official CREWMIND logo
 * Total SVG canvas: viewBox="0 0 807 138"
 * Slices partition the 807x138 wordmark without gaps or overlaps:
 *   c:   0..98   (w: 98)
 *   r:  98..157  (w: 59)
 *   e: 157..246  (w: 89)
 *   w: 246..378  (w: 132)
 *   m: 378..525  (w: 147)
 *   i: 525..566  (w: 41)
 *   n: 566..662  (w: 96)
 *   d: 662..766  (w: 104)
 *   .: 766..807  (w: 41)
 */
const GLYPHS = [
  { id: 'c', src: sliceC, x: 0, y: 0, w: 98, h: 138 },
  { id: 'r', src: sliceR, x: 98, y: 0, w: 59, h: 138 },
  { id: 'e', src: sliceE, x: 157, y: 0, w: 89, h: 138 },
  { id: 'w', src: sliceW, x: 246, y: 0, w: 132, h: 138 },
  { id: 'm', src: sliceM, x: 378, y: 0, w: 147, h: 138 },
  { id: 'i', src: sliceI, x: 525, y: 0, w: 41, h: 138 },
  { id: 'n', src: sliceN, x: 566, y: 0, w: 96, h: 138 },
  { id: 'd', src: sliceD, x: 662, y: 0, w: 104, h: 138 },
  { id: 'dot', src: sliceDot, x: 766, y: 0, w: 41, h: 138 },
];

/**
 * PageLoader
 * Reproduces the Figma/reference motion from 'Desktop - 1.mp4':
 * 1. Full-screen dark navy background: #00063D.
 * 2. Morphing & overlapping sequence of the individual brand glyphs:
 *    - 'm' rotates clockwise from -180° to 0° while dot emerges.
 *    - 'd' and 'n' rotate into place, 'i' drops in, forming "mind.".
 *    - 'e' and 'w' appear inverted; 'e' flips upright.
 *    - 'w' rotates clockwise through 90° ('3') and snaps upright; 'r' straightens; 'c' glides in.
 * 3. Brief confident hold on the pristine assembled wordmark.
 * 4. Buttery smooth dissolve/fade into the Hero section with Lenis/ScrollTrigger handoff.
 */
export default function PageLoader({ onComplete }) {
  const loaderRef = useRef(null);
  const logoWrapRef = useRef(null);
  const glyphRefs = useRef([]);

  useEffect(() => {
    // Force instant scroll to top on mount
    window.scrollTo(0, 0);

    const loader = loaderRef.current;
    const logoWrap = logoWrapRef.current;
    if (!loader || !logoWrap) return;

    // Exit transition handler
    const triggerExit = () => {
      // 1. Gently dissolve the wordmark with subtle scale drift
      gsap.to(logoWrap, {
        opacity: 0,
        scale: 0.985,
        duration: 0.45,
        ease: 'power2.inOut',
      });

      // 2. Buttery smooth fade-out of the dark navy background into the hero section
      gsap.to(loader, {
        opacity: 0,
        duration: 0.60,
        delay: 0.15,
        ease: 'power3.inOut',
        onComplete: () => {
          if (onComplete) onComplete();
        },
      });
    };

    // Motion sequence:
    // Elements: [c, r, e, w, m, i, n, d, dot]
    const [c, r, e, w, m, i, n, d, dot] = glyphRefs.current;
    if (!c || !r || !e || !w || !m || !i || !n || !d || !dot) return;

    // Initial states:
    // transformOrigin: "50% 50%" centers rotation on each glyph's own bounding box
    gsap.set(m, { opacity: 0, rotation: -180, transformOrigin: '50% 50%' });
    gsap.set(dot, { opacity: 0, scale: 0.5, transformOrigin: '50% 50%' });
    gsap.set(d, { opacity: 0, rotation: 180, transformOrigin: '50% 50%' });
    gsap.set(n, { opacity: 0, rotation: 180, transformOrigin: '50% 50%' });
    gsap.set(i, { opacity: 0, y: -12, transformOrigin: '50% 50%' });
    gsap.set(e, { opacity: 0, rotation: 180, transformOrigin: '50% 50%' });
    gsap.set(w, { opacity: 0, rotation: -180, transformOrigin: '50% 50%' });
    gsap.set(r, { opacity: 0, rotation: -22, x: -8, transformOrigin: '50% 50%' });
    gsap.set(c, { opacity: 0, x: -10, transformOrigin: '50% 50%' });

    const tl = gsap.timeline({
      delay: 0.12,
      onComplete: triggerExit,
    });

    // --- PHASE 1 (0.00s - 0.50s): 'm' rotation to 0 + dot emergence ---
    tl.to(m, {
      opacity: 1,
      rotation: 0,
      duration: 0.50,
      ease: 'power2.out',
    }, 0.00);

    tl.to(dot, {
      opacity: 0.70,
      scale: 1,
      duration: 0.35,
      ease: 'power2.out',
    }, 0.23);

    // --- PHASE 2 (0.53s - 1.13s): 'd' & 'n' rotation to 0, 'i' drops, dot to 1.0 ---
    tl.to(d, {
      opacity: 0.35,
      duration: 0.06,
    }, 0.53)
    .to(d, {
      opacity: 1,
      rotation: 0,
      duration: 0.52,
      ease: 'power2.out',
    }, 0.58);

    tl.to(n, {
      opacity: 0.30,
      duration: 0.06,
    }, 0.70)
    .to(n, {
      opacity: 1,
      rotation: 0,
      duration: 0.35,
      ease: 'power2.out',
    }, 0.75);

    tl.to(i, {
      opacity: 1,
      y: 0,
      duration: 0.28,
      ease: 'power2.out',
    }, 0.88);

    tl.to(dot, {
      opacity: 1,
      duration: 0.22,
    }, 0.82);

    // --- PHASE 3 (1.13s - 1.93s): 'e' & 'w' emerge at 180°, 'r' appears, 'e' flips upright ---
    tl.to(e, {
      opacity: 0.90,
      duration: 0.30,
      ease: 'power2.out',
    }, 1.13);

    tl.to(w, {
      opacity: 0.75,
      duration: 0.35,
      ease: 'power2.out',
    }, 1.38);

    tl.to(r, {
      opacity: 0.65,
      rotation: -12,
      x: -4,
      duration: 0.28,
      ease: 'power2.out',
    }, 1.62);

    tl.to(e, {
      rotation: 0,
      opacity: 1,
      duration: 0.30,
      ease: 'power2.inOut',
    }, 1.66);

    // --- PHASE 4 (1.93s - 2.53s): 'w' rotates clockwise to 0, 'r' straightens, 'c' glides in ---
    tl.to(w, {
      rotation: 0,
      opacity: 1,
      duration: 0.58,
      ease: 'power2.inOut',
    }, 1.93);

    tl.to(r, {
      rotation: 0,
      x: 0,
      opacity: 1,
      duration: 0.45,
      ease: 'power2.out',
    }, 1.96);

    tl.to(c, {
      opacity: 1,
      x: 0,
      duration: 0.55,
      ease: 'power2.out',
    }, 1.96);

    // --- PHASE 5 (2.53s - 3.45s): Confident, settled hold on complete wordmark ---
    tl.to(logoWrap, { duration: 0.90 });

    return () => {
      tl.kill();
      gsap.killTweensOf([loader, logoWrap, ...glyphRefs.current]);
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
          {GLYPHS.map((glyph, index) => (
            <g
              key={glyph.id}
              ref={(el) => (glyphRefs.current[index] = el)}
              id={`loader-glyph-${glyph.id}`}
            >
              <image
                href={glyph.src}
                xlinkHref={glyph.src}
                x={glyph.x}
                y={glyph.y}
                width={glyph.w}
                height={glyph.h}
              />
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
