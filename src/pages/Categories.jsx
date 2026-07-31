import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Grid, ArrowRight, Zap, Bot, Cpu, Sparkles, Code2, GitBranch, Wind, Heart, Terminal, Image, Layers, Palette, Binary, TrendingUp, Briefcase, PenTool, Workflow, Layout, GraduationCap, CheckCircle2 } from 'lucide-react';
import categoriesData from '../data/categories.json';

const iconMap = {
  Bot,
  Cpu,
  Sparkles,
  Code2,
  GitBranch,
  Zap,
  Wind,
  Heart,
  Terminal,
  Image,
  Layers,
  Palette,
  Binary,
  TrendingUp,
  Briefcase,
  PenTool,
  Workflow,
  Layout,
  GraduationCap,
  CheckCircle2
};

export function Categories() {
  const [query, setQuery] = useState('');

  const filteredCategories = categoriesData.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Grid className="w-7 h-7 text-cyan-500" />
            Prompt Categories
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Browse our curated ecosystem across 20 specialized domains and AI models.
          </p>
        </div>

        {/* Search filter */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-cyan-500 absolute left-3 top-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter categories..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>
      </div>

      {/* Grid of Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredCategories.map((cat) => {
          const IconComponent = iconMap[cat.icon] || Zap;
          return (
            <Link
              key={cat.id}
              to="/blog/15vibecodingprompts"
              className="group glass-panel rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800/80 hover:border-cyan-500/50 hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${cat.gradient} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-cyan-500 bg-cyan-500/10 px-2.5 py-1 rounded-full">
                    {cat.promptCount} Prompts
                  </span>
                </div>

                <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2 group-hover:text-cyan-500 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed mb-4">
                  {cat.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200/50 dark:border-slate-800/50 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-cyan-500">
                <span>Explore {cat.name}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
