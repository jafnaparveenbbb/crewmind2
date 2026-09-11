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

    const ctx = gsap.context(() => {
      // Full-range theme trigger for white background with zero flicker
      ScrollTrigger.create({
        trigger: section,
        start: "top 75%",
        end: "bottom 25%",
        onEnter: () => document.body.setAttribute('theme', 'white'),
        onEnterBack: () => document.body.setAttribute('theme', 'white'),
        onLeaveBack: () => document.body.setAttribute('theme', 'black')
      });

      // Smooth scroll entrance reveal
      gsap.from([headingRef.current, paragraphRef.current], {
        opacity: 0,
        y: 35,
        duration: 1.0,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      });
    }, section);

    return () => {
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
        {/* 2-Column Main Content (Left: Label & Large Heading, Right: Paragraph) */}
        <div className="about__grid">
          <div className="about__left">
            <div className="about__label">
              <span className="about__dot"></span>
              <span className="f-14 is--btn caps">MEET CREWMIND</span>
            </div>
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
