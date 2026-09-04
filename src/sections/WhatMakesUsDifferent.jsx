import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Smile, Zap, Rocket, ShieldCheck } from 'lucide-react';
import MagneticButton from '../components/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

export default function WhatMakesUsDifferent() {
  const sectionRef = useRef(null);
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

    // Theme trigger for yellow
    const stTheme = ScrollTrigger.create({
      trigger: section,
      start: "top 60%",
      end: "bottom 40%",
      onEnter: () => document.body.setAttribute('theme', 'yellow'),
      onEnterBack: () => document.body.setAttribute('theme', 'yellow')
    });

    const ctx = gsap.context(() => {
      // 1. Left side entrance reveal (Untouched)
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

      // 2. Right 4 circular cards entrance animation
      const cards = [card1Ref.current, card2Ref.current, card3Ref.current, card4Ref.current].filter(Boolean);
      gsap.from(cards, {
        opacity: 0,
        scale: 0.85,
        y: 50,
        duration: 1.1,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: grid,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      // 3. Smooth, organic floating animation for all 4 circles with subtle depth
      if (card1Ref.current) {
        gsap.to(card1Ref.current, {
          y: -12,
          x: 2,
          rotation: -0.5,
          duration: 4.2,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true
        });
      }
      if (card2Ref.current) {
        gsap.to(card2Ref.current, {
          y: 12,
          x: -3,
          rotation: 0.7,
          duration: 4.8,
          delay: -1.5,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true
        });
      }
      if (card3Ref.current) {
        gsap.to(card3Ref.current, {
          y: -9,
          x: -2,
          rotation: 0.5,
          duration: 5.2,
          delay: -2.8,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true
        });
      }
      if (card4Ref.current) {
        gsap.to(card4Ref.current, {
          y: 11,
          x: 2,
          rotation: -0.6,
          duration: 4.4,
          delay: -0.8,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true
        });
      }
    }, section);

    return () => {
      stTheme.kill();
      ctx.revert();
    };
  }, []);

  const itemsData = [
    {
      ref: card1Ref,
      icon: Smile,
      title: "PRESENT DURING TOURS AND PRODUCTIONS",
      desc: "Providing real-time psychological support embedded directly into live tour routes and active production schedules."
    },
    {
      ref: card2Ref,
      icon: Zap,
      title: "AVAILABLE IN HIGH PRESSURE MOMENTS",
      desc: "Immediate, on-demand grounding and crisis prevention during peak performance and high-stress show days."
    },
    {
      ref: card3Ref,
      icon: Rocket,
      title: "EMBEDDED WITHIN THE TEAM ENVIRONMENT",
      desc: "Fostering deep trust with crew and artists as an integrated, everyday presence across all departments."
    },
    {
      ref: card4Ref,
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
          
          {/* Left Column: Heading & CTA (Untouched) */}
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

          {/* Right Column: 2x2 Large Touching Circles Matching Significo Reference */}
          <div ref={gridRef} className="ovals-diff__grid">
            {itemsData.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div key={idx} ref={item.ref} className="diff-core-circle">
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
