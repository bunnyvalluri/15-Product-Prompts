import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Copy,
  Check,
  Bookmark,
  Eye,
  Share2,
  Star,
  Clock,
  Sparkles,
  FolderPlus
} from 'lucide-react';
import { Badge } from '../common/Badge';
import { useBookmarks } from '../../context/BookmarkContext';
import { useToast } from '../../context/ToastContext';

export function PromptCard({ prompt, onQuickView, onOpenSaveCollection }) {
  const [copied, setCopied] = useState(false);
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const { addToast } = useToast();

  const bookmarked = isBookmarked(prompt.id);

  const handleCopy = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(prompt.content);
    setCopied(true);
    addToast('Prompt copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const url = `${window.location.origin}/prompt/${prompt.id}`;
    navigator.clipboard.writeText(url);
    addToast('Prompt share link copied to clipboard!', 'info');
  };

  const difficultyColors = {
    Beginner: 'emerald',
    Intermediate: 'amber',
    Advanced: 'purple'
  };

  const getModelColor = (modelName) => {
    const name = (modelName || '').toLowerCase();
    if (name.includes('antigravity')) return 'bg-emerald-400';
    if (name.includes('claude')) return 'bg-amber-400';
    if (name.includes('cursor')) return 'bg-purple-400';
    if (name.includes('chatgpt') || name.includes('gpt')) return 'bg-cyan-400';
    if (name.includes('deepseek')) return 'bg-blue-400';
    return 'bg-cyan-400';
  };

  const paramCount = prompt.parameters ? prompt.parameters.length : 0;
  const wordCount = prompt.content ? prompt.content.split(/\s+/).length : 0;

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className="group relative flex flex-col justify-between glass-panel rounded-2xl p-4 sm:p-5 border border-slate-300 dark:border-slate-800 hover:border-emerald-500/60 dark:hover:border-emerald-400/60 hover:shadow-xl hover:shadow-emerald-500/10 transition-all"
    >
      <div>
        {/* Card Header: Category & Actions */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <Badge variant="cyan" size="sm">
              <Sparkles className="w-3 h-3" />
              {prompt.categoryName}
            </Badge>
            <Badge variant={difficultyColors[prompt.difficulty] || 'default'} size="sm">
              {prompt.difficulty}
            </Badge>
            {paramCount > 0 && (
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                {paramCount} {paramCount === 1 ? 'var' : 'vars'}
              </span>
            )}
          </div>

          <div className="flex items-center gap-0.5 shrink-0">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleBookmark(prompt.id, prompt.title);
              }}
              className={`p-1.5 rounded-lg transition-colors ${
                bookmarked
                  ? 'text-amber-500 bg-amber-500/10'
                  : 'text-slate-500 dark:text-slate-400 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              title={bookmarked ? 'Remove Bookmark' : 'Bookmark Prompt'}
            >
              <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-amber-500' : ''}`} />
            </button>

            {onOpenSaveCollection && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onOpenSaveCollection(prompt);
                }}
                className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-emerald-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Save to Collection"
              >
                <FolderPlus className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={handleShare}
              className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-emerald-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Share Prompt"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Title */}
        <Link to={`/prompt/${prompt.id}`} className="block group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
          <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white line-clamp-2 mb-2 leading-snug">
            {prompt.title}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed mb-3 font-medium">
          {prompt.description}
        </p>

        {/* Prompt Content Preview Box - Dark Terminal Code Styling */}
        <div className="relative mb-3.5 p-2.5 sm:p-3 rounded-xl bg-slate-950 text-emerald-400 font-mono text-[10px] sm:text-[11px] leading-relaxed border border-slate-800 overflow-hidden max-h-24 shadow-inner">
          <p className="line-clamp-3 opacity-95">{prompt.content}</p>
          <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Card Footer */}
      <div>
        {/* Model & Metadata Bar */}
        <div className="flex items-center justify-between text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 pb-2.5 mb-2.5 border-b border-slate-200 dark:border-slate-800/80">
          <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 truncate max-w-[140px] sm:max-w-none">
            <span className={`w-2 h-2 rounded-full ${getModelColor(prompt.aiModel)} inline-block shrink-0`} />
            {prompt.aiModel}
          </span>
          <div className="flex items-center gap-2.5 shrink-0">
            <span className="flex items-center gap-1" title="Estimated word count">
              <Clock className="w-3 h-3 text-slate-400" />
              ~{wordCount} words
            </span>
            <span className="flex items-center gap-1 text-amber-500 font-bold">
              <Star className="w-3 h-3 fill-amber-500" />
              {prompt.rating}
            </span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onQuickView && onQuickView(prompt)}
            className="flex items-center justify-center gap-1 px-2.5 py-2 rounded-xl text-[11px] sm:text-xs font-bold border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            Quick View
          </button>
          <button
            onClick={handleCopy}
            className={`flex items-center justify-center gap-1 px-2.5 py-2 rounded-xl text-[11px] sm:text-xs font-bold transition-all ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-md shadow-emerald-600/20'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                Copy Prompt
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
