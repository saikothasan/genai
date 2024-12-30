import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { formatDistanceToNow } from 'date-fns';
import { Copy, Bot, User, Reply, Trash2 } from 'lucide-react';
import type { Message } from '../types/chat';
import { CodeBlock } from './CodeBlock';
import { useChatStore } from '../store/chatStore';

interface ChatMessageProps {
  message: Message;
  onReply?: (messageId: string) => void;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, onReply }) => {
  const [copied, setCopied] = useState(false);
  const deleteMessage = useChatStore((state) => state.deleteMessage);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className={`flex gap-4 p-4 ${
        message.role === 'assistant' ? 'bg-gray-50' : ''
      } ${message.isError ? 'bg-red-50' : ''}`}
    >
      <div className="flex-shrink-0">
        {message.role === 'assistant' ? (
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
        ) : (
          <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
        )}
      </div>
      
      <div className="flex-grow">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-medium">
            {message.role === 'assistant' ? 'AI Assistant' : 'You'}
          </span>
          <span className="text-sm text-gray-500">
            {formatDistanceToNow(message.timestamp, { addSuffix: true })}
          </span>
          <span className="text-sm text-gray-500">
            via {message.model}
          </span>
        </div>
        
        <div className="prose prose-sm max-w-none">
          <ReactMarkdown>{message.content}</ReactMarkdown>
          {message.codeBlocks?.map((block, index) => (
            <CodeBlock
              key={index}
              language={block.language}
              code={block.code}
            />
          ))}
        </div>
        
        <div className="mt-2 flex gap-2">
          <button
            onClick={copyToClipboard}
            className="text-gray-500 hover:text-gray-700 flex items-center gap-1 text-sm"
          >
            <Copy className="w-4 h-4" />
            {copied ? 'Copied!' : 'Copy'}
          </button>
          {onReply && (
            <button
              onClick={() => onReply(message.id)}
              className="text-gray-500 hover:text-gray-700 flex items-center gap-1 text-sm"
            >
              <Reply className="w-4 h-4" />
              Reply
            </button>
          )}
          <button
            onClick={() => deleteMessage(message.id)}
            className="text-gray-500 hover:text-gray-700 flex items-center gap-1 text-sm"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};