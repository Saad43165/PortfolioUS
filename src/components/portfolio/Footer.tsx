import type { HeroData, AboutData } from '@/types'

export default function Footer({ hero, about }: { hero: HeroData; about: AboutData }) {
  const year = new Date().getFullYear()
  const firstName = hero.name.split(' ')[0]

  return (
    <footer style={{ borderTop:'1px solid var(--border)', padding:'44px 48px', background:'var(--bg)' }}>
      <div style={{ maxWidth:1200, margin:'0 auto', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:20 }}>
        <div>
          <a href="#home" style={{ fontFamily:'var(--font-display)', fontSize:'1.4rem', fontWeight:700, color:'var(--text)', textDecoration:'none', letterSpacing:'-0.02em' }}>
            {firstName}<span style={{ color:'var(--accent)' }}>.</span>
          </a>
          <p style={{ color:'var(--text3)', fontSize:'0.78rem', marginTop:6 }}>
            © {year} {hero.name} · Built with Next.js &amp; Supabase
          </p>
        </div>

        <div style={{ display:'flex', gap:6, alignItems:'center', flexWrap:'wrap' }}>
          {['About','Education','Projects','Skills','Experience','Contact'].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="footer-link" style={{ color:'var(--text3)', textDecoration:'none', fontSize:'0.82rem', padding:'6px 10px', borderRadius:8, transition:'color 0.25s ease' }}>
              {l}
            </a>
          ))}
          {about.github_url && (
            <a href={about.github_url} target="_blank" rel="noopener noreferrer" className="footer-link" style={{ color:'var(--text3)', textDecoration:'none', fontSize:'0.82rem', padding:'6px 10px', borderRadius:8 }}>
              GitHub
            </a>
          )}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .footer-link:hover { color:var(--accent2)!important; }
        @media(max-width:600px) { footer > div { flex-direction:column; text-align:center; } footer { padding:36px 24px!important; } }
      ` }} />
    </footer>
  )
}
