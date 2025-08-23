import OpenAI from 'openai';
import { normalizeChatCompletion } from '../lib/normalize.js';

// AIML is OpenAI‑compatible via baseURL
// Docs: https://api.aimlapi.com / Node examples show chat.completions with baseURL. 
export async function callAIML({ prompt, model }) {
  const key = process.env.AIML_API_KEY;
  if (!key) throw new Error('AIML_API_KEY is not set');

  const client = new OpenAI({
    apiKey: key,
    baseURL: 'https://api.aimlapi.com/v1'
  });

  const resp = await client.chat.completions.create({
    model: model || process.env.AIML_MODEL || 'gpt-4o',
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: prompt }
    ]
  });
  return normalizeChatCompletion({ provider: 'aiml', response: resp });
}
