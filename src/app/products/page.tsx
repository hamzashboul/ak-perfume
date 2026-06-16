'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { useLang } from '@/lib/i18n/LangContext';
import { t } from '@/lib/i18n/translations';
import { getProducts } from '@/lib/supabase/queries';
import type { Product } from '@/lib/supabase/types';

function ProductCard({ p }: { p: Product }) {
  const { lang } = useLang();
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);
  const { addItem } = useCartStore();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: p.id as unknown as number,
      name: p.name_ar,
      nameEn: p.name_en,
      price: p.price,
      type: p.type_label,
      inspired: p.inspired || '',
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const getBadgeLabel = () => {
    if (p.badge === 'bestseller') return t.products.bestseller[lang];
    if (p.badge === 'new') return t.products.new[lang];
    if (p.badge === 'premium') return t.products.premium[lang];
    return '';
  };

  return (
    <Link href={`/products/${p.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
      <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
        style={{ background: '#FFFFFF', border: '0.5px solid rgba(10,10,10,0.08)', borderRadius: '4px', overflow: 'hidden', cursor: 'pointer', height: '100%', transform: hovered ? 'translateY(-6px)' : 'translateY(0)', boxShadow: hovered ? '0 16px 48px rgba(10,10,10,0.12), 0 0 0 0.5px rgba(201,169,110,0.25)' : '0 1px 4px rgba(10,10,10,0.05)', transition: 'transform 400ms cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 400ms cubic-bezier(0.25,0.46,0.45,0.94)' }}>

        <div style={{ height: '200px', background: '#F0EDE8', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
          {p.image_url ? (
            <img src={p.image_url} alt={p.name_ar} style={{ width: '100%', height: '100%', objectFit: 'cover', transform: hovered ? 'scale(1.05)' : 'scale(1)', transition: 'transform 700ms' }}/>
          ) : (
            <svg width="48" height="96" viewBox="0 0 48 96" fill="none" style={{ transform: hovered ? 'scale(1.07) translateY(-4px)' : 'scale(1)', transition: 'transform 700ms cubic-bezier(0.25,0.46,0.45,0.94)', filter: 'drop-shadow(0 8px 16px rgba(10,10,10,0.1))' }}>
              <rect x="11" y="24" width="26" height="62" rx="13" fill="#C9A96E" opacity="0.2"/>
              <rect x="13" y="26" width="22" height="58" rx="11" fill="#C9A96E" opacity="0.4"/>
              <rect x="17" y="10" width="14" height="16" rx="3" fill="#1C1C1C"/>
              <ellipse cx="24" cy="10" rx="8" ry="8" fill="#0A0A0A"/>
              <rect x="15" y="50" width="18" height="0.5" fill="#C9A96E" opacity="0.5"/>
              <text x="24" y="68" textAnchor="middle" fill="#8A6F3E" fontSize="5" fontFamily="DM Sans" letterSpacing="2">AK</text>
            </svg>
          )}
          {p.badge && (
            <div style={{ position: 'absolute', top: '10px', right: '10px', background: p.badge === 'bestseller' ? '#0A0A0A' : p.badge === 'premium' ? '#C9A96E' : 'rgba(201,169,110,0.12)', color: p.badge === 'bestseller' ? '#F8F6F2' : p.badge === 'premium' ? '#0A0A0A' : '#8A6F3E', border: p.badge === 'bestseller' || p.badge === 'premium' ? 'none' : '0.5px solid rgba(201,169,110,0.3)', fontFamily: "'DM Sans', sans-serif", fontSize: '0.5rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '3px 8px', borderRadius: '1px' }}>
              {getBadgeLabel()}
            </div>
          )}
          <div style={{ position: 'absolute', bottom: '10px', left: '10px', fontFamily: "'DM Sans', sans-serif", fontSize: '0.5rem', fontWeight: 500, color: 'rgba(10,10,10,0.3)' }}>{p.ml}ml</div>
        </div>

        <div style={{ padding: '14px 16px 16px' }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.5rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(10,10,10,0.3)', marginBottom: '4px' }}>{p.type_label}</div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.25rem', fontWeight: 400, letterSpacing: '-0.01em', color: '#0A0A0A', lineHeight: 1.1, marginBottom: '3px' }}>{lang === 'ar' ? p.name_ar : p.name_en}</div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.5rem', color: 'rgba(10,10,10,0.28)', letterSpacing: '0.03em', marginBottom: '12px' }}>{p.inspired}</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.125rem', fontWeight: 500, color: '#8A6F3E' }}>{p.price.toFixed(2)} JD</span>
            <button onClick={handleAdd} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.5rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', background: added ? '#C9A96E' : hovered ? '#0A0A0A' : 'transparent', color: added ? '#0A0A0A' : hovered ? '#F8F6F2' : '#0A0A0A', border: '0.5px solid rgba(10,10,10,0.15)', borderRadius: '1px', padding: '6px 12px', cursor: 'pointer', transition: 'all 250ms' }}>
              {added ? `✓ ${t.products.added[lang]}` : t.products.addToCart[lang]}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

function ProductSkeleton() {
  return (
    <div style={{ background: '#FFFFFF', border: '0.5px solid rgba(10,10,10,0.08)', borderRadius: '4px', overflow: 'hidden' }}>
      <div style={{ height: '200px', background: 'linear-gradient(90deg, #F0EDE8 25%, #F8F6F2 50%, #F0EDE8 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite' }}/>
      <div style={{ padding: '14px 16px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ height: '10px', width: '60%', background: '#F0EDE8', borderRadius: '2px' }}/>
        <div style={{ height: '20px', width: '80%', background: '#F0EDE8', borderRadius: '2px' }}/>
        <div style={{ height: '10px', width: '90%', background: '#F0EDE8', borderRadius: '2px' }}/>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  const { lang, isRTL } = useLang();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('default');
  const [priceMax, setPriceMax] = useState(20);

  useEffect(() => {
    getProducts().then(data => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  const categories = [
    { id: 'all',      label: t.products.all[lang]      },
    { id: 'oriental', label: t.products.oriental[lang] },
    { id: 'floral',   label: t.products.floral[lang]   },
    { id: 'woody',    label: t.products.woody[lang]    },
    { id: 'fresh',    label: t.products.fresh[lang]    },
  ];

  const sortOptions = [
    { id: 'default',    label: t.products.sortDefault[lang]   },
    { id: 'price-asc',  label: t.products.sortPriceLow[lang]  },
    { id: 'price-desc', label: t.products.sortPriceHigh[lang] },
    { id: 'name',       label: t.products.sortName[lang]      },
  ];

  const filtered = useMemo(() => {
    let result = [...products];
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(p =>
        p.name_ar.includes(q) || p.name_en.toLowerCase().includes(q) ||
        (p.inspired || '').toLowerCase().includes(q) || p.type_label.toLowerCase().includes(q)
      );
    }
    if (category !== 'all') result = result.filter(p => p.type === category);
    result = result.filter(p => p.price <= priceMax);
    switch (sort) {
      case 'price-asc':  result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'name':       result.sort((a, b) => a.name_ar.localeCompare(b.name_ar, 'ar')); break;
    }
    return result;
  }, [products, search, category, sort, priceMax]);

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} style={{ background: '#F8F6F2', minHeight: '100vh' }}>

      <div style={{ background: '#0A0A0A', paddingBlock: 'clamp(3rem,6vw,5rem)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 60% 80% at 50% 100%, rgba(201,169,110,0.07) 0%, transparent 70%)' }}/>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.625rem', fontWeight: 500, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#8A6F3E', marginBottom: '12px' }}>{t.products.pageLabel[lang]}</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.5rem,6vw,4.5rem)', fontWeight: 300, letterSpacing: '-0.03em', color: '#F8F6F2', lineHeight: 1 }}>{t.products.pageTitle[lang]}</h1>
        </div>
      </div>

      <div style={{ background: '#FFFFFF', borderBottom: '0.5px solid rgba(10,10,10,0.07)', padding: '16px 0', position: 'sticky', top: 'var(--nav-h)', zIndex: 10 }}>
        <div className="site-container">
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', flex: '1', minWidth: '200px' }}>
              <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder={t.products.searchPlaceholder[lang]}
                style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8125rem', color: '#0A0A0A', background: '#F8F6F2', border: '0.5px solid rgba(10,10,10,0.12)', borderRadius: '2px', padding: '9px 14px 9px 36px', width: '100%', outline: 'none' }}
                onFocus={e => (e.target.style.borderColor = '#C9A96E')}
                onBlur={e => (e.target.style.borderColor = 'rgba(10,10,10,0.12)')}/>
              <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(10,10,10,0.3)', fontSize: '0.875rem' }}>🔍</span>
            </div>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {categories.map(c => (
                <button key={c.id} onClick={() => setCategory(c.id)} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.5625rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', background: category === c.id ? '#0A0A0A' : 'transparent', color: category === c.id ? '#F8F6F2' : 'rgba(10,10,10,0.5)', border: '0.5px solid', borderColor: category === c.id ? '#0A0A0A' : 'rgba(10,10,10,0.15)', borderRadius: '1px', padding: '7px 14px', cursor: 'pointer', transition: 'all 200ms' }}>
                  {c.label}
                </button>
              ))}
            </div>
            <select value={sort} onChange={e => setSort(e.target.value)} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.5625rem', fontWeight: 500, color: '#0A0A0A', background: '#F8F6F2', border: '0.5px solid rgba(10,10,10,0.12)', borderRadius: '2px', padding: '8px 12px', outline: 'none', cursor: 'pointer' }}>
              {sortOptions.map(o => <option key={o.id} value={o.id}>{o.label}</option>)}
            </select>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.5625rem', fontWeight: 500, textTransform: 'uppercase', color: 'rgba(10,10,10,0.4)', whiteSpace: 'nowrap' }}>
                {t.products.priceUp[lang]} {priceMax} JD
              </span>
              <input type="range" min={5} max={20} step={1} value={priceMax} onChange={e => setPriceMax(Number(e.target.value))} style={{ accentColor: '#C9A96E', width: '80px', cursor: 'pointer' }}/>
            </div>
          </div>
        </div>
      </div>

      <div className="site-container" style={{ paddingTop: '2rem', paddingBottom: '1rem' }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6875rem', color: 'rgba(10,10,10,0.4)' }}>
          {loading ? '...' : `${filtered.length} ${t.products.count[lang]}`}
        </p>
      </div>

      <div className="site-container" style={{ paddingBottom: 'clamp(4rem,8vw,6rem)' }}>
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
            {Array(8).fill(null).map((_, i) => <ProductSkeleton key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <div style={{ fontSize: '2rem', opacity: 0.2, marginBottom: '16px' }}>✦</div>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', fontWeight: 300, color: 'rgba(10,10,10,0.4)' }}>{t.products.noResults[lang]}</p>
            <button onClick={() => { setSearch(''); setCategory('all'); setPriceMax(20); }} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.625rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', marginTop: '16px', background: 'transparent', color: '#C9A96E', border: '0.5px solid rgba(201,169,110,0.3)', borderRadius: '1px', padding: '8px 20px', cursor: 'pointer' }}>
              {t.products.reset[lang]}
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
            {filtered.map(p => <ProductCard key={p.id} p={p} />)}
          </div>
        )}
      </div>
    </div>
  );
}