import type { NextAuthConfig } from 'next-auth'
import { NextApiRequest } from 'next'
import Credentials from 'next-auth/providers/credentials'
import bcryptjs from 'bcryptjs'
import { LoginSchema } from './schemas'
import { getUserByEmail } from './data/user'

export default {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials) {
        const validateFields = LoginSchema.safeParse(credentials)

        if (!validateFields.success) {
          return null
        }

        const { email, password } = validateFields.data

        const user = await getUserByEmail(email)

        if (!user) {
          return null
        }

        const isValid = await bcryptjs.compare(password, user.password!)

        if (!isValid) {
          return null
        }

        return user
      },
    }),
  ],
} as NextAuthConfig
