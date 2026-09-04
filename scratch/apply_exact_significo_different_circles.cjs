const fs = require('fs');

// 1. Update WhatMakesUsDifferent.jsx
const whatMakesUsDifferentCode = `import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Smile, Zap, Rocket, ShieldCheck } from 'lucide-react';
import MagneticButton from '../components/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

export default function WhatMakesUsDifferent() {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const gridRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);
  const card4Ref = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const left = leftRef.current;
    const grid = gridRef.current;
    if (!section || !left || !grid) return;

    // Theme trigger for yellow
    const stTheme = ScrollTrigger.create({
      trigger: section,
      start: "top 60%",
      end: "bottom 40%",
      onEnter: () => document.body.setAttribute('theme', 'yellow'),
      onEnterBack: () => document.body.setAttribute('theme', 'yellow')
    });

    const ctx = gsap.context(() => {
      // 1. Left side entrance reveal (Untouched)
      gsap.from(left.children, {
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

      // 2. Right 4 circular cards entrance animation
      const cards = [card1Ref.current, card2Ref.current, card3Ref.current, card4Ref.current].filter(Boolean);
      gsap.from(cards, {
        opacity: 0,
        scale: 0.85,
        y: 50,
        duration: 1.1,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: grid,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      // 3. Smooth, organic floating animation for all 4 circles with subtle depth
      if (card1Ref.current) {
        gsap.to(card1Ref.current, {
          y: -12,
          x: 2,
          rotation: -0.5,
          duration: 4.2,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true
        });
      }
      if (card2Ref.current) {
        gsap.to(card2Ref.current, {
          y: 12,
          x: -3,
          rotation: 0.7,
          duration: 4.8,
          delay: -1.5,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true
        });
      }
      if (card3Ref.current) {
        gsap.to(card3Ref.current, {
          y: -9,
          x: -2,
          rotation: 0.5,
          duration: 5.2,
          delay: -2.8,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true
        });
      }
      if (card4Ref.current) {
        gsap.to(card4Ref.current, {
          y: 11,
          x: 2,
          rotation: -0.6,
          duration: 4.4,
          delay: -0.8,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true
        });
      }
    }, section);

    return () => {
      stTheme.kill();
      ctx.revert();
    };
  }, []);

  const itemsData = [
    {
      ref: card1Ref,
      icon: Smile,
      title: "PRESENT DURING TOURS AND PRODUCTIONS",
      desc: "Providing real-time psychological support embedded directly into live tour routes and active production schedules."
    },
    {
      ref: card2Ref,
      icon: Zap,
      title: "AVAILABLE IN HIGH PRESSURE MOMENTS",
      desc: "Immediate, on-demand grounding and crisis prevention during peak performance and high-stress show days."
    },
    {
      ref: card3Ref,
      icon: Rocket,
      title: "EMBEDDED WITHIN THE TEAM ENVIRONMENT",
      desc: "Fostering deep trust with crew and artists as an integrated, everyday presence across all departments."
    },
    {
      ref: card4Ref,
      icon: ShieldCheck,
      title: "FOCUSED ON PREVENTION, NOT JUST INTERVENTION",
      desc: "Equipping teams with sustainable mental resilience tools and early identification before burnout takes hold."
    }
  ];

  return (
    <section 
      ref={sectionRef} 
      className="section ovals-diff-section" 
      this-theme="yellow" 
      id="what-makes-us-different"
    >
      <div className="container">
        <div className="ovals-diff__layout">
          
          {/* Left Column: Heading & CTA (Untouched) */}
          <div ref={leftRef} className="ovals-diff__left">
            <div className="ovals-diff__tag">
              <span className="diff__dot"></span>
              <span className="f-14 is--btn caps">WHAT MAKES US DIFFERENT</span>
            </div>

            <h2 className="ovals-diff__heading">
              WE WORK BEFORE<br />SOMEONE ASKS<br />FOR HELP.
            </h2>

            <p className="ovals-diff__subpara">
              We operate proactively within live entertainment environments to protect crew wellbeing, reduce burnout, and keep productions thriving.
            </p>

            <div className="ovals-diff__btn-wrap">
              <MagneticButton buttonStyle="black" href="#contact">
                LET'S PARTNER
              </MagneticButton>
            </div>
          </div>

          {/* Right Column: 2x2 Large Touching Circles Matching Significo Reference */}
          <div ref={gridRef} className="ovals-diff__grid">
            {itemsData.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div key={idx} ref={item.ref} className="diff-core-circle">
                  <div className="diff-core-circle__inner">
                    <div className="diff-core-circle__icon-wrap">
                      <IconComp className="diff-core-circle__icon" strokeWidth={1.75} />
                    </div>
                    <h3 className="diff-core-circle__title">{item.title}</h3>
                    <p className="diff-core-circle__desc">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
`;

fs.writeFileSync('src/sections/WhatMakesUsDifferent.jsx', whatMakesUsDifferentCode, 'utf8');
console.log('Successfully updated WhatMakesUsDifferent.jsx with large floating circles!');

// 2. Update index.css
let css = fs.readFileSync('src/index.css', 'utf8');

const updatedDiffCSS = `/* ==========================================================================
   WHAT MAKES US DIFFERENT (Significo Core Values 2x2 Circle Grid Layout)
   ========================================================================== */

.ovals-diff-section {
  position: relative;
  width: 100%;
  padding-block: clamp(6rem, 10vw, 14rem);
  background-color: var(--yellow);
  color: var(--black);
  z-index: 10;
  overflow: hidden;
  transition: background-color var(--bg-timing), color var(--bg-timing);
}

.ovals-diff-section .container {
  width: min(100% - 40px, 1750px);
  margin-inline: auto;
}

.ovals-diff__layout {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: clamp(2rem, 3.5vw, 5rem);
  width: 100%;
}

/* Compact Left Content Column (UNTOUCHED) */
.ovals-diff__left {
  flex: 0 0 clamp(20rem, 27vw, 33rem);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  gap: clamp(1.4rem, 2.2vh, 2.2rem);
  z-index: 5;
}

.ovals-diff__tag {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  font-family: 'Manrope', sans-serif;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: var(--black);
  text-transform: uppercase;
}

.diff__dot {
  width: 0.55rem;
  height: 0.55rem;
  border-radius: 50%;
  background-color: var(--black);
  display: inline-block;
}

.ovals-diff__heading {
  font-family: 'Staatliches', sans-serif;
  font-size: clamp(2.8rem, 4.2vw, 5.2rem);
  font-weight: 400;
  line-height: 0.96;
  letter-spacing: 0.02em;
  color: var(--black);
  text-align: left;
}

.ovals-diff__subpara {
  font-family: 'Manrope', sans-serif;
  font-size: clamp(0.95rem, 1.15vw, 1.25rem);
  font-weight: 500;
  line-height: 1.6;
  letter-spacing: -0.01em;
  color: rgba(0, 0, 0, 0.82);
  max-width: 28rem;
  text-align: left;
}

.ovals-diff__btn-wrap {
  margin-top: 0.5rem;
}

/* 2x2 Large Touching Circles Grid matching Significo Reference */
.ovals-diff__grid {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(0.4rem, 1vw, 1.4rem);
  justify-items: center;
  align-items: center;
  position: relative;
  z-index: 4;
}

/* 100% Perfect Large Circles (Dominant Scale like Reference 1) */
.diff-core-circle {
  width: clamp(22rem, 27.5vw, 34rem);
  height: clamp(22rem, 27.5vw, 34rem);
  min-width: clamp(22rem, 27.5vw, 34rem);
  min-height: clamp(22rem, 27.5vw, 34rem);
  max-width: clamp(22rem, 27.5vw, 34rem);
  max-height: clamp(22rem, 27.5vw, 34rem);
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  background-color: var(--black);
  color: var(--white);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: clamp(2.2rem, 3.4vw, 4.6rem);
  box-sizing: border-box;
  box-shadow: 0 25px 70px rgba(0, 0, 0, 0.35);
  transition: box-shadow 0.4s ease;
  position: relative;
  text-align: center;
  overflow: hidden;
  flex-shrink: 0;
  will-change: transform;
}

.diff-core-circle:hover {
  box-shadow: 0 35px 95px rgba(0, 0, 0, 0.48);
}

.diff-core-circle__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: clamp(0.6rem, 1.1vh, 1.1rem);
  width: 100%;
  max-width: 90%;
  box-sizing: border-box;
}

.diff-core-circle__icon-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--yellow);
  margin-bottom: 0.15rem;
}

.diff-core-circle__icon {
  width: clamp(2.8rem, 3.8vw, 4.6rem);
  height: clamp(2.8rem, 3.8vw, 4.6rem);
  color: var(--yellow);
  stroke: var(--yellow);
}

.diff-core-circle__title {
  font-family: 'Manrope', sans-serif;
  font-size: clamp(1.2rem, 1.55vw, 1.95rem);
  font-weight: 800;
  line-height: 1.14;
  letter-spacing: -0.01em;
  color: var(--yellow);
  text-transform: uppercase;
  max-width: 20rem;
  margin: 0 auto;
}

.diff-core-circle__desc {
  font-family: 'Manrope', sans-serif;
  font-size: clamp(0.85rem, 1vw, 1.15rem);
  font-weight: 400;
  line-height: 1.48;
  letter-spacing: -0.01em;
  color: rgba(255, 255, 255, 0.84);
  max-width: 18rem;
  margin: 0 auto;
}

@media screen and (max-width: 1200px) {
  .ovals-diff__layout {
    flex-direction: column;
    text-align: center;
    gap: 4rem;
  }

  .ovals-diff__left {
    flex: auto;
    max-width: 100%;
    align-items: center;
    text-align: center;
  }

  .ovals-diff__heading {
    text-align: center;
  }

  .ovals-diff__subpara {
    text-align: center;
  }

  .ovals-diff__grid {
    width: 100%;
    max-width: 58rem;
  }

  .diff-core-circle {
    width: clamp(20rem, 42vw, 27rem);
    height: clamp(20rem, 42vw, 27rem);
    min-width: clamp(20rem, 42vw, 27rem);
    min-height: clamp(20rem, 42vw, 27rem);
  }
}

@media screen and (max-width: 680px) {
  .ovals-diff__grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .diff-core-circle {
    width: clamp(19rem, 84vw, 24rem);
    height: clamp(19rem, 84vw, 24rem);
    min-width: clamp(19rem, 84vw, 24rem);
    min-height: clamp(19rem, 84vw, 24rem);
  }
}`;

const startIdx = css.indexOf('.ovals-diff-section');
const endIdx = css.indexOf('/* ==========================================================================\n   CASE STUDIES SLIDER');

if (startIdx !== -1 && endIdx !== -1) {
  const commentStart = css.lastIndexOf('/* ==========================================================================', startIdx);
  const replaceStart = commentStart !== -1 ? commentStart : startIdx;
  css = css.substring(0, replaceStart) + updatedDiffCSS + '\n\n' + css.substring(endIdx);
  fs.writeFileSync('src/index.css', css, 'utf8');
  console.log('Successfully updated index.css with exact touching large circles for WhatMakesUsDifferent!');
} else {
  console.error('Could not find markers in index.css');
}
