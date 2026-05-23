import { redirect } from 'next/navigation'
import { isAdminAuthenticated } from '@/lib/auth'
import AdminSidebar from '@/components/admin/AdminSidebar'

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const authed = await isAdminAuthenticated()
  if (!authed) redirect('/admin/login')

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>
      <AdminSidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Top bar */}
        <div style={{
          background: 'var(--surface)',
          borderBottom: '1px solid var(--border)',
          padding: '16px 32px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          position: 'sticky', top: 0, zIndex: 50,
          backdropFilter: 'blur(12px)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{
              fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700,
            }}>Portfolio Admin</span>
            <span style={{
              background: 'linear-gradient(135deg, var(--accent), var(--accent3))',
              color: 'white', fontSize: '0.6rem', fontWeight: 700,
              fontFamily: 'var(--font-mono)', padding: '3px 10px',
              borderRadius: 50, letterSpacing: '0.12em', textTransform: 'uppercase',
            }}>Dashboard</span>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <a href="/" target="_blank" rel="noopener noreferrer" style={{
              background: 'var(--surface2)', border: '1px solid var(--border)',
              color: 'var(--text2)', padding: '8px 18px', borderRadius: 50,
              fontSize: '0.82rem', fontWeight: 500, textDecoration: 'none',
            }}>
              ↗ View Site
            </a>
            <form action="/api/admin/logout" method="POST" style={{ display: 'inline' }}>
              <button type="submit" style={{
                background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)',
                color: '#f87171', padding: '8px 18px', borderRadius: 50,
                fontSize: '0.82rem', fontWeight: 500, cursor: 'pointer',
                fontFamily: 'var(--font-body)',
              }}>Logout</button>
            </form>
          </div>
        </div>

        <main style={{ flex: 1, padding: '36px 40px', overflowY: 'auto' }} className="admin-main-content">
          {children}
        </main>
      </div>

      <style>{`
        @media (max-width: 900px) { .admin-main-content { padding: 20px 16px !important; } }
      `}</style>
    </div>
  )
}
