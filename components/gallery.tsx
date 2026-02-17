import Image from "next/image"

const images = [
  { src: "/images/gallery-1.jpg", alt: "จัดช่อดอกไม้งานแต่งงาน" },
  { src: "/images/gallery-2.jpg", alt: "ตกแต่งโต๊ะงานเลี้ยงแต่งงาน" },
  { src: "/images/gallery-3.jpg", alt: "ซุ้มพิธีแต่งงานกลางแจ้ง" },
  { src: "/images/gallery-4.jpg", alt: "เจ้าสาวถือช่อดอกไม้" },
  { src: "/images/gallery-5.jpg", alt: "ตกแต่งเวทีงานแต่งงาน" },
  { src: "/images/gallery-6.jpg", alt: "พวงมาลัยดอกไม้งานแต่งไทย" },
]

export function Gallery() {
  return (
    <section id="gallery" className="bg-background py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-accent">
            ผลงานของเรา
          </p>
          <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl text-balance">
            แกลเลอรี
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            ตัวอย่างช่วงเวลาที่สวยงามและผลงานออกแบบที่เราสร้างสรรค์ให้กับลูกค้าของเรา
          </p>
        </div>

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
      </div>
    </section>
  )
}
