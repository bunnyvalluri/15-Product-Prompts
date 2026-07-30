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

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group relative flex flex-col justify-between glass-panel rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800/80 hover:border-cyan-500/50 dark:hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/10 transition-all"
    >
      <div>
        {/* Card Header: Category & Actions */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="cyan" size="sm">
              <Sparkles className="w-3 h-3" />
              {prompt.categoryName}
            </Badge>
            <Badge variant={difficultyColors[prompt.difficulty] || 'default'} size="sm">
              {prompt.difficulty}
            </Badge>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleBookmark(prompt.id, prompt.title);
              }}
              className={`p-1.5 rounded-lg transition-colors ${
                bookmarked
                  ? 'text-amber-500 bg-amber-500/10'
                  : 'text-slate-400 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800'
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
                className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Save to Collection"
              >
                <FolderPlus className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={handleShare}
              className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Share Prompt"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Title */}
        <Link to={`/prompt/${prompt.id}`} className="block group-hover:text-cyan-500 transition-colors">
          <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 line-clamp-2 mb-2 leading-snug">
            {prompt.title}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed mb-4">
          {prompt.description}
        </p>

        {/* Prompt Content Preview Box */}
        <div className="relative mb-4 p-3 rounded-xl bg-slate-100 dark:bg-slate-950/80 text-slate-800 dark:text-slate-300 font-mono text-[11px] leading-relaxed border border-slate-200 dark:border-slate-800 overflow-hidden max-h-24">
          <p className="line-clamp-3 opacity-90">{prompt.content}</p>
          <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-slate-100 dark:from-slate-950 to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Card Footer */}
      <div>
        {/* Model & Metadata Bar */}
        <div className="flex items-center justify-between text-xs text-slate-400 dark:text-slate-500 pb-3 mb-3 border-b border-slate-200/60 dark:border-slate-800/60">
          <span className="font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block" />
            {prompt.aiModel}
          </span>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {prompt.readingTime}
            </span>
            <span className="flex items-center gap-1 text-amber-500 font-semibold">
              <Star className="w-3 h-3 fill-amber-500" />
              {prompt.rating}
            </span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onQuickView && onQuickView(prompt)}
            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            Quick View
          </button>
          <button
            onClick={handleCopy}
            className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-md shadow-cyan-500/20'
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
