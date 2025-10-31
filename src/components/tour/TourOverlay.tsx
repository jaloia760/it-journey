"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useTour } from "./TourProvider";

const MARGIN = 12;
const CARD_MAX_W = 360;
const EDGE_PAD = 16;

export default function TourOverlay() {
  const { activeId, stepIndex, steps, next, prev, stop } = useTour();
  const step = steps[stepIndex];

  if (!activeId || steps.length === 0) return null;

  const [rect, setRect] = useState<DOMRect | null>(null);
  const [cardSize, setCardSize] = useState<{ w: number; h: number }>({ w: CARD_MAX_W, h: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") stop(true);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [stop]);

  // Track target element and keep it in view
  useLayoutEffect(() => {
    if (!step?.attachTo) {
      setRect(null);
      return;
    }
    const el = document.querySelector(step.attachTo) as HTMLElement | null;
    if (!el) {
      setRect(null);
      return;
    }

    const update = () => setRect(el.getBoundingClientRect());
    update();

    // Smoothly center the target when step changes
    try {
      el.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
    } catch {
      /* no-op for unsupported browsers */
    }

    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [step?.attachTo]);

  // Measure tooltip card after it renders to compute placement
  useLayoutEffect(() => {
    if (cardRef.current) {
      const b = cardRef.current.getBoundingClientRect();
      setCardSize({ w: b.width, h: b.height });
    }
  }, [stepIndex, step?.id, rect]);

  // Compute smart position
  let top = EDGE_PAD;
  let left = EDGE_PAD;

  if (rect) {
    // Default position: below the target
    let candidateTop = rect.bottom + MARGIN;

    // If card would overflow bottom, flip above
    if (candidateTop + cardSize.h + EDGE_PAD > window.innerHeight) {
      candidateTop = rect.top - cardSize.h - MARGIN;
    }
    // If still offscreen (very tall card), clamp inside viewport
    candidateTop = Math.max(EDGE_PAD, Math.min(candidateTop, window.innerHeight - cardSize.h - EDGE_PAD));

    // Horizontal placement: align with target left, clamp inside viewport
    let candidateLeft = rect.left;
    candidateLeft = Math.max(EDGE_PAD, Math.min(candidateLeft, window.innerWidth - Math.min(CARD_MAX_W, rect.width) - EDGE_PAD));

    top = candidateTop;
    left = candidateLeft;
  }

  const total = steps.length;
  const isLast = stepIndex === total - 1;

  // Handle Next with possible step-driven action (e.g., click target)
  const handleNext = () => {
    // If this step asks us to click its target, do so before advancing
    if (step && (step as any).action === "click" && step.attachTo) {
      const el = document.querySelector(step.attachTo) as HTMLElement | null;
      if (el) {
        try { el.click(); } catch { /* no-op */ }
      }
    }
    isLast ? stop(true) : next();
  };

  return (
    <div className="fixed inset-0 z-60">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] pointer-events-auto" onClick={() => stop()} />

      {/* Beacon around target */}
      {rect && (
        <div
          className="absolute border-2 border-violet-400/70 rounded-xl animate-pulse"
          style={{
            left: rect.left - 6,
            top: rect.top - 6,
            width: rect.width + 12,
            height: rect.height + 12
          }}
        />
      )}

      {/* Tooltip card */}
      <div
        ref={cardRef}
        className="absolute pointer-events-auto rounded-xl bg-white shadow-2xl border border-slate-200 p-4 max-w-sm"
        style={{ top, left, maxWidth: CARD_MAX_W }}
      >
        <div className="text-xs uppercase tracking-wide text-slate-500 mb-1">Quick tour</div>
        <div className="text-sm font-semibold text-slate-800">{step?.title}</div>
        <div className="text-sm text-slate-600 mt-1">{step?.body}</div>

        <div className="mt-3 flex items-center justify-between">
          <div className="text-xs text-slate-500">{stepIndex + 1} / {total}</div>
          <div className="flex gap-2">
            <button onClick={() => stop(true)} className="text-xs px-2.5 py-1 border border-slate-300 rounded-md hover:bg-slate-50">Skip</button>
            {stepIndex > 0 && (
              <button onClick={() => prev()} className="text-xs px-2.5 py-1 border border-slate-300 rounded-md hover:bg-slate-50">
                Back
              </button>
            )}
            <button
              onClick={handleNext}
              className="text-xs px-3 py-1 rounded-md text-white bg-violet-600 hover:bg-violet-700"
            >
              {isLast ? "Done" : ((step as any)?.action === "click" ? "Open & Next" : "Next")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}