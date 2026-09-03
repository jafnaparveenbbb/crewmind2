import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from '../components/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

export default function WhatMakesUsDifferent() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const circlesRowRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const circlesRow = circlesRowRef.current;
    if (!section || !header || !circlesRow) return;

    // Theme trigger for white
    const stTheme = ScrollTrigger.create({
      trigger: section,
      start: "top 60%",
      end: "bottom 40%",
      onEnter: () => document.body.setAttribute('theme', 'white'),
      onEnterBack: () => document.body.setAttribute('theme', 'white')
    });

    const ctx = gsap.context(() => {
      // Header entrance animation
      gsap.from(header.children, {
        opacity: 0,
        y: 35,
        duration: 1.1,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      });

      // Dynamic "Coming" entrance animation for the perfect circle cards
      const circleCards = circlesRow.querySelectorAll('.diff-circle');
      gsap.from(circleCards, {
        opacity: 0,
        scale: 0.65,
        y: 90,
        duration: 1.2,
        stagger: 0.14,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: circlesRow,
          start: "top 82%",
          toggleActions: "play none none reverse"
        }
      });
    }, section);

    return () => {
      stTheme.kill();
      ctx.revert();
    };
  }, []);

  const itemsData = [
    {
      num: "01",
      title: "PRESENT DURING TOURS AND PRODUCTIONS"
    },
    {
      num: "02",
      title: "AVAILABLE IN HIGH PRESSURE MOMENTS"
    },
    {
      num: "03",
      title: "EMBEDDED WITHIN THE TEAM ENVIRONMENT"
    },
    {
      num: "04",
      title: "FOCUSED ON PREVENTION, NOT JUST INTERVENTION"
    },
    {
      num: "05",
      title: "BUILT SPECIFICALLY FOR LIVE ENTERTAINMENT"
    }
  ];

  return (
    <section 
      ref={sectionRef} 
      className="section ovals-diff-section" 
      this-theme="white" 
      id="what-makes-us-different"
    >
      <div className="container">
        
        {/* Top Centered Header */}
        <div ref={headerRef} className="ovals-diff__header">
          <div className="ovals-diff__tag">
            <span className="diff__dot"></span>
            <span className="f-14 is--btn caps">WHAT MAKES US DIFFERENT</span>
          </div>

          <h2 className="ovals-diff__heading">
            MOST MENTAL HEALTH SUPPORT BEGINS WHEN SOMEONE ASKS FOR HELP.
            <br />
            WE WORK BEFORE THAT HAPPENS.
          </h2>

          <div className="ovals-diff__btn-wrap">
            <MagneticButton buttonStyle="yellow" href="#contact">
              LET'S PARTNER
            </MagneticButton>
          </div>
        </div>

        {/* Bottom 5 Perfect Circle Cards (Alternating one above, one below) */}
        <div ref={circlesRowRef} className="ovals-diff__circles-row">
          {itemsData.map((item, idx) => {
            const isBelow = idx % 2 !== 0; // 0, 2, 4 above; 1, 3 below
            return (
              <div 
                key={idx} 
                className={`diff-circle is--float-${idx + 1} ${isBelow ? 'is--below' : 'is--above'}`}
              >
                <div className="diff-circle__inner">
                  <span className="diff-circle__num">{item.num}</span>
                  <h3 className="diff-circle__title">{item.title}</h3>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
