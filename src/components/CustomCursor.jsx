import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Use GPU-accelerated gsap.quickTo for ultra-smooth 120 FPS cursor tracking
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.12, ease: "power2.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.12, ease: "power2.out" });

    const onMouseMove = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const onMouseEnterInteractive = () => {
      cursor.classList.add('hovering');
    };

    const onMouseLeaveInteractive = () => {
      cursor.classList.remove('hovering');
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, .hero__circle, .cards__item, .mgmt-card, .zero-g-card, .significo-egg-card, .diff-core-circle');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', onMouseEnterInteractive, { passive: true });
      el.addEventListener('mouseleave', onMouseLeaveInteractive, { passive: true });
    });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', onMouseEnterInteractive);
        el.removeEventListener('mouseleave', onMouseLeaveInteractive);
      });
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor" />;
}
