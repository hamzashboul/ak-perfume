'use client';

import Link from 'next/link';
import { useLang } from '@/lib/i18n/LangContext';

export default function NotFound() {
  const { lang, isRTL } = useLang();

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} style={{ minHeight: '100vh', background: '#0A0A0A', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>

      {/* Ambient glow */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,169,110,0.07) 0%, transparent 70%)', pointerEvents: 'none' }}/>

      {/* Vertical lines */}
      <div style={{ position: 'absolute', top: 0, bottom: 0, left: '6%', width: '0.5px', background: 'linear-gradient(180deg,transparent,rgba(201,169,110,0.08),transparent)' }}/>
      <div style={{ position: 'absolute', top: 0, bottom: 0, right: '6%', width: '0.5px', background: 'linear-gradient(180deg,transparent,rgba(201,169,110,0.08),transparent)' }}/>

      <div style={{ textAlign: 'center', position: 'relative', zIndex: 1, padding: '2rem' }}>

        {/* 404 */}
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(6rem,18vw,14rem)', fontWeight: 300, color: 'rgba(201,169,110,0.15)', lineHeight: 1, marginBottom: '-1rem', userSelect: 'none' }}>
          404
        </div>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', maxWidth: '200px', margin: '0 auto 2rem' }}>
          <div style={{ flex: 1, height: '0.5px', background: 'rgba(201,169,110,0.2)' }}/>
          <div style={{ width: '4px', height: '4px', background: '#C9A96E', transform: 'rotate(45deg)', flexShrink: 0 }}/>
          <div style={{ flex: 1, height: '0.5px', background: 'rgba(201,169,110,0.2)' }}/>
        </div>

        {/* Title */}
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.75rem,4vw,2.5rem)', fontWeight: 300, letterSpacing: '-0.025em', color: '#F8F6F2', marginBottom: '1rem' }}>
          {lang === 'ar' ? 'الصفحة غير موجودة' : 'Page Not Found'}
        </h1>

        {/* Subtitle */}
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.9375rem', fontWeight: 300, color: 'rgba(248,246,242,0.4)', lineHeight: 1.75, marginBottom: '2.5rem', maxWidth: '360px', margin: '0 auto 2.5rem' }}>
          {lang === 'ar'
            ? 'يبدو أن هذه الصفحة لا وجود لها — لكن مجموعتنا من العطور الفاخرة بانتظارك'
            : 'This page doesn\'t exist — but our collection of luxury fragrances awaits you'}
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/products" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', background: '#C9A96E', color: '#0A0A0A', padding: '13px 28px', borderRadius: '1px', textDecoration: 'none', transition: 'all 250ms' }}>
            {lang === 'ar' ? 'تصفح المجموعة' : 'Browse Collection'}
          </Link>
          <Link href="/" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', background: 'transparent', color: '#F8F6F2', padding: '12px 28px', borderRadius: '1px', border: '0.5px solid rgba(248,246,242,0.18)', textDecoration: 'none' }}>
            {lang === 'ar' ? 'الرئيسية' : 'Home'}
          </Link>
        </div>

        {/* AK Logo */}
        <div style={{ marginTop: '3.5rem', fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem', fontWeight: 400, letterSpacing: '0.12em', color: 'rgba(248,246,242,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
          AK <span style={{ color: 'rgba(201,169,110,0.3)', fontSize: '0.625rem' }}>✦</span> PERFUMES
        </div>
      </div>
    </div>
  );
}