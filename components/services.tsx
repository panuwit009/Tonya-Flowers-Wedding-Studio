import { Flower, CalendarHeart, Palette, Camera, UtensilsCrossed, Music } from "lucide-react"

const services = [
  {
    icon: Flower,
    title: "ออกแบบดอกไม้",
    description:
      "ช่อดอกไม้เจ้าสาว ซุ้มพิธี แจกันกลางโต๊ะ และตกแต่งสถานที่ ออกแบบตามธีมของคุณ",
  },
  {
    icon: CalendarHeart,
    title: "วางแผนงานแต่งงาน",
    description:
      "บริการวางแผนงานแต่งงานครบวงจร ตั้งแต่เลือกสถานที่จนถึงจัดตารางเวลา เพื่อให้งานเลี้ยงสมบูรณ์แบบ",
  },
  {
    icon: Palette,
    title: "ธีมและสไตล์",
    description:
      "พัฒนาคอนเซ็ปต์สร้างสรรค์และจัดสไตล์ เพื่อให้งานแต่งของคุณเป็นจริง ด้วยดีไซน์ที่สวยงามลงตัว",
  },
  {
    icon: Camera,
    title: "ประสานงานเจ้าภาพ",
    description:
      "เราเชื่อมต่อคุณกับช่างภาพ ช่างวิดีโอ และผู้ให้บริการที่น่าเชื่อถือ เพื่อให้งานสมบูรณ์แบบ",
  },
  {
    icon: UtensilsCrossed,
    title: "จัดเตรียมอาหารและเครื่องดื่ม",
    description:
      "จัดโต๊ะอาหารอย่างสวยงาม จัดสไตล์บุฟเฟ่ต์ และตกแต่งพื้นที่รับประทานอาหาร ให้เข้ากับงานเลี้ยงของคุณ",
  },
  {
    icon: Music,
    title: "ดูแลงานในวันจริง",
    description:
      "บริหารจัดการหน้างานอย่างมืออาชีพในวันแต่งงาน เพื่อให้คุณผ่อนคลายและสนุกกับทุกช่วงเวลา",
  },
]

export function Services() {
  return (
    <section id="services" className="bg-secondary py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-accent">
            สิ่งที่เรามอบให้
          </p>
          <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl text-balance">
            บริการของเรา
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            ตั้งแต่การจัดดอกไม้สุดสวย ไปจนถึงการวางแผนงานอีเวนต์ครบวงจร
            เรามีทุกอย่างที่คุณต้องการสำหรับงานแต่งงานที่สมบูรณ์แบบ
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
