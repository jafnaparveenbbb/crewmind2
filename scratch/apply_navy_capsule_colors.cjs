const fs = require('fs');
const path = require('path');

const indexCssPath = path.join(__dirname, '..', 'src', 'index.css');

let css = fs.readFileSync(indexCssPath, 'utf8');
const startTag = '/* ==========================================================================\r\n   SIGNIFICO ABOUT STATS / EGG SLIDE STATS';
const startTagLF = '/* ==========================================================================\n   SIGNIFICO ABOUT STATS / EGG SLIDE STATS';
const startTagAlt = '/* ==========================================================================\r\n   CORE VALUES / THE INDUSTRY IS CHANGING';
const startTagAltLF = '/* ==========================================================================\n   CORE VALUES / THE INDUSTRY IS CHANGING';

const endTag = '/* ==========================================================================\r\n   WHAT MAKES US DIFFERENT (Centered Header + Alternating Perfect Circle Cards)';
const endTagLF = '/* ==========================================================================\n   WHAT MAKES US DIFFERENT (Centered Header + Alternating Perfect Circle Cards)';

const newSignificoAboutStatsCss = `/* ==========================================================================
   SIGNIFICO ABOUT STATS / EGG SLIDE STATS (300vh Pinned Stadium Stream)
   ========================================================================== */

.significo-about-stats {
  position: relative;
  width: 100%;
  height: 300vh;
  background-color: var(--white);
  color: #00063D;
  z-index: 10;
  box-sizing: border-box;
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

/* Compact Left Content Column (HEX #00063D Palette) */
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
  color: #00063D;
  text-transform: uppercase;
}

.core-values__dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background-color: #00063D;
  display: inline-block;
}

.core-values__heading {
  font-family: 'Staatliches', sans-serif;
  font-size: clamp(2.4rem, 3.8vw, 4.4rem);
  font-weight: 400;
  line-height: 0.98;
  letter-spacing: 0.02em;
  color: #00063D;
  text-align: left;
}

.core-values__subparagraph {
  font-family: 'Manrope', sans-serif;
  font-size: clamp(0.92rem, 1.05vw, 1.2rem);
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: -0.01em;
  color: rgba(0, 6, 61, 0.85);
  max-width: 26rem;
  text-align: left;
}

/* Right Stream Rotated at -15deg */
.significo-about-stats__right {
  position: absolute;
  top: 50%;
  right: calc(-2vw);
  transform: translateY(-50%) rotate(-15deg);
  transform-origin: center center;
  z-index: 2;
  pointer-events: all;
}

.significo-about-stats__stream {
  display: flex;
  align-items: center;
  gap: clamp(1.8rem, 2.8vw, 3.8rem);
}

.significo-about-stats__col {
  display: flex;
  flex-direction: column;
  gap: clamp(2.5rem, 4.5vh, 5rem);
  will-change: transform;
}

/* Stadium Egg Capsule Cards - HEX: #00063D border, White inside, #00063D text */
.significo-egg-card {
  width: clamp(19rem, 23vw, 28rem);
  height: clamp(36rem, 60vh, 46rem);
  border-radius: 9999px;
  border: 1.5px solid #00063D;
  background-color: #ffffff;
  color: #00063D;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: clamp(2rem, 3.5vh, 4rem) clamp(1.5rem, 2vw, 2.8rem);
  box-sizing: border-box;
  box-shadow: 0 20px 50px rgba(0, 6, 61, 0.08);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease, border-color 0.3s ease;
  flex-shrink: 0;
}

.significo-egg-card:hover {
  transform: scale(1.03);
  box-shadow: 0 30px 70px rgba(0, 6, 61, 0.16);
  border-color: #00063D;
}

/* Topic Text Centered Inside White Stadium Capsule with #00063D Text */
.significo-egg-card__text {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.capsule-topic-heading {
  font-family: 'Staatliches', sans-serif;
  font-size: clamp(2.4rem, 3.4vw, 4.2rem);
  font-weight: 400;
  line-height: 1.08;
  letter-spacing: 0.03em;
  color: #00063D;
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
    gap: 2.5rem;
  }

  .significo-egg-card {
    width: clamp(18rem, 75vw, 22rem);
    height: clamp(34rem, 50vh, 42rem);
    transform: rotate(-10deg);
  }
}

`;

let startIdx = css.indexOf(startTag);
if (startIdx === -1) startIdx = css.indexOf(startTagLF);
if (startIdx === -1) startIdx = css.indexOf(startTagAlt);
if (startIdx === -1) startIdx = css.indexOf(startTagAltLF);

let endIdx = css.indexOf(endTag);
if (endIdx === -1) endIdx = css.indexOf(endTagLF);

if (startIdx !== -1 && endIdx !== -1) {
  const updatedCss = css.substring(0, startIdx) + newSignificoAboutStatsCss + css.substring(endIdx);
  fs.writeFileSync(indexCssPath, updatedCss, 'utf8');
  console.log('index.css updated with #00063D border, white inside capsule, and #00063D text!');
} else {
  console.error('Could not find start or end tags in index.css: startIdx=' + startIdx + ', endIdx=' + endIdx);
}
