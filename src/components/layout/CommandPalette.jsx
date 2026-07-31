import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, Sparkles, Folder, FileText, ArrowRight, X } from 'lucide-react';
import promptsData from '../../data/prompts.json';
import categoriesData from '../../data/categories.json';

export function CommandPalette({ isOpen, onClose, onSelectPrompt }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedTag, setSelectedTag] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    setSelectedIndex(0);
  }, [query, selectedTag]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const quickTags = [
    { id: 'all', label: 'All' },
    { id: 'vibecoding', label: '⚡ Vibe Coding' },
    { id: 'antigravity', label: '🌌 Antigravity' },
    { id: 'cursor', label: '🎯 Cursor AI' },
    { id: 'claude', label: '🧠 Claude 3.5' },
    { id: 'chatgpt', label: '🤖 ChatGPT' },
  ];

  const filteredPrompts = promptsData.filter((p) => {
    const matchesQuery =
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase()) ||
      p.categoryName.toLowerCase().includes(query.toLowerCase()) ||
      (p.tags && p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase())));

    if (!matchesQuery) return false;

    if (selectedTag === 'all') return true;
    if (selectedTag === 'vibecoding') return p.categoryName.toLowerCase().includes('vibe') || (p.tags && p.tags.includes('vibe-coding'));
    if (selectedTag === 'antigravity') return p.aiModel.toLowerCase().includes('antigravity');
    if (selectedTag === 'cursor') return p.aiModel.toLowerCase().includes('cursor');
    if (selectedTag === 'claude') return p.aiModel.toLowerCase().includes('claude');
    if (selectedTag === 'chatgpt') return p.aiModel.toLowerCase().includes('chatgpt') || p.aiModel.toLowerCase().includes('gpt');
    return true;
  }).slice(0, 7);

  const filteredCategories = categoriesData.filter(
    (c) => c.name.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 3);

  const handleSelectPrompt = (prompt) => {
    onClose();
    if (onSelectPrompt) {
      onSelectPrompt(prompt);
    } else {
      navigate(`/prompt/${prompt.id}`);
    }
  };

  const handleSelectCategory = (cat) => {
    onClose();
    navigate(`/explore?category=${cat.id}`);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-20 px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -10 }}
          transition={{ duration: 0.15 }}
          className="relative w-full max-w-2xl glass-panel rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden z-10"
        >
          {/* Search Header */}
          <div className="flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-slate-800 gap-3 bg-slate-50/50 dark:bg-slate-900/50">
            <Search className="w-5 h-5 text-cyan-500 shrink-0" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search 15 system prompts by title, model, tag..."
              className="w-full bg-transparent text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none font-medium"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-xs font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 px-1.5 py-0.5 rounded bg-slate-200/50 dark:bg-slate-800"
              >
                Clear
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Tag Pills */}
          <div className="px-4 py-2 border-b border-slate-200/60 dark:border-slate-800/60 flex items-center gap-1.5 overflow-x-auto touch-scroll no-scrollbar">
            {quickTags.map((tag) => (
              <button
                key={tag.id}
                onClick={() => setSelectedTag(tag.id)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all whitespace-nowrap ${
                  selectedTag === tag.id
                    ? 'bg-cyan-500 text-white shadow-sm shadow-cyan-500/30'
                    : 'bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                {tag.label}
              </button>
            ))}
          </div>

          {/* Results Area */}
          <div className="max-h-[380px] overflow-y-auto p-3 space-y-4">
            {/* Prompts Section */}
            {filteredPrompts.length > 0 && (
              <div>
                <div className="flex items-center justify-between px-3 mb-1">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 dark:text-slate-500">
                    System Prompts ({filteredPrompts.length})
                  </span>
                  <span className="text-[10px] text-cyan-500 font-medium">Click or press Enter to view</span>
                </div>
                <div className="space-y-1">
                  {filteredPrompts.map((p, idx) => (
                    <button
                      key={p.id}
                      onClick={() => handleSelectPrompt(p)}
                      className={`w-full text-left flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all group ${
                        selectedIndex === idx
                          ? 'bg-cyan-500/10 border border-cyan-500/30 dark:bg-cyan-500/15'
                          : 'hover:bg-slate-100 dark:hover:bg-slate-800/60 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 text-cyan-500 flex items-center justify-center shrink-0">
                          <Sparkles className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-cyan-500 transition-colors truncate">
                            {p.title}
                          </p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                            {p.categoryName} • <span className="text-cyan-600 dark:text-cyan-400 font-semibold">{p.aiModel}</span>
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-200/60 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                          {p.difficulty}
                        </span>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-500 group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Categories Section */}
            {filteredCategories.length > 0 && (
              <div>
                <span className="px-3 text-[10px] uppercase tracking-wider font-bold text-slate-400 dark:text-slate-500">
                  Categories ({filteredCategories.length})
                </span>
                <div className="mt-1 space-y-1">
                  {filteredCategories.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => handleSelectCategory(c)}
                      className="w-full text-left flex items-center justify-between px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 group transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Folder className="w-4 h-4 text-amber-500" />
                        <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                          {c.name} ({c.promptCount} prompts)
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-all" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {filteredPrompts.length === 0 && filteredCategories.length === 0 && (
              <div className="py-12 text-center text-slate-400 space-y-2">
                <FileText className="w-8 h-8 mx-auto text-slate-500 opacity-50" />
                <p className="text-sm font-semibold">No prompts found for &quot;{query}&quot;</p>
                <p className="text-xs text-slate-500">Try searching for keywords like &quot;Vibe Coding&quot;, &quot;Antigravity&quot;, or &quot;Cursor&quot;.</p>
              </div>
            )}
          </div>

          {/* Footer Shortcuts */}
          <div className="px-4 py-2.5 bg-slate-100/80 dark:bg-slate-900/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1 font-medium">
              <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[10px]">⌘K</kbd> or <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[10px]">Ctrl+K</kbd> anywhere to toggle
            </span>
            <div className="flex items-center gap-2">
              <span>Press <kbd className="px-1 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[10px]">ESC</kbd> to close</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
