"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

const testimonials = [
  {
    name: "คุณนิด & คุณเบนซ์",
    event: "งานแต่งงาน 2567",
    message:
      "ประทับใจมากค่ะ ทีมงานใส่ใจทุกรายละเอียด ดอกไม้สวยมาก ซุ้มแต่งงานออกมาเกินความคาดหวัย ขอบคุณที่ทำให้วันสำคัญของเราสมบูรณ์แบบค่ะ",
  },
  {
    name: "คุณแอน & คุณโจ้",
    event: "งานแต่งงาน 2567",
    message:
      "บริการดีมากครับ ตั้งแต่ปรึกษาจนถึงวันงาน ทีมงานมืออาชีพ ราคาเป็นกันเอง คุ้มค่ามากๆ แนะนำเลยครับ",
  },
  {
    name: "คุณมิ้นท์ & คุณบอส",
    event: "งานแต่งงาน 2566",
    message:
      "เลือกใช้บริการต้นหญ้าฟลาวเวอร์ไม่ผิดหวังเลยค่ะ จัดดอกไม้สวยมาก ตกแต่งสถานที่ได้หรูหรา แขกทุกคนชื่นชมมากๆ ค่ะ",
  },
  {
    name: "คุณเฟิร์น & คุณเก่ง",
    event: "งานแต่งงาน 2566",
    message:
      "ขอบคุณทีมต้นหญ้าฟลาวเวอร์มากค่ะ งานออกมาสวยกว่าที่คิดไว้อีก ช่อดอกไม้เจ้าสาวสวยมาก เก็บเป็นความทรงจำดีๆ ค่ะ",
  },
]

export function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [isAutoPlaying])

  const prev = () => {
    setIsAutoPlaying(false)
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const next = () => {
    setIsAutoPlaying(false)
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }

  return (
    <section className="bg-secondary py-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-accent">
            เสียงจากลูกค้า
          </p>
          <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl text-balance">
            รีวิวจากคู่บ่าวสาว
          </h2>
        </div>

        <div className="relative mt-16">
          {/* Quote icon */}
          <Quote className="mx-auto h-12 w-12 text-accent/30" />

          {/* Testimonial content */}
          <div className="relative min-h-[200px] overflow-hidden">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.name}
                className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 ${
                  index === current
                    ? "translate-x-0 opacity-100"
                    : index < current
                    ? "-translate-x-full opacity-0"
                    : "translate-x-full opacity-0"
                }`}
              >
                <p className="mt-6 text-center text-lg leading-relaxed text-foreground/80 md:text-xl">
                  &ldquo;{testimonial.message}&rdquo;
                </p>
                <div className="mt-8 text-center">
                  <p className="font-serif text-lg font-semibold text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {testimonial.event}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:bg-accent hover:text-primary hover:border-accent"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsAutoPlaying(false)
                    setCurrent(index)
                  }}
                  className={`h-2 w-2 rounded-full transition-all ${
                    index === current
                      ? "w-6 bg-accent"
                      : "bg-border hover:bg-accent/50"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:bg-accent hover:text-primary hover:border-accent"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
