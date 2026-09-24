import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Zap, Users, HeartPulse } from 'lucide-react';
import MagneticButton from '../components/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

export default function WhatMakesUsDifferent() {
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
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

    const ctx = gsap.context(() => {
      // Theme trigger for white
      ScrollTrigger.create({
        trigger: section,
        start: "top 60%",
        end: "bottom 40%",
        onEnter: () => document.body.setAttribute('theme', 'white'),
        onEnterBack: () => document.body.setAttribute('theme', 'white'),
        onLeaveBack: () => document.body.setAttribute('theme', 'navy')
      });

      const mm = gsap.matchMedia();

      // DESKTOP (>= 768px): 2x2 Grid & Floating Animations
      mm.add("(min-width: 768px)", () => {
        gsap.set(grid, { clearProps: "x,transform" });

        gsap.from(left.children, {
          opacity: 0,
          y: 35,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none reverse"
          }
        });

        const cards = [card1Ref.current, card2Ref.current, card3Ref.current, card4Ref.current].filter(Boolean);
        gsap.from(cards, {
          opacity: 0,
          scale: 0.88,
          y: 40,
          duration: 0.8,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none reverse"
          }
        });

        if (card1Ref.current) {
          gsap.to(card1Ref.current, {
            y: -10,
            x: 2,
            duration: 4.2,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true
          });
        }
        if (card2Ref.current) {
          gsap.to(card2Ref.current, {
            y: 10,
            x: -2,
            duration: 4.8,
            delay: -1.5,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true
          });
        }
        if (card3Ref.current) {
          gsap.to(card3Ref.current, {
            y: -8,
            x: -2,
            duration: 5.0,
            delay: -2.5,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true
          });
        }
        if (card4Ref.current) {
          gsap.to(card4Ref.current, {
            y: 9,
            x: 2,
            duration: 4.5,
            delay: -0.8,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true
          });
        }
      });

      // MOBILE (< 768px): Horizontal Moving Card Track matching HorizontalStats
      mm.add("(max-width: 767px)", () => {
        const cards = [card1Ref.current, card2Ref.current, card3Ref.current, card4Ref.current].filter(Boolean);
        gsap.set(cards, { clearProps: "all" });
        gsap.set(grid, { clearProps: "all", x: 0 });

        const getScrollWidth = () => {
          return -(grid.scrollWidth - window.innerWidth + 40);
        };

        const horizTween = gsap.to(grid, {
          x: getScrollWidth,
          ease: "none",
          force3D: true
        });

        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          animation: horizTween,
          scrub: 0.5,
          invalidateOnRefresh: true
        });

        if (left) {
          gsap.from(left.children, {
            opacity: 0,
            y: 20,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          });
        }
      });

    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  const itemsData = [
    {
      ref: card1Ref,
      icon: Shield,
      title: "Present During Tours & Productions",
      desc: "Proactive psychological presence for touring crews wherever live shows travel."
    },
    {
      ref: card2Ref,
      icon: Zap,
      title: "Available In High-Pressure Moments",
      desc: "Real-time support during demanding show days and grueling turnarounds."
    },
    {
      ref: card3Ref,
      icon: Users,
      title: "Embedded Within Team Environment",
      desc: "Integrated naturally into daily backstage rhythm to foster organic trust."
    },
    {
      ref: card4Ref,
      icon: HeartPulse,
      title: "Focused On Prevention First",
      desc: "Stopping burnout, chronic stress, and exhaustion before emergencies emerge."
    }
  ];

  return (
    <section
      ref={sectionRef}
      className="section ovals-diff-section"
      this-theme="white"
      id="what-makes-us-different"
    >
      <div ref={stickyRef} className="ovals-diff__sticky">
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

            {/* Right Column: 2x2 Large Touching Circles */}
            <div ref={gridRef} className="ovals-diff__grid">
              {itemsData.map((item, idx) => {
                const IconComp = item.icon;
                return (
                  <div key={idx} ref={item.ref} className="diff-core-circle">
                    <div className="diff-core-circle__inner">
                      {IconComp && (
                        <div className="diff-core-circle__icon-wrap">
                          <IconComp className="diff-core-circle__icon" strokeWidth={1.8} />
                        </div>
                      )}
                      <h3 className="diff-core-circle__title">{item.title}</h3>
                      {item.desc && <p className="diff-core-circle__desc">{item.desc}</p>}
                    </div>
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
