import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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

    // Theme trigger for footer-mob / black
    const stTheme = ScrollTrigger.create({
      trigger: footer,
      start: "top 80%",
      end: "bottom bottom",
      onEnter: () => document.body.setAttribute('theme', 'footer-mob'),
      onEnterBack: () => document.body.setAttribute('theme', 'footer-mob')
    });

    const ctx = gsap.context(() => {
      // 1. Entrance animation for contact form and info blocks
      const leftCol = footer.querySelector('.footer__contact-col');
      const rightCol = footer.querySelector('.footer__info-col');
      const bottomRow = footer.querySelector('.footer__bottom-row');

      if (leftCol && rightCol) {
        gsap.fromTo([leftCol, rightCol],
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.12,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: footer,
              start: "top 75%",
              toggleActions: "play none none none"
            }
          }
        );
      }

      // 2. Massive "CREWMIND." wordmark letter-by-letter rising animation
      const chars = footer.querySelectorAll('.footer__char');
      if (chars.length && wordmark) {
        gsap.fromTo(chars,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.04,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: footer,
              start: "top 70%",
              toggleActions: "play none none none"
            }
          }
        );
      }

      // 3. Bottom legal links & social icons reveal
      if (bottomRow) {
        gsap.fromTo(bottomRow,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: bottomRow,
              start: "top 98%",
              toggleActions: "play none none none"
            }
          }
        );
      }
    }, footer);

    return () => {
      stTheme.kill();
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

  const CREWMIND_CHARS = ['c', 'r', 'e', 'w', 'm', 'i', 'n', 'd', '.'];

  return (
    <footer ref={footerRef} className="section footer-section" this-theme="footer-mob" id="contact">
      <div className="container">
        <div className="footer">

          {/* Top Row: Contact Form Left & Business Inquiries Right */}
          <div className="footer__contact-grid">

            {/* Left Column: Contact Form */}
            <div className="footer__contact-col">
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
                      rows="4"
                      required
                      className="footer__form-textarea"
                    ></textarea>
                  </div>

                  <div className="footer__form-btn-wrap">
                    <button type="submit" className="footer__submit-pill">
                      <span>Submit</span>
                      <span className="footer__submit-arrow">→</span>
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Right Column: Business Inquiries & Stay In Touch */}
            <div className="footer__info-col">
              
              {/* Business Inquiries */}
              <div className="footer__info-block">
                <span className="footer__label">( BUSINESS INQUIRIES )</span>
                <p className="footer__location-text">
                  Dubai, United Arab Emirates
                </p>
                <a
                  href="mailto:crewmind2026@gmail.com"
                  className="footer__email-capsule"
                >
                  <span>crewmind2026@gmail.com</span>
                  <span className="footer__email-arrow">→</span>
                </a>
              </div>

              {/* Stay in Touch */}
              <div className="footer__info-block" style={{ marginTop: '2.5rem' }}>
                <span className="footer__label">( STAY IN TOUCH )</span>
                <div className="footer__social-group">
                  <a
                    href="https://www.instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="footer__social-square"
                    title="Instagram"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </a>
                  <a
                    href="https://www.linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="footer__social-square"
                    title="LinkedIn"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </a>
                </div>
              </div>

            </div>

          </div>

          {/* Massive Wordmark: "crewmind." with Scroll-driven Letter Elevation Animation */}
          <div ref={wordmarkRef} className="footer__wordmark-wrap">
            <div className="footer__wordmark">
              {CREWMIND_CHARS.map((char, index) => (
                <div key={index} className={`footer__char is--${char === '.' ? 'dot' : char}`}>
                  <span className="footer__char-letter">{char}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Thin Horizontal Divider */}
          <div className="footer__divider"></div>

          {/* Bottom Row: Legal Links & Copyright */}
          <div className="footer__bottom-row">
            <div className="footer__legal-links">
              <a href="#privacypolicy" className="footer__legal-item">Privacy Policy</a>
              <a href="#terms-of-use" className="footer__legal-item">Terms of Use</a>
            </div>

            <div className="footer__copyright">
              © {new Date().getFullYear()} Crewmind. All rights reserved.
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
