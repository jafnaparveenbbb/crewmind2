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

    const ctx = gsap.context(() => {
      // 1. Theme trigger
      ScrollTrigger.create({
        trigger: section,
        start: "top 60%",
        end: "bottom 40%",
        onEnter: () => document.body.setAttribute('theme', 'white'),
        onEnterBack: () => document.body.setAttribute('theme', 'white'),
        onLeaveBack: () => document.body.setAttribute('theme', 'white')
      });

      // 2. Smooth Section Entry Animation
      const textWrap = section.querySelector('.cta__text-wrap');
      const scrollBadge = section.querySelector('.cta__scroll--parent');
      const ctaBtn = section.querySelector('.cta__btn');

      if (textWrap) {
        gsap.fromTo(textWrap.children,
          {
            opacity: 0,
            y: 45
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.14,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 75%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      if (scrollBadge) {
        gsap.fromTo(scrollBadge,
          {
            opacity: 0,
            scale: 0.75,
            rotate: -60
          },
          {
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: 1.1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: section,
              start: "top 72%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      if (ctaBtn) {
        gsap.fromTo(ctaBtn,
          {
            opacity: 0,
            y: 35
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 68%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    }, section);

    return () => {
      ctx.revert();
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
      this-theme="white"
    >
      <div className="container">
        <div className="cta">

          <div className="cta__row">

            {/* Title & Description */}
            <div className="cta__text-wrap">
              <div className="section-title">
                <h3 className="f-64">
                  Strong productions <br />
                  start with strong people.
                </h3>
              </div>
              <div className="section-descr">
                <p className="f-18">
                  Whether you're managing an artist, a festival, a concert tour, or a production team, Crewmind helps protect the people behind the performance.
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
                    <text fontSize="10" fontWeight="700" letterSpacing="2px" fill="currentColor">
                      <textPath href="#textPath">
                        SCROLL UP • SCROLL UP • SCROLL UP •
                      </textPath>
                    </text>
                  </svg>
                </div>
                <div className="cta__scroll--inner">
                  <svg width="100%" height="100%" viewBox="0 0 32 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 0.703124C16 9.53968 8.83656 16.7031 0 16.7031" stroke="currentColor" strokeWidth="2.5" />
                    <path d="M16 0.703124C16 9.53968 23.1634 16.7031 32 16.7031" stroke="currentColor" strokeWidth="2.5" />
                    <path d="M16 0.703125L16 37.2746" stroke="currentColor" strokeWidth="2.5" />
                  </svg>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Button */}
          <div className="cta__btn">
            <MagneticButton buttonStyle="black" href="#contact">
              Book a Call Now
            </MagneticButton>
          </div>

        </div>
      </div>
    </section>
  );
}
