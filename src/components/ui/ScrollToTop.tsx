'use client'
import { useState, useEffect } from 'react'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      style={{
        position: 'fixed', bottom: 32, right: 32, zIndex: 150,
        width: 48, height: 48, borderRadius: '50%',
        background: 'linear-gradient(135deg, var(--accent), var(--accent3))',
        border: 'none', color: 'white',
        fontSize: '1.1rem', cursor: 'pointer',
        boxShadow: '0 8px 24px var(--glow)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.8)',
        transition: 'all 0.4s var(--ease)',
        pointerEvents: visible ? 'all' : 'none',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      ↑
    </button>
  )
}
