import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/seo-guide",
    },
    sitemap: "https://tonyaflowers.com/sitemap.xml",
  }
}
