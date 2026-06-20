'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { useLang } from '@/lib/i18n/LangContext';
import { t } from '@/lib/i18n/translations';

const navLinks = [
  { href: '/',         key: 'home'     },
  { href: '/products', key: 'products' },
  { href: '/about',    key: 'about'    },
  { href: '/contact',  key: 'contact'  },
] as const;

export default function Navbar() {
  const { lang, setLang, isRTL } = useLang();
  const [scrolled, setScrolled]   = useState(false);
  const [hidden, setHidden]       = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [lastY, setLastY]         = useState(0);
  const [mounted, setMounted]     = useState(false);

  const { openCart, totalItems } = useCartStore();

  useEffect(() => setMounted(true), []);
  const cartCount = mounted ? totalItems() : 0;

  const handleScroll = useCallback(() => {
    const y = window.scrollY;
    setScrolled(y > 20);
    setHidden(y > lastY && y > 80);
    setLastY(y);
  }, [lastY]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <header
        dir={isRTL ? 'rtl' : 'ltr'}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
          height: 'var(--nav-h)',
          transform: hidden ? 'translateY(-100%)' : 'translateY(0)',
          transition: 'transform 400ms cubic-bezier(0.25,0.46,0.45,0.94), background 300ms',
          background: scrolled ? 'rgba(10,10,10,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '0.5px solid rgba(201,169,110,0.12)' : '0.5px solid transparent',
        }}
      >
        <div className="site-container" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* Logo */}
          <Link href="/" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.25rem', fontWeight: 400, letterSpacing: '0.08em', color: 'var(--ivory)', display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
            AK <span style={{ color: 'var(--gold)', fontSize: '0.75rem', lineHeight: 1 }}>✦</span> PERFUME
          </Link>

          {/* Desktop Links */}
          <nav style={{ display: 'flex', gap: '2rem', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.625rem', fontWeight: 400, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(248,246,242,0.5)', transition: 'color 200ms' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--ivory)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(248,246,242,0.5)')}
              >
                {t.nav[link.key][lang]}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>

            {/* Lang toggle */}
            <button onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.5625rem', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)', background: 'transparent', border: '0.5px solid rgba(201,169,110,0.25)', borderRadius: '1px', padding: '5px 10px', cursor: 'pointer', transition: 'all 200ms' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,169,110,0.08)'; e.currentTarget.style.borderColor = 'rgba(201,169,110,0.5)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(201,169,110,0.25)'; }}
            >
              {lang === 'ar' ? 'EN' : 'AR'}
            </button>

            {/* Cart */}
            <button onClick={openCart} style={{ position: 'relative', width: '40px', height: '40px', background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ivory)', transition: 'color 200ms' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--ivory)')}
              aria-label={t.nav.cart[lang]}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              {cartCount > 0 && (
                <span style={{ position: 'absolute', top: '6px', insetInlineEnd: '6px', width: '16px', height: '16px', background: 'var(--gold)', color: 'var(--noir)', borderRadius: '50%', fontSize: '0.5rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{cartCount}</span>
              )}
            </button>

            {/* Hamburger */}
            <button onClick={() => setMenuOpen(o => !o)} style={{ width: '40px', height: '40px', background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '5px' }} aria-label="Menu">
              <span style={{ display: 'block', width: '20px', height: '0.5px', background: 'var(--ivory)', transition: 'all 300ms cubic-bezier(0.16,1,0.3,1)', transform: menuOpen ? 'translateY(5.5px) rotate(45deg)' : 'none' }}/>
              <span style={{ display: 'block', width: menuOpen ? '0px' : '13px', height: '0.5px', background: 'var(--gold)', transition: 'all 300ms cubic-bezier(0.16,1,0.3,1)', alignSelf: isRTL ? 'flex-end' : 'flex-start', opacity: menuOpen ? 0 : 1 }}/>
              <span style={{ display: 'block', width: '20px', height: '0.5px', background: 'var(--ivory)', transition: 'all 300ms cubic-bezier(0.16,1,0.3,1)', transform: menuOpen ? 'translateY(-5.5px) rotate(-45deg)' : 'none' }}/>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div dir={isRTL ? 'rtl' : 'ltr'} style={{ position: 'fixed', inset: 0, zIndex: 40, background: 'var(--noir)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'var(--site-px)', opacity: menuOpen ? 1 : 0, pointerEvents: menuOpen ? 'all' : 'none', transition: 'opacity 400ms cubic-bezier(0.16,1,0.3,1)' }}>
        <div style={{ width: '40px', height: '0.5px', background: 'linear-gradient(90deg, var(--gold), transparent)', marginBottom: '2.5rem' }}/>
        <nav style={{ display: 'flex', flexDirection: 'column' }}>
          {navLinks.map((link, i) => (
            <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.5rem,8vw,4rem)', fontWeight: 300, letterSpacing: '-0.02em', color: 'var(--ivory)', lineHeight: 1.2, padding: '6px 0', borderBottom: '0.5px solid rgba(201,169,110,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', opacity: menuOpen ? 1 : 0, transform: menuOpen ? 'translateY(0)' : 'translateY(16px)', transition: `opacity 500ms ${i * 60}ms cubic-bezier(0.16,1,0.3,1), transform 500ms ${i * 60}ms cubic-bezier(0.16,1,0.3,1), color 200ms` }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--ivory)')}
            >
              {t.nav[link.key][lang]}
              <span style={{ fontSize: '0.875rem', color: 'var(--gold)', opacity: 0.4 }}>✦</span>
            </Link>
          ))}
        </nav>
        <div style={{ marginTop: '3rem', display: 'flex', gap: '1.5rem', opacity: menuOpen ? 1 : 0, transition: 'opacity 500ms 280ms' }}>
          <a href="https://instagram.com/akperfume" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.625rem', fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(248,246,242,0.35)' }}>Instagram</a>
          <a href="https://wa.me/962787304077" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.625rem', fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(248,246,242,0.35)' }}>WhatsApp</a>
        </div>
      </div>

      <div style={{ height: 'var(--nav-h)' }} />
    </>
  );
}