import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './components/Sidebar';
import ChatHeader from './components/ChatHeader';
import WelcomeScreen from './components/WelcomeScreen';
import MessageBubble from './components/MessageBubble';
import TypingIndicator from './components/TypingIndicator';
import ChatInput from './components/ChatInput';
import SettingsModal from './components/SettingsModal';
import { useChat } from './hooks/useChat';
import { sendMessageToAI } from './services/chatService';

function App() {
  const {
    chats,
    currentChat,
    currentChatId,
    setCurrentChatId,
    createNewChat,
    addMessage,
    deleteChat,
    clearAllChats,
  } = useChat();

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'system');
  const messagesEndRef = useRef(null);

  // Theme effect
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    
    let effectiveTheme = theme;
    if (theme === 'system') {
      effectiveTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    
    root.classList.add(effectiveTheme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Scroll to bottom when messages change or loading state changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentChat?.messages, isLoading]);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    
    // Create new chat if no chat is selected
    let activeChatId = currentChatId;
    if (!activeChatId) {
      activeChatId = createNewChat();
    }

    // Add user message
    const newMessage = { role: 'user', content: userMessage, id: Date.now().toString() };
    addMessage(activeChatId, newMessage);
    
    setIsLoading(true);

    try {
      // Get conversation history for context (excluding the message we just added since it's handled differently or included)
      const currentMessages = currentChat ? [...currentChat.messages] : [];
      // We send previous messages for context
      
      const aiResponse = await sendMessageToAI(userMessage, currentMessages);
      addMessage(activeChatId, { role: 'ai', content: aiResponse, id: Date.now().toString() });
    } catch (error) {
      addMessage(activeChatId, { 
        role: 'ai', 
        content: `**Error:** ${error.message || 'Something went wrong. Please try again.'}`,
        id: Date.now().toString() 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    // Focus input or just submit
    setTimeout(() => {
      handleSubmit({ preventDefault: () => {} });
    }, 100);
  };

  const handleRegenerate = async (messageIndex) => {
    if (!currentChat || isLoading) return;
    
    // In a full version, we'd truncate the chat up to this message and resend the previous user message.
    // For simplicity, we just resend the last user message if the last message was AI.
    const lastUserMsg = [...currentChat.messages].reverse().find(m => m.role === 'user');
    if (lastUserMsg) {
      setIsLoading(true);
      try {
        const historyContext = currentChat.messages.slice(0, -1); // approximate
        const aiResponse = await sendMessageToAI(lastUserMsg.content, historyContext);
        addMessage(currentChatId, { role: 'ai', content: aiResponse, id: Date.now().toString() });
      } catch (error) {
        addMessage(currentChatId, { role: 'ai', content: `**Error:** ${error.message}`, id: Date.now().toString() });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--bg-main)]">
      <Sidebar 
        chats={chats}
        currentChatId={currentChatId}
        onSelectChat={setCurrentChatId}
        onNewChat={createNewChat}
        onDeleteChat={deleteChat}
        onOpenSettings={() => setIsSettingsOpen(true)}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        <ChatHeader 
          onMenuClick={() => setIsSidebarOpen(true)}
          theme={theme}
          toggleTheme={toggleTheme}
        />

        <main className="flex-1 overflow-y-auto flex flex-col relative">
          {!currentChat || currentChat.messages.length === 0 ? (
            <WelcomeScreen onSuggestionClick={handleSuggestionClick} />
          ) : (
            <div className="flex flex-col pb-4">
              {currentChat.messages.map((msg, idx) => (
                <MessageBubble 
                  key={msg.id} 
                  message={msg} 
                  onRegenerate={idx === currentChat.messages.length - 1 && msg.role === 'ai' ? handleRegenerate : undefined}
                />
              ))}
              {isLoading && <TypingIndicator />}
              <div ref={messagesEndRef} className="h-4" />
            </div>
          )}
        </main>

        <div className="bg-gradient-to-t from-[var(--bg-main)] via-[var(--bg-main)] to-transparent pt-6 relative z-10">
          <ChatInput 
            input={input}
            setInput={setInput}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>
      </div>

      <SettingsModal 
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        theme={theme}
        setTheme={setTheme}
        clearAllChats={clearAllChats}
      />
    </div>
  );
}

export default App;
