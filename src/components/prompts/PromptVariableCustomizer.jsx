import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Copy, Check, Download, RefreshCw, FileText, Code2, Sparkles, Sliders } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export function PromptVariableCustomizer({ prompt }) {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [paramValues, setParamValues] = useState({});
  const [customizedContent, setCustomizedContent] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Initialize default parameter values
    const initial = {};
    if (prompt?.parameters) {
      prompt.parameters.forEach((param) => {
        initial[param.name] = param.defaultValue || '';
      });
    }
    setParamValues(initial);
  }, [prompt]);

  useEffect(() => {
    if (!prompt?.content) return;
    let result = prompt.content;
    Object.keys(paramValues).forEach((key) => {
      const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
      result = result.replace(regex, paramValues[key] || `{{${key}}}`);
    });
    setCustomizedContent(result);
  }, [prompt, paramValues]);

  const handleParamChange = (name, value) => {
    setParamValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleCopyCustomized = () => {
    navigator.clipboard.writeText(customizedContent);
    setCopied(true);
    addToast('Customized prompt copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = (format) => {
    const filename = `${prompt.slug || 'custom-prompt'}.${format}`;
    const element = document.createElement('a');
    const file = new Blob([customizedContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    element.remove();
    addToast(`Downloaded prompt as ${format.toUpperCase()}`, 'success');
  };

  const handleResetParams = () => {
    const initial = {};
    if (prompt?.parameters) {
      prompt.parameters.forEach((param) => {
        initial[param.name] = param.defaultValue || '';
      });
    }
    setParamValues(initial);
    addToast('Reset parameters to defaults', 'info');
  };

  const charCount = customizedContent.length;
  const wordCount = customizedContent ? customizedContent.trim().split(/\s+/).length : 0;
  const approxTokens = Math.ceil(charCount / 4);

  return (
    <div className="space-y-4">
      {/* Parameter Input Fields */}
      {prompt.parameters && prompt.parameters.length > 0 && (
        <div className="glass-panel p-3.5 sm:p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800/90 space-y-3.5 shadow-sm">
          <div className="flex items-center justify-between gap-2">
            <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2 min-w-0">
              <span className="w-6 h-6 rounded-lg bg-cyan-500/10 text-cyan-500 flex items-center justify-center shrink-0">
                <Sliders className="w-3.5 h-3.5" />
              </span>
              <span className="truncate">Customize Prompt Variables</span>
            </h4>
            <button
              onClick={handleResetParams}
              className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shrink-0"
            >
              <RefreshCw className="w-3 h-3" />
              Reset Defaults
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {prompt.parameters.map((param) => (
              <div key={param.name} className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-200 flex items-center justify-between gap-2">
                  <span className="uppercase tracking-wider text-[10px] text-slate-500 dark:text-slate-400">{param.label}</span>
                  <span className="font-mono text-[10px] text-cyan-500 dark:text-cyan-400 font-bold bg-cyan-500/10 dark:bg-cyan-500/15 px-1.5 py-0.5 rounded border border-cyan-500/20">
                    {`{{${param.name}}}`}
                  </span>
                </label>
                <input
                  type="text"
                  value={paramValues[param.name] || ''}
                  onChange={(e) => handleParamChange(param.name, e.target.value)}
                  placeholder={`Enter ${param.label.toLowerCase()}...`}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500 shadow-xs transition-all"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Output Syntax Box */}
      <div className="glass-panel p-3.5 sm:p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800/90 space-y-3.5 shadow-sm">
        {/* Header row: title + stats + actions */}
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Code2 className="w-4 h-4 text-emerald-500" />
              Final Customized Output
            </h4>
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-900/90 px-2.5 py-1 rounded-lg border border-slate-200/60 dark:border-slate-800/60 shrink-0 font-semibold">
              <span>{charCount} chars</span>
              <span>•</span>
              <span>{wordCount} words</span>
              <span>•</span>
              <span className="text-emerald-500 font-bold">~{approxTokens} tokens</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handleDownload('txt')}
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800/90 hover:bg-slate-200 dark:hover:bg-slate-700/90 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-slate-400" />
              .TXT
            </button>
            <button
              onClick={() => handleDownload('md')}
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800/90 hover:bg-slate-200 dark:hover:bg-slate-700/90 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-slate-400" />
              .MD
            </button>
            <button
              onClick={handleCopyCustomized}
              className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all shadow-md ${
                copied
                  ? 'bg-emerald-600 text-white shadow-emerald-600/30'
                  : 'bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-bold shadow-cyan-500/20'
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied!' : 'Copy Prompt'}
            </button>
          </div>
        </div>

        {/* Customized Prompt Text Preview Box */}
        <pre className="p-4 rounded-xl bg-slate-950 text-cyan-300 dark:text-cyan-300 font-mono text-[11px] sm:text-xs leading-relaxed border border-slate-800/90 whitespace-pre-wrap overflow-x-auto selection:bg-cyan-500 selection:text-slate-950 max-h-64 sm:max-h-80 shadow-inner">
          {customizedContent}
        </pre>
      </div>
    </div>
  );
}

