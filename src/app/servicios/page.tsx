import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/chrome/PageHeader";
import { ClosingCta } from "@/components/home/ClosingCta";
import { FrameReveal, Reveal } from "@/components/ui/Reveal";
import { ToneCurtain } from "@/components/visual/ToneCurtain";
import { WoodGrain } from "@/components/visual/WoodGrain";
import { serviceCovers } from "@/data/projects";
import { services, site } from "@/data/site";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Puertas de entrada y de paso, vestidores y mobiliario a medida, ventanas, pérgolas y pasamanos, y muebles de baño. Taller propio de carpintería y ebanistería en Marbella.",
  alternates: { canonical: "/servicios" },
};

export default function ServiciosPage() {
  return (
    <>
      <PageHeader
        eyebrow="Servicios"
        seed={52}
        lines={["Cuatro oficios,", "un mismo taller."]}
        lede={`Diseñamos, fabricamos y colocamos nosotros mismos. Más de ${site.yearsOfExperience} años de carpintería y ebanistería en ${site.city}.`}
      />

      <ToneCurtain from="#14100e">
        <section className="section-y bg-ivory text-ink">
          <div className="container-wide grid gap-x-8 gap-y-14 md:grid-cols-2">
            {services.map((service, index) => {
              const cover = serviceCovers[service.key];
              return (
                <Reveal key={service.key} i={index % 2} className={index % 2 ? "md:mt-20" : ""}>
                  <Link href={service.href} className="group/card block">
                    <FrameReveal>
                      <div
                        className="relative aspect-[4/3] overflow-hidden bg-ink/10"
                        data-cursor="media"
                        data-cursor-label="Ver"
                      >
                        {cover ? (
                          <Image
                            src={cover.src}
                            alt={`${service.title} — trabajo realizado por M&M en Marbella`}
                            fill
                            sizes="(max-width: 768px) 100vw, 46vw"
                            className="graded object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:scale-[1.06]"
                          />
                        ) : (
                          <WoodGrain tone="dark" seed={71} pointerLight={false} sheen={false} />
                        )}
                      </div>
                    </FrameReveal>

                    <div className="mt-6 flex items-baseline gap-5">
                      <span className="label shrink-0 text-copper">{service.number}</span>
                      <div>
                        <h2 className="font-display text-d4 leading-tight transition-colors duration-400 group-hover/card:text-copper">
                          {service.title}
                        </h2>
                        <p className="mt-3 max-w-md text-ink/65">{service.summary}</p>
                        <span className="label mt-5 inline-flex items-center gap-3 text-ink/70">
                          Ver la especialidad
                          <span
                            aria-hidden
                            className="transition-transform duration-400 group-hover/card:translate-x-1.5"
                          >
                            →
                          </span>
                        </span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </section>
      </ToneCurtain>

      <ToneCurtain from="#f5f0e7">
        <ClosingCta />
      </ToneCurtain>
    </>
  );
}
