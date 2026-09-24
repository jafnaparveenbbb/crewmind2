import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from '../components/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

export default function IconCards() {
  const sectionRef = useRef(null);
  const cardsListRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const cardsList = cardsListRef.current;
    if (!section || !cardsList) return;

    const ctx = gsap.context(() => {
      // Theme trigger for white
      ScrollTrigger.create({
        trigger: section,
        start: "top 60%",
        end: "bottom 40%",
        onEnter: () => document.body.setAttribute('theme', 'white'),
        onEnterBack: () => document.body.setAttribute('theme', 'white'),
        onLeaveBack: () => document.body.setAttribute('theme', 'white')
      });

      // Each card activates as it enters the visible center of the viewport
      const cardItems = cardsList.querySelectorAll('.cards__item');
      cardItems.forEach((card, idx) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top 65%",
          end: "bottom 35%",
          onEnter: () => setActiveIndex(idx),
          onEnterBack: () => setActiveIndex(idx)
        });
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  const cardsData = [
    {
      title: "EMBEDDED TOUR SUPPORT",
      text: "Psychological support professionals integrated into touring environments."
    },
    {
      title: "ON-SITE EVENT SUPPORT",
      text: "Presence during concerts, festivals, and high-pressure productions."
    },
    {
      title: "CONFIDENTIAL 1:1 SUPPORT",
      text: "Private sessions for artists and crew members."
    },
    {
      title: "VIRTUAL SUPPORT ACCESS",
      text: "Professional support between tour dates and productions."
    },
    {
      title: "LEADERSHIP CONSULTATION",
      text: "Support for management teams focused on wellbeing and workforce sustainability."
    }
  ];

  return (
    <section
      id="solutions"
      ref={sectionRef}
      className="section icon-cards-section"
      this-theme="white"
    >
      <div className="container">
        <div className="cards">

          {/* Left Column Sticky Heading & CTA */}
          <div className="cards__left">
            <div className="section-heading">
              <div className="section-title">
                <h2 className="f-64">
                  WE DESIGNED SUPPORT FOR
                  <br />
                  LIVE PRODUCTIONS
                </h2>
              </div>
            </div>

            <div className="cards__btn">
              <MagneticButton buttonStyle="black" href="#contact">
                Book a Discovery Call
              </MagneticButton>
            </div>
          </div>

          {/* Right Column: 5 Interactive Expanding Cards */}
          <div ref={cardsListRef} className="cards__list">
            {cardsData.map((card, idx) => (
              <div
                key={idx}
                className={`cards__item ${activeIndex === idx ? 'active' : ''}`}
                onClick={() => setActiveIndex(idx)}
                onMouseEnter={() => setActiveIndex(idx)}
              >
                <div className="cards__content">
                  <div className="f-20 cards__item-title">{card.title}</div>
                  <p className="f-14 cards__item-desc">
                    {card.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
