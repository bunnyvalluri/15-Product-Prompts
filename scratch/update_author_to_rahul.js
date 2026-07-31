import fs from 'fs';

const blogs = JSON.parse(fs.readFileSync('src/data/blogs.json', 'utf8'));

const updatedBlogs = blogs.map(b => ({
  ...b,
  author: "VALLURI RAHUL",
  authorAvatar: "/valluri-rahul.jpg"
}));

fs.writeFileSync('src/data/blogs.json', JSON.stringify(updatedBlogs, null, 2));
console.log("Successfully updated all blogs author to VALLURI RAHUL!");
