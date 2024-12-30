import React, { useRef } from 'react';
import { Download, Upload } from 'lucide-react';
import { useMessageHistory } from '../hooks/useMessageHistory';
import { useChatStore } from '../store/chatStore';

export const ImportExport: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { exportHistory, importHistory } = useMessageHistory();
  const { messages, clearMessages, addMessage } = useChatStore();

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const importedMessages = await importHistory(file);
      clearMessages();
      importedMessages.forEach(msg => {
        addMessage(msg.content, msg.role, msg.parentId);
      });
    } catch (error) {
      console.error('Import failed:', error);
    }
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={exportHistory}
        className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
        title="Export chat history"
        disabled={messages.length === 0}
      >
        <Download className="w-5 h-5" />
      </button>
      <button
        onClick={() => fileInputRef.current?.click()}
        className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
        title="Import chat history"
      >
        <Upload className="w-5 h-5" />
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        className="hidden"
        onChange={handleImport}
      />
    </div>
  );
}