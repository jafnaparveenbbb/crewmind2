const fs = require('fs');

// 1. Update CoreValues.jsx to use theme="yellow"
let jsx = fs.readFileSync('src/sections/CoreValues.jsx', 'utf8');
jsx = jsx.replace(/setAttribute\('theme',\s*'white'\)/g, "setAttribute('theme', 'yellow')");
jsx = jsx.replace('this-theme="white"', 'this-theme="yellow"');
fs.writeFileSync('src/sections/CoreValues.jsx', jsx, 'utf8');
console.log('Successfully updated CoreValues.jsx to yellow theme!');

// 2. Update index.css for CoreValues section colors
let css = fs.readFileSync('src/index.css', 'utf8');

const updatedSectionCSS = `/* ==========================================================================
   THE INDUSTRY IS CHANGING / CORE VALUES (Pinned Stadium Stream)
   ========================================================================== */

.significo-about-stats {
  position: relative;
  width: 100%;
  height: 300vh;
  background-color: var(--yellow);
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

/* Compact Left Content Column (Black Typography on Yellow BG) */
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

/* Stadium Egg Capsule Cards - Black (#000000) background, White inside circle, White text */
.significo-egg-card {
  width: clamp(19rem, 23vw, 28rem);
  height: clamp(36rem, 60vh, 46rem);
  border-radius: 9999px;
  border: 1.5px solid var(--black);
  background-color: var(--black);
  color: var(--white);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: clamp(2rem, 3.5vh, 4rem) clamp(1.5rem, 2vw, 2.8rem);
  box-sizing: border-box;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.3);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease, border-color 0.3s ease;
  flex-shrink: 0;
}

.significo-egg-card:hover {
  transform: scale(1.03);
  box-shadow: 0 35px 85px rgba(0, 0, 0, 0.45);
}

/* Capsule Card Content: Centered Layout with Icon Circle Above Topic Heading */
.significo-egg-card__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  gap: clamp(1.6rem, 2.5vh, 2.8rem);
}

/* Inside Circle: Solid White (#ffffff) with Black Icon */
.capsule-icon-circle {
  width: clamp(4.6rem, 5.6vw, 6.4rem);
  height: clamp(4.6rem, 5.6vw, 6.4rem);
  border-radius: 50%;
  border: 1.5px solid #ffffff;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--black);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
  flex-shrink: 0;
}

.significo-egg-card:hover .capsule-icon-circle {
  transform: translateY(-4px) scale(1.08);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.35);
}

.capsule-icon {
  width: clamp(2.2rem, 2.8vw, 3.2rem);
  height: clamp(2.2rem, 2.8vw, 3.2rem);
  color: var(--black);
  stroke: var(--black);
}

.capsule-topic-heading {
  font-family: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: clamp(1.8rem, 2.3vw, 2.7rem);
  font-weight: 800;
  line-height: 1.18;
  letter-spacing: -0.01em;
  color: var(--white);
  text-align: center;
  text-transform: uppercase;
  max-width: 20rem;
  margin: 0 auto;
}`;

const startIdx = css.indexOf('.significo-about-stats {');
const endIdx = css.indexOf('@media screen and (max-width: 991px)');

if (startIdx !== -1 && endIdx !== -1) {
  // Find the start comment before .significo-about-stats
  const commentStart = css.lastIndexOf('/* ==========================================================================', startIdx);
  const replaceStart = commentStart !== -1 ? commentStart : startIdx;
  css = css.substring(0, replaceStart) + updatedSectionCSS + '\n\n' + css.substring(endIdx);
  fs.writeFileSync('src/index.css', css, 'utf8');
  console.log('Successfully updated index.css with yellow theme and black elements for CoreValues!');
} else {
  console.error('Could not locate section in index.css');
}
