const fs = require('fs');
const path = require('path');

const coreValuesPath = path.join(__dirname, '..', 'src', 'sections', 'CoreValues.jsx');
const indexCssPath = path.join(__dirname, '..', 'src', 'index.css');

const coreValuesContent = `import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from '../components/MagneticButton';

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

      // Column 1 glides UPWARDS from +30% to -65%
      tl.fromTo(col1, 
        { yPercent: 35 }, 
        { yPercent: -60, ease: "none" }, 
        0
      );

      // Column 2 glides DOWNWARDS from -55% to +45%
      tl.fromTo(col2, 
        { yPercent: -55 }, 
        { yPercent: 40, ease: "none" }, 
        0
      );

      // 2. Entrance reveal
      if (leftRef.current) {
        gsap.from(leftRef.current.children, {
          opacity: 0,
          y: 40,
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
            
            {/* Left Side: Subtitle, Large Heading & Button matching Image */}
            <div ref={leftRef} className="significo-about-stats__left">
              <p className="significo-about-stats__subdescr">
                We’re here to make an impact, for health technology, for our partners, and for our team.
              </p>
              
              <h2 className="significo-about-stats__heading">
                Real Talk,<br />
                Real Impact.
              </h2>

              <div className="significo-about-stats__btn">
                <MagneticButton buttonStyle="yellow" href="#contact">
                  Let’s Partner ↗
                </MagneticButton>
              </div>
            </div>

            {/* Right Side: Giant Angled Stadium Egg Stream (Rotated -15deg) */}
            <div className="significo-about-stats__right">
              <div className="significo-about-stats__stream">
                
                {/* Column 1 (Left Stream) */}
                <div ref={col1Ref} className="significo-about-stats__col is--col-1">
                  
                  {/* Card 1: 20M / Circle at Top */}
                  <div className="significo-egg-card is--top-circle">
                    <div className="significo-egg-card__circle">
                      <span className="significo-egg-card__number">20M</span>
                    </div>
                    <div className="significo-egg-card__text">
                      Real people — real lives — we have built products and solutions for.
                    </div>
                  </div>

                  {/* Card 3: 13 / Circle at Bottom */}
                  <div className="significo-egg-card is--bottom-circle">
                    <div className="significo-egg-card__text">
                      Nationalities Represented on Our Team
                    </div>
                    <div className="significo-egg-card__circle">
                      <span className="significo-egg-card__number">13</span>
                    </div>
                  </div>

                </div>

                {/* Column 2 (Right Stream) */}
                <div ref={col2Ref} className="significo-about-stats__col is--col-2">
                  
                  {/* Card 2: 43% / Circle at Top */}
                  <div className="significo-egg-card is--top-circle">
                    <div className="significo-egg-card__circle">
                      <span className="significo-egg-card__number">43%</span>
                    </div>
                    <div className="significo-egg-card__text">
                      Of Our Experts are Women
                    </div>
                  </div>

                  {/* Card 4: 46 / Circle at Bottom */}
                  <div className="significo-egg-card is--bottom-circle">
                    <div className="significo-egg-card__text">
                      Papers Published.
                    </div>
                    <div className="significo-egg-card__circle">
                      <span className="significo-egg-card__number">46</span>
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
console.log('CoreValues.jsx updated with exact Significo.com/about EggSlideStats structure & animations!');

let css = fs.readFileSync(indexCssPath, 'utf8');
const startTag = '/* ==========================================================================\r\n   CORE VALUES / THE INDUSTRY IS CHANGING';
const startTagLF = '/* ==========================================================================\n   CORE VALUES / THE INDUSTRY IS CHANGING';
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

/* Left Content Column matching Image */
.significo-about-stats__left {
  max-width: clamp(24rem, 32vw, 36rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: clamp(1.5rem, 3vh, 3rem);
  z-index: 5;
  position: relative;
}

.significo-about-stats__subdescr {
  font-family: 'Manrope', sans-serif;
  font-size: clamp(1.05rem, 1.35vw, 1.45rem);
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: -0.01em;
  color: var(--black);
  max-width: 32rem;
}

.significo-about-stats__heading {
  font-family: 'Manrope', sans-serif;
  font-size: clamp(3.2rem, 5.2vw, 6.2rem);
  font-weight: 600;
  line-height: 1.06;
  letter-spacing: -0.03em;
  color: var(--black);
  text-align: left;
}

.significo-about-stats__btn {
  margin-top: clamp(0.5rem, 1.5vh, 1.5rem);
}

/* Right Stream Rotated at -15deg */
.significo-about-stats__right {
  position: absolute;
  top: 50%;
  right: calc(-8vw);
  transform: translateY(-50%) rotate(-15deg);
  transform-origin: center center;
  z-index: 2;
  pointer-events: all;
}

.significo-about-stats__stream {
  display: flex;
  align-items: center;
  gap: clamp(2rem, 3.5vw, 4.5rem);
}

.significo-about-stats__col {
  display: flex;
  flex-direction: column;
  gap: clamp(3rem, 5.5vh, 6rem);
  will-change: transform;
}

/* Authentic Massive Significo Stadium / Egg Capsule Cards */
.significo-egg-card {
  width: clamp(22rem, 27vw, 33rem);
  height: clamp(45rem, 74vh, 58rem);
  border-radius: 9999px;
  border: 1.2px solid #000000;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: clamp(0.9rem, 1.2vw, 1.5rem);
  box-sizing: border-box;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.05);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
  flex-shrink: 0;
}

.significo-egg-card:hover {
  transform: scale(1.02);
  box-shadow: 0 35px 80px rgba(0, 0, 0, 0.1);
}

/* Giant Yellow Circular Disc matching Image */
.significo-egg-card__circle {
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  background-color: var(--yellow);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-sizing: border-box;
}

.significo-egg-card__number {
  font-family: 'Manrope', sans-serif;
  font-size: clamp(5rem, 7.8vw, 9.2rem);
  font-weight: 400;
  letter-spacing: -0.04em;
  color: var(--black);
  line-height: 1;
  text-align: center;
  user-select: none;
}

/* Topic / Description text inside the capsule */
.significo-egg-card__text {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: clamp(1.5rem, 2.5vw, 3.2rem) clamp(1.2rem, 2vw, 2.5rem);
  font-family: 'Manrope', sans-serif;
  font-size: clamp(1.25rem, 1.75vw, 2.1rem);
  font-weight: 500;
  line-height: 1.34;
  letter-spacing: -0.015em;
  color: var(--black);
  max-width: 82%;
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

  .significo-about-stats__heading {
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
    width: clamp(18rem, 75vw, 24rem);
    height: clamp(36rem, 55vh, 44rem);
    transform: rotate(-10deg);
  }
}

`;

let startIdx = css.indexOf(startTag);
if (startIdx === -1) startIdx = css.indexOf(startTagLF);
let endIdx = css.indexOf(endTag);
if (endIdx === -1) endIdx = css.indexOf(endTagLF);

if (startIdx !== -1 && endIdx !== -1) {
  const updatedCss = css.substring(0, startIdx) + newSignificoAboutStatsCss + css.substring(endIdx);
  fs.writeFileSync(indexCssPath, updatedCss, 'utf8');
  console.log('index.css updated with exact Significo About EggSlideStats!');
} else {
  console.error('Could not find start or end tags in index.css: startIdx=' + startIdx + ', endIdx=' + endIdx);
}
