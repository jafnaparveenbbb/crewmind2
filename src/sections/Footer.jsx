import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import mainLogo from '../assets/significo/misc/main-logo.png';
import mainLogo2x from '../assets/significo/misc/main-logo-2x.png';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);
  const wordmarkRef = useRef(null);
  const [formData, setFormData] = useState({
    firstName: '',
    secondName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const footer = footerRef.current;
    const wordmark = wordmarkRef.current;
    if (!footer) return;

    const ctx = gsap.context(() => {
      // Theme trigger for footer-mob theme
      ScrollTrigger.create({
        trigger: footer,
        start: "top 80%",
        end: "bottom bottom",
        onEnter: () => document.body.setAttribute('theme', 'footer-mob'),
        onEnterBack: () => document.body.setAttribute('theme', 'footer-mob'),
        onLeaveBack: () => document.body.setAttribute('theme', 'white')
      });

      // Wordmark rising entrance animation
      if (wordmark) {
        gsap.fromTo(wordmark,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: wordmark,
              start: "top 95%",
              toggleActions: "play none none none"
            }
          }
        );
      }
    }, footer);

    return () => {
      ctx.revert();
    };
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.email || formData.firstName) {
      setSubmitted(true);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer ref={footerRef} className="section footer-section" this-theme="footer-mob" id="footer">
      <div className="container">
        
        {/* Top 2-Column Content Grid */}
        <div className="footer__grid">

          {/* Left Column: Contact Form & Back-to-Top Button */}
          <div id="contact" className="footer__col-left">
            <span className="footer__label">( CONTACT US )</span>

            {submitted ? (
              <div className="footer__form-success">
                Thank you! Your message has been received. Our team will get in touch shortly.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="footer__form">
                <div className="footer__form-row">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="footer__form-input"
                  />
                  <input
                    type="text"
                    name="secondName"
                    placeholder="Second Name"
                    value={formData.secondName}
                    onChange={handleChange}
                    className="footer__form-input"
                  />
                </div>

                <div className="footer__form-row">
                  <input
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="footer__form-input"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="footer__form-input"
                  />
                </div>

                <div className="footer__form-full">
                  <textarea
                    name="message"
                    placeholder="Message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="footer__form-textarea"
                  ></textarea>
                </div>

                <div className="footer__form-actions">
                  <button
                    type="button"
                    onClick={scrollToTop}
                    className="footer__back-to-top"
                    aria-label="Back to top"
                    title="Back to top"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="19" x2="12" y2="5"></line>
                      <polyline points="5 12 12 5 19 12"></polyline>
                    </svg>
                  </button>

                  <button type="submit" className="footer__submit-btn" aria-label="Submit message">
                    <span>Submit</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Business Inquiries & Stay in Touch */}
          <div className="footer__col-right">

            {/* Business Inquiries */}
            <div className="footer__info-group">
              <span className="footer__label">( BUSINESS INQUIRIES )</span>
              <p className="footer__location">
                Dubai, United Arab Emirates
              </p>
              <a
                href="mailto:crewmind2026@gmail.com"
                className="footer__email-btn"
                aria-label="Email crewmind2026@gmail.com"
              >
                <span>crewmind2026@gmail.com</span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
            </div>

            {/* Stay in Touch */}
            <div className="footer__info-group footer__info-group--social">
              <span className="footer__label">( STAY IN TOUCH )</span>
              <div className="footer__socials">
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="footer__social-btn"
                  aria-label="Instagram"
                  title="Instagram"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="footer__social-btn"
                  aria-label="LinkedIn"
                  title="LinkedIn"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* Bold CREWMIND Wordmark Below the Footer Content */}
        <div ref={wordmarkRef} className="footer__wordmark-wrap">
          <div className="footer__wordmark" aria-label="crewmind.">
            <img
              src={mainLogo}
              srcSet={`${mainLogo} 1x, ${mainLogo2x} 2x`}
              alt="crewmind."
              className="footer__wordmark-logo"
              draggable="false"
            />
          </div>
        </div>

        {/* Subtle Horizontal Divider */}
        <div className="footer__divider" role="separator"></div>

        {/* Bottom Row: Legal Links & Copyright */}
        <div className="footer__bottom-row">
          <div className="footer__legal-links">
            <a href="#privacypolicy" className="footer__legal-item">Privacy Policy</a>
            <a href="#terms-of-use" className="footer__legal-item">Terms of Use</a>
          </div>

          <div className="footer__copyright">
            © 2026 Crewmind. All rights reserved.
          </div>
        </div>

      </div>
    </footer>
  );
}
