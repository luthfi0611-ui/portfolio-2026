"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { projects } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectList() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".project-row", {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%",
        },
      });
    },
    { scope: container }
  );

  return (
    <section ref={container} className="p-6 py-24 md:p-12">
      <p className="mb-12 text-sm uppercase tracking-widest">
        Selected Projects
      </p>

      <ul>
        {projects.map((project, i) => (
          <li key={project.slug} className="project-row">
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              data-cursor="View"
              className="group flex items-baseline justify-between gap-6 border-t border-foreground/20 py-8 transition-all duration-500 hover:pl-6 hover:text-accent"
            >
              <span className="text-sm">0{i + 1}</span>
              <span className="flex-1 text-4xl font-bold md:text-7xl">
                {project.title}
              </span>
              <span className="hidden text-sm uppercase tracking-widest md:block">
                {project.category}
              </span>
            </a>
          </li>
        ))}
        <li className="border-t border-foreground/20" />
      </ul>
    </section>
  );
}