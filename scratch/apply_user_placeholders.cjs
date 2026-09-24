const fs = require('fs');
const path = require('path');

const userMobPath = 'C:\\Users\\BBB\\.gemini\\antigravity-ide\\brain\\8ee11f3d-c677-4d26-bffe-a7a19730cfad\\.user_uploaded\\media_1789550653267.jpg';
const userPcPath = 'C:\\Users\\BBB\\.gemini\\antigravity-ide\\brain\\8ee11f3d-c677-4d26-bffe-a7a19730cfad\\.user_uploaded\\media_1789550803019.png';

const targetPc = path.resolve(__dirname, '../src/assets/significo/hero/hero-placeholder-pc.png');
const targetMob = path.resolve(__dirname, '../src/assets/significo/hero/hero-placeholder-mob.jpeg');

if (fs.existsSync(userPcPath)) {
  fs.copyFileSync(userPcPath, targetPc);
  console.log(`Successfully copied Desktop placeholder from user upload (${fs.statSync(targetPc).size} bytes) -> ${targetPc}`);
} else {
  console.error(`User PC file not found at ${userPcPath}`);
}

if (fs.existsSync(userMobPath)) {
  fs.copyFileSync(userMobPath, targetMob);
  console.log(`Successfully copied Mobile placeholder from user upload (${fs.statSync(targetMob).size} bytes) -> ${targetMob}`);
} else {
  console.error(`User Mobile file not found at ${userMobPath}`);
}
