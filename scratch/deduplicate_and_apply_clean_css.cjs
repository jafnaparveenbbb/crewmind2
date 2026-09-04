const fs = require('fs');

const css = fs.readFileSync('src/index.css', 'utf8');
const sections = css.split('/* ==========================================================================');

console.log('Total raw sections:', sections.length);

// Extract section 1 (root styles), 2..10 (base components), 62..69 (other sections)
const rootSection = '/* ==========================================================================' + sections[1];
const baseSections = sections.slice(2, 11).map(s => '/* ==========================================================================' + s).join('\n\n');
const otherSections = sections.slice(62).map(s => '/* ==========================================================================' + s).join('\n\n');

const coreValuesCSS = `/* ==========================================================================
   THE INDUSTRY IS CHANGING / CORE VALUES (Pinned Stadium Stream)
   ========================================================================== */

.significo-about-stats {
  position: relative;
  width: 100%;
  height: 300vh;
  background-color: var(--white);
  color: var(--black);
  z-index: 10;
  box-sizing: border-box;
  transition: background-color var(--bg-timing), color var(--bg-timing);
}

.significo-about-stats__sticky {
  position: sticky;
  top: 0;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
}

.significo-about-stats__layout {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  position: relative;
}

/* Compact Left Content Column (Black Typography on White BG) */
.significo-about-stats__left {
  max-width: clamp(18rem, 26vw, 30rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: clamp(1rem, 1.8vh, 1.8rem);
  z-index: 5;
  position: relative;
}

.core-values__tag {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  font-family: 'Manrope', sans-serif;
  font-weight: 700;
  font-size: clamp(0.72rem, 0.8vw, 0.88rem);
  letter-spacing: 0.08em;
  color: var(--black);
  text-transform: uppercase;
}

.core-values__dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background-color: var(--black);
  display: inline-block;
}

.core-values__heading {
  font-family: 'Staatliches', sans-serif;
  font-size: clamp(2.4rem, 3.8vw, 4.4rem);
  font-weight: 400;
  line-height: 0.98;
  letter-spacing: 0.02em;
  color: var(--black);
  text-align: left;
}

.core-values__subparagraph {
  font-family: 'Manrope', sans-serif;
  font-size: clamp(0.92rem, 1.05vw, 1.2rem);
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: -0.01em;
  color: rgba(0, 0, 0, 0.82);
  max-width: 26rem;
  text-align: left;
}

/* Right Stream Rotated at -15deg */
.significo-about-stats__right {
  position: absolute;
  top: 50%;
  right: calc(-2vw);
  transform: translateY(-50%) rotate(-15deg);
  width: clamp(42rem, 54vw, 68rem);
  pointer-events: auto;
  z-index: 4;
}

.significo-about-stats__stream {
  display: flex;
  gap: clamp(1.8rem, 2.8vw, 3.5rem);
  justify-content: center;
  align-items: center;
  width: 100%;
}

.significo-about-stats__col {
  display: flex;
  flex-direction: column;
  gap: clamp(2.2rem, 3.8vh, 4.5rem);
  will-change: transform;
}

/* Stadium Egg Capsule Cards - White background with Black border, Yellow inside circle, Black text */
.significo-egg-card {
  width: clamp(19rem, 23vw, 28rem);
  height: clamp(36rem, 60vh, 46rem);
  border-radius: 9999px;
  border: 1.5px solid var(--black);
  background-color: #ffffff;
  color: var(--black);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: clamp(2rem, 3.5vh, 4rem) clamp(1.5rem, 2vw, 2.8rem);
  box-sizing: border-box;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.08);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease, border-color 0.3s ease;
  flex-shrink: 0;
}

.significo-egg-card:hover {
  transform: scale(1.03);
  box-shadow: 0 30px 70px rgba(0, 0, 0, 0.16);
  border-color: var(--black);
}

/* Capsule Card Content: Centered Layout with Yellow Icon Circle Above Topic Heading */
.significo-egg-card__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  gap: clamp(1.6rem, 2.5vh, 2.8rem);
}

/* Inside Circle: Yellow (#f5f19c / var(--yellow)) with Black Icon */
.capsule-icon-circle {
  width: clamp(5rem, 6.2vw, 7.2rem);
  height: clamp(5rem, 6.2vw, 7.2rem);
  border-radius: 50%;
  border: none;
  background-color: var(--yellow, #f5f19c);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--black);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
  flex-shrink: 0;
}

.significo-egg-card:hover .capsule-icon-circle {
  transform: translateY(-4px) scale(1.08);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.15);
}

.capsule-icon {
  width: clamp(2.4rem, 3vw, 3.4rem);
  height: clamp(2.4rem, 3vw, 3.4rem);
  color: var(--black);
  stroke: var(--black);
}

.capsule-topic-heading {
  font-family: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: clamp(1.8rem, 2.3vw, 2.7rem);
  font-weight: 800;
  line-height: 1.18;
  letter-spacing: -0.01em;
  color: var(--black);
  text-align: center;
  text-transform: uppercase;
  max-width: 20rem;
  margin: 0 auto;
}

@media screen and (max-width: 991px) {
  .significo-about-stats {
    height: auto;
  }

  .significo-about-stats__sticky {
    position: static;
    height: auto;
    padding-block: 5rem;
  }

  .significo-about-stats__layout {
    flex-direction: column;
    gap: 4rem;
  }

  .significo-about-stats__left {
    max-width: 100%;
    align-items: center;
    text-align: center;
  }

  .core-values__heading {
    text-align: center;
  }

  .core-values__subparagraph {
    text-align: center;
  }

  .significo-about-stats__right {
    position: static;
    transform: none;
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 2rem;
  }

  .significo-about-stats__stream {
    flex-direction: column;
    gap: 2rem;
  }

  .significo-about-stats__col {
    transform: none !important;
    gap: 2rem;
  }

  .significo-egg-card {
    width: clamp(18rem, 75vw, 22rem);
    height: clamp(34rem, 50vh, 42rem);
    transform: rotate(-10deg);
  }
}`;

const finalCSS = [
  rootSection,
  baseSections,
  coreValuesCSS,
  otherSections
].join('\n\n');

fs.writeFileSync('src/index.css', finalCSS, 'utf8');
console.log('Successfully cleaned and deduplicated index.css! New length:', finalCSS.length);
