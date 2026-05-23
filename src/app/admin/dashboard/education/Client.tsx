'use client'
import { useState } from 'react'
import type { Education } from '@/types'
import { AdminPageHeader, AdminGrid, Field, AdminLabel, AdminTextarea, AdminListItem, AddButton, SaveButton } from '@/components/admin/AdminFields'
import { useSave } from '@/hooks/useSave'

export default function Client({ initial }: { initial: Education[] }) {
  const [items, setItems] = useState<Education[]>(initial)
  const { save, loading, status } = useSave('education')
  const update = (idx: number, field: keyof Education, val: string) =>
    setItems(prev => prev.map((e, i) => i === idx ? { ...e, [field]: val } : e))
  const remove = (idx: number) => setItems(prev => prev.filter((_, i) => i !== idx))
  const add = () => setItems(prev => [...prev, { id: Date.now(), degree:'', institution:'', year_start:'', year_end:'', grade:'', description:'', logo_url:'', order_index: prev.length }])

  return (
    <div>
      <AdminPageHeader title="🎓 Education" desc="Add qualifications in reverse chronological order." />
      {items.map((edu, i) => (
        <AdminListItem key={edu.id} title={edu.degree || `Education ${i+1}`} onDelete={() => remove(i)}>
          <AdminGrid cols={2}>
            <div style={{gridColumn:'1/-1'}}><Field label="Degree / Qualification" value={edu.degree} onChange={v=>update(i,'degree',v)} placeholder="B.Sc. Computer Science" /></div>
            <Field label="Institution" value={edu.institution} onChange={v=>update(i,'institution',v)} placeholder="Stanford University" />
            <Field label="Grade / GPA" value={edu.grade} onChange={v=>update(i,'grade',v)} placeholder="3.9 GPA" />
            <Field label="Year Start" value={edu.year_start} onChange={v=>update(i,'year_start',v)} placeholder="2019" />
            <Field label="Year End" value={edu.year_end} onChange={v=>update(i,'year_end',v)} placeholder="2023" />
            <div style={{gridColumn:'1/-1'}}>
              <AdminLabel>Description</AdminLabel>
              <AdminTextarea value={edu.description} onChange={v=>update(i,'description',v)} rows={3} placeholder="Describe studies, achievements..." />
            </div>
            <div style={{gridColumn:'1/-1'}}><Field label="Logo URL (optional)" value={edu.logo_url} onChange={v=>update(i,'logo_url',v)} placeholder="https://..." /></div>
          </AdminGrid>
        </AdminListItem>
      ))}
      <div style={{marginBottom:24}}><AddButton onClick={add} label="Add Education" /></div>
      <SaveButton onClick={() => save(items)} loading={loading} status={status} />
    </div>
  )
}
