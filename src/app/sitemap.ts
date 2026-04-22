import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

const routes = ["/", "/usluge", "/o-nama", "/kontakt"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: new URL(route, siteUrl).toString(),
  }));
}
