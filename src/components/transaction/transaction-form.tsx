'use client'

import { createTransaction } from '@/actions/createTransaction'
import { auth } from '@/auth'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/components/ui/use-toast'
import { TransactionSchema } from '@/schemas'
import { useTransactionModal } from '@/store/use-transaction-modal'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export const TransactionForm: React.FC = () => {
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const { data: session } = useSession()
  const user = session?.user
  const { closeModal } = useTransactionModal()
  const queryClient = useQueryClient()

  const form = useForm<z.infer<typeof TransactionSchema>>({
    resolver: zodResolver(TransactionSchema),
    defaultValues: {
      amount: 0,
      description: '',
      type: undefined,
      category: undefined,
    },
  })

  const onSubmit = (values: z.infer<typeof TransactionSchema>) => {
    startTransition(() => {
      createTransaction(values, user?.id)
        .then((data) => {
          if (data.error) {
            toast({
              variant: 'destructive',
              title: 'Error',
              description: data.error,
              duration: 5000,
            })
          }
          if (data.success) {
            toast({
              title: 'Success',
              description: data.success,
              duration: 5000,
            })
          }
        })
        .then(() => {
          closeModal()
          queryClient.invalidateQueries({
            queryKey: ['transactions'],
          })
        })
    })
  }

  return (
    <div className="flex items-center justify-center w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      className="w-full"
                      disabled={isPending}
                      {...field}
                      placeholder="00.00"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} {...field} className="w-full" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            className="w-full"
                            placeholder="Select the type of transaction"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="w-full">
                        <SelectItem value="INCOME">Income</SelectItem>
                        <SelectItem value="EXPENSE">Expense</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            className="w-full"
                            placeholder="Select the category of transaction"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="w-full">
                        <SelectItem value="FOOD">Food</SelectItem>
                        <SelectItem value="TRANSPORT">Transport</SelectItem>
                        <SelectItem value="SHOPPING">Shopping</SelectItem>
                        <SelectItem value="ENTERTAINMENT">
                          Entertainment
                        </SelectItem>
                        <SelectItem value="BILLS">Bills</SelectItem>
                        <SelectItem value="OTHER">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isPending}>
            Create transaction
          </Button>
          <Button variant="destructive" className="w-full" onClick={closeModal}>
            Close
          </Button>
        </form>
      </Form>
    </div>
  )
}

export async function getServerSideProps() {
  const session = await auth()
  return { props: { session } }
}
