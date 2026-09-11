import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CHARS = ['c', 'r', 'e', 'w', 'm', 'i', 'n', 'd', '.'];

export default function PageLoader({ onComplete }) {
  const loaderRef = useRef(null);
  const wordRef = useRef(null);
  const charFillRefs = useRef([]);

  useEffect(() => {
    // Force scroll to top at initial mount
    window.scrollTo(0, 0);

    // Filter valid element references
    const targets = charFillRefs.current.filter(Boolean);

    // Initial state: all letters 100% clipped (unfilled)
    gsap.set(targets, {
      clipPath: 'inset(0 100% 0 0)'
    });

    // Timeline for letter-by-letter water filling animation (c -> r -> e -> w -> m -> i -> n -> d -> .)
    const tl = gsap.timeline({
      delay: 0.15,
      onComplete: () => {
        // Ensure all characters including the trailing dot are 100% full
        gsap.set(targets, { clipPath: 'inset(0 0% 0 0)' });

        // Dissolve text and container into hero section
        gsap.to(wordRef.current, {
          opacity: 0,
          scale: 0.98,
          duration: 0.45,
          delay: 0.1,
          ease: "power2.inOut"
        });

        gsap.to(loaderRef.current, {
          opacity: 0,
          duration: 0.6,
          delay: 0.25,
          ease: "power3.inOut",
          onComplete: () => {
            if (onComplete) onComplete();
          }
        });
      }
    });

    // Waterfilling sequence across each letter sequentially until the dot
    tl.to(targets, {
      clipPath: 'inset(0 0% 0 0)',
      duration: 0.38,
      ease: 'power1.inOut',
      stagger: 0.14
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div ref={loaderRef} className="page-loader">
      <div ref={wordRef} className="page-loader__word">
        {CHARS.map((char, index) => (
          <span key={index} className="loader-char">
            {/* Ghost base character */}
            <span className="loader-char__base">{char}</span>

            {/* Water filling character layer */}
            <span
              ref={(el) => (charFillRefs.current[index] = el)}
              className="loader-char__fill"
            >
              {char}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
