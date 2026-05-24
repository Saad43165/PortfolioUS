'use client'

import { useEffect, useRef } from 'react'
import type { HeroData, StatsData } from '@/types'

export default function HeroSection({ hero, stats }: { hero: HeroData; stats: StatsData }) {
  const firstName = hero.name.split(' ')[0]
  const lastName  = hero.name.split(' ').slice(1).join(' ')
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const getFileExtension = (url: string) => {
    if (!url) return 'pdf'
    if (url.startsWith('data:')) {
      const mime = url.split(';')[0].split(':')[1]
      if (mime === 'application/pdf') return 'pdf'
      if (mime === 'application/msword') return 'doc'
      if (mime === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') return 'docx'
      const part = mime.split('/')[1]
      return part === 'octet-stream' ? 'pdf' : part || 'pdf'
    }
    try {
      const cleanUrl = url.split('?')[0].split('#')[0]
      const ext = cleanUrl.substring(cleanUrl.lastIndexOf('.') + 1).toLowerCase()
      if (ext && ext.length <= 4) return ext
    } catch {}
    return 'pdf'
  }

  const cvExtension = getFileExtension(hero.cv_url)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let raf: number
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)
    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.4 + 0.3,
      dx: (Math.random() - 0.5) * 0.35,
      dy: (Math.random() - 0.5) * 0.35,
      o: Math.random() * 0.4 + 0.1,
    }))
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(155,143,247,${p.o})`; ctx.fill()
        p.x += p.dx; p.y += p.dy
        if (p.x < 0 || p.x > canvas.width)  p.dx *= -1
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1
      })
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  const statItems = [
    { num: `${stats.projects_completed}+`, label: 'Projects' },
    { num: `${stats.years_experience}+`,   label: 'Years Exp.' },
    { num: `${stats.happy_clients}+`,      label: 'Clients' },
    { num: stats.github_stars >= 1000 ? `${(stats.github_stars/1000).toFixed(1)}k` : String(stats.github_stars), label: 'Stars' },
  ]

  return (
    <section id="home" style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', position:'relative', overflow:'hidden', padding:'120px 40px 80px' }}>
      <canvas ref={canvasRef} style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none' }} />
      <div style={{ position:'absolute', inset:0, zIndex:0, background:`radial-gradient(ellipse 100% 80% at 50% -5%, rgba(100,80,240,0.28) 0%, transparent 55%), radial-gradient(ellipse 55% 50% at 88% 88%, rgba(217,70,239,0.13) 0%, transparent 50%), radial-gradient(ellipse 45% 45% at 8% 72%, rgba(6,182,212,0.09) 0%, transparent 50%), var(--bg)` }} />
      <div style={{ position:'absolute', inset:0, zIndex:0, backgroundImage:`linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)`, backgroundSize:'64px 64px', maskImage:'radial-gradient(ellipse 80% 70% at 50% 10%, black 0%, transparent 80%)', WebkitMaskImage:'radial-gradient(ellipse 80% 70% at 50% 10%, black 0%, transparent 80%)' }} />
      <div style={{ position:'absolute', width:360, height:360, borderRadius:'50%', background:'radial-gradient(circle, rgba(100,80,240,0.14), transparent)', top:'10%', right:'8%', zIndex:0, animation:'hFloat 9s ease-in-out infinite' }} />
      <div style={{ position:'absolute', width:240, height:240, borderRadius:'50%', background:'radial-gradient(circle, rgba(217,70,239,0.11), transparent)', bottom:'18%', left:'6%', zIndex:0, animation:'hFloat 11s ease-in-out infinite reverse' }} />

      <div style={{ position:'relative', zIndex:1, maxWidth:1000, width:'100%', textAlign:'center' }}>

        {/* Available badge */}
        {hero.available_for_work && (
          <div style={{ display:'inline-flex', alignItems:'center', gap:10, background:'rgba(16,185,129,0.07)', border:'1px solid rgba(16,185,129,0.28)', color:'#6ee7b7', fontSize:'0.75rem', fontWeight:600, fontFamily:'var(--font-mono)', padding:'9px 22px', borderRadius:'50px', marginBottom:32, letterSpacing:'0.1em', animation:'hFadeDown 0.8s var(--ease) both', boxShadow:'0 0 24px rgba(16,185,129,0.12)' }}>
            <span style={{ width:8, height:8, borderRadius:'50%', background:'#10b981', animation:'hPulse 2s ease infinite', display:'inline-block', boxShadow:'0 0 8px #10b981' }} />
            Available for new opportunities
          </div>
        )}

        {/* Avatar + Name layout */}
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:0 }}>
          {/* Avatar if set */}
          {hero.avatar_url && (
            <div style={{ animation:'hFadeDown 0.9s var(--ease) 0.05s both', marginBottom:28 }}>
              <div style={{ position:'relative', display:'inline-block' }}>
                <div style={{ position:'absolute', inset:-3, borderRadius:'50%', background:'linear-gradient(135deg, var(--accent), var(--accent3))', opacity:0.6, filter:'blur(6px)' }} />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={hero.avatar_url} alt={hero.name} style={{ width:100, height:100, borderRadius:'50%', objectFit:'cover', border:'3px solid var(--border2)', position:'relative', display:'block' }} />
              </div>
            </div>
          )}

          {/* Name */}
          <h1 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(3.2rem, 11vw, 8.5rem)', fontWeight:700, lineHeight:0.92, letterSpacing:'-0.04em', marginBottom:28 }}>
            <span style={{ display:'block', color:'var(--text)', animation:'hFadeUp 1s var(--ease) 0.1s both' }}>{firstName}</span>
            <span style={{ display:'block', background:'linear-gradient(135deg, var(--accent2) 0%, var(--accent3) 55%, #f472b6 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', animation:'hFadeUp 1s var(--ease) 0.2s both' }}>{lastName}</span>
          </h1>
        </div>

        <p style={{ fontSize:'clamp(1rem, 2.8vw, 1.4rem)', color:'var(--text2)', fontWeight:400, marginBottom:14, letterSpacing:'0.01em', animation:'hFadeUp 1s var(--ease) 0.3s both' }}>{hero.title}</p>
        <p style={{ fontSize:'clamp(0.88rem, 2vw, 1rem)', color:'var(--text3)', maxWidth:560, margin:'0 auto 52px', lineHeight:1.85, animation:'hFadeUp 1s var(--ease) 0.4s both' }}>{hero.subtitle}</p>

        <div style={{ display:'flex', gap:16, justifyContent:'center', flexWrap:'wrap', animation:'hFadeUp 1s var(--ease) 0.5s both' }}>
          <a href={hero.cta_primary_link} className="h-btn-primary" style={{ background:'linear-gradient(135deg, var(--accent), var(--accent3))', color:'white', padding:'16px 44px', borderRadius:'50px', fontSize:'0.95rem', fontWeight:600, textDecoration:'none', letterSpacing:'0.02em', boxShadow:'0 8px 32px var(--glow)', transition:'transform 0.3s var(--ease), box-shadow 0.3s var(--ease)', display:'inline-flex', alignItems:'center', gap:8 }}>
            {hero.cta_primary_text} →
          </a>
          <a href={hero.cta_secondary_link} className="h-btn-secondary" style={{ background:'transparent', color:'var(--text)', padding:'16px 44px', borderRadius:'50px', fontSize:'0.95rem', fontWeight:500, textDecoration:'none', border:'1px solid var(--border2)', letterSpacing:'0.02em', transition:'all 0.3s var(--ease)', backdropFilter:'blur(8px)' }}>
            {hero.cta_secondary_text}
          </a>
          {hero.cv_url && (
            <a 
              href={hero.cv_url} 
              download={`${hero.name.replace(/\s+/g, '_')}_CV.${cvExtension}`}
              target="_blank"
              rel="noopener noreferrer"
              className="h-btn-cv" 
              style={{ 
                background:'rgba(217,70,239,0.05)', 
                color:'var(--accent3)', 
                padding:'16px 44px', 
                borderRadius:'50px', 
                fontSize:'0.95rem', 
                fontWeight:600, 
                textDecoration:'none', 
                border:'1px dashed rgba(217,70,239,0.3)', 
                letterSpacing:'0.02em', 
                transition:'all 0.3s var(--ease)', 
                backdropFilter:'blur(8px)',
                display:'inline-flex',
                alignItems:'center',
                gap:8
              }}
            >
              ↓ Download CV
            </a>
          )}
        </div>

        {/* Stats */}
        <div className="hero-stats" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:1, background:'var(--border)', border:'1px solid var(--border)', borderRadius:'var(--radius)', overflow:'hidden', marginTop:72, animation:'hFadeUp 1s var(--ease) 0.65s both', boxShadow:'0 8px 40px rgba(0,0,0,0.3)' }}>
          {statItems.map((s,i) => (
            <div key={i} className="hero-stat" style={{ background:'var(--surface)', padding:'28px 16px', textAlign:'center', transition:'background 0.3s ease' }}>
              <div style={{ fontFamily:'var(--font-display)', fontSize:'clamp(1.5rem, 3.5vw, 2.2rem)', fontWeight:700, color:'var(--accent2)', lineHeight:1, marginBottom:8 }}>{s.num}</div>
              <div style={{ fontSize:'0.68rem', color:'var(--text3)', textTransform:'uppercase', letterSpacing:'0.12em' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div style={{ marginTop:52, display:'flex', flexDirection:'column', alignItems:'center', gap:8, animation:'hFadeUp 1s var(--ease) 0.8s both', opacity:0.5 }}>
          <span style={{ fontSize:'0.68rem', fontFamily:'var(--font-mono)', color:'var(--text3)', letterSpacing:'0.15em' }}>SCROLL</span>
          <div style={{ width:1, height:40, background:'linear-gradient(180deg, var(--accent2), transparent)', animation:'scrollLine 2s ease-in-out infinite' }} />
        </div>
      </div>

      <style>{`
        @keyframes hFloat   {0%,100%{transform:translateY(0)}50%{transform:translateY(-28px)}}
        @keyframes hPulse   {0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.5;transform:scale(0.7)}}
        @keyframes hFadeUp  {from{opacity:0;transform:translateY(36px)}to{opacity:1;transform:translateY(0)}}
        @keyframes hFadeDown{from{opacity:0;transform:translateY(-20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes scrollLine{0%{transform:scaleY(0);transform-origin:top}50%{transform:scaleY(1);transform-origin:top}51%{transform-origin:bottom}100%{transform:scaleY(0);transform-origin:bottom}}
        .h-btn-primary:hover {transform:translateY(-3px)!important;box-shadow:0 16px 48px var(--glow)!important}
        .h-btn-secondary:hover{background:var(--surface)!important;border-color:var(--accent)!important;transform:translateY(-3px)!important}
        .h-btn-cv:hover{background:rgba(217,70,239,0.12)!important;border-color:var(--accent3)!important;transform:translateY(-3px)!important;box-shadow:0 8px 24px rgba(217,70,239,0.15)!important}
        .hero-stat:hover{background:var(--surface2)!important}
        @media(max-width:768px){#home{padding:100px 20px 60px!important}.hero-stats{grid-template-columns:1fr 1fr!important;margin-top:48px!important}}
      `}</style>
    </section>
  )
}
