"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Hero() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".hero-line", {
        yPercent: 110,
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.15,
       delay: 3.3,
      });
      gsap.from(".hero-fade", {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: "power3.out",
        delay: 4.0,
      });
    },
    { scope: container }
  );

  return (
    <section
      id="home"
      ref={container}
      className="flex min-h-screen flex-col justify-between p-6 pt-28 md:p-12 md:pt-32"
    >
      <p className="hero-fade text-sm uppercase tracking-widest">
        Frontend Developer
      </p>

      <h1 className="text-[12vw] font-bold leading-[0.95]">
        <span className="block overflow-hidden pb-[0.12em]">
          <span className="hero-line block">Luthfi</span>
        </span>
        <span className="block overflow-hidden pb-[0.12em]">
          <span className="hero-line block text-accent">Novriansyah</span>
        </span>
      </h1>

      <div className="hero-fade flex items-end justify-between gap-6">
        <p className="max-w-md text-base md:text-lg">
          I craft clean, modern, and interactive web experiences with a strong
          focus on design and performance.
        </p>
        <span className="text-sm uppercase tracking-widest">Scroll Down ↓</span>
      </div>
    </section>
  );
}