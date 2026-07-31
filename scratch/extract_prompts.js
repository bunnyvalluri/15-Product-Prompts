import fs from 'fs';

const data = JSON.parse(fs.readFileSync('scratch/leadgenman_full.json', 'utf8'));

// Extract page content components
const pageData = data.props.page;
console.log("Page Title:", pageData.name || pageData.title);

const blocks = pageData.content || pageData.blocks || [];

function extractBlocks(node, list = []) {
  if (!node) return list;
  if (Array.isArray(node)) {
    node.forEach(n => extractBlocks(n, list));
  } else if (typeof node === 'object') {
    if (node.type || node.props) {
      list.push(node);
    }
    if (node.children) extractBlocks(node.children, list);
    if (node.content) extractBlocks(node.content, list);
  }
  return list;
}

const allNodes = extractBlocks(pageData);
fs.writeFileSync('scratch/all_nodes.json', JSON.stringify(allNodes, null, 2));

console.log("Found nodes count:", allNodes.length);
