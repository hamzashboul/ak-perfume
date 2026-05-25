'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalItems, totalPrice } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen, mounted]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') closeCart(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [closeCart]);

  if (!mounted) return null;

  return (
    <>
      <div onClick={closeCart} style={{ position: 'fixed', inset: 0, zIndex: 60, background: 'rgba(10,10,10,0.6)', backdropFilter: 'blur(4px)', opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? 'all' : 'none', transition: 'opacity 350ms cubic-bezier(0.25,0.46,0.45,0.94)' }}/>

      <div dir="rtl" style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: 'min(420px, 100vw)', zIndex: 61, background: '#0A0A0A', borderLeft: '0.5px solid rgba(201,169,110,0.12)', display: 'flex', flexDirection: 'column', transform: isOpen ? 'translateX(0)' : 'translateX(100%)', transition: 'transform 400ms cubic-bezier(0.16,1,0.3,1)', boxShadow: isOpen ? '-24px 0 64px rgba(10,10,10,0.5)' : 'none' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: '0.5px solid rgba(201,169,110,0.1)', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.375rem', fontWeight: 400, color: '#F8F6F2' }}>السلة</div>
            {totalItems() > 0 && (
              <div style={{ background: '#C9A96E', color: '#0A0A0A', fontFamily: "'DM Sans', sans-serif", fontSize: '0.5625rem', fontWeight: 600, width: '20px', height: '20px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{totalItems()}</div>
            )}
          </div>
          <button onClick={closeCart} style={{ width: '36px', height: '36px', background: 'rgba(248,246,242,0.06)', border: 'none', borderRadius: '2px', cursor: 'pointer', color: '#F8F6F2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(248,246,242,0.1)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(248,246,242,0.06)')}
          >✕</button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 24px' }}>
          {items.length === 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '16px', paddingBottom: '4rem' }}>
              <div style={{ fontSize: '2rem', opacity: 0.2 }}>✦</div>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.25rem', fontWeight: 300, color: 'rgba(248,246,242,0.35)' }}>السلة فارغة</p>
              <button onClick={closeCart} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.625rem', fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase', background: 'transparent', color: '#C9A96E', border: '0.5px solid rgba(201,169,110,0.3)', borderRadius: '1px', padding: '9px 20px', cursor: 'pointer', marginTop: '8px' }}>تصفح المجموعة</button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {items.map((item, i) => (
                <div key={item.id} style={{ display: 'flex', gap: '14px', padding: '16px 0', borderBottom: i < items.length - 1 ? '0.5px solid rgba(201,169,110,0.08)' : 'none' }}>
                  <div style={{ width: '64px', height: '80px', flexShrink: 0, background: '#1C1C1C', borderRadius: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '0.5px solid rgba(201,169,110,0.1)' }}>
                    <svg width="24" height="48" viewBox="0 0 24 48" fill="none">
                      <rect x="5" y="12" width="14" height="32" rx="7" fill="#C9A96E" opacity="0.25"/>
                      <rect x="6" y="13" width="12" height="30" rx="6" fill="#C9A96E" opacity="0.4"/>
                      <rect x="8" y="5" width="8" height="9" rx="2" fill="#1C1C1C"/>
                      <ellipse cx="12" cy="5" rx="5" ry="5" fill="#0A0A0A"/>
                    </svg>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.0625rem', fontWeight: 400, color: '#F8F6F2', marginBottom: '3px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.5625rem', color: 'rgba(248,246,242,0.3)', marginBottom: '10px' }}>{item.inspired}</div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ width: '28px', height: '28px', background: 'rgba(248,246,242,0.06)', border: 'none', borderRadius: '2px 0 0 2px', color: '#F8F6F2', cursor: 'pointer', fontSize: '0.875rem' }}
                          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(248,246,242,0.12)')}
                          onMouseLeave={e => (e.currentTarget.style.background = 'rgba(248,246,242,0.06)')}
                        >−</button>
                        <div style={{ width: '32px', height: '28px', background: 'rgba(248,246,242,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', color: '#F8F6F2', borderTop: '0.5px solid rgba(248,246,242,0.08)', borderBottom: '0.5px solid rgba(248,246,242,0.08)' }}>{item.quantity}</div>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ width: '28px', height: '28px', background: 'rgba(248,246,242,0.06)', border: 'none', borderRadius: '0 2px 2px 0', color: '#F8F6F2', cursor: 'pointer', fontSize: '0.875rem' }}
                          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(248,246,242,0.12)')}
                          onMouseLeave={e => (e.currentTarget.style.background = 'rgba(248,246,242,0.06)')}
                        >+</button>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.0625rem', fontWeight: 500, color: '#C9A96E' }}>{(item.price * item.quantity).toFixed(2)} JD</span>
                        <button onClick={() => removeItem(item.id)} style={{ background: 'transparent', border: 'none', color: 'rgba(248,246,242,0.2)', cursor: 'pointer', fontSize: '0.75rem', padding: '4px' }}
                          onMouseEnter={e => (e.currentTarget.style.color = '#F8F6F2')}
                          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(248,246,242,0.2)')}
                        >✕</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div style={{ padding: '20px 24px', borderTop: '0.5px solid rgba(201,169,110,0.1)', flexShrink: 0, background: '#0A0A0A' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <div style={{ flex: 1, height: '0.5px', background: 'rgba(201,169,110,0.12)' }}/>
              <div style={{ width: '4px', height: '4px', background: '#C9A96E', transform: 'rotate(45deg)' }}/>
              <div style={{ flex: 1, height: '0.5px', background: 'rgba(201,169,110,0.12)' }}/>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '16px' }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(248,246,242,0.45)' }}>المجموع</span>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', fontWeight: 500, color: '#C9A96E' }}>{totalPrice().toFixed(2)} JD</span>
            </div>
            <Link href="/checkout" onClick={closeCart} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', padding: '14px', background: '#C9A96E', color: '#0A0A0A', fontFamily: "'DM Sans', sans-serif", fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none', borderRadius: '1px', marginBottom: '10px' }}>إتمام الطلب</Link>
            <a href={`https://wa.me/962000000000?text=${encodeURIComponent('مرحبا، أريد طلب:\n' + items.map(i => `- ${i.name} × ${i.quantity} = ${(i.price * i.quantity).toFixed(2)} JD`).join('\n') + `\nالمجموع: ${totalPrice().toFixed(2)} JD`)}`}
              target="_blank" rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', padding: '12px', background: 'transparent', color: 'rgba(248,246,242,0.55)', fontFamily: "'DM Sans', sans-serif", fontSize: '0.625rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', textDecoration: 'none', border: '0.5px solid rgba(248,246,242,0.1)', borderRadius: '1px' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(248,246,242,0.25)'; e.currentTarget.style.color = '#F8F6F2'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(248,246,242,0.1)'; e.currentTarget.style.color = 'rgba(248,246,242,0.55)'; }}
            >طلب عبر واتساب</a>
          </div>
        )}
      </div>
    </>
  );
}