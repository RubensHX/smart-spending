import NextAuth from 'next-auth'
import { authConfig } from '@/auth.config'
import Credentials from 'next-auth/providers/credentials'
import { getUserByEmail } from '@/data/user'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { db } from '@/lib/db'

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        const user = await getUserByEmail(credentials.email as string)

        return user ?? null
      },
    }),
  ],
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
})
