

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  GitPullRequest,
  ShieldCheck,
  Gauge,
  Network,
  CheckCircle2,
  Loader2,
  Clock,
  Bot,
  FileText,
} from "lucide-react";

function fmt(ts: number) {
  const d = new Date(ts);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

export default function ChangeAutonomous() {
  const [expanded, setExpanded] = useState(false);
  const [running, setRunning] = useState(false);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stepIdx, setStepIdx] = useState(-1);
  const [audit, setAudit] = useState<{ ts: number; msg: string }[]>([]);
  const [showApproval, setShowApproval] = useState(false);
  const [showChangeRecord, setShowChangeRecord] = useState(false);

  const steps = useMemo(
    () => [
      "Run policy pre-checks (risk ≤ threshold)",
      "Verify no conflict windows & dependencies",
      "Auto-approve change (low-risk policy)",
      "Execute change with guardrails",
      "Post-change health checks",
      "Notify stakeholders & update record",
    ],
    []
  );

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const logRef = useRef<HTMLDivElement>(null);

  // Auto-start when expanded
  useEffect(() => {
    if (expanded) {
      setRunning(true);
      setPaused(false);
      setProgress(0);
      setStepIdx(-1);
      setAudit([{ ts: Date.now(), msg: "Autonomous change engaged (policy: Low-Risk)" }]);
    } else {
      setRunning(false);
      setProgress(0);
      setStepIdx(-1);
      setAudit([]);
      if (timerRef.current !== null) clearInterval(timerRef.current);
    }
  }, [expanded]);

  // Drive automation
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
          { ts: Date.now(), msg: "✓ Change executed under guardrails" },
          { ts: Date.now(), msg: "SLIs verified; no regressions detected" },
          { ts: Date.now(), msg: "Approval note & change record prepared" },
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
              <GitPullRequest className="h-4 w-4 text-emerald-600" />
              <h3 className="text-sm font-semibold text-slate-800">Autonomous Change (Low‑Risk)</h3>
            </div>
            <span className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 rounded px-2 py-0.5">Active</span>
          </div>
          <div className="flex items-center gap-3 mb-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 text-xs"><Gauge className="h-3.5 w-3.5"/> Risk: 28 (Low)</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-50 text-slate-700 border border-slate-200 px-2 py-0.5 text-xs"><Network className="h-3.5 w-3.5"/> Radius: 2 services</span>
          </div>
          <p className="text-sm text-slate-600">Policy confirms low risk. System will auto‑approve, execute with guardrails, and document.
          </p>
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
                <Bot className="h-5 w-5 text-emerald-600" /> Autonomous Change Execution
              </h2>
              <p className="text-slate-500 text-sm">Low‑risk changes proceed automatically with pre/post checks and full audit trail.</p>
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
                <div className="h-full rounded-full bg-emerald-600 transition-all" style={{ width: `${progress}%` }} />
              </div>
              <div className="mt-1 flex items-center justify-between text-xs text-slate-500">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
            </div>

            {/* Main content */}
            <div className="grid grid-cols-2 gap-5">
              {/* Steps */}
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <h4 className="font-medium text-slate-700 mb-3 flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" /> Policy & Execution
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

              {/* Outcomes */}
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <h4 className="font-medium text-slate-700 mb-3 flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" /> Outcomes
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="rounded-md border border-slate-200 bg-slate-50 p-3 flex items-center justify-between">
                    <div className="text-slate-700 font-medium flex items-center gap-2"><Gauge className="h-4 w-4"/> Pre-checks passed</div>
                    <span className="text-xs rounded bg-emerald-100 text-emerald-700 px-2 py-0.5">OK</span>
                  </div>
                  <div className="rounded-md border border-slate-200 bg-slate-50 p-3 flex items-center justify-between">
                    <div className="text-slate-700 font-medium flex items-center gap-2"><Network className="h-4 w-4"/> Blast radius verified</div>
                    <span className="text-xs rounded bg-emerald-100 text-emerald-700 px-2 py-0.5">OK</span>
                  </div>
                  <div className="rounded-md border border-slate-200 bg-slate-50 p-3 flex items-center justify-between">
                    <div className="text-slate-700 font-medium flex items-center gap-2"><FileText className="h-4 w-4"/> Records prepared</div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => setShowApproval(true)} className="rounded-md border border-slate-300 bg-white px-2 py-1 text-xs text-slate-700 hover:bg-slate-50">Approval note</button>
                      <button onClick={() => setShowChangeRecord(true)} className="rounded-md bg-emerald-600 px-2 py-1 text-xs text-white hover:bg-emerald-700">Change record</button>
                    </div>
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
                  <div className="text-slate-400">No entries yet. Timeline will populate as policy executes.</div>
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
            {showApproval && (
              <div className="absolute inset-0 z-50 flex items-start justify-end p-6">
                <div className="relative w-full max-w-lg rounded-xl border border-slate-200 bg-white shadow-xl">
                  <div className="flex items-center justify-between border-b border-slate-200 px-4 py-2">
                    <div className="text-sm font-medium text-slate-700">Approval Note – Auto‑approved (Low‑Risk)</div>
                    <button onClick={() => setShowApproval(false)} className="text-slate-500 hover:text-slate-700">✕</button>
                  </div>
                  <div className="px-4 py-3 text-sm text-slate-700 space-y-3">
                    <div className="grid grid-cols-2 gap-3 text-xs text-slate-600">
                      <div><span className="font-medium text-slate-700">Change:</span> CHG‑24890</div>
                      <div><span className="font-medium text-slate-700">Risk:</span> 28 (Low)</div>
                      <div><span className="font-medium text-slate-700">Policy:</span> Auto‑approve low risk</div>
                      <div><span className="font-medium text-slate-700">Window:</span> 14:00–14:30</div>
                    </div>
                    <div>
                      <div className="text-slate-500 text-xs">Note</div>
                      <p>Pre‑checks and dependency analysis passed. Proceeded under guardrails with rollback plan in place.</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-2 border-t border-slate-200 px-4 py-3">
                    <button onClick={() => setShowApproval(false)} className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50">Close</button>
                    <button className="rounded-md bg-slate-900 px-3 py-1.5 text-xs text-white hover:bg-black">Copy to clipboard</button>
                  </div>
                </div>
              </div>
            )}

            {showChangeRecord && (
              <div className="absolute inset-0 z-50 flex items-start justify-end p-6">
                <div className="relative w-full max-w-xl rounded-xl border border-slate-200 bg-white shadow-xl">
                  <div className="flex items-center justify-between border-b border-slate-200 px-4 py-2">
                    <div className="text-sm font-medium text-slate-700">Change Record – Drafted</div>
                    <button onClick={() => setShowChangeRecord(false)} className="text-slate-500 hover:text-slate-700">✕</button>
                  </div>
                  <div className="px-4 py-3 text-sm text-slate-700 space-y-3">
                    <div className="grid grid-cols-2 gap-3 text-xs text-slate-600">
                      <div><span className="font-medium text-slate-700">ID:</span> CHG‑24890</div>
                      <div><span className="font-medium text-slate-700">Type:</span> Standard</div>
                      <div><span className="font-medium text-slate-700">Start:</span> {new Date().toLocaleTimeString()}</div>
                      <div><span className="font-medium text-slate-700">End:</span> {new Date().toLocaleTimeString()}</div>
                    </div>
                    <div>
                      <div className="text-slate-500 text-xs">Summary</div>
                      <p>Applied configuration update to DB connection pooler; auto‑approved per low‑risk policy.</p>
                    </div>
                    <div>
                      <div className="text-slate-500 text-xs">Evidence</div>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Pre‑check report (conflicts, dependencies)</li>
                        <li>Guardrail policy details</li>
                        <li>Post‑change health check results (SLIs)</li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-2 border-t border-slate-200 px-4 py-3">
                    <button onClick={() => setShowChangeRecord(false)} className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50">Close</button>
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