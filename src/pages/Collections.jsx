import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FolderHeart,
  FolderPlus,
  Trash2,
  Edit2,
  Download,
  Upload,
  Sparkles,
  Bookmark,
  Plus,
  Check,
  Folder
} from 'lucide-react';
import { useCollections } from '../context/CollectionContext';
import { useBookmarks } from '../context/BookmarkContext';
import { PromptCard } from '../components/prompts/PromptCard';
import promptsData from '../data/prompts.json';
import { Modal } from '../components/common/Modal';

export function Collections() {
  const {
    collections,
    createCollection,
    renameCollection,
    deleteCollection,
    exportCollectionsJSON,
    importCollectionsJSON
  } = useCollections();

  const { bookmarks } = useBookmarks();
  const [activeTab, setActiveTab] = useState('collections'); // 'collections' or 'bookmarks'
  const [activeColId, setActiveColId] = useState(collections[0]?.id || null);

  // Modal States
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [renameModalOpen, setRenameModalOpen] = useState(null);
  const [newColName, setNewColName] = useState('');
  const [newColDesc, setNewColDesc] = useState('');

  // Selected collection
  const selectedCollection = collections.find((c) => c.id === activeColId) || collections[0];

  // Bookmarked Prompts List
  const bookmarkedPrompts = promptsData.filter((p) => bookmarks.includes(p.id));

  // Prompts in Active Collection
  const collectionPrompts = selectedCollection
    ? promptsData.filter((p) => selectedCollection.promptIds.includes(p.id))
    : [];

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!newColName.trim()) return;
    createCollection(newColName.trim(), newColDesc.trim());
    setNewColName('');
    setNewColDesc('');
    setCreateModalOpen(false);
  };

  const handleRenameSubmit = (e) => {
    e.preventDefault();
    if (!newColName.trim() || !renameModalOpen) return;
    renameCollection(renameModalOpen.id, newColName.trim());
    setRenameModalOpen(null);
    setNewColName('');
  };

  const handleImportFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      importCollectionsJSON(event.target.result);
    };
    reader.readAsText(file);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <FolderHeart className="w-7 h-7 text-cyan-500" />
            My Saved Collections
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Manage custom LocalStorage folders, bookmarks, and export JSON backups.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={exportCollectionsJSON}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Export JSON
          </button>

          <label className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer">
            <Upload className="w-3.5 h-3.5" />
            Import JSON
            <input type="file" accept=".json" onChange={handleImportFile} className="hidden" />
          </label>

          <button
            onClick={() => setCreateModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold shadow-md shadow-cyan-500/20 hover:from-cyan-400 hover:to-blue-500 transition-all"
          >
            <FolderPlus className="w-4 h-4" />
            New Folder
          </button>
        </div>
      </div>

      {/* Main Tabs (Collections vs Bookmarks) */}
      <div className="flex items-center gap-4 border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setActiveTab('collections')}
          className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === 'collections'
              ? 'border-cyan-500 text-cyan-500'
              : 'border-transparent text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
          }`}
        >
          <Folder className="w-4 h-4" />
          Custom Collections ({collections.length})
        </button>
        <button
          onClick={() => setActiveTab('bookmarks')}
          className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === 'bookmarks'
              ? 'border-cyan-500 text-cyan-500'
              : 'border-transparent text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
          }`}
        >
          <Bookmark className="w-4 h-4 text-amber-500 fill-amber-500" />
          Bookmarked Prompts ({bookmarkedPrompts.length})
        </button>
      </div>

      {/* Tab 1: Custom Collections View */}
      {activeTab === 'collections' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Folder List */}
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Folders</span>
            {collections.map((col) => {
              const isActive = col.id === (selectedCollection?.id);
              return (
                <div
                  key={col.id}
                  onClick={() => setActiveColId(col.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl border text-left cursor-pointer transition-all ${
                    isActive
                      ? 'border-cyan-500/50 bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 font-bold shadow-sm'
                      : 'border-slate-200/80 dark:border-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Folder className={`w-4 h-4 ${isActive ? 'text-cyan-500' : 'text-slate-400'}`} />
                    <div>
                      <p className="text-xs">{col.name}</p>
                      <p className="text-[10px] text-slate-400 font-normal">{col.promptIds.length} prompts</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 opacity-80 hover:opacity-100">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setRenameModalOpen(col);
                        setNewColName(col.name);
                      }}
                      className="p-1 hover:text-cyan-500 transition-colors"
                      title="Rename Folder"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    {collections.length > 1 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteCollection(col.id);
                        }}
                        className="p-1 hover:text-rose-500 transition-colors"
                        title="Delete Folder"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Main Collection Prompts Grid */}
          <div className="lg:col-span-3 space-y-6">
            {selectedCollection && (
              <div>
                <div className="pb-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                      {selectedCollection.name}
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {selectedCollection.description || 'Custom user prompt collection'}
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-cyan-500">
                    {collectionPrompts.length} Saved Prompts
                  </span>
                </div>

                {collectionPrompts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    {collectionPrompts.map((prompt) => (
                      <PromptCard key={prompt.id} prompt={prompt} />
                    ))}
                  </div>
                ) : (
                  <div className="py-16 text-center glass-panel rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3 mt-6">
                    <Folder className="w-10 h-10 text-slate-400 mx-auto" />
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200">This collection folder is empty</p>
                    <p className="text-xs text-slate-500">Browse the Explore page to add prompts to this folder.</p>
                    <Link
                      to="/explore"
                      className="inline-block px-4 py-2 rounded-xl bg-cyan-500 text-white text-xs font-semibold hover:bg-cyan-400 transition-colors"
                    >
                      Explore Prompts
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Bookmarked Prompts View */}
      {activeTab === 'bookmarks' && (
        <div>
          {bookmarkedPrompts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookmarkedPrompts.map((prompt) => (
                <PromptCard key={prompt.id} prompt={prompt} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center glass-panel rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
              <Bookmark className="w-10 h-10 text-amber-500 mx-auto" />
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200">No bookmarked prompts yet</p>
              <p className="text-xs text-slate-500">Click the bookmark star on any prompt card to save it here.</p>
              <Link
                to="/explore"
                className="inline-block px-4 py-2 rounded-xl bg-cyan-500 text-white text-xs font-semibold hover:bg-cyan-400 transition-colors"
              >
                Browse Prompts
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Create Folder Modal */}
      <Modal isOpen={createModalOpen} onClose={() => setCreateModalOpen(false)} title="Create New Collection" maxWidth="max-w-md">
        <form onSubmit={handleCreateSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Collection Name</label>
            <input
              type="text"
              required
              value={newColName}
              onChange={(e) => setNewColName(e.target.value)}
              placeholder="e.g. React & Antigravity Prompts"
              className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Description (Optional)</label>
            <input
              type="text"
              value={newColDesc}
              onChange={(e) => setNewColDesc(e.target.value)}
              placeholder="Brief summary of prompts in this folder..."
              className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white text-xs font-bold transition-colors"
          >
            Create Collection
          </button>
        </form>
      </Modal>

      {/* Rename Folder Modal */}
      <Modal isOpen={!!renameModalOpen} onClose={() => setRenameModalOpen(null)} title="Rename Collection" maxWidth="max-w-md">
        <form onSubmit={handleRenameSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">New Collection Name</label>
            <input
              type="text"
              required
              value={newColName}
              onChange={(e) => setNewColName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white text-xs font-bold transition-colors"
          >
            Save Changes
          </button>
        </form>
      </Modal>
    </div>
  );
}
