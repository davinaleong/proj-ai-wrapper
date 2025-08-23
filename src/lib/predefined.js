// src/lib/predefined.js
export const QA_BANK = [
  // --- 3.32: Trends ----------------------------------------------------
  {
    id: "ph_trend_6m",
    keywords: [
      "ph trend last 6 months",
      "ph 6 months",
      "ph last 6 months",
      "ph trend 6 months",
    ],
    patterns: [
      /^\s*(what'?s|what is)?\s*ph\s*trend.*(6|six)\s*months?\s*$/i,
      /ph\s*trend.*6\s*months/i,
    ],
    reply: `pH levels have been **stable at 7.1–7.4 (median ≈ 7.2)** over the last six months, with a **short dip in May** likely linked to **rainfall dilution** at intake.\n\n
• Interpretation: Within typical operating band; no action-level breaches observed.\n
• Ops impact: Maintain current coagulation/alkalinity dosing; watch for transients during heavy rain.\n
• Data/QC: Routine grab + online sensors; May dip corroborated by rainfall logs; no sensor drift flags.`,
    followups: [
      "Why was pH higher for the previous 3 months?",
      "Show a quick pH boxplot for the last 6 months",
      "Compare pH trend across plants",
    ],
  },
  {
    id: "chlorine_residuals_last_quarter",
    keywords: [
      "chlorine residuals last quarter",
      "residuals last quarter",
      "cl residuals quarter",
    ],
    patterns: [/chlorine\s+residuals?.*(quarter|last\s*3\s*months)/i],
    reply: `Average free chlorine residuals were **0.45 mg/L** last quarter, with a **controlled spike to 0.55 mg/L in June** during scheduled maintenance.\n\n
• Interpretation: Spike aligns with preventive dosing to mitigate microbial risk during works; values remained within internal targets.\n
• Ops impact: No corrective action required; keep standard post-maintenance ramp-down protocol.\n
• Data/QC: Bench DPD and online residual monitors agree within tolerance; June outliers annotated as “maintenance”.`,
    followups: [
      "Why did chlorine residuals spike in June?",
      "Break residuals down by week",
      "Alert me if residuals exceed 0.6 mg/L",
    ],
  },
  {
    id: "turbidity_trend_plant_a",
    keywords: ["turbidity trend plant a", "ntu plant a", "turbidity plant a"],
    patterns: [/turbidity.*plant\s*a/i],
    reply: `**Turbidity decreased from 0.30 NTU (Apr) to 0.18 NTU (Jul)** at Plant A.\n\n
• Interpretation: Post-filter optimisation in June improved particulate removal; values are comfortably below operational alarms.\n
• Ops impact: Continue current filter-to-waste / backwash regime; maintain particle counter checks to sustain gains.\n
• Data/QC: Online NTU verified against weekly bench checks (±0.02 NTU).`,
    followups: [
      "Why was turbidity higher in April compared to July?",
      "Show daily turbidity for Plant A",
      "Compare Plant A vs Plant B turbidity",
    ],
  },
  {
    id: "lead_copper_trend_year",
    keywords: [
      "lead & copper trend",
      "lead and copper trend",
      "lead copper past year",
    ],
    patterns: [/lead.*copper.*(year|12\s*months)/i],
    reply: `**Stable metals profile** over the past year: **Lead 0.002–0.004 mg/L**, **Copper ~0.12 mg/L**.\n\n
• Interpretation: Both parameters are well below regulatory thresholds; variability within expected seasonal range.\n
• Ops impact: Keep corrosion control dosing as-is; continue targeted LCR sampling schedule.\n
• Data/QC: ICP-MS/ICP-OES confirmatory runs match field screens; blanks and spikes within control limits.`,
    followups: [
      "Why was copper slightly higher in August?",
      "Plot monthly lead and copper side-by-side",
      "Flag any site above action level",
    ],
  },
  {
    id: "coliform_west_trend",
    keywords: [
      "coliform trend western region",
      "western coliform",
      "coliform west",
    ],
    patterns: [/coliform.*(western|west)\s*region/i],
    reply: `**Non-detectable across the period**, with **one isolated hit in May**.\n\n
• Interpretation: Single detection likely operational; follow-up samples cleared within 24–48 h, indicating no sustained contamination.\n
• Ops impact: No systemic changes needed; keep hydrant flushing cadence; ensure backflow devices are inspected.\n
• Data/QC: Membrane filtration counts verified; May event tracked with incident ticket and closed after repeat ND results.`,
    followups: [
      "Why was coliform detected in May?",
      "Show a timeline of the May incident",
      "Compare coliform results across regions",
    ],
  },

  // ... continue in the same style for all other items ...
]

export const QA_FALLBACK_REPLY =
  "I'm using a predefined Q&A set and couldn’t find a close match. Try a simpler phrasing or a known keyword (e.g., “pH trend last 6 months”)."
