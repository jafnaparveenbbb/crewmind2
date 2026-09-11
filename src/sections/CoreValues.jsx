import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, ShieldCheck, Workflow, BatteryCharging } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function CoreValues() {
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const leftRef = useRef(null);
  const streamRef = useRef(null);
  const col1Ref = useRef(null);
  const col2Ref = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const col1 = col1Ref.current;
    const col2 = col2Ref.current;
    const stream = streamRef.current;
    if (!section || !col1 || !col2 || !stream) return;

    const ctx = gsap.context(() => {
      // Theme trigger for light-purple
      ScrollTrigger.create({
        trigger: section,
        start: "top 50%",
        end: "bottom 50%",
        onEnter: () => document.body.setAttribute('theme', 'light-purple'),
        onEnterBack: () => document.body.setAttribute('theme', 'light-purple'),
        onLeaveBack: () => document.body.setAttribute('theme', 'white')
      });

      const mm = gsap.matchMedia();

      // DESKTOP (>= 768px): Counter-Parallax Stream
      mm.add("(min-width: 768px)", () => {
        gsap.set(stream, { clearProps: "x,transform" });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.0
          }
        });

        tl.fromTo(col1, 
          { yPercent: 25 }, 
          { yPercent: -50, ease: "none" }, 
          0
        );

        tl.fromTo(col2, 
          { yPercent: -45 }, 
          { yPercent: 30, ease: "none" }, 
          0
        );

        if (leftRef.current) {
          gsap.from(leftRef.current.children, {
            opacity: 0,
            y: 30,
            duration: 1.0,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 70%",
              toggleActions: "play none none reverse"
            }
          });
        }
      });

      // MOBILE (< 768px): Horizontal Moving Track
      mm.add("(max-width: 767px)", () => {
        gsap.set([col1, col2], { clearProps: "all" });

        const getDistance = () => {
          const totalWidth = stream.scrollWidth;
          const viewportWidth = window.innerWidth;
          return -(totalWidth - viewportWidth + 24);
        };

        gsap.fromTo(stream, 
          { x: 0 },
          {
            x: getDistance,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.8,
              invalidateOnRefresh: true
            }
          }
        );

        if (leftRef.current) {
          gsap.from(leftRef.current.children, {
            opacity: 0,
            y: 20,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          });
        }
      });

    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="section significo-about-stats" 
      this-theme="light-purple" 
      id="industry-changing"
    >
      <div ref={stickyRef} className="significo-about-stats__sticky">
        <div className="container">
          <div className="significo-about-stats__layout">
            
            {/* Left Side: Tag, Heading & Paragraph */}
            <div ref={leftRef} className="significo-about-stats__left">
              <div className="core-values__tag">
                <span className="core-values__dot"></span>
                <span className="f-14 is--btn caps">THE INDUSTRY IS CHANGING</span>
              </div>
              
              <h2 className="core-values__heading">
                THE INDUSTRY IS<br />CHANGING
              </h2>
              
              <p className="core-values__subparagraph">
                The live entertainment industry is increasingly recognising the importance of psychological wellbeing, not just for individuals, but for team performance and retention.
              </p>
            </div>

            {/* Right Side: Stadium Stream */}
            <div className="significo-about-stats__right">
              <div ref={streamRef} className="significo-about-stats__stream">
                
                {/* Column 1 (Left Stream) */}
                <div ref={col1Ref} className="significo-about-stats__col is--col-1">
                  
                  {/* Card 1: Better Crew Retention */}
                  <div className="significo-egg-card is--card-1">
                    <div className="significo-egg-card__content">
                      <div className="capsule-icon-circle">
                        <Users className="capsule-icon" />
                      </div>
                      <h3 className="capsule-topic-heading">
                        Better Crew<br />Retention
                      </h3>
                    </div>
                  </div>

                  {/* Card 3: Improved Operational Stability */}
                  <div className="significo-egg-card is--card-3">
                    <div className="significo-egg-card__content">
                      <div className="capsule-icon-circle">
                        <Workflow className="capsule-icon" />
                      </div>
                      <h3 className="capsule-topic-heading">
                        Improved Operational<br />Stability
                      </h3>
                    </div>
                  </div>

                </div>

                {/* Column 2 (Right Stream) */}
                <div ref={col2Ref} className="significo-about-stats__col is--col-2">
                  
                  {/* Card 2: Stronger Team Resilience */}
                  <div className="significo-egg-card is--card-2">
                    <div className="significo-egg-card__content">
                      <div className="capsule-icon-circle">
                        <ShieldCheck className="capsule-icon" />
                      </div>
                      <h3 className="capsule-topic-heading">
                        Stronger Team<br />Resilience
                      </h3>
                    </div>
                  </div>

                  {/* Card 4: Reduced Burnout Risk */}
                  <div className="significo-egg-card is--card-4">
                    <div className="significo-egg-card__content">
                      <div className="capsule-icon-circle">
                        <BatteryCharging className="capsule-icon" />
                      </div>
                      <h3 className="capsule-topic-heading">
                        Reduced Burnout<br />Risk
                      </h3>
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
