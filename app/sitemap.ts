import type { MetadataRoute } from "next";
import { CARS } from "@/lib/cars";
import { SITE } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const now = new Date();

  const staticRoutes = [
    "",
    "/cars",
    "/booking",
    "/about",
    "/contact",
    "/terms",
    "/privacy",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const carRoutes = CARS.map((car) => ({
    url: `${base}/cars/${car.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...carRoutes];
}
