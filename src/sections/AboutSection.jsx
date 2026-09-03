import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Theme trigger for white background
    const stTheme = ScrollTrigger.create({
      trigger: section,
      start: "top 60%",
      end: "bottom 40%",
      onEnter: () => document.body.setAttribute('theme', 'white'),
      onEnterBack: () => document.body.setAttribute('theme', 'white')
    });

    // Subtle scroll reveal animation matching Significo aesthetic
    const ctx = gsap.context(() => {
      gsap.from([headingRef.current, paragraphRef.current], {
        opacity: 0,
        y: 35,
        duration: 1.1,
        stagger: 0.18,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
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

  return (
    <section 
      ref={sectionRef} 
      className="section about-section" 
      this-theme="white" 
      id="about"
    >
      <div className="container">
        {/* 1. Thin horizontal top border line */}
        <div className="about__top-border"></div>

        {/* 2. Small label with circular dot */}
        <div className="about__header">
          <div className="about__label">
            <span className="about__dot"></span>
            <span className="f-14 is--btn caps">MEET CREWMIND</span>
          </div>
        </div>

        {/* 3. 2-Column Main Content (Left: Large Heading, Right: Paragraph) */}
        <div className="about__grid">
          <div className="about__left">
            <h2 ref={headingRef} className="about__heading">
              WE'RE NOT A CLINIC,
              <br />
              NOT A HELPLINE.
            </h2>
          </div>
          <div className="about__right">
            <p ref={paragraphRef} className="about__paragraph">
              Crewmind is a women led UAE initiative focused on advancing psychological wellbeing within the entertainment industry. We are also collaborating with MHP India, we combine industry understanding with professional psychological support tailored for touring and live-event environments.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
