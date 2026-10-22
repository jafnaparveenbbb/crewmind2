import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MGMT_TOPICS = [
  {
    id: 1,
    title: "Specialist Psychological Support."
  },
  {
    id: 2,
    title: "Guidance For Team Leaders."
  },
  {
    id: 3,
    title: "Understanding Of Backstage Work."
  },
  {
    id: 4,
    title: "Support Across Production Settings."
  },
  {
    id: 5,
    title: "Private Space For Crew Concerns."
  },
  {
    id: 6,
    title: "Access Between Productions."
  }
];

const CARD_CONFIG = [
  { rot: -4.2, enterRot: -9, y: 8, mobRot: -1.6 },
  { rot: 2.6, enterRot: 8, y: -6, mobRot: 1.8 },
  { rot: -3.2, enterRot: -8, y: 10, mobRot: -1.4 },
  { rot: 3.4, enterRot: 9, y: -8, mobRot: 1.7 },
  { rot: -2.4, enterRot: -7, y: 6, mobRot: -1.5 },
  { rot: 2.0, enterRot: 7, y: -4, mobRot: 1.4 }
];

export default function ManagementPartners() {
  const sectionRef = useRef(null);
  const frameRef = useRef(null);
  const headerRef = useRef(null);
  const stageRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return;

    // 1. Theme trigger for navy background
    const themeTrigger = ScrollTrigger.create({
      trigger: section,
      start: "top 60%",
      end: "bottom 40%",
      onEnter: () => document.body.setAttribute('theme', 'navy'),
      onEnterBack: () => document.body.setAttribute('theme', 'navy'),
      onLeave: () => document.body.setAttribute('theme', 'white'),
      onLeaveBack: () => document.body.setAttribute('theme', 'white')
    });

    // 2. Motion preference check
    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return () => {
        themeTrigger.kill();
      };
    }

    // 3. Responsive GSAP Scroll-Linked Animation via matchMedia
    const mm = gsap.matchMedia(section);

    // Desktop (>= 992px): Fixed background with scroll-driven fanned stack
    mm.add("(min-width: 992px)", () => {
      const cardSlots = stage.querySelectorAll('.mgmt-card-slot');
      if (!cardSlots.length) return;

      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          invalidateOnRefresh: true
        }
      });

      if (header) {
        masterTl.fromTo(
          header.children,
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.06,
            ease: "power2.out"
          },
          0
        );
      }

      cardSlots.forEach((slot, idx) => {
        const config = CARD_CONFIG[idx] || CARD_CONFIG[0];
        masterTl.fromTo(
          slot,
          {
            opacity: 0,
            y: 150,
            rotation: config.enterRot,
            scale: 0.92
          },
          {
            opacity: 1,
            y: config.y,
            rotation: config.rot,
            scale: 1,
            duration: 0.8,
            ease: "power2.out"
          },
          idx === 0 ? 0.35 : ">-0.45"
        );
      });

      // Resting hold so the fully stacked deck can be viewed before unsticking
      masterTl.to({}, { duration: 0.5 });
    });

    // Mobile & Tablet (< 992px): Natural, responsive flow with individual card reveals (zero empty scroll void)
    mm.add("(max-width: 991px)", () => {
      const cardSlots = stage.querySelectorAll('.mgmt-card-slot');
      if (!cardSlots.length) return;

      if (header) {
        gsap.fromTo(
          header.children,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: header,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      cardSlots.forEach((slot, idx) => {
        gsap.fromTo(
          slot,
          {
            opacity: 0,
            y: 24,
            scale: 0.98
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.55,
            ease: "power2.out",
            scrollTrigger: {
              trigger: slot,
              start: "top 92%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    });

    return () => {
      themeTrigger.kill();
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section mgmt-section"
      this-theme="navy"
      id="management-teams"
    >
      {/* Sticky Frame: Stays fixed at top: 0 while scrolling through .mgmt-section */}
      <div ref={frameRef} className="mgmt-sticky-frame">
        {/* Dedicated Background Layer (Stationary #00063D) */}
        <div className="mgmt-bg-layer" />

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

          {/* Cinematic Layered Stack Stage */}
          <div ref={stageRef} className="mgmt-stack-stage">
            {MGMT_TOPICS.map((topic, idx) => (
              <div
                key={topic.id}
                className={`mgmt-card-slot mgmt-card-slot--${idx}`}
                data-index={idx}
                style={{
                  '--card-idx': idx,
                  zIndex: idx + 1
                }}
              >
                <div className="mgmt-card">
                  <div className="mgmt-card__inner">
                    <div className="mgmt-card__top">
                      <span className="mgmt-card__num">{String(idx + 1).padStart(2, '0')}.</span>
                      <span className="mgmt-card__orb" />
                    </div>
                    <div className="mgmt-card__body">
                      <h3 className="mgmt-card__title">
                        {topic.title}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
