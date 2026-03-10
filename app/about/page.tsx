import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Heart, Flower2, Award, Users, Calendar, MapPin } from "lucide-react"

const milestones = [
  { year: "2014", title: "เริ่มต้นธุรกิจ", description: "เปิดร้านดอกไม้เล็กๆ ในลพบุรี ด้วยความรักในการจัดดอกไม้" },
  { year: "2016", title: "ขยายบริการ", description: "เริ่มให้บริการจัดดอกไม้งานแต่งงานเต็มรูปแบบ" },
  { year: "2018", title: "ทีมงานเติบโต", description: "ขยายทีมงานเป็น 10 คน พร้อมรับงานขนาดใหญ่" },
  { year: "2020", title: "ก้าวสู่ออนไลน์", description: "เปิดช่องทางออนไลน์ รับลูกค้าจากทั่วประเทศ" },
  { year: "2024", title: "10 ปีแห่งความสำเร็จ", description: "ครบ 10 ปี ด้วยผลงานกว่า 500 งานแต่งงาน" },
]

const values = [
  {
    icon: Heart,
    title: "ความใส่ใจ",
    description: "เราใส่ใจทุกรายละเอียดตั้งแต่การเลือกดอกไม้ ไปจนถึงการจัดวางทุกกลีบ"
  },
  {
    icon: Flower2,
    title: "คุณภาพ",
    description: "ใช้ดอกไม้สดคุณภาพสูง คัดสรรอย่างดีเพื่อให้สดสวยตลอดทั้งวัน"
  },
  {
    icon: Award,
    title: "ความเชี่ยวชาญ",
    description: "ทีมงานมีประสบการณ์กว่า 10 ปี พร้อมสร้างสรรค์ผลงานตามความต้องการ"
  },
  {
    icon: Users,
    title: "บริการดุจครอบครัว",
    description: "เราดูแลลูกค้าทุกคนเหมือนคนในครอบครัว เพื่อให้วันสำคัญของคุณสมบูรณ์แบบ"
  },
]

const team = [
  {
    name: "คุณตอน",
    role: "ผู้ก่อตั้ง / หัวหน้าฝ่ายออกแบบ",
    description: "ด้วยประสบการณ์กว่า 10 ปีในวงการจัดดอกไม้ คุณตอนเป็นผู้นำในการสร้างสรรค์ทุกผลงาน"
  },
  {
    name: "ทีมออกแบบ",
    role: "ฝ่ายครีเอทีฟ",
    description: "ทีมออกแบบที่พร้อมสร้างสรรค์ไอเดียใหม่ๆ ตามธีมและสไตล์ที่ลูกค้าต้องการ"
  },
  {
    name: "ทีมจัดงาน",
    role: "ฝ่ายปฏิบัติการ",
    description: "ทีมงานมืออาชีพที่พร้อมดูแลการติดตั้งและจัดงานให้สมบูรณ์แบบ"
  },
]

export default function AboutPage() {
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
          <h1 className="font-serif text-xl font-semibold text-foreground">About Us</h1>
          <div className="w-24" />
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative py-24 bg-secondary">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <div>
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-accent">
                  เกี่ยวกับเรา
                </p>
                <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl lg:text-5xl text-balance">
                  Tonya Flowers Wedding Studio
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                  เราคือผู้เชี่ยวชาญด้านการจัดดอกไม้งานแต่งงานในลพบุรี 
                  ก่อตั้งขึ้นจากความรักและความหลงใหลในศิลปะการจัดดอกไม้ 
                  ตลอด 10 ปีที่ผ่านมา เราได้สร้างสรรค์ความทรงจำอันสวยงามให้กับคู่บ่าวสาวกว่า 500 คู่
                </p>
                <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                  ด้วยทีมงานที่เปี่ยมด้วยประสบการณ์และความคิดสร้างสรรค์ 
                  เรามุ่งมั่นที่จะทำให้วันสำคัญของคุณเป็นวันที่สมบูรณ์แบบที่สุด
                </p>
              </div>
              <div className="relative aspect-square">
                <Image
                  src="/images/logo.jpg"
                  alt="Tonya Flowers Wedding Studio"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center mb-16">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-accent">
                คุณค่าของเรา
              </p>
              <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
                สิ่งที่เรายึดมั่น
              </h2>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value) => (
                <div key={value.title} className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <value.icon size={28} className="text-primary" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-foreground">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-24 bg-secondary">
          <div className="mx-auto max-w-4xl px-6">
            <div className="text-center mb-16">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-accent">
                เส้นทางของเรา
              </p>
              <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
                10 ปีแห่งความทุ่มเท
              </h2>
            </div>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border md:left-1/2 md:-translate-x-1/2" />
              
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div key={milestone.year} className={`relative flex gap-8 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                    <div className={`flex-1 ${index % 2 === 0 ? "md:text-right md:pr-12" : "md:text-left md:pl-12"} pl-12 md:pl-0`}>
                      <span className="inline-block rounded-full bg-accent px-3 py-1 text-sm font-semibold text-accent-foreground">
                        {milestone.year}
                      </span>
                      <h3 className="mt-3 font-serif text-xl font-semibold text-foreground">
                        {milestone.title}
                      </h3>
                      <p className="mt-2 text-muted-foreground">
                        {milestone.description}
                      </p>
                    </div>
                    {/* Dot */}
                    <div className="absolute left-4 top-1 flex h-3 w-3 items-center justify-center md:left-1/2 md:-translate-x-1/2">
                      <div className="h-3 w-3 rounded-full bg-primary" />
                    </div>
                    <div className="hidden flex-1 md:block" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center mb-16">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-accent">
                ทีมของเรา
              </p>
              <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
                ผู้อยู่เบื้องหลังความสำเร็จ
              </h2>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {team.map((member) => (
                <div key={member.name} className="rounded-lg border border-border bg-card p-8 text-center">
                  <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                    <Users size={32} className="text-primary" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-accent">
                    {member.role}
                  </p>
                  <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                    {member.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Location Section */}
        <section className="py-24 bg-primary text-primary-foreground">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div>
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-accent">
                  มาพบเรา
                </p>
                <h2 className="font-serif text-3xl font-bold md:text-4xl">
                  สตูดิโอของเรา
                </h2>
                <p className="mt-6 leading-relaxed text-primary-foreground/80">
                  ยินดีต้อนรับทุกท่านที่สนใจมาเยี่ยมชมสตูดิโอของเรา 
                  เพื่อพูดคุยรายละเอียดงานและชมตัวอย่างดอกไม้
                </p>
                <div className="mt-8 space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin size={20} className="mt-0.5 text-accent" />
                    <div>
                      <p className="font-medium">ที่ตั้ง</p>
                      <p className="text-primary-foreground/70">รามเดโช ลพบุรี 15000</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar size={20} className="mt-0.5 text-accent" />
                    <div>
                      <p className="font-medium">เวลาทำการ</p>
                      <p className="text-primary-foreground/70">จันทร์ - อาทิตย์, 10:00 - 19:00 น.</p>
                    </div>
                  </div>
                </div>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href="/booking"
                    className="rounded-sm bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90"
                  >
                    นัดหมายปรึกษา
                  </Link>
                  <a
                    href="tel:0928278061"
                    className="rounded-sm border border-primary-foreground/30 px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-foreground/10"
                  >
                    โทร 092-827-8061
                  </a>
                </div>
              </div>
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3862.8!2d100.65!3d14.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTTCsDQ4JzAwLjAiTiAxMDDCsDM5JzAwLjAiRQ!5e0!3m2!1sth!2sth!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "300px" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
