import OpenAI from 'openai';
import { normalizeChatCompletion } from '../lib/normalize.js';

// DeepSeek is OpenAI‑compatible via baseURL.
export async function callDeepSeek({ prompt, model }) {
  const key = process.env.DEEPSEEK_API_KEY;
  if (!key) throw new Error('DEEPSEEK_API_KEY is not set');

  const client = new OpenAI({
    apiKey: key,
    baseURL: 'https://api.deepseek.com/v1'
  });

  const resp = await client.chat.completions.create({
    model: model || process.env.DEEPSEEK_MODEL || 'deepseek-chat',
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: prompt }
    ]
  });
  return normalizeChatCompletion({ provider: 'deepseek', response: resp });
}
