import { Link } from 'react-router-dom';
import { Modal } from '../common/Modal';
import { PromptVariableCustomizer } from './PromptVariableCustomizer';
import { Badge } from '../common/Badge';
import { Sparkles, Clock, Star, ExternalLink, Cpu } from 'lucide-react';

export function PromptDetailModal({ prompt, isOpen, onClose }) {
  if (!prompt) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={prompt.title} maxWidth="max-w-3xl">
      <div className="space-y-5">
        {/* Meta Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 text-xs pb-1">
          <div className="flex items-center flex-wrap gap-2">
            <Badge variant="cyan">
              <Sparkles className="w-3 h-3" />
              <span>{prompt.categoryName}</span>
            </Badge>
            <Badge variant="purple">{prompt.difficulty}</Badge>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 font-semibold text-[11px] border border-slate-200/60 dark:border-slate-700/60">
              <Cpu className="w-3 h-3 text-cyan-500" />
              {prompt.aiModel}
            </span>
          </div>

          <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 font-medium">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {prompt.readingTime}
            </span>
            <span className="flex items-center gap-1 text-amber-500 font-bold bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
              {prompt.rating}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
          {prompt.description}
        </p>

        {/* Dynamic Variable Filler */}
        <PromptVariableCustomizer prompt={prompt} />

        {/* Footer Link to Dedicated Detail Page */}
        <div className="pt-2 flex items-center justify-between border-t border-slate-200/60 dark:border-slate-800/60 text-xs">
          <span className="text-[11px] text-slate-400 font-mono">ID: {prompt.id}</span>
          <Link
            to={`/prompt/${prompt.id}`}
            onClick={onClose}
            className="inline-flex items-center gap-1.5 font-bold text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 transition-colors"
          >
            Open Full Prompt Page & Tags
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </Modal>
  );
}

