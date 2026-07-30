# PromptForge AI – Modern AI System Prompt Library & Editor

**PromptForge AI** is a premium, production-grade frontend web application designed for discovering, customizing, building, and managing AI system prompts and vibe-coding directives. Built for ChatGPT, Claude 3.5 Sonnet, Gemini 1.5 Pro, Cursor AI, Google Antigravity, and Midjourney.

---

## 🌟 Key Features

- **100% Client-Side Architecture**: Zero backend, zero database, zero authentication dependencies.
- **Dynamic Parameter Customizer**: Prompts include `{{parameter}}` variables that can be edited in real-time.
- **Dual-Pane Prompt Editor**: Live Markdown editor with real-time preview, variable detection, template selection, and history stack.
- **LocalStorage Collections & Bookmarks**: Create custom folders, bookmark favorite prompts, and export/import collections as `.json` files.
- **Global Command Palette (`Cmd+K` / `Ctrl+K`)**: Instant search for prompts and categories anywhere in the app.
- **20+ Tailored Categories & AI Models**: Explore prompt engineering tools for coding, marketing, writing, Midjourney photorealism, and agentic workflows.
- **Dark Mode & Glassmorphism Design**: High-contrast, accessible theme system with ambient mesh gradients and Framer Motion micro-interactions.

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18 or higher) and `npm` installed.

### Installation

```bash
# Clone or open project folder
cd "15 Prompts"

# Install dependencies
npm install
```

### Running Locally

```bash
# Start Vite development server
npm run dev
```

Open your browser at `http://localhost:5173` (or the URL displayed in your terminal).

### Production Build

```bash
# Build production bundle
npm run build

# Preview build locally
npm run preview
```

---

## 🛠️ Technology Stack

- **Framework**: React.js 19 + Vite
- **Styling**: Tailwind CSS v4 + Custom Glassmorphism
- **Animations**: Framer Motion
- **Icons**: Lucide React + React Icons
- **Form Handling**: React Hook Form
- **Routing**: React Router DOM v7
- **Persistence**: Browser `LocalStorage`
