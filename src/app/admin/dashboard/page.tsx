'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ products: 0, orders: 0, newOrders: 0, revenue: 0 });
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) { router.push('/admin/login'); return; }

      const { data: adminCheck } = await supabase
        .from('admin_users')
        .select('email')
        .eq('email', user.email ?? '')
        .single();

      if (!adminCheck) {
        await supabase.auth.signOut();
        router.push('/admin/login');
        return;
      }

      setUserEmail(user.email || '');

      const { count: productsCount } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: ordersData } = await (supabase as any)
        .from('orders')
        .select('status, total');

      const newOrders = ordersData?.filter((o: { status: string }) => o.status === 'new').length || 0;
      const revenue   = ordersData?.reduce((sum: number, o: { total: string }) => sum + Number(o.total), 0) || 0;

      setStats({
        products: productsCount || 0,
        orders:   ordersData?.length || 0,
        newOrders,
        revenue,
      });

      setLoading(false);
    };

    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#0A0A0A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', color: 'rgba(248,246,242,0.4)' }}>...</p>
      </div>
    );
  }

  const statCards = [
    { label: 'إجمالي المنتجات', value: stats.products,                      icon: '◈' },
    { label: 'إجمالي الطلبات',  value: stats.orders,                        icon: '✦' },
    { label: 'طلبات جديدة',     value: stats.newOrders,                     icon: '●', highlight: stats.newOrders > 0 },
    { label: 'إجمالي المبيعات', value: `${stats.revenue.toFixed(2)} JD`,    icon: '◇' },
  ];

  const menuItems = [
    { href: '/admin/dashboard/products', label: 'إدارة المنتجات', desc: 'إضافة، تعديل، حذف المنتجات', icon: '🧴' },
    { href: '/admin/dashboard/orders',   label: 'إدارة الطلبات',  desc: 'متابعة وتحديث حالة الطلبات', icon: '📦' },
    { href: '/admin/dashboard/promos',   label: 'كودات الخصم',    desc: 'إضافة وتعديل كودات الخصم',   icon: '🎫' },
  ];

  return (
    <div dir="rtl" style={{ minHeight: '100vh', background: '#0A0A0A' }}>

      <div style={{ borderBottom: '0.5px solid rgba(201,169,110,0.12)', padding: '20px 0' }}>
        <div className="site-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.25rem', fontWeight: 400, color: '#F8F6F2' }}>لوحة التحكم</div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6875rem', color: 'rgba(248,246,242,0.35)', marginTop: '2px' }}>{userEmail}</p>
          </div>
          <button onClick={handleLogout} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.625rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', background: 'transparent', color: 'rgba(248,246,242,0.5)', border: '0.5px solid rgba(248,246,242,0.15)', borderRadius: '2px', padding: '8px 16px', cursor: 'pointer' }}>
            تسجيل الخروج
          </button>
        </div>
      </div>

      <div className="site-container" style={{ paddingBlock: '2.5rem' }}>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '2.5rem' }}>
          {statCards.map((s, i) => (
            <div key={i} style={{ background: '#1C1C1C', border: `0.5px solid ${s.highlight ? 'rgba(201,169,110,0.4)' : 'rgba(201,169,110,0.1)'}`, borderRadius: '4px', padding: '20px' }}>
              <div style={{ fontSize: '1rem', color: '#C9A96E', marginBottom: '10px', opacity: 0.7 }}>{s.icon}</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.75rem', fontWeight: 400, color: '#F8F6F2', marginBottom: '4px' }}>{s.value}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6875rem', color: 'rgba(248,246,242,0.4)' }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {menuItems.map((item, i) => (
            <Link key={i} href={item.href} style={{ textDecoration: 'none' }}>
              <div style={{ background: '#1C1C1C', border: '0.5px solid rgba(201,169,110,0.1)', borderRadius: '4px', padding: '24px', transition: 'all 250ms', cursor: 'pointer' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,169,110,0.4)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,169,110,0.1)'; (e.currentTarget as HTMLElement).style.transform = 'none'; }}
              >
                <div style={{ fontSize: '1.5rem', marginBottom: '12px' }}>{item.icon}</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.25rem', fontWeight: 400, color: '#F8F6F2', marginBottom: '6px' }}>{item.label}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', color: 'rgba(248,246,242,0.4)' }}>{item.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}