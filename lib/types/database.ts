export interface Profile {
  id: string
  email: string | null
  full_name: string | null
  phone: string | null
  role: 'user' | 'admin'
  avatar_url: string | null
  created_at: string
  updated_at: string
}

export interface Package {
  id: string
  name: string
  description: string | null
  price: number
  features: string[]
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface BlockedDate {
  id: string
  blocked_date: string
  reason: string | null
  created_by: string | null
  created_at: string
}

export interface Booking {
  id: string
  user_id: string | null
  package_id: string | null
  customer_name: string
  customer_email: string
  customer_phone: string
  event_date: string
  event_location: string | null
  event_type: string | null
  special_requests: string | null
  package_price: number | null
  additional_cost: number
  total_price: number | null
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  payment_status: 'unpaid' | 'deposit_paid' | 'fully_paid'
  payment_amount: number
  payment_date: string | null
  payment_note: string | null
  admin_notes: string | null
  confirmed_by: string | null
  confirmed_at: string | null
  created_at: string
  updated_at: string
  // Joined data
  package?: Package
}

export interface Notification {
  id: string
  user_id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'booking' | 'payment'
  booking_id: string | null
  is_read: boolean
  read_at: string | null
  created_at: string
}
