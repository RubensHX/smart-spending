import { db } from '@/lib/db'

export const getSpendingByUserId = async (userId: string) => {
  try {
    const spending = await db.spending.findMany({
      where: { userId },
    })

    return spending
  } catch (error) {
    return null
  }
}
