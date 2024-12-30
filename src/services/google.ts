import { GoogleGenerativeAI } from '@google/generative-ai';
import { ENV } from '../config/env';

const genAI = new GoogleGenerativeAI(ENV.GOOGLE_API_KEY);

export async function getGoogleResponse(
  prompt: string,
  temperature: number,
  maxTokens: number
) {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const response = await model.generateContentStream({
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    generationConfig: {
      temperature,
      maxOutputTokens: maxTokens,
    },
  });

  return response;
}