import React from 'react';
import { MessageSquare, Trash2 } from 'lucide-react';
import { ImportExport } from './ImportExport';

interface HeaderProps {
  onClear: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onClear }) => (
  <header className="p-4 border-b flex items-center justify-between bg-white">
    <div className="flex items-center gap-2">
      <MessageSquare className="w-6 h-6 text-blue-500" />
      <h1 className="text-xl font-bold">AI Chat Assistant</h1>
    </div>
    <div className="flex gap-2">
      <button
        onClick={onClear}
        className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
        title="Clear conversation"
      >
        <Trash2 className="w-5 h-5" />
      </button>
      <ImportExport />
    </div>
  </header>
);