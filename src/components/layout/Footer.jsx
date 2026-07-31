import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Send, Heart } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
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
    <footer className="relative w-full max-w-full overflow-hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-6 sm:pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Column 1: Brand & Tagline */}
          <div className="space-y-4">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-400 via-teal-500 to-cyan-500 flex items-center justify-center shadow-md shadow-emerald-500/25">
                <Sparkles className="w-5 h-5 text-slate-950 font-bold" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
                15 Product<span className="text-emerald-500 dark:text-emerald-400"> Prompts</span>
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
              Curated collection of 15 battle-tested Micro-SaaS prompts, system rules, parameter customizers, and vibe-coding tools for ChatGPT, Claude 3.5, Gemini 1.5, Cursor, and Google Antigravity.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-xs text-slate-900 dark:text-white uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li><Link to="/" className="text-slate-700 dark:text-slate-300 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors font-semibold">Home</Link></li>
              <li><Link to="/blog" className="text-slate-700 dark:text-slate-300 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors font-semibold">15 Vibe Prompts Blog</Link></li>
              <li><Link to="/about" className="text-slate-700 dark:text-slate-300 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors font-semibold">About Project</Link></li>
              <li><Link to="/contact" className="text-slate-700 dark:text-slate-300 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors font-semibold">Contact Us</Link></li>
              <li><Link to="/faq" className="text-slate-700 dark:text-slate-300 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors font-semibold">FAQ</Link></li>
            </ul>
          </div>

          {/* Column 3: Connect & Social */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-xs text-slate-900 dark:text-white uppercase tracking-wider">
              Community
            </h4>
            <div className="flex flex-wrap items-center gap-2">
              {[
                { name: 'GitHub', icon: FaGithub, href: 'https://github.com/bunnyvalluri' },
                { name: 'LinkedIn', icon: FaLinkedin, href: 'https://www.linkedin.com/in/syntaxrahul/' }
              ].map((s, idx) => {
                const Icon = s.icon;
                return (
                  <a
                    key={idx}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-800 dark:text-slate-100 hover:text-emerald-500 dark:hover:text-emerald-400 hover:border-emerald-500/40 text-xs font-bold transition-all shadow-xs"
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{s.name}</span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 4: Newsletter */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-xs text-slate-900 dark:text-white uppercase tracking-wider">
              Stay Updated
            </h4>
            <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
              Get weekly curated system rules & vibe-coding prompt updates directly to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 px-2.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-white text-xs font-bold transition-colors"
                >
                  Join
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-8 pt-6 border-t border-slate-300 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm gap-3 text-center sm:text-left text-slate-800 dark:text-slate-100 font-bold tracking-wide">
          <p className="break-words text-slate-800 dark:text-slate-100 font-semibold">
            © {new Date().getFullYear()} <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">15 Product Prompts</span> by{' '}
            <a
              href="https://valluri-rahul-portfolio.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-600 dark:text-cyan-400 hover:text-emerald-500 dark:hover:text-emerald-300 underline font-extrabold transition-colors"
            >
              VALLURI RAHUL
            </a>. All rights reserved.
          </p>
          <div className="flex items-center justify-center gap-1.5 shrink-0 text-slate-800 dark:text-slate-100 font-semibold">
            <span>Crafted with</span>
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500 inline animate-pulse" />
            <span>by{' '}
              <a
                href="https://valluri-rahul-portfolio.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-600 dark:text-cyan-400 hover:text-emerald-500 dark:hover:text-emerald-300 underline font-extrabold transition-colors"
              >
                VALLURI RAHUL
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
