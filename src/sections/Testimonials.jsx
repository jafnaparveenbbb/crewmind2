import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ASSETS } from '../utils/assets';

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Theme trigger for clear/white
    ScrollTrigger.create({
      trigger: section,
      start: () => `top ${window.innerHeight / 2 + 10}`,
      end: () => `bottom ${window.innerHeight / 2 - 10}`,
      onEnter: () => document.body.setAttribute('theme', 'clear'),
      onEnterBack: () => document.body.setAttribute('theme', 'clear')
    });

    // Character/word highlight opacity scrub on scroll
    itemsRef.current.forEach((itemEl) => {
      if (!itemEl) return;
      const chars = itemEl.querySelectorAll('.t-char');
      if (!chars.length) return;

      gsap.fromTo(chars,
        { opacity: 0.15 },
        {
          opacity: 1,
          stagger: 0.015,
          ease: "none",
          scrollTrigger: {
            trigger: itemEl,
            start: "top 75%",
            end: "bottom 30%",
            scrub: true
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.vars.trigger === section) t.kill();
      });
    };
  }, []);

  const renderWords = (text) => {
    return text.split(' ').map((word, wIdx) => (
      <span key={wIdx} style={{ display: 'inline-block', whiteSpace: 'nowrap', marginRight: '0.3em' }}>
        {word.split('').map((char, cIdx) => (
          <span key={cIdx} className="t-char" style={{ display: 'inline-block', willChange: 'opacity' }}>
            {char}
          </span>
        ))}
      </span>
    ));
  };

  const testimonials = ASSETS.testimonials;

  return (
    <section
      ref={sectionRef}
      className="section"
      this-theme="clear"
      section-space=""
    >
      <div className="container">
        <div className="testimonials">
          <div className="testimonials__list">

            {/* Testimonial 1 - Miranda Ernst */}
            <div
              ref={el => itemsRef.current[0] = el}
              className="testimonials__item"
            >
              <div className="testimonials__descr">
                <p className="f-24">
                  {renderWords(testimonials[0].quote)}
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                <div className="testimonials__avatar">
                  <img src={testimonials[0].avatar} alt={testimonials[0].name} loading="lazy" />
                </div>
                <div>
                  <div className="f-24" style={{ color: 'var(--black)', fontWeight: 700 }}>
                    {testimonials[0].name}
                  </div>
                  <div className="f-18" style={{ color: '#666' }}>
                    {testimonials[0].role} @ {testimonials[0].company}
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 - Emek Altun */}
            <div
              ref={el => itemsRef.current[1] = el}
              className="testimonials__item"
            >
              <div className="testimonials__descr">
                <p className="f-24">
                  {renderWords(testimonials[1].quote)}
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                <div className="testimonials__avatar">
                  <img src={testimonials[1].avatar} alt={testimonials[1].name} loading="lazy" />
                </div>
                <div>
                  <div className="f-24" style={{ color: 'var(--black)', fontWeight: 700 }}>
                    {testimonials[1].name}
                  </div>
                  <div className="f-18" style={{ color: '#666' }}>
                    {testimonials[1].role} @ {testimonials[1].company}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
