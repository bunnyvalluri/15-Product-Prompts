import { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useToast } from './ToastContext';

const CollectionContext = createContext();

const initialCollections = [
  {
    id: 'col-vibe-15',
    name: '15 Vibe Coding Prompts',
    description: 'Flagship blueprint: PRDs, system rules, ultra plan mode, MCP wiring, DB connection, security & git commits',
    color: 'from-emerald-400 via-teal-500 to-cyan-500',
    promptIds: [
      'prompt-vibe-1', 'prompt-vibe-2', 'prompt-vibe-3', 'prompt-vibe-4', 'prompt-vibe-5',
      'prompt-vibe-6', 'prompt-vibe-7', 'prompt-vibe-8', 'prompt-vibe-9', 'prompt-vibe-10',
      'prompt-vibe-11', 'prompt-vibe-12', 'prompt-vibe-13', 'prompt-vibe-14', 'prompt-vibe-15'
    ],
    createdAt: new Date().toISOString()
  },
  {
    id: 'col-1',
    name: 'Frontend Workflows',
    description: 'Prompts for React, Vite, Tailwind CSS, and UI components',
    color: 'from-cyan-500 to-blue-600',
    promptIds: ['prompt-1', 'prompt-3', 'prompt-7'],
    createdAt: new Date().toISOString()
  },
  {
    id: 'col-2',
    name: 'Autonomous Agents',
    description: 'Agentic vibe-coding prompts for Antigravity & Cursor',
    color: 'from-purple-500 to-indigo-600',
    promptIds: ['prompt-2', 'prompt-8', 'prompt-9'],
    createdAt: new Date().toISOString()
  }
];

export function CollectionProvider({ children }) {
  const [collections, setCollections] = useLocalStorage('promptforge_collections', initialCollections);
  const { addToast } = useToast();

  const createCollection = (name, description = '', color = 'from-cyan-500 to-blue-600') => {
    if (!name.trim()) return;
    const newCol = {
      id: `col-${Date.now()}`,
      name: name.trim(),
      description: description.trim(),
      color,
      promptIds: [],
      createdAt: new Date().toISOString()
    };
    setCollections((prev) => [...prev, newCol]);
    addToast(`Collection "${name}" created`, 'success');
  };

  const renameCollection = (id, newName) => {
    setCollections((prev) =>
      prev.map((c) => (c.id === id ? { ...c, name: newName } : c))
    );
    addToast(`Collection renamed to "${newName}"`, 'info');
  };

  const deleteCollection = (id) => {
    const target = collections.find((c) => c.id === id);
    setCollections((prev) => prev.filter((c) => c.id !== id));
    addToast(`Deleted collection "${target?.name || 'Folder'}"`, 'info');
  };

  const togglePromptInCollection = (collectionId, promptId) => {
    setCollections((prev) =>
      prev.map((col) => {
        if (col.id === collectionId) {
          const exists = col.promptIds.includes(promptId);
          const updatedIds = exists
            ? col.promptIds.filter((id) => id !== promptId)
            : [...col.promptIds, promptId];
          
          if (exists) {
            addToast(`Removed from "${col.name}"`, 'info');
          } else {
            addToast(`Saved to "${col.name}"`, 'success');
          }
          return { ...col, promptIds: updatedIds };
        }
        return col;
      })
    );
  };

  const exportCollectionsJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(collections, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `promptforge_collections_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    addToast('Collections exported to JSON file', 'success');
  };

  const importCollectionsJSON = (jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (Array.isArray(parsed)) {
        setCollections(parsed);
        addToast(`Successfully imported ${parsed.length} collections`, 'success');
      } else {
        throw new Error('Invalid JSON format');
      }
    } catch (err) {
      addToast('Failed to import JSON file. Check format.', 'error');
    }
  };

  return (
    <CollectionContext.Provider
      value={{
        collections,
        createCollection,
        renameCollection,
        deleteCollection,
        togglePromptInCollection,
        exportCollectionsJSON,
        importCollectionsJSON
      }}
    >
      {children}
    </CollectionContext.Provider>
  );
}

export function useCollections() {
  const context = useContext(CollectionContext);
  if (!context) {
    throw new Error('useCollections must be used within CollectionProvider');
  }
  return context;
}
