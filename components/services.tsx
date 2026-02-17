import { Flower, CalendarHeart, Palette, Camera, UtensilsCrossed, Music } from "lucide-react"

const services = [
  {
    icon: Flower,
    title: "Floral Design",
    description:
      "Custom bridal bouquets, ceremony arches, table centerpieces, and venue decorations tailored to your theme.",
  },
  {
    icon: CalendarHeart,
    title: "Wedding Planning",
    description:
      "Full-service wedding planning from venue selection to timeline coordination, ensuring a seamless celebration.",
  },
  {
    icon: Palette,
    title: "Theme & Styling",
    description:
      "Creative concept development and styling to bring your wedding vision to life with cohesive, stunning design.",
  },
  {
    icon: Camera,
    title: "Vendor Coordination",
    description:
      "We connect you with trusted photographers, videographers, and other vendors for a perfect event.",
  },
  {
    icon: UtensilsCrossed,
    title: "Catering Setup",
    description:
      "Elegant table settings, buffet styling, and dining area decoration to complement your reception.",
  },
  {
    icon: Music,
    title: "Day-of Coordination",
    description:
      "Professional on-site management on your wedding day so you can relax and enjoy every moment.",
  },
]

export function Services() {
  return (
    <section id="services" className="bg-secondary py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-accent">
            What We Offer
          </p>
          <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl text-balance">
            Our Services
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            From stunning floral designs to complete event planning, we offer
            everything you need for the perfect wedding.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-sm bg-card p-8 transition-shadow hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <service.icon size={24} className="text-primary" />
              </div>
              <h3 className="mt-5 font-serif text-xl font-semibold text-foreground">
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
