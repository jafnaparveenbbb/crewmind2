const fs = require('fs');

// 1. Update index.css to remove all padding on .horizontal and .significo-about-stats
let css = fs.readFileSync('src/index.css', 'utf8');

css = css.replace(
  /\.horizontal\s*\{[\s\S]*?height:\s*480vh;[\s\S]*?position:\s*relative;\s*\}/,
  `.horizontal {
  height: 480vh;
  position: relative;
  padding: 0 !important;
  padding-block: 0 !important;
  margin: 0 !important;
}`
);

css = css.replace(
  /\.significo-about-stats\s*\{[\s\S]*?height:\s*300vh;[\s\S]*?background-color:\s*var\(--white\);/,
  `.significo-about-stats {
  position: relative;
  width: 100%;
  height: 300vh;
  padding: 0 !important;
  padding-block: 0 !important;
  margin: 0 !important;
  background-color: var(--white);`
);

fs.writeFileSync('src/index.css', css, 'utf8');
console.log('Successfully updated index.css to remove padding from .horizontal and .significo-about-stats!');

// 2. Update HorizontalStats.jsx to ensure theme boundary is tight
let horizJsx = fs.readFileSync('src/sections/HorizontalStats.jsx', 'utf8');

horizJsx = horizJsx.replace(
  /start:\s*\(\)\s*=>\s*`top \$\{window\.innerHeight \/ 2 \+ 10\}`,\s*end:\s*\(\)\s*=>\s*`bottom \$\{window\.innerHeight \/ 2 - 10\}`/,
  `start: "top 50%",
      end: "bottom 50%"`
);

fs.writeFileSync('src/sections/HorizontalStats.jsx', horizJsx, 'utf8');
console.log('Successfully updated HorizontalStats.jsx theme triggers!');
