// src/providers/aiml.js
import { Agent } from "undici";
import fs from "node:fs";
import { normalizeChatCompletion } from "../lib/normalize.js";

function buildDispatcher() {
  // Preferred: supply a CA bundle path
  if (process.env.AIML_CA_PATH) {
    const ca = fs.readFileSync(process.env.AIML_CA_PATH);
    return new Agent({ connect: { ca } });
  }

  // Dev‑only: allow insecure for local debugging
  if (process.env.NODE_ENV === "development" && process.env.AIML_ALLOW_INSECURE === "1") {
    return new Agent({ connect: { rejectUnauthorized: false } });
  }

  // Default: no custom dispatcher
  return undefined;
}

export async function callAIML({ prompt, model }) {
  const key = process.env.AIML_API_KEY;
  if (!key) throw new Error("AIML_API_KEY is not set");

  const AIML_BASE = process.env.AIML_BASE_URL || "https://api.aimlapi.com";
  const url = `${AIML_BASE}/chat/completions`;

  const body = {
    model: model || process.env.AIML_MODEL || "gpt-4o",
    messages: [{ role: "user", content: prompt }],
    max_tokens: Number(process.env.AIML_MAX_TOKENS || 512),
    stream: false,
  };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    dispatcher: buildDispatcher(), // <<— key line
  });

  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    const err = new Error(`AIML request failed: ${res.status} ${res.statusText} - ${txt}`);
    err.status = res.status;
    throw err;
  }

  const json = await res.json();
  return normalizeChatCompletion({ provider: "aiml", response: json });
}
