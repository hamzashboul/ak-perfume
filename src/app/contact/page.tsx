'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleWhatsApp = () => {
    if (!form.name || !form.message) return;
    const msg = `مرحبا، أنا ${form.name}${form.phone ? ` — ${form.phone}` : ''}\n\n${form.message}`;
    window.open(`https://wa.me/962000000000?text=${encodeURIComponent(msg)}`, '_blank');
    setSent(true);
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '0.625rem', fontWeight: 500, letterSpacing: '0.14em',
    textTransform: 'uppercase', color: 'rgba(10,10,10,0.45)',
    display: 'block', marginBottom: '6px',
  };

  const inputStyle: React.CSSProperties = {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '0.9375rem', color: '#0A0A0A',
    background: '#FFFFFF',
    border: '0.5px solid rgba(10,10,10,0.12)',
    borderRadius: '2px', padding: '11px 14px',
    width: '100%', outline: 'none',
    transition: 'border-color 150ms',
  };

  return (
    <div dir="rtl" style={{ background: '#F8F6F2', minHeight: '100vh' }}>

      {/* Hero */}
      <section style={{ background: '#0A0A0A', paddingBlock: 'clamp(4rem,9vw,7rem)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 70% at 70% 50%, rgba(201,169,110,0.07) 0%, transparent 65%)', pointerEvents: 'none' }}/>
        <div className="site-container">
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.625rem', fontWeight: 500, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#8A6F3E', marginBottom: '1rem' }}>نحن هنا</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(3rem,7vw,5.5rem)', fontWeight: 300, letterSpacing: '-0.04em', color: '#F8F6F2', lineHeight: 0.92, marginBottom: '1.25rem' }}>
            تواصل<br /><em style={{ fontStyle: 'italic', color: '#C9A96E' }}>معنا</em>
          </h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.9375rem', fontWeight: 300, color: 'rgba(248,246,242,0.4)', lineHeight: 1.8, maxWidth: '420px' }}>
            سعداء بسماعك — سواء كان عندك سؤال عن عطر، طلب خاص، أو مجرد تريد تتكلم عن العطور.
          </p>
        </div>
      </section>

      <div className="site-container" style={{ paddingBlock: 'clamp(3rem,7vw,6rem)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(2rem,5vw,5rem)', alignItems: 'start' }}>

          {/* Contact channels */}
          <div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.625rem', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8A6F3E', marginBottom: '1.5rem' }}>طرق التواصل</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '3rem' }}>

              {/* WhatsApp */}
              <a href="https://wa.me/962000000000" target="_blank" rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '18px 20px', background: '#FFFFFF', border: '0.5px solid rgba(10,10,10,0.08)', borderRadius: '4px', textDecoration: 'none', transition: 'all 300ms', cursor: 'pointer' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,169,110,0.3)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(10,10,10,0.08)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(10,10,10,0.08)'; (e.currentTarget as HTMLElement).style.transform = 'none'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
              >
                <div style={{ width: '44px', height: '44px', borderRadius: '3px', background: '#F8F6F2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', flexShrink: 0 }}>💬</div>
                <div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.875rem', fontWeight: 500, color: '#0A0A0A', marginBottom: '3px' }}>واتساب</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', fontWeight: 300, color: 'rgba(10,10,10,0.4)' }}>+962 XX XXX XXXX — رد خلال ساعة</div>
                </div>
                <div style={{ marginRight: 'auto', color: '#C9A96E', fontSize: '0.875rem', opacity: 0.6 }}>←</div>
              </a>

              {/* Instagram */}
              <a href="https://instagram.com/akperfume" target="_blank" rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '18px 20px', background: '#FFFFFF', border: '0.5px solid rgba(10,10,10,0.08)', borderRadius: '4px', textDecoration: 'none', transition: 'all 300ms', cursor: 'pointer' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,169,110,0.3)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(10,10,10,0.08)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(10,10,10,0.08)'; (e.currentTarget as HTMLElement).style.transform = 'none'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
              >
                <div style={{ width: '44px', height: '44px', borderRadius: '3px', background: '#F8F6F2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', flexShrink: 0 }}>📷</div>
                <div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.875rem', fontWeight: 500, color: '#0A0A0A', marginBottom: '3px' }}>إنستقرام</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', fontWeight: 300, color: 'rgba(10,10,10,0.4)' }}>@akperfume — تابعنا لأحدث العطور</div>
                </div>
                <div style={{ marginRight: 'auto', color: '#C9A96E', fontSize: '0.875rem', opacity: 0.6 }}>←</div>
              </a>

              {/* Location */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '18px 20px', background: '#FFFFFF', border: '0.5px solid rgba(10,10,10,0.08)', borderRadius: '4px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '3px', background: '#F8F6F2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', flexShrink: 0 }}>📍</div>
                <div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.875rem', fontWeight: 500, color: '#0A0A0A', marginBottom: '3px' }}>الموقع</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', fontWeight: 300, color: 'rgba(10,10,10,0.4)' }}>عمّان، الأردن — توصيل لكل المحافظات</div>
                </div>
              </div>

              {/* Hours */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '18px 20px', background: '#FFFFFF', border: '0.5px solid rgba(10,10,10,0.08)', borderRadius: '4px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '3px', background: '#F8F6F2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', flexShrink: 0 }}>🕐</div>
                <div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.875rem', fontWeight: 500, color: '#0A0A0A', marginBottom: '3px' }}>ساعات العمل</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', fontWeight: 300, color: 'rgba(10,10,10,0.4)' }}>السبت – الخميس: ١٠ص – ١٠م</div>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div style={{ width: '36px', height: '0.5px', background: 'linear-gradient(90deg, #C9A96E, transparent)', marginBottom: '1.25rem' }}/>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.625rem', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8A6F3E', marginBottom: '1rem' }}>أسئلة شائعة</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { q: 'كم يستغرق التوصيل؟',         a: '٢٤-٤٨ ساعة لعمّان، ٢-٣ أيام للمحافظات.' },
                { q: 'هل يمكن إرجاع المنتج؟',       a: 'نعم، خلال ٧ أيام من الاستلام إذا كان المنتج سليماً.' },
                { q: 'هل العطور أصلية؟',            a: 'عطورنا مستوحاة وليست أصلية — جودة عالية بسعر مناسب.' },
                { q: 'هل يوجد توصيل مجاني؟',       a: 'نعم، التوصيل مجاني على جميع الطلبات.' },
              ].map((faq, i) => (
                <div key={i} style={{ padding: '12px 16px', background: '#FFFFFF', border: '0.5px solid rgba(10,10,10,0.07)', borderRadius: '3px' }}>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8125rem', fontWeight: 500, color: '#0A0A0A', marginBottom: '4px' }}>{faq.q}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', fontWeight: 300, color: 'rgba(10,10,10,0.45)', lineHeight: 1.6 }}>{faq.a}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Message Form */}
          <div style={{ position: 'sticky', top: 'calc(var(--nav-h) + 2rem)' }}>
            <div style={{ background: '#FFFFFF', border: '0.5px solid rgba(10,10,10,0.07)', borderRadius: '4px', padding: '28px' }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', fontWeight: 400, color: '#0A0A0A', marginBottom: '6px' }}>أرسل رسالة</h2>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8125rem', fontWeight: 300, color: 'rgba(10,10,10,0.4)', marginBottom: '24px' }}>سنرد عليك عبر واتساب خلال ساعة</p>

              {sent ? (
                <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '12px' }}>✦</div>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.25rem', fontWeight: 300, color: '#0A0A0A', marginBottom: '8px' }}>تم الإرسال!</p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8125rem', fontWeight: 300, color: 'rgba(10,10,10,0.45)' }}>سنتواصل معك قريباً</p>
                  <button onClick={() => { setSent(false); setForm({ name: '', phone: '', message: '' }); }}
                    style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.625rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', background: 'transparent', color: '#C9A96E', border: '0.5px solid rgba(201,169,110,0.3)', borderRadius: '1px', padding: '8px 18px', cursor: 'pointer', marginTop: '16px' }}>
                    رسالة جديدة
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={labelStyle}>الاسم *</label>
                    <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      placeholder="اسمك الكريم" style={inputStyle}
                      onFocus={e => (e.target.style.borderColor = '#C9A96E')}
                      onBlur={e => (e.target.style.borderColor = 'rgba(10,10,10,0.12)')}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>رقم الهاتف (اختياري)</label>
                    <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                      placeholder="07xxxxxxxx" type="tel" style={inputStyle}
                      onFocus={e => (e.target.style.borderColor = '#C9A96E')}
                      onBlur={e => (e.target.style.borderColor = 'rgba(10,10,10,0.12)')}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>رسالتك *</label>
                    <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      placeholder="اكتب رسالتك هنا — سؤال، طلب خاص، أو أي شيء تريد..." rows={5}
                      style={{ ...inputStyle, resize: 'none' }}
                      onFocus={e => (e.target.style.borderColor = '#C9A96E')}
                      onBlur={e => (e.target.style.borderColor = 'rgba(10,10,10,0.12)')}
                    />
                  </div>
                  <button onClick={handleWhatsApp} disabled={!form.name || !form.message}
                    style={{ width: '100%', padding: '14px', background: !form.name || !form.message ? 'rgba(10,10,10,0.3)' : '#0A0A0A', color: '#F8F6F2', fontFamily: "'DM Sans', sans-serif", fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', border: 'none', borderRadius: '1px', cursor: !form.name || !form.message ? 'not-allowed' : 'pointer', transition: 'all 250ms' }}>
                    إرسال عبر واتساب
                  </button>
                  <a href="https://instagram.com/akperfume" target="_blank" rel="noopener noreferrer"
                    style={{ display: 'block', textAlign: 'center', width: '100%', padding: '12px', background: 'transparent', color: 'rgba(10,10,10,0.5)', fontFamily: "'DM Sans', sans-serif", fontSize: '0.625rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', textDecoration: 'none', border: '0.5px solid rgba(10,10,10,0.12)', borderRadius: '1px', transition: 'all 200ms' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(10,10,10,0.3)'; (e.currentTarget as HTMLElement).style.color = '#0A0A0A'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(10,10,10,0.12)'; (e.currentTarget as HTMLElement).style.color = 'rgba(10,10,10,0.5)'; }}
                  >تواصل عبر إنستقرام</a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}