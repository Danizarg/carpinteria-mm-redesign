import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/chrome/PageHeader";
import { ClosingCta } from "@/components/home/ClosingCta";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { SplitLines } from "@/components/ui/SplitLines";
import { ParallaxImage } from "@/components/visual/ParallaxImage";
import { ToneCurtain } from "@/components/visual/ToneCurtain";
import { CategoryGallery } from "@/components/work/CategoryGallery";
import { photosByCategory, serviceCovers } from "@/data/projects";
import { services, site } from "@/data/site";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};

  return {
    title: service.title,
    description: `${service.summary} Taller propio en ${site.city} con más de ${site.yearsOfExperience} años de experiencia.`,
    alternates: { canonical: service.href },
    openGraph: { title: `${service.title} · ${site.name}`, description: service.summary },
  };
}

export default async function ServicioPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const photos = photosByCategory(service.key);
  const cover = serviceCovers[service.key];
  const others = services.filter((s) => s.key !== service.key);

  return (
    <>
      <PageHeader
        eyebrow={`Especialidad ${service.number}`}
        seed={service.number.charCodeAt(1) * 7}
        lines={[service.display[0], service.display[1]]}
        lede={service.summary}
      />

      <ToneCurtain from="#14100e">
        <section className="section-y bg-ivory text-ink">
          <div className="container-wide">
            <div className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-16">
              <div className="space-y-6 text-lede text-ink/72 lg:col-span-7">
                {service.intro.map((paragraph, index) => (
                  <Reveal as="p" key={index} i={index}>
                    {paragraph}
                  </Reveal>
                ))}
              </div>

              <dl className="lg:col-span-4 lg:col-start-9">
                {service.notes.map((note, index) => (
                  <Reveal
                    as="div"
                    key={note.label}
                    i={index}
                    className="border-t border-ink/15 py-5 first:border-t-0 first:pt-0"
                  >
                    <dt className="label text-ink/45">{note.label}</dt>
                    <dd className="mt-2 text-ink/80">{note.value}</dd>
                  </Reveal>
                ))}
              </dl>
            </div>

            {cover && (
              <div className="mt-[clamp(3rem,6vw,5rem)]">
                <ParallaxImage
                  photo={cover}
                  alt={`${service.title} — trabajo realizado por M&M en Marbella`}
                  className="aspect-[16/10] md:aspect-[21/9]"
                  sizes="100vw"
                  amount={10}
                  overlay={false}
                />
              </div>
            )}

            {/* Capabilities */}
            <div className="mt-[clamp(3.5rem,7vw,6rem)] grid gap-y-10 lg:grid-cols-12 lg:gap-x-16">
              <div className="lg:col-span-4">
                <Eyebrow>Qué incluye</Eyebrow>
                <SplitLines
                  as="h2"
                  className="mt-6 font-display text-d3"
                  lines={["Trabajos de", "esta especialidad."]}
                />
              </div>
              <ul className="grid gap-px self-start border border-ink/12 bg-ink/12 sm:grid-cols-2 lg:col-span-8">
                {service.capabilities.map((item, index) => (
                  <Reveal
                    as="li"
                    key={item}
                    i={index % 4}
                    className="flex items-start gap-4 bg-ivory px-6 py-6"
                  >
                    <span className="label mt-1 shrink-0 text-copper">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-ink/78">{item}</span>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </ToneCurtain>

      {/* Gallery for this specialisation */}
      <section className="bg-ivory pb-[clamp(4rem,9vw,8rem)] text-ink">
        <div className="container-wide">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6 border-t border-ink/15 pt-10">
            <h2 className="font-display text-d3">
              {photos.length > 0
                ? `${photos.length} fotografías del archivo`
                : "Archivo fotográfico"}
            </h2>
            <Link
              href="/proyectos"
              className="label group/all inline-flex items-center gap-3 border-b border-ink/25 pb-2 transition-colors hover:border-copper hover:text-copper"
            >
              Ver todas las especialidades
              <span
                aria-hidden
                className="transition-transform duration-400 group-hover/all:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>

          {photos.length > 0 ? (
            <CategoryGallery photos={photos} />
          ) : (
            <div className="border border-ink/15 px-6 py-16 text-center md:py-20">
              <p className="font-display text-d4">
                Todavía no hemos digitalizado fotografías de esta especialidad
              </p>
              <p className="mx-auto mt-4 max-w-xl text-ink/60">
                Fabricamos {service.title.toLowerCase()} de forma habitual, pero el archivo
                fotográfico de estos trabajos aún no está disponible. Preferimos no mostrar
                imágenes de catálogo como si fueran obra nuestra: si lo necesita, le
                enseñamos trabajos realizados y le damos referencias de clientes.
              </p>
              <Link
                href="/contacto"
                className="label mt-8 inline-flex items-center gap-3 border-b border-ink/30 pb-2 transition-colors hover:border-copper hover:text-copper"
              >
                Pedir referencias →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Other specialisations */}
      <section className="bg-ink py-[clamp(3.5rem,7vw,6rem)] text-ivory">
        <div className="container-wide">
          <Eyebrow className="text-copper-2">Otras especialidades</Eyebrow>
          <ul className="mt-8 border-t border-ivory/14">
            {others.map((other) => (
              <li key={other.key} className="border-b border-ivory/14">
                <Link
                  href={other.href}
                  className="group/row flex items-baseline justify-between gap-6 py-7"
                >
                  <span className="flex items-baseline gap-5">
                    <span className="label text-copper-2/70">{other.number}</span>
                    <span className="font-display text-d4 transition-colors duration-400 group-hover/row:text-copper-2">
                      {other.title}
                    </span>
                  </span>
                  <span
                    aria-hidden
                    className="shrink-0 text-ivory/40 transition-transform duration-400 group-hover/row:translate-x-2"
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ClosingCta />
    </>
  );
}
