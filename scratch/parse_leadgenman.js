import fs from 'fs';

const filePath = `C:\\Users\\vallu\\.gemini\\antigravity-ide\\brain\\65b60d08-2e6c-4f12-b17c-6015f15e240d\\.system_generated\\steps\\257\\content.md`;
const raw = fs.readFileSync(filePath, 'utf8');

// Find all occurrences of text content or blocks
const decoded = raw
  .replace(/&quot;/g, '"')
  .replace(/&amp;/g, '&')
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>')
  .replace(/\\"/g, '"')
  .replace(/\\n/g, '\n');

fs.writeFileSync('scratch/decoded_content.txt', decoded);
console.log("Wrote decoded_content.txt, length:", decoded.length);
