import { db } from '@/lib/db'

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
