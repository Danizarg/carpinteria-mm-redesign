import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { SplitLines } from "@/components/ui/SplitLines";
import { divisions, site } from "@/data/site";

const FACTS = [
  { value: `+${site.yearsOfExperience}`, label: "Años en el oficio" },
  { value: "Propio", label: "Taller en Marbella" },
  { value: "3 en 1", label: "Diseño, fabricación y colocación" },
  { value: "0 €", label: "Presupuesto sin compromiso" },
];

export function Manifesto() {
  return (
    <section className="section-y bg-ivory text-ink">
      <div className="container-wide">
        <div className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-16">
          <div className="lg:col-span-7">
            <Eyebrow>Nuestra empresa</Eyebrow>
            <SplitLines
              as="h2"
              className="mt-7 font-display text-d2"
              lines={[
                "Treinta años",
                <span key="hand">
                  midiendo <em className="italic">a mano</em>
                </span>,
                "lo que la máquina corta.",
              ]}
            />
          </div>

          <div className="space-y-6 text-lede text-ink/72 lg:col-span-5 lg:pt-4">
            <Reveal as="p">
              Somos una empresa con más de {site.yearsOfExperience} años de experiencia en el
              sector, dedicada al diseño, fabricación y colocación de todo tipo de trabajos en
              madera.
            </Reveal>
            <Reveal as="p" i={1}>
              Trabajamos con gran diversidad de maderas, combinándolas con otros materiales y
              mecanismos avanzados para ofrecer productos modernos y de alto nivel de calidad.
            </Reveal>
            <Reveal as="p" i={2}>
              Le asesoramos e incluso podemos contribuir con sus diseños aportando detalles
              técnicos. Disponemos de un soporte informático de diseño donde estudiamos sus
              necesidades y le ofrecemos una visión anticipada del producto final.
            </Reveal>
            <Reveal as="div" i={3} className="pt-2">
              <Link
                href="/nuestra-empresa"
                className="label group/link inline-flex items-center gap-3 border-b border-ink/25 pb-2 text-ink transition-colors hover:border-copper hover:text-copper"
              >
                Conocer el taller
                <span
                  aria-hidden
                  className="transition-transform duration-400 group-hover/link:translate-x-1"
                >
                  →
                </span>
              </Link>
            </Reveal>
          </div>
        </div>

        {/* The two divisions the company works in */}
        <div className="mt-[clamp(4rem,8vw,7rem)] grid gap-px border border-ink/12 bg-ink/12 md:grid-cols-2">
          {divisions.map((division, index) => (
            <Reveal
              key={division.title}
              i={index}
              className="bg-ivory p-[clamp(1.75rem,3.5vw,3rem)]"
            >
              <h3 className="font-display text-d4">{division.title}</h3>
              <p className="mt-4 max-w-md text-ink/65">{division.body}</p>
            </Reveal>
          ))}
        </div>

        {/* Honest trust rail — no invented metrics */}
        <ul className="mt-[clamp(3rem,6vw,5rem)] grid grid-cols-2 gap-x-8 gap-y-10 border-t border-ink/12 pt-10 lg:grid-cols-4">
          {FACTS.map((fact, index) => (
            <Reveal as="li" key={fact.label} i={index}>
              <span className="block font-display text-d3 leading-none text-copper">
                {fact.value}
              </span>
              <span className="mt-3 block max-w-[18ch] text-sm text-ink/60">{fact.label}</span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
