import fs from 'fs';

const rawStr = JSON.parse(fs.readFileSync('scratch/page_content_raw.json', 'utf8'));
const tabs = JSON.parse(rawStr);
const blocks = JSON.parse(tabs[0].tab_content);

const vibePrompts = [];
let currentHeading = null;

blocks.forEach((b, idx) => {
  if (b.type === 'heading') {
    const text = b.content?.map(c => c.text || '').join('').trim();
    if (text && text.match(/^\d+/)) {
      currentHeading = text;
    }
  } else if (b.type === 'codeBlock' && currentHeading) {
    let codeText = b.content?.map(c => c.text || '').join('').trim();
    if (!codeText && b.props?.code) codeText = b.props.code;

    const parts = currentHeading.split('--');
    const num = parts[0].trim();
    const titleName = parts[1] ? parts[1].trim() : currentHeading;

    vibePrompts.push({
      id: `prompt-vibe-${num}`,
      number: num,
      title: titleName,
      fullHeading: currentHeading,
      aiModel: "Google Antigravity & Claude 3.5",
      category: "antigravity",
      categoryName: "Antigravity & Vibe Coding",
      content: codeText
    });
    currentHeading = null;
  }
});

console.log(`Successfully compiled ${vibePrompts.length} exact Vibe Coding Prompts from leadgenman.com!`);
fs.writeFileSync('scratch/official_15_vibe_coding_prompts.json', JSON.stringify(vibePrompts, null, 2));

vibePrompts.forEach(p => {
  console.log(`Prompt #${p.number}: ${p.title} (code length: ${p.content.length})`);
});
