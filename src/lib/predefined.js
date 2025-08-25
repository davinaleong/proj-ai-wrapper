// src/lib/predefined.js
export const QA_BANK = [
  // --- 3.32: Trends (expanded, technician-grade) -----------------------
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
      /ph\s*trend.*half\s*year/i,
    ],
    reply: `pH stability across key reservoirs remains within operating band, with site-level nuance and QC verification:

Reservoir breakdown (monthly means; sd; n):
• MacRitchie — May 7.20 (sd 0.06, n=5), Jun 7.12 (0.05, n=4), Jul 7.28 (0.04, n=4). Dip on 15 May after heavy rain; alkalinity 58 mg/L as CaCO₃.
• Bedok — May 7.32 (0.04, n=4), Jun 7.24 (0.05, n=4), Jul 7.41 (0.05, n=4). Stable; alkalinity 68–72 mg/L as CaCO₃; conductivity 420–450 µS/cm.
• Upper Peirce — May 7.12 (0.05, n=4), Jun 7.19 (0.03, n=4), Jul 7.20 (0.04, n=4). Forest inflow steady; turbidity baseline 0.22–0.28 NTU.
• Marina — May 7.35 (0.05, n=4), Jun 7.62 (0.07, n=4), Jul 7.74 (0.06, n=4). Algal-driven rise (see “Why was pH high?”).

Interpretation:
• All within guideline 6.5–8.5; no intake dosing adjustments required.
• Cross-parameter checks: pH vs DO positive at Marina (r≈0.72); alkalinity stable → biological driver, not buffering loss.

QC / Methods:
• Field multiparameter sonde, pH/ORP combo; weekly calibration with NIST buffers 4.01/7.00/10.01; slope 95–105%.
• Mid-run drift check <0.02 pH units; lab bench meter verification ±0.02. Lab duplicates RPD <3% (≤10% criterion).
• Field pH within 15 min of grab; confirmatory lab pH within 6 h at 25 ± 2 °C.

Ops impact:
• Maintain current coagulation/alkalinity dosing; reassess only if pH >8.2 or <6.8 sustained >48 h, or during heavy rainfall transients.`,
    followups: [
      "Why was pH high in June–July at Marina?",
      "Show a quick pH line for MacRitchie vs Bedok",
      "Flag any day pH > 7.8 at RW Inlet",
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
    reply: `Average free chlorine residuals were 0.45 mg/L last quarter (P10 0.38, P90 0.53), with a controlled peak at 0.55 mg/L during June maintenance.

Cause → effect:
• Cause: Planned maintenance on raw water pumps increased operational risk window. Preventive residual uplift (setpoint +0.08–0.10 mg/L) applied for 48–72 h.
• Effect: CT values preserved; microbiology remained ND. Residuals ramped down to baseline within 24 h post-works.

QC / Methods:
• Bench DPD agreement with online analyzer within ±0.05 mg/L; daily two-point verification; weekly primary standard check.
• Outliers annotated “MAINT” in LIMS; alarms set at 0.30 (low) and 0.60 mg/L (high).

Ops impact:
• No corrective action required. Keep standard post-maintenance ramp-down SOP and analyzer auto-clean cadence.`,
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
    reply: `Turbidity improved from 0.30 NTU (Apr mean) to 0.18 NTU (Jul mean) at Plant A after filter optimisation in mid-June.

Details:
• Daily mean (Jul): 0.15–0.20 NTU; P95 0.24 NTU; UCL(3σ) 0.32 NTU; no UCL breaches post-optimisation.
• Particle counter (≥2 µm) reduced from 530/mL (pre) to 220/mL (post).
• Backwash regime shifted from time-based (24 h) to headloss-based; filter-to-waste extended from 3 to 6 min.

QC / Methods:
• Online NTU verified weekly against bench nephelometer (±0.02 NTU); formazin standards 0.3/1.0 NTU within ±10%.
• Filter effluent grab verification once per shift; duplicate RPD ≤10%.

Ops impact:
• Sustain headloss-based triggers; review coagulant dose stability during raw water NTU spikes (>5 NTU at intake).`,
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
    reply: `Stable metals profile over the past year:
• Lead (Pb): 0.002–0.004 mg/L (median 0.003). RL 0.001 mg/L.
• Copper (Cu): 0.10–0.14 mg/L (median 0.12). RL 0.01 mg/L.

QC / Methods:
• ICP-MS primary; quarterly ICP-OES cross-check. Matrix spike recovery 92–108%; CRM recovery 95–104%; method blanks < RL.
• Field blanks ND; field duplicates RPD Pb 8%, Cu 6% (≤20% criterion).

Ops impact:
• Corrosion control dosing remains effective; continue LCR schedule and premise sampling where applicable.`,
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
    reply: `Non-detectable across the period, with one isolated hit in May at a distribution sampling point.

Incident detail:
• Date/time: 22 May, 10:40. Result: total coliforms 1 CFU/100 mL, E. coli ND. Chlorine residual at site: 0.34 mg/L.
• Immediate action: site flush 10 min; repeat samples at 24 h and 48 h both ND.
• Root cause: likely stagnation prior to sample (low draw-off); sampler retrained on pre-flush SOP.

QC / Methods:
• Membrane filtration with positive/negative controls; incubations within method windows; bottle thiosulfate present.
• Chain-of-custody intact; data ticket closed after consecutive ND.

Ops impact:
• No systemic change required; maintain hydrant flushing cadence and backflow device inspections.`,
    followups: [
      "Why was coliform detected in May?",
      "Show a timeline of the May incident",
      "Compare coliform results across regions",
    ],
  },

  // --- 3.33: Root Cause Analysis for high pH (new, detailed) ----------
  {
    id: "ph_high_root_cause_marina",
    keywords: [
      "why ph high",
      "root cause high ph",
      "ph elevated marina",
      "ph high last 3 months",
    ],
    patterns: [
      /(why|root\s*cause).*\b(ph)\b.*(high|elevat)/i,
      /ph.*high.*(marina|reservoir)/i,
    ],
    reply: `Marina Reservoir experienced elevated pH (peaks 7.88–7.92 on 18 Jun, 3 Jul, 15 Jul between 13:00–15:00).

Cause → effect:
• Algal bloom: chlorophyll-a 12 → 42 µg/L (Jun), 38 µg/L (Jul); temperature 30.8–31.7 °C midday; TP 0.06 mg/L, TN 1.2 mg/L.
• Reduced inflow (~25% vs May) and residence time ↑ → lower dilution.
• Photosynthesis ↑ → CO₂↓ → carbonate equilibrium shift → pH rises daylight; pre-dawn pH 7.55–7.60.

Corroboration:
• DO up to 8.6–9.2 mg/L daytime; Secchi depth 1.6 → 1.1 m; pH vs DO r≈0.72.
• Instrumentation: probe slope 101%; post-deployment check ±0.01; bench meter ±0.02; no fouling beyond light biofilm.

Actions:
• Aeration curtains Zone C increased from 8 h/d → 16 h/d, airflow 35–40 m³/h.
• Surface mixers 50% power midday; PAC trial 5–10 mg/L at intake (jar tests: 25–35% chlorophyll-a reduction).
• Monitoring escalated: pH/DO every 48 h; chlorophyll-a weekly; paired pre-dawn/midday runs.

Impact:
• Disinfection CT margins preserved downstream; no metals solubility concern (Fe 0.12–0.18 mg/L; Mn 0.02–0.05 mg/L).`,
    followups: [
      "Show pH and DO overlay for Marina",
      "List bloom days with pH > 7.8",
      "What was chlorophyll-a during the peaks?",
    ],
  },

  // --- 3.34: Ad-hoc Sampling Counts & Types (new, detailed) -----------
  {
    id: "adhoc_samples_bedok_3m",
    keywords: [
      "ad-hoc samples bedok",
      "adhoc bedok past 3 months",
      "how many ad hoc bedok",
    ],
    patterns: [
      /(how\s+many|count).*(ad[\-\s]?hoc).*bedok.*(3|three)\s*months/i,
      /ad[\-\s]?hoc.*bedok.*(past|last)\s*3\s*months/i,
    ],
    reply: `Bedok Reservoir ad-hoc sampling (May–Jul): 45 bottles total.

Triggers and specifics:
• May (14): >150 mm rainfall on 24 May. Points B1 inflow, B2 RW Inlet, B3 storm drain.
  – Metals (Fe/Mn/Al) 6×: 500 mL HDPE, HNO₃ to pH <2; Fe 0.10–0.18 mg/L; Mn 0.02–0.05 mg/L.
  – Turbidity/TSS 4×: 1 L HDPE; turbidity 0.30–1.60 NTU (peak at B3 11:20); TSS 5–18 mg/L.
  – Microbiology 4×: 100 mL sterile thiosulfate bottles; total coliforms ND–2 CFU/100 mL; E. coli ND.

• Jun (20): Pump maintenance verification (10–14 Jun). Points B2 pre, B4 mid, B2′ post.
  – Inorganic profile 6×: pH 7.22–7.36; conductivity 410–460 µS/cm; alkalinity 66–71 mg/L as CaCO₃.
  – Metals 6×: Fe 0.10–0.15 mg/L; Mn 0.02–0.04 mg/L.
  – Oil & grease 4×: 1 L amber glass, H₂SO₄ to pH <2; all <2 mg/L (RL 1 mg/L).
  – Micro 4×: all ND.

• Jul (11): QA follow-up & calibration checks.
  – Field duplicates 3 pairs (pH, turbidity, Fe): RPD pH 1.2%, turbidity 4.5%, Fe 6.8% (within criteria).
  – Lab spikes 2× Fe/Mn: recoveries Fe 96%, Mn 101%.
  – Micro 3×: ND.

Custody & logging:
• Labels QA-EXCEP-B-YYYYMMDD-SEQ; coolers 4 ± 2 °C; transport <2 h to lab.
• COC signed 10:15–10:45; lab accession 12:05–12:30.
• LIMS codes: ADHOC-BEDOK-MAY/JUN/JUL; locations B1–B4.`,
    followups: [
      "Break Bedok ad-hoc counts by parameter",
      "Show turbidity vs TSS after the storm",
      "Any micro positives during maintenance?",
    ],
  },

  // --- 3.35: Program Turnaround Time (new, detailed) -------------------
  {
    id: "tat_rw_inlet",
    keywords: [
      "rw inlet tat",
      "turnaround time rw inlet",
      "tat raw water inlet",
      "program tat rw inlet",
    ],
    patterns: [
      /(tat|turn\s*around\s*time).*(rw|raw\s*water)\s*inlet/i,
      /how\s*long.*results.*rw\s*inlet/i,
    ],
    reply: `RW Inlet program typical TAT (working days), by analyte group:

Microbiology (total coliforms, E. coli, HPC):
• Start within 6 h of collection; sodium thiosulfate bottles.
• Incubation 24–48 h; confirmatory IMViC adds 1 day if presumptive positive.
• QC: pos/neg controls; duplicate 1/20; colony variance ≤30%.
• Reported TAT: 3–4 days from accession.

Physico-chemical (pH, conductivity, alkalinity, turbidity):
• Field pH within 15 min; bench confirmation same day if flagged.
• Turbidity bench check within 6 h; standards 0.3/1.0 NTU within ±10%.
• Reported TAT: 2–3 days incl. QA review.

Trace metals (Fe, Mn, Pb, Cu by ICP-MS):
• Acid digestion 2–4 h; batch twice weekly.
• QC per 20: method blank, field blank, matrix spike, CRM (recoveries 90–110%).
• Reported TAT: 5–7 days.

Organics screen (triggered):
• Oil & grease gravimetric; selected pesticides if required.
• Holding/extraction per method; O&G extraction ≤7 d, analysis ≤40 d.
• Reported TAT: 5–10 days (queue-dependent).

End-to-end:
• Field collection → preservation/cooling → COC → LIMS accession (Program RW-INL-QA, location code) → batch assignment → instrument run + QC → analyst validation → QA sign-off → auto-release.
• Priority: flag TAT-PRIORITY to condense micro/phys-chem to ~48–72 h if capacity allows.
• Delays: resample if field blank turbidity >0.1 NTU; repeat ICP-MS if CRM outside 90–110%; reconcile if bottle/program mismatch.`,
    followups: [
      "Expedite a RW Inlet sample (mark TAT-PRIORITY)",
      "Show current RW Inlet samples pending QA",
      "What causes TAT delays most often?",
    ],
  },
];

export const QA_FALLBACK_REPLY =
  "I'm using a predefined Q&A set and couldn’t find a close match. Try a simpler phrasing or a known keyword (e.g., “pH trend last 6 months”).";
