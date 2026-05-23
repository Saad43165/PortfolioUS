'use client'
import { useState } from 'react'
import type { Skill } from '@/types'
import { AdminPageHeader, AdminGrid, Field, AdminRange, AdminListItem, AddButton, SaveButton } from '@/components/admin/AdminFields'
import { useSave } from '@/hooks/useSave'

export default function Client({ initial }: { initial: Skill[] }) {
  const [items, setItems] = useState<Skill[]>(initial)
  const { save, loading, status } = useSave('skills')
  const update = (idx: number, field: keyof Skill, val: string | number) =>
    setItems(prev => prev.map((s, i) => i === idx ? { ...s, [field]: val } : s))
  const remove = (idx: number) => setItems(prev => prev.filter((_, i) => i !== idx))
  const add = () => setItems(prev => [...prev, { id: Date.now(), name:'', level:80, category:'Frontend', order_index: prev.length }])

  const categories = Array.from(new Set(items.map(s => s.category)))

  return (
    <div>
      <AdminPageHeader title="⚡ Skills" desc="List technical skills with proficiency levels." />
      <div style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'var(--radius)',padding:20,marginBottom:24,display:'flex',gap:10,flexWrap:'wrap',alignItems:'center'}}>
        <span style={{fontSize:'0.72rem',color:'var(--text3)',fontFamily:'var(--font-mono)'}}>CATEGORIES:</span>
        {categories.map(cat => (
          <span key={cat} style={{background:'rgba(100,80,240,0.1)',border:'1px solid rgba(100,80,240,0.2)',color:'var(--accent2)',padding:'3px 12px',borderRadius:50,fontSize:'0.75rem',fontFamily:'var(--font-mono)'}}>
            {cat} ({items.filter(s=>s.category===cat).length})
          </span>
        ))}
      </div>
      {items.map((skill, i) => (
        <AdminListItem key={skill.id} title={skill.name || `Skill ${i+1}`} onDelete={() => remove(i)}>
          <AdminGrid cols={2}>
            <Field label="Skill Name" value={skill.name} onChange={v=>update(i,'name',v)} placeholder="React / Next.js" />
            <Field label="Category" value={skill.category} onChange={v=>update(i,'category',v)} placeholder="Frontend, Backend, DevOps, Design..." />
            <div style={{gridColumn:'1/-1'}}>
              <AdminRange value={skill.level} onChange={v=>update(i,'level',v)} label="Proficiency level" />
            </div>
          </AdminGrid>
        </AdminListItem>
      ))}
      <div style={{marginBottom:24}}><AddButton onClick={add} label="Add Skill" /></div>
      <SaveButton onClick={() => save(items)} loading={loading} status={status} />
    </div>
  )
}
