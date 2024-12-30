import { Message } from '../types/chat';

export function parseCodeBlocks(content: string): {
  content: string;
  codeBlocks: Array<{ language: string; code: string }>;
} {
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
  const codeBlocks: Array<{ language: string; code: string }> = [];
  let cleanContent = content;

  let match;
  while ((match = codeBlockRegex.exec(content)) !== null) {
    const [fullMatch, language = '', code] = match;
    codeBlocks.push({ language: language.trim(), code: code.trim() });
    cleanContent = cleanContent.replace(fullMatch, `[Code Block ${codeBlocks.length}]`);
  }

  return { content: cleanContent, codeBlocks };
}

export function getMessageThread(messages: Message[], messageId: string): Message[] {
  const thread: Message[] = [];
  let currentId: string | undefined = messageId;

  while (currentId) {
    const message = messages.find(m => m.id === currentId);
    if (message) {
      thread.unshift(message);
      currentId = message.parentId;
    } else {
      break;
    }
  }

  return thread;
}