"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Package,
  DollarSign,
  CheckCircle,
  XCircle,
  Clock,
  MessageSquare,
  Save
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import type { Booking } from "@/lib/types/database"

const statusOptions = [
  { value: 'pending', label: 'รอยืนยัน', icon: Clock, color: 'text-yellow-600' },
  { value: 'confirmed', label: 'ยืนยันแล้ว', icon: CheckCircle, color: 'text-green-600' },
  { value: 'completed', label: 'เสร็จสิ้น', icon: CheckCircle, color: 'text-blue-600' },
  { value: 'cancelled', label: 'ยกเลิก', icon: XCircle, color: 'text-red-600' },
]

const paymentOptions = [
  { value: 'unpaid', label: 'ยังไม่ชำระ' },
  { value: 'deposit_paid', label: 'ชำระมัดจำแล้ว' },
  { value: 'fully_paid', label: 'ชำระครบแล้ว' },
]

export default function BookingDetailPage() {
  const params = useParams()
  const router = useRouter()
  const supabase = createClient()
  
  const [booking, setBooking] = useState<Booking | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  
  const [formData, setFormData] = useState({
    status: '',
    payment_status: '',
    payment_amount: 0,
    payment_note: '',
    admin_notes: '',
    additional_cost: 0,
  })

  useEffect(() => {
    async function loadBooking() {
      const { data } = await supabase
        .from('bookings')
        .select('*, package:packages(*)')
        .eq('id', params.id)
        .single()
      
      if (data) {
        setBooking(data)
        setFormData({
          status: data.status,
          payment_status: data.payment_status,
          payment_amount: data.payment_amount || 0,
          payment_note: data.payment_note || '',
          admin_notes: data.admin_notes || '',
          additional_cost: data.additional_cost || 0,
        })
      }
      setIsLoading(false)
    }
    
    loadBooking()
  }, [supabase, params.id])

  const handleSave = async () => {
    if (!booking) return
    
    setIsSaving(true)
    setMessage(null)

    const { data: { user } } = await supabase.auth.getUser()
    
    const totalPrice = (booking.package_price || 0) + formData.additional_cost
    
    const updateData: Record<string, unknown> = {
      status: formData.status,
      payment_status: formData.payment_status,
      payment_amount: formData.payment_amount,
      payment_note: formData.payment_note,
      admin_notes: formData.admin_notes,
      additional_cost: formData.additional_cost,
      total_price: totalPrice,
      updated_at: new Date().toISOString(),
    }

    // Set confirmed_by and confirmed_at when confirming
    if (formData.status === 'confirmed' && booking.status !== 'confirmed') {
      updateData.confirmed_by = user?.id
      updateData.confirmed_at = new Date().toISOString()
    }

    // Set payment_date when payment status changes
    if (formData.payment_status !== 'unpaid' && booking.payment_status === 'unpaid') {
      updateData.payment_date = new Date().toISOString()
    }

    const { error } = await supabase
      .from('bookings')
      .update(updateData)
      .eq('id', booking.id)

    if (error) {
      setMessage({ type: 'error', text: 'เกิดข้อผิดพลาดในการบันทึก' })
    } else {
      setMessage({ type: 'success', text: 'บันทึกสำเร็จ' })
      // Reload booking data
      const { data } = await supabase
        .from('bookings')
        .select('*, package:packages(*)')
        .eq('id', params.id)
        .single()
      if (data) {
        setBooking(data)
      }
    }
    
    setIsSaving(false)
  }

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-64px)] items-center justify-center lg:h-screen">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-4 text-muted-foreground">กำลังโหลด...</p>
        </div>
      </div>
    )
  }

  if (!booking) {
    return (
      <div className="flex h-[calc(100vh-64px)] items-center justify-center lg:h-screen">
        <div className="text-center">
          <p className="text-muted-foreground">ไม่พบรายการจอง</p>
          <Link href="/admin/bookings" className="mt-4 inline-block text-primary hover:underline">
            กลับไปรายการจอง
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/bookings"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border hover:bg-muted"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="font-serif text-2xl font-bold text-foreground">
              รายละเอียดการจอง
            </h1>
            <p className="text-sm text-muted-foreground">
              #{booking.id.slice(0, 8)}
            </p>
          </div>
        </div>
        
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
        >
          <Save size={16} />
          {isSaving ? 'กำลังบันทึก...' : 'บันทึก'}
        </button>
      </div>

      {/* Message */}
      {message && (
        <div className={`mb-6 rounded-lg p-4 ${
          message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
        }`}>
          {message.text}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Customer Info */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="mb-4 font-serif text-lg font-semibold text-foreground">
            ข้อมูลลูกค้า
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <User size={18} className="text-muted-foreground" />
              <span className="text-foreground">{booking.customer_name}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={18} className="text-muted-foreground" />
              <a href={`tel:${booking.customer_phone}`} className="text-foreground hover:text-primary">
                {booking.customer_phone}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={18} className="text-muted-foreground" />
              <a href={`mailto:${booking.customer_email}`} className="text-foreground hover:text-primary">
                {booking.customer_email}
              </a>
            </div>
          </div>
        </div>

        {/* Event Info */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="mb-4 font-serif text-lg font-semibold text-foreground">
            ข้อมูลงาน
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Calendar size={18} className="text-muted-foreground" />
              <span className="text-foreground">
                {new Date(booking.event_date).toLocaleDateString('th-TH', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin size={18} className="text-muted-foreground" />
              <span className="text-foreground">{booking.event_location || '-'}</span>
            </div>
            <div className="flex items-center gap-3">
              <Package size={18} className="text-muted-foreground" />
              <span className="text-foreground">
                {booking.event_type || '-'}
              </span>
            </div>
          </div>
        </div>

        {/* Package Info */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="mb-4 font-serif text-lg font-semibold text-foreground">
            แพ็คเกจ
          </h2>
          <div className="space-y-4">
            <div>
              <p className="text-lg font-medium text-foreground">
                {booking.package?.name || 'ไม่ได้เลือกแพ็คเกจ'}
              </p>
              {booking.package && (
                <p className="text-xl font-bold text-primary">
                  {booking.package.price.toLocaleString()} บาท
                </p>
              )}
            </div>
            {booking.package?.features && (
              <ul className="space-y-1 text-sm text-muted-foreground">
                {(booking.package.features as string[]).map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle size={14} className="mt-0.5 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Status Management */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="mb-4 font-serif text-lg font-semibold text-foreground">
            สถานะการจอง
          </h2>
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                สถานะ
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
            
            {formData.status === 'confirmed' && booking.confirmed_at && (
              <p className="text-xs text-muted-foreground">
                ยืนยันเมื่อ: {new Date(booking.confirmed_at).toLocaleString('th-TH')}
              </p>
            )}
          </div>
        </div>

        {/* Payment Management */}
        <div className="rounded-lg border border-border bg-card p-6 lg:col-span-2">
          <h2 className="mb-4 font-serif text-lg font-semibold text-foreground flex items-center gap-2">
            <DollarSign size={20} />
            การชำระเงิน
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                สถานะการชำระเงิน
              </label>
              <select
                value={formData.payment_status}
                onChange={(e) => setFormData(prev => ({ ...prev, payment_status: e.target.value }))}
                className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              >
                {paymentOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                จำนวนเงินที่รับแล้ว (บาท)
              </label>
              <input
                type="number"
                value={formData.payment_amount}
                onChange={(e) => setFormData(prev => ({ ...prev, payment_amount: Number(e.target.value) }))}
                className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                ค่าใช้จ่ายเพิ่มเติม (บาท)
              </label>
              <input
                type="number"
                value={formData.additional_cost}
                onChange={(e) => setFormData(prev => ({ ...prev, additional_cost: Number(e.target.value) }))}
                className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                ราคารวม
              </label>
              <p className="rounded-lg border border-input bg-muted px-4 py-2 text-lg font-bold text-primary">
                {((booking.package_price || 0) + formData.additional_cost).toLocaleString()} บาท
              </p>
            </div>

            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-medium text-foreground">
                หมายเหตุการชำระเงิน
              </label>
              <textarea
                value={formData.payment_note}
                onChange={(e) => setFormData(prev => ({ ...prev, payment_note: e.target.value }))}
                rows={2}
                className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                placeholder="เช่น โอนเงินเมื่อ..."
              />
            </div>
          </div>
        </div>

        {/* Special Requests */}
        {booking.special_requests && (
          <div className="rounded-lg border border-border bg-card p-6 lg:col-span-2">
            <h2 className="mb-4 font-serif text-lg font-semibold text-foreground flex items-center gap-2">
              <MessageSquare size={20} />
              ความต้องการพิเศษจากลูกค้า
            </h2>
            <p className="text-foreground whitespace-pre-wrap">{booking.special_requests}</p>
          </div>
        )}

        {/* Admin Notes */}
        <div className="rounded-lg border border-border bg-card p-6 lg:col-span-3">
          <h2 className="mb-4 font-serif text-lg font-semibold text-foreground">
            บันทึกของแอดมิน (ลูกค้าไม่เห็น)
          </h2>
          <textarea
            value={formData.admin_notes}
            onChange={(e) => setFormData(prev => ({ ...prev, admin_notes: e.target.value }))}
            rows={4}
            className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none"
            placeholder="บันทึกข้อมูลเพิ่มเติม..."
          />
        </div>
      </div>
    </div>
  )
}
