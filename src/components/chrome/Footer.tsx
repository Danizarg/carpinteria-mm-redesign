import Link from "next/link";
import { contact, mapsHref, services, site, whatsappHref } from "@/data/site";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CursorToggle } from "./CustomCursor";
import { WoodGrain } from "@/components/visual/WoodGrain";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-ivory">
      <WoodGrain tone="dark" seed={27} pointerLight={false} />
      <div className="absolute inset-0 bg-ink/72" aria-hidden />

      <div className="container-wide relative pb-10 pt-[clamp(4rem,9vw,8rem)]">
        <div className="grid gap-12 border-b border-ivory/12 pb-14 lg:grid-cols-[1.2fr_1fr_1fr_1fr] lg:gap-10">
          <div>
            <p className="font-display text-d3 leading-[0.95]">
              {site.tagline.replace(/\.$/, "")}
              <span className="text-copper-2">.</span>
            </p>
            <p className="mt-6 max-w-sm text-ivory/60">
              Taller de carpintería y ebanistería en {site.city}. Diseño, fabricación y
              colocación propias desde hace más de {site.yearsOfExperience} años.
            </p>
          </div>

          <nav aria-label="Servicios">
            <Eyebrow rule={false}>Servicios</Eyebrow>
            <ul className="mt-5 space-y-2.5">
              {services.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="text-ivory/70 transition-colors hover:text-copper-2"
                  >
                    {service.nav}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Secciones">
            <Eyebrow rule={false}>Navegación</Eyebrow>
            <ul className="mt-5 space-y-2.5">
              {[
                { label: "Inicio", href: "/" },
                { label: "Nuestra empresa", href: "/nuestra-empresa" },
                { label: "Proyectos", href: "/proyectos" },
                { label: "Contacto y presupuesto", href: "/contacto" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-ivory/70 transition-colors hover:text-copper-2"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <Eyebrow rule={false}>Taller</Eyebrow>
            <address className="mt-5 space-y-2.5 not-italic text-ivory/70">
              <a
                href={mapsHref}
                target="_blank"
                rel="noreferrer"
                className="block transition-colors hover:text-copper-2"
              >
                {contact.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </a>
              <div className="pt-2">
                {contact.phones.map((phone) => (
                  <a
                    key={phone.href}
                    href={phone.href}
                    className="block transition-colors hover:text-copper-2"
                  >
                    {phone.label}
                  </a>
                ))}
              </div>
              <a
                href={`mailto:${contact.email}`}
                className="block break-all transition-colors hover:text-copper-2"
              >
                {contact.email}
              </a>
              <a
                href={whatsappHref(
                  `Hola ${site.shortName}, me gustaría solicitar información.`
                )}
                target="_blank"
                rel="noreferrer"
                className="block transition-colors hover:text-copper-2"
              >
                WhatsApp
              </a>
              <div className="pt-3 text-sm text-ivory/45">
                <span className="block">Horario de oficina</span>
                {contact.officeHours.map((slot) => (
                  <span key={slot} className="block">
                    {slot}
                  </span>
                ))}
              </div>
            </address>
          </div>
        </div>

        {/* Oversized wordmark — full-bleed so the fade lands on the real
            viewport edges rather than on the container's gutter. */}
        <div className="edge-fade-x -mx-[var(--gutter)] py-10" aria-hidden>
          <p className="whitespace-nowrap text-center font-display leading-none text-ivory/10 [font-size:clamp(3rem,11.5vw,12rem)]">
            {site.shortName} · {site.city}
          </p>
        </div>

        <div className="flex flex-col gap-5 border-t border-ivory/12 pt-7 text-sm text-ivory/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. Todos los derechos reservados.
          </p>
          <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
            <CursorToggle />
            <Link href="/aviso-legal" className="transition-colors hover:text-ivory/80">
              Aviso legal y privacidad
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
