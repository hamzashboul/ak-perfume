'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import type { PromoCode } from '@/lib/supabase/types';

type PromoForm = {
  code: string;
  discount_type: 'percent' | 'fixed';
  discount_value: string;
  label_ar: string;
  label_en: string;
  active: boolean;
  expires_at: string;
};

const emptyForm: PromoForm = {
  code: '', discount_type: 'percent', discount_value: '',
  label_ar: '', label_en: '', active: true, expires_at: '',
};

function toDatetimeLocal(iso: string | null): string {
  if (!iso) return '';
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function AdminPromosPage() {
  const router = useRouter();
  const supabase = createClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as any;

  const [loading, setLoading]   = useState(true);
  const [promos, setPromos]     = useState<PromoCode[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm]         = useState<PromoForm>(emptyForm);
  const [saving, setSaving]     = useState(false);
  const [error, setError]       = useState('');

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/admin/login'); return; }
      const { data: adminCheck } = await supabase.from('admin_users').select('email').eq('email', user.email ?? '').single();
      if (!adminCheck) { router.push('/admin/login'); return; }
      await loadPromos();
      setLoading(false);
    };
    init();
  }, []);

  const loadPromos = async () => {
    const { data } = await db.from('promo_codes').select('*').order('created_at', { ascending: false });
    setPromos(data || []);
  };

  const openNewForm = () => { setForm(emptyForm); setEditingId(null); setShowForm(true); setError(''); };

  const openEditForm = (p: PromoCode) => {
    setForm({
      code: p.code, discount_type: p.discount_type, discount_value: String(p.discount_value),
      label_ar: p.label_ar, label_en: p.label_en, active: p.active,
      expires_at: toDatetimeLocal(p.expires_at),
    });
    setEditingId(p.id); setShowForm(true); setError('');
  };

  const handleSave = async () => {
    setError('');
    if (!form.code || !form.discount_value || !form.label_ar || !form.label_en) {
      setError('جميع الحقول مطلوبة باستثناء تاريخ الانتهاء');
      return;
    }
    setSaving(true);

    const payload = {
      code: form.code.trim().toUpperCase(),
      discount_type: form.discount_type,
      discount_value: parseFloat(form.discount_value),
      label_ar: form.label_ar.trim(),
      label_en: form.label_en.trim(),
      active: form.active,
      expires_at: form.expires_at ? new Date(form.expires_at).toISOString() : null,
    };

    if (editingId) {
      const { error: updErr } = await db.from('promo_codes').update(payload).eq('id', editingId);
      if (updErr) { setError('فشل التعديل: ' + updErr.message); setSaving(false); return; }
    } else {
      const { error: insErr } = await db.from('promo_codes').insert(payload);
      if (insErr) { setError('فشل الإضافة: ' + insErr.message); setSaving(false); return; }
    }

    await loadPromos(); setSaving(false); setShowForm(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا الكود؟')) return;
    await db.from('promo_codes').delete().eq('id', id);
    await loadPromos();
  };

  const handleToggleActive = async (p: PromoCode) => {
    await db.from('promo_codes').update({ active: !p.active }).eq('id', p.id);
    await loadPromos();
  };

  const labelStyle: React.CSSProperties = { fontFamily: "'DM Sans', sans-serif", fontSize: '0.625rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(248,246,242,0.45)', display: 'block', marginBottom: '6px' };
  const inputStyle: React.CSSProperties = { fontFamily: "'DM Sans', sans-serif", fontSize: '0.875rem', color: '#F8F6F2', background: '#0A0A0A', border: '0.5px solid rgba(201,169,110,0.15)', borderRadius: '2px', padding: '10px 12px', width: '100%', outline: 'none', colorScheme: 'dark' };

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
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.25rem', fontWeight: 400, color: '#F8F6F2', marginTop: '6px' }}>كودات الخصم</div>
          </div>
          <button onClick={openNewForm} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', background: '#C9A96E', color: '#0A0A0A', border: 'none', borderRadius: '2px', padding: '11px 22px', cursor: 'pointer' }}>
            + إضافة كود
          </button>
        </div>
      </div>

      <div className="site-container" style={{ paddingBlock: '2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {promos.map((p: PromoCode) => (
            <div key={p.id} style={{ background: '#1C1C1C', border: `0.5px solid ${p.active ? 'rgba(201,169,110,0.2)' : 'rgba(248,246,242,0.08)'}`, borderRadius: '4px', padding: '20px', opacity: p.active ? 1 : 0.5 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', fontWeight: 500, color: '#C9A96E', letterSpacing: '0.05em' }}>{p.code}</div>
                <button onClick={() => handleToggleActive(p)} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.5625rem', fontWeight: 500, background: p.active ? 'rgba(72,187,120,0.15)' : 'rgba(248,246,242,0.08)', color: p.active ? '#48BB78' : 'rgba(248,246,242,0.4)', border: 'none', borderRadius: '2px', padding: '4px 10px', cursor: 'pointer' }}>
                  {p.active ? 'مفعّل' : 'معطّل'}
                </button>
              </div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8125rem', color: 'rgba(248,246,242,0.6)', marginBottom: '4px' }}>{p.label_ar}</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', color: 'rgba(248,246,242,0.35)', marginBottom: '12px' }}>
                {p.discount_type === 'percent' ? `خصم ${p.discount_value}٪` : `خصم ${p.discount_value} JD`} · استُخدم {p.used_count} مرة
              </p>
              {p.expires_at && (
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6875rem', color: 'rgba(248,246,242,0.3)', marginBottom: '12px' }}>
                  ينتهي: {new Date(p.expires_at).toLocaleString('ar', { dateStyle: 'medium', timeStyle: 'short' })}
                </p>
              )}
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => openEditForm(p)} style={{ flex: 1, fontFamily: "'DM Sans', sans-serif", fontSize: '0.625rem', background: 'transparent', color: '#C9A96E', border: '0.5px solid rgba(201,169,110,0.3)', borderRadius: '2px', padding: '8px', cursor: 'pointer' }}>تعديل</button>
                <button onClick={() => handleDelete(p.id)} style={{ flex: 1, fontFamily: "'DM Sans', sans-serif", fontSize: '0.625rem', background: 'transparent', color: '#FC8181', border: '0.5px solid rgba(229,62,62,0.3)', borderRadius: '2px', padding: '8px', cursor: 'pointer' }}>حذف</button>
              </div>
            </div>
          ))}
        </div>
        {promos.length === 0 && (
          <div style={{ padding: '40px', textAlign: 'center', fontFamily: "'DM Sans', sans-serif", fontSize: '0.875rem', color: 'rgba(248,246,242,0.3)', background: '#1C1C1C', borderRadius: '4px' }}>
            لا توجد كودات خصم
          </div>
        )}
      </div>

      {showForm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(10,10,10,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '20px' }} onClick={() => setShowForm(false)}>
          <div onClick={e => e.stopPropagation()} style={{ background: '#1C1C1C', border: '0.5px solid rgba(201,169,110,0.2)', borderRadius: '4px', padding: '28px', maxWidth: '420px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', fontWeight: 400, color: '#F8F6F2', marginBottom: '20px' }}>
              {editingId ? 'تعديل الكود' : 'إضافة كود جديد'}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={labelStyle}>الكود *</label>
                <input value={form.code} onChange={e => setForm(f => ({ ...f, code: e.target.value.toUpperCase() }))} style={{ ...inputStyle, letterSpacing: '0.1em' }}/>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={labelStyle}>نوع الخصم</label>
                  <select value={form.discount_type} onChange={e => setForm(f => ({ ...f, discount_type: e.target.value as 'percent' | 'fixed' }))} style={{ ...inputStyle, cursor: 'pointer' }}>
                    <option value="percent">نسبة ٪</option>
                    <option value="fixed">قيمة ثابتة JD</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>القيمة *</label>
                  <input value={form.discount_value} onChange={e => setForm(f => ({ ...f, discount_value: e.target.value }))} type="number" step="0.01" style={inputStyle}/>
                </div>
              </div>
              <div>
                <label style={labelStyle}>الوصف بالعربي *</label>
                <input value={form.label_ar} onChange={e => setForm(f => ({ ...f, label_ar: e.target.value }))} style={inputStyle}/>
              </div>
              <div>
                <label style={labelStyle}>الوصف بالإنجليزي *</label>
                <input value={form.label_en} onChange={e => setForm(f => ({ ...f, label_en: e.target.value }))} style={inputStyle}/>
              </div>
              <div>
                <label style={labelStyle}>تاريخ ووقت الانتهاء (اختياري)</label>
                <input value={form.expires_at} onChange={e => setForm(f => ({ ...f, expires_at: e.target.value }))} type="datetime-local" style={inputStyle}/>
                {form.expires_at && (
                  <button type="button" onClick={() => setForm(f => ({ ...f, expires_at: '' }))} style={{ marginTop: '6px', fontFamily: "'DM Sans', sans-serif", fontSize: '0.625rem', background: 'transparent', color: 'rgba(248,246,242,0.4)', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
                    إزالة تاريخ الانتهاء
                  </button>
                )}
              </div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontSize: '0.8125rem', color: '#F8F6F2' }}>
                <input type="checkbox" checked={form.active} onChange={e => setForm(f => ({ ...f, active: e.target.checked }))}/>
                الكود مفعّل
              </label>
            </div>

            {error && (
              <div style={{ background: 'rgba(229,62,62,0.1)', border: '0.5px solid rgba(229,62,62,0.3)', borderRadius: '2px', padding: '10px 14px', marginTop: '16px' }}>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', color: '#FC8181' }}>{error}</p>
              </div>
            )}

            <div style={{ display: 'flex', gap: '10px', marginTop: '24px' }}>
              <button onClick={handleSave} disabled={saving} style={{ flex: 1, fontFamily: "'DM Sans', sans-serif", fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', background: '#C9A96E', color: '#0A0A0A', border: 'none', borderRadius: '2px', padding: '13px', cursor: saving ? 'wait' : 'pointer' }}>
                {saving ? 'جاري الحفظ...' : editingId ? 'حفظ التعديلات' : 'إضافة الكود'}
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