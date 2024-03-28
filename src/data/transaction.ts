import { db } from '@/lib/db'

export const getExpenseTransactionsByUserId = async (userId: string) => {
  try {
    const spending = await db.transaction.findMany({
      where: { userId, type: 'EXPENSE' },
    })

    return spending
  } catch (error) {
    return null
  }
}

export const getIncomeTransactionsByUserId = async (userId: string) => {
  try {
    const income = await db.transaction.findMany({
      where: { userId, type: 'INCOME' },
    })

    return income
  } catch (error) {
    return null
  }
}

export const getAllTransactionsByUserId = async (userId: string) => {
  try {
    const transactions = await db.transaction.findMany({
      where: { userId },
    })

    return transactions
  } catch (error) {
    return null
  }
}

export const getExpensesDashboardData = async (userId: string) => {
  try {
    const monthlyExpenses = await db.transaction.groupBy({
      by: ['date'],
      where: { userId, type: 'EXPENSE' },
      _sum: { amount: true },
    })

    const formattedData = monthlyExpenses.map((entry) => ({
      date: new Date(entry.date).toLocaleString('default', {
        month: 'long',
        year: 'numeric',
      }),
      totalExpenses: entry._sum.amount,
    }))

    return formattedData
  } catch (error) {
    return null
  }
}

export const getLatestTransactions = async (userId: string) => {
  try {
    const transactions = await db.transaction.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
      take: 5,
    })

    return transactions
  } catch (error) {
    return null
  }
}
