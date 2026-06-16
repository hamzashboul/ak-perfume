'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';
import { useLang } from '@/lib/i18n/LangContext';
import { t } from '@/lib/i18n/translations';
import { getProductBySlug, getRelatedProducts } from '@/lib/supabase/queries';
import type { Product } from '@/lib/supabase/types';

export default function ProductDetailPage() {
  const params = useParams();
  const { lang, isRTL } = useLang();
  const slug = params.slug as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeNote, setActiveNote] = useState<'top' | 'heart' | 'base'>('top');
  const { addItem, openCart } = useCartStore();

  useEffect(() => {
    setLoading(true);
    getProductBySlug(slug).then(async (data) => {
      setProduct(data);
      if (data) {
        const rel = await getRelatedProducts(data.type, data.id);
        setRelated(rel);
      }
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', fontWeight: 300, color: 'rgba(10,10,10,0.4)' }}>...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', fontWeight: 300, color: '#0A0A0A' }}>
          {lang === 'ar' ? 'المنتج غير موجود' : 'Product not found'}
        </p>
        <Link href="/products" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#C9A96E', textDecoration: 'none' }}>
          ← {t.detail.backBtn[lang]}
        </Link>
      </div>
    );
  }

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) {
      addItem({
        id: product.id as unknown as number,
        name: product.name_ar,
        nameEn: product.name_en,
        price: product.price,
        type: product.type_label,
        inspired: product.inspired || '',
      });
    }
    setAdded(true);
    setTimeout(() => { setAdded(false); openCart(); }, 800);
  };

  const getBadgeLabel = () => {
    if (product.badge === 'bestseller') return t.products.bestseller[lang];
    if (product.badge === 'new') return t.products.new[lang];
    if (product.badge === 'premium') return t.products.premium[lang];
    return '';
  };

  const currentNotes = activeNote === 'top' ? product.top_notes : activeNote === 'heart' ? product.heart_notes : product.base_notes;

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} style={{ background: '#F8F6F2', minHeight: '100vh' }}>

      {/* Breadcrumb */}
      <div style={{ background: '#FFFFFF', borderBottom: '0.5px solid rgba(10,10,10,0.06)', padding: '12px 0' }}>
        <div className="site-container" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {[
            { href: '/',         label: t.detail.home[lang]        },
            { href: '/products', label: t.detail.collections[lang] },
            { href: '#',         label: lang === 'ar' ? product.name_ar : product.name_en },
          ].map((b, i, arr) => (
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

          {/* Image */}
          <div style={{ position: 'sticky', top: 'calc(var(--nav-h) + 2rem)' }}>
            <div style={{ background: '#0A0A0A', borderRadius: '4px', aspectRatio: '3/4', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', boxShadow: '0 32px 80px rgba(10,10,10,0.15)' }}>
              {product.image_url ? (
                <img src={product.image_url} alt={product.name_ar} style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'relative', zIndex: 1 }}/>
              ) : (
                <>
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
                </>
              )}
              <div style={{ position: 'absolute', top: '16px', right: '16px', width: '20px', height: '20px', borderTop: '1px solid rgba(201,169,110,0.4)', borderRight: '1px solid rgba(201,169,110,0.4)' }}/>
              <div style={{ position: 'absolute', bottom: '16px', left: '16px', width: '20px', height: '20px', borderBottom: '1px solid rgba(201,169,110,0.4)', borderLeft: '1px solid rgba(201,169,110,0.4)' }}/>
              {product.badge && (
                <div style={{ position: 'absolute', top: '16px', left: '16px', background: product.badge === 'premium' ? '#C9A96E' : product.badge === 'bestseller' ? '#F8F6F2' : 'rgba(201,169,110,0.15)', color: product.badge === 'premium' ? '#0A0A0A' : product.badge === 'bestseller' ? '#0A0A0A' : '#C9A96E', fontFamily: "'DM Sans', sans-serif", fontSize: '0.5625rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: '1px' }}>
                  {getBadgeLabel()}
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.625rem', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8A6F3E', marginBottom: '8px' }}>{product.type_label}</p>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 300, letterSpacing: '-0.025em', color: '#0A0A0A', lineHeight: 1, marginBottom: '6px' }}>
              {lang === 'ar' ? product.name_ar : product.name_en}
            </h1>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', fontWeight: 300, color: 'rgba(10,10,10,0.4)', marginBottom: '20px' }}>
              {lang === 'ar' ? product.name_en : product.name_ar} · {product.ml}ml
            </p>
            <div style={{ width: '36px', height: '0.5px', background: 'linear-gradient(90deg, #C9A96E, transparent)', marginBottom: '20px' }}/>

            {/* Price */}
            <div style={{ marginBottom: '24px' }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', fontWeight: 500, color: '#8A6F3E' }}>{product.price.toFixed(2)}</span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.875rem', color: 'rgba(10,10,10,0.4)', marginRight: '6px' }}>JD</span>
            </div>

            {/* Description */}
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.9375rem', fontWeight: 300, color: 'rgba(10,10,10,0.55)', lineHeight: 1.8, marginBottom: '28px' }}>
              {lang === 'ar' ? product.desc_ar : product.desc_en}
            </p>

            {/* Inspired by */}
            {product.inspired && (
              <div style={{ background: '#F0EDE8', borderRadius: '3px', padding: '12px 16px', marginBottom: '28px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ color: '#C9A96E', fontSize: '0.75rem' }}>✦</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6875rem', fontWeight: 300, color: 'rgba(10,10,10,0.5)', letterSpacing: '0.04em' }}>{product.inspired}</span>
              </div>
            )}

            {/* Scent Notes */}
            {(product.top_notes?.length > 0 || product.heart_notes?.length > 0 || product.base_notes?.length > 0) && (
              <div style={{ marginBottom: '28px' }}>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.625rem', fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(10,10,10,0.4)', marginBottom: '12px' }}>
                  {t.detail.scentNotes[lang]}
                </p>
                <div style={{ display: 'flex', gap: '6px', marginBottom: '12px' }}>
                  {(['top', 'heart', 'base'] as const).map(note => (
                    <button key={note} onClick={() => setActiveNote(note)} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.5625rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', background: activeNote === note ? '#0A0A0A' : 'transparent', color: activeNote === note ? '#F8F6F2' : 'rgba(10,10,10,0.4)', border: '0.5px solid', borderColor: activeNote === note ? '#0A0A0A' : 'rgba(10,10,10,0.12)', borderRadius: '1px', padding: '6px 14px', cursor: 'pointer', transition: 'all 200ms' }}>
                      {note === 'top' ? t.detail.topNotes[lang] : note === 'heart' ? t.detail.heartNotes[lang] : t.detail.baseNotes[lang]}
                    </button>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {currentNotes?.map(note => (
                    <span key={note} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6875rem', fontWeight: 400, background: 'rgba(201,169,110,0.1)', color: '#8A6F3E', border: '0.5px solid rgba(201,169,110,0.25)', borderRadius: '1px', padding: '5px 12px' }}>{note}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.625rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(10,10,10,0.4)' }}>
                {t.detail.quantity[lang]}
              </p>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ width: '32px', height: '32px', background: '#F0EDE8', border: 'none', borderRadius: '2px 0 0 2px', cursor: 'pointer', fontSize: '1rem', color: '#0A0A0A' }}>−</button>
                <div style={{ width: '40px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'DM Sans', sans-serif", fontSize: '0.875rem', color: '#0A0A0A', background: '#FFFFFF', border: '0.5px solid rgba(10,10,10,0.1)', borderRight: 'none', borderLeft: 'none' }}>{qty}</div>
                <button onClick={() => setQty(q => q + 1)} style={{ width: '32px', height: '32px', background: '#F0EDE8', border: 'none', borderRadius: '0 2px 2px 0', cursor: 'pointer', fontSize: '1rem', color: '#0A0A0A' }}>+</button>
              </div>
            </div>

            {/* Add to cart */}
            <button onClick={handleAdd} style={{ width: '100%', padding: '15px', background: added ? '#C9A96E' : '#0A0A0A', color: added ? '#0A0A0A' : '#F8F6F2', fontFamily: "'DM Sans', sans-serif", fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', border: 'none', borderRadius: '1px', cursor: 'pointer', marginBottom: '10px', transition: 'all 300ms cubic-bezier(0.16,1,0.3,1)' }}>
              {added ? t.detail.added[lang] : `${t.detail.addToCart[lang]} — ${(product.price * qty).toFixed(2)} JD`}
            </button>

            {/* WhatsApp */}
            <a href={`https://wa.me/962000000000?text=${encodeURIComponent(`${lang === 'ar' ? 'مرحبا، أريد طلب' : 'Hello, I want to order'}: ${lang === 'ar' ? product.name_ar : product.name_en} × ${qty} — ${(product.price * qty).toFixed(2)} JD`)}`}
              target="_blank" rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%', padding: '13px', background: 'transparent', color: 'rgba(10,10,10,0.5)', fontFamily: "'DM Sans', sans-serif", fontSize: '0.625rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', textDecoration: 'none', border: '0.5px solid rgba(10,10,10,0.15)', borderRadius: '1px' }}>
              {t.detail.whatsapp[lang]}
            </a>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section style={{ background: '#FFFFFF', borderTop: '0.5px solid rgba(10,10,10,0.06)', paddingBlock: 'clamp(3rem,6vw,5rem)' }}>
          <div className="site-container">
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.625rem', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8A6F3E', marginBottom: '8px' }}>{t.detail.related[lang]}</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.5rem,3vw,2.25rem)', fontWeight: 300, letterSpacing: '-0.02em', color: '#0A0A0A', marginBottom: '2rem' }}>{t.detail.similar[lang]}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              {related.map(p => (
                <Link key={p.id} href={`/products/${p.slug}`} style={{ textDecoration: 'none' }}>
                  <div style={{ background: '#F8F6F2', border: '0.5px solid rgba(10,10,10,0.07)', borderRadius: '4px', overflow: 'hidden', transition: 'transform 300ms, box-shadow 300ms' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 32px rgba(10,10,10,0.1)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'none'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}>
                    <div style={{ height: '140px', background: '#F0EDE8', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                      {p.image_url ? (
                        <img src={p.image_url} alt={p.name_ar} style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
                      ) : (
                        <svg width="36" height="72" viewBox="0 0 36 72" fill="none">
                          <rect x="8" y="18" width="20" height="48" rx="10" fill="#C9A96E" opacity="0.25"/>
                          <rect x="9" y="19" width="18" height="46" rx="9" fill="#C9A96E" opacity="0.4"/>
                          <rect x="12" y="8" width="12" height="12" rx="3" fill="#1C1C1C"/>
                          <ellipse cx="18" cy="8" rx="7" ry="7" fill="#0A0A0A"/>
                        </svg>
                      )}
                    </div>
                    <div style={{ padding: '12px 14px' }}>
                      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem', fontWeight: 400, color: '#0A0A0A', marginBottom: '4px' }}>
                        {lang === 'ar' ? p.name_ar : p.name_en}
                      </div>
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