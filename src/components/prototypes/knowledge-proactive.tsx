

// src/components/prototypes/knowledge-proactive.tsx

"use client";

import { useState, useEffect } from "react";
import { BookOpen, Search, CheckCircle2, Loader2, Lightbulb } from "lucide-react";

export default function KnowledgeProactive() {
  const [expanded, setExpanded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    if (!expanded) return;
    const ideas = [
      "Detected 15 duplicate solution articles across IT & HR categories",
      "Found 4 outdated procedures last modified > 18 months ago",
      "Suggested merging 'VPN Setup' and 'VPN Troubleshooting' articles",
      "Identified trending searches: 'reset MFA', 'device onboarding', 'approval workflow'",
      "Drafted contextual knowledge snippets based on chat transcripts",
    ];
    let step = 0;
    const timer = setInterval(() => {
      if (step < ideas.length) {
        setSuggestions((prev) => [...prev, ideas[step]]);
        step++;
        setProgress(((step + 1) / ideas.length) * 100);
      } else clearInterval(timer);
    }, 1000);
    return () => clearInterval(timer);
  }, [expanded]);

  return (
    <div className="relative">
      {!expanded && (
        <div
          onClick={() => setExpanded(true)}
          className="cursor-pointer rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md transition-all duration-200"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-indigo-600" />
              <h3 className="text-sm font-semibold text-slate-800">Proactive Knowledge Curation</h3>
            </div>
            <span className="text-xs text-slate-500">Proactive View</span>
          </div>
          <p className="text-sm text-slate-600 mb-2">Freddy analyzes usage patterns and proactively curates content — reducing duplication, improving findability, and enriching answers.</p>
          <div className="mt-2 rounded-md border border-emerald-100 bg-emerald-50 px-3 py-2 text-xs text-emerald-700">“4 articles identified as stale or redundant — draft update ready for review.”</div>
        </div>
      )}

      {expanded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full mx-4 p-6 relative overflow-hidden">
            <button onClick={() => setExpanded(false)} className="absolute top-3 right-4 text-slate-500 hover:text-slate-700">✕</button>

            <div className="border-b border-slate-200 pb-3 mb-4 flex items-center gap-2">
              <Search className="h-5 w-5 text-indigo-600" />
              <div className="font-medium text-slate-800">Freddy Suggests Knowledge Base Improvements</div>
            </div>

            <p className="text-sm text-slate-600 mb-4">Freddy proactively audits and improves your knowledge base for freshness, relevance, and semantic coverage — ensuring employees always find the best answers first.</p>

            {/* Suggestions Feed */}
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 mb-4">
              <h4 className="text-sm font-medium text-slate-700 mb-2 flex items-center gap-1"><Lightbulb className="h-4 w-4 text-amber-500" /> Insights & Actions</h4>
              <div className="text-xs text-slate-700 space-y-2">
                {suggestions.length === 0 && <div className="text-slate-400">Scanning articles and feedback...</div>}
                {suggestions.map((s, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 className={`h-3.5 w-3.5 mt-0.5 ${i === suggestions.length - 1 ? 'text-emerald-600' : 'text-slate-500'}`} />
                    <span>{s}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress bar */}
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden mb-2">
              <div className="h-2 bg-emerald-500 transition-all duration-700" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="text-xs text-slate-500 mb-3">Audit progress: {Math.floor(progress)}%</div>

            {/* Outcome summary */}
            {progress >= 100 ? (
              <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
                <h4 className="font-medium mb-1">Outcome Summary</h4>
                <ul className="list-disc ml-5 space-y-1">
                  <li>Duplicate articles merged automatically with metadata preservation.</li>
                  <li>4 stale articles queued for SME review and update.</li>
                  <li>New contextual snippets published to relevant workflows.</li>
                  <li>Knowledge accuracy score improved by 23%.</li>
                </ul>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-slate-500 text-xs">
                <Loader2 className="h-3.5 w-3.5 animate-spin" /> Proactive content audit in progress…
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}