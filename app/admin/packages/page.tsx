"use client"

import { useEffect, useState } from "react"
import { Plus, Edit2, Trash2, Package, X, Check } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import type { Package as PackageType } from "@/lib/types/database"

export default function PackagesPage() {
  const supabase = createClient()
  const [packages, setPackages] = useState<PackageType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    features: '',
    is_active: true,
  })

  useEffect(() => {
    loadPackages()
  }, [])

  async function loadPackages() {
    const { data } = await supabase
      .from('packages')
      .select('*')
      .order('price', { ascending: true })
    
    if (data) {
      setPackages(data)
    }
    setIsLoading(false)
  }

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: 0,
      features: '',
      is_active: true,
    })
    setEditingId(null)
    setIsAdding(false)
  }

  const startEdit = (pkg: PackageType) => {
    setEditingId(pkg.id)
    setFormData({
      name: pkg.name,
      description: pkg.description || '',
      price: pkg.price,
      features: (pkg.features as string[]).join('\n'),
      is_active: pkg.is_active,
    })
  }

  const handleSave = async () => {
    const featuresArray = formData.features
      .split('\n')
      .map(f => f.trim())
      .filter(f => f.length > 0)

    if (editingId) {
      // Update
      const { error } = await supabase
        .from('packages')
        .update({
          name: formData.name,
          description: formData.description || null,
          price: formData.price,
          features: featuresArray,
          is_active: formData.is_active,
          updated_at: new Date().toISOString(),
        })
        .eq('id', editingId)

      if (!error) {
        loadPackages()
        resetForm()
      }
    } else {
      // Insert
      const { error } = await supabase
        .from('packages')
        .insert({
          name: formData.name,
          description: formData.description || null,
          price: formData.price,
          features: featuresArray,
          is_active: formData.is_active,
        })

      if (!error) {
        loadPackages()
        resetForm()
      }
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('ต้องการลบแพ็คเกจนี้หรือไม่?')) return
    
    await supabase
      .from('packages')
      .delete()
      .eq('id', id)
    
    setPackages(prev => prev.filter(p => p.id !== id))
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
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-foreground lg:text-3xl">
            แพ็คเกจ
          </h1>
          <p className="mt-1 text-muted-foreground">
            จัดการแพ็คเกจบริการ
          </p>
        </div>
        
        {!isAdding && !editingId && (
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            <Plus size={16} />
            เพิ่มแพ็คเกจ
          </button>
        )}
      </div>

      {/* Add/Edit Form */}
      {(isAdding || editingId) && (
        <div className="mb-8 rounded-lg border border-border bg-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-medium text-foreground">
              {editingId ? 'แก้ไขแพ็คเกจ' : 'เพิ่มแพ็คเกจใหม่'}
            </h2>
            <button onClick={resetForm} className="text-muted-foreground hover:text-foreground">
              <X size={20} />
            </button>
          </div>
          
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm text-muted-foreground">ชื่อแพ็คเกจ *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="เช่น Premium Package"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm text-muted-foreground">ราคา (บาท) *</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: Number(e.target.value) }))}
                className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm text-muted-foreground">คำอธิบาย</label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="คำอธิบายสั้นๆ"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm text-muted-foreground">
                รายการบริการ (บรรทัดละ 1 รายการ)
              </label>
              <textarea
                value={formData.features}
                onChange={(e) => setFormData(prev => ({ ...prev, features: e.target.value }))}
                rows={5}
                className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                placeholder="ช่อดอกไม้เจ้าสาว 1 ช่อ&#10;ดอกไม้ติดอกเจ้าบ่าว&#10;ดอกไม้ตกแต่งโต๊ะลงทะเบียน"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="is_active"
                checked={formData.is_active}
                onChange={(e) => setFormData(prev => ({ ...prev, is_active: e.target.checked }))}
                className="rounded border-input"
              />
              <label htmlFor="is_active" className="text-sm text-foreground">
                เปิดใช้งาน
              </label>
            </div>
          </div>
          
          <div className="mt-6 flex gap-3">
            <button
              onClick={handleSave}
              disabled={!formData.name || !formData.price}
              className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            >
              <Check size={16} />
              บันทึก
            </button>
            <button
              onClick={resetForm}
              className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted"
            >
              ยกเลิก
            </button>
          </div>
        </div>
      )}

      {/* List */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className={`rounded-lg border bg-card p-6 ${
              pkg.is_active ? 'border-border' : 'border-dashed border-muted-foreground/30 opacity-60'
            }`}
          >
            <div className="mb-4 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Package className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">{pkg.name}</h3>
                  {!pkg.is_active && (
                    <span className="text-xs text-muted-foreground">(ปิดใช้งาน)</span>
                  )}
                </div>
              </div>
              
              <div className="flex gap-1">
                <button
                  onClick={() => startEdit(pkg)}
                  className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => handleDelete(pkg.id)}
                  className="rounded-lg p-2 text-muted-foreground hover:bg-red-50 hover:text-red-500"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            
            <p className="mb-4 text-2xl font-bold text-primary">
              {pkg.price.toLocaleString()} <span className="text-sm font-normal">บาท</span>
            </p>
            
            {pkg.description && (
              <p className="mb-4 text-sm text-muted-foreground">{pkg.description}</p>
            )}
            
            {pkg.features && (pkg.features as string[]).length > 0 && (
              <ul className="space-y-1 text-sm">
                {(pkg.features as string[]).map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-muted-foreground">
                    <Check size={14} className="mt-0.5 text-green-500 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
