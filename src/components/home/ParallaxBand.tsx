import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { SplitLines } from "@/components/ui/SplitLines";
import { ParallaxImage } from "@/components/visual/ParallaxImage";
import { editorial } from "@/data/projects";

const [doorway, pergola, window_] = editorial;

export function ParallaxBand() {
  return (
    <section className="relative overflow-hidden bg-ink py-[clamp(5rem,10vw,10rem)] text-ivory">
      <div className="container-wide">
        <div className="grid items-start gap-x-10 gap-y-8 lg:grid-cols-12">
          {/* tall portrait frame */}
          {doorway && (
            <div className="lg:col-span-5">
              <ParallaxImage
                photo={doorway}
                alt="Puerta de entrada de madera maciza con talla tradicional, instalada en una vivienda de Marbella"
                className="aspect-[3/4]"
                sizes="(max-width: 1024px) 100vw, 40vw"
                amount={10}
              />
              <p className="label mt-4 text-ivory/45">
                Puerta de entrada tallada · Obra de M&amp;M
              </p>
            </div>
          )}

          {/* statement, sitting between the frames */}
          <div className="lg:col-span-7 lg:pl-[clamp(0rem,4vw,4rem)] lg:pt-[clamp(2rem,8vw,7rem)]">
            <Eyebrow className="text-copper-2">El oficio</Eyebrow>
            <SplitLines
              as="h2"
              className="mt-7 font-display text-d2"
              lines={[
                "La madera no",
                <span key="impone">
                  se <em className="italic text-copper-2">impone</em>:
                </span>,
                "se escucha.",
              ]}
            />
            <Reveal as="p" className="mt-8 max-w-lg text-lede text-ivory/65">
              Cada tabla llega con su propia veta, su densidad y su forma de moverse con la
              humedad de la costa. Nuestro trabajo consiste en leerla antes de cortarla, y
              decidir dónde quedará vista y dónde trabajará en silencio.
            </Reveal>

            {pergola && (
              <div className="mt-[clamp(2.5rem,5vw,4rem)] lg:max-w-xl">
                <ParallaxImage
                  photo={pergola}
                  alt="Pérgola de madera construida sobre la zona de piscina de una vivienda"
                  className="aspect-[16/10]"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  amount={8}
                />
                <p className="label mt-4 text-ivory/45">Pérgola a medida · Obra de M&amp;M</p>
              </div>
            )}
          </div>
        </div>

        {/* offset third frame */}
        {window_ && (
          <div className="mt-[clamp(3rem,6vw,5rem)] grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4 lg:col-start-3">
              <ParallaxImage
                photo={window_}
                alt="Ventana de madera con contraventana de celosía abierta hacia el interior"
                className="aspect-[4/3]"
                sizes="(max-width: 1024px) 100vw, 30vw"
                amount={14}
              />
              <p className="label mt-4 text-ivory/45">Ventana y celosía · Obra de M&amp;M</p>
            </div>
            <Reveal className="flex items-end lg:col-span-4 lg:col-start-8">
              <p className="max-w-sm text-ivory/55">
                Fabricamos en nuestro taller de Marbella y colocamos nosotros mismos. El
                ajuste final lo hace siempre quien ha construido la pieza.
              </p>
            </Reveal>
          </div>
        )}
      </div>
    </section>
  );
}
