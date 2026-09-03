import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from '../components/MagneticButton';
import { ASSETS } from '../utils/assets';

gsap.registerPlugin(ScrollTrigger);

export default function TeamSection() {
  const sectionRef = useRef(null);
  const avatarParentRef = useRef(null);
  const avatarImgRef = useRef(null);
  const [activeAvatar, setActiveAvatar] = useState(null);
  const team = ASSETS.team;

  useEffect(() => {
    const section = sectionRef.current;
    const avatarParent = avatarParentRef.current;
    if (!section || !avatarParent) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      gsap.to(avatarParent, {
        x: mouseX,
        y: mouseY,
        duration: 0.35,
        ease: "power2.out"
      });
    };

    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  const handleRowMouseEnter = (avatarUrl) => {
    setActiveAvatar(avatarUrl);
  };

  const handleRowMouseLeave = () => {
    setActiveAvatar(null);
  };

  return (
    <section
      ref={sectionRef}
      className="section"
      this-theme="clear"
      section-space=""
      id="team"
    >
      <div className="container">
        <div className="team">

          <div className="team__title">
            <h3 className="f-64">Our Team</h3>
          </div>

          <div className="team__list">
            {team.map((member, index) => (
              <div
                key={index}
                className="team__item"
                onMouseEnter={() => handleRowMouseEnter(member.avatar)}
                onMouseLeave={handleRowMouseLeave}
              >
                <div className="team__row">
                  <div className="f-40 light" style={{ opacity: 0.3 }}>
                    {member.index}
                  </div>
                  <div className="f-40 light">
                    {member.name}
                  </div>
                  <div className="f-20 is--500">
                    {member.role}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '2rem' }}>
            <MagneticButton buttonStyle="yellow" href="#team">
              Meet the Entire Team
            </MagneticButton>
          </div>

          {/* Floating Cursor-tracking Avatar */}
          <div
            ref={avatarParentRef}
            className="team__avatar--parent"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              pointerEvents: 'none',
              zIndex: 90
            }}
          >
            <div
              ref={avatarImgRef}
              className={`team__avatar ${activeAvatar ? 'show' : ''}`}
              style={{
                position: 'absolute',
                top: '-13rem',
                left: '-11rem',
                display: activeAvatar ? 'block' : 'none'
              }}
            >
              {activeAvatar && (
                <img src={activeAvatar} alt="Team Member" />
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
