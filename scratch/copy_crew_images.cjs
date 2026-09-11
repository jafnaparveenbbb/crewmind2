const fs = require('fs');
const path = require('path');

const srcDir = path.resolve(__dirname, '../dist/assets');
const destDir = path.resolve(__dirname, '../src/assets/crew');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const files = [
  'crewimg1.jpeg',
  'crewimg2.jpeg',
  'crewimg3.jpg',
  'crewimg.4.avif',
  'crewimg5.jpeg',
  'crewimg6.jpeg',
  'crewming7.jpeg',
  'crewimg8.jpeg',
  'crewimg9.jpeg'
];

files.forEach(file => {
  const fromPath = path.join(srcDir, file);
  const targetName = file === 'crewimg.4.avif' ? 'crewimg4.avif' : file;
  const toPath = path.join(destDir, targetName);
  if (fs.existsSync(fromPath)) {
    fs.copyFileSync(fromPath, toPath);
    console.log(`Copied ${file} -> ${targetName}`);
  } else {
    console.error(`File not found: ${fromPath}`);
  }
});
