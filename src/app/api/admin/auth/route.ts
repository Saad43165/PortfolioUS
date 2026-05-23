import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const COOKIE_NAME = 'portfolio_admin_session'
const COOKIE_MAX_AGE = 60 * 60 * 8 // 8 hours

// GET — check if currently authenticated
export async function GET(request: NextRequest) {
  const session = request.cookies.get(COOKIE_NAME)
  if (session?.value === 'authenticated') {
    return NextResponse.json({ authenticated: true })
  }
  return NextResponse.json({ authenticated: false }, { status: 401 })
}

// POST — login with secret key
export async function POST(request: NextRequest) {
  try {
    const { key } = await request.json()
    const secretKey = process.env.ADMIN_SECRET_KEY

    if (!secretKey) {
      return NextResponse.json(
        { error: 'ADMIN_SECRET_KEY not set in .env.local' },
        { status: 500 }
      )
    }

    if (!key || key !== secretKey) {
      await new Promise(r => setTimeout(r, 600))
      return NextResponse.json({ error: 'Invalid admin key.' }, { status: 401 })
    }

    const response = NextResponse.json({ success: true })
    response.cookies.set(COOKIE_NAME, 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: COOKIE_MAX_AGE,
      path: '/',
    })
    return response
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }
}

// DELETE — logout
export async function DELETE() {
  const response = NextResponse.json({ success: true })
  response.cookies.delete(COOKIE_NAME)
  return response
}
