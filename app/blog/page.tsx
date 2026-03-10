import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, ArrowRight } from "lucide-react"

const blogPosts = [
  {
    id: "choosing-wedding-flowers",
    title: "วิธีเลือกดอกไม้สำหรับงานแต่งงานให้เหมาะกับธีมงาน",
    excerpt: "การเลือกดอกไม้ที่เหมาะสมกับธีมงานแต่งงานเป็นสิ่งสำคัญ ไม่ว่าจะเป็นธีม Rustic, Classic หรือ Modern แต่ละแบบก็มีดอกไม้ที่เหมาะสมแตกต่างกัน",
    image: "/images/Tonya-Flowers/gallery/600561824_1442315927897620_8834827926545029937_n.jpg",
    date: "15 ก.พ. 2567",
    readTime: "5 นาที",
    category: "เทคนิค",
  },
  {
    id: "wedding-trends-2024",
    title: "เทรนด์งานแต่งงาน 2567 ที่กำลังมาแรง",
    excerpt: "ปีนี้เทรนด์งานแต่งงานมีการเปลี่ยนแปลงอย่างน่าสนใจ ตั้งแต่การใช้สีโทนธรรมชาติ การจัดงานแบบ Intimate Wedding ไปจนถึงการนำเทคโนโลยีมาใช้",
    image: "/images/Tonya-Flowers/gallery/615485902_1466579058804640_6610303332765749702_n.jpg",
    date: "8 ก.พ. 2567",
    readTime: "7 นาที",
    category: "เทรนด์",
  },
  {
    id: "flower-care-tips",
    title: "วิธีดูแลช่อดอกไม้เจ้าสาวให้สดนาน",
    excerpt: "ช่อดอกไม้เจ้าสาวเป็นไอเท็มสำคัญในวันแต่งงาน การดูแลที่ถูกวิธีจะช่วยให้ดอกไม้สดสวยตลอดทั้งวัน มาดูเคล็ดลับกันเลย",
    image: "/images/Tonya-Flowers/gallery/495584888_1244885524307329_9024202854159681935_n.jpg",
    date: "1 ก.พ. 2567",
    readTime: "4 นาที",
    category: "เคล็ดลับ",
  },
  {
    id: "thai-wedding-flowers",
    title: "ดอกไม้มงคลสำหรับพิธีแต่งงานแบบไทย",
    excerpt: "ในพิธีแต่งงานแบบไทย ดอกไม้แต่ละชนิดมีความหมายมงคลแตกต่างกัน มาทำความรู้จักดอกไม้มงคลที่นิยมใช้ในงานแต่งงานกัน",
    image: "/images/Tonya-Flowers/gallery/617073687_1466579225471290_7996041395477525359_n.jpg",
    date: "25 ม.ค. 2567",
    readTime: "6 นาที",
    category: "ความรู้",
  },
  {
    id: "budget-wedding-decoration",
    title: "ไอเดียตกแต่งงานแต่งงานสวยๆ ในงบประมาณจำกัด",
    excerpt: "งบน้อยก็สามารถจัดงานแต่งงานสวยๆ ได้ มาดูเทคนิคการประหยัดงบในการตกแต่งงานแต่งงานโดยไม่เสียความสวยงาม",
    image: "/images/Tonya-Flowers/gallery/615854345_1466578822137997_3089199680189196873_n.jpg",
    date: "18 ม.ค. 2567",
    readTime: "8 นาที",
    category: "เคล็ดลับ",
  },
  {
    id: "seasonal-flowers",
    title: "ดอกไม้ตามฤดูกาล: เลือกอย่างไรให้ประหยัดและสวย",
    excerpt: "การเลือกดอกไม้ตามฤดูกาลไม่เพียงช่วยประหยัดค่าใช้จ่าย แต่ยังได้ดอกไม้ที่สดและสวยที่สุดอีกด้วย",
    image: "/images/Tonya-Flowers/gallery/619115247_1471603808302165_3714067486418132049_n.jpg",
    date: "10 ม.ค. 2567",
    readTime: "5 นาที",
    category: "ความรู้",
  },
]

const categories = ["ทั้งหมด", "เทคนิค", "เทรนด์", "เคล็ดลับ", "ความรู้"]

export default function BlogPage() {
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
          <h1 className="font-serif text-xl font-semibold text-foreground">Blog</h1>
          <div className="w-24" />
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12">
        {/* Page Title */}
        <div className="text-center mb-12">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-accent">
            บทความ
          </p>
          <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl text-balance">
            Wedding Blog
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            เคล็ดลับ ไอเดีย และความรู้เกี่ยวกับการจัดงานแต่งงานและดอกไม้
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                cat === "ทั้งหมด"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Post */}
        <div className="mb-12">
          <Link href={`/blog/${blogPosts[0].id}`} className="group block">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <Image
                  src={blogPosts[0].image}
                  alt={blogPosts[0].title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute left-4 top-4">
                  <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                    {blogPosts[0].category}
                  </span>
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <div className="mb-4 flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {blogPosts[0].date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {blogPosts[0].readTime}
                  </span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-foreground group-hover:text-accent transition-colors lg:text-3xl">
                  {blogPosts[0].title}
                </h3>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  {blogPosts[0].excerpt}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent">
                  อ่านเพิ่มเติม
                  <ArrowRight size={16} />
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Blog Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.slice(1).map((post) => (
            <Link key={post.id} href={`/blog/${post.id}`} className="group block">
              <article className="overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-lg">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute left-3 top-3">
                    <span className="rounded-full bg-accent px-2.5 py-1 text-xs font-medium text-accent-foreground">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="mb-3 flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-foreground group-hover:text-accent transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
