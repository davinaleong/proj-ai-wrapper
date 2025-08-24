// src/routes/v3.js
import express from 'express';
import { QA_BANK } from '../lib/predefined.js';
import { matchPredefinedAdvanced } from '../lib/match.js';
import { PROVIDERS } from '../providers/index.js';
import { DEFAULT_PROVIDER } from '../lib/config.js';

const router = express.Router();

/**
 * POST /v3/chat
 * body: {
 *   prompt: string,
 *   provider?: 'aiml'|'openai'|'deepseek',
 *   model?: string
 * }
 *
 * Behavior:
 * 1) If prompt matches QA_BANK -> return predefined reply (plus followups)
 * 2) Else -> call chosen provider (default AIML)
 */
router.post('/chat', async (req, res) => {
  try {
    const { prompt, provider = DEFAULT_PROVIDER, model } = req.body ?? {};
    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'prompt (string) is required' });
    }

    // (1) predefined Q&A
    const hit = matchPredefinedAdvanced(prompt, QA_BANK);
    if (hit?.item) {
      return res.json({
        id: `predef_${hit.item.id}_${Date.now()}`,
        provider: 'predefined',
        model: 'predefined',
        matched: { id: hit.item.id, by: hit.matchedBy, score: hit.score },
        content: [{ type: 'text', text: hit.item.reply }],
        followups: hit.item.followups ?? [],
        usage: null,
        raw: hit.item,
      });
    }

    // (2) provider fallback
    const fn = PROVIDERS[provider];
    if (!fn) {
      return res.status(400).json({ error: `Unknown provider: ${provider}`, allowed: Object.keys(PROVIDERS) });
    }

    const out = await fn({ prompt, model });
    return res.json(out);
  } catch (err) {
    console.error('[v3/chat] error', err);
    return res.status(500).json({ error: 'Internal error', details: String(err?.message || err) });
  }
});

export default router;
