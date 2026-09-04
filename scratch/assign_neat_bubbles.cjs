const fs = require('fs');
const path = require('path');

const horizontalStatsPath = path.join(__dirname, '..', 'src', 'sections', 'HorizontalStats.jsx');
const indexCssPath = path.join(__dirname, '..', 'src', 'index.css');

const horizontalStatsContent = `import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from '../components/MagneticButton';
import { ASSETS } from '../utils/assets';

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalStats() {
  const containerRef = useRef(null);
  const listRef = useRef(null);
  const num1Ref = useRef(null);
  const num2Ref = useRef(null);
  const num3Ref = useRef(null);
  const num4Ref = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const list = listRef.current;
    if (!container || !list) return;

    // Theme trigger for salmon
    ScrollTrigger.create({
      trigger: container,
      start: () => \`top \${window.innerHeight / 2 + 10}\`,
      end: () => \`bottom \${window.innerHeight / 2 - 10}\`,
      onEnter: () => document.body.setAttribute('theme', 'salmon'),
      onEnterBack: () => document.body.setAttribute('theme', 'salmon')
    });

    // Horizontal scrub calculation
    const getScrollWidth = () => {
      let totalWidth = 0;
      const items = list.querySelectorAll('.horizontal__item');
      items.forEach(item => {
        totalWidth += item.offsetWidth;
      });
      return -(totalWidth - window.innerWidth + (window.innerWidth * 0.05));
    };

    const horizTween = gsap.to(list, {
      x: getScrollWidth,
      ease: "none",
      force3D: true
    });

    const scrollTriggerInstance = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom bottom",
      animation: horizTween,
      scrub: true,
      invalidateOnRefresh: true
    });

    // Subtle floating parallax for selected bubble images
    const imgs = container.querySelectorAll('.horizontal__img');
    const parallaxSpeeds = [25, -20, 30, -25, 20, -30, 25];
    imgs.forEach((img, idx) => {
      const speed = parallaxSpeeds[idx % parallaxSpeeds.length];
      gsap.to(img, {
        xPercent: speed,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          scrub: 1
        }
      });
    });

    // Counter animations triggered on horizontal container animation
    const animateCounter = (ref, targetVal, isDecimal, suffix) => {
      if (!ref.current) return;
      const obj = { val: 0 };
      gsap.to(obj, {
        val: targetVal,
        duration: 1.4,
        ease: "power2.out",
        onUpdate: () => {
          if (!ref.current) return;
          const display = isDecimal ? obj.val.toFixed(1) : Math.round(obj.val);
          ref.current.innerText = \`\${display}\${suffix}\`;
        },
        scrollTrigger: {
          trigger: ref.current,
          containerAnimation: horizTween,
          start: "left 75%",
          toggleActions: "play none none none"
        }
      });
    };

    animateCounter(num1Ref, 63, false, "%");
    animateCounter(num2Ref, 66, false, "%");
    animateCounter(num3Ref, 11, false, "%");

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.vars.trigger === container || t.vars.containerAnimation === horizTween) {
          t.kill();
        }
      });
    };
  }, []);

  const imgs = ASSETS.horizontal;

  return (
    <section
      ref={containerRef}
      className="section horizontal"
      this-theme="salmon"
      id="impact"
    >
      <div className="horizontal__sticky">
        <div ref={listRef} className="horizontal__list">

          {/* Slide 1: Main Heading Only in 2 lines */}
          <div className="horizontal__item is--first">
            <div className="horizontal__content is--left">
              <h3 className="f-96">
                THE INDUSTRY <br />
                CAN’T IGNORE THIS
              </h3>
            </div>
            <div className="horizontal__imgs">
              <div className="horizontal__img pos--1">
                <img src={imgs[0]} alt="Media" loading="eager" />
              </div>
            </div>
          </div>

          {/* Slide 2: 63% */}
          <div className="horizontal__item">
            <div className="horizontal__content">
              <div ref={num1Ref} className="f-140">63%</div>
              <div className="f-40">Music industry professionals experience depression.</div>
            </div>
            <div className="horizontal__imgs">
              <div className="horizontal__img pos--2">
                <img src={imgs[1]} alt="Media" loading="eager" />
              </div>
              <div className="horizontal__img pos--3">
                <img src={imgs[2]} alt="Media" loading="eager" />
              </div>
            </div>
          </div>

          {/* Slide 3: 66% */}
          <div className="horizontal__item">
            <div className="horizontal__content">
              <div ref={num2Ref} className="f-140">66%</div>
              <div className="f-40">Report significant anxiety symptoms</div>
            </div>
            <div className="horizontal__imgs">
              <div className="horizontal__img pos--4">
                <img src={imgs[5]} alt="Media" loading="eager" />
              </div>
            </div>
          </div>

          {/* Slide 4: 11% - Robot image removed, replaced with neat single bubble */}
          <div className="horizontal__item">
            <div className="horizontal__content">
              <div ref={num3Ref} className="f-140">11%</div>
              <div className="f-40">Experienced suicidal thoughts in the last year.</div>
            </div>
            <div className="horizontal__imgs">
              <div className="horizontal__img pos--5">
                <img src={imgs[9]} alt="Media" loading="eager" />
              </div>
            </div>
          </div>

          {/* Slide 5: 01 IN 6 */}
          <div className="horizontal__item">
            <div className="horizontal__content">
              <div ref={num4Ref} className="f-140">01 IN 6</div>
              <div className="f-40">Lost a colleague to suicide</div>
            </div>
            <div className="horizontal__imgs">
              <div className="horizontal__img pos--6">
                <img src={imgs[10]} alt="Media" loading="eager" />
              </div>
            </div>
          </div>

        </div>

        {/* Floating Bottom Button */}
        <div className="horizontal__btn--parent">
          <MagneticButton buttonStyle="yellow" href="#contact">
            Partner with us
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
`;

fs.writeFileSync(horizontalStatsPath, horizontalStatsContent, 'utf8');
console.log('HorizontalStats.jsx updated with neatly assigned floating bubbles!');

let css = fs.readFileSync(indexCssPath, 'utf8');
const startTag = '/* ==========================================================================\r\n   HORIZONTAL STATS (480vh pinned)\r\n   ========================================================================== */';
const startTagLF = '/* ==========================================================================\n   HORIZONTAL STATS (480vh pinned)\n   ========================================================================== */';
const endTag = '/* ==========================================================================\r\n   CORE VALUES / THE INDUSTRY IS CHANGING';
const endTagLF = '/* ==========================================================================\n   CORE VALUES / THE INDUSTRY IS CHANGING';

const neatBubblesHorizontalCss = `/* ==========================================================================
   HORIZONTAL STATS (480vh pinned)
   ========================================================================== */

.horizontal {
  height: 480vh;
  position: relative;
}

.horizontal__sticky {
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
}

.horizontal__list {
  display: flex;
  height: 100%;
  align-items: center;
  will-change: transform;
}

.horizontal__item {
  flex: none;
  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 40px;
  padding-right: 40px;
  position: relative;
  box-sizing: border-box;
}

.horizontal__item.is--first {
  width: 100vw;
  padding-left: 40px;
  padding-right: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  box-sizing: border-box;
}

.horizontal__item.is--first .horizontal__content {
  max-width: 90rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 0 auto;
}

.horizontal__item.is--first .f-96 {
  font-family: 'Staatliches', sans-serif;
  font-size: clamp(4.8rem, 10vw, 12.5rem);
  font-weight: 400;
  line-height: 0.94;
  letter-spacing: 0.02em;
  color: var(--black);
  text-align: center;
  margin: 0 auto;
}

.horizontal__content {
  max-width: 58rem;
  display: flex;
  flex-direction: column;
  gap: clamp(1rem, 2vw, 2rem);
  z-index: 2;
  position: relative;
}

.horizontal__content .f-140 {
  font-family: 'Staatliches', sans-serif;
  font-size: clamp(5.5rem, 11vw, 13.5rem);
  font-weight: 400;
  line-height: 0.95;
  letter-spacing: 0.02em;
  color: var(--white);
}

.horizontal__content .f-40 {
  font-family: 'Manrope', sans-serif;
  font-size: clamp(1.4rem, 2.2vw, 2.6rem);
  font-weight: 600;
  line-height: 1.35;
  letter-spacing: -0.01em;
  color: var(--black);
  max-width: 48rem;
}

/* Neatly Distributed Floating Bubbles */
.horizontal__imgs {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.horizontal__img {
  position: absolute;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.16);
  will-change: transform;
}

.horizontal__img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.horizontal__img.pos--1 {
  width: clamp(10rem, 14vw, 18rem);
  top: 14%;
  right: 12%;
}

.horizontal__img.pos--2 {
  width: clamp(8rem, 11vw, 14rem);
  bottom: 12%;
  right: 26%;
}

.horizontal__img.pos--3 {
  width: clamp(11rem, 15vw, 19rem);
  top: 16%;
  right: 10%;
}

.horizontal__img.pos--4 {
  width: clamp(12rem, 16vw, 20rem);
  top: 15%;
  right: 12%;
}

.horizontal__img.pos--5 {
  width: clamp(11rem, 15vw, 19rem);
  bottom: 12%;
  right: 14%;
}

.horizontal__img.pos--6 {
  width: clamp(10rem, 14vw, 17rem);
  top: 18%;
  right: 15%;
}

.horizontal__btn--parent {
  position: absolute;
  bottom: 4rem;
  left: calc(46 / var(--to-rem) * 100rem);
  z-index: 3;
}

@media screen and (max-width: 768px) {
  .horizontal__item {
    width: 100vw;
    padding-left: var(--page-padding-x);
    padding-right: var(--page-padding-x);
  }

  .horizontal__btn--parent {
    bottom: 2rem;
    left: var(--page-padding-x);
  }

  .horizontal__img.pos--1 { width: 8rem; top: 10%; right: 6%; }
  .horizontal__img.pos--2 { width: 7rem; bottom: 8%; right: 10%; }
  .horizontal__img.pos--3 { width: 9rem; top: 12%; right: 5%; }
  .horizontal__img.pos--4 { width: 8rem; top: 10%; right: 6%; }
  .horizontal__img.pos--5 { width: 8.5rem; bottom: 8%; right: 6%; }
  .horizontal__img.pos--6 { width: 8rem; top: 12%; right: 8%; }
}

`;

let startIdx = css.indexOf(startTag);
if (startIdx === -1) startIdx = css.indexOf(startTagLF);
let endIdx = css.indexOf(endTag);
if (endIdx === -1) endIdx = css.indexOf(endTagLF);

if (startIdx !== -1 && endIdx !== -1) {
  const updatedCss = css.substring(0, startIdx) + neatBubblesHorizontalCss + css.substring(endIdx);
  fs.writeFileSync(indexCssPath, updatedCss, 'utf8');
  console.log('index.css updated successfully with neat floating bubbles!');
} else {
  console.error('Could not find start or end tags in index.css');
}
