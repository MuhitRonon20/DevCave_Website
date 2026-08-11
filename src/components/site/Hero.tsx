import { motion, useMotionTemplate, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import heroObjects from "@/assets/hero-objects.jpg";
import { WebGLBackdrop } from "./webgl/WebGLBackdrop";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -3]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-45%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const textBlur = useTransform(scrollYProgress, [0, 0.6], [0, 10]);
  const textFilter = useMotionTemplate`blur(${textBlur}px)`;

  return (
    <section
      id="top"
      ref={ref}
      className="sunrise-bg grain-overlay relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pt-28 pb-16 text-center"
    >
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.9, duration: 1.6 }}
      >
        <WebGLBackdrop />
      </motion.div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent to-background" />
      <div className="relative flex w-full flex-col items-center">

      <motion.div style={{ y: textY, opacity: textOpacity, filter: textFilter }}>
      <motion.p
        className="text-xs tracking-[0.32em] text-muted-foreground uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        Brand · Web · Motion
      </motion.p>

      <h1 className="mt-6 max-w-4xl text-[clamp(2.6rem,7vw,5.5rem)] leading-[0.95] text-ink">
        {["Websites that", "rise above"].map((line, i) => (
          <span key={line} className="block overflow-hidden">
            <motion.span
              className="block"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{
                delay: 2 + i * 0.09,
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </h1>

      <motion.p
        className="mt-6 max-w-md text-balance text-muted-foreground"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.3, duration: 0.9 }}
      >
        A small studio crafting premium brands and motion-led websites for ambitious
        companies.
      </motion.p>
      </motion.div>

      <motion.div
        className="relative mt-12 w-full max-w-4xl"
        style={{ y, scale, rotate }}
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.15, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.img
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          src={heroObjects}
          alt="Book, watch and card floating over a sunrise gradient"
          width={1280}
          height={960}
          className="w-full rounded-[2rem] object-cover shadow-[var(--shadow-lift)]"
        />
      </motion.div>
      </div>


      <motion.div
        aria-hidden
        style={{ opacity: fade }}
        className="pointer-events-none absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[0.65rem] tracking-[0.3em] text-muted-foreground uppercase"
      >
        Scroll
        <motion.span
          className="block h-8 w-px bg-current"
          animate={{ scaleY: [0.2, 1, 0.2], originY: 0 }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
