import NextAuth from 'next-auth'
import { authConfig } from '@/auth.config'
import { DEFAULT_LOGIN_REDIRECT, publicRoutes, authRoutes } from './routes'

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const { nextUrl } = req

  const isAuthenticated = !!req.auth
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)

  if (isAuthRoute && isAuthenticated)
    return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))

  if (isAuthRoute && !isAuthenticated) return

  if (isPublicRoute && isAuthenticated)
    return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))

  if (!isAuthenticated && !isPublicRoute)
    return Response.redirect(new URL('/', nextUrl))
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
