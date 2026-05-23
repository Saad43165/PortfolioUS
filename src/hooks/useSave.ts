import { useState, useCallback } from 'react'

type SaveStatus = 'idle' | 'saving' | 'success' | 'error'

export function useSave(section: string) {
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<SaveStatus>('idle')

  const save = useCallback(async (data: unknown) => {
    setLoading(true)
    setStatus('saving')
    try {
      // 1. Save to Supabase
      const res = await fetch('/api/admin/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section, data }),
      })
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Save failed')
      }

      // 2. Immediately revalidate portfolio page cache
      await fetch('/api/admin/revalidate', { method: 'POST' })

      setStatus('success')
      setTimeout(() => setStatus('idle'), 3500)
    } catch (e) {
      console.error(`[useSave] error in section "${section}":`, e)
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4500)
    } finally {
      setLoading(false)
    }
  }, [section])

  return { save, loading, status }
}
