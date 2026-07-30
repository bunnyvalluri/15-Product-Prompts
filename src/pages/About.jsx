import { Sparkles, Shield, Cpu, Zap, Code2, Users } from 'lucide-react';
import { Badge } from '../components/common/Badge';

export function About() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Hero Section */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <Badge variant="cyan">Our Mission</Badge>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">
          Democratizing State-of-the-Art AI Directives for Every Developer
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          PromptForge AI was crafted to solve a fundamental problem: developers needed structured, reliable, variable-driven prompt instructions without forced accounts, cloud bloat, or server lock-in.
        </p>
      </div>

      {/* Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: "100% Client-Side Privacy",
            desc: "Zero backend databases or tracking scripts. All your custom saved prompt collections remain locally stored inside your browser.",
            icon: Shield,
            color: "from-cyan-500 to-blue-500"
          },
          {
            title: "Agentic Vibe Coding Focus",
            desc: "Custom templates engineered specifically for next-gen autonomous systems like Google Antigravity, Cursor AI, and Windsurf.",
            icon: Zap,
            color: "from-purple-500 to-indigo-500"
          },
          {
            title: "Dynamic Variable System",
            desc: "Fill placeholders like {{role}} or {{tech_stack}} instantly before exporting prompt text to TXT or Markdown.",
            icon: Code2,
            color: "from-emerald-500 to-teal-500"
          }
        ].map((pillar, idx) => {
          const Icon = pillar.icon;
          return (
            <div key={idx} className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${pillar.color} text-white flex items-center justify-center`}>
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">{pillar.title}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{pillar.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Timeline */}
      <div className="glass-panel p-8 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-6">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Evolution Timeline</h3>
        <div className="space-y-6 relative border-l-2 border-slate-200 dark:border-slate-800 pl-6 ml-2">
          {[
            { date: "Q1 2026", title: "PromptForge AI 1.0 Launched", desc: "Released initial curated JSON database of 500+ prompts for ChatGPT and Claude." },
            { date: "Q2 2026", title: "Parameter Filler & Local Collections", desc: "Introduced browser-native LocalStorage collection folders and dynamic parameter placeholders." },
            { date: "Q3 2026", title: "Google Antigravity & Vibe Coding Suite", desc: "Added complete system rule generators for agentic IDE tools and autonomous code builders." }
          ].map((item, idx) => (
            <div key={idx} className="relative space-y-1">
              <span className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-cyan-500 border-4 border-white dark:border-slate-950" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-500">{item.date}</span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">{item.title}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
