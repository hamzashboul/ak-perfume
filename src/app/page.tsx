'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useLang } from '@/lib/i18n/LangContext';
import { t } from '@/lib/i18n/translations';

// ── Variants ──────────────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.8, delay: d, ease: [0.16, 1, 0.3, 1] } }),
};
const slideLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: (d = 0) => ({ opacity: 1, x: 0, transition: { duration: 0.9, delay: d, ease: [0.16, 1, 0.3, 1] } }),
};
const slideRight = {
  hidden: { opacity: 0, x: 50 },
  visible: (d = 0) => ({ opacity: 1, x: 0, transition: { duration: 0.9, delay: d, ease: [0.16, 1, 0.3, 1] } }),
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (d = 0) => ({ opacity: 1, scale: 1, transition: { duration: 0.7, delay: d, ease: [0.16, 1, 0.3, 1] } }),
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

// ── Scroll Reveal ─────────────────────────────────────────────────────────────
function Reveal({ children, variants = fadeUp, delay = 0, className = '' }: {
  children: React.ReactNode;
  variants?: typeof fadeUp;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={variants} custom={delay} className={className}>
      {children}
    </motion.div>
  );
}

// ── Animated Counter ──────────────────────────────────────────────────────────
function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = 16;
    const inc = target / (duration / step);
    const timer = setInterval(() => {
      start += inc;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, step);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// ── Sample Products ───────────────────────────────────────────────────────────
const sampleProducts = [
  { id: 1, slug: 'oud-al-muluk',    nameAr: 'عود الملوك',    nameEn: 'Oud Al Muluk',    type: 'Men · Woody',    price: '12.99', inspired: 'Inspired by Baccarat Rouge',   badge: 'new'        },
  { id: 2, slug: 'zahr-al-yasmin',  nameAr: 'زهر الياسمين', nameEn: 'Zahr Al Yasmin',  type: 'Women · Floral', price: '14.99', inspired: 'Inspired by La Vie Est Belle', badge: 'bestseller' },
  { id: 3, slug: 'musk-al-layl',    nameAr: 'مسك الليل',    nameEn: 'Musk Al Layl',    type: 'Men · Amber',    price: '11.99', inspired: 'Inspired by Bleu de Chanel',   badge: ''           },
  { id: 4, slug: 'ghaith-al-sahra', nameAr: 'غيث الصحراء',  nameEn: 'Ghaith Al Sahra', type: 'AK Premium',     price: '13.99', inspired: 'Inspired by Aventus',          badge: 'akpremium'  },
];

// ── Product Card ──────────────────────────────────────────────────────────────
function ProductCard({ p, i }: { p: typeof sampleProducts[0]; i: number }) {
  const { lang } = useLang();
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const badgeLabel = p.badge === 'bestseller' ? t.products.bestseller[lang] : p.badge === 'akpremium' ? 'AK Premium' : p.badge === 'new' ? t.products.new[lang] : '';
  const badgeBg    = p.badge === 'bestseller' ? '#0A0A0A' : p.badge === 'akpremium' ? '#C9A96E' : 'rgba(201,169,110,0.12)';
  const badgeColor = p.badge === 'bestseller' ? '#F8F6F2' : p.badge === 'akpremium' ? '#0A0A0A' : '#8A6F3E';

  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={scaleIn} custom={i * 0.1}>
      <Link href={`/products/${p.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
        <motion.div
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          whileHover={{ y: -8, boxShadow: '0 24px 64px rgba(10,10,10,0.14), 0 0 0 0.5px rgba(201,169,110,0.3)' }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ background: '#FFFFFF', border: '0.5px solid rgba(10,10,10,0.08)', borderRadius: '4px', overflow: 'hidden', cursor: 'pointer', boxShadow: '0 1px 4px rgba(10,10,10,0.06)' }}
        >
          <div style={{ height: '220px', background: i % 2 === 0 ? '#F8F6F2' : '#F0EDE8', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
            <motion.svg
              width="52" height="104" viewBox="0 0 52 104" fill="none"
              animate={{ y: hovered ? -8 : 0, scale: hovered ? 1.08 : 1 }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ filter: 'drop-shadow(0 8px 20px rgba(10,10,10,0.12))' }}
            >
              <rect x="12" y="26" width="28" height="68" rx="14" fill="#C9A96E" opacity="0.2"/>
              <rect x="14" y="28" width="24" height="64" rx="12" fill="#C9A96E" opacity="0.4"/>
              <rect x="18" y="12" width="16" height="18" rx="3" fill="#1C1C1C"/>
              <ellipse cx="26" cy="12" rx="9" ry="9" fill="#0A0A0A"/>
              <rect x="16" y="54" width="20" height="0.5" fill="#C9A96E" opacity="0.5"/>
              <text x="26" y="74" textAnchor="middle" fill="#8A6F3E" fontSize="6" fontFamily="DM Sans" letterSpacing="2">AK</text>
            </motion.svg>
            <motion.div
              animate={{ x: hovered ? '200%' : '-100%', opacity: hovered ? 1 : 0 }}
              transition={{ duration: 0.6 }}
              style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, transparent 40%, rgba(201,169,110,0.1) 50%, transparent 60%)', pointerEvents: 'none' }}
            />
            {p.badge && (
              <div style={{ position: 'absolute', top: '12px', right: '12px', background: badgeBg, color: badgeColor, border: p.badge === 'bestseller' || p.badge === 'akpremium' ? 'none' : '0.5px solid rgba(201,169,110,0.3)', fontFamily: "'DM Sans', sans-serif", fontSize: '0.5625rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', padding: '3px 8px', borderRadius: '1px' }}>
                {badgeLabel}
              </div>
            )}
          </div>
          <div style={{ padding: '16px 18px 18px' }}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.5625rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(10,10,10,0.35)', marginBottom: '5px' }}>{p.type}</div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.375rem', fontWeight: 400, letterSpacing: '-0.01em', color: '#0A0A0A', lineHeight: 1.1, marginBottom: '3px' }}>
              {lang === 'ar' ? p.nameAr : p.nameEn}
            </div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.5625rem', color: 'rgba(10,10,10,0.3)', letterSpacing: '0.04em', marginBottom: '14px' }}>{p.inspired}</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.25rem', fontWeight: 500, color: '#8A6F3E' }}>{p.price} JD</span>
              <motion.button
                whileHover={{ background: '#0A0A0A', color: '#F8F6F2' }}
                whileTap={{ scale: 0.95 }}
                onClick={e => e.preventDefault()}
                style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.5625rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', background: 'transparent', color: '#0A0A0A', border: '0.5px solid rgba(10,10,10,0.2)', borderRadius: '1px', padding: '7px 14px', cursor: 'pointer' }}
              >
                {t.products.addToCart[lang]}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function HomePage() {
  const { lang, isRTL } = useLang();
  const [loaded, setLoaded] = useState(false);
  const whyRef = useRef(null);
  const whyInView = useInView(whyRef, { once: true, margin: '-80px' });

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(timer);
  }, []);

  // ── Decorative lines data ──────────────────────────────────────────────────
  const decorLines = [
    { x1: '8%',  y1: '15%', x2: '8%',  y2: '35%', delay: 0.2 },
    { x1: '92%', y1: '20%', x2: '92%', y2: '40%', delay: 0.4 },
    { x1: '20%', y1: '70%', x2: '20%', y2: '88%', delay: 0.6 },
    { x1: '80%', y1: '60%', x2: '80%', y2: '80%', delay: 0.3 },
    { x1: '50%', y1: '80%', x2: '50%', y2: '95%', delay: 0.5 },
    { x1: '35%', y1: '10%', x2: '35%', y2: '25%', delay: 0.7 },
    { x1: '65%', y1: '75%', x2: '65%', y2: '90%', delay: 0.1 },
    { x1: '15%', y1: '45%', x2: '15%', y2: '60%', delay: 0.8 },
  ];

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} style={{ background: '#F8F6F2' }}>

      {/* ══ HERO ══ */}
      <section style={{ minHeight: '100vh', background: '#0A0A0A', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', marginTop: 'calc(var(--nav-h) * -1)', paddingTop: 'var(--nav-h)', textAlign: 'center' }}>

        {/* Animated background glow */}
        <motion.div
          animate={{ opacity: [0.4, 0.9, 0.4], scale: [1, 1.15, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 70% 50% at 50% 30%, rgba(201,169,110,0.08) 0%, transparent 65%)' }}
        />

        {/* Second glow layer */}
        <motion.div
          animate={{ opacity: [0.2, 0.5, 0.2], scale: [1.1, 1, 1.1] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 50% 40% at 30% 60%, rgba(201,169,110,0.05) 0%, transparent 70%)' }}
        />

        {/* Side lines */}
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: '6%', width: '0.5px', background: 'linear-gradient(180deg,transparent,rgba(201,169,110,0.08),transparent)', pointerEvents: 'none' }}/>
        <div style={{ position: 'absolute', top: 0, bottom: 0, right: '6%', width: '0.5px', background: 'linear-gradient(180deg,transparent,rgba(201,169,110,0.08),transparent)', pointerEvents: 'none' }}/>

        {/* Decorative floating lines — بديل النقاط */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} xmlns="http://www.w3.org/2000/svg">
          {decorLines.map((line, i) => (
            <motion.line
              key={i}
              x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
              stroke="#C9A96E"
              strokeWidth="0.5"
              strokeLinecap="round"
              initial={{ opacity: 0, pathLength: 0 }}
              animate={{
                opacity: [0, 0.35, 0.1, 0.35, 0],
                y: [0, -15, 0],
              }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Infinity,
                delay: line.delay,
                ease: 'easeInOut',
              }}
            />
          ))}
        </svg>

        {/* Corner diamonds */}
        {[
          { top: '12%', left: '12%' },
          { top: '12%', right: '12%' },
          { bottom: '18%', left: '18%' },
          { bottom: '18%', right: '18%' },
        ].map((pos, i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.1, 0.4, 0.1], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 3 + i * 0.6, repeat: Infinity, delay: i * 0.5, ease: 'easeInOut' }}
            style={{ position: 'absolute', width: '4px', height: '4px', background: '#C9A96E', transform: 'rotate(45deg)', pointerEvents: 'none', ...pos }}
          />
        ))}

        <div style={{ position: 'relative', zIndex: 2, padding: '3rem var(--site-px) 6rem' }}>

          {/* Brand mark — Glow Pulse */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginBottom: '2.5rem' }}
          >
            {/* Glow pulse ring behind text */}
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <motion.div
                animate={{ opacity: [0, 0.15, 0], scale: [0.8, 1.3, 0.8] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                style={{ position: 'absolute', inset: '-20px', background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(201,169,110,0.4) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none', zIndex: 0 }}
              />
              <motion.div
                animate={{
                  textShadow: [
                    '0 0 0px rgba(201,169,110,0)',
                    '0 0 30px rgba(201,169,110,0.25), 0 0 60px rgba(201,169,110,0.1)',
                    '0 0 0px rgba(201,169,110,0)',
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.5rem,7vw,5rem)', fontWeight: 300, letterSpacing: '0.12em', color: '#F8F6F2', lineHeight: 1, marginBottom: '10px', position: 'relative', zIndex: 1 }}
              >
                AK PERFUMES
              </motion.div>
            </div>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={loaded ? { scaleX: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.6 }}
              style={{ width: '100%', height: '0.5px', background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.6), transparent)', marginBottom: '10px', transformOrigin: 'center' }}
            />

            <motion.div
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.32em', textTransform: 'uppercase', color: '#C9A96E' }}
            >
              {t.common.defineYourself[lang]}
            </motion.div>
          </motion.div>

          {/* Divider diamond */}
          <motion.div
            initial={{ opacity: 0 }} animate={loaded ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', maxWidth: '200px', margin: '0 auto 2.5rem' }}
          >
            <motion.div
              animate={{ scaleX: [0.3, 1, 0.3], opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              style={{ flex: 1, height: '0.5px', background: 'rgba(201,169,110,0.5)', transformOrigin: 'right' }}
            />
            <motion.div
              animate={{ rotate: [45, 90, 45], scale: [1, 1.3, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              style={{ width: '5px', height: '5px', background: '#C9A96E', flexShrink: 0 }}
            />
            <motion.div
              animate={{ scaleX: [0.3, 1, 0.3], opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              style={{ flex: 1, height: '0.5px', background: 'rgba(201,169,110,0.5)', transformOrigin: 'left' }}
            />
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 300, lineHeight: 1.1, letterSpacing: '-0.03em', color: '#F8F6F2', marginBottom: '1rem' }}
          >
            {t.home.heroTitle[lang]}{' '}
            <em style={{ fontStyle: 'italic', color: '#C9A96E' }}>{t.home.heroAccent[lang]}</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }} animate={loaded ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.6 }}
            style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.875rem', fontWeight: 300, color: 'rgba(248,246,242,0.4)', lineHeight: 1.8, maxWidth: '500px', margin: '0 auto 2rem' }}
          >
            {t.home.heroSub[lang]}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link href="/products" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', background: '#C9A96E', color: '#0A0A0A', padding: '13px 28px', borderRadius: '1px', textDecoration: 'none', display: 'inline-block' }}>
                {t.home.exploreBtn[lang]}
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link href="/about" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', background: 'transparent', color: '#F8F6F2', padding: '12px 28px', borderRadius: '1px', border: '0.5px solid rgba(248,246,242,0.18)', textDecoration: 'none', display: 'inline-block' }}>
                {t.home.storyBtn[lang]}
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: '3rem', justifyContent: 'center', marginTop: '3.5rem' }}>
            {[
              { n: 50,   suffix: '+', label: t.home.stat1[lang] },
              { n: 1000, suffix: '+', label: t.home.stat2[lang] },
              { n: 100,  suffix: '%', label: t.home.stat3[lang] },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={loaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1 + i * 0.15 }}
                style={{ textAlign: 'center' }}
              >
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.75rem', fontWeight: 400, color: '#C9A96E', lineHeight: 1 }}>
                  <Counter target={s.n} suffix={s.suffix} />
                </div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.5625rem', fontWeight: 400, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(248,246,242,0.25)', marginTop: '5px' }}>{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }} animate={loaded ? { opacity: 0.45 } : {}}
          transition={{ duration: 0.7, delay: 1.6 }}
          style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', zIndex: 3, pointerEvents: 'none' }}
        >
          <motion.div
            animate={{ height: ['36px', '18px', '36px'], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ width: '0.5px', background: 'linear-gradient(180deg, #C9A96E, transparent)' }}
          />
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.5rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#F8F6F2' }}>scroll</div>
        </motion.div>
      </section>

      {/* ══ TICKER ══ */}
      <div style={{ background: '#0A0A0A', borderBottom: '0.5px solid rgba(201,169,110,0.1)', padding: '11px 0', overflow: 'hidden' }}>
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
          style={{ display: 'flex', whiteSpace: 'nowrap' }}
        >
          {Array(8).fill(null).map((_, i) => (
            <span key={i} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.5625rem', fontWeight: 400, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(201,169,110,0.35)', paddingInlineEnd: '3rem' }}>
              AK PERFUMES ✦ DEFINE YOURSELF ✦ AUTHENTIC FRAGRANCES ✦ MADE IN JORDAN ✦ PREMIUM QUALITY ✦ &nbsp;
            </span>
          ))}
        </motion.div>
      </div>

      {/* ══ PRODUCTS ══ */}
      <section style={{ background: '#F8F6F2', paddingBlock: 'clamp(5rem,10vw,8rem)' }}>
        <div className="site-container">
          <Reveal variants={fadeUp} delay={0}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <div style={{ width: '40px', height: '0.5px', background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.5))' }}/>
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }} style={{ width: '4px', height: '4px', background: '#C9A96E' }}/>
                <div style={{ width: '40px', height: '0.5px', background: 'linear-gradient(90deg, rgba(201,169,110,0.5), transparent)' }}/>
              </div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8A6F3E', marginBottom: '0.75rem' }}>{t.home.featuredLabel[lang]}</p>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 300, letterSpacing: '-0.025em', color: '#0A0A0A' }}>{t.home.featuredTitle[lang]}</h2>
            </div>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px', marginBottom: '2.5rem' }}>
            {sampleProducts.map((p, i) => <ProductCard key={p.id} p={p} i={i} />)}
          </div>

          <Reveal variants={fadeUp} delay={0.1}>
            <div style={{ textAlign: 'center' }}>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} style={{ display: 'inline-block' }}>
                <Link href="/products" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', background: 'transparent', color: '#0A0A0A', padding: '13px 32px', borderRadius: '1px', border: '0.5px solid rgba(10,10,10,0.2)', textDecoration: 'none', display: 'inline-block' }}>
                  {t.home.viewAll[lang]}
                </Link>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ BRAND STORY ══ */}
      <section style={{ background: '#F0EDE8', borderTop: '0.5px solid rgba(10,10,10,0.06)', borderBottom: '0.5px solid rgba(10,10,10,0.06)', paddingBlock: 'clamp(4rem,8vw,7rem)' }}>
        <div className="site-container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
            <Reveal variants={slideLeft} delay={0}>
              <div style={{ width: '36px', height: '0.5px', background: 'linear-gradient(90deg, #C9A96E, transparent)', marginBottom: '1.5rem' }}/>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8A6F3E', marginBottom: '1rem' }}>{t.home.aboutLabel[lang]}</p>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem,4vw,3.25rem)', fontWeight: 300, letterSpacing: '-0.03em', color: '#0A0A0A', lineHeight: 1, marginBottom: '1.25rem' }}>
                <em style={{ fontStyle: 'italic', color: '#8A6F3E' }}>{t.home.defineTitle[lang]}</em><br />Yourself
              </h2>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.9375rem', fontWeight: 300, color: 'rgba(10,10,10,0.5)', lineHeight: 1.85, maxWidth: '380px', marginBottom: '2rem' }}>
                {t.home.defineBody[lang]}
              </p>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} style={{ display: 'inline-block' }}>
                <Link href="/about" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', background: 'transparent', color: '#0A0A0A', padding: '12px 28px', borderRadius: '1px', border: '0.5px solid rgba(10,10,10,0.2)', textDecoration: 'none', display: 'inline-block' }}>
                  {t.home.readStory[lang]}
                </Link>
              </motion.div>
            </Reveal>

            <Reveal variants={slideRight} delay={0.2}>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <motion.div
                  whileHover={{ y: -10, boxShadow: '0 36px 90px rgba(10,10,10,0.2)' }}
                  transition={{ duration: 0.4 }}
                  style={{ width: '220px', height: '300px', background: '#0A0A0A', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', boxShadow: '0 24px 64px rgba(10,10,10,0.15)' }}
                >
                  <motion.div
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 50% at 50% 30%, rgba(201,169,110,0.12) 0%, transparent 70%)', borderRadius: '4px' }}
                  />
                  <motion.svg
                    width="80" height="150" viewBox="0 0 80 150" fill="none"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <rect x="20" y="38" width="40" height="102" rx="20" fill="#C9A96E" opacity="0.15"/>
                    <rect x="22" y="40" width="36" height="98" rx="18" fill="#C9A96E" opacity="0.3"/>
                    <rect x="28" y="18" width="24" height="24" rx="4" fill="#1C1C1C"/>
                    <ellipse cx="40" cy="17" rx="13" ry="13" fill="#141414"/>
                    <rect x="26" y="82" width="28" height="0.5" fill="#C9A96E" opacity="0.4"/>
                    <text x="40" y="108" textAnchor="middle" fill="#C9A96E" fontSize="8" fontFamily="DM Sans" opacity="0.5" letterSpacing="3">AK</text>
                  </motion.svg>
                  <div style={{ position: 'absolute', top: '-1px', right: '-1px', width: '18px', height: '18px', borderTop: '1px solid #C9A96E', borderRight: '1px solid #C9A96E' }}/>
                  <div style={{ position: 'absolute', bottom: '-1px', left: '-1px', width: '18px', height: '18px', borderBottom: '1px solid #C9A96E', borderLeft: '1px solid #C9A96E' }}/>
                </motion.div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ WHY AK ══ */}
      <section style={{ background: '#FFFFFF', paddingBlock: 'clamp(4rem,8vw,7rem)' }}>
        <div className="site-container" ref={whyRef}>
          <motion.div initial="hidden" animate={whyInView ? 'visible' : 'hidden'} variants={fadeUp} style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8A6F3E', marginBottom: '0.75rem' }}>{t.home.whyLabel[lang]}</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 300, letterSpacing: '-0.025em', color: '#0A0A0A' }}>{t.home.whyTitle[lang]}</h2>
          </motion.div>

          <motion.div initial="hidden" animate={whyInView ? 'visible' : 'hidden'} variants={stagger} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'rgba(10,10,10,0.06)' }}>
            {[
              { icon: '✦', title: t.home.why1Title[lang], desc: t.home.why1Desc[lang] },
              { icon: '◈', title: t.home.why2Title[lang], desc: t.home.why2Desc[lang] },
              { icon: '◇', title: t.home.why3Title[lang], desc: t.home.why3Desc[lang] },
            ].map((f, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i * 0.1}
                whileHover={{ background: '#FAFAF8' }}
                style={{ background: '#FFFFFF', padding: 'clamp(2rem,4vw,3rem)', textAlign: 'center' }}
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.8, ease: 'easeInOut' }}
                  style={{ fontSize: '1.125rem', color: '#C9A96E', marginBottom: '1.25rem', opacity: 0.7 }}
                >
                  {f.icon}
                </motion.div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.375rem', fontWeight: 400, color: '#0A0A0A', marginBottom: '0.75rem' }}>{f.title}</h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8125rem', fontWeight: 300, color: 'rgba(10,10,10,0.45)', lineHeight: 1.75 }}>{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section style={{ background: '#0A0A0A', paddingBlock: 'clamp(4rem,8vw,6rem)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(201,169,110,0.06) 0%, transparent 70%)', pointerEvents: 'none' }}
        />
        <div className="site-container" style={{ position: 'relative', zIndex: 1 }}>
          <Reveal variants={fadeUp}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center', marginBottom: '2rem' }}>
              <div style={{ width: '50px', height: '0.5px', background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.3))' }}/>
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }} style={{ width: '4px', height: '4px', background: '#C9A96E' }}/>
              <div style={{ width: '50px', height: '0.5px', background: 'linear-gradient(90deg, rgba(201,169,110,0.3), transparent)' }}/>
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.5rem,5vw,4rem)', fontWeight: 300, letterSpacing: '-0.03em', color: '#F8F6F2', marginBottom: '1rem' }}>
              {t.home.ctaTitle[lang]}
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.875rem', fontWeight: 300, color: 'rgba(248,246,242,0.35)', marginBottom: '2.5rem' }}>
              {t.home.ctaSub[lang]}
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link href="/products" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', background: '#C9A96E', color: '#0A0A0A', padding: '13px 28px', borderRadius: '1px', textDecoration: 'none', display: 'inline-block' }}>
                  {t.home.shopNow[lang]}
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <a href="https://wa.me/962787304077" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', background: 'transparent', color: '#F8F6F2', padding: '12px 28px', borderRadius: '1px', border: '0.5px solid rgba(248,246,242,0.18)', textDecoration: 'none', display: 'inline-block' }}>
                  {t.home.whatsapp[lang]}
                </a>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer style={{ background: '#050505', borderTop: '0.5px solid rgba(201,169,110,0.08)', padding: '2.5rem 0' }}>
        <div className="site-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <motion.div whileHover={{ letterSpacing: '0.15em' }} transition={{ duration: 0.3 }} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.125rem', fontWeight: 400, letterSpacing: '0.1em', color: '#F8F6F2', display: 'flex', alignItems: 'center', gap: '6px' }}>
            AK
            <motion.span animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }} style={{ color: '#C9A96E', fontSize: '0.625rem', display: 'inline-block' }}>✦</motion.span>
            PERFUMES
          </motion.div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.5625rem', fontWeight: 400, letterSpacing: '0.12em', color: 'rgba(248,246,242,0.18)' }}>
            {t.home.footerCopy[lang]}
          </p>
        </div>
      </footer>
    </div>
  );
}