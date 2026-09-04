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
      // Left side entrance reveal
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

      // Right 4 circular cards entrance animation
      const cards = grid.querySelectorAll('.diff-core-circle');
      gsap.from(cards, {
        opacity: 0,
        scale: 0.75,
        y: 60,
        duration: 1.1,
        stagger: 0.14,
        ease: "back.out(1.4)",
        scrollTrigger: {
          trigger: grid,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });
    }, section);

    return () => {
      stTheme.kill();
      ctx.revert();
    };
  }, []);

  const itemsData = [
    {
      icon: Smile,
      title: "PRESENT DURING TOURS AND PRODUCTIONS",
      desc: "Providing real-time psychological support embedded directly into live tour routes and active production schedules."
    },
    {
      icon: Zap,
      title: "AVAILABLE IN HIGH PRESSURE MOMENTS",
      desc: "Immediate, on-demand grounding and crisis prevention during peak performance and high-stress show days."
    },
    {
      icon: Rocket,
      title: "EMBEDDED WITHIN THE TEAM ENVIRONMENT",
      desc: "Fostering deep trust with crew and artists as an integrated, everyday presence across all departments."
    },
    {
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
          
          {/* Left Column: Heading & CTA */}
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

          {/* Right Column: 2x2 Grid of 4 Black Circular Cards */}
          <div ref={gridRef} className="ovals-diff__grid">
            {itemsData.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div key={idx} className="diff-core-circle">
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
console.log('Successfully updated WhatMakesUsDifferent.jsx with 4 circular cards and new heading!');

// 2. Update index.css
let css = fs.readFileSync('src/index.css', 'utf8');

const updatedDiffCSS = `/* ==========================================================================
   WHAT MAKES US DIFFERENT (Significo Core Values 2x2 Circle Grid Layout)
   ========================================================================== */

.ovals-diff-section {
  position: relative;
  width: 100%;
  padding-block: clamp(5.5rem, 9vw, 11rem);
  background-color: var(--yellow);
  color: var(--black);
  z-index: 10;
  overflow: hidden;
  transition: background-color var(--bg-timing), color var(--bg-timing);
}

.ovals-diff__layout {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: clamp(3rem, 6vw, 7rem);
  width: 100%;
}

.ovals-diff__left {
  flex: 1;
  max-width: clamp(24rem, 34vw, 38rem);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  gap: clamp(1.4rem, 2.4vh, 2.2rem);
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
  font-size: clamp(2.8rem, 4.4vw, 5.2rem);
  font-weight: 400;
  line-height: 0.96;
  letter-spacing: 0.02em;
  color: var(--black);
  text-align: left;
}

.ovals-diff__subpara {
  font-family: 'Manrope', sans-serif;
  font-size: clamp(1.05rem, 1.25vw, 1.35rem);
  font-weight: 500;
  line-height: 1.6;
  letter-spacing: -0.01em;
  color: rgba(0, 0, 0, 0.82);
  max-width: 32rem;
  text-align: left;
}

.ovals-diff__btn-wrap {
  margin-top: 0.5rem;
}

/* 2x2 Grid of 4 Black Circular Cards */
.ovals-diff__grid {
  flex: 1.2;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: clamp(1.5rem, 2.6vw, 3.2rem);
  justify-items: center;
  align-items: center;
}

.diff-core-circle {
  width: 100%;
  max-width: clamp(17rem, 22vw, 25rem);
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  background-color: var(--black);
  color: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(1.8rem, 2.6vw, 3.4rem);
  box-sizing: border-box;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.28);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
  position: relative;
  text-align: center;
}

.diff-core-circle:hover {
  transform: translateY(-8px) scale(1.03);
  box-shadow: 0 35px 85px rgba(0, 0, 0, 0.4);
}

.diff-core-circle__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: clamp(0.7rem, 1.2vh, 1.2rem);
  width: 100%;
  max-width: 90%;
  box-sizing: border-box;
}

.diff-core-circle__icon-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--yellow);
  margin-bottom: 0.2rem;
}

.diff-core-circle__icon {
  width: clamp(2.6rem, 3.4vw, 4.2rem);
  height: clamp(2.6rem, 3.4vw, 4.2rem);
  color: var(--yellow);
  stroke: var(--yellow);
}

.diff-core-circle__title {
  font-family: 'Manrope', sans-serif;
  font-size: clamp(1.05rem, 1.3vw, 1.45rem);
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -0.01em;
  color: var(--yellow);
  text-transform: uppercase;
  max-width: 16rem;
  margin: 0 auto;
}

.diff-core-circle__desc {
  font-family: 'Manrope', sans-serif;
  font-size: clamp(0.82rem, 0.95vw, 1.05rem);
  font-weight: 400;
  line-height: 1.45;
  letter-spacing: -0.01em;
  color: rgba(255, 255, 255, 0.82);
  max-width: 15rem;
  margin: 0 auto;
}

@media screen and (max-width: 1080px) {
  .ovals-diff__layout {
    flex-direction: column;
    text-align: center;
    gap: 4rem;
  }

  .ovals-diff__left {
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
    max-width: 48rem;
  }
}

@media screen and (max-width: 640px) {
  .ovals-diff__grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .diff-core-circle {
    max-width: 22rem;
  }
}`;

const startIdx = css.indexOf('.ovals-diff-section');
const endIdx = css.indexOf('/* ==========================================================================\n   CASE STUDIES SLIDER');

if (startIdx !== -1 && endIdx !== -1) {
  const commentStart = css.lastIndexOf('/* ==========================================================================', startIdx);
  const replaceStart = commentStart !== -1 ? commentStart : startIdx;
  css = css.substring(0, replaceStart) + updatedDiffCSS + '\n\n' + css.substring(endIdx);
  fs.writeFileSync('src/index.css', css, 'utf8');
  console.log('Successfully updated index.css with 2x2 grid layout and styles!');
} else {
  console.error('Could not find markers in index.css');
}
