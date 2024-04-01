import { Separator } from '@/components/ui/separator'
import { getLatestTransactions } from '@/data/transaction'
import { cn } from '@/lib/utils'
import {
  Banknote,
  CarFront,
  Ham,
  ListIcon,
  Receipt,
  ShoppingCart,
} from 'lucide-react'
import React from 'react'

type TransactionListProps = {
  userId?: string | undefined
}

const TransactionsList = async ({ userId }: TransactionListProps) => {
  const transactions = await getLatestTransactions(userId ?? '')
  const expensesTransactionsAmount = transactions
    ?.filter((transaction) => transaction.type === 'EXPENSE')
    .map((transaction) => transaction.amount)
    .reduce((acc, amount) => acc + amount, 0)
  const incomesTransactionsAmount = transactions
    ?.filter((transaction) => transaction.type === 'INCOME')
    .map((transaction) => transaction.amount)
    .reduce((acc, amount) => acc + amount, 0)
  const totalAmount =
    (incomesTransactionsAmount ?? 0) - (expensesTransactionsAmount ?? 0)

  const categoryIcons = {
    FOOD: <Ham className="h-6 w-6" />,
    TRANSPORT: <CarFront className="h-6 w-6" />,
    SHOPPING: <ShoppingCart className="h-6 w-6" />,
    ENTERTAINMENT: <ListIcon className="h-6 w-6" />,
    BILLS: <Receipt className="h-6 w-6" />,
    OTHER: <Banknote className="h-6 w-6" />,
  }

  function formatCurrency(amount: number) {
    return amount.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    })
  }

  function formatDate(date: Date) {
    return new Date(date).toLocaleDateString()
  }

  return (
    <div className="w-full py-12">
      <div className="container grid gap-6 md:gap-8 px-4 md:px-6">
        <div className="grid gap-6">
          {transactions?.map((transaction, index) => (
            <React.Fragment key={transaction.id}>
              <div className="flex items-center gap-4">
                <div className="flex rounded-full h-10 w-10 dark:bg-gray-800 bg-gray-200 items-center justify-center ">
                  {categoryIcons[transaction.category]}
                </div>
                <div className="grid gap-1">
                  <h3 className="font-semibold">{transaction.description}</h3>
                  <p className="text-sm leading-none text-muted-foreground">
                    {transaction.type} - {formatDate(transaction.date)}
                  </p>
                </div>
                <div
                  className={cn(
                    'ml-auto font-semibold',
                    transaction.type === 'EXPENSE'
                      ? 'text-red-500'
                      : 'text-emerald-500',
                  )}
                >
                  {(transaction.type === 'EXPENSE' && '-') || '+'}
                  {formatCurrency(transaction.amount)}
                </div>
              </div>
              {index !== transactions.length - 1 && <Separator />}
            </React.Fragment>
          ))}
          {transactions?.length === 0 && (
            <p className="text-center text-gray-500">No transactions found</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default TransactionsList
