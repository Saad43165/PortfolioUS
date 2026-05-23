'use client'
import { useState } from 'react'
import type { Project } from '@/types'
import { AdminPageHeader, AdminGrid, Field, AdminLabel, AdminTextarea, AdminToggle, AdminListItem, AddButton, SaveButton, AdminInput } from '@/components/admin/AdminFields'
import { useSave } from '@/hooks/useSave'

export default function Client({ initial }: { initial: Project[] }) {
  const [items, setItems] = useState<Project[]>(initial)
  const { save, loading, status } = useSave('projects')
  const update = (idx: number, field: keyof Project, val: unknown) =>
    setItems(prev => prev.map((p, i) => i === idx ? { ...p, [field]: val } : p))
  const remove = (idx: number) => setItems(prev => prev.filter((_, i) => i !== idx))
  const add = () => setItems(prev => [...prev, { id: Date.now(), title:'', description:'', tech_stack:[], live_url:'', github_url:'', image_url:'', featured:false, category:'', order_index: prev.length }])

  return (
    <div>
      <AdminPageHeader title="💼 Projects" desc="Showcase your best work." />
      {items.map((proj, i) => (
        <AdminListItem key={proj.id} title={proj.title || `Project ${i+1}`} onDelete={() => remove(i)}>
          <AdminGrid cols={2}>
            <Field label="Title" value={proj.title} onChange={v=>update(i,'title',v)} placeholder="My Project" />
            <Field label="Category" value={proj.category} onChange={v=>update(i,'category',v)} placeholder="Web App, Mobile..." />
            <div style={{gridColumn:'1/-1'}}>
              <AdminLabel>Description</AdminLabel>
              <AdminTextarea value={proj.description} onChange={v=>update(i,'description',v)} rows={3} />
            </div>
            <Field label="Live URL" value={proj.live_url} onChange={v=>update(i,'live_url',v)} placeholder="https://..." />
            <Field label="GitHub URL" value={proj.github_url} onChange={v=>update(i,'github_url',v)} placeholder="https://github.com/..." />
            <div style={{gridColumn:'1/-1'}}>
              <Field label="Image URL" value={proj.image_url} onChange={v=>update(i,'image_url',v)} placeholder="https://..." />
              {proj.image_url && <img src={proj.image_url} alt="preview" style={{width:'100%',maxHeight:120,objectFit:'cover',borderRadius:8,marginTop:8,border:'1px solid var(--border)'}} />}
            </div>
            <div style={{gridColumn:'1/-1'}}>
              <AdminLabel>Tech Stack (comma-separated)</AdminLabel>
              <AdminInput value={Array.isArray(proj.tech_stack) ? proj.tech_stack.join(', ') : ''} onChange={v=>update(i,'tech_stack',v.split(',').map((s:string)=>s.trim()).filter(Boolean))} placeholder="React, Node.js, PostgreSQL" />
            </div>
            <div style={{gridColumn:'1/-1'}}>
              <AdminToggle checked={proj.featured} onChange={val=>update(i,'featured',val)} label="Mark as Featured (shows ✨ badge)" />
            </div>
          </AdminGrid>
        </AdminListItem>
      ))}
      <div style={{marginBottom:24}}><AddButton onClick={add} label="Add Project" /></div>
      <SaveButton onClick={() => save(items)} loading={loading} status={status} />
    </div>
  )
}
