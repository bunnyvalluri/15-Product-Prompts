import { useState } from 'react';
import { Modal } from '../common/Modal';
import { useCollections } from '../../context/CollectionContext';
import { Folder, FolderPlus, Check, Plus } from 'lucide-react';

export function SaveToCollectionModal({ prompt, isOpen, onClose }) {
  const { collections, togglePromptInCollection, createCollection } = useCollections();
  const [newColName, setNewColName] = useState('');
  const [showCreate, setShowCreate] = useState(false);

  if (!prompt) return null;

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newColName.trim()) return;
    createCollection(newColName.trim());
    setNewColName('');
    setShowCreate(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Save "${prompt.title.slice(0, 30)}..." to Collection`} maxWidth="max-w-md">
      <div className="space-y-4">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Select custom collection folders to save this prompt to:
        </p>

        <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
          {collections.map((col) => {
            const isSaved = col.promptIds.includes(prompt.id);
            return (
              <button
                key={col.id}
                onClick={() => togglePromptInCollection(col.id, prompt.id)}
                className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                  isSaved
                    ? 'border-cyan-500/50 bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 font-semibold'
                    : 'border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Folder className={`w-4 h-4 ${isSaved ? 'text-cyan-500' : 'text-slate-400'}`} />
                  <div>
                    <p className="text-xs font-bold">{col.name}</p>
                    <p className="text-[10px] text-slate-400">{col.promptIds.length} prompts</p>
                  </div>
                </div>
                {isSaved && <Check className="w-4 h-4 text-cyan-500" />}
              </button>
            );
          })}
        </div>

        {/* Inline Create Collection */}
        {!showCreate ? (
          <button
            onClick={() => setShowCreate(true)}
            className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:border-cyan-500 hover:text-cyan-500 transition-colors"
          >
            <FolderPlus className="w-4 h-4" />
            Create New Collection
          </button>
        ) : (
          <form onSubmit={handleCreate} className="flex gap-2 pt-2">
            <input
              type="text"
              autoFocus
              value={newColName}
              onChange={(e) => setNewColName(e.target.value)}
              placeholder="Collection Folder Name"
              className="flex-1 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <button
              type="submit"
              className="px-3 py-2 rounded-xl bg-cyan-500 text-white text-xs font-semibold hover:bg-cyan-400 transition-colors flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              Add
            </button>
          </form>
        )}
      </div>
    </Modal>
  );
}
