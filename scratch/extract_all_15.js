import fs from 'fs';

const text = fs.readFileSync('scratch/decoded_content.txt', 'utf8');

// Search for titles or blocks in decoded_content.txt
// Let's print out lines that contain "1.", "2.", "3." ... "15." or headers!

const lines = text.split('\n');
const headings = [];

lines.forEach((l, i) => {
  if (l.includes('###') || l.includes('15 Vibe') || (l.trim().startsWith('{') && l.includes('title')) || l.includes('Prompt')) {
    headings.push(`Line ${i}: ${l.substring(0, 150)}`);
  }
});

console.log(headings.slice(0, 60).join('\n'));
fs.writeFileSync('scratch/headings.txt', headings.join('\n'));
