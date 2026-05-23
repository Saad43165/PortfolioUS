import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const COOKIE_NAME = 'portfolio_admin_session'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only protect /admin/dashboard and sub-routes
  if (pathname.startsWith('/admin/dashboard')) {
    const session = request.cookies.get(COOKIE_NAME)
    if (!session || session.value !== 'authenticated') {
      const loginUrl = new URL('/admin/login', request.url)
      // Preserve intended destination
      loginUrl.searchParams.set('from', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/dashboard/:path*'],
}
