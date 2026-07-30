import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, Sparkles, Folder, FileText, ArrowRight, X } from 'lucide-react';
import promptsData from '../../data/prompts.json';
import categoriesData from '../../data/categories.json';

export function CommandPalette({ isOpen, onClose, onSelectPrompt }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        isOpen ? onClose() : null; // Handled outside or toggled
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredPrompts = promptsData.filter(
    (p) =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase()) ||
      p.categoryName.toLowerCase().includes(query.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
  ).slice(0, 6);

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
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -10 }}
          transition={{ duration: 0.15 }}
          className="relative w-full max-w-2xl glass-panel rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden z-10"
        >
          {/* Search Header */}
          <div className="flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-slate-800 gap-3">
            <Search className="w-5 h-5 text-cyan-500 shrink-0" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a command or search prompts, categories, tags..."
              className="w-full bg-transparent text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none"
            />
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Results Area */}
          <div className="max-h-96 overflow-y-auto p-3 space-y-4">
            {/* Prompts Section */}
            {filteredPrompts.length > 0 && (
              <div>
                <span className="px-3 text-[10px] uppercase tracking-wider font-bold text-slate-400 dark:text-slate-500">
                  Prompts ({filteredPrompts.length})
                </span>
                <div className="mt-1 space-y-1">
                  {filteredPrompts.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => handleSelectPrompt(p)}
                      className="w-full text-left flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-cyan-500/10 dark:hover:bg-slate-800/80 group transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-500">
                          <Sparkles className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-cyan-500 transition-colors">
                            {p.title}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                            {p.categoryName} • {p.aiModel} • {p.difficulty}
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
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
                        <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
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
              <div className="py-12 text-center text-slate-400 text-sm">
                No matching prompts or categories found for &quot;{query}&quot;
              </div>
            )}
          </div>

          {/* Footer Shortcuts */}
          <div className="px-4 py-2 bg-slate-100/50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span>Navigation Tip: Type to search instantly</span>
            <div className="flex items-center gap-2">
              <span>Press <kbd className="px-1 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono">ESC</kbd> to exit</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
