"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const achievements = [
  {
    year: "2026",
    title: "Portfolio Development",
    description:
      "Built a modern personal portfolio with smooth animations, premium layouts, and interactive user experiences.",
  },
  {
    year: "2026",
    title: "Frontend Engineering",
    description:
      "Developed responsive interfaces using Tailwind CSS with clean structures and modern interactive components.",
  },
  {
    year: "2026",
    title: "UI / UX Exploration",
    description:
      "Explored aesthetic interface design through minimalist concepts, typography experiments, and visual layouts.",
  },
  {
    year: "2026",
    title: "Creative Design Projects",
    description:
      "Created visual projects combining creativity, modern aesthetics, and interactive digital experiences.",
  },
];

export default function Achievements() {
  const container = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const getDistance = () =>
        (track.current?.scrollWidth ?? 0) - window.innerWidth;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: () => "+=" + getDistance(),
          scrub: true,
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      tl.to(track.current, { x: () => -getDistance(), ease: "none" }, 0).to(
        ".ach-progress",
        { scaleX: 1, ease: "none" },
        0
      );
    },
    { scope: container }
  );

  return (
    <section
      id="achievements"
      ref={container}
      className="relative flex h-screen flex-col justify-between overflow-hidden bg-foreground py-8 text-background md:py-12"
    >
      <div className="flex items-end justify-between px-6 pt-20 md:px-12">
        <p className="text-sm uppercase tracking-widest">Achievements</p>
        <p className="text-sm uppercase tracking-widest opacity-60">
          Keep scrolling →
        </p>
      </div>

      <div
        ref={track}
        className="flex w-max items-center gap-6 px-6 md:gap-10 md:px-12"
      >
        <h2 className="w-[80vw] shrink-0 text-5xl font-bold leading-[1.05] md:w-[40vw] md:text-8xl">
          Milestones along the way.
        </h2>

        {achievements.map((a, i) => (
          <article
            key={a.title}
            className="group flex h-[55vh] w-[85vw] shrink-0 flex-col justify-between rounded-3xl border border-background/25 p-8 transition-colors duration-500 hover:bg-background hover:text-foreground md:w-[36vw] md:p-12"
          >
            <div className="flex items-start justify-between">
              <span className="text-8xl font-bold leading-none text-transparent [-webkit-text-stroke:1px_var(--background)] group-hover:[-webkit-text-stroke:1px_var(--foreground)] md:text-[9rem]">
                0{i + 1}
              </span>
              <span className="text-sm uppercase tracking-widest">
                {a.year}
              </span>
            </div>

            <div>
              <h3 className="mb-4 text-3xl font-bold md:text-5xl">{a.title}</h3>
              <p className="max-w-md text-base opacity-70 md:text-lg">
                {a.description}
              </p>
            </div>
          </article>
        ))}
      </div>

      <div className="px-6 md:px-12">
        <div className="h-px w-full bg-background/25">
          <div className="ach-progress h-px origin-left scale-x-0 bg-background" />
        </div>
      </div>
    </section>
  );
}