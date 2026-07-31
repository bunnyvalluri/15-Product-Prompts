import fs from 'fs';

// 1. Read existing prompts.json & newly formatted vibe prompts
const existingPrompts = JSON.parse(fs.readFileSync('src/data/prompts.json', 'utf8'));
const vibePrompts = JSON.parse(fs.readFileSync('scratch/formatted_vibe_prompts.json', 'utf8'));

// Filter out old prompt-vibe-* if any, then prepend the 15 Vibe Coding prompts
const cleanPrompts = existingPrompts.filter(p => !p.id.startsWith('prompt-vibe-'));
const finalPrompts = [...vibePrompts, ...cleanPrompts];

fs.writeFileSync('src/data/prompts.json', JSON.stringify(finalPrompts, null, 2));
console.log(`Updated prompts.json with ${finalPrompts.length} total prompts!`);

// 2. Read existing blogs.json & insert 15 Vibe Coding Prompts flagship article
const existingBlogs = JSON.parse(fs.readFileSync('src/data/blogs.json', 'utf8'));

const vibeBlogArticle = {
  id: "blog-vibe-15",
  slug: "15vibecodingprompts",
  title: "15 Vibe Coding Prompts: The Ultimate AI System Rules & Vibe Coding Blueprint",
  excerpt: "Master autonomous AI development with 15 battle-tested Vibe Coding prompts for Claude Code, Google Antigravity, and Cursor IDE. Copy, fill the parameters, and ship.",
  author: "Manthan & Alex Rivera",
  authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250",
  date: "July 31, 2026",
  readTime: "10 min read",
  category: "Vibe Coding & System Rules",
  tags: ["Vibe Coding", "Antigravity", "Claude Code", "Cursor", "System Rules", "Solopreneur"],
  isFeatured: true,
  content: "Copy, fill the brackets, ship. One prompt for every stage of autonomous AI development.\n\nWhether you are writing full PRDs, setting up system rules, running ultra plan mode, wiring up MCP servers, connecting databases, auditing security vulnerabilities, debugging stack traces, or writing clean git commits—this collection gives you the exact production-grade prompts.\n\n---\n\n### Overview Summary Table\n\n| # | Vibe Coding Prompt | Target Stage | Key Directives | Best Model |\n|---|---|---|---|---|\n| 01 | Write a Full PRD | Planning | Scope, System Flow & Edge Cases | Claude 3.5 Sonnet |\n| 02 | Create Your System Rules | Rules | Architecture & Guardrails | Antigravity / Cursor |\n| 03 | Ultra Plan Mode | Architecture | 2-3 Options & Rollback Risks | Claude 3.5 Sonnet |\n| 04 | Spec-Driven Development | Execution | Spec-Driven Task Breakdown | Claude 3.5 / Antigravity |\n| 05 | Full UI & UX Design Brief | Design | Glassmorphism & Token System | Claude 3.5 Sonnet |\n| 06 | Implementation Plan | Engineering | Non-breaking Sequential Phases | Claude 3.5 Sonnet |\n| 07 | Wire Up an MCP Server | Integration | Tool Manifest & Secret Isolation | Antigravity / Claude |\n| 08 | Connect Your Database | Data Layer | Migrations & ORM Schema | Claude 3.5 Sonnet |\n| 09 | Find Security Gaps | Security Audit | OWASP Audit & Exploit Prevention | Claude 3.5 Sonnet |\n| 10 | Debug an Error Fast | Debugging | Root Cause Isolation & Fix | Claude 3.5 Sonnet |\n| 11 | E2E Test Your Application | Testing | Playwright & Critical User Flow | Claude 3.5 Sonnet |\n| 12 | Clean Up Dead Code | Refactoring | Unused Export Cleanup | Claude 3.5 Sonnet |\n| 13 | Write Clean Git Commits | Version Control | Conventional Commits | Claude 3.5 Sonnet |\n| 14 | Hooks as Guardrails | Dev Environment | Pre-commit Checks | Antigravity / Claude |\n| 15 | Turn a Task Into a Skill | Automation | Reusable Skill Scaffolding | Claude 3.5 Sonnet |"
};

const cleanBlogs = existingBlogs.filter(b => b.slug !== '15vibecodingprompts' && b.slug !== '15-vibe-coding-prompts');
const finalBlogs = [vibeBlogArticle, ...cleanBlogs];

fs.writeFileSync('src/data/blogs.json', JSON.stringify(finalBlogs, null, 2));
console.log(`Updated blogs.json with flagship 15vibecodingprompts article!`);
