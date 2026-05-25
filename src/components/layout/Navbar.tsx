'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

interface NavLink {
  href: string;
  ar: string;
  en: string;
}

const navLinks: NavLink[] = [
  { href: '/',         ar: 'الرئيسية',   en: 'Home'        },
  { href: '/products', ar: 'المجموعات',  en: 'Collections' },
  { href: '/about',    ar: 'عن العلامة', en: 'About'       },
  { href: '/contact',  ar: 'تواصل معنا', en: 'Contact'     },
];

export default function Navbar() {
  const [lang, setLang]         = useState<'ar' | 'en'>('ar');
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden]     = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount]             = useState(0);
  const [lastY, setLastY]       = useState(0);

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

  const isRTL = lang === 'ar';

  return (
    <>
      {/* ── Main Navbar ── */}
      <header
        dir={isRTL ? 'rtl' : 'ltr'}
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 50,
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
          <Link href="/" style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '1.25rem',
            fontWeight: 400,
            letterSpacing: '0.08em',
            color: 'var(--ivory)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            flexShrink: 0,
          }}>
            AK
            <span style={{ color: 'var(--gold)', fontSize: '0.75rem', lineHeight: 1 }}>✦</span>
            PERFUME
          </Link>

          {/* Desktop Links — centered */}
          <nav style={{
            display: 'flex',
            gap: '2rem',
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
          }}>
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.625rem',
                fontWeight: 400,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'rgba(248,246,242,0.5)',
                transition: 'color 200ms',
              }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--ivory)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(248,246,242,0.5)')}
              >
                {isRTL ? link.ar : link.en}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>

            {/* Lang toggle */}
            <button onClick={() => setLang(l => l === 'ar' ? 'en' : 'ar')} style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.5625rem',
              fontWeight: 500,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              background: 'transparent',
              border: '0.5px solid rgba(201,169,110,0.25)',
              borderRadius: '1px',
              padding: '5px 10px',
              cursor: 'pointer',
              transition: 'all 200ms',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,169,110,0.08)'; e.currentTarget.style.borderColor = 'rgba(201,169,110,0.5)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(201,169,110,0.25)'; }}
            >
              {lang === 'ar' ? 'EN' : 'AR'}
            </button>

            {/* Cart */}
            <button style={{
              position: 'relative',
              width: '40px', height: '40px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--ivory)',
              transition: 'color 200ms',
            }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--ivory)')}
              aria-label="Cart"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              {cartCount > 0 && (
                <span style={{
                  position: 'absolute', top: '6px', insetInlineEnd: '6px',
                  width: '14px', height: '14px',
                  background: 'var(--gold)', color: 'var(--noir)',
                  borderRadius: '50%', fontSize: '0.5rem', fontWeight: 600,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {cartCount}
                </span>
              )}
            </button>

            {/* Hamburger */}
            <button onClick={() => setMenuOpen(o => !o)} style={{
              width: '40px', height: '40px',
              background: 'transparent', border: 'none', cursor: 'pointer',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: '5px',
            }} aria-label="Menu">
              <span style={{ display: 'block', width: '20px', height: '0.5px', background: 'var(--ivory)', transition: 'all 300ms cubic-bezier(0.16,1,0.3,1)', transform: menuOpen ? 'translateY(5.5px) rotate(45deg)' : 'none' }}/>
              <span style={{ display: 'block', width: menuOpen ? '0px' : '13px', height: '0.5px', background: 'var(--gold)', transition: 'all 300ms cubic-bezier(0.16,1,0.3,1)', alignSelf: isRTL ? 'flex-end' : 'flex-start', opacity: menuOpen ? 0 : 1 }}/>
              <span style={{ display: 'block', width: '20px', height: '0.5px', background: 'var(--ivory)', transition: 'all 300ms cubic-bezier(0.16,1,0.3,1)', transform: menuOpen ? 'translateY(-5.5px) rotate(-45deg)' : 'none' }}/>
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Menu Overlay ── */}
      <div dir={isRTL ? 'rtl' : 'ltr'} style={{
        position: 'fixed', inset: 0, zIndex: 40,
        background: 'var(--noir)',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: 'var(--site-px)',
        opacity: menuOpen ? 1 : 0,
        pointerEvents: menuOpen ? 'all' : 'none',
        transition: 'opacity 400ms cubic-bezier(0.16,1,0.3,1)',
      }}>
        <div style={{ width: '40px', height: '0.5px', background: 'linear-gradient(90deg, var(--gold), transparent)', marginBottom: '2.5rem' }}/>

        <nav style={{ display: 'flex', flexDirection: 'column' }}>
          {navLinks.map((link, i) => (
            <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2.5rem,8vw,4rem)',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              color: 'var(--ivory)',
              lineHeight: 1.2,
              padding: '6px 0',
              borderBottom: '0.5px solid rgba(201,169,110,0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? 'translateY(0)' : 'translateY(16px)',
              transition: `opacity 500ms ${i * 60}ms cubic-bezier(0.16,1,0.3,1), transform 500ms ${i * 60}ms cubic-bezier(0.16,1,0.3,1), color 200ms`,
            }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--ivory)')}
            >
              {isRTL ? link.ar : link.en}
              <span style={{ fontSize: '0.875rem', color: 'var(--gold)', opacity: 0.4 }}>✦</span>
            </Link>
          ))}
        </nav>

        <div style={{ marginTop: '3rem', display: 'flex', gap: '1.5rem', opacity: menuOpen ? 1 : 0, transition: 'opacity 500ms 280ms' }}>
          <a href="https://instagram.com/akperfume" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.625rem', fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(248,246,242,0.35)' }}>Instagram</a>
          <a href="https://wa.me/962000000000" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.625rem', fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(248,246,242,0.35)' }}>WhatsApp</a>
        </div>
      </div>

      {/* Spacer */}
      <div style={{ height: 'var(--nav-h)' }} />
    </>
  );
}