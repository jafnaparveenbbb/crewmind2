import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);
  const wordmarkRef = useRef(null);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const footer = footerRef.current;
    const wordmark = wordmarkRef.current;
    if (!footer) return;

    // Theme trigger for footer-mob / black
    ScrollTrigger.create({
      trigger: footer,
      start: "top 80%",
      end: "bottom bottom",
      onEnter: () => document.body.setAttribute('theme', 'footer-mob'),
      onEnterBack: () => document.body.setAttribute('theme', 'footer-mob')
    });

    // 1. Stagger reveal for Navigation Links and Newsletter Center block
    const leftLinks = footer.querySelectorAll('.footer__list:not(.is--right) .footer__item');
    const rightLinks = footer.querySelectorAll('.footer__list.is--right .footer__item');
    const centerBlock = footer.querySelector('.footer__center-block');
    const bottomRow = footer.querySelector('.footer__bottom-row');

    if (leftLinks.length || rightLinks.length || centerBlock) {
      gsap.fromTo([leftLinks, centerBlock, rightLinks],
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.06,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footer,
            start: "top 75%",
            toggleActions: "play none none none"
          }
        }
      );
    }

    // 2. Grand "significo®" wordmark letter-by-letter rising scrub animation
    const chars = footer.querySelectorAll('.footer__char');
    if (chars.length && wordmark) {
      gsap.fromTo(chars,
        { yPercent: 80, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          stagger: 0.04,
          ease: "none",
          scrollTrigger: {
            trigger: wordmark,
            start: "top 95%",
            end: "bottom 80%",
            scrub: 1.2
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

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.vars.trigger === footer || t.vars.trigger === wordmark || t.vars.trigger === bottomRow) {
          t.kill();
        }
      });
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <footer ref={footerRef} className="section footer-section" this-theme="footer-mob" id="contact">
      <div className="container">
        <div className="footer">
          
          {/* Top Row: Links & Newsletter Form */}
          <div className="footer__row">
            
            {/* Left Nav Links */}
            <div className="footer__list">
              <a href="/" className="footer__item"><span className="footer__link-text">Home</span></a>
              <a href="#solutions" className="footer__item"><span className="footer__link-text">Solutions</span></a>
              <a href="#about" className="footer__item"><span className="footer__link-text">About</span></a>
              <a href="#team" className="footer__item"><span className="footer__link-text">Team</span></a>
              <a href="#contact" className="footer__item"><span className="footer__link-text">Contact</span></a>
            </div>

            {/* Center: Newsletter Form */}
            <div className="footer__center-block">
              <h3 className="footer__form-title">
                Join our mailing list for<br />the latest updates.
              </h3>

              {submitted ? (
                <div className="footer__form-success">
                  Thank you! Your submission has been received!
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="footer__form-box">
                  <input
                    type="email"
                    placeholder="Enter your email address..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="footer__input"
                  />
                  <button type="submit" className="footer__submit-btn">
                    <span>SUBSCRIBE</span>
                    <span className="footer__submit-arrow">↗</span>
                  </button>
                </form>
              )}
            </div>

            {/* Right Nav Links */}
            <div className="footer__list is--right">
              <a href="#insights" className="footer__item"><span className="footer__link-text">Insights</span></a>
              <a href="#newsroom" className="footer__item"><span className="footer__link-text">Newsroom</span></a>
              <a href="#resources" className="footer__item"><span className="footer__link-text">Resources</span></a>
              <a href="#contact" className="footer__item"><span className="footer__link-text">Contact</span></a>
              <a href="#careers" className="footer__item"><span className="footer__link-text">Careers</span></a>
            </div>

          </div>

          {/* Massive Wordmark: "significo®" with Scroll-driven Letter Elevation Animation */}
          <div ref={wordmarkRef} className="footer__wordmark-wrap">
            <div className="footer__wordmark">
              
              {/* S */}
              <div className="footer__char is--s">
                <svg viewBox="0 0 138 184" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 129.04H32.22C32.22 137.84 35.44 144.8 41.89 149.91C48.33 155.03 57.04 157.58 68.02 157.58C79.95 157.58 89.14 155.26 95.59 150.62C102.03 145.98 105.26 139.74 105.26 131.89C105.26 126.18 103.53 121.43 100.07 117.62C96.61 113.82 90.34 110.72 81.28 108.34L50.49 101.2C34.97 97.4 23.46 91.57 15.94 83.72C8.42 75.87 4.66 65.52 4.66 52.68C4.66 41.98 7.46 32.7 13.07 24.85C18.67 17 26.43 10.93 36.34 6.64998C46.24 2.36998 57.64 0.22998 70.53 0.22998C83.42 0.22998 94.57 2.48998 104 7.00998C113.43 11.53 120.83 17.84 126.2 25.92C131.57 34.01 134.37 43.64 134.61 54.82H102.39C102.15 45.78 99.17 38.76 93.44 33.77C87.71 28.77 79.71 26.28 69.45 26.28C59.19 26.28 50.83 28.54 45.11 33.06C39.38 37.58 36.52 43.76 36.52 51.61C36.52 63.27 45.11 71.23 62.3 75.52L93.09 83.01C107.89 86.34 118.98 91.75 126.38 99.24C133.78 106.73 137.48 116.9 137.48 129.75C137.48 140.69 134.49 150.27 128.53 158.47C122.56 166.68 114.39 172.98 104.01 177.38C93.63 181.78 81.39 183.98 67.32 183.98C46.79 183.98 30.45 178.98 18.27 168.99C6.09 159.02 0 145.7 0 129.04Z" fill="currentColor"/>
                </svg>
              </div>

              {/* I */}
              <div className="footer__char is--i">
                <svg viewBox="0 0 34 230" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M33.7499 55.17H0.149902V229.51H33.7499V55.17Z" fill="currentColor"/>
                  <path d="M33.7499 0.699951H0.149902V34.3H33.7499V0.699951Z" fill="currentColor"/>
                </svg>
              </div>

              {/* G */}
              <div className="footer__char is--g">
                <svg viewBox="0 0 177 251" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M134.99 117.48C130.58 126.29 124.32 133.17 116.22 138.18C108.12 143.19 98.3498 145.68 86.9198 145.68C76.1798 145.68 66.8298 143.06 58.8498 137.82C50.8598 132.61 44.6798 125.57 40.2698 116.77C35.8598 107.98 33.6598 98.12 33.6598 87.15V87.11C33.6598 76.41 35.7998 66.71 40.0798 58.03C44.3598 49.35 50.5098 42.41 58.4898 37.16C66.4598 31.93 75.8398 29.3 87.2698 29.3C98.6998 29.3 108.47 31.81 116.57 36.8C124.67 41.81 130.87 48.58 135.15 57.15C139.43 65.73 141.59 75.71 141.59 87.12C141.59 98.53 139.39 108.66 134.98 117.45V117.47L134.99 117.48ZM143.71 34.99C138.85 25.24 131.98 17.34 123.01 11.33C111.78 3.84998 98.3398 0.0999756 82.6098 0.0999756C65.6898 0.0999756 51.0398 4.02997 38.6598 11.88C26.2598 19.72 16.7298 30.25 10.0698 43.45C3.38978 56.67 0.0497742 71.47 0.0497742 87.89L0.00976562 87.85C0.00976562 104.25 3.28977 119.01 9.83977 132.12C16.3898 145.21 25.7598 155.61 37.9098 163.34C50.0698 171.08 64.4798 174.94 81.1598 174.94C96.8698 174.94 110.7 171.2 122.62 163.71C131.44 158.16 138.24 151.07 143 142.47V165.52C143 182.16 138.05 195.44 128.16 205.3C118.27 215.17 105.11 220.12 88.6598 220.12C74.1198 220.12 62.2298 216.56 52.9198 209.42C43.6298 202.27 37.9198 192.29 35.7698 179.45H2.16977C5.51977 201.57 14.8098 218.93 30.0598 231.54C45.3298 244.16 64.8498 250.45 88.6998 250.45C106.57 250.45 122.06 246.76 135.18 239.39C148.29 232.02 158.43 221.61 165.56 208.17C172.71 194.73 176.28 178.85 176.28 160.55V5.08997H146.25L143.7 35.01V34.99H143.71Z" fill="currentColor"/>
                </svg>
              </div>

              {/* N */}
              <div className="footer__char is--n">
                <svg viewBox="0 0 160 181" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M91.86 0.989967C79.46 0.989967 68.09 3.77997 57.72 9.36997C47.35 14.96 39.42 22.76 33.95 32.73L30.38 6.12997H0V180.49H33.62V88.02C33.62 70.91 37.96 57.21 46.67 46.99C55.36 36.77 67.58 31.67 83.31 31.67C96.17 31.67 106.41 35.54 114.05 43.27C121.68 51.01 125.5 63.67 125.5 81.28V180.49H159.1V73.78C159.1 51.42 153.61 33.7 142.66 20.61C131.7 7.51997 114.77 0.969971 91.89 0.969971L91.87 0.989967H91.86Z" fill="currentColor"/>
                </svg>
              </div>

              {/* I */}
              <div className="footer__char is--i">
                <svg viewBox="0 0 34 230" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M33.7499 55.17H0.149902V229.51H33.7499V55.17Z" fill="currentColor"/>
                  <path d="M33.7499 0.699951H0.149902V34.3H33.7499V0.699951Z" fill="currentColor"/>
                </svg>
              </div>

              {/* F */}
              <div className="footer__char is--f">
                <svg viewBox="0 0 143 263" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M142.92 33.7H109.32V67.3H142.92V33.7Z" fill="currentColor"/>
                  <path d="M84.0999 0C52.3899 0 26.59 25.71 26.59 57.3V88.13H0.939941V116.31H26.59V262.45H60.2499V116.31H109.3V262.45H142.9V88.17H60.2399V57.34C60.2399 44.29 70.9299 33.7 84.0699 33.7H109.29V0H84.0699H84.0999Z" fill="currentColor"/>
                </svg>
              </div>

              {/* I */}
              <div className="footer__char is--i">
                <svg viewBox="0 0 34 230" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M33.7499 55.17H0.149902V229.51H33.7499V55.17Z" fill="currentColor"/>
                  <path d="M33.7499 0.699951H0.149902V34.3H33.7499V0.699951Z" fill="currentColor"/>
                </svg>
              </div>

              {/* C */}
              <div className="footer__char is--c">
                <svg viewBox="0 0 168 184" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M116.59 145.09C108.01 151.01 97.7499 153.99 85.8499 153.99C75.3499 153.99 66.19 151.42 58.34 146.32C50.47 141.2 44.3999 134.07 40.1099 124.91C35.8299 115.75 33.6699 104.88 33.6699 92.2599C33.6699 79.6399 35.92 68.7099 40.46 59.4199C44.98 50.1299 51.2899 42.9399 59.4099 37.8299C67.5099 32.7299 76.8199 30.1599 87.2999 30.1599C98.4899 30.1599 108.26 33.0099 116.6 38.7199C124.92 44.4199 130.54 52.8699 133.39 64.0599H166.99C164.12 44.7699 155.41 29.3199 140.89 17.6699C126.35 6.01994 108.11 0.189941 86.2 0.189941C69.28 0.189941 54.38 4.11994 41.52 11.9699C28.64 19.8299 18.5699 30.6399 11.3099 44.4599C4.04994 58.2699 0.419922 74.3199 0.419922 92.6399C0.419922 110.96 3.97995 126.99 11.14 140.63C18.31 154.33 28.2499 164.98 40.9999 172.58C53.7299 180.19 68.7199 184.01 85.8599 184.01C99.9299 184.01 112.72 181.33 124.3 175.99C135.86 170.65 145.39 163.26 152.89 153.86C160.41 144.48 165.21 133.48 167.37 120.85H133.77C130.92 131.09 125.19 139.17 116.62 145.13L116.56 145.11L116.59 145.09Z" fill="currentColor"/>
                </svg>
              </div>

              {/* O */}
              <div className="footer__char is--o">
                <svg viewBox="0 0 221 184" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M141.66 124.26C136.76 133.57 130.04 140.82 121.46 146.09C112.88 151.33 102.99 153.96 91.7999 153.96C80.6099 153.96 70.7099 151.33 62.1399 146.09C53.5599 140.85 46.8198 133.57 41.9398 124.26C37.0398 114.95 34.6099 104.23 34.6099 92.06C34.6099 79.89 37.0498 68.87 41.9398 59.7C46.8398 50.52 53.5599 43.3 62.1399 38.06C70.7199 32.82 80.6099 30.19 91.7999 30.19C102.99 30.19 112.89 32.82 121.46 38.06C130.04 43.3 136.76 50.52 141.66 59.7C146.56 68.88 148.99 79.9 148.99 92.06C148.99 104.22 146.55 114.95 141.66 124.26ZM138.63 11.98C125.04 4.11005 109.44 0.170044 91.7899 0.170044C74.1399 0.170044 58.4899 4.11005 44.7799 11.98C31.0599 19.85 20.2999 30.69 12.4299 44.53C4.55993 58.35 0.629883 74.19 0.629883 92.08C0.629883 109.97 4.55993 125.81 12.4299 139.63C20.2999 153.45 31.0599 164.31 44.7799 172.18C58.4799 180.05 74.1599 183.99 91.7899 183.99C109.42 183.99 125.04 180.05 138.63 172.18C152.22 164.31 162.94 153.47 170.82 139.63C178.69 125.81 182.62 109.97 182.62 92.08C182.62 74.19 178.69 58.35 170.82 44.53C162.95 30.71 152.24 19.85 138.63 11.98Z" fill="currentColor"/>
                </svg>
              </div>

              {/* ® Registered Symbol */}
              <div className="footer__char is--registered">
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="24" cy="24" r="21" stroke="currentColor" strokeWidth="4"/>
                  <path d="M17 13H24C26.7614 13 29 15.2386 29 18C29 20.7614 26.7614 23 24 23H17V13ZM17 23H24L29 35H23.5L19 24.5H17V35H13V13H17V23Z" fill="currentColor"/>
                </svg>
              </div>

            </div>
          </div>

          {/* Thin Horizontal Divider */}
          <div className="footer__divider"></div>

          {/* Bottom Row: Legal, Copyright & Socials */}
          <div className="footer__bottom-row">
            
            {/* Legal Links */}
            <div className="footer__legal-links">
              <a href="#privacypolicy" className="footer__legal-item">Privacy Policy</a>
              <a href="#terms-of-use" className="footer__legal-item">Terms of Use</a>
              <a href="https://trust.significo.com/" target="_blank" rel="noreferrer" className="footer__legal-item">Trust</a>
            </div>

            {/* Copyright */}
            <div className="footer__copyright">
              © {new Date().getFullYear()} Significo. All rights reserved.
            </div>

            {/* Social Icons */}
            <div className="footer__social-links">
              <a href="https://www.instagram.com/significohealth/" target="_blank" rel="noreferrer" className="footer__social-btn" title="Instagram">
                <svg width="18" height="18" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M16.4531 3.03711H8.45312C5.6917 3.03711 3.45312 5.27569 3.45312 8.03711V16.0371C3.45312 18.7985 5.6917 21.0371 8.45312 21.0371H16.4531C19.2145 21.0371 21.4531 18.7985 21.4531 16.0371V8.03711C21.4531 5.27569 19.2145 3.03711 16.4531 3.03711ZM19.7031 16.0371C19.6976 17.8297 18.2457 19.2816 16.4531 19.2871H8.45312C6.66048 19.2816 5.20861 17.8297 5.20312 16.0371V8.03711C5.20861 6.24446 6.66048 4.7926 8.45312 4.78711H16.4531C18.2457 4.7926 19.6976 6.24446 19.7031 8.03711V16.0371ZM17.2031 8.28711C17.7554 8.28711 18.2031 7.83939 18.2031 7.28711C18.2031 6.73483 17.7554 6.28711 17.2031 6.28711C16.6508 6.28711 16.2031 6.73483 16.2031 7.28711C16.2031 7.83939 16.6508 8.28711 17.2031 8.28711ZM12.4531 7.53711C9.96784 7.53711 7.95312 9.55183 7.95312 12.0371C7.95312 14.5224 9.96784 16.5371 12.4531 16.5371C14.9384 16.5371 16.9531 14.5224 16.9531 12.0371C16.9558 10.8428 16.4825 9.69668 15.638 8.85219C14.7935 8.0077 13.6474 7.53445 12.4531 7.53711ZM9.70312 12.0371C9.70312 13.5559 10.9343 14.7871 12.4531 14.7871C13.9719 14.7871 15.2031 13.5559 15.2031 12.0371C15.2031 10.5183 13.9719 9.28711 12.4531 9.28711C10.9343 9.28711 9.70312 10.5183 9.70312 12.0371Z" fill="currentColor"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/significo-health/" target="_blank" rel="noreferrer" className="footer__social-btn" title="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M4.95312 3.2793C4.1247 3.2793 3.45312 3.95087 3.45312 4.7793V19.7793C3.45312 20.6077 4.1247 21.2793 4.95312 21.2793H19.9531C20.7815 21.2793 21.4531 20.6077 21.4531 19.7793V4.7793C21.4531 3.95087 20.7815 3.2793 19.9531 3.2793H4.95312ZM8.97388 7.28202C8.97951 8.23827 8.26373 8.82749 7.41435 8.82327C6.61419 8.81905 5.9167 8.18202 5.92092 7.28343C5.92514 6.43827 6.5931 5.75905 7.46076 5.77874C8.34107 5.79843 8.97951 6.4439 8.97388 7.28202ZM12.7328 10.0411H10.2128H10.2114V18.6009H12.8748V18.4012C12.8748 18.0213 12.8745 17.6413 12.8742 17.2612C12.8734 16.2474 12.8725 15.2325 12.8777 14.219C12.8791 13.9729 12.8903 13.717 12.9536 13.4821C13.1912 12.6046 13.9802 12.0379 14.8605 12.1772C15.4258 12.2657 15.7998 12.5934 15.9573 13.1264C16.0544 13.4596 16.098 13.8182 16.1022 14.1656C16.1136 15.2132 16.112 16.2608 16.1104 17.3085C16.1098 17.6783 16.1092 18.0483 16.1092 18.4181V18.5995H18.7811V18.3942C18.7811 17.9422 18.7809 17.4903 18.7806 17.0384C18.7801 15.9089 18.7795 14.7794 18.7825 13.6495C18.7839 13.139 18.7291 12.6356 18.6039 12.142C18.4169 11.4079 18.0302 10.8004 17.4016 10.3617C16.9558 10.0495 16.4664 9.8484 15.9194 9.8259C15.8571 9.82331 15.7943 9.81992 15.7312 9.81651C15.4515 9.80139 15.1672 9.78603 14.8998 9.83996C14.1348 9.99324 13.4627 10.3434 12.955 10.9607C12.896 11.0315 12.8383 11.1034 12.7522 11.2107L12.7328 11.235V10.0411ZM6.13477 18.6037H8.78555V10.0466H6.13477V18.6037Z" fill="currentColor"/>
                </svg>
              </a>
              <a href="https://github.com/SignificoHealth" target="_blank" rel="noreferrer" className="footer__social-btn" title="GitHub">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.88 3.099C20.147 2.366 19.265 2 18.233 2H5.746C4.714 2 3.832 2.366 3.099 3.099C2.366 3.832 2 4.714 2 5.746V18.233C2 19.265 2.366 20.147 3.099 20.88C3.832 21.613 4.714 21.979 5.746 21.979H8.66C8.85 21.979 8.993 21.972 9.089 21.959C9.20069 21.9366 9.30151 21.877 9.375 21.79C9.47 21.69 9.518 21.545 9.518 21.355L9.511 20.47C9.507 19.906 9.505 19.46 9.505 19.13L9.205 19.182C9.015 19.217 8.775 19.232 8.484 19.228C8.18069 19.2224 7.87834 19.192 7.58 19.137C7.2624 19.0784 6.96343 18.9446 6.708 18.747C6.44049 18.5446 6.24097 18.2656 6.136 17.947L6.006 17.647C5.89643 17.4104 5.75877 17.1878 5.596 16.984C5.41 16.741 5.221 16.577 5.03 16.49L4.94 16.425C4.87724 16.3801 4.82016 16.3277 4.77 16.269C4.72209 16.2145 4.68265 16.1532 4.653 16.087C4.627 16.026 4.649 15.976 4.718 15.937C4.788 15.897 4.913 15.878 5.096 15.878L5.356 15.918C5.529 15.952 5.744 16.056 5.999 16.229C6.25706 16.4049 6.47263 16.6362 6.63 16.906C6.83 17.261 7.07 17.532 7.352 17.719C7.634 17.905 7.918 17.999 8.204 17.999C8.49 17.999 8.737 17.977 8.946 17.934C9.14811 17.8922 9.34451 17.8264 9.531 17.738C9.609 17.158 9.821 16.71 10.168 16.398C9.71838 16.3539 9.27276 16.2757 8.835 16.164C8.40779 16.0466 7.99694 15.8763 7.612 15.657C7.20924 15.4377 6.8535 15.1414 6.565 14.785C6.288 14.438 6.06 13.983 5.882 13.42C5.705 12.856 5.616 12.205 5.616 11.468C5.616 10.419 5.958 9.526 6.643 8.788C6.323 8 6.353 7.115 6.734 6.136C6.986 6.057 7.359 6.116 7.853 6.311C8.347 6.506 8.709 6.673 8.939 6.811C9.169 6.951 9.353 7.068 9.492 7.163C10.305 6.93675 11.1451 6.82303 11.989 6.825C12.848 6.825 13.68 6.938 14.487 7.163L14.981 6.851C15.361 6.62285 15.7618 6.43133 16.178 6.279C16.638 6.105 16.988 6.058 17.232 6.136C17.622 7.116 17.656 8 17.335 8.789C18.02 9.526 18.363 10.419 18.363 11.469C18.363 12.206 18.274 12.859 18.096 13.426C17.919 13.994 17.689 14.449 17.407 14.792C17.1134 15.1439 16.7562 15.4373 16.354 15.657C15.934 15.891 15.526 16.06 15.131 16.164C14.6933 16.2761 14.2477 16.3546 13.798 16.399C14.248 16.789 14.474 17.404 14.474 18.245V21.355C14.474 21.502 14.495 21.621 14.539 21.712C14.5592 21.7558 14.5881 21.7952 14.6238 21.8276C14.6595 21.8601 14.7014 21.8851 14.747 21.901C14.843 21.935 14.927 21.957 15.001 21.965C15.075 21.975 15.181 21.978 15.319 21.978H18.233C19.265 21.978 20.147 21.612 20.88 20.879C21.612 20.147 21.979 19.264 21.979 18.232V5.746C21.979 4.714 21.613 3.832 20.88 3.099Z" fill="currentColor"/>
                </svg>
              </a>
              <a href="https://www.youtube.com/@significo_" target="_blank" rel="noreferrer" className="footer__social-btn" title="YouTube">
                <svg width="18" height="18" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.0445 7.24012C21.9306 6.81752 21.708 6.43212 21.3989 6.12228C21.0897 5.81245 20.7048 5.58898 20.2825 5.47412C18.7165 5.04412 12.4515 5.03712 12.4515 5.03712C12.4515 5.03712 6.1875 5.03012 4.6205 5.44112C4.19843 5.56126 3.81432 5.78789 3.50507 6.09925C3.19581 6.41061 2.97179 6.79624 2.8545 7.21912C2.4415 8.78512 2.4375 12.0331 2.4375 12.0331C2.4375 12.0331 2.4335 15.2971 2.8435 16.8471C3.0735 17.7041 3.7485 18.3811 4.6065 18.6121C6.1885 19.0421 12.4365 19.0491 12.4365 19.0491C12.4365 19.0491 18.7015 19.0561 20.2675 18.6461C20.69 18.5315 21.0752 18.3085 21.3852 17.9993C21.6951 17.6901 21.9189 17.3054 22.0345 16.8831C22.4485 15.3181 22.4515 12.0711 22.4515 12.0711C22.4515 12.0711 22.4715 8.80612 22.0445 7.24012ZM10.4475 15.0421L10.4525 9.04212L15.6595 12.0471L10.4475 15.0421Z" fill="currentColor"/>
                </svg>
              </a>
              <a href="https://facebook.com/significohealth" target="_blank" rel="noreferrer" className="footer__social-btn" title="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z" fill="currentColor"/>
                </svg>
              </a>
              <a href="https://twitter.com/significo_" target="_blank" rel="noreferrer" className="footer__social-btn" title="X">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.244 2.25H21.552L14.325 10.51L22.825 21.75H16.17L10.957 14.933L4.99 21.75H1.68L9.41 12.915L1.254 2.25H8.08L12.793 8.481L18.244 2.25ZM17.083 19.77H18.916L7.084 4.126H5.117L17.083 19.77Z" fill="currentColor"/>
                </svg>
              </a>
            </div>

          </div>

        </div>
      </div>
    </footer>
  );
}
