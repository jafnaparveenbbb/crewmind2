import React from 'react';

export default function ScrollArrow({ onClick, isVisible = true }) {
  return (
    <div 
      className={`scroll-arrow__sticky ${isVisible ? '' : 'hide'}`}
      onClick={onClick}
      title="Scroll to next section"
    >
      <div className="scroll-arrow">
        <svg width="20" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.5 3.5V16.5M9.5 16.5L15 11M9.5 16.5L4 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
}
