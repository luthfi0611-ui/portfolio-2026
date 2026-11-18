"use client";

type Props = {
  label: string;
  arrow?: string;
  href?: string;
  target?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
  className?: string;
  invertClass?: string; // text color while the fill covers the button
};

export default function FillButton({
  label,
  arrow,
  href,
  target,
  onClick,
  className = "",
  invertClass = "group-hover:text-background",
}: Props) {
  const classes = `group relative inline-flex h-11 items-center gap-2 overflow-hidden rounded-full border border-current px-6 text-sm uppercase tracking-widest ${className}`;

  const inner = (
    <>
      <span
        aria-hidden="true"
        className="absolute inset-0 translate-y-[101%] rounded-t-[100%] bg-current transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:rounded-t-none"
      />
      <span
        className={`relative z-10 transition-colors duration-500 ${invertClass}`}
      >
        {label}
      </span>
      {arrow && (
        <span
          className={`relative z-10 transition-all duration-500 group-hover:translate-x-1 ${invertClass}`}
        >
          {arrow}
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={target === "_blank" ? "noreferrer" : undefined}
        onClick={onClick}
        className={classes}
      >
        {inner}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {inner}
    </button>
  );
}