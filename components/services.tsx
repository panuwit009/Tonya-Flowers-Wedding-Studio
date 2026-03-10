"use client"

import Image from "next/image"
import { useState } from "react"
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react"

const packages = [
  {
    cover: "/images/Tonya-Flowers/package/S__13008904.jpg",
    alt: "แพ็คเกจบริการจัดดอกไม้งานแต่งงาน",
    images: [
      "/images/Tonya-Flowers/package/example/1.png",
      "/images/Tonya-Flowers/package/example/2.png",
      "/images/Tonya-Flowers/package/example/3.png",
      "/images/Tonya-Flowers/package/example/4.png",
      "/images/Tonya-Flowers/package/example/5.png",
    ],
  },
  {
    cover: "/images/Tonya-Flowers/package/S__13008903.jpg",
    alt: "แพ็คเกจบริการจัดดอกไม้งานแต่งงาน 1",
    images: [
      "/images/Tonya-Flowers/package/example/1.png",
      "/images/Tonya-Flowers/package/example/2.png",
      "/images/Tonya-Flowers/package/example/3.png",
      "/images/Tonya-Flowers/package/example/4.png",
      "/images/Tonya-Flowers/package/example/5.png",
    ],
  },
  {
    cover: "/images/Tonya-Flowers/package/S__12288021.jpg",
    alt: "แพ็คเกจบริการจัดดอกไม้งานแต่งงาน 2",
    images: [
      "/images/Tonya-Flowers/package/example/1.png",
      "/images/Tonya-Flowers/package/example/2.png",
      "/images/Tonya-Flowers/package/example/3.png",
      "/images/Tonya-Flowers/package/example/4.png",
      "/images/Tonya-Flowers/package/example/5.png",
    ],
  },
  {
    cover: "/images/Tonya-Flowers/package/S__12288022.jpg",
    alt: "แพ็คเกจบริการจัดดอกไม้งานแต่งงาน 3",
    images: [
      "/images/Tonya-Flowers/package/example/1.png",
      "/images/Tonya-Flowers/package/example/2.png",
      "/images/Tonya-Flowers/package/example/3.png",
      "/images/Tonya-Flowers/package/example/4.png",
      "/images/Tonya-Flowers/package/example/5.png",
    ],
  },
]

export function Services() {
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  const minSwipeDistance = 50

  const closeModal = () => {
    setSelectedPackage(null)
    setSelectedImageIndex(0)
  }

  const getImages = () => {
    if (selectedPackage === null) return []
    const pkg = packages[selectedPackage]
    return [pkg.cover, ...pkg.images]
  }

  const nextImage = () => {
    const images = getImages()

    if (selectedImageIndex < images.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1)
    }
  }

  const prevImage = () => {
    if (selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1)
    }
  }

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd

    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) nextImage()
    if (isRightSwipe) prevImage()
  }

  const images = getImages()

  return (
    <section id="services" className="bg-secondary py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-accent">
            บริการของเรา
          </p>

          <h2 className="font-serif text-3xl font-bold md:text-4xl">
            แพ็คเกจ
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            รายละเอียดแพ็คเกจและราคาบริการจัดดอกไม้งานแต่งงานของเรา
          </p>
        </div>

        {/* Grid */}
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {packages.map((pkg, index) => (
            <button
              key={pkg.cover}
              onClick={() => {
                setSelectedPackage(index)
                setSelectedImageIndex(0)
              }}
              className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl"
            >
              <div className="relative aspect-[3/4]">
                <Image
                  src={pkg.cover}
                  alt={pkg.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/0 opacity-0 group-hover:bg-white/90 group-hover:opacity-100">
                    <ZoomIn className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          กดที่รูปแพ็คเกจเพื่อดูรายละเอียดเพิ่มเติม
        </p>
      </div>

      {/* Modal */}
      {selectedPackage !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={closeModal}
        >
          {/* Close */}
          <button
            onClick={closeModal}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Counter */}
          <div className="absolute top-4 left-1/2 sm:left-4 max-sm:-translate-x-1/2 text-white text-sm bg-black/40 px-3 py-1 rounded">
            {selectedImageIndex + 1} / {images.length}
          </div>

          {/* Prev */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              prevImage()
            }}
            disabled={selectedImageIndex === 0}
            className={`absolute left-4 text-white ${
              selectedImageIndex === 0 ? "opacity-30 cursor-default" : ""
            }`}
          >
            <ChevronLeft size={40} />
          </button>

          {/* Image */}
          <div
            className="relative max-h-[90vh] max-w-4xl select-none"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <Image
              src={images[selectedImageIndex]}
              alt="Package details"
              width={1200}
              height={1600}
              draggable={false}
              className="max-h-[90vh] w-auto rounded-lg object-contain"
            />
          </div>

          {/* Next */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              nextImage()
            }}
            disabled={selectedImageIndex === images.length - 1}
            className={`absolute right-4 text-white ${
              selectedImageIndex === images.length - 1
                ? "opacity-30 cursor-default"
                : ""
            }`}
          >
            <ChevronRight size={40} />
          </button>
        </div>
      )}
    </section>
  )
}