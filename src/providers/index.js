import { callOpenAI } from './openai.js';
import { callAIML } from './aiml.js';
import { callDeepSeek } from './deepseek.js';

export const PROVIDERS = {
  openai: callOpenAI,
  aiml: callAIML,
  deepseek: callDeepSeek
};
