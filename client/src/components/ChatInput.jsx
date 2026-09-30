import React, { useRef, useEffect } from 'react';
import { Send, Paperclip, Mic } from 'lucide-react';

export default function ChatInput({ input, setInput, onSubmit, isLoading }) {
  const textareaRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() && !isLoading) {
        onSubmit(e);
      }
    }
  };

  return (
    <div className="p-4 md:px-8 pb-6 md:pb-8 w-full max-w-4xl mx-auto">
      <form 
        onSubmit={onSubmit}
        className="relative flex items-end gap-2 bg-[var(--bg-panel)] rounded-2xl border border-[var(--border-color)] p-2 shadow-sm focus-within:ring-2 focus-within:ring-[var(--accent)]/50 focus-within:border-[var(--accent)] transition-all"
      >
        <div className="flex flex-col justify-end pb-1 pl-1">
          <button 
            type="button" 
            disabled 
            className="p-2 text-[var(--text-muted)] hover:text-[var(--text-main)] opacity-50 cursor-not-allowed transition-colors"
            title="Attachments coming soon"
          >
            <Paperclip size={20} />
          </button>
        </div>
        
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask NOVA AI anything..."
          className="flex-1 max-h-48 min-h-[44px] py-3 bg-transparent border-none outline-none resize-none text-[var(--text-main)] placeholder-[var(--text-muted)]"
          rows={1}
          disabled={isLoading}
        />
        
        <div className="flex gap-1 pb-1 pr-1">
          <button 
            type="button" 
            disabled 
            className="p-2 text-[var(--text-muted)] hover:text-[var(--text-main)] opacity-50 cursor-not-allowed transition-colors"
            title="Voice input coming soon"
          >
            <Mic size={20} />
          </button>
          
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center h-10 w-10 shadow-sm"
          >
            <Send size={18} className={input.trim() && !isLoading ? 'translate-x-0.5 -translate-y-0.5 transition-transform' : ''} />
          </button>
        </div>
      </form>
      <div className="text-center mt-3 text-xs text-[var(--text-muted)]">
        NOVA AI can make mistakes. Consider verifying important information.
      </div>
    </div>
  );
}
