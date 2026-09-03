import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CoreValues() {
  const sectionRef = useRef(null);
  const leftColRef = useRef(null);
  const cardsColRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const leftCol = leftColRef.current;
    const cardsCol = cardsColRef.current;
    if (!section || !leftCol || !cardsCol) return;

    // Theme trigger for yellow
    const stTheme = ScrollTrigger.create({
      trigger: section,
      start: "top 60%",
      end: "bottom 40%",
      onEnter: () => document.body.setAttribute('theme', 'yellow'),
      onEnterBack: () => document.body.setAttribute('theme', 'yellow')
    });

    const ctx = gsap.context(() => {
      // Left side entrance
      gsap.from(leftCol.children, {
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

      // Capsule Cards entrance
      const capsules = cardsCol.querySelectorAll('.oval-capsule');
      gsap.from(capsules, {
        opacity: 0,
        y: 50,
        duration: 1.1,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: cardsCol,
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      });
    }, section);

    return () => {
      stTheme.kill();
      ctx.revert();
    };
  }, []);

  const valuesData = [
    {
      num: "01",
      title: <>BETTER CREW<br />RETENTION</>,
      desc: "Supporting long-term retention and workforce sustainability for touring teams."
    },
    {
      num: "02",
      title: <>STRONGER TEAM<br />RESILIENCE</>,
      desc: "Empowering crews to navigate high-pressure live production environments."
    },
    {
      num: "03",
      title: <>IMPROVED OPERATIONAL<br />STABILITY</>,
      desc: "Minimizing disruptions and ensuring smooth, predictable show-critical operations."
    },
    {
      num: "04",
      title: <>REDUCED BURNOUT<br />RISK</>,
      desc: "Preventative psychological care to mitigate exhaustion and sustain peak performance."
    }
  ];

  return (
    <section 
      ref={sectionRef} 
      className="section core-values-section" 
      this-theme="yellow" 
      id="industry-changing"
    >
      <div className="container">
        
        <div className="core-values__layout">
          
          {/* Left Sticky Column: Tag, Main Heading & Paragraph */}
          <div ref={leftColRef} className="core-values__left">
            <div className="core-values__tag">
              <span className="core-values__dot"></span>
              <span className="f-14 is--btn caps">THE INDUSTRY IS CHANGING</span>
            </div>
            <h2 className="core-values__heading">
              THE INDUSTRY IS CHANGING
            </h2>
            <p className="core-values__subparagraph">
              The live entertainment industry is increasingly recognising the importance of psychological wellbeing, not just for individuals, but for team performance and retention.
            </p>
          </div>

          {/* Right Column: Alternating Sloped Oval Capsule Cards */}
          <div ref={cardsColRef} className="core-values__right">
            <div className="core-values__capsules-grid">
              {valuesData.map((val, idx) => {
                const isCircleTop = idx % 2 === 0;
                return (
                  <div 
                    key={idx} 
                    className={`oval-capsule is--float-${idx + 1} ${isCircleTop ? 'is--circle-top' : 'is--circle-bottom'}`}
                  >
                    {isCircleTop && (
                      <div className="oval-capsule__circle">
                        <span className="oval-capsule__num">{val.num}</span>
                      </div>
                    )}

                    <div className="oval-capsule__content-box">
                      <h3 className="oval-capsule__title">{val.title}</h3>
                      <p className="oval-capsule__desc">{val.desc}</p>
                    </div>

                    {!isCircleTop && (
                      <div className="oval-capsule__circle">
                        <span className="oval-capsule__num">{val.num}</span>
                      </div>
                    )}
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
