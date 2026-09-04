const fs = require('fs');

let css = fs.readFileSync('src/index.css', 'utf8');

const updatedDiffCSS = `/* ==========================================================================
   WHAT MAKES US DIFFERENT (Significo Core Values 2x2 Circle Grid Layout)
   ========================================================================== */

.ovals-diff-section {
  position: relative;
  width: 100%;
  padding-block: clamp(6rem, 10vw, 13rem);
  background-color: var(--yellow);
  color: var(--black);
  z-index: 10;
  overflow: hidden;
  transition: background-color var(--bg-timing), color var(--bg-timing);
}

.ovals-diff__layout {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: clamp(3rem, 5vw, 6rem);
  width: 100%;
}

.ovals-diff__left {
  flex: 0 0 clamp(24rem, 32vw, 36rem);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  gap: clamp(1.6rem, 2.6vh, 2.5rem);
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
  font-size: clamp(3rem, 4.6vw, 5.6rem);
  font-weight: 400;
  line-height: 0.95;
  letter-spacing: 0.02em;
  color: var(--black);
  text-align: left;
}

.ovals-diff__subpara {
  font-family: 'Manrope', sans-serif;
  font-size: clamp(1.05rem, 1.25vw, 1.35rem);
  font-weight: 500;
  line-height: 1.6;
  letter-spacing: -0.01em;
  color: rgba(0, 0, 0, 0.82);
  max-width: 32rem;
  text-align: left;
}

.ovals-diff__btn-wrap {
  margin-top: 0.6rem;
}

/* 2x2 Large Circle Grid matching Significo.com/about */
.ovals-diff__grid {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: clamp(1.2rem, 2vw, 2.5rem);
  justify-items: center;
  align-items: center;
  width: 100%;
}

.diff-core-circle {
  width: 100%;
  max-width: clamp(21rem, 26.5vw, 32rem);
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  background-color: var(--black);
  color: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(2.2rem, 3.4vw, 4.4rem);
  box-sizing: border-box;
  box-shadow: 0 30px 75px rgba(0, 0, 0, 0.35);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
  position: relative;
  text-align: center;
}

.diff-core-circle:hover {
  transform: translateY(-8px) scale(1.03);
  box-shadow: 0 40px 95px rgba(0, 0, 0, 0.45);
}

.diff-core-circle__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: clamp(0.8rem, 1.4vh, 1.4rem);
  width: 100%;
  max-width: 92%;
  box-sizing: border-box;
}

.diff-core-circle__icon-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--yellow);
  margin-bottom: 0.2rem;
}

.diff-core-circle__icon {
  width: clamp(3rem, 4vw, 5rem);
  height: clamp(3rem, 4vw, 5rem);
  color: var(--yellow);
  stroke: var(--yellow);
}

.diff-core-circle__title {
  font-family: 'Manrope', sans-serif;
  font-size: clamp(1.2rem, 1.55vw, 1.9rem);
  font-weight: 800;
  line-height: 1.16;
  letter-spacing: -0.01em;
  color: var(--yellow);
  text-transform: uppercase;
  max-width: 20rem;
  margin: 0 auto;
}

.diff-core-circle__desc {
  font-family: 'Manrope', sans-serif;
  font-size: clamp(0.88rem, 1.05vw, 1.18rem);
  font-weight: 400;
  line-height: 1.48;
  letter-spacing: -0.01em;
  color: rgba(255, 255, 255, 0.84);
  max-width: 18rem;
  margin: 0 auto;
}

@media screen and (max-width: 1080px) {
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
    max-width: 52rem;
  }
}

@media screen and (max-width: 640px) {
  .ovals-diff__grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .diff-core-circle {
    max-width: 24rem;
  }
}`;

const startIdx = css.indexOf('.ovals-diff-section');
const endIdx = css.indexOf('/* ==========================================================================\n   CASE STUDIES SLIDER');

if (startIdx !== -1 && endIdx !== -1) {
  const commentStart = css.lastIndexOf('/* ==========================================================================', startIdx);
  const replaceStart = commentStart !== -1 ? commentStart : startIdx;
  css = css.substring(0, replaceStart) + updatedDiffCSS + '\n\n' + css.substring(endIdx);
  fs.writeFileSync('src/index.css', css, 'utf8');
  console.log('Successfully updated index.css with exact large circle proportions and styles!');
} else {
  console.error('Could not find section marker');
}
