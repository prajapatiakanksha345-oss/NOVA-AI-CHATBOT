import React from 'react';

export default function SuggestionCard({ icon, text, onClick }) {
  return (
    <button 
      onClick={() => onClick(text)}
      className="p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-panel)]/30 hover:bg-[var(--bg-panel)] transition-all hover:-translate-y-1 text-left flex flex-col gap-3 group"
    >
      <div className="text-2xl group-hover:scale-110 transition-transform origin-bottom-left">{icon}</div>
      <p className="text-sm font-medium text-[var(--text-main)]">{text}</p>
    </button>
  );
}
