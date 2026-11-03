import type { Metadata } from "next";
import { PageHeader } from "@/components/chrome/PageHeader";
import { QuoteFlow } from "@/components/forms/QuoteFlow";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { ToneCurtain } from "@/components/visual/ToneCurtain";
import { contact, mapsHref, site, whatsappHref } from "@/data/site";

export const metadata: Metadata = {
  title: "Contacto y solicitud de presupuesto",
  description:
    "Pida presupuesto sin compromiso a Carpintería y Ebanistería M&M. Taller en C/ Madera 4, Polígono Industrial La Ermita, Marbella. Teléfonos 952 926 759 y 691 756 583.",
  alternates: { canonical: "/contacto" },
};

export default function ContactoPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contacto"
        seed={88}
        lines={["Pida presupuesto", "sin compromiso."]}
        lede="Estudiamos sus necesidades, le ofrecemos una visión anticipada del producto final y un presupuesto detallado por partidas."
      />

      <ToneCurtain from="#14100e">
        <section className="section-y bg-ivory text-ink">
          <div className="container-wide grid gap-y-14 lg:grid-cols-12 lg:gap-x-14">
            {/* Quotation flow */}
            <div className="lg:col-span-7">
              <Eyebrow>Solicitud de presupuesto</Eyebrow>
              <h2 className="sr-only">Formulario de solicitud de presupuesto</h2>
              <div className="mt-6">
                <QuoteFlow />
              </div>
            </div>

            {/* Direct channels */}
            <aside className="lg:col-span-4 lg:col-start-9">
              <Eyebrow>Directo</Eyebrow>
              <h2 className="mt-6 font-display text-d3 leading-tight">
                O hable con
                <br />
                nosotros ahora.
              </h2>

              <dl className="mt-9">
                <Reveal as="div" className="border-t border-ink/15 py-5">
                  <dt className="label text-ink/45">Teléfono</dt>
                  <dd className="mt-2 space-y-1">
                    {contact.phones.map((phone) => (
                      <a
                        key={phone.href}
                        href={phone.href}
                        className="block text-lede transition-colors hover:text-copper"
                      >
                        {phone.label}
                      </a>
                    ))}
                  </dd>
                </Reveal>

                <Reveal as="div" i={1} className="border-t border-ink/15 py-5">
                  <dt className="label text-ink/45">WhatsApp</dt>
                  <dd className="mt-2">
                    <a
                      href={whatsappHref(
                        `Hola ${site.shortName}, me gustaría pedir un presupuesto.`
                      )}
                      target="_blank"
                      rel="noreferrer"
                      className="text-lede transition-colors hover:text-copper"
                    >
                      {contact.whatsapp.label}
                    </a>
                  </dd>
                </Reveal>

                <Reveal as="div" i={2} className="border-t border-ink/15 py-5">
                  <dt className="label text-ink/45">Email</dt>
                  <dd className="mt-2">
                    <a
                      href={`mailto:${contact.email}`}
                      className="break-all text-lede transition-colors hover:text-copper"
                    >
                      {contact.email}
                    </a>
                  </dd>
                </Reveal>

                <Reveal as="div" i={3} className="border-t border-ink/15 py-5">
                  <dt className="label text-ink/45">Horario de oficina</dt>
                  <dd className="mt-2 text-lede">
                    {contact.officeHours.map((slot) => (
                      <span key={slot} className="block">
                        {slot}
                      </span>
                    ))}
                  </dd>
                </Reveal>

                <Reveal as="div" i={4} className="border-y border-ink/15 py-5">
                  <dt className="label text-ink/45">Taller</dt>
                  <dd className="mt-2">
                    <address className="not-italic text-lede leading-relaxed">
                      {contact.addressLines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </address>
                    <a
                      href={mapsHref}
                      target="_blank"
                      rel="noreferrer"
                      className="label group/map mt-4 inline-flex items-center gap-3 border-b border-ink/25 pb-2 transition-colors hover:border-copper hover:text-copper"
                    >
                      Cómo llegar
                      <span
                        aria-hidden
                        className="transition-transform duration-400 group-hover/map:translate-x-1"
                      >
                        →
                      </span>
                    </a>
                  </dd>
                </Reveal>
              </dl>
            </aside>
          </div>
        </section>
      </ToneCurtain>
    </>
  );
}
