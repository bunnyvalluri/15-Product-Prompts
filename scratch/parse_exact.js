import fs from 'fs';

const html = fs.readFileSync('C:\\Users\\vallu\\.gemini\\antigravity-ide\\brain\\65b60d08-2e6c-4f12-b17c-6015f15e240d\\.system_generated\\steps\\257\\content.md', 'utf8');

const startStr = 'data-page="';
const startIdx = html.indexOf(startStr);

if (startIdx !== -1) {
  const contentStart = startIdx + startStr.length;
  // Find the closing "> of the div
  const divEnd = html.indexOf('">', contentStart);
  let rawJsonStr = html.substring(contentStart, divEnd);
  
  // Replace HTML entity &quot; with "
  const jsonStr = rawJsonStr.replace(/&quot;/g, '"');
  
  try {
    const data = JSON.parse(jsonStr);
    fs.writeFileSync('scratch/leadgenman_full.json', JSON.stringify(data, null, 2));
    console.log("SUCCESSFULLY PARSED LEADGENMAN DATA!");
  } catch (e) {
    console.error("Parse failed:", e.message);
  }
}
