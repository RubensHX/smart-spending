import { authConfig } from '@/auth.config'
import { db } from '@/lib/db'
import { PrismaAdapter } from '@auth/prisma-adapter'
import NextAuth from 'next-auth'

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
        session.user.image = token.picture
      }
      return session
    },
    async jwt({ token, user }) {
      token.exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 // 24 hours
      if (user) {
        token.picture = user.image
      }
      return token
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig,
})
