"use client";
import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import TourOverlay from "./TourOverlay";

type Step = { id: string; title: string; body: string; attachTo?: string; placement?: "top"|"bottom"|"left"|"right" };
type TourConfig = { id: string; steps: Step[] };

type Ctx = {
  activeId: string | null;
  stepIndex: number;
  steps: Step[];
  start: (config: TourConfig) => void;
  next: () => void;
  prev: () => void;
  stop: (remember?: boolean) => void;
};

const TourCtx = createContext<Ctx | null>(null);
export const useTour = () => useContext(TourCtx)!;

const LS_KEY = "itjourney.tour.dismissed";

export default function TourProvider({ children }: { children: React.ReactNode }) {
  const [dismissed, setDismissed] = useState(false);
  const [activeId, setActiveId] = useState<string|null>(null);
  const [steps, setSteps] = useState<Step[]>([]);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => { setDismissed(localStorage.getItem(LS_KEY) === "1"); }, []);

  useEffect(() => {
    const handleRoute = () => {
      setDismissed(localStorage.getItem(LS_KEY) === "1");
      setActiveId(null);
      setSteps([]);
      setStepIndex(0);
    };
    window.addEventListener('popstate', handleRoute);
    return () => window.removeEventListener('popstate', handleRoute);
  }, []);

  const start = useCallback((cfg: TourConfig) => {
    if (dismissed) return;
    if (activeId === cfg.id && steps.length > 0) return;
    setActiveId(cfg.id);
    setSteps(cfg.steps);
    setStepIndex(0);
  }, [dismissed, activeId, steps.length]);

  const next = useCallback(() => {
    setStepIndex(i => Math.min(i + 1, steps.length - 1));
  }, [steps.length]);

  const prev = useCallback(() => {
    setStepIndex(i => Math.max(i - 1, 0));
  }, []);

  const stop = useCallback((remember?: boolean) => {
    setActiveId(null);
    setSteps([]);
    setStepIndex(0);
    if (remember) {
      localStorage.setItem(LS_KEY, "1");
    }
  }, []);

  const value = useMemo<Ctx>(() => ({ activeId, stepIndex, steps, start, next, prev, stop }), [activeId, stepIndex, steps, start, next, prev, stop]);
  return (
    <TourCtx.Provider value={value}>
      {children}
      {activeId && steps.length > 0 && <TourOverlay key={activeId} />}
    </TourCtx.Provider>
  );
}