import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from '../components/MagneticButton';

gsap.registerPlugin(ScrollTrigger);
if (typeof window !== 'undefined') {
  window.ScrollTrigger = ScrollTrigger;
  window.gsap = gsap;
}

const DIFFERENCE_POINTS = [
  {
    id: 1,
    title: "Within Your Working Environment"
  },
  {
    id: 2,
    title: "Around Production Demands"
  },
  {
    id: 3,
    title: "Space For Private Conversations"
  },
  {
    id: 4,
    title: "Early Support, Before Concerns Escalate"
  }
];

export default function WhatMakesUsDifferent() {
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const leftRef = useRef(null);
  const gridRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    const left = leftRef.current;
    const grid = gridRef.current;
    if (!section || !left || !grid || !sticky) return;

    const ctx = gsap.context(() => {
      // 1. Theme trigger: Keep theme white
      ScrollTrigger.create({
        trigger: section,
        start: "top 60%",
        end: "bottom 40%",
        // Measure after this section's mobile pin has added its spacer
        refreshPriority: -1,
        onEnter: () => document.body.setAttribute('theme', 'white'),
        onEnterBack: () => document.body.setAttribute('theme', 'white'),
        // Scrolling back up hands over to the navy Management section above
        onLeaveBack: () => document.body.setAttribute('theme', 'navy')
      });

      // 2. Respect reduced-motion preferences
      const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      // 3. Responsive ScrollTrigger using GSAP matchMedia
      const mm = gsap.matchMedia();

      // Desktop & Tablet (>= 768px): Narrative entrance & grid reveal
      mm.add("(min-width: 768px)", () => {
        const masterTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none none"
          }
        });

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
      });

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

      // Mobile (< 768px): Pinned section with horizontal circle animation driven by vertical scroll
      mm.add("(max-width: 767px)", () => {
        // Guarantee immediate, robust visibility on mobile
        gsap.set([left, grid], { opacity: 1, visibility: "visible" });

        // Tag, heading, paragraph and button stagger in as the section arrives (as on desktop)
        const leftEntrance = gsap.fromTo(
          left.children,
          { opacity: 0, y: 26, visibility: "visible" },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );

        const getTravelDistance = () => {
          const cardCount = grid.children.length;
          if (cardCount > 0) {
            const lastCard = grid.children[cardCount - 1];
            return Math.max(0, Math.round((lastCard.offsetLeft + lastCard.offsetWidth + 24) - window.innerWidth));
          }
          return Math.max(0, grid.scrollWidth - window.innerWidth + 24);
        };

        // Resting hold after the last circle, as a fraction of the carousel's scroll length
        const holdRatio = 0.3;

        const getPinDistance = () => {
          return Math.round(getTravelDistance() * 1.4 * (1 + holdRatio));
        };

        const tl = gsap.timeline({
          defaults: { ease: "none" }
        });

        // Smooth horizontal translation revealing circle 1 -> 2 -> 3 -> 4
        tl.to(grid, {
          x: () => -getTravelDistance(),
          duration: 1,
          force3D: true
        });

        // Hold so the scrub catches up and the last circle settles before unpinning
        tl.to({}, { duration: holdRatio });

        const st = ScrollTrigger.create({
          id: "diff-mobile-pin",
          trigger: section,
          pin: sticky,
          pinSpacing: true,
          start: "top top",
          end: () => `+=${getPinDistance()}`,
          scrub: 0.5,
          animation: tl,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Carousel progress (excludes the end hold) so circles activate at the same positions
            const p = Math.min(1, self.progress * (1 + holdRatio));
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
          onLeave: () => setActiveIndex(3)
        });

        return () => {
          if (st) st.kill();
          if (tl) tl.kill();
          section.style.removeProperty('height');
          section.style.removeProperty('min-height');
          section.style.removeProperty('z-index');
          gsap.set(grid, { clearProps: "transform" });
          leftEntrance.scrollTrigger?.kill();
          leftEntrance.kill();
          gsap.set(left.children, { clearProps: "opacity,transform" });
        };
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
      <div ref={stickyRef} className="ovals-diff__sticky">
        <div className="container">
          <div className="ovals-diff__layout">

            {/* Left Column: Heading & CTA */}
            <div ref={leftRef} className="ovals-diff__left">
              <div className="ovals-diff__tag">
                <span className="diff__dot"></span>
                <span className="f-14 is--btn caps">WHAT MAKES US DIFFERENT</span>
              </div>

              <h2 className="ovals-diff__heading">
                SUPPORT THAT FITS<br />THE WAY YOU WORK.
              </h2>

              <p className="ovals-diff__subpara">
                Support needs to fit around rehearsals, travel and show days. We bring care closer to the team, creating opportunities to talk before concerns become harder to manage.
              </p>

              <div className="ovals-diff__btn-wrap">
                <MagneticButton buttonStyle="black" href="#contact">
                  LET’S TALK
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
