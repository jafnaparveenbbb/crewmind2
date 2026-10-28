import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { stickyEnd } from '../utils/stickyEnd';

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
      // Theme trigger for navy (#00063D) background
      ScrollTrigger.create({
        trigger: container,
        start: "top 50%",
        end: "bottom 50%",
        onEnter: () => document.body.setAttribute('theme', 'navy'),
        onEnterBack: () => document.body.setAttribute('theme', 'navy'),
        onLeave: () => document.body.setAttribute('theme', 'white'),
        onLeaveBack: () => document.body.setAttribute('theme', 'white')
      });

      const mm = gsap.matchMedia();

      // DESKTOP & TABLET (>= 768px): Original horizontal pinned scrub experience
      mm.add("(min-width: 768px)", () => {
        const getScrollWidth = () => {
          return -(list.scrollWidth - window.innerWidth);
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
            onComplete: () => {
              if (!ref.current) return;
              ref.current.innerText = `${targetVal}${suffix}`;
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
        animateCounter(num3Ref, 28.9, true, "%");
      });

      // MOBILE (< 768px): Same pinned horizontal track, one full-width slide per statistic.
      // Each slide arrives, its counter finishes exactly as it lands, then holds before the next move.
      // Counters are scroll-linked so reverse scrolling retraces the same numbers.
      mm.add("(max-width: 767px)", () => {
        const items = list.querySelectorAll('.horizontal__item');
        const counters = [
          null,
          { ref: num1Ref, target: 63, isDecimal: false },
          { ref: num2Ref, target: 66, isDecimal: false },
          { ref: num3Ref, target: 28.9, isDecimal: true },
          null
        ];

        const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });

        // Opening beat: heading holds centred as the section pins
        tl.to({}, { duration: 0.3 });

        for (let i = 1; i < items.length; i++) {
          tl.to(list, {
            x: () => -(items[i].offsetLeft - items[0].offsetLeft),
            duration: 1,
            force3D: true
          });

          const counter = counters[i];
          if (counter && counter.ref.current) {
            const el = counter.ref.current;
            const obj = { val: 0 };
            const render = () => {
              const display = counter.isDecimal ? obj.val.toFixed(1) : Math.round(obj.val);
              el.innerText = `${display}%`;
            };
            render();
            // Starts once the slide is entering view and lands with it
            tl.to(obj, {
              val: counter.target,
              duration: 0.7,
              ease: "power1.out",
              onUpdate: render
            }, "<0.3");
          }

          // Hold so the statistic is the sole focus before the next transition (or the release)
          tl.to({}, { duration: 0.5 });
        }

        ScrollTrigger.create({
          trigger: container,
          start: "top top",
          end: stickyEnd(container, container.querySelector('.horizontal__sticky') || container),
          animation: tl,
          scrub: 0.25,
          invalidateOnRefresh: true
        });

        return () => {
          // Restore the real figures for the desktop branch
          counters.forEach((counter) => {
            if (counter && counter.ref.current) {
              counter.ref.current.innerText = `${counter.target}%`;
            }
          });
        };
      });

    }, container);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="section horizontal"
      this-theme="navy"
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

          {/* Slide 2: 63% */}
          <div className="horizontal__item">
            <div className="horizontal__content">
              <div ref={num1Ref} className="f-140">63%</div>
              <div className="f-40">
                Music industry professionals
                <br />
                experience depression.
              </div>
            </div>
          </div>

          {/* Slide 3: 66% */}
          <div className="horizontal__item">
            <div className="horizontal__content">
              <div ref={num2Ref} className="f-140">66%</div>
              <div className="f-40">
                Report significant
                <br />
                anxiety symptoms.
              </div>
            </div>
          </div>

          {/* Slide 4: 28.9% */}
          <div className="horizontal__item">
            <div className="horizontal__content">
              <div ref={num3Ref} className="f-140">28.9%</div>
              <div className="f-40">
                Experienced suicidal thoughts
                <br />
                in the last year.
              </div>
            </div>
          </div>

          {/* Slide 5: 1 in 6 */}
          <div className="horizontal__item">
            <div className="horizontal__content">
              <div ref={num4Ref} className="f-140">1 in 6</div>
              <div className="f-40">
                Lost a colleague
                <br />
                to suicide.
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
