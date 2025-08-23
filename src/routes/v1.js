import express from 'express';
import OpenAI from 'openai';

const router = express.Router();

router.post('/chat', async (req, res) => {
  try {
    const { prompt, model } = req.body ?? {};
    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'prompt (string) is required' });
    }
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: 'OPENAI_API_KEY is not set' });
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    // Using Chat Completions for uniformity across providers later.
    const completion = await openai.chat.completions.create({
      model: model || process.env.OPENAI_MODEL || 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: prompt }
      ]
    });

    const text = completion.choices?.[0]?.message?.content ?? '';
    return res.json({
      id: completion.id,
      provider: 'openai',
      model: completion.model,
      content: [{ type: 'text', text }],
      usage: completion.usage,
      raw: completion
    });
  } catch (err) {
    console.error('[v1/chat] error', err);
    return res.status(500).json({ error: 'Internal error', details: String(err?.message || err) });
  }
});

export default router;
