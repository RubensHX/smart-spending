'use server'

import { RegisterSchema } from '@/schemas'
import { z } from 'zod'
import bcryptjs from 'bcryptjs'
import { db } from '@/lib/db'
import { getUserByEmail } from '@/data/user'

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  try {
    const validateFields = RegisterSchema.safeParse(values)

    if (!validateFields.success) {
      return { error: 'Invalid fields!' }
    }

    const { email, password, name } = validateFields.data
    const hashedPassword = await bcryptjs.hash(password, 10)

    const existingUser = await getUserByEmail(email)

    if (existingUser) {
      return { error: 'Email already in use!' }
    }

    await db.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    })

    return { success: 'User created!' }
  } catch (error) {
    return { error: 'Something went wrong!' }
  }
}
