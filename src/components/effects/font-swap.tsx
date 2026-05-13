"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

type Variant = "default" | "pixel" | "highlight";

interface FontSwapProps {
  char: string;
  /** Cycle through variants for the live-site animated feel */
  cycle?: boolean;
  /** Starting variant */
  initial?: Variant;
}

/**
 * Lambda's font-swap "island": letters spend most of their time in the
 * base Suisse Intl font and occasionally flicker to the pixel/highlight
 * variants, then return to default. Disabled for reduced-motion users.
 */
export function FontSwap({ char, cycle = true, initial = "default" }: FontSwapProps) {
  const prefersReducedMotion = useReducedMotion();
  const [variant, setVariant] = useState<Variant>(initial);

  useEffect(() => {
    if (!cycle || prefersReducedMotion) return;
    let active = true;

    const schedule = () => {
      const idleMs = 3200 + Math.random() * 3800;
      const flickerMs = 380 + Math.random() * 560;
      const next: Variant = Math.random() < 0.55 ? "pixel" : "highlight";

      const t1 = window.setTimeout(() => {
        if (!active) return;
        setVariant(next);
        const t2 = window.setTimeout(() => {
          if (!active) return;
          setVariant("default");
          schedule();
        }, flickerMs);
        timers.push(t2);
      }, idleMs);
      timers.push(t1);
    };

    const timers: number[] = [];
    schedule();
    return () => {
      active = false;
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [cycle, prefersReducedMotion]);

  if (variant === "pixel") {
    return <span className="lambda-pixel-swap">{char}</span>;
  }
  if (variant === "highlight") {
    return <span className="lambda-pixel-highlight">{char}</span>;
  }
  return <span>{char}</span>;
}
