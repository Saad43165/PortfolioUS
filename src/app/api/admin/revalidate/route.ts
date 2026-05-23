import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { revalidatePath } from 'next/cache'

const COOKIE_NAME = 'portfolio_admin_session'

export async function POST(request: NextRequest) {
  const session = request.cookies.get(COOKIE_NAME)
  if (!session || session.value !== 'authenticated') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  // Revalidate the entire portfolio page instantly
  revalidatePath('/')
  revalidatePath('/(portfolio)', 'page')
  return NextResponse.json({ revalidated: true, timestamp: Date.now() })
}
