"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const photos = [
  {
    src: "/images/me-1.jpg",
    alt: "Luthfi sitting on a rock with mountains behind him",
    caption: "Summit mood.",
    rotation: -4,
  },
  {
    src: "/images/me-2.jpg",
    alt: "Luthfi looking at a mountain",
    caption: "Quiet moments.",
    rotation: 5,
  },
  {
    src: "/images/me-3.jpg",
    alt: "Luthfi standing in an open field",
    caption: "Always exploring.",
    rotation: -3,
  },
];

export default function Photos() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".stack-card");
      const captions = gsap.utils.toArray<HTMLElement>(".stack-caption");

      gsap.set(cards, { rotation: (i) => photos[i].rotation });
      gsap.set(captions.slice(1), { opacity: 0 });

      gsap.from(".photos-title", {
        yPercent: 110,
        duration: 1.1,
        ease: "power4.out",
        stagger: 0.15,
        scrollTrigger: { trigger: container.current, start: "top 75%" },
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "+=250%",
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      cards.forEach((card, i) => {
        if (i === 0) return;
        const at = (i - 1) * 1.2;

        // new card flies in from below and lands on the pile
        tl.fromTo(
          card,
          { yPercent: 120, rotation: i % 2 ? 16 : -16 },
          {
            yPercent: 0,
            rotation: photos[i].rotation,
            duration: 1,
            ease: "power2.out",
          },
          at
        )
          .to(cards[i - 1], { scale: 0.93, duration: 1, ease: "power2.out" }, at)
          .to(captions[i - 1], { opacity: 0, y: -16, duration: 0.4 }, at)
          .fromTo(
            captions[i],
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.4 },
            at + 0.6
          );
      });

      tl.to({}, { duration: 0.5 }); // hold on the last photo
    },
    { scope: container }
  );

  return (
    <section
      id="photos"
      ref={container}
      className="relative flex h-screen flex-col justify-center gap-8 overflow-hidden p-6 pt-28 md:flex-row md:items-center md:justify-between md:gap-16 md:p-12 md:pt-28"
    >
      <div className="md:max-w-2xl">
        <p className="mb-6 text-sm uppercase tracking-widest">
          Behind the code
        </p>

        <h2 className="text-4xl font-bold leading-[1.05] md:text-8xl">
          <span className="block overflow-hidden pb-[0.1em]">
            <span className="photos-title block">Hey, my name&apos;s</span>
          </span>
          <span className="block overflow-hidden pb-[0.1em]">
            <span className="photos-title block text-accent">Luthfi.</span>
          </span>
        </h2>

        <div className="relative mt-8 h-16 md:mt-12 md:h-24">
          {photos.map((p, i) => (
            <div key={p.src} className="stack-caption absolute inset-0">
              <p className="text-sm uppercase tracking-widest opacity-60">
                0{i + 1} / 0{photos.length}
              </p>
              <p className="mt-2 text-xl font-medium md:text-3xl">
                {p.caption}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative mx-auto h-[42vh] w-[31.5vh] md:mx-0 md:mr-[6vw] md:h-[68vh] md:w-[51vh]">
        {photos.map((p, i) => (
          <div
            key={p.src}
            className="stack-card absolute inset-0 rounded-2xl bg-white p-2 shadow-2xl md:p-3"
            style={{ zIndex: i }}
          >
            <div className="relative h-full w-full overflow-hidden rounded-xl">
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(min-width: 768px) 30vw, 60vw"
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}