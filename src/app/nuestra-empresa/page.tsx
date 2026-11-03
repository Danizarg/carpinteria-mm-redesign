import type { Metadata } from "next";
import { PageHeader } from "@/components/chrome/PageHeader";
import { Process } from "@/components/home/Process";
import { ClosingCta } from "@/components/home/ClosingCta";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { SplitLines } from "@/components/ui/SplitLines";
import { ParallaxImage } from "@/components/visual/ParallaxImage";
import { ToneCurtain } from "@/components/visual/ToneCurtain";
import { editorial, featured } from "@/data/projects";
import { divisions, site } from "@/data/site";

export const metadata: Metadata = {
  title: "Nuestra empresa",
  description:
    "Más de 30 años de carpintería y ebanistería en Marbella. Diseño, fabricación y colocación propias, con soporte informático de diseño y presupuesto sin compromiso.",
  alternates: { canonical: "/nuestra-empresa" },
};

/** Taken from the company's own «Nuestros Trabajos» description. */
const DISCIPLINES = [
  "Puertas",
  "Balcones",
  "Cocinas",
  "Bibliotecas",
  "Baños",
  "Armarios empotrados",
  "Pérgolas",
  "Muebles de salón",
  "Dormitorios",
  "Escaleras",
  "Acabados",
  "Remodelación de espacios",
];

export default function NuestraEmpresaPage() {
  const [portrait] = editorial;
  const second = featured[2];

  return (
    <>
      <PageHeader
        eyebrow="Nuestra empresa"
        seed={33}
        lines={["Un taller,", "no un catálogo."]}
        lede={
          <>
            Somos una empresa con más de {site.yearsOfExperience} años de experiencia en el
            sector, dedicada al diseño, fabricación y colocación de todo tipo de trabajos en
            madera.
          </>
        }
      />

      <ToneCurtain from="#14100e">
        <section className="section-y bg-ivory text-ink">
          <div className="container-wide grid gap-y-14 lg:grid-cols-12 lg:gap-x-16">
            <div className="lg:col-span-5">
              {portrait && (
                <ParallaxImage
                  photo={portrait}
                  alt="Puerta de entrada de madera maciza con talla tradicional, obra del taller M&M"
                  className="aspect-[3/4]"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  overlay={false}
                  amount={9}
                />
              )}
            </div>

            <div className="lg:col-span-7 lg:pt-6">
              <Eyebrow>Quiénes somos</Eyebrow>
              <SplitLines
                as="h2"
                className="mt-6 font-display text-d3"
                lines={["La madera, el cliente", "y el metro. En ese orden."]}
              />

              <div className="mt-8 space-y-6 text-lede text-ink/72">
                <Reveal as="p">
                  Trabajamos con gran diversidad de tipos de madera, combinándolas con otros
                  materiales y mecanismos avanzados para ofrecer a nuestros clientes
                  productos modernos y con alto nivel de calidad.
                </Reveal>
                <Reveal as="p" i={1}>
                  Le asesoramos e incluso podemos contribuir con sus diseños aportando
                  detalles técnicos. Disponemos además de un soporte informático de diseño
                  donde se estudian las necesidades del cliente y se le ofrece una visión
                  anticipada del producto final y presupuesto sin compromiso.
                </Reveal>
                <Reveal as="p" i={2}>
                  Para nuestros clientes tenemos soluciones integrales, a la medida de sus
                  necesidades. Contamos con el talento y la tecnología para diseñar y
                  elaborar elementos individuales, y también para desarrollar proyectos
                  completos de remodelación de espacios para casa y oficina.
                </Reveal>
              </div>
            </div>
          </div>
        </section>
      </ToneCurtain>

      {/* Divisions */}
      <section className="bg-ivory pb-[clamp(4rem,9vw,8rem)] text-ink">
        <div className="container-wide">
          <div className="grid gap-px border border-ink/12 bg-ink/12 md:grid-cols-2">
            {divisions.map((division, index) => (
              <Reveal
                key={division.title}
                i={index}
                className="bg-ivory p-[clamp(1.75rem,3.5vw,3rem)]"
              >
                <span className="label text-copper">0{index + 1}</span>
                <h3 className="mt-5 font-display text-d4">{division.title}</h3>
                <p className="mt-4 max-w-md text-ink/65">{division.body}</p>
              </Reveal>
            ))}
          </div>

          <div className="mt-[clamp(3.5rem,7vw,6rem)] grid gap-y-10 lg:grid-cols-12 lg:gap-x-16">
            <div className="lg:col-span-4">
              <Eyebrow>Qué fabricamos</Eyebrow>
              <p className="mt-6 max-w-sm text-ink/65">
                Elementos individuales o la carpintería completa de una vivienda, siempre con
                la misma madera y el mismo acabado de principio a fin.
              </p>
            </div>
            <ul className="grid grid-cols-2 gap-px self-start border border-ink/12 bg-ink/12 sm:grid-cols-3 lg:col-span-8">
              {DISCIPLINES.map((item, index) => (
                <Reveal
                  as="li"
                  key={item}
                  i={index % 6}
                  className="bg-ivory px-5 py-6 text-sm text-ink/75"
                >
                  {item}
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Wide photographic band */}
      {second && (
        <section className="bg-ivory pb-[clamp(4rem,9vw,8rem)]">
          <div className="container-wide">
            <ParallaxImage
              photo={second}
              alt="Vestidor a medida con frentes lacados e iluminación integrada, obra del taller M&M"
              className="aspect-[16/9] md:aspect-[21/9]"
              sizes="100vw"
              amount={10}
              overlay={false}
            />
            <p className="label mt-4 text-ink/45">
              Vestidor a medida · Fotografía del archivo de M&amp;M
            </p>
          </div>
        </section>
      )}

      <ToneCurtain from="#f5f0e7">
        <Process />
      </ToneCurtain>

      <ClosingCta />
    </>
  );
}
