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
    // Require all three tokens: monthly + (water quality|wq) + report
    // and explicitly NOT 'quarter'
    patterns: [
      /(?=.*\bmonthly\b)(?=.*\b(water\s*quality|wq)\b)(?=.*\breport\b)(?!.*\bquarter)/i
    ],
    // Prefer PDF; fall back to TXT if PDF missing
    attachments: [
      { type: "document", filename: "LIMS_Report.pdf" },
      { type: "document", filename: "LIMS_Report.txt" } // fallback
    ],
    reply: `MONTHLY WATER QUALITY REPORT (Summary)

HIGH PRIORITY PARAMETERS:
• pH: 7.1 – 7.4 (≈ 85% of guideline range)
• Free Chlorine: 0.45 mg/L (within operational target)

MODERATE PRIORITY:
• Residual Chlorine: 60.8% of USEPA limit (2.43 / 4.0 mg/L)

LOW RISK PARAMETERS:
• Copper: 99.8% safety margin (0.002–0.004 mg/L)
• Turbidity: 0.18–0.30 NTU (well below 1 NTU)
• Boron: 0.35 mg/L vs 2.8 mg/L guideline

NOTES:
• SLA met, no breaches
• Share with section leads for weekly briefings`,
  },

  {
    id: "report_quarterly_ops_summary",
    kind: "document",
    keywords: [
      "send quarterly ops summary",
      "download quarterly ops report",
      "quarterly operations report",
      "quarterly ops summary report",
    ],
    // Require quarter(ly) + (ops|operations) + (summary|report)
    patterns: [
      /(?=.*\bquarter(?:ly)?\b)(?=.*\b(ops|operations)\b)(?=.*\b(summary|report)\b)/i
    ],
    // Prefer DOCX; fall back to TXT if DOCX missing
    attachments: [
      { type: "document", filename: "LIMS_Report.docx" },
      { type: "document", filename: "LIMS_Report.txt" } // fallback
    ],
    reply: `QUARTERLY OPERATIONS SUMMARY (Highlights)

KEY OUTCOMES:
• Planned maintenance on schedule
• Filter optimisation ↓ turbidity variance
• Chlorine dosing steady, no breach
• No long-duration outages

OPERATIONAL NOTES:
• Headloss-based backwash triggers
• QC aligned with internal QA
• No SLA breaches`,
  },

  // Images (Charts)
  {
    id: "chart_rl_distribution",
    kind: "image",
    keywords: ["send rl distribution chart", "download rl distribution", "rl chart"],
    patterns: [/rl\s*distribution/i],
    attachments: [{ type: "image", filename: "rl_distribution.png" }],
    reply: `RL DISTRIBUTION — Most results ≤ 1.0 mg/L; secondary peaks at 5, 9, 12 mg/L. Focus QC near ≤1.0 mg/L bins.`,
  },

  {
    id: "chart_counts_by_matrix",
    kind: "image",
    keywords: [
      "send frequency per matrix chart",
      "download matrix counts chart",
      "sampling matrix frequency"
    ],
    patterns: [/(?=.*counts?).*(?=.*matrix).*(?=.*frequency)/i],
    attachments: [{ type: "image", filename: "counts_by_freq_matrix.png" }],
    reply: `COUNTS BY FREQUENCY PER MATRIX — Distribution mains dominate quarterly/monthly; catchments higher annually; NEWater weekly.`,
  },

  {
    id: "chart_sampling_points_by_source",
    kind: "image",
    keywords: [
      "send distinct sampling points chart",
      "download sampling points by source",
      "sampling points chart"
    ],
    patterns: [/(?=.*sampling).*(?=.*points).*(?=.*source)/i],
    attachments: [{ type: "image", filename: "distinct_sampling_points_by_source.png" }],
    reply: `DISTINCT SAMPLING POINTS BY SOURCE — Direct supply ~310, indirect ~240; inlets/outlets <50.`,
  },

  {
    id: "chart_parameters_by_classification",
    kind: "image",
    keywords: [
      "send parameter classification chart",
      "download classification chart",
      "parameters by class"
    ],
    patterns: [/(parameters?).*(classification)/i],
    attachments: [{ type: "image", filename: "parameters_by_classification.png" }],
    reply: `PARAMETERS BY CLASSIFICATION — Radiological Quality largest share; algal parameters lowest.`,
  },
];

export const FILE_QA_FALLBACK =
  "I couldn’t find a matching file request. Try: “send monthly water quality report” or “send quarterly ops summary”.";
