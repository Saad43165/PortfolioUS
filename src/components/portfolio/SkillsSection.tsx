'use client'

import { useEffect, useRef, useState } from 'react'
import type { Skill } from '@/types'
import SectionHeader from '@/components/ui/SectionHeader'
import Reveal from '@/components/ui/Reveal'

function SkillBar({ name, level }: { name: string; level: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setAnimated(true) },
      { threshold: 0.2 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} style={{ marginBottom: 18 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
        <span style={{ fontSize: '0.88rem', fontWeight: 500, color: 'var(--text)' }}>{name}</span>
        <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--accent2)' }}>{level}%</span>
      </div>
      <div style={{
        height: 4, background: 'var(--surface2)',
        borderRadius: 4, overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          width: `${level}%`,
          background: 'linear-gradient(90deg, var(--accent), var(--accent3))',
          borderRadius: 4,
          transform: animated ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left',
          transition: 'transform 1.3s cubic-bezier(0.16,1,0.3,1)',
          boxShadow: '0 0 12px var(--glow)',
        }} />
      </div>
    </div>
  )
}

export default function SkillsSection({ skills }: { skills: Skill[] }) {
  const categories: Record<string, Skill[]> = {}
  skills.forEach(s => {
    if (!categories[s.category]) categories[s.category] = []
    categories[s.category].push(s)
  })

  const entries = Object.entries(categories)

  return (
    <section id="skills" style={{ background: 'var(--bg2)' }}>
      <div className="section-wrapper">
        <SectionHeader
          tag="Skills"
          title="Technical Toolkit"
          desc="Technologies and tools I work with to build modern digital products."
        />

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 48,
        }} className="skills-grid">
          {/* Left: bar charts by category */}
          <div>
            {entries.slice(0, Math.ceil(entries.length / 2)).map(([cat, catSkills]) => (
              <Reveal key={cat}>
                <div style={{ marginBottom: 36 }}>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    marginBottom: 20,
                  }}>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.68rem', fontWeight: 600,
                      color: 'var(--accent)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.15em',
                    }}>{cat}</span>
                    <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
                  </div>
                  {catSkills.map(s => <SkillBar key={s.id} name={s.name} level={s.level} />)}
                </div>
              </Reveal>
            ))}
          </div>

          {/* Right: remaining categories + bubble cloud */}
          <div>
            {entries.slice(Math.ceil(entries.length / 2)).map(([cat, catSkills]) => (
              <Reveal key={cat}>
                <div style={{ marginBottom: 36 }}>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    marginBottom: 20,
                  }}>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.68rem', fontWeight: 600,
                      color: 'var(--accent)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.15em',
                    }}>{cat}</span>
                    <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
                  </div>
                  {catSkills.map(s => <SkillBar key={s.id} name={s.name} level={s.level} />)}
                </div>
              </Reveal>
            ))}

            {/* All skills bubble view */}
            <Reveal delay={120}>
              <div style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius)',
                padding: 24,
              }}>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem', fontWeight: 600,
                  color: 'var(--accent)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  marginBottom: 16,
                }}>All Skills</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                  {skills.map(s => (
                    <div key={s.id} style={{
                      background: 'var(--surface2)',
                      border: '1px solid var(--border)',
                      borderRadius: 10,
                      padding: '8px 16px',
                      fontSize: '0.82rem', fontWeight: 500,
                      color: 'var(--text2)',
                      transition: 'var(--transition)',
                      display: 'flex', alignItems: 'center', gap: 8,
                      cursor: 'default',
                    }} className="skill-bubble">
                      {s.name}
                      <span style={{ fontSize: '0.62rem', fontFamily: 'var(--font-mono)', color: 'var(--accent)', opacity: 0.8 }}>
                        {s.level}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      <style>{`
        .skill-bubble:hover { border-color: var(--border2) !important; color: var(--accent2) !important; background: var(--surface3) !important; }
        @media (max-width: 768px) {
          .skills-grid { grid-template-columns: 1fr !important; gap: 0 !important; }
        }
      `}</style>
    </section>
  )
}
