import fs from 'fs';

const data = JSON.parse(fs.readFileSync('scratch/leadgenman_full.json', 'utf8'));

console.log("Keys in props:", Object.keys(data.props));
if (data.props.page) console.log("Keys in props.page:", Object.keys(data.props.page));
if (data.props.pageData) console.log("Keys in props.pageData:", Object.keys(data.props.pageData));
