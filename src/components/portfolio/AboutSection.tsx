import type { AboutData, HeroData } from '@/types'
import SectionHeader from '@/components/ui/SectionHeader'
import Reveal from '@/components/ui/Reveal'

interface AboutProps { about: AboutData; hero: HeroData }

export default function AboutSection({ about, hero }: AboutProps) {
  const infoItems = [
    { label:'Location',  value:`📍 ${about.location}` },
    { label:'Email',     value:`✉️ ${about.email}` },
    { label:'Phone',     value:`📞 ${about.phone}` },
    { label:'Status',    value: hero.available_for_work ? '🟢 Open to Work' : '🔴 Not Available', green: hero.available_for_work },
  ]

  return (
    <section id="about">
      <div className="section-wrapper">
        <SectionHeader tag="About Me" title={`Hello, I'm ${hero.name.split(' ')[0]}`} desc={about.tagline} />

        <div className="about-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1.5fr', gap:72, alignItems:'center' }}>

          {/* Image */}
          <Reveal direction="left">
            <div style={{ position:'relative' }}>
              {/* Glow ring */}
              <div style={{
                position:'absolute', inset:-3,
                background:'linear-gradient(135deg, var(--accent), var(--accent3))',
                borderRadius:26, opacity:0.22, zIndex:0,
                filter:'blur(2px)',
              }} />
              {about.profile_image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={about.profile_image_url} alt="Profile" style={{
                  width:'100%', aspectRatio:'4/5', objectFit:'cover',
                  borderRadius:22, display:'block', position:'relative', zIndex:1,
                  border:'1px solid var(--border2)',
                }} />
              ) : (
                <div style={{
                  width:'100%', aspectRatio:'4/5', borderRadius:22,
                  background:'linear-gradient(135deg, var(--surface), var(--surface2))',
                  border:'1px solid var(--border2)',
                  display:'flex', flexDirection:'column', alignItems:'center',
                  justifyContent:'center', gap:12, color:'var(--text3)',
                  position:'relative', zIndex:1,
                }}>
                  <span style={{ fontSize:'4rem' }}>👤</span>
                  <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.72rem' }}>profile_image</span>
                </div>
              )}
              {/* Corner accents */}
              <div style={{ position:'absolute', bottom:-22, right:-22, width:90, height:90, borderRadius:18, background:'linear-gradient(135deg, var(--accent), var(--accent3))', opacity:0.15, zIndex:0 }} />
              <div style={{ position:'absolute', top:-18, left:-18, width:56, height:56, borderRadius:12, border:'2px solid var(--border2)', zIndex:0 }} />
            </div>
          </Reveal>

          {/* Content */}
          <div style={{ display:'flex', flexDirection:'column', gap:28 }}>
            <Reveal delay={80}>
              <p style={{ color:'var(--text2)', fontSize:'1.05rem', lineHeight:1.9 }}>{about.bio}</p>
            </Reveal>

            <Reveal delay={140}>
              <div className="about-info-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
                {infoItems.map(item => (
                  <div key={item.label} className="about-info-card" style={{
                    background:'var(--surface)', border:'1px solid var(--border)',
                    borderRadius:'var(--radius-sm)', padding:'16px 18px',
                    transition:'border-color 0.3s ease, transform 0.3s ease',
                  }}>
                    <div style={{ fontSize:'0.63rem', color:'var(--text3)', textTransform:'uppercase', letterSpacing:'0.12em', marginBottom:4 }}>{item.label}</div>
                    <div style={{ fontSize:'0.88rem', fontWeight:500, color: item.green ? 'var(--success)' : 'var(--text)' }}>{item.value}</div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div style={{ display:'flex', gap:10, flexWrap:'wrap', alignItems:'center' }}>
                {about.github_url   && <SocialLink href={about.github_url}   label="⌥ GitHub" />}
                {about.linkedin_url && <SocialLink href={about.linkedin_url} label="in LinkedIn" />}
                {about.twitter_url  && <SocialLink href={about.twitter_url}  label="𝕏 Twitter" />}
                {about.resume_url && about.resume_url !== '#' && (
                  <a href={about.resume_url} target="_blank" rel="noopener noreferrer" style={{
                    background:'linear-gradient(135deg, var(--accent), var(--accent3))',
                    color:'white', padding:'10px 26px', borderRadius:'50px',
                    fontSize:'0.85rem', fontWeight:600, textDecoration:'none',
                    boxShadow:'0 4px 20px var(--glow)', transition:'transform 0.3s ease, box-shadow 0.3s ease',
                    display:'inline-flex', alignItems:'center', gap:8,
                  }} className="resume-btn">
                    ↓ Resume
                  </a>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      <style>{`
        .about-info-card:hover { border-color:var(--border2) !important; transform:translateY(-2px); }
        .resume-btn:hover { transform:translateY(-2px) !important; box-shadow:0 8px 28px var(--glow) !important; }
        @media (max-width:768px) {
          .about-grid { grid-template-columns:1fr !important; gap:40px !important; }
          .about-info-grid { grid-template-columns:1fr 1fr !important; }
        }
        @media (max-width:400px) {
          .about-info-grid { grid-template-columns:1fr !important; }
        }
      `}</style>
    </section>
  )
}

function SocialLink({ href, label }: { href:string; label:string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="social-link-btn" style={{
      background:'var(--surface)', border:'1px solid var(--border)',
      color:'var(--text2)', padding:'10px 18px', borderRadius:'50px',
      fontSize:'0.83rem', fontWeight:500, textDecoration:'none',
      transition:'all 0.3s ease', display:'inline-flex', alignItems:'center', gap:8,
    }}>
      {label}
      <style>{`.social-link-btn:hover{border-color:var(--border2)!important;color:var(--accent2)!important;background:var(--surface2)!important;}`}</style>
    </a>
  )
}
