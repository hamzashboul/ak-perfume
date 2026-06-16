import { createClient } from './client'
import type { Product, Order, PromoCode } from './types'

const supabase = createClient()

// ─── Products ─────────────────────────────────────────────────────────────────

export async function getProducts(): Promise<Product[]> {
  

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('in_stock', true)
    .order('created_at', { ascending: false })

  if (error) { console.error('getProducts error:', error); return []; }
  return data || []
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('featured', true)
    .eq('in_stock', true)
    .limit(4)

  if (error) { console.error('getFeaturedProducts error:', error); return []; }
  return data || []
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) { console.error('getProductBySlug error:', error); return null; }
  return data
}

export async function getRelatedProducts(type: string, excludeId: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('type', type)
    .eq('in_stock', true)
    .neq('id', excludeId)
    .limit(3)

  if (error) { console.error('getRelatedProducts error:', error); return []; }
  return data || []
}

// ─── Orders ───────────────────────────────────────────────────────────────────

export async function createOrder(order: Omit<Order, 'id' | 'order_number' | 'created_at' | 'updated_at'>): Promise<Order | null> {
  const { data, error } = await supabase
    .from('orders')
    .insert(order)
    .select()
    .single()

  if (error) { console.error('createOrder error:', error); return null; }
  return data
}

// ─── Promo Codes ──────────────────────────────────────────────────────────────

export async function validatePromoCode(code: string): Promise<PromoCode | null> {
  const { data, error } = await supabase
    .from('promo_codes')
    .select('*')
    .eq('code', code.toUpperCase())
    .eq('active', true)
    .single()

  if (error) { return null; }

  if (data.expires_at && new Date(data.expires_at) < new Date()) {
    return null
  }

  return data
}

// ─── Admin ────────────────────────────────────────────────────────────────────

export async function isAdmin(email: string): Promise<boolean> {
  const { data } = await supabase
    .from('admin_users')
    .select('email')
    .eq('email', email)
    .single()

  return !!data
}