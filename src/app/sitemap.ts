import type { MetadataRoute } from "next";
import { portfolioData, SITE_CONFIG } from "@/data/portfolio";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_CONFIG.origin}/`,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_CONFIG.origin}/infrastructure/`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...portfolioData.infrastructure.map((item) => ({
      url: `${SITE_CONFIG.origin}/infrastructure/${item.slug}/`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
