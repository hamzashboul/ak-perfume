'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      }),
      { threshold: 0.12 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

const products = [
  { id: 1, name: 'عود الملوك',    nameEn: 'Oud Al Muluk',    type: 'Oriental · Woody', price: '12.99', inspired: 'Inspired by Baccarat Rouge',   badge: 'New' },
  { id: 2, name: 'زهر الياسمين', nameEn: 'Zahr Al Yasmin',  type: 'Floral · Fresh',   price: '14.99', inspired: 'Inspired by La Vie Est Belle', badge: 'Bestseller' },
  { id: 3, name: 'مسك الليل',    nameEn: 'Musk Al Layl',    type: 'Woody · Amber',    price: '11.99', inspired: 'Inspired by Bleu de Chanel',   badge: '' },
  { id: 4, name: 'غيث الصحراء',  nameEn: 'Ghaith Al Sahra', type: 'Fresh · Citrus',   price: '13.99', inspired: 'Inspired by Aventus',          badge: '' },
];

function ProductCard({ p, i }: { p: typeof products[0]; i: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={`reveal reveal-delay-${i + 1}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#FFFFFF',
        border: '0.5px solid rgba(10,10,10,0.08)',
        borderRadius: '4px',
        overflow: 'hidden',
        cursor: 'pointer',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hovered ? '0 16px 48px rgba(10,10,10,0.12), 0 0 0 0.5px rgba(201,169,110,0.3)' : '0 1px 4px rgba(10,10,10,0.06)',
        transition: 'transform 400ms cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 400ms cubic-bezier(0.25,0.46,0.45,0.94)',
      }}
    >
      <div style={{
        height: '220px',
        background: i % 2 === 0 ? '#F8F6F2' : '#F0EDE8',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        <svg width="52" height="104" viewBox="0 0 52 104" fill="none" style={{
          transform: hovered ? 'scale(1.06) translateY(-4px)' : 'scale(1)',
          transition: 'transform 700ms cubic-bezier(0.25,0.46,0.45,0.94)',
          filter: 'drop-shadow(0 8px 20px rgba(10,10,10,0.12))',
        }}>
          <rect x="12" y="26" width="28" height="68" rx="14" fill="#C9A96E" opacity="0.2"/>
          <rect x="14" y="28" width="24" height="64" rx="12" fill="#C9A96E" opacity="0.4"/>
          <rect x="18" y="12" width="16" height="18" rx="3" fill="#1C1C1C"/>
          <ellipse cx="26" cy="12" rx="9" ry="9" fill="#0A0A0A"/>
          <rect x="16" y="54" width="20" height="0.5" fill="#C9A96E" opacity="0.5"/>
          <text x="26" y="74" textAnchor="middle" fill="#8A6F3E" fontSize="6" fontFamily="DM Sans" letterSpacing="2">AK</text>
        </svg>
        {p.badge && (
          <div style={{
            position: 'absolute', top: '12px', right: '12px',
            background: p.badge === 'Bestseller' ? '#0A0A0A' : 'rgba(201,169,110,0.12)',
            color: p.badge === 'Bestseller' ? '#F8F6F2' : '#8A6F3E',
            border: p.badge === 'Bestseller' ? 'none' : '0.5px solid rgba(201,169,110,0.3)',
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.5625rem', fontWeight: 500, letterSpacing: '0.14em',
            textTransform: 'uppercase', padding: '3px 8px', borderRadius: '1px',
          }}>{p.badge}</div>
        )}
      </div>

      <div style={{ padding: '16px 18px 18px' }}>
        <div style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '0.5625rem', fontWeight: 500, letterSpacing: '0.14em',
          textTransform: 'uppercase', color: 'rgba(10,10,10,0.35)', marginBottom: '5px',
        }}>{p.type}</div>
        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '1.375rem', fontWeight: 400, letterSpacing: '-0.01em',
          color: '#0A0A0A', lineHeight: 1.1, marginBottom: '3px',
        }}>{p.name}</div>
        <div style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '0.5625rem', color: 'rgba(10,10,10,0.3)',
          letterSpacing: '0.04em', marginBottom: '14px',
        }}>{p.inspired}</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '1.25rem', fontWeight: 500, color: '#8A6F3E',
          }}>{p.price} JD</span>
          <button style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.5625rem', fontWeight: 500, letterSpacing: '0.14em',
            textTransform: 'uppercase',
            background: hovered ? '#0A0A0A' : 'transparent',
            color: hovered ? '#F8F6F2' : '#0A0A0A',
            border: '0.5px solid rgba(10,10,10,0.2)',
            borderRadius: '1px', padding: '7px 14px', cursor: 'pointer',
            transition: 'all 250ms',
          }}>أضف للسلة</button>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [loaded, setLoaded] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  useReveal();

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div dir="rtl" style={{ background: '#F8F6F2' }}>

      {/* ══ HERO ══════════════════════════════════════════════════════════ */}
      <section ref={heroRef} style={{
        minHeight: '100vh',
        background: '#0A0A0A',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden',
        marginTop: 'calc(var(--nav-h) * -1)',
        paddingTop: 'var(--nav-h)',
        textAlign: 'center',
      }}>
        {/* Ambient glow */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 70% 50% at 50% 30%, rgba(201,169,110,0.07) 0%, transparent 65%)',
          animation: 'gold-pulse 5s ease-in-out infinite',
        }}/>
        {/* Vertical lines */}
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: '6%', width: '0.5px', background: 'linear-gradient(180deg,transparent,rgba(201,169,110,0.08),transparent)', pointerEvents: 'none' }}/>
        <div style={{ position: 'absolute', top: 0, bottom: 0, right: '6%', width: '0.5px', background: 'linear-gradient(180deg,transparent,rgba(201,169,110,0.08),transparent)', pointerEvents: 'none' }}/>

        {/* ── Main content ── */}
        <div style={{ position: 'relative', zIndex: 2, padding: '3rem var(--site-px) 6rem' }}>

          {/* LOGO */}
          <div style={{
            animation: 'float 5s ease-in-out infinite',
            marginBottom: '2.5rem',
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 800ms 0.1s cubic-bezier(0.16,1,0.3,1), transform 800ms 0.1s cubic-bezier(0.16,1,0.3,1)',
          }}>
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2.5rem,7vw,5rem)',
              fontWeight: 400,
              letterSpacing: '0.12em',
              color: '#F8F6F2',
              lineHeight: 1,
              marginBottom: '10px',
            }}>AK PERFUMES</div>
            <div style={{
              width: '100%',
              height: '0.5px',
              background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.6), transparent)',
              marginBottom: '10px',
            }}/>
            <div style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.6875rem',
              fontWeight: 500,
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
              color: '#C9A96E',
            }}>Define Yourself</div>
          </div>

          {/* Divider */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            maxWidth: '200px', margin: '0 auto 2.5rem',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 600ms 0.3s',
          }}>
            <div style={{ flex: 1, height: '0.5px', background: 'rgba(201,169,110,0.15)' }}/>
            <div style={{ width: '4px', height: '4px', background: '#C9A96E', transform: 'rotate(45deg)', flexShrink: 0 }}/>
            <div style={{ flex: 1, height: '0.5px', background: 'rgba(201,169,110,0.15)' }}/>
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(2rem,5vw,3.5rem)',
            fontWeight: 300, lineHeight: 1,
            letterSpacing: '-0.03em',
            color: '#F8F6F2',
            marginBottom: '1rem',
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 700ms 0.35s cubic-bezier(0.16,1,0.3,1), transform 700ms 0.35s cubic-bezier(0.16,1,0.3,1)',
          }}>
            الرائحة التي{' '}
            <em style={{ fontStyle: 'italic', color: '#C9A96E' }}>تعرّفك</em>
          </h1>

          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.875rem', fontWeight: 300,
            color: 'rgba(248,246,242,0.4)',
            lineHeight: 1.8, marginBottom: '2rem',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 700ms 0.45s',
          }}>
            روائح فاخرة مستوحاة من أشهر دور العطور العالمية
          </p>

          {/* CTAs */}
          <div style={{
            display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 700ms 0.55s',
          }}>
            <Link href="/products" style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.18em',
              textTransform: 'uppercase', background: '#C9A96E', color: '#0A0A0A',
              padding: '13px 28px', borderRadius: '1px', textDecoration: 'none',
            }}>اكتشف المجموعة</Link>
            <Link href="/about" style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.18em',
              textTransform: 'uppercase', background: 'transparent', color: '#F8F6F2',
              padding: '12px 28px', borderRadius: '1px',
              border: '0.5px solid rgba(248,246,242,0.18)',
              textDecoration: 'none',
            }}>قصتنا</Link>
          </div>

          {/* Stats */}
          <div style={{
            display: 'flex', gap: '3rem', justifyContent: 'center',
            marginTop: '3.5rem',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 700ms 0.7s',
          }}>
            {[
              { n: '50+',  label: 'عطر فاخر' },
              { n: '1K+',  label: 'عميل سعيد' },
              { n: '100%', label: 'جودة مضمونة' },
            ].map(s => (
              <div key={s.n} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.75rem', fontWeight: 400, color: '#C9A96E', lineHeight: 1 }}>{s.n}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.5625rem', fontWeight: 400, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(248,246,242,0.25)', marginTop: '5px' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ✅ إصلاح ١ — Scroll indicator في الأسفل بشكل صحيح */}
        <div style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          zIndex: 3,
          opacity: loaded ? 0.45 : 0,
          transition: 'opacity 700ms 1.4s',
          pointerEvents: 'none',
        }}>
          <div style={{ width: '0.5px', height: '36px', background: 'linear-gradient(180deg, #C9A96E, transparent)' }}/>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.5rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#F8F6F2' }}>scroll</div>
        </div>
      </section>

      {/* ══ TICKER ════════════════════════════════════════════════════════ */}
      <div style={{
        background: '#0A0A0A',
        borderBottom: '0.5px solid rgba(201,169,110,0.1)',
        padding: '11px 0', overflow: 'hidden',
      }}>
        <div style={{ display: 'flex', animation: 'ticker 24s linear infinite', whiteSpace: 'nowrap' }}>
          {Array(4).fill(null).map((_, i) => (
            <span key={i} style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.5625rem', fontWeight: 400, letterSpacing: '0.2em',
              textTransform: 'uppercase', color: 'rgba(201,169,110,0.35)',
              paddingInlineEnd: '3rem',
            }}>
              AK PERFUMES ✦ DEFINE YOURSELF ✦ AUTHENTIC FRAGRANCES ✦ MADE IN JORDAN ✦ FREE DELIVERY ✦ PREMIUM QUALITY ✦ &nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* ══ PRODUCTS ══════════════════════════════════════════════════════ */}
      <section style={{ background: '#F8F6F2', paddingBlock: 'clamp(5rem,10vw,8rem)' }}>
        <div className="site-container">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <div style={{ width: '40px', height: '0.5px', background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.5))' }}/>
              <div style={{ width: '4px', height: '4px', background: '#C9A96E', transform: 'rotate(45deg)' }}/>
              <div style={{ width: '40px', height: '0.5px', background: 'linear-gradient(90deg, rgba(201,169,110,0.5), transparent)' }}/>
            </div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8A6F3E', marginBottom: '0.75rem' }}>المجموعة المميزة</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 300, letterSpacing: '-0.025em', color: '#0A0A0A' }}>الأكثر طلباً</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px', marginBottom: '2.5rem' }}>
            {products.map((p, i) => <ProductCard key={p.id} p={p} i={i} />)}
          </div>

          <div className="reveal" style={{ textAlign: 'center' }}>
            <Link href="/products" style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.18em',
              textTransform: 'uppercase', background: 'transparent', color: '#0A0A0A',
              padding: '13px 32px', borderRadius: '1px',
              border: '0.5px solid rgba(10,10,10,0.2)',
              textDecoration: 'none', display: 'inline-block',
            }}>عرض كل المجموعة</Link>
          </div>
        </div>
      </section>

      {/* ══ BRAND STORY ═══════════════════════════════════════════════════ */}
      <section style={{ background: '#F0EDE8', borderTop: '0.5px solid rgba(10,10,10,0.06)', borderBottom: '0.5px solid rgba(10,10,10,0.06)', paddingBlock: 'clamp(4rem,8vw,7rem)' }}>
        <div className="site-container">
          {/* ✅ إصلاح ٢ — RTL: النص على اليمين، الصورة على اليسار */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>

            {/* Text — يمين في RTL */}
            <div className="reveal">
              <div style={{ width: '36px', height: '0.5px', background: 'linear-gradient(90deg, #C9A96E, transparent)', marginBottom: '1.5rem' }}/>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8A6F3E', marginBottom: '1rem' }}>عن AK Perfumes</p>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem,4vw,3.25rem)', fontWeight: 300, letterSpacing: '-0.03em', color: '#0A0A0A', lineHeight: 1, marginBottom: '1.25rem' }}>
                <em style={{ fontStyle: 'italic', color: '#8A6F3E' }}>Define</em><br />Yourself
              </h2>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.9375rem', fontWeight: 300, color: 'rgba(10,10,10,0.5)', lineHeight: 1.85, maxWidth: '380px', marginBottom: '2rem' }}>
                نؤمن بأن الرائحة هي أقوى أداة للتعبير عن الشخصية. نقدّم عطوراً مستوحاة من أشهر دور العطور العالمية، بجودة لا تقبل المساومة وأسعار تناسب الجميع في الأردن.
              </p>
              <Link href="/about" style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.18em',
                textTransform: 'uppercase', background: 'transparent', color: '#0A0A0A',
                padding: '12px 28px', borderRadius: '1px',
                border: '0.5px solid rgba(10,10,10,0.2)',
                textDecoration: 'none', display: 'inline-block',
              }}>اقرأ قصتنا</Link>
            </div>

            {/* Visual — يسار في RTL */}
            <div className="reveal reveal-delay-2" style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{
                width: '220px', height: '300px',
                background: '#0A0A0A',
                borderRadius: '4px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative',
                boxShadow: '0 24px 64px rgba(10,10,10,0.15)',
              }}>
                <svg width="80" height="150" viewBox="0 0 80 150" fill="none" style={{ animation: 'float 5s ease-in-out infinite' }}>
                  <rect x="20" y="38" width="40" height="102" rx="20" fill="#C9A96E" opacity="0.15"/>
                  <rect x="22" y="40" width="36" height="98" rx="18" fill="#C9A96E" opacity="0.3"/>
                  <rect x="28" y="18" width="24" height="24" rx="4" fill="#1C1C1C"/>
                  <ellipse cx="40" cy="17" rx="13" ry="13" fill="#141414"/>
                  <rect x="26" y="82" width="28" height="0.5" fill="#C9A96E" opacity="0.4"/>
                  <text x="40" y="108" textAnchor="middle" fill="#C9A96E" fontSize="8" fontFamily="DM Sans" opacity="0.5" letterSpacing="3">AK</text>
                </svg>
                <div style={{ position: 'absolute', top: '-1px', right: '-1px', width: '18px', height: '18px', borderTop: '1px solid #C9A96E', borderRight: '1px solid #C9A96E' }}/>
                <div style={{ position: 'absolute', bottom: '-1px', left: '-1px', width: '18px', height: '18px', borderBottom: '1px solid #C9A96E', borderLeft: '1px solid #C9A96E' }}/>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ WHY AK ════════════════════════════════════════════════════════ */}
      <section style={{ background: '#FFFFFF', paddingBlock: 'clamp(4rem,8vw,7rem)' }}>
        <div className="site-container">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8A6F3E', marginBottom: '0.75rem' }}>لماذا AK</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 300, letterSpacing: '-0.025em', color: '#0A0A0A' }}>ما يجعلنا مختلفين</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'rgba(10,10,10,0.06)' }}>
            {[
              { icon: '✦', title: 'جودة حقيقية', desc: 'مكونات عالية الجودة مستوردة من أفضل المصادر العالمية' },
              { icon: '◈', title: 'أسعار عادلة', desc: 'فخامة حقيقية بأسعار تناسب الجميع — بدون مبالغة' },
              { icon: '◇', title: 'توصيل سريع', desc: 'توصيل لكل أنحاء الأردن خلال ٢٤-٤٨ ساعة' },
            ].map((f, i) => (
              <div key={i} className={`reveal reveal-delay-${i+1}`} style={{ background: '#FFFFFF', padding: 'clamp(2rem,4vw,3rem)', textAlign: 'center' }}>
                <div style={{ fontSize: '1.125rem', color: '#C9A96E', marginBottom: '1.25rem', opacity: 0.7 }}>{f.icon}</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.375rem', fontWeight: 400, color: '#0A0A0A', marginBottom: '0.75rem' }}>{f.title}</h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8125rem', fontWeight: 300, color: 'rgba(10,10,10,0.45)', lineHeight: 1.75 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ═══════════════════════════════════════════════════════════ */}
      <section style={{ background: '#0A0A0A', paddingBlock: 'clamp(4rem,8vw,6rem)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(201,169,110,0.06) 0%, transparent 70%)', pointerEvents: 'none' }}/>
        <div className="site-container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="reveal">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center', marginBottom: '2rem' }}>
              <div style={{ width: '50px', height: '0.5px', background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.3))' }}/>
              <div style={{ width: '4px', height: '4px', background: '#C9A96E', transform: 'rotate(45deg)' }}/>
              <div style={{ width: '50px', height: '0.5px', background: 'linear-gradient(90deg, rgba(201,169,110,0.3), transparent)' }}/>
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.5rem,5vw,4rem)', fontWeight: 300, letterSpacing: '-0.03em', color: '#F8F6F2', marginBottom: '1rem' }}>
              ابدأ رحلتك مع AK
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.875rem', fontWeight: 300, color: 'rgba(248,246,242,0.35)', marginBottom: '2.5rem' }}>اكتشف عطرك المثالي اليوم</p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/products" style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.18em',
                textTransform: 'uppercase', background: '#C9A96E', color: '#0A0A0A',
                padding: '13px 28px', borderRadius: '1px', textDecoration: 'none',
              }}>تسوق الآن</Link>
              <a href="https://wa.me/962000000000" target="_blank" rel="noopener noreferrer" style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.18em',
                textTransform: 'uppercase', background: 'transparent', color: '#F8F6F2',
                padding: '12px 28px', borderRadius: '1px',
                border: '0.5px solid rgba(248,246,242,0.18)',
                textDecoration: 'none',
              }}>تواصل عبر واتساب</a>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ════════════════════════════════════════════════════════ */}
      <footer style={{ background: '#050505', borderTop: '0.5px solid rgba(201,169,110,0.08)', padding: '2.5rem 0' }}>
        <div className="site-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.125rem', fontWeight: 400, letterSpacing: '0.1em', color: '#F8F6F2', display: 'flex', alignItems: 'center', gap: '6px' }}>
            AK <span style={{ color: '#C9A96E', fontSize: '0.625rem' }}>✦</span> PERFUMES
          </div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.5625rem', fontWeight: 400, letterSpacing: '0.12em', color: 'rgba(248,246,242,0.18)' }}>
            © ٢٠٢٥ AK Perfumes — الأردن
          </p>
        </div>
      </footer>

    </div>
  );
}