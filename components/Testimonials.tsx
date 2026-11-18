"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import DiceButton from "@/components/DiceButton";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Fathi Dzhahabis",
    role: "Client",
    quote:
      "It's always great working with Luthfi. He understands what you want, adds his own creative touch, and turns it into something even better. Super reliable and talented.",
  },
  {
    name: "Muhammad Mustafid Ilmi",
    role: "Client",
    quote:
      "Working with Luthfi was an incredible experience. He's professional, detail-oriented, and always delivers beyond expectations. Highly recommended!",
  },
  {
    name: "Faiz Ghazali",
    role: "Client",
    quote:
      "Luthfi brings ideas to life with style. His designs are clean, his code is smooth, and his energy makes every project fun and exciting.",
  },
];

export default function Testimonials() {
  const container = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const t = testimonials[index];
  const total = testimonials.length;

  useGSAP(
    () => {
      gsap.fromTo(
        ".quote-word",
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 0.9,
          ease: "power4.out",
          stagger: 0.025,
          scrollTrigger: { trigger: container.current, start: "top 70%" },
        }
      );
      gsap.fromTo(
        ".quote-meta",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.3,
          scrollTrigger: { trigger: container.current, start: "top 70%" },
        }
      );
    },
    { scope: container, dependencies: [index], revertOnUpdate: true }
  );

  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  return (
    <section
      id="testimonials"
      ref={container}
      className="flex min-h-screen flex-col justify-between gap-12 p-6 py-24 md:p-12 md:py-24"
    >
      <p className="text-sm uppercase tracking-widest">Testimonials</p>

      <div>
        <span className="mb-4 block text-8xl font-bold leading-none text-accent md:text-[10rem]">
          “
        </span>

        <blockquote className="max-w-6xl text-3xl font-medium leading-tight tracking-tight md:text-6xl">
          {t.quote.split(" ").map((word, i) => (
            <span
              key={`${index}-${i}`}
              className="mr-[0.25em] inline-block overflow-hidden pb-[0.15em] align-top"
            >
              <span className="quote-word inline-block">{word}</span>
            </span>
          ))}
        </blockquote>
      </div>

      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <div className="quote-meta">
          <p className="text-xl font-bold md:text-2xl">{t.name}</p>
          <p className="text-sm uppercase tracking-widest opacity-60">
            {t.role}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm tabular-nums tracking-widest">
            0{index + 1} / 0{total}
          </span>
          <DiceButton label="Prev" onClick={prev} />
          <DiceButton label="Next" onClick={next} />
        </div>
      </div>
    </section>
  );
}