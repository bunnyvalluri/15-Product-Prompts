import fs from 'fs';

const rawStr = JSON.parse(fs.readFileSync('scratch/page_content_raw.json', 'utf8'));
const tabs = JSON.parse(rawStr);
const blocks = JSON.parse(tabs[0].tab_content);

blocks.forEach((b, i) => {
  console.log(`Block ${i}: type=${b.type}`);
  if (b.content) console.log(`  content=`, JSON.stringify(b.content).substring(0, 100));
  if (b.props) console.log(`  props=`, JSON.stringify(b.props).substring(0, 100));
});
