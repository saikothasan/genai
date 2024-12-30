import { useCallback } from 'react';
import { useChatStore } from '../store/chatStore';
import { Message } from '../types/chat';

export function useMessageHistory() {
  const { messages } = useChatStore();

  const exportHistory = useCallback(() => {
    const exportData = {
      messages,
      exportDate: new Date().toISOString(),
      version: '1.0',
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { 
      type: 'application/json' 
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-history-${new Date().toISOString()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [messages]);

  const importHistory = useCallback(async (file: File) => {
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      return data.messages as Message[];
    } catch (error) {
      throw new Error('Invalid chat history file');
    }
  }, []);

  return { exportHistory, importHistory };
}