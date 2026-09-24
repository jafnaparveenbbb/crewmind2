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

      // 2. Master Entrance & Reverse Timeline (Bi-directional on scroll)
      const cardWraps = grid.querySelectorAll('.zero-g-card-wrap');
      const allWords = grid.querySelectorAll('.zero-g-word');

      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      });

      // Header text entrance
      if (header) {
        masterTl.fromTo(
          header.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.12,
            ease: "power3.out"
          }
        );
      }

      // Card wrappers entrance (handles entrance & reverse cleanly without resetting inner tilt)
      masterTl.fromTo(
        cardWraps,
        {
          opacity: 0,
          y: 60,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          stagger: 0.07,
          ease: "elastic.out(1.1, 0.45)"
        },
        "-=0.4"
      );

      // Individual bouncy words entrance
      masterTl.fromTo(
        allWords,
        {
          opacity: 0,
          y: 22,
          scale: 0.85
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.02,
          ease: "back.out(2)"
        },
        "-=0.7"
      );

      // 3. Continuous Zero-Gravity Ambient Floating & Tilt on INNER cards
      const innerCards = grid.querySelectorAll('.zero-g-card');
      innerCards.forEach((card, i) => {
        const floatDelay = i * 0.15;
        const floatDuration = 2.4 + (i % 3) * 0.4;
        const baseTilt = i % 2 === 0 ? -2.5 : 2.5;
        const targetTilt = i % 2 === 0 ? 2.0 : -2.0;

        // Set initial zero-gravity natural tilt
        gsap.set(card, { rotateZ: baseTilt });

        // Continuous weightless float & tilt oscillation
        gsap.to(card, {
          y: 8,
          rotateZ: targetTilt,
          duration: floatDuration,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: floatDelay
        });
      });

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

        {/* 6 Aligned Topics in a Neat Symmetrical 3x2 Grid (Zero Gravity Bouncy Words) */}
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
                    {topic.title.split(" ").map((word, wIdx) => (
                      <span key={wIdx} className="zero-g-word">
                        {word}
                        <span className="zero-g-space">&nbsp;</span>
                      </span>
                    ))}
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
