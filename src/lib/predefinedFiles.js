// src/lib/predefined_files.js
// Predefined prompts that specifically return a document (report) or image (chart)
// Files are placeholders and served statically by v4 via /assets/documents and /assets/images

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
    // Put a placeholder doc (ensure file exists at src/assets/document/)
    attachments: [
      { type: "document", filename: "monthly_water_quality_report.pdf" },
    ],
    reply:
      "Here’s the **Monthly Water Quality Report**. Summary: pH stable (7.1–7.4), chlorine residuals within target, no SLA breaches flagged.\n\n• Use: Share with section leads for weekly briefings.\n• Notes: Values are demo placeholders.",
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
    attachments: [{ type: "document", filename: "quarterly_ops_summary.pdf" }],
    reply:
      "Here’s the **Quarterly Operations Summary**. Highlights: planned maintenance completed on schedule; filter optimisation reduced turbidity variance; no long-duration outages.\n\n• Use: Reference for management updates.\n• Notes: Data is demo-only.",
  },

  // Images (Charts)
  {
    id: "chart_turbidity_trend_plant_a",
    kind: "image",
    keywords: [
      "send turbidity trend chart plant a",
      "download turbidity chart plant a",
      "turbidity chart plant a",
    ],
    patterns: [/turbidity.*chart.*plant\s*a/i],
    attachments: [{ type: "image", filename: "turbidity_trend_plant_a.png" }],
    reply:
      "Attached is the **Turbidity Trend (Plant A)** chart. Apr→Jul shows 0.30 to 0.18 NTU.\n\n• Use: Include in incident post-mortems or optimisation reviews.\n• Notes: Chart is a placeholder.",
  },

  {
    id: "chart_chlorine_weekly",
    kind: "image",
    keywords: [
      "send weekly chlorine residual chart",
      "download chlorine weekly chart",
      "weekly chlorine chart",
    ],
    patterns: [/weekly.*chlorine.*(residual)?.*chart/i],
    attachments: [{ type: "image", filename: "weekly_chlorine_residuals.png" }],
    reply:
      "Attached is the **Weekly Chlorine Residuals** chart. June spike reflects preventive dosing during maintenance.\n\n• Use: Show trend during toolbox talks.\n• Notes: Placeholder image for demo.",
  },
]

export const FILE_QA_FALLBACK =
  "I couldn’t find a matching file request. Try: “send monthly water quality report” or “send turbidity chart Plant A”."
