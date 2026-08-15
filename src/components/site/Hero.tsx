import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useRef } from "react";
import robot from "@/assets/robot.png";

const ease = [0.22, 1, 0.36, 1] as const;

function Line({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="block overflow-hidden py-[0.06em]">
      <motion.span
        className="flex flex-wrap items-center gap-x-[0.22em] gap-y-2"
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ delay, duration: 1, ease }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/* A robot head that smoothly leans / looks toward the cursor */
function Robot({ index }: { index: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const spring = { stiffness: 140, damping: 18, mass: 0.5 };
  const sx = useSpring(mx, spring);
  const sy = useSpring(my, spring);

  const x = useTransform(sx, [-1, 1], [-10, 10]);
  const y = useTransform(sy, [-1, 1], [-8, 8]);
  const rotateY = useTransform(sx, [-1, 1], [-26, 26]);
  const rotateX = useTransform(sy, [-1, 1], [16, -16]);
  const rotateZ = useTransform(sx, [-1, 1], [-6, 6]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const norm = (v: number, d: number) => Math.max(-1, Math.min(1, v / d));
      mx.set(norm(e.clientX - cx, 420));
      my.set(norm(e.clientY - cy, 320));
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my]);

  return (
    <span ref={ref} className="inline-block [perspective:600px]">
      <motion.img
        src={robot}
        alt=""
        aria-hidden
        width={816}
        height={816}
        style={{ x, y, rotateX, rotateY, rotateZ, transformStyle: "preserve-3d" }}
        animate={{ translateY: [0, -4, 0] }}
        transition={{
          duration: 3 + index * 0.4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.2,
        }}
        className="h-[0.95em] w-[0.95em] object-contain drop-shadow-[0_8px_18px_rgba(0,0,0,0.25)]"
      />
    </span>
  );
}


export function Hero() {
  const ref = useRef<HTMLElement>(null);

  return (
    <section
      id="top"
      ref={ref}
      className="sunrise-bg grain-overlay relative flex min-h-screen flex-col justify-center overflow-hidden px-5 pt-36 pb-24 sm:px-8"
    >
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent to-background" />

      <div className="relative mx-auto w-full max-w-7xl">
        <motion.p
          className="mb-8 text-xs tracking-[0.32em] text-muted-foreground uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          Brand · Web · Motion
        </motion.p>

        <h1 className="font-display text-[clamp(2.6rem,8.5vw,7rem)] leading-[1.02] tracking-[-0.04em] text-ink">
          <Line delay={2}>
            <span>Ideas are easy.</span>
          </Line>

          <Line delay={2.09}>
            <span>Making them</span>
            <span className="inline-flex items-center gap-[0.08em]">
              <Tile src={tileOne} className="w-[1.05em]" />
              <Tile src={tileTwo} className="w-[1.05em]" />
              <Tile src={tileThree} className="w-[1.05em]" />
            </span>
            <span>matter</span>
          </Line>

          <Line delay={2.18}>
            <span>is our craft</span>
            <svg
              viewBox="0 0 120 46"
              aria-hidden
              className="h-[0.42em] w-[1.5em] text-sun"
              fill="none"
            >
              <motion.path
                d="M4 30C22 6 52 4 62 18c6 9-6 20-14 15-9-6 4-19 24-19 14 0 22 6 32 12"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 2.6, duration: 1.1, ease }}
              />
              <motion.path
                d="M96 32l14 2-8 10"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.6, duration: 0.3 }}
              />
            </svg>
          </Line>
        </h1>

        <motion.div
          className="mt-12 flex flex-wrap items-center gap-6"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.9 }}
        >
          <a
            href="#contact"
            className="shine inline-block rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground"
          >
            Book a call
          </a>
          <p className="max-w-sm text-balance text-muted-foreground">
            A small studio crafting premium brands and motion-led websites for ambitious
            companies.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
