import { z } from 'zod'

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: 'Email is required',
    })
    .email(),
  password: z.string().min(1, {
    message: 'Password is required',
  }),
})

export const RegisterSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: 'Email is required',
    })
    .email(),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters long',
  }),
  name: z.string().min(1, {
    message: 'Name is required',
  }),
})

export const TransactionSchema = z.object({
  amount: z.coerce.number().positive({
    message: 'Amount must be a positive number',
  }),
  description: z.string().min(1, {
    message: 'Description is required',
  }),
  category: z.enum([
    'FOOD',
    'TRANSPORT',
    'SHOPPING',
    'ENTERTAINMENT',
    'BILLS',
    'OTHER',
  ]),
  type: z.enum(['INCOME', 'EXPENSE']),
})

export const BudgetSchema = z.object({
  amount: z.coerce.number(),
  description: z.string().min(1, {
    message: 'Description is required',
  }),
})
