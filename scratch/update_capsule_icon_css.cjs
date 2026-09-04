const fs = require('fs');

let css = fs.readFileSync('src/index.css', 'utf8');

// Replace the significo-egg-card section in index.css
const eggCardRegex = /\/\* Stadium Egg Capsule Cards[\s\S]*?(\.capsule-topic-heading\s*\{[\s\S]*?\})/;

const updatedEggStyles = `/* Stadium Egg Capsule Cards - HEX: #00063D border, White inside, #00063D text & icons */
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

/* Circle Icon Container Aligned Above the Topic */
.capsule-icon-circle {
  width: clamp(4.6rem, 5.6vw, 6.4rem);
  height: clamp(4.6rem, 5.6vw, 6.4rem);
  border-radius: 50%;
  border: 1.5px solid #00063D;
  background-color: rgba(0, 6, 61, 0.04);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #00063D;
  box-shadow: 0 4px 16px rgba(0, 6, 61, 0.06);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s ease, box-shadow 0.3s ease;
  flex-shrink: 0;
}

.significo-egg-card:hover .capsule-icon-circle {
  transform: translateY(-4px) scale(1.08);
  background-color: rgba(0, 6, 61, 0.08);
  box-shadow: 0 8px 24px rgba(0, 6, 61, 0.12);
}

.capsule-icon {
  width: clamp(2.2rem, 2.8vw, 3.2rem);
  height: clamp(2.2rem, 2.8vw, 3.2rem);
  color: #00063D;
  stroke: #00063D;
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
}`;

if (eggCardRegex.test(css)) {
  css = css.replace(eggCardRegex, updatedEggStyles);
} else {
  // append or replace based on comment
  const startIdx = css.indexOf('.significo-egg-card');
  const endIdx = css.indexOf('@media screen and (max-width: 991px)');
  if (startIdx !== -1 && endIdx !== -1) {
    css = css.substring(0, startIdx) + updatedEggStyles + '\n\n' + css.substring(endIdx);
  }
}

fs.writeFileSync('src/index.css', css, 'utf8');
console.log('Successfully updated index.css with circle icon styles!');
