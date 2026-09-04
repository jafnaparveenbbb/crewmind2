const fs = require('fs');

let css = fs.readFileSync('src/index.css', 'utf8');

const updatedDiffCSS = `/* ==========================================================================
   WHAT MAKES US DIFFERENT (Significo Core Values 2x2 Circle Grid Layout)
   ========================================================================== */

.ovals-diff-section {
  position: relative;
  width: 100%;
  padding-block: clamp(6rem, 10vw, 14rem);
  background-color: var(--yellow);
  color: var(--black);
  z-index: 10;
  overflow: hidden;
  transition: background-color var(--bg-timing), color var(--bg-timing);
}

.ovals-diff-section .container {
  width: min(100% - 40px, 1750px);
  margin-inline: auto;
}

.ovals-diff__layout {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: clamp(2rem, 3.5vw, 5rem);
  width: 100%;
}

/* Compact Left Content Column (UNTOUCHED) */
.ovals-diff__left {
  flex: 0 0 clamp(20rem, 27vw, 33rem);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  gap: clamp(1.4rem, 2.2vh, 2.2rem);
  z-index: 5;
}

.ovals-diff__tag {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  font-family: 'Manrope', sans-serif;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: var(--black);
  text-transform: uppercase;
}

.diff__dot {
  width: 0.55rem;
  height: 0.55rem;
  border-radius: 50%;
  background-color: var(--black);
  display: inline-block;
}

.ovals-diff__heading {
  font-family: 'Staatliches', sans-serif;
  font-size: clamp(2.8rem, 4.2vw, 5.2rem);
  font-weight: 400;
  line-height: 0.96;
  letter-spacing: 0.02em;
  color: var(--black);
  text-align: left;
}

.ovals-diff__subpara {
  font-family: 'Manrope', sans-serif;
  font-size: clamp(0.95rem, 1.15vw, 1.25rem);
  font-weight: 500;
  line-height: 1.6;
  letter-spacing: -0.01em;
  color: rgba(0, 0, 0, 0.82);
  max-width: 28rem;
  text-align: left;
}

.ovals-diff__btn-wrap {
  margin-top: 0.5rem;
}

/* 2x2 Grid of 4 Circles with distinct vertical row gap */
.ovals-diff__grid {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: clamp(0.2rem, 0.6vw, 1.2rem);
  row-gap: clamp(3rem, 5.5vh, 6rem);
  justify-items: center;
  align-items: center;
  position: relative;
  z-index: 4;
}

/* Proportioned Perfect Circles with Yellow Subparagraph */
.diff-core-circle {
  width: clamp(18rem, 22.5vw, 28.5rem);
  height: clamp(18rem, 22.5vw, 28.5rem);
  min-width: clamp(18rem, 22.5vw, 28.5rem);
  min-height: clamp(18rem, 22.5vw, 28.5rem);
  max-width: clamp(18rem, 22.5vw, 28.5rem);
  max-height: clamp(18rem, 22.5vw, 28.5rem);
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  background-color: var(--black);
  color: var(--yellow);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: clamp(1.8rem, 2.6vw, 3.6rem);
  box-sizing: border-box;
  box-shadow: 0 25px 65px rgba(0, 0, 0, 0.35);
  transition: box-shadow 0.4s ease;
  position: relative;
  text-align: center;
  overflow: hidden;
  flex-shrink: 0;
  will-change: transform;
}

.diff-core-circle:hover {
  box-shadow: 0 35px 85px rgba(0, 0, 0, 0.48);
}

.diff-core-circle__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: clamp(0.5rem, 1vh, 0.9rem);
  width: 100%;
  max-width: 88%;
  box-sizing: border-box;
}

.diff-core-circle__icon-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--yellow);
  margin-bottom: 0.1rem;
}

.diff-core-circle__icon {
  width: clamp(2.4rem, 3.2vw, 4rem);
  height: clamp(2.4rem, 3.2vw, 4rem);
  color: var(--yellow);
  stroke: var(--yellow);
}

.diff-core-circle__title {
  font-family: 'Manrope', sans-serif;
  font-size: clamp(1.05rem, 1.3vw, 1.6rem);
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.01em;
  color: var(--yellow);
  text-transform: uppercase;
  max-width: 17rem;
  margin: 0 auto;
}

.diff-core-circle__desc {
  font-family: 'Manrope', sans-serif;
  font-size: clamp(0.78rem, 0.92vw, 1.05rem);
  font-weight: 400;
  line-height: 1.45;
  letter-spacing: -0.01em;
  color: var(--yellow, #f5f19c);
  opacity: 0.92;
  max-width: 16rem;
  margin: 0 auto;
}

@media screen and (max-width: 1200px) {
  .ovals-diff__layout {
    flex-direction: column;
    text-align: center;
    gap: 4rem;
  }

  .ovals-diff__left {
    flex: auto;
    max-width: 100%;
    align-items: center;
    text-align: center;
  }

  .ovals-diff__heading {
    text-align: center;
  }

  .ovals-diff__subpara {
    text-align: center;
  }

  .ovals-diff__grid {
    width: 100%;
    max-width: 54rem;
    row-gap: 3rem;
  }

  .diff-core-circle {
    width: clamp(18rem, 38vw, 25rem);
    height: clamp(18rem, 38vw, 25rem);
    min-width: clamp(18rem, 38vw, 25rem);
    min-height: clamp(18rem, 38vw, 25rem);
  }
}

@media screen and (max-width: 680px) {
  .ovals-diff__grid {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  .diff-core-circle {
    width: clamp(18rem, 80vw, 23rem);
    height: clamp(18rem, 80vw, 23rem);
    min-width: clamp(18rem, 80vw, 23rem);
    min-height: clamp(18rem, 80vw, 23rem);
  }
}`;

const startIdx = css.indexOf('.ovals-diff-section');
const endIdx = css.indexOf('/* ==========================================================================\n   CASE STUDIES SLIDER');

if (startIdx !== -1 && endIdx !== -1) {
  const commentStart = css.lastIndexOf('/* ==========================================================================', startIdx);
  const replaceStart = commentStart !== -1 ? commentStart : startIdx;
  css = css.substring(0, replaceStart) + updatedDiffCSS + '\n\n' + css.substring(endIdx);
  fs.writeFileSync('src/index.css', css, 'utf8');
  console.log('Successfully updated index.css with reduced circle card size, yellow subpara, and vertical gap between rows!');
} else {
  console.error('Could not find markers in index.css');
}
