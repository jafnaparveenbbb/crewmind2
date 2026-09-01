import React, { useEffect, useRef } from 'react';
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

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    const container = containerRef.current;
    const list = listRef.current;
    if (!container || !list) return;

    // Theme trigger for salmon
    ScrollTrigger.create({
      trigger: container,
      start: () => `top ${window.innerHeight / 2 + 10}`,
      end: () => `bottom ${window.innerHeight / 2 - 10}`,
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

    // Floating Parallax Images
    const imgs = container.querySelectorAll('.horizontal__img');
    const parallaxSpeeds = [25, -30, 40, -20, 35, -45, 30, -35, 45, -25, 35, -40];
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
        duration: 1.5,
        ease: "power2.out",
        onUpdate: () => {
          if (!ref.current) return;
          const display = isDecimal ? obj.val.toFixed(1) : Math.round(obj.val);
          ref.current.innerText = `${display} ${suffix}`;
        },
        scrollTrigger: {
          trigger: ref.current,
          containerAnimation: horizTween,
          start: "left 75%",
          toggleActions: "play none none none"
        }
      });
    };

    animateCounter(num1Ref, 20.4, true, "M");
    animateCounter(num2Ref, 43, false, "%");
    animateCounter(num3Ref, 13, false, "");

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
      id="about"
    >
      <div className="horizontal__sticky">
        <div ref={listRef} className="horizontal__list">

          {/* Slide 1: Real Talk, Real Impact */}
          <div className="horizontal__item">
            <div className="horizontal__content is--left">
              <h3 className="f-96">
                Real Talk, <br />
                Real Impact
              </h3>
            </div>
            <div className="horizontal__imgs">
              <div className="horizontal__img is--1">
                <img src={imgs[0]} alt="Impact visual" loading="eager" />
              </div>
            </div>
          </div>

          {/* Slide 2: 20.4 M */}
          <div className="horizontal__item">
            <div className="horizontal__content">
              <div ref={num1Ref} className="f-140">20.4 M</div>
              <div className="f-40">Real people — real lives — we have built products and solutions for.</div>
            </div>
            <div className="horizontal__imgs">
              <div className="horizontal__img is--2"><img src={imgs[1]} alt="Media" loading="eager" /></div>
              <div className="horizontal__img is--3"><img src={imgs[2]} alt="Media" loading="eager" /></div>
              <div className="horizontal__img is--4"><img src={imgs[3]} alt="Media" loading="eager" /></div>
              <div className="horizontal__img is--5"><img src={imgs[4]} alt="Media" loading="eager" /></div>
            </div>
          </div>

          {/* Slide 3: 43% */}
          <div className="horizontal__item">
            <div className="horizontal__content">
              <div ref={num2Ref} className="f-140">43%</div>
              <div className="f-40">Expert Women in Tech.</div>
            </div>
            <div className="horizontal__imgs">
              <div className="horizontal__img is--6"><img src={imgs[5]} alt="Media" loading="eager" /></div>
              <div className="horizontal__img is--7"><img src={imgs[6]} alt="Media" loading="eager" /></div>
              <div className="horizontal__img is--8"><img src={imgs[7]} alt="Media" loading="eager" /></div>
            </div>
          </div>

          {/* Slide 4: 13 */}
          <div className="horizontal__item">
            <div className="horizontal__content">
              <div ref={num3Ref} className="f-140">13</div>
              <div className="f-40">Nationalities Represented on Our Team.</div>
            </div>
            <div className="horizontal__imgs">
              <div className="horizontal__img is--9"><img src={imgs[8]} alt="Media" loading="eager" /></div>
              <div className="horizontal__img is--10"><img src={imgs[9]} alt="Media" loading="eager" /></div>
              <div className="horizontal__img is--11"><img src={imgs[10]} alt="Media" loading="eager" /></div>
              <div className="horizontal__img is--12"><img src={imgs[11]} alt="Media" loading="eager" /></div>
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
