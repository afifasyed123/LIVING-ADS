const fs = require('fs');

const s0 = fs.readFileSync('C:/Users/AFIFA SYED/.gemini/antigravity-ide/scratch/livingads-clone/script_0.js', 'utf8');

// Parse recorded endpoints
const lines = s0.split('\n');
const recordedStr = s0.substring(s0.indexOf('window.__REPLICA_RECORDED__=') + 'window.__REPLICA_RECORDED__='.length, s0.indexOf(';window.__REPLICA_TURNS__='));
try {
  const recorded = JSON.parse(recordedStr);
  console.log('Total recorded API responses:', Object.keys(recorded).length);
  const endpoints = Object.keys(recorded);
  endpoints.forEach(ep => {
    const item = recorded[ep];
    console.log(`Endpoint: ${ep} [Status: ${item.status}]`);
    if (item.type === 'application/json') {
      try {
        const parsed = JSON.parse(item.body);
        const keys = Object.keys(parsed);
        console.log(`  Keys:`, keys.slice(0, 10));
      } catch (e) {}
    }
  });
} catch (e) {
  console.log('Error parsing __REPLICA_RECORDED__:', e.message);
}

// Parse turns
const turnsStr = s0.substring(s0.indexOf('window.__REPLICA_TURNS__=') + 'window.__REPLICA_TURNS__='.length, s0.indexOf(';window.__REPLICA_WRITES__='));
try {
  const turns = JSON.parse(turnsStr);
  console.log('\nTotal recorded turns:', turns.length);
  turns.forEach(t => {
    console.log(`Turn: "${t.name}" | Prompt: "${t.prompt}" | Events: ${t.events ? t.events.length : 0}`);
  });
} catch (e) {
  console.log('Error parsing __REPLICA_TURNS__:', e.message);
}
