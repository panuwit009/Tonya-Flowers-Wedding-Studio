import { Hero } from "@/components/hero"

// JSON-LD structured data for SEO (helps Google show rich results)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Tonya Flowers Wedding Studio",
  description:
    "Professional wedding organizer and floral design studio in Lop Buri, Thailand.",
  url: "https://tonyaflowers.com",
  telephone: "+66928278061",
  email: "tanuponlali@gmail.com",
  image: "/images/logo.jpg",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Ramadecho",
    addressLocality: "Lop Buri",
    addressCountry: "TH",
    postalCode: "15000",
  },
  openingHours: "Mo-Su 10:00-19:00",
  sameAs: ["https://www.facebook.com/TonyaFlowersWeddingStudio"],
  priceRange: "$$",
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        <Hero />
      </main>
    </>
  )
}
