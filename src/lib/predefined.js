// src/lib/predefined.js
export const QA_BANK = [
  // --- 3.32: Trends (technician-grade, structured) -----------------------
  {
    id: "ph_trend_6m",
    keywords: ["ph trend last 6 months", "ph 6 months", "ph last 6 months", "ph trend 6 months"],
    patterns: [/ph\s*trend.*6\s*months/i, /ph\s*trend.*half\s*year/i],
    reply: `pH TREND (Past 6 months)

HIGH PRIORITY:
• Marina Reservoir — gradual rise: 7.35 → 7.74 (linked to algal bloom)
• MacRitchie — short dip in May (7.20 → 7.12) after heavy rainfall

MODERATE PRIORITY:
• Bedok — stable around 7.3; good buffering capacity
• Upper Peirce — stable around 7.2; inflows consistent

LOW RISK:
• All sites within guideline range (6.5 – 8.5)
• No corrective dosing required; only watch for pH >8.2 or <6.8 sustained >48h`,
    followups: [
      "Why was pH high in June–July at Marina?",
      "Show a quick pH line for MacRitchie vs Bedok",
      "Flag any day pH > 7.8 at RW Inlet"
    ],
  },

  {
    id: "chlorine_residuals_last_quarter",
    keywords: ["chlorine residuals last quarter", "residuals last quarter", "cl residuals quarter"],
    patterns: [/chlorine\s+residuals?.*(quarter|last\s*3\s*months)/i],
    reply: `CHLORINE RESIDUALS (Last Quarter)

HIGH PRIORITY:
• June spike up to 0.55 mg/L (maintenance dosing)
• Controlled uplift preserved CT values

MODERATE PRIORITY:
• Average residual 0.45 mg/L (P10 0.38, P90 0.53)
• Ramp-down to baseline within 24 h post-maintenance

LOW RISK:
• All values within operational range (0.3 – 0.6 mg/L)
• Microbiology remained non-detectable`,
    followups: [
      "Why did chlorine residuals spike in June?",
      "Break residuals down by week",
      "Alert me if residuals exceed 0.6 mg/L"
    ],
  },

  {
    id: "turbidity_trend_plant_a",
    keywords: ["turbidity trend plant a", "ntu plant a", "turbidity plant a"],
    patterns: [/turbidity.*plant\s*a/i],
    reply: `TURBIDITY TREND (Plant A)

HIGH PRIORITY:
• Pre-optimisation (Apr): 0.30 NTU mean
• Daily highs occasionally >0.32 NTU

MODERATE PRIORITY:
• Post-optimisation (Jul): mean 0.18 NTU
• Particle counts reduced by >50%

LOW RISK:
• All post-optimisation values <0.24 NTU
• Far below 1 NTU action level`,
    followups: [
      "Why was turbidity higher in April compared to July?",
      "Show daily turbidity for Plant A",
      "Compare Plant A vs Plant B turbidity"
    ],
  },

  {
    id: "lead_copper_trend_year",
    keywords: ["lead & copper trend", "lead and copper trend", "lead copper past year"],
    patterns: [/lead.*copper.*(year|12\s*months)/i],
    reply: `LEAD & COPPER TREND (Past Year)

HIGH PRIORITY:
• None — values remain far below thresholds

MODERATE PRIORITY:
• Lead: 0.002 – 0.004 mg/L (median 0.003)
• Copper: 0.10 – 0.14 mg/L (median 0.12)

LOW RISK:
• Consistent compliance with corrosion control program
• No exceedances recorded`,
    followups: [
      "Why was copper slightly higher in August?",
      "Plot monthly lead and copper side-by-side",
      "Flag any site above action level"
    ],
  },

  {
    id: "coliform_west_trend",
    keywords: ["coliform trend western region", "western coliform", "coliform west"],
    patterns: [/coliform.*(western|west)\s*region/i],
    reply: `COLIFORM TREND (Western Region)

HIGH PRIORITY:
• One detection: 22 May — 1 CFU/100 mL at distribution point
• Immediate site flush performed

MODERATE PRIORITY:
• Chlorine residual at site: 0.34 mg/L
• Repeat samples at 24 h and 48 h both non-detect

LOW RISK:
• Overall trend: non-detectable across the quarter
• Incident classified as isolated stagnation`,
    followups: [
      "Why was coliform detected in May?",
      "Show a timeline of the May incident",
      "Compare coliform results across regions"
    ],
  },

  // --- 3.33: Root Cause Example ------------------------------------------
  {
    id: "ph_high_root_cause_marina",
    keywords: ["why ph high", "root cause high ph", "ph elevated marina", "ph high last 3 months"],
    patterns: [/(why|root\s*cause).*\b(ph)\b.*(high|elevat)/i],
    reply: `ROOT CAUSE — HIGH pH AT MARINA

HIGH PRIORITY:
• Peaks up to 7.9 during June/July afternoons
• Driven by algal bloom (chlorophyll-a 38–42 µg/L)

MODERATE PRIORITY:
• DO levels >8.5 mg/L daytime, correlating with photosynthesis
• Inflow reduced ~25% vs May → longer residence time

LOW RISK:
• CT margins preserved, no metals solubility issues
• Operational countermeasures (aeration curtains, PAC trial) in place`,
    followups: [
      "Show pH and DO overlay for Marina",
      "List bloom days with pH > 7.8",
      "What was chlorophyll-a during the peaks?"
    ],
  },

  // --- 3.34: Ad-hoc Sampling Example -------------------------------------
  {
    id: "adhoc_samples_bedok_3m",
    keywords: ["ad-hoc samples bedok", "adhoc bedok past 3 months", "how many ad hoc bedok"],
    patterns: [/ad[\-\s]?hoc.*bedok.*(3|three)\s*months/i],
    reply: `AD-HOC SAMPLING — BEDOK (May–Jul)

HIGH PRIORITY:
• May storm event (>150 mm rain) — triggered 14 samples
• Metals (Fe, Mn, Al) and turbidity spiked at storm drains

MODERATE PRIORITY:
• June pump maintenance — 20 samples, all within control
• Oil & grease <2 mg/L; all microbiology ND

LOW RISK:
• July QA checks — 11 samples, duplicates and spikes passed
• All recoveries within control limits`,
    followups: [
      "Break Bedok ad-hoc counts by parameter",
      "Show turbidity vs TSS after the storm",
      "Any micro positives during maintenance?"
    ],
  },

  // --- 3.35: Program Turnaround Time Example -----------------------------
  {
    id: "tat_rw_inlet",
    keywords: ["rw inlet tat", "turnaround time rw inlet", "tat raw water inlet", "program tat rw inlet"],
    patterns: [/tat.*rw.*inlet/i],
    reply: `TURNAROUND TIME — RAW WATER INLET

HIGH PRIORITY:
• Microbiology — typically 3–4 working days
• Expedited path: 24–48 h if flagged TAT-PRIORITY

MODERATE PRIORITY:
• Physico-chemical (pH, turbidity, alkalinity) — 2–3 days
• Metals (ICP-MS) — 5–7 days

LOW RISK:
• Organics screening — 5–10 days (queue dependent)
• End-to-end LIMS workflow intact; resample only if QC failure`,
    followups: [
      "Expedite a RW Inlet sample (mark TAT-PRIORITY)",
      "Show current RW Inlet samples pending QA",
      "What causes TAT delays most often?"
    ],
  },
];

export const QA_FALLBACK_REPLY =
  "I’m using a predefined Q&A set and couldn’t find a close match. Try: “chlorine residuals last quarter” or “tat raw water inlet”.";
