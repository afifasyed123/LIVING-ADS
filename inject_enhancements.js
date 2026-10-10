const fs = require('fs');

let html = fs.readFileSync('C:/Users/AFIFA SYED/.gemini/antigravity-ide/scratch/livingads-clone/index.html', 'utf8');

const headInjection = `
<!-- UX Enhancement Suite: Three.js, GSAP, WebGL, Deck.gl Shaders -->
<link rel="stylesheet" href="ux_enhancements.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
`;

const bodyInjection = `
<!-- Next-Gen 3D & Micro-Interaction Engine -->
<script src="ux_enhancements.js"></script>
`;

if (!html.includes('ux_enhancements.css')) {
  html = html.replace('</head>', `${headInjection}\n</head>`);
  html = html.replace('</body>', `${bodyInjection}\n</body>`);
  fs.writeFileSync('C:/Users/AFIFA SYED/.gemini/antigravity-ide/scratch/livingads-clone/index.html', html);
  console.log('Successfully injected 3D & GSAP enhancement suite into index.html');
} else {
  console.log('Already injected.');
}
