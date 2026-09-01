import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from '../components/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

export default function ClosingCTA() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    ScrollTrigger.create({
      trigger: section,
      start: () => `top ${window.innerHeight / 2}`,
      end: () => `bottom ${window.innerHeight / 2}`,
      onEnter: () => document.body.setAttribute('theme', 'footer-cta'),
      onEnterBack: () => document.body.setAttribute('theme', 'footer-cta')
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.vars.trigger === section) t.kill();
      });
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section 
      id="cta" 
      ref={sectionRef} 
      className="section" 
      this-theme="footer-cta"
    >
      <div className="container">
        <div className="cta">
          
          <div className="cta__row">
            
            {/* Title & Description */}
            <div style={{ maxWidth: '42rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="section-title">
                <h3 className="f-64">
                  Discover <br />
                  Significo.
                </h3>
              </div>
              <div className="section-descr">
                <p className="f-18">
                  Find out how Significo’s people-centered designs can make health technology more empowering.
                </p>
              </div>
            </div>

            {/* Rotating Circular Scroll Up Indicator */}
            <div className="cta__scroll--parent" onClick={scrollToTop} title="Scroll to top">
              <div className="cta__scroll">
                <div className="cta__scroll--text">
                  <svg viewBox="0 0 100 100" width="100%" height="100%">
                    <path
                      id="textPath"
                      d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                      fill="none"
                    />
                    <text font-size="10" font-weight="700" letter-spacing="2px" fill="currentColor">
                      <textPath href="#textPath">
                        SCROLL UP • SCROLL UP • SCROLL UP •
                      </textPath>
                    </text>
                  </svg>
                </div>
                <div className="cta__scroll--inner">
                  <svg width="100%" height="100%" viewBox="0 0 32 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 0.703124C16 9.53968 8.83656 16.7031 0 16.7031" stroke="black" strokeWidth="2.5"/>
                    <path d="M16 0.703124C16 9.53968 23.1634 16.7031 32 16.7031" stroke="black" strokeWidth="2.5"/>
                    <path d="M16 0.703125L16 37.2746" stroke="currentColor" strokeWidth="2.5"/>
                  </svg>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Button */}
          <div className="cta__btn">
            <MagneticButton buttonStyle="black" href="#about">
              Let’s go
            </MagneticButton>
          </div>

        </div>
      </div>
    </section>
  );
}
