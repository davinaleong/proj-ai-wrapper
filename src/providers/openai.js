import OpenAI from 'openai';
import { normalizeChatCompletion } from '../lib/normalize.js';

export async function callOpenAI({ prompt, model }) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new Error('OPENAI_API_KEY is not set');

  const client = new OpenAI({ apiKey: key });
  const resp = await client.chat.completions.create({
    model: model || process.env.OPENAI_MODEL || 'gpt-4o-mini',
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: prompt }
    ]
  });
  return normalizeChatCompletion({ provider: 'openai', response: resp });
}
