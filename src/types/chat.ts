export type ModelType = 'google' | 'openai';

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: number;
  model: ModelType;
  parentId?: string; // For message threading
  codeBlocks?: Array<{ language: string; code: string }>; // For code snippets
  isError?: boolean;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  selectedModel: ModelType;
  temperature: number;
  maxTokens: number;
  threadView: boolean;
  addMessage: (content: string, role: Message['role'], parentId?: string) => void;
  updateMessage: (id: string, updates: Partial<Message>) => void;
  deleteMessage: (id: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearMessages: () => void;
  setModel: (model: ModelType) => void;
  setTemperature: (temp: number) => void;
  setMaxTokens: (tokens: number) => void;
  setThreadView: (enabled: boolean) => void;
}