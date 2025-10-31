"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useTour } from "./TourProvider";

type Props = { variant: "home" | "topic" };

export default function ClientTourKickoff({ variant }: Props) {
  const { start } = useTour();
  const pathname = usePathname();
  const tourId = pathname ? `topic:${pathname}` : "topic";

  useEffect(() => {
    if (variant !== "topic") return;
    let cancelled = false;
    // Defensive: Start tour after route change, only after provider and DOM are ready
    const timer = setTimeout(() => {
      if (cancelled) return;
      // Defensive: wait for DOM ready
      if (document.readyState !== "complete") {
        console.log("[ClientTourKickoff] DOM not ready yet, waiting for load event");
        window.addEventListener(
          "load",
          () => {
            if (!cancelled) startTour();
          },
          { once: true }
        );
      } else {
        startTour();
      }
    }, 600);

    function startTour() {
      if (cancelled) return;
      console.log("[ClientTourKickoff] Starting topic tour", tourId);
      start({
        id: tourId,
        steps: [
          {
            id: "tabs",
            title: "Follow the journey",
            body: "Use these tabs to move from Reactive to Proactive to Autonomous.",
            attachTo: "[data-tour-id='stage-tabs']",
          },
          {
            id: "demo",
            title: "Open the demo",
            body: "Open the interactive prototype for this stage.",
            attachTo: "[data-tour-id='open-demo']",
            // @ts-expect-error – extended at runtime in TourOverlay
            action: "click",
          },
          {
            id: "next",
            title: "Next topic",
            body: "Jump to the next practice or go back to the overview.",
            attachTo: "[data-tour-id='next-topic']",
          },
        ],
      });
    }

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [start, variant, tourId]);

  return null;
}