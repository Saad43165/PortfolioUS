'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function LoginForm() {
  const router = useRouter()
  const params = useSearchParams()
  const [key, setKey] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [show, setShow] = useState(false)

  // If already authenticated, go straight to dashboard
  useEffect(() => {
    fetch('/api/admin/auth', { method: 'GET' })
      .then(r => { if (r.ok) router.replace('/admin/dashboard') })
      .catch(() => {})
  }, [router])

  const handleLogin = async () => {
    if (!key.trim()) { setError('Please enter the admin key.'); return }
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key }),
      })
      const json = await res.json()
      if (!res.ok) { setError(json.error || 'Login failed.'); setLoading(false); return }
      const dest = params.get('from') || '/admin/dashboard'
      router.replace(dest)
    } catch {
      setError('Network error. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 24,
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(100,80,240,0.12) 0%, transparent 65%)',
      }} />
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
        maskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, black, transparent)',
      }} />

      {/* Card */}
      <div style={{
        position: 'relative', zIndex: 1,
        background: 'var(--surface)',
        border: '1px solid var(--border2)',
        borderRadius: 28,
        padding: '52px 44px',
        width: '100%', maxWidth: 440,
        textAlign: 'center',
        boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(100,80,240,0.08)',
      }}>
        {/* Lock icon */}
        <div style={{
          width: 72, height: 72,
          background: 'linear-gradient(135deg, var(--accent), var(--accent3))',
          borderRadius: 20,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '2rem', margin: '0 auto 28px',
          boxShadow: '0 8px 32px var(--glow)',
        }}>🔐</div>

        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '2rem', fontWeight: 700,
          letterSpacing: '-0.02em',
          marginBottom: 8,
        }}>Admin Access</h1>

        <p style={{
          color: 'var(--text2)', fontSize: '0.88rem',
          marginBottom: 36, lineHeight: 1.7,
        }}>
          This area is restricted. Enter your admin secret key to continue.
        </p>

        {/* Input */}
        <div style={{ position: 'relative', marginBottom: 14 }}>
          <input
            type={show ? 'text' : 'password'}
            value={key}
            onChange={e => { setKey(e.target.value); setError('') }}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            placeholder="Enter admin key..."
            autoFocus
            style={{
              width: '100%',
              background: 'var(--bg3)',
              border: `1px solid ${error ? 'var(--danger)' : 'var(--border2)'}`,
              color: 'var(--text)',
              padding: '15px 52px 15px 20px',
              borderRadius: 50,
              fontSize: '0.95rem',
              fontFamily: 'var(--font-mono)',
              textAlign: 'center',
              letterSpacing: '0.08em',
              outline: 'none',
              transition: 'var(--transition)',
            }}
          />
          <button
            onClick={() => setShow(s => !s)}
            style={{
              position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)',
              background: 'none', border: 'none',
              color: 'var(--text3)', cursor: 'pointer', fontSize: '1.1rem',
              padding: 4,
            }}
          >
            {show ? '🙈' : '👁'}
          </button>
        </div>

        {/* Error */}
        <div style={{
          minHeight: 22, fontSize: '0.82rem',
          color: 'var(--danger)', marginBottom: 20,
        }}>
          {error}
        </div>

        {/* Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: '100%',
            background: loading
              ? 'var(--surface2)'
              : 'linear-gradient(135deg, var(--accent), var(--accent3))',
            color: 'white', border: 'none',
            padding: '15px 32px', borderRadius: 50,
            fontSize: '0.95rem', fontWeight: 600,
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'var(--transition)',
            boxShadow: loading ? 'none' : '0 8px 28px var(--glow)',
          }}
        >
          {loading ? 'Verifying...' : 'Access Dashboard →'}
        </button>

        {/* Back link */}
        <a href="/" style={{
          display: 'block', marginTop: 24,
          color: 'var(--text3)', fontSize: '0.8rem',
          textDecoration: 'none',
        }}>
          ← Back to Portfolio
        </a>

        <p style={{ marginTop: 20, fontSize: '0.72rem', color: 'var(--text3)' }}>
          Default key set in <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>.env.local</code>
        </p>
      </div>
    </div>
  )
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: 'var(--bg)' }} />}>
      <LoginForm />
    </Suspense>
  )
}
