'use client'

import { useState } from 'react'
import type { ContactData, AboutData } from '@/types'
import SectionHeader from '@/components/ui/SectionHeader'
import Reveal from '@/components/ui/Reveal'

interface ContactProps { contact: ContactData; about: AboutData }

export default function ContactSection({ contact, about }: ContactProps) {
  const [form, setForm]     = useState({ name:'', email:'', subject:'', message:'' })
  const [sent, setSent]     = useState(false)
  const [sending, setSending] = useState(false)
  const [errors, setErrors] = useState<Record<string,string>>({})

  const validate = () => {
    const e: Record<string,string> = {}
    if (!form.name.trim())    e.name    = 'Name is required'
    if (!form.email.trim())   e.email   = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.message.trim()) e.message = 'Message is required'
    return e
  }

  const handleSubmit = async () => {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setSending(true)
    // Call the new API route
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (!res.ok) throw new Error('Failed to send')
    } catch (error) {
      console.error(error)
      alert("There was an error sending your message. Please try again or use the email link.")
    } finally {
      setSending(false)
    }
    setSent(true)
  }

  // Use contact-specific email/phone/location if set, otherwise fall back to about
  const displayEmail    = contact.email    || about.email
  const displayPhone    = contact.phone    || about.phone
  const displayLocation = contact.location || about.location

  const contactCards = [
    { icon:'✉️', label:'Email',    value: displayEmail,    href:`mailto:${displayEmail}` },
    ...(displayPhone    ? [{ icon:'📞', label:'Phone',    value: displayPhone,    href:`tel:${displayPhone}` }]          : []),
    ...(displayLocation ? [{ icon:'📍', label:'Location', value: displayLocation, href: null }]                          : []),
    ...(contact.calendly_url ? [{ icon:'📅', label:'Schedule a Call', value:'Book a time →', href: contact.calendly_url }] : []),
  ]

  return (
    <section id="contact" style={{ background:'var(--bg2)' }}>
      <div className="section-wrapper">
        <SectionHeader tag="Contact" title={contact.heading} desc={contact.subheading} />

        <div className="contact-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1.3fr', gap:72, alignItems:'start' }}>

          {/* Left: info cards */}
          <Reveal>
            <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
              {contactCards.map((card, i) => (
                <div key={i} className="contact-card" style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:'20px 24px', display:'flex', gap:18, alignItems:'center', transition:'border-color 0.3s ease, transform 0.3s ease' }}>
                  <div style={{ width:48, height:48, borderRadius:12, flexShrink:0, background:'linear-gradient(135deg, var(--accent), var(--accent3))', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.25rem' }}>{card.icon}</div>
                  <div>
                    <div style={{ fontSize:'0.65rem', color:'var(--text3)', textTransform:'uppercase', letterSpacing:'0.12em', marginBottom:3 }}>{card.label}</div>
                    {card.href
                      ? <a href={card.href} target={card.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" style={{ fontSize:'0.9rem', fontWeight:500, color:'var(--accent2)', textDecoration:'none' }}>{card.value}</a>
                      : <div style={{ fontSize:'0.9rem', fontWeight:500, color:'var(--text)' }}>{card.value}</div>
                    }
                  </div>
                </div>
              ))}

              {/* Social links */}
              <div style={{ display:'flex', gap:10, flexWrap:'wrap', marginTop:8 }}>
                {about.github_url   && <SocialBtn href={about.github_url}   label="GitHub" />}
                {about.linkedin_url && <SocialBtn href={about.linkedin_url} label="LinkedIn" />}
                {about.twitter_url  && <SocialBtn href={about.twitter_url}  label="Twitter" />}
              </div>
            </div>
          </Reveal>

          {/* Right: form */}
          <Reveal delay={100}>
            {sent ? (
              <div style={{ background:'var(--surface)', border:'1px solid rgba(16,185,129,0.3)', borderRadius:'var(--radius)', padding:'52px 32px', textAlign:'center' }}>
                <div style={{ fontSize:'3.5rem', marginBottom:16 }}>🎉</div>
                <div style={{ fontFamily:'var(--font-display)', fontSize:'1.8rem', fontWeight:700, marginBottom:10 }}>Message Sent!</div>
                <p style={{ color:'var(--text2)', fontSize:'0.9rem' }}>Thanks for reaching out. I'll get back to you within 24 hours.</p>
                <button onClick={() => { setSent(false); setForm({ name:'', email:'', subject:'', message:'' }) }} style={{ marginTop:24, background:'var(--surface2)', border:'1px solid var(--border)', color:'var(--text2)', padding:'10px 24px', borderRadius:50, fontSize:'0.85rem', cursor:'pointer', fontFamily:'var(--font-body)' }}>
                  Send another →
                </button>
              </div>
            ) : contact.show_form ? (
              <div style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:32, display:'flex', flexDirection:'column', gap:14 }}>
                <div style={{ fontFamily:'var(--font-display)', fontSize:'1.3rem', fontWeight:600, marginBottom:4 }}>Send a Message</div>

                {/* Name + Email row */}
                <div className="form-row" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                  <FormField label="Your Name *" value={form.name} placeholder="Jane Smith" error={errors.name} onChange={v => { setForm(p=>({...p,name:v})); setErrors(p=>({...p,name:''})) }} />
                  <FormField label="Email *" value={form.email} placeholder="jane@example.com" type="email" error={errors.email} onChange={v => { setForm(p=>({...p,email:v})); setErrors(p=>({...p,email:''})) }} />
                </div>
                <FormField label="Subject" value={form.subject} placeholder="Project enquiry..." onChange={v => setForm(p=>({...p,subject:v}))} />
                <div>
                  <label style={labelStyle}>Message *</label>
                  <textarea value={form.message} onChange={e => { setForm(p=>({...p,message:e.target.value})); setErrors(p=>({...p,message:''})) }} placeholder="Tell me about your project or idea..." style={{ ...inputStyle, minHeight:130, resize:'vertical', borderColor: errors.message ? 'var(--danger)' : 'var(--border)' }} onFocus={e=>(e.target.style.borderColor='var(--accent)')} onBlur={e=>(e.target.style.borderColor=errors.message?'var(--danger)':'var(--border)')} />
                  {errors.message && <div style={errorStyle}>{errors.message}</div>}
                </div>

                <button onClick={handleSubmit} disabled={sending} style={{ background: sending ? 'var(--surface2)' : 'linear-gradient(135deg, var(--accent), var(--accent3))', color:'white', border:'none', padding:'14px 32px', borderRadius:50, fontSize:'0.92rem', fontWeight:600, cursor: sending ? 'not-allowed' : 'pointer', transition:'all 0.3s ease', alignSelf:'flex-start', boxShadow: sending ? 'none' : '0 6px 24px var(--glow)', fontFamily:'var(--font-body)', opacity: sending ? 0.7 : 1, display:'flex', alignItems:'center', gap:8 }}>
                  {sending ? '⏳ Sending...' : 'Send Message →'}
                </button>

                <p style={{ fontSize:'0.72rem', color:'var(--text3)', marginTop:4 }}>
                  * Required fields. I typically respond within 24 hours.
                </p>
              </div>
            ) : (
              // Form hidden — just show a CTA
              <div style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:'48px 32px', textAlign:'center' }}>
                <div style={{ fontSize:'2.5rem', marginBottom:16 }}>📬</div>
                <p style={{ color:'var(--text2)', marginBottom:24 }}>The best way to reach me is by email.</p>
                <a href={`mailto:${displayEmail}`} style={{ background:'linear-gradient(135deg, var(--accent), var(--accent3))', color:'white', padding:'14px 32px', borderRadius:50, textDecoration:'none', fontWeight:600, fontSize:'0.9rem', display:'inline-block' }}>
                  {displayEmail}
                </a>
              </div>
            )}
          </Reveal>
        </div>
      </div>

      <style>{`
        .contact-card:hover{border-color:var(--border2)!important;transform:translateX(4px)!important}
        @media(max-width:768px){.contact-grid{grid-template-columns:1fr!important;gap:40px!important}.form-row{grid-template-columns:1fr!important}}
      `}</style>
    </section>
  )
}

function SocialBtn({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="soc-btn" style={{ background:'var(--surface)', border:'1px solid var(--border)', color:'var(--text2)', padding:'9px 18px', borderRadius:50, fontSize:'0.83rem', fontWeight:500, textDecoration:'none', transition:'all 0.25s ease' }}>
      {label}
      <style>{`.soc-btn:hover{border-color:var(--border2)!important;color:var(--accent2)!important;background:var(--surface2)!important}`}</style>
    </a>
  )
}

function FormField({ label, value, placeholder, type='text', error, onChange }: { label:string; value:string; placeholder:string; type?:string; error?:string; onChange:(v:string)=>void }) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <input type={type} value={value} placeholder={placeholder} onChange={e=>onChange(e.target.value)} style={{ ...inputStyle, borderColor: error ? 'var(--danger)' : 'var(--border)' }} onFocus={e=>(e.target.style.borderColor='var(--accent)')} onBlur={e=>(e.target.style.borderColor=error?'var(--danger)':'var(--border)')} />
      {error && <div style={errorStyle}>{error}</div>}
    </div>
  )
}

const labelStyle: React.CSSProperties = { display:'block', fontSize:'0.72rem', fontWeight:600, color:'var(--text2)', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:7 }
const inputStyle: React.CSSProperties = { width:'100%', background:'var(--bg3)', border:'1px solid var(--border)', color:'var(--text)', padding:'13px 16px', borderRadius:'var(--radius-sm)', fontSize:'0.9rem', fontFamily:'var(--font-body)', outline:'none', transition:'border-color 0.25s ease', display:'block' }
const errorStyle: React.CSSProperties = { color:'var(--danger)', fontSize:'0.75rem', marginTop:5 }
