import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Services } from "@/components/services"
import { Gallery } from "@/components/gallery"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

// JSON-LD structured data for SEO (helps Google show rich results)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Tonya Flowers Wedding Studio",
  description:
    "ผู้จัดงานแต่งงานมืออาชีพและสตูดิโอออกแบบดอกไม้ ลพบุรี ประเทศไทย",
  url: "https://tonyaflowers.com",
  telephone: "+66928278061",
  email: "tanuponlali@gmail.com",
  image: "/images/logo.jpg",
  address: {
    "@type": "PostalAddress",
    streetAddress: "รามเดโช",
    addressLocality: "ลพบุรี",
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
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
