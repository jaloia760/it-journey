"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  HeartPulse,
  Activity,
  LineChart,
  AlertTriangle,
  Sparkles,
  Server,
  Gauge,
  Loader2,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Network,
} from "lucide-react";

function fmt(ts: number) {
  const d = new Date(ts);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

export default function HealthProactive() {
  const [expanded, setExpanded] = useState(false);
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stepIdx, setStepIdx] = useState(-1);
  const [audit, setAudit] = useState<{ ts: number; msg: string }[]>([]);
  const [issueResolved, setIssueResolved] = useState(false);

  const steps = useMemo(
    () => [
      "Correlate anomalies across signals (APM, infra, logs)",
      "Prioritize by SLO impact & blast radius",
      "Recommend stabilization workflow",
      "Run canary checks & verify rollback plan",
      "Notify service owners with context",
    ],
    []
  );

  const anomalies = [
    { label: "p95 latency +42% vs baseline", sev: "warning" as const },
    { label: "error rate +18% (5m)", sev: "info" as const },
    { label: "read replica saturation nearing 80%", sev: "warning" as const },
  ];

  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!running) return;

    setAudit((a) => [
      ...a,
      { ts: Date.now(), msg: "Stabilization workflow started (guardrails enabled)" },
    ]);
    setProgress(0);
    setStepIdx(-1);

    const total = steps.length;
    let i = -1;

    const timer = setInterval(() => {
      if (i < total - 1) {
        i++;
        setStepIdx(i);
        setAudit((a) => [...a, { ts: Date.now(), msg: `▶ ${steps[i]}` }]);
        const pct = Math.min(100, Math.round(((i + 1) / total) * 92));
        setProgress(pct);
      } else {
        setAudit((a) => [
          ...a,
          { ts: Date.now(), msg: "✓ Workflow complete: SLIs recovered within thresholds" },
        ]);
        setProgress(100);
        setIssueResolved(true);
        clearInterval(timer);
        setTimeout(() => setRunning(false), 700);
      }
    }, 600);

    return () => clearInterval(timer);
  }, [running, steps]);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [audit]);

  return (
    <div className="relative">
      {/* Compact preview */}
      {!expanded && (
        <div
          onClick={() => setExpanded(true)}
          className="cursor-pointer rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md transition-all duration-200"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <HeartPulse className="h-4 w-4 text-indigo-600" />
              <h3 className="text-sm font-semibold text-slate-800">Proactive Service Health</h3>
            </div>
            <span className="text-xs text-slate-500">Proactive View</span>
          </div>

          <div className="flex items-center gap-3 mb-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 text-xs">
              <Gauge className="h-3.5 w-3.5"/> SLO at risk
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-50 text-slate-700 border border-slate-200 px-2 py-0.5 text-xs">
              <Network className="h-3.5 w-3.5"/> Impact: 3 services
            </span>
          </div>

          <div className="space-y-2 text-sm text-slate-600">
            <p>
              Unified signals surface early risk. Freddy recommends a stabilization workflow before users feel it.
            </p>
            <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-100 p-2 rounded-md text-indigo-700">
              <Sparkles size={14} />
              <span>“Scale read replicas + purge cache; verify error budget after.”</span>
            </div>
            <p className="text-xs text-slate-400">Click to preview anomalies &amp; run stabilization →</p>
          </div>
        </div>
      )}

      {/* Full view overlay */}
      {expanded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-5xl w-full mx-4 p-6 relative">
            <button
              onClick={() => setExpanded(false)}
              className="absolute top-3 right-4 text-slate-500 hover:text-slate-700"
            >
              ✕
            </button>

            <div className="mb-5">
              <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <Activity className="h-5 w-5 text-indigo-600" /> Proactive Service Health
              </h2>
              <p className="text-slate-500 text-sm">Anomaly correlation, SLO impact, and guided stabilization to prevent incidents.</p>
            </div>

            <div className="grid grid-cols-2 gap-5">
              {/* Left: Anomalies */}
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <h4 className="font-medium text-slate-700 mb-3 flex items-center gap-2">
                  <LineChart className="h-4 w-4 text-amber-600" /> Anomalies & Signals
                </h4>
                <div className="space-y-2 text-sm">
                  {anomalies.map((a) => (
                    <div
                      key={a.label}
                      className={
                        "flex items-start gap-3 rounded-md border p-2 " +
                        (a.sev === "warning"
                          ? "border-amber-200 bg-amber-50 text-amber-800"
                          : "border-sky-200 bg-sky-50 text-sky-800")
                      }
                    >
                      {a.sev === "warning" ? (
                        <AlertTriangle className="h-4 w-4 mt-0.5" />
                      ) : (
                        <Server className="h-4 w-4 mt-0.5" />
                      )}
                      <span className="leading-snug">{a.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Freddy Suggestions & Action */}
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <h4 className="font-medium text-slate-700 mb-3 flex items-center gap-2">
                  <Sparkles size={16} className="text-indigo-600" /> Freddy Recommends
                </h4>
                <ul className="text-sm text-slate-700 space-y-2 mb-3">
                  <li className="flex items-start gap-2 rounded-md border border-slate-200 bg-slate-50 p-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5" /> Scale DB read replicas by +2
                  </li>
                  <li className="flex items-start gap-2 rounded-md border border-slate-200 bg-slate-50 p-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5" /> Purge API gateway cache for /checkout routes
                  </li>
                  <li className="flex items-start gap-2 rounded-md border border-slate-200 bg-slate-50 p-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5" /> Verify p95 latency & error budget after actions
                  </li>
                </ul>

                {/* Progress bar when running */}
                {running && (
                  <div className="mb-3">
                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
                      <div className="h-full rounded-full bg-indigo-600 transition-all" style={{ width: `${progress}%` }} />
                    </div>
                    <div className="mt-1 flex items-center justify-between text-xs text-slate-500">
                      <span>Stabilization</span>
                      <span>{progress}%</span>
                    </div>
                  </div>
                )}

                {!running ? (
                  <button
                    onClick={() => setRunning(true)}
                    className="inline-flex items-center gap-2 rounded-md bg-indigo-600 text-white text-sm px-3 py-2 hover:bg-indigo-700"
                  >
                    Run Stabilization Workflow
                  </button>
                ) : (
                  <div className="inline-flex items-center gap-2 rounded-md bg-slate-100 px-3 py-1.5 text-xs text-slate-600">
                    <Loader2 className="h-3.5 w-3.5 animate-spin" /> Executing actions
                  </div>
                )}
              </div>
            </div>

            {/* Service map */}
            <div className="mt-5 rounded-lg border border-slate-200 bg-white p-4">
              <h4 className="font-medium text-slate-700 mb-3">Service Map (live)</h4>
              <div className="w-full overflow-hidden rounded-md bg-slate-50 border border-slate-200">
                <svg viewBox="0 0 780 260" className="w-full h-[220px]">
                  {/* Links */}
                  <defs>
                    <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto" markerUnits="strokeWidth">
                      <path d="M0,0 L0,6 L6,3 z" fill="#334155" />
                    </marker>
                  </defs>

                  {/* top nodes to center */}
                  <path d="M150,70 C230,120 300,140 380,150" stroke="#334155" strokeWidth="2" fill="none" markerEnd="url(#arrow)" opacity=".6"/>
                  <path d="M390,70 L390,150" stroke="#334155" strokeWidth="2" fill="none" markerEnd="url(#arrow)" opacity=".6"/>
                  <path d="M630,70 C550,120 480,140 400,150" stroke="#334155" strokeWidth="2" fill="none" markerEnd="url(#arrow)" opacity=".6"/>

                  {/* center to bottom nodes */}
                  <path d="M390,160 C310,190 240,200 170,210" stroke="#334155" strokeWidth="2" fill="none" markerEnd="url(#arrow)" opacity=".6"/>
                  <path d="M390,160 C390,190 390,200 390,210" stroke="#334155" strokeWidth="2" fill="none" markerEnd="url(#arrow)" opacity=".6"/>
                  <path d="M390,160 C470,190 540,200 610,210" stroke="#334155" strokeWidth="2" fill="none" markerEnd="url(#arrow)" opacity=".6"/>

                  {/* Node helpers */}
                  {/** small util to draw a node via circles + label - we'll inline each node for clarity */}

                  {/* Top row */}
                  <circle cx="150" cy="70" r="18" fill="#e2e8f0" stroke="#334155" strokeWidth="1.5" />
                  <text x="150" y="35" textAnchor="middle" className="fill-slate-600 text-[12px]">POS Router</text>

                  {/* Problem node (turns healthy) */}
                  <circle cx="390" cy="70" r="18" fill="white" stroke="#334155" strokeWidth="1.5" />
                  <circle cx="390" cy="70" r="12" fill={issueResolved ? "#10b981" : "#ef4444"} />
                  <text x="390" y="35" textAnchor="middle" className="fill-slate-600 text-[12px]">Oracle HCM</text>

                  <circle cx="630" cy="70" r="18" fill="#e2e8f0" stroke="#334155" strokeWidth="1.5" />
                  <text x="630" y="35" textAnchor="middle" className="fill-slate-600 text-[12px]">AWS VPC</text>

                  {/* Center node */}
                  <rect x="330" y="140" rx="16" ry="16" width="120" height="40" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="1.5" />
                  <text x="390" y="165" textAnchor="middle" className="fill-slate-700 text-[12px] font-medium">Backend DB</text>

                  {/* Bottom row */}
                  <circle cx="170" cy="210" r="18" fill="#e2e8f0" stroke="#334155" strokeWidth="1.5" />
                  <text x="170" y="242" textAnchor="middle" className="fill-slate-600 text-[12px]">vCenter</text>

                  <circle cx="390" cy="210" r="18" fill="#e2e8f0" stroke="#334155" strokeWidth="1.5" />
                  <text x="390" y="242" textAnchor="middle" className="fill-slate-600 text-[12px]">POS</text>

                  <circle cx="610" cy="210" r="18" fill="#e2e8f0" stroke="#334155" strokeWidth="1.5" />
                  <text x="610" y="242" textAnchor="middle" className="fill-slate-600 text-[12px]">Contracts</text>
                </svg>
              </div>
              <div className="mt-2 text-xs text-slate-500">
                <span className="inline-flex items-center gap-1 mr-4"><span className="inline-block h-2 w-2 rounded-full bg-red-500"></span> At risk</span>
                <span className="inline-flex items-center gap-1"><span className="inline-block h-2 w-2 rounded-full bg-emerald-500"></span> Healthy</span>
              </div>
            </div>

            {/* Audit log */}
            <div className="mt-5 rounded-lg border border-slate-200 bg-white">
              <div className="flex items-center justify-between border-b border-slate-200 px-4 py-2">
                <div className="flex items-center gap-2 text-slate-700 text-sm font-medium">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" /> Evidence Log
                </div>
                <div className="text-xs text-slate-500">{new Date().toLocaleDateString()}</div>
              </div>
              <div ref={logRef} className="max-h-40 overflow-auto px-4 py-3 text-xs text-slate-700 space-y-1">
                {audit.length === 0 && (
                  <div className="text-slate-400">No entries yet. Run the workflow to generate evidence.</div>
                )}
                {audit.map((row, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="tabular-nums text-slate-500 w-16">{fmt(row.ts)}</span>
                    <span>{row.msg}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}