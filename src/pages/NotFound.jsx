import { Link } from 'react-router-dom';
import { Sparkles, Home, Search, Compass } from 'lucide-react';
import { motion } from 'framer-motion';

export function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 space-y-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 flex items-center justify-center text-white font-extrabold text-3xl mx-auto shadow-2xl shadow-cyan-500/30">
          404
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white">
          Prompt Horizon Not Found
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
          The requested prompt or page path does not exist in our system. Let’s guide you back to safety!
        </p>
      </motion.div>

      <div className="flex items-center gap-3 flex-wrap justify-center pt-2">
        <Link
          to="/"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold shadow-lg shadow-cyan-500/25 hover:from-cyan-400 hover:to-blue-500 transition-all"
        >
          <Home className="w-4 h-4" />
          Back to Home
        </Link>
        <Link
          to="/blog/15vibecodingprompts"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
        >
          <Compass className="w-4 h-4" />
          View 15 Vibe Coding Prompts
        </Link>
      </div>
    </div>
  );
}
