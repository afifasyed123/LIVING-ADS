const fs = require('fs');

const s0 = fs.readFileSync('C:/Users/AFIFA SYED/.gemini/antigravity-ide/scratch/livingads-clone/script_0.js', 'utf8');
const s1 = fs.readFileSync('C:/Users/AFIFA SYED/.gemini/antigravity-ide/scratch/livingads-clone/script_1.js', 'utf8');
const s2 = fs.readFileSync('C:/Users/AFIFA SYED/.gemini/antigravity-ide/scratch/livingads-clone/script_2.js', 'utf8');

const matchKeys = s0.match(/window\.__REPLICA_[A-Z_]+__/g);
console.log('Replica keys defined in Script 0:', [...new Set(matchKeys)]);

const endpointMatches = s0.match(/"(GET|POST|PUT|DELETE|PATCH) [^"]+"/g);
if (endpointMatches) {
  const uniqueEndpoints = [...new Set(endpointMatches)];
  console.log('Unique endpoints (' + uniqueEndpoints.length + '):');
  uniqueEndpoints.forEach(e => console.log('  ', e));
}

console.log('\n--- Script 2 Details ---');
const lines = s2.split('\n');
lines.forEach(l => {
  if (l.includes('F.on(') || l.includes('synth(') || l.includes('function ') || l.includes('const ') || l.includes('TURNS.')) {
    console.log('  ', l.trim().slice(0, 100));
  }
});
