# Carpintería y Ebanistería M&M — rediseño

Rediseño completo del sitio de **Carpintería y Ebanistería M&M** (Marbella), un taller
con más de 30 años de experiencia en carpintería arquitectónica y ebanistería.

Sustituye a la web original en Webnode conservando íntegramente la información real de
la empresa y su archivo fotográfico.

- **Original:** https://carpinteriaebanisteriamym.webnode.es/

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router) + React 19 |
| Lenguaje | TypeScript |
| Estilos | Tailwind CSS v4 (tokens en `src/app/globals.css`) |
| Animación | Motion (Framer Motion) |
| Scroll | Lenis + GSAP ScrollTrigger (solo donde aporta: el carrusel horizontal fijado) |
| Tipografía | Instrument Serif + Inter (`next/font`) |

## Dirección de arte

Paleta: nogal profundo (`--color-walnut`), marfil cálido (`--color-ivory`), carbón
(`--color-ink`) y cobre (`--color-copper`) como único acento. Un solo radio (recto),
una sola línea de pelo, sin sombras decorativas. Serif display sobregrande contra una
sans contemporánea en versalitas espaciadas.

### Interacciones de firma

| | |
|---|---|
| Fondo de veta procedural | `src/components/visual/WoodGrain.tsx` — ruido de valor + anillos de nudo dibujados en canvas una sola vez por tamaño; encima solo capas baratas (luz que sigue al puntero, destello lento) |
| Título animado | `SplitWords` — revelado palabra a palabra tras máscara |
| Paralaje | `ParallaxImage`, `Hero` — tres profundidades independientes |
| Carrusel horizontal | `CategoryRail` — sección fijada con GSAP ScrollTrigger en escritorio, scroll-snap nativo en móvil |
| Transiciones de tono | `ToneCurtain` — el color de la sección anterior se retira al entrar la siguiente |
| Transición de página | `app/template.tsx` — cortina de nogal, nunca en la primera carga |
| Cursor a medida | `CustomCursor` — solo con puntero fino y sin `prefers-reduced-motion`; interruptor permanente en el pie |
| Carga inicial | `Preloader` — una vez por sesión |

## Accesibilidad y rendimiento

- `prefers-reduced-motion` desactiva Lenis, el preloader, las cortinas, el paralaje y
  el cursor a medida; una regla CSS fuerza el estado final de todo lo animado.
- Sin JavaScript, un bloque `<noscript>` revela los titulares enmascarados.
- Navegación por teclado completa: salto al contenido, foco visible, `aria-expanded`
  en los desplegables, foco atrapado y devuelto en el visor de imágenes.
- La galería carga de 24 en 24; las imágenes se sirven en AVIF/WebP vía `next/image`.
- Metadatos SEO, `sitemap.xml`, `robots.txt`, Open Graph generado e `JSON-LD`
  (`HomeAndConstructionBusiness`).

## Fotografía

Las **73 fotografías** son de la propia empresa, migradas de las galerías originales
con `scripts/ingest-photos.mjs` (descarga el original a resolución completa, corrige
la orientación EXIF y normaliza a JPEG progresivo). No se usa ninguna imagen de banco
presentada como obra propia: las especialidades sin archivo fotográfico lo dicen
abiertamente en lugar de rellenarse con fotos de catálogo.

```bash
node scripts/ingest-photos.mjs <manifest.json>   # regenera public/proyectos + src/data/photos.generated.ts
node scripts/contact-sheet.mjs <salida.jpg> 0 40  # hoja de contacto para dirección de arte
```

## Formulario de presupuesto

El proyecto **no tiene backend**, y la web no finge lo contrario. El formulario de
`/contacto` recoge los datos en el navegador, compone el texto de la solicitud y abre
WhatsApp o el cliente de correo del visitante con el mensaje escrito. Nada se envía ni
se almacena en ningún servidor.

Para enviar de verdad desde el servidor haría falta añadir una Route Handler y un
proveedor de correo (Resend, SendGrid…), y actualizar el paso 4 de
`src/components/forms/QuoteFlow.tsx`.

## Desarrollo

```bash
npm install
npm run dev        # http://localhost:3210
npm run build
npm run typecheck
```

## Pendiente antes de publicar en el dominio del cliente

1. Completar razón social, NIF/CIF y datos registrales en `/aviso-legal`.
2. Confirmar que **691 756 583** es efectivamente la línea de WhatsApp.
3. Confirmar los días del horario de oficina (el JSON-LD asume lunes a viernes).
4. Si se quiere envío real del formulario, añadir backend según lo anterior.
