'use client';

import Link from 'next/link';

const values = [
  { icon: '✦', title: 'الجودة أولاً',    desc: 'نختار أفضل المكونات العالمية لنضمن تجربة عطرية لا تُنسى في كل زجاجة.' },
  { icon: '◈', title: 'أسعار عادلة',     desc: 'نؤمن أن الفخامة الحقيقية لا تحتاج سعراً خيالياً — جودة عالية بأسعار حقيقية.' },
  { icon: '◇', title: 'الأصالة والإبداع', desc: 'مستوحون من أشهر دور العطور العالمية، لكننا نضيف لمستنا الأردنية المميزة.' },
  { icon: '○', title: 'خدمة من القلب',   desc: 'كل عميل هو جزء من عائلة AK — نهتم بتجربتك قبل الشراء وبعده.' },
];

const milestones = [
  { year: '٢٠٢٢', event: 'بداية الرحلة — أول زجاجة عطر من مطبخنا الصغير في عمّان' },
  { year: '٢٠٢٣', event: 'إطلاق المجموعة الأولى رسمياً على إنستقرام بـ ١٠ عطور' },
  { year: '٢٠٢٤', event: 'تجاوزنا ١٠٠٠ عميل سعيد في كل أنحاء الأردن' },
  { year: '٢٠٢٥', event: 'إطلاق الموقع الرسمي ومجموعة جديدة من ٥٠+ عطراً فاخراً' },
];

export default function AboutPage() {
  return (
    <div dir="rtl" style={{ background: '#F8F6F2', minHeight: '100vh' }}>

      {/* ── Hero ── */}
      <section style={{ background: '#0A0A0A', paddingBlock: 'clamp(5rem,12vw,9rem)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 60% at 30% 50%, rgba(201,169,110,0.07) 0%, transparent 65%)', pointerEvents: 'none' }}/>
        <div style={{ position: 'absolute', top: 0, bottom: 0, right: '6%', width: '0.5px', background: 'linear-gradient(180deg,transparent,rgba(201,169,110,0.1),transparent)' }}/>

        <div className="site-container">
          <div style={{ maxWidth: '640px' }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.625rem', fontWeight: 500, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#8A6F3E', marginBottom: '1.25rem' }}>قصتنا</p>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(3rem,7vw,6rem)', fontWeight: 300, letterSpacing: '-0.04em', color: '#F8F6F2', lineHeight: 0.92, marginBottom: '1.5rem' }}>
              نحن AK<br /><em style={{ fontStyle: 'italic', color: '#C9A96E' }}>Perfumes</em>
            </h1>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1rem', fontWeight: 300, color: 'rgba(248,246,242,0.45)', lineHeight: 1.85, maxWidth: '480px' }}>
              علامة أردنية ولدت من شغف حقيقي بعالم العطور — نجمع بين أرقى المكونات العالمية وروح الأردن الأصيلة لنقدم لك تجربة عطرية لا مثيل لها.
            </p>
          </div>
        </div>
      </section>

      {/* ── Story ── */}
      <section style={{ background: '#FFFFFF', paddingBlock: 'clamp(4rem,8vw,7rem)' }}>
        <div className="site-container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(3rem,6vw,6rem)', alignItems: 'center' }}>

            {/* Text */}
            <div>
              <div style={{ width: '36px', height: '0.5px', background: 'linear-gradient(90deg, #C9A96E, transparent)', marginBottom: '1.5rem' }}/>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.625rem', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8A6F3E', marginBottom: '1rem' }}>كيف بدأنا</p>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.75rem,3.5vw,2.75rem)', fontWeight: 300, letterSpacing: '-0.025em', color: '#0A0A0A', lineHeight: 1.05, marginBottom: '1.5rem' }}>
                من هواية إلى<br /><em style={{ fontStyle: 'italic', color: '#8A6F3E' }}>علامة</em>
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.9375rem', fontWeight: 300, color: 'rgba(10,10,10,0.55)', lineHeight: 1.85 }}>
                  بدأت القصة في ٢٠٢٢ من غرفة صغيرة في عمّان، حين قرر مؤسسنا أن يحول شغفه بالعطور إلى مشروع حقيقي. كانت البداية بسيطة — عشر زجاجات، وحلم كبير.
                </p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.9375rem', fontWeight: 300, color: 'rgba(10,10,10,0.55)', lineHeight: 1.85 }}>
                  اليوم، نفخر بتقديم أكثر من ٥٠ عطراً فاخراً لآلاف العملاء في كل أنحاء الأردن، مع الحفاظ على نفس الشغف والاهتمام بالتفاصيل الذي بدأنا به.
                </p>
              </div>
            </div>

            {/* Visual */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: '280px', height: '380px', background: '#0A0A0A', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', boxShadow: '0 32px 80px rgba(10,10,10,0.12)' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 50% at 50% 30%, rgba(201,169,110,0.08) 0%, transparent 65%)' }}/>
                <svg width="100" height="200" viewBox="0 0 100 200" fill="none" style={{ animation: 'float 5s ease-in-out infinite', position: 'relative', zIndex: 1 }}>
                  <rect x="25" y="50" width="50" height="135" rx="25" fill="#C9A96E" opacity="0.15"/>
                  <rect x="28" y="53" width="44" height="129" rx="22" fill="#C9A96E" opacity="0.28"/>
                  <rect x="35" y="22" width="30" height="32" rx="5" fill="#1C1C1C"/>
                  <ellipse cx="50" cy="21" rx="18" ry="18" fill="#141414"/>
                  <ellipse cx="50" cy="21" rx="12" ry="12" fill="#0A0A0A"/>
                  <rect x="32" y="105" width="36" height="0.5" fill="#C9A96E" opacity="0.4"/>
                  <text x="50" y="140" textAnchor="middle" fill="#C9A96E" fontSize="10" fontFamily="DM Sans" opacity="0.5" letterSpacing="4">AK</text>
                </svg>
                <div style={{ position: 'absolute', top: '16px', left: '16px', width: '20px', height: '20px', borderTop: '1px solid rgba(201,169,110,0.35)', borderLeft: '1px solid rgba(201,169,110,0.35)' }}/>
                <div style={{ position: 'absolute', bottom: '16px', right: '16px', width: '20px', height: '20px', borderBottom: '1px solid rgba(201,169,110,0.35)', borderRight: '1px solid rgba(201,169,110,0.35)' }}/>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section style={{ background: '#F8F6F2', paddingBlock: 'clamp(4rem,8vw,7rem)' }}>
        <div className="site-container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.625rem', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8A6F3E', marginBottom: '0.75rem' }}>ما نؤمن به</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 300, letterSpacing: '-0.025em', color: '#0A0A0A' }}>قيمنا</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1px', background: 'rgba(10,10,10,0.07)' }}>
            {values.map((v, i) => (
              <div key={i} style={{ background: '#F8F6F2', padding: 'clamp(2rem,4vw,3rem)' }}>
                <div style={{ fontSize: '1.125rem', color: '#C9A96E', marginBottom: '1rem', opacity: 0.7 }}>{v.icon}</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', fontWeight: 400, color: '#0A0A0A', marginBottom: '0.75rem' }}>{v.title}</h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.875rem', fontWeight: 300, color: 'rgba(10,10,10,0.5)', lineHeight: 1.75 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section style={{ background: '#0A0A0A', paddingBlock: 'clamp(4rem,8vw,7rem)' }}>
        <div className="site-container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.625rem', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8A6F3E', marginBottom: '0.75rem' }}>رحلتنا</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 300, letterSpacing: '-0.025em', color: '#F8F6F2' }}>المحطات الكبرى</h2>
          </div>
          <div style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '0' }}>
            {milestones.map((m, i) => (
              <div key={i} style={{ display: 'flex', gap: '24px', paddingBottom: i < milestones.length - 1 ? '2.5rem' : '0', position: 'relative' }}>
                {/* Line */}
                {i < milestones.length - 1 && (
                  <div style={{ position: 'absolute', right: '35px', top: '32px', bottom: '0', width: '0.5px', background: 'linear-gradient(180deg, rgba(201,169,110,0.3), rgba(201,169,110,0.05))' }}/>
                )}
                {/* Year */}
                <div style={{ flexShrink: 0, width: '72px', textAlign: 'center' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#C9A96E', margin: '4px auto 8px', boxShadow: '0 0 12px rgba(201,169,110,0.4)' }}/>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem', fontWeight: 400, color: '#C9A96E' }}>{m.year}</div>
                </div>
                {/* Event */}
                <div style={{ flex: 1, paddingTop: '2px' }}>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.9375rem', fontWeight: 300, color: 'rgba(248,246,242,0.6)', lineHeight: 1.75 }}>{m.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section style={{ background: '#FFFFFF', paddingBlock: 'clamp(3rem,6vw,5rem)' }}>
        <div className="site-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'rgba(10,10,10,0.07)' }}>
            {[
              { n: '50+',  label: 'عطر فاخر في مجموعتنا' },
              { n: '1K+',  label: 'عميل سعيد في الأردن'  },
              { n: '100%', label: 'جودة مضمونة دائماً'   },
            ].map((s, i) => (
              <div key={i} style={{ background: '#FFFFFF', padding: 'clamp(2rem,4vw,3rem)', textAlign: 'center' }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.5rem,5vw,4rem)', fontWeight: 300, color: '#C9A96E', lineHeight: 1, marginBottom: '8px' }}>{s.n}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8125rem', fontWeight: 300, color: 'rgba(10,10,10,0.45)', letterSpacing: '0.04em' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: '#F8F6F2', paddingBlock: 'clamp(4rem,8vw,6rem)', textAlign: 'center' }}>
        <div className="site-container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center', marginBottom: '2rem' }}>
            <div style={{ width: '40px', height: '0.5px', background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.5))' }}/>
            <div style={{ width: '4px', height: '4px', background: '#C9A96E', transform: 'rotate(45deg)' }}/>
            <div style={{ width: '40px', height: '0.5px', background: 'linear-gradient(90deg, rgba(201,169,110,0.5), transparent)' }}/>
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 300, letterSpacing: '-0.025em', color: '#0A0A0A', marginBottom: '1rem' }}>
            اكتشف مجموعتنا
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.9375rem', fontWeight: 300, color: 'rgba(10,10,10,0.45)', marginBottom: '2rem' }}>
            أكثر من ٥٠ عطراً فاخراً بانتظارك
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/products" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', background: '#0A0A0A', color: '#F8F6F2', padding: '13px 28px', borderRadius: '1px', textDecoration: 'none' }}>تسوق الآن</Link>
            <Link href="/contact" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', background: 'transparent', color: '#0A0A0A', padding: '12px 28px', borderRadius: '1px', border: '0.5px solid rgba(10,10,10,0.2)', textDecoration: 'none' }}>تواصل معنا</Link>
          </div>
        </div>
      </section>
    </div>
  );
}