import type { Metadata } from "next";
import { PageHeader } from "@/components/chrome/PageHeader";
import { ToneCurtain } from "@/components/visual/ToneCurtain";
import { contact, site } from "@/data/site";

export const metadata: Metadata = {
  title: "Aviso legal y privacidad",
  description:
    "Aviso legal, propiedad intelectual y tratamiento de datos del sitio web de Carpintería y Ebanistería M&M.",
  alternates: { canonical: "/aviso-legal" },
  robots: { index: false, follow: true },
};

export default function AvisoLegalPage() {
  return (
    <>
      <PageHeader eyebrow="Información legal" seed={95} lines={["Aviso legal", "y privacidad."]} />

      <ToneCurtain from="#14100e">
        <section className="section-y bg-ivory text-ink">
          <div className="container-text space-y-12">
            <div className="border border-copper/40 bg-copper/8 p-6">
              <p className="label text-copper">Pendiente de completar</p>
              <p className="mt-3 text-ink/75">
                Antes de la publicación definitiva, {site.name} debe añadir aquí su razón
                social completa, su NIF/CIF y, en su caso, sus datos de inscripción
                registral. No los hemos inventado: solo figura la información que la empresa
                ya publica.
              </p>
            </div>

            <section>
              <h2 className="font-display text-d4">Titular del sitio</h2>
              <div className="mt-4 space-y-1 text-ink/72">
                <p>Nombre comercial: {site.name}</p>
                <p>
                  Domicilio: {contact.street}, {contact.area}, {contact.city} (Málaga).
                </p>
                <p>
                  Teléfonos: {contact.phones.map((phone) => phone.label).join(" · ")}
                </p>
                <p>Email: {contact.email}</p>
              </div>
            </section>

            <section>
              <h2 className="font-display text-d4">Objeto</h2>
              <p className="mt-4 text-ink/72">
                Este sitio tiene carácter informativo y presenta los servicios de carpintería
                y ebanistería de la empresa. Las descripciones de materiales, acabados y
                plazos son orientativas; las condiciones concretas de cada trabajo se fijan
                en el presupuesto correspondiente.
              </p>
            </section>

            <section>
              <h2 className="font-display text-d4">Propiedad intelectual</h2>
              <p className="mt-4 text-ink/72">
                Las fotografías publicadas corresponden a trabajos realizados por{" "}
                {site.name} y proceden de su propio archivo. No se utilizan imágenes de
                catálogo ni fotografías de terceros presentadas como obra propia. Los textos,
                el diseño y el código del sitio están protegidos por la legislación sobre
                propiedad intelectual.
              </p>
            </section>

            <section>
              <h2 className="font-display text-d4">Datos personales</h2>
              <p className="mt-4 text-ink/72">
                El formulario de solicitud de presupuesto de esta web{" "}
                <strong className="font-medium text-ink">no envía ni almacena datos</strong>{" "}
                en ningún servidor. Funciona enteramente en su navegador: compone un texto
                con lo que usted escribe y lo abre en su propia aplicación de WhatsApp o en
                su programa de correo, de modo que es usted quien decide enviarlo. A partir
                de ese momento, el tratamiento de esos datos se rige por la relación
                comercial entre usted y la empresa.
              </p>
              <p className="mt-4 text-ink/72">
                Puede ejercer sus derechos de acceso, rectificación, supresión y oposición
                escribiendo a {contact.email}.
              </p>
            </section>

            <section>
              <h2 className="font-display text-d4">Cookies y medición</h2>
              <p className="mt-4 text-ink/72">
                Este sitio no instala cookies de analítica ni de publicidad, y no utiliza
                servicios de seguimiento de terceros. Únicamente se guarda en su navegador
                una preferencia local sobre el tipo de cursor y una marca que evita repetir
                la animación de entrada durante la misma sesión. Esa información no sale de
                su dispositivo.
              </p>
            </section>

            <section>
              <h2 className="font-display text-d4">Enlaces externos</h2>
              <p className="mt-4 text-ink/72">
                El sitio enlaza a WhatsApp y a Google Maps. Al seguir esos enlaces se aplican
                las políticas de privacidad de dichos servicios.
              </p>
            </section>
          </div>
        </section>
      </ToneCurtain>
    </>
  );
}
