import type { MetadataRoute } from "next";
import { portfolioData, SITE_CONFIG } from "@/data/portfolio";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_CONFIG.origin}/` },
    { url: `${SITE_CONFIG.origin}/infrastructure/` },
    ...portfolioData.infrastructure.map((item) => ({
      url: `${SITE_CONFIG.origin}/infrastructure/${item.slug}/`,
    })),
  ];
}
