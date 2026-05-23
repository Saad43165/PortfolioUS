'use client'
import { useState } from 'react'
import type { StatsData } from '@/types'
import { AdminPageHeader, AdminCard, AdminGrid, AdminLabel, AdminInput, SaveButton } from '@/components/admin/AdminFields'
import { useSave } from '@/hooks/useSave'

export default function Client({ initial }: { initial: StatsData }) {
  const [stats, setStats] = useState<StatsData>(initial)
  const { save, loading, status } = useSave('stats')
  const set = (field: keyof StatsData) => (val: string) =>
    setStats(prev => ({ ...prev, [field]: parseInt(val) || 0 }))

  const fields: { label: string; key: keyof StatsData; desc: string }[] = [
    { label: 'Projects Completed', key: 'projects_completed', desc: 'Shows as "42+" in hero' },
    { label: 'Years of Experience', key: 'years_experience', desc: 'Shows as "4+" in hero' },
    { label: 'Happy Clients', key: 'happy_clients', desc: 'Shows as "28+" in hero' },
    { label: 'GitHub Stars', key: 'github_stars', desc: 'Shows as "2.4k" if ≥1000' },
  ]

  return (
    <div>
      <AdminPageHeader title="📈 Stats" desc="Numbers shown in the hero section stat bar." />
      <AdminCard title="Hero Stats">
        <AdminGrid cols={2}>
          {fields.map(f => (
            <div key={f.key}>
              <AdminLabel>{f.label}</AdminLabel>
              <AdminInput value={stats[f.key] || 0} onChange={set(f.key)} type="number" />
              <p style={{fontSize:'0.72rem',color:'var(--text3)',marginTop:5}}>{f.desc}</p>
            </div>
          ))}
        </AdminGrid>
      </AdminCard>
      <SaveButton onClick={() => save(stats)} loading={loading} status={status} />
    </div>
  )
}
