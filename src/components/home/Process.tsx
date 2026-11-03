import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { SplitLines } from "@/components/ui/SplitLines";
import { process } from "@/data/site";

export function Process() {
  return (
    <section className="section-y bg-ink text-ivory">
      <div className="container-wide grid gap-y-14 lg:grid-cols-12 lg:gap-x-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <Eyebrow className="text-copper-2">Cómo trabajamos</Eyebrow>
            <SplitLines
              as="h2"
              className="mt-6 font-display text-d3"
              lines={["De la visita", "a la colocación."]}
            />
            <p className="mt-7 max-w-sm text-ivory/60">
              El mismo equipo mide, dibuja, fabrica e instala. Nadie traslada el problema al
              siguiente.
            </p>
          </div>
        </div>

        <ol className="lg:col-span-8">
          {process.map((step, index) => (
            <Reveal
              as="li"
              key={step.number}
              i={index}
              className="group/step grid gap-4 border-t border-ivory/14 py-8 sm:grid-cols-[auto_1fr] sm:gap-10 md:py-10"
            >
              <span className="font-display text-d4 leading-none text-copper-2/70 tabular-nums transition-colors duration-500 group-hover/step:text-copper-2">
                {step.number}
              </span>
              <div>
                <h3 className="font-display text-d4 leading-tight">{step.title}</h3>
                <p className="mt-3 max-w-xl text-ivory/62">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
