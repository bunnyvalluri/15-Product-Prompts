import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { BookmarkProvider } from './context/BookmarkContext';
import { CollectionProvider } from './context/CollectionContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CommandPalette } from './components/layout/CommandPalette';

import { Home } from './pages/Home';
import { PromptDetail } from './pages/PromptDetail';
import { Blog } from './pages/Blog';
import { BlogDetail } from './pages/BlogDetail';
import { Contact } from './pages/Contact';
import { About } from './pages/About';
import { FAQPage } from './pages/FAQPage';
import { NotFound } from './pages/NotFound';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <ThemeProvider>
      <ToastProvider>
        <BookmarkProvider>
          <CollectionProvider>
            <BrowserRouter>
              <ScrollToTop />
              <div className="min-h-screen w-full max-w-full overflow-x-hidden flex flex-col justify-between selection:bg-cyan-500 selection:text-white">
                <Navbar onOpenSearch={() => setCommandPaletteOpen(true)} />

                <main className="flex-1">
                  <Routes>
                    <Route path="/" element={<Home onOpenSearch={() => setCommandPaletteOpen(true)} />} />
                    <Route path="/prompt/:id" element={<PromptDetail />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:slug" element={<BlogDetail />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/faq" element={<FAQPage />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>

                <Footer />

                {/* Global Command Palette */}
                <CommandPalette
                  isOpen={commandPaletteOpen}
                  onClose={() => setCommandPaletteOpen(false)}
                />
              </div>
            </BrowserRouter>
          </CollectionProvider>
        </BookmarkProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
