import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef(null);
  const headingLine1Ref = useRef(null);
  const headingLine2Ref = useRef(null);
  const wordsWrapRef = useRef(null);
  const pillarsRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);

  const paragraphText = "Crewmind is a women-led UAE initiative focused on advancing psychological wellbeing within the live entertainment industry. In strategic collaboration with MHP India, we combine deep backstage understanding with certified psychological support tailored for touring and high-pressure live-event environments.";

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // 1. Theme trigger for white background
      ScrollTrigger.create({
        trigger: section,
        start: "top 75%",
        end: "bottom 25%",
        onEnter: () => document.body.setAttribute('theme', 'white'),
        onEnterBack: () => document.body.setAttribute('theme', 'white'),
        onLeaveBack: () => document.body.setAttribute('theme', 'navy')
      });

      // 2. Heading Masked Rise-Up Animation
      const headingLines = [headingLine1Ref.current, headingLine2Ref.current].filter(Boolean);
      if (headingLines.length > 0) {
        gsap.from(headingLines, {
          yPercent: 120,
          opacity: 0,
          duration: 1.1,
          stagger: 0.15,
          ease: "power4.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        });
      }

      // 3. Kinetic Word-by-Word Scroll Scrubbing for Paragraph
      if (wordsWrapRef.current) {
        const words = wordsWrapRef.current.querySelectorAll('.about__word');
        gsap.fromTo(words,
          {
            opacity: 0.15,
            y: 4
          },
          {
            opacity: 1,
            y: 0,
            stagger: 0.05,
            ease: "none",
            scrollTrigger: {
              trigger: wordsWrapRef.current,
              start: "top 78%",
              end: "bottom 50%",
              scrub: 0.8
            }
          }
        );
      }

      // 4. Smooth Entrance & Align into Position with gsap.matchMedia
      const cards = [card1Ref.current, card2Ref.current, card3Ref.current].filter(Boolean);
      if (cards.length > 0) {
        const mm = gsap.matchMedia();

        // Desktop (>= 768px): Slide in from the right
        mm.add("(min-width: 768px)", () => {
          gsap.fromTo(cards,
            {
              x: (idx) => (idx + 1) * 160 + 120,
              opacity: 0,
              scale: 0.92,
              rotate: (idx) => 6 - idx * 2
            },
            {
              x: 0,
              opacity: 1,
              scale: 1,
              rotate: 0,
              duration: 1.25,
              stagger: 0.14,
              ease: "power3.out",
              scrollTrigger: {
                trigger: pillarsRef.current,
                start: "top 82%",
                toggleActions: "play none none reverse"
              }
            }
          );
        });

        // Mobile (< 768px): Clean rise up within viewport
        mm.add("(max-width: 767px)", () => {
          gsap.fromTo(cards,
            {
              y: 20,
              opacity: 0,
              scale: 0.88,
              rotate: 0
            },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              rotate: 0,
              duration: 0.8,
              stagger: 0.1,
              ease: "back.out(1.5)",
              scrollTrigger: {
                trigger: pillarsRef.current,
                start: "top 92%",
                toggleActions: "play none none reverse"
              }
            }
          );
        });
      }

    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  const pillarsData = [
    {
      ref: card1Ref,
      title: "Women-Led UAE Initiative"
    },
    {
      ref: card2Ref,
      title: "MHP India Alliance"
    },
    {
      ref: card3Ref,
      title: "Built For The Live Stage"
    }
  ];

  return (
    <section
      ref={sectionRef}
      className="section about-section"
      this-theme="white"
      id="about"
    >
      <div className="container">

        {/* Top 2-Column Header Grid */}
        <div className="about__grid">
          <div className="about__left">
            <div className="about__label">
              <span className="about__dot"></span>
              <span className="f-14 is--btn caps">MEET CREWMIND</span>
            </div>
            <h2 className="about__heading">
              <span className="about__heading-line">
                <span ref={headingLine1Ref} className="about__heading-inner">
                  WE'RE NOT A CLINIC,
                </span>
              </span>
              <span className="about__heading-line">
                <span ref={headingLine2Ref} className="about__heading-inner">
                  NOT A HELPLINE.
                </span>
              </span>
            </h2>
          </div>

          <div className="about__right">
            <p ref={wordsWrapRef} className="about__paragraph">
              {paragraphText.split(" ").map((word, idx) => (
                <span key={idx} className="about__word">
                  {word}
                </span>
              ))}
            </p>
          </div>
        </div>

        {/* Middle: 3 Bubbles - Single Circle with Blue Border & Centered Topic Only */}
        <div ref={pillarsRef} className="about__pillars-grid">
          {pillarsData.map((pillar, idx) => (
            <div
              key={idx}
              ref={pillar.ref}
              className={`about-pillar-item is--pillar-${idx + 1}`}
            >
              <div className="about-pillar-card">
                <h3 className="about-pillar-card__title">{pillar.title}</h3>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
