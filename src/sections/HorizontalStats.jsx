import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from '../components/MagneticButton';
import { ASSETS, CREW_IMAGES } from '../utils/assets';

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

    const ctx = gsap.context(() => {
      // Theme trigger for white
      ScrollTrigger.create({
        trigger: container,
        start: "top 50%",
        end: "bottom 50%",
        onEnter: () => document.body.setAttribute('theme', 'white'),
        onEnterBack: () => document.body.setAttribute('theme', 'white'),
        onLeaveBack: () => document.body.setAttribute('theme', 'light-blue')
      });

      // Horizontal scrub calculation
      const getScrollWidth = () => {
        return -(list.scrollWidth - window.innerWidth + 80);
      };

      const horizTween = gsap.to(list, {
        x: getScrollWidth,
        ease: "none",
        force3D: true
      });

      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        animation: horizTween,
        scrub: 0.8,
        invalidateOnRefresh: true
      });

      // Subtle floating parallax for bubble images
      const imgs = container.querySelectorAll('.horizontal__img');
      const parallaxSpeeds = [16, -14, 18, -16, 14, -18];
      imgs.forEach((img, idx) => {
        const speed = parallaxSpeeds[idx % parallaxSpeeds.length];
        gsap.to(img, {
          yPercent: speed,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.8
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
            ref.current.innerText = `${display}${suffix}`;
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

    }, container);

    return () => {
      ctx.revert();
    };
  }, []);

  const imgs = CREW_IMAGES || ASSETS.horizontal;

  return (
    <section
      ref={containerRef}
      className="section horizontal"
      this-theme="white"
      id="impact"
    >
      <div className="horizontal__sticky">
        <div ref={listRef} className="horizontal__list">

          {/* Slide 1: Main Heading (Centered at Section Start) */}
          <div className="horizontal__item is--first">
            <div className="horizontal__content is--heading-center">
              <h3 className="f-96">
                THE INDUSTRY <br />
                CAN’T IGNORE THIS
              </h3>
            </div>
          </div>

          {/* Slide 2: 63% (crewimg1 & crewimg2) */}
          <div className="horizontal__item">
            <div className="horizontal__layout">
              <div className="horizontal__imgs-wrap">
                <div className="horizontal__img bubble--top">
                  <img src={imgs[0]} alt="Crew 1" loading="eager" />
                </div>
                <div className="horizontal__img bubble--bottom">
                  <img src={imgs[1]} alt="Crew 2" loading="eager" />
                </div>
              </div>
              <div className="horizontal__content">
                <div ref={num1Ref} className="f-140">63%</div>
                <div className="f-40">
                  Music industry professionals
                  <br />
                  experience depression.
                </div>
              </div>
            </div>
          </div>

          {/* Slide 3: 66% (crewimg3 & crewimg4) */}
          <div className="horizontal__item">
            <div className="horizontal__layout">
              <div className="horizontal__imgs-wrap">
                <div className="horizontal__img bubble--top">
                  <img src={imgs[2]} alt="Crew 3" loading="eager" />
                </div>
                <div className="horizontal__img bubble--bottom">
                  <img src={imgs[3]} alt="Crew 4" loading="eager" />
                </div>
              </div>
              <div className="horizontal__content">
                <div ref={num2Ref} className="f-140">66%</div>
                <div className="f-40">
                  Report significant
                  <br />
                  anxiety symptoms.
                </div>
              </div>
            </div>
          </div>

          {/* Slide 4: 11% (crewimg5) */}
          <div className="horizontal__item">
            <div className="horizontal__layout">
              <div className="horizontal__imgs-wrap single-bubble">
                <div className="horizontal__img bubble--single">
                  <img src={imgs[4]} alt="Crew 5" loading="eager" />
                </div>
              </div>
              <div className="horizontal__content">
                <div ref={num3Ref} className="f-140">11%</div>
                <div className="f-40">
                  Experienced suicidal thoughts
                  <br />
                  in the last year.
                </div>
              </div>
            </div>
          </div>

          {/* Slide 5: 01 IN 6 (crewimg6) */}
          <div className="horizontal__item">
            <div className="horizontal__layout">
              <div className="horizontal__imgs-wrap single-bubble">
                <div className="horizontal__img bubble--single">
                  <img src={imgs[5]} alt="Crew 6" loading="eager" />
                </div>
              </div>
              <div className="horizontal__content">
                <div ref={num4Ref} className="f-140">01 IN 6</div>
                <div className="f-40">
                  Lost a colleague
                  <br />
                  to suicide.
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Floating Bottom Button */}
        <div className="horizontal__btn--parent">
          <MagneticButton buttonStyle="black" href="#contact">
            Partner with us
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
