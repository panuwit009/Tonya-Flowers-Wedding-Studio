"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { ArrowLeft, Play, X, Filter } from "lucide-react"

const categories = [
  { id: "all", label: "ทั้งหมด" },
  { id: "wedding", label: "งานแต่งงาน" },
  { id: "ceremony", label: "พิธีการ" },
  { id: "decoration", label: "ตกแต่งสถานที่" },
]

const images = [
  { src: "/images/Tonya-Flowers/gallery/495584888_1244885524307329_9024202854159681935_n.jpg", alt: "ผลงานจัดดอกไม้งานแต่งงาน", category: "wedding" },
  { src: "/images/Tonya-Flowers/gallery/589728336_1426528329476380_8083004637293573527_n.jpg", alt: "ตกแต่งดอกไม้งานแต่งงาน", category: "decoration" },
  { src: "/images/Tonya-Flowers/gallery/600561824_1442315927897620_8834827926545029937_n.jpg", alt: "ช่อดอกไม้เจ้าสาว", category: "wedding" },
  { src: "/images/Tonya-Flowers/gallery/615485902_1466579058804640_6610303332765749702_n.jpg", alt: "ซุ้มดอกไม้งานแต่งงาน", category: "ceremony" },
  { src: "/images/Tonya-Flowers/gallery/615854345_1466578822137997_3089199680189196873_n.jpg", alt: "ตกแต่งสถานที่งานแต่งงาน", category: "decoration" },
  { src: "/images/Tonya-Flowers/gallery/615887200_1466578932137986_6781796168299664097_n.jpg", alt: "ดอกไม้ตกแต่งโต๊ะ", category: "decoration" },
  { src: "/images/Tonya-Flowers/gallery/617073687_1466579225471290_7996041395477525359_n.jpg", alt: "จัดดอกไม้งานพิธี", category: "ceremony" },
  { src: "/images/Tonya-Flowers/gallery/617331002_1466578918804654_4685204856150076372_n.jpg", alt: "ผลงานดอกไม้สด", category: "wedding" },
  { src: "/images/Tonya-Flowers/gallery/619115247_1471603808302165_3714067486418132049_n.jpg", alt: "ตกแต่งงานแต่งงาน", category: "decoration" },
]

const videos = [
  { src: "/images/Tonya-Flowers/gallery/793550816.787496.mp4", poster: "/images/Tonya-Flowers/gallery/495584888_1244885524307329_9024202854159681935_n.jpg" },
  { src: "/images/Tonya-Flowers/gallery/793550816.839532.mp4", poster: "/images/Tonya-Flowers/gallery/589728336_1426528329476380_8083004637293573527_n.jpg" },
  { src: "/images/Tonya-Flowers/gallery/793550887.880169.mp4", poster: "/images/Tonya-Flowers/gallery/600561824_1442315927897620_8834827926545029937_n.jpg" },
  { src: "/images/Tonya-Flowers/gallery/793550887.944629.mp4", poster: "/images/Tonya-Flowers/gallery/615485902_1466579058804640_6610303332765749702_n.jpg" },
  { src: "/images/Tonya-Flowers/gallery/793550888.120475.mp4", poster: "/images/Tonya-Flowers/gallery/615854345_1466578822137997_3089199680189196873_n.jpg" },
]

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)

  const filteredImages = selectedCategory === "all" 
    ? images 
    : images.filter(img => img.category === selectedCategory)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/90 backdrop-blur-md sticky top-0 z-40">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-foreground/70 transition-colors hover:text-foreground"
          >
            <ArrowLeft size={20} />
            <span className="text-sm">กลับหน้าหลัก</span>
          </Link>
          <h1 className="font-serif text-xl font-semibold text-foreground">Gallery</h1>
          <div className="w-24" />
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12">
        {/* Page Title */}
        <div className="text-center mb-12">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-accent">
            ผลงานของเรา
          </p>
          <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl text-balance">
            รวมผลงานทั้งหมด
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            รวมภาพและวิดีโอผลงานจัดดอกไม้และตกแต่งงานแต่งงานที่เราได้สร้างสรรค์ให้กับลูกค้า
          </p>
        </div>

        {/* Filter */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
          <Filter size={18} className="text-muted-foreground" />
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                selectedCategory === cat.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Images Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredImages.map((image, index) => (
            <button
              key={image.src}
              onClick={() => setSelectedImage(image.src)}
              className={`group relative overflow-hidden rounded-lg ${
                index % 5 === 0 ? "aspect-[4/5]" : "aspect-square"
              }`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                <p className="text-sm text-white">{image.alt}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Videos Section */}
        <div className="mt-16">
          <h3 className="mb-8 text-center font-serif text-2xl font-semibold text-foreground">
            วิดีโอผลงาน
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {videos.map((video) => (
              <button
                key={video.src}
                onClick={() => setSelectedVideo(video.src)}
                className="group relative aspect-[9/16] overflow-hidden rounded-lg bg-muted"
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
      </main>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
          >
            <X className="h-6 w-6" />
          </button>
          <Image
            src={selectedImage}
            alt="Gallery image"
            width={1200}
            height={800}
            className="max-h-[90vh] w-auto rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Video Modal */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
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
    </div>
  )
}
