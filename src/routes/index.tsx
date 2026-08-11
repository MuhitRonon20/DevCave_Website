import { createFileRoute } from "@tanstack/react-router";
import { Preloader } from "@/components/site/Preloader";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Awards, Testimonials, Stats, Services, Work, Journal } from "@/components/site/Sections";
import { Projects } from "@/components/site/Projects";
import { Contact } from "@/components/site/Contact";
import { ScrollProgress } from "@/components/site/motion-primitives";
import { useSmoothScroll } from "@/components/site/useLenis";

const title = "UpSunrise — Brand, Web & Motion Design Studio";
const description =
  "A small studio crafting premium brands and motion-led websites for ambitious companies. Award-winning brand, web and motion design.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  useSmoothScroll();

  return (
    <main>
      <Preloader />
      <ScrollProgress />
      <Nav />
      <Hero />
      <Awards />
      <Testimonials />
      <Stats />
      <Services />
      <Work />
      <Projects />
      <Journal />

      <Contact />
    </main>
  );
}
