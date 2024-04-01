'use client'

import { useTransactionModal } from '@/store/use-transaction-modal'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'

export const CreateTransactionButton = () => {
  const { openModal } = useTransactionModal()
  return (
    <section className="flex items-center justify-center mb-4 p-y-2">
      <Button onClick={openModal}>
        <PlusIcon className="h-5 w-5 mr-2" />
        Create Transaction
      </Button>
    </section>
  )
}
