import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Search,
  ArrowRight,
  Zap,
  Shield,
  Code2,
  Cpu,
  Bookmark,
  TrendingUp,
  Database,
  Users,
  Sliders,
  ChevronDown
} from 'lucide-react';
import promptsData from '../data/prompts.json';
import categoriesData from '../data/categories.json';
import modelsData from '../data/models.json';
import faqData from '../data/faq.json';
import { PromptCard } from '../components/prompts/PromptCard';
import { PromptDetailModal } from '../components/prompts/PromptDetailModal';
import { SaveToCollectionModal } from '../components/prompts/SaveToCollectionModal';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';

export function Home({ onOpenSearch }) {
  const navigate = useNavigate();
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [saveModalPrompt, setSaveModalPrompt] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState(0);

  const featuredPrompts = promptsData.filter((p) => p.featured).slice(0, 6);
  const trendingPrompts = promptsData.filter((p) => p.trending).slice(0, 4);

  const handleHeroSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="relative overflow-hidden space-y-16 sm:space-y-24 pb-16 sm:pb-20">
      {/* Background Ambient Mesh Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none -z-10 opacity-30 dark:opacity-20">
        <div className="absolute top-10 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-cyan-500/30 rounded-full blur-[100px] sm:blur-[120px] animate-pulse" />
        <div className="absolute top-32 right-1/4 w-80 sm:w-[450px] h-80 sm:h-[450px] bg-purple-500/25 rounded-full blur-[110px] sm:blur-[140px]" />
      </div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-16 lg:pt-20 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4 sm:space-y-6 max-w-4xl mx-auto"
        >
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full glass-panel border border-emerald-500/30 text-[11px] sm:text-xs font-semibold text-emerald-600 dark:text-emerald-400 shadow-sm max-w-full">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" />
            <span className="truncate">15 Product Prompts • 15 Micro-SaaS AI Blueprint Suite</span>
          </div>

          {/* Hero Heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15] px-2">
            Build & Launch Micro-SaaS With <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              15 Product System Prompts
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="text-sm sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed px-2">
            The flagship open-access collection of 15 battle-tested Micro-SaaS system prompts, parameter fillers, and vibe-coding tools for ChatGPT, Claude 3.5, Gemini, Cursor, and Google Antigravity.
          </p>

          {/* Hero Search Bar */}
          <form onSubmit={handleHeroSearch} className="max-w-2xl mx-auto pt-2 px-2">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center glass-panel rounded-2xl border border-slate-300 dark:border-slate-800 p-2 gap-2 shadow-xl">
              <div className="flex items-center gap-2 px-2 py-1.5 flex-1">
                <Search className="w-4 h-4 text-cyan-500 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search prompts by model or keyword..."
                  className="w-full bg-transparent text-slate-900 dark:text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-5 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold shadow-md shadow-cyan-500/25 shrink-0 transition-all text-center"
              >
                Search
              </button>
            </div>
          </form>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 px-2 max-w-md sm:max-w-none mx-auto">
            <Button
              size="lg"
              className="w-full sm:w-auto"
              onClick={() => navigate('/explore')}
              icon={ArrowRight}
              iconPosition="right"
            >
              Explore All Prompts
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto"
              onClick={() => navigate('/editor')}
              icon={Code2}
            >
              Open Live Prompt Editor
            </Button>
          </div>
        </motion.div>

        {/* Floating Preview Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto text-left"
        >
          {[
            {
              title: "Autonomous Vibe-Coding Prompt",
              model: "Google Antigravity",
              preview: "Act as an autonomous agentic pair programmer within Google Antigravity. Outline architecture before code...",
              badge: "Agentic AI",
              color: "from-cyan-500 to-blue-600"
            },
            {
              title: "Cursor .cursorrules Steering",
              model: "Cursor AI",
              preview: "Prefer functional components, modular hooks, Tailwind styling, and zero stub placeholders...",
              badge: "Developer Tool",
              color: "from-purple-500 to-indigo-600"
            },
            {
              title: "Deep Security Code Reviewer",
              model: "Claude 3.5 Sonnet",
              preview: "Identify OWASP top 10 flaws, unhandled exceptions, race conditions, and provide hardened refactors...",
              badge: "Top Rated",
              color: "from-amber-500 to-orange-600"
            }
          ].map((card, idx) => (
            <div
              key={idx}
              className="glass-card rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-800/80 shadow-lg hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group"
            >
              <div className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${card.color}`} />
              <div className="flex items-center justify-between gap-2 mb-2 sm:mb-3">
                <span className="text-[10px] uppercase font-bold tracking-wider text-cyan-600 dark:text-cyan-400 truncate">
                  {card.model}
                </span>
                <Badge variant="cyan" size="sm">{card.badge}</Badge>
              </div>
              <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 mb-2 line-clamp-1">
                {card.title}
              </h4>
              <p className="text-xs font-mono bg-slate-100 dark:bg-slate-950/80 text-slate-800 dark:text-slate-300 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 line-clamp-3">
                {card.preview}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Hero Stats */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-slate-200/60 dark:border-slate-800/60 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto">
          {[
            { label: 'Curated Prompts', value: '2,500+', icon: Database },
            { label: 'Supported Models', value: '12+', icon: Cpu },
            { label: 'Active Developers', value: '45,000+', icon: Users },
            { label: 'Client-Side Reliance', value: '100%', icon: Shield }
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="space-y-1 p-2">
                <div className="flex items-center justify-center gap-1.5 text-cyan-500 font-bold text-xl sm:text-3xl">
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 inline" />
                  {stat.value}
                </div>
                <p className="text-[11px] sm:text-xs font-semibold text-slate-500 dark:text-slate-400">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Trusted Models Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-2xl p-4 sm:p-6 border border-slate-200 dark:border-slate-800 text-center">
          <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4 sm:mb-6">
            Optimized for Next-Generation AI Engines
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-6 items-center justify-center">
            {modelsData.map((m) => (
              <div
                key={m.id}
                className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/60 cursor-pointer transition-colors"
                onClick={() => navigate(`/explore?model=${m.id}`)}
              >
                <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                  {m.name}
                </span>
                <span className="text-[9px] sm:text-[10px] text-slate-400">{m.badge}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2 sm:space-y-3">
          <Badge variant="cyan">Built For Speed & Privacy</Badge>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Everything You Need To Master Prompt Engineering
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            No tokens, no servers, no forced accounts. Complete privacy stored inside browser LocalStorage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {[
            {
              title: "Interactive Parameter Fillers",
              desc: "Prompts contain placeholders like {{role}} or {{tech_stack}}. Dynamically tweak inputs to generate customized prompt text instantly.",
              icon: Sliders,
              color: "from-cyan-500 to-blue-500"
            },
            {
              title: "Dual-Pane Live Prompt Editor",
              desc: "Markdown support, syntax highlighting, template selectors, and live variable detection to build custom templates.",
              icon: Code2,
              color: "from-purple-500 to-pink-500"
            },
            {
              title: "LocalStorage Collections & Export",
              desc: "Organize prompts into custom folders. Export and import complete collection backups instantly as clean JSON files.",
              icon: Bookmark,
              color: "from-emerald-500 to-teal-500"
            }
          ].map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="glass-panel p-5 sm:p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 space-y-3 sm:space-y-4 hover:border-cyan-500/40 transition-colors"
              >
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-tr ${feat.color} flex items-center justify-center text-white shadow-md`}>
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">{feat.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{feat.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">Explore Categories</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Discover top prompts across 20 tailored categories</p>
          </div>
          <Link to="/categories" className="text-xs font-bold text-cyan-500 hover:text-cyan-400 flex items-center gap-1">
            View All 20 Categories <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {categoriesData.slice(0, 10).map((cat) => (
            <Link
              key={cat.id}
              to={`/explore?category=${cat.id}`}
              className="glass-panel p-3.5 sm:p-4 rounded-xl border border-slate-200/80 dark:border-slate-800/80 hover:border-cyan-500/50 hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-500">
                  <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </span>
                <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                  {cat.promptCount}
                </span>
              </div>
              <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white group-hover:text-cyan-500 transition-colors">
                {cat.name}
              </h4>
              <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-1">
                {cat.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Flagship Feature Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border-2 border-emerald-500/30 bg-gradient-to-r from-emerald-950/40 via-slate-900/60 to-teal-950/40 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Featured Vibe Coding Blueprint
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
              15 Vibe Coding Prompts
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Copy, fill the brackets, ship. The exact 15 system prompts for PRDs, system rules, ultra planning, MCP server wiring, database connections, security audits, and git commits.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/blog/15vibecodingprompts"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-400 text-slate-950 hover:bg-emerald-300 transition-all shadow-lg shadow-emerald-500/25"
              >
                View 15 Vibe Coding Prompts <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/explore?category=antigravity"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-800 text-white border border-slate-700 hover:border-emerald-500/40 transition-all"
              >
                Explore in Library
              </Link>
            </div>
          </div>

          <div className="w-full md:w-auto grid grid-cols-2 gap-3 font-mono text-xs">
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-cyan-400 text-center">
              <div className="text-xl font-bold">15</div>
              <div className="text-[10px] text-slate-400 uppercase font-sans">Copyable Prompts</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-purple-400 text-center">
              <div className="text-xl font-bold">4</div>
              <div className="text-[10px] text-slate-400 uppercase font-sans">Top LLMs</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-emerald-400 text-center">
              <div className="text-xl font-bold">100%</div>
              <div className="text-[10px] text-slate-400 uppercase font-sans">Vibe-Coding Ready</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-amber-400 text-center">
              <div className="text-xl font-bold">Free</div>
              <div className="text-[10px] text-slate-400 uppercase font-sans">Open Access</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Prompts Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <Badge variant="emerald" className="mb-1 sm:mb-2">Staff Picks</Badge>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">Featured AI Prompts</h2>
          </div>
          <Link to="/explore" className="text-xs font-bold text-cyan-500 hover:text-cyan-400 flex items-center gap-1">
            Browse All <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {featuredPrompts.map((prompt) => (
            <PromptCard
              key={prompt.id}
              prompt={prompt}
              onQuickView={setSelectedPrompt}
              onOpenSaveCollection={setSaveModalPrompt}
            />
          ))}
        </div>
      </section>

      {/* Trending Prompts */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <Badge variant="amber" className="mb-1 sm:mb-2">
              <TrendingUp className="w-3 h-3" />
              Popular
            </Badge>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">Trending Prompts</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {trendingPrompts.map((prompt) => (
            <PromptCard
              key={prompt.id}
              prompt={prompt}
              onQuickView={setSelectedPrompt}
              onOpenSaveCollection={setSaveModalPrompt}
            />
          ))}
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        <div className="text-center space-y-2">
          <Badge variant="purple">FAQ</Badge>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-3">
          {faqData.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={faq.id}
                className="glass-panel rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-bold text-xs sm:text-sm text-slate-900 dark:text-white hover:text-cyan-500 transition-colors gap-3"
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={`w-4 h-4 text-cyan-500 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-200/50 dark:border-slate-800/50 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Modals */}
      <PromptDetailModal
        prompt={selectedPrompt}
        isOpen={!!selectedPrompt}
        onClose={() => setSelectedPrompt(null)}
      />

      <SaveToCollectionModal
        prompt={saveModalPrompt}
        isOpen={!!saveModalPrompt}
        onClose={() => setSaveModalPrompt(null)}
      />
    </div>
  );
}
