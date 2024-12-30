import React, { useEffect } from 'react';
import { Header } from './components/Header';
import { ChatMessage } from './components/ChatMessage';
import { ChatThread } from './components/ChatThread';
import { ChatInput } from './components/ChatInput';
import { ModelSettings } from './components/ModelSettings';
import { LoadingSpinner } from './components/LoadingSpinner';
import { useChatStore } from './store/chatStore';
import { useChat } from './hooks/useChat';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { validateApiKeys } from './utils/validation';

function App() {
  const {
    messages,
    isLoading,
    error,
    selectedModel,
    temperature,
    maxTokens,
    threadView,
    clearMessages,
    setModel,
    setTemperature,
    setMaxTokens,
    setError,
    setThreadView,
  } = useChatStore();

  const { sendMessage } = useChat();
  useKeyboardShortcuts();

  useEffect(() => {
    const { isValid, error } = validateApiKeys();
    if (!isValid && error) {
      setError(error);
    }
  }, [setError]);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="flex-grow max-w-4xl mx-auto bg-white shadow-lg flex flex-col">
        <Header onClear={clearMessages} />

        <ModelSettings
          model={selectedModel}
          temperature={temperature}
          maxTokens={maxTokens}
          onModelChange={setModel}
          onTemperatureChange={setTemperature}
          onMaxTokensChange={setMaxTokens}
        />

        <div className="flex-grow overflow-auto">
          {messages.map((message) => (
            threadView && message.parentId ? null : (
              <React.Fragment key={message.id}>
                <ChatMessage message={message} onReply={handleReply} />
                {threadView && messages.some(m => m.parentId === message.id) && (
                  <ChatThread
                    messages={messages}
                    messageId={message.id}
                    onReply={handleReply}
                  />
                )}
              </React.Fragment>
            )
          ))}
          {isLoading && (
            <div className="p-4">
              <LoadingSpinner />
            </div>
          )}
          {error && (
            <div className="p-4 text-red-500 bg-red-50 border-l-4 border-red-500">
              {error}
            </div>
          )}
        </div>

        <ChatInput onSend={sendMessage} disabled={isLoading || !!error} />
      </div>
    </div>
  );
}

export default App;