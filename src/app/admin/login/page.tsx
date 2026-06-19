'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const supabase = createClient();
    const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password });

    if (authError) {
      setError('البريد الإلكتروني أو كلمة المرور غير صحيحة');
      setLoading(false);
      return;
    }

    const { data: adminCheck } = await supabase
      .from('admin_users')
      .select('email')
      .eq('email', data.user.email ?? '')
      .single();

    if (!adminCheck) {
      await supabase.auth.signOut();
      setError('هذا الحساب غير مصرّح له بالدخول كأدمن');
      setLoading(false);
      return;
    }

    router.push('/admin/dashboard');
  };

  return (
    <div dir="rtl" style={{ minHeight: '100vh', background: '#0A0A0A', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>

      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,169,110,0.06) 0%, transparent 70%)', pointerEvents: 'none' }}/>

      <div style={{ width: '100%', maxWidth: '380px', padding: '2rem' }}>

        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.75rem', fontWeight: 400, letterSpacing: '0.1em', color: '#F8F6F2', marginBottom: '6px' }}>
            AK <span style={{ color: '#C9A96E' }}>✦</span> PERFUMES
          </div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(201,169,110,0.6)' }}>
            لوحة التحكم
          </p>
        </div>

        <form onSubmit={handleLogin} style={{ background: '#1C1C1C', border: '0.5px solid rgba(201,169,110,0.12)', borderRadius: '4px', padding: '2rem' }}>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.625rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(248,246,242,0.45)', display: 'block', marginBottom: '8px' }}>
              البريد الإلكتروني
            </label>
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)} required
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.9375rem', color: '#F8F6F2', background: '#0A0A0A', border: '0.5px solid rgba(201,169,110,0.15)', borderRadius: '2px', padding: '12px 16px', width: '100%', outline: 'none' }}
              onFocus={e => (e.target.style.borderColor = '#C9A96E')}
              onBlur={e => (e.target.style.borderColor = 'rgba(201,169,110,0.15)')}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.625rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(248,246,242,0.45)', display: 'block', marginBottom: '8px' }}>
              كلمة المرور
            </label>
            <input
              type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••"
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.9375rem', color: '#F8F6F2', background: '#0A0A0A', border: '0.5px solid rgba(201,169,110,0.15)', borderRadius: '2px', padding: '12px 16px', width: '100%', outline: 'none' }}
              onFocus={e => (e.target.style.borderColor = '#C9A96E')}
              onBlur={e => (e.target.style.borderColor = 'rgba(201,169,110,0.15)')}
            />
          </div>

          {error && (
            <div style={{ background: 'rgba(229,62,62,0.1)', border: '0.5px solid rgba(229,62,62,0.3)', borderRadius: '2px', padding: '10px 14px', marginBottom: '20px' }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', color: '#FC8181' }}>{error}</p>
            </div>
          )}

          <button type="submit" disabled={loading}
            style={{ width: '100%', padding: '14px', background: loading ? 'rgba(201,169,110,0.5)' : '#C9A96E', color: '#0A0A0A', fontFamily: "'DM Sans', sans-serif", fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', border: 'none', borderRadius: '1px', cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 250ms' }}>
            {loading ? 'جاري الدخول...' : 'تسجيل الدخول'}
          </button>
        </form>

        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6875rem', fontWeight: 300, color: 'rgba(248,246,242,0.25)', textAlign: 'center', marginTop: '24px' }}>
          هذه الصفحة مخصصة لإدارة المتجر فقط
        </p>
      </div>
    </div>
  );
}