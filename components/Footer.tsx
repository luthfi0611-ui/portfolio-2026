"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import FillButton from "@/components/FillButton";

gsap.registerPlugin(ScrollTrigger);

const EMAIL = "luthfi0611@student.abudzar.sch.id";

const socials = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/luthfi-novriasyah-b80192378/",
  },
  { name: "Instagram", url: "https://www.instagram.com/novriii_0611/" },
  { name: "TikTok", url: "https://www.tiktok.com/@luthfinovriasyah" },
];

function RollLink({
  href,
  external,
  children,
}: {
  href: string;
  external?: boolean;
  children: string;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="group relative inline-block overflow-hidden"
    >
      <span className="block transition-transform duration-500 ease-out group-hover:-translate-y-full">
        {children}
      </span>
      <span
        aria-hidden="true"
        className="absolute left-0 top-full block transition-transform duration-500 ease-out group-hover:-translate-y-full"
      >
        {children}
      </span>
    </a>
  );
}

export default function Footer() {
  const container = useRef<HTMLElement>(null);
  const cta = useRef<HTMLAnchorElement>(null);
  const [time, setTime] = useState("");

  // local time
  useEffect(() => {
    const update = () =>
      setTime(
        new Date().toLocaleTimeString("en-GB", {
          timeZone: "Asia/Jakarta",
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, []);

  // magnetic circle button
  useEffect(() => {
    const el = cta.current;
    if (!el) return;

    const xTo = gsap.quickTo(el, "x", {
      duration: 0.8,
      ease: "elastic.out(1, 0.4)",
    });
    const yTo = gsap.quickTo(el, "y", {
      duration: 0.8,
      ease: "elastic.out(1, 0.4)",
    });

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2 - Number(gsap.getProperty(el, "x"));
      const cy = r.top + r.height / 2 - Number(gsap.getProperty(el, "y"));
      xTo((e.clientX - cx) * 0.35);
      yTo((e.clientY - cy) * 0.35);
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  useGSAP(
    () => {
      // endless name marquee
      gsap.to(".footer-marquee", {
        xPercent: -50,
        repeat: -1,
        duration: 25,
        ease: "none",
      });

      // reveal, driven by how far the page above has lifted
      const page = document.getElementById("page-content");
      if (!page) return;

      gsap
        .timeline({
          scrollTrigger: {
            trigger: page,
            start: "bottom bottom",
            end: "bottom top",
            scrub: true,
          },
        })
        .fromTo(
          ".footer-inner",
          { yPercent: -25 },
          { yPercent: 0, ease: "none" },
          0
        )
        .fromTo(
          ".footer-line",
          { yPercent: 110 },
          { yPercent: 0, ease: "power2.out", stagger: 0.15, duration: 0.6 },
          0.15
        )
        .fromTo(
          ".footer-fade",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, ease: "power2.out", stagger: 0.1, duration: 0.5 },
          0.4
        );
    },
    { scope: container }
  );

  const toTop = () => {
    if (window.lenis) window.lenis.scrollTo(0, { duration: 2.2 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="contact"
      ref={container}
      className="fixed bottom-0 left-0 z-0 h-screen w-full overflow-hidden bg-foreground text-background"
    >
      <div className="footer-inner flex h-full flex-col justify-between p-6 pt-24 md:p-12 md:pt-28">
        {/* headline + magnetic button */}
        <div className="flex items-start justify-between gap-6">
          <h2 className="text-[13vw] font-bold leading-[0.95] md:text-[11vw]">
            <span className="block overflow-hidden pb-[0.12em]">
              <span className="footer-line block">Let&apos;s work</span>
            </span>
            <span className="block overflow-hidden pb-[0.12em]">
              <span className="footer-line block text-accent">together.</span>
            </span>
          </h2>

          <div className="footer-fade hidden md:block">
            <a
              ref={cta}
              href={`mailto:${EMAIL}`}
              className="group relative flex h-44 w-44 items-center justify-center rounded-full border border-background text-sm uppercase tracking-widest"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 scale-0 rounded-full bg-background transition-transform duration-500 ease-out group-hover:scale-100"
              />
              <span className="relative z-10 transition-colors duration-500 group-hover:text-foreground">
                Say hello ↗
              </span>
            </a>
          </div>
        </div>

        {/* outlined name marquee */}
        <div className="footer-fade overflow-hidden">
          <div className="footer-marquee flex w-max whitespace-nowrap">
            {[0, 1].map((n) => (
              <span key={n} className="flex">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="px-6 text-[9vw] font-bold leading-none text-transparent [-webkit-text-stroke:1px_var(--background)] md:text-[7vw]"
                  >
                    LUTHFI NOVRIANSYAH
                    <span className="px-6 text-background">✦</span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>

        {/* bottom row */}
        <div className="footer-fade flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="space-y-5">
            <p className="break-all text-base md:text-3xl md:break-normal">
              <RollLink href={`mailto:${EMAIL}`}>{EMAIL}</RollLink>
            </p>
            <ul className="flex gap-6 text-sm uppercase tracking-widest">
              {socials.map((s) => (
                <li key={s.name}>
                  <RollLink href={s.url} external>
                    {s.name}
                  </RollLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-5 md:items-end md:text-right">
            <p className="text-sm">
              Based in Indonesia · {time} WIB
              <br />
              Available for new projects
            </p>
            <FillButton
              label="Back to top"
              arrow="↑"
              onClick={toTop}
              invertClass="group-hover:text-foreground"
            />
            <p className="text-sm opacity-60">© 2026 Luthfi Novriansyah</p>
          </div>
        </div>
      </div>
    </footer>
  );
}