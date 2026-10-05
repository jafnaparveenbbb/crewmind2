import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef(null);
  const labelRef = useRef(null);
  const headingLine1Ref = useRef(null);
  const headingLine2Ref = useRef(null);
  const wordsWrapRef = useRef(null);
  const pillarsGridRef = useRef(null);

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

      // 2. Section Entry: Label & Heading Masked Rise-Up Animation
      if (labelRef.current) {
        gsap.fromTo(labelRef.current,
          { opacity: 0, y: -20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 72%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      const headingLines = [headingLine1Ref.current, headingLine2Ref.current].filter(Boolean);
      if (headingLines.length > 0) {
        gsap.fromTo(headingLines,
          {
            yPercent: 120,
            opacity: 0
          },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.1,
            stagger: 0.15,
            ease: "power4.out",
            scrollTrigger: {
              trigger: section,
              start: "top 70%",
              toggleActions: "play none none reverse"
            }
          }
        );
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

      // 4. Subtle entrance animation for the three bubbles (replays every time user scrolls into section)
      const bubbleItems = section.querySelectorAll('.about-pillar-item');
      const pillarsGrid = pillarsGridRef.current || section.querySelector('.about__pillars-grid');

      if (bubbleItems.length > 0 && pillarsGrid) {
        const prefersReducedMotion = typeof window !== 'undefined' &&
          window.matchMedia &&
          window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion) {
          gsap.set(bubbleItems, { opacity: 1, y: 0, clearProps: "transform" });
        } else {
          // Set initial hidden starting state
          gsap.set(bubbleItems, { opacity: 0, y: 12 });

          let bubbleTween = null;

          const resetBubbles = () => {
            if (bubbleTween) {
              bubbleTween.kill();
              bubbleTween = null;
            }
            gsap.set(bubbleItems, { opacity: 0, y: 12 });
          };

          const playBubbleEntrance = () => {
            if (bubbleTween) {
              bubbleTween.kill();
              bubbleTween = null;
            }
            // Ensure the bubbles reset to their hidden starting state before each replay
            gsap.set(bubbleItems, { opacity: 0, y: 12 });

            bubbleTween = gsap.to(bubbleItems, {
              opacity: 1,
              y: 0,
              duration: 1.2,
              stagger: 0.2,
              ease: "power2.out",
              onComplete: () => {
                gsap.set(bubbleItems, { clearProps: "transform" });
                bubbleTween = null;
              }
            });
          };

          const st = ScrollTrigger.create({
            trigger: pillarsGrid,
            start: "top 85%",
            end: "bottom top",
            onEnter: () => playBubbleEntrance(),
            onEnterBack: () => playBubbleEntrance(),
            onLeave: () => resetBubbles(),
            onLeaveBack: () => resetBubbles()
          });

          if (st.isActive) {
            playBubbleEntrance();
          }
        }
      }

    }, section);

    return () => {
      const bubbleItems = section.querySelectorAll('.about-pillar-item');
      if (bubbleItems.length > 0) {
        gsap.killTweensOf(bubbleItems);
      }
      ctx.revert();
    };
  }, []);

  const pillarsData = [
    {
      title: <>People<br />First</>
    },
    {
      title: <>Care On<br />Tour</>
    },
    {
      title: <>Support<br />Early</>
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
            <div ref={labelRef} className="about__label">
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

        {/* Middle: 3 Static Pillar Bubbles with Subtle Entrance */}
        <div ref={pillarsGridRef} className="about__pillars-grid">
          {pillarsData.map((pillar, idx) => (
            <div
              key={idx}
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
