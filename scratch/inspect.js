import fs from 'fs';

const text = fs.readFileSync('scratch/decoded_content.txt', 'utf8');

// Print first 2000 chars of decoded_content.txt starting at data-page
const pos = text.indexOf('data-page=');
console.log("data-page slice:");
console.log(text.substring(pos, pos + 1000));
