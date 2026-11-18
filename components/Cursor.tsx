"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // no custom cursor on touch devices
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const dotEl = dot.current!;
    const ringEl = ring.current!;
    const labelEl = label.current!;

    gsap.set([dotEl, ringEl], { xPercent: -50, yPercent: -50 });

    const dotX = gsap.quickTo(dotEl, "x", { duration: 0.15, ease: "power3" });
    const dotY = gsap.quickTo(dotEl, "y", { duration: 0.15, ease: "power3" });
    const ringX = gsap.quickTo(ringEl, "x", { duration: 0.6, ease: "power3" });
    const ringY = gsap.quickTo(ringEl, "y", { duration: 0.6, ease: "power3" });

    let visible = false;

    const onMove = (e: PointerEvent) => {
      if (!visible) {
        visible = true;
        gsap.set([dotEl, ringEl], { x: e.clientX, y: e.clientY });
        gsap.to([dotEl, ringEl], { opacity: 1, duration: 0.3 });
      }
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const onOver = (e: PointerEvent) => {
      const target =
        e.target instanceof Element
          ? e.target.closest<HTMLElement>("a, button, [data-cursor]")
          : null;
      const text = target?.dataset.cursor ?? "";
      labelEl.textContent = text;

      if (!target) {
        gsap.to(ringEl, {
          width: 40,
          height: 40,
          backgroundColor: "rgba(255,255,255,0)",
          duration: 0.35,
          ease: "power3.out",
        });
        gsap.to(dotEl, { scale: 1, duration: 0.25 });
      } else if (text) {
        gsap.to(ringEl, {
          width: 96,
          height: 96,
          backgroundColor: "rgba(255,255,255,1)",
          duration: 0.35,
          ease: "power3.out",
        });
        gsap.to(dotEl, { scale: 0, duration: 0.25 });
      } else {
        gsap.to(ringEl, {
          width: 64,
          height: 64,
          backgroundColor: "rgba(255,255,255,0)",
          duration: 0.35,
          ease: "power3.out",
        });
        gsap.to(dotEl, { scale: 0, duration: 0.25 });
      }
    };

    const onLeave = () => {
      visible = false;
      gsap.to([dotEl, ringEl], { opacity: 0, duration: 0.2 });
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerover", onOver);
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <>
      <div
        ref={ring}
        className="pointer-events-none fixed left-0 top-0 z-[100] flex h-10 w-10 items-center justify-center rounded-full border border-white opacity-0 mix-blend-difference"
      >
        <span
          ref={label}
          className="text-[10px] font-bold uppercase tracking-widest text-black"
        />
      </div>
      <div
        ref={dot}
        className="pointer-events-none fixed left-0 top-0 z-[100] h-2 w-2 rounded-full bg-white opacity-0 mix-blend-difference"
      />
    </>
  );
}