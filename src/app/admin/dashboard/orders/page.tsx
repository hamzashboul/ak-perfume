'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import type { Order } from '@/lib/supabase/types';

const statusLabels: Record<string, { label: string; color: string; bg: string }> = {
  new:        { label: 'جديد',       color: '#63B3ED', bg: 'rgba(99,179,237,0.12)' },
  processing: { label: 'قيد التوصيل', color: '#F6AD55', bg: 'rgba(246,173,85,0.12)' },
  delivered:  { label: 'تم التسليم', color: '#48BB78', bg: 'rgba(72,187,120,0.12)' },
  cancelled:  { label: 'ملغي',        color: '#FC8181', bg: 'rgba(252,129,129,0.12)' },
};

export default function AdminOrdersPage() {
  const router = useRouter();
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/admin/login'); return; }
      const { data: adminCheck } = await supabase.from('admin_users').select('email').eq('email', user.email ?? '').single();
      if (!adminCheck) { router.push('/admin/login'); return; }
      await loadOrders();
      setLoading(false);
    };
    init();
  }, []);

  const loadOrders = async () => {
    const { data } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
    setOrders(data || []);
  };

  const updateStatus = async (orderId: string, newStatus: string) => {
await supabase.from('orders').update({ status: newStatus } as any).eq('id', orderId);    await loadOrders();
    if (selectedOrder?.id === orderId) {
      setSelectedOrder(prev => prev ? { ...prev, status: newStatus as Order['status'] } : null);
    }
  };

  const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter);

  const filterTabs = [
    { id: 'all',        label: `الكل (${orders.length})` },
    { id: 'new',        label: `جديد (${orders.filter(o => o.status === 'new').length})` },
    { id: 'processing', label: `قيد التوصيل (${orders.filter(o => o.status === 'processing').length})` },
    { id: 'delivered',  label: `تم التسليم (${orders.filter(o => o.status === 'delivered').length})` },
    { id: 'cancelled',  label: `ملغي (${orders.filter(o => o.status === 'cancelled').length})` },
  ];

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#0A0A0A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', color: 'rgba(248,246,242,0.4)' }}>...</p>
      </div>
    );
  }

  return (
    <div dir="rtl" style={{ minHeight: '100vh', background: '#0A0A0A' }}>

      {/* Header */}
      <div style={{ borderBottom: '0.5px solid rgba(201,169,110,0.12)', padding: '20px 0' }}>
        <div className="site-container">
          <Link href="/admin/dashboard" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6875rem', color: '#C9A96E', textDecoration: 'none' }}>← لوحة التحكم</Link>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.25rem', fontWeight: 400, color: '#F8F6F2', marginTop: '6px' }}>إدارة الطلبات</div>
        </div>
      </div>

      <div className="site-container" style={{ paddingBlock: '2rem' }}>

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
          {filterTabs.map(tab => (
            <button key={tab.id} onClick={() => setFilter(tab.id)} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.06em', background: filter === tab.id ? '#C9A96E' : 'transparent', color: filter === tab.id ? '#0A0A0A' : 'rgba(248,246,242,0.5)', border: '0.5px solid', borderColor: filter === tab.id ? '#C9A96E' : 'rgba(201,169,110,0.2)', borderRadius: '2px', padding: '8px 16px', cursor: 'pointer' }}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Orders list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {filtered.map(order => {
            const st = statusLabels[order.status] || statusLabels.new;
            return (
              <div key={order.id} onClick={() => setSelectedOrder(order)} style={{ background: '#1C1C1C', border: '0.5px solid rgba(201,169,110,0.1)', borderRadius: '4px', padding: '18px 20px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.125rem', color: '#C9A96E' }}>#{order.order_number}</div>
                  <div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.875rem', fontWeight: 500, color: '#F8F6F2' }}>{order.customer_name}</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6875rem', color: 'rgba(248,246,242,0.4)' }}>{order.customer_phone} · {order.city}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.125rem', fontWeight: 500, color: '#C9A96E' }}>{Number(order.total).toFixed(2)} JD</span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.625rem', fontWeight: 500, letterSpacing: '0.08em', background: st.bg, color: st.color, padding: '5px 12px', borderRadius: '2px' }}>{st.label}</span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6875rem', color: 'rgba(248,246,242,0.3)' }}>{new Date(order.created_at).toLocaleDateString('ar')}</span>
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div style={{ padding: '40px', textAlign: 'center', fontFamily: "'DM Sans', sans-serif", fontSize: '0.875rem', color: 'rgba(248,246,242,0.3)', background: '#1C1C1C', borderRadius: '4px' }}>
              لا توجد طلبات
            </div>
          )}
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(10,10,10,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '20px' }} onClick={() => setSelectedOrder(null)}>
          <div onClick={e => e.stopPropagation()} style={{ background: '#1C1C1C', border: '0.5px solid rgba(201,169,110,0.2)', borderRadius: '4px', padding: '28px', maxWidth: '480px', width: '100%', maxHeight: '85vh', overflowY: 'auto' }}>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '20px' }}>
              <div>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', fontWeight: 400, color: '#F8F6F2' }}>طلب #{selectedOrder.order_number}</h2>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6875rem', color: 'rgba(248,246,242,0.35)', marginTop: '4px' }}>{new Date(selectedOrder.created_at).toLocaleString('ar')}</p>
              </div>
              <button onClick={() => setSelectedOrder(null)} style={{ background: 'transparent', border: 'none', color: 'rgba(248,246,242,0.5)', fontSize: '1.25rem', cursor: 'pointer' }}>✕</button>
            </div>

            {/* Customer info */}
            <div style={{ background: '#0A0A0A', borderRadius: '3px', padding: '14px 16px', marginBottom: '16px' }}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.875rem', fontWeight: 500, color: '#F8F6F2', marginBottom: '4px' }}>{selectedOrder.customer_name}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', color: 'rgba(248,246,242,0.5)' }}>{selectedOrder.customer_phone}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', color: 'rgba(248,246,242,0.5)' }}>{selectedOrder.city} — {selectedOrder.address}</div>
              {selectedOrder.notes && <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', color: 'rgba(248,246,242,0.4)', marginTop: '6px', fontStyle: 'italic' }}>"{selectedOrder.notes}"</div>}
            </div>

            {/* Items */}
            <div style={{ marginBottom: '16px' }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.625rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(248,246,242,0.4)', marginBottom: '8px' }}>المنتجات</p>
              {selectedOrder.items?.map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < selectedOrder.items.length - 1 ? '0.5px solid rgba(201,169,110,0.08)' : 'none' }}>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8125rem', color: '#F8F6F2' }}>{item.name} × {item.quantity}</span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8125rem', color: '#C9A96E' }}>{(item.price * item.quantity).toFixed(2)} JD</span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '20px', paddingTop: '12px', borderTop: '0.5px solid rgba(201,169,110,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', color: 'rgba(248,246,242,0.5)' }}>المجموع الفرعي</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', color: '#F8F6F2' }}>{Number(selectedOrder.subtotal).toFixed(2)} JD</span>
              </div>
              {Number(selectedOrder.discount) > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', color: '#48BB78' }}>الخصم {selectedOrder.promo_code ? `(${selectedOrder.promo_code})` : ''}</span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', color: '#48BB78' }}>- {Number(selectedOrder.discount).toFixed(2)} JD</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.125rem', color: '#F8F6F2' }}>الإجمالي</span>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.25rem', fontWeight: 500, color: '#C9A96E' }}>{Number(selectedOrder.total).toFixed(2)} JD</span>
              </div>
            </div>

            {/* Status update */}
            <div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.625rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(248,246,242,0.4)', marginBottom: '10px' }}>تحديث حالة الطلب</p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {Object.entries(statusLabels).map(([key, val]) => (
                  <button key={key} onClick={() => updateStatus(selectedOrder.id, key)} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6875rem', fontWeight: 500, background: selectedOrder.status === key ? val.color : 'transparent', color: selectedOrder.status === key ? '#0A0A0A' : val.color, border: `0.5px solid ${val.color}`, borderRadius: '2px', padding: '8px 14px', cursor: 'pointer' }}>
                    {val.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact buttons */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <a href={`https://wa.me/${selectedOrder.customer_phone.replace(/^0/, '962')}`} target="_blank" rel="noopener noreferrer" style={{ flex: 1, textAlign: 'center', fontFamily: "'DM Sans', sans-serif", fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', background: '#25D366', color: '#0A0A0A', borderRadius: '2px', padding: '12px', textDecoration: 'none' }}>
                واتساب العميل
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}