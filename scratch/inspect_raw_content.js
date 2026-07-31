import fs from 'fs';

const raw = JSON.parse(fs.readFileSync('scratch/page_content_raw.json', 'utf8'));

console.log("Type of raw:", typeof raw);
if (typeof raw === 'object') {
  console.log("Keys of raw:", Object.keys(raw));
}
if (typeof raw === 'string') {
  console.log("String slice:", raw.substring(0, 500));
}
