'use client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useTransactionModal } from '@/store/use-transaction-modal'
import { useEffect, useState } from 'react'
import { TransactionForm } from '../transaction/transaction-form'

export const TransactionModal = () => {
  const [isClient, setIsClient] = useState(false)
  const { isOpen, closeModal } = useTransactionModal()

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Transaction</DialogTitle>
          <DialogDescription>Create a new transaction</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <TransactionForm />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
