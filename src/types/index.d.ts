enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
}

enum TransactionCategory {
  FOOD = 'FOOD',
  TRANSPORT = 'TRANSPORT',
  SHOPPING = 'SHOPPING',
  ENTERTAINMENT = 'ENTERTAINMENT',
  BILLS = 'BILLS',
  OTHER = 'OTHER',
}

export interface Transaction {
  id: string
  userId: string
  amount: number
  description: string
  date: Date
  type: TransactionType
  category: TransactionCategory
}

export interface Budget {
  id: string
  userId: string
  amount: number
  description: string
  date: Date
}

export interface Account {
  id: string
  userId: string
  type: string
  provider: string
  providerAccountId: string
  refresh_token: string
  access_token: string
  expires_at: Date
  token_type: string
  scope: string
  id_token: string
  session_state: string
}

export interface Session {
  id: string
  sessionToken: string
  userId: string
  expires: Date
}

enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export interface User {
  id: string
  name?: string
  email?: string
  emailVerified?: Date
  image: string
  password: string
  birthdate?: Date
  roles: Role[]
  accounts: Account[]
  sessions: Session[]
  transactions: Transaction[]
  budgets: Budget[]
}
