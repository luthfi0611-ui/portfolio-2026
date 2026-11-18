"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  label: string;
  sizer?: string; // the longest text this button can show, to fix its width
  href?: string;
  target?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
  className?: string;
};

const DEPTH = 22; // half of the button height (h-11 = 44px)

export default function DiceButton({
  label,
  sizer,
  href,
  target,
  onClick,
  className = "",
}: Props) {
  const [step, setStep] = useState(0);
  const [faces, setFaces] = useState([label, label, label, label]);
  const stepRef = useRef(0);
  const prevLabel = useRef(label);

  // put `text` on the next face of the cube, then roll to it
  const roll = useCallback((text: string) => {
    const next = stepRef.current + 1;
    stepRef.current = next;
    setFaces((f) => f.map((t, i) => (i === next % 4 ? text : t)));
    setStep(next);
  }, []);

  // label changed from outside (e.g. Menu -> Close): roll to the new text
  useEffect(() => {
    if (prevLabel.current === label) return;
    prevLabel.current = label;
    roll(label);
  }, [label, roll]);

  const content = (
    <span
      className="relative block h-11 overflow-hidden rounded-full border border-current"
      style={{ perspective: 600 }}
    >
      {/* invisible text that only sets the button width */}
      <span className="invisible flex h-11 items-center px-6 text-sm uppercase tracking-widest">
        {sizer ?? label}
      </span>

      {/* the cube */}
      <span
        className="absolute inset-0 block"
        style={{
          transformStyle: "preserve-3d",
          transform: `translateZ(-${DEPTH}px) rotateX(${step * 90}deg)`,
          transition: "transform 0.7s cubic-bezier(0.7, 0, 0.2, 1)",
        }}
      >
        {faces.map((text, k) => (
          <span
            key={k}
            className="absolute inset-0 flex items-center justify-center whitespace-nowrap text-sm uppercase tracking-widest"
            style={{
              transform: `rotateX(${-k * 90}deg) translateZ(${DEPTH}px)`,
              backfaceVisibility: "hidden",
            }}
          >
            {text}
          </span>
        ))}
      </span>
    </span>
  );

  const shared = {
    onClick,
    onMouseEnter: () => roll(label),
    className: `inline-block ${className}`,
  };

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={target === "_blank" ? "noreferrer" : undefined}
        {...shared}
      >
        {content}
      </a>
    );
  }

  return (
    <button type="button" {...shared}>
      {content}
    </button>
  );
}