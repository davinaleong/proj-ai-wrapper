// src/lib/match.js
function normalize(s) {
  return String(s || "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim()
}

function tokenJaccard(a, b) {
  const A = new Set(normalize(a).split(" ").filter(Boolean))
  const B = new Set(normalize(b).split(" ").filter(Boolean))
  if (!A.size || !B.size) return 0
  const inter = [...A].filter((x) => B.has(x)).length
  const union = new Set([...A, ...B]).size
  return inter / union
}

/**
 * Tries, in order:
 *  1) Regex patterns (strongest)
 *  2) Exact keyword match (normalized)
 *  3) Keyword "includes" match (prompt contains keyword)
 *  4) Fuzzy token Jaccard vs keywords (threshold)
 *
 * Returns: { item, matchedBy, score } | null
 */
export function matchPredefinedAdvanced(prompt, bank, fuzzyThreshold = 0.78) {
  const p = String(prompt || "")
  const pNorm = normalize(p)

  let best = null

  for (const item of bank) {
    // 1) Regex patterns
    if (Array.isArray(item.patterns)) {
      for (const rx of item.patterns) {
        try {
          if (rx.test(p)) {
            return { item, matchedBy: "pattern", score: 1.0 }
          }
        } catch {
          /* ignore bad regex */
        }
      }
    }

    const kws = (item.keywords || []).map(normalize)

    // 2) Exact keyword match
    if (kws.some((kw) => kw === pNorm)) {
      return { item, matchedBy: "keyword_exact", score: 1.0 }
    }

    // 3) "includes" keyword match (prompt contains keyword)
    if (kws.some((kw) => kw && pNorm.includes(kw))) {
      // keep as candidate, but continue to see if we get a stronger hit later
      best = best ?? { item, matchedBy: "keyword_includes", score: 0.9 }
    }

    // 4) Fuzzy keyword match (take max per item)
    let maxScore = 0
    for (const kw of kws) {
      const s = tokenJaccard(kw, pNorm)
      if (s > maxScore) maxScore = s
    }
    if (maxScore >= fuzzyThreshold) {
      if (!best || maxScore > best.score) {
        best = { item, matchedBy: "keyword_fuzzy", score: maxScore }
      }
    }
  }

  return best // may be null
}
