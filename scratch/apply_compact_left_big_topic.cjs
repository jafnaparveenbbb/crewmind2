const fs = require('fs');
const path = require('path');

const coreValuesPath = path.join(__dirname, '..', 'src', 'sections', 'CoreValues.jsx');
const indexCssPath = path.join(__dirname, '..', 'src', 'index.css');

const coreValuesContent = `import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
            
            {/* Left Side: Compact Tag, Heading & Paragraph (No collision) */}
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
                  
                  {/* Card 1: 01 / Circle at Top */}
                  <div className="significo-egg-card is--top-circle">
                    <div className="significo-egg-card__circle">
                      <span className="significo-egg-card__number">01</span>
                    </div>
                    <div className="significo-egg-card__text">
                      <h3 className="capsule-topic-heading">
                        BETTER CREW<br />RETENTION
                      </h3>
                    </div>
                  </div>

                  {/* Card 3: 03 / Circle at Bottom */}
                  <div className="significo-egg-card is--bottom-circle">
                    <div className="significo-egg-card__text">
                      <h3 className="capsule-topic-heading">
                        IMPROVED OPERATIONAL<br />STABILITY
                      </h3>
                    </div>
                    <div className="significo-egg-card__circle">
                      <span className="significo-egg-card__number">03</span>
                    </div>
                  </div>

                </div>

                {/* Column 2 (Right Stream) */}
                <div ref={col2Ref} className="significo-about-stats__col is--col-2">
                  
                  {/* Card 2: 02 / Circle at Top */}
                  <div className="significo-egg-card is--top-circle">
                    <div className="significo-egg-card__circle">
                      <span className="significo-egg-card__number">02</span>
                    </div>
                    <div className="significo-egg-card__text">
                      <h3 className="capsule-topic-heading">
                        STRONGER TEAM<br />RESILIENCE
                      </h3>
                    </div>
                  </div>

                  {/* Card 4: 04 / Circle at Bottom */}
                  <div className="significo-egg-card is--bottom-circle">
                    <div className="significo-egg-card__text">
                      <h3 className="capsule-topic-heading">
                        REDUCED BURNOUT<br />RISK
                      </h3>
                    </div>
                    <div className="significo-egg-card__circle">
                      <span className="significo-egg-card__number">04</span>
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

fs.writeFileSync(coreValuesPath, coreValuesContent, 'utf8');
console.log('CoreValues.jsx updated with compact left section and big topic headings!');

let css = fs.readFileSync(indexCssPath, 'utf8');
const startTag = '/* ==========================================================================\r\n   CORE VALUES / THE INDUSTRY IS CHANGING';
const startTagLF = '/* ==========================================================================\n   CORE VALUES / THE INDUSTRY IS CHANGING';
const startTagAlt = '/* ==========================================================================\r\n   SIGNIFICO ABOUT STATS / EGG SLIDE STATS';
const startTagAltLF = '/* ==========================================================================\n   SIGNIFICO ABOUT STATS / EGG SLIDE STATS';

const endTag = '/* ==========================================================================\r\n   WHAT MAKES US DIFFERENT (Centered Header + Alternating Perfect Circle Cards)';
const endTagLF = '/* ==========================================================================\n   WHAT MAKES US DIFFERENT (Centered Header + Alternating Perfect Circle Cards)';

const newSignificoAboutStatsCss = `/* ==========================================================================
   SIGNIFICO ABOUT STATS / EGG SLIDE STATS (300vh Pinned Stadium Stream)
   ========================================================================== */

.significo-about-stats {
  position: relative;
  width: 100%;
  height: 300vh;
  background-color: var(--white);
  color: var(--black);
  z-index: 10;
  box-sizing: border-box;
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

/* Compact Left Content Column (Zero Collision) */
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
  transform-origin: center center;
  z-index: 2;
  pointer-events: all;
}

.significo-about-stats__stream {
  display: flex;
  align-items: center;
  gap: clamp(1.8rem, 2.8vw, 3.8rem);
}

.significo-about-stats__col {
  display: flex;
  flex-direction: column;
  gap: clamp(2.5rem, 4.5vh, 5rem);
  will-change: transform;
}

/* Proportioned Stadium Egg Capsule Cards */
.significo-egg-card {
  width: clamp(19rem, 23vw, 28rem);
  height: clamp(38rem, 64vh, 50rem);
  border-radius: 9999px;
  border: 1.5px solid #000000;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: clamp(1.5rem, 2.2vh, 2.5rem) clamp(1.2rem, 1.6vw, 2rem);
  box-sizing: border-box;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.06);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
  flex-shrink: 0;
}

.significo-egg-card:hover {
  transform: scale(1.02);
  box-shadow: 0 30px 65px rgba(0, 0, 0, 0.12);
}

/* Reduced Compact Number Circle */
.significo-egg-card__circle {
  width: clamp(4.2rem, 5.8vw, 6.6rem);
  height: clamp(4.2rem, 5.8vw, 6.6rem);
  border-radius: 50%;
  background-color: var(--yellow);
  border: 1.5px solid #000000;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-sizing: border-box;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
}

.significo-egg-card__number {
  font-family: 'Staatliches', sans-serif;
  font-size: clamp(1.8rem, 2.4vw, 2.8rem);
  font-weight: 400;
  letter-spacing: 0.04em;
  color: var(--black);
  line-height: 1;
  text-align: center;
  user-select: none;
}

/* Big Impact Main Heading Inside Capsule */
.significo-egg-card__text {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  padding: clamp(1rem, 1.8vh, 2.2rem) 0;
  box-sizing: border-box;
}

.capsule-topic-heading {
  font-family: 'Staatliches', sans-serif;
  font-size: clamp(2rem, 2.8vw, 3.6rem);
  font-weight: 400;
  line-height: 1.05;
  letter-spacing: 0.02em;
  color: #000000;
  text-align: center;
  text-transform: uppercase;
  max-width: 18rem;
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
    gap: 2.5rem;
  }

  .significo-egg-card {
    width: clamp(18rem, 75vw, 22rem);
    height: clamp(34rem, 50vh, 42rem);
    transform: rotate(-10deg);
  }
}

`;

let startIdx = css.indexOf(startTag);
if (startIdx === -1) startIdx = css.indexOf(startTagLF);
if (startIdx === -1) startIdx = css.indexOf(startTagAlt);
if (startIdx === -1) startIdx = css.indexOf(startTagAltLF);

let endIdx = css.indexOf(endTag);
if (endIdx === -1) endIdx = css.indexOf(endTagLF);

if (startIdx !== -1 && endIdx !== -1) {
  const updatedCss = css.substring(0, startIdx) + newSignificoAboutStatsCss + css.substring(endIdx);
  fs.writeFileSync(indexCssPath, updatedCss, 'utf8');
  console.log('index.css updated!');
} else {
  console.error('Could not find start or end tags in index.css: startIdx=' + startIdx + ', endIdx=' + endIdx);
}
