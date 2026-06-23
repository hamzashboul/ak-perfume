'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLang } from '@/lib/i18n/LangContext';
import { t } from '@/lib/i18n/translations';

const navLinks = [
  { href: '/',         key: 'home'     },
  { href: '/products', key: 'products' },
  { href: '/about',    key: 'about'    },
  { href: '/contact',  key: 'contact'  },
] as const;

export default function Footer() {
  const { lang, isRTL } = useLang();

  return (
    <footer dir={isRTL ? 'rtl' : 'ltr'} style={{ background: '#050505', borderTop: '0.5px solid rgba(201,169,110,0.1)', position: 'relative', overflow: 'hidden' }}>

      {/* Ambient glow */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 60% at 50% 0%, rgba(201,169,110,0.04) 0%, transparent 70%)', pointerEvents: 'none' }}/>

      {/* Main footer content */}
      <div className="site-container" style={{ paddingBlock: '3.5rem', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: '3rem', marginBottom: '3rem' }}>

          {/* Brand column */}
          <div>
            {/* Logo */}
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.375rem', fontWeight: 400, letterSpacing: '0.1em', color: '#F8F6F2', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
              AK
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                style={{ color: '#C9A96E', fontSize: '0.75rem', display: 'inline-block' }}
              >✦</motion.span>
              PERFUMES
            </div>

            {/* Tagline */}
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8125rem', fontWeight: 300, color: 'rgba(248,246,242,0.35)', lineHeight: 1.8, maxWidth: '260px', marginBottom: '1.5rem' }}>
              {lang === 'ar'
                ? 'روائح فاخرة مستوحاة من أشهر دور العطور العالمية — بجودة حقيقية وأسعار تناسب الجميع في الأردن.'
                : 'Luxury fragrances inspired by the world\'s finest perfume houses — genuine quality at honest prices in Jordan.'}
            </p>

            {/* Social links */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <motion.a
                href="https://www.instagram.com/ak.perfume1.jo/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, color: '#C9A96E' }}
                style={{ width: '36px', height: '36px', border: '0.5px solid rgba(201,169,110,0.2)', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(248,246,242,0.4)', textDecoration: 'none' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </motion.a>
              <motion.a
                href="https://wa.me/962787304077"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, color: '#25D366' }}
                style={{ width: '36px', height: '36px', border: '0.5px solid rgba(201,169,110,0.2)', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(248,246,242,0.4)', textDecoration: 'none' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </motion.a>
            </div>
          </div>

          {/* Navigation column */}
          <div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.5625rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A96E', marginBottom: '1.25rem' }}>
              {lang === 'ar' ? 'الصفحات' : 'Pages'}
            </p>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {navLinks.map(link => (
                <motion.div key={link.href} whileHover={{ x: isRTL ? -4 : 4 }} transition={{ duration: 0.2 }}>
                  <Link
                    href={link.href}
                    style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8125rem', fontWeight: 300, color: 'rgba(248,246,242,0.4)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#F8F6F2')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(248,246,242,0.4)')}
                  >
                    <span style={{ color: '#C9A96E', fontSize: '0.4rem', opacity: 0.5 }}>✦</span>
                    {t.nav[link.key][lang]}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </div>

          {/* Contact column */}
          <div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.5625rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A96E', marginBottom: '1.25rem' }}>
              {lang === 'ar' ? 'تواصل معنا' : 'Contact'}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              <a href="https://wa.me/962787304077" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8125rem', fontWeight: 300, color: 'rgba(248,246,242,0.4)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#F8F6F2')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(248,246,242,0.4)')}
              >
                <span style={{ color: '#25D366', fontSize: '0.75rem' }}>●</span>
                WhatsApp — 0787304077
              </a>
              <a href="https://www.instagram.com/ak.perfume1.jo/" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8125rem', fontWeight: 300, color: 'rgba(248,246,242,0.4)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#F8F6F2')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(248,246,242,0.4)')}
              >
                <span style={{ color: '#E1306C', fontSize: '0.75rem' }}>●</span>
                @ak.perfume1.jo
              </a>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8125rem', fontWeight: 300, color: 'rgba(248,246,242,0.3)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#C9A96E', fontSize: '0.75rem' }}>●</span>
                {lang === 'ar' ? 'عمّان، الأردن' : 'Amman, Jordan'}
              </div>

              {/* Shipping info */}
              <div style={{ marginTop: '0.5rem', padding: '10px 12px', background: 'rgba(201,169,110,0.06)', border: '0.5px solid rgba(201,169,110,0.12)', borderRadius: '2px' }}>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.625rem', fontWeight: 500, color: '#C9A96E', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>
                  {lang === 'ar' ? 'رسوم التوصيل' : 'Shipping'}
                </p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', fontWeight: 300, color: 'rgba(248,246,242,0.4)', lineHeight: 1.6 }}>
                  {lang === 'ar' ? 'عمّان: ٢ د.أ  ·  باقي المحافظات: ٣ د.أ' : 'Amman: 2 JD  ·  Other cities: 3 JD'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '0.5px', background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.15), transparent)', marginBottom: '1.5rem' }}/>

        {/* Bottom bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.5625rem', fontWeight: 400, letterSpacing: '0.1em', color: 'rgba(248,246,242,0.18)' }}>
            {t.home.footerCopy[lang]}
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.5625rem', fontWeight: 400, letterSpacing: '0.1em', color: 'rgba(248,246,242,0.18)' }}>
            {lang === 'ar' ? 'جميع الحقوق محفوظة' : 'All rights reserved'}
          </p>
        </div>
      </div>
    </footer>
  );
}