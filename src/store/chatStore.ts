import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ChatState, Message } from '../types/chat';

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      messages: [],
      isLoading: false,
      error: null,
      selectedModel: 'openai',
      temperature: 0.7,
      maxTokens: 1000,
      threadView: false,

      addMessage: (content, role, parentId) => set((state) => ({
        messages: [...state.messages, {
          id: crypto.randomUUID(),
          content,
          role,
          timestamp: Date.now(),
          model: state.selectedModel,
          parentId,
        }],
      })),

      updateMessage: (id, updates) => set((state) => ({
        messages: state.messages.map((msg) =>
          msg.id === id ? { ...msg, ...updates } : msg
        ),
      })),

      deleteMessage: (id) => set((state) => ({
        messages: state.messages.filter((msg) => msg.id !== id),
      })),

      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
      clearMessages: () => set({ messages: [] }),
      setModel: (model) => set({ selectedModel: model }),
      setTemperature: (temperature) => set({ temperature }),
      setMaxTokens: (maxTokens) => set({ maxTokens }),
      setThreadView: (threadView) => set({ threadView }),
    }),
    {
      name: 'chat-storage',
    }
  )
);