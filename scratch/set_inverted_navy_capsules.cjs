const fs = require('fs');

let css = fs.readFileSync('src/index.css', 'utf8');

const updatedEggStyles = `/* Stadium Egg Capsule Cards - Navy Blue (#00063D) background, White inside circle, White text */
.significo-egg-card {
  width: clamp(19rem, 23vw, 28rem);
  height: clamp(36rem, 60vh, 46rem);
  border-radius: 9999px;
  border: 1.5px solid #00063D;
  background-color: #00063D;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: clamp(2rem, 3.5vh, 4rem) clamp(1.5rem, 2vw, 2.8rem);
  box-sizing: border-box;
  box-shadow: 0 25px 60px rgba(0, 6, 61, 0.3);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease, border-color 0.3s ease;
  flex-shrink: 0;
}

.significo-egg-card:hover {
  transform: scale(1.03);
  box-shadow: 0 35px 85px rgba(0, 6, 61, 0.45);
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

/* Inside Circle: Solid White (#ffffff) with #00063D Icon */
.capsule-icon-circle {
  width: clamp(4.6rem, 5.6vw, 6.4rem);
  height: clamp(4.6rem, 5.6vw, 6.4rem);
  border-radius: 50%;
  border: 1.5px solid #ffffff;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #00063D;
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
  color: #00063D;
  stroke: #00063D;
}

.capsule-topic-heading {
  font-family: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: clamp(1.8rem, 2.3vw, 2.7rem);
  font-weight: 800;
  line-height: 1.18;
  letter-spacing: -0.01em;
  color: #ffffff;
  text-align: center;
  text-transform: uppercase;
  max-width: 20rem;
  margin: 0 auto;
}`;

const startIdx = css.indexOf('.significo-egg-card');
const endIdx = css.indexOf('@media screen and (max-width: 991px)');

if (startIdx !== -1 && endIdx !== -1) {
  css = css.substring(0, startIdx) + updatedEggStyles + '\n\n' + css.substring(endIdx);
  fs.writeFileSync('src/index.css', css, 'utf8');
  console.log('Successfully updated capsule styling: #00063D capsule background, #ffffff inside circle with #00063D icon, and #ffffff text!');
} else {
  console.error('Could not find marker in index.css');
}
