import React from 'react';
import mainLogo from '../assets/significo/misc/main-logo.png';

export default function Navbar({ className = "" }) {
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={`nav ${className}`}>
      <div className="container">
        <div className="nav__body">
          <div className="nav__left">
            <a href="/" className="nav__logo_new" onClick={scrollToTop} aria-label="Home">
              <img src={mainLogo} alt="Crewmind Logo" className="nav__logo_img" />
            </a>
          </div>

          <nav className="nav__list">
            <a href="#contact" this-style="contact" className="link-hover">
              <span className="f-14">Book a Discovery Call</span>
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
