import { cookies } from 'next/headers'

const COOKIE_NAME = 'portfolio_admin_session'
const SESSION_VALUE = 'authenticated'

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  const session = cookieStore.get(COOKIE_NAME)
  return session?.value === SESSION_VALUE
}

export function validateAdminKey(key: string): boolean {
  const secretKey = process.env.ADMIN_SECRET_KEY
  if (!secretKey) return false
  return key === secretKey
}

export { COOKIE_NAME, SESSION_VALUE }
