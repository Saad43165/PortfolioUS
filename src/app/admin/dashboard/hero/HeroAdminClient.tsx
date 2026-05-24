'use client'

import { useState } from 'react'
import type { HeroData } from '@/types'
import {
  AdminPageHeader, AdminCard, AdminGrid, Field,
  AdminToggle, AdminLabel, AdminInput, SaveButton,
  AdminImageUpload, AdminFileUpload,
} from '@/components/admin/AdminFields'
import { useSave } from '@/hooks/useSave'

export default function HeroAdminClient({ initial }: { initial: HeroData }) {
  const [hero, setHero] = useState<HeroData>({
    ...initial,
    cv_url: initial.cv_url || '',
  })
  const { save, loading, status } = useSave('hero')
  const set = (field: keyof HeroData) => (val: string | boolean) =>
    setHero(prev => ({ ...prev, [field]: val }))

  return (
    <div>
      <AdminPageHeader title="🏠 Hero Page" desc="The first thing visitors see. Make your name and title pop." />

      <AdminCard title="Identity">
        <AdminGrid cols={2}>
          <Field label="Full Name" value={hero.name} onChange={set('name') as (v:string)=>void} placeholder="Jane Smith" />
          <Field label="Title / Role" value={hero.title} onChange={set('title') as (v:string)=>void} placeholder="Full Stack Developer" />
          <div style={{ gridColumn: '1 / -1' }}>
            <Field label="Subtitle (short tagline)" value={hero.subtitle} onChange={set('subtitle') as (v:string)=>void} placeholder="I craft elegant digital experiences..." span />
          </div>
        </AdminGrid>
      </AdminCard>

      <AdminCard title="Call-to-Action Buttons">
        <AdminGrid cols={2}>
          <Field label="Primary Button Text" value={hero.cta_primary_text} onChange={set('cta_primary_text') as (v:string)=>void} placeholder="View My Work" />
          <Field label="Primary Button Link" value={hero.cta_primary_link} onChange={set('cta_primary_link') as (v:string)=>void} placeholder="#projects" />
          <Field label="Secondary Button Text" value={hero.cta_secondary_text} onChange={set('cta_secondary_text') as (v:string)=>void} placeholder="Get in Touch" />
          <Field label="Secondary Button Link" value={hero.cta_secondary_link} onChange={set('cta_secondary_link') as (v:string)=>void} placeholder="#contact" />
        </AdminGrid>
      </AdminCard>

      <AdminCard title="Curriculum Vitae (CV)">
        <div>
          <AdminFileUpload value={hero.cv_url || ''} onChange={set('cv_url') as (v:string)=>void} label="Upload CV Document (PDF, DOCX)" />
          <AdminInput value={hero.cv_url || ''} onChange={set('cv_url') as (v:string)=>void} placeholder="Or paste external resume/CV URL here..." />
        </div>
      </AdminCard>

      <AdminCard title="Profile Avatar">
        <div>
          <AdminImageUpload value={hero.avatar_url} onChange={set('avatar_url') as (v:string)=>void} label="Upload Image" />
          <AdminInput value={hero.avatar_url} onChange={set('avatar_url') as (v:string)=>void} placeholder="https://example.com/your-photo.jpg" />
          {hero.avatar_url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={hero.avatar_url} alt="Preview" style={{ width:80, height:80, borderRadius:'50%', objectFit:'cover', marginTop:12, border:'2px solid var(--border2)' }} />
          )}
        </div>
      </AdminCard>

      <AdminCard title="Status">
        <AdminToggle
          checked={hero.available_for_work}
          onChange={val => setHero(prev => ({ ...prev, available_for_work: val }))}
          label='Show "Available for new opportunities" badge on hero'
        />
      </AdminCard>

      <SaveButton onClick={() => save(hero)} loading={loading} status={status} />
    </div>
  )
}
