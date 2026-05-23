import type { Experience } from '@/types'
import SectionHeader from '@/components/ui/SectionHeader'
import Reveal from '@/components/ui/Reveal'

export default function ExperienceSection({ experience }: { experience: Experience[] }) {
  return (
    <section id="experience">
      <div className="section-wrapper">
        <SectionHeader tag="Experience" title="Work History" desc="Companies I've worked with and the impact I made." />

        <div style={{ position:'relative', paddingLeft:40 }}>
          {/* Timeline line */}
          <div style={{ position:'absolute', left:12, top:8, width:1, height:'calc(100% - 16px)', background:'linear-gradient(180deg, var(--accent) 0%, rgba(100,80,240,0.05) 100%)' }} />

          {experience.map((exp, i) => (
            <Reveal key={exp.id} delay={i * 100}>
              <div style={{ position:'relative', marginBottom: i < experience.length-1 ? 52 : 0, paddingBottom: i < experience.length-1 ? 52 : 0, borderBottom: i < experience.length-1 ? '1px solid var(--border)' : 'none' }}>

                {/* Dot */}
                <div style={{ position:'absolute', left:-34, top:6, width:14, height:14, borderRadius:'50%', background:'var(--accent)', border:'3px solid var(--bg)', boxShadow:'0 0 0 4px rgba(100,80,240,0.2), 0 0 12px var(--glow)' }} />

                {/* Header */}
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:12, marginBottom:12 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:14 }}>
                    {/* Company logo */}
                    {exp.logo_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={exp.logo_url} alt={exp.company} style={{ width:44, height:44, borderRadius:10, objectFit:'contain', border:'1px solid var(--border2)', background:'var(--surface)', padding:4, flexShrink:0 }} />
                    ) : (
                      <div style={{ width:44, height:44, borderRadius:10, background:'linear-gradient(135deg, var(--surface), var(--surface2))', border:'1px solid var(--border)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.2rem', flexShrink:0 }}>🏢</div>
                    )}
                    <div>
                      <div style={{ fontSize:'1.1rem', fontWeight:600, color:'var(--text)', marginBottom:3 }}>{exp.role}</div>
                      <div style={{ color:'var(--accent2)', fontSize:'0.9rem' }}>
                        {exp.company_url
                          ? <a href={exp.company_url} target="_blank" rel="noopener noreferrer" style={{ color:'var(--accent2)', textDecoration:'none' }}>{exp.company} ↗</a>
                          : exp.company}
                      </div>
                    </div>
                  </div>
                  <div style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:50, padding:'6px 16px', fontSize:'0.72rem', fontFamily:'var(--font-mono)', color:'var(--text3)', flexShrink:0 }}>
                    {exp.year_start} — {exp.year_end}
                  </div>
                </div>

                <p style={{ color:'var(--text2)', fontSize:'0.92rem', lineHeight:1.8, marginBottom:16, paddingLeft:58 }}>{exp.description}</p>

                {/* Tech tags */}
                {Array.isArray(exp.tech_used) && exp.tech_used.length > 0 && (
                  <div style={{ display:'flex', gap:8, flexWrap:'wrap', paddingLeft:58 }}>
                    {exp.tech_used.map(tech => (
                      <span key={tech} style={{ background:'rgba(100,80,240,0.08)', border:'1px solid rgba(100,80,240,0.2)', color:'var(--accent2)', padding:'4px 12px', borderRadius:50, fontSize:'0.72rem', fontFamily:'var(--font-mono)' }}>{tech}</span>
                    ))}
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
