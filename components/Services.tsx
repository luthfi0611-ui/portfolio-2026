"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Frontend Development",
    description:
      "Modern, responsive, and interactive websites with clean code and optimized performance.",
  },
  {
    title: "UI / UX Design",
    description:
      "User-centered interfaces that blend beauty and usability.",
  },
  {
    title: "Website Optimization",
    description:
      "Improving site speed, SEO, and usability for better engagement.",
  },
  {
    title: "Brand & Creative Design",
    description:
      "Visuals that express your brand's values with impact.",
  },
];

export default function Services() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".service-row", {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: { trigger: container.current, start: "top 70%" },
      });
    },
    { scope: container }
  );

  return (
    <section id="services" ref={container} className="p-6 py-24 md:p-12">
      <p className="mb-12 text-sm uppercase tracking-widest">Services</p>

      <ul>
        {services.map((s, i) => (
          <li
            key={s.title}
            className="service-row flex flex-col justify-between gap-4 border-t border-foreground/20 py-8 md:flex-row md:items-start"
          >
            <div className="flex gap-6 md:gap-12">
              <span className="pt-2 text-sm">0{i + 1}</span>
              <h3 className="text-3xl font-bold md:text-6xl">{s.title}</h3>
            </div>
            <p className="max-w-sm text-base md:pt-3 md:text-lg">
              {s.description}
            </p>
          </li>
        ))}
        <li className="border-t border-foreground/20" />
      </ul>
    </section>
  );
}