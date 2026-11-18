"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import DiceButton from "@/components/DiceButton";
import FillButton from "@/components/FillButton";

const EMAIL = "luthfi0611@student.abudzar.sch.id";

const links = [
  { label: "Home", href: "#home" },
  { label: "About me", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/luthfi-novriasyah-b80192378/",
  },
  { name: "Instagram", url: "https://www.instagram.com/novriii_0611/" },
  { name: "TikTok", url: "https://www.tiktok.com/@luthfinovriasyah" },
];

export default function Navbar() {
  const root = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const [open, setOpen] = useState(false);

  useGSAP(
    () => {
      gsap.from(".nav-bar", {
        y: -40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
       delay: 4.0,
      });

      gsap.set(".menu-overlay", { yPercent: -100, visibility: "visible" });

      tl.current = gsap
        .timeline({ paused: true })
        .to(".menu-overlay", {
          yPercent: 0,
          duration: 0.9,
          ease: "power4.inOut",
        })
        .from(
          ".menu-link",
          { yPercent: 110, duration: 0.8, ease: "power4.out", stagger: 0.06 },
          "-=0.35",
        )
        .from(".menu-fade", { opacity: 0, duration: 0.6 }, "-=0.5");
    },
    { scope: root },
  );

  const toggle = () => {
    if (!tl.current) return;
    if (open) tl.current.reverse();
    else tl.current.play();
    setOpen(!open);
  };

  const goTo = (e: React.MouseEvent<HTMLElement>, href: string) => {
    e.preventDefault();
    tl.current?.reverse();
    setOpen(false);

    // the footer sits behind the page, so "Contact" = bottom of the page
    if (href === "#contact") {
      const bottom = document.documentElement.scrollHeight;
      if (window.lenis) window.lenis.scrollTo(bottom, { duration: 2 });
      else window.scrollTo({ top: bottom, behavior: "smooth" });
      return;
    }

    if (window.lenis) {
      window.lenis.scrollTo(href, { duration: 1.4 });
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div ref={root}>
      <header className="nav-bar fixed inset-x-0 top-0 z-[55] flex items-center justify-between p-6 text-white mix-blend-difference md:px-12">
        <a
          href="#home"
          onClick={(e) => goTo(e, "#home")}
          className="text-lg font-bold"
        >
          LUTHFI
        </a>

        <div className="flex items-center gap-3">
          <FillButton
            href={`mailto:${EMAIL}`}
            label="Get in touch"
            arrow="→"
            invertClass="group-hover:text-black"
            className="hidden sm:inline-flex"
          />
          <DiceButton
            label={open ? "Close ✕" : "Menu"}
            sizer="Close ✕"
            onClick={toggle}
          />
        </div>
      </header>

      <div className="menu-overlay invisible fixed inset-0 z-50 flex flex-col justify-between gap-12 overflow-y-auto bg-foreground p-6 pt-28 text-background md:p-12 md:pt-32">
        <ul className="grid gap-x-12 md:grid-cols-2">
          {links.map((l) => (
            <li key={l.label} className="overflow-hidden">
              <a
                href={l.href}
                onClick={(e) => goTo(e, l.href)}
                className="menu-link group relative block overflow-hidden text-5xl font-bold leading-[1.15] md:text-7xl"
              >
                <span className="block transition-transform duration-500 ease-out group-hover:-translate-y-full">
                  {l.label}
                </span>
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-full block opacity-60 transition-transform duration-500 ease-out group-hover:-translate-y-full"
                >
                  {l.label}
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="menu-fade flex flex-col justify-between gap-6 text-sm uppercase tracking-widest md:flex-row md:items-end">
          <ul className="flex gap-6">
            {socials.map((s) => (
              <li key={s.name}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:opacity-60"
                >
                  {s.name}
                </a>
              </li>
            ))}
          </ul>
          <a href={`mailto:${EMAIL}`} className="normal-case">
            {EMAIL}
          </a>
        </div>
      </div>
    </div>
  );
}
