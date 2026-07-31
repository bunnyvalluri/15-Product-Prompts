import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, Grid, List, Sparkles, X, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';
import promptsData from '../data/prompts.json';
import categoriesData from '../data/categories.json';
import modelsData from '../data/models.json';
import { PromptCard } from '../components/prompts/PromptCard';
import { PromptDetailModal } from '../components/prompts/PromptDetailModal';
import { SaveToCollectionModal } from '../components/prompts/SaveToCollectionModal';

export function Explore() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Filter States
  const [query, setQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [selectedModel, setSelectedModel] = useState(searchParams.get('model') || 'all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Selected prompt modals
  const [quickViewPrompt, setQuickViewPrompt] = useState(null);
  const [saveModalPrompt, setSaveModalPrompt] = useState(null);

  useEffect(() => {
    const q = searchParams.get('search');
    const cat = searchParams.get('category');
    const mod = searchParams.get('model');
    if (q !== null) setQuery(q);
    if (cat !== null) setSelectedCategory(cat);
    if (mod !== null) setSelectedModel(mod);
  }, [searchParams]);

  // Filtering Logic
  const filteredPrompts = useMemo(() => {
    return promptsData
      .filter((p) => {
        const matchesQuery =
          !query.trim() ||
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase()) ||
          p.categoryName.toLowerCase().includes(query.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()));

        const matchesCategory =
          selectedCategory === 'all' || p.category.toLowerCase() === selectedCategory.toLowerCase();

        const matchesModel =
          selectedModel === 'all' || p.aiModelId === selectedModel || p.aiModel.toLowerCase().includes(selectedModel.toLowerCase());

        const matchesDifficulty =
          selectedDifficulty === 'all' || p.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();

        return matchesQuery && matchesCategory && matchesModel && matchesDifficulty;
      })
      .sort((a, b) => {
        if (sortBy === 'popular') return b.views - a.views;
        if (sortBy === 'newest') return b.isLatest ? 1 : -1;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'title') return a.title.localeCompare(b.title);
        return 0;
      });
  }, [query, selectedCategory, selectedModel, selectedDifficulty, sortBy]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredPrompts.length / itemsPerPage) || 1;
  const paginatedPrompts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredPrompts.slice(start, start + itemsPerPage);
  }, [filteredPrompts, currentPage]);

  const handleResetFilters = () => {
    setQuery('');
    setSelectedCategory('all');
    setSelectedModel('all');
    setSelectedDifficulty('all');
    setSortBy('popular');
    setSearchParams({});
    setCurrentPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="space-y-2 text-center sm:text-left">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <Sparkles className="w-7 h-7 text-cyan-500" />
          Explore AI System Prompts
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl">
          Search, filter, customize variables, and copy high-performance system instructions for modern AI models.
        </p>
      </div>

      {/* Control Panel: Search & Filter Toolbar */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
        {/* Top Search Bar & View Mode Toggle */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-cyan-500 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search prompts by keyword, tag, or technology..."
              className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest First</option>
              <option value="title">Alphabetical (A-Z)</option>
            </select>

            <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-cyan-500 text-white' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-cyan-500 text-white' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Filter Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-200/60 dark:border-slate-800/60">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="all">All Categories (20)</option>
              {categoriesData.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.promptCount})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              AI Model
            </label>
            <select
              value={selectedModel}
              onChange={(e) => {
                setSelectedModel(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="all">All Models</option>
              {modelsData.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Difficulty
            </label>
            <select
              value={selectedDifficulty}
              onChange={(e) => {
                setSelectedDifficulty(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>

        {/* Active Filter Chips */}
        {(query || selectedCategory !== 'all' || selectedModel !== 'all' || selectedDifficulty !== 'all') && (
          <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-slate-200/60 dark:border-slate-800/60 text-xs">
            <span className="text-slate-400 font-semibold">Active Filters:</span>
            {query && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-medium border border-cyan-500/20">
                Search: &quot;{query}&quot;
                <button onClick={() => setQuery('')} className="hover:text-cyan-800 dark:hover:text-white">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedCategory !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 font-medium border border-purple-500/20">
                Cat: {categoriesData.find((c) => c.id === selectedCategory)?.name || selectedCategory}
                <button onClick={() => setSelectedCategory('all')} className="hover:text-purple-800 dark:hover:text-white">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedModel !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 font-medium border border-amber-500/20">
                Model: {selectedModel}
                <button onClick={() => setSelectedModel('all')} className="hover:text-amber-800 dark:hover:text-white">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedDifficulty !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium border border-emerald-500/20">
                Level: {selectedDifficulty}
                <button onClick={() => setSelectedDifficulty('all')} className="hover:text-emerald-800 dark:hover:text-white">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            <button
              onClick={handleResetFilters}
              className="flex items-center gap-1 text-cyan-500 hover:text-cyan-400 font-semibold ml-auto"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Clear All ({filteredPrompts.length} matches)
            </button>
          </div>
        )}
      </div>

      {/* Prompts Display */}
      {paginatedPrompts.length > 0 ? (
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
          }
        >
          {paginatedPrompts.map((prompt) => (
            <PromptCard
              key={prompt.id}
              prompt={prompt}
              onQuickView={setQuickViewPrompt}
              onOpenSaveCollection={setSaveModalPrompt}
            />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center glass-panel rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
          <Filter className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">No Prompts Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search keywords, category filters, or selected difficulty level.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 rounded-xl bg-cyan-500 text-white text-xs font-semibold hover:bg-cyan-400 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-6 border-t border-slate-200 dark:border-slate-800 text-xs">
          <span className="text-slate-500">
            Page <span className="font-bold text-slate-900 dark:text-white">{currentPage}</span> of{' '}
            <span className="font-bold text-slate-900 dark:text-white">{totalPages}</span>
          </span>

          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-300 disabled:opacity-40 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-300 disabled:opacity-40 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Modals */}
      <PromptDetailModal
        prompt={quickViewPrompt}
        isOpen={!!quickViewPrompt}
        onClose={() => setQuickViewPrompt(null)}
      />

      <SaveToCollectionModal
        prompt={saveModalPrompt}
        isOpen={!!saveModalPrompt}
        onClose={() => setSaveModalPrompt(null)}
      />
    </div>
  );
}
