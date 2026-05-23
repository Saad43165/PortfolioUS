import { getPortfolioData } from '@/lib/portfolio'
import Link from 'next/link'

export default async function AdminOverviewPage() {
  const data = await getPortfolioData()

  const statCards = [
    { icon:'💼', label:'Projects',   count: data.projects.length,                              href:'/admin/dashboard/projects',   color:'var(--accent)' },
    { icon:'⚡', label:'Skills',     count: data.skills.length,                                href:'/admin/dashboard/skills',     color:'var(--accent3)' },
    { icon:'🎓', label:'Education',  count: data.education.length,                             href:'/admin/dashboard/education',  color:'var(--gold)' },
    { icon:'🏢', label:'Experience', count: data.experience.length,                            href:'/admin/dashboard/experience', color:'var(--success)' },
    { icon:'✨', label:'Featured',   count: data.projects.filter(p => p.featured).length,      href:'/admin/dashboard/projects',   color:'#e879f9' },
    { icon:'📅', label:'Yrs Exp.',   count: data.stats.years_experience,                       href:'/admin/dashboard/stats',      color:'var(--accent4)' },
  ]

  const quickLinks = [
    { label:'🏠 Hero',       href:'/admin/dashboard/hero' },
    { label:'👤 About',      href:'/admin/dashboard/about' },
    { label:'💼 Projects',   href:'/admin/dashboard/projects' },
    { label:'⚡ Skills',     href:'/admin/dashboard/skills' },
    { label:'🎓 Education',  href:'/admin/dashboard/education' },
    { label:'🏢 Experience', href:'/admin/dashboard/experience' },
    { label:'📬 Contact',    href:'/admin/dashboard/contact' },
    { label:'📈 Stats',      href:'/admin/dashboard/stats' },
  ]

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom:36 }}>
        <h1 style={{ fontFamily:'var(--font-display)', fontSize:'2.2rem', fontWeight:700, letterSpacing:'-0.025em', marginBottom:6 }}>
          Dashboard Overview
        </h1>
        <p style={{ color:'var(--text2)', fontSize:'0.88rem' }}>
          Welcome back. Your portfolio is live — admin saves update it instantly.
        </p>
      </div>

      {/* Stat cards */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(160px, 1fr))', gap:14, marginBottom:32 }}>
        {statCards.map(card => (
          <Link key={card.label} href={card.href} style={{ textDecoration:'none' }}>
            <div className="overview-card" style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:'22px 18px', textAlign:'center', transition:'all 0.3s ease', cursor:'pointer' }}>
              <div style={{ fontSize:'1.6rem', marginBottom:8 }}>{card.icon}</div>
              <div style={{ fontFamily:'var(--font-display)', fontSize:'2rem', fontWeight:700, color:card.color, lineHeight:1, marginBottom:6 }}>{card.count}</div>
              <div style={{ fontSize:'0.7rem', color:'var(--text3)', textTransform:'uppercase', letterSpacing:'0.1em' }}>{card.label}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick links */}
      <div style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:28, marginBottom:24 }}>
        <div style={{ fontSize:'0.88rem', fontWeight:600, marginBottom:18, color:'var(--text)', display:'flex', alignItems:'center', gap:8, paddingBottom:14, borderBottom:'1px solid var(--border)' }}>
          🚀 Quick Edit
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(140px, 1fr))', gap:10 }}>
          {quickLinks.map(l => (
            <Link key={l.href} href={l.href} className="quick-link" style={{ background:'var(--surface2)', border:'1px solid var(--border)', color:'var(--text2)', padding:'11px 14px', borderRadius:'var(--radius-sm)', fontSize:'0.83rem', fontWeight:500, textDecoration:'none', transition:'all 0.25s ease', display:'block', textAlign:'center' }}>
              {l.label}
            </Link>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div style={{ background:'linear-gradient(135deg, rgba(100,80,240,0.06), rgba(217,70,239,0.04))', border:'1px solid var(--border2)', borderRadius:'var(--radius)', padding:24 }}>
        <div style={{ fontWeight:600, marginBottom:10, color:'var(--accent2)', display:'flex', alignItems:'center', gap:8 }}>
          💡 How saves work
        </div>
        <p style={{ color:'var(--text2)', fontSize:'0.87rem', lineHeight:1.8 }}>
          Every time you click <strong>Save Changes</strong>, data is written to Supabase and the portfolio cache is cleared instantly.
          Refresh your portfolio tab and you'll see changes immediately.
          No Supabase yet? Go to{' '}
          <Link href="/admin/dashboard/setup" style={{ color:'var(--accent2)' }}>Setup</Link>
          {' '}for full instructions.
        </p>
      </div>

      <style>{`
        .overview-card:hover { border-color:var(--border2)!important; transform:translateY(-3px)!important; box-shadow:0 8px 24px rgba(0,0,0,0.2)!important; }
        .quick-link:hover { border-color:var(--border2)!important; color:var(--text)!important; background:var(--surface3)!important; }
      `}</style>
    </div>
  )
}
