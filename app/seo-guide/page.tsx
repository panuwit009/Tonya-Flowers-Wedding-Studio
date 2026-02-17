import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "SEO Guide - Tonya Flowers Wedding Studio",
  description: "Internal SEO guide for managing your website keywords and search engine optimization.",
  robots: { index: false, follow: false },
}

const steps = [
  {
    title: "Step 1: Update Your SEO Keywords",
    content: `Open the file \`app/layout.tsx\` and find the \`keywords\` array inside the metadata object. Replace the placeholder keywords with your own. Good keywords for a wedding business include:

- Your business name (e.g., "Tonya Flowers Wedding Studio")
- Location-based keywords (e.g., "wedding organizer Lop Buri", "wedding planner Thailand")
- Service-based keywords (e.g., "wedding flowers", "wedding decoration", "floral design")
- Thai language keywords (e.g., "จัดงานแต่งงาน ลพบุรี", "จัดดอกไม้งานแต่ง")
- Long-tail keywords (e.g., "affordable wedding planner in Lop Buri Thailand")`,
  },
  {
    title: "Step 2: Update the Page Title & Description",
    content: `In the same \`app/layout.tsx\` file, update the \`title\` and \`description\` fields. The title appears in Google search results and browser tabs. Keep it under 60 characters. The description appears below the title in search results. Keep it under 160 characters. Make it compelling so people click!`,
  },
  {
    title: "Step 3: Update Open Graph (Social Media Sharing)",
    content: `Still in \`app/layout.tsx\`, update the \`openGraph\` section. This controls how your website appears when shared on Facebook, Line, or other social media. Update the \`url\` field to your actual domain name after deployment.`,
  },
  {
    title: "Step 4: Update the Domain in sitemap.ts and robots.ts",
    content: `Open \`app/sitemap.ts\` and \`app/robots.ts\` and replace "https://tonyaflowers.com" with your actual domain name. The sitemap tells Google which pages to index. The robots.txt tells search engines how to crawl your site.`,
  },
  {
    title: "Step 5: Submit to Google Search Console",
    content: `This is the most important step! Go to Google Search Console (search.google.com/search-console) and:

1. Add your website as a property
2. Verify ownership (Vercel makes this easy with DNS verification)
3. Submit your sitemap URL: yourdomain.com/sitemap.xml
4. Wait for Google to start indexing your pages (can take a few days to weeks)`,
  },
  {
    title: "Step 6: Create a Google Business Profile",
    content: `Go to business.google.com and create a profile for "Tonya Flowers Wedding Studio". This is FREE and very important for local SEO:

1. Add your business name, address, phone, and hours
2. Upload photos of your work
3. Choose the right category: "Wedding Planner" or "Florist"
4. Ask happy clients to leave Google reviews
5. This will help you appear in Google Maps and local search results`,
  },
  {
    title: "Step 7: Add Content Regularly",
    content: `Google loves fresh content. Consider adding:

- A blog section with wedding tips and inspiration
- New photos in your gallery after each event
- Client testimonials and reviews
- Seasonal content (e.g., "Best wedding flowers for Thai summer")

Each new page is another chance to rank for keywords!`,
  },
  {
    title: "Step 8: Get Backlinks",
    content: `Backlinks (other websites linking to yours) are one of the most important SEO factors:

- Get listed on Thai wedding directories
- Partner with other wedding vendors and link to each other
- Share your work on social media with links back to your website
- Ask wedding blogs or magazines to feature your work`,
  },
]

export default function SeoGuidePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-accent"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
          SEO Guide for Your Website
        </h1>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          Follow these steps to optimize your website for search engines. This
          guide is for your reference only and is not indexed by Google.
        </p>

        <div className="mt-12 flex flex-col gap-10">
          {steps.map((step, index) => (
            <article
              key={index}
              className="rounded-sm border border-border bg-card p-6"
            >
              <h2 className="font-serif text-xl font-semibold text-foreground">
                {step.title}
              </h2>
              <div className="mt-4 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                {step.content}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 rounded-sm bg-primary p-8">
          <h2 className="font-serif text-xl font-semibold text-primary-foreground">
            Quick Reference: Where to Edit Keywords
          </h2>
          <div className="mt-4 space-y-3 text-sm text-primary-foreground/80">
            <p>
              <span className="font-semibold text-accent">Keywords:</span>{" "}
              {"app/layout.tsx → metadata.keywords array"}
            </p>
            <p>
              <span className="font-semibold text-accent">Page Title:</span>{" "}
              {"app/layout.tsx → metadata.title"}
            </p>
            <p>
              <span className="font-semibold text-accent">Description:</span>{" "}
              {"app/layout.tsx → metadata.description"}
            </p>
            <p>
              <span className="font-semibold text-accent">
                Social Media Preview:
              </span>{" "}
              {"app/layout.tsx → metadata.openGraph"}
            </p>
            <p>
              <span className="font-semibold text-accent">Sitemap:</span>{" "}
              {"app/sitemap.ts"}
            </p>
            <p>
              <span className="font-semibold text-accent">
                Structured Data:
              </span>{" "}
              {"app/page.tsx → jsonLd object"}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
