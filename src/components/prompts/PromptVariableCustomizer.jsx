import { useState, useEffect } from 'react';
import { Copy, Check, Download, RefreshCw, FileText } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export function PromptVariableCustomizer({ prompt }) {
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

  return (
    <div className="space-y-6">
      {/* Parameter Input Fields */}
      {prompt.parameters && prompt.parameters.length > 0 && (
        <div className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-500" />
              Customize Prompt Variables
            </h4>
            <button
              onClick={handleResetParams}
              className="flex items-center gap-1 text-xs text-slate-400 hover:text-cyan-500 transition-colors"
            >
              <RefreshCw className="w-3 h-3" />
              Reset Defaults
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {prompt.parameters.map((param) => (
              <div key={param.name} className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {param.label} <span className="text-cyan-500 font-mono text-[11px]">({`{{${param.name}}}`})</span>
                </label>
                <input
                  type="text"
                  value={paramValues[param.name] || ''}
                  onChange={(e) => handleParamChange(param.name, e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Output Syntax Box */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
            Final Customized Output
          </h4>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => handleDownload('txt')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              .TXT
            </button>
            <button
              onClick={() => handleDownload('md')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              .MD
            </button>
            <button
              onClick={handleCopyCustomized}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20'
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied!' : 'Copy Prompt'}
            </button>
          </div>
        </div>

        {/* Customized Prompt Text Preview */}
        <pre className="p-4 rounded-xl bg-slate-950 text-cyan-300 font-mono text-xs leading-relaxed border border-slate-800 whitespace-pre-wrap overflow-x-auto selection:bg-cyan-500 selection:text-slate-950">
          {customizedContent}
        </pre>
      </div>
    </div>
  );
}
