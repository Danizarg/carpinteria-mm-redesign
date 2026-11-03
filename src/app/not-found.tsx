import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { WoodGrain } from "@/components/visual/WoodGrain";
import { services } from "@/data/site";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[86svh] items-center overflow-hidden bg-ink text-ivory">
      <WoodGrain tone="dark" seed={77} />
      <div aria-hidden className="absolute inset-0 bg-ink/70" />

      <div className="container-wide relative py-32">
        <Eyebrow className="text-copper-2">Error 404</Eyebrow>
        <h1 className="mt-7 max-w-[14ch] font-display text-d1 leading-[0.9]">
          Esta pieza no <em className="italic">existe</em>.
        </h1>
        <p className="mt-7 max-w-lg text-lede text-ivory/65">
          La página que busca no está en el sitio. Puede volver al inicio o ir directamente a
          una de nuestras especialidades.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/" variant="solid">
            Volver al inicio
          </ButtonLink>
          <ButtonLink href="/proyectos" variant="outline">
            Ver proyectos
          </ButtonLink>
        </div>

        <ul className="mt-14 flex flex-wrap gap-x-8 gap-y-3 border-t border-ivory/14 pt-8">
          {services.map((service) => (
            <li key={service.key}>
              <Link
                href={service.href}
                className="label text-ivory/55 transition-colors hover:text-copper-2"
              >
                {service.nav}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
