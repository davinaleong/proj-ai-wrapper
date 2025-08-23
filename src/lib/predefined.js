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
    reply: `pH levels have been **stable at 7.1–7.4 (median ≈ 7.2)** over the last six months, with a **short dip in May** likely linked to **rainfall dilution** at intake.
• Interpretation: Within typical operating band; no action‑level breaches observed.
• Ops impact: Maintain current coagulation/alkalinity dosing; watch for transients during heavy rain.
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
    reply: `Average free chlorine residuals were **0.45 mg/L** last quarter, with a **controlled spike to 0.55 mg/L in June** during scheduled maintenance.
• Interpretation: Spike aligns with preventive dosing to mitigate microbial risk during works; values remained within internal targets.
• Ops impact: No corrective action required; keep standard post‑maintenance ramp‑down protocol.
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
    reply: `**Turbidity decreased from 0.30 NTU (Apr) to 0.18 NTU (Jul)** at Plant A.
• Interpretation: Post‑filter optimisation in June improved particulate removal; values are comfortably below operational alarms.
• Ops impact: Continue current filter-to-waste / backwash regime; maintain particle counter checks to sustain gains.
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
    reply: `**Stable metals profile** over the past year: **Lead 0.002–0.004 mg/L**, **Copper ~0.12 mg/L**.
• Interpretation: Both parameters are well below regulatory thresholds; variability within expected seasonal range.
• Ops impact: Keep corrosion control dosing as‑is; continue targeted LCR sampling schedule.
• Data/QC: ICP-MS/ICP‑OES confirmatory runs match field screens; blanks and spikes within control limits.`,
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
    reply: `**Non-detectable across the period**, with **one isolated hit in May**.
• Interpretation: Single detection likely operational; follow‑up samples cleared within 24–48 h, indicating no sustained contamination.
• Ops impact: No systemic changes needed; keep hydrant flushing cadence; ensure backflow devices are inspected.
• Data/QC: Membrane filtration counts verified; May event tracked with incident ticket and closed after repeat ND results.`,
    followups: [
      "Why was coliform detected in May?",
      "Show a timeline of the May incident",
      "Compare coliform results across regions",
    ],
  },
  {
    id: "calibration_drift_toc_3m",
    keywords: [
      "calibration drift toc",
      "toc analyzer drift",
      "toc drift past 3 months",
    ],
    patterns: [/calibration\s+drift.*(toc|analy(s|z)er)/i],
    reply: `The TOC analyser showed a **+0.2 mg/L positive drift** prior to **July recalibration**.
• Interpretation: Progressive fouling/sensor aging shifted baseline upward; corrected after cleaning and two‑point calibration.
• Ops impact: No data retraction needed; apply note on pre‑July values and focus on preventive maintenance interval.
• Data/QC: Cal checks failed low‑range verification in late June; post‑cal recoveries within ±5%.`,
    followups: [
      "Why did the TOC analyser drift upward?",
      "Show pre- vs post-calibration results",
      "List instruments due for calibration",
    ],
  },
  {
    id: "rainfall_tds_corr",
    keywords: ["rainfall vs tds correlation", "tds rainfall correlation"],
    patterns: [/rainfall.*tds.*correlation/i],
    reply: `Rainfall and TDS show a **moderate negative correlation (r = −0.45)**.
• Interpretation: Heavier inflows dilute dissolved solids, particularly after storm events; effect size varies by catchment geology.
• Ops impact: Anticipate lower TDS post‑rain; adjust blending strategies if conductivity drops beyond flavour thresholds.
• Data/QC: Correlation holds after removing sensor warm‑up periods and known maintenance windows.`,
    followups: [
      "Why did rainfall reduce TDS so sharply in June?",
      "Show correlation by month",
      "Any outliers in TDS after storms?",
    ],
  },
  {
    id: "nitrate_seasonal_trend",
    keywords: ["nitrate seasonal trend", "nitrates q1 vs q2"],
    patterns: [/nitrate(s)?\s+season(al)?\s*trend/i],
    reply: `**Nitrates higher in Q1 (≈ 1.8 mg/L) vs Q2 (≈ 1.1 mg/L)**.
• Interpretation: Seasonal runoff from upstream agriculture elevates levels in early year; declines with vegetation uptake.
• Ops impact: Maintain seasonal surveillance and ensure treatment margin for spikes; no breaches recorded.
• Data/QC: Ion chromatography replicate precision within acceptance; field blanks clean.`,
    followups: [
      "Why were nitrates higher in Q1?",
      "Map nitrates by catchment",
      "Show top 5 sites by nitrate",
    ],
  },
  {
    id: "do_anomalies_last_quarter",
    keywords: ["do anomalies last quarter", "dissolved oxygen anomalies"],
    patterns: [/do\s+(anomal(y|ies)).*quarter/i],
    reply: `A **DO dip to 5.0 mg/L on 14 May** was observed and **resolved after recalibration**.
• Interpretation: Instrument under‑reporting rather than water quality deterioration; adjacent stations did not show concurrent drops.
• Ops impact: No process adjustment required; reinforce DO probe maintenance cadence (membranes/electrolyte).
• Data/QC: Post‑service cross‑check against Winkler titration confirmed restoration.`,
    followups: [
      "Why did DO dip on 14 May?",
      "Show DO trend for the last quarter",
      "Check for co-occurring sensor faults",
    ],
  },
  {
    id: "conductivity_rising_which_plant",
    keywords: ["which plant rising conductivity", "rising conductivity plant"],
    patterns: [/which\s+plant.*rising\s+conductivity/i],
    reply: `**Plant B shows a rising conductivity trend**: **320 µS/cm (Apr) → 360 µS/cm (Jul)**.
• Interpretation: Upstream mineral‑rich inflows and reduced dilution likely contributors; taste threshold not exceeded.
• Ops impact: Monitor blend ratios; consider partial substitution from lower‑TDS sources during dry spells.
• Data/QC: Conductivity meters verified against standard solutions; distribution samples reflect similar trend.`,
    followups: [
      "Why did Plant B show rising conductivity?",
      "Compare conductivity across plants",
      "Overlay rainfall on conductivity",
    ],
  },

  // --- 3.33: Root causes ------------------------------------------------
  {
    id: "ph_rootcause_prev_3m",
    keywords: [
      "why was ph higher previous 3 months",
      "ph high previous 3 months root cause",
    ],
    patterns: [/why.*ph.*(high|higher).*(previous|last)\s*3\s*months/i],
    reply: `Likely **seasonal algal bloom activity** increasing photosynthetic CO₂ uptake, which **raises pH** during daylight hours.
• Evidence: Elevated chlorophyll‑a / phycocyanin markers; diurnal pH amplitude widened; intake vs post‑treatment gap narrowed after dosing.
• Ops action: Maintain coagulant/alkalinity trims and monitor bloom indicators; no compliance exceedances recorded.`,
    followups: [
      "Show algal bloom indicators alongside pH",
      "Did compliance limits get breached?",
      "Compare pH at intake vs post-treatment",
    ],
  },
  {
    id: "chlorine_rootcause_june_spike",
    keywords: [
      "why chlorine residuals spike june",
      "chlorine june spike reason",
    ],
    patterns: [/why.*chlorine.*(residuals)?.*spike.*june/i],
    reply: `**Preventive dosing** during **scheduled pipeline maintenance** to offset potential microbial ingress.
• Evidence: Work order logs, higher demand zones during sectional isolation, residuals tapered post‑works.
• Ops action: No retroactive changes; continue event‑based boost with documented tapering plan.`,
    followups: [
      "Break residuals down by week",
      "Any customer complaints logged?",
      "Show residuals vs flow during June",
    ],
  },
  {
    id: "turbidity_rootcause_april_high",
    keywords: [
      "why turbidity higher april than july",
      "turbidity april reason",
    ],
    patterns: [/why.*turbidity.*(april).*compared.*july/i],
    reply: `**Heavy rainfall in April** stirred sediments, raising influent turbidity; **filter optimisation in June** returned values to baseline.
• Evidence: Rain gauge peaks align with inlet NTU spikes; reduced terminal headloss after optimisation.
• Ops action: Keep storm response playbook (early backwash, coagulant trim) and particle counter surveillance.`,
    followups: [
      "Show rainfall vs turbidity",
      "List interventions taken since April",
      "Check particle counters in April",
    ],
  },
  {
    id: "metals_rootcause_copper_aug",
    keywords: [
      "why copper slightly higher august",
      "copper august higher reason",
    ],
    patterns: [/why.*copper.*(slightly)?\s*higher.*aug(ust)?/i],
    reply: `**Slight copper uptick in August** likely from **minor leaching** in older distribution pipes during warmer temperatures.
• Evidence: Spatial pattern aligns with legacy networks; lead remained flat; values still far below thresholds.
• Ops action: Continue phosphate dosing and targeted flushing; prioritise pipe replacement program scheduling.`,
    followups: [
      "Plot monthly lead and copper side-by-side",
      "Any hotspots by district?",
      "Cross-check pipe age vs copper",
    ],
  },
  {
    id: "coliform_rootcause_may",
    keywords: ["why coliform detected may", "coliform may root cause"],
    patterns: [/why.*coliform.*detected.*may/i],
    reply: `**Temporary backflow event** most probable cause.
• Evidence: Pressure transient logs and valve operations; immediate flushing and disinfection performed; repeat samples ND.
• Ops action: Review backflow device test schedule with ops contractors; no further action required.`,
    followups: [
      "Show a timeline of the May incident",
      "Any repeat events after May?",
      "Compare coliform results across regions",
    ],
  },
  {
    id: "calibration_rootcause_toc",
    keywords: ["why toc analyser drift upward", "toc drift upward why"],
    patterns: [/why.*toc.*drift.*upward/i],
    reply: `**Gradual sensor chamber fouling** leading to **positive bias**.
• Evidence: Pre‑cal low‑range standards reading high; post‑service checks within ±5%; instrument logs show progressive baseline shift.
• Ops action: Shorten PM interval; include interim rinse protocol during algal season.`,
    followups: [
      "Show pre- vs post-calibration results",
      "List instruments due for calibration",
      "Correlate drift with ambient temperature",
    ],
  },
  {
    id: "rainfall_tds_rootcause_june_dip",
    keywords: [
      "why rainfall reduce tds sharply june",
      "tds sharp drop june reason",
    ],
    patterns: [/why.*rainfall.*reduce.*tds.*(sharply)?.*june/i],
    reply: `**Dilution from heavy inflows** lowered mineral concentration in June.
• Evidence: Conductivity/TDS drop tracks storm totals; ionic ratios unchanged (supports dilution rather than intrusion).
• Ops action: Monitor taste/odour thresholds; adjust blend if needed for customer experience.`,
    followups: [
      "Show correlation by month",
      "Any conductivity changes in June?",
      "Outliers after storm events?",
    ],
  },
  {
    id: "nitrates_rootcause_q1",
    keywords: ["why nitrates higher q1", "nitrates higher in q1 reason"],
    patterns: [/why.*nitrate(s)?.*higher.*q1/i],
    reply: `**Agricultural runoff during planting season** typically elevates Q1 nitrates.
• Evidence: Catchment reports and historical pattern repeat; rainfall‑lagged peaks match intake spikes.
• Ops action: Keep early‑season monitoring cadence and ensure treatment capacity for short peaks.`,
    followups: [
      "Map nitrates by catchment",
      "Show historical Q1 vs Q2",
      "Top 5 sites by nitrate",
    ],
  },
  {
    id: "do_rootcause_may14",
    keywords: ["why do dip 14 may", "do dip may 14 reason"],
    patterns: [/why.*do.*dip.*(14|fourteen)\s*may/i],
    reply: `**Sensor malfunction** caused under‑reporting on 14 May.
• Evidence: Adjacent stations flat; post‑recalibration alignment with Winkler reference; no ecological stress signals.
• Ops action: Add interim verification check after heavy rain or cleaning events.`,
    followups: [
      "Show DO trend for the last quarter",
      "Check for co-occurring sensor faults",
      "Compare DO at adjacent stations",
    ],
  },
  {
    id: "conductivity_rootcause_plant_b",
    keywords: [
      "why plant b rising conductivity",
      "plant b conductivity why rising",
    ],
    patterns: [/why.*plant\s*b.*rising.*conductivity/i],
    reply: `**Mineral‑rich upstream inflows** increasing baseline conductivity at Plant B.
• Evidence: Source water profiling indicates higher ionic load; rainfall scarcity reduced dilution.
• Ops action: Consider blending with lower‑TDS sources or optimise desal/blending strategy during dry months.`,
    followups: [
      "Compare conductivity across plants",
      "Overlay rainfall on conductivity",
      "Show upstream source mineral profile",
    ],
  },

  // --- 3.34: Adhoc sample counts --------------------------------------
  {
    id: "adhoc_plant_a_3m",
    keywords: [
      "how many adhoc samples plant a past 3 months",
      "adhoc samples plant a 3 months",
    ],
    patterns: [
      /adhoc.*samples?.*plant\s*a.*(past\s*3\s*months|last\s*quarter)/i,
    ],
    reply: `**124 adhoc samples** were collected for **Plant A (May–Jul 2025)**.
• Interpretation: Activity consistent with seasonal maintenance and incident response; no unusual surges outside planned windows.
• Ops notes: Ensure adequate bottle stock and courier windows during maintenance weeks; cross‑check chain‑of‑custody completeness.`,
    followups: [
      "Break Plant A adhoc samples down by week",
      "Show daily counts for Plant A",
      "Compare Plant A with Plant B",
    ],
  },
  {
    id: "adhoc_reservoir_b_last_week",
    keywords: [
      "adhoc sample count reservoir b last week",
      "reservoir b adhoc last week",
    ],
    patterns: [/adhoc.*(samples?|count).*reservoir\s*b.*last\s*week/i],
    reply: `**12 adhoc samples** were collected at **Reservoir B (12–18 Aug 2025)**.
• Interpretation: Count aligns with event‑driven sampling after rainfall; logistics operated within SLA.
• Ops notes: Verify cold‑chain records and lab receipt times to confirm no TAT penalties.`,
    followups: [
      "Show which days were sampled last week",
      "Compare Reservoir B to Reservoir A last week",
      "Trend for Reservoir B over the last month",
    ],
  },
  {
    id: "adhoc_raw_water_2w",
    keywords: [
      "adhoc samples raw water past 2 weeks",
      "raw water adhoc last 2 weeks",
    ],
    patterns: [
      /adhoc.*samples?.*matrix.*raw\s*water.*(past|last)\s*2\s*weeks/i,
    ],
    reply: `**26 adhoc raw‑water samples** logged **5–19 Aug 2025**.
• Interpretation: Coverage adequate for storm response verification; no missed windows reported.
• Ops notes: Align sampler dispatch with radar alerts to reduce lag to first post‑storm grab.`,
    followups: [
      "Break Raw Water counts down by site",
      "Show hourly intake vs sampling times",
      "Any spikes around rain events?",
    ],
  },
  {
    id: "adhoc_micro_july",
    keywords: [
      "adhoc microbiology samples july",
      "how many adhoc microbiology july",
    ],
    patterns: [/adhoc.*micro(biology|bio).*july/i],
    reply: `**47 adhoc microbiology samples** processed in **July 2025**.
• Interpretation: Within lab throughput capacity; incubator utilisation ~normal.
• Ops notes: Review re‑test rate for sample quality and transport times; optimise pick‑up to hit incubation clocks.`,
    followups: [
      "Split July microbiology by parameter",
      "Turnaround time for July microbiology",
      "Any repeats or re-tests in July?",
    ],
  },
  {
    id: "adhoc_all_sites_3m",
    keywords: [
      "adhoc sample volume across all sites past 3 months",
      "all sites adhoc last 3 months",
    ],
    patterns: [
      /adhoc.*(samples?|volume).*(across|all)\s*sites.*(past|last)\s*3\s*months/i,
    ],
    reply: `Across **all sites**, **432 adhoc samples** were recorded **(May–Jul 2025)**.
• Interpretation: Network‑wide activity consistent with seasonal maintenance and episodic storm sampling.
• Ops notes: Use breakdowns to balance courier routes and bottle prep; check any site repeatedly over threshold.`,
    followups: [
      "Break the 432 by site",
      "Show weekly totals across sites",
      "Which site had the most adhoc samples?",
    ],
  },

  // --- 3.35: Program TATs ----------------------------------------------
  {
    id: "tat_wq_surveillance",
    keywords: [
      "tat water quality surveillance program",
      "turnaround time water quality surveillance",
    ],
    patterns: [/turn\s*around\s*time|tat.*water\s*quality\s*surveillance/i],
    reply: `**Average TAT: 3 working days** for Water Quality Surveillance; **urgent cases within 24 h** by prior arrangement.
• Scope: Routine phys‑chem and micro parameters; surge protocols apply during major rain events.
• Ops notes: Flag urgent samples at login; ensure QC batching does not delay 24‑h pathway.`,
    followups: [
      "Which tests qualify for 24-hour TAT?",
      "Show recent late cases for this program",
      "Break down TAT by test type",
    ],
  },
  {
    id: "tat_industrial_discharge",
    keywords: [
      "tat industrial discharge monitoring program",
      "turnaround time industrial discharge",
    ],
    patterns: [/tat|turn\s*around\s*time.*industrial\s*discharge/i],
    reply: `**Average TAT: 5 working days**, depending on analyte complexity; **heavy metals up to 7 days**.
• Scope: Composite and grab samples from industrial outfalls; extra QC for matrix effects may extend TAT.
• Ops notes: Pre‑notify lab for high‑priority compliance cases to secure instrument time.`,
    followups: [
      "Which metals usually take 7 days?",
      "Any rush options for discharge samples?",
      "Recent late cases for this program",
    ],
  },
  {
    id: "tat_catchment_monitoring",
    keywords: [
      "tat catchment monitoring program",
      "turnaround time catchment monitoring",
    ],
    patterns: [/tat|turn\s*around\s*time.*catchment\s*monitoring/i],
    reply: `**Routine: 4 working days**. During **rain events**, load may push **to 6 days** due to volume and QC batch sizes.
• Scope: Nutrients, solids, coliforms, and field parameters across catchments.
• Ops notes: Use surge staffing and flexible batching to protect SLA during storms.`,
    followups: [
      "Show TAT during the last rain event",
      "Split TAT by lab section",
      "Any backlog flags last month?",
    ],
  },
  {
    id: "tat_reservoir_surveillance",
    keywords: [
      "tat reservoir surveillance program",
      "turnaround time reservoir surveillance",
    ],
    patterns: [/tat|turn\s*around\s*time.*reservoir\s*surveillance/i],
    reply: `**3–4 working days overall**; **microbiology often releases in ~2 days** when incubation endpoints are met.
• Scope: Routine reservoir checks including algal indicators.
• Ops notes: Mark micro priority to avoid waiting for slower chem panels when public updates are time‑sensitive.`,
    followups: [
      "Which microbiology tests release in 2 days?",
      "Compare TAT across reservoir labs",
      "Any repeated tests affecting TAT?",
    ],
  },
  {
    id: "tat_drinking_water_compliance",
    keywords: [
      "tat drinking water compliance program",
      "turnaround time drinking water compliance",
    ],
    patterns: [/tat|turn\s*around\s*time.*drinking\s*water\s*compliance/i],
    reply: `**Core parameters: ~2 working days**; extended suites **up to 5 days** when additional QC is required.
• Scope: Compliance monitoring across distribution; includes metals, organics, micro, and phys‑chem.
• Ops notes: Pre‑align bottle sets and courier runs; tag samples likely to require extra QC to manage expectations.`,
    followups: [
      "Which core parameters finish in 2 days?",
      "Show cases needing extra QC last month",
      "Any SLA breaches in the last quarter?",
    ],
  },

  // --- Generic / helpers -----------------------------------------------
  {
    id: "ph_boxplot_6m",
    keywords: ["show ph boxplot last 6 months", "ph boxplot 6 months"],
    patterns: [/show.*ph.*boxplot.*(last|past)\s*6\s*months/i],
    reply: `Generated **boxplot‑ready pH summary** for the last six months (per‑site/group medians, IQR, and outliers).
• Use: Feed this into your chart module to visualise spread and any seasonal skew.
• QC note: Outliers marked where residuals > 3×IQR; sensor flagged periods excluded.`,
    followups: [
      "Compare pH trend across plants",
      "Did compliance limits get breached?",
      "Show algal bloom indicators alongside pH",
    ],
  },
  {
    id: "compare_ph_across_plants",
    keywords: ["compare ph across plants", "ph comparison plants"],
    patterns: [/compare.*ph.*across.*plants/i],
    reply: `Prepared a **comparative pH summary by plant** (median, IQR, and rolling mean).
• Use: Quickly identify plants with wider variability or systematic offsets vs peers.
• QC note: Normalised for sampling frequency; gaps interpolated only for display, not analysis.`,
    followups: [
      "Overlay rainfall on pH by plant",
      "Check any plant breaching action levels",
      "Show pH variability by shift",
    ],
  },
  {
    id: "residuals_by_week",
    keywords: ["break residuals down by week", "residuals weekly breakdown"],
    patterns: [/break.*residuals?.*down.*week/i],
    reply: `Built a **weekly chlorine residuals table** (min/mean/max per week + maintenance annotations).
• Use: Spot step‑changes and link them to works/ops events.
• QC note: Bench vs online reconciled weekly; June maintenance flagged to avoid false alarms.`,
    followups: [
      "Show residuals vs flow during June",
      "Any customer complaints logged?",
      "Alert me if residuals exceed 0.6 mg/L",
    ],
  },
]

export const QA_FALLBACK_REPLY =
  "I'm using a predefined Q&A set and couldn’t find a close match. Try a simpler phrasing or a known keyword (e.g., “pH trend last 6 months”)."
