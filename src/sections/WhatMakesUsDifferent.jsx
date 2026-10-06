import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from '../components/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

const DIFFERENCE_POINTS = [
  {
    id: 1,
    title: "Present During Tours & Productions"
  },
  {
    id: 2,
    title: "Available In High-Pressure Moments"
  },
  {
    id: 3,
    title: "Embedded Within Team Environment"
  },
  {
    id: 4,
    title: "Focused On Prevention First"
  }
];

export default function WhatMakesUsDifferent() {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const gridRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const left = leftRef.current;
    const grid = gridRef.current;
    if (!section || !left || !grid) return;

    const ctx = gsap.context(() => {
      // 1. Theme trigger: Keep theme white
      ScrollTrigger.create({
        trigger: section,
        start: "top 60%",
        end: "bottom 40%",
        onEnter: () => document.body.setAttribute('theme', 'white'),
        onEnterBack: () => document.body.setAttribute('theme', 'white'),
        onLeaveBack: () => document.body.setAttribute('theme', 'white')
      });

      // 2. Respect reduced-motion preferences
      const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      // 3. Subtle one-shot entrance reveal on scroll into view
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      });

      // Left narrative entrance
      masterTl.fromTo(
        left.children,
        { opacity: 0, y: 26 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.08,
          ease: "power2.out"
        }
      );

      // Bubbles grid entrance
      masterTl.fromTo(
        grid,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: "power2.out",
          clearProps: "transform,opacity"
        },
        "-=0.3"
      );

      // 4. Responsive ScrollTrigger using GSAP matchMedia
      const mm = gsap.matchMedia();

      // Desktop pinning & scroll-controlled sequential progression (min-width: 992px)
      mm.add("(min-width: 992px)", () => {
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onUpdate: (self) => {
            const p = self.progress;
            let idx = 0;
            if (p >= 0.75) {
              idx = 3;
            } else if (p >= 0.50) {
              idx = 2;
            } else if (p >= 0.25) {
              idx = 1;
            } else {
              idx = 0;
            }
            setActiveIndex((prev) => (prev !== idx ? idx : prev));
          },
          onLeaveBack: () => setActiveIndex(0),
          onLeave: () => setActiveIndex(3),
          onEnterBack: () => setActiveIndex(3)
        });
      });

      // Tablet (768px - 991px): 2x2 grid with scroll activate
      mm.add("(min-width: 768px) and (max-width: 991px)", () => {
        const cards = grid.querySelectorAll('.diff-principle-card');
        cards.forEach((card, idx) => {
          ScrollTrigger.create({
            trigger: card,
            start: "top 70%",
            end: "bottom 30%",
            onEnter: () => setActiveIndex(idx),
            onEnterBack: () => setActiveIndex(idx)
          });
        });
      });

      // Mobile (< 768px): Native responsive horizontal carousel without height/pinning traps
      mm.add("(max-width: 767px)", () => {
        gsap.set(grid, { clearProps: "all", x: 0 });
      });

    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section ovals-diff-section"
      this-theme="white"
      id="what-makes-us-different"
    >
      <div className="ovals-diff__sticky">
        <div className="container">
          <div className="ovals-diff__layout">

            {/* Left Column: Heading & CTA */}
            <div ref={leftRef} className="ovals-diff__left">
              <div className="ovals-diff__tag">
                <span className="diff__dot"></span>
                <span className="f-14 is--btn caps">WHAT MAKES US DIFFERENT</span>
              </div>

              <h2 className="ovals-diff__heading">
                WE WORK BEFORE<br />SOMEONE ASKS FOR HELP.
              </h2>

              <p className="ovals-diff__subpara">
                We operate proactively within live entertainment environments to protect crew wellbeing, reduce burnout, and keep productions thriving.
              </p>

              <div className="ovals-diff__btn-wrap">
                <MagneticButton buttonStyle="black" href="#contact">
                  LET'S PARTNER
                </MagneticButton>
              </div>
            </div>

            {/* Right Column: 2x2 Circular Bubbles Grid */}
            <div ref={gridRef} className="ovals-diff__grid diff-principles-grid">
              {DIFFERENCE_POINTS.map((item, idx) => (
                <div
                  key={item.id}
                  className={`diff-principle-card diff-core-circle ${activeIndex === idx ? 'active' : ''}`}
                  onClick={() => setActiveIndex(idx)}
                  onMouseEnter={() => setActiveIndex(idx)}
                >
                  <div className="diff-principle-card__inner">
                    <h3 className="diff-principle-card__title">
                      {item.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
