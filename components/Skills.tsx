"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const skills = [
  "React",
  "Next.js",
  "JavaScript",
  "Tailwind CSS",
  "HTML",
  "CSS",
  "Figma",
  "WordPress",
  "Arduino",
  "Scratch",
];

export default function Skills() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.to(".skills-track", {
        xPercent: -50,
        repeat: -1,
        duration: 30,
        ease: "none",
      });
    },
    { scope: container }
  );

  return (
    <section
      id="skills"
      ref={container}
      className="overflow-hidden py-24"
    >
      <p className="mb-12 px-6 text-sm uppercase tracking-widest md:px-12">
        Skills
      </p>

      <div className="skills-track flex w-max whitespace-nowrap">
        {[...skills, ...skills].map((skill, i) => (
          <span key={i} className="px-6 text-5xl font-bold md:text-8xl">
            {skill} <span className="text-accent">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}