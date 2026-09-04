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
  const leftColRef = useRef(null);
  const col1Ref = useRef(null);
  const col2Ref = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const leftCol = leftColRef.current;
    const col1 = col1Ref.current;
    const col2 = col2Ref.current;
    if (!section || !leftCol || !col1 || !col2) return;

    // Theme trigger for white (matching Significo /about aesthetic)
    const stTheme = ScrollTrigger.create({
      trigger: section,
      start: "top 60%",
      end: "bottom 40%",
      onEnter: () => document.body.setAttribute('theme', 'white'),
      onEnterBack: () => document.body.setAttribute('theme', 'white')
    });

    const ctx = gsap.context(() => {
      // Left side text entrance
      gsap.from(leftCol.children, {
        opacity: 0,
        y: 40,
        duration: 1.1,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      });

      // Capsule cards entrance stagger
      const capsules = section.querySelectorAll('.significo-capsule');
      gsap.from(capsules, {
        opacity: 0,
        y: 60,
        scale: 0.94,
        duration: 1.2,
        stagger: 0.14,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      });

      // Signature Significo Dual-Column Counter-Parallax Scrub
      gsap.to(col1, {
        y: -70,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2
        }
      });

      gsap.to(col2, {
        y: 80,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2
        }
      });
    }, section);

    return () => {
      stTheme.kill();
      ctx.revert();
    };
  }, []);

  const column1Data = [
    {
      num: "01",
      title: "Better Crew Retention",
      circlePos: "top"
    },
    {
      num: "03",
      title: "Improved Operational Stability",
      circlePos: "bottom"
    }
  ];

  const column2Data = [
    {
      num: "02",
      title: "Stronger Team Resilience",
      circlePos: "top"
    },
    {
      num: "04",
      title: "Reduced Burnout Risk",
      circlePos: "bottom"
    }
  ];

  return (
    <section 
      ref={sectionRef} 
      className="section core-values-section" 
      this-theme="white" 
      id="industry-changing"
    >
      <div className="container">
        
        <div className="core-values__layout">
          
          {/* Left Column: Tag, Main Heading, Paragraph & CTA */}
          <div ref={leftColRef} className="core-values__left">
            <div className="core-values__tag">
              <span className="core-values__dot"></span>
              <span className="f-14 is--btn caps">THE INDUSTRY IS CHANGING</span>
            </div>
            
            <h2 className="core-values__heading">
              THE INDUSTRY IS CHANGING
            </h2>
            
            <p className="core-values__subparagraph">
              The live entertainment industry is increasingly recognising the importance of psychological wellbeing, not just for individuals, but for team performance and retention.
            </p>

            <div className="core-values__btn-wrap">
              <MagneticButton buttonStyle="yellow" href="#contact">
                Let’s Partner ↗
              </MagneticButton>
            </div>
          </div>

          {/* Right Column: 2 Parallax Columns of Significo Tilted Stadium Capsules */}
          <div className="core-values__right">
            <div className="significo-capsules-stream">
              
              {/* Column 1 (Left Stream) */}
              <div ref={col1Ref} className="significo-capsules-col is--col-1">
                {column1Data.map((item, idx) => (
                  <div 
                    key={idx} 
                    className={\`significo-capsule is--circle-\${item.circlePos}\`}
                  >
                    {item.circlePos === 'top' && (
                      <div className="significo-capsule__disc">
                        <span className="significo-capsule__num">{item.num}</span>
                      </div>
                    )}

                    <div className="significo-capsule__topic-box">
                      <h3 className="significo-capsule__topic">{item.title}</h3>
                    </div>

                    {item.circlePos === 'bottom' && (
                      <div className="significo-capsule__disc">
                        <span className="significo-capsule__num">{item.num}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Column 2 (Right Stream - Offset) */}
              <div ref={col2Ref} className="significo-capsules-col is--col-2">
                {column2Data.map((item, idx) => (
                  <div 
                    key={idx} 
                    className={\`significo-capsule is--circle-\${item.circlePos}\`}
                  >
                    {item.circlePos === 'top' && (
                      <div className="significo-capsule__disc">
                        <span className="significo-capsule__num">{item.num}</span>
                      </div>
                    )}

                    <div className="significo-capsule__topic-box">
                      <h3 className="significo-capsule__topic">{item.title}</h3>
                    </div>

                    {item.circlePos === 'bottom' && (
                      <div className="significo-capsule__disc">
                        <span className="significo-capsule__num">{item.num}</span>
                      </div>
                    )}
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
`;

fs.writeFileSync(coreValuesPath, coreValuesContent, 'utf8');
console.log('CoreValues.jsx updated with Significo stadium capsule cards and dual parallax stream!');

let css = fs.readFileSync(indexCssPath, 'utf8');
const startTag = '/* ==========================================================================\r\n   CORE VALUES / THE INDUSTRY IS CHANGING';
const startTagLF = '/* ==========================================================================\n   CORE VALUES / THE INDUSTRY IS CHANGING';
const endTag = '/* ==========================================================================\r\n   WHAT MAKES US DIFFERENT (Centered Header + Alternating Perfect Circle Cards)';
const endTagLF = '/* ==========================================================================\n   WHAT MAKES US DIFFERENT (Centered Header + Alternating Perfect Circle Cards)';

const newCoreValuesCss = `/* ==========================================================================
   CORE VALUES / THE INDUSTRY IS CHANGING (Significo Stadium Capsule Stream)
   ========================================================================== */

.core-values-section {
  position: relative;
  width: 100%;
  min-height: 105vh;
  padding-block: clamp(4rem, 8vh, 8rem);
  background-color: var(--white);
  color: var(--black);
  z-index: 10;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  transition: background-color var(--bg-timing), color var(--bg-timing);
}

.core-values__layout {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: clamp(2rem, 5vw, 6rem);
  position: relative;
  width: 100%;
}

.core-values__left {
  flex: 1;
  max-width: 38rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: clamp(1.2rem, 2.2vh, 2rem);
  z-index: 2;
}

.core-values__tag {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  font-family: 'Manrope', sans-serif;
  font-weight: 700;
  font-size: clamp(0.78rem, 0.9vw, 0.95rem);
  letter-spacing: 0.08em;
  color: var(--black);
  text-transform: uppercase;
}

.core-values__dot {
  width: 0.55rem;
  height: 0.55rem;
  border-radius: 50%;
  background-color: var(--black);
  display: inline-block;
}

.core-values__heading {
  font-family: 'Staatliches', sans-serif;
  font-size: clamp(2.8rem, 5vw, 5.2rem);
  font-weight: 400;
  line-height: 0.98;
  letter-spacing: 0.02em;
  color: var(--black);
  text-align: left;
}

.core-values__subparagraph {
  font-family: 'Manrope', sans-serif;
  font-size: clamp(1rem, 1.25vw, 1.35rem);
  font-weight: 500;
  line-height: 1.55;
  letter-spacing: -0.01em;
  color: rgba(0, 0, 0, 0.82);
  max-width: 34rem;
  text-align: left;
}

.core-values__btn-wrap {
  margin-top: 0.5rem;
}

.core-values__right {
  flex: 1.25;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  z-index: 1;
  position: relative;
}

/* 2-Column Parallax Stadium Capsules Stream */
.significo-capsules-stream {
  display: flex;
  align-items: flex-start;
  gap: clamp(1.5rem, 3vw, 3.5rem);
  width: 100%;
  max-width: clamp(34rem, 42vw, 48rem);
}

.significo-capsules-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: clamp(2rem, 4vh, 4.5rem);
  will-change: transform;
}

.significo-capsules-col.is--col-2 {
  margin-top: clamp(3rem, 6vh, 6.5rem);
}

/* Authentic Significo Stadium / Pill Capsule Structure */
.significo-capsule {
  width: 100%;
  max-width: clamp(15rem, 18.5vw, 21.5rem);
  height: clamp(25rem, 33vh, 32rem);
  border-radius: 9999px;
  border: 1.5px solid #000000;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: clamp(0.7rem, 0.9vw, 1.1rem);
  box-sizing: border-box;
  transform: rotate(-14deg);
  transform-origin: center center;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.06);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
  position: relative;
}

.significo-capsule:hover {
  transform: rotate(-14deg) translateY(-8px) scale(1.02);
  box-shadow: 0 30px 65px rgba(0, 0, 0, 0.12);
}

/* Large Circular Disc with Soft Yellow Fill (matching Image 2) */
.significo-capsule__disc {
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  background-color: #f5f19c;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-sizing: border-box;
}

.significo-capsule__num {
  font-family: 'Manrope', sans-serif;
  font-size: clamp(3rem, 4.5vw, 5.2rem);
  font-weight: 400;
  letter-spacing: -0.04em;
  color: #000000;
  line-height: 1;
  text-align: center;
  user-select: none;
}

/* Focused Topic Headline Box (subpara removed so topic is mainly prominent) */
.significo-capsule__topic-box {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: clamp(1rem, 1.6vw, 1.8rem) clamp(0.8rem, 1.2vw, 1.4rem);
  width: 100%;
  box-sizing: border-box;
}

.significo-capsule__topic {
  font-family: 'Manrope', sans-serif;
  font-size: clamp(1.15rem, 1.45vw, 1.7rem);
  font-weight: 600;
  line-height: 1.28;
  letter-spacing: -0.02em;
  color: #000000;
  text-align: center;
  max-width: 14rem;
  margin: 0 auto;
}

@media screen and (max-width: 991px) {
  .core-values-section {
    min-height: auto;
    padding-block: clamp(4rem, 8vh, 6rem);
  }

  .core-values__layout {
    flex-direction: column;
    gap: 4rem;
  }

  .core-values__left {
    position: static;
    max-width: 100%;
    align-items: center;
    text-align: center;
  }

  .core-values__heading,
  .core-values__subparagraph {
    text-align: center;
  }

  .core-values__right {
    width: 100%;
    justify-content: center;
  }

  .significo-capsules-stream {
    max-width: 32rem;
    gap: 1.8rem;
  }
}

@media screen and (max-width: 580px) {
  .significo-capsules-stream {
    flex-direction: column;
    align-items: center;
    max-width: 18rem;
    margin-inline: auto;
    gap: 2.5rem;
  }

  .significo-capsules-col.is--col-2 {
    margin-top: 0;
  }

  .significo-capsule {
    height: 24rem;
  }
}

`;

let startIdx = css.indexOf(startTag);
if (startIdx === -1) startIdx = css.indexOf(startTagLF);
let endIdx = css.indexOf(endTag);
if (endIdx === -1) endIdx = css.indexOf(endTagLF);

if (startIdx !== -1 && endIdx !== -1) {
  const updatedCss = css.substring(0, startIdx) + newCoreValuesCss + css.substring(endIdx);
  fs.writeFileSync(indexCssPath, updatedCss, 'utf8');
  console.log('index.css updated with Significo stadium capsule styles!');
} else {
  console.error('Could not find start or end tags in index.css: startIdx=' + startIdx + ', endIdx=' + endIdx);
}
