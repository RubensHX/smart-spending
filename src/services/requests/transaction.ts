import { requestHandler } from '@/lib/request-handler'
import { Transaction } from '@/types/index'
import axios from 'axios'

interface TransactionByUserRequest {
  userId: string
}

interface TransactionByIdRequest {
  id: string
}

export const getAllTransactionsByUserId = requestHandler<
  TransactionByUserRequest,
  Transaction
>((params) =>
  axios.get('/api/transaction', {
    params: {
      userId: params?.userId,
    },
  }),
)

export const createTransaction = requestHandler<Transaction, Transaction>(
  (params) => axios.post('/api/transaction', params),
)

export const getTransactionById = requestHandler<
  TransactionByIdRequest,
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
