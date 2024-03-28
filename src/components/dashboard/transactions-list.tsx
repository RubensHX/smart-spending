import { getLatestTransactions } from '@/data/transaction'
import {
  Banknote,
  CarFront,
  Ham,
  ListIcon,
  Receipt,
  ShoppingCart,
} from 'lucide-react'
import { Separator } from '@/components/ui/separator'

type TransactionListProps = {
  userId?: string | undefined
}

const TransactionsList = async ({ userId }: TransactionListProps) => {
  const transactions = await getLatestTransactions(userId ?? '')

  const categoryIcons = {
    FOOD: <Ham className="h-6 w-6" />,
    TRANSPORT: <CarFront className="h-6 w-6" />,
    SHOPPING: <ShoppingCart className="h-6 w-6" />,
    ENTERTAINMENT: <ListIcon className="h-6 w-6" />,
    BILLS: <Receipt className="h-6 w-6" />,
    OTHER: <Banknote className="h-6 w-6" />,
  }

  return (
    <div className="w-full py-12">
      <div className="container grid gap-6 md:gap-8 px-4 md:px-6">
        <div className="grid gap-6">
          {transactions?.map((transaction, index) => (
            <>
              <div key={transaction.id} className="flex items-center gap-4">
                {categoryIcons[transaction.category]}
                <div className="grid gap-1">
                  <h3 className="font-semibold">{transaction.type}</h3>
                  <p className="text-sm leading-none">
                    {transaction.description}
                  </p>
                </div>
                <div className="ml-auto font-semibold">
                  {transaction.amount.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  })}
                </div>
              </div>
              {index === transactions.length - 1 && <Separator />}
            </>
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
