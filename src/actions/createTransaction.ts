'use server'

import { TransactionSchema } from '@/schemas'
import { z } from 'zod'
import { db } from '@/lib/db'
import { createBudget, getBudgetByUserId, updateBudget } from '@/data/budget'

export const createTransaction = async (
  values: z.infer<typeof TransactionSchema>,
  userId: string | undefined,
) => {
  const validateFields = TransactionSchema.safeParse(values)

  if (!validateFields.success) {
    return { error: 'Invalid fields!' }
  }

  const { amount, description, category, type } = validateFields.data

  await db.transaction.create({
    data: {
      amount,
      category,
      description,
      type,
      date: new Date(),
      user: { connect: { id: userId } },
    },
  })

  const userBudget = await getBudgetByUserId(userId ?? '')
  let budgetAmount = amount

  if (type === 'EXPENSE') {
    budgetAmount = -amount
  }

  if (!userBudget) {
    createBudget(
      { amount: budgetAmount, description: 'Initial budget' },
      userId ?? '',
    )
  }

  updateBudget({ amount: budgetAmount, description }, userId ?? '')
  return { success: 'Transaction created successfully!' }
}
