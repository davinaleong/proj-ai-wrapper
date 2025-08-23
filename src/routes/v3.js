import express from "express"
import { QA_BANK, QA_FALLBACK_REPLY } from "../lib/predefined.js"
import { matchPredefinedAdvanced } from "../lib/match.js"
import { PROVIDERS } from "../providers/index.js"

const router = express.Router()

/**
 * POST /v3/chat
 * body: {
 *   prompt: string,
 *   provider?: 'openai' | 'aiml' | 'deepseek',
 *   model?: string,
 *   predefinedOnly?: boolean   // if true, do not call providers when no match
 * }
 */
router.post("/chat", async (req, res) => {
  try {
    const {
      prompt,
      provider = "openai",
      model,
      predefinedOnly = false,
    } = req.body ?? {}
    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({ error: "prompt (string) is required" })
    }

    // 1) Try predefined bank
    const hit = matchPredefinedAdvanced(prompt, QA_BANK)
    if (hit?.item) {
      const payload = {
        id: `predef_${hit.item.id}_${Date.now()}`,
        provider: "predefined",
        model: "predefined",
        matched: {
          id: hit.item.id,
          by: hit.matchedBy,
          score: hit.score,
        },
        content: [{ type: "text", text: hit.item.reply }],
        followups: hit.item.followups ?? [],
        usage: null,
        raw: hit.item,
      }
      return res.json(payload)
    }

    // 2) If caller wants only predefined replies, stop here with fallback text
    if (predefinedOnly) {
      return res.json({
        id: `predef_fallback_${Date.now()}`,
        provider: "predefined",
        model: "predefined",
        matched: null,
        content: [{ type: "text", text: QA_FALLBACK_REPLY }],
        followups: [],
        usage: null,
        raw: null,
      })
    }

    // 3) Otherwise, fall back to selected AI provider (v2 behaviour)
    const fn = PROVIDERS[provider]
    if (!fn)
      return res.status(400).json({ error: `Unknown provider: ${provider}` })

    const out = await fn({ prompt, model })
    return res.json(out)
  } catch (err) {
    console.error("[v3/chat] error", err)
    return res
      .status(500)
      .json({ error: "Internal error", details: String(err?.message || err) })
  }
})

export default router
