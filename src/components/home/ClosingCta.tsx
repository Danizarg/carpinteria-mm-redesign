import { ButtonAnchor, ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { SplitLines } from "@/components/ui/SplitLines";
import { WoodGrain } from "@/components/visual/WoodGrain";
import { contact, site, whatsappHref } from "@/data/site";

export function ClosingCta() {
  return (
    <section className="relative overflow-hidden bg-walnut text-ivory">
      <WoodGrain tone="dark" seed={44} />
      <div aria-hidden className="absolute inset-0 bg-walnut/55" />

      <div className="container-wide relative py-[clamp(5rem,11vw,11rem)]">
        <Eyebrow className="text-copper-2">Presupuesto sin compromiso</Eyebrow>

        <SplitLines
          as="h2"
          className="mt-7 max-w-[16ch] font-display text-d1"
          lines={[
            "Cuéntenos",
            <span key="proyecto">
              su <em className="italic">proyecto</em>.
            </span>,
          ]}
        />

        <Reveal as="p" className="mt-8 max-w-xl text-lede text-ivory/70">
          Estudiamos sus necesidades, le ofrecemos una visión anticipada del producto final y
          un presupuesto detallado, sin ningún compromiso.
        </Reveal>

        <div className="mt-11 flex flex-wrap items-center gap-3">
          <ButtonLink href="/contacto" variant="solid">
            Solicitar presupuesto
          </ButtonLink>
          <ButtonAnchor
            href={whatsappHref(`Hola ${site.shortName}, me gustaría pedir un presupuesto.`)}
            target="_blank"
            rel="noreferrer"
            variant="outline"
          >
            Escribir por WhatsApp
          </ButtonAnchor>
        </div>

        <dl className="mt-[clamp(3.5rem,7vw,6rem)] grid gap-x-10 gap-y-9 border-t border-ivory/18 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          <Reveal as="div">
            <dt className="label text-ivory/45">Taller</dt>
            <dd className="mt-3 text-ivory/85">
              {contact.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </dd>
          </Reveal>
          <Reveal as="div" i={1}>
            <dt className="label text-ivory/45">Teléfono</dt>
            <dd className="mt-3">
              {contact.phones.map((phone) => (
                <a
                  key={phone.href}
                  href={phone.href}
                  className="block text-ivory/85 transition-colors hover:text-copper-2"
                >
                  {phone.label}
                </a>
              ))}
            </dd>
          </Reveal>
          <Reveal as="div" i={2}>
            <dt className="label text-ivory/45">Email</dt>
            <dd className="mt-3">
              <a
                href={`mailto:${contact.email}`}
                className="break-all text-ivory/85 transition-colors hover:text-copper-2"
              >
                {contact.email}
              </a>
            </dd>
          </Reveal>
          <Reveal as="div" i={3}>
            <dt className="label text-ivory/45">Horario de oficina</dt>
            <dd className="mt-3 text-ivory/85">
              {contact.officeHours.map((slot) => (
                <span key={slot} className="block">
                  {slot}
                </span>
              ))}
            </dd>
          </Reveal>
        </dl>
      </div>
    </section>
  );
}
