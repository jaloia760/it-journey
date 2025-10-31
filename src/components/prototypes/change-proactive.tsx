

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ShieldAlert,
  GitPullRequest,
  Network,
  Sparkles,
  Gauge,
  CheckCircle2,
  Loader2,
  Clock,
  ShieldCheck,
} from "lucide-react";

function fmt(ts: number) {
  const d = new Date(ts);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

export default function ChangeProactive() {
  const [expanded, setExpanded] = useState(false);
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stepIdx, setStepIdx] = useState(-1);
  const [audit, setAudit] = useState<{ ts: number; msg: string }[]>([]);

  const steps = useMemo(
    () => [
      "Load recent change context & dependencies",
      "Run pre-checks (conflicts, maintenance window, approvals)",
      "Simulate impact across services & assets",
      "Generate CAB packet with evidence",
      "Recommend guardrails and rollback plan",
    ],
    []
  );

  const impacted = [
    { name: "Checkout", impact: 0.82 },
    { name: "Payments", impact: 0.67 },
    { name: "User Profile", impact: 0.44 },
    { name: "Search", impact: 0.31 },
  ];

  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!running) return;

    setAudit((a) => [
      ...a,
      { ts: Date.now(), msg: "Simulation started (policy guardrails enabled)" },
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
          { ts: Date.now(), msg: "✓ Simulation complete: Risk refined, packet prepared" },
        ]);
        setProgress(100);
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
              <GitPullRequest className="h-4 w-4 text-indigo-600" />
              <h3 className="text-sm font-semibold text-slate-800">Change Risk & Impact</h3>
            </div>
            <span className="text-xs text-slate-500">Proactive View</span>
          </div>

          <div className="flex items-center gap-3 mb-2">
            <div className="inline-flex items-center gap-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 text-xs">
              <Gauge className="h-3.5 w-3.5" /> Risk score: <strong>72</strong>
            </div>
            <div className="inline-flex items-center gap-1 rounded-full bg-slate-50 text-slate-700 border border-slate-200 px-2 py-0.5 text-xs">
              <Network className="h-3.5 w-3.5" /> Blast radius: 6 services
            </div>
          </div>

          <div className="space-y-2 text-sm text-slate-600">
            <p>
              Freddy analyzes dependencies and recent changes to estimate risk and potential impact — before CAB meets.
            </p>
            <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-100 p-2 rounded-md text-indigo-700">
              <Sparkles size={14} />
              <span>Recommendation: simulate and attach evidence to fast‑track approval.</span>
            </div>
            <p className="text-xs text-slate-400">Click to open simulation &amp; CAB packet preview →</p>
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
                <GitPullRequest className="h-5 w-5 text-indigo-600" /> Proactive Change Intelligence
              </h2>
              <p className="text-slate-500 text-sm">Risk scoring, blast radius, and evidence to accelerate safe change.</p>
            </div>

            {/* Progress bar */}
            {running && (
              <div className="mb-4">
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
                  <div className="h-full rounded-full bg-indigo-600 transition-all" style={{ width: `${progress}%` }} />
                </div>
                <div className="mt-1 flex items-center justify-between text-xs text-slate-500">
                  <span>Simulation</span>
                  <span>{progress}%</span>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-5">
              {/* Risk & Impact */}
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <h4 className="font-medium text-slate-700 mb-3 flex items-center gap-2">
                  <ShieldAlert className="h-4 w-4 text-amber-600" /> Risk & Impact
                </h4>
                <div className="flex items-center gap-3 mb-3 text-sm">
                  <div className="inline-flex items-center gap-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5">
                    <Gauge className="h-3.5 w-3.5" /> Score: <strong>72 (High)</strong>
                  </div>
                  <div className="inline-flex items-center gap-1 rounded-full bg-slate-50 text-slate-700 border border-slate-200 px-2 py-0.5">
                    <Network className="h-3.5 w-3.5" /> Blast radius: <strong>6 services</strong>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  {impacted.map((s) => (
                    <div key={s.name} className="rounded-md border border-slate-200 bg-slate-50 p-2">
                      <div className="flex items-center justify-between">
                        <div className="font-medium text-slate-700">{s.name}</div>
                        <div className="text-xs text-slate-500">{Math.round(s.impact * 100)}% likelihood</div>
                      </div>
                      <div className="mt-2 h-2 w-full rounded bg-slate-200">
                        <div className="h-2 rounded bg-amber-500" style={{ width: `${s.impact * 100}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Freddy Suggestions */}
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <h4 className="font-medium text-slate-700 mb-3 flex items-center gap-2">
                  <Sparkles size={16} className="text-indigo-600" /> Freddy Recommends
                </h4>
                <ul className="text-sm text-slate-700 space-y-2 mb-3">
                  {steps.map((s, idx) => (
                    <li
                      key={s}
                      className={
                        "flex items-start gap-2 rounded-md border p-2 " +
                        (idx < stepIdx
                          ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                          : idx === stepIdx && running
                          ? "border-indigo-200 bg-indigo-50"
                          : "border-slate-200 bg-slate-50")
                      }
                    >
                      {idx < stepIdx ? (
                        <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600" />
                      ) : idx === stepIdx && running ? (
                        <Loader2 className="mt-0.5 h-4 w-4 animate-spin text-indigo-600" />
                      ) : (
                        <Clock className="mt-0.5 h-4 w-4 text-slate-400" />
                      )}
                      <span className="leading-snug">{s}</span>
                    </li>
                  ))}
                </ul>
                {!running ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setRunning(true)}
                      className="inline-flex items-center gap-2 rounded-md bg-indigo-600 text-white text-sm px-3 py-2 hover:bg-indigo-700"
                    >
                      Run Simulation
                    </button>
                    <button className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white text-sm px-3 py-2 text-slate-700 hover:bg-slate-50">
                      Generate CAB packet
                    </button>
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-2 rounded-md bg-slate-100 px-3 py-1.5 text-xs text-slate-600">
                    <Loader2 className="h-3.5 w-3.5 animate-spin" /> Running simulation
                  </div>
                )}
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
                  <div className="text-slate-400">No entries yet. Run the simulation to generate evidence.</div>
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