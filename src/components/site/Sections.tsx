import { motion } from "motion/react";
import { Reveal } from "./Reveal";
import {
  Counter,
  Parallax,
  ScrollCard,
  ScrollSlide,
  ScrollStage,
  Depth3D,
  TextReveal,
  Tilt,
  VelocitySkew,
} from "./motion-primitives";
import { SunMark } from "./SunMark";
import workBrand from "@/assets/work-brand.jpg";
import workWeb from "@/assets/work-web.jpg";

const awards = [
  { title: "2x Best UI Design", body: "Awarded by CSS Design Awards", date: "Feb 20, 2026" },
  { title: "2x Best Innovation", body: "Awarded by CSS Design Awards", date: "Feb 20, 2026" },
  { title: "2x Site of the Day", body: "Awwwards winners", date: "Apr 24, 2026" },
  { title: "2x Honors", body: "For excellence in digital design", date: "May 02, 2026" },
];

const testimonials = [
  {
    quote:
      "They brought a thoughtful approach to every detail and built a site that reflects the craftsmanship our studio is known for.",
    name: "Craig Treattu",
    role: "Founder, Left Coast Design Studio",
  },
  {
    quote:
      "From start to finish the experience was professional and efficient. The final result exceeded our expectations.",
    name: "Shaun Olson",
    role: "President, COBE Construction",
  },
  {
    quote:
      "A game changer. They transformed our ideas into a website that feels genuinely true to our brand.",
    name: "Chasen McNaughton",
    role: "Co-Founder, Milk & Cookies",
  },
  {
    quote:
      "They captured the personality of our brand and delivered something that feels authentic and fast.",
    name: "Tanner Balisky",
    role: "Bad Birdie",
  },
];

const stats = [
  { value: "30+", label: "Projects", body: "Delivered to ambitious brands." },
  { value: "8+", label: "Awards", body: "Recognized by industry leading jurys." },
  { value: "1M+", label: "Views", body: "Monthly across the websites we build." },
];

const services = [
  {
    name: "Brand",
    body: "Creating identities that stand apart and stay recognizable.",
    tone: "from-peach/70 to-card",
  },
  {
    name: "Web",
    body: "Crafting digital experiences built to engage and convert.",
    tone: "from-sky/70 to-card",
  },
  {
    name: "Motion",
    body: "Adding movement that brings every brand experience to life.",
    tone: "from-sun/40 to-card",
  },
];

const work = [
  { name: "Milk & Cookies", tags: "Brand, Web", image: workBrand },
  { name: "Left Coast Design Studio", tags: "Brand, Web", image: workWeb },
];

const journal = [
  { title: "How motion turns websites into premium products", date: "May 28, 2026" },
  { title: "Why the best brands feel instantly trustworthy", date: "March 9, 2026" },
  { title: "Why some websites are impossible to ignore", date: "February 17, 2026" },
];

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="text-xs tracking-[0.28em] text-muted-foreground uppercase">{children}</p>
  );
}

export function Awards() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <Reveal>
        <SectionLabel>Recognition</SectionLabel>
      </Reveal>
      <Reveal>
        <TextReveal
          text="Work that keeps getting noticed."
          className="mt-4 max-w-2xl text-[clamp(1.9rem,4vw,3rem)] leading-[1.05]"
        />
      </Reveal>
      <ScrollStage>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {awards.map((a, i) => (
            <ScrollCard key={a.title} delay={i * 0.06} className="h-full">
              <Tilt className="surface-card grain-overlay flex h-full flex-col justify-between p-6">
                <div className="flex items-center justify-between text-[0.7rem] tracking-widest text-muted-foreground uppercase">
                  <span>{a.date}</span>
                  <motion.span
                    animate={{ rotate: [0, 8, -8, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
                  >
                    <SunMark className="h-4 w-7 text-sun" />
                  </motion.span>
                </div>
                <h3 className="mt-14 text-xl">{a.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{a.body}</p>
              </Tilt>
            </ScrollCard>
          ))}
        </div>
      </ScrollStage>
    </section>
  );
}

export function Testimonials() {
  const loop = [...testimonials, ...testimonials];
  return (
    <section className="overflow-hidden py-16">
      <Depth3D rotate={14} depth={260}>
      <VelocitySkew max={5}>
      <div className="marquee-track marquee-hover gap-4 px-2">
        {loop.map((t, i) => (
          <figure
            key={`${t.name}-${i}`}
            className="surface-card w-[min(88vw,26rem)] shrink-0 p-7 transition-transform duration-500 hover:-translate-y-2"
          >
            <blockquote className="text-[1.05rem] leading-relaxed text-foreground">
              “{t.quote}”
            </blockquote>
            <figcaption className="mt-6 text-sm">
              <span className="font-medium">{t.name}</span>
              <span className="block text-muted-foreground">{t.role}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      </VelocitySkew>
      </Depth3D>
    </section>
  );
}

export function Stats() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <Depth3D rotate={16} depth={300}>
      <ScrollStage intensity={1.2}>
      <div className="surface-card grain-overlay grid gap-10 bg-[image:var(--gradient-dawn)] p-10 sm:grid-cols-3 sm:p-14">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <Counter
              value={s.value}
              className="font-display text-[clamp(2.4rem,5vw,3.6rem)] leading-none text-ink"
            />
            <p className="mt-3 text-lg">{s.label}</p>
            <p className="mt-1 text-sm text-muted-foreground">{s.body}</p>
          </Reveal>
        ))}
      </div>
      </ScrollStage>
      </Depth3D>
    </section>
  );
}

export function Services() {
  return (
    <section id="services" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <Reveal>
        <SectionLabel>Services</SectionLabel>
      </Reveal>
      <Reveal>
        <TextReveal
          text="Three disciplines, one coherent result."
          className="mt-4 max-w-2xl text-[clamp(1.9rem,4vw,3rem)] leading-[1.05]"
        />
      </Reveal>
      <ScrollStage>
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {services.map((s, i) => (
            <ScrollCard key={s.name} delay={i * 0.08} className="h-full">
              <Tilt
                max={9}
                className={`surface-card grain-overlay flex h-full min-h-[22rem] flex-col justify-end overflow-hidden bg-linear-to-br p-8 ${s.tone}`}
              >
                <h3 className="text-2xl">{s.name}</h3>
                <p className="mt-2 max-w-xs text-sm text-muted-foreground">{s.body}</p>
              </Tilt>
            </ScrollCard>
          ))}
        </div>
      </ScrollStage>
    </section>
  );
}

export function Work() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <Reveal>
        <SectionLabel>Selected work</SectionLabel>
      </Reveal>
      <Reveal>
        <TextReveal
          text="Recent projects."
          className="mt-4 max-w-2xl text-[clamp(1.9rem,4vw,3rem)] leading-[1.05]"
        />
      </Reveal>
      <Depth3D rotate={12} depth={240}>
      <ScrollStage>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {work.map((w, i) => (
            <ScrollCard key={w.name} delay={i * 0.08}>
              <Tilt max={5} className="group surface-card overflow-hidden">
                <div className="overflow-hidden">
                  <Parallax distance={22}>
                  <img
                    src={w.image}
                    alt={`${w.name} case study`}
                    loading="lazy"
                    width={1200}
                    height={912}
                    className="aspect-4/3 w-full scale-[1.06] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.12]"
                  />
                  </Parallax>
                </div>
                <div className="flex items-center justify-between p-6">
                  <h3 className="text-lg transition-transform duration-500 group-hover:translate-x-1">
                    {w.name}
                  </h3>
                  <span className="text-sm text-muted-foreground">{w.tags}</span>
                </div>
              </Tilt>
            </ScrollCard>
          ))}
        </div>
      </ScrollStage>
      </Depth3D>
    </section>
  );
}

export function Journal() {
  return (
    <section id="journal" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <Reveal>
        <SectionLabel>Journal</SectionLabel>
      </Reveal>
      <Depth3D rotate={10} depth={200} className="mt-8">
      <div className="border-t border-border">
        {journal.map((p, i) => (
          <ScrollSlide key={p.title} from={i % 2 === 0 ? -70 : 70}>
            <a
              href="#journal"
              className="group flex flex-col gap-2 border-b border-border py-7 transition-colors hover:bg-secondary/50 sm:flex-row sm:items-baseline sm:justify-between"
            >
              <h3 className="max-w-2xl text-[1.35rem] leading-snug transition-transform duration-500 group-hover:translate-x-3">
                {p.title}
              </h3>
              <span className="flex items-center gap-3 text-sm text-muted-foreground">
                {p.date}
                <span className="inline-block translate-x-[-6px] opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
                  →
                </span>
              </span>
            </a>
          </ScrollSlide>
        ))}
      </div>
      </Depth3D>
    </section>
  );
}
