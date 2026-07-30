import { Link } from 'react-router-dom';
import { Modal } from '../common/Modal';
import { PromptVariableCustomizer } from './PromptVariableCustomizer';
import { Badge } from '../common/Badge';
import { Sparkles, Clock, Star, ExternalLink } from 'lucide-react';

export function PromptDetailModal({ prompt, isOpen, onClose }) {
  if (!prompt) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={prompt.title} maxWidth="max-w-3xl">
      <div className="space-y-6">
        {/* Meta Bar */}
        <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
          <div className="flex items-center gap-2">
            <Badge variant="cyan">
              <Sparkles className="w-3 h-3" />
              {prompt.categoryName}
            </Badge>
            <Badge variant="purple">{prompt.difficulty}</Badge>
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              {prompt.aiModel}
            </span>
          </div>

          <div className="flex items-center gap-3 text-slate-400">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {prompt.readingTime}
            </span>
            <span className="flex items-center gap-1 text-amber-500 font-semibold">
              <Star className="w-3 h-3 fill-amber-500" />
              {prompt.rating}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {prompt.description}
        </p>

        {/* Dynamic Variable Filler */}
        <PromptVariableCustomizer prompt={prompt} />

        {/* Footer Link to Dedicated Detail Page */}
        <div className="pt-2 flex justify-end">
          <Link
            to={`/prompt/${prompt.id}`}
            onClick={onClose}
            className="flex items-center gap-1.5 text-xs font-bold text-cyan-500 hover:text-cyan-400 transition-colors"
          >
            Open Full Prompt Page & Tags
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </Modal>
  );
}
