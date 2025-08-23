import express from 'express';
import { PROVIDERS } from '../providers/index.js';

const router = express.Router();

router.post('/chat', async (req, res) => {
  try {
    const { prompt, provider = 'openai', model } = req.body ?? {};
    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'prompt (string) is required' });
    }
    const fn = PROVIDERS[provider];
    if (!fn) return res.status(400).json({ error: `Unknown provider: ${provider}` });

    const out = await fn({ prompt, model });
    return res.json(out);
  } catch (err) {
    console.error('[v2/chat] error', err);
    return res.status(500).json({ error: 'Internal error', details: String(err?.message || err) });
  }
});

export default router;
