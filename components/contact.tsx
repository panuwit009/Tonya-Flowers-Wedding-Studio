import { Phone, Mail, MapPin, Clock, Facebook } from "lucide-react"

const contactDetails = [
  {
    icon: Phone,
    label: "โทรศัพท์",
    value: "092 827 8061",
    href: "tel:0928278061",
  },
  {
    icon: Mail,
    label: "อีเมล",
    value: "tanuponlali@gmail.com",
    href: "mailto:tanuponlali@gmail.com",
  },
  {
    icon: Facebook,
    label: "Facebook",
    value: "Tonya Flowers Wedding Studio",
    href: "https://www.facebook.com/profile.php?id=100063576790491",
  },
  {
    icon: MapPin,
    label: "ที่ตั้ง",
    value: "รามเดโช ลพบุรี 15000",
    href: "https://maps.google.com/?q=รามเดโช+Lop+Buri+Thailand+15000",
  },
  {
    icon: Clock,
    label: "เวลาทำการ",
    value: "จันทร์ - อาทิตย์, 10:00 - 19:00",
    href: undefined,
  },
]

export function Contact() {
  return (
    <section id="contact" className="bg-primary py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-16 lg:grid-cols-2">
          {/* Left - CTA */}
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-accent">
              ติดต่อเรา
            </p>
            <h2 className="font-serif text-3xl font-bold text-primary-foreground md:text-4xl text-balance">
              มาวางแผนวันสำคัญของคุณกัน
            </h2>
            <p className="mt-6 leading-relaxed text-primary-foreground/70">
              พร้อมที่จะเริ่มวางแผนงานแต่งงานในฝันของคุณหรือยัง? 
              ติดต่อเราได้เลย เรายินดีให้คำปรึกษาและสร้างสรรค์ผลงานที่สวยงามให้กับคุณ
            </p>

            <div className="mt-10 flex flex-col gap-6">
              {contactDetails.map((detail) => {
                const content = (
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/15">
                      <detail.icon size={18} className="text-accent" />
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-primary-foreground/50">
                        {detail.label}
                      </p>
                      <p className="mt-1 text-sm text-primary-foreground">
                        {detail.value}
                      </p>
                    </div>
                  </div>
                )

                if (detail.href) {
                  return (
                    <a
                      key={detail.label}
                      href={detail.href}
                      target={detail.href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        detail.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="transition-opacity hover:opacity-80"
                    >
                      {content}
                    </a>
                  )
                }

                return <div key={detail.label}>{content}</div>
              })}
            </div>
          </div>

          {/* Right - Map embed */}
          <div className="flex flex-col gap-6">
            <div className="overflow-hidden rounded-sm">
              <iframe
                title="Tonya Flowers Wedding Studio Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3862.5!2d100.6!3d14.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTTCsDQ4JzAwLjAiTiAxMDDCsDM2JzAwLjAiRQ!5e0!3m2!1sen!2sth!4v1700000000000"
                width="100%"
                height="350"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-sm"
              />
            </div>
            <div className="rounded-sm bg-primary-foreground/5 p-8">
              <h3 className="font-serif text-lg font-semibold text-primary-foreground">
                มาเยี่ยมชมสตูดิโอของเรา
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-primary-foreground/70">
                เชิญมาพูดคุยเรื่องงานแต่งงานของคุณที่สตูดิโอของเรา 
                เปิดให้บริการทุกวัน 10:00 - 19:00 น. สามารถเข้ามาได้เลยหรือโทรนัดหมายล่วงหน้าได้
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
