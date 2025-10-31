// src/components/prototypes/request-autonomous.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import {
  Loader2,
  CheckCircle2,
  Server,
  FileCog,
  Cpu,
  Package,
  Bell,
  ShieldCheck,
  CalendarDays,
  Users,
  Laptop,
  KeyRound,
} from "lucide-react";

type Hire = { name: string; role: string; location: string; start: string; device: string };

export default function RequestAutonomous() {
  const [expanded, setExpanded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(0);
  const [audit, setAudit] = useState<{ ts: number; msg: string }[]>([]);
  const logRef = useRef<HTMLDivElement>(null);

  const hires: Hire[] = [
    { name: "Jane Doe", role: "AE, Sales", location: "San Francisco", start: "Dec 02", device: "MacBook Air 13” (M3)" },
    { name: "Arjun Mehta", role: "Support Engineer", location: "Bengaluru", start: "Dec 03", device: "ThinkPad T14" },
    { name: "Priya Shah", role: "PMM", location: "London", start: "Dec 05", device: "MacBook Pro 14” (M3)" },
    { name: "Leo Kim", role: "Data Analyst", location: "Austin", start: "Dec 09", device: "Dell XPS 13" },
  ];

  const steps = [
    { label: "Survey HRIS onboarding schedule (next 2 weeks)", icon: <CalendarDays className="h-4 w-4 text-indigo-600" /> },
    { label: "Correlate roles → device & app bundles", icon: <FileCog className="h-4 w-4 text-indigo-600" /> },
    { label: "Predict demand & pre‑approve under guardrails", icon: <ShieldCheck className="h-4 w-4 text-emerald-600" /> },
    { label: "Auto‑create POs & dispatch shipments", icon: <Package className="h-4 w-4 text-indigo-600" /> },
    { label: "Pre‑provision SaaS access bundles", icon: <KeyRound className="h-4 w-4 text-indigo-600" /> },
    { label: "Track fulfillment & close requests", icon: <Cpu className="h-4 w-4 text-indigo-600" /> },
  ];

  useEffect(() => {
    if (!expanded) return;

    setAudit([{ ts: Date.now(), msg: "Autonomous request engine engaged (onboarding cohort detection)" }]);

    const timer = setInterval(() => {
      setProgress((p) => Math.min(p + 17, 100));
      setStage((s) => (s < steps.length - 1 ? s + 1 : s));
    }, 1100);
    return () => clearInterval(timer);
  }, [expanded]);

  // Stream audit entries as stages advance
  useEffect(() => {
    const t = Date.now();
    if (stage === 0) {
      setAudit((a) => [
        ...a,
        { ts: t, msg: `Found ${hires.length} upcoming hires in HRIS (next 14 days)` },
      ]);
    }
    if (stage === 1) {
      setAudit((a) => [
        ...a,
        { ts: t, msg: "Mapped roles to standard device profiles & app bundles" },
      ]);
    }
    if (stage === 2) {
      setAudit((a) => [
        ...a,
        { ts: t, msg: "Guardrails: budget < $2,000 per hire; vendor SLAs verified" },
        { ts: t + 50, msg: "Pre‑approvals applied (policy: New‑Hire Essentials)" },
      ]);
    }
    if (stage === 3) {
      // Per‑hire device orders
      hires.forEach((h, i) => {
        setAudit((a) => [
          ...a,
          { ts: t + i * 80, msg: `PO#${18420 + i} – Ordered ${h.device} for ${h.name} (${h.location})` },
        ]);
      });
      setAudit((a) => [
        ...a,
        { ts: t + 400, msg: "Dispatch notifications sent to vendor & warehouse" },
      ]);
    }
    if (stage === 4) {
      setAudit((a) => [
        ...a,
        { ts: t, msg: "Provisioned bundles: Okta, Google Workspace, Slack, Freshservice" },
        { ts: t + 60, msg: "Applied group policies by role & region" },
      ]);
    }
    if (stage === 5) {
      hires.forEach((h, i) => {
        setAudit((a) => [
          ...a,
          { ts: t + i * 70, msg: `Shipment created – ${h.device} → ${h.location} (for ${h.name})` },
        ]);
      });
      setAudit((a) => [
        ...a,
        { ts: t + 380, msg: "All requests closed with tracking links posted to HR ticket" },
      ]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage]);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [audit]);

  return (
    <div className="relative">
      {!expanded && (
        <div
          onClick={() => setExpanded(true)}
          className="cursor-pointer rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md transition-all duration-200"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Cpu className="h-4 w-4 text-indigo-600" />
              <h3 className="text-sm font-semibold text-slate-800">Autonomous Request Fulfillment</h3>
            </div>
            <span className="text-xs text-slate-500">Autonomous View</span>
          </div>
          <p className="text-sm text-slate-600">Freddy surveys the onboarding schedule, predicts needs, and fulfills requests — before Day 1.</p>
          <div className="mt-3 rounded-md border border-emerald-100 bg-emerald-50 px-3 py-2 text-xs text-emerald-700">“Detected cohort of {hires.length} new hires — initiating pre‑provision and procurement.”</div>
        </div>
      )}

      {expanded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-5xl w-full mx-4 p-6 relative overflow-hidden">
            <button onClick={() => setExpanded(false)} className="absolute top-3 right-4 z-10 text-slate-500 hover:text-slate-700">✕</button>

            {/* Header */}
            <div className="border-b border-slate-200 pb-3 mb-4 flex items-center gap-2">
              <Cpu className="h-5 w-5 text-indigo-600" />
              <div className="font-medium text-slate-800">Autonomous Request Engine</div>
            </div>

            {/* Onboarding survey */}
            <div className="rounded-lg border border-slate-200 bg-white p-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-slate-800 font-medium"><Users className="h-4 w-4 text-indigo-600"/> Upcoming Onboarding (next 2 weeks)</div>
                <div className="text-xs text-slate-500">Source: HRIS</div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                {hires.map((h) => (
                  <div key={h.name} className="rounded-md border border-slate-200 bg-slate-50 p-3">
                    <div className="font-medium text-slate-800">{h.name}</div>
                    <div className="text-slate-600">{h.role}</div>
                    <div className="text-slate-500 text-xs">{h.location} • Starts {h.start}</div>
                    <div className="mt-2 inline-flex items-center gap-1 rounded-full border border-slate-300 bg-white px-2 py-0.5 text-xs text-slate-700"><Laptop className="h-3.5 w-3.5"/> {h.device}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress */}
            <div className="mb-4">
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-2 bg-emerald-500 transition-all duration-700" style={{ width: `${progress}%` }}></div>
              </div>
              <div className="text-xs text-slate-500 mt-1">Automation progress: {progress}%</div>
            </div>

            {/* Steps */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              {steps.map((s, i) => (
                <div key={i} className={`flex items-start gap-2 rounded-lg border p-3 transition-all duration-300 ${i <= stage ? "border-emerald-300 bg-emerald-50" : "border-slate-200 bg-white"}`}>
                  {i <= stage ? <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5" /> : s.icon}
                  <div className={`text-sm ${i <= stage ? "text-emerald-700" : "text-slate-700"}`}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Audit log */}
            <div className="rounded-lg border border-slate-200 bg-white">
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
                    <span className="tabular-nums text-slate-500 w-16">{new Date(row.ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}</span>
                    <span>{row.msg}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Outcome summary */}
            {progress >= 100 && (
              <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                <h4 className="font-medium text-emerald-800 mb-2">Outcome Summary</h4>
                <ul className="text-sm text-emerald-700 list-disc ml-5 space-y-1">
                  <li>{hires.length} device orders placed at bulk rate; tracking details posted to HR ticket.</li>
                  <li>Access bundles provisioned and aligned to role/region policies.</li>
                  <li>All requests closed; Day‑1 readiness confirmed for the cohort.</li>
                </ul>
              </div>
            )}

            {progress < 100 && (
              <div className="flex items-center gap-2 text-slate-500 mt-3 text-xs">
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Executing autonomous fulfillment…
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}