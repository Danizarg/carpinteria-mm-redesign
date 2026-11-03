import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import "./globals.css";

import { Nav } from "@/components/chrome/Nav";
import { Footer } from "@/components/chrome/Footer";
import { Preloader } from "@/components/chrome/Preloader";
import { SmoothScroll } from "@/components/chrome/SmoothScroll";
import { CursorProvider } from "@/components/chrome/CustomCursor";
import { WhatsAppButton } from "@/components/chrome/WhatsAppButton";
import { contact, mapsHref, services, site } from "@/data/site";

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-instrument-serif",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · Marbella`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "carpintería Marbella",
    "ebanistería Marbella",
    "puertas de entrada madera",
    "vestidores a medida",
    "muebles a medida Marbella",
    "pérgolas de madera",
    "ventanas de madera",
    "pasamanos madera",
  ],
  authors: [{ name: site.name }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: site.url,
    siteName: site.name,
    title: `${site.name} · ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} · ${site.tagline}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  formatDetection: { telephone: true, address: true },
};

export const viewport: Viewport = {
  themeColor: "#14100e",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  additionalType: "https://schema.org/GeneralContractor",
  name: site.name,
  description: site.description,
  url: site.url,
  email: contact.email,
  telephone: contact.phones.map((phone) => phone.label),
  hasMap: mapsHref,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${contact.street}, ${contact.area}`,
    addressLocality: contact.city,
    addressRegion: "Málaga",
    addressCountry: "ES",
  },
  areaServed: [
    { "@type": "City", name: "Marbella" },
    { "@type": "AdministrativeArea", name: "Costa del Sol" },
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "13:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "15:00",
      closes: "18:00",
    },
  ],
  makesOffer: services.map((service) => ({
    "@type": "Offer",
    itemOffered: { "@type": "Service", name: service.title, description: service.summary },
  })),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${instrument.variable} ${inter.variable}`}>
      <body className="antialiased">
        {/* Mask-reveal headings are parked off-stage until Motion animates them
            in. Without JavaScript they would never arrive, so show them as-is. */}
        <noscript>
          <style>{`[data-reveal],[data-reveal] *{opacity:1!important;transform:none!important;clip-path:none!important}`}</style>
        </noscript>

        <a
          href="#contenido"
          className="label sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[400] focus:bg-ivory focus:px-5 focus:py-3 focus:text-ink"
        >
          Saltar al contenido
        </a>

        <CursorProvider>
          <Preloader />
          <SmoothScroll />
          <Nav />
          <main id="contenido">{children}</main>
          <Footer />
          <WhatsAppButton />
        </CursorProvider>

        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
