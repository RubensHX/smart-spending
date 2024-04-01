enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
}

enum TransactionCategory {
  FOOD = 'FOOD',
  TRANSPORT = 'TRANSPORT',
  SHOPPING = 'SHOPPING',
  ENTERTAINMENT = 'ENTERTAINMENT',
  BILLS = 'BILLS',
  OTHER = 'OTHER',
}

export type Transaction = {
  id: string
  userId: string
  amount: number
  description: string
  date: Date
  type: TransactionType
  category: TransactionCategory
}
