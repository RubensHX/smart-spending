import { auth } from '@/auth'
import { columns, Transaction } from './columns'
import { DataTable } from './data-table'
import { getAllTransactionsByUserId } from '@/data/transaction'
import { Prisma } from '@prisma/client'
import { ReturnTypeWithoutPromise } from '@/lib/return-type-without-promise'

async function getData(): Promise<Transaction[]> {
  const session = await auth()
  const transactions = (await getAllTransactionsByUserId(
    session?.user?.id ?? '',
  )) as Transaction[]
  return transactions
}

export default async function TransactionsPage() {
  const data = await getData()

  return (
    <main className="w-full px-6">
      <DataTable columns={columns} data={data} />
    </main>
  )
}
