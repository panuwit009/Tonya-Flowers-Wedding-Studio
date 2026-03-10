"use client"

import { useEffect, useState } from "react"
import { Plus, Trash2, Calendar } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import type { BlockedDate } from "@/lib/types/database"

export default function BlockedDatesPage() {
  const supabase = createClient()
  const [blockedDates, setBlockedDates] = useState<BlockedDate[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAdding, setIsAdding] = useState(false)
  const [newDate, setNewDate] = useState('')
  const [newReason, setNewReason] = useState('')

  useEffect(() => {
    loadBlockedDates()
  }, [])

  async function loadBlockedDates() {
    const { data } = await supabase
      .from('blocked_dates')
      .select('*')
      .order('blocked_date', { ascending: true })
    
    if (data) {
      setBlockedDates(data)
    }
    setIsLoading(false)
  }

  const handleAdd = async () => {
    if (!newDate) return
    
    setIsAdding(true)
    
    const { data: { user } } = await supabase.auth.getUser()
    
    const { error } = await supabase
      .from('blocked_dates')
      .insert({
        blocked_date: newDate,
        reason: newReason || null,
        created_by: user?.id,
      })

    if (!error) {
      setNewDate('')
      setNewReason('')
      loadBlockedDates()
    }
    
    setIsAdding(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('ต้องการลบวันนี้ออกจากรายการบล็อกหรือไม่?')) return
    
    await supabase
      .from('blocked_dates')
      .delete()
      .eq('id', id)
    
    setBlockedDates(prev => prev.filter(d => d.id !== id))
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
          วันที่บล็อก
        </h1>
        <p className="mt-1 text-muted-foreground">
          จัดการวันที่ไม่รับงาน (วันหยุด, วันที่ไม่ว่าง)
        </p>
      </div>

      {/* Add New */}
      <div className="mb-8 rounded-lg border border-border bg-card p-6">
        <h2 className="mb-4 font-medium text-foreground">เพิ่มวันที่บล็อก</h2>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <div className="flex-1">
            <label className="mb-2 block text-sm text-muted-foreground">วันที่</label>
            <input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div className="flex-1">
            <label className="mb-2 block text-sm text-muted-foreground">เหตุผล (ไม่บังคับ)</label>
            <input
              type="text"
              value={newReason}
              onChange={(e) => setNewReason(e.target.value)}
              placeholder="เช่น วันหยุดประจำปี"
              className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <button
            onClick={handleAdd}
            disabled={!newDate || isAdding}
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
          >
            <Plus size={16} />
            {isAdding ? 'กำลังเพิ่ม...' : 'เพิ่ม'}
          </button>
        </div>
      </div>

      {/* List */}
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <div className="border-b border-border bg-muted/50 px-4 py-3">
          <h2 className="font-medium text-foreground">รายการวันที่บล็อก ({blockedDates.length})</h2>
        </div>
        
        {blockedDates.length === 0 ? (
          <div className="p-8 text-center">
            <Calendar className="mx-auto h-12 w-12 text-muted-foreground/50" />
            <p className="mt-4 text-muted-foreground">ยังไม่มีวันที่บล็อก</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {blockedDates.map((date) => {
              const dateObj = new Date(date.blocked_date)
              const isPast = dateObj < new Date(new Date().setHours(0, 0, 0, 0))
              
              return (
                <div
                  key={date.id}
                  className={`flex items-center justify-between px-4 py-3 ${isPast ? 'opacity-50' : ''}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {dateObj.toLocaleDateString('th-TH', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {date.reason || 'ไม่ระบุเหตุผล'}
                      </p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleDelete(date.id)}
                    className="rounded-lg p-2 text-muted-foreground hover:bg-red-50 hover:text-red-500"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
