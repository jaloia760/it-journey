


"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  HeartPulse,
  Bot,
  Zap,
  CheckCircle2,
  Loader2,
  Clock,
  ShieldCheck,
  Gauge,
  BellRing,
  FileText,
  Activity,
} from "lucide-react";

function fmt(ts: number) {
  const d = new Date(ts);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

export default function HealthAutonomous() {
  const [expanded, setExpanded] = useState(false);
  const [running, setRunning] = useState(false);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stepIdx, setStepIdx] = useState(-1);
  const [audit, setAudit] = useState<{ ts: number; msg: string }[]>([]);
  const [showStatus, setShowStatus] = useState(false);
  const [showRCA, setShowRCA] = useState(false);
  const [issueResolved, setIssueResolved] = useState(false);

  const steps = useMemo(
    () => [
      "Detect SLI regression & confirm SLO risk",
      "Correlate signals; isolate blast radius",
      "Self-heal: scale replicas + purge cache",
      "Re-test SLIs & error budget",
      "Update status note & notify owners",
      "Publish RCA draft with evidence",
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
      setAudit([{ ts: Date.now(), msg: "Autonomous service healing engaged (guardrails ON)" }]);
    } else {
      setRunning(false);
      setProgress(0);
      setStepIdx(-1);
      setAudit([]);
      setIssueResolved(false);
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
          { ts: Date.now(), msg: "✓ Self-heal complete; SLIs within thresholds" },
          { ts: Date.now(), msg: "Status updated; stakeholders notified" },
          { ts: Date.now(), msg: "RCA draft prepared with evidence" },
        ]);
        setProgress(100);
        setIssueResolved(true);
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
              <HeartPulse className="h-4 w-4 text-emerald-600" />
              <h3 className="text-sm font-semibold text-slate-800">Autonomous Service Health</h3>
            </div>
            <span className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 rounded px-2 py-0.5">Active</span>
          </div>
          <div className="flex items-center gap-3 mb-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 text-xs"><Gauge className="h-3.5 w-3.5"/> SLO guarded</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-50 text-slate-700 border border-slate-200 px-2 py-0.5 text-xs"><Activity className="h-3.5 w-3.5"/> Closed loop</span>
          </div>
          <p className="text-sm text-slate-600">System anticipates and heals service degradation under policy guardrails—then documents the outcome.
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
                <Bot className="h-5 w-5 text-emerald-600" /> Autonomous Service Healing
              </h2>
              <p className="text-slate-500 text-sm">Detect → Correlate → Heal → Verify → Communicate — fully automated with audit trail.</p>
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
                  <ShieldCheck className="h-4 w-4 text-emerald-600" /> Outcomes & Communications
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="rounded-md border border-slate-200 bg-slate-50 p-3 flex items-center justify-between">
                    <div className="text-slate-700 font-medium flex items-center gap-2"><Gauge className="h-4 w-4"/> SLIs recovered</div>
                    <span className="text-xs rounded bg-emerald-100 text-emerald-700 px-2 py-0.5">OK</span>
                  </div>
                  <div className="rounded-md border border-slate-200 bg-slate-50 p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-700"><BellRing className="h-4 w-4 text-slate-500"/> Stakeholder update ready</div>
                    <button onClick={() => setShowStatus(true)} className="rounded-md border border-slate-300 bg-white px-2 py-1 text-xs text-slate-700 hover:bg-slate-50">Preview status note</button>
                  </div>
                  <div className="rounded-md border border-slate-200 bg-slate-50 p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-700"><FileText className="h-4 w-4 text-slate-500"/> RCA draft prepared</div>
                    <button onClick={() => setShowRCA(true)} className="rounded-md bg-emerald-600 px-2 py-1 text-xs text-white hover:bg-emerald-700">View RCA draft</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Service map */}
            <div className="mt-5 rounded-lg border border-slate-200 bg-white p-4">
              <h4 className="font-medium text-slate-700 mb-3">Service Map (live)</h4>
              <div className="w-full overflow-hidden rounded-md bg-slate-50 border border-slate-200">
                <svg viewBox="0 0 780 260" className="w-full h-[220px]">
                  <defs>
                    <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto" markerUnits="strokeWidth">
                      <path d="M0,0 L0,6 L6,3 z" fill="#334155" />
                    </marker>
                  </defs>

                  {/* top links to center */}
                  <path d="M150,70 C230,120 300,140 380,150" stroke="#334155" strokeWidth="2" fill="none" markerEnd="url(#arrow)" opacity=".6"/>
                  <path d="M390,70 L390,150" stroke="#334155" strokeWidth="2" fill="none" markerEnd="url(#arrow)" opacity=".6"/>
                  <path d="M630,70 C550,120 480,140 400,150" stroke="#334155" strokeWidth="2" fill="none" markerEnd="url(#arrow)" opacity=".6"/>

                  {/* center to bottom */}
                  <path d="M390,160 C310,190 240,200 170,210" stroke="#334155" strokeWidth="2" fill="none" markerEnd="url(#arrow)" opacity=".6"/>
                  <path d="M390,160 C390,190 390,200 390,210" stroke="#334155" strokeWidth="2" fill="none" markerEnd="url(#arrow)" opacity=".6"/>
                  <path d="M390,160 C470,190 540,200 610,210" stroke="#334155" strokeWidth="2" fill="none" markerEnd="url(#arrow)" opacity=".6"/>

                  {/* Top row nodes */}
                  <circle cx="150" cy="70" r="18" fill="#e2e8f0" stroke="#334155" strokeWidth="1.5" />
                  <text x="150" y="35" textAnchor="middle" className="fill-slate-600 text-[12px]">POS Router</text>

                  {/* Problem node that heals */}
                  <circle cx="390" cy="70" r="18" fill="white" stroke="#334155" strokeWidth="1.5" />
                  <circle cx="390" cy="70" r="12" fill={issueResolved ? "#10b981" : "#ef4444"} />
                  <text x="390" y="35" textAnchor="middle" className="fill-slate-600 text-[12px]">Oracle HCM</text>

                  <circle cx="630" cy="70" r="18" fill="#e2e8f0" stroke="#334155" strokeWidth="1.5" />
                  <text x="630" y="35" textAnchor="middle" className="fill-slate-600 text-[12px]">AWS VPC</text>

                  {/* Center service */}
                  <rect x="330" y="140" rx="16" ry="16" width="120" height="40" fill="#dcfce7" stroke="#10b981" strokeWidth="1.5" />
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
                  <ShieldCheck className="h-4 w-4 text-emerald-600" /> Automation Log & Evidence
                </div>
                <div className="text-xs text-slate-500">{new Date().toLocaleDateString()}</div>
              </div>
              <div ref={logRef} className="max-h-40 overflow-auto px-4 py-3 text-xs text-slate-700 space-y-1">
                {audit.length === 0 && (
                  <div className="text-slate-400">No entries yet. The system writes as it acts.</div>
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
            {showStatus && (
              <div className="absolute inset-0 z-50 flex items-start justify-end p-6">
                <div className="relative w-full max-w-lg rounded-xl border border-slate-200 bg-white shadow-xl">
                  <div className="flex items-center justify-between border-b border-slate-200 px-4 py-2">
                    <div className="text-sm font-medium text-slate-700">Stakeholder Update – Draft</div>
                    <button onClick={() => setShowStatus(false)} className="text-slate-500 hover:text-slate-700">✕</button>
                  </div>
                  <div className="px-4 py-3 text-sm text-slate-700 space-y-3">
                    <div>
                      <div className="text-slate-500 text-xs">Subject</div>
                      <div className="font-medium">Service Health Restored – Checkout latency stabilized</div>
                    </div>
                    <div>
                      <div className="text-slate-500 text-xs">Summary</div>
                      <p>Autonomous stabilization scaled replicas and purged cache. SLIs are back within thresholds; monitoring continues.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-xs text-slate-600">
                      <div><span className="font-medium text-slate-700">Start:</span> {new Date().toLocaleTimeString()}</div>
                      <div><span className="font-medium text-slate-700">End:</span> {new Date().toLocaleTimeString()}</div>
                      <div><span className="font-medium text-slate-700">Impact:</span> Checkout (us‑west)</div>
                      <div><span className="font-medium text-slate-700">Status:</span> Resolved</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-2 border-t border-slate-200 px-4 py-3">
                    <button onClick={() => setShowStatus(false)} className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50">Close</button>
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
                    <button onClick={() => setShowRCA(false)} className="text-slate-500 hover:text-slate-700">✕</button>
                  </div>
                  <div className="px-4 py-3 text-sm text-slate-700 space-y-3">
                    <div className="grid grid-cols-2 gap-3 text-xs text-slate-600">
                      <div><span className="font-medium text-slate-700">Incident:</span> INC‑14501</div>
                      <div><span className="font-medium text-slate-700">Severity:</span> Moderate</div>
                      <div><span className="font-medium text-slate-700">Start:</span> {new Date().toLocaleTimeString()}</div>
                      <div><span className="font-medium text-slate-700">End:</span> {new Date().toLocaleTimeString()}</div>
                    </div>
                    <div>
                      <div className="text-slate-500 text-xs">Summary</div>
                      <p>Checkout p95 latency regressed due to read-replica saturation. Automation scaled replicas and purged gateway cache, restoring SLIs.</p>
                    </div>
                    <div>
                      <div className="text-slate-500 text-xs">Root Cause</div>
                      <p>Unexpected traffic burst + inefficient cache invalidation increased DB load.</p>
                    </div>
                    <div>
                      <div className="text-slate-500 text-xs">Corrective / Preventive Actions</div>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Increase auto-scaling floor for read replicas</li>
                        <li>Optimize cache TTLs and invalidation rules</li>
                        <li>Expand SLO alerting for sustained p95 drift</li>
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