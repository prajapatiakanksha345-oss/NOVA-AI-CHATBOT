import React from 'react';

export default function TypingIndicator() {
  return (
    <div className="flex gap-4 p-4 md:p-6 w-full bg-[var(--bg-panel)]/30">
      <div className="max-w-4xl mx-auto w-full flex gap-4 md:gap-6">
        <div className="shrink-0 pt-1">
          <div className="w-8 h-8 rounded-lg bg-[var(--accent)] flex items-center justify-center text-white font-bold text-sm shadow-md">
            N
          </div>
        </div>
        <div className="flex-1 min-w-0 py-2">
          <div className="flex items-center gap-1.5 h-6">
            <div className="w-2 h-2 rounded-full bg-[var(--text-muted)] typing-dot"></div>
            <div className="w-2 h-2 rounded-full bg-[var(--text-muted)] typing-dot"></div>
            <div className="w-2 h-2 rounded-full bg-[var(--text-muted)] typing-dot"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
