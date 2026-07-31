import fs from 'fs';

const rawVibe = JSON.parse(fs.readFileSync('scratch/official_15_vibe_coding_prompts.json', 'utf8'));

// Format each prompt for prompts.json
const promptsToAdd = rawVibe.map((p, idx) => {
  const slug = `vibe-coding-${p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`;
  
  // Extract parameters like [SERVICE / API], [APPROVED SPEC], etc.
  const paramMatches = Array.from(p.content.matchAll(/\[([A-Z0-9\s\/_\-]+)\]/g)).map(m => m[1]);
  const uniqueParams = Array.from(new Set(paramMatches));
  
  const parameters = uniqueParams.map(name => ({
    name: name.toLowerCase().replace(/[^a-z0-9]+/g, '_'),
    label: name,
    defaultValue: name
  }));

  return {
    id: `prompt-vibe-${idx + 1}`,
    title: `${p.number} -- ${p.title}`,
    slug: slug,
    category: "antigravity",
    categoryName: "Antigravity & Vibe Coding",
    aiModel: "Google Antigravity & Claude 3.5",
    aiModelId: "antigravity",
    difficulty: "Advanced",
    readingTime: "3 min",
    views: 9500 + idx * 320,
    copies: 4100 + idx * 180,
    rating: 5.0,
    featured: true,
    trending: true,
    isLatest: true,
    tags: ["Vibe Coding", "Antigravity", "Claude Code", "System Rules", "Autonomous Agent"],
    description: `Official Vibe Coding system prompt #${p.number}: ${p.title}. Designed for Claude Code, Antigravity, and Cursor.`,
    content: p.content.replace(/&amp;/g, '&'),
    parameters: parameters.length > 0 ? parameters : [{ name: "project_goal", label: "Project Goal", defaultValue: "Build full-stack web app" }]
  };
});

fs.writeFileSync('scratch/formatted_vibe_prompts.json', JSON.stringify(promptsToAdd, null, 2));
console.log("Formatted 15 Vibe Coding prompts ready for insertion!");
