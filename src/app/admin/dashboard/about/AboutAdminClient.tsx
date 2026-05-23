'use client'
import { useState } from 'react'
import type { AboutData } from '@/types'
import { AdminPageHeader, AdminCard, AdminGrid, Field, AdminLabel, AdminTextarea, SaveButton, AdminImageUpload } from '@/components/admin/AdminFields'
import { useSave } from '@/hooks/useSave'

export default function AboutAdminClient({ initial }: { initial: AboutData }) {
  const [about, setAbout] = useState<AboutData>(initial)
  const { save, loading, status } = useSave('about')
  const set = (field: keyof AboutData) => (val: string) => setAbout(prev => ({ ...prev, [field]: val }))

  return (
    <div>
      <AdminPageHeader title="👤 About" desc="Your bio, contact info, and social links." />
      <AdminCard title="Bio & Tagline">
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
          <div>
            <AdminLabel>Bio (main paragraph)</AdminLabel>
            <AdminTextarea value={about.bio} onChange={set('bio')} rows={5} placeholder="Write about yourself..." />
          </div>
          <Field label="Tagline" value={about.tagline} onChange={set('tagline')} placeholder="Building tomorrow's web..." />
        </div>
      </AdminCard>
      <AdminCard title="Contact Details">
        <AdminGrid cols={2}>
          <Field label="Location" value={about.location} onChange={set('location')} placeholder="City, Country" />
          <Field label="Email" value={about.email} onChange={set('email')} placeholder="you@example.com" type="email" />
          <Field label="Phone" value={about.phone} onChange={set('phone')} placeholder="+1 555 000 0000" />
          <Field label="Resume URL" value={about.resume_url} onChange={set('resume_url')} placeholder="https://..." />
        </AdminGrid>
      </AdminCard>
      <AdminCard title="Social Links">
        <AdminGrid cols={2}>
          <Field label="GitHub URL" value={about.github_url} onChange={set('github_url')} placeholder="https://github.com/username" />
          <Field label="LinkedIn URL" value={about.linkedin_url} onChange={set('linkedin_url')} placeholder="https://linkedin.com/in/username" />
          <Field label="Twitter / X URL" value={about.twitter_url} onChange={set('twitter_url')} placeholder="https://twitter.com/username" />
        </AdminGrid>
      </AdminCard>
      <AdminCard title="Profile Photo">
        <div>
          <AdminImageUpload value={about.profile_image_url} onChange={set('profile_image_url')} label="Upload Image" />
          <AdminTextarea value={about.profile_image_url} onChange={set('profile_image_url')} rows={2} placeholder="https://example.com/photo.jpg" />
          {about.profile_image_url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={about.profile_image_url} alt="preview" style={{ width:100, height:100, borderRadius:16, objectFit:'cover', marginTop:12, border:'2px solid var(--border2)' }} />
          )}
        </div>
      </AdminCard>
      <SaveButton onClick={() => save(about)} loading={loading} status={status} />
    </div>
  )
}
