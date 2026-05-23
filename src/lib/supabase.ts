import { createClient } from '@supabase/supabase-js'

const supabaseUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder-url.supabase.co'
const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnon)

export async function fetchSingle<T>(table: string, fallback: T): Promise<T> {
  try {
    const { data, error } = await supabase
      .from(table).select('*').order('id', { ascending: true }).limit(1).single()
    if (error || !data) return fallback
    return data as T
  } catch {
    return fallback
  }
}

export async function fetchAll<T>(table: string, fallback: T[]): Promise<T[]> {
  try {
    const { data, error } = await supabase
      .from(table).select('*').order('order_index', { ascending: true })
    if (error || !data || data.length === 0) return fallback
    return data as T[]
  } catch {
    return fallback
  }
}
