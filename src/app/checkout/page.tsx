'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { useLang } from '@/lib/i18n/LangContext';
import { t } from '@/lib/i18n/translations';
import { createOrder, validatePromoCode } from '@/lib/supabase/queries';
import type { PromoCode } from '@/lib/supabase/types';

type PaymentMethod = 'card' | 'cod' | 'whatsapp' | 'instagram';

interface FormData {
  name: string;
  phone: string;
  city: string;
  address: string;
  notes: string;
}

const citiesAr = ['عمّان', 'إربد', 'الزرقاء', 'العقبة', 'السلط', 'مادبا', 'الكرك', 'جرش', 'عجلون', 'المفرق', 'الطفيلة', 'معان'];
const citiesEn = ['Amman', 'Irbid', 'Zarqa', 'Aqaba', 'Salt', 'Madaba', 'Karak', 'Jerash', 'Ajloun', 'Mafraq', 'Tafilah', 'Maan'];

// رسوم التوصيل حسب المحافظة
function getShippingFee(city: string): number {
  const ammanCities = ['عمّان', 'Amman'];
  return ammanCities.includes(city) ? 2 : city ? 3 : 0;
}

export default function CheckoutPage() {
  const { lang, isRTL } = useLang();
  const { items, totalPrice, totalItems, clearCart } = useCartStore();
  const [mounted, setMounted]       = useState(false);
  const [payment, setPayment]       = useState<PaymentMethod>('cod');
  const [submitted, setSubmitted]   = useState(false);
  const [loading, setLoading]       = useState(false);
  const [form, setForm]             = useState<FormData>({ name: '', phone: '', city: '', address: '', notes: '' });
  const [errors, setErrors]         = useState<Partial<FormData>>({});
  const [promoInput, setPromoInput] = useState('');
  const [promoApplied, setPromoApplied] = useState<PromoCode | null>(null);
  const [promoError, setPromoError]   = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');
  const [promoLoading, setPromoLoading] = useState(false);

  useEffect(() => setMounted(true), []);

  const cartItems  = mounted ? items : [];
  const subtotal   = mounted ? totalPrice() : 0;
  const count      = mounted ? totalItems() : 0;
  const shipping   = getShippingFee(form.city);
  const discount   = promoApplied ? (promoApplied.discount_type === 'percent' ? (subtotal * promoApplied.discount_value) / 100 : promoApplied.discount_value) : 0;
  const total      = Math.max(0, subtotal + shipping - discount);

  const cities = lang === 'ar' ? citiesAr : citiesEn;

  const applyPromo = async () => {
    const code = promoInput.trim().toUpperCase();
    if (!code) { setPromoError(lang === 'ar' ? 'أدخل الكود أولاً' : 'Enter a code first'); return; }
    setPromoLoading(true);
    const result = await validatePromoCode(code);
    setPromoLoading(false);
    if (result) {
      setPromoApplied(result);
      const label = lang === 'ar' ? result.label_ar : result.label_en;
      setPromoSuccess(`✓ ${label}`);
      setPromoError('');
    } else {
      setPromoError(t.checkout.promoErr[lang]);
      setPromoSuccess('');
      setPromoApplied(null);
    }
  };

  const removePromo = () => { setPromoApplied(null); setPromoInput(''); setPromoSuccess(''); setPromoError(''); };

  const validate = () => {
    const e: Partial<FormData> = {};
    if (!form.name.trim())    e.name    = t.checkout.nameErr[lang];
    if (!form.phone.trim())   e.phone   = t.checkout.phoneErr[lang];
    if (!form.city)           e.city    = t.checkout.cityErr[lang];
    if (!form.address.trim()) e.address = t.checkout.addressErr[lang];
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);

    const orderItems = cartItems.map(i => ({
      id: String(i.id), name: i.name, nameEn: i.nameEn, price: i.price,
      quantity: i.quantity, type: i.type, inspired: i.inspired,
    }));

    await createOrder({
      customer_name: form.name,
      customer_phone: form.phone,
      city: form.city,
      address: form.address,
      notes: form.notes || null,
      items: orderItems,
      subtotal,
      discount,
      total,
      promo_code: promoApplied ? promoInput.toUpperCase() : null,
      payment_method: payment,
      status: 'new',
    });

    if (payment === 'whatsapp') {
      const promoLine = promoApplied ? `\n${lang === 'ar' ? 'كود الخصم' : 'Promo Code'}: ${promoInput.toUpperCase()}` : '';
      const shippingLine = lang === 'ar' ? `\nرسوم التوصيل: ${shipping.toFixed(2)} JD` : `\nShipping: ${shipping.toFixed(2)} JD`;
      const msg = lang === 'ar'
        ? `طلب جديد من AK Perfumes\n\nالاسم: ${form.name}\nالهاتف: ${form.phone}\nالمدينة: ${form.city}\nالعنوان: ${form.address}\n\nالطلب:\n${cartItems.map(i => `- ${i.name} x${i.quantity} = ${(i.price * i.quantity).toFixed(2)} JD`).join('\n')}${promoLine}${shippingLine}\n\nالإجمالي: ${total.toFixed(2)} JD${form.notes ? `\nملاحظات: ${form.notes}` : ''}`
        : `New order from AK Perfumes\n\nName: ${form.name}\nPhone: ${form.phone}\nCity: ${form.city}\nAddress: ${form.address}\n\nOrder:\n${cartItems.map(i => `- ${i.nameEn} x${i.quantity} = ${(i.price * i.quantity).toFixed(2)} JD`).join('\n')}${promoLine}${shippingLine}\n\nTotal: ${total.toFixed(2)} JD${form.notes ? `\nNotes: ${form.notes}` : ''}`;
      window.open(`https://wa.me/962000000000?text=${encodeURIComponent(msg)}`, '_blank');
    } else if (payment === 'instagram') {
      window.open('https://instagram.com/akperfume', '_blank');
    }

    setLoading(false);
    setSubmitted(true);
    clearCart();
  };

  const labelStyle: React.CSSProperties = { fontFamily: "'DM Sans', sans-serif", fontSize: '0.625rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: 'rgba(10,10,10,0.45)', display: 'block', marginBottom: '6px' };
  const inputBase: React.CSSProperties = { fontFamily: "'DM Sans', sans-serif", fontSize: '0.9375rem', color: '#0A0A0A', background: '#FFFFFF', borderRadius: '2px', padding: '11px 14px', width: '100%', outline: 'none' };

  if (submitted) return (
    <div dir={isRTL ? 'rtl' : 'ltr'} style={{ minHeight: '100vh', background: '#F8F6F2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(201,169,110,0.1)', border: '1px solid rgba(201,169,110,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '1.5rem' }}>✦</div>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 300, color: '#0A0A0A', marginBottom: '12px' }}>{t.checkout.successTitle[lang]}</h1>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.9375rem', fontWeight: 300, color: 'rgba(10,10,10,0.5)', marginBottom: '32px', lineHeight: 1.8 }}>{t.checkout.successBody[lang]}</p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/products" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', background: '#0A0A0A', color: '#F8F6F2', padding: '13px 28px', borderRadius: '1px', textDecoration: 'none' }}>{t.checkout.shopMore[lang]}</Link>
          <Link href="/" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', background: 'transparent', color: '#0A0A0A', padding: '12px 28px', borderRadius: '1px', border: '0.5px solid rgba(10,10,10,0.2)', textDecoration: 'none' }}>{t.checkout.backHome[lang]}</Link>
        </div>
      </div>
    </div>
  );

  if (mounted && count === 0) return (
    <div dir={isRTL ? 'rtl' : 'ltr'} style={{ minHeight: '100vh', background: '#F8F6F2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.75rem', fontWeight: 300, color: 'rgba(10,10,10,0.4)', marginBottom: '20px' }}>{t.checkout.emptyCart[lang]}</p>
        <Link href="/products" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', background: '#0A0A0A', color: '#F8F6F2', padding: '13px 28px', borderRadius: '1px', textDecoration: 'none' }}>{t.checkout.browseColl[lang]}</Link>
      </div>
    </div>
  );

  const paymentMethods = [
    { id: 'cod',       icon: '💵', title: t.checkout.codTitle[lang], desc: t.checkout.codDesc[lang]  },
    { id: 'card',      icon: '💳', title: t.checkout.cardTitle[lang],desc: t.checkout.cardDesc[lang] },
    { id: 'whatsapp',  icon: '💬', title: t.checkout.waTitle[lang],  desc: t.checkout.waDesc[lang]   },
    { id: 'instagram', icon: '📷', title: t.checkout.igTitle[lang],  desc: t.checkout.igDesc[lang]   },
  ] as { id: PaymentMethod; icon: string; title: string; desc: string }[];

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} style={{ background: '#F8F6F2', minHeight: '100vh' }}>

      <div style={{ background: '#0A0A0A', paddingBlock: 'clamp(2rem,4vw,3.5rem)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 80% at 50% 100%, rgba(201,169,110,0.07) 0%, transparent 70%)', pointerEvents: 'none' }}/>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.625rem', fontWeight: 500, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#8A6F3E', marginBottom: '8px' }}>{t.checkout.eyebrow[lang]}</p>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 300, letterSpacing: '-0.03em', color: '#F8F6F2' }}>{t.checkout.title[lang]}</h1>
      </div>

      <div className="site-container" style={{ paddingBlock: 'clamp(2rem,5vw,4rem)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '2rem', alignItems: 'start' }}>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

            <div style={{ background: '#FFFFFF', border: '0.5px solid rgba(10,10,10,0.07)', borderRadius: '4px', padding: '24px' }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.375rem', fontWeight: 400, color: '#0A0A0A', marginBottom: '20px' }}>{t.checkout.delivery[lang]}</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>

                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={labelStyle}>{t.checkout.name[lang]} *</label>
                  <input value={form.name} onChange={e => { setForm(f => ({ ...f, name: e.target.value })); setErrors(er => ({ ...er, name: '' })); }} placeholder={t.checkout.namePh[lang]}
                    style={{ ...inputBase, border: `0.5px solid ${errors.name ? '#E53E3E' : 'rgba(10,10,10,0.12)'}` }}
                    onFocus={e => (e.target.style.borderColor = '#C9A96E')} onBlur={e => (e.target.style.borderColor = errors.name ? '#E53E3E' : 'rgba(10,10,10,0.12)')}/>
                  {errors.name && <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.625rem', color: '#E53E3E', marginTop: '4px' }}>{errors.name}</p>}
                </div>

                <div>
                  <label style={labelStyle}>{t.checkout.phone[lang]} *</label>
                  <input value={form.phone} onChange={e => { setForm(f => ({ ...f, phone: e.target.value })); setErrors(er => ({ ...er, phone: '' })); }} placeholder="07xxxxxxxx" type="tel"
                    style={{ ...inputBase, border: `0.5px solid ${errors.phone ? '#E53E3E' : 'rgba(10,10,10,0.12)'}` }}
                    onFocus={e => (e.target.style.borderColor = '#C9A96E')} onBlur={e => (e.target.style.borderColor = errors.phone ? '#E53E3E' : 'rgba(10,10,10,0.12)')}/>
                  {errors.phone && <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.625rem', color: '#E53E3E', marginTop: '4px' }}>{errors.phone}</p>}
                </div>

                <div>
                  <label style={labelStyle}>{t.checkout.city[lang]} *</label>
                  <select value={form.city} onChange={e => { setForm(f => ({ ...f, city: e.target.value })); setErrors(er => ({ ...er, city: '' })); }}
                    style={{ ...inputBase, border: `0.5px solid ${errors.city ? '#E53E3E' : 'rgba(10,10,10,0.12)'}`, cursor: 'pointer' }}
                    onFocus={e => (e.target.style.borderColor = '#C9A96E')} onBlur={e => (e.target.style.borderColor = errors.city ? '#E53E3E' : 'rgba(10,10,10,0.12)')}>
                    <option value="">{t.checkout.cityPh[lang]}</option>
                    {cities.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  {errors.city && <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.625rem', color: '#E53E3E', marginTop: '4px' }}>{errors.city}</p>}
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={labelStyle}>{t.checkout.address[lang]} *</label>
                  <input value={form.address} onChange={e => { setForm(f => ({ ...f, address: e.target.value })); setErrors(er => ({ ...er, address: '' })); }} placeholder={t.checkout.addressPh[lang]}
                    style={{ ...inputBase, border: `0.5px solid ${errors.address ? '#E53E3E' : 'rgba(10,10,10,0.12)'}` }}
                    onFocus={e => (e.target.style.borderColor = '#C9A96E')} onBlur={e => (e.target.style.borderColor = errors.address ? '#E53E3E' : 'rgba(10,10,10,0.12)')}/>
                  {errors.address && <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.625rem', color: '#E53E3E', marginTop: '4px' }}>{errors.address}</p>}
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={labelStyle}>{t.checkout.notes[lang]}</label>
                  <textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} placeholder={t.checkout.notesPh[lang]} rows={3}
                    style={{ ...inputBase, border: '0.5px solid rgba(10,10,10,0.12)', resize: 'none' }}
                    onFocus={e => (e.target.style.borderColor = '#C9A96E')} onBlur={e => (e.target.style.borderColor = 'rgba(10,10,10,0.12)')}/>
                </div>
              </div>
            </div>

            <div style={{ background: '#FFFFFF', border: '0.5px solid rgba(10,10,10,0.07)', borderRadius: '4px', padding: '24px' }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.375rem', fontWeight: 400, color: '#0A0A0A', marginBottom: '20px' }}>{t.checkout.payment[lang]}</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {paymentMethods.map(m => (
                  <button key={m.id} onClick={() => m.id !== 'card' && setPayment(m.id)} disabled={m.id === 'card'}
                    style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 16px', borderRadius: '3px', cursor: m.id === 'card' ? 'not-allowed' : 'pointer', background: payment === m.id ? 'rgba(201,169,110,0.06)' : '#F8F6F2', border: `${payment === m.id ? '1px' : '0.5px'} solid ${payment === m.id ? 'rgba(201,169,110,0.4)' : 'rgba(10,10,10,0.08)'}`, opacity: m.id === 'card' ? 0.5 : 1, transition: 'all 200ms', textAlign: isRTL ? 'right' as const : 'left' as const, width: '100%' }}>
                    <span style={{ fontSize: '1.25rem', flexShrink: 0 }}>{m.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.875rem', fontWeight: 500, color: '#0A0A0A' }}>{m.title}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', fontWeight: 300, color: 'rgba(10,10,10,0.4)', marginTop: '2px' }}>{m.desc}</div>
                    </div>
                    <div style={{ width: '18px', height: '18px', borderRadius: '50%', flexShrink: 0, border: `${payment === m.id ? '5px' : '1.5px'} solid ${payment === m.id ? '#C9A96E' : 'rgba(10,10,10,0.2)'}`, transition: 'all 200ms' }}/>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div style={{ position: 'sticky', top: 'calc(var(--nav-h) + 2rem)' }}>
            <div style={{ background: '#FFFFFF', border: '0.5px solid rgba(10,10,10,0.07)', borderRadius: '4px', padding: '24px' }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.375rem', fontWeight: 400, color: '#0A0A0A', marginBottom: '20px' }}>{t.checkout.summary[lang]}</h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
                {cartItems.map(item => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '36px', height: '44px', background: '#F0EDE8', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <svg width="14" height="28" viewBox="0 0 14 28" fill="none">
                          <rect x="3" y="7" width="8" height="18" rx="4" fill="#C9A96E" opacity="0.4"/>
                          <rect x="4" y="2" width="6" height="6" rx="2" fill="#1C1C1C"/>
                          <ellipse cx="7" cy="2" rx="4" ry="4" fill="#0A0A0A"/>
                        </svg>
                      </div>
                      <div>
                        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.9375rem', fontWeight: 400, color: '#0A0A0A' }}>
                          {lang === 'ar' ? item.name : item.nameEn}
                        </div>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.5625rem', color: 'rgba(10,10,10,0.35)' }}>× {item.quantity}</div>
                      </div>
                    </div>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.9375rem', fontWeight: 500, color: '#8A6F3E', flexShrink: 0 }}>{(item.price * item.quantity).toFixed(2)} JD</span>
                  </div>
                ))}
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={labelStyle}>{t.checkout.promoLabel[lang]}</label>
                {promoApplied ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(201,169,110,0.06)', border: '1px solid rgba(201,169,110,0.3)', borderRadius: '2px', padding: '10px 14px' }}>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', fontWeight: 500, color: '#8A6F3E' }}>✓ {promoSuccess}</span>
                    <button onClick={removePromo} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'rgba(10,10,10,0.35)', fontSize: '0.75rem', padding: '0 4px' }}>✕</button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input value={promoInput} onChange={e => { setPromoInput(e.target.value.toUpperCase()); setPromoError(''); }} onKeyDown={e => e.key === 'Enter' && applyPromo()}
                      style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.875rem', color: '#0A0A0A', background: '#F8F6F2', border: `0.5px solid ${promoError ? '#E53E3E' : 'rgba(10,10,10,0.12)'}`, borderRadius: '2px', padding: '9px 12px', flex: 1, outline: 'none', letterSpacing: '0.08em', textTransform: 'uppercase' }}
                      onFocus={e => (e.target.style.borderColor = '#C9A96E')} onBlur={e => (e.target.style.borderColor = promoError ? '#E53E3E' : 'rgba(10,10,10,0.12)')}/>
                    <button onClick={applyPromo} disabled={promoLoading} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.5625rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', background: '#0A0A0A', color: '#F8F6F2', border: 'none', borderRadius: '2px', padding: '9px 16px', cursor: promoLoading ? 'wait' : 'pointer', whiteSpace: 'nowrap' }}>
                      {promoLoading ? '...' : t.checkout.promoApply[lang]}
                    </button>
                  </div>
                )}
                {promoError && <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.625rem', color: '#E53E3E', marginTop: '4px' }}>{promoError}</p>}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <div style={{ flex: 1, height: '0.5px', background: 'rgba(10,10,10,0.06)' }}/>
                <div style={{ width: '4px', height: '4px', background: '#C9A96E', transform: 'rotate(45deg)' }}/>
                <div style={{ flex: 1, height: '0.5px', background: 'rgba(10,10,10,0.06)' }}/>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8125rem', color: 'rgba(10,10,10,0.45)' }}>{t.checkout.subtotal[lang]}</span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8125rem', color: '#0A0A0A' }}>{subtotal.toFixed(2)} JD</span>
                </div>
                {promoApplied && (
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8125rem', color: '#2D7D46' }}>{t.checkout.discount[lang]}</span>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8125rem', color: '#2D7D46', fontWeight: 500 }}>- {discount.toFixed(2)} JD</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8125rem', color: 'rgba(10,10,10,0.45)' }}>
                    {t.checkout.shipping[lang]}
                    {form.city && (
                      <span style={{ fontSize: '0.5625rem', color: 'rgba(10,10,10,0.35)', marginRight: '4px', marginLeft: '4px' }}>
                        ({form.city})
                      </span>
                    )}
                  </span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8125rem', color: shipping === 0 ? 'rgba(10,10,10,0.35)' : '#0A0A0A', fontWeight: 500 }}>
                    {shipping === 0 ? (lang === 'ar' ? 'اختر المدينة' : 'Select city') : `${shipping.toFixed(2)} JD`}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '10px', borderTop: '0.5px solid rgba(10,10,10,0.06)' }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.125rem', fontWeight: 400, color: '#0A0A0A' }}>{t.checkout.grandTotal[lang]}</span>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.375rem', fontWeight: 500, color: '#8A6F3E' }}>{total.toFixed(2)} JD</span>
                </div>
              </div>

              <button onClick={handleSubmit} disabled={loading}
                style={{ width: '100%', padding: '14px', background: loading ? 'rgba(10,10,10,0.6)' : '#0A0A0A', color: '#F8F6F2', fontFamily: "'DM Sans', sans-serif", fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', border: 'none', borderRadius: '1px', cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 300ms', marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                {loading ? t.checkout.sending[lang] : payment === 'whatsapp' ? t.checkout.sendWa[lang] : payment === 'instagram' ? t.checkout.sendIg[lang] : t.checkout.confirmBtn[lang]}
              </button>

              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.5625rem', fontWeight: 300, color: 'rgba(10,10,10,0.35)', textAlign: 'center', lineHeight: 1.6 }}>
                {t.checkout.terms[lang]}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}