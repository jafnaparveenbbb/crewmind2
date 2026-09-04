const fs = require('fs');

// 1. Update WhatMakesUsDifferent.jsx
let jsx = fs.readFileSync('src/sections/WhatMakesUsDifferent.jsx', 'utf8');

// Replace theme triggers
jsx = jsx.replace(/setAttribute\('theme',\s*'white'\)/g, "setAttribute('theme', 'yellow')");
jsx = jsx.replace('this-theme="white"', 'this-theme="yellow"');
jsx = jsx.replace('buttonStyle="yellow"', 'buttonStyle="black"');

fs.writeFileSync('src/sections/WhatMakesUsDifferent.jsx', jsx, 'utf8');
console.log('Successfully updated WhatMakesUsDifferent.jsx!');

// 2. Update index.css
let css = fs.readFileSync('src/index.css', 'utf8');

// Add body[theme="yellow"] if not present
if (!css.includes('body[theme="yellow"]')) {
  css = css.replace(
    'body[theme="footer-cta"] {',
    'body[theme="yellow"] {\n  background-color: var(--yellow);\n  color: var(--black);\n}\n\nbody[theme="footer-cta"] {'
  );
}

// Ensure .ovals-diff-section background is var(--yellow)
css = css.replace(
  /\.ovals-diff-section\s*\{[\s\S]*?padding-block:\s*clamp\([^;]+\);[\s\S]*?background-color:\s*var\(--[^)]+\);/,
  `.ovals-diff-section {
  position: relative;
  width: 100%;
  padding-block: clamp(4.5rem, 8vw, 8.5rem);
  background-color: var(--yellow);`
);

fs.writeFileSync('src/index.css', css, 'utf8');
console.log('Successfully updated index.css with yellow theme!');
