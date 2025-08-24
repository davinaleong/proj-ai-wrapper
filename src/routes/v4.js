// src/routes/v4.js
import express from 'express';
import path from 'node:path';
import fs from 'node:fs/promises';

import { PREDEFINED_QA } from '../lib/predefined.js';
import { FILE_QA_BANK } from '../lib/predefined_files.js';
import { matchPredefinedAdvanced } from '../lib/match.js';
import { PROVIDERS } from '../providers/index.js';

const router = express.Router();

// Static roots (using public/ convention)
const ROOT_DOCS = path.resolve('public/documents');
const ROOT_IMGS = path.resolve('public/images');

// Build a public URL (used only when returnLink=true)
function buildFileUrl(req, type, filename) {
  const host = `${req.protocol}://${req.get('host')}`;
  const base = type === 'document' ? '/documents' : '/images';
  return `${host}${base}/${encodeURIComponent(filename)}`;
}

// Securely resolve a path and ensure it's inside our allowed root
function safeResolve(root, filename) {
  const abs = path.resolve(root, filename);
  if (!abs.startsWith(root + path.sep)) {
    throw new Error('Path traversal detected');
  }
  return abs;
}

async function fileExists(type, filename) {
  const root = type === 'document' ? ROOT_DOCS : ROOT_IMGS;
  try {
    const abs = safeResolve(root, filename);
    await fs.access(abs);
    return true;
  } catch {
    return false;
  }
}

async function listFiles(dir) {
  try {
    const items = await fs.readdir(dir);
    return items.filter(Boolean);
  } catch {
    return [];
  }
}

// Optional: list available files (unchanged API)
router.get('/files', async (req, res) => {
  const { type } = req.query;
  if (!['document', 'image'].includes(type)) {
    return res.status(400).json({ error: 'type must be document|image' });
  }
  const list = await listFiles(type === 'document' ? ROOT_DOCS : ROOT_IMGS);
  return res.json({ type, files: list });
});

/**
 * POST /v4/chat
 * body: {
 *   prompt: string,
 *   provider?: 'openai'|'aiml'|'deepseek',
 *   model?: string,
 *   // optional flags for file prompts:
 *   inline?: boolean,        // true => serve inline (e.g., open PDF/image in browser)
 *   returnLink?: boolean,    // true => do NOT send binary; return JSON with link + text (compat mode)
 *   // optional manual attachments (still supported for JSON responses)
 *   attachments?: [{type:'document'|'image', filename:'...'}]
 * }
 *
 * Behavior:
 * 1) If prompt matches FILE_QA_BANK and file exists:
 *      - if returnLink === true -> JSON with link (compat)
 *      - else -> immediately send file (binary), using res.download (or res.sendFile if inline)
 *    If file missing -> 404 JSON with guidance.
 * 2) Else if prompt matches regular PREDEFINED_QA -> JSON text reply.
 * 3) Else -> call provider (v2 behavior) -> JSON reply.
 */
router.post('/chat', async (req, res) => {
  try {
    const { prompt, provider = 'openai', model, inline = false, returnLink = false, attachments = [] } = req.body ?? {};
    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'prompt (string) is required' });
    }

    // (1) File-oriented predefineds first
    const fileHit = matchPredefinedAdvanced(prompt, FILE_QA_BANK);
    if (fileHit?.item) {
      const item = fileHit.item;

      // For simplicity, assume one file per file-prompt. If you later add multiple,
      // you can zip them and stream the zip here.
      const fileDef = (item.attachments || [])[0];
      if (!fileDef) {
        return res.status(500).json({ error: 'No attachment configured for this file prompt.' });
      }
      if (!['document', 'image'].includes(fileDef.type) || !fileDef.filename) {
        return res.status(500).json({ error: 'Invalid attachment configuration.' });
      }

      const root = fileDef.type === 'document' ? ROOT_DOCS : ROOT_IMGS;
      const exists = await fileExists(fileDef.type, fileDef.filename);
      if (!exists) {
        return res.status(404).json({
          error: 'File not found on server.',
          expected_location: `${root}${path.sep}${fileDef.filename}`,
          hint: 'Place the placeholder into the public/ directory.'
        });
      }

      // returnLink=true keeps the old JSON (useful while client adapts to binary)
      if (returnLink) {
        return res.json({
          id: `filepredef_${item.id}_${Date.now()}`,
          provider: 'predefined',
          model: 'predefined',
          matched: { id: item.id, by: fileHit.matchedBy, score: fileHit.score },
          content: [{ type: 'text', text: item.reply }],
          attachments: [{
            type: fileDef.type,
            filename: fileDef.filename,
            url: buildFileUrl(req, fileDef.type, fileDef.filename)
          }]
        });
      }

      // --- IMMEDIATE FILE SERVE (default) ---
      // Send a short header so the chatbot client can display text if desired.
      // Many clients ignore custom headers; it's optional. The response body will be the file.
      res.setHeader('X-Message', item.reply.replace(/\n/g, ' '));

      const abs = safeResolve(root, fileDef.filename);
      const downloadName = path.basename(fileDef.filename);

      if (inline) {
        // inline view (e.g., open image/PDF in browser)
        // Express will set Content-Type via mime lookup
        return res.sendFile(abs, { headers: { 'Content-Disposition': `inline; filename="${downloadName}"` } });
      } else {
        // force download
        return res.download(abs, downloadName);
      }
    }

    // (2) Normal predefineds (text-only)
    const textHit = matchPredefinedAdvanced(prompt, PREDEFINED_QA);
    if (textHit?.item) {
      return res.json({
        id: `predef_${textHit.item.id}_${Date.now()}`,
        provider: 'predefined',
        model: 'predefined',
        matched: { id: textHit.item.id, by: textHit.matchedBy, score: textHit.score },
        content: [{ type: 'text', text: textHit.item.reply }],
        followups: textHit.item.followups ?? [],
        usage: null,
        raw: textHit.item
      });
    }

    // (3) Fall back to AI provider (JSON)
    const fn = PROVIDERS[provider];
    if (!fn) return res.status(400).json({ error: `Unknown provider: ${provider}` });

    const out = await fn({ prompt, model });

    // Manual attachments only make sense with JSON; validate & append as links
    const extras = await validateAndResolveManualAttachments(req, attachments);
    if (extras.length) out.attachments = extras;

    return res.json(out);
  } catch (err) {
    console.error('[v4/chat] error', err);
    return res.status(500).json({ error: 'Internal error', details: String(err?.message || err) });
  }
});

async function validateAndResolveManualAttachments(req, attachments) {
  const valid = [];
  for (const a of attachments || []) {
    if (!a?.type || !a?.filename) continue;
    if (!['document', 'image'].includes(a.type)) continue;
    const exists = await fileExists(a.type, a.filename);
    if (!exists) continue;
    valid.push({
      type: a.type,
      filename: a.filename,
      url: buildFileUrl(req, a.type, a.filename)
    });
  }
  return valid;
}

export default router;
