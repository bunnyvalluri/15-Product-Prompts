import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Search,
  ArrowRight,
  Zap,
  Shield,
  Layers,
  Code2,
  Terminal,
  Cpu,
  Bookmark,
  CheckCircle2,
  TrendingUp,
  Star,
  Users,
  Database,
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
    <div className="relative overflow-hidden space-y-24 pb-20">
      {/* Background Ambient Mesh Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none -z-10 opacity-40 dark:opacity-30">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-cyan-500/30 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-32 right-1/4 w-[450px] h-[450px] bg-purple-500/25 rounded-full blur-[140px]" />
        <div className="absolute top-60 left-1/3 w-80 h-80 bg-blue-600/30 rounded-full blur-[100px]" />
      </div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 lg:pt-20 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6 max-w-4xl mx-auto"
        >
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-cyan-500/30 text-xs font-semibold text-cyan-600 dark:text-cyan-400 shadow-md">
            <Sparkles className="w-4 h-4 text-cyan-500 animate-spin" style={{ animationDuration: '4s' }} />
            <span>Introducing PromptForge AI 2.0 • 100% Client-Side Prompt Suite</span>
          </div>

          {/* Hero Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
            Craft, Test & Vibe-Code With <br />
            <span className="bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Precision AI System Prompts
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            The open-access library of battle-tested system instructions, dynamic parameter filler tools, and custom LocalStorage collections for ChatGPT, Claude 3.5, Gemini, Cursor, and Antigravity.
          </p>

          {/* Hero Search Bar */}
          <form onSubmit={handleHeroSearch} className="max-w-2xl mx-auto pt-2">
            <div className="relative flex items-center glass-panel rounded-2xl border border-slate-300 dark:border-slate-800 p-2 shadow-2xl">
              <Search className="w-5 h-5 text-cyan-500 ml-3 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search prompts by keyword, model (e.g. Claude 3.5, Cursor, Antigravity)..."
                className="w-full bg-transparent px-3 py-2 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none"
              />
              <button
                type="submit"
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold shadow-lg shadow-cyan-500/25 shrink-0 transition-all"
              >
                Search
              </button>
            </div>
          </form>

          {/* CTA Buttons */}
          <div className="flex items-center justify-center gap-4 pt-4 flex-wrap">
            <Button
              size="lg"
              onClick={() => navigate('/explore')}
              icon={ArrowRight}
              iconPosition="right"
            >
              Explore All Prompts
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate('/editor')}
              icon={Code2}
            >
              Open Live Prompt Editor
            </Button>
          </div>
        </motion.div>

        {/* Hero Floating Cards Preview Display */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-left"
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
              className="glass-card rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800/80 shadow-xl hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden group"
            >
              <div className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${card.color}`} />
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] uppercase font-bold tracking-wider text-cyan-500">
                  {card.model}
                </span>
                <Badge variant="cyan" size="sm">{card.badge}</Badge>
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 mb-2">
                {card.title}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono bg-slate-950/80 text-slate-300 p-2.5 rounded-xl border border-slate-800 line-clamp-3">
                {card.preview}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Hero Stats */}
        <div className="mt-16 pt-10 border-t border-slate-200/60 dark:border-slate-800/60 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            { label: 'Curated AI Prompts', value: '2,500+', icon: Database },
            { label: 'Supported Models', value: '12+', icon: Cpu },
            { label: 'Active Developers', value: '45,000+', icon: Users },
            { label: 'Client-Side Reliance', value: '100%', icon: Shield }
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-center gap-1.5 text-cyan-500 font-bold text-2xl sm:text-3xl">
                  <Icon className="w-5 h-5 inline" />
                  {stat.value}
                </div>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Trusted Models Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-2xl p-6 border border-slate-200 dark:border-slate-800 text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-6">
            Optimized for Next-Generation AI Engines
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 items-center justify-center opacity-80 dark:opacity-90">
            {modelsData.map((m) => (
              <div key={m.id} className="flex flex-col items-center gap-1.5 group cursor-pointer" onClick={() => navigate(`/explore?model=${m.id}`)}>
                <span className="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-cyan-500 transition-colors">
                  {m.name}
                </span>
                <span className="text-[10px] text-slate-400">{m.badge}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Feature Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="cyan">Built For Speed & Customization</Badge>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Everything You Need To Master Prompt Engineering
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            No registration, no tokens, no backend servers. Complete privacy with browser-native LocalStorage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Interactive Parameter Fillers",
              desc: "Prompts contain placeholders like {{role}} or {{tech_stack}}. Dynamically tweak variable inputs to generate customized prompt text on the fly.",
              icon: Sliders,
              color: "from-cyan-500 to-blue-500"
            },
            {
              title: "Dual-Pane Live Prompt Editor",
              desc: "Full markdown support, syntax highlighting, template selectors, and live syntax validation to construct your own custom prompt library.",
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
                className="glass-panel p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 space-y-4 hover:border-cyan-500/40 transition-colors"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${feat.color} flex items-center justify-center text-white shadow-lg`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{feat.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{feat.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Explore Categories</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Discover top prompts across 20 tailored categories</p>
          </div>
          <Link to="/categories" className="text-xs font-bold text-cyan-500 hover:text-cyan-400 flex items-center gap-1">
            View All 20 Categories <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {categoriesData.slice(0, 10).map((cat) => (
            <Link
              key={cat.id}
              to={`/explore?category=${cat.id}`}
              className="glass-panel p-4 rounded-xl border border-slate-200/80 dark:border-slate-800/80 hover:border-cyan-500/50 hover:shadow-lg transition-all group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 flex items-center justify-center text-cyan-500 group-hover:scale-110 transition-transform">
                  <Zap className="w-4 h-4" />
                </span>
                <span className="text-[10px] font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                  {cat.promptCount}
                </span>
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-cyan-500 transition-colors">
                {cat.name}
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-1">
                {cat.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Prompts Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <Badge variant="emerald" className="mb-2">Staff Picks</Badge>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Featured AI Prompts</h2>
          </div>
          <Link to="/explore" className="text-xs font-bold text-cyan-500 hover:text-cyan-400 flex items-center gap-1">
            Browse All Prompts <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <Badge variant="amber" className="mb-2">
              <TrendingUp className="w-3 h-3" />
              High Conversion & Popularity
            </Badge>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Trending Prompts</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <Badge variant="purple">FAQ</Badge>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Frequently Asked Questions</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Everything you need to know about PromptForge AI</p>
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
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-sm text-slate-900 dark:text-white hover:text-cyan-500 transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={`w-4 h-4 text-cyan-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-200/50 dark:border-slate-800/50 pt-3">
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
