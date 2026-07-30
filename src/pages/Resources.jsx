import { useState } from 'react';
import { BookOpen, Download, FileText, Code, Grid, Sparkles } from 'lucide-react';
import resourcesData from '../data/resources.json';
import { useToast } from '../context/ToastContext';
import { Badge } from '../components/common/Badge';

const iconMap = {
  FileText,
  Code,
  Grid,
  BookOpen
};

export function Resources() {
  const { addToast } = useToast();
  const [filterCategory, setFilterCategory] = useState('all');

  const filteredResources = resourcesData.filter(
    (r) => filterCategory === 'all' || r.category.toLowerCase().includes(filterCategory.toLowerCase())
  );

  const handleDownload = (res) => {
    addToast(`Downloading "${res.title}" (${res.fileSize})`, 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <BookOpen className="w-7 h-7 text-cyan-500" />
          Prompt Engineering Resources
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Download cheat sheets, starter templates, PDF guides, and architectural whitepapers.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {['all', 'cheat sheets', 'templates', 'articles'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize whitespace-nowrap transition-all ${
              filterCategory === cat
                ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/20'
                : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Resource Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredResources.map((res) => {
          const IconComponent = iconMap[res.icon] || FileText;
          return (
            <div
              key={res.id}
              className="glass-panel p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 hover:border-cyan-500/40 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center font-bold">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <Badge variant="cyan">{res.type}</Badge>
                </div>

                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  {res.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {res.description}
                </p>

                <div className="flex items-center gap-2 flex-wrap pt-2">
                  {res.tags.map((t, idx) => (
                    <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">{res.fileSize}</span>
                <button
                  onClick={() => handleDownload(res)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold shadow-md shadow-cyan-500/20 hover:from-cyan-400 hover:to-blue-500 transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download Resource
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
