export interface Product {
  id: string
  slug: string
  name_ar: string
  name_en: string
  desc_ar: string | null
  desc_en: string | null
  price: number
  type: string
  type_label: string
  inspired: string | null
  badge: string
  ml: number
  top_notes: string[]
  heart_notes: string[]
  base_notes: string[]
  image_url: string | null
  in_stock: boolean
  featured: boolean
  created_at: string
  updated_at: string
}

export interface Order {
  id: string
  order_number: number
  customer_name: string
  customer_phone: string
  city: string
  address: string
  notes: string | null
  items: OrderItem[]
  subtotal: number
  discount: number
  total: number
  promo_code: string | null
  payment_method: string
  status: 'new' | 'processing' | 'delivered' | 'cancelled'
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: string
  name: string
  nameEn: string
  price: number
  quantity: number
  type: string
  inspired: string
}

export interface PromoCode {
  id: string
  code: string
  discount_type: 'percent' | 'fixed'
  discount_value: number
  label_ar: string
  label_en: string
  active: boolean
  expires_at: string | null
  used_count: number
  created_at: string
}

export interface AdminUser {
  id: string
  email: string
  created_at: string
}