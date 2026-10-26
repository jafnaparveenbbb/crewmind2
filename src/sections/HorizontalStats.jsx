import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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

      // Reduced motion: skip the count-up and keep the final figures from the markup
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
          if (!ref.current || prefersReducedMotion) return;
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

      // MOBILE (< 768px): Pinned horizontal slide track with scroll-triggered animated counters
      mm.add("(max-width: 767px)", () => {
        const sticky = container.querySelector('.horizontal__sticky');
        if (!sticky) return;

        // Pacing in slide widths: each slide eases into place, then rests centred before the next one moves in
        const MOVE = 0.8;
        const DWELL = 0.45;
        const slideCount = list.children.length;
        const getSlideWidth = () => (list.children[0] ? list.children[0].offsetWidth : window.innerWidth);
        // Timeline position (in slide widths) where the move onto slide k + 1 begins
        const moveStart = (k) => DWELL + (k - 1) * (MOVE + DWELL);

        const tl = gsap.timeline({
          defaults: { ease: "none" }
        });

        // Step 1: Heading rests, then slides 2 -> 5 each ease in and dwell (slide 5 rests through the cover hold)
        for (let k = 1; k < slideCount; k++) {
          tl.to(list, {
            x: () => -k * getSlideWidth(),
            duration: MOVE,
            ease: "power2.inOut",
            force3D: true
          }, moveStart(k));
        }

        // Step 2: Resting hold beat as next section (#industry-changing) smoothly slides up over this section
        tl.to({}, { duration: window.innerHeight / getSlideWidth() });

        // Runway = timeline length in px, so the cover hold spans exactly one screen of scroll
        const updateSectionRunway = () => {
          const totalRunway = Math.round(tl.duration() * getSlideWidth());
          container.style.setProperty('height', `${totalRunway}px`, 'important');
          container.style.setProperty('min-height', `${totalRunway}px`, 'important');
          container.style.setProperty('z-index', '1');
        };

        updateSectionRunway();

        const st = ScrollTrigger.create({
          id: "impact-mobile-pin",
          trigger: container,
          pin: sticky,
          pinSpacing: false,
          start: "top top",
          end: "bottom top",
          scrub: 0.4,
          animation: tl,
          invalidateOnRefresh: true,
          onRefresh: () => {
            updateSectionRunway();
          }
        });

        if (!prefersReducedMotion) {
          if (num1Ref.current) num1Ref.current.innerText = "0%";
          if (num2Ref.current) num2Ref.current.innerText = "0%";
          if (num3Ref.current) num3Ref.current.innerText = "0%";
        }

        // Animated counters triggered by overall timeline progress
        const animatedFlags = { num1: false, num2: false, num3: false };

        const runCounter = (ref, targetVal, isDecimal, suffix) => {
          if (!ref.current) return;
          const obj = { val: 0 };
          gsap.to(obj, {
            val: targetVal,
            duration: 1.2,
            ease: "power2.out",
            onUpdate: () => {
              if (!ref.current) return;
              const display = isDecimal ? obj.val.toFixed(1) : Math.round(obj.val);
              ref.current.innerText = `${display}${suffix}`;
            },
            onComplete: () => {
              if (!ref.current) return;
              ref.current.innerText = `${targetVal}${suffix}`;
            }
          });
        };

        const counterTrigger = prefersReducedMotion ? null : ScrollTrigger.create({
          trigger: container,
          start: "top top",
          end: "bottom top",
          onUpdate: (self) => {
            // Scroll position expressed in timeline units (this trigger spans the same range as the pin)
            const t = self.progress * tl.duration();

            // Each count starts halfway through its slide's move in, and resets once scrolled back before that move
            const counters = [
              { flag: 'num1', ref: num1Ref, target: 63, decimal: false, k: 1 },
              { flag: 'num2', ref: num2Ref, target: 66, decimal: false, k: 2 },
              { flag: 'num3', ref: num3Ref, target: 28.9, decimal: true, k: 3 }
            ];
            counters.forEach(({ flag, ref, target, decimal, k }) => {
              if (t >= moveStart(k) + MOVE * 0.5 && !animatedFlags[flag]) {
                animatedFlags[flag] = true;
                runCounter(ref, target, decimal, "%");
              } else if (t < moveStart(k) && animatedFlags[flag]) {
                animatedFlags[flag] = false;
                if (ref.current) ref.current.innerText = "0%";
              }
            });
          }
        });

        return () => {
          if (st) st.kill();
          if (tl) tl.kill();
          if (counterTrigger) counterTrigger.kill();
          container.style.removeProperty('height');
          container.style.removeProperty('min-height');
          container.style.removeProperty('z-index');
          gsap.set(list, { clearProps: "all" });
          if (num1Ref.current) num1Ref.current.innerText = "63%";
          if (num2Ref.current) num2Ref.current.innerText = "66%";
          if (num3Ref.current) num3Ref.current.innerText = "28.9%";
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
