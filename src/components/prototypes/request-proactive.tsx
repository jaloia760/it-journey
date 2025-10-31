

"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, User, Paperclip, Send, CheckCircle2, Loader2, Globe2, Calendar, FileText, Link as LinkIcon } from "lucide-react";

type Msg = { id: string; from: "freddy" | "user"; text?: string; rich?: React.ReactNode; ts: number };

export default function RequestProactive() {
  const [expanded, setExpanded] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);

  // seed the convo when opened
  useEffect(() => {
    if (!expanded) return;
    const seed: Msg[] = [
      {
        id: "m1",
        from: "freddy",
        ts: Date.now(),
        rich: (
          <div>
            <div className="text-slate-800 font-medium">Hi Jason — quick heads‑up 👋</div>
            <div className="text-slate-700">I noticed your upcoming trip to <span className="font-medium">India</span> (Dec 10–18) from your approved travel request. My records show your work visa <span className="font-medium">expired last month</span>.</div>
          </div>
        ),
      },
      {
        id: "m2",
        from: "freddy",
        ts: Date.now() + 400,
        rich: (
          <div className="space-y-2">
            <div className="text-slate-700">Would you like me to start a <span className="font-medium">visa renewal</span> now? I can pre‑fill forms, collect documents, and book the earliest slot.</div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <button className="rounded-md bg-indigo-600 text-white px-3 py-2 hover:bg-indigo-700" onClick={() => handleQuickAction("start")}>Start renewal</button>
              <button className="rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-700 hover:bg-slate-50" onClick={() => handleQuickAction("notnow")}>Not now</button>
            </div>
          </div>
        ),
      },
    ];
    setMessages(seed);
    // eslint-disable-next-line
  }, [expanded]);

  useEffect(() => {
    if (viewportRef.current) viewportRef.current.scrollTop = viewportRef.current.scrollHeight;
  }, [messages, typing]);

  const push = (m: Msg) => setMessages((prev) => [...prev, m]);

  const handleQuickAction = (which: "start" | "notnow") => {
    if (which === "notnow") {
      push({ id: crypto.randomUUID(), from: "user", ts: Date.now(), text: "Not now" });
      setTyping(true);
      setTimeout(() => {
        setTyping(false);
        push({
          id: crypto.randomUUID(),
          from: "freddy",
          ts: Date.now(),
          text: "No problem. I’ll keep monitoring your itinerary and remind you if timelines get tight.",
        });
      }, 900);
      return;
    }

    // user accepts
    push({ id: crypto.randomUUID(), from: "user", ts: Date.now(), text: "Yes — please start the renewal." });
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      push({
        id: crypto.randomUUID(),
        from: "freddy",
        ts: Date.now(),
        rich: (
          <div className="space-y-2">
            <div className="font-medium text-slate-800">Great — I’ll handle the setup.</div>
            <ul className="text-slate-700 text-sm space-y-1">
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600"/> Pre‑filled renewal form (based on HR profile)</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600"/> Pulled prior visa data & passport scan</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600"/> Tentative appointment windows next week</li>
            </ul>
          </div>
        ),
      });

      // follow up with a smart card
      setTyping(true);
      setTimeout(() => {
        setTyping(false);
        push({
          id: crypto.randomUUID(),
          from: "freddy",
          ts: Date.now(),
          rich: (
            <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-slate-800 font-medium"><Globe2 className="h-4 w-4 text-indigo-600"/> India Visa Renewal</div>
                <span className="text-xs text-slate-500">Case #VR‑18422</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs text-slate-600">
                <div className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5"/> Target travel: Dec 10</div>
                <div className="flex items-center gap-1"><FileText className="h-3.5 w-3.5"/> Form: pre‑filled</div>
                <div className="flex items-center gap-1"><LinkIcon className="h-3.5 w-3.5"/> Checklist ready</div>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <button className="rounded-md bg-emerald-600 text-white px-3 py-2 text-sm hover:bg-emerald-700" onClick={() => confirmDocs()}>Review & submit</button>
                <button className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">View checklist</button>
              </div>
            </div>
          ),
        });
      }, 1000);
    }, 800);
  };

  const confirmDocs = () => {
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      push({ id: crypto.randomUUID(), from: "user", ts: Date.now(), text: "Looks good — submit it." });
      setTyping(true);
      setTimeout(() => {
        setTyping(false);
        push({
          id: crypto.randomUUID(),
          from: "freddy",
          ts: Date.now(),
          rich: (
            <div className="space-y-2">
              <div className="font-medium text-slate-800">Submitted ✅</div>
              <div className="text-slate-700">I filed the renewal, booked <span className="font-medium">Wed 2:15pm</span> at the Seattle center, and emailed the confirmation. I’ll track status and nudge you for anything missing.</div>
            </div>
          ),
        });
      }, 1100);
    }, 900);
  };

  const send = () => {
    if (!input.trim()) return;
    push({ id: crypto.randomUUID(), from: "user", ts: Date.now(), text: input.trim() });
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      push({ id: crypto.randomUUID(), from: "freddy", ts: Date.now(), text: "Got it — I’ll incorporate that into the application package." });
    }, 800);
  };

  return (
    <div className="relative">
      {/* Compact preview */}
      {!expanded && (
        <div onClick={() => setExpanded(true)} className="cursor-pointer rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Bot className="h-4 w-4 text-indigo-600" />
              <h3 className="text-sm font-semibold text-slate-800">Proactive Employee Assist</h3>
            </div>
            <span className="text-xs text-slate-500">Proactive View</span>
          </div>
          <p className="text-sm text-slate-600">Freddy spots travel to India and offers to renew an expired visa — before it blocks the trip.</p>
          <div className="mt-2 rounded-md border border-indigo-100 bg-indigo-50 px-3 py-2 text-xs text-indigo-700">“I noticed your India travel — want me to start the visa renewal?”</div>
          <div className="mt-2 text-[11px] text-slate-400">Click to open conversation →</div>
        </div>
      )}

      {/* Full chat modal */}
      {expanded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full mx-4 p-0 relative overflow-hidden">
            <button onClick={() => setExpanded(false)} className="absolute top-3 right-4 z-10 text-slate-500 hover:text-slate-700">✕</button>

            {/* Header */}
            <div className="border-b border-slate-200 px-5 py-3 flex items-center gap-2">
              <Bot className="h-5 w-5 text-indigo-600" />
              <div className="font-medium text-slate-800">Freddy • Travel & HR Assistant</div>
            </div>

            {/* Chat viewport */}
            <div ref={viewportRef} className="h-[480px] overflow-auto bg-slate-50 px-5 py-4 space-y-3">
              {messages.map((m) => (
                <Bubble key={m.id} from={m.from}>
                  {m.rich ? m.rich : <span>{m.text}</span>}
                </Bubble>
              ))}
              {typing && (
                <div className="flex gap-2 text-slate-500 text-xs items-center">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Freddy is typing…
                </div>
              )}
            </div>

            {/* Composer */}
            <div className="border-t border-slate-200 bg-white px-4 py-3">
              <div className="flex items-center gap-2">
                <button className="rounded-md border border-slate-300 bg-white px-2 py-2 text-slate-700 hover:bg-slate-50" title="Attach"><Paperclip className="h-4 w-4"/></button>
                <input
                  className="flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Type a message…"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && send()}
                />
                <button onClick={send} className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-3 py-2 text-sm text-white hover:bg-indigo-700"><Send className="h-4 w-4"/> Send</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Bubble({ from, children }: { from: "freddy" | "user"; children: React.ReactNode }) {
  const isUser = from === "user";
  return (
    <div className={"flex " + (isUser ? "justify-end" : "justify-start") }>
      <div className={
        "max-w-[75%] rounded-2xl px-3 py-2 text-sm shadow-sm " +
        (isUser
          ? "bg-slate-900 text-white rounded-tr-sm"
          : "bg-white text-slate-800 border border-slate-200 rounded-tl-sm")
      }>
        <div className="flex items-center gap-2 mb-1 text-[11px] text-slate-500">
          {isUser ? <User className="h-3 w-3"/> : <Bot className="h-3 w-3 text-indigo-600"/>}
          <span>{isUser ? "You" : "Freddy"}</span>
        </div>
        <div className="leading-relaxed">{children}</div>
      </div>
    </div>
  );
}