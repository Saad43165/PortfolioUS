'use client'

import { useState, useEffect } from 'react'
import ThemeToggle from '@/components/ThemeToggle'

const NAV_LINKS = [
  { label: 'About',      href: '#about' },
  { label: 'Education',  href: '#education' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact',    href: '#contact' },
]

export default function Navbar({ name }: { name: string }) {
  const [scrolled, setScrolled]     = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [active, setActive]         = useState('home')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      // highlight active section
      const sections = ['home','about','education','projects','skills','experience','contact']
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 120) { setActive(id); break }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const firstName = name.split(' ')[0]

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '18px 48px',
        background: scrolled ? 'var(--nav-bg)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(24px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease',
      }}>
        {/* Logo */}
        <a href="#home" style={{
          fontFamily: 'var(--font-display)', fontSize: '1.5rem',
          fontWeight: 700, color: 'var(--text)', textDecoration: 'none',
          letterSpacing: '-0.02em', zIndex: 201,
          transition: 'opacity 0.3s ease',
        }}>
          {firstName}<span style={{ color: 'var(--accent)' }}>.</span>
        </a>

        {/* Desktop nav */}
        <div className="desktop-nav" style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          {NAV_LINKS.map(l => {
            const isActive = active === l.href.replace('#','')
            return (
              <a key={l.href} href={l.href} style={{
                color: isActive ? 'var(--accent2)' : 'var(--text2)',
                textDecoration: 'none',
                fontSize: '0.84rem', fontWeight: isActive ? 600 : 400,
                padding: '8px 14px', borderRadius: '8px',
                transition: 'all 0.25s ease',
                position: 'relative',
                background: isActive ? 'rgba(100,80,240,0.08)' : 'transparent',
              }}
              onMouseEnter={e => {
                const t = e.currentTarget
                if (!isActive) { t.style.color = 'var(--text)'; t.style.background = 'var(--surface)' }
              }}
              onMouseLeave={e => {
                const t = e.currentTarget
                if (!isActive) { t.style.color = 'var(--text2)'; t.style.background = 'transparent' }
              }}>
                {l.label}
              </a>
            )
          })}
          <div style={{ marginLeft: 16, marginRight: 8, display: 'flex', alignItems: 'center' }}>
            <ThemeToggle />
          </div>
          <a href="#contact" style={{
            marginLeft: 8,
            background: 'linear-gradient(135deg, var(--accent), var(--accent3))',
            color: 'white', padding: '9px 22px', borderRadius: 50,
            fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none',
            boxShadow: '0 4px 20px var(--glow)',
            transition: 'transform 0.25s ease, box-shadow 0.25s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = '0 8px 28px var(--glow)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 4px 20px var(--glow)'
          }}>
            Hire Me
          </a>
        </div>

        {/* Mobile toggle and menu button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div className="mobile-toggle-container" style={{ display: 'none', alignItems: 'center' }}>
            <ThemeToggle />
          </div>

          <button
            onClick={() => setMobileOpen(o => !o)}
            className="mobile-nav-toggle"
            aria-label="Toggle menu"
            style={{
              display: 'none', flexDirection: 'column',
              justifyContent: 'center', alignItems: 'center',
              gap: 5, width: 44, height: 44,
              background: 'var(--surface)', border: '1px solid var(--border2)',
              borderRadius: '10px', cursor: 'pointer', zIndex: 201, padding: 10,
            }}
          >
            <span style={{
              display: 'block', width: 20, height: 2,
              background: 'var(--text)', borderRadius: 2,
              transformOrigin: 'center',
              transition: 'transform 0.35s var(--ease), opacity 0.35s ease',
              transform: mobileOpen ? 'translateY(7px) rotate(45deg)' : 'none',
            }} />
            <span style={{
              display: 'block', width: 20, height: 2,
              background: 'var(--text)', borderRadius: 2,
              transition: 'opacity 0.2s ease',
              opacity: mobileOpen ? 0 : 1,
            }} />
            <span style={{
              display: 'block', width: 20, height: 2,
              background: 'var(--text)', borderRadius: 2,
              transformOrigin: 'center',
              transition: 'transform 0.35s var(--ease), opacity 0.35s ease',
              transform: mobileOpen ? 'translateY(-7px) rotate(-45deg)' : 'none',
            }} />
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen menu */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 190,
        background: 'var(--mobile-nav-bg)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: 6,
        opacity: mobileOpen ? 1 : 0,
        pointerEvents: mobileOpen ? 'all' : 'none',
        transition: 'opacity 0.4s var(--ease)',
      }}>
        {/* Decorative glow */}
        <div style={{
          position: 'absolute', width: 400, height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(100,80,240,0.15), transparent)',
          top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          pointerEvents: 'none',
        }} />

        {NAV_LINKS.map((l, i) => (
          <a
            key={l.href}
            href={l.href}
            onClick={() => setMobileOpen(false)}
            style={{
              color: active === l.href.replace('#','') ? 'var(--accent2)' : 'var(--text)',
              textDecoration: 'none',
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.8rem, 8vw, 2.4rem)',
              fontWeight: 600,
              padding: '10px 48px',
              borderRadius: '14px',
              letterSpacing: '-0.01em',
              transition: 'all 0.3s ease',
              transform: mobileOpen ? 'translateY(0)' : 'translateY(20px)',
              opacity: mobileOpen ? 1 : 0,
              transitionDelay: mobileOpen ? `${i * 60}ms` : '0ms',
              position: 'relative', zIndex: 1,
            }}
          >
            <span style={{
              fontSize: '0.7rem', fontFamily: 'var(--font-mono)',
              color: 'var(--accent)', marginRight: 8, verticalAlign: 'middle',
              letterSpacing: '0.1em',
            }}>0{i+1}.</span>
            {l.label}
          </a>
        ))}

        <a
          href="#contact"
          onClick={() => setMobileOpen(false)}
          style={{
            marginTop: 24,
            background: 'linear-gradient(135deg, var(--accent), var(--accent3))',
            color: 'white', padding: '14px 40px', borderRadius: '50px',
            fontSize: '1rem', fontWeight: 600, textDecoration: 'none',
            boxShadow: '0 8px 32px var(--glow)',
            transform: mobileOpen ? 'translateY(0)' : 'translateY(20px)',
            opacity: mobileOpen ? 1 : 0,
            transition: 'all 0.3s ease',
            transitionDelay: mobileOpen ? `${NAV_LINKS.length * 60}ms` : '0ms',
            position: 'relative', zIndex: 1,
          }}
        >
          Hire Me →
        </a>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-nav-toggle { display: flex !important; }
          .mobile-toggle-container { display: flex !important; }
          nav { padding: 14px 20px !important; }
        }
      `}</style>
    </>
  )
}
