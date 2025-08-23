// src/routes/v4.js
import express from "express"
import path from "node:path"
import fs from "node:fs/promises"

import { PREDEFINED_QA } from "../lib/predefined.js" // keep your existing v3-style bank for normal answers
import { FILE_QA_BANK, FILE_QA_FALLBACK } from "../lib/predefinedFiles.js" // new: file-oriented prompts
import { matchPredefinedAdvanced } from "../lib/match.js" // same advanced matcher used in v3
import { PROVIDERS } from "../providers/index.js"

const router = express.Router()

const ROOT_DOCS = path.resolve("src/assets/document")
const ROOT_IMGS = path.resolve("src/assets/images")

function buildFileUrl(req, type, filename) {
  const host = `${req.protocol}://${req.get("host")}`
  const base = type === "document" ? "/assets/documents" : "/assets/images"
  return `${host}${base}/${encodeURIComponent(filename)}`
}

async function listFiles(dir) {
  try {
    const items = await fs.readdir(dir)
    return items.filter(Boolean)
  } catch {
    return []
  }
}

async function fileExists(type, filename) {
  const root = type === "document" ? ROOT_DOCS : ROOT_IMGS
  try {
    await fs.access(path.join(root, filename))
    return true
  } catch {
    return false
  }
}

// Convenience: list available placeholder files (unchanged)
router.get("/files", async (req, res) => {
  const { type } = req.query
  if (!["document", "image"].includes(type)) {
    return res.status(400).json({ error: "type must be document|image" })
  }
  const list = await listFiles(type === "document" ? ROOT_DOCS : ROOT_IMGS)
  return res.json({ type, files: list })
})

/**
 * POST /v4/chat
 * body: {
 *   prompt: string,
 *   provider?: 'openai'|'aiml'|'deepseek',
 *   model?: string,
 *   // optional: legacy manual attachments still supported
 *   attachments?: [{type:'document'|'image', filename:'...'}]
 * }
 *
 * Behaviour (in order):
 * 1) If prompt matches a file QA (FILE_QA_BANK), auto-attach its files and reply with text + links.
 * 2) Else if prompt matches normal predefined QA (PREDEFINED_QA), return its text.
 * 3) Else call selected provider (v2 behaviour).
 * 4) If request also gave attachments, they’re appended (validated).
 */
router.post("/chat", async (req, res) => {
  try {
    const {
      prompt,
      provider = "openai",
      model,
      attachments = [],
    } = req.body ?? {}
    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({ error: "prompt (string) is required" })
    }

    // === (1) Try file-oriented predefineds first ===
    const fileHit = matchPredefinedAdvanced(prompt, FILE_QA_BANK)
    if (fileHit?.item) {
      const item = fileHit.item

      // Validate configured attachments; if missing on disk, we silently skip (still reply with text)
      const resolved = []
      for (const a of item.attachments || []) {
        if (!a?.type || !a?.filename) continue
        if (!["document", "image"].includes(a.type)) continue
        if (await fileExists(a.type, a.filename)) {
          resolved.push(a)
        }
      }

      // Build payload with text + (optional) resolved attachments
      const payload = {
        id: `filepredef_${item.id}_${Date.now()}`,
        provider: "predefined",
        model: "predefined",
        matched: { id: item.id, by: fileHit.matchedBy, score: fileHit.score },
        content: [{ type: "text", text: item.reply }],
        followups: [], // optional: add next-steps here if you like
        usage: null,
        raw: item,
      }

      if (resolved.length) {
        payload.attachments = resolved.map((a) => ({
          type: a.type,
          filename: a.filename,
          url: buildFileUrl(req, a.type, a.filename),
        }))
      } else {
        // If nothing found on disk, guide the user (keeps content requirement)
        payload.notice = {
          message:
            "Configured placeholder file(s) not found on server. Please add them to src/assets.",
          expected: (item.attachments || []).map(
            (a) => `${a.type}:${a.filename}`
          ),
        }
      }

      // If request also supplied manual attachments, validate & append
      const extras = await validateAndResolveManualAttachments(req, attachments)
      if (extras.length) {
        payload.attachments = (payload.attachments || []).concat(extras)
      }

      return res.json(payload)
    }

    // === (2) Normal predefineds (text-only), reusing your existing bank ===
    const textHit = matchPredefinedAdvanced(prompt, PREDEFINED_QA)
    if (textHit?.item) {
      const payload = {
        id: `predef_${textHit.item.id}_${Date.now()}`,
        provider: "predefined",
        model: "predefined",
        matched: {
          id: textHit.item.id,
          by: textHit.matchedBy,
          score: textHit.score,
        },
        content: [{ type: "text", text: textHit.item.reply }],
        followups: textHit.item.followups ?? [],
        usage: null,
        raw: textHit.item,
      }

      // Respect manual attachments if caller provided them
      const extras = await validateAndResolveManualAttachments(req, attachments)
      if (extras.length) payload.attachments = extras

      return res.json(payload)
    }

    // === (3) Fall back to AI provider (v2 behaviour) ===
    const fn = PROVIDERS[provider]
    if (!fn)
      return res.status(400).json({ error: `Unknown provider: ${provider}` })
    const out = await fn({ prompt, model })

    // Append manual attachments if any
    const extras = await validateAndResolveManualAttachments(req, attachments)
    if (extras.length) out.attachments = extras

    return res.json(out)
  } catch (err) {
    console.error("[v4/chat] error", err)
    return res
      .status(500)
      .json({ error: "Internal error", details: String(err?.message || err) })
  }
})

async function validateAndResolveManualAttachments(req, attachments) {
  const valid = []
  for (const a of attachments || []) {
    if (!a?.type || !a?.filename) continue
    if (!["document", "image"].includes(a.type)) continue
    const ok = await fileExists(a.type, a.filename)
    if (!ok) continue
    valid.push({
      type: a.type,
      filename: a.filename,
      url: buildFileUrl(req, a.type, a.filename),
    })
  }
  return valid
}

export default router
