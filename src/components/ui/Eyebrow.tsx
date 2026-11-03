import type { ReactNode } from "react";

/** Small capital label with a hairline rule — the section marker used site-wide. */
export function Eyebrow({
  children,
  className = "",
  rule = true,
}: {
  children: ReactNode;
  className?: string;
  rule?: boolean;
}) {
  return (
    <span className={`label inline-flex items-center gap-4 opacity-70 ${className}`}>
      {rule && <span aria-hidden className="h-px w-10 bg-current" />}
      {children}
    </span>
  );
}

/** Oversized index numeral used beside section headings and service titles. */
export function Numeral({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      aria-hidden
      className={`font-display text-d4 leading-none tabular-nums opacity-35 ${className}`}
    >
      {children}
    </span>
  );
}
