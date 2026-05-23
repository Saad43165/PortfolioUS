import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const COOKIE_NAME = 'portfolio_admin_session'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

const SINGLE_ROW_TABLES = ['hero', 'about', 'contact', 'stats']
const ARRAY_TABLES      = ['education', 'projects', 'skills', 'experience']

export async function POST(request: NextRequest) {
  // Auth check
  const session = request.cookies.get(COOKIE_NAME)
  if (!session || session.value !== 'authenticated') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let section = ''
  try {
    const body = await request.json()
    section = body.section
    const data = body.data
    const supabase = getSupabase()

    if (SINGLE_ROW_TABLES.includes(section)) {
      // Strip client-side id, always upsert at id=1
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id: _id, ...rest } = (data as Record<string, unknown>)
      const { error } = await supabase
        .from(section)
        .upsert({ id: 1, ...rest }, { onConflict: 'id' })
      if (error) throw new Error(`Supabase upsert error: ${error.message}`)

    } else if (ARRAY_TABLES.includes(section)) {
      const items = data as Record<string, unknown>[]

      // Step 1: delete all existing rows safely
      const { error: delError } = await supabase
        .from(section)
        .delete()
        .gt('id', 0)          // deletes all positive IDs (all real rows)
      if (delError) throw new Error(`Supabase delete error: ${delError.message}`)

      // Step 2: insert fresh rows without client-side IDs
      if (items.length > 0) {
        const rows = items.map((item, idx) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { id: _id, ...rest } = item
          return { ...rest, order_index: idx }
        })
        const { error: insError } = await supabase.from(section).insert(rows)
        if (insError) throw new Error(`Supabase insert error: ${insError.message}`)
      }

    } else {
      return NextResponse.json({ error: `Unknown section: "${section}"` }, { status: 400 })
    }

    return NextResponse.json({ success: true, section })

  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Unknown save error'
    console.error(`[/api/admin/save] section="${section}" error:`, message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
