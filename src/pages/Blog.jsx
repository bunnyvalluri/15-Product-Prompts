import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, ArrowRight, User } from 'lucide-react';
import blogsData from '../data/blogs.json';
import { Badge } from '../components/common/Badge';

export function Blog() {
  const [selectedTag, setSelectedTag] = useState('all');

  const filteredBlogs = blogsData.filter(
    (b) => selectedTag === 'all' || b.tags.some((t) => t.toLowerCase() === selectedTag.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <BookOpen className="w-7 h-7 text-cyan-500" />
          Prompt Engineering Blog
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl">
          Deep dives into LLM reasoning frameworks, security hardening, and autonomous agent workflows.
        </p>
      </div>

      {/* Tag Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {['all', 'reasoning', 'antigravity', 'security'].map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize whitespace-nowrap transition-all ${
              selectedTag === tag
                ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/20'
                : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredBlogs.map((blog) => (
          <Link
            key={blog.id}
            to={`/blog/${blog.slug}`}
            className="group glass-panel rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800/80 hover:border-cyan-500/40 hover:shadow-xl transition-all flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="cyan">{blog.category}</Badge>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {blog.readTime}
                </span>
              </div>

              <h2 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-cyan-500 transition-colors leading-snug">
                {blog.title}
              </h2>

              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                {blog.excerpt}
              </p>
            </div>

            <div className="pt-4 mt-6 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <img
                  src={blog.authorAvatar}
                  alt={blog.author}
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="font-semibold text-slate-700 dark:text-slate-300">{blog.author}</span>
              </div>
              <span className="font-bold text-cyan-500 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                Read Article <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
