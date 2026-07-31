import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Send, Heart } from 'lucide-react';
import { FaGithub, FaTwitter, FaDiscord, FaLinkedin } from 'react-icons/fa';
import { useToast } from '../../context/ToastContext';

export function Footer() {
  const [email, setEmail] = useState('');
  const { addToast } = useToast();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      addToast('Please enter a valid email address', 'error');
      return;
    }
    addToast('Thank you for subscribing to PromptForge AI Updates!', 'success');
    setEmail('');
  };

  return (
    <footer className="relative border-t border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-950/80 text-slate-600 dark:text-slate-400 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 pb-safe">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10">
          {/* Column 1: Brand & Tagline */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-400 via-teal-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/25">
                <Sparkles className="w-6 h-6 text-slate-950 font-bold" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
                15 Product<span className="text-emerald-400"> Prompts</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              Curated collection of 15 battle-tested Micro-SaaS prompts, system rules, parameter customizers, and vibe-coding tools for ChatGPT, Claude 3.5, Gemini 1.5, Cursor, and Google Antigravity.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {[
                { icon: FaGithub, href: 'https://github.com' },
                { icon: FaTwitter, href: 'https://twitter.com' },
                { icon: FaDiscord, href: 'https://discord.com' },
                { icon: FaLinkedin, href: 'https://linkedin.com' }
              ].map((s, idx) => {
                const Icon = s.icon;
                return (
                  <a
                    key={idx}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-slate-200/60 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/blog" className="hover:text-cyan-500 transition-colors">15 Product Prompts Blog</Link></li>
            </ul>
          </div>

          {/* Column 3: Resources & Models */}
          <div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/blog" className="hover:text-cyan-500 transition-colors">Prompt Engineering Blog</Link></li>
              <li><Link to="/faq" className="hover:text-cyan-500 transition-colors">Frequently Asked Questions</Link></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-4">
              Stay Updated
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
              Get weekly curated system rules & vibe-coding prompt updates.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 p-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-white transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-xs gap-4">
          <p>© {new Date().getFullYear()} 15 Product Prompts. All rights reserved. 100% Client-Side SaaS Architecture.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>for Developers & AI Engineers</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
