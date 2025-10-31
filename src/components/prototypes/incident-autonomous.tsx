

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ShieldCheck,
  Bot,
  Zap,
  CheckCircle2,
  Loader2,
  Clock,
  FileText,
  TrendingDown,
  BellRing,
} from "lucide-react";

function fmt(ts: number) {
  const d = new Date(ts);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

export default function IncidentAutonomous() {
  const [expanded, setExpanded] = useState(false);
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stepIdx, setStepIdx] = useState(-1);
  const [audit, setAudit] = useState<{ ts: number; msg: string }[]>([]);
  const [paused, setPaused] = useState(false);
  const [showStakeholder, setShowStakeholder] = useState(false);
  const [showRCA, setShowRCA] = useState(false);

  const steps = useMemo(
    () => [
      "Detect pattern & confirm service impact (policy gate)",
      "Isolate scope; deduplicate & auto-route",
      "Execute rollback + scale resources",
      "Run health checks & verify SLIs",
      "Close incident; notify stakeholders",
      "Publish RCA draft & evidence",
    ],
    []
  );

  const logRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto-start automation when expanded
  useEffect(() => {
    if (expanded) {
      setRunning(true);
      setProgress(0);
      setStepIdx(-1);
      setAudit([{ ts: Date.now(), msg: "Autonomous remediation engaged (guardrails ON)" }]);
    } else {
      // reset when closed
      setRunning(false);
      setProgress(0);
      setStepIdx(-1);
      setAudit([]);
      if (timerRef.current !== null) clearInterval(timerRef.current);
    }
  }, [expanded]);

  // Drive automation timeline
  useEffect(() => {
    if (!running || paused) return;
    const total = steps.length;
    let i = stepIdx;
    timerRef.current = setInterval(() => {
      if (i < total - 1) {
        i++;
        setStepIdx(i);
        setAudit((a) => [...a, { ts: Date.now(), msg: `🤖 ${steps[i]}` }]);
        setProgress(Math.min(100, Math.round(((i + 1) / total) * 92)));
      } else {
        setAudit((a) => [
          ...a,
          { ts: Date.now(), msg: "✓ Remediation completed automatically" },
          { ts: Date.now(), msg: "Incident closed and subscribers notified" },
          { ts: Date.now(), msg: "RCA draft prepared with evidence & timeline" },
        ]);
        setProgress(100);
        if (timerRef.current !== null) clearInterval(timerRef.current);
      }
    }, 650);
    return () => {
      if (timerRef.current !== null) clearInterval(timerRef.current);
    };
  }, [running, paused, stepIdx, steps]);

  // Auto-scroll audit log
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
              <Bot className="h-4 w-4 text-emerald-600" />
              <h3 className="text-sm font-semibold text-slate-800">Autonomous Remediation</h3>
            </div>
            <span className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 rounded px-2 py-0.5">Active</span>
          </div>
          <div className="space-y-2 text-sm text-slate-600">
            <p>
              Policy-driven automation is <strong>executing remediation</strong> for a known pattern, with guardrails and full audit.
            </p>
            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 p-2 rounded-md text-emerald-800">
              <ShieldCheck className="h-4 w-4" />
              <span>Safe actions under SLO guardrails. Click to view timeline →</span>
            </div>
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

            {/* Header */}
            <div className="mb-5">
              <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <Bot className="h-5 w-5 text-emerald-600" />
                Autonomous Remediation Timeline
              </h2>
              <p className="text-slate-500 text-sm">System anticipates, executes, and verifies—then documents the outcome.</p>
            </div>

            {/* Controls */}
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs">
                <span className="rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5">Automation</span>
                <span className="rounded-full bg-slate-50 text-slate-600 border border-slate-200 px-2 py-0.5">Guardrails ON</span>
              </div>
              <div className="flex items-center gap-2">
                {!paused ? (
                  <button
                    onClick={() => setPaused(true)}
                    className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50"
                  >
                    Pause automation
                  </button>
                ) : (
                  <button
                    onClick={() => setPaused(false)}
                    className="inline-flex items-center gap-2 rounded-md bg-emerald-600 px-3 py-1.5 text-xs text-white hover:bg-emerald-700"
                  >
                    Resume automation
                  </button>
                )}
              </div>
            </div>

            {/* Progress */}
            <div className="mb-5">
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-emerald-600 transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="mt-1 flex items-center justify-between text-xs text-slate-500">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
            </div>

            {/* Main content */}
            <div className="grid grid-cols-2 gap-5">
              {/* Left: Closed-loop steps */}
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <h4 className="font-medium text-slate-700 mb-3 flex items-center gap-2">
                  <Zap className="h-4 w-4 text-emerald-600" /> Closed‑loop actions
                </h4>
                <ul className="text-sm text-slate-700 space-y-2">
                  {steps.map((s, idx) => (
                    <li
                      key={s}
                      className={
                        "flex items-start gap-2 rounded-md border p-2 " +
                        (idx < stepIdx
                          ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                          : idx === stepIdx && running && !paused
                          ? "border-emerald-200 bg-emerald-50/60"
                          : "border-slate-200 bg-slate-50")
                      }
                    >
                      {idx < stepIdx ? (
                        <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600" />
                      ) : idx === stepIdx && running && !paused ? (
                        <Loader2 className="mt-0.5 h-4 w-4 animate-spin text-emerald-600" />
                      ) : (
                        <Clock className="mt-0.5 h-4 w-4 text-slate-400" />
                      )}
                      <span className="leading-snug">{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right: Outcomes & comms */}
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <h4 className="font-medium text-slate-700 mb-3 flex items-center gap-2">
                  <TrendingDown className="h-4 w-4 text-emerald-600" /> Outcomes & Communications
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="rounded-md border border-slate-200 bg-slate-50 p-3">
                    <div className="text-slate-700 font-medium">Health checks</div>
                    <div className="mt-2 h-2 w-full rounded bg-slate-200">
                      <div className="h-2 rounded bg-emerald-600" style={{ width: `${Math.min(100, Math.max(0, progress))}%` }} />
                    </div>
                    <div className="mt-1 text-xs text-slate-500">All SLIs within thresholds</div>
                  </div>
                  <div className="rounded-md border border-slate-200 bg-slate-50 p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-700"><BellRing className="h-4 w-4 text-slate-500"/> Stakeholder updates ready</div>
                    <button
                      onClick={() => setShowStakeholder(true)}
                      className="rounded-md border border-slate-300 bg-white px-2 py-1 text-xs text-slate-700 hover:bg-slate-50"
                    >
                      Preview status note
                    </button>
                  </div>
                  <div className="rounded-md border border-slate-200 bg-slate-50 p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-700"><FileText className="h-4 w-4 text-slate-500"/> RCA draft prepared</div>
                    <button
                      onClick={() => setShowRCA(true)}
                      className="rounded-md bg-emerald-600 px-2 py-1 text-xs text-white hover:bg-emerald-700"
                    >
                      View RCA draft
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Audit log */}
            <div className="mt-5 rounded-lg border border-slate-200 bg-white">
              <div className="flex items-center justify-between border-b border-slate-200 px-4 py-2">
                <div className="flex items-center gap-2 text-slate-700 text-sm font-medium">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" /> Automation Log & Evidence
                </div>
                <div className="text-xs text-slate-500">{new Date().toLocaleDateString()}</div>
              </div>
              <div ref={logRef} className="max-h-40 overflow-auto px-4 py-3 text-xs text-slate-700 space-y-1">
                {audit.length === 0 && (
                  <div className="text-slate-400">No entries yet. Opened too quickly? The system writes as it acts.</div>
                )}
                {audit.map((row, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="tabular-nums text-slate-500 w-16">{fmt(row.ts)}</span>
                    <span>{row.msg}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Popovers */}
            {showStakeholder && (
              <div className="absolute inset-0 z-50 flex items-start justify-end p-6">
                <div className="relative w-full max-w-lg rounded-xl border border-slate-200 bg-white shadow-xl">
                  <div className="flex items-center justify-between border-b border-slate-200 px-4 py-2">
                    <div className="text-sm font-medium text-slate-700">Stakeholder Update – Draft</div>
                    <button
                      onClick={() => setShowStakeholder(false)}
                      className="text-slate-500 hover:text-slate-700"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="px-4 py-3 text-sm text-slate-700 space-y-3">
                    <div>
                      <div className="text-slate-500 text-xs">Subject</div>
                      <div className="font-medium">Service Degradation Resolved – Checkout latency</div>
                    </div>
                    <div>
                      <div className="text-slate-500 text-xs">Summary</div>
                      <p>
                        Earlier today we detected elevated DB latency impacting Checkout. Automated rollback and scaling actions
                        restored normal performance. All SLIs are within thresholds.
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-xs text-slate-600">
                      <div><span className="font-medium text-slate-700">Start:</span> {new Date().toLocaleTimeString()}</div>
                      <div><span className="font-medium text-slate-700">End:</span> {new Date().toLocaleTimeString()}</div>
                      <div><span className="font-medium text-slate-700">Impact:</span> Checkout (us‑west)</div>
                      <div><span className="font-medium text-slate-700">Status:</span> Resolved</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-2 border-t border-slate-200 px-4 py-3">
                    <button onClick={() => setShowStakeholder(false)} className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50">Close</button>
                    <button className="rounded-md bg-slate-900 px-3 py-1.5 text-xs text-white hover:bg-black">Copy to clipboard</button>
                  </div>
                </div>
              </div>
            )}

            {showRCA && (
              <div className="absolute inset-0 z-50 flex items-start justify-end p-6">
                <div className="relative w-full max-w-xl rounded-xl border border-slate-200 bg-white shadow-xl">
                  <div className="flex items-center justify-between border-b border-slate-200 px-4 py-2">
                    <div className="text-sm font-medium text-slate-700">RCA Draft – Generated</div>
                    <button
                      onClick={() => setShowRCA(false)}
                      className="text-slate-500 hover:text-slate-700"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="px-4 py-3 text-sm text-slate-700 space-y-3">
                    <div className="grid grid-cols-2 gap-3 text-xs text-slate-600">
                      <div><span className="font-medium text-slate-700">Incident:</span> INC‑14327</div>
                      <div><span className="font-medium text-slate-700">Severity:</span> Major</div>
                      <div><span className="font-medium text-slate-700">Start:</span> {new Date().toLocaleTimeString()}</div>
                      <div><span className="font-medium text-slate-700">End:</span> {new Date().toLocaleTimeString()}</div>
                    </div>
                    <div>
                      <div className="text-slate-500 text-xs">Summary</div>
                      <p>
                        DB schema migration at 10:45 UTC increased query latency, impacting Checkout. Automation rolled back the change,
                        added two read replicas, and verified SLIs.
                      </p>
                    </div>
                    <div>
                      <div className="text-slate-500 text-xs">Root Cause</div>
                      <p>Change introduced inefficient index path on hot table.</p>
                    </div>
                    <div>
                      <div className="text-slate-500 text-xs">Corrective / Preventive Actions</div>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Revert schema migration; re‑evaluate indexes</li>
                        <li>Enable pre‑change impact simulation on DB migrations</li>
                        <li>Extend anomaly guardrails for p95 latency</li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-2 border-t border-slate-200 px-4 py-3">
                    <button onClick={() => setShowRCA(false)} className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50">Close</button>
                    <button className="rounded-md bg-emerald-600 px-3 py-1.5 text-xs text-white hover:bg-emerald-700">Export PDF</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}