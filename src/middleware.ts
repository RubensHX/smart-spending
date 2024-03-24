import { getUrl } from '@/lib/get-url'
import {
  apiAuthPrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
} from '@/routes'
import { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('authjs.session-token')
  const isLoggedIn = token ? true : false
  const pathname = request.nextUrl.pathname
  const isApiAuthRoute = pathname.startsWith(apiAuthPrefix)
  const isPublicRoute = publicRoutes.includes(pathname)
  const isAuthRoute = authRoutes.includes(pathname)

  try {
    if (isPublicRoute) {
      if (isLoggedIn) {
        const redirectUrl = getUrl(DEFAULT_LOGIN_REDIRECT)
        if (!redirectUrl) {
          throw new Error(`Invalid redirect URL: ${redirectUrl}`)
        }
        return Response.redirect(new URL(redirectUrl))
      }
      return null
    }

    if (isAuthRoute) {
      if (isLoggedIn) {
        const redirectUrl = getUrl(DEFAULT_LOGIN_REDIRECT)
        if (!redirectUrl)
          throw new Error(`Invalid redirect URL: ${redirectUrl}`)
        return Response.redirect(new URL(redirectUrl))
      }
      const loginUrl = getUrl('/auth/login')
      if (!loginUrl) throw new Error(`Invalid login URL: ${loginUrl}`)
      return Response.redirect(new URL(loginUrl))
    }
  } catch (error) {
    console.error('Invalid URL:', error)
  }

  return null
}
