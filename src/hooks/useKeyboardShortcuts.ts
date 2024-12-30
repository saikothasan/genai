import { useEffect } from 'react';
import { useChatStore } from '../store/chatStore';

export function useKeyboardShortcuts() {
  const { clearMessages, messages } = useChatStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Clear chat: Cmd/Ctrl + K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (messages.length > 0) {
          if (window.confirm('Are you sure you want to clear the chat?')) {
            clearMessages();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [clearMessages, messages]);
}