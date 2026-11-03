import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { Magnetic } from "./Magnetic";

type Variant = "solid" | "outline" | "ghost";

const base =
  "group/btn relative inline-flex items-center justify-center gap-3 overflow-hidden " +
  "px-7 py-4 label select-none transition-colors duration-500 " +
  "disabled:opacity-45 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  solid: "bg-copper text-ivory hover:text-ink",
  outline: "border border-current text-current hover:text-ink",
  ghost: "text-current hover:text-copper-2 px-0 py-2",
};

/** The wipe that fills solid and outline buttons on hover. */
function Wipe({ variant }: { variant: Variant }) {
  if (variant === "ghost") return null;
  return (
    <span
      aria-hidden
      className="absolute inset-0 -z-0 origin-bottom scale-y-0 bg-ivory transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:scale-y-100 group-focus-visible/btn:scale-y-100"
    />
  );
}

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  magnetic?: boolean;
};

export function ButtonLink({
  children,
  variant = "solid",
  className = "",
  magnetic = true,
  ...rest
}: CommonProps & ComponentProps<typeof Link>) {
  const content = (
    <Link className={`${base} ${variants[variant]} ${className}`} {...rest}>
      <Wipe variant={variant} />
      <span className="relative z-10 flex items-center gap-3">{children}</span>
    </Link>
  );
  return magnetic ? <Magnetic>{content}</Magnetic> : content;
}

export function ButtonAnchor({
  children,
  variant = "solid",
  className = "",
  magnetic = true,
  ...rest
}: CommonProps & ComponentProps<"a">) {
  const content = (
    <a className={`${base} ${variants[variant]} ${className}`} {...rest}>
      <Wipe variant={variant} />
      <span className="relative z-10 flex items-center gap-3">{children}</span>
    </a>
  );
  return magnetic ? <Magnetic>{content}</Magnetic> : content;
}

export function Button({
  children,
  variant = "solid",
  className = "",
  magnetic = false,
  ...rest
}: CommonProps & ComponentProps<"button">) {
  const content = (
    <button className={`${base} ${variants[variant]} ${className}`} {...rest}>
      <Wipe variant={variant} />
      <span className="relative z-10 flex items-center gap-3">{children}</span>
    </button>
  );
  return magnetic ? <Magnetic>{content}</Magnetic> : content;
}
