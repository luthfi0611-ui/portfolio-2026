"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const greetings = [
  "Hello",
  "Bonjour",
  "Hola",
  "Ciao",
  "こんにちは",
  "안녕하세요",
  "مرحبا",
  "Halo",
];
const durations = [0.4, 0.13, 0.13, 0.13, 0.13, 0.13, 0.13, 0.45];

export default function Loader() {
  const backdropRef = useRef<HTMLDivElement>(null);
  const cardA = useRef<HTMLDivElement>(null);
  const cardB = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLParagraphElement>(null);
  const [index, setIndex] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const ease = "power3.inOut";

    // the "next app" waits off-screen on the right, already shrunk
    gsap.set(cardB.current, { xPercent: 115, scale: 0.78, borderRadius: 40 });

    const tl = gsap.timeline({ onComplete: () => setDone(true) });
    let t = 0;

    greetings.forEach((_, i) => {
      tl.call(() => setIndex(i), [], t);
      t += durations[i];
    });

    // 1. leave the app: the greeting screen shrinks into a card
    tl.to(
      cardA.current,
      {
        scale: 0.78,
        borderRadius: 40,
        boxShadow: "0 40px 80px rgba(0,0,0,0.35)",
        duration: 0.6,
        ease,
      },
      t
    );

    // 2. switch apps: both cards slide sideways together
    tl.to(cardA.current, { xPercent: -115, duration: 0.8, ease }, t + 0.45);
    tl.to(cardB.current, { xPercent: 0, duration: 0.8, ease }, t + 0.45);

    // 3. open the new app: its card grows to fill the screen
    tl.to(
      cardB.current,
      { scale: 1, borderRadius: 0, duration: 0.6, ease },
      t + 1.1
    );
    tl.to(
      markRef.current,
      { y: -30, opacity: 0, duration: 0.35, ease: "power2.in" },
      t + 1.3
    );

    // 4. reveal the real page
    tl.set(backdropRef.current, { opacity: 0 }, t + 1.7);
    tl.to(cardB.current, { opacity: 0, duration: 0.25 }, t + 1.7);

    return () => {
      tl.kill();
    };
  }, []);

  if (done) return null;

  return (
    <>
      {/* backdrop that shows around the shrunken cards */}
      <div ref={backdropRef} className="fixed inset-0 z-[47] bg-accent" />

      {/* card B: the "new app" (same color as the page) */}
      <div
        ref={cardB}
        className="fixed inset-0 z-[49] flex items-center justify-center overflow-hidden bg-background"
      >
        <p
          ref={markRef}
          className="flex items-center gap-3 text-sm uppercase tracking-widest"
        >
          <span className="h-2 w-2 rounded-full bg-accent" />
          Luthfi Novriansyah
        </p>
      </div>

      {/* card A: the greeting screen */}
      <div
        ref={cardA}
        className="fixed inset-0 z-50 flex flex-col justify-between overflow-hidden bg-foreground p-6 text-background md:p-12"
      >
        <div className="flex justify-between text-sm uppercase tracking-widest">
          <span>Luthfi Novriansyah</span>
          <span>Portfolio © 2026</span>
        </div>

        <p className="flex items-center justify-center text-5xl font-bold md:text-8xl">
          <span className="mr-4 inline-block h-3 w-3 rounded-full bg-background md:mr-6 md:h-5 md:w-5" />
          {greetings[index]}
        </p>

        <div />
      </div>
    </>
  );
}