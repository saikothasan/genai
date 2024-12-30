import React from 'react';
import { Message } from '../types/chat';
import { ChatMessage } from './ChatMessage';
import { getMessageThread } from '../utils/messageParser';

interface ChatThreadProps {
  messages: Message[];
  messageId: string;
  onReply: (messageId: string) => void;
}

export const ChatThread: React.FC<ChatThreadProps> = ({
  messages,
  messageId,
  onReply,
}) => {
  const thread = getMessageThread(messages, messageId);

  return (
    <div className="border-l-2 border-blue-200 ml-4">
      {thread.map((message) => (
        <ChatMessage
          key={message.id}
          message={message}
          onReply={onReply}
        />
      ))}
    </div>
  );
};