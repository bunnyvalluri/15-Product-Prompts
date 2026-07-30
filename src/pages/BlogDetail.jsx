import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, User, Share2 } from 'lucide-react';
import blogsData from '../data/blogs.json';
import { Badge } from '../components/common/Badge';
import { useToast } from '../context/ToastContext';

export function BlogDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const blog = blogsData.find((b) => b.slug === slug) || blogsData[0];

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    addToast('Article link copied to clipboard!', 'info');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Back Button */}
      <button
        onClick={() => navigate('/blog')}
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-cyan-500 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Blog Articles
      </button>

      {/* Header Info */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
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

        <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <img
              src={blog.authorAvatar}
              alt={blog.author}
              className="w-10 h-10 rounded-full object-cover border border-cyan-500/40"
            />
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-white">{blog.author}</p>
              <p className="text-[10px] text-slate-400">Senior Prompt Specialist</p>
            </div>
          </div>

          <button
            onClick={handleShare}
            className="p-2 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-400 hover:text-cyan-500 transition-colors"
            title="Share Article"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <article className="glass-panel p-6 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-sm leading-relaxed space-y-6">
        <p className="text-base font-medium text-slate-600 dark:text-slate-300 italic border-l-4 border-cyan-500 pl-4">
          {blog.excerpt}
        </p>

        <div className="whitespace-pre-wrap space-y-4">
          {blog.content}
        </div>
      </article>
    </div>
  );
}
