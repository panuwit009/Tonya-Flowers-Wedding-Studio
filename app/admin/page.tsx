"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { 
  Calendar, 
  DollarSign, 
  Users, 
  Clock,
  ChevronRight,
  AlertCircle
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import type { Booking } from "@/lib/types/database"

interface Stats {
  totalBookings: number
  pendingBookings: number
  confirmedBookings: number
  totalRevenue: number
}

export default function AdminDashboard() {
  const supabase = createClient()
  const [stats, setStats] = useState<Stats>({
    totalBookings: 0,
    pendingBookings: 0,
    confirmedBookings: 0,
    totalRevenue: 0,
  })
  const [recentBookings, setRecentBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      // Get all bookings for stats
      const { data: bookings } = await supabase
        .from('bookings')
        .select('*')
      
      if (bookings) {
        const pending = bookings.filter(b => b.status === 'pending')
        const confirmed = bookings.filter(b => b.status === 'confirmed')
        const revenue = bookings
          .filter(b => b.payment_status !== 'unpaid')
          .reduce((sum, b) => sum + (b.payment_amount || 0), 0)
        
        setStats({
          totalBookings: bookings.length,
          pendingBookings: pending.length,
          confirmedBookings: confirmed.length,
          totalRevenue: revenue,
        })
      }
      
      // Get recent bookings
      const { data: recent } = await supabase
        .from('bookings')
        .select('*, package:packages(*)')
        .order('created_at', { ascending: false })
        .limit(5)
      
      if (recent) {
        setRecentBookings(recent)
      }
      
      setIsLoading(false)
    }
    
    loadData()

    // Subscribe to new bookings
    const channel = supabase
      .channel('admin-bookings')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'bookings',
        },
        () => {
          loadData()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase])

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
          Dashboard
        </h1>
        <p className="mt-1 text-muted-foreground">
          ภาพรวมการจองและรายได้
        </p>
      </div>

      {/* Stats Grid */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">การจองทั้งหมด</p>
              <p className="text-2xl font-bold text-foreground">{stats.totalBookings}</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">รอยืนยัน</p>
              <p className="text-2xl font-bold text-foreground">{stats.pendingBookings}</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">ยืนยันแล้ว</p>
              <p className="text-2xl font-bold text-foreground">{stats.confirmedBookings}</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <DollarSign className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">รายได้รับแล้ว</p>
              <p className="text-2xl font-bold text-foreground">{stats.totalRevenue.toLocaleString()} ฿</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pending Alert */}
      {stats.pendingBookings > 0 && (
        <div className="mb-8 flex items-center gap-3 rounded-lg border border-yellow-200 bg-yellow-50 p-4">
          <AlertCircle className="h-5 w-5 text-yellow-600" />
          <p className="text-sm text-yellow-800">
            มี {stats.pendingBookings} รายการรอการยืนยัน
          </p>
          <Link
            href="/admin/bookings?status=pending"
            className="ml-auto text-sm font-medium text-yellow-800 hover:underline"
          >
            ดูรายการ
          </Link>
        </div>
      )}

      {/* Recent Bookings */}
      <div className="rounded-lg border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border p-6">
          <h2 className="font-serif text-lg font-semibold text-foreground">
            รายการจองล่าสุด
          </h2>
          <Link
            href="/admin/bookings"
            className="flex items-center gap-1 text-sm text-primary hover:underline"
          >
            ดูทั้งหมด
            <ChevronRight size={16} />
          </Link>
        </div>
        
        <div className="divide-y divide-border">
          {recentBookings.length === 0 ? (
            <p className="p-6 text-center text-muted-foreground">ยังไม่มีรายการจอง</p>
          ) : (
            recentBookings.map((booking) => (
              <Link
                key={booking.id}
                href={`/admin/bookings/${booking.id}`}
                className="flex items-center justify-between p-4 transition-colors hover:bg-muted/50"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <p className="font-medium text-foreground">{booking.customer_name}</p>
                    {getStatusBadge(booking.status)}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {new Date(booking.event_date).toLocaleDateString('th-TH', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                    {booking.package && ` • ${booking.package.name}`}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-foreground">
                    {booking.total_price?.toLocaleString() || '-'} ฿
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(booking.created_at).toLocaleDateString('th-TH')}
                  </p>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
