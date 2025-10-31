

// Autonomous Asset Management UI: Visualizes self-healing and optimization actions
"use client";

import { useEffect, useState } from "react";
import { Cpu, HardDrive, CheckCircle2, Loader2, Wrench } from "lucide-react";

export default function AssetAutonomous() {
  const [expanded, setExpanded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [actions, setActions] = useState<string[]>([]);

  useEffect(() => {
    if (!expanded) return;

    const sequence = [
      "Detecting degraded components via telemetry",
      "Correlating temperature spikes with CPU utilization",
      "Auto‑isolating faulty module (Node‑2) from cluster",
      "Redeploying workloads to healthy nodes",
      "Triggering predictive cooling adjustment",
      "Auto‑ordering replacement part via approved vendor",
      "Updating CMDB and closing maintenance ticket",
    ];

    let step = 0;
    setActions([]); // Reset actions when opening
    setProgress(0);
    const interval = setInterval(() => {
      if (step < sequence.length) {
        setActions((a) => [...a, sequence[step]]);
        step++;
        setProgress(((step + 1) / sequence.length) * 100);
      } else {
        clearInterval(interval);
      }
    }, 1200);

    return () => clearInterval(interval);
  }, [expanded]);

  return (
    <div className="relative">
      {!expanded && (
        <div
          onClick={() => setExpanded(true)}
          className="cursor-pointer rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md transition-all duration-200"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <HardDrive className="h-4 w-4 text-indigo-600" />
              <h3 className="text-sm font-semibold text-slate-800">Autonomous Asset Optimization</h3>
            </div>
            <span className="text-xs text-slate-500">Autonomous View</span>
          </div>
          <p className="text-sm text-slate-600">Freddy autonomously detects, heals, and optimizes infrastructure without human intervention.</p>
          <div className="mt-3 rounded-md border border-emerald-100 bg-emerald-50 px-3 py-2 text-xs text-emerald-700">“Cluster health restored automatically — Node‑2 replaced and workloads balanced.”</div>
        </div>
      )}

      {expanded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full mx-4 p-6 relative overflow-hidden">
            <button onClick={() => setExpanded(false)} className="absolute top-3 right-4 text-slate-500 hover:text-slate-700">✕</button>

            <div className="border-b border-slate-200 pb-3 mb-4 flex items-center gap-2">
              <Cpu className="h-5 w-5 text-indigo-600" />
              <div className="font-medium text-slate-800">Autonomous Asset Intelligence</div>
            </div>

            <p className="text-sm text-slate-600 mb-4">Freddy continuously monitors hardware and infrastructure telemetry to predict and resolve issues before impact — achieving a self‑healing asset ecosystem.</p>

            {/* Visualization */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <h4 className="text-sm font-medium text-slate-700 mb-2 flex items-center gap-1"><HardDrive className="h-4 w-4 text-indigo-600" /> Cluster Overview</h4>
                <svg viewBox="0 0 360 180" className="w-full h-40">
                  <defs>
                    <marker id="arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto" markerUnits="strokeWidth">
                      <path d="M0,0 L8,4 L0,8 L2,4 Z" fill="#475569" />
                    </marker>
                  </defs>
                  {/* Node 1: always healthy */}
                  <circle cx="90" cy="90" r="25" fill="#10b981" />
                  <text x="90" y="95" textAnchor="middle" className="fill-white text-[11px]">Node‑1</text>
                  {/* Node 2: transitions from red (faulty) to green (healthy) */}
                  <circle cx="180" cy="90" r="25" fill={progress < 50 ? "#ef4444" : "#10b981"} />
                  <text x="180" y="95" textAnchor="middle" className="fill-white text-[11px]">Node‑2</text>
                  {/* Node 3: always healthy */}
                  <circle cx="270" cy="90" r="25" fill="#10b981" />
                  <text x="270" y="95" textAnchor="middle" className="fill-white text-[11px]">Node‑3</text>
                  {/* Arrows between nodes */}
                  <path d="M115,90 L155,90" stroke="#475569" strokeWidth="2" markerEnd="url(#arrow)" />
                  <path d="M205,90 L245,90" stroke="#475569" strokeWidth="2" markerEnd="url(#arrow)" />
                </svg>
              </div>

              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <h4 className="text-sm font-medium text-slate-700 mb-2 flex items-center gap-1"><Wrench className="h-4 w-4 text-indigo-600" /> Live Autonomous Actions</h4>
                <div className="max-h-[150px] overflow-auto text-xs text-slate-700 space-y-1">
                  {actions.length === 0 && <div className="text-slate-400">Monitoring telemetry...</div>}
                  {actions.map((a, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className={`h-3.5 w-3.5 mt-0.5 ${i === actions.length - 1 ? "text-emerald-600" : "text-slate-500"}`} />
                      <span>{a}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden mb-2">
              <div className="h-2 bg-emerald-500 transition-all duration-700" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="text-xs text-slate-500 mb-4">Autonomous healing progress: {Math.floor(progress)}%</div>

            {/* Outcome summary */}
            {progress >= 100 ? (
              <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
                <h4 className="font-medium mb-1">Outcome Summary</h4>
                <ul className="list-disc ml-5 space-y-1">
                  <li>Cluster restored to full health (3/3 nodes active).</li>
                  <li>Replacement hardware request auto‑submitted.</li>
                  <li>Updated CMDB and incident closed autonomously.</li>
                  <li>Operator notified via Slack + Email summary.</li>
                </ul>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-slate-500 text-xs">
                <Loader2 className="h-3.5 w-3.5 animate-spin" /> Autonomous remediation in progress…
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}