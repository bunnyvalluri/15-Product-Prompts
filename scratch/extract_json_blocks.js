import fs from 'fs';

const text = fs.readFileSync('scratch/decoded_content.txt', 'utf8');

// Find JSON data inside data-page attribute
const match = text.match(/data-page="([^"]+)"/);
if (match) {
  let str = match[1];
  try {
    const obj = JSON.parse(str);
    const contentData = obj.props?.pageData?.content || obj.props?.page?.content || obj.props;
    fs.writeFileSync('scratch/full_page_props.json', JSON.stringify(obj, null, 2));
    console.log("Saved full_page_props.json");
  } catch (err) {
    console.log("JSON parse error, trying cleanup:", err.message);
  }
}
