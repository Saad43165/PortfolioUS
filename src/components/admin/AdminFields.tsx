'use client'

import React from 'react'

// ── Label ─────────────────────────────────────────────────────
export function AdminLabel({ children }: { children: React.ReactNode }) {
  return (
    <label style={{
      display: 'block', fontSize: '0.7rem', fontWeight: 600,
      color: 'var(--text2)', textTransform: 'uppercase',
      letterSpacing: '0.1em', marginBottom: 7,
    }}>
      {children}
    </label>
  )
}

// ── Input ──────────────────────────────────────────────────────
interface InputProps {
  value: string | number
  onChange: (v: string) => void
  placeholder?: string
  type?: string
}
export function AdminInput({ value, onChange, placeholder, type = 'text' }: InputProps) {
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={e => onChange(e.target.value)}
      style={{
        width: '100%', background: 'var(--bg3)',
        border: '1px solid var(--border)', color: 'var(--text)',
        padding: '11px 15px', borderRadius: 'var(--radius-sm)',
        fontSize: '0.88rem', fontFamily: 'var(--font-body)',
        outline: 'none', transition: 'border-color 0.25s ease',
      }}
      onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
      onBlur={e  => (e.target.style.borderColor = 'var(--border)')}
    />
  )
}

// ── Textarea ───────────────────────────────────────────────────
interface TextareaProps {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  rows?: number
}
export function AdminTextarea({ value, onChange, placeholder, rows = 4 }: TextareaProps) {
  return (
    <textarea
      value={value}
      placeholder={placeholder}
      rows={rows}
      onChange={e => onChange(e.target.value)}
      style={{
        width: '100%', background: 'var(--bg3)',
        border: '1px solid var(--border)', color: 'var(--text)',
        padding: '11px 15px', borderRadius: 'var(--radius-sm)',
        fontSize: '0.88rem', fontFamily: 'var(--font-body)',
        outline: 'none', resize: 'vertical',
        transition: 'border-color 0.25s ease',
      }}
      onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
      onBlur={e  => (e.target.style.borderColor = 'var(--border)')}
    />
  )
}

// ── Toggle ─────────────────────────────────────────────────────
interface ToggleProps { checked: boolean; onChange: (v: boolean) => void; label: string }
export function AdminToggle({ checked, onChange, label }: ToggleProps) {
  return (
    <div
      style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', userSelect: 'none' }}
      onClick={() => onChange(!checked)}
    >
      <div style={{
        width: 44, height: 24, borderRadius: 50,
        background: checked ? 'var(--accent)' : 'var(--surface2)',
        border: `1px solid ${checked ? 'var(--accent)' : 'var(--border)'}`,
        position: 'relative', flexShrink: 0, transition: 'all 0.3s var(--ease)',
      }}>
        <div style={{
          position: 'absolute', width: 18, height: 18,
          background: 'white', borderRadius: '50%',
          top: 2, left: checked ? 22 : 2,
          transition: 'left 0.3s var(--ease)',
          boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
        }} />
      </div>
      <span style={{ fontSize: '0.85rem', color: 'var(--text2)' }}>{label}</span>
    </div>
  )
}

// ── Range ──────────────────────────────────────────────────────
interface RangeProps { value: number; onChange: (v: number) => void; label: string }
export function AdminRange({ value, onChange, label }: RangeProps) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <span style={{ fontSize: '0.72rem', color: 'var(--text2)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{label}</span>
        <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--accent2)', fontWeight: 600 }}>{value}%</span>
      </div>
      <input
        type="range" min={0} max={100} value={value}
        onChange={e => onChange(parseInt(e.target.value))}
        style={{ width: '100%', accentColor: 'var(--accent)', cursor: 'pointer' }}
      />
      {/* Visual bar */}
      <div style={{ height: 3, background: 'var(--surface2)', borderRadius: 3, marginTop: 6, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${value}%`, background: 'linear-gradient(90deg, var(--accent), var(--accent3))', borderRadius: 3, transition: 'width 0.2s ease' }} />
      </div>
    </div>
  )
}

// ── Card ───────────────────────────────────────────────────────
export function AdminCard({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div style={{
      background: 'var(--surface)', border: '1px solid var(--border)',
      borderRadius: 'var(--radius)', padding: 28, marginBottom: 20,
    }}>
      {title && (
        <div style={{
          fontSize: '0.88rem', fontWeight: 600, color: 'var(--text)',
          marginBottom: 20, paddingBottom: 16, borderBottom: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          {title}
        </div>
      )}
      {children}
    </div>
  )
}

// ── Grid ───────────────────────────────────────────────────────
export function AdminGrid({ cols = 2, children }: { cols?: number; children: React.ReactNode }) {
  return (
    <>
      <div className="admin-form-grid" style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: 16,
      }}>
        {children}
      </div>
      <style>{`@media(max-width:640px){.admin-form-grid{grid-template-columns:1fr !important;}}`}</style>
    </>
  )
}

// ── Field ──────────────────────────────────────────────────────
export function Field({ label, value, onChange, placeholder, type, span }: {
  label: string; value: string; onChange: (v: string) => void
  placeholder?: string; type?: string; span?: boolean
}) {
  return (
    <div style={span ? { gridColumn: '1 / -1' } : {}}>
      <AdminLabel>{label}</AdminLabel>
      <AdminInput value={value} onChange={onChange} placeholder={placeholder} type={type} />
    </div>
  )
}

// ── Image Upload ───────────────────────────────────────────────
export function AdminImageUpload({ value, onChange, label = "Image Upload" }: {
  value: string; onChange: (v: string) => void; label?: string
}) {
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 2 * 1024 * 1024) {
      alert("Please upload an image smaller than 2MB.")
      return
    }
    const reader = new FileReader()
    reader.onload = (event) => {
      if (event.target?.result) {
        onChange(event.target.result as string)
      }
    }
    reader.readAsDataURL(file)
  }

  return (
    <div style={{ marginTop: 12 }}>
      <AdminLabel>{label}</AdminLabel>
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleFile} 
        style={{
          display: 'block', width: '100%', padding: '10px 0',
          color: 'var(--text2)', fontSize: '0.88rem',
          fontFamily: 'var(--font-body)'
        }}
      />
      <div style={{ fontSize: '0.75rem', color: 'var(--text3)', marginTop: 4 }}>
        Alternatively, provide a URL below:
      </div>
    </div>
  )
}

// ── File Upload (PDF/CV) ───────────────────────────────────────
export function AdminFileUpload({ value, onChange, label = "File Upload" }: {
  value: string; onChange: (v: string) => void; label?: string
}) {
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 3 * 1024 * 1024) {
      alert("Please upload a file smaller than 3MB.")
      return
    }
    const reader = new FileReader()
    reader.onload = (event) => {
      if (event.target?.result) {
        onChange(event.target.result as string)
      }
    }
    reader.readAsDataURL(file)
  }

  const hasFile = value && value.startsWith('data:')

  return (
    <div style={{ marginTop: 12 }}>
      <AdminLabel>{label}</AdminLabel>
      <input 
        type="file" 
        accept=".pdf,.doc,.docx" 
        onChange={handleFile} 
        style={{
          display: 'block', width: '100%', padding: '10px 0',
          color: 'var(--text2)', fontSize: '0.88rem',
          fontFamily: 'var(--font-body)'
        }}
      />
      {hasFile && (
        <div style={{ fontSize: '0.82rem', color: 'var(--success)', marginTop: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
          ✓ CV File uploaded successfully ({value.length > 100000 ? `${Math.round(value.length / 1333)} KB` : 'Base64'})
        </div>
      )}
      <div style={{ fontSize: '0.75rem', color: 'var(--text3)', marginTop: 4 }}>
        Alternatively, provide a URL below:
      </div>
    </div>
  )
}

// ── Save Button ────────────────────────────────────────────────
export function SaveButton({ onClick, loading, status }: {
  onClick: () => void
  loading: boolean
  status: 'idle' | 'saving' | 'success' | 'error'
}) {
  const isSuccess = status === 'success'
  const isError   = status === 'error'
  const isSaving  = status === 'saving' || loading

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 8, flexWrap: 'wrap' }}>
      <button
        onClick={onClick}
        disabled={isSaving}
        style={{
          background: isSaving
            ? 'var(--surface2)'
            : 'linear-gradient(135deg, var(--accent), var(--accent3))',
          color: 'white', border: 'none',
          padding: '13px 36px', borderRadius: 50,
          fontSize: '0.9rem', fontWeight: 600,
          cursor: isSaving ? 'not-allowed' : 'pointer',
          opacity: isSaving ? 0.65 : 1,
          transition: 'all 0.3s ease',
          fontFamily: 'var(--font-body)',
          boxShadow: isSaving ? 'none' : '0 4px 20px var(--glow)',
          display: 'flex', alignItems: 'center', gap: 8,
        }}
      >
        <span>{isSaving ? '⏳' : '💾'}</span>
        {isSaving ? 'Saving...' : 'Save Changes'}
      </button>

      {isSuccess && (
        <span style={{
          fontSize: '0.82rem', color: 'var(--success)',
          background: 'rgba(16,185,129,0.1)',
          border: '1px solid rgba(16,185,129,0.3)',
          padding: '7px 18px', borderRadius: 50,
          display: 'flex', alignItems: 'center', gap: 6,
          animation: 'fadeInStatus 0.3s ease',
        }}>
          ✓ Saved — portfolio updated!
        </span>
      )}
      {isError && (
        <span style={{
          fontSize: '0.82rem', color: 'var(--danger)',
          background: 'rgba(239,68,68,0.1)',
          border: '1px solid rgba(239,68,68,0.3)',
          padding: '7px 18px', borderRadius: 50,
          display: 'flex', alignItems: 'center', gap: 6,
        }}>
          ✗ Save failed — check console
        </span>
      )}
      <style>{`@keyframes fadeInStatus{from{opacity:0;transform:translateX(-8px)}to{opacity:1;transform:none}}`}</style>
    </div>
  )
}

// ── Page Header ────────────────────────────────────────────────
export function AdminPageHeader({ title, desc }: { title: string; desc: string }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <h1 style={{
        fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700,
        letterSpacing: '-0.02em', marginBottom: 6,
      }}>{title}</h1>
      <p style={{ color: 'var(--text2)', fontSize: '0.88rem' }}>{desc}</p>
    </div>
  )
}

// ── List Item ──────────────────────────────────────────────────
export function AdminListItem({ title, onDelete, children }: {
  title: string; onDelete: () => void; children: React.ReactNode
}) {
  return (
    <div style={{
      background: 'var(--bg3)', border: '1px solid var(--border)',
      borderRadius: 'var(--radius-sm)', padding: 22, marginBottom: 16,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
        <span style={{ fontWeight: 600, fontSize: '0.92rem', color: 'var(--text)' }}>{title}</span>
        <button
          onClick={onDelete}
          style={{
            background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)',
            color: '#f87171', padding: '6px 14px', borderRadius: 8,
            fontSize: '0.78rem', cursor: 'pointer', fontFamily: 'var(--font-body)',
          }}
        >
          Remove
        </button>
      </div>
      {children}
    </div>
  )
}

// ── Add Button ─────────────────────────────────────────────────
export function AddButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%', background: 'transparent',
        border: '1px dashed var(--border2)', color: 'var(--accent2)',
        padding: '14px 24px', borderRadius: 'var(--radius-sm)',
        fontSize: '0.88rem', fontWeight: 500, cursor: 'pointer',
        fontFamily: 'var(--font-body)', transition: 'all 0.25s ease',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      }}
      onMouseEnter={e => { e.currentTarget.style.background = 'var(--surface)'; e.currentTarget.style.borderColor = 'var(--accent)' }}
      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'var(--border2)' }}
    >
      + {label}
    </button>
  )
}
