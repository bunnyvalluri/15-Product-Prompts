import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Search,
  Moon,
  Sun,
  Bookmark,
  Menu,
  X,
  Compass,
  FolderHeart,
  FileCode2,
  BookOpen,
  DollarSign,
  Info,
  Mail,
  Grid
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useBookmarks } from '../../context/BookmarkContext';

export function Navbar({ onOpenSearch }) {
  const { isDark, toggleTheme } = useTheme();
  const { count: bookmarkCount } = useBookmarks();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.scrollY > 10;
          setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/', icon: Sparkles },
    { name: 'Blog', path: '/blog', icon: BookOpen },
    { name: 'About', path: '/about', icon: Info },
    { name: 'Contact', path: '/contact', icon: Mail }
  ];

  return (
    <header
      className={`sticky top-0 left-0 right-0 z-[9999] w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-300 dark:border-slate-800 shadow-md'
          : 'bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 shadow-xs'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-20 flex items-center justify-between gap-1.5">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0 group">
          <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-emerald-400 via-teal-500 to-cyan-500 flex items-center justify-center shadow-md shadow-emerald-500/25 group-hover:scale-105 transition-transform shrink-0">
            <Sparkles className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-slate-950 font-bold" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xs sm:text-xl tracking-tight text-slate-900 dark:text-white shrink-0">
              15 Product<span className="text-emerald-600 dark:text-emerald-400"> Prompts</span>
            </span>
            <span className="hidden sm:block text-[9px] sm:text-[10px] uppercase tracking-wider font-bold text-emerald-600 dark:text-emerald-400 -mt-1">
              Micro-SaaS & AI Blueprints
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-100 dark:bg-slate-900/90 p-1.5 rounded-2xl border border-slate-300 dark:border-slate-800 shadow-xs">
          {navLinks.slice(0, 8).map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                  isActive
                    ? 'text-cyan-700 dark:text-cyan-400'
                    : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavPill"
                    className="absolute inset-0 rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-300 dark:border-slate-700 -z-0"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  {link.name}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Actions (Search, Bookmarks, Theme, Mobile Toggle) */}
        <div className="flex items-center gap-0.5 sm:gap-2 shrink-0">
          {/* Quick Search Button (Hidden on small mobile, visible on sm+) */}
          <button
            onClick={onOpenSearch}
            className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-cyan-500 hover:border-cyan-500/50 transition-all shadow-xs group"
            title="Search prompts (⌘K)"
          >
            <Search className="w-4 h-4 text-cyan-500 group-hover:scale-110 transition-transform shrink-0" />
            <span className="hidden md:inline font-medium">Search prompts...</span>
            <kbd className="hidden md:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono font-bold rounded-md bg-slate-200/80 dark:bg-slate-700/80 text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-slate-600">
              ⌘K
            </kbd>
          </button>

          {/* Mobile Search Icon Button (Visible only on < sm) */}
          <button
            onClick={onOpenSearch}
            className="sm:hidden p-1.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Search Prompts"
            aria-label="Search Prompts"
          >
            <Search className="w-4 h-4 text-cyan-500" />
          </button>

          {/* Bookmarks Counter */}
          <Link
            to="/blog/15vibecodingprompts"
            className="relative p-1.5 sm:p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors"
            title="Bookmarked Prompts"
          >
            <Bookmark className="w-4 h-4 text-amber-500" />
            {bookmarkCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-cyan-500 text-white text-[9px] font-extrabold flex items-center justify-center shadow-md shadow-cyan-500/40 animate-pulse">
                {bookmarkCount}
              </span>
            )}
          </Link>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-1.5 sm:p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 sm:p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-500" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden glass-panel border-b border-slate-200 dark:border-slate-800 px-4 py-4 space-y-1.5 overflow-hidden shadow-2xl"
          >
            <div className="grid grid-cols-2 gap-2 mb-2 pb-2 border-b border-slate-200/60 dark:border-slate-800/60">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSearch();
                }}
                className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20"
              >
                <Search className="w-3.5 h-3.5" />
                Quick Search
              </button>
              <button
                onClick={toggleTheme}
                className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
              >
                {isDark ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-slate-700" />}
                {isDark ? 'Light Mode' : 'Dark Mode'}
              </button>
            </div>

            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-cyan-500" />
                    {link.name}
                  </div>
                  {isActive && <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
