"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowLeft, Calendar, User, Phone, Mail, MessageSquare, CheckCircle, Clock, MapPin } from "lucide-react"

const packages = [
  { id: "basic", name: "Basic Package", price: "15,000 - 25,000 บาท" },
  { id: "standard", name: "Standard Package", price: "25,000 - 40,000 บาท" },
  { id: "premium", name: "Premium Package", price: "40,000 - 60,000 บาท" },
  { id: "luxury", name: "Luxury Package", price: "60,000 บาทขึ้นไป" },
  { id: "custom", name: "กำหนดเอง", price: "ติดต่อสอบถาม" },
]

const venueTypes = [
  "โรงแรม",
  "ร้านอาหาร",
  "สวน/กลางแจ้ง",
  "บ้าน",
  "วัด/โบสถ์",
  "อื่นๆ",
]

export default function BookingPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    weddingDate: "",
    guestCount: "",
    venue: "",
    venueType: "",
    package: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send to an API
    setIsSubmitted(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle size={40} className="text-primary" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-foreground">
            ส่งข้อมูลสำเร็จ!
          </h2>
          <p className="mt-4 text-muted-foreground">
            ขอบคุณที่สนใจบริการของเรา เราจะติดต่อกลับภายใน 24 ชั่วโมง
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/"
              className="rounded-sm bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              กลับหน้าหลัก
            </Link>
            <a
              href="tel:0928278061"
              className="rounded-sm border border-border bg-card px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              โทรหาเราเลย
            </a>
          </div>
        </div>
      </div>
    )
  }

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
          <h1 className="font-serif text-xl font-semibold text-foreground">Booking</h1>
          <div className="w-24" />
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-12">
        {/* Page Title */}
        <div className="text-center mb-12">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-accent">
            นัดหมาย
          </p>
          <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl text-balance">
            จองคิวปรึกษางานแต่งงาน
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            กรอกข้อมูลเบื้องต้น เราจะติดต่อกลับภายใน 24 ชั่วโมง เพื่อนัดหมายพูดคุยรายละเอียด
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Contact Info Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-lg border border-border bg-card p-6">
              <h3 className="font-serif text-lg font-semibold text-foreground mb-6">
                ข้อมูลติดต่อ
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Phone size={18} className="mt-0.5 text-accent" />
                  <div>
                    <p className="text-sm font-medium text-foreground">โทรศัพท์</p>
                    <a href="tel:0928278061" className="text-sm text-muted-foreground hover:text-accent">
                      092-827-8061
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail size={18} className="mt-0.5 text-accent" />
                  <div>
                    <p className="text-sm font-medium text-foreground">อีเมล</p>
                    <a href="mailto:tanuponlali@gmail.com" className="text-sm text-muted-foreground hover:text-accent">
                      tanuponlali@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock size={18} className="mt-0.5 text-accent" />
                  <div>
                    <p className="text-sm font-medium text-foreground">เวลาทำการ</p>
                    <p className="text-sm text-muted-foreground">
                      จันทร์ - อาทิตย์<br />10:00 - 19:00 น.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="mt-0.5 text-accent" />
                  <div>
                    <p className="text-sm font-medium text-foreground">ที่ตั้ง</p>
                    <p className="text-sm text-muted-foreground">
                      รามเดโช ลพบุรี 15000
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  หรือติดต่อผ่าน LINE เพื่อรับการตอบกลับที่รวดเร็วยิ่งขึ้น
                </p>
                <a
                  href="https://line.me/ti/p/~tonyaflowers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center justify-center gap-2 rounded-sm bg-[#06C755] px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-[#05a847]"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .195-.095.378-.252.491l-1.667 1.244v1.408c0 .349-.281.631-.63.631a.634.634 0 01-.63-.631v-3.144c0-.349.281-.631.63-.631h1.919zm-3.768 0a.634.634 0 01.63.631v3.144a.634.634 0 01-.63.631.634.634 0 01-.631-.631V10.494a.634.634 0 01.631-.631zm-1.758 0c.349 0 .63.285.63.631v3.144a.634.634 0 01-.63.631H11.95a.634.634 0 01-.631-.631V10.494c0-.346.282-.631.631-.631h1.889zm-5.377 0c.349 0 .63.285.63.631 0 .349-.281.631-.63.631h-1.258v.65h1.258c.349 0 .63.285.63.631 0 .349-.281.631-.63.631H7.204a.634.634 0 01-.631-.631V10.494c0-.346.282-.631.631-.631h2.258zM12 2C6.477 2 2 5.813 2 10.498c0 4.174 3.598 7.673 8.468 8.386.329.069.777.211.89.486.102.249.066.641.033.891l-.144.865c-.044.262-.204 1.024.896.558 1.1-.467 5.929-3.491 8.09-5.979h-.001C21.67 14.07 22 12.346 22 10.498 22 5.813 17.523 2 12 2z"/>
                  </svg>
                  LINE: @tonyaflowers
                </a>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="rounded-lg border border-border bg-card p-6 lg:p-8">
              <div className="grid gap-6">
                {/* Personal Info */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                      <User size={16} className="text-muted-foreground" />
                      ชื่อ-นามสกุล <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full rounded-sm border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                      placeholder="ชื่อของคุณ"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                      <Phone size={16} className="text-muted-foreground" />
                      เบอร์โทรศัพท์ <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full rounded-sm border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                      placeholder="08X-XXX-XXXX"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                    <Mail size={16} className="text-muted-foreground" />
                    อีเมล
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-sm border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    placeholder="email@example.com"
                  />
                </div>

                {/* Wedding Details */}
                <div className="border-t border-border pt-6">
                  <h4 className="mb-4 font-serif text-lg font-semibold text-foreground">รายละเอียดงาน</h4>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="weddingDate" className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                        <Calendar size={16} className="text-muted-foreground" />
                        วันที่จัดงาน (โดยประมาณ)
                      </label>
                      <input
                        type="date"
                        id="weddingDate"
                        name="weddingDate"
                        value={formData.weddingDate}
                        onChange={handleChange}
                        className="w-full rounded-sm border border-input bg-background px-4 py-3 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                      />
                    </div>
                    <div>
                      <label htmlFor="guestCount" className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                        <User size={16} className="text-muted-foreground" />
                        จำนวนแขก (โดยประมาณ)
                      </label>
                      <input
                        type="number"
                        id="guestCount"
                        name="guestCount"
                        value={formData.guestCount}
                        onChange={handleChange}
                        className="w-full rounded-sm border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                        placeholder="100"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="venueType" className="mb-2 block text-sm font-medium text-foreground">
                      ประเภทสถานที่
                    </label>
                    <select
                      id="venueType"
                      name="venueType"
                      value={formData.venueType}
                      onChange={handleChange}
                      className="w-full rounded-sm border border-input bg-background px-4 py-3 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    >
                      <option value="">เลือกประเภทสถานที่</option>
                      {venueTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="venue" className="mb-2 block text-sm font-medium text-foreground">
                      ชื่อสถานที่ (ถ้าทราบ)
                    </label>
                    <input
                      type="text"
                      id="venue"
                      name="venue"
                      value={formData.venue}
                      onChange={handleChange}
                      className="w-full rounded-sm border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                      placeholder="ชื่อโรงแรม/สถานที่"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="package" className="mb-2 block text-sm font-medium text-foreground">
                    แพ็คเกจที่สนใจ
                  </label>
                  <select
                    id="package"
                    name="package"
                    value={formData.package}
                    onChange={handleChange}
                    className="w-full rounded-sm border border-input bg-background px-4 py-3 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  >
                    <option value="">เลือกแพ็คเกจ</option>
                    {packages.map(pkg => (
                      <option key={pkg.id} value={pkg.id}>{pkg.name} ({pkg.price})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                    <MessageSquare size={16} className="text-muted-foreground" />
                    รายละเอียดเพิ่มเติม
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full rounded-sm border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent resize-none"
                    placeholder="บอกเล่าความต้องการหรือธีมงานที่ต้องการ..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-sm bg-primary px-6 py-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  ส่งข้อมูล
                </button>

                <p className="text-center text-xs text-muted-foreground">
                  ข้อมูลของคุณจะถูกเก็บเป็นความลับและใช้เพื่อการติดต่อกลับเท่านั้น
                </p>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
