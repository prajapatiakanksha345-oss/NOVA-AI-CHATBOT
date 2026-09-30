import React from 'react';
import { X, Trash2, Moon, Sun, Monitor } from 'lucide-react';

export default function SettingsModal({ isOpen, onClose, theme, setTheme, clearAllChats }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-[var(--bg-main)] border border-[var(--border-color)] rounded-2xl w-full max-w-md shadow-2xl overflow-hidden transform transition-all">
        <div className="flex items-center justify-between p-5 border-b border-[var(--border-color)]">
          <h2 className="text-xl font-bold">Settings</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-5 space-y-6">
          {/* Theme */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3">Appearance</h3>
            <div className="flex gap-2 p-1 bg-[var(--bg-panel)] rounded-xl border border-[var(--border-color)]">
              {['light', 'dark', 'system'].map(t => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                    theme === t ? 'bg-[var(--bg-main)] shadow-sm' : 'hover:bg-black/5 dark:hover:bg-white/5 text-[var(--text-muted)]'
                  }`}
                >
                  {t === 'light' && <Sun size={16} />}
                  {t === 'dark' && <Moon size={16} />}
                  {t === 'system' && <Monitor size={16} />}
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Data */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3">Data</h3>
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to delete all chats? This cannot be undone.')) {
                  clearAllChats();
                  onClose();
                }
              }}
              className="w-full flex items-center justify-between p-4 rounded-xl border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 text-red-500 transition-colors group"
            >
              <div className="flex flex-col items-start">
                <span className="font-medium">Clear all chats</span>
                <span className="text-xs opacity-80">Delete all conversation history</span>
              </div>
              <Trash2 size={20} className="group-hover:scale-110 transition-transform" />
            </button>
          </div>

          {/* About */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3">About</h3>
            <div className="p-4 rounded-xl bg-[var(--bg-panel)] border border-[var(--border-color)] text-sm">
              <div className="flex items-center gap-2 mb-2 font-bold text-lg">
                <div className="w-6 h-6 rounded bg-[var(--accent)] text-white flex items-center justify-center text-xs">N</div>
                NOVA AI
              </div>
              <p className="text-[var(--text-muted)] mb-2">Version 1.0.0</p>
              <p className="text-[var(--text-muted)]">A premium AI chatbot powered by Google Gemini, built for developers and creative minds.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
