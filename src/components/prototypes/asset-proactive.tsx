"use client";

import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { Wrench, Cpu, HardDrive, Laptop, CheckCircle2, AlertTriangle, Loader2, ShieldCheck } from "lucide-react";

type AssetType = "Laptop" | "Server" | "Router";
type StatusType = "Healthy" | "Warning" | "Critical";
type ConditionType = StatusType;

interface Asset {
  id: string;
  type: AssetType;
  name: string;
  owner: string;
  condition: ConditionType;
  status: StatusType;
  lastCheck: string;
}

export default function AssetProactive() {
  const [expanded, setExpanded] = useState(false);
  const [progress, setProgress] = useState(0);

  const initialAssets: Asset[] = [
    { id: "AS-1001", type: "Laptop", name: "MacBook Pro 14” M3", owner: "Jane Doe", condition: "Healthy", status: "Healthy", lastCheck: "2 days ago" },
    { id: "AS-1002", type: "Server", name: "Dell PowerEdge R750", owner: "IT Infra", condition: "Warning", status: "Warning", lastCheck: "7 days ago" },
    { id: "AS-1003", type: "Router", name: "Cisco Catalyst 9400", owner: "Network Team", condition: "Critical", status: "Critical", lastCheck: "12 days ago" },
    { id: "AS-1004", type: "Laptop", name: "ThinkPad T14", owner: "Arjun Mehta", condition: "Healthy", status: "Healthy", lastCheck: "3 days ago" },
  ];
  const [assets, setAssets] = useState<Asset[]>(initialAssets);

  useEffect(() => {
    if (!expanded) return;
    if (progress === 0) return;
    if (progress >= 100) return;
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(timer);
          return 100;
        }
        const next = Math.min(p + 20, 100);

        // Update asset health as progress crosses thresholds
        if (p < 40 && next >= 40) {
          // Patch drift addressed on server
          setAssets((prev) => prev.map(a => a.id === "AS-1002" ? { ...a, condition: "Healthy", status: "Healthy", lastCheck: "just now" } : a));
        }
        if (p < 70 && next >= 70) {
          // Router critical -> warning after isolation
          setAssets((prev) => prev.map(a => a.id === "AS-1003" ? { ...a, condition: "Warning", status: "Warning", lastCheck: "just now" } : a));
        }
        if (p < 90 && next >= 90) {
          // Router warning -> healthy after remediation
          setAssets((prev) => prev.map(a => a.id === "AS-1003" ? { ...a, condition: "Healthy", status: "Healthy", lastCheck: "just now" } : a));
        }

        return next;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [expanded, progress]);

  const getStatusIcon = (status: StatusType): ReactNode => {
    if (status === "Critical") return <AlertTriangle className="h-5 w-5 text-red-600" />;
    if (status === "Warning") return <Wrench className="h-5 w-5 text-amber-500" />;
    return <CheckCircle2 className="h-5 w-5 text-emerald-600" />;
  };

  const getTypeIcon = (type: AssetType): ReactNode => {
    switch(type) {
      case "Laptop": return <Laptop className="h-4 w-4 text-slate-400" />;
      case "Server": return <HardDrive className="h-4 w-4 text-slate-400" />;
      case "Router": return <Cpu className="h-4 w-4 text-slate-400" />;
      default: return <HardDrive className="h-4 w-4 text-slate-400" />;
    }
  };

  return (
    <div className="relative">
      {!expanded && (
        <div
          onClick={() => setExpanded(true)}
          className="cursor-pointer rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md transition-all duration-200"
          aria-label="Open Proactive Asset Maintenance"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if(e.key === 'Enter' || e.key === ' ') setExpanded(true); }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <HardDrive className="h-5 w-5 text-indigo-600" />
              <h3 className="text-sm font-semibold text-slate-800">Proactive Asset Maintenance</h3>
            </div>
            <span className="text-xs text-slate-500">Proactive View</span>
          </div>

          <p className="text-sm text-slate-600 mb-2">
            Freddy analyzes asset telemetry and detects early warning signals to trigger preventive maintenance before failures occur.
          </p>
          <div className="mt-3 rounded-md border border-emerald-100 bg-emerald-50 px-3 py-2 text-xs text-emerald-700">
            “3 assets show aging patterns or patch drift. Recommend running automated maintenance.”
          </div>
        </div>
      )}

      {expanded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="maintenance-plan-title">
          <div className="bg-white rounded-xl shadow-2xl max-w-5xl w-full mx-4 p-6 relative overflow-hidden">
            <button
              onClick={() => { setExpanded(false); setProgress(0); setAssets(initialAssets); }}
              className="absolute top-3 right-4 z-10 text-slate-500 hover:text-slate-700"
              aria-label="Close Maintenance Plan"
            >
              ✕
            </button>

            <div className="border-b border-slate-200 pb-3 mb-4 flex items-center gap-2" id="maintenance-plan-title">
              <Cpu className="h-5 w-5 text-indigo-600" />
              <div className="font-medium text-slate-800">Freddy Suggests Preventive Maintenance Plan</div>
            </div>

            <p className="text-sm text-slate-600 mb-4">
              Freddy continuously monitors asset health indicators — temperature, patch levels, and warranty status — predicting potential degradation and scheduling maintenance autonomously.
            </p>

            {/* Asset Table */}
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="py-2 px-3">Type</th>
                    <th className="py-2 px-3">Asset Name</th>
                    <th className="py-2 px-3">Owner</th>
                    <th className="py-2 px-3">Condition</th>
                    <th className="py-2 px-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {assets.map((asset) => (
                    <tr key={asset.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="py-2 px-3 flex items-center gap-1 text-slate-600">{getTypeIcon(asset.type)} {asset.type}</td>
                      <td className="py-2 px-3 font-medium text-slate-800">{asset.name}</td>
                      <td className="py-2 px-3 text-slate-700">{asset.owner}</td>
                      <td className={`py-2 px-3 font-semibold transition-colors duration-500 ${asset.condition === "Critical" ? "text-red-600" : asset.condition === "Warning" ? "text-amber-600" : "text-emerald-600"}`}>
                        {asset.condition}
                      </td>
                      <td className="py-2 px-3">{getStatusIcon(asset.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Freddy Suggestion */}
            <div className="mb-4 rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800 flex items-center gap-2">
              <Wrench className="h-5 w-5" />
              Freddy suggests running preventive maintenance and applying software patches to reduce risk and improve asset reliability.
            </div>

            {/* Run Maintenance Plan */}
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-slate-800 flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-emerald-600" />
                Run Maintenance Plan
              </h4>
              {progress === 0 && (
                <button
                  onClick={() => { setAssets(initialAssets); setProgress(10); }}
                  className="px-4 py-1.5 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  aria-label="Execute Maintenance Plan"
                >
                  Execute Maintenance
                </button>
              )}
            </div>

            {/* Progress Bar */}
            <div className="h-3 bg-slate-100 rounded-full overflow-hidden mb-2" aria-label="Maintenance progress">
              <div
                className="h-3 bg-emerald-500 transition-all duration-700"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            {/* Progress Status or Results */}
            {progress > 0 && progress < 100 ? (
              <div className="flex items-center gap-2 text-slate-500 mt-2 text-sm" role="status" aria-live="polite">
                <Loader2 className="h-5 w-5 animate-spin" />
                Running proactive maintenance across {assets.length} assets...
              </div>
            ) : progress === 100 ? (
              <div
                className="mt-3 rounded-md border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800"
                role="alert"
                aria-live="assertive"
              >
                <ul className="list-disc ml-5 space-y-2">
                  <li>All 3 flagged assets patched successfully.</li>
                  <li>Performance degradation mitigated with thermal recalibration.</li>
                  <li>Warranty renewal requests auto-generated for expiring devices.</li>
                  <li>Asset statuses updated and flagged as resolved.</li>
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
