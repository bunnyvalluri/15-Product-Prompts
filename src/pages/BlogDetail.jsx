import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Clock,
  Calendar,
  Share2,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  Zap,
  Code2,
  Table as TableIcon,
  ChevronUp,
  Bookmark
} from 'lucide-react';
import blogsData from '../data/blogs.json';
import promptsData from '../data/prompts.json';
import { Badge } from '../components/common/Badge';
import { useToast } from '../context/ToastContext';
import { useBookmarks } from '../context/BookmarkContext';

export function BlogDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const [copiedId, setCopiedId] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activePromptIndex, setActivePromptIndex] = useState(0);

  const blog = blogsData.find((b) => b.slug === slug) || blogsData[0];
  const isVibeCollection = blog.slug === '15vibecodingprompts' || blog.slug === '15-vibe-coding-prompts' || blog.slug === '15-micro-saas-idea-prompts';

  // Get 15 Vibe Coding prompts from dataset
  const displayPrompts = promptsData.filter((p) => p.id.startsWith('prompt-vibe-'));

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(currentProgress);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    addToast('Article link copied to clipboard!', 'info');
  };

  const handleCopyPrompt = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    addToast('Prompt copied to clipboard!', 'success');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const scrollToPrompt = (index) => {
    const el = document.getElementById(`vibe-prompt-${index + 1}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 relative">
      {/* Top Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-slate-200/50 dark:bg-slate-800/50 z-50 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Quick Floating Back to Top Button */}
      {scrollProgress > 20 && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-slate-900/90 text-emerald-400 border border-emerald-500/30 shadow-2xl hover:scale-110 transition-all group"
          title="Back to top"
        >
          <ChevronUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      )}

      {/* Back Button */}
      <button
        onClick={() => navigate('/blog')}
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-emerald-400 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Articles & Prompts
      </button>

      {/* Header Info */}
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="cyan">{blog.category}</Badge>
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {blog.readTime}
          </span>
          <span className="text-xs text-slate-400 flex items-center gap-1 ml-auto">
            <Calendar className="w-3.5 h-3.5" />
            {blog.date}
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">
          {blog.title}
        </h1>

        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal border-l-4 border-emerald-400 pl-4 py-1">
          {blog.excerpt}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <img
              src={blog.authorAvatar}
              alt={blog.author}
              className="w-11 h-11 rounded-full object-cover border-2 border-emerald-400/40"
            />
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-white">{blog.author}</p>
              <p className="text-[10px] text-slate-400">15 Product Prompts Strategist</p>
            </div>
          </div>

          <button
            onClick={handleShare}
            className="p-2.5 rounded-xl border border-slate-300 dark:border-slate-800 text-slate-400 hover:text-emerald-400 hover:border-emerald-400/40 transition-colors"
            title="Share Article"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {isVibeCollection ? (
        <div className="space-y-12">
          {/* Banner */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-500/20 bg-gradient-to-r from-emerald-500/5 via-teal-500/5 to-cyan-500/5 space-y-4">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs tracking-wider uppercase">
              <Sparkles className="w-4 h-4" />
              15 Vibe Coding Prompts Blueprint
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Copy, Fill The Brackets & Ship
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Below is the complete list of 15 battle-tested Vibe Coding prompts for Claude Code, Google Antigravity, and Cursor. Click **Copy Prompt** to use immediately, or **Open in Editor** to customize parameters.
            </p>
          </div>

          {/* Overview Summary Table */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 overflow-hidden">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <TableIcon className="w-5 h-5 text-emerald-400" />
                15 Vibe Coding Prompts Summary Table
              </h3>
              <span className="text-xs text-slate-400 font-mono">15 Prompts</span>
            </div>

            <div className="overflow-x-auto touch-scroll">
              <table className="w-full text-left text-xs min-w-[600px]">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase tracking-wider font-semibold">
                    <th className="py-3 px-3">#</th>
                    <th className="py-3 px-3">Vibe Coding Prompt</th>
                    <th className="py-3 px-3">Description / Directives</th>
                    <th className="py-3 px-3">Model</th>
                    <th className="py-3 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-700 dark:text-slate-300">
                  {displayPrompts.map((p, idx) => (
                    <tr
                      key={p.id}
                      className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors group"
                    >
                      <td className="py-3 px-3 font-bold text-emerald-400 font-mono">{idx + 1}</td>
                      <td className="py-3 px-3 font-semibold text-slate-900 dark:text-white">
                        {p.title}
                      </td>
                      <td className="py-3 px-3 text-slate-500 dark:text-slate-400">{p.description}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-emerald-400 border border-emerald-500/20">
                          {p.aiModel}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={() => scrollToPrompt(idx)}
                          className="text-xs font-semibold text-emerald-400 hover:underline inline-flex items-center gap-1"
                        >
                          Jump to #{idx + 1}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 15 Detailed Prompt Cards */}
          <div className="space-y-10">
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
              <Code2 className="w-6 h-6 text-emerald-400" />
              15 Copyable Vibe Coding Prompts
            </h3>

            {displayPrompts.map((prompt, index) => {
              const isCopied = copiedId === prompt.id;
              return (
                <div
                  key={prompt.id}
                  id={`vibe-prompt-${index + 1}`}
                  className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 space-y-6 hover:border-emerald-500/30 transition-all scroll-mt-24"
                >
                  {/* Top Header Row */}
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center text-sm font-extrabold font-mono">
                        #{index + 1}
                      </span>
                      <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                        {prompt.title}
                      </h4>
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge variant="cyan">{prompt.categoryName}</Badge>
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                        {prompt.aiModel}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {prompt.description}
                  </p>

                  {/* Copyable Code Block */}
                  <div className="rounded-2xl border border-slate-300 dark:border-slate-800 bg-slate-950 overflow-hidden shadow-xl">
                    <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800">
                      <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-emerald-400" />
                        Prompt Code:
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleCopyPrompt(prompt.id, prompt.content)}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 transition-all"
                        >
                          {isCopied ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
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

                    <pre className="p-4 sm:p-6 text-xs sm:text-sm font-mono text-slate-200 leading-relaxed overflow-x-auto touch-scroll whitespace-pre-wrap break-words">
                      {prompt.content}
                    </pre>
                  </div>

                  {/* Parameters & Tags */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-200 dark:border-slate-800/80">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-semibold text-slate-400">Parameters:</span>
                      {prompt.parameters?.map((param) => (
                        <span
                          key={param.name}
                          className="px-2 py-0.5 rounded text-[11px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        >
                          {`[${param.label}]`}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5">
                      {prompt.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>


          {/* Related Categories Navigation */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400">
              Explore More Categories & Rules
            </h4>
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'Google Antigravity Rules', path: '/blog/15vibecodingprompts' },
                { label: 'Claude 3.5 Sonnet', path: '/blog/15vibecodingprompts' },
                { label: 'Cursor .cursorrules', path: '/blog/15vibecodingprompts' },
                { label: 'ChatGPT Prompts', path: '/blog/15vibecodingprompts' },
                { label: 'Database & API Specs', path: '/blog/15vibecodingprompts' }
              ].map((item, idx) => (
                <Link
                  key={idx}
                  to={item.path}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-emerald-500/40 hover:text-emerald-400 transition-all"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Regular Article Renderer */
        <article className="glass-panel p-6 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-sm leading-relaxed space-y-6">
          <div className="whitespace-pre-wrap space-y-4">
            {blog.content}
          </div>
        </article>
      )}
    </div>
  );
}
