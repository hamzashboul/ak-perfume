'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView, Variants } from 'framer-motion';
import { useLang } from '@/lib/i18n/LangContext';
import { t } from '@/lib/i18n/translations';

// ── Variants ──────────────────────────────────────────────────────────────────
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.8, delay: d, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }),
};
const slideLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: (d = 0) => ({ opacity: 1, x: 0, transition: { duration: 0.9, delay: d, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }),
};
const slideRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: (d = 0) => ({ opacity: 1, x: 0, transition: { duration: 0.9, delay: d, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }),
};
const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (d = 0) => ({ opacity: 1, scale: 1, transition: { duration: 0.7, delay: d, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }),
};
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

// ── Reveal wrapper ────────────────────────────────────────────────────────────
function Reveal({ children, variants = fadeUp, delay = 0 }: {
  children: React.ReactNode;
  variants?: Variants;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={variants} custom={delay}>
      {children}
    </motion.div>
  );
}

// ── Milestone Item ────────────────────────────────────────────────────────────
function MilestoneItem({ m, i, isLast, isRTL, lang }: {
  m: { year: string; yearAr: string; eventAr: string; eventEn: string };
  i: number;
  isLast: boolean;
  isRTL: boolean;
  lang: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      style={{ display: 'flex', gap: '24px', paddingBottom: !isLast ? '2.5rem' : '0', position: 'relative' }}
    >
      {!isLast && (
        <motion.div
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.6, delay: i * 0.15 + 0.3 }}
          style={{ position: 'absolute', right: '35px', top: '32px', bottom: '0', width: '0.5px', background: 'linear-gradient(180deg, rgba(201,169,110,0.3), rgba(201,169,110,0.05))', transformOrigin: 'top' }}
        />
      )}
      <div style={{ flexShrink: 0, width: '72px', textAlign: 'center' }}>
        <motion.div
          animate={{ boxShadow: ['0 0 8px rgba(201,169,110,0.3)', '0 0 20px rgba(201,169,110,0.6)', '0 0 8px rgba(201,169,110,0.3)'] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
          style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#C9A96E', margin: '4px auto 8px' }}
        />
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem', fontWeight: 400, color: '#C9A96E' }}>
          {lang === 'ar' ? m.yearAr : m.year}
        </div>
      </div>
      <div style={{ flex: 1, paddingTop: '2px' }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.9375rem', fontWeight: 300, color: 'rgba(248,246,242,0.6)', lineHeight: 1.75 }}>
          {lang === 'ar' ? m.eventAr : m.eventEn}
        </p>
      </div>
    </motion.div>
  );
}

// ── Data ──────────────────────────────────────────────────────────────────────
const milestones = [
  { year: '2022', yearAr: '٢٠٢٢', eventAr: 'بداية الرحلة — أول خطوة في عالم العطور، من فكرة صغيرة إلى علامة أردنية أصيلة', eventEn: 'The beginning — first steps into the world of fragrances, from a small idea to an authentic Jordanian brand' },
  { year: '2024', yearAr: '٢٠٢٤', eventAr: 'تجاوزنا ١٠٠٠ عميل سعيد في كل أنحاء الأردن', eventEn: 'Surpassed 1,000 happy customers across all of Jordan' },
  { year: '2026', yearAr: '٢٠٢٦', eventAr: 'تطوير البراند وإطلاق المتجر الإلكتروني لنكون أقرب لعائلة AK', eventEn: 'Brand development and launching our online store to be closer to the AK family' },
];

// ── Page ──────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  const { lang, isRTL } = useLang();

  const values = [
    { icon: '✦', title: t.about.v1Title[lang], desc: t.about.v1Desc[lang] },
    { icon: '◈', title: t.about.v2Title[lang], desc: t.about.v2Desc[lang] },
    { icon: '◇', title: t.about.v3Title[lang], desc: t.about.v3Desc[lang] },
    { icon: '○', title: t.about.v4Title[lang], desc: t.about.v4Desc[lang] },
  ];

  const stats = [
    { n: '50+',  labelAr: 'عطر فاخر في مجموعتنا',    labelEn: 'Luxury fragrances in our collection' },
    { n: '1K+',  labelAr: 'عميل سعيد في الأردن',      labelEn: 'Happy customers in Jordan'           },
    { n: '100%', labelAr: 'جودة مضمونة دائماً',       labelEn: 'Quality always guaranteed'           },
  ];

  const valuesRef = useRef(null);
  const valuesInView = useInView(valuesRef, { once: true, margin: '-80px' });
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: '-80px' });

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} style={{ background: '#F8F6F2', minHeight: '100vh' }}>

      {/* ══ HERO ══ */}
      <section style={{ background: '#0A0A0A', paddingBlock: 'clamp(5rem,12vw,9rem)', position: 'relative', overflow: 'hidden' }}>
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.1, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 60% at 30% 50%, rgba(201,169,110,0.07) 0%, transparent 65%)', pointerEvents: 'none' }}
        />
        <div style={{ position: 'absolute', top: 0, bottom: 0, right: '6%', width: '0.5px', background: 'linear-gradient(180deg,transparent,rgba(201,169,110,0.1),transparent)' }}/>
        <div className="site-container">
          <motion.div initial="hidden" animate="visible" variants={stagger} style={{ maxWidth: '640px' }}>
            <motion.p variants={fadeUp} custom={0} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.625rem', fontWeight: 500, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#8A6F3E', marginBottom: '1.25rem' }}>
              {t.about.label[lang]}
            </motion.p>
            <motion.h1 variants={fadeUp} custom={0.1} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(3rem,7vw,6rem)', fontWeight: 300, letterSpacing: '-0.04em', color: '#F8F6F2', lineHeight: 0.92, marginBottom: '1.5rem' }}>
              {t.about.title1[lang]}<br />
              <motion.em
                animate={{ textShadow: ['0 0 0px rgba(201,169,110,0)', '0 0 20px rgba(201,169,110,0.3)', '0 0 0px rgba(201,169,110,0)'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                style={{ fontStyle: 'italic', color: '#C9A96E' }}
              >
                Perfumes
              </motion.em>
            </motion.h1>
            <motion.p variants={fadeUp} custom={0.2} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1rem', fontWeight: 300, color: 'rgba(248,246,242,0.45)', lineHeight: 1.85, maxWidth: '480px' }}>
              {t.about.heroBody[lang]}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ══ STORY ══ */}
      <section style={{ background: '#FFFFFF', paddingBlock: 'clamp(4rem,8vw,7rem)' }}>
        <div className="site-container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(3rem,6vw,6rem)', alignItems: 'center' }}>
            <Reveal variants={slideLeft} delay={0}>
              <div style={{ width: '36px', height: '0.5px', background: 'linear-gradient(90deg, #C9A96E, transparent)', marginBottom: '1.5rem' }}/>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.625rem', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8A6F3E', marginBottom: '1rem' }}>{t.about.howLabel[lang]}</p>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.75rem,3.5vw,2.75rem)', fontWeight: 300, letterSpacing: '-0.025em', color: '#0A0A0A', lineHeight: 1.05, marginBottom: '1.5rem' }}>
                {lang === 'ar' ? <><span>من هواية إلى</span><br /><em style={{ fontStyle: 'italic', color: '#8A6F3E' }}>علامة</em></> : <><span>From Hobby to</span><br /><em style={{ fontStyle: 'italic', color: '#8A6F3E' }}>Brand</em></>}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.9375rem', fontWeight: 300, color: 'rgba(10,10,10,0.55)', lineHeight: 1.85 }}>{t.about.story1[lang]}</p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.9375rem', fontWeight: 300, color: 'rgba(10,10,10,0.55)', lineHeight: 1.85 }}>{t.about.story2[lang]}</p>
              </div>
            </Reveal>

            <Reveal variants={slideRight} delay={0.15}>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <motion.div
                  whileHover={{ y: -10, boxShadow: '0 40px 100px rgba(10,10,10,0.2)' }}
                  transition={{ duration: 0.4 }}
                  style={{ width: '280px', height: '380px', background: '#0A0A0A', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', boxShadow: '0 32px 80px rgba(10,10,10,0.12)' }}
                >
                  <motion.div
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 50% at 50% 30%, rgba(201,169,110,0.08) 0%, transparent 65%)', borderRadius: '4px' }}
                  />
                  <motion.svg width="100" height="200" viewBox="0 0 100 200" fill="none" animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} style={{ position: 'relative', zIndex: 1 }}>
                    <rect x="25" y="50" width="50" height="135" rx="25" fill="#C9A96E" opacity="0.15"/>
                    <rect x="28" y="53" width="44" height="129" rx="22" fill="#C9A96E" opacity="0.28"/>
                    <rect x="35" y="22" width="30" height="32" rx="5" fill="#1C1C1C"/>
                    <ellipse cx="50" cy="21" rx="18" ry="18" fill="#141414"/>
                    <ellipse cx="50" cy="21" rx="12" ry="12" fill="#0A0A0A"/>
                    <rect x="32" y="105" width="36" height="0.5" fill="#C9A96E" opacity="0.4"/>
                    <text x="50" y="140" textAnchor="middle" fill="#C9A96E" fontSize="10" fontFamily="DM Sans" opacity="0.5" letterSpacing="4">AK</text>
                  </motion.svg>
                  <div style={{ position: 'absolute', top: '16px', left: '16px', width: '20px', height: '20px', borderTop: '1px solid rgba(201,169,110,0.35)', borderLeft: '1px solid rgba(201,169,110,0.35)' }}/>
                  <div style={{ position: 'absolute', bottom: '16px', right: '16px', width: '20px', height: '20px', borderBottom: '1px solid rgba(201,169,110,0.35)', borderRight: '1px solid rgba(201,169,110,0.35)' }}/>
                </motion.div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ VALUES ══ */}
      <section style={{ background: '#F8F6F2', paddingBlock: 'clamp(4rem,8vw,7rem)' }}>
        <div className="site-container" ref={valuesRef}>
          <motion.div initial="hidden" animate={valuesInView ? 'visible' : 'hidden'} variants={fadeUp} style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.625rem', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8A6F3E', marginBottom: '0.75rem' }}>{t.about.valuesLabel[lang]}</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 300, letterSpacing: '-0.025em', color: '#0A0A0A' }}>{t.about.valuesTitle[lang]}</h2>
          </motion.div>
          <motion.div initial="hidden" animate={valuesInView ? 'visible' : 'hidden'} variants={stagger} style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1px', background: 'rgba(10,10,10,0.07)' }}>
            {values.map((v, i) => (
              <motion.div key={i} variants={fadeUp} custom={i * 0.1} whileHover={{ background: '#F5F2ED' }} style={{ background: '#F8F6F2', padding: 'clamp(2rem,4vw,3rem)' }}>
                <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }} transition={{ duration: 3, repeat: Infinity, delay: i * 0.6, ease: 'easeInOut' }} style={{ fontSize: '1.125rem', color: '#C9A96E', marginBottom: '1rem' }}>
                  {v.icon}
                </motion.div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', fontWeight: 400, color: '#0A0A0A', marginBottom: '0.75rem' }}>{v.title}</h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.875rem', fontWeight: 300, color: 'rgba(10,10,10,0.5)', lineHeight: 1.75 }}>{v.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══ TIMELINE ══ */}
      <section style={{ background: '#0A0A0A', paddingBlock: 'clamp(4rem,8vw,7rem)' }}>
        <div className="site-container">
          <Reveal variants={fadeUp}>
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.625rem', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8A6F3E', marginBottom: '0.75rem' }}>{t.about.milestonesLabel[lang]}</p>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 300, letterSpacing: '-0.025em', color: '#F8F6F2' }}>{t.about.milestonesTitle[lang]}</h2>
            </div>
          </Reveal>
          <div style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
            {milestones.map((m, i) => (
              <MilestoneItem key={i} m={m} i={i} isLast={i === milestones.length - 1} isRTL={isRTL} lang={lang} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ STATS ══ */}
      <section style={{ background: '#FFFFFF', paddingBlock: 'clamp(3rem,6vw,5rem)' }}>
        <div className="site-container" ref={statsRef}>
          <motion.div initial="hidden" animate={statsInView ? 'visible' : 'hidden'} variants={stagger} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'rgba(10,10,10,0.07)' }}>
            {stats.map((s, i) => (
              <motion.div key={i} variants={scaleIn} custom={i * 0.1} style={{ background: '#FFFFFF', padding: 'clamp(2rem,4vw,3rem)', textAlign: 'center' }}>
                <motion.div animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.5rem,5vw,4rem)', fontWeight: 300, color: '#C9A96E', lineHeight: 1, marginBottom: '8px' }}>
                  {s.n}
                </motion.div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8125rem', fontWeight: 300, color: 'rgba(10,10,10,0.45)', letterSpacing: '0.04em' }}>
                  {lang === 'ar' ? s.labelAr : s.labelEn}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section style={{ background: '#F8F6F2', paddingBlock: 'clamp(4rem,8vw,6rem)', textAlign: 'center' }}>
        <div className="site-container">
          <Reveal variants={fadeUp}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center', marginBottom: '2rem' }}>
              <div style={{ width: '40px', height: '0.5px', background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.5))' }}/>
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }} style={{ width: '4px', height: '4px', background: '#C9A96E' }}/>
              <div style={{ width: '40px', height: '0.5px', background: 'linear-gradient(90deg, rgba(201,169,110,0.5), transparent)' }}/>
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 300, letterSpacing: '-0.025em', color: '#0A0A0A', marginBottom: '1rem' }}>{t.about.ctaTitle[lang]}</h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.9375rem', fontWeight: 300, color: 'rgba(10,10,10,0.45)', marginBottom: '2rem' }}>{t.about.ctaSub[lang]}</p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link href="/products" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', background: '#0A0A0A', color: '#F8F6F2', padding: '13px 28px', borderRadius: '1px', textDecoration: 'none', display: 'inline-block' }}>
                  {t.about.shopNow[lang]}
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link href="/contact" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', background: 'transparent', color: '#0A0A0A', padding: '12px 28px', borderRadius: '1px', border: '0.5px solid rgba(10,10,10,0.2)', textDecoration: 'none', display: 'inline-block' }}>
                  {t.about.contactUs[lang]}
                </Link>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}