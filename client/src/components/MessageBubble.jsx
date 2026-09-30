import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { User, Copy, Check, RotateCcw } from 'lucide-react';

export default function MessageBubble({ message, onRegenerate }) {
  const isAi = message.role === 'ai';
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex gap-4 p-4 md:p-6 w-full ${isAi ? 'bg-[var(--bg-panel)]/30' : ''}`}>
      <div className="max-w-4xl mx-auto w-full flex gap-4 md:gap-6">
        
        {/* Avatar */}
        <div className="shrink-0 pt-1">
          {isAi ? (
            <div className="w-8 h-8 rounded-lg bg-[var(--accent)] flex items-center justify-center text-white font-bold text-sm shadow-md">
              N
            </div>
          ) : (
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center text-white shadow-md">
              <User size={16} />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden min-w-0">
          <div className="font-semibold text-sm mb-1 text-[var(--text-main)]">
            {isAi ? 'NOVA AI' : 'You'}
          </div>
          
          <div className="prose prose-invert max-w-none markdown-body text-[var(--text-main)] break-words">
            {isAi ? (
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  code({node, inline, className, children, ...props}) {
                    const match = /language-(\w+)/.exec(className || '')
                    return !inline && match ? (
                      <div className="relative group rounded-md overflow-hidden my-4 bg-[#1e1e1e] border border-gray-700">
                        <div className="flex items-center justify-between px-4 py-1.5 bg-gray-800 text-xs text-gray-400">
                          <span>{match[1]}</span>
                          <button 
                            onClick={() => navigator.clipboard.writeText(String(children).replace(/\n$/, ''))}
                            className="hover:text-white transition-colors p-1"
                            title="Copy code"
                          >
                            <Copy size={14} />
                          </button>
                        </div>
                        <div className="p-4 overflow-x-auto">
                          <code className={className} {...props}>
                            {children}
                          </code>
                        </div>
                      </div>
                    ) : (
                      <code className="bg-black/10 dark:bg-white/10 px-1.5 py-0.5 rounded text-sm font-mono text-[var(--text-main)]" {...props}>
                        {children}
                      </code>
                    )
                  }
                }}
              >
                {message.content}
              </ReactMarkdown>
            ) : (
              <div className="whitespace-pre-wrap">{message.content}</div>
            )}
          </div>

          {/* Action buttons (only for AI) */}
          {isAi && (
            <div className="mt-4 flex items-center gap-2">
              <button 
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors p-1.5 rounded hover:bg-black/5 dark:hover:bg-white/5"
              >
                {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                {copied ? 'Copied' : 'Copy'}
              </button>
              
              {onRegenerate && (
                <button 
                  onClick={onRegenerate}
                  className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors p-1.5 rounded hover:bg-black/5 dark:hover:bg-white/5"
                >
                  <RotateCcw size={14} />
                  Regenerate
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
