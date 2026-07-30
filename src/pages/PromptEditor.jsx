import { useState, useEffect } from 'react';
import {
  FileCode2,
  Copy,
  Check,
  RotateCcw,
  Download,
  FileText,
  FolderPlus,
  Sparkles,
  Undo2,
  Redo2,
  Eye,
  Edit3
} from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { SaveToCollectionModal } from '../components/prompts/SaveToCollectionModal';

const templates = [
  {
    name: 'Senior Full-Stack Architect',
    content: 'You are an elite Senior Full-Stack Architect specializing in {{tech_stack}}.\n\nTask: Design and build {{project_name}}.\n\nDirectives:\n1. Follow clean architecture and modular component boundaries.\n2. Ensure type safety, error boundaries, and defensive programming.\n3. Styling: Use Tailwind CSS with dark mode support.\n4. Output complete code with clear comments.'
  },
  {
    name: 'Antigravity Autonomous Vibe Coding',
    content: 'Act as an autonomous agentic pair programmer within Google Antigravity.\n\nProject Goal: {{goal}}\nTheme Palette: {{theme}}\n\nSteps:\n1. Create architectural plan in markdown before writing code.\n2. Use responsive glassmorphism UI components.\n3. Verify all button states and LocalStorage persistence.'
  },
  {
    name: 'Cursor .cursorrules Configuration',
    content: '# Cursor Rules for {{project}}\n\n- Framework: {{framework}}\n- Icons: lucide-react\n- Styling: Tailwind CSS\n- Directives: Write clean functional components, handle loading/empty states, and never output stub stubs.'
  }
];

export function PromptEditor() {
  const { addToast } = useToast();
  const [content, setContent] = useState(templates[0].content);
  const [history, setHistory] = useState([templates[0].content]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('split'); // 'split', 'editor', 'preview'
  const [saveModalOpen, setSaveModalOpen] = useState(false);

  // Parse placeholders
  const detectedVariables = Array.from(content.matchAll(/{{\s*([a-zA-Z0-9_]+)\s*}}/g)).map(m => m[1]);
  const uniqueVariables = Array.from(new Set(detectedVariables));

  const handleContentChange = (newText) => {
    setContent(newText);
    const newHistory = history.slice(0, historyIndex + 1);
    setHistory([...newHistory, newText]);
    setHistoryIndex(newHistory.length);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setContent(history[historyIndex - 1]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setContent(history[historyIndex + 1]);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    addToast('Editor prompt copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    handleContentChange('');
    addToast('Cleared prompt editor', 'info');
  };

  const handleDownload = (format) => {
    const filename = `custom-prompt.${format}`;
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    element.remove();
    addToast(`Downloaded prompt as ${format.toUpperCase()}`, 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <FileCode2 className="w-7 h-7 text-cyan-500" />
            Interactive Prompt Editor
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Build, test, and format custom prompt templates with live variable detection.
          </p>
        </div>

        {/* Templates Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400">Load Template:</span>
          <select
            onChange={(e) => {
              const val = Number(e.target.value);
              if (templates[val]) handleContentChange(templates[val].content);
            }}
            className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            {templates.map((t, idx) => (
              <option key={idx} value={idx}>{t.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Toolbar */}
      <div className="glass-panel p-3 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
        {/* Undo/Redo & Reset */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleUndo}
            disabled={historyIndex <= 0}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 disabled:opacity-40 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            title="Undo"
          >
            <Undo2 className="w-4 h-4" />
          </button>
          <button
            onClick={handleRedo}
            disabled={historyIndex >= history.length - 1}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 disabled:opacity-40 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            title="Redo"
          >
            <Redo2 className="w-4 h-4" />
          </button>
          <button
            onClick={handleReset}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            title="Reset Content"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('split')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${activeTab === 'split' ? 'bg-cyan-500 text-white' : 'text-slate-400'}`}
          >
            Split View
          </button>
          <button
            onClick={() => setActiveTab('editor')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${activeTab === 'editor' ? 'bg-cyan-500 text-white' : 'text-slate-400'}`}
          >
            <Edit3 className="w-3.5 h-3.5 inline mr-1" />
            Editor
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${activeTab === 'preview' ? 'bg-cyan-500 text-white' : 'text-slate-400'}`}
          >
            <Eye className="w-3.5 h-3.5 inline mr-1" />
            Preview
          </button>
        </div>

        {/* Export & Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleDownload('txt')}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-800 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            .TXT
          </button>
          <button
            onClick={() => handleDownload('md')}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-800 transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            .MD
          </button>
          <button
            onClick={() => setSaveModalOpen(true)}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            title="Save to Collection"
          >
            <FolderPlus className="w-4 h-4" />
          </button>
          <button
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20'
            }`}
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>

      {/* Editor & Preview Pane */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[500px]">
        {/* Editor Pane */}
        {(activeTab === 'split' || activeTab === 'editor') && (
          <div className="glass-panel p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-400 pb-2 border-b border-slate-200/60 dark:border-slate-800/60">
              <span className="flex items-center gap-1.5 text-cyan-500">
                <Edit3 className="w-4 h-4" />
                Prompt Text Editor
              </span>
              <span>{content.length} characters</span>
            </div>
            <textarea
              value={content}
              onChange={(e) => handleContentChange(e.target.value)}
              placeholder="Write or paste your custom prompt template here..."
              className="flex-1 w-full bg-slate-950 text-cyan-300 font-mono text-xs p-4 rounded-xl border border-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none min-h-[400px]"
            />
          </div>
        )}

        {/* Live Rendered Preview Pane */}
        {(activeTab === 'split' || activeTab === 'preview') && (
          <div className="glass-panel p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-400 pb-2 border-b border-slate-200/60 dark:border-slate-800/60">
              <span className="flex items-center gap-1.5 text-purple-500">
                <Eye className="w-4 h-4" />
                Live Rendered Preview
              </span>
              <span className="text-emerald-500 font-mono">
                {uniqueVariables.length} variables detected
              </span>
            </div>

            {/* Variable Badges */}
            {uniqueVariables.length > 0 && (
              <div className="flex items-center gap-1.5 flex-wrap p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Detected:</span>
                {uniqueVariables.map((v, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-700 dark:text-cyan-400 font-mono text-[10px] font-bold"
                  >
                    {`{{${v}}}`}
                  </span>
                ))}
              </div>
            )}

            <div className="flex-1 p-4 rounded-xl bg-slate-950 text-slate-200 font-mono text-xs leading-relaxed border border-slate-800 overflow-y-auto whitespace-pre-wrap min-h-[400px]">
              {content || <span className="text-slate-600 italic">No content in editor...</span>}
            </div>
          </div>
        )}
      </div>

      {/* Save Collection Modal */}
      <SaveToCollectionModal
        prompt={{ id: `custom-${Date.now()}`, title: 'Custom Editor Prompt', content }}
        isOpen={saveModalOpen}
        onClose={() => setSaveModalOpen(false)}
      />
    </div>
  );
}
