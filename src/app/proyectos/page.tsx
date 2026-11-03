import type { Metadata } from "next";
import { PageHeader } from "@/components/chrome/PageHeader";
import { ProjectGallery } from "@/components/work/ProjectGallery";
import { ClosingCta } from "@/components/home/ClosingCta";
import { ToneCurtain } from "@/components/visual/ToneCurtain";
import { allPhotos } from "@/data/projects";

export const metadata: Metadata = {
  title: "Proyectos",
  description:
    "Archivo de trabajos de Carpintería y Ebanistería M&M en Marbella: puertas de entrada y de paso, vestidores, ventanas, pérgolas y pasamanos fabricados y colocados por el taller.",
  alternates: { canonical: "/proyectos" },
};

export default function ProyectosPage() {
  return (
    <>
      <PageHeader
        eyebrow="Archivo"
        seed={19}
        lines={["Obra realizada", "en la Costa del Sol."]}
        lede={
          <>
            {allPhotos.length} fotografías del archivo del taller. Todas corresponden a
            trabajos fabricados y colocados por nosotros — no hay imágenes de catálogo entre
            ellas.
          </>
        }
      />

      <ToneCurtain from="#14100e">
        <section className="bg-ivory py-[clamp(3rem,6vw,5rem)] text-ink">
          <ProjectGallery />
        </section>
      </ToneCurtain>

      <ToneCurtain from="#f5f0e7">
        <ClosingCta />
      </ToneCurtain>
    </>
  );
}
