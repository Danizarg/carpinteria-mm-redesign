import type { MetadataRoute } from "next";
import { services, site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = [
    { path: "/", priority: 1 },
    { path: "/nuestra-empresa", priority: 0.8 },
    { path: "/proyectos", priority: 0.9 },
    { path: "/servicios", priority: 0.7 },
    ...services.map((service) => ({ path: service.href, priority: 0.8 })),
    { path: "/contacto", priority: 0.9 },
    { path: "/aviso-legal", priority: 0.2 },
  ];

  return routes.map(({ path, priority }) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority,
  }));
}
