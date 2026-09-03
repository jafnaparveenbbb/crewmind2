import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from '../components/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

const PARTNER_PILLARS = [
  "Improved Crew Retention.",
  "Better Communication.",
  "More Resilient Teams.",
  "Reduced Operational Disruption.",
  "Stronger Artist Wellbeing.",
  "Healthier Production Environments."
];

export default function ManagementPartners() {
  const sectionRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);
  const listRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const leftCol = leftColRef.current;
    const list = listRef.current;
    if (!section || !leftCol || !list) return;

    // 1. Theme trigger for salmon
    const stTheme = ScrollTrigger.create({
      trigger: section,
      start: "top 60%",
      end: "bottom 30%",
      onEnter: () => document.body.setAttribute('theme', 'salmon'),
      onEnterBack: () => document.body.setAttribute('theme', 'salmon')
    });

    const isDesktop = window.innerWidth >= 992;
    const totalItems = PARTNER_PILLARS.length;

    const ctx = gsap.context(() => {
      // 2. Entrance reveal
      gsap.fromTo(
        leftCol.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );

      const items = list.querySelectorAll('.mgmt-item');
      gsap.fromTo(
        items,
        { opacity: 0, x: 25 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );

      // 3. Pinned Scroll Animation: Left side permanent, right arrow list scrolls & progresses
      if (isDesktop) {
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "+=160%",
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            const index = Math.min(
              totalItems - 1,
              Math.floor(progress * totalItems)
            );
            setActiveIndex(index);
          }
        });
      } else {
        // Mobile / Tablet smooth scroll trigger
        ScrollTrigger.create({
          trigger: section,
          start: "top 60%",
          end: "bottom 40%",
          onUpdate: (self) => {
            const progress = self.progress;
            const index = Math.min(
              totalItems - 1,
              Math.floor(progress * totalItems)
            );
            setActiveIndex(index);
          }
        });
      }
    }, section);

    return () => {
      stTheme.kill();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section mgmt-section"
      this-theme="salmon"
      id="management-teams"
    >
      <div className="container">
        <div className="mgmt-grid">
          
          {/* Left Column: Permanent / Pinned - 2-line Staatliches Title, Manrope Description, Yellow Button */}
          <div ref={leftColRef} className="mgmt-left">
            <h2 className="mgmt-title">
              WHY MANAGEMENT TEAMS<br />PARTNER WITH US
            </h2>

            <p className="mgmt-desc">
              Crewmind helps organisations take a preventative approach to workforce wellbeing. Strong productions start with strong people. Whether managing an artist, a festival, a concert tour, or a production team, we help protect the people behind the performance.
            </p>

            <div className="mgmt-btn-wrap">
              <MagneticButton buttonStyle="yellow" href="#contact">
                REACH OUT NOW
              </MagneticButton>
            </div>
          </div>

          {/* Right Column: Sleek Reduced Size Scrolling Arrow/Checkmark List */}
          <div ref={rightColRef} className="mgmt-right">
            <div className="mgmt-list-container">
              <ul ref={listRef} className="mgmt-list">
                {PARTNER_PILLARS.map((pillar, idx) => {
                  const isActive = activeIndex === idx;
                  return (
                    <li
                      key={idx}
                      className={`mgmt-item ${isActive ? 'is--active' : ''}`}
                      onMouseEnter={() => setActiveIndex(idx)}
                      onClick={() => setActiveIndex(idx)}
                    >
                      <span className="mgmt-item__icon-wrap">
                        <svg
                          className="mgmt-item__check"
                          viewBox="0 0 28 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="2 13 9 20 26 3" />
                        </svg>
                      </span>
                      <span className="mgmt-item__text">
                        {pillar}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
