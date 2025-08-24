// src/routes/v2.js
import express from 'express';
import { PROVIDERS } from '../providers/index.js';
import { DEFAULT_PROVIDER } from '../lib/config.js';

const router = express.Router();

/**
 * POST /v2/chat
 * body: {
 *   prompt: string,
 *   provider?: 'aiml'|'openai'|'deepseek',   // default: AIML (via env or hardcoded)
 *   model?: string
 * }
 *
 * Behavior:
 * - Pick provider (default AIML), call its adapter
 * - Return normalized JSON: { id, provider, model, content:[{type:'text',text}], usage?, raw }
 */
router.post('/chat', async (req, res) => {
  try {
    const { prompt, provider = DEFAULT_PROVIDER, model } = req.body ?? {};
    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'prompt (string) is required' });
    }

    const fn = PROVIDERS[provider];
    if (!fn) {
      return res.status(400).json({ error: `Unknown provider: ${provider}`, allowed: Object.keys(PROVIDERS) });
    }

    const out = await fn({ prompt, model });

    // Ensure minimal shape even if a provider returns odd data
    const safe = {
      id: out?.id || `${provider}_${Date.now()}`,
      provider,
      model: out?.model || model || null,
      content: Array.isArray(out?.content) ? out.content : [{ type: 'text', text: String(out?.text || '') }],
      usage: out?.usage ?? null,
      raw: out?.raw ?? out ?? null
    };

    return res.json(safe);
  } catch (err) {
    console.error('[v2/chat] error', err);
    return res.status(500).json({ error: 'Internal error', details: String(err?.message || err) });
  }
});

export default router;
