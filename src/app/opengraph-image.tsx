import { ImageResponse } from "next/og";
import { contact, site } from "@/data/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} — ${site.tagline}`;

/** Pulls the display face so the card matches the site; falls back silently. */
async function displayFont() {
  try {
    const css = await fetch(
      "https://fonts.googleapis.com/css2?family=Instrument+Serif&text=" +
        encodeURIComponent("Lamderconvtias.&MCarpintíyEbMrbll0+ñoRESUPTO"),
      { headers: { "User-Agent": "Mozilla/5.0" } }
    ).then((r) => r.text());

    const url = css.match(/src:\s*url\(([^)]+)\)/)?.[1];
    if (!url) return null;
    const data = await fetch(url).then((r) => r.arrayBuffer());
    return [{ name: "Instrument Serif", data, style: "normal" as const, weight: 400 as const }];
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const fonts = await displayFont();
  const display = fonts ? "Instrument Serif" : "serif";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #14100e 0%, #3d2b20 55%, #51392a 100%)",
          color: "#f5f0e7",
          padding: 72,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            letterSpacing: 6,
            textTransform: "uppercase",
            opacity: 0.68,
          }}
        >
          <span>Carpintería y Ebanistería</span>
          <span>Marbella</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontFamily: display,
              fontSize: 112,
              lineHeight: 1.02,
              letterSpacing: -2,
              maxWidth: 960,
              display: "flex",
            }}
          >
            La madera convertida en arte.
          </div>
          <div
            style={{
              marginTop: 34,
              height: 2,
              width: 180,
              background: "#d4a06a",
              display: "flex",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 24,
            opacity: 0.8,
          }}
        >
          <span style={{ fontFamily: display, fontSize: 56, opacity: 1 }}>M&M</span>
          <span>
            {contact.phones[0].label} · Más de {site.yearsOfExperience} años
          </span>
        </div>
      </div>
    ),
    { ...size, fonts: fonts ?? undefined }
  );
}
