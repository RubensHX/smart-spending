import { requestHandler } from '@/lib/request-handler'
import { Transaction } from '@/types/index'
import axios from 'axios'

interface TransactionRequest {
  userId?: string
  id?: string
  onlyExpenses?: boolean
  onlyIncomes?: boolean
}

export const getAllTransactionsByUserId = requestHandler<
  TransactionRequest,
  Transaction[]
>((params) =>
  axios.get('/api/transaction', {
    params: {
      userId: params?.userId,
    },
  }),
)

export const createTransaction = requestHandler<
  Omit<Transaction, 'id'>,
  Transaction
>((params) => axios.post('/api/transaction', params))

export const getTransactionById = requestHandler<
  TransactionRequest,
  Transaction
>((params) => {
  const id = params?.id
  return axios.get(`/api/transaction/${id}`)
})

export const updateTransaction = requestHandler<
  Partial<Transaction>,
  Transaction
>((params) => {
  const id = params?.id
  return axios.put(`/api/transaction/${id}`, params)
})

export const deleteTransaction = requestHandler<
  Partial<Transaction>,
  { message: string }
>((params) => {
  const id = params?.id
  return axios.delete(`/api/transaction/${id}`, { data: params })
})

export const getFilteredTransactions = requestHandler<
  TransactionRequest,
  Transaction[]
>((params) =>
  axios.get('/api/transaction', {
    params: {
      userId: params?.userId,
      onlyExpenses: params?.onlyExpenses,
      onlyIncomes: params?.onlyIncomes,
    },
  }),
)
