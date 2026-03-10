import Image from "next/image"
import { Heart, Flower2, Sparkles } from "lucide-react"

const highlights = [
  {
    icon: Heart,
    title: "ใส่ใจทุกรายละเอียด",
    description:
      "ทุกกลีบดอก ทุกริบบิ้น ทุกรายละเอียดถูกสร้างสรรค์ด้วยความรักและความใส่ใจ เพื่อให้วันสำคัญของคุณพิเศษอย่างแท้จริง",
  },
  {
    icon: Flower2,
    title: "เชี่ยวชาญด้านดอกไม้",
    description:
      "ด้วยประสบการณ์กว่า 10 ปีในการจัดดอกไม้ เราสร้างสรรค์การจัดดอกไม้ที่สวยงามและเหมาะกับสไตล์ของคุณ",
  },
  {
    icon: Sparkles,
    title: "บริการครบวงจร",
    description:
      "ตั้งแต่การวางแผนจนถึงวันงาน เราดูแลทุกรายละเอียดของงานแต่งงาน เพื่อให้คุณได้สนุกกับทุกช่วงเวลา",
  },
]

export function About() {
  return (
    <section id="about" className="bg-background py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
            <Image
              src="/images/gallery-1.jpg"
              alt="Beautiful wedding bouquet by Tonya Flowers"
              fill
              className="object-cover"
            />
          </div>

          {/* Text content */}
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-accent">
              เกี่ยวกับเรา
            </p>
            <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl text-balance">
              ร้านต้นหญ้าฟลาวเวอร์เวดดิ้งลพบุรี
            </h2>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              เพราะทุกคู่คือผลงานที่รังสรรค์ออกมาโดยทีมต้นหญ้าฟลาวเวอร์กว่า 10 ปีที่พัฒนาอย่างต่อเนื่อง
              ขอบพระคุณทุกแรงพลักดันและการสนับสนุนจากบ่าวสาวทุกคู่อย่างไม่มีที่สิ้นสุด เราหวังว่าเราจะได้รับใช้ท่านในโอกาสต่างๆ เช่นเคย ทุกความรู้สึกดีดีเกิดขึ้นที่เราต้นหญ้าฟลาวเวอร์เวดดิ้งขอเป็นหนึ่งในแรงบันดาลใจการสร้างผลงาน
            </p>

            <div className="mt-10 flex flex-col gap-8">
              {highlights.map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/15">
                    <item.icon size={20} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
