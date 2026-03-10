"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Search, Filter, ChevronDown } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import type { Booking } from "@/lib/types/database"

const statusOptions = [
  { value: '', label: 'ทั้งหมด' },
  { value: 'pending', label: 'รอยืนยัน' },
  { value: 'confirmed', label: 'ยืนยันแล้ว' },
  { value: 'completed', label: 'เสร็จสิ้น' },
  { value: 'cancelled', label: 'ยกเลิก' },
]

export default function AdminBookingsPage() {
  const searchParams = useSearchParams()
  const supabase = createClient()
  
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState(searchParams.get('status') || '')

  useEffect(() => {
    async function loadBookings() {
      let query = supabase
        .from('bookings')
        .select('*, package:packages(*)')
        .order('event_date', { ascending: true })
      
      if (statusFilter) {
        query = query.eq('status', statusFilter)
      }
      
      const { data } = await query
      
      if (data) {
        setBookings(data)
      }
      setIsLoading(false)
    }
    
    loadBookings()
  }, [supabase, statusFilter])

  const filteredBookings = bookings.filter(booking => 
    booking.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.customer_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.customer_phone.includes(searchTerm)
  )

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
      <div className="flex h-[calc(100vh-64px)] items-center justify-center lg:h-screen">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-4 text-muted-foreground">กำลังโหลด...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="font-serif text-2xl font-bold text-foreground lg:text-3xl">
          รายการจอง
        </h1>
        <p className="mt-1 text-muted-foreground">
          จัดการรายการจองทั้งหมด
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="ค้นหาชื่อ, อีเมล, เบอร์โทร..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-input bg-background py-2 pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="appearance-none rounded-lg border border-input bg-background py-2 pl-10 pr-10 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
        </div>
      </div>

      {/* Bookings Table */}
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">ลูกค้า</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">วันที่จัดงาน</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">แพ็คเกจ</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">สถานะ</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">การชำระเงิน</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">ราคา</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                    ไม่พบรายการจอง
                  </td>
                </tr>
              ) : (
                filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-muted/50">
                    <td className="px-4 py-4">
                      <Link href={`/admin/bookings/${booking.id}`} className="block">
                        <p className="font-medium text-foreground hover:text-primary">
                          {booking.customer_name}
                        </p>
                        <p className="text-xs text-muted-foreground">{booking.customer_phone}</p>
                      </Link>
                    </td>
                    <td className="px-4 py-4 text-sm text-foreground">
                      {new Date(booking.event_date).toLocaleDateString('th-TH', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>
                    <td className="px-4 py-4 text-sm text-foreground">
                      {booking.package?.name || '-'}
                    </td>
                    <td className="px-4 py-4">
                      {getStatusBadge(booking.status)}
                    </td>
                    <td className="px-4 py-4">
                      {getPaymentBadge(booking.payment_status)}
                    </td>
                    <td className="px-4 py-4 text-right text-sm font-medium text-foreground">
                      {booking.total_price?.toLocaleString() || '-'} ฿
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
