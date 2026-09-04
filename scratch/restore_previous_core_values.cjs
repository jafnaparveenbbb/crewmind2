const fs = require('fs');

// 1. Restore CoreValues.jsx to the pinned stadium stream with dual-column scroll parallax
const coreValuesCode = `import React, { useEffect, useRef } from 'react';
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

            {/* Right Side: Stadium Stream Rotated at -15deg */}
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

fs.writeFileSync('src/sections/CoreValues.jsx', coreValuesCode, 'utf8');
console.log('Successfully restored CoreValues.jsx!');

// 2. Restore index.css section styling for CoreValues
let css = fs.readFileSync('src/index.css', 'utf8');

const restoredSectionCSS = `/* ==========================================================================
   THE INDUSTRY IS CHANGING / CORE VALUES (Pinned Stadium Stream)
   ========================================================================== */

.significo-about-stats {
  position: relative;
  width: 100%;
  height: 300vh;
  background-color: var(--white);
  color: var(--black);
  z-index: 10;
  box-sizing: border-box;
  transition: background-color var(--bg-timing), color var(--bg-timing);
}

.significo-about-stats__sticky {
  position: sticky;
  top: 0;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
}

.significo-about-stats__layout {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  position: relative;
}

/* Compact Left Content Column (Black Typography on White BG) */
.significo-about-stats__left {
  max-width: clamp(18rem, 26vw, 30rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: clamp(1rem, 1.8vh, 1.8rem);
  z-index: 5;
  position: relative;
}

.core-values__tag {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  font-family: 'Manrope', sans-serif;
  font-weight: 700;
  font-size: clamp(0.72rem, 0.8vw, 0.88rem);
  letter-spacing: 0.08em;
  color: var(--black);
  text-transform: uppercase;
}

.core-values__dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background-color: var(--black);
  display: inline-block;
}

.core-values__heading {
  font-family: 'Staatliches', sans-serif;
  font-size: clamp(2.4rem, 3.8vw, 4.4rem);
  font-weight: 400;
  line-height: 0.98;
  letter-spacing: 0.02em;
  color: var(--black);
  text-align: left;
}

.core-values__subparagraph {
  font-family: 'Manrope', sans-serif;
  font-size: clamp(0.92rem, 1.05vw, 1.2rem);
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: -0.01em;
  color: rgba(0, 0, 0, 0.82);
  max-width: 26rem;
  text-align: left;
}

/* Right Stream Rotated at -15deg */
.significo-about-stats__right {
  position: absolute;
  top: 50%;
  right: calc(-2vw);
  transform: translateY(-50%) rotate(-15deg);
  width: clamp(42rem, 54vw, 68rem);
  pointer-events: auto;
  z-index: 4;
}

.significo-about-stats__stream {
  display: flex;
  gap: clamp(1.8rem, 2.8vw, 3.5rem);
  justify-content: center;
  align-items: center;
  width: 100%;
}

.significo-about-stats__col {
  display: flex;
  flex-direction: column;
  gap: clamp(2.2rem, 3.8vh, 4.5rem);
  will-change: transform;
}

/* Stadium Egg Capsule Cards - White background with Black border, Yellow inside circle, Black text */
.significo-egg-card {
  width: clamp(19rem, 23vw, 28rem);
  height: clamp(36rem, 60vh, 46rem);
  border-radius: 9999px;
  border: 1.5px solid var(--black);
  background-color: #ffffff;
  color: var(--black);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: clamp(2rem, 3.5vh, 4rem) clamp(1.5rem, 2vw, 2.8rem);
  box-sizing: border-box;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.08);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease, border-color 0.3s ease;
  flex-shrink: 0;
}

.significo-egg-card:hover {
  transform: scale(1.03);
  box-shadow: 0 30px 70px rgba(0, 0, 0, 0.16);
  border-color: var(--black);
}

/* Capsule Card Content: Centered Layout with Yellow Icon Circle Above Topic Heading */
.significo-egg-card__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  gap: clamp(1.6rem, 2.5vh, 2.8rem);
}

/* Inside Circle: Yellow (#f5f19c / var(--yellow)) with Black Icon */
.capsule-icon-circle {
  width: clamp(5rem, 6vw, 7rem);
  height: clamp(5rem, 6vw, 7rem);
  border-radius: 50%;
  border: none;
  background-color: var(--yellow, #f5f19c);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--black);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
  flex-shrink: 0;
}

.significo-egg-card:hover .capsule-icon-circle {
  transform: translateY(-4px) scale(1.08);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.15);
}

.capsule-icon {
  width: clamp(2.4rem, 3vw, 3.4rem);
  height: clamp(2.4rem, 3vw, 3.4rem);
  color: var(--black);
  stroke: var(--black);
}

.capsule-topic-heading {
  font-family: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: clamp(1.8rem, 2.3vw, 2.7rem);
  font-weight: 800;
  line-height: 1.18;
  letter-spacing: -0.01em;
  color: var(--black);
  text-align: center;
  text-transform: uppercase;
  max-width: 20rem;
  margin: 0 auto;
}

@media screen and (max-width: 991px) {
  .significo-about-stats {
    height: auto;
  }

  .significo-about-stats__sticky {
    position: static;
    height: auto;
    padding-block: 5rem;
  }

  .significo-about-stats__layout {
    flex-direction: column;
    gap: 4rem;
  }

  .significo-about-stats__left {
    max-width: 100%;
    align-items: center;
    text-align: center;
  }

  .core-values__heading {
    text-align: center;
  }

  .core-values__subparagraph {
    text-align: center;
  }

  .significo-about-stats__right {
    position: static;
    transform: none;
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 2rem;
  }

  .significo-about-stats__stream {
    flex-direction: column;
    gap: 2rem;
  }

  .significo-about-stats__col {
    transform: none !important;
    gap: 2rem;
  }

  .significo-egg-card {
    width: clamp(18rem, 75vw, 22rem);
    height: clamp(34rem, 50vh, 42rem);
    transform: rotate(-10deg);
  }
}`;

const startIdx = css.indexOf('.significo-about-stats');
const endIdx = css.indexOf('/* ==========================================================================\n   WHAT MAKES US DIFFERENT');

if (startIdx !== -1 && endIdx !== -1) {
  const commentStart = css.lastIndexOf('/* ==========================================================================', startIdx);
  const replaceStart = commentStart !== -1 ? commentStart : startIdx;
  css = css.substring(0, replaceStart) + restoredSectionCSS + '\n\n' + css.substring(endIdx);
  fs.writeFileSync('src/index.css', css, 'utf8');
  console.log('Successfully restored index.css CoreValues styling!');
} else {
  console.error('Could not locate section markers in index.css');
}
