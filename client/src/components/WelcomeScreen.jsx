import React from 'react';
import SuggestionCard from './SuggestionCard';

const SUGGESTIONS = [
  { icon: '💻', text: 'Help me build a React project' },
  { icon: '📚', text: 'Explain a difficult programming concept' },
  { icon: '💡', text: 'Give me innovative AI project ideas' },
  { icon: '🚀', text: 'Help me prepare for a technical interview' }
];

export default function WelcomeScreen({ onSuggestionClick }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 max-w-4xl mx-auto w-full animate-fade-in">
      <div className="text-center mb-12">
        <div className="w-16 h-16 rounded-2xl bg-[var(--accent)] text-white flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-xl shadow-[var(--accent)]/20 relative">
          N
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-[var(--bg-main)]"></div>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Welcome to NOVA AI</h1>
        <p className="text-[var(--text-muted)] text-lg max-w-lg mx-auto">
          Your intelligent AI assistant for coding, learning, ideas and productivity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
        {SUGGESTIONS.map((s, i) => (
          <SuggestionCard 
            key={i} 
            icon={s.icon} 
            text={s.text} 
            onClick={onSuggestionClick} 
          />
        ))}
      </div>
    </div>
  );
}
