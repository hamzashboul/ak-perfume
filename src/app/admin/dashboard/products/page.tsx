'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import type { Product } from '@/lib/supabase/types';

type ProductForm = {
  slug: string; name_ar: string; name_en: string; desc_ar: string; desc_en: string;
  price: string; type: string; type_label: string; inspired: string; badge: string;
  ml: string; top_notes: string; heart_notes: string; base_notes: string;
  image_url: string; in_stock: boolean; featured: boolean;
};

const emptyForm: ProductForm = {
  slug: '', name_ar: '', name_en: '', desc_ar: '', desc_en: '',
  price: '', type: 'oriental', type_label: '', inspired: '', badge: '',
  ml: '50', top_notes: '', heart_notes: '', base_notes: '',
  image_url: '', in_stock: true, featured: false,
};

export default function AdminProductsPage() {
  const router = useRouter();
  const supabase = createClient();

  const [loading, setLoading]   = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm]         = useState<ProductForm>(emptyForm);
  const [saving, setSaving]     = useState(false);
  const [search, setSearch]     = useState('');
  const [error, setError]       = useState('');

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/admin/login'); return; }
      const { data: adminCheck } = await supabase.from('admin_users').select('email').eq('email', user.email ?? '').single();
      if (!adminCheck) { router.push('/admin/login'); return; }
      await loadProducts();
      setLoading(false);
    };
    init();
  }, []);

  const loadProducts = async () => {
    const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    setProducts(data || []);
  };

  const openNewForm = () => { setForm(emptyForm); setEditingId(null); setShowForm(true); setError(''); };

  const openEditForm = (p: Product) => {
    setForm({
      slug: p.slug, name_ar: p.name_ar, name_en: p.name_en,
      desc_ar: p.desc_ar || '', desc_en: p.desc_en || '',
      price: String(p.price), type: p.type, type_label: p.type_label,
      inspired: p.inspired || '', badge: p.badge, ml: String(p.ml),
      top_notes: p.top_notes?.join(', ') || '',
      heart_notes: p.heart_notes?.join(', ') || '',
      base_notes: p.base_notes?.join(', ') || '',
      image_url: p.image_url || '', in_stock: p.in_stock, featured: p.featured,
    });
    setEditingId(p.id); setShowForm(true); setError('');
  };

  const handleSave = async () => {
    setError('');
    if (!form.slug || !form.name_ar || !form.name_en || !form.price) {
      setError('الحقول الأساسية مطلوبة: الرابط، الاسم عربي، الاسم إنجليزي، السعر');
      return;
    }
    setSaving(true);

    const payload = {
      slug: form.slug.trim(), name_ar: form.name_ar.trim(), name_en: form.name_en.trim(),
      desc_ar: form.desc_ar.trim() || null, desc_en: form.desc_en.trim() || null,
      price: parseFloat(form.price), type: form.type,
      type_label: form.type_label.trim() || form.type,
      inspired: form.inspired.trim() || null, badge: form.badge,
      ml: parseInt(form.ml) || 50,
      top_notes: form.top_notes.split(',').map(s => s.trim()).filter(Boolean),
      heart_notes: form.heart_notes.split(',').map(s => s.trim()).filter(Boolean),
      base_notes: form.base_notes.split(',').map(s => s.trim()).filter(Boolean),
      image_url: form.image_url.trim() || null,
      in_stock: form.in_stock, featured: form.featured,
    };

    const db = supabase as any; // eslint-disable-line @typescript-eslint/no-explicit-any
    if (editingId) {
      const { error: updErr } = await db.from('products').update(payload).eq('id', editingId);
      if (updErr) { setError('فشل التعديل: ' + updErr.message); setSaving(false); return; }
    } else {
      const { error: insErr } = await db.from('products').insert(payload);
      if (insErr) { setError('فشل الإضافة: ' + insErr.message); setSaving(false); return; }
    }

    await loadProducts(); setSaving(false); setShowForm(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا المنتج؟ لا يمكن التراجع.')) return;
    await supabase.from('products').delete().eq('id', id);
    await loadProducts();
  };

  const handleToggleStock = async (p: Product) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase as any).from('products').update({ in_stock: !p.in_stock }).eq('id', p.id);
    await loadProducts();
  };

  const filtered = products.filter(p =>
    p.name_ar.includes(search) || p.name_en.toLowerCase().includes(search.toLowerCase()) || p.slug.includes(search)
  );

  const labelStyle: React.CSSProperties = { fontFamily: "'DM Sans', sans-serif", fontSize: '0.625rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(248,246,242,0.45)', display: 'block', marginBottom: '6px' };
  const inputStyle: React.CSSProperties = { fontFamily: "'DM Sans', sans-serif", fontSize: '0.875rem', color: '#F8F6F2', background: '#0A0A0A', border: '0.5px solid rgba(201,169,110,0.15)', borderRadius: '2px', padding: '10px 12px', width: '100%', outline: 'none' };

  if (loading) return (
    <div style={{ minHeight: '100vh', background: '#0A0A0A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', color: 'rgba(248,246,242,0.4)' }}>...</p>
    </div>
  );

  return (
    <div dir="rtl" style={{ minHeight: '100vh', background: '#0A0A0A' }}>
      <div style={{ borderBottom: '0.5px solid rgba(201,169,110,0.12)', padding: '20px 0' }}>
        <div className="site-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <Link href="/admin/dashboard" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6875rem', color: '#C9A96E', textDecoration: 'none' }}>← لوحة التحكم</Link>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.25rem', fontWeight: 400, color: '#F8F6F2', marginTop: '6px' }}>إدارة المنتجات</div>
          </div>
          <button onClick={openNewForm} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', background: '#C9A96E', color: '#0A0A0A', border: 'none', borderRadius: '2px', padding: '11px 22px', cursor: 'pointer' }}>
            + إضافة منتج
          </button>
        </div>
      </div>

      <div className="site-container" style={{ paddingBlock: '2rem' }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="بحث بالاسم أو الرابط..."
          style={{ ...inputStyle, maxWidth: '320px', marginBottom: '20px' }}/>

        <div style={{ background: '#1C1C1C', border: '0.5px solid rgba(201,169,110,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '0.5px solid rgba(201,169,110,0.12)' }}>
                {['الاسم', 'النوع', 'السعر', 'الحالة', 'مميز', 'إجراءات'].map(h => (
                  <th key={h} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.625rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(248,246,242,0.4)', padding: '14px 16px', textAlign: 'right' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id} style={{ borderBottom: '0.5px solid rgba(201,169,110,0.06)' }}>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem', color: '#F8F6F2' }}>{p.name_ar}</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6875rem', color: 'rgba(248,246,242,0.35)' }}>{p.slug}</div>
                  </td>
                  <td style={{ padding: '14px 16px', fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', color: 'rgba(248,246,242,0.6)' }}>{p.type_label}</td>
                  <td style={{ padding: '14px 16px', fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem', color: '#C9A96E' }}>{p.price.toFixed(2)} JD</td>
                  <td style={{ padding: '14px 16px' }}>
                    <button onClick={() => handleToggleStock(p)} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.625rem', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', background: p.in_stock ? 'rgba(45,125,70,0.15)' : 'rgba(229,62,62,0.15)', color: p.in_stock ? '#48BB78' : '#FC8181', border: 'none', borderRadius: '2px', padding: '5px 12px', cursor: 'pointer' }}>
                      {p.in_stock ? 'متوفر' : 'مخفي'}
                    </button>
                  </td>
                  <td style={{ padding: '14px 16px', fontSize: '0.875rem' }}>{p.featured ? '⭐' : '—'}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={() => openEditForm(p)} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.625rem', background: 'transparent', color: '#C9A96E', border: '0.5px solid rgba(201,169,110,0.3)', borderRadius: '2px', padding: '6px 12px', cursor: 'pointer' }}>تعديل</button>
                      <button onClick={() => handleDelete(p.id)} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.625rem', background: 'transparent', color: '#FC8181', border: '0.5px solid rgba(229,62,62,0.3)', borderRadius: '2px', padding: '6px 12px', cursor: 'pointer' }}>حذف</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div style={{ padding: '40px', textAlign: 'center', fontFamily: "'DM Sans', sans-serif", fontSize: '0.875rem', color: 'rgba(248,246,242,0.3)' }}>لا توجد منتجات</div>
          )}
        </div>
      </div>

      {showForm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(10,10,10,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '20px' }} onClick={() => setShowForm(false)}>
          <div onClick={e => e.stopPropagation()} style={{ background: '#1C1C1C', border: '0.5px solid rgba(201,169,110,0.2)', borderRadius: '4px', padding: '28px', maxWidth: '600px', width: '100%', maxHeight: '85vh', overflowY: 'auto' }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', fontWeight: 400, color: '#F8F6F2', marginBottom: '20px' }}>
              {editingId ? 'تعديل المنتج' : 'إضافة منتج جديد'}
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div><label style={labelStyle}>الرابط (slug) *</label><input value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} placeholder="oud-al-muluk" style={inputStyle}/></div>
              <div><label style={labelStyle}>السعر (JD) *</label><input value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} type="number" step="0.01" style={inputStyle}/></div>
              <div><label style={labelStyle}>الاسم بالعربي *</label><input value={form.name_ar} onChange={e => setForm(f => ({ ...f, name_ar: e.target.value }))} style={inputStyle}/></div>
              <div><label style={labelStyle}>الاسم بالإنجليزي *</label><input value={form.name_en} onChange={e => setForm(f => ({ ...f, name_en: e.target.value }))} style={inputStyle}/></div>
              <div style={{ gridColumn: '1 / -1' }}><label style={labelStyle}>الوصف بالعربي</label><textarea value={form.desc_ar} onChange={e => setForm(f => ({ ...f, desc_ar: e.target.value }))} rows={2} style={{ ...inputStyle, resize: 'none' }}/></div>
              <div style={{ gridColumn: '1 / -1' }}><label style={labelStyle}>الوصف بالإنجليزي</label><textarea value={form.desc_en} onChange={e => setForm(f => ({ ...f, desc_en: e.target.value }))} rows={2} style={{ ...inputStyle, resize: 'none' }}/></div>
              <div>
                <label style={labelStyle}>التصنيف</label>
                <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))} style={{ ...inputStyle, cursor: 'pointer' }}>
                  <option value="oriental">شرقي</option><option value="floral">زهري</option><option value="woody">خشبي</option><option value="fresh">منعش</option>
                </select>
              </div>
              <div><label style={labelStyle}>وصف التصنيف</label><input value={form.type_label} onChange={e => setForm(f => ({ ...f, type_label: e.target.value }))} placeholder="Oriental · Woody" style={inputStyle}/></div>
              <div><label style={labelStyle}>الحجم (ml)</label><input value={form.ml} onChange={e => setForm(f => ({ ...f, ml: e.target.value }))} type="number" style={inputStyle}/></div>
              <div>
                <label style={labelStyle}>الشعار (badge)</label>
                <select value={form.badge} onChange={e => setForm(f => ({ ...f, badge: e.target.value }))} style={{ ...inputStyle, cursor: 'pointer' }}>
                  <option value="">بدون</option><option value="new">جديد</option><option value="bestseller">الأكثر مبيعاً</option><option value="premium">مميز</option>
                </select>
              </div>
              <div style={{ gridColumn: '1 / -1' }}><label style={labelStyle}>مستوحى من</label><input value={form.inspired} onChange={e => setForm(f => ({ ...f, inspired: e.target.value }))} placeholder="Inspired by Baccarat Rouge 540" style={inputStyle}/></div>
              <div style={{ gridColumn: '1 / -1' }}><label style={labelStyle}>رابط الصورة</label><input value={form.image_url} onChange={e => setForm(f => ({ ...f, image_url: e.target.value }))} placeholder="https://..." style={inputStyle}/></div>
              <div><label style={labelStyle}>نوتات القمة (مفصولة بفاصلة)</label><input value={form.top_notes} onChange={e => setForm(f => ({ ...f, top_notes: e.target.value }))} placeholder="زعفران, برغموت" style={inputStyle}/></div>
              <div><label style={labelStyle}>نوتات القلب</label><input value={form.heart_notes} onChange={e => setForm(f => ({ ...f, heart_notes: e.target.value }))} placeholder="عود, أرز" style={inputStyle}/></div>
              <div style={{ gridColumn: '1 / -1' }}><label style={labelStyle}>نوتات القاعدة</label><input value={form.base_notes} onChange={e => setForm(f => ({ ...f, base_notes: e.target.value }))} placeholder="مسك, أمبر" style={inputStyle}/></div>
            </div>

            <div style={{ display: 'flex', gap: '20px', marginTop: '16px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontSize: '0.8125rem', color: '#F8F6F2' }}>
                <input type="checkbox" checked={form.in_stock} onChange={e => setForm(f => ({ ...f, in_stock: e.target.checked }))}/> متوفر في المخزون
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontSize: '0.8125rem', color: '#F8F6F2' }}>
                <input type="checkbox" checked={form.featured} onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))}/> منتج مميز (يظهر بالرئيسية)
              </label>
            </div>

            {error && (
              <div style={{ background: 'rgba(229,62,62,0.1)', border: '0.5px solid rgba(229,62,62,0.3)', borderRadius: '2px', padding: '10px 14px', marginTop: '16px' }}>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', color: '#FC8181' }}>{error}</p>
              </div>
            )}

            <div style={{ display: 'flex', gap: '10px', marginTop: '24px' }}>
              <button onClick={handleSave} disabled={saving} style={{ flex: 1, fontFamily: "'DM Sans', sans-serif", fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', background: '#C9A96E', color: '#0A0A0A', border: 'none', borderRadius: '2px', padding: '13px', cursor: saving ? 'wait' : 'pointer' }}>
                {saving ? 'جاري الحفظ...' : editingId ? 'حفظ التعديلات' : 'إضافة المنتج'}
              </button>
              <button onClick={() => setShowForm(false)} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', background: 'transparent', color: 'rgba(248,246,242,0.5)', border: '0.5px solid rgba(248,246,242,0.15)', borderRadius: '2px', padding: '13px 24px', cursor: 'pointer' }}>
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}