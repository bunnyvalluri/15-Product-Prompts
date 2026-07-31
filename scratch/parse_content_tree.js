import fs from 'fs';

const data = JSON.parse(fs.readFileSync('scratch/leadgenman_full.json', 'utf8'));
const content = data.props.page.content;

fs.writeFileSync('scratch/page_content_raw.json', JSON.stringify(content, null, 2));
console.log("Saved page_content_raw.json");

// Parse blocks inside content
let blocks = [];
if (typeof content === 'string') {
  try {
    blocks = JSON.parse(content);
  } catch (e) {
    console.log("content is string but not JSON");
  }
} else if (Array.isArray(content)) {
  blocks = content;
} else if (typeof content === 'object') {
  blocks = content.blocks || content.children || [content];
}

console.log("Top-level blocks type/count:", Array.isArray(blocks) ? blocks.length : typeof blocks);

// Iterate and collect headings, code blocks, paragraphs
const items = [];
function walk(node) {
  if (!node) return;
  if (Array.isArray(node)) {
    node.forEach(walk);
    return;
  }
  if (typeof node === 'object') {
    if (node.type || node.props) {
      items.push({
        type: node.type || node.component,
        props: node.props,
        content: node.content,
        text: node.props?.text || node.props?.code || node.props?.content || node.props?.title
      });
    }
    if (node.children) walk(node.children);
    if (node.content && typeof node.content === 'object') walk(node.content);
  }
}
walk(blocks);

fs.writeFileSync('scratch/all_parsed_items.json', JSON.stringify(items, null, 2));
console.log(`Parsed ${items.length} structured items!`);
