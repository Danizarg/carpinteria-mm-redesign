import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { SplitLines } from "@/components/ui/SplitLines";
import { WoodGrain } from "@/components/visual/WoodGrain";

export function PageHeader({
  eyebrow,
  lines,
  lede,
  seed = 7,
  children,
}: {
  eyebrow: string;
  /** Authored line breaks for the oversized title. */
  lines: ReactNode[];
  lede?: ReactNode;
  seed?: number;
  children?: ReactNode;
}) {
  return (
    <header className="relative overflow-hidden bg-ink text-ivory">
      <WoodGrain tone="dark" seed={seed} />
      <div aria-hidden className="absolute inset-0 bg-ink/68" />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(110%_80%_at_50%_0%,transparent_40%,rgba(10,8,7,0.8)_100%)]"
      />

      <div className="container-wide relative pb-[clamp(3rem,7vw,6rem)] pt-[clamp(8rem,15vw,13rem)]">
        <Eyebrow className="text-copper-2">{eyebrow}</Eyebrow>
        <SplitLines
          as="h1"
          onMount
          delay={0.15}
          className="mt-7 font-display text-d2"
          lines={lines}
        />
        {lede && (
          <Reveal as="p" className="mt-8 max-w-2xl text-lede text-ivory/68">
            {lede}
          </Reveal>
        )}
        {children}
      </div>
    </header>
  );
}
