import React from 'react';
import { Menu, Sparkles, Moon, Sun } from 'lucide-react';

export default function ChatHeader({ onMenuClick, theme, toggleTheme }) {
  return (
    <header className="h-16 flex items-center justify-between px-4 lg:px-8 border-b border-[var(--border-color)] bg-[var(--bg-panel)]/50 backdrop-blur-md z-10">
      <div className="flex items-center gap-3">
        <button 
          onClick={onMenuClick}
          className="md:hidden p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg"
        >
          <Menu size={20} />
        </button>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-lg hidden sm:block">NOVA AI</span>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-500 text-xs font-medium border border-blue-500/20">
            <Sparkles size={12} />
            Gemini Pro
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-xs text-green-500 font-medium">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="hidden sm:inline">Online</span>
        </div>
        <div className="h-4 w-px bg-[var(--border-color)] mx-2" />
        <button 
          onClick={toggleTheme}
          className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  );
}
