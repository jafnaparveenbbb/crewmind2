import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from '../components/MagneticButton';
import { ASSETS } from '../utils/assets';

gsap.registerPlugin(ScrollTrigger);

export default function InsightsArticles() {
  const sectionRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const articles = ASSETS.articles;

  useEffect(() => {
    const section = sectionRef.current;
    const card1 = card1Ref.current;
    const card2 = card2Ref.current;
    if (!section || !card1 || !card2) return;

    // Theme trigger for white/clear background
    ScrollTrigger.create({
      trigger: section,
      start: "top 60%",
      end: "bottom 40%",
      onEnter: () => document.body.setAttribute('theme', 'white'),
      onEnterBack: () => document.body.setAttribute('theme', 'white')
    });

    // Parallax vertical scrub for the oval capsule cards
    gsap.to(card1, {
      yPercent: 14,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.2
      }
    });

    gsap.to(card2, {
      yPercent: -14,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.2
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.vars.trigger === section) t.kill();
      });
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="section insights-section" 
      this-theme="white"
      id="insights"
    >
      <div className="container">
        <div className="article">
          
          {/* Left Column: Heading, Subhead & CTA */}
          <div className="article__left">
            <div className="section-heading">
              <div className="section-descr">
                <p className="f-18">
                  Stay up-to-date on the latest healthcare innovations and thought leadership.
                </p>
              </div>
              <div className="section-title" style={{ marginTop: 'auto', paddingTop: '6rem' }}>
                <h2 className="f-64">
                  Explore
                </h2>
              </div>
            </div>

            <div style={{ marginTop: '2.5rem' }}>
              <MagneticButton buttonStyle="yellow" href="#insights">
                View all articles
              </MagneticButton>
            </div>
          </div>

          {/* Right Column: Tilted Oval Capsule Cards with Circular Images */}
          <div className="article__wrapper">
            
            {/* Oval Card 1 (Image Top + Text Bottom) */}
            <div ref={card1Ref} className="article__capsule is--1">
              <div className="article__capsule-inner">
                
                {/* Circular Image Top */}
                <div className="article__circle-img">
                  <img src={articles[0].img} alt="Digital Therapeutics" loading="lazy" />
                </div>

                {/* Content Bottom */}
                <div className="article__capsule-text">
                  <h3 className="f-23">
                    Digital Therapeutics Aren't Drugs or Hardware.
                  </h3>
                  <p className="f-14">
                    A look at Reimbursement, Use, and Suggested Improvements
                  </p>
                </div>

              </div>
            </div>

            {/* Oval Card 2 (Badge Top + Text + Circular Image Bottom) */}
            <div ref={card2Ref} className="article__capsule is--2">
              <div className="article__capsule-inner">
                
                {/* Top Badge */}
                <div className="article__badge-wrap">
                  <span className="article__badge">Thought Leadership</span>
                </div>

                {/* Content Middle */}
                <div className="article__capsule-text">
                  <h3 className="f-23">
                    AI–leadership coaching to make work a healthier and happier place
                  </h3>
                  <p className="f-14">
                    Bunch meets people in the setting where they spend half of their waking hours: work, with action-oriented, 2-minute daily tips, personalized and adaptive using AI
                  </p>
                </div>

                {/* Circular Image Bottom */}
                <div className="article__circle-img">
                  <img src={articles[1].img} alt="AI leadership coaching" loading="lazy" />
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
