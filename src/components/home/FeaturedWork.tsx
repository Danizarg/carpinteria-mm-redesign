import Image from "next/image";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FrameReveal, Reveal } from "@/components/ui/Reveal";
import { SplitLines } from "@/components/ui/SplitLines";
import { altFor, featured } from "@/data/projects";

/** Editorial placement — deliberate, not a uniform grid. */
const LAYOUT = [
  { place: "lg:col-span-5 lg:col-start-1", aspect: "aspect-[3/4]", offset: "" },
  { place: "lg:col-span-6 lg:col-start-7", aspect: "aspect-[4/3]", offset: "lg:mt-28" },
  { place: "lg:col-span-4 lg:col-start-2", aspect: "aspect-[4/5]", offset: "lg:mt-16" },
  { place: "lg:col-span-5 lg:col-start-7", aspect: "aspect-[3/4]", offset: "lg:-mt-12" },
  { place: "lg:col-span-6 lg:col-start-1", aspect: "aspect-[16/10]", offset: "lg:mt-8" },
  { place: "lg:col-span-4 lg:col-start-8", aspect: "aspect-[4/5]", offset: "lg:mt-32" },
];

export function FeaturedWork() {
  const items = featured.slice(0, LAYOUT.length);

  return (
    <section className="section-y bg-ivory text-ink">
      <div className="container-wide">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <Eyebrow>Proyectos</Eyebrow>
            <SplitLines
              as="h2"
              className="mt-6 font-display text-d2"
              lines={["Obra construida,", "no renderizada."]}
            />
          </div>
          <Reveal>
            <Link
              href="/proyectos"
              className="label group/all inline-flex items-center gap-3 border-b border-ink/25 pb-2 transition-colors hover:border-copper hover:text-copper"
            >
              Ver el archivo completo
              <span
                aria-hidden
                className="transition-transform duration-400 group-hover/all:translate-x-1"
              >
                →
              </span>
            </Link>
          </Reveal>
        </div>

        <div className="mt-[clamp(3rem,6vw,5.5rem)] grid gap-x-8 gap-y-12 lg:grid-cols-12">
          {items.map((photo, index) => {
            const layout = LAYOUT[index];
            return (
              <figure key={photo.id} className={`${layout.place} ${layout.offset}`}>
                <FrameReveal>
                  <Link
                    href="/proyectos"
                    data-cursor="media"
                    data-cursor-label="Ver obra"
                    className="group/frame block overflow-hidden"
                  >
                    <div className={`relative ${layout.aspect} overflow-hidden bg-ink/10`}>
                      <Image
                        src={photo.src}
                        alt={altFor(photo)}
                        fill
                        sizes="(max-width: 1024px) 100vw, 45vw"
                        className="graded object-cover transition-transform duration-[1300ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/frame:scale-[1.07]"
                      />
                    </div>
                  </Link>
                </FrameReveal>
                <figcaption className="mt-4 flex items-baseline justify-between gap-4">
                  <span className="label text-ink/55">{photo.kind}</span>
                  <span className="label text-ink/30">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
