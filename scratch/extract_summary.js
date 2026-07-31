import fs from 'fs';

const text = fs.readFileSync('scratch/decoded_content.txt', 'utf8');

// Match sections like "1.", "2.", "Prompt:", "Micro-SaaS", etc.
const lines = text.split('\n');
const extracted = [];

lines.forEach((l, idx) => {
  if (l.includes('Micro-SaaS') || l.includes('Vibe Coding') || l.includes('Prompt:') || l.match(/\d+\.\s+/)) {
    if (l.length < 200) {
      extracted.push(`Line ${idx}: ${l.trim()}`);
    }
  }
});

console.log(extracted.slice(0, 50).join('\n'));
fs.writeFileSync('scratch/extracted_summary.txt', extracted.join('\n'));
