"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Calendar, User, Phone, Mail, MessageSquare, CheckCircle, Clock, MapPin, AlertCircle } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import type { Package, BlockedDate, Booking } from "@/lib/types/database"

const venueTypes = [
  "โรงแรม",
  "ร้านอาหาร",
  "สวน/กลางแจ้ง",
  "บ้าน",
  "วัด/โบสถ์",
  "อื่นๆ",
]

const eventTypes = [
  "งานแต่งงาน",
  "งานหมั้น",
  "งานฉลองมงคลสมรส",
  "อื่นๆ",
]

export default function BookingPage() {
  const router = useRouter()
  const supabase = createClient()
  
  const [user, setUser] = useState<{ id: string; email: string } | null>(null)
  const [profile, setProfile] = useState<{ full_name: string; phone: string } | null>(null)
  const [packages, setPackages] = useState<Package[]>([])
  const [blockedDates, setBlockedDates] = useState<string[]>([])
  const [myBookings, setMyBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    eventDate: "",
    eventLocation: "",
    venueType: "",
    eventType: "",
    packageId: "",
    message: "",
  })

  useEffect(() => {
    async function loadData() {
      // Get user
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/auth/login')
        return
      }
      setUser({ id: user.id, email: user.email || '' })
      
      // Get profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('full_name, phone')
        .eq('id', user.id)
        .single()
      
      if (profileData) {
        setProfile(profileData)
        setFormData(prev => ({
          ...prev,
          name: profileData.full_name || '',
          phone: profileData.phone || '',
          email: user.email || '',
        }))
      }
      
      // Get packages
      const { data: packagesData } = await supabase
        .from('packages')
        .select('*')
        .eq('is_active', true)
        .order('price', { ascending: true })
      
      if (packagesData) {
        setPackages(packagesData)
      }
      
      // Get blocked dates
      const { data: blockedData } = await supabase
        .from('blocked_dates')
        .select('blocked_date')
      
      if (blockedData) {
        setBlockedDates(blockedData.map(d => d.blocked_date))
      }

      // Get existing bookings (dates that are pending/confirmed)
      const { data: bookingsData } = await supabase
        .from('bookings')
        .select('event_date')
        .in('status', ['pending', 'confirmed'])
      
      if (bookingsData) {
        const bookedDates = bookingsData.map(b => b.event_date)
        setBlockedDates(prev => [...new Set([...prev, ...bookedDates])])
      }
      
      // Get my bookings
      const { data: myBookingsData } = await supabase
        .from('bookings')
        .select('*, package:packages(*)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
      
      if (myBookingsData) {
        setMyBookings(myBookingsData)
      }
      
      setIsLoading(false)
    }
    
    loadData()
  }, [router, supabase])

  const isDateBlocked = (dateString: string) => {
    return blockedDates.includes(dateString)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return
    
    setIsSubmitting(true)
    setError(null)

    // Check if date is blocked
    if (isDateBlocked(formData.eventDate)) {
      setError('วันที่เลือกไม่ว่าง กรุณาเลือกวันอื่น')
      setIsSubmitting(false)
      return
    }

    const selectedPackage = packages.find(p => p.id === formData.packageId)
    
    const { error: insertError } = await supabase
      .from('bookings')
      .insert({
        user_id: user.id,
        package_id: formData.packageId || null,
        customer_name: formData.name,
        customer_email: formData.email,
        customer_phone: formData.phone,
        event_date: formData.eventDate,
        event_location: formData.eventLocation || null,
        event_type: formData.eventType || null,
        special_requests: formData.message || null,
        package_price: selectedPackage?.price || null,
        total_price: selectedPackage?.price || null,
        status: 'pending',
        payment_status: 'unpaid',
      })

    if (insertError) {
      setError('เกิดข้อผิดพลาดในการจอง กรุณาลองใหม่อีกครั้ง')
      setIsSubmitting(false)
      return
    }

    setIsSubmitted(true)
    setIsSubmitting(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
      completed: 'bg-blue-100 text-blue-800',
    }
    const labels = {
      pending: 'รอยืนยัน',
      confirmed: 'ยืนยันแล้ว',
      cancelled: 'ยกเลิก',
      completed: 'เสร็จสิ้น',
    }
    return (
      <span className={`px-2 py-1 text-xs rounded-full ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    )
  }

  const getPaymentBadge = (status: string) => {
    const styles = {
      unpaid: 'bg-gray-100 text-gray-800',
      deposit_paid: 'bg-orange-100 text-orange-800',
      fully_paid: 'bg-green-100 text-green-800',
    }
    const labels = {
      unpaid: 'ยังไม่ชำระ',
      deposit_paid: 'ชำระมัดจำแล้ว',
      fully_paid: 'ชำระครบแล้ว',
    }
    return (
      <span className={`px-2 py-1 text-xs rounded-full ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-4 text-muted-foreground">กำลังโหลด...</p>
        </div>
      </div>
    )
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle size={40} className="text-primary" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-foreground">
            จองสำเร็จ!
          </h2>
          <p className="mt-4 text-muted-foreground">
            ขอบคุณที่จองบริการของเรา เราจะติดต่อกลับเพื่อยืนยันการจองภายใน 24 ชั่วโมง
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/"
              className="rounded-sm bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              กลับหน้าหลัก
            </Link>
            <button
              onClick={() => {
                setIsSubmitted(false)
                window.location.reload()
              }}
              className="rounded-sm border border-border bg-card px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              ดูรายการจองของฉัน
            </button>
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
          <h1 className="font-serif text-xl font-semibold text-foreground">จองบริการ</h1>
          <div className="text-sm text-muted-foreground">
            {user?.email}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12">
        {/* My Bookings Section */}
        {myBookings.length > 0 && (
          <div className="mb-12">
            <h2 className="font-serif text-2xl font-bold text-foreground mb-6">รายการจองของฉัน</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {myBookings.map((booking) => (
                <div key={booking.id} className="rounded-lg border border-border bg-card p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="font-medium text-foreground">
                        {new Date(booking.event_date).toLocaleDateString('th-TH', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {booking.package?.name || 'ไม่ได้เลือกแพ็คเกจ'}
                      </p>
                    </div>
                    {getStatusBadge(booking.status)}
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">ประเภทงาน:</span>
                      <span className="text-foreground">{booking.event_type || '-'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">สถานที่:</span>
                      <span className="text-foreground">{booking.event_location || '-'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">ราคา:</span>
                      <span className="text-foreground font-medium">
                        {booking.total_price?.toLocaleString() || '-'} บาท
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-muted-foreground">การชำระเงิน:</span>
                      {getPaymentBadge(booking.payment_status)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Page Title */}
        <div className="text-center mb-12">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-accent">
            นัดหมาย
          </p>
          <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl text-balance">
            จองคิวปรึกษางานแต่งงาน
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            กรอกข้อมูลเพื่อจองวันที่ต้องการ เราจะติดต่อกลับเพื่อยืนยันการจอง
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

              {/* Package Info */}
              <div className="mt-6 pt-6 border-t border-border">
                <h4 className="font-medium text-foreground mb-4">แพ็คเกจบริการ</h4>
                <div className="space-y-3">
                  {packages.map((pkg) => (
                    <div key={pkg.id} className="text-sm">
                      <div className="flex justify-between">
                        <span className="text-foreground">{pkg.name}</span>
                        <span className="text-accent font-medium">{pkg.price.toLocaleString()} บาท</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="rounded-lg border border-border bg-card p-6 lg:p-8">
              {error && (
                <div className="mb-6 flex items-center gap-2 rounded-lg bg-red-50 p-4 text-red-700">
                  <AlertCircle size={20} />
                  <p className="text-sm">{error}</p>
                </div>
              )}

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
                    อีเมล <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-sm border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    placeholder="email@example.com"
                  />
                </div>

                {/* Event Details */}
                <div className="border-t border-border pt-6">
                  <h4 className="mb-4 font-serif text-lg font-semibold text-foreground">รายละเอียดงาน</h4>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="eventDate" className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                        <Calendar size={16} className="text-muted-foreground" />
                        วันที่จัดงาน <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        id="eventDate"
                        name="eventDate"
                        required
                        min={new Date().toISOString().split('T')[0]}
                        value={formData.eventDate}
                        onChange={handleChange}
                        className={`w-full rounded-sm border px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-1 ${
                          formData.eventDate && isDateBlocked(formData.eventDate)
                            ? 'border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-500'
                            : 'border-input bg-background focus:border-accent focus:ring-accent'
                        }`}
                      />
                      {formData.eventDate && isDateBlocked(formData.eventDate) && (
                        <p className="mt-1 text-xs text-red-500">วันนี้ไม่ว่าง กรุณาเลือกวันอื่น</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="eventType" className="mb-2 block text-sm font-medium text-foreground">
                        ประเภทงาน <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="eventType"
                        name="eventType"
                        required
                        value={formData.eventType}
                        onChange={handleChange}
                        className="w-full rounded-sm border border-input bg-background px-4 py-3 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                      >
                        <option value="">เลือกประเภทงาน</option>
                        {eventTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="eventLocation" className="mb-2 block text-sm font-medium text-foreground">
                    สถานที่จัดงาน
                  </label>
                  <input
                    type="text"
                    id="eventLocation"
                    name="eventLocation"
                    value={formData.eventLocation}
                    onChange={handleChange}
                    className="w-full rounded-sm border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    placeholder="ชื่อโรงแรม/สถานที่ และจังหวัด"
                  />
                </div>

                <div>
                  <label htmlFor="packageId" className="mb-2 block text-sm font-medium text-foreground">
                    แพ็คเกจที่สนใจ <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="packageId"
                    name="packageId"
                    required
                    value={formData.packageId}
                    onChange={handleChange}
                    className="w-full rounded-sm border border-input bg-background px-4 py-3 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  >
                    <option value="">เลือกแพ็คเกจ</option>
                    {packages.map(pkg => (
                      <option key={pkg.id} value={pkg.id}>
                        {pkg.name} ({pkg.price.toLocaleString()} บาท)
                      </option>
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
                  disabled={isSubmitting || (formData.eventDate && isDateBlocked(formData.eventDate))}
                  className="w-full rounded-sm bg-primary px-6 py-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'กำลังจอง...' : 'ยืนยันการจอง'}
                </button>

                <p className="text-center text-xs text-muted-foreground">
                  หลังจากจองแล้ว ทางร้านจะติดต่อกลับเพื่อยืนยันและแจ้งรายละเอียดการชำระเงิน
                </p>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
