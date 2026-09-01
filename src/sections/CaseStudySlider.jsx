import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from '../components/MagneticButton';
import { ASSETS } from '../utils/assets';

gsap.registerPlugin(ScrollTrigger);

export default function CaseStudySlider() {
  const containerRef = useRef(null);
  const splitRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const cases = ASSETS.caseStudies;

  useEffect(() => {
    const container = containerRef.current;
    const split = splitRef.current;
    if (!container || !split) return;

    const themes = ["light-purple", "light-blue", "tan"];

    // Pinned ScrollTrigger with sufficient scroll distance and a clean hold state
    const st = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom bottom",
      pin: split,
      pinSpacing: false,
      scrub: 0.5,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const progress = self.progress;
        let index = 0;
        if (progress >= 0.60) {
          index = 2; // Case 3: holds from 0.60 to 1.00
        } else if (progress >= 0.28) {
          index = 1; // Case 2
        } else {
          index = 0; // Case 1
        }
        setActiveIndex(index);
        document.body.setAttribute('theme', themes[index]);
      }
    });

    return () => {
      st.kill();
    };
  }, []);

  const activeCase = cases[activeIndex] || cases[0];

  return (
    <section 
      ref={containerRef} 
      className="section slider" 
      this-theme={activeCase.theme}
      id="casestudies"
    >
      <div className="container">
        <div ref={splitRef} className="slider__split">
          
          {/* Left Side Info */}
          <div className="slider__left">
            <div>
              <div className="slider__subtitle">
                <div className="slider__subtitle--circle"></div>
                <span className="f-14 is--700 caps">Casestudy</span>
              </div>

              <div className="slider__titles">
                {cases.map((c, idx) => (
                  <div key={idx} className={`slider__title--item ${activeIndex === idx ? 'active' : ''}`}>
                    <h3 className="f-64">{c.title}</h3>
                  </div>
                ))}
              </div>
            </div>

            <div className="slider__bot">
              <div className="slider__cta">
                <div className="slider__cta--imgs">
                  {activeCase.team.map((member, mIdx) => (
                    <div key={mIdx} className="slider__img--parent">
                      <div className="slider__tooltip">
                        <div className="f-14 is--700">{member.name}</div>
                        <div className="f-14 is--400">{member.role}</div>
                      </div>
                      <div className="slider__cta--img">
                        <img src={member.img} alt={member.name} loading="lazy" />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="f-18" style={{ marginTop: '1rem' }}>
                  Read about our work having this impact.
                </div>
              </div>

              <div style={{ marginTop: '1.5rem' }}>
                <MagneticButton buttonStyle="yellow" href={activeCase.link}>
                  learn more
                </MagneticButton>
              </div>
            </div>
          </div>

          {/* Right Side: Angled Card Deck */}
          <div className="slider__right">
            <div className="slider__list">
              {cases.map((c, idx) => {
                const offsetIndex = idx - activeIndex;
                return (
                  <div 
                    key={idx}
                    className={`slider__item ${activeIndex === idx ? 'active' : ''}`}
                    style={{
                      "--index": offsetIndex,
                      zIndex: cases.length - Math.abs(offsetIndex)
                    }}
                  >
                    <img src={c.image} alt={c.title} loading="eager" />
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
