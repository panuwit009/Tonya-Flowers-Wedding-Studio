import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "คู่มือ SEO - Tonya Flowers Wedding Studio",
  description: "คู่มือ SEO ภายในสำหรับจัดการคีย์เวิร์ดและการเพิ่มประสิทธิภาพเว็บไซต์",
  robots: { index: false, follow: false },
}

const steps = [
  {
    title: "ขั้นตอนที่ 1: แก้ไขคีย์เวิร์ด SEO",
    content: `เปิดไฟล์ app/layout.tsx แล้วหาคำว่า keywords ภายใน metadata object แก้ไขคีย์เวิร์ดตามที่ต้องการ ตัวอย่างคีย์เวิร์ดที่ดีสำหรับธุรกิจแต่งงาน:

- ชื่อธุรกิจ เช่น "Tonya Flowers Wedding Studio"
- คีย์เวิร์ดตามสถานที่ เช่น "รับจัดงานแต่งงาน ลพบุรี", "wedding planner ลพบุรี"
- คีย์เวิร์ดตามบริการ เช่น "จัดดอกไม้งานแต่ง", "ตกแต่งงานแต่งงาน"
- คีย์เวิร์ดภาษาไทย เช่น "จัดงานแต่งงานครบวงจร", "ร้านดอกไม้ ลพบุรี"
- คีย์เวิร์ดแบบ Long-tail เช่น "รับจัดงานแต่งงาน ราคาประหยัด ลพบุรี"`,
  },
  {
    title: "ขั้นตอนที่ 2: แก้ไขชื่อหน้าเว็บและคำอธิบาย",
    content: `ในไฟล์ app/layout.tsx เดียวกัน แก้ไข title และ description ชื่อหน้าเว็บจะแสดงในผลการค้นหา Google และแท็บของเบราว์เซอร์ ควรมีไม่เกิน 60 ตัวอักษร คำอธิบายจะแสดงใต้ชื่อในผลค้นหา ควรมีไม่เกิน 160 ตัวอักษร เขียนให้น่าสนใจเพื่อให้คนคลิก!`,
  },
  {
    title: "ขั้นตอนที่ 3: แก้ไข Open Graph (การแชร์บนโซเชียลมีเดีย)",
    content: `ยังอยู่ในไฟล์ app/layout.tsx แก้ไขส่วน openGraph ซึ่งควบคุมว่าเว็บไซต์จะแสดงอย่างไรเมื่อถูกแชร์บน Facebook, Line หรือโซเชียลมีเดียอื่นๆ อัปเดตช่อง url ให้เป็นชื่อโดเมนจริงของคุณหลัง deploy`,
  },
  {
    title: "ขั้นตอนที่ 4: อัปเดตโดเมนใน sitemap.ts และ robots.ts",
    content: `เปิดไฟล์ app/sitemap.ts และ app/robots.ts แล้วเปลี่ยน "https://tonyaflowers.com" เป็นชื่อโดเมนจริงของคุณ sitemap จะบอก Google ว่ามีหน้าไหนบ้างที่ต้อง index ส่วน robots.txt จะบอก search engine ว่าจะ crawl เว็บอย่างไร`,
  },
  {
    title: "ขั้นตอนที่ 5: ส่งเว็บไปยัง Google Search Console",
    content: `นี่เป็นขั้นตอนที่สำคัญที่สุด! เข้าไปที่ Google Search Console (search.google.com/search-console) แล้ว:

1. เพิ่มเว็บไซต์ของคุณเป็น property
2. ยืนยันความเป็นเจ้าของ (Vercel ทำให้ง่ายด้วยการยืนยันผ่าน DNS)
3. ส่ง URL ของ sitemap: yourdomain.com/sitemap.xml
4. รอให้ Google เริ่ม index หน้าเว็บ (อาจใช้เวลาหลายวันถึงหลายสัปดาห์)`,
  },
  {
    title: "ขั้นตอนที่ 6: สร้าง Google Business Profile",
    content: `เข้าไปที่ business.google.com แล้วสร้างโปรไฟล์สำหรับ "Tonya Flowers Wedding Studio" ฟรี! และสำคัญมากสำหรับ SEO ในพื้นที่:

1. เพิ่มชื่อธุรกิจ ที่อยู่ เบอร์โทร และเวลาทำการ
2. อัปโหลดรูปผลงานของคุณ
3. เลือกหมวดหมู่ที่ถูกต้อง: "Wedding Planner" หรือ "Florist"
4. ขอให้ลูกค้าที่พอใจเขียนรีวิวบน Google
5. จะช่วยให้ร้านของคุณแสดงบน Google Maps และผลค้นหาในพื้นที่`,
  },
  {
    title: "ขั้นตอนที่ 7: เพิ่มเนื้อหาสม่ำเสมอ",
    content: `Google ชอบเนื้อหาใหม่ๆ ลองเพิ่ม:

- บล็อกเกี่ยวกับเคล็ดลับและแรงบันดาลใจงานแต่ง
- รูปภาพใหม่ในแกลเลอรีหลังจากจัดงานเสร็จแต่ละครั้ง
- รีวิวจากลูกค้าจริง
- เนื้อหาตามฤดูกาล เช่น "ดอกไม้งานแต่งยอดนิยมช่วงหน้าร้อน"

ทุกหน้าใหม่คือโอกาสในการติดอันดับคีย์เวิร์ด!`,
  },
  {
    title: "ขั้นตอนที่ 8: สร้าง Backlinks",
    content: `Backlinks (เว็บไซต์อื่นลิงก์มาหาคุณ) เป็นหนึ่งในปัจจัย SEO ที่สำคัญที่สุด:

- ลงทะเบียนในไดเรกทอรีงานแต่งงานของไทย
- ร่วมมือกับผู้ให้บริการงานแต่งงานรายอื่นและลิงก์ถึงกัน
- แชร์ผลงานบนโซเชียลมีเดียพร้อมลิงก์กลับมาเว็บไซต์
- ขอให้บล็อกหรือนิตยสารงานแต่งงานนำเสนอผลงานของคุณ`,
  },
]

export default function SeoGuidePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-accent"
        >
          <ArrowLeft size={16} />
          กลับหน้าแรก
        </Link>

        <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
          คู่มือ SEO สำหรับเว็บไซต์ของคุณ
        </h1>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          ทำตามขั้นตอนเหล่านี้เพื่อเพิ่มประสิทธิภาพเว็บไซต์สำหรับ search engine
          คู่มือนี้สำหรับอ้างอิงเท่านั้น และไม่ถูก index โดย Google
        </p>

        <div className="mt-12 flex flex-col gap-10">
          {steps.map((step, index) => (
            <article
              key={index}
              className="rounded-sm border border-border bg-card p-6"
            >
              <h2 className="font-serif text-xl font-semibold text-foreground">
                {step.title}
              </h2>
              <div className="mt-4 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                {step.content}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 rounded-sm bg-primary p-8">
          <h2 className="font-serif text-xl font-semibold text-primary-foreground">
            สรุปด่วน: แก้ไขคีย์เวิร์ดที่ไหน
          </h2>
          <div className="mt-4 space-y-3 text-sm text-primary-foreground/80">
            <p>
              <span className="font-semibold text-accent">คีย์เวิร์ด:</span>{" "}
              {"app/layout.tsx → metadata.keywords array"}
            </p>
            <p>
              <span className="font-semibold text-accent">ชื่อหน้าเว็บ:</span>{" "}
              {"app/layout.tsx → metadata.title"}
            </p>
            <p>
              <span className="font-semibold text-accent">คำอธิบาย:</span>{" "}
              {"app/layout.tsx → metadata.description"}
            </p>
            <p>
              <span className="font-semibold text-accent">
                พรีวิวโซเชียลมีเดีย:
              </span>{" "}
              {"app/layout.tsx → metadata.openGraph"}
            </p>
            <p>
              <span className="font-semibold text-accent">Sitemap:</span>{" "}
              {"app/sitemap.ts"}
            </p>
            <p>
              <span className="font-semibold text-accent">
                Structured Data:
              </span>{" "}
              {"app/page.tsx → jsonLd object"}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
