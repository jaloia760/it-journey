"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Sparkles,
  Activity,
  AlertTriangle,
  OctagonAlert,
  Info,
  Play,
  Loader2,
  CheckCircle2,
  Clock,
  ShieldCheck,
} from "lucide-react";

function fmt(ts: number) {
  const d = new Date(ts);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

export default function IncidentProactive() {
  const [expanded, setExpanded] = useState(false);
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stepIdx, setStepIdx] = useState(-1);
  const [audit, setAudit] = useState<{ ts: number; msg: string }[]>([]);

  const steps = useMemo(
    () => [
      "Validate service impact & change window",
      "Quarantine noisy duplicates (correlation rule 17)",
      "Scale DB read replicas to +2",
      "Revert schema migration 2025-10-29T10:45Z",
      "Run post-change health checks",
      "Notify service owners & update status page",
    ],
    []
  );

  const logRef = useRef<HTMLDivElement>(null);

  // Animate the runbook execution
  useEffect(() => {
    if (!running) return;

    setAudit((a) => [
      ...a,
      { ts: Date.now(), msg: "Runbook started by Freddy guidance (guardrails enabled)" },
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
          { ts: Date.now(), msg: "✓ All steps executed successfully" },
          { ts: Date.now(), msg: "RCA draft prepared; incident notes updated" },
          { ts: Date.now(), msg: "Change log + evidence appended for audit" },
        ]);
        setProgress(100);
        clearInterval(timer);
        setTimeout(() => setRunning(false), 700);
      }
    }, 600);

    return () => clearInterval(timer);
  }, [running, steps]);

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
              <Activity className="h-4 w-4 text-indigo-600" />
              <h3 className="text-sm font-semibold text-slate-800">
                Incident Correlation & Insights
              </h3>
            </div>
            <span className="text-xs text-slate-500">Proactive View</span>
          </div>

          <div className="space-y-2 text-sm text-slate-600">
            <p>
              Freddy AI has identified <strong>3 related alerts</strong> and
              suggests possible root cause based on recent changes.
            </p>
            <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-100 p-2 rounded-md text-indigo-700">
              <Sparkles size={14} />
              <span>“Database latency increase likely due to schema migration.”</span>
            </div>
            <p className="text-xs text-slate-400">
              Click to explore full correlation graph &amp; suggested runbooks →
            </p>
          </div>
        </div>
      )}

      {/* Full view overlay */}
      {expanded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full mx-4 p-6 relative">
            <button
              onClick={() => setExpanded(false)}
              className="absolute top-3 right-4 text-slate-500 hover:text-slate-700"
            >
              ✕
            </button>

            <div className="mb-5">
              <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <Activity className="h-5 w-5 text-indigo-600" />
                Proactive Incident Intelligence
              </h2>
              <p className="text-slate-500 text-sm">
                Unified telemetry and contextual AI insights help IT teams act before users notice.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-5">
              {/* Left: Related Alerts with severity */}
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <h4 className="font-medium text-slate-700 mb-3 flex items-center gap-2">
                  <AlertTriangle size={16} className="text-amber-500" /> Related Alerts
                </h4>

                <div className="space-y-2 text-sm">
                  {/* Critical */}
                  <div className="flex items-start gap-3 rounded-md border border-rose-200 bg-rose-50 p-2">
                    <OctagonAlert className="h-4 w-4 text-rose-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-rose-700">DB query latency exceeded threshold (Critical)</div>
                      <div className="text-rose-700/80 text-xs">Impact: Checkout service, Region: us-west</div>
                    </div>
                  </div>
                  {/* Warning */}
                  <div className="flex items-start gap-3 rounded-md border border-amber-200 bg-amber-50 p-2">
                    <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-amber-700">CPU spike detected on db-primary-us2 (Warning)</div>
                      <div className="text-amber-700/80 text-xs">Node: ip-10-2-14-33 | 5m avg: 82%</div>
                    </div>
                  </div>
                  {/* Info */}
                  <div className="flex items-start gap-3 rounded-md border border-sky-200 bg-sky-50 p-2">
                    <Info className="h-4 w-4 text-sky-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-sky-700">App error rate +35% vs baseline (Info)</div>
                      <div className="text-sky-700/80 text-xs">Service: web-api | Window: 10m</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Freddy runbook panel */}
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <h4 className="font-medium text-slate-700 mb-2 flex items-center gap-2">
                  <Sparkles size={16} className="text-indigo-600" /> Freddy Suggests this Runbook
                </h4>

                {/* Progress bar when running */}
                {running && (
                  <div className="mb-3">
                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
                      <div
                        className="h-full rounded-full bg-indigo-600 transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <div className="mt-1 flex items-center justify-between text-xs text-slate-500">
                      <span>Progress</span>
                      <span>{progress}%</span>
                    </div>
                  </div>
                )}

                {/* Steps list */}
                <ul className="text-sm text-slate-700 space-y-2">
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

                {/* Action button */}
                {!running ? (
                  <button
                    onClick={() => setRunning(true)}
                    className="mt-3 flex items-center gap-2 rounded-md bg-indigo-600 text-white text-sm px-3 py-2 hover:bg-indigo-700"
                  >
                    <Play size={14} /> Execute Runbook
                  </button>
                ) : (
                  <div className="mt-3 inline-flex items-center gap-2 rounded-md bg-slate-100 px-3 py-1.5 text-xs text-slate-600">
                    <Loader2 className="h-3.5 w-3.5 animate-spin" /> Running with guardrails
                  </div>
                )}
              </div>
            </div>

            {/* Audit log */}
            <div className="mt-5 rounded-lg border border-slate-200 bg-white">
              <div className="flex items-center justify-between border-b border-slate-200 px-4 py-2">
                <div className="flex items-center gap-2 text-slate-700 text-sm font-medium">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" /> Execution Log & Evidence
                </div>
                <div className="text-xs text-slate-400">{audit.length} events</div>
              </div>
              <div
                ref={logRef}
                className="max-h-40 overflow-y-auto px-4 py-2 text-xs font-mono text-slate-700 space-y-1"
                style={{ minHeight: "64px" }}
              >
                {audit.length === 0 && (
                  <div className="text-slate-400 italic">No audit events yet.</div>
                )}
                {audit.map((e, i) => (
                  <div key={i}>
                    <span className="text-slate-400">{fmt(e.ts)} </span>
                    <span>{e.msg}</span>
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
