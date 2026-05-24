import type { Education } from '@/types'
import SectionHeader from '@/components/ui/SectionHeader'
import Reveal from '@/components/ui/Reveal'

export default function EducationSection({ education }: { education: Education[] }) {
  return (
    <section id="education" style={{ background:'var(--bg2)' }}>
      <div className="section-wrapper">
        <SectionHeader tag="Education" title="Academic Background" desc="My educational journey and academic achievements." />

        <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
          {education.map((edu, i) => (
            <Reveal key={edu.id} delay={i * 80}>
              <div className="edu-card" style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:'var(--radius)', boxShadow:'var(--card-shadow)', padding:'30px 32px', display:'grid', gridTemplateColumns:'64px 1fr auto', gap:24, alignItems:'start', transition:'all 0.35s var(--ease)', position:'relative', overflow:'hidden' }}>
                {/* Left accent bar */}
                <div style={{ position:'absolute', left:0, top:0, bottom:0, width:3, background:'linear-gradient(180deg, var(--accent), var(--accent3))', borderRadius:'3px 0 0 3px' }} />

                {/* Icon */}
                <div style={{ width:64, height:64, borderRadius:16, background:'linear-gradient(135deg, var(--surface2), var(--bg3))', border:'1px solid var(--border2)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.8rem', flexShrink:0, overflow:'hidden' }}>
                  {edu.logo_url
                    // eslint-disable-next-line @next/next/no-img-element
                    ? <img src={edu.logo_url} alt={edu.institution} style={{ width:44, height:44, objectFit:'contain' }} />
                    : '🎓'}
                </div>

                {/* Content */}
                <div>
                  <div style={{ fontSize:'1.08rem', fontWeight:600, color:'var(--text)', marginBottom:4 }}>{edu.degree}</div>
                  <div style={{ color:'var(--accent2)', fontSize:'0.9rem', marginBottom:6 }}>{edu.institution}</div>
                  {edu.grade && (
                    <div style={{ fontSize:'0.78rem', color:'var(--gold)', marginBottom:10, display:'flex', alignItems:'center', gap:6 }}>
                      ⭐ {edu.grade}
                    </div>
                  )}
                  {edu.description && (
                    <p style={{ color:'var(--text2)', fontSize:'0.88rem', lineHeight:1.75 }}>{edu.description}</p>
                  )}
                </div>

                {/* Year badge */}
                <div style={{ background:'var(--surface2)', border:'1px solid var(--border)', borderRadius:50, padding:'6px 16px', fontSize:'0.72rem', fontFamily:'var(--font-mono)', color:'var(--text3)', whiteSpace:'nowrap', flexShrink:0 }}>
                  {edu.year_start} – {edu.year_end}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .edu-card:hover { border-color:var(--border2)!important; transform:translateX(5px)!important; box-shadow:var(--card-shadow-hover)!important; }
        @media(max-width:640px){
          .edu-card { grid-template-columns:48px 1fr!important; padding:22px 20px!important; }
          .edu-card > div:last-child { grid-column:1/-1; margin-top:4px; }
        }
      `}} />
    </section>
  )
}
