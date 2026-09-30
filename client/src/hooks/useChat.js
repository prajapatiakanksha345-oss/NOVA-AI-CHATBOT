import { useState, useEffect } from 'react';

const STORAGE_KEY = 'nova_ai_chats';

export const useChat = () => {
  const [chats, setChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);

  // Load from localStorage on mount
  useEffect(() => {
    const savedChats = localStorage.getItem(STORAGE_KEY);
    if (savedChats) {
      try {
        setChats(JSON.parse(savedChats));
      } catch (e) {
        console.error('Failed to parse chats from localStorage');
      }
    }
  }, []);

  // Save to localStorage when chats change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(chats));
  }, [chats]);

  const currentChat = chats.find(c => c.id === currentChatId) || null;

  const createNewChat = () => {
    const newChat = {
      id: Date.now().toString(),
      title: 'New Chat',
      messages: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setChats(prev => [newChat, ...prev]);
    setCurrentChatId(newChat.id);
    return newChat.id;
  };

  const addMessage = (chatId, message) => {
    setChats(prev => prev.map(chat => {
      if (chat.id === chatId) {
        const isFirstUserMessage = chat.messages.length === 0 && message.role === 'user';
        return {
          ...chat,
          messages: [...chat.messages, message],
          title: isFirstUserMessage ? message.content.slice(0, 30) + (message.content.length > 30 ? '...' : '') : chat.title,
          updatedAt: new Date().toISOString(),
        };
      }
      return chat;
    }));
  };

  const deleteChat = (chatId) => {
    setChats(prev => prev.filter(c => c.id !== chatId));
    if (currentChatId === chatId) {
      setCurrentChatId(null);
    }
  };

  const clearAllChats = () => {
    setChats([]);
    setCurrentChatId(null);
  };

  return {
    chats,
    currentChat,
    currentChatId,
    setCurrentChatId,
    createNewChat,
    addMessage,
    deleteChat,
    clearAllChats,
  };
};
