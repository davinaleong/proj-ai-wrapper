import express from "express"
import path from "node:path"
import fs from "node:fs/promises"
import { PREDEFINED_QA } from "../lib/predefined.js"
import { matchPredefined } from "../lib/match.js"
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

// GET /v4/files?type=document|image  -> list available files
router.get("/files", async (req, res) => {
  const { type } = req.query
  if (!["document", "image"].includes(type)) {
    return res.status(400).json({ error: "type must be document|image" })
  }
  const list = await listFiles(type === "document" ? ROOT_DOCS : ROOT_IMGS)
  return res.json({ type, files: list })
})

// POST /v4/chat  -> same as v3, but can attach files
// body: { prompt, provider?, model?, attachments?: [{type:'document'|'image', filename:'...'}] }
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

    // optional: validate requested attachments exist
    const validAttachments = []
    for (const a of attachments) {
      if (!a?.type || !a?.filename) continue
      if (!["document", "image"].includes(a.type)) continue

      const root = a.type === "document" ? ROOT_DOCS : ROOT_IMGS
      try {
        await fs.access(path.join(root, a.filename))
        validAttachments.push({
          type: a.type,
          filename: a.filename,
        })
      } catch {
        /* skip missing file */
      }
    }

    // 1) predefined?
    const hit = matchPredefined(prompt, PREDEFINED_QA)
    let payload
    if (hit) {
      payload = {
        id: `predef_${Date.now()}`,
        provider: "predefined",
        model: "predefined",
        content: [{ type: "text", text: hit.a }],
        usage: null,
        raw: hit,
      }
    } else {
      const fn = PROVIDERS[provider]
      if (!fn)
        return res.status(400).json({ error: `Unknown provider: ${provider}` })
      payload = await fn({ prompt, model })
    }

    // 2) include downloadable links if any
    if (validAttachments.length) {
      payload.attachments = validAttachments.map((a) => ({
        type: a.type,
        filename: a.filename,
        url: buildFileUrl(req, a.type, a.filename),
      }))
    }

    return res.json(payload)
  } catch (err) {
    console.error("[v4/chat] error", err)
    return res
      .status(500)
      .json({ error: "Internal error", details: String(err?.message || err) })
  }
})

export default router
