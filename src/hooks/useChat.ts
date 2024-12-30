import { useCallback } from 'react';
import { useChatStore } from '../store/chatStore';
import { getOpenAIResponse } from '../services/openai';
import { getGoogleResponse } from '../services/google';
import type { ModelType } from '../types/chat';

export function useChat() {
  const {
    addMessage,
    setLoading,
    setError,
    selectedModel,
    temperature,
    maxTokens,
  } = useChatStore();

  const handleStream = useCallback(async (
    stream: AsyncIterable<any>,
    model: ModelType
  ) => {
    let fullResponse = '';
    
    try {
      for await (const chunk of stream) {
        const content = model === 'openai' 
          ? chunk.choices[0]?.delta?.content || ''
          : chunk.text || '';
          
        fullResponse += content;
        
        // Update the message in real-time
        addMessage(fullResponse, 'assistant');
      }
    } catch (error) {
      console.error('Stream error:', error);
      throw error;
    }
  }, [addMessage]);

  const sendMessage = useCallback(async (content: string) => {
    addMessage(content, 'user');
    setLoading(true);
    setError(null);

    try {
      const stream = selectedModel === 'openai'
        ? await getOpenAIResponse(content, temperature, maxTokens)
        : await getGoogleResponse(content, temperature, maxTokens);

      await handleStream(stream, selectedModel);
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to get response from AI service');
    } finally {
      setLoading(false);
    }
  }, [
    selectedModel,
    temperature,
    maxTokens,
    addMessage,
    setLoading,
    setError,
    handleStream,
  ]);

  return { sendMessage };
}