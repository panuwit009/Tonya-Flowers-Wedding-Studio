import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Stats } from "@/components/stats"
import { Services } from "@/components/services"
import { Gallery } from "@/components/gallery"
import { Testimonials } from "@/components/testimonials"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { FloatingContact } from "@/components/floating-contact"

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
      <Navbar />
      <main>
        <Hero />
        <About />
        <Stats />
        <Services />
        <Gallery />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <FloatingContact />
    </>
  )
}
