"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const text =
  "I'm Luthfi, a frontend developer who turns ideas into clean, modern, and interactive web experiences. I work with HTML, CSS, JavaScript, React, and Tailwind CSS, with a strong focus on user experience and performance.";

export default function About() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const words = gsap.utils.toArray<HTMLElement>(".about-word");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "+=300%",
          scrub: true, // Lenis already smooths the scroll
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      words.forEach((word) => {
        const start = gsap.utils.random(0, 0.6);

        // pieces fly in from random places and settle
        tl.fromTo(
          word,
          {
            x: () =>
              gsap.utils.random(
                -window.innerWidth * 0.5,
                window.innerWidth * 0.5
              ),
            y: () =>
              gsap.utils.random(
                -window.innerHeight * 0.5,
                window.innerHeight * 0.5
              ),
            scale: () => gsap.utils.random(0.5, 2.2),
            rotation: () => gsap.utils.random(-18, 18),
            skewX: () => gsap.utils.random(-20, 20),
          },
          {
            x: 0,
            y: 0,
            scale: 1,
            rotation: 0,
            skewX: 0,
            ease: "power2.out",
            duration: 1,
          },
          start
        );

        // and fade in on a linear curve, so fading out is just as even
        tl.fromTo(
          word,
          { opacity: 0 },
          { opacity: 1, ease: "none", duration: 0.5 },
          start
        );
      });

      tl.to({}, { duration: 0.6 }); // hold the finished sentence
    },
    { scope: container }
  );

  return (
    <section
      id="about"
      ref={container}
      className="flex h-screen flex-col items-center justify-center gap-10 overflow-hidden p-6 md:p-12"
    >
      <p className="text-sm uppercase tracking-widest">About me</p>

      <p className="mx-auto max-w-5xl text-center text-3xl font-medium leading-tight tracking-tight md:text-6xl">
        {text.split(" ").map((word, i) => (
          <span
            key={i}
            className="about-word inline-block pr-[0.25em] will-change-transform"
          >
            {word}
          </span>
        ))}
      </p>
    </section>
  );
}