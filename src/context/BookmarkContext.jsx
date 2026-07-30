import { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useToast } from './ToastContext';

const BookmarkContext = createContext();

export function BookmarkProvider({ children }) {
  const [bookmarks, setBookmarks] = useLocalStorage('promptforge_bookmarks', ['prompt-1', 'prompt-2']);
  const { addToast } = useToast();

  const toggleBookmark = (promptId, promptTitle) => {
    if (bookmarks.includes(promptId)) {
      setBookmarks((prev) => prev.filter((id) => id !== promptId));
      addToast(`Removed "${promptTitle || 'Prompt'}" from bookmarks`, 'info');
    } else {
      setBookmarks((prev) => [...prev, promptId]);
      addToast(`Added "${promptTitle || 'Prompt'}" to bookmarks`, 'success');
    }
  };

  const isBookmarked = (promptId) => bookmarks.includes(promptId);

  return (
    <BookmarkContext.Provider value={{ bookmarks, toggleBookmark, isBookmarked, count: bookmarks.length }}>
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmarks() {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error('useBookmarks must be used within BookmarkProvider');
  }
  return context;
}
