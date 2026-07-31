import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Copy, Check, Download, RefreshCw, FileText, Code2, Sparkles } from 'lucide-react';
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
        <div className="glass-panel p-3 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 min-w-0">
              <Sparkles className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
              <span className="truncate">Customize Prompt Variables</span>
            </h4>
            <button
              onClick={handleResetParams}
              className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-cyan-500 transition-colors px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 shrink-0"
            >
              <RefreshCw className="w-3 h-3" />
              Reset
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {prompt.parameters.map((param) => (
              <div key={param.name} className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between gap-2">
                  <span className="uppercase tracking-wide">{param.label}</span>
                  {/* Token tag hidden on mobile to save space */}
                  <span className="hidden sm:inline text-cyan-500 font-mono text-[10px] font-bold shrink-0 bg-slate-100 dark:bg-slate-900 px-1.5 py-0.5 rounded">
                    {`{{${param.name}}}`}
                  </span>
                </label>
                <input
                  type="text"
                  value={paramValues[param.name] || ''}
                  onChange={(e) => handleParamChange(param.name, e.target.value)}
                  placeholder={`Enter ${param.label.toLowerCase()}...`}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900/90 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Output Syntax Box */}
      <div className="glass-panel p-3 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
        {/* Header row: title + stats */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
              Final Customized Output
            </h4>
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400 bg-slate-100 dark:bg-slate-900 px-2 py-1 rounded-lg shrink-0">
              <span>{charCount}c</span>
              <span>•</span>
              <span>{wordCount}w</span>
              <span>•</span>
              <span className="text-emerald-500 font-bold">~{approxTokens}t</span>
            </div>
          </div>

          {/* Action buttons — full width on mobile */}
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handleDownload('txt')}
              className="flex items-center justify-center gap-1.5 px-2 py-2 rounded-lg text-xs font-semibold bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              .TXT
            </button>
            <button
              onClick={() => handleDownload('md')}
              className="flex items-center justify-center gap-1.5 px-2 py-2 rounded-lg text-xs font-semibold bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              .MD
            </button>
            <button
              onClick={handleCopyCustomized}
              className={`flex items-center justify-center gap-1.5 px-2 py-2 rounded-lg text-xs font-semibold transition-all ${
                copied
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/25'
                  : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-md shadow-cyan-500/20'
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Customized Prompt Text Preview */}
        <pre className="p-3 sm:p-4 rounded-xl bg-slate-950 text-cyan-300 font-mono text-[11px] sm:text-xs leading-relaxed border border-slate-800 whitespace-pre-wrap overflow-x-auto selection:bg-cyan-500 selection:text-slate-950 max-h-72 sm:max-h-96">
          {customizedContent}
        </pre>
      </div>
    </div>
  );
}
