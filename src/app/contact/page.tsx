'use client';

import { useLang } from '@/lib/i18n/LangContext';
import { t } from '@/lib/i18n/translations';

export default function ContactPage() {
  const { lang, isRTL } = useLang();

  const channels = [
    {
      icon: '💬',
      titleAr: 'واتساب',
      titleEn: 'WhatsApp',
      descAr: 'تواصل معنا مباشرة عبر واتساب للطلبات والاستفسارات',
      descEn: 'Contact us directly via WhatsApp for orders and inquiries',
      linkAr: 'ابدأ المحادثة',
      linkEn: 'Start Chat',
      href: 'https://wa.me/962787304077',
      color: '#25D366',
    },
    {
      icon: '📷',
      titleAr: 'إنستقرام',
      titleEn: 'Instagram',
      descAr: 'تابعنا على إنستقرام لأحدث المنتجات والعروض',
      descEn: 'Follow us on Instagram for the latest products and offers',
      linkAr: 'تابعنا',
      linkEn: 'Follow Us',
      href: 'https://www.instagram.com/ak.perfume1.jo/',
      color: '#E1306C',
    },
  ];

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} style={{ background: '#F8F6F2', minHeight: '100vh' }}>

      {/* Hero */}
      <section style={{ background: '#0A0A0A', paddingBlock: 'clamp(5rem,12vw,9rem)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 60% at 70% 50%, rgba(201,169,110,0.07) 0%, transparent 65%)', pointerEvents: 'none' }}/>
        <div className="site-container">
          <div style={{ maxWidth: '560px' }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.625rem', fontWeight: 500, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#8A6F3E', marginBottom: '1.25rem' }}>
              {t.contact.label[lang]}
            </p>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(3rem,7vw,6rem)', fontWeight: 300, letterSpacing: '-0.04em', color: '#F8F6F2', lineHeight: 0.92, marginBottom: '1.5rem' }}>
              {t.contact.title[lang]}
            </h1>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1rem', fontWeight: 300, color: 'rgba(248,246,242,0.45)', lineHeight: 1.85 }}>
              {t.contact.subtitle[lang]}
            </p>
          </div>
        </div>
      </section>

      {/* Channels */}
      <section style={{ paddingBlock: 'clamp(4rem,8vw,7rem)' }}>
        <div className="site-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', maxWidth: '720px', margin: '0 auto' }}>
            {channels.map((ch, i) => (
              <div key={i} style={{ background: '#FFFFFF', border: '0.5px solid rgba(10,10,10,0.07)', borderRadius: '4px', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ fontSize: '2rem' }}>{ch.icon}</div>
                <div>
                  <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.75rem', fontWeight: 400, color: '#0A0A0A', marginBottom: '8px' }}>
                    {lang === 'ar' ? ch.titleAr : ch.titleEn}
                  </h2>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.875rem', fontWeight: 300, color: 'rgba(10,10,10,0.5)', lineHeight: 1.75 }}>
                    {lang === 'ar' ? ch.descAr : ch.descEn}
                  </p>
                </div>
                <a href={ch.href} target="_blank" rel="noopener noreferrer"
                  style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase', background: ch.color, color: '#FFFFFF', padding: '13px 24px', borderRadius: '1px', textDecoration: 'none', textAlign: 'center', marginTop: 'auto', display: 'block' }}>
                  {lang === 'ar' ? ch.linkAr : ch.linkEn}
                </a>
              </div>
            ))}
          </div>

          {/* Info */}
          <div style={{ maxWidth: '720px', margin: '3rem auto 0', background: '#FFFFFF', border: '0.5px solid rgba(10,10,10,0.07)', borderRadius: '4px', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.25rem', fontWeight: 400, color: '#0A0A0A' }}>
              {lang === 'ar' ? 'ساعات العمل' : 'Working Hours'}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.875rem', color: 'rgba(10,10,10,0.5)' }}>
                  {lang === 'ar' ? 'السبت — الخميس' : 'Saturday — Thursday'}
                </span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.875rem', fontWeight: 500, color: '#0A0A0A' }}>
                  {lang === 'ar' ? '١٠ ص — ١٠ م' : '10 AM — 10 PM'}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.875rem', color: 'rgba(10,10,10,0.5)' }}>
                  {lang === 'ar' ? 'الجمعة' : 'Friday'}
                </span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.875rem', fontWeight: 500, color: '#0A0A0A' }}>
                  {lang === 'ar' ? '٢ م — ١٠ م' : '2 PM — 10 PM'}
                </span>
              </div>
            </div>
            <div style={{ height: '0.5px', background: 'rgba(10,10,10,0.07)', margin: '4px 0' }}/>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8125rem', color: 'rgba(10,10,10,0.4)', lineHeight: 1.7 }}>
              {lang === 'ar'
                ? 'نسعى للرد على جميع الاستفسارات خلال ساعات العمل. للطلبات العاجلة يُفضّل التواصل عبر واتساب.'
                : 'We aim to respond to all inquiries during working hours. For urgent orders, WhatsApp is preferred.'}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}