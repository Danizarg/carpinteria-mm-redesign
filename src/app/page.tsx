import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Manifesto } from "@/components/home/Manifesto";
import { ParallaxBand } from "@/components/home/ParallaxBand";
import { CategoryRail } from "@/components/home/CategoryRail";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { Process } from "@/components/home/Process";
import { ClosingCta } from "@/components/home/ClosingCta";
import { ToneCurtain } from "@/components/visual/ToneCurtain";
import { site } from "@/data/site";

const INK = "#14100e";
const IVORY = "#f5f0e7";
const WALNUT = "#3d2b20";

export const metadata: Metadata = {
  title: `${site.name} · Carpintería a medida en Marbella`,
  description: site.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />

      <ToneCurtain from={INK}>
        <Manifesto />
      </ToneCurtain>

      <ToneCurtain from={IVORY}>
        <ParallaxBand />
      </ToneCurtain>

      <CategoryRail />

      <ToneCurtain from={WALNUT}>
        <FeaturedWork />
      </ToneCurtain>

      <ToneCurtain from={IVORY}>
        <Process />
      </ToneCurtain>

      <ClosingCta />
    </>
  );
}
