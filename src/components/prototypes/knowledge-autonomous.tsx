

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Bot, BookOpen, FileText, CheckCircle2, Loader2, Sparkles, Pencil, ShieldCheck, Diff, History, AlertTriangle } from "lucide-react";

function fmt(ts: number) {
  const d = new Date(ts);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

export default function KnowledgeAutonomous() {
  const [expanded, setExpanded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stepIdx, setStepIdx] = useState(-1);
  const [audit, setAudit] = useState<{ ts: number; msg: string }[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [showChangeLog, setShowChangeLog] = useState(false);
  const [gapsResolved, setGapsResolved] = useState(false);

  const steps = useMemo(
    () => [
      "Detect coverage gaps & duplication",
      "Generate edits and draft merges",
      "Apply style/SEO lint rules",
      "Auto‑publish low‑risk updates",
      "Route high‑risk to SME with draft",
      "Update search index & telemetry",
    ],
    []
  );

  const logRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!expanded) {
      setProgress(0);
      setStepIdx(-1);
      setAudit([]);
      setGapsResolved(false);
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    setAudit([{ ts: Date.now(), msg: "Autonomous knowledge curation engaged (guardrails ON)" }]);
    let i = -1;
    const total = steps.length;
    timerRef.current = setInterval(() => {
      if (i < total - 1) {
        i++;
        setStepIdx(i);
        setAudit((a) => [...a, { ts: Date.now(), msg: `🤖 ${steps[i]}` }]);
        setProgress(Math.min(100, Math.round(((i + 1) / total) * 92)));
        if (i === 2) setShowPreview(true); // surface preview mid‑flow
      } else {
        setAudit((a) => [
          ...a,
          { ts: Date.now(), msg: "✓ Low‑risk edits published; high‑risk routed to SME" },
          { ts: Date.now(), msg: "Search index refreshed; feedback loops armed" },
        ]);
        setProgress(100);
        setGapsResolved(true);
        if (timerRef.current) clearInterval(timerRef.current);
      }
    }, 650);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [expanded, steps]);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [audit]);

  return (
    <div className="relative">
      {/* Compact preview */}
      {!expanded && (
        <div onClick={() => setExpanded(true)} className="cursor-pointer rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-emerald-600" />
              <h3 className="text-sm font-semibold text-slate-800">Autonomous Knowledge Curation</h3>
            </div>
            <span className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 rounded px-2 py-0.5">Active</span>
          </div>
          <p className="text-sm text-slate-600">System finds gaps, drafts edits, merges duplicates, and publishes low‑risk changes — with full audit.</p>
          <div className="mt-2 rounded-md border border-emerald-100 bg-emerald-50 px-3 py-2 text-xs text-emerald-700">“8 gaps resolved; 3 merges applied; 2 drafts sent to SME.”</div>
        </div>
      )}

      {/* Full modal */}
      {expanded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-5xl w-full mx-4 p-6 relative">
            <button onClick={() => setExpanded(false)} className="absolute top-3 right-4 text-slate-500 hover:text-slate-700">✕</button>

            <div className="mb-4">
              <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <Bot className="h-5 w-5 text-emerald-600" /> Autonomous Knowledge Ops
              </h2>
              <p className="text-slate-500 text-sm">Detect → Edit → Merge → Publish — under policy guardrails with a complete change log.</p>
            </div>

            {/* Red→Green Gaps Map */}
            <div className="grid grid-cols-3 gap-3 mb-5">
              {["VPN Setup", "MFA Reset", "Device Onboarding", "Payroll FAQ", "SaaS Access", "Approval Workflow", "Change Risk", "Service Health", "Incident RCA"].map((label, idx) => (
                <div key={label} className="rounded-lg border border-slate-200 p-3 bg-white">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-xs font-medium text-slate-700 truncate max-w-[140px]">{label}</div>
                    {idx % 3 === 0 ? (
                      <span className={`h-2.5 w-2.5 rounded-full ${gapsResolved ? "bg-emerald-500" : "bg-red-500"}`} />
                    ) : idx % 3 === 1 ? (
                      <span className={`h-2.5 w-2.5 rounded-full ${gapsResolved ? "bg-emerald-500" : "bg-amber-500"}`} />
                    ) : (
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                    )}
                  </div>
                  <div className="text-[11px] text-slate-500 flex items-center gap-1">
                    <FileText className="h-3 w-3 text-slate-400"/>
                    {idx % 3 === 0 ? (gapsResolved ? "Quality raised" : "Gap detected") : idx % 3 === 1 ? (gapsResolved ? "Updated" : "Stale") : "Healthy"}
                  </div>
                </div>
              ))}
            </div>

            {/* Progress */}
            <div className="mb-4">
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
                <div className="h-full rounded-full bg-emerald-600 transition-all" style={{ width: `${progress}%` }} />
              </div>
              <div className="mt-1 flex items-center justify-between text-xs text-slate-500">
                <span>Automation</span>
                <span>{progress}%</span>
              </div>
            </div>

            {/* Timeline + Preview */}
            <div className="grid grid-cols-2 gap-5">
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <h4 className="font-medium text-slate-700 mb-3 flex items-center gap-2"><Sparkles className="h-4 w-4 text-emerald-600"/> Closed‑loop Actions</h4>
                <ul className="text-sm text-slate-700 space-y-2">
                  {steps.map((s, idx) => (
                    <li key={s} className={`flex items-start gap-2 rounded-md border p-2 ${idx < stepIdx ? "border-emerald-200 bg-emerald-50 text-emerald-800" : idx === stepIdx ? "border-emerald-200 bg-emerald-50/60" : "border-slate-200 bg-slate-50"}`}>
                      {idx < stepIdx ? (
                        <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600" />
                      ) : idx === stepIdx ? (
                        <Loader2 className="mt-0.5 h-4 w-4 animate-spin text-emerald-600" />
                      ) : (
                        <History className="mt-0.5 h-4 w-4 text-slate-400" />
                      )}
                      <span className="leading-snug">{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <h4 className="font-medium text-slate-700 mb-3 flex items-center gap-2"><Pencil className="h-4 w-4 text-emerald-600"/> Edit Preview</h4>
                <div className="text-xs text-slate-500 mb-2">Article: VPN Setup (macOS)</div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="rounded-md border border-slate-200 bg-slate-50 p-2">
                    <div className="font-medium text-slate-700 mb-1">Before</div>
                    <p>Open System Settings → Network → VPN. Enter server address. Save.</p>
                  </div>
                  <div className="rounded-md border border-slate-200 bg-slate-50 p-2">
                    <div className="font-medium text-slate-700 mb-1">Proposed</div>
                    <p>Open <b>System Settings → VPN</b>. Click <b>+</b> to add a connection. Set <b>Server</b>, <b>Account Name</b>, and <b>Shared Secret</b>. Test with <b>vpn.company.com</b>. Add troubleshooting note for M‑series macOS 15.</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <button onClick={() => setShowPreview(true)} className="rounded-md bg-slate-900 px-3 py-1.5 text-xs text-white hover:bg-black">Open full preview</button>
                  <button onClick={() => setShowChangeLog(true)} className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50">View change log</button>
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
            {showPreview && (
              <div className="absolute inset-0 z-50 flex items-start justify-end p-6">
                <div className="relative w-full max-w-xl rounded-xl border border-slate-200 bg-white shadow-xl">
                  <div className="flex items-center justify-between border-b border-slate-200 px-4 py-2">
                    <div className="text-sm font-medium text-slate-700">Full Edit Preview – VPN Setup (macOS)</div>
                    <button onClick={() => setShowPreview(false)} className="text-slate-500 hover:text-slate-700">✕</button>
                  </div>
                  <div className="px-4 py-3 text-sm text-slate-700 space-y-3">
                    <div className="rounded-md border border-red-200 bg-red-50 p-2 text-red-700 text-xs">Removed: vague steps; no test target; missing M‑series note.</div>
                    <div className="rounded-md border border-emerald-200 bg-emerald-50 p-2 text-emerald-700 text-xs">Added: explicit fields, test endpoint, and troubleshooting note.</div>
                    <div className="prose prose-sm max-w-none">
                      <h4>Proposed Article</h4>
                      <ol>
                        <li>Open <b>System Settings → VPN</b> and click <b>+</b>.</li>
                        <li>Choose <b>L2TP</b>. Enter <b>Server</b>, <b>Account Name</b>, and <b>Shared Secret</b>.</li>
                        <li>Click <b>Connect</b>. Verify with <code>vpn.company.com</code>.</li>
                        <li><i>Apple Silicon (macOS 15):</i> install helper, then retry.</li>
                      </ol>
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-2 border-t border-slate-200 px-4 py-3">
                    <button onClick={() => setShowPreview(false)} className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50">Close</button>
                    <button className="rounded-md bg-emerald-600 px-3 py-1.5 text-xs text-white hover:bg-emerald-700">Approve & publish</button>
                  </div>
                </div>
              </div>
            )}

            {showChangeLog && (
              <div className="absolute inset-0 z-50 flex items-start justify-end p-6">
                <div className="relative w-full max-w-xl rounded-xl border border-slate-200 bg-white shadow-xl">
                  <div className="flex items-center justify-between border-b border-slate-200 px-4 py-2">
                    <div className="text-sm font-medium text-slate-700">Change Log – Last 5 edits</div>
                    <button onClick={() => setShowChangeLog(false)} className="text-slate-500 hover:text-slate-700">✕</button>
                  </div>
                  <div className="px-4 py-3 text-xs text-slate-700 space-y-2">
                    <div className="flex items-start gap-2"><Diff className="h-3.5 w-3.5 text-emerald-600"/> Merged <b>VPN Setup</b> + <b>VPN Troubleshooting</b> → <i>VPN Setup & Troubleshooting</i></div>
                    <div className="flex items-start gap-2"><Diff className="h-3.5 w-3.5 text-emerald-600"/> Updated <b>MFA Reset</b> with new UI screenshots (Oct 2025)</div>
                    <div className="flex items-start gap-2"><Diff className="h-3.5 w-3.5 text-emerald-600"/> Archived <b>Legacy SSO Guide</b> (replaced by Okta)</div>
                    <div className="flex items-start gap-2"><Diff className="h-3.5 w-3.5 text-emerald-600"/> Added contextual snippet to <b>Device Onboarding</b> flow</div>
                    <div className="flex items-start gap-2"><Diff className="h-3.5 w-3.5 text-emerald-600"/> Refreshed <b>Approval Workflow</b> with new screenshot steps</div>
                  </div>
                  <div className="flex items-center justify-end gap-2 border-t border-slate-200 px-4 py-3">
                    <button onClick={() => setShowChangeLog(false)} className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50">Close</button>
                    <button className="rounded-md bg-slate-900 px-3 py-1.5 text-xs text-white hover:bg-black">Export CSV</button>
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