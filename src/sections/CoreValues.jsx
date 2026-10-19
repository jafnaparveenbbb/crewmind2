import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CoreValues() {
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const leftRef = useRef(null);
  const streamRef = useRef(null);
  const col1Ref = useRef(null);
  const col2Ref = useRef(null);
  const mobileTrackRef = useRef(null);

  const coreCards = [
    {
      title: "DEMANDING SCHEDULES",
      desc: "Late finishes and changing call times leave limited space for rest and regular appointments.",
      cardClass: "is--card-1"
    },
    {
      title: "LIFE ON THE ROAD",
      desc: "Frequent travel separates crews from familiar routines, relationships and everyday sources of support.",
      cardClass: "is--card-2"
    },
    {
      title: "PRESSURE TO KEEP GOING",
      desc: "Show-critical responsibilities can make people hesitate to raise concerns or ask for help.",
      cardClass: "is--card-3"
    },
    {
      title: "GAPS BETWEEN PROJECTS",
      desc: "Teams disperse after each production, making consistent access to support harder to maintain.",
      cardClass: "is--card-4"
    }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const col1 = col1Ref.current;
    const col2 = col2Ref.current;
    const stream = streamRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // 1. Theme trigger for white
      ScrollTrigger.create({
        trigger: section,
        start: "top 50%",
        end: "bottom 50%",
        onEnter: () => document.body.setAttribute('theme', 'white'),
        onEnterBack: () => document.body.setAttribute('theme', 'white'),
        onLeaveBack: () => document.body.setAttribute('theme', 'white')
      });

      const mm = gsap.matchMedia();

      // DESKTOP (>= 768px): Counter-Parallax Stream Scroll Animation
      mm.add("(min-width: 768px)", () => {
        if (!col1 || !col2 || !stream) return;
        gsap.set(stream, { clearProps: "x,transform" });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.8
          }
        });

        // Column 1 glides upwards as you scroll
        tl.fromTo(col1,
          { yPercent: 18 },
          { yPercent: -42, ease: "none" },
          0
        );

        // Column 2 glides downwards as you scroll
        tl.fromTo(col2,
          { yPercent: -35 },
          { yPercent: 20, ease: "none" },
          0
        );

        if (leftRef.current) {
          gsap.from(leftRef.current.children, {
            opacity: 0,
            y: 30,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 70%",
              toggleActions: "play none none reverse"
            }
          });
        }
      });

      // MOBILE (< 768px): Pinned section with horizontal cards track driven by vertical scroll
      mm.add("(max-width: 767px)", () => {
        const mobileTrack = mobileTrackRef.current;
        const sticky = stickyRef.current;
        if (!mobileTrack || !sticky) return;

        gsap.set(mobileTrack, { clearProps: "all", x: 0 });

        const getTravelDistance = () => {
          return Math.max(0, mobileTrack.scrollWidth - window.innerWidth + 40);
        };

        const horizTween = gsap.to(mobileTrack, {
          x: () => -getTravelDistance(),
          ease: "none",
          force3D: true
        });

        const st = ScrollTrigger.create({
          id: "core-values-mobile-pin",
          trigger: section,
          pin: sticky,
          start: "top top",
          end: () => `+=${Math.max(window.innerHeight * 1.5, getTravelDistance() * 1.6)}`,
          scrub: 0.5,
          animation: horizTween,
          invalidateOnRefresh: true
        });

        let headingTween = null;
        if (leftRef.current) {
          headingTween = gsap.fromTo(
            leftRef.current.children,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.65,
              stagger: 0.08,
              ease: "power2.out",
              scrollTrigger: {
                trigger: section,
                start: "top 85%",
                toggleActions: "play none none none"
              }
            }
          );
        }

        return () => {
          if (st) st.kill();
          if (horizTween) horizTween.kill();
          if (headingTween) headingTween.kill();
          gsap.set(mobileTrack, { clearProps: "transform" });
          if (leftRef.current) {
            gsap.set(leftRef.current.children, { clearProps: "opacity,transform" });
          }
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
      className="section crewmind-about-stats"
      this-theme="white"
      id="industry-changing"
    >
      <div ref={stickyRef} className="crewmind-about-stats__sticky">
        <div className="container">
          <div className="crewmind-about-stats__layout">

            {/* Left Side: Tag, Heading & Paragraph */}
            <div ref={leftRef} className="crewmind-about-stats__left">
              <div className="core-values__tag">
                <span className="core-values__dot"></span>
                <span className="f-14 is--btn caps">A Culture Shift</span>
              </div>

              <h2 className="core-values__heading">
                THE INDUSTRY<br />IS CHANGING
              </h2>

              <p className="core-values__subparagraph">
                Long hours, frequent travel and project-based work can make psychological support difficult to access. Addressing these working realities means considering how people find help, both during a production and between engagements.
              </p>
            </div>

            {/* Right Side: Stadium Stream */}
            <div className="crewmind-about-stats__right">
              {/* Desktop Columns Stream (>= 768px) */}
              <div ref={streamRef} className="crewmind-about-stats__stream crewmind-desktop-stream">

                {/* Column 1 (Left Stream) */}
                <div ref={col1Ref} className="crewmind-about-stats__col is--col-1">
                  {/* Card 1: Better Crew Retention */}
                  <div className="crewmind-egg-card is--card-1">
                    <div className="crewmind-egg-card__content">
                      <h3 className="capsule-topic-heading">{coreCards[0].title}</h3>
                      <p className="capsule-topic-desc">{coreCards[0].desc}</p>
                    </div>
                  </div>

                  {/* Card 3: Operational Stability */}
                  <div className="crewmind-egg-card is--card-3">
                    <div className="crewmind-egg-card__content">
                      <h3 className="capsule-topic-heading">{coreCards[2].title}</h3>
                      <p className="capsule-topic-desc">{coreCards[2].desc}</p>
                    </div>
                  </div>
                </div>

                {/* Column 2 (Right Stream) */}
                <div ref={col2Ref} className="crewmind-about-stats__col is--col-2">
                  {/* Card 2: Stronger Team Resilience */}
                  <div className="crewmind-egg-card is--card-2">
                    <div className="crewmind-egg-card__content">
                      <h3 className="capsule-topic-heading">{coreCards[1].title}</h3>
                      <p className="capsule-topic-desc">{coreCards[1].desc}</p>
                    </div>
                  </div>

                  {/* Card 4: Reduced Burnout Risk */}
                  <div className="crewmind-egg-card is--card-4">
                    <div className="crewmind-egg-card__content">
                      <h3 className="capsule-topic-heading">{coreCards[3].title}</h3>
                      <p className="capsule-topic-desc">{coreCards[3].desc}</p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Mobile Stream (Single flat horizontal track matching HorizontalStats) */}
              <div ref={mobileTrackRef} className="crewmind-about-stats__mobile-track">
                {coreCards.map((card, idx) => (
                  <div key={idx} className={`crewmind-egg-card ${card.cardClass}`}>
                    <div className="crewmind-egg-card__content">
                      <h3 className="capsule-topic-heading">{card.title}</h3>
                      <p className="capsule-topic-desc">{card.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
