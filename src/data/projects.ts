import { photos, type Photo } from "./photos.generated";
import type { ServiceKey } from "./site";

export type { Photo };

/**
 * Every photograph on this site is the company's own, migrated from its legacy
 * galleries. No stock imagery is presented as completed work anywhere.
 */
export const allPhotos = photos;

export const filters: { key: ServiceKey | "todos"; label: string }[] = [
  { key: "todos", label: "Todos" },
  { key: "puertas", label: "Puertas" },
  { key: "vestidores", label: "Vestidores y mobiliario" },
  { key: "exteriores", label: "Ventanas, pérgolas y pasamanos" },
  { key: "banos", label: "Muebles de baño" },
];

export const photosByCategory = (key: ServiceKey) => photos.filter((p) => p.category === key);

export const countByCategory = (key: ServiceKey | "todos") =>
  key === "todos" ? photos.length : photos.filter((p) => p.category === key).length;

/**
 * Accurate alternative text. Every frame is a real piece of the company's work,
 * so the description says what it is rather than dressing it up.
 */
export const altFor = (photo: Photo) =>
  `${photo.kind} en madera — trabajo realizado por Carpintería y Ebanistería M&M en Marbella`;

const pick = (...ids: string[]) =>
  ids.map((id) => photos.find((p) => p.id === id)).filter((p): p is Photo => Boolean(p));

/** Hand-picked for the home page — the strongest frames in the archive. */
export const featured = pick(
  "puertas-de-entrada-05",
  "puertas-de-paso-14",
  "vestidores-09",
  "pergolas-02",
  "ventanas-07",
  "puertas-de-entrada-30",
  "puertas-de-entrada-06",
  "vestidores-02"
);

/** Large editorial frames used in the parallax band. */
export const editorial = pick("puertas-de-entrada-04", "pergolas-01", "ventanas-03");

/** One representative frame per craft category, for the horizontal rail. */
export const railCovers: Record<ServiceKey, Photo | undefined> = {
  puertas: pick("puertas-de-entrada-05")[0],
  vestidores: pick("vestidores-09")[0],
  exteriores: pick("pergolas-02")[0],
  banos: undefined, // no photographs of this category exist in the company archive yet
};

/** Cover frame for each service page header. */
export const serviceCovers: Record<ServiceKey, Photo | undefined> = {
  puertas: pick("puertas-de-entrada-30")[0],
  vestidores: pick("vestidores-01")[0],
  exteriores: pick("ventanas-04")[0],
  banos: undefined,
};
