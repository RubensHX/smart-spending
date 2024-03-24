/**
 * An array of routes that are accessible to the public.
 * these routes do not require authentication.
 * @type {string[]}
 */
export const publicRoutes = ['/']

/**
 * An array of routes that are accessible to authenticated users.
 * these routes require authentication.
 * @type {string[]}
 */
export const authRoutes = ['/auth/login', '/auth/register']

/**
 * The prefix for the API routes.
 * @type {string}
 */
export const apiAuthPrefix = '/api/auth'

/**
 * The default redirect path after a successful login.
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = '/dashboard'
