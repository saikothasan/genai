import { ENV } from '../config/env';

export function validateApiKeys(): { isValid: boolean; error?: string } {
  if (!ENV.OPENAI_API_KEY || ENV.OPENAI_API_KEY === 'your-openai-api-key-here') {
    return { isValid: false, error: 'OpenAI API key is not configured' };
  }

  if (!ENV.GOOGLE_API_KEY || ENV.GOOGLE_API_KEY === 'your-google-api-key-here') {
    return { isValid: false, error: 'Google API key is not configured' };
  }

  return { isValid: true };
}

export function validateMessage(content: string): { isValid: boolean; error?: string } {
  if (!content.trim()) {
    return { isValid: false, error: 'Message cannot be empty' };
  }

  if (content.length > 4000) {
    return { isValid: false, error: 'Message is too long (max 4000 characters)' };
  }

  return { isValid: true };
}