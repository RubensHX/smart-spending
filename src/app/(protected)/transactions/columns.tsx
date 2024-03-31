'use client'

import { Badge } from '@/components/ui/badge'
import { ColumnDef } from '@tanstack/react-table'
import RowActions from './row-actions'

export type Transaction = {
  id: string
  userId: string
  description: string
  date: Date
  type: string
  category: string
}

function onEdit(row: Transaction) {
  console.log('Edit', row)
}

function onDelete(row: Transaction) {
  console.log('Delete', row)
}

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => {
      const date = new Date(row.getValue('date'))
      return date.toLocaleDateString()
    },
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'))
      const formatted = amount.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      })
      return formatted
    },
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => {
      const type = row.getValue('type')
      const incomeType = type === 'INCOME'
      return incomeType ? (
        <span className="text-emerald-500 font-semibold">Income</span>
      ) : (
        <span className="text-red-500 font-semibold">Expense</span>
      )
    },
  },
  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({ row }) => {
      const category = row.getValue('category')
      return <Badge>{category as string}</Badge>
    },
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <RowActions row={row} onEdit={onEdit} onDelete={onDelete} />
    ),
  },
]
