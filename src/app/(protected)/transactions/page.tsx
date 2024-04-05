'use client'

import { CreateTransactionButton } from '@/components/transaction/create-transaction-button'
import { getFilteredTransactions } from '@/services/requests/transaction'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { columns } from './columns'
import { DataTable } from './data-table'
import { Metadata } from 'next'

export default function TransactionsPage() {
  const { data: session } = useSession()
  const user = session?.user
  const { data: transactions } = useQuery({
    queryKey: ['transactions'],
    queryFn: async () => {
      const response = await getFilteredTransactions({ userId: user?.id })
      if (response.code === 'error') {
        return []
      }
      return response.data
    },
  })

  return (
    <>
      <title>Smart Spending | Transactions</title>
      <main className="w-full px-6">
        <CreateTransactionButton />
        <DataTable columns={columns} data={transactions ?? []} />
      </main>
    </>
  )
}
