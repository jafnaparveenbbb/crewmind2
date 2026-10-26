import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MGMT_TOPICS = [
  {
    id: 1,
    title: "Specialist Psychological Support.",
    lines: ["Specialist", "Psychological", "Support."]
  },
  {
    id: 2,
    title: "Guidance For Team Leaders.",
    lines: ["Guidance", "For Team", "Leaders."]
  },
  {
    id: 3,
    title: "Understanding Of Backstage Work.",
    lines: ["Understanding", "Of Backstage", "Work."]
  },
  {
    id: 4,
    title: "Support Across Production Settings.",
    lines: ["Support", "Across", "Production", "Settings."]
  },
  {
    id: 5,
    title: "Private Space For Crew Concerns.",
    lines: ["Private", "Space For", "Crew", "Concerns."]
  },
  {
    id: 6,
    title: "Access Between Productions.",
    lines: ["Access Between", "Productions."]
  }
];

const CARD_CONFIG = [
  { rot: -3.5, enterRot: -8, y: 10, mobRot: -1.4 },
  { rot: 2.0, enterRot: 7, y: -6, mobRot: 1.5 },
  { rot: -2.5, enterRot: -7, y: 8, mobRot: -1.2 },
  { rot: 2.2, enterRot: 8, y: -7, mobRot: 1.4 },
  { rot: -1.8, enterRot: -6, y: 6, mobRot: -1.3 },
  { rot: 1.2, enterRot: 6, y: -4, mobRot: 1.2 }
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
      // Measure after this section's mobile pin has added its spacer
      refreshPriority: -1,
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

    // Tablet (768px - 991px): Natural, responsive flow with individual card reveals
    mm.add("(min-width: 768px) and (max-width: 991px)", () => {
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
        const config = CARD_CONFIG[idx] || CARD_CONFIG[0];
        gsap.fromTo(
          slot,
          {
            opacity: 0,
            y: 30,
            rotation: config.mobRot * 2,
            scale: 0.96
          },
          {
            opacity: 1,
            y: 0,
            rotation: config.mobRot,
            scale: 1,
            duration: 0.6,
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

    // Mobile (< 768px): Pinned stage where the cards are dealt into a vertical fan,
    // each settling one title-band lower than the last so all six titles stay readable
    mm.add("(max-width: 767px)", () => {
      const cardSlots = stage.querySelectorAll('.mgmt-card-slot');
      const frame = frameRef.current;
      if (!cardSlots.length || !frame) return;

      const dealStepDist = 180; // scroll px between successive card deals
      const dealSpacing = 0.9; // timeline gap between deals (each deal lasts 1)
      const holdRatio = 0.3; // resting hold after the last card, as a fraction of the dealing

      // Fan step = tallest title band (card padding + wrapped title) plus a small gap
      const getFanStep = () => {
        let band = 0;
        cardSlots.forEach((slot) => {
          const title = slot.querySelector('.mgmt-card__title');
          if (title) band = Math.max(band, title.offsetTop + title.offsetHeight);
        });
        return Math.round(band + 12);
      };

      let fanStep = 0;
      const layoutFan = () => {
        fanStep = getFanStep();
        const cardH = Math.max(...Array.from(cardSlots, (slot) => slot.offsetHeight));
        stage.style.setProperty('--mgmt-fan-height', `${fanStep * (cardSlots.length - 1) + cardH}px`);
      };
      layoutFan();
      ScrollTrigger.addEventListener('refreshInit', layoutFan);

      cardSlots.forEach((slot, idx) => {
        gsap.set(slot, {
          position: "absolute",
          left: "50%",
          top: 0,
          xPercent: -50,
          yPercent: 0,
          zIndex: idx + 1
        });
      });

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" }
      });

      // Deal all six cards in sequence: rise, untilt, scale up and fade in onto the fan
      cardSlots.forEach((slot, idx) => {
        const config = CARD_CONFIG[idx] || CARD_CONFIG[0];
        tl.fromTo(
          slot,
          {
            opacity: 0,
            y: () => idx * fanStep + 110,
            rotation: config.enterRot,
            scale: 0.94
          },
          {
            opacity: 1,
            y: () => idx * fanStep,
            rotation: config.mobRot,
            scale: 1,
            duration: 1
          },
          idx * dealSpacing
        );
      });

      // Hold so the scrub catches up and the full fan settles before unpinning
      tl.to({}, { duration: tl.duration() * holdRatio });

      const pinDistance = Math.round(tl.duration() * dealStepDist / dealSpacing);

      const st = ScrollTrigger.create({
        id: "mgmt-mobile-pin",
        trigger: section,
        pin: frame,
        pinSpacing: true,
        start: "top top",
        end: () => `+=${pinDistance}`,
        scrub: 0.5,
        animation: tl,
        invalidateOnRefresh: true
      });

      // Heading rises in as the section arrives, before the deal begins
      const headerTween = header ? gsap.fromTo(
        header.children,
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      ) : null;

      return () => {
        ScrollTrigger.removeEventListener('refreshInit', layoutFan);
        if (st) st.kill();
        if (tl) tl.kill();
        if (headerTween) {
          headerTween.scrollTrigger?.kill();
          headerTween.kill();
          gsap.set(header.children, { clearProps: "opacity,transform" });
        }
        stage.style.removeProperty('--mgmt-fan-height');
        section.style.removeProperty('height');
        section.style.removeProperty('min-height');
        section.style.removeProperty('z-index');
        cardSlots.forEach((slot) => {
          gsap.set(slot, { clearProps: "all" });
        });
      };
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
              <span className="mgmt-title__line-2">PARTNER WITH US</span>
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
                  <h3 className="mgmt-card__title">
                    {topic.lines.map((line, lIdx) => (
                      <span key={lIdx} className="mgmt-card__line">
                        {line}
                      </span>
                    ))}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
