import { lazy, Suspense, useEffect, useState } from "react";

const FluidScene = lazy(() => import("./FluidScene"));

/**
 * Site-wide interactive fluid / mesh-gradient backdrop.
 * Mounts only in the browser, skips reduced-motion and non-WebGL devices,
 * and stays behind content (pointer-events: none, soft blending).
 */
export function FluidBackground() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    try {
      const canvas = document.createElement("canvas");
      if (!canvas.getContext("webgl2") && !canvas.getContext("webgl")) return;
    } catch {
      return;
    }
    setReady(true);
  }, []);

  if (!ready) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-30"
      style={{ mixBlendMode: "soft-light", opacity: 0.55 }}
    >
      <Suspense fallback={null}>
        <FluidScene />
      </Suspense>
    </div>
  );
}
