import { db } from '@/lib/db'
import { BudgetSchema } from '@/schemas'
import { z } from 'zod'

export const getBudgetByUserId = async (userId: string) => {
  try {
    const budget = await db.budget.findMany({
      where: { userId },
    })

    return budget
  } catch (error) {
    return null
  }
}

export const createBudget = async (
  values: z.infer<typeof BudgetSchema>,
  userId: string,
) => {
  const validateFields = BudgetSchema.safeParse(values)

  if (!validateFields.success) {
    return { error: 'Invalid fields!' }
  }

  const { amount, description } = values

  try {
    const budget = await db.budget.create({
      data: {
        amount,
        description,
        user: {
          connect: {
            id: userId,
          },
        },
        date: new Date(),
      },
    })

    return budget
  } catch (error) {
    return null
  }
}

export const updateBudget = async (
  values: z.infer<typeof BudgetSchema>,
  userId: string,
) => {
  const validateFields = BudgetSchema.safeParse(values)

  if (!validateFields.success) {
    return { error: 'Invalid fields!' }
  }

  const { amount, description } = values

  try {
    const budget = await db.budget.updateMany({
      where: { userId },
      data: {
        amount,
        description,
        date: new Date(),
      },
    })

    return budget
  } catch (error) {
    return null
  }
}
