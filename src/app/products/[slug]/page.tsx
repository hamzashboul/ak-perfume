'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';

// ─── Data ─────────────────────────────────────────────────────────────────────
const allProducts = [
  { id: 1,  slug: 'oud-al-muluk',      name: 'عود الملوك',     nameEn: 'Oud Al Muluk',      type: 'oriental', typeLabel: 'Oriental · Woody',   price: 12.99, inspired: 'Inspired by Baccarat Rouge 540',  badge: 'New',        ml: 50,  topNotes: ['زعفران', 'جهة'], heartNotes: ['عود', 'أرز'], baseNotes: ['مسك', 'أمبر'],    desc: 'عطر شرقي فاخر يجمع بين دفء العود وعمق الزعفران، مستوحى من أشهر عطور العالم.' },
  { id: 2,  slug: 'zahr-al-yasmin',    name: 'زهر الياسمين',  nameEn: 'Zahr Al Yasmin',    type: 'floral',   typeLabel: 'Floral · Fresh',     price: 14.99, inspired: 'Inspired by La Vie Est Belle',    badge: 'Bestseller', ml: 50,  topNotes: ['كمثرى', 'كشمش'], heartNotes: ['آيريس', 'ياسمين'], baseNotes: ['بتشولي', 'فانيليا'], desc: 'عطر زهري رقيق يحتفي بجمال الياسمين وعذوبة الكمثرى في توليفة راقية ومميزة.' },
  { id: 3,  slug: 'musk-al-layl',      name: 'مسك الليل',     nameEn: 'Musk Al Layl',      type: 'woody',    typeLabel: 'Woody · Amber',      price: 11.99, inspired: 'Inspired by Bleu de Chanel',     badge: '',           ml: 50,  topNotes: ['ليمون', 'نعناع'], heartNotes: ['زنجبيل', 'جوزة'], baseNotes: ['أرز', 'صندل'],    desc: 'عطر خشبي عصري يمزج بين النضارة والعمق في تجربة شمية فريدة لا تُنسى.' },
  { id: 4,  slug: 'ghaith-al-sahra',   name: 'غيث الصحراء',   nameEn: 'Ghaith Al Sahra',   type: 'fresh',    typeLabel: 'Fresh · Citrus',     price: 13.99, inspired: 'Inspired by Aventus',             badge: '',           ml: 50,  topNotes: ['أناناس', 'برغموت'], heartNotes: ['بتولا', 'ياسمين'], baseNotes: ['مسك', 'عنبر'],   desc: 'عطر منعش وجريء يأخذك في رحلة عبر الصحراء بعد المطر، طازج وقوي.' },
  { id: 5,  slug: 'layla',             name: 'ليلى',           nameEn: 'Layla',             type: 'floral',   typeLabel: 'Floral · Oriental',  price: 15.99, inspired: 'Inspired by Black Opium',         badge: 'New',        ml: 100, topNotes: ['قهوة', 'برتقال'], heartNotes: ['ياسمين', 'فانيليا'], baseNotes: ['خشب', 'مسك'],   desc: 'عطر شرقي زهري دافئ بلمسة قهوة ساحرة تجعله لا يُقاوم في ليالي الشتاء.' },
  { id: 6,  slug: 'amber-al-sharq',    name: 'أمبر الشرق',    nameEn: 'Amber Al Sharq',    type: 'oriental', typeLabel: 'Oriental · Amber',   price: 16.99, inspired: 'Inspired by Ambre Nuit',          badge: '',           ml: 100, topNotes: ['توت', 'برغموت'], heartNotes: ['أمبر', 'عود'],   baseNotes: ['مسك', 'صندل'],    desc: 'عطر أمبر شرقي فاخر مستوحى من ليالي الشرق، يجمع بين الدفء والأناقة.' },
  { id: 7,  slug: 'sihr-al-bahr',      name: 'سحر البحر',     nameEn: 'Sihr Al Bahr',      type: 'fresh',    typeLabel: 'Fresh · Marine',     price: 10.99, inspired: 'Inspired by Acqua di Gio',        badge: '',           ml: 50,  topNotes: ['بحر', 'ليمون'],  heartNotes: ['نعناع', 'إكليل'], baseNotes: ['مسك', 'خشب'],    desc: 'عطر بحري منعش يحاكي نسيم البحر الأبيض المتوسط بنقائه ووضوحه المطلق.' },
  { id: 8,  slug: 'wardat-dimashq',    name: 'وردة دمشق',     nameEn: 'Wardat Dimashq',    type: 'floral',   typeLabel: 'Floral · Rose',      price: 17.99, inspired: 'Inspired by Miss Dior',           badge: 'Bestseller', ml: 100, topNotes: ['برغموت', 'ليمون'], heartNotes: ['وردة', 'فاوانيا'], baseNotes: ['مسك أبيض', 'خشب'], desc: 'عطر وردي رقيق يجسد جمال وردة دمشق الشهيرة في توليفة أنثوية راقية.' },
  { id: 9,  slug: 'thelal-al-sandal',  name: 'ظلال الصندل',   nameEn: 'Thelal Al Sandal',  type: 'woody',    typeLabel: 'Woody · Sandalwood', price: 13.99, inspired: 'Inspired by Tam Dao',             badge: '',           ml: 50,  topNotes: ['فلفل', 'برغموت'], heartNotes: ['صندل', 'عرعر'], baseNotes: ['مسك', 'كريمة'],   desc: 'عطر خشبي هادئ مبني على قلب الصندل الأملس، يمنحك شعوراً بالهدوء والتوازن.' },
  { id: 10, slug: 'nabdat-al-lemon',   name: 'نبضات الليمون', nameEn: 'Nabdat Al Lemon',   type: 'fresh',    typeLabel: 'Fresh · Citrus',     price: 9.99,  inspired: 'Inspired by Acqua di Parma',      badge: '',           ml: 50,  topNotes: ['ليمون', 'برتقال'], heartNotes: ['إكليل', 'فلفل'], baseNotes: ['خشب', 'مسك'],    desc: 'عطر حمضي حيوي يشعل طاقتك ويمنحك انتعاشاً دائماً، مثالي للاستخدام اليومي.' },
  { id: 11, slug: 'fajr-al-musk',      name: 'فجر المسك',     nameEn: 'Fajr Al Musk',      type: 'oriental', typeLabel: 'Oriental · Musk',    price: 14.99, inspired: 'Inspired by Musk Tahara',         badge: '',           ml: 100, topNotes: ['مسك أبيض', 'ورد'], heartNotes: ['عود', 'فانيليا'], baseNotes: ['أمبر', 'صندل'],  desc: 'عطر مسكي شرقي نقي يفوح بعطر الفجر وبياض الصباح، رقيق وعميق في آنٍ واحد.' },
  { id: 12, slug: 'asrar-al-oud',      name: 'أسرار العود',   nameEn: 'Asrar Al Oud',      type: 'oriental', typeLabel: 'Oriental · Oud',     price: 19.99, inspired: 'Inspired by Oud Wood TF',         badge: 'Premium',    ml: 100, topNotes: ['فلفل', 'زعفران'], heartNotes: ['عود', 'صندل'],   baseNotes: ['أمبر', 'تبغ'],    desc: 'تحفة عطرية فاخرة تجسد عراقة العود في أرقى صوره، للمقتنين الحقيقيين.' },
];

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = allProducts.find(p => p.slug === slug);

  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeNote, setActiveNote] = useState<'top' | 'heart' | 'base'>('top');
  const { addItem, openCart } = useCartStore();

  if (!product) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', fontWeight: 300, color: '#0A0A0A' }}>المنتج غير موجود</p>
        <Link href="/products" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#C9A96E', textDecoration: 'none' }}>← العودة للمجموعة</Link>
      </div>
    );
  }

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) {
      addItem({ id: product.id, name: product.name, nameEn: product.nameEn, price: product.price, type: product.typeLabel, inspired: product.inspired });
    }
    setAdded(true);
    setTimeout(() => { setAdded(false); openCart(); }, 800);
  };

  const related = allProducts.filter(p => p.type === product.type && p.id !== product.id).slice(0, 3);

  return (
    <div dir="rtl" style={{ background: '#F8F6F2', minHeight: '100vh' }}>

      {/* Breadcrumb */}
      <div style={{ background: '#FFFFFF', borderBottom: '0.5px solid rgba(10,10,10,0.06)', padding: '12px 0' }}>
        <div className="site-container" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {[{ href: '/', label: 'الرئيسية' }, { href: '/products', label: 'المجموعات' }, { href: '#', label: product.name }].map((b, i, arr) => (
            <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Link href={b.href} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.5625rem', fontWeight: 400, letterSpacing: '0.1em', color: i === arr.length - 1 ? '#0A0A0A' : 'rgba(10,10,10,0.35)', textDecoration: 'none' }}>{b.label}</Link>
              {i < arr.length - 1 && <span style={{ color: 'rgba(10,10,10,0.2)', fontSize: '0.5rem' }}>←</span>}
            </span>
          ))}
        </div>
      </div>

      {/* Main */}
      <div className="site-container" style={{ paddingBlock: 'clamp(3rem,6vw,5rem)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(2rem,5vw,5rem)', alignItems: 'start' }}>

          {/* ── Image ── */}
          <div style={{ position: 'sticky', top: 'calc(var(--nav-h) + 2rem)' }}>
            <div style={{
              background: '#0A0A0A',
              borderRadius: '4px',
              aspectRatio: '3/4',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative', overflow: 'hidden',
              boxShadow: '0 32px 80px rgba(10,10,10,0.15)',
            }}>
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 50% at 50% 30%, rgba(201,169,110,0.08) 0%, transparent 70%)' }}/>
              <svg width="100" height="200" viewBox="0 0 100 200" fill="none" style={{ animation: 'float 5s ease-in-out infinite', position: 'relative', zIndex: 1 }}>
                <rect x="25" y="50" width="50" height="135" rx="25" fill="#C9A96E" opacity="0.15"/>
                <rect x="28" y="53" width="44" height="129" rx="22" fill="#C9A96E" opacity="0.3"/>
                <rect x="35" y="22" width="30" height="32" rx="5" fill="#1C1C1C"/>
                <ellipse cx="50" cy="21" rx="18" ry="18" fill="#141414"/>
                <ellipse cx="50" cy="21" rx="12" ry="12" fill="#0A0A0A"/>
                <rect x="32" y="105" width="36" height="0.5" fill="#C9A96E" opacity="0.4"/>
                <text x="50" y="140" textAnchor="middle" fill="#C9A96E" fontSize="10" fontFamily="DM Sans" opacity="0.5" letterSpacing="4">AK</text>
              </svg>

              {/* Corner accents */}
              <div style={{ position: 'absolute', top: '16px', right: '16px', width: '20px', height: '20px', borderTop: '1px solid rgba(201,169,110,0.4)', borderRight: '1px solid rgba(201,169,110,0.4)' }}/>
              <div style={{ position: 'absolute', bottom: '16px', left: '16px', width: '20px', height: '20px', borderBottom: '1px solid rgba(201,169,110,0.4)', borderLeft: '1px solid rgba(201,169,110,0.4)' }}/>

              {/* Badge */}
              {product.badge && (
                <div style={{
                  position: 'absolute', top: '16px', left: '16px',
                  background: product.badge === 'Premium' ? '#C9A96E' : product.badge === 'Bestseller' ? '#F8F6F2' : 'rgba(201,169,110,0.15)',
                  color: product.badge === 'Premium' ? '#0A0A0A' : product.badge === 'Bestseller' ? '#0A0A0A' : '#C9A96E',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.5625rem', fontWeight: 600, letterSpacing: '0.12em',
                  textTransform: 'uppercase', padding: '4px 10px', borderRadius: '1px',
                }}>{product.badge}</div>
              )}
            </div>
          </div>

          {/* ── Info ── */}
          <div>
            {/* Label */}
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.625rem', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8A6F3E', marginBottom: '8px' }}>{product.typeLabel}</p>

            {/* Name */}
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 300, letterSpacing: '-0.025em', color: '#0A0A0A', lineHeight: 1, marginBottom: '6px' }}>{product.name}</h1>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', fontWeight: 300, color: 'rgba(10,10,10,0.4)', marginBottom: '20px' }}>{product.nameEn} · {product.ml}ml</p>

            {/* Divider */}
            <div style={{ width: '36px', height: '0.5px', background: 'linear-gradient(90deg, #C9A96E, transparent)', marginBottom: '20px' }}/>

            {/* Price */}
            <div style={{ marginBottom: '24px' }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', fontWeight: 500, color: '#8A6F3E' }}>{product.price.toFixed(2)}</span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.875rem', color: 'rgba(10,10,10,0.4)', marginRight: '6px' }}>JD</span>
            </div>

            {/* Description */}
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.9375rem', fontWeight: 300, color: 'rgba(10,10,10,0.55)', lineHeight: 1.8, marginBottom: '28px' }}>{product.desc}</p>

            {/* Inspired by */}
            <div style={{ background: '#F0EDE8', borderRadius: '3px', padding: '12px 16px', marginBottom: '28px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ color: '#C9A96E', fontSize: '0.75rem' }}>✦</span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6875rem', fontWeight: 300, color: 'rgba(10,10,10,0.5)', letterSpacing: '0.04em' }}>{product.inspired}</span>
            </div>

            {/* Scent Notes */}
            <div style={{ marginBottom: '28px' }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.625rem', fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(10,10,10,0.4)', marginBottom: '12px' }}>نوتات العطر</p>
              <div style={{ display: 'flex', gap: '6px', marginBottom: '12px' }}>
                {(['top', 'heart', 'base'] as const).map(note => (
                  <button
                    key={note}
                    onClick={() => setActiveNote(note)}
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '0.5625rem', fontWeight: 500, letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      background: activeNote === note ? '#0A0A0A' : 'transparent',
                      color: activeNote === note ? '#F8F6F2' : 'rgba(10,10,10,0.4)',
                      border: '0.5px solid',
                      borderColor: activeNote === note ? '#0A0A0A' : 'rgba(10,10,10,0.12)',
                      borderRadius: '1px', padding: '6px 14px', cursor: 'pointer',
                      transition: 'all 200ms',
                    }}
                  >
                    {note === 'top' ? 'القمة' : note === 'heart' ? 'القلب' : 'القاعدة'}
                  </button>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {(activeNote === 'top' ? product.topNotes : activeNote === 'heart' ? product.heartNotes : product.baseNotes).map(note => (
                  <span key={note} style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.6875rem', fontWeight: 400,
                    background: 'rgba(201,169,110,0.1)',
                    color: '#8A6F3E',
                    border: '0.5px solid rgba(201,169,110,0.25)',
                    borderRadius: '1px', padding: '5px 12px',
                  }}>{note}</span>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.625rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(10,10,10,0.4)' }}>الكمية</p>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ width: '32px', height: '32px', background: '#F0EDE8', border: 'none', borderRadius: '2px 0 0 2px', cursor: 'pointer', fontSize: '1rem', color: '#0A0A0A', transition: 'background 150ms' }}>−</button>
                <div style={{ width: '40px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'DM Sans', sans-serif", fontSize: '0.875rem', color: '#0A0A0A', background: '#FFFFFF', border: '0.5px solid rgba(10,10,10,0.1)', borderRight: 'none', borderLeft: 'none' }}>{qty}</div>
                <button onClick={() => setQty(q => q + 1)} style={{ width: '32px', height: '32px', background: '#F0EDE8', border: 'none', borderRadius: '0 2px 2px 0', cursor: 'pointer', fontSize: '1rem', color: '#0A0A0A', transition: 'background 150ms' }}>+</button>
              </div>
            </div>

            {/* Add to cart */}
            <button
              onClick={handleAdd}
              style={{
                width: '100%', padding: '15px',
                background: added ? '#C9A96E' : '#0A0A0A',
                color: added ? '#0A0A0A' : '#F8F6F2',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.18em',
                textTransform: 'uppercase', border: 'none', borderRadius: '1px',
                cursor: 'pointer', marginBottom: '10px',
                transition: 'all 300ms cubic-bezier(0.16,1,0.3,1)',
              }}
            >
              {added ? '✓ أُضيف للسلة' : `أضف للسلة — ${(product.price * qty).toFixed(2)} JD`}
            </button>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/962000000000?text=${encodeURIComponent(`مرحبا، أريد طلب: ${product.name} × ${qty} — ${(product.price * qty).toFixed(2)} JD`)}`}
              target="_blank" rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                width: '100%', padding: '13px',
                background: 'transparent', color: 'rgba(10,10,10,0.5)',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.625rem', fontWeight: 500, letterSpacing: '0.14em',
                textTransform: 'uppercase', textDecoration: 'none',
                border: '0.5px solid rgba(10,10,10,0.15)', borderRadius: '1px',
                transition: 'all 200ms',
              }}
            >طلب عبر واتساب</a>
          </div>
        </div>
      </div>

      {/* ── Related ── */}
      {related.length > 0 && (
        <section style={{ background: '#FFFFFF', borderTop: '0.5px solid rgba(10,10,10,0.06)', paddingBlock: 'clamp(3rem,6vw,5rem)' }}>
          <div className="site-container">
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.625rem', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8A6F3E', marginBottom: '8px' }}>قد يعجبك أيضاً</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.5rem,3vw,2.25rem)', fontWeight: 300, letterSpacing: '-0.02em', color: '#0A0A0A', marginBottom: '2rem' }}>منتجات مشابهة</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              {related.map(p => (
                <Link key={p.id} href={`/products/${p.slug}`} style={{ textDecoration: 'none' }}>
                  <div style={{ background: '#F8F6F2', border: '0.5px solid rgba(10,10,10,0.07)', borderRadius: '4px', overflow: 'hidden', transition: 'transform 300ms, box-shadow 300ms' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 32px rgba(10,10,10,0.1)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'none'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
                  >
                    <div style={{ height: '140px', background: '#F0EDE8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="36" height="72" viewBox="0 0 36 72" fill="none">
                        <rect x="8" y="18" width="20" height="48" rx="10" fill="#C9A96E" opacity="0.25"/>
                        <rect x="9" y="19" width="18" height="46" rx="9" fill="#C9A96E" opacity="0.4"/>
                        <rect x="12" y="8" width="12" height="12" rx="3" fill="#1C1C1C"/>
                        <ellipse cx="18" cy="8" rx="7" ry="7" fill="#0A0A0A"/>
                      </svg>
                    </div>
                    <div style={{ padding: '12px 14px' }}>
                      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem', fontWeight: 400, color: '#0A0A0A', marginBottom: '4px' }}>{p.name}</div>
                      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.9375rem', fontWeight: 500, color: '#8A6F3E' }}>{p.price.toFixed(2)} JD</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}