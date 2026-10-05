import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MGMT_TOPICS = [
  {
    id: 1,
    title: "Improved Crew Retention."
  },
  {
    id: 2,
    title: "Better Communication."
  },
  {
    id: 3,
    title: "More Resilient Teams."
  },
  {
    id: 4,
    title: "Reduced Operational Disruption."
  },
  {
    id: 5,
    title: "Stronger Artist Wellbeing."
  },
  {
    id: 6,
    title: "Healthier Production Environments."
  }
];

export default function ManagementPartners() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const grid = gridRef.current;
    if (!section || !grid) return;

    const ctx = gsap.context(() => {
      // 1. Theme trigger for clean white background
      ScrollTrigger.create({
        trigger: section,
        start: "top 60%",
        end: "bottom 40%",
        onEnter: () => document.body.setAttribute('theme', 'navy'),
        onEnterBack: () => document.body.setAttribute('theme', 'navy'),
        onLeave: () => document.body.setAttribute('theme', 'white'),
        onLeaveBack: () => document.body.setAttribute('theme', 'white')
      });

      // 2. Subtle Entrance Reveal (Non-looping, respects reduced-motion)
      const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      const cardWraps = grid.querySelectorAll('.zero-g-card-wrap');

      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      });

      // Header entrance
      if (header) {
        masterTl.fromTo(
          header.children,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.08,
            ease: "power2.out"
          }
        );
      }

      // Subtle, clean card stagger entrance (runs once on scroll into view, no looping)
      masterTl.fromTo(
        cardWraps,
        {
          opacity: 0,
          y: 28
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.07,
          ease: "power2.out"
        },
        "-=0.3"
      );

    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section mgmt-section"
      this-theme="navy"
      id="management-teams"
    >
      <div className="container">
        {/* Header: Title with "PARTNER WITH US" on a single line */}
        <div ref={headerRef} className="mgmt-header">
          <h2 className="mgmt-title">
            <span>WHY MANAGEMENT TEAMS</span>
            <span className="mgmt-title__line-2">
              PARTNER <span className="mgmt-title__highlight">WITH US</span>
            </span>
          </h2>
        </div>

        {/* 6 Aligned Topics in a Clean Symmetrical 3x2 Grid (Static, Easy to Scan) */}
        <div ref={gridRef} className="zero-g-grid">
          {MGMT_TOPICS.map((topic, idx) => (
            <div key={topic.id} className="zero-g-card-wrap">
              <div
                className="zero-g-card"
                data-index={idx}
              >
                <div className="zero-g-card__inner">
                  <span className="zero-g-card__orb" />
                  <h3 className="zero-g-card__title">
                    {topic.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
