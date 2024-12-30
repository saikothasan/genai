import OpenAI from 'openai';
import { ENV } from '../config/env';

const openai = new OpenAI({
  apiKey: ENV.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function getOpenAIResponse(
  prompt: string,
  temperature: number,
  maxTokens: number
) {
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    temperature,
    max_tokens: maxTokens,
    stream: true,
  });

  return response;
}