import fs from 'fs';

const text = fs.readFileSync('scratch/decoded_content.txt', 'utf8');

// Use regex to find text blocks in subpage structure
// Subpage uses blocks with type "sp_heading", "sp_paragraph", "sp_code_block"
const regex = /\\"content\\":\s*\\"([^"]+)\\"/g;

let matches = [];
let match;
while ((match = regex.exec(text)) !== null) {
  let val = match[1].replace(/\\\\n/g, '\n').replace(/\\\\"/g, '"').replace(/\\\\/g, '');
  if (val.trim()) {
    matches.push(val.trim());
  }
}

fs.writeFileSync('scratch/all_extracted_text.txt', matches.join('\n\n--- BLOCK ---\n\n'));
console.log(`Extracted ${matches.length} text blocks!`);
