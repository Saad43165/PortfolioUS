'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'

const NAV_ITEMS = [
  { label:'Overview',      icon:'📊', href:'/admin/dashboard' },
  { label:'Hero Page',     icon:'🏠', href:'/admin/dashboard/hero' },
  { label:'About',         icon:'👤', href:'/admin/dashboard/about' },
  { label:'Education',     icon:'🎓', href:'/admin/dashboard/education' },
  { label:'Projects',      icon:'💼', href:'/admin/dashboard/projects' },
  { label:'Skills',        icon:'⚡', href:'/admin/dashboard/skills' },
  { label:'Experience',    icon:'🏢', href:'/admin/dashboard/experience' },
  { label:'Contact',       icon:'📬', href:'/admin/dashboard/contact' },
  { label:'Stats',         icon:'📈', href:'/admin/dashboard/stats' },
  { label:'Supabase Setup',icon:'🔧', href:'/admin/dashboard/setup' },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="admin-sidebar" style={{
        width: collapsed ? 64 : 240,
        flexShrink: 0,
        background: 'var(--surface)',
        borderRight: '1px solid var(--border)',
        display: 'flex', flexDirection: 'column',
        position: 'sticky', top: 0, height: '100vh',
        overflowY: 'auto', overflowX: 'hidden',
        transition: 'width 0.35s var(--ease)',
        zIndex: 60,
      }}>
        {/* Logo + collapse */}
        <div style={{ padding: collapsed ? '20px 14px' : '22px 20px', borderBottom:'1px solid var(--border)', display:'flex', alignItems:'center', justifyContent: collapsed ? 'center' : 'space-between', flexShrink:0 }}>
          {!collapsed && (
            <span style={{ fontFamily:'var(--font-display)', fontSize:'1.1rem', fontWeight:700, color:'var(--text)', whiteSpace:'nowrap' }}>
              Admin<span style={{ color:'var(--accent)' }}>.</span>
            </span>
          )}
          <button onClick={() => setCollapsed(c => !c)} style={{ background:'var(--surface2)', border:'1px solid var(--border)', color:'var(--text2)', borderRadius:8, padding:'6px 10px', cursor:'pointer', fontSize:'0.85rem', flexShrink:0 }}>
            {collapsed ? '→' : '←'}
          </button>
        </div>

        {/* Nav */}
        <nav style={{ flex:1, padding:'12px 8px' }}>
          {!collapsed && (
            <div style={{ fontSize:'0.6rem', fontFamily:'var(--font-mono)', color:'var(--text3)', textTransform:'uppercase', letterSpacing:'0.18em', padding:'0 12px', marginBottom:8, marginTop:4 }}>
              Sections
            </div>
          )}
          {NAV_ITEMS.map(item => {
            const isActive = pathname === item.href
            return (
              <Link key={item.href} href={item.href} title={collapsed ? item.label : undefined} style={{
                display:'flex', alignItems:'center', gap:10,
                padding: collapsed ? '11px' : '10px 12px',
                borderRadius:10, marginBottom:2,
                color: isActive ? 'var(--accent2)' : 'var(--text2)',
                background: isActive ? 'rgba(100,80,240,0.12)' : 'transparent',
                textDecoration:'none', fontSize:'0.87rem',
                fontWeight: isActive ? 600 : 400,
                transition:'all 0.2s ease',
                justifyContent: collapsed ? 'center' : 'flex-start',
                border: isActive ? '1px solid rgba(100,80,240,0.2)' : '1px solid transparent',
              }} className="sidebar-link">
                <span style={{ fontSize:'1.05rem', flexShrink:0 }}>{item.icon}</span>
                {!collapsed && <span style={{ whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{item.label}</span>}
              </Link>
            )
          })}
        </nav>

        {!collapsed && (
          <div style={{ padding:'14px 20px', borderTop:'1px solid var(--border)', fontSize:'0.7rem', color:'var(--text3)', flexShrink:0, fontFamily:'var(--font-mono)' }}>
            portfolio-admin v2.0
          </div>
        )}
      </aside>

      {/* Mobile bottom nav */}
      <div className="admin-mobile-nav" style={{
        display: 'none',
        position: 'fixed', bottom:0, left:0, right:0, zIndex:200,
        background: 'var(--surface)',
        borderTop: '1px solid var(--border)',
        overflowX: 'auto',
        padding: '8px 4px',
        gap: 2,
      }}>
        {NAV_ITEMS.map(item => {
          const isActive = pathname === item.href
          return (
            <Link key={item.href} href={item.href} style={{
              display:'flex', flexDirection:'column', alignItems:'center', gap:3,
              padding:'8px 10px', borderRadius:10, flexShrink:0,
              color: isActive ? 'var(--accent2)' : 'var(--text3)',
              background: isActive ? 'rgba(100,80,240,0.1)' : 'transparent',
              textDecoration:'none', fontSize:'0.6rem', fontWeight: isActive ? 600 : 400,
              transition:'all 0.2s ease', minWidth:52,
            }}>
              <span style={{ fontSize:'1.2rem' }}>{item.icon}</span>
              <span style={{ whiteSpace:'nowrap' }}>{item.label.split(' ')[0]}</span>
            </Link>
          )
        })}
      </div>

      <style>{`
        .sidebar-link:hover { color:var(--text)!important; background:var(--surface2)!important; }
        @media(max-width:900px) {
          .admin-sidebar { display:none!important; }
          .admin-mobile-nav { display:flex!important; }
          /* push main content above mobile nav */
          .admin-main-content { padding-bottom:80px!important; }
        }
      `}</style>
    </>
  )
}
