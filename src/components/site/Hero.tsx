import { motion } from "motion/react";
import { useRef } from "react";
import tileOne from "@/assets/project-1.jpg";
import tileTwo from "@/assets/work-brand.jpg";
import tileThree from "@/assets/project-3.jpg";
import tileWide from "@/assets/work-web.jpg";

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

function Tile({ src, className = "" }: { src: string; className?: string }) {
  return (
    <motion.img
      src={src}
      alt=""
      aria-hidden
      whileHover={{ scale: 1.06, rotate: -1.5 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className={`inline-block h-[0.72em] rounded-[0.16em] object-cover align-middle shadow-[var(--shadow-soft)] ${className}`}
    />
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
            <span>We</span>
            <span className="inline-flex items-center gap-[0.08em]">
              <Tile src={tileOne} className="w-[1.05em]" />
              <Tile src={tileTwo} className="w-[1.05em]" />
              <Tile src={tileThree} className="w-[1.05em]" />
            </span>
            <span>turn great</span>
          </Line>

          <Line delay={2.09}>
            <span>ideas into</span>
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
            <span>brands</span>
          </Line>

          <Line delay={2.18}>
            <span>people</span>
            <Tile src={tileWide} className="w-[2.1em]" />
            <span>remember</span>
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
