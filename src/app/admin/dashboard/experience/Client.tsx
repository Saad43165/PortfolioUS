'use client'
import { useState } from 'react'
import type { Experience } from '@/types'
import { AdminPageHeader, AdminGrid, Field, AdminLabel, AdminTextarea, AdminInput, AdminListItem, AddButton, SaveButton } from '@/components/admin/AdminFields'
import { useSave } from '@/hooks/useSave'

export default function Client({ initial }: { initial: Experience[] }) {
  const [items, setItems] = useState<Experience[]>(initial)
  const { save, loading, status } = useSave('experience')
  const update = (idx: number, field: keyof Experience, val: unknown) =>
    setItems(prev => prev.map((e, i) => i === idx ? { ...e, [field]: val } : e))
  const remove = (idx: number) => setItems(prev => prev.filter((_, i) => i !== idx))
  const add = () => setItems(prev => [...prev, { id: Date.now(), role:'', company:'', year_start:'', year_end:'Present', description:'', tech_used:[], company_url:'', logo_url:'', order_index: prev.length }])

  return (
    <div>
      <AdminPageHeader title="🏢 Experience" desc="Work history, most recent first." />
      {items.map((exp, i) => (
        <AdminListItem key={exp.id} title={exp.role ? `${exp.role} @ ${exp.company}` : `Experience ${i+1}`} onDelete={() => remove(i)}>
          <AdminGrid cols={2}>
            <Field label="Role / Position" value={exp.role} onChange={v=>update(i,'role',v)} placeholder="Senior Frontend Engineer" />
            <Field label="Company" value={exp.company} onChange={v=>update(i,'company',v)} placeholder="TechCorp Inc." />
            <Field label="Year Start" value={exp.year_start} onChange={v=>update(i,'year_start',v)} placeholder="2022" />
            <Field label="Year End" value={exp.year_end} onChange={v=>update(i,'year_end',v)} placeholder="Present" />
            <div style={{gridColumn:'1/-1'}}>
              <AdminLabel>Description</AdminLabel>
              <AdminTextarea value={exp.description} onChange={v=>update(i,'description',v)} rows={4} placeholder="Impact, achievements, responsibilities..." />
            </div>
            <Field label="Company Website" value={exp.company_url} onChange={v=>update(i,'company_url',v)} placeholder="https://company.com" />
            <Field label="Logo URL (optional)" value={exp.logo_url} onChange={v=>update(i,'logo_url',v)} placeholder="https://..." />
            <div style={{gridColumn:'1/-1'}}>
              <AdminLabel>Technologies (comma-separated)</AdminLabel>
              <AdminInput value={Array.isArray(exp.tech_used) ? exp.tech_used.join(', ') : ''} onChange={v=>update(i,'tech_used',v.split(',').map((s:string)=>s.trim()).filter(Boolean))} placeholder="React, TypeScript, AWS..." />
            </div>
          </AdminGrid>
        </AdminListItem>
      ))}
      <div style={{marginBottom:24}}><AddButton onClick={add} label="Add Experience" /></div>
      <SaveButton onClick={() => save(items)} loading={loading} status={status} />
    </div>
  )
}
