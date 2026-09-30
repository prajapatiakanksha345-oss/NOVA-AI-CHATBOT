import React from 'react';
import { Plus, MessageSquare, Trash2, Settings, User, X } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export default function Sidebar({
  chats,
  currentChatId,
  onSelectChat,
  onNewChat,
  onDeleteChat,
  onOpenSettings,
  isOpen,
  onClose
}) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar container */}
      <div className={`
        fixed inset-y-0 left-0 z-30 w-72 bg-[var(--bg-panel)] border-r border-[var(--border-color)]
        transform transition-transform duration-300 ease-in-out flex flex-col
        md:relative md:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Header */}
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[var(--accent)] flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-[var(--accent)]/20">
              N
            </div>
            <span className="font-bold text-lg tracking-wide">NOVA AI</span>
          </div>
          <button onClick={onClose} className="md:hidden p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg">
            <X size={20} />
          </button>
        </div>

        {/* New Chat Button */}
        <div className="px-4 pb-4">
          <button 
            onClick={() => {
              onNewChat();
              if(window.innerWidth < 768) onClose();
            }}
            className="w-full flex items-center gap-2 px-4 py-3 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white rounded-xl transition-colors font-medium"
          >
            <Plus size={20} />
            New Chat
          </button>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto px-2 space-y-1">
          {chats.map(chat => (
            <div 
              key={chat.id}
              className={`
                group flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors
                ${currentChatId === chat.id 
                  ? 'bg-black/5 dark:bg-white/10 text-[var(--accent)]' 
                  : 'hover:bg-black/5 dark:hover:bg-white/5 text-[var(--text-main)]'}
              `}
              onClick={() => {
                onSelectChat(chat.id);
                if(window.innerWidth < 768) onClose();
              }}
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <MessageSquare size={18} className="shrink-0" />
                <div className="flex flex-col overflow-hidden">
                  <span className="truncate text-sm font-medium">{chat.title}</span>
                  <span className="text-xs text-[var(--text-muted)]">
                    {formatDistanceToNow(new Date(chat.updatedAt), { addSuffix: true })}
                  </span>
                </div>
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteChat(chat.id);
                }}
                className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-black/10 dark:hover:bg-white/10 rounded-md text-red-500 transition-all"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          {chats.length === 0 && (
            <div className="text-center p-4 text-sm text-[var(--text-muted)]">
              No recent chats
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[var(--border-color)] space-y-1">
          <button 
            onClick={onOpenSettings}
            className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-sm font-medium"
          >
            <Settings size={18} />
            Settings
          </button>
          <div className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-sm font-medium cursor-pointer">
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center text-white">
              <User size={14} />
            </div>
            User Profile
          </div>
        </div>
      </div>
    </>
  );
}
