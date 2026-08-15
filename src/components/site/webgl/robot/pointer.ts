/** Shared, ref-like pointer state (no React re-renders). */
export const pointerState = {
  x: 0,
  y: 0,
  active: false,
};

let bound = false;

export function bindPointer() {
  if (bound || typeof window === "undefined") return () => {};
  bound = true;

  const onMove = (e: PointerEvent) => {
    pointerState.x = e.clientX;
    pointerState.y = e.clientY;
    pointerState.active = e.pointerType === "mouse";
  };
  const onLeave = () => {
    pointerState.active = false;
  };

  window.addEventListener("pointermove", onMove, { passive: true });
  window.addEventListener("pointerdown", onMove, { passive: true });
  document.addEventListener("mouseleave", onLeave);
  window.addEventListener("blur", onLeave);

  return () => {
    bound = false;
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("pointerdown", onMove);
    document.removeEventListener("mouseleave", onLeave);
    window.removeEventListener("blur", onLeave);
  };
}
