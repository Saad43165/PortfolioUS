'use client'
import { useState } from 'react'
import type { ContactData } from '@/types'
import { AdminPageHeader, AdminCard, AdminGrid, Field, AdminToggle, SaveButton } from '@/components/admin/AdminFields'
import { useSave } from '@/hooks/useSave'

export default function Client({ initial }: { initial: ContactData }) {
  const [contact, setContact] = useState<ContactData>({
    id: initial.id,
    heading: initial.heading || '',
    subheading: initial.subheading || '',
    email: initial.email || '',
    phone: initial.phone || '',
    location: initial.location || '',
    calendly_url: initial.calendly_url || '',
    show_form: initial.show_form ?? true
  })
  const { save, loading, status } = useSave('contact')
  const set = (field: keyof ContactData) => (val: string | boolean) =>
    setContact(prev => ({ ...prev, [field]: val }))

  return (
    <div>
      <AdminPageHeader title="📬 Contact" desc="Customize your contact section — all changes show live on your portfolio." />

      <AdminCard title="Section Copy">
        <AdminGrid cols={1}>
          <Field label="Section Heading" value={contact.heading} onChange={set('heading') as (v:string)=>void} placeholder="Let's Build Something" />
          <Field label="Section Subheading" value={contact.subheading} onChange={set('subheading') as (v:string)=>void} placeholder="Have a project in mind? Let's talk." />
        </AdminGrid>
      </AdminCard>

      <AdminCard title="Contact Details (shown as info cards)">
        <AdminGrid cols={2}>
          <Field label="Email Address" value={contact.email} onChange={set('email') as (v:string)=>void} placeholder="you@example.com" type="email" />
          <Field label="Phone Number" value={contact.phone || ''} onChange={set('phone') as (v:string)=>void} placeholder="+1 (555) 000-0000" />
          <Field label="Location" value={contact.location || ''} onChange={set('location') as (v:string)=>void} placeholder="San Francisco, CA" />
          <Field label="Calendly URL (optional)" value={contact.calendly_url} onChange={set('calendly_url') as (v:string)=>void} placeholder="https://calendly.com/yourname" />
        </AdminGrid>
      </AdminCard>

      <AdminCard title="Contact Form">
        <AdminToggle
          checked={contact.show_form}
          onChange={val => setContact(prev => ({ ...prev, show_form: val }))}
          label="Show contact form on portfolio"
        />
        <p style={{ color:'var(--text3)', fontSize:'0.8rem', marginTop:12, lineHeight:1.7 }}>
          The form currently simulates submission. To receive real emails, integrate
          Resend, Formspree, or EmailJS into <code style={{ fontFamily:'var(--font-mono)', color:'var(--accent)', background:'var(--bg3)', padding:'2px 6px', borderRadius:4 }}>ContactSection.tsx</code>.
        </p>
      </AdminCard>

      <SaveButton onClick={() => save(contact)} loading={loading} status={status} />
    </div>
  )
}
