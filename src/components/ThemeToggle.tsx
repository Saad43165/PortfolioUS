'use client'

import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  useEffect(() => {
    setMounted(true)
    const currentTheme = document.documentElement.getAttribute('data-theme') as 'dark' | 'light' || 'dark'
    setTheme(currentTheme)
  }, [])

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.setAttribute('data-theme', nextTheme)
    localStorage.setItem('portfolio-theme', nextTheme)
    setTheme(nextTheme)
  }

  // To prevent any visual hydration mismatch, render a placeholder with identical layout dimensions
  if (!mounted) {
    return (
      <div style={{
        width: 64,
        height: 34,
        borderRadius: 50,
        background: 'var(--surface2)',
        border: '1px solid var(--border)',
        boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.1), 0 0 12px var(--glow)',
      }} />
    )
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      style={{
        background: 'var(--surface2)',
        border: '1px solid var(--border2)',
        borderRadius: 50,
        padding: 4,
        width: 64,
        height: 34,
        cursor: 'pointer',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'all 0.3s var(--ease)',
        boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.1), 0 0 12px var(--glow)',
        outline: 'none',
        flexShrink: 0,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'var(--accent)'
        e.currentTarget.style.transform = 'scale(1.05)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border2)'
        e.currentTarget.style.transform = 'scale(1)'
      }}
    >
      {/* Sliding knob */}
      <div style={{
        width: 24,
        height: 24,
        borderRadius: '50%',
        background: 'linear-gradient(135deg, var(--accent), var(--accent3))',
        position: 'absolute',
        left: theme === 'dark' ? 34 : 4,
        top: 4,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'left 0.35s cubic-bezier(0.16, 1, 0.3, 1), transform 0.35s ease',
        boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
      }}>
        {theme === 'dark' ? (
          // Moon icon
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        ) : (
          // Sun icon
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        )}
      </div>

      {/* Static icons in background */}
      <span style={{ fontSize: '0.8rem', marginLeft: 6, opacity: theme === 'light' ? 0.15 : 0.6, transition: 'opacity 0.25s ease', userSelect: 'none' }}>☀️</span>
      <span style={{ fontSize: '0.8rem', marginRight: 6, opacity: theme === 'dark' ? 0.15 : 0.6, transition: 'opacity 0.25s ease', userSelect: 'none' }}>🌙</span>
    </button>
  )
}
