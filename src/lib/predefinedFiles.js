// src/lib/predefined_files.js
export const FILE_QA_BANK = [
  // Documents (Reports)
  {
    id: "report_monthly_water_quality",
    kind: "document",
    keywords: [
      "send monthly water quality report",
      "get monthly water quality report",
      "download monthly report",
      "monthly wq report",
    ],
    patterns: [/send|get|download.*(monthly).*(water\s*quality|wq).*(report)/i],
    attachments: [{ type: "document", filename: "dummy.pdf" }],
    reply: `MONTHLY WATER QUALITY REPORT (Summary)

HIGH PRIORITY PARAMETERS:
• pH: 7.1 – 7.4 (≈ 85% of guideline range)
• Free Chlorine: 0.45 mg/L (within operational target)

MODERATE PRIORITY:
• Residual Chlorine: 60.8% of USEPA limit (2.43 / 4.0 mg/L)

LOW RISK PARAMETERS:
• Copper: 99.8% safety margin (0.002–0.004 mg/L, only 0.2% of limit used)
• Turbidity: 98.4% safety margin (0.18–0.30 NTU, well below 1 NTU limit)
• Boron: 87.7% safety margin (0.35 mg/L vs 2.8 mg/L guideline)

NOTES:
• All values within SLA, no breaches
• Use: Share with section leads for weekly briefings
• Data placeholders for demo only`,
  },

  {
    id: "report_quarterly_ops_summary",
    kind: "document",
    keywords: [
      "send quarterly ops summary",
      "download quarterly ops report",
      "quarterly operations report",
    ],
    patterns: [/quarter(ly)?.*(ops|operations).*(summary|report)/i],
    attachments: [{ type: "document", filename: "dummy.docx" }],
    reply: `QUARTERLY OPERATIONS SUMMARY (Highlights)

KEY OUTCOMES:
• Planned maintenance completed on schedule
• Filter optimisation reduced turbidity variance
• Chlorine dosing held steady with no breach
• No long-duration outages observed

OPERATIONAL NOTES:
• Continued reliance on headloss-based backwash triggers
• Routine QC aligned with internal QA standards
• No SLA breaches recorded

NOTES:
• Reference for management updates
• Demo data only`,
  },

  // Images (Charts) – link to your real charts
  {
    id: "chart_rl_distribution",
    kind: "image",
    keywords: [
      "send rl distribution chart",
      "download rl distribution",
      "rl chart",
    ],
    patterns: [/rl.*distribution/i],
    attachments: [{ type: "image", filename: "rl_distribution.png" }],
    reply: `RL DISTRIBUTION (Across Parameters)

• Most results clustered between 0 – 1.0 mg/L
• Secondary peaks observed at 5, 9, and 12 mg/L bins
• High count at “1.0 mg/L” bin reflects default reporting limits

Ops Note: Focus QC verification for bins ≤ 1.0 mg/L.`,
  },

  {
    id: "chart_counts_by_matrix",
    kind: "image",
    keywords: [
      "send frequency per matrix chart",
      "download matrix counts chart",
      "sampling matrix frequency",
    ],
    patterns: [/counts?.*matrix.*frequency/i],
    attachments: [{ type: "image", filename: "counts_by_freq_matrix.png" }],
    reply: `COUNTS BY FREQUENCY PER MATRIX

• Distribution mains dominate biannual, monthly, and quarterly frequencies
• Catchment sites show higher annual frequency sampling
• NEWater contributes significantly at weekly sampling

Ops Note: Align manpower planning to peak quarterly workloads.`,
  },

  {
    id: "chart_sampling_points_by_source",
    kind: "image",
    keywords: [
      "send distinct sampling points chart",
      "download sampling points by source",
      "sampling points chart",
    ],
    patterns: [/sampling.*points.*source/i],
    attachments: [{ type: "image", filename: "distinct_sampling_points_by_source.png" }],
    reply: `DISTINCT SAMPLING POINTS BY SOURCE

• Direct supply ~310 points
• Indirect supply ~240 points
• Inlets and outlets fewer (<50 each)

Ops Note: Sampling density highest in distribution mains.`,
  },

  {
    id: "chart_parameters_by_classification",
    kind: "image",
    keywords: [
      "send parameter classification chart",
      "download classification chart",
      "parameters by class",
    ],
    patterns: [/parameters?.*classification/i],
    attachments: [{ type: "image", filename: "parameters_by_classification.png" }],
    reply: `PARAMETERS BY CLASSIFICATION

• Radiological Quality largest share (~900,000 test codes)
• Inorganics, biologicals, and pesticides comparatively smaller
• Algal parameters lowest count

Ops Note: Radiological tests drive method throughput.`,
  },
];

export const FILE_QA_FALLBACK =
  "I couldn’t find a matching file request. Try: “send RL distribution chart” or “send monthly water quality report”.";
