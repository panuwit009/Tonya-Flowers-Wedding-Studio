"use client"

import Image from "next/image"
import { useState } from "react"
import { X, ZoomIn } from "lucide-react"

const packages = [
  {
    src: "/images/Tonya-Flowers/package/S__12288021.jpg",
    alt: "แพ็คเกจบริการจัดดอกไม้งานแต่งงาน 1",
  },
  {
    src: "/images/Tonya-Flowers/package/S__12288022.jpg",
    alt: "แพ็คเกจบริการจัดดอกไม้งานแต่งงาน 2",
  },
]

export function Services() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

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

        {/* Package Images */}
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {packages.map((pkg) => (
            <button
              key={pkg.src}
              onClick={() => setSelectedImage(pkg.src)}
              className="group relative overflow-hidden rounded-lg shadow-lg transition-shadow hover:shadow-xl"
            >
              <div className="relative aspect-[3/4]">
                <Image
                  src={pkg.src}
                  alt={pkg.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/20">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/0 opacity-0 transition-all group-hover:bg-white/90 group-hover:opacity-100">
                    <ZoomIn className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Click on package images to view full details
        </p>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
          >
            <X className="h-6 w-6" />
          </button>
          <div className="relative max-h-[90vh] max-w-4xl">
            <Image
              src={selectedImage}
              alt="Package details"
              width={1200}
              height={1600}
              className="max-h-[90vh] w-auto rounded-lg object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </section>
  )
}
