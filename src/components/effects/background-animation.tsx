"use client";

import Script from "next/script";
import { useEffect, useId, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

const UNICORN_VERSION = "1.5.2";
const UNICORN_SRC = `https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v${UNICORN_VERSION}/dist/unicornStudio.umd.js`;
const SCENE_URL = "/motion/superintelligence-II-1.json";

type UnicornScene = { destroy?: () => void };
type UnicornStudioApi = {
  addScene: (opts: {
    elementId: string;
    filePath: string;
    dpi?: number;
    fps?: number;
    scale?: number;
    lazyLoad?: boolean;
    production?: boolean;
    altText?: string;
    ariaLabel?: string;
  }) => Promise<UnicornScene | null>;
};

declare global {
  interface Window {
    UnicornStudio?: UnicornStudioApi;
  }
}

export function BackgroundAnimation() {
  const reactId = useId().replace(/[:]/g, "");
  const elementId = `unicorn-${reactId}`;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<UnicornScene | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const [scriptReady, setScriptReady] = useState(false);

  useEffect(() => {
    if (!scriptReady || prefersReducedMotion) return;
    const el = containerRef.current;
    const api = window.UnicornStudio;
    if (!el || !api?.addScene) return;

    let cancelled = false;
    api
      .addScene({
        elementId,
        filePath: SCENE_URL,
        dpi: 1.5,
        fps: 30,
        scale: 1,
        lazyLoad: false,
        production: true,
        altText: "Superintelligence background",
        ariaLabel: "Animated background",
      })
      .then((scene) => {
        if (cancelled) {
          scene?.destroy?.();
          return;
        }
        sceneRef.current = scene;
      })
      .catch(() => {});

    return () => {
      cancelled = true;
      sceneRef.current?.destroy?.();
      sceneRef.current = null;
    };
  }, [elementId, scriptReady, prefersReducedMotion]);

  return (
    <>
      <Script
        src={UNICORN_SRC}
        strategy="afterInteractive"
        onLoad={() => setScriptReady(true)}
        onReady={() => setScriptReady(true)}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        style={{ backgroundColor: "var(--lambda-bg, #0b0b0b)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <div
          ref={containerRef}
          id={elementId}
          className="absolute inset-0 h-full w-full"
          style={{
            // Lambda wraps the canvas with these CSS vars so the scene fills 100%.
            ["--unicorn-width" as string]: "100%",
            ["--unicorn-height" as string]: "100%",
          }}
        />
      </motion.div>
    </>
  );
}

export default BackgroundAnimation;
