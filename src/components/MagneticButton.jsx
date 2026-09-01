import React, { useRef } from 'react';
import gsap from 'gsap';

export default function MagneticButton({ 
  children, 
  buttonStyle = "stroke", 
  href = "#", 
  onClick, 
  className = "",
  showArrow = true,
  ...props 
}) {
  const btnRef = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);

  const handleMouseEnter = () => {
    if (!text1Ref.current || !text2Ref.current) return;
    const chars1 = text1Ref.current.querySelectorAll('.char');
    const chars2 = text2Ref.current.querySelectorAll('.char');
    
    gsap.timeline({ defaults: { duration: 0.5, ease: "power2.out", stagger: 0.015 } })
      .to(chars1, { yPercent: -100 })
      .fromTo(chars2, { yPercent: 100 }, { yPercent: 0 }, 0.1);
  };

  const handleMouseLeave = () => {
    if (!text1Ref.current || !text2Ref.current) return;
    const chars1 = text1Ref.current.querySelectorAll('.char');
    const chars2 = text2Ref.current.querySelectorAll('.char');
    
    gsap.timeline({ defaults: { duration: 0.5, ease: "power2.out", stagger: 0.015 } })
      .to(chars2, { yPercent: 100 })
      .to(chars1, { yPercent: 0 }, 0);
  };

  const renderChars = (text) => {
    if (typeof text !== 'string') return text;
    return text.split('').map((char, index) => (
      <span key={index} className="char" style={{ display: 'inline-block', willChange: 'transform' }}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <a
      ref={btnRef}
      href={href}
      onClick={onClick}
      button-style={buttonStyle}
      className={`btn ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <div className="btn__text--parent">
        <div ref={text1Ref} className="btn__text">
          <div className="f-14 is--btn">{renderChars(children)}</div>
        </div>
        <div ref={text2Ref} className="btn__text">
          <div className="f-14 is--btn">{renderChars(children)}</div>
        </div>
      </div>
      {showArrow && (
        <div className="btn__icon">
          <svg width="100%" height="100%" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.53848 13.7123L12.9631 6.28769M12.9631 6.28769V13.7123M12.9631 6.28769H5.53848" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      )}
    </a>
  );
}
