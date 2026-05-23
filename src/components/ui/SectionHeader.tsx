import Reveal from '@/components/ui/Reveal'

interface SectionHeaderProps {
  tag: string
  title: string
  desc?: string
}

export default function SectionHeader({ tag, title, desc }: SectionHeaderProps) {
  return (
    <div style={{ marginBottom: 64 }}>
      <Reveal>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 12,
          marginBottom: 16,
        }}>
          <div style={{ width: 36, height: 1, background: 'var(--accent)' }} />
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            fontWeight: 600,
            color: 'var(--accent)',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
          }}>{tag}</span>
        </div>
      </Reveal>
      <Reveal delay={80}>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 700,
          letterSpacing: '-0.025em',
          lineHeight: 1.05,
          marginBottom: desc ? 16 : 0,
        }}>{title}</h2>
      </Reveal>
      {desc && (
        <Reveal delay={140}>
          <p style={{
            color: 'var(--text2)',
            fontSize: '1.05rem',
            maxWidth: 560,
            lineHeight: 1.85,
          }}>{desc}</p>
        </Reveal>
      )}
    </div>
  )
}
