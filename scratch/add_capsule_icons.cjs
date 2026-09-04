const fs = require('fs');

const coreValuesContent = `import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, ShieldCheck, Workflow, BatteryCharging } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function CoreValues() {
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const leftRef = useRef(null);
  const col1Ref = useRef(null);
  const col2Ref = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const col1 = col1Ref.current;
    const col2 = col2Ref.current;
    if (!section || !col1 || !col2) return;

    // Theme trigger for white
    const stTheme = ScrollTrigger.create({
      trigger: section,
      start: "top 50%",
      end: "bottom 50%",
      onEnter: () => document.body.setAttribute('theme', 'white'),
      onEnterBack: () => document.body.setAttribute('theme', 'white')
    });

    const ctx = gsap.context(() => {
      // 1. Pinned 300vh Scroll-Driven Counter-Parallax Animation matching Significo.com/about
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2
        }
      });

      // Column 1 glides UPWARDS from +30% to -60%
      tl.fromTo(col1, 
        { yPercent: 30 }, 
        { yPercent: -55, ease: "none" }, 
        0
      );

      // Column 2 glides DOWNWARDS from -50% to +35%
      tl.fromTo(col2, 
        { yPercent: -50 }, 
        { yPercent: 35, ease: "none" }, 
        0
      );

      // 2. Left side entrance reveal
      if (leftRef.current) {
        gsap.from(leftRef.current.children, {
          opacity: 0,
          y: 35,
          duration: 1.1,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        });
      }
    }, section);

    return () => {
      stTheme.kill();
      ctx.revert();
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="section significo-about-stats" 
      this-theme="white" 
      id="industry-changing"
    >
      <div ref={stickyRef} className="significo-about-stats__sticky">
        <div className="container">
          <div className="significo-about-stats__layout">
            
            {/* Left Side: Compact Tag, Heading & Paragraph */}
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

            {/* Right Side: Stadium Stream Rotated at -15deg (HEX #00063D Container with White Text) */}
            <div className="significo-about-stats__right">
              <div className="significo-about-stats__stream">
                
                {/* Column 1 (Left Stream) */}
                <div ref={col1Ref} className="significo-about-stats__col is--col-1">
                  
                  {/* Card 1: Better Crew Retention */}
                  <div className="significo-egg-card">
                    <div className="significo-egg-card__content">
                      <div className="capsule-icon-circle">
                        <Users className="capsule-icon" />
                      </div>
                      <h3 className="capsule-topic-heading">
                        BETTER CREW<br />RETENTION
                      </h3>
                    </div>
                  </div>

                  {/* Card 3: Improved Operational Stability */}
                  <div className="significo-egg-card">
                    <div className="significo-egg-card__content">
                      <div className="capsule-icon-circle">
                        <Workflow className="capsule-icon" />
                      </div>
                      <h3 className="capsule-topic-heading">
                        IMPROVED OPERATIONAL<br />STABILITY
                      </h3>
                    </div>
                  </div>

                </div>

                {/* Column 2 (Right Stream) */}
                <div ref={col2Ref} className="significo-about-stats__col is--col-2">
                  
                  {/* Card 2: Stronger Team Resilience */}
                  <div className="significo-egg-card">
                    <div className="significo-egg-card__content">
                      <div className="capsule-icon-circle">
                        <ShieldCheck className="capsule-icon" />
                      </div>
                      <h3 className="capsule-topic-heading">
                        STRONGER TEAM<br />RESILIENCE
                      </h3>
                    </div>
                  </div>

                  {/* Card 4: Reduced Burnout Risk */}
                  <div className="significo-egg-card">
                    <div className="significo-egg-card__content">
                      <div className="capsule-icon-circle">
                        <BatteryCharging className="capsule-icon" />
                      </div>
                      <h3 className="capsule-topic-heading">
                        REDUCED BURNOUT<br />RISK
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
`;

fs.writeFileSync('src/sections/CoreValues.jsx', coreValuesContent, 'utf8');
console.log('Successfully updated CoreValues.jsx with icons!');
