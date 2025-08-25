// src/lib/predefined_files.js
// Predefined prompts that specifically return a document (report) or image (chart)
// Served from /documents and /images in /public

export const FILE_QA_BANK = [
  // -------------------- Documents (Reports) --------------------
  {
    id: "report_monthly_water_quality",
    kind: "document",
    keywords: [
      "send monthly water quality report",
      "get monthly water quality report",
      "download monthly report",
      "monthly wq report",
      "email monthly report",
      "share monthly report",
      "open monthly report",
      "view monthly report",
    ],
    patterns: [
      /(send|get|download|email|share|open|view).*(monthly).*(water\s*quality|wq).*(report)/i,
      /(monthly).*(report).*(water\s*quality|wq)/i,
    ],
    attachments: [{ type: "document", filename: "dummy.pdf" }],
    reply:
      "Here’s the **Monthly Water Quality Report (dummy.pdf)**.\n\n" +
      "Executive summary (demo values):\n" +
      "• pH (monthly means, sd, n): MacRitchie 7.12–7.28 (sd ≤0.06, n=4–5), Bedok 7.24–7.41 (sd ≤0.05), Upper Peirce 7.19–7.20 (sd ≤0.04), Marina 7.35→7.74 (algal influence).\n" +
      "• Free chlorine residuals: mean 0.45 mg/L (P10 0.38, P90 0.53); June uplift annotated as MAINT.\n" +
      "• Turbidity (Plant A effluent): Apr 0.30 NTU → Jul 0.18 NTU; P95 0.24 NTU; no UCL(3σ) breaches post-optimisation.\n" +
      "• Metals (ICP-MS): Pb 0.002–0.004 mg/L; Cu 0.10–0.14 mg/L; blanks < RL; CRM 95–104%.\n" +
      "• Microbiology: ND throughout; single historical hit in May elsewhere cleared within 48 h.\n\n" +
      "QC / methods:\n" +
      "• pH: field sonde weekly-calibrated (buffers 4.01/7.00/10.01), drift <0.02; bench verification ±0.02.\n" +
      "• Turbidity: bench standards 0.3/1.0 NTU within ±10%; online vs bench bias ≤0.02.\n" +
      "• Metals: per 20 samples—1 method blank, 1 field blank, 1 matrix spike, 1 CRM; acceptance 90–110%.\n\n" +
      "Use: circulate to section leads; reference for weekly briefings and WTP setpoint review.\n" +
      "Notes: Report contents and values are demo placeholders for a prototype.",
  },

  {
    id: "report_quarterly_ops_summary",
    kind: "document",
    keywords: [
      "send quarterly ops summary",
      "download quarterly ops report",
      "quarterly operations report",
      "email quarterly ops",
      "share quarterly ops",
      "open quarterly report",
      "view quarterly report",
    ],
    patterns: [
      /quarter(ly)?.*(ops|operations).*(summary|report)/i,
      /(send|download|email|share|open|view).*(quarter(ly)?).*(ops|operations).*(report|summary)/i,
    ],
    attachments: [{ type: "document", filename: "dummy.docx" }],
    reply:
      "Here’s the **Quarterly Operations Summary (dummy.docx)**.\n\n" +
      "Highlights (demo values):\n" +
      "• Planned maintenance: completed on schedule; residuals held at 0.50–0.55 mg/L during windows; rapid ramp-down <24 h.\n" +
      "• Filtration performance: Plant A optimisation (mid-Jun) reduced mean turbidity to 0.18 NTU and particles ≥2 µm from 530/mL → 220/mL.\n" +
      "• Downtime: zero long-duration outages; cumulative <60 min minor stoppages (valve interlocks).\n" +
      "• Energy & throughput: specific energy ~0.42 kWh/m³ (±0.03); average throughput 92% of rated.\n\n" +
      "Action items:\n" +
      "• Keep headloss-based backwash triggers; validate against raw NTU spikes (>5 NTU at intake).\n" +
      "• Maintain analyzer auto-clean cadence; verify weekly DPD/online agreement (±0.05 mg/L).\n\n" +
      "Notes: Data is demo-only; structure mirrors production quarterly packs.",
  },

  // ---------------------- Images (Charts) ----------------------
  {
    id: "chart_turbidity_trend_plant_a",
    kind: "image",
    keywords: [
      "send turbidity trend chart plant a",
      "download turbidity chart plant a",
      "turbidity chart plant a",
      "open turbidity chart plant a",
      "view turbidity chart plant a",
    ],
    patterns: [/turbidity.*chart.*plant\s*a/i, /(send|download|open|view).*(turbidity).*plant\s*a/i],
    attachments: [{ type: "image", filename: "dummy.png" }],
    reply:
      "Attached: **Turbidity Trend — Plant A (dummy.png)**.\n\n" +
      "Technical notes (demo values):\n" +
      "• Apr→Jul mean: 0.30 → 0.18 NTU; P95 0.24 NTU; UCL(3σ) 0.32 NTU; no breaches post-mid-Jun optimisation.\n" +
      "• Event markers: maintenance window in Jun; filter-to-waste extension 3→6 min; headloss-based backwash adopted.\n" +
      "• QC: online vs bench bias ≤0.02 NTU; standards 0.3/1.0 NTU within ±10%.\n\n" +
      "Use: include in optimisation reviews and incident post-mortems.\n" +
      "Notes: Placeholder chart for demo.",
  },

  {
    id: "chart_chlorine_weekly",
    kind: "image",
    keywords: [
      "send weekly chlorine residual chart",
      "download chlorine weekly chart",
      "weekly chlorine chart",
      "open chlorine chart",
      "view chlorine chart",
      "share chlorine chart",
    ],
    patterns: [
      /weekly.*chlorine.*(residual)?.*chart/i,
      /(send|download|open|view|share).*(chlorine).*(weekly|week).*chart/i,
    ],
    attachments: [{ type: "image", filename: "dummy.jpg" }],
    reply:
      "Attached: **Weekly Free Chlorine Residuals (dummy.jpg)**.\n\n" +
      "Interpretation (demo values):\n" +
      "• Weekly mean ≈0.45 mg/L (P10 0.38, P90 0.53); June spike to 0.55 mg/L corresponds to planned maintenance uplift.\n" +
      "• Alarm thresholds: low 0.30 mg/L, high 0.60 mg/L (none exceeded).\n" +
      "• QC: DPD bench checks within ±0.05 mg/L of online; annotated outliers flagged MAINT in LIMS.\n\n" +
      "Use: show trends during toolbox talks and maintenance planning.\n" +
      "Notes: Placeholder image for demo.",
  },
];

export const FILE_QA_FALLBACK =
  "I couldn’t find a matching file request. Try: “send monthly water quality report” or “send turbidity chart Plant A”.";
