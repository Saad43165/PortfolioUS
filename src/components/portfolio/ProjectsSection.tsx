import type { Project } from '@/types'
import SectionHeader from '@/components/ui/SectionHeader'
import Reveal from '@/components/ui/Reveal'

export default function ProjectsSection({ projects }: { projects: Project[] }) {
  return (
    <section id="projects">
      <div className="section-wrapper">
        <SectionHeader
          tag="Projects"
          title="Featured Work"
          desc="A curated selection of projects — from production SaaS to open-source tools."
        />
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 24,
        }} className="projects-grid">
          {projects.map((project, i) => (
            <Reveal key={project.id} delay={i * 60}>
              <div style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius)',
                overflow: 'hidden',
                display: 'flex', flexDirection: 'column',
                height: '100%',
                transition: 'var(--transition)',
              }} className="project-card">

                {/* Image / thumbnail */}
                <div style={{
                  height: 210,
                  background: project.image_url
                    ? 'none'
                    : 'linear-gradient(135deg, var(--surface2) 0%, var(--bg3) 100%)',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '3.5rem',
                }}>
                  {project.image_url
                    // eslint-disable-next-line @next/next/no-img-element
                    ? <img src={project.image_url} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : '🚀'
                  }

                  {/* Hover overlay with links */}
                  <div className="project-overlay" style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(135deg, rgba(100,80,240,0.88), rgba(217,70,239,0.8))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
                    opacity: 0, transition: 'var(--transition)',
                  }}>
                    {project.live_url && (
                      <a href={project.live_url} target="_blank" rel="noopener noreferrer" style={overlayBtnStyle}>
                        Live ↗
                      </a>
                    )}
                    {project.github_url && (
                      <a href={project.github_url} target="_blank" rel="noopener noreferrer" style={{
                        ...overlayBtnStyle,
                        background: 'transparent',
                        border: '1px solid rgba(255,255,255,0.6)',
                        color: 'white',
                      }}>
                        Code
                      </a>
                    )}
                  </div>

                  {/* Featured badge */}
                  {project.featured && (
                    <div style={{
                      position: 'absolute', top: 14, right: 14,
                      background: 'linear-gradient(135deg, var(--gold), #d97706)',
                      color: '#1a0a00',
                      padding: '4px 12px', borderRadius: 50,
                      fontSize: '0.68rem', fontWeight: 700,
                      letterSpacing: '0.06em',
                    }}>
                      ✨ Featured
                    </div>
                  )}
                </div>

                {/* Body */}
                <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{
                    fontSize: '0.68rem',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--accent)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    marginBottom: 8,
                  }}>{project.category}</div>

                  <div style={{
                    fontSize: '1.1rem', fontWeight: 600,
                    color: 'var(--text)', marginBottom: 10,
                  }}>{project.title}</div>

                  <p style={{
                    color: 'var(--text2)', fontSize: '0.88rem',
                    lineHeight: 1.75, flex: 1,
                  }}>{project.description}</p>

                  {/* Tags */}
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 20 }}>
                    {(Array.isArray(project.tech_stack) ? project.tech_stack : []).map(tech => (
                      <span key={tech} style={{
                        background: 'var(--surface2)',
                        border: '1px solid var(--border)',
                        color: 'var(--text3)',
                        padding: '3px 12px', borderRadius: 50,
                        fontSize: '0.7rem', fontFamily: 'var(--font-mono)',
                      }}>{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <style>{`
        .project-card:hover {
          border-color: var(--border2) !important;
          transform: translateY(-6px) !important;
          box-shadow: 0 24px 60px rgba(0,0,0,0.4) !important;
        }
        .project-card:hover .project-overlay { opacity: 1 !important; }
        @media (max-width: 768px) {
          .projects-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

const overlayBtnStyle: React.CSSProperties = {
  background: 'white',
  color: '#0f0f24',
  padding: '10px 22px',
  borderRadius: 50,
  fontSize: '0.85rem',
  fontWeight: 700,
  textDecoration: 'none',
  transition: 'transform 0.2s ease',
}
