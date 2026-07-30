import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Clock,
  Star,
  Eye,
  Share2,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  FolderPlus,
  ArrowLeft
} from 'lucide-react';
import promptsData from '../data/prompts.json';
import { Badge } from '../components/common/Badge';
import { PromptVariableCustomizer } from '../components/prompts/PromptVariableCustomizer';
import { SaveToCollectionModal } from '../components/prompts/SaveToCollectionModal';
import { PromptCard } from '../components/prompts/PromptCard';
import { useBookmarks } from '../context/BookmarkContext';
import { useToast } from '../context/ToastContext';

export function PromptDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const [saveModalOpen, setSaveModalOpen] = useState(false);

  const promptIndex = promptsData.findIndex((p) => p.id === id);
  const prompt = promptsData[promptIndex] || promptsData[0];

  const prevPrompt = promptIndex > 0 ? promptsData[promptIndex - 1] : null;
  const nextPrompt = promptIndex < promptsData.length - 1 ? promptsData[promptIndex + 1] : null;

  const relatedPrompts = promptsData
    .filter((p) => p.id !== prompt.id && (p.category === prompt.category || p.aiModel === prompt.aiModel))
    .slice(0, 3);

  const bookmarked = isBookmarked(prompt.id);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    addToast('Prompt link copied to clipboard!', 'info');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Back Button Navigation */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-cyan-500 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Prompts
      </button>

      {/* Header Info Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-6 relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="cyan" size="md">
              <Sparkles className="w-3.5 h-3.5" />
              {prompt.categoryName}
            </Badge>
            <Badge variant="purple" size="md">{prompt.difficulty}</Badge>
            <span className="font-bold text-slate-800 dark:text-slate-200 text-xs">
              Model: {prompt.aiModel}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleBookmark(prompt.id, prompt.title)}
              className={`p-2 rounded-xl border transition-colors ${
                bookmarked
                  ? 'border-amber-500/50 bg-amber-500/10 text-amber-500'
                  : 'border-slate-300 dark:border-slate-700 text-slate-400 hover:text-amber-500'
              }`}
              title="Bookmark Prompt"
            >
              <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-amber-500' : ''}`} />
            </button>

            <button
              onClick={() => setSaveModalOpen(true)}
              className="p-2 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-400 hover:text-cyan-500 transition-colors"
              title="Save to Collection"
            >
              <FolderPlus className="w-4 h-4" />
            </button>

            <button
              onClick={handleShare}
              className="p-2 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-400 hover:text-cyan-500 transition-colors"
              title="Share Link"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
            {prompt.title}
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
            {prompt.description}
          </p>
        </div>

        {/* Tags & Metadata Row */}
        <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800/60 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-slate-400 font-semibold">Tags:</span>
            {prompt.tags.map((t, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-medium"
              >
                #{t}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {prompt.readingTime}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" />
              {prompt.views} views
            </span>
            <span className="flex items-center gap-1 text-amber-500 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-500" />
              {prompt.rating}
            </span>
          </div>
        </div>
      </div>

      {/* Main Interactive Customizer & Syntax Highlighter Component */}
      <section>
        <PromptVariableCustomizer prompt={prompt} />
      </section>

      {/* Prev / Next Prompt Navigation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-slate-200 dark:border-slate-800">
        {prevPrompt ? (
          <Link
            to={`/prompt/${prevPrompt.id}`}
            className="glass-panel p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-cyan-500/40 transition-colors group flex items-center gap-3"
          >
            <ChevronLeft className="w-5 h-5 text-slate-400 group-hover:text-cyan-500 transition-colors" />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Previous Prompt</span>
              <p className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">{prevPrompt.title}</p>
            </div>
          </Link>
        ) : <div />}

        {nextPrompt && (
          <Link
            to={`/prompt/${nextPrompt.id}`}
            className="glass-panel p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-cyan-500/40 transition-colors group flex items-center justify-end gap-3 text-right"
          >
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Next Prompt</span>
              <p className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">{nextPrompt.title}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-cyan-500 transition-colors" />
          </Link>
        )}
      </div>

      {/* Related Prompts Section */}
      {relatedPrompts.length > 0 && (
        <section className="space-y-6 pt-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Related Prompts</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPrompts.map((rp) => (
              <PromptCard key={rp.id} prompt={rp} />
            ))}
          </div>
        </section>
      )}

      {/* Save Collection Modal */}
      <SaveToCollectionModal
        prompt={prompt}
        isOpen={saveModalOpen}
        onClose={() => setSaveModalOpen(false)}
      />
    </div>
  );
}
