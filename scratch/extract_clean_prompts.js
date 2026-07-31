import fs from 'fs';

const rawStr = JSON.parse(fs.readFileSync('scratch/page_content_raw.json', 'utf8'));

// Parse outer array
const tabs = JSON.parse(rawStr);
const tabContentStr = tabs[0].tab_content;
const blocks = JSON.parse(tabContentStr);

console.log("Total blocks in page:", blocks.length);

const promptsList = [];
let currentPrompt = null;

blocks.forEach((b, idx) => {
  const type = b.type;
  let text = '';

  if (Array.isArray(b.content)) {
    text = b.content.map(c => c.text || '').join('');
  } else if (typeof b.content === 'string') {
    text = b.content;
  }

  if (type === 'heading') {
    const level = b.props?.level;
    if (text.match(/^\d+\./)) {
      if (currentPrompt) promptsList.push(currentPrompt);
      currentPrompt = {
        number: text.split('.')[0],
        title: text.trim(),
        description: '',
        content: '',
        parameters: []
      };
    } else if (currentPrompt) {
      currentPrompt.title += ' ' + text.trim();
    }
  } else if (type === 'paragraph') {
    if (currentPrompt) {
      if (!currentPrompt.description) {
        currentPrompt.description = text.trim();
      } else {
        currentPrompt.description += '\n' + text.trim();
      }
    }
  } else if (type === 'codeBlock' || type === 'code' || b.props?.code) {
    const code = b.props?.code || text;
    if (currentPrompt) {
      currentPrompt.content = code.trim();
    }
  } else if (type === 'sp_code_block' || (b.props && b.props.code)) {
    if (currentPrompt) {
      currentPrompt.content = (b.props.code || text).trim();
    }
  }
});

if (currentPrompt) promptsList.push(currentPrompt);

console.log(`Parsed ${promptsList.length} prompts!`);
fs.writeFileSync('scratch/15_vibe_coding_prompts.json', JSON.stringify(promptsList, null, 2));

// Print summary of parsed prompts
promptsList.forEach((p, i) => {
  console.log(`[${i+1}] ${p.title} | Desc len: ${p.description.length} | Code len: ${p.content.length}`);
});
