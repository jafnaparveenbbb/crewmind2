const fs = require('fs');
const path = require('path');

const srcFile = path.resolve(__dirname, '../dist/assets/herovideo.mp4');
const destFile = path.resolve(__dirname, '../src/assets/significo/videos/herovideo.mp4');

if (fs.existsSync(srcFile)) {
  fs.copyFileSync(srcFile, destFile);
  console.log(`Successfully copied herovideo.mp4 (${fs.statSync(destFile).size} bytes)`);
} else {
  console.error(`Source file not found: ${srcFile}`);
}
