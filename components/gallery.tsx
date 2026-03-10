"use client"

import Image from "next/image"
import { useState } from "react"
import { Play, X } from "lucide-react"

const images = [
  { src: "/images/Tonya-Flowers/gallery/495584888_1244885524307329_9024202854159681935_n.jpg", alt: "ผลงานจัดดอกไม้งานแต่งงาน" },
  { src: "/images/Tonya-Flowers/gallery/589728336_1426528329476380_8083004637293573527_n.jpg", alt: "ตกแต่งดอกไม้งานแต่งงาน" },
  { src: "/images/Tonya-Flowers/gallery/600561824_1442315927897620_8834827926545029937_n.jpg", alt: "ช่อดอกไม้เจ้าสาว" },
  { src: "/images/Tonya-Flowers/gallery/615485902_1466579058804640_6610303332765749702_n.jpg", alt: "ซุ้มดอกไม้งานแต่งงาน" },
  { src: "/images/Tonya-Flowers/gallery/615854345_1466578822137997_3089199680189196873_n.jpg", alt: "ตกแต่งสถานที่งานแต่งงาน" },
  { src: "/images/Tonya-Flowers/gallery/615887200_1466578932137986_6781796168299664097_n.jpg", alt: "ดอกไม้ตกแต่งโต๊ะ" },
  { src: "/images/Tonya-Flowers/gallery/617073687_1466579225471290_7996041395477525359_n.jpg", alt: "จัดดอกไม้งานพิธี" },
  { src: "/images/Tonya-Flowers/gallery/617331002_1466578918804654_4685204856150076372_n.jpg", alt: "ผลงานดอกไม้สด" },
  { src: "/images/Tonya-Flowers/gallery/619115247_1471603808302165_3714067486418132049_n.jpg", alt: "ตกแต่งงานแต่งงาน" },
  { src: "/images/Tonya-Flowers/gallery/650051900_1511376300991582_3113869095499032227_n.jpg", alt: "ตกแต่งงานแต่งงาน"},
  { src: "/images/Tonya-Flowers/gallery/650044084_1511376257658253_5679915351186430023_n.jpg", alt: "ตกแต่งงานแต่งงาน"},
  { src: "/images/Tonya-Flowers/gallery/649209294_1511376207658258_7197511984995991128_n.jpg", alt: "ตกแต่งงานแต่งงาน"},
  { src: "/images/Tonya-Flowers/gallery/649204986_1510084727787406_1163524091879169365_n.jpg", alt: "ตกแต่งงานแต่งงาน"},
  { src: "/images/Tonya-Flowers/gallery/648025471_1510084707787408_157748912232418759_n.jpg", alt: "ตกแต่งงานแต่งงาน"},
  { src: "/images/Tonya-Flowers/gallery/639989834_1498515188944360_7902478040721132828_n.jpg", alt: "ตกแต่งงานแต่งงาน"},
  { src: "/images/Tonya-Flowers/gallery/641509605_1498515185611027_6492835487786557114_n.jpg", alt: "ตกแต่งงานแต่งงาน"},
  { src: "/images/Tonya-Flowers/gallery/639171444_1498515232277689_4724395234990574855_n.jpg", alt: "ตกแต่งงานแต่งงาน"},
]

const videos = [
  { src: "/images/Tonya-Flowers/gallery/793550816.787496.mp4", poster: "/images/Tonya-Flowers/gallery/495584888_1244885524307329_9024202854159681935_n.jpg" },
  { src: "/images/Tonya-Flowers/gallery/793550816.839532.mp4", poster: "/images/Tonya-Flowers/gallery/589728336_1426528329476380_8083004637293573527_n.jpg" },
  { src: "/images/Tonya-Flowers/gallery/793550887.880169.mp4", poster: "/images/Tonya-Flowers/gallery/600561824_1442315927897620_8834827926545029937_n.jpg" },
  { src: "/images/Tonya-Flowers/gallery/793550887.944629.mp4", poster: "/images/Tonya-Flowers/gallery/615485902_1466579058804640_6610303332765749702_n.jpg" },
  { src: "/images/Tonya-Flowers/gallery/793550888.120475.mp4", poster: "/images/Tonya-Flowers/gallery/615854345_1466578822137997_3089199680189196873_n.jpg" },
]

export function Gallery() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)

  return (
    <section id="gallery" className="bg-background py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-accent">
            ผลงานของเรา
          </p>
          <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl text-balance">
            Gallery
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            ภาพผลงานการจัดดอกไม้และตกแต่งงานแต่งงานที่เราได้สร้างสรรค์ให้กับลูกค้า
          </p>
        </div>

        {/* Images Grid */}
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image, index) => (
            <div
              key={image.src}
              className={`group relative overflow-hidden rounded-sm ${
                index === 0 || index === 5
                  ? "aspect-[4/5]"
                  : "aspect-square"
              }`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-primary/0 transition-colors duration-300 group-hover:bg-primary/20" />
            </div>
          ))}
        </div>

        {/* Videos Section */}
        <div className="mt-12">
          <h3 className="mb-6 text-center font-serif text-xl font-semibold text-foreground">
            วิดีโอผลงาน
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {videos.map((video) => (
              <button
                key={video.src}
                onClick={() => setSelectedVideo(video.src)}
                className="group relative aspect-[9/16] overflow-hidden rounded-sm bg-muted"
              >
                <video
                  src={video.src}
                  className="h-full w-full object-cover"
                  muted
                  playsInline
                  preload="metadata"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors group-hover:bg-black/40">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 transition-transform group-hover:scale-110">
                    <Play className="h-6 w-6 text-primary" fill="currentColor" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <button
            onClick={() => setSelectedVideo(null)}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
          >
            <X className="h-6 w-6" />
          </button>
          <video
            src={selectedVideo}
            className="max-h-[90vh] max-w-full rounded-lg"
            controls
            autoPlay
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  )
}
